import { useEffect } from "react";
import { Layout } from "@/components/layout/Layout";
import { ImageDropzone } from "@/components/resizer/ImageDropzone";
import { ImagePreview } from "@/components/resizer/ImagePreview";
import { ResizeControls } from "@/components/resizer/ResizeControls";
import { useImageResizer } from "@/hooks/useImageResizer";
import { usePresetStore } from "@/store/presetStore";
import { Sparkles, Zap, Shield } from "lucide-react";

const features = [
  { icon: Zap, label: "Lightning Fast", desc: "Browser-based processing" },
  { icon: Shield, label: "100% Private", desc: "No uploads to servers" },
  { icon: Sparkles, label: "High Quality", desc: "Maintains image clarity" },
];

export default function Index() {
  const {
    originalImage,
    resizedImage,
    isProcessing,
    setImage,
    resizeImage,
    downloadImage,
    clearImages,
  } = useImageResizer();

  const { selectedPreset, clearPreset } = usePresetStore();

  // Clear preset after it's been used
  useEffect(() => {
    if (selectedPreset && originalImage) {
      // Preset will be handled by ResizeControls
      // Clear after a short delay to ensure it's processed
      const timeout = setTimeout(clearPreset, 1000);
      return () => clearTimeout(timeout);
    }
  }, [selectedPreset, originalImage, clearPreset]);

  return (
    <Layout>
      <div className="gradient-hero">
        {/* Hero Section */}
        <section className="container py-12 md:py-16">
          <div className="mx-auto max-w-2xl text-center animate-fade-in">
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              Resize Images <span className="text-gradient">Instantly</span>
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              Fast, free, and private. Resize any image directly in your browser
              with no uploads required.
            </p>
          </div>

          {/* Features */}
          <div className="mt-10 flex flex-wrap justify-center gap-4 md:gap-8">
            {features.map(({ icon: Icon, label, desc }, i) => (
              <div
                key={label}
                className="flex items-center gap-3 animate-fade-in"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent">
                  <Icon className="h-5 w-5 text-primary" />
                </div>
                <div className="text-left">
                  <p className="text-sm font-semibold">{label}</p>
                  <p className="text-xs text-muted-foreground">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Main Tool Section */}
      <section className="container py-8 md:py-12">
        <div className="mx-auto max-w-5xl">
          <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
            {/* Left: Upload & Preview */}
            <div className="space-y-6 animate-slide-up">
              <ImageDropzone
                onImageSelect={setImage}
                hasImage={!!originalImage}
                onClear={clearImages}
              />
              <ImagePreview
                original={originalImage}
                resized={resizedImage}
                isProcessing={isProcessing}
              />
            </div>

            {/* Right: Controls */}
            <aside className="animate-slide-up" style={{ animationDelay: "100ms" }}>
              <div className="sticky top-24 rounded-2xl border border-border bg-card p-5 shadow-sm">
                <h2 className="mb-5 font-semibold">Resize Options</h2>
                <ResizeControls
                  original={originalImage}
                  onResize={resizeImage}
                  onDownload={downloadImage}
                  isProcessing={isProcessing}
                  hasResized={!!resizedImage}
                  initialPreset={selectedPreset}
                />
              </div>
            </aside>
          </div>
        </div>
      </section>
    </Layout>
  );
}
