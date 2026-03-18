import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Layout } from "@/components/layout/Layout";
import { 
  Shield, 
  Zap, 
  Lock, 
  Globe, 
  MonitorSmartphone,
  RefreshCw,
  Image,
  Heart,
  Users,
  Target,
  Lightbulb,
  CheckCircle2
} from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "100% Browser-Based",
    description:
      "All image processing happens directly in your browser using the Canvas API. Your images never leave your device, ensuring complete privacy and security.",
  },
  {
    icon: Zap,
    title: "Lightning Fast",
    description:
      "Resize images instantly without waiting for server uploads. Experience real-time processing with immediate results using your device's processing power.",
  },
  {
    icon: Lock,
    title: "Complete Privacy",
    description:
      "We don't store, collect, or have access to any of your images. Your files stay private and secure on your device—we literally cannot see them.",
  },
  {
    icon: Globe,
    title: "Works Offline",
    description:
      "Once loaded, the tool works without an internet connection. Perfect for working on the go or in areas with limited connectivity.",
  },
  {
    icon: MonitorSmartphone,
    title: "Responsive Design",
    description:
      "Optimized for both desktop and mobile devices. Resize images from anywhere, on any device, with the same great experience.",
  },
  {
    icon: RefreshCw,
    title: "Multiple Formats",
    description:
      "Export your resized images in JPEG, PNG, or WEBP formats with adjustable quality settings to match your needs.",
  },
];

const values = [
  {
    icon: Heart,
    title: "Privacy First",
    description: "We believe your data belongs to you. That's why we built a tool that processes everything locally—we never see your images."
  },
  {
    icon: Users,
    title: "Accessible to Everyone",
    description: "Image resizing should be free and easy for everyone. No technical skills required, no account needed, no hidden fees."
  },
  {
    icon: Target,
    title: "Simplicity Over Complexity",
    description: "We focus on doing one thing exceptionally well. No bloated features—just fast, reliable image resizing."
  },
  {
    icon: Lightbulb,
    title: "Continuous Improvement",
    description: "We're constantly listening to user feedback and improving our tool to better serve your image resizing needs."
  },
];

export default function About() {
  return (
    <Layout>
      <Helmet>
        <title>About Us – Browser-Based Image Resizer | Resizer Lab</title>
        <meta name="description" content="Learn about Resizer Lab, the free privacy-first image resizer. All processing happens in your browser – no uploads, no servers." />
        <link rel="canonical" href="https://resizerlab.lovable.app/about" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "Resizer Lab",
            "url": "https://resizerlab.lovable.app",
            "description": "Free browser-based image resizing tool focused on privacy and simplicity."
          })}
        </script>
      </Helmet>

      <div className="gradient-hero">
        {/* Hero */}
        <section className="container py-12 md:py-20">
          <div className="mx-auto max-w-3xl text-center animate-fade-in">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl gradient-primary shadow-glow">
              <Image className="h-8 w-8 text-primary-foreground" />
            </div>
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              About <span className="text-gradient">Resizer Lab</span>
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
              Resizer Lab is a free, privacy-focused image resizing tool that runs
              entirely in your browser. No uploads, no servers, no tracking—just
              fast, simple image resizing for everyone.
            </p>
          </div>
        </section>
      </div>

      {/* Our Story Section */}
      <section className="container py-12 md:py-16">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-center text-2xl font-bold mb-8">
            Our <span className="text-gradient">Story</span>
          </h2>
          
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <p>
              Resizer Lab was born out of a simple frustration: why do so many image resizing tools require you to upload your personal photos to unknown servers? Whether it's family vacation pictures, confidential business documents, or creative work-in-progress, the idea of sending private images to third-party servers never sat right with us.
            </p>
            <p>
              We knew there had to be a better way. Modern web browsers are incredibly powerful, capable of handling complex image processing tasks without any server involvement. So we set out to build an image resizing tool that respects user privacy by design—not as an afterthought, but as the core architecture.
            </p>
            <p>
              The result is Resizer Lab: a completely free, browser-based image resizer that processes your images locally on your device. When you use our tool, your images never leave your computer or phone. We literally cannot see your files because they never touch our servers. This zero-knowledge approach means you can resize sensitive images with complete confidence.
            </p>
            <p>
              Beyond privacy, we also focused on simplicity and speed. We stripped away unnecessary features and complicated interfaces to create a tool that anyone can use. Whether you're a professional photographer, a small business owner, a student, or just someone who needs to resize a photo for social media, Resizer Lab gets the job done quickly and easily.
            </p>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="container py-12 md:py-16 border-t border-border">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-center text-2xl font-bold mb-4">
            Why Choose <span className="text-gradient">Resizer Lab</span>?
          </h2>
          <p className="text-center text-muted-foreground max-w-2xl mx-auto mb-12">
            We've designed Resizer Lab with a singular focus: to be the best, most private, and easiest-to-use image resizing tool on the web.
          </p>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map(({ icon: Icon, title, description }, i) => (
              <div
                key={title}
                className="group rounded-xl border border-border bg-card p-6 transition-all duration-300 hover:border-primary/50 hover:shadow-lg animate-fade-in"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-accent transition-colors group-hover:gradient-primary">
                  <Icon className="h-6 w-6 text-primary transition-colors group-hover:text-primary-foreground" />
                </div>
                <h3 className="font-semibold text-lg">{title}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  {description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="container py-12 md:py-16 border-t border-border">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-center text-2xl font-bold mb-4">
            Our <span className="text-gradient">Values</span>
          </h2>
          <p className="text-center text-muted-foreground max-w-2xl mx-auto mb-12">
            The principles that guide everything we do at Resizer Lab.
          </p>

          <div className="grid gap-6 sm:grid-cols-2">
            {values.map(({ icon: Icon, title, description }, i) => (
              <div
                key={title}
                className="rounded-xl border border-border bg-card p-6 animate-fade-in"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent flex-shrink-0">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">{title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                      {description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="container py-12 md:py-16 border-t border-border">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-center text-2xl font-bold mb-12">
            How It <span className="text-gradient">Works</span>
          </h2>

          <div className="space-y-6">
            {[
              {
                step: "01",
                title: "Upload Your Image",
                desc: "Drag and drop or click to select an image from your device. We support PNG, JPG, and WEBP formats.",
              },
              {
                step: "02",
                title: "Choose Your Size",
                desc: "Select from presets, enter custom dimensions, or use percentage scaling. Lock aspect ratio to prevent distortion.",
              },
              {
                step: "03",
                title: "Adjust Quality",
                desc: "Fine-tune the output quality and choose your preferred export format for the perfect balance of size and quality.",
              },
              {
                step: "04",
                title: "Download Instantly",
                desc: "Click resize to preview, then download your perfectly resized image. It's that simple!",
              },
            ].map(({ step, title, desc }, i) => (
              <div
                key={step}
                className="flex gap-5 animate-slide-up"
                style={{ animationDelay: `${i * 150}ms` }}
              >
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl gradient-primary font-bold text-primary-foreground">
                  {step}
                </div>
                <div>
                  <h3 className="font-semibold text-lg">{title}</h3>
                  <p className="mt-1 text-muted-foreground">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technical Details */}
      <section className="container py-12 md:py-16 border-t border-border">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-center text-2xl font-bold mb-8">
            The Technology Behind <span className="text-gradient">Resizer Lab</span>
          </h2>
          
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <p>
              Resizer Lab leverages the HTML5 Canvas API, a powerful web technology built into every modern browser. When you upload an image, it's loaded directly into your browser's memory—not transmitted over the internet. The Canvas API then performs all the resizing calculations and transformations locally on your device.
            </p>
            <p>
              This approach offers several significant advantages over traditional server-based image processors:
            </p>
            <ul>
              <li><strong>Zero latency</strong>: No waiting for uploads or downloads. Processing is instantaneous.</li>
              <li><strong>Complete privacy</strong>: Your images never leave your device. We have no servers processing or storing your files.</li>
              <li><strong>Works offline</strong>: Once the page loads, you can resize images even without an internet connection.</li>
              <li><strong>No file size limits</strong>: Since your device does the processing, you're only limited by your device's capabilities.</li>
            </ul>
            <p>
              We use high-quality image smoothing algorithms to ensure your resized images look crisp and professional, whether you're scaling up or down. The quality slider gives you precise control over the compression level, letting you find the perfect balance between file size and visual quality.
            </p>
          </div>
        </div>
      </section>

      {/* Trust Banner */}
      <section className="container py-12 md:py-16">
        <div className="mx-auto max-w-3xl rounded-2xl gradient-primary p-8 md:p-10 text-center text-primary-foreground animate-fade-in">
          <Lock className="mx-auto h-10 w-10 mb-4" />
          <h3 className="text-2xl font-bold">Your Privacy, Our Priority</h3>
          <p className="mt-3 text-primary-foreground/90 max-w-xl mx-auto">
            Resizer Lab never uploads your images to any server. All processing
            happens locally on your device, ensuring complete privacy and security
            for your files. We built it this way because we believe that's how it should be.
          </p>
        </div>
      </section>

      {/* Helpful Resources */}
      <section className="container py-12 md:py-16 border-t border-border">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-center text-2xl font-bold mb-8">
            Helpful <span className="text-gradient">Resources</span>
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Link 
              to="/blog/how-to-resize-images-without-losing-quality"
              className="rounded-xl border border-border bg-card p-5 hover:border-primary/50 transition-colors"
            >
              <h3 className="font-semibold text-sm mb-1">Resize Without Quality Loss</h3>
              <p className="text-xs text-muted-foreground">Learn the best techniques</p>
            </Link>
            <Link 
              to="/blog/best-image-formats-jpeg-png-webp-compared"
              className="rounded-xl border border-border bg-card p-5 hover:border-primary/50 transition-colors"
            >
              <h3 className="font-semibold text-sm mb-1">JPEG vs PNG vs WEBP</h3>
              <p className="text-xs text-muted-foreground">Choose the right format</p>
            </Link>
            <Link 
              to="/blog/social-media-image-sizes-guide"
              className="rounded-xl border border-border bg-card p-5 hover:border-primary/50 transition-colors"
            >
              <h3 className="font-semibold text-sm mb-1">Social Media Sizes</h3>
              <p className="text-xs text-muted-foreground">Complete 2025 guide</p>
            </Link>
            <Link 
              to="/blog/image-compression-guide-reduce-file-size"
              className="rounded-xl border border-border bg-card p-5 hover:border-primary/50 transition-colors"
            >
              <h3 className="font-semibold text-sm mb-1">Compression Guide</h3>
              <p className="text-xs text-muted-foreground">Reduce file sizes effectively</p>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container pb-12 md:pb-16">
        <div className="mx-auto max-w-xl text-center">
          <h2 className="text-xl font-bold mb-4">Ready to Resize Your Images?</h2>
          <p className="text-muted-foreground mb-6">
            Try our free image resizer now. No signup required, no personal data collected.
          </p>
          <Link 
            to="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg gradient-primary text-primary-foreground font-medium hover:opacity-90 transition-opacity"
          >
            Start Resizing →
          </Link>
        </div>
      </section>
    </Layout>
  );
}
