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
  Image
} from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "100% Browser-Based",
    description:
      "All image processing happens directly in your browser using the Canvas API. Your images never leave your device.",
  },
  {
    icon: Zap,
    title: "Lightning Fast",
    description:
      "Resize images instantly without waiting for server uploads. Experience real-time processing with immediate results.",
  },
  {
    icon: Lock,
    title: "Complete Privacy",
    description:
      "We don't store, collect, or have access to any of your images. Your files stay private and secure on your device.",
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
      "Optimized for both desktop and mobile devices. Resize images from anywhere, on any device.",
  },
  {
    icon: RefreshCw,
    title: "Multiple Formats",
    description:
      "Export your resized images in JPEG, PNG, or WEBP formats with adjustable quality settings.",
  },
];

export default function About() {
  return (
    <Layout>
      <Helmet>
        <title>About ResizeLab – Free Browser-Based Image Resizer</title>
        <meta name="description" content="Learn about ResizeLab, a free privacy-focused image resizing tool that runs entirely in your browser. No uploads, no servers, no tracking." />
        <link rel="canonical" href="https://resizelab.app/about" />
      </Helmet>

      <div className="gradient-hero">
        {/* Hero */}
        <section className="container py-12 md:py-20">
          <div className="mx-auto max-w-3xl text-center animate-fade-in">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl gradient-primary shadow-glow">
              <Image className="h-8 w-8 text-primary-foreground" />
            </div>
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              About <span className="text-gradient">ResizeLab</span>
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
              ResizeLab is a free, privacy-focused image resizing tool that runs
              entirely in your browser. No uploads, no servers, no tracking—just
              fast, simple image resizing.
            </p>
          </div>
        </section>
      </div>

      {/* Features */}
      <section className="container py-12 md:py-16">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-center text-2xl font-bold mb-12">
            Why Choose <span className="text-gradient">ResizeLab</span>?
          </h2>

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
                desc: "Drag and drop or click to select an image from your device.",
              },
              {
                step: "02",
                title: "Choose Your Size",
                desc: "Select from presets, enter custom dimensions, or use percentage scaling.",
              },
              {
                step: "03",
                title: "Download Instantly",
                desc: "Get your resized image immediately in your preferred format.",
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

      {/* Trust Banner */}
      <section className="container pb-12 md:pb-16">
        <div className="mx-auto max-w-3xl rounded-2xl gradient-primary p-8 md:p-10 text-center text-primary-foreground animate-fade-in">
          <Lock className="mx-auto h-10 w-10 mb-4" />
          <h3 className="text-2xl font-bold">Your Privacy, Our Priority</h3>
          <p className="mt-3 text-primary-foreground/90 max-w-xl mx-auto">
            ResizeLab never uploads your images to any server. All processing
            happens locally on your device, ensuring complete privacy and security
            for your files.
          </p>
        </div>
      </section>

      {/* Helpful Resources */}
      <section className="container pb-12 md:pb-16">
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
              <p className="text-xs text-muted-foreground">Complete 2024 guide</p>
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
            Try our free image resizer now. No signup required.
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
