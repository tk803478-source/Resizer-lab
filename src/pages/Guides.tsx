import { Helmet } from "react-helmet-async";
import { Layout } from "@/components/layout/Layout";

import { getAllBlogPosts } from "@/data/blogPosts";
import { Link } from "react-router-dom";
import { FileText, ArrowRight, Image, BookOpen, Zap, Shield, Target, TrendingUp, CheckCircle2 } from "lucide-react";

const categories = [
  {
    title: "Getting Started",
    description: "Essential guides for beginners learning image optimization",
    icon: BookOpen,
    articles: [
      'how-to-resize-images-without-losing-quality',
      'best-image-formats-jpeg-png-webp-compared',
      'image-resolution-dpi-explained',
    ]
  },
  {
    title: "Web & Performance",
    description: "Optimize images for faster websites and better user experience",
    icon: Zap,
    articles: [
      'optimize-images-website-speed',
      'image-compression-guide-reduce-file-size',
      'seo-benefits-optimized-images',
    ]
  },
  {
    title: "Social Media & E-commerce",
    description: "Platform-specific image guides for maximum engagement",
    icon: Target,
    articles: [
      'social-media-image-sizes-guide',
      'ecommerce-product-image-optimization',
    ]
  },
  {
    title: "Advanced Techniques",
    description: "For professionals and power users seeking mastery",
    icon: TrendingUp,
    articles: [
      'batch-image-resizing-tips',
      'understanding-aspect-ratios-images',
    ]
  }
];

const learningPaths = [
  {
    title: "Complete Beginner",
    description: "New to image optimization? Start here with the fundamentals.",
    steps: [
      "Learn about image formats (JPEG, PNG, WEBP)",
      "Understand resolution and dimensions",
      "Master basic resizing techniques",
      "Practice with our free tool"
    ],
    time: "~30 minutes"
  },
  {
    title: "Web Developer",
    description: "Optimize images for faster websites and better SEO.",
    steps: [
      "Understand Core Web Vitals impact",
      "Learn compression strategies",
      "Implement lazy loading",
      "Master responsive images"
    ],
    time: "~45 minutes"
  },
  {
    title: "Social Media Manager",
    description: "Perfect your images for every social platform.",
    steps: [
      "Learn platform-specific dimensions",
      "Optimize for mobile viewing",
      "Balance quality and file size",
      "Create templates for efficiency"
    ],
    time: "~30 minutes"
  }
];

export default function Guides() {
  const allPosts = getAllBlogPosts();
  
  const getPostBySlug = (slug: string) => allPosts.find(p => p.slug === slug);

  return (
    <Layout>
      <Helmet>
        <title>Image Optimization Guides & Tutorials | Resizer Lab</title>
        <meta name="description" content="Learn image resizing, compression, and optimization. Guides for websites, social media, and e-commerce. Free tutorials for all skill levels." />
        <meta name="keywords" content="image resizing guide, image optimization tutorial, photo compression guide, web image best practices" />
        <link rel="canonical" href="https://resizerlab.lovable.app/guides" />
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
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              Comprehensive tutorials and best practices for image optimization, resizing, and web performance. From beginner basics to advanced techniques, we've got you covered.
            </p>
          </div>
        </section>
      </div>

      <section className="container py-12">
        {/* Quick Tool CTA */}
        <div className="mb-12 rounded-2xl border border-primary/20 bg-accent/30 p-6 md:p-8 text-center">
          <h2 className="text-xl font-semibold mb-2">Ready to Resize Your Images?</h2>
          <p className="text-muted-foreground mb-4 max-w-xl mx-auto">
            Put your knowledge into practice with our free online image resizer—fast, private, and no signup required.
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg gradient-primary text-primary-foreground font-medium hover:opacity-90 transition-opacity"
          >
            <Image className="h-5 w-5" />
            Resize Images Now
          </Link>
        </div>

        {/* Learning Paths Section */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-center mb-4">
            Choose Your <span className="text-gradient">Learning Path</span>
          </h2>
          <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-8">
            Not sure where to start? Pick a learning path based on your goals and current experience level.
          </p>
          
          <div className="grid gap-6 md:grid-cols-3">
            {learningPaths.map((path, i) => (
              <div
                key={path.title}
                className="rounded-xl border border-border bg-card p-6 animate-fade-in"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <h3 className="font-bold text-lg mb-2">{path.title}</h3>
                <p className="text-sm text-muted-foreground mb-4">{path.description}</p>
                <ul className="space-y-2 mb-4">
                  {path.steps.map((step, j) => (
                    <li key={j} className="flex items-start gap-2 text-sm">
                      <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-muted-foreground">{step}</span>
                    </li>
                  ))}
                </ul>
                <div className="text-xs text-muted-foreground">
                  Estimated time: {path.time}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Guide Categories */}
        <div className="space-y-12">
          {categories.map((category, categoryIndex) => {
            const CategoryIcon = category.icon;
            return (
              <div key={category.title} className="animate-fade-in" style={{ animationDelay: `${categoryIndex * 100}ms` }}>
                <div className="mb-6 flex items-start gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent flex-shrink-0">
                    <CategoryIcon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold">{category.title}</h2>
                    <p className="text-muted-foreground">{category.description}</p>
                  </div>
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
            );
          })}
        </div>
      </section>

      {/* Introduction Content */}
      <section className="container py-12 border-t border-border">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-2xl font-bold mb-6 text-center">
            Why Learn <span className="text-gradient">Image Optimization</span>?
          </h2>
          
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <p>
              In today's digital world, images are everywhere—on websites, social media, e-commerce stores, emails, and mobile apps. Yet many people overlook the importance of proper image optimization, leading to slow-loading pages, poor user experiences, and missed opportunities for engagement.
            </p>
            
            <p>
              Learning image optimization isn't just for web developers or professional photographers. It's a valuable skill for anyone who works with digital content. Whether you're running a personal blog, managing a company's social media presence, selling products online, or simply sharing photos with friends and family, understanding how to properly resize and optimize images will help you communicate more effectively.
            </p>

            <h3>The Impact of Optimized Images</h3>
            <p>
              Properly optimized images can dramatically improve your digital presence. For websites, optimized images lead to faster page load times, which directly impacts search engine rankings, user engagement, and conversion rates. Studies consistently show that even a one-second delay in page loading can result in significant drops in user satisfaction and conversions.
            </p>
            <p>
              On social media, correctly sized images appear more professional and are more likely to be shared. E-commerce listings with high-quality, properly sized product images consistently outperform those with poorly optimized images. And for email marketing, optimized images ensure your messages load quickly and display correctly across all devices and email clients.
            </p>

            <h3>What Our Guides Cover</h3>
            <p>
              Our comprehensive guide collection covers everything from the absolute basics to advanced optimization techniques. You'll learn about different image formats and when to use each one, understand the relationship between resolution, dimensions, and file size, and master techniques for maintaining image quality during resizing.
            </p>
            <p>
              We also dive into platform-specific optimization for social media, e-commerce, and web development. Each guide is written with practical, real-world applications in mind, so you can immediately apply what you learn to your own projects.
            </p>

            <h3>A Practical Approach to Learning</h3>
            <p>
              We believe in learning by doing. That's why each guide includes practical examples and actionable advice you can implement right away. We don't just explain theory—we show you exactly how to apply these concepts to real-world scenarios. And with our free browser-based image resizer, you can practice what you learn without any software installation or account creation.
            </p>
          </div>
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

      {/* CTA Section */}
      <section className="container py-12">
        <div className="mx-auto max-w-3xl">
          <div className="rounded-2xl gradient-primary p-8 text-center text-primary-foreground">
            <h3 className="text-2xl font-bold mb-3">Ready to Practice?</h3>
            <p className="text-primary-foreground/90 max-w-xl mx-auto mb-6">
              The best way to learn is by doing. Try our free image resizer and apply the techniques you've learned from our guides.
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
    </Layout>
  );
}
