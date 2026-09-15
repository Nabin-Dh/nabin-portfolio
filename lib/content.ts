export type FocusArea = {
  title: string;
  icon: "network" | "systems" | "cloud" | "security";
  description: string;
};

export const FOCUS_INTRO =
  "My work and learning span the core areas of modern infrastructure, from networking and systems to cloud and security.";

export const FOCUS_AREAS: FocusArea[] = [
  {
    title: "Networking",
    icon: "network",
    description:
      "Network infrastructure, connectivity, routing, switching, segmentation, and secure access.",
  },
  {
    title: "Systems",
    icon: "systems",
    description:
      "Windows and Linux environments, virtualization, administration, and infrastructure operations.",
  },
  {
    title: "Cloud",
    icon: "cloud",
    description:
      "Cloud infrastructure, networking, identity, security, and architecture across Azure and AWS.",
  },
  {
    title: "Security",
    icon: "security",
    description:
      "Security fundamentals across infrastructure, access control, hardening, monitoring, and network environments.",
  },
];

export const PROFILE = {
  name: "Nabin Dhungana",
  intro:
    "I work across networking, systems, cloud, and security. My background is hands-on network and systems administration; my focus now is moving that experience toward cloud infrastructure and architecture.",
  bio: "I have two-plus years of hands-on experience working across networking, cybersecurity, systems engineering, infrastructure, and cloud. My foundation is in network and systems administration — troubleshooting, operations, and keeping infrastructure running. My current direction is increasingly focused on cloud infrastructure and cloud architecture: designing secure, scalable, and maintainable environments.",
  direction:
    "My focus is on infrastructure that is reliable first and simple to operate. I build up from hands-on network and systems work, and I am steering that experience toward cloud architecture so the environments I help design are secure, scalable, and maintainable.",
  keywords: [
    "network engineering",
    "system administration",
    "cloud infrastructure",
    "cybersecurity",
    "Azure",
    "infrastructure",
  ],
} as const;

export const ENGINEERING_APPROACH = [
  {
    title: "Reliable by design",
    description:
      "Infrastructure should keep working without someone watching it — redundancy, monitoring, and verified recovery paths come first.",
  },
  {
    title: "Secure by default",
    description:
      "Security is engineered in — least privilege, segmentation, and defense-in-depth — rather than bolted on afterward.",
  },
  {
    title: "Simple over clever",
    description:
      "The best solution is the one the next engineer can pick up and operate. Clear, documented, and boring where possible.",
  },
  {
    title: "Continuously learning",
    description:
      "Cloud and networking change quickly. Certification paths and hands-on labs are how I keep fundamentals sharp.",
  },
];

export type Certification = {
  title: string;
  issuer: string;
  issuedYear?: string;
  expiresYear?: string;
};

export const CERTIFICATIONS: Certification[] = [
  {
    title: "Microsoft Certified: Azure Fundamentals (AZ-900)",
    issuer: "Microsoft",
  },
  {
    title: "Microsoft Certified: Azure Administrator Associate (AZ-104)",
    issuer: "Microsoft",
  },
  {
    title: "Google Cybersecurity Professional Certificate",
    issuer: "Google",
    issuedYear: "2025",
  },
  {
    title: "Aviatrix Certified Engineer – Multicloud Network Associate",
    issuer: "Aviatrix",
    issuedYear: "September 2025",
    expiresYear: "September 2028",
  },
  {
    title: "Red Hat System Administration I (RH124)",
    issuer: "Red Hat",
    issuedYear: "June 2025",
  },
];

export type Project = {
  slug: string;
  title: string;
  category: "networking" | "cloud";
  description: string;
  overview: string;
  technologies: string[];
  repository: string;
  /**
   * Optional case-study sections shown on the detail page when provided.
   * Leave undefined (or empty arrays) to keep the current concise layout.
   */
  context?: string;
  objective?: string;
  approach?: string;
  outcomes?: string;
};

export const PROJECTS: Project[] = [
  {
    slug: "enterprise-campus-network",
    title: "Enterprise Campus Network Architecture",
    category: "networking",
    description:
      "Enterprise three-tier campus network architecture demonstrating enterprise networking design and implementation.",
    overview:
      "A three-tier campus network architecture covering LAN design, redundancy, inter-VLAN routing, WAN/dual-ISP connectivity, and network security at the access layer.",
    technologies: [
      "VLAN",
      "Inter-VLAN Routing",
      "OSPF",
      "HSRP",
      "EtherChannel",
      "Dual ISP",
      "NAT/PAT",
      "IPv4",
      "IPv6",
      "ACL",
      "Wireless LAN Controller",
      "Port Security",
      "DHCP Snooping",
      "Dynamic ARP Inspection",
    ],
    repository:
      "https://github.com/Nabin-Dh/enterprise-campus-network-architecture",
  },
  {
    slug: "azure-enterprise-infrastructure",
    title: "Azure Enterprise Infrastructure Architecture",
    category: "cloud",
    description:
      "Enterprise-style Microsoft Azure infrastructure architecture focused on secure cloud networking and infrastructure services.",
    overview:
      "A secure Azure reference architecture using segmented virtual networking, bastion-based remote access, network security groups, and integrated observability and backup services.",
    technologies: [
      "Azure Virtual Network",
      "Subnet Segmentation",
      "Azure Bastion",
      "Windows Virtual Machine",
      "Linux Virtual Machine",
      "Network Security Groups",
      "Azure Files",
      "Recovery Services Vault",
      "Azure Monitor",
      "Log Analytics",
      "Azure RBAC",
      "Azure Key Vault",
    ],
    repository:
      "https://github.com/Nabin-Dh/azure-enterprise-infrastructure-architecture",
  },
];
