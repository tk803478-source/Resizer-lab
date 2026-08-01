import { Helmet } from "react-helmet-async";

const SITE_URL = "https://resizerlab.lovable.app";

export interface Crumb {
  name: string;
  /** Path relative to site root, e.g. "/blog". Omit for the current page. */
  path?: string;
}

interface BreadcrumbSchemaProps {
  /** Trail after Home, in order. Home is added automatically. */
  items?: Crumb[];
}

export function BreadcrumbSchema({ items = [] }: BreadcrumbSchemaProps) {
  const trail: Crumb[] = [{ name: "Home", path: "/" }, ...items];

  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      ...(crumb.path ? { item: `${SITE_URL}${crumb.path === "/" ? "/" : crumb.path}` } : {}),
    })),
  };

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
  );
}
