export type SkillCategory = {
  title: string;
  description: string;
  skills: string[];
};

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: "Networking",
    description:
      "Designing, implementing, and troubleshooting enterprise networks.",
    skills: [
      "Network Administration",
      "TCP/IP & IP Addressing",
      "Routing & Switching",
      "Inter-VLAN Routing",
      "Wireless Networking",
      "Network Security",
    ],
  },
  {
    title: "Systems & Infrastructure",
    description:
      "Administering servers and operating systems across physical and virtualized environments.",
    skills: [
      "System Administration",
      "Windows & Linux",
      "Virtualization",
      "Infrastructure Troubleshooting",
      "Patch & Lifecycle Management",
    ],
  },
  {
    title: "Cloud & Virtualization",
    description:
      "Designing and securing cloud and virtualized infrastructure, applied on Azure and AWS.",
    skills: [
      "Cloud Infrastructure",
      "Virtual Networking",
      "Subnet Segmentation",
      "IaaS Compute",
      "Observability & Monitoring",
    ],
  },
  {
    title: "Cybersecurity",
    description:
      "Securing networks and infrastructure with awareness of modern threats.",
    skills: [
      "Cybersecurity",
      "Network Security",
      "Security Hardening",
      "Identity & Access (RBAC)",
      "Zero-Trust Fundamentals",
    ],
  },
  {
    title: "IT Operations & Technical Support",
    description:
      "Day-to-day reliability, documentation, and hands-on problem solving that keeps infrastructure running.",
    skills: [
      "Infrastructure Design",
      "Backup & Recovery",
      "Documentation",
      "Technical Problem Solving",
    ],
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

export type Role = {
  title: string;
  company: string;
  start: string;
  end?: string;
  summary: string;
};

export const EMPLOYMENT: Role[] = [
  {
    title: "System & Network Engineer",
    company: "Rolling Plans Pvt. Ltd.",
    start: "July 2026",
    summary:
      "Working as a System & Network Engineer focused on enterprise networking, system administration, cloud infrastructure, virtualization, and cybersecurity.",
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

export const PROFILE = {
  name: "Nabin Dhungana",
  role: "System & Network Engineer",
  company: "Rolling Plans Pvt. Ltd.",
  roleStart: "July 2026",
  bio: "Nabin Dhungana is a System & Network Engineer focused on enterprise networking, system administration, cloud infrastructure, virtualization, and cybersecurity. His long-term career direction is Cloud Solutions Architecture, with strong hands-on interest in designing reliable, secure, and scalable infrastructure.",
  keywords: [
    "system administration",
    "network engineering",
    "cybersecurity",
    "cloud technologies",
    "Azure",
    "AWS",
    "infrastructure",
    "technical problem solving",
  ],
} as const;

export type ProfessionalDomain = {
  title: string;
  icon: "network" | "systems" | "security" | "cloud" | "infrastructure";
  summary: string;
  capabilities: string[];
};

export const DOMAINS: ProfessionalDomain[] = [
  {
    title: "Network Engineering",
    icon: "network",
    summary:
      "Designing, implementing, and troubleshooting enterprise networks — LAN switching, routing, and Layer 2 security.",
    capabilities: [
      "Network administration",
      "TCP/IP & IP addressing",
      "Routing & switching",
      "Inter-VLAN routing & redundancy",
      "Network security (ACL, port security)",
      "Wireless networking",
    ],
  },
  {
    title: "Systems Administration",
    icon: "systems",
    summary:
      "Administering servers and operating systems across physical and virtualized environments, focused on availability.",
    capabilities: [
      "System administration",
      "Windows & Linux",
      "Virtualization (VMware ESXi)",
      "Infrastructure troubleshooting",
      "Patch & lifecycle management",
    ],
  },
  {
    title: "Cybersecurity",
    icon: "security",
    summary:
      "Securing networks and infrastructure with awareness of modern threats, defense-in-depth, and least privilege.",
    capabilities: [
      "Network security",
      "Security hardening",
      "Identity & access (RBAC)",
      "Zero-trust fundamentals",
      "Incident awareness & reporting",
    ],
  },
  {
    title: "Cloud Infrastructure",
    icon: "cloud",
    summary:
      "Designing and securing scalable cloud infrastructure on Microsoft Azure, on the path toward cloud architecture.",
    capabilities: [
      "Azure virtual networking",
      "Subnet segmentation & NSGs",
      "IaaS compute (Windows/Linux)",
      "Azure networking best practices",
      "Multi-cloud fundamentals (AWS)",
    ],
  },
  {
    title: "Infrastructure & IT",
    icon: "infrastructure",
    summary:
      "End-to-end engineering of the systems, networks, and tools that keep organizations running.",
    capabilities: [
      "Infrastructure design",
      "Observability & monitoring",
      "Backup & recovery",
      "Documentation",
      "Technical problem solving",
    ],
  },
];

export type Education = {
  title: string;
  institution: string;
  issuedYear?: string;
  type: "certification" | "training";
};

export const EDUCATION: Education[] = [
  {
    title: "Google Cybersecurity Professional Certificate",
    institution: "Google",
    issuedYear: "2025",
    type: "certification",
  },
  {
    title: "Red Hat System Administration I (RH124)",
    institution: "Red Hat",
    issuedYear: "2025",
    type: "training",
  },
  {
    title: "Microsoft Certified: Azure Administrator Associate (AZ-104)",
    institution: "Microsoft",
    type: "certification",
  },
];

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

export type ExperienceDomain = {
  title: string;
  area: "network" | "systems" | "security" | "cloud" | "infrastructure";
  summary: string;
  focus: string[];
};

export const EXPERIENCE_DOMAINS: ExperienceDomain[] = [
  {
    title: "Network operations",
    area: "network",
    summary:
      "Hands-on experience with enterprise network administration — switching, routing, addressing, and access-layer security controls.",
    focus: [
      "Network administration",
      "Routing & switching",
      "Access-layer security",
    ],
  },
  {
    title: "Systems administration",
    area: "systems",
    summary:
      "Hands-on experience administering servers and virtualized systems across Windows and Linux environments.",
    focus: ["System administration", "Windows & Linux", "Virtualization"],
  },
  {
    title: "Security posture",
    area: "security",
    summary:
      "Technical experience applying network security principles and hardening fundamentals informed by security frameworks.",
    focus: ["Network security", "Hardening", "Least privilege"],
  },
  {
    title: "Cloud infrastructure",
    area: "cloud",
    summary:
      "Hands-on experience designing secure Azure infrastructure — networking, segmentation, IaaS, and observability.",
    focus: ["Azure networking", "Segmentation", "IaaS"],
  },
];
