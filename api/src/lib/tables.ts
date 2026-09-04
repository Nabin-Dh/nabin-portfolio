// Azure Table Storage (or Cosmos DB Table API) data access for the portfolio
// metrics: article views and useful/not-useful reactions.
//
// Design goals:
//  - Authoritative de-duplication: a visitorId may register ONE view per
//    article per day and ONE reaction per article, enforced by row-key
//    uniqueness (createEntity throws 409 on conflict). This stops a single
//    browser session inflating counts and prevents trivial re-submission.
//  - No fabricated data: if the metrics backend isn't configured, all read
//    operations return null and writes are no-ops, so the UI never shows
//    made-up numbers.
//  - Privacy-conscious: we only persist a random, non-personal visitorId and
//    an ISO date string. No name, email, IP, or fingerprint is stored.

import {
  TableClient,
  type TableEntity,
} from "@azure/data-tables";

export const METRICS_TABLE = "insightsMetrics";

const VIEW_PREFIX = "views:";
const REACTION_PREFIX = "reactions:";

export type Metrics = {
  slug: string;
  views: number;
  helpful: number;
  notHelpful: number;
};

function connectionString(): string {
  return process.env.AZURE_TABLES_CONNECTION_STRING ?? "";
}

function client(): TableClient | null {
  const conn = connectionString();
  if (!conn) {
    return null;
  }
  return TableClient.fromConnectionString(conn, METRICS_TABLE);
}

/** Ensure the metrics table exists (safe to call on cold start). */
export async function ensureTable(): Promise<void> {
  const c = client();
  if (!c) {
    return;
  }
  try {
    await c.createTable();
  } catch {
    // Table already exists (or storage not reachable) — not fatal.
  }
}

function dayBucket(): string {
  return new Date().toISOString().slice(0, 10);
}

/** Count entities in a partition, following continuation pages. */
async function countEntities(client: TableClient, filter: string): Promise<number | null> {
  let count = 0;
  try {
    const page = client.listEntities({ queryOptions: { filter } });
    for await (const _entity of page) {
      count += 1;
    }
    return count;
  } catch {
    return null;
  }
}

/**
 * Register a unique view. Returns the new cumulative view count on first
 * (unique) registration, or null if the backend is unconfigured or the view
 * was already counted for this visitor on this day.
 */
export async function registerView(
  slug: string,
  visitorId: string,
): Promise<number | null> {
  const c = client();
  if (!c) {
    return null;
  }
  try {
    await c.createEntity({
      partitionKey: `${VIEW_PREFIX}${slug}`,
      rowKey: `${dayBucket()}|${visitorId}`,
    } satisfies TableEntity);
  } catch (err) {
    // 409 conflict = already counted this visitor today; expected, not an error.
    const status = (err as { statusCode?: number }).statusCode;
    if (status !== 409) {
      return null;
    }
  }
  return countEntities(c, `PartitionKey eq '${VIEW_PREFIX}${slug}'`);
}

/**
 * Register a reaction. Idempotent per visitor: only the first reaction for a
 * given article counts. Returns the updated metrics, or null if unconfigured.
 */
export async function registerReaction(
  slug: string,
  visitorId: string,
  vote: "helpful" | "not-helpful",
): Promise<Metrics | null> {
  const c = client();
  if (!c) {
    return null;
  }
  try {
    await c.createEntity({
      partitionKey: `${REACTION_PREFIX}${slug}`,
      rowKey: visitorId,
      vote,
    } satisfies TableEntity);
  } catch (err) {
    const status = (err as { statusCode?: number }).statusCode;
    if (status !== 409) {
      return null;
    }
  }
  return getMetrics(slug);
}

/**
 * Return current metrics for a slug, or null when the backend is unconfigured.
 */
export async function getMetrics(slug: string): Promise<Metrics | null> {
  const c = client();
  if (!c) {
    return null;
  }
  const views = await countEntities(c, `PartitionKey eq '${VIEW_PREFIX}${slug}'`);
  let helpful = 0;
  let notHelpful = 0;
  let exists = false;
  try {
    const page = c.listEntities({
      queryOptions: { filter: `PartitionKey eq '${REACTION_PREFIX}${slug}'` },
    });
    for await (const entity of page) {
      const row = entity as unknown as TableEntity;
      const vote = String(row.vote ?? "");
      exists = true;
      if (vote === "helpful") {
        helpful += 1;
      } else if (vote === "not-helpful") {
        notHelpful += 1;
      }
    }
  } catch {
    // No reactions yet or read failed — report what we can.
  }
  if (views === null) {
    return null;
  }
  return { slug, views, helpful, notHelpful };
}
