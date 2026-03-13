import type { Plugin } from "vite";

const SITE_URL = "https://resizelab.app";

const staticPages = [
  { loc: "/", changefreq: "weekly", priority: "1.0" },
  { loc: "/image-resizer", changefreq: "monthly", priority: "0.9" },
  { loc: "/blog", changefreq: "weekly", priority: "0.9" },
  { loc: "/gallery", changefreq: "monthly", priority: "0.8" },
  { loc: "/guides", changefreq: "weekly", priority: "0.8" },
  { loc: "/about", changefreq: "monthly", priority: "0.7" },
  { loc: "/contact", changefreq: "monthly", priority: "0.7" },
  { loc: "/privacy", changefreq: "yearly", priority: "0.5" },
  { loc: "/terms", changefreq: "yearly", priority: "0.5" },
];

export function sitemapPlugin(): Plugin {
  return {
    name: "vite-plugin-sitemap",
    apply: "build",
    async closeBundle() {
      const fs = await import("fs");
      const path = await import("path");

      const today = new Date().toISOString().split("T")[0];
      let blogEntries: { slug: string; lastmod: string }[] = [];

      // Fetch published blog posts from Supabase
      try {
        const supabaseUrl = process.env.VITE_SUPABASE_URL;
        const supabaseKey = process.env.VITE_SUPABASE_PUBLISHABLE_KEY;

        if (supabaseUrl && supabaseKey) {
          const res = await fetch(
            `${supabaseUrl}/rest/v1/blog_posts?select=slug,updated_at,created_at&is_published=eq.true`,
            {
              headers: {
                apikey: supabaseKey,
                Authorization: `Bearer ${supabaseKey}`,
              },
            }
          );
          if (res.ok) {
            const posts = (await res.json()) as any[];
            blogEntries = posts.map((p: any) => ({
              slug: p.slug,
              lastmod: (p.updated_at || p.created_at || today).split("T")[0],
            }));
            console.log(`[sitemap] Fetched ${blogEntries.length} published blog posts`);
          }
        }
      } catch (e) {
        console.warn("[sitemap] Could not fetch blog posts, using static pages only:", e);
      }

      let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

      for (const page of staticPages) {
        xml += `
  <url>
    <loc>${SITE_URL}${page.loc}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`;
      }

      for (const post of blogEntries) {
        xml += `
  <url>
    <loc>${SITE_URL}/blog/${post.slug}</loc>
    <lastmod>${post.lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`;
      }

      xml += `
</urlset>`;

      const outDir = path.default.resolve(process.cwd(), "dist");
      fs.default.writeFileSync(path.default.join(outDir, "sitemap.xml"), xml, "utf-8");
      console.log(`[sitemap] Generated sitemap.xml with ${staticPages.length + blogEntries.length} URLs`);
    },
  };
}
