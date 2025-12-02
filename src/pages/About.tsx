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
    </Layout>
  );
}
