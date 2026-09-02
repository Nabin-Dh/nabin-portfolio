import type { MDXComponents } from "mdx/types";

import { Link } from "@/components/ui/Link";

const components: MDXComponents = {
  h2: ({ id, children }) => (
    <h2 id={id} className="group scroll-mt-28">
      {children}
      {id ? (
        <a
          href={`#${id}`}
          aria-label="Link to this section"
          className="ml-2 font-mono text-sm text-text-secondary opacity-0 transition-opacity group-hover:opacity-100 focus-visible:opacity-100"
        >
          #
        </a>
      ) : null}
    </h2>
  ),
  h3: ({ id, children }) => (
    <h3 id={id} className="group scroll-mt-28">
      {children}
      {id ? (
        <a
          href={`#${id}`}
          aria-label="Link to this section"
          className="ml-2 font-mono text-xs text-text-secondary opacity-0 transition-opacity group-hover:opacity-100 focus-visible:opacity-100"
        >
          #
        </a>
      ) : null}
    </h3>
  ),
  a: ({ href, children }) =>
    href?.startsWith("http") ? (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-accent underline-offset-4 transition-colors hover:text-text-primary hover:underline"
      >
        {children}
      </a>
    ) : (
      <Link
        href={href ?? "#"}
        className="text-accent underline-offset-4 transition-colors hover:text-text-primary hover:underline"
      >
        {children}
      </Link>
    ),
};

export function useMDXComponents(): MDXComponents {
  return components;
}
