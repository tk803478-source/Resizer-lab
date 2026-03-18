import { useNavigate, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Layout } from "@/components/layout/Layout";
import { usePresetStore } from "@/store/presetStore";
import { Image, MonitorSmartphone, Smartphone, ImageIcon, Monitor, Zap, Shield, Settings, CheckCircle2, ArrowRight } from "lucide-react";

const presets = [
  {
    size: 1080,
    label: "Full HD",
    description: "Perfect for high-quality web images, blog headers, and social media posts. This is the most versatile size for modern displays.",
    icon: Monitor,
    color: "from-emerald-500 to-teal-500",
    useCases: ["Blog headers", "Social media", "High-res web images"],
  },
  {
    size: 720,
    label: "HD Ready",
    description: "Great balance between quality and file size. Ideal for email newsletters, website content, and general web use.",
    icon: MonitorSmartphone,
    color: "from-cyan-500 to-blue-500",
    useCases: ["Email images", "Website content", "Newsletters"],
  },
  {
    size: 512,
    label: "Medium",
    description: "Ideal for thumbnails, preview images, and gallery grids. Small enough for fast loading but still crisp on most screens.",
    icon: ImageIcon,
    color: "from-violet-500 to-purple-500",
    useCases: ["Thumbnails", "Gallery grids", "Preview images"],
  },
  {
    size: 256,
    label: "Small",
    description: "Optimized for icons, avatars, and tiny thumbnails. Minimal file size while maintaining recognizable image quality.",
    icon: Smartphone,
    color: "from-rose-500 to-pink-500",
    useCases: ["Avatars", "Icons", "Tiny thumbnails"],
  },
];

const benefits = [
  {
    icon: Zap,
    title: "One-Click Resizing",
    description: "Skip the manual dimension entry. Select a preset and instantly resize your image to professional dimensions."
  },
  {
    icon: Shield,
    title: "Privacy Preserved",
    description: "Like all our features, preset resizing happens entirely in your browser. Your images never leave your device."
  },
  {
    icon: Settings,
    title: "Consistent Results",
    description: "Get predictable, high-quality output every time. No guessing which dimensions to use for your project."
  },
  {
    icon: CheckCircle2,
    title: "Optimized for Common Uses",
    description: "Our presets are designed for real-world use cases, from social media to email to web development."
  },
];

export default function Gallery() {
  const navigate = useNavigate();
  const setSelectedPreset = usePresetStore((state) => state.setSelectedPreset);

  const handlePresetClick = (size: number) => {
    setSelectedPreset(size);
    navigate("/");
  };

  return (
    <Layout>
      <Helmet>
        <title>Image Size Presets – Quick Resize to 1080p, 720p, 512px | Resizer Lab</title>
        <meta name="description" content="Quickly resize images with preset sizes. Choose Full HD (1080px), HD (720px), Medium (512px), or Small (256px) for instant results." />
        <link rel="canonical" href="https://resizerlab.lovable.app/gallery" />
        <meta name="keywords" content="image presets, quick resize, image dimensions, 1080p resize, 720p image, thumbnail size, preset sizes" />
      </Helmet>

      <div className="gradient-hero">
        <section className="container py-12 md:py-16">
          {/* Header */}
          <div className="mx-auto max-w-3xl text-center animate-fade-in">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl gradient-primary">
              <Image className="h-7 w-7 text-primary-foreground" />
            </div>
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Preset <span className="text-gradient">Sizes</span>
            </h1>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              Skip the guesswork and resize your images instantly with our carefully optimized preset dimensions. Each preset is designed for specific use cases to help you get the perfect result every time.
            </p>
          </div>
        </section>
      </div>

      {/* Preset Grid */}
      <section className="container py-12">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-2xl font-bold text-center mb-8">
            Choose Your <span className="text-gradient">Preset</span>
          </h2>
          <div className="grid gap-6 sm:grid-cols-2">
            {presets.map(({ size, label, description, icon: Icon, color, useCases }, i) => (
              <button
                key={size}
                onClick={() => handlePresetClick(size)}
                className="preset-card text-left group animate-fade-in"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                {/* Gradient accent */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${color} opacity-0 transition-opacity duration-300 group-hover:opacity-5 rounded-xl`}
                />

                <div className="relative z-10">
                  <div className="flex items-start justify-between">
                    <div
                      className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${color} shadow-lg`}
                    >
                      <Icon className="h-6 w-6 text-primary-foreground" />
                    </div>
                    <span className="rounded-full bg-secondary px-3 py-1 text-sm font-bold text-secondary-foreground">
                      {size}px
                    </span>
                  </div>

                  <h3 className="mt-4 text-xl font-bold">{label}</h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                    {description}
                  </p>

                  {/* Use Cases */}
                  <div className="mt-4 flex flex-wrap gap-2">
                    {useCases.map((useCase) => (
                      <span key={useCase} className="text-xs px-2 py-1 rounded-full bg-accent text-accent-foreground">
                        {useCase}
                      </span>
                    ))}
                  </div>

                  <div className="mt-4 flex items-center text-sm font-medium text-primary group-hover:gap-2 transition-all">
                    <span>Use this preset</span>
                    <span className="ml-1 transition-transform group-hover:translate-x-1">
                      →
                    </span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="container py-12 border-t border-border">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-2xl font-bold text-center mb-4">
            Why Use <span className="text-gradient">Preset Sizes</span>?
          </h2>
          <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-12">
            Preset sizes take the guesswork out of image resizing. Whether you're a professional designer, a blogger, or just someone who needs to resize photos quickly, our presets help you get consistent, high-quality results every time.
          </p>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {benefits.map(({ icon: Icon, title, description }, i) => (
              <div
                key={title}
                className="rounded-xl border border-border bg-card p-6 text-center animate-fade-in"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-accent">
                  <Icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">{title}</h3>
                <p className="text-sm text-muted-foreground">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Understanding Dimensions Section */}
      <section className="container py-12 border-t border-border">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-2xl font-bold text-center mb-8">
            Understanding <span className="text-gradient">Image Dimensions</span>
          </h2>
          
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <p>
              When resizing images, understanding dimensions and how they affect your final result is crucial for achieving professional outcomes. Image dimensions are measured in pixels, which are the smallest individual units of a digital image. The more pixels an image contains, the higher its resolution and the more detail it can display.
            </p>

            <h3>How Our Presets Work</h3>
            <p>
              When you select a preset size, Resizer Lab automatically resizes your image so that the longest dimension (either width or height) matches the preset value. This approach ensures that your image maintains its original aspect ratio while fitting within the specified maximum dimension. For example, if you have a landscape image (wider than tall) and select the 1080px preset, the width will be set to 1080 pixels, and the height will be proportionally calculated to maintain the correct aspect ratio.
            </p>

            <h3>Choosing the Right Size</h3>
            <p>
              Selecting the appropriate image size depends on your intended use case. Larger images (like 1080px) provide more detail and look crisp on high-resolution displays, but they also result in larger file sizes. Smaller images (like 256px) load faster and are perfect for thumbnails and icons, but they may appear pixelated if stretched to larger sizes.
            </p>

            <div className="not-prose my-8 grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl border border-border bg-card p-5">
                <h4 className="font-semibold mb-2">For Web & Social Media</h4>
                <p className="text-sm text-muted-foreground mb-3">
                  Use 1080px or 720px for optimal quality on websites and social platforms. These sizes balance visual quality with reasonable file sizes.
                </p>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Hero images: 1080px</li>
                  <li>• Blog posts: 720px - 1080px</li>
                  <li>• Social media posts: 1080px</li>
                </ul>
              </div>
              <div className="rounded-xl border border-border bg-card p-5">
                <h4 className="font-semibold mb-2">For Thumbnails & Icons</h4>
                <p className="text-sm text-muted-foreground mb-3">
                  Use 512px or 256px for faster loading times and smaller file sizes. Perfect for gallery previews and navigation elements.
                </p>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Gallery thumbnails: 512px</li>
                  <li>• Profile avatars: 256px</li>
                  <li>• Small icons: 256px</li>
                </ul>
              </div>
            </div>

            <h3>Quality vs. File Size</h3>
            <p>
              There's always a trade-off between image quality and file size. Larger dimensions mean more pixels, which means more data to store and transmit. For websites and applications where loading speed is important, choosing the smallest dimensions that still meet your quality requirements is a best practice. Our presets are designed to help you find that sweet spot between quality and performance.
            </p>

            <h3>Maintaining Aspect Ratio</h3>
            <p>
              All our preset sizes maintain your image's original aspect ratio. This prevents distortion and ensures your images look natural after resizing. If you need to change the aspect ratio (for example, to create a square image from a rectangular one), you can use our custom dimension options on the <Link to="/" className="text-primary hover:underline">main resizer tool</Link>.
            </p>
            <p>
              For a deeper understanding of aspect ratios and how they affect your images, check out our comprehensive guide on <Link to="/blog/understanding-aspect-ratios-images" className="text-primary hover:underline">understanding aspect ratios</Link>. You can also learn more about <Link to="/blog/social-media-image-sizes-guide" className="text-primary hover:underline">social media image sizes</Link> to ensure your content looks perfect on every platform.
            </p>
          </div>
        </div>
      </section>

      {/* Pro Tip */}
      <section className="container py-12">
        <div className="mx-auto max-w-4xl">
          <div className="rounded-xl border border-border bg-card p-6 animate-fade-in">
            <h3 className="font-semibold mb-3">💡 Pro Tips for Preset Resizing</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• <strong>Start with the largest size you need</strong>: You can always downsize later, but upscaling can reduce quality.</li>
              <li>• <strong>Consider your target platform</strong>: Social media platforms often have specific size requirements—our 1080px preset works well for most.</li>
              <li>• <strong>Use 512px for email</strong>: Many email clients limit image display sizes, making 512px a safe choice for newsletters.</li>
              <li>• <strong>Batch processing tip</strong>: If you have multiple images, resize them all to the same preset for a consistent look.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container py-12">
        <div className="mx-auto max-w-3xl">
          <div className="rounded-2xl gradient-primary p-8 md:p-10 text-center text-primary-foreground">
            <h2 className="text-2xl font-bold mb-4">Need Custom Dimensions?</h2>
            <p className="text-primary-foreground/90 max-w-xl mx-auto mb-6">
              Our presets cover the most common use cases, but if you need specific dimensions, our main resizer tool offers complete flexibility with custom width and height inputs.
            </p>
            <Link
              to="/"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-background text-foreground font-medium hover:bg-accent transition-colors"
            >
              Use Custom Dimensions <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
