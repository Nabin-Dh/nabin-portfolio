import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { ProjectFilters } from "@/components/projects/ProjectFilters";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Infrastructure projects by Nabin Dhungana — enterprise networking and Azure cloud architecture designs.",
  alternates: {
    canonical: "/projects",
  },
};

export default function ProjectsPage() {
  return (
    <div className="flex flex-col">
      <PageHeader
        eyebrow="/projects"
        title="Projects"
        description="Selected infrastructure designs across enterprise networking and Azure cloud architecture."
      />

      <Container className="py-16 sm:py-24">
        <ProjectFilters />
      </Container>
    </div>
  );
}
