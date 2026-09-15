const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.nabin-dhungana.com.np";

export const SITE = {
  name: "Nabin Dhungana",
  tagline: "Networking, systems, security, and cloud infrastructure.",
  description:
    "Portfolio of Nabin Dhungana — an infrastructure engineer working across networking, systems, security, and cloud, with a growing focus on cloud architecture.",
  url: SITE_URL,
  email: "nabinnd@gmail.com",
  socials: {
    linkedin: "https://www.linkedin.com/in/nabin-dhungana",
    github: "https://github.com/Nabin-Dh",
    credly: "https://www.credly.com/users/nabindhungana",
  },
} as const;

export const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/insights", label: "Insights" },
  { href: "/contact", label: "Contact" },
] as const;
