import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const SITE_URL = "https://resizelab.app";

const staticPages = [
  { loc: "/", changefreq: "weekly", priority: "1.0" },
  { loc: "/image-resizer", changefreq: "monthly", priority: "0.9" },
  { loc: "/gallery", changefreq: "monthly", priority: "0.8" },
  { loc: "/guides", changefreq: "weekly", priority: "0.8" },
  { loc: "/blog", changefreq: "weekly", priority: "0.9" },
  { loc: "/about", changefreq: "monthly", priority: "0.7" },
  { loc: "/contact", changefreq: "monthly", priority: "0.7" },
  { loc: "/privacy", changefreq: "yearly", priority: "0.5" },
  { loc: "/terms", changefreq: "yearly", priority: "0.5" },
];

type BlogSitemapPost = {
  slug: string;
  updated_at: string | null;
  created_at: string | null;
};

const getDateOnly = (date: string | null | undefined, fallback: string) =>
  date ? new Date(date).toISOString().split("T")[0] : fallback;

const escapeXml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&apos;");

Deno.serve(async () => {
  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    const { data: posts, error } = await supabase
      .from("blog_posts")
      .select("slug, updated_at, created_at")
      .eq("is_published", true)
      .order("updated_at", { ascending: false });

    if (error) {
      throw error;
    }

    const today = new Date().toISOString().split("T")[0];

    let xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

    for (const page of staticPages) {
      xml += `\n  <url>\n    <loc>${escapeXml(`${SITE_URL}${page.loc}`)}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>${page.changefreq}</changefreq>\n    <priority>${page.priority}</priority>\n  </url>`;
    }

    const uniquePosts = new Map<string, BlogSitemapPost>();
    for (const post of (posts ?? []) as BlogSitemapPost[]) {
      const slug = (post.slug || "").trim();
      if (!slug) continue;
      if (!uniquePosts.has(slug)) {
        uniquePosts.set(slug, post);
      }
    }

    for (const post of uniquePosts.values()) {
      const encodedSlug = encodeURIComponent(post.slug.trim());
      const lastmod = getDateOnly(post.updated_at ?? post.created_at, today);
      xml += `\n  <url>\n    <loc>${escapeXml(`${SITE_URL}/blog/${encodedSlug}`)}</loc>\n    <lastmod>${lastmod}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>0.8</priority>\n  </url>`;
    }

    xml += "\n</urlset>";

    return new Response(xml, {
      headers: {
        "Content-Type": "application/xml; charset=utf-8",
        "Cache-Control": "public, max-age=900",
      },
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return new Response(`Error generating sitemap: ${message}`, { status: 500 });
  }
});
