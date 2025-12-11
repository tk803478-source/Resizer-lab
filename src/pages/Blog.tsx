import { Layout } from "@/components/layout/Layout";
import { AdPlaceholder } from "@/components/AdPlaceholder";
import { getAllBlogPosts } from "@/data/blogPosts";
import { Link } from "react-router-dom";
import { Calendar, Clock, ArrowRight } from "lucide-react";

export default function Blog() {
  const posts = getAllBlogPosts();

  return (
    <Layout>
      <div className="gradient-hero">
        <section className="container py-12 md:py-16">
          <div className="mx-auto max-w-3xl text-center animate-fade-in">
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              Image Resizing <span className="text-gradient">Blog</span>
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              Tips, guides, and best practices for image optimization, resizing, and web performance.
            </p>
          </div>
        </section>
      </div>

      <AdPlaceholder position="banner" className="container mt-8" />

      <section className="container py-12">
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <div className="grid gap-6">
              {posts.map((post, i) => (
                <article
                  key={post.slug}
                  className="group rounded-xl border border-border bg-card p-6 transition-all duration-300 hover:border-primary/50 hover:shadow-lg animate-fade-in"
                  style={{ animationDelay: `${i * 50}ms` }}
                >
                  <Link to={`/blog/${post.slug}`}>
                    <h2 className="text-xl font-semibold group-hover:text-primary transition-colors">
                      {post.title}
                    </h2>
                    <p className="mt-3 text-muted-foreground line-clamp-2">
                      {post.excerpt}
                    </p>
                    <div className="mt-4 flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {new Date(post.date).toLocaleDateString('en-US', { 
                          year: 'numeric', 
                          month: 'short', 
                          day: 'numeric' 
                        })}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {post.readTime}
                      </span>
                    </div>
                    <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary">
                      Read more <ArrowRight className="h-4 w-4" />
                    </span>
                  </Link>
                </article>
              ))}
            </div>
          </div>

          <aside className="space-y-6">
            <AdPlaceholder position="sidebar" />
            
            <div className="rounded-xl border border-border bg-card p-6">
              <h3 className="font-semibold mb-4">Popular Topics</h3>
              <div className="flex flex-wrap gap-2">
                {['Image Resizing', 'Compression', 'WEBP', 'Social Media', 'SEO', 'Web Performance'].map(tag => (
                  <span key={tag} className="px-3 py-1 text-sm bg-accent rounded-full text-accent-foreground">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="rounded-xl border border-border bg-card p-6">
              <h3 className="font-semibold mb-3">Try Our Tool</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Resize images instantly in your browser. Free, fast, and 100% private.
              </p>
              <Link
                to="/"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg gradient-primary text-primary-foreground font-medium text-sm hover:opacity-90 transition-opacity"
              >
                Resize Images Now
              </Link>
            </div>
          </aside>
        </div>
      </section>

      <AdPlaceholder position="bottom" className="container mb-8" />
    </Layout>
  );
}
