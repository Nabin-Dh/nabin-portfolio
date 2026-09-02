import { FileText } from "lucide-react";
import type { Metadata } from "next";
import { InsightFilters } from "@/components/insights/InsightFilters";
import { PageHeader } from "@/components/layout/PageHeader";
import { Container } from "@/components/ui/Container";
import { Link } from "@/components/ui/Link";
import { getAllInsights, getAllTags } from "@/lib/insights";

export const metadata: Metadata = {
  title: "Insights",
  description:
    "Technical insights and write-ups by Nabin Dhungana on networking, systems administration, cloud infrastructure, and cybersecurity.",
  alternates: {
    canonical: "/insights",
  },
  openGraph: {
    type: "website",
    title: "Insights — Nabin Dhungana",
    description:
      "Technical write-ups on networking, systems, cloud, and security.",
  },
};

export default function InsightsPage() {
  const insights = getAllInsights();
  const tags = getAllTags();

  return (
    <div className="flex flex-col">
      <PageHeader
        eyebrow="/insights"
        title="Insights"
        description="Technical write-ups on networking, systems, cloud, and security."
      />

      <Container className="py-16 sm:py-24">
        {insights.length === 0 ? (
          <div className="flex flex-col items-center rounded border border-dashed border-white/[0.12] bg-background-card p-10 text-center sm:p-16">
            <div className="flex h-12 w-12 items-center justify-center rounded border border-white/10 text-accent">
              <FileText className="h-5 w-5" />
            </div>
            <h2 className="mt-6 text-2xl font-semibold tracking-tight text-text-primary">
              No insights published yet
            </h2>
            <p className="mt-4 max-w-xl leading-7 text-text-secondary">
              This section is ready to publish articles. New write-ups on
              networking, systems administration, cloud infrastructure, and
              cybersecurity will appear here with search, tag filtering, and
              table of contents included by default.
            </p>
            <Link
              href="/contact"
              className="mt-8 inline-flex items-center gap-1 font-mono text-sm text-accent transition-colors hover:text-text-primary"
            >
              request a topic...
            </Link>
          </div>
        ) : (
          <InsightFilters insights={insights} tags={tags} />
        )}
      </Container>
    </div>
  );
}
