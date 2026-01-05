import { Helmet } from "react-helmet-async";
import { Layout } from "@/components/layout/Layout";
import { AdPlaceholder } from "@/components/AdPlaceholder";
import { getAllBlogPosts } from "@/data/blogPosts";
import { Link } from "react-router-dom";
import { FileText, ArrowRight, Image } from "lucide-react";

const categories = [
  {
    title: "Getting Started",
    description: "Essential guides for beginners",
    articles: [
      'how-to-resize-images-without-losing-quality',
      'best-image-formats-jpeg-png-webp-compared',
      'image-resolution-dpi-explained',
    ]
  },
  {
    title: "Web & Performance",
    description: "Optimize images for faster websites",
    articles: [
      'optimize-images-website-speed',
      'image-compression-guide-reduce-file-size',
      'seo-benefits-optimized-images',
    ]
  },
  {
    title: "Social Media & E-commerce",
    description: "Platform-specific image guides",
    articles: [
      'social-media-image-sizes-guide',
      'ecommerce-product-image-optimization',
    ]
  },
  {
    title: "Advanced Techniques",
    description: "For professionals and power users",
    articles: [
      'batch-image-resizing-tips',
      'understanding-aspect-ratios-images',
    ]
  }
];

export default function Guides() {
  const allPosts = getAllBlogPosts();
  
  const getPostBySlug = (slug: string) => allPosts.find(p => p.slug === slug);

  return (
    <Layout>
      <Helmet>
        <title>Image Resizing Guides & Tutorials | ResizeLab</title>
        <meta name="description" content="Comprehensive guides on image resizing, optimization, compression, and web performance. Learn best practices for websites, social media, and e-commerce." />
        <meta name="keywords" content="image resizing guide, image optimization tutorial, photo compression guide, web image best practices" />
        <link rel="canonical" href="https://resizelab.app/guides" />
      </Helmet>

      <div className="gradient-hero">
        <section className="container py-12 md:py-16">
          <div className="mx-auto max-w-3xl text-center animate-fade-in">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl gradient-primary shadow-glow">
              <FileText className="h-8 w-8 text-primary-foreground" />
            </div>
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              Image Resizing <span className="text-gradient">Guides</span>
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              Comprehensive tutorials and best practices for image optimization, resizing, and web performance.
            </p>
          </div>
        </section>
      </div>

      <AdPlaceholder position="banner" className="container mt-8" />

      <section className="container py-12">
        {/* Quick Tool CTA */}
        <div className="mb-12 rounded-2xl border border-primary/20 bg-accent/30 p-6 md:p-8 text-center">
          <h2 className="text-xl font-semibold mb-2">Ready to Resize Your Images?</h2>
          <p className="text-muted-foreground mb-4">
            Try our free online image resizer—fast, private, and no signup required.
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg gradient-primary text-primary-foreground font-medium hover:opacity-90 transition-opacity"
          >
            <Image className="h-5 w-5" />
            Resize Images Now
          </Link>
        </div>

        {/* Guide Categories */}
        <div className="space-y-12">
          {categories.map((category, categoryIndex) => (
            <div key={category.title} className="animate-fade-in" style={{ animationDelay: `${categoryIndex * 100}ms` }}>
              <div className="mb-6">
                <h2 className="text-2xl font-bold">{category.title}</h2>
                <p className="text-muted-foreground">{category.description}</p>
              </div>
              
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {category.articles.map((slug) => {
                  const post = getPostBySlug(slug);
                  if (!post) return null;
                  
                  return (
                    <Link
                      key={slug}
                      to={`/blog/${slug}`}
                      className="group rounded-xl border border-border bg-card p-5 transition-all duration-300 hover:border-primary/50 hover:shadow-md"
                    >
                      <h3 className="font-semibold group-hover:text-primary transition-colors line-clamp-2">
                        {post.title}
                      </h3>
                      <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
                        {post.excerpt}
                      </p>
                      <div className="mt-4 flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">{post.readTime}</span>
                        <span className="flex items-center gap-1 text-primary font-medium">
                          Read <ArrowRight className="h-4 w-4" />
                        </span>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* All Articles Section */}
      <section className="container py-12 border-t border-border">
        <div className="mb-8">
          <h2 className="text-2xl font-bold">All Guides & Tutorials</h2>
          <p className="text-muted-foreground">Browse our complete library of image optimization resources</p>
        </div>
        
        <div className="grid gap-4 sm:grid-cols-2">
          {allPosts.map((post) => (
            <Link
              key={post.slug}
              to={`/blog/${post.slug}`}
              className="group flex gap-4 rounded-lg border border-border p-4 hover:border-primary/50 transition-colors"
            >
              <div className="flex-1">
                <h3 className="font-medium group-hover:text-primary transition-colors line-clamp-1">
                  {post.title}
                </h3>
                <p className="mt-1 text-sm text-muted-foreground line-clamp-1">
                  {post.excerpt}
                </p>
              </div>
              <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0 mt-1" />
            </Link>
          ))}
        </div>
      </section>

      <AdPlaceholder position="bottom" className="container mb-8" />
    </Layout>
  );
}
