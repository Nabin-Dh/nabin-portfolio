const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://nabindhungana.com";

export const SITE = {
  name: "Nabin Dhungana",
  role: "System & Network Engineer | Aspiring Cloud Solutions Architect",
  headline: "System & Network Engineer | Aspiring Cloud Solutions Architect",
  description:
    "Nabin Dhungana is a System & Network Engineer focused on enterprise networking, system administration, cloud infrastructure, virtualization, and cybersecurity. His long-term career direction is Cloud Solutions Architecture, with strong hands-on interest in designing reliable, secure, and scalable infrastructure.",
  url: SITE_URL,
  email: "nabinndh@gmail.com",
  socials: {
    linkedin: "https://www.linkedin.com/in/nabin-dhungana",
    github: "https://github.com/Nabin-Dh",
    credly: "https://www.credly.com/users/nabindhungana",
  },
} as const;

export const NAV_LINKS = [
  { href: "/about", label: "About" },
  { href: "/expertise", label: "Expertise" },
  { href: "/experience", label: "Experience" },
  { href: "/projects", label: "Projects" },
  { href: "/insights", label: "Insights" },
  { href: "/credentials", label: "Credentials" },
  { href: "/contact", label: "Contact" },
] as const;

export const CV_PATH = "/cv";
