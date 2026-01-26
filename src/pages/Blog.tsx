import { Helmet } from "react-helmet-async";
import { Layout } from "@/components/layout/Layout";
import { AdPlaceholder } from "@/components/AdPlaceholder";
import { getAllBlogPosts } from "@/data/blogPosts";
import { Link } from "react-router-dom";
import { Calendar, Clock, ArrowRight, BookOpen, TrendingUp, Image, Zap, Shield } from "lucide-react";

export default function Blog() {
  const posts = getAllBlogPosts();

  return (
    <Layout>
      <Helmet>
        <title>Image Optimization Blog – Tips, Guides & Best Practices | Resizer Lab</title>
        <meta name="description" content="Expert guides on image resizing, compression, and optimization. Learn to resize images without quality loss for web, social media, and e-commerce." />
        <link rel="canonical" href="https://resizelab.app/blog" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Blog",
            "name": "Resizer Lab Blog",
            "description": "Expert guides on image resizing, compression, optimization, and social media image sizes.",
            "url": "https://resizelab.app/blog",
            "publisher": {
              "@type": "Organization",
              "name": "Resizer Lab",
              "url": "https://resizelab.app"
            }
          })}
        </script>
      </Helmet>
      <div className="gradient-hero">
        <section className="container py-12 md:py-16">
          <div className="mx-auto max-w-3xl text-center animate-fade-in">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl gradient-primary shadow-glow">
              <BookOpen className="h-8 w-8 text-primary-foreground" />
            </div>
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              Image Resizing <span className="text-gradient">Blog</span>
            </h1>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              Expert tips, comprehensive guides, and best practices for image optimization, resizing, and web performance. Learn everything you need to know about working with images.
            </p>
          </div>
        </section>
      </div>

      <AdPlaceholder position="banner" className="container mt-8" />

      <section className="container py-12">
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            {/* Featured Article Section */}
            <div className="mb-12">
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                Featured Articles
              </h2>
              <div className="grid gap-6">
                {posts.slice(0, 3).map((post, i) => (
                  <article
                    key={post.slug}
                    className="group rounded-xl border border-border bg-card p-6 transition-all duration-300 hover:border-primary/50 hover:shadow-lg animate-fade-in"
                    style={{ animationDelay: `${i * 50}ms` }}
                  >
                    <Link to={`/blog/${post.slug}`}>
                      <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">
                        {post.title}
                      </h3>
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

            {/* All Articles Section */}
            <div>
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-primary" />
                All Articles
              </h2>
              <div className="grid gap-4">
                {posts.slice(3).map((post, i) => (
                  <article
                    key={post.slug}
                    className="group rounded-lg border border-border bg-card p-4 transition-all duration-300 hover:border-primary/50 animate-fade-in"
                    style={{ animationDelay: `${(i + 3) * 50}ms` }}
                  >
                    <Link to={`/blog/${post.slug}`} className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <h3 className="font-semibold group-hover:text-primary transition-colors">
                          {post.title}
                        </h3>
                        <p className="mt-1 text-sm text-muted-foreground line-clamp-1">
                          {post.excerpt}
                        </p>
                        <div className="mt-2 flex items-center gap-3 text-xs text-muted-foreground">
                          <span>{post.readTime}</span>
                          <span>•</span>
                          <span>{new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                        </div>
                      </div>
                      <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0 mt-1" />
                    </Link>
                  </article>
                ))}
              </div>
            </div>
          </div>

          <aside className="space-y-6">
            <AdPlaceholder position="sidebar" />
            
            <div className="rounded-xl border border-border bg-card p-6">
              <h3 className="font-semibold mb-4">Popular Topics</h3>
              <div className="flex flex-wrap gap-2">
                {['Image Resizing', 'Compression', 'WEBP', 'Social Media', 'SEO', 'Web Performance', 'JPEG', 'PNG', 'Optimization', 'E-commerce'].map(tag => (
                  <span key={tag} className="px-3 py-1 text-sm bg-accent rounded-full text-accent-foreground">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="rounded-xl border border-border bg-card p-6">
              <h3 className="font-semibold mb-3">Try Our Tool</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Resize images instantly in your browser. Free, fast, and 100% private—no uploads required.
              </p>
              <Link
                to="/"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg gradient-primary text-primary-foreground font-medium text-sm hover:opacity-90 transition-opacity"
              >
                <Image className="h-4 w-4" />
                Resize Images Now
              </Link>
            </div>

            <div className="rounded-xl border border-border bg-card p-6">
              <h3 className="font-semibold mb-4">Why Read Our Blog?</h3>
              <ul className="space-y-3 text-sm">
                <li className="flex items-start gap-2">
                  <Zap className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-muted-foreground">Learn optimization techniques that improve page speed</span>
                </li>
                <li className="flex items-start gap-2">
                  <Shield className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-muted-foreground">Understand image formats and when to use each</span>
                </li>
                <li className="flex items-start gap-2">
                  <TrendingUp className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-muted-foreground">Stay updated on best practices for web images</span>
                </li>
              </ul>
            </div>

            <div className="rounded-xl border border-border bg-card p-6">
              <h3 className="font-semibold mb-3">Browse Guides</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Looking for structured learning? Check out our organized guides section.
              </p>
              <Link
                to="/guides"
                className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
              >
                View All Guides <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </aside>
        </div>
      </section>

      {/* Blog Introduction Content */}
      <section className="container py-12 border-t border-border">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-2xl font-bold mb-6 text-center">
            Welcome to the <span className="text-gradient">Resizer Lab Blog</span>
          </h2>
          
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <p>
              Welcome to the Resizer Lab blog, your comprehensive resource for everything related to image optimization, resizing, and web performance. Whether you're a web developer looking to improve site speed, a social media manager seeking the perfect image dimensions, or a photographer wanting to optimize your portfolio, you'll find valuable insights and practical tips here.
            </p>

            <h3>What You'll Learn</h3>
            <p>
              Our blog covers a wide range of topics designed to help you master image optimization. We dive deep into subjects like understanding different image formats (JPEG, PNG, WEBP), maintaining image quality during resizing, optimizing images for SEO, and creating perfectly sized graphics for social media platforms. Each article is written with both beginners and experienced users in mind, providing actionable advice you can implement immediately.
            </p>

            <h3>Practical, Real-World Advice</h3>
            <p>
              Unlike generic tutorials, our content is based on real-world experience and testing. We don't just tell you what to do—we explain why certain approaches work better than others and help you understand the underlying principles. This knowledge empowers you to make informed decisions about image optimization, even in scenarios we haven't specifically covered.
            </p>

            <h3>Stay Updated with Best Practices</h3>
            <p>
              The world of web images is constantly evolving. New formats like AVIF are gaining browser support, Core Web Vitals are influencing SEO rankings, and social media platforms regularly update their recommended image sizes. Our blog keeps you informed about these changes so you can adapt your workflow accordingly and stay ahead of the curve.
            </p>

            <h3>From Basics to Advanced Techniques</h3>
            <p>
              Whether you're just learning about image compression or you're ready to implement advanced optimization strategies, our blog has content for every skill level. Start with our beginner guides to build a solid foundation, then progress to more advanced topics as you become comfortable with the fundamentals. We believe in building knowledge incrementally, so each article builds on concepts introduced in earlier posts.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container py-12">
        <div className="mx-auto max-w-3xl">
          <div className="rounded-2xl gradient-primary p-8 text-center text-primary-foreground">
            <h3 className="text-2xl font-bold mb-3">Ready to Apply What You've Learned?</h3>
            <p className="text-primary-foreground/90 max-w-xl mx-auto mb-6">
              Put your knowledge into practice with our free image resizer. No signup required—just fast, private, browser-based image processing.
            </p>
            <Link
              to="/"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-background text-foreground font-medium hover:bg-accent transition-colors"
            >
              Start Resizing Images →
            </Link>
          </div>
        </div>
      </section>

      <AdPlaceholder position="bottom" className="container mb-8" />
    </Layout>
  );
}
