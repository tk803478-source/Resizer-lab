import { useParams, Link, Navigate } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { usePublicBlogPost, usePublicBlogPosts } from "@/hooks/usePublicBlogPosts";
import { Calendar, Clock, ArrowLeft, ArrowRight, Loader2 } from "lucide-react";
import { Helmet } from "react-helmet-async";

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const { data: post, isLoading } = usePublicBlogPost(slug || "");
  const { data: allPosts = [] } = usePublicBlogPosts();

  if (isLoading) {
    return (
      <Layout>
        <div className="flex justify-center py-32">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </Layout>
    );
  }

  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  const currentIndex = allPosts.findIndex(p => p.slug === slug);
  const prevPost = currentIndex > 0 ? allPosts[currentIndex - 1] : null;
  const nextPost = currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null;

  return (
    <Layout>
      <Helmet>
        <title>{post.meta_title || post.title} | Resizer Lab</title>
        <meta name="description" content={post.meta_description || post.excerpt || ''} />
        {post.keywords && <meta name="keywords" content={post.keywords.join(', ')} />}
        <meta property="og:title" content={post.meta_title || post.title} />
        <meta property="og:description" content={post.meta_description || post.excerpt || ''} />
        <meta property="og:type" content="article" />
        <meta property="article:published_time" content={post.created_at} />
        <link rel="canonical" href={`https://resizelab.app/blog/${post.slug}`} />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": post.title,
            "description": post.meta_description || post.excerpt,
            "datePublished": post.created_at,
            "author": {
              "@type": "Organization",
              "name": "Resizer Lab"
            },
            "publisher": {
              "@type": "Organization",
              "name": "Resizer Lab",
              "url": "https://resizelab.app"
            },
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": `https://resizelab.app/blog/${post.slug}`
            }
          })}
        </script>
      </Helmet>

      {post.featured_image && (
        <div className="w-full h-64 md:h-96 overflow-hidden">
          <img src={post.featured_image} alt={post.title} className="w-full h-full object-cover" />
        </div>
      )}

      <div className="gradient-hero">
        <section className="container py-12 md:py-16">
          <div className="mx-auto max-w-3xl animate-fade-in">
            <Link 
              to="/blog" 
              className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-6"
            >
              <ArrowLeft className="h-4 w-4" /> Back to Blog
            </Link>
            {post.category && (
              <span className="text-xs font-semibold uppercase tracking-wider text-primary mb-2 block">
                {post.category}
              </span>
            )}
            <h1 className="text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl">
              {post.title}
            </h1>
            <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              {post.author_name && (
                <span>{post.author_name}</span>
              )}
              <span className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                {new Date(post.publish_date || post.created_at).toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </span>
              {post.read_time && (
                <span className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {post.read_time}
                </span>
              )}
            </div>
            {post.tags && post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-4">
                {post.tags.map(tag => (
                  <span key={tag} className="px-2 py-1 text-xs bg-accent rounded-full text-accent-foreground">{tag}</span>
                ))}
              </div>
            )}
          </div>
        </section>
      </div>

      <article className="container py-12">
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <div 
              className="prose prose-lg max-w-none dark:prose-invert prose-headings:font-semibold prose-h1:text-3xl prose-h2:text-2xl prose-h2:mt-8 prose-h3:text-xl prose-p:text-muted-foreground prose-p:leading-relaxed prose-li:text-muted-foreground prose-strong:text-foreground prose-a:text-primary"
              dangerouslySetInnerHTML={{ __html: isHtmlContent(post.content) ? post.content : formatContent(post.content) }}
            />

            {/* Navigation */}
            <div className="mt-12 pt-8 border-t border-border grid gap-4 sm:grid-cols-2">
              {prevPost && (
                <Link
                  to={`/blog/${prevPost.slug}`}
                  className="group rounded-lg border border-border p-4 hover:border-primary/50 transition-colors"
                >
                  <span className="text-sm text-muted-foreground flex items-center gap-1">
                    <ArrowLeft className="h-4 w-4" /> Previous
                  </span>
                  <span className="mt-1 font-medium group-hover:text-primary transition-colors line-clamp-1">
                    {prevPost.title}
                  </span>
                </Link>
              )}
              {nextPost && (
                <Link
                  to={`/blog/${nextPost.slug}`}
                  className="group rounded-lg border border-border p-4 hover:border-primary/50 transition-colors sm:text-right"
                >
                  <span className="text-sm text-muted-foreground flex items-center gap-1 sm:justify-end">
                    Next <ArrowRight className="h-4 w-4" />
                  </span>
                  <span className="mt-1 font-medium group-hover:text-primary transition-colors line-clamp-1">
                    {nextPost.title}
                  </span>
                </Link>
              )}
            </div>
          </div>

          <aside className="space-y-6">
            <div className="rounded-xl border border-border bg-card p-6 sticky top-24">
              <h3 className="font-semibold mb-3">Try Resizer Lab</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Put this knowledge into practice. Resize images instantly in your browser.
              </p>
              <Link
                to="/"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg gradient-primary text-primary-foreground font-medium text-sm hover:opacity-90 transition-opacity w-full justify-center"
              >
                Resize Images Now
              </Link>
            </div>

            <div className="rounded-xl border border-border bg-card p-6">
              <h3 className="font-semibold mb-4">Related Articles</h3>
              <div className="space-y-3">
                {allPosts
                  .filter(p => p.slug !== slug)
                  .slice(0, 3)
                  .map(relatedPost => (
                    <Link
                      key={relatedPost.slug}
                      to={`/blog/${relatedPost.slug}`}
                      className="block text-sm hover:text-primary transition-colors line-clamp-2"
                    >
                      {relatedPost.title}
                    </Link>
                  ))}
              </div>
            </div>
          </aside>
        </div>
      </article>
    </Layout>
  );
}

function isHtmlContent(content: string): boolean {
  return /<[a-z][\s\S]*>/i.test(content);
}

function formatContent(content: string): string {
  let formatted = content
    .replace(/^# (.*$)/gim, '<h1>$1</h1>')
    .replace(/^## (.*$)/gim, '<h2>$1</h2>')
    .replace(/^### (.*$)/gim, '<h3>$1</h3>')
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/`([^`]+)`/g, '<code class="bg-muted px-1 py-0.5 rounded text-sm">$1</code>')
    .replace(/\n\n/g, '</p><p>')
    .replace(/^- (.*$)/gim, '<li>$1</li>')
    .replace(/(<li>.*<\/li>)/s, '<ul>$1</ul>')
    .replace(/\| (.*) \|/g, (match) => {
      const cells = match.split('|').filter(c => c.trim());
      return '<tr>' + cells.map(c => `<td class="border border-border px-3 py-2">${c.trim()}</td>`).join('') + '</tr>';
    });

  formatted += `
    <div class="mt-10 p-6 rounded-xl bg-accent/50 border border-border text-center">
      <p class="text-foreground font-semibold mb-2">Ready to resize your images?</p>
      <p class="text-sm text-muted-foreground mb-4">Try our free online image resizer – no signup required, 100% private.</p>
      <a href="/" class="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-primary text-primary-foreground font-medium text-sm hover:opacity-90 transition-opacity">
        Resize Images Now →
      </a>
    </div>
  `;

  return formatted;
}
