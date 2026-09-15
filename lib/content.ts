export type FocusArea = {
  title: string;
  icon: "network" | "systems" | "cloud" | "security";
  summary: string;
  points: string[];
};

export const FOCUS_AREAS: FocusArea[] = [
  {
    title: "Networking",
    icon: "network",
    summary:
      "Enterprise networking — routing, switching, IP addressing, and access-layer security.",
    points: [
      "Routing & switching",
      "IP addressing & VLAN segmentation",
      "Access-layer security",
      "Wireless networking",
    ],
  },
  {
    title: "Systems",
    icon: "systems",
    summary:
      "Windows and Linux servers across physical and virtualized environments.",
    points: [
      "Windows & Linux administration",
      "Virtualization (VMware ESXi)",
      "Infrastructure troubleshooting",
      "Patch & lifecycle management",
    ],
  },
  {
    title: "Cloud",
    icon: "cloud",
    summary:
      "Secure, scalable cloud infrastructure on Microsoft Azure — with a growing focus on cloud architecture.",
    points: [
      "Azure virtual networking",
      "Identity & access (RBAC)",
      "Security & observability",
      "Multi-cloud fundamentals (AWS)",
    ],
  },
  {
    title: "Security",
    icon: "security",
    summary:
      "Network security, hardening, and least privilege informed by modern security frameworks.",
    points: [
      "Network security controls",
      "System hardening",
      "Identity & access fundamentals",
      "Zero-trust principles",
    ],
  },
];

export const PROFILE = {
  name: "Nabin Dhungana",
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
