import { useNavigate } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { usePresetStore } from "@/store/presetStore";
import { Image, MonitorSmartphone, Smartphone, ImageIcon, Monitor } from "lucide-react";

const presets = [
  {
    size: 1080,
    label: "Full HD",
    description: "Perfect for high-quality web images and social media",
    icon: Monitor,
    color: "from-emerald-500 to-teal-500",
  },
  {
    size: 720,
    label: "HD Ready",
    description: "Great balance of quality and file size",
    icon: MonitorSmartphone,
    color: "from-cyan-500 to-blue-500",
  },
  {
    size: 512,
    label: "Medium",
    description: "Ideal for thumbnails and preview images",
    icon: ImageIcon,
    color: "from-violet-500 to-purple-500",
  },
  {
    size: 256,
    label: "Small",
    description: "Optimized for icons and tiny thumbnails",
    icon: Smartphone,
    color: "from-rose-500 to-pink-500",
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
      <div className="gradient-hero min-h-[calc(100vh-8rem)]">
        <section className="container py-12 md:py-16">
          {/* Header */}
          <div className="mx-auto max-w-2xl text-center animate-fade-in">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl gradient-primary">
              <Image className="h-7 w-7 text-primary-foreground" />
            </div>
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Preset <span className="text-gradient">Sizes</span>
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              Choose a preset size to quickly resize your images. Click any card to
              start resizing.
            </p>
          </div>

          {/* Preset Grid */}
          <div className="mx-auto mt-12 grid max-w-4xl gap-6 sm:grid-cols-2">
            {presets.map(({ size, label, description, icon: Icon, color }, i) => (
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

          {/* Info */}
          <div className="mx-auto mt-12 max-w-2xl rounded-xl border border-border bg-card p-6 text-center animate-fade-in" style={{ animationDelay: "400ms" }}>
            <p className="text-sm text-muted-foreground">
              <strong className="text-foreground">Pro tip:</strong> The longest
              dimension of your image will be resized to match the preset size
              while maintaining the aspect ratio.
            </p>
          </div>
        </section>
      </div>
    </Layout>
  );
}
