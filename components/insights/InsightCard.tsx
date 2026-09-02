import { Reveal } from "@/components/fx/Reveal";
import { SpotlightCard } from "@/components/fx/SpotlightCard";
import { InsightCardBody } from "@/components/insights/InsightCardBody";
import type { Insight } from "@/lib/insights";

export function InsightCard({
  insight,
  delay = 0,
}: {
  insight: Insight;
  delay?: number;
}) {
  return (
    <Reveal delay={delay}>
      <SpotlightCard>
        <InsightCardBody insight={insight} />
      </SpotlightCard>
    </Reveal>
  );
}
