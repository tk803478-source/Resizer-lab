import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { AdPlaceholder } from "@/components/AdPlaceholder";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";
import { usePresetStore } from "@/store/presetStore";
import {
  Sparkles,
  Zap,
  Shield,
  Upload,
  ImageIcon,
  X,
  Link2,
  Link2Off,
  Download,
  Wand2,
  Clock,
  Globe,
  Smartphone,
  UserX,
  CheckCircle2,
  Settings2,
  ArrowDownToLine,
  ArrowRight,
} from "lucide-react";
import heroIllustration from "@/assets/hero-illustration.png";

// ============= Types =============
interface ImageData {
  file: File;
  url: string;
  width: number;
  height: number;
  name: string;
}

interface ResizeOptions {
  width: number;
  height: number;
  maintainAspectRatio: boolean;
  format: "jpeg" | "png" | "webp";
  quality: number;
}

interface ResizedImage {
  url: string;
  blob: Blob;
  width: number;
  height: number;
}

// ============= Constants =============
const heroFeatures = [
  { icon: Zap, label: "Lightning Fast", desc: "Browser-based processing" },
  { icon: Shield, label: "100% Private", desc: "No uploads to servers" },
  { icon: Sparkles, label: "High Quality", desc: "Maintains image clarity" },
];

const mainFeatures = [
  { icon: UserX, title: "No Signup Required", desc: "Start resizing immediately without creating an account or providing personal information." },
  { icon: Sparkles, title: "Completely Free", desc: "All features are free to use with no hidden costs, watermarks, or premium upgrades." },
  { icon: Zap, title: "Fast Processing", desc: "Resize images in milliseconds using your browser's native processing power." },
  { icon: Smartphone, title: "Works Everywhere", desc: "Fully responsive design works perfectly on desktop, tablet, and mobile devices." },
  { icon: Shield, title: "Secure & Private", desc: "Your images never leave your device. All processing happens locally in your browser." },
  { icon: Globe, title: "No Installation", desc: "Access from any modern browser without downloading or installing any software." },
];

const howItWorks = [
  { step: 1, icon: Upload, title: "Upload Your Image", desc: "Drag and drop or click to select any PNG, JPG, or WEBP image from your device." },
  { step: 2, icon: Settings2, title: "Adjust Settings", desc: "Choose your target dimensions, select a preset size, or scale by percentage. Pick your output format." },
  { step: 3, icon: ArrowDownToLine, title: "Download Result", desc: "Click resize to preview, then download your perfectly resized image instantly." },
];

const benefits = [
  { icon: Clock, title: "Saves Time", desc: "No waiting for uploads or server processing. Resize images in seconds." },
  { icon: Globe, title: "Works Worldwide", desc: "Use from anywhere in the world with just an internet connection." },
  { icon: UserX, title: "Beginner Friendly", desc: "Simple, intuitive interface that anyone can use without technical knowledge." },
  { icon: Zap, title: "Lightweight & Fast", desc: "Minimal page load, instant results. No bloated software to slow you down." },
  { icon: Shield, title: "No Data Collection", desc: "We don't collect, store, or track your images or personal data." },
];

const faqs = [
  {
    question: "Is this image resizer tool completely free?",
    answer: "Yes, Resizer Lab is 100% free to use. There are no hidden fees, premium features, or subscription requirements. You can resize unlimited images without any cost."
  },
  {
    question: "Is my data safe when using this tool?",
    answer: "Absolutely. Your images are processed entirely in your browser using the HTML5 Canvas API. Your files never leave your device or get uploaded to any server. We have no access to your images whatsoever."
  },
  {
    question: "Does this tool work on mobile devices?",
    answer: "Yes! Resizer Lab is fully responsive and works perfectly on smartphones, tablets, and desktop computers. You can resize images on-the-go from any modern mobile browser."
  },
  {
    question: "Do I need to create an account or sign up?",
    answer: "No account or signup is required. Simply visit the website and start resizing images immediately. No personal information is needed."
  },
  {
    question: "Are there any usage limits or restrictions?",
    answer: "There are no artificial limits on how many images you can resize. Since processing happens in your browser, you can resize as many images as you need without restrictions."
  },
  {
    question: "Is this tool browser-based only?",
    answer: "Yes, Resizer Lab runs entirely in your web browser. This means you don't need to download or install any software, and you can use it on any device with a modern browser."
  },
  {
    question: "What image formats are supported?",
    answer: "Resizer Lab supports the most common image formats including JPEG, PNG, and WEBP. You can also convert between these formats while resizing."
  },
  {
    question: "How does browser-based processing work?",
    answer: "When you upload an image, it stays on your device. The resizing is performed using your browser's built-in Canvas API, which is a secure, standardized technology for image manipulation. The result is generated locally and ready for download."
  }
];

const PRESETS = [
  { label: "256px", value: 256 },
  { label: "512px", value: 512 },
  { label: "720px", value: 720 },
  { label: "1080px", value: 1080 },
];

const PERCENTAGES = [
  { label: "25%", value: 0.25 },
  { label: "50%", value: 0.5 },
  { label: "75%", value: 0.75 },
  { label: "100%", value: 1 },
];

const FORMATS = ["jpeg", "png", "webp"] as const;

// ============= Hook: useImageResizer =============
function useImageResizer() {
  const [originalImage, setOriginalImage] = useState<ImageData | null>(null);
  const [resizedImage, setResizedImage] = useState<ResizedImage | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const loadImage = useCallback((file: File): Promise<ImageData> => {
    return new Promise((resolve, reject) => {
      const url = URL.createObjectURL(file);
      const img = new Image();

      img.onload = () => {
        resolve({
          file,
          url,
          width: img.naturalWidth,
          height: img.naturalHeight,
          name: file.name.replace(/\.[^/.]+$/, ""),
        });
      };

      img.onerror = () => reject(new Error("Failed to load image"));
      img.src = url;
    });
  }, []);

  const setImage = useCallback(
    async (file: File) => {
      try {
        if (originalImage?.url) {
          URL.revokeObjectURL(originalImage.url);
        }
        if (resizedImage?.url) {
          URL.revokeObjectURL(resizedImage.url);
        }

        const imageData = await loadImage(file);
        setOriginalImage(imageData);
        setResizedImage(null);
      } catch (error) {
        console.error("Error loading image:", error);
      }
    },
    [loadImage, originalImage, resizedImage]
  );

  const resizeImage = useCallback(
    async (options: ResizeOptions) => {
      if (!originalImage) return;

      setIsProcessing(true);

      try {
        const img = new Image();
        img.src = originalImage.url;

        await new Promise((resolve) => {
          img.onload = resolve;
        });

        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        if (!ctx) throw new Error("Could not get canvas context");

        canvas.width = options.width;
        canvas.height = options.height;

        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = "high";

        ctx.drawImage(img, 0, 0, options.width, options.height);

        const mimeType = `image/${options.format}`;
        const quality =
          options.format === "png" ? undefined : options.quality / 100;

        const blob = await new Promise<Blob>((resolve, reject) => {
          canvas.toBlob(
            (blob) => {
              if (blob) resolve(blob);
              else reject(new Error("Failed to create blob"));
            },
            mimeType,
            quality
          );
        });

        if (resizedImage?.url) {
          URL.revokeObjectURL(resizedImage.url);
        }

        setResizedImage({
          url: URL.createObjectURL(blob),
          blob,
          width: options.width,
          height: options.height,
        });
      } catch (error) {
        console.error("Error resizing image:", error);
      } finally {
        setIsProcessing(false);
      }
    },
    [originalImage, resizedImage]
  );

  const downloadImage = useCallback(
    (format: string) => {
      if (!resizedImage || !originalImage) return;

      const link = document.createElement("a");
      link.href = resizedImage.url;
      link.download = `${originalImage.name}-resized.${format}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    },
    [resizedImage, originalImage]
  );

  const clearImages = useCallback(() => {
    if (originalImage?.url) {
      URL.revokeObjectURL(originalImage.url);
    }
    if (resizedImage?.url) {
      URL.revokeObjectURL(resizedImage.url);
    }
    setOriginalImage(null);
    setResizedImage(null);
  }, [originalImage, resizedImage]);

  return {
    originalImage,
    resizedImage,
    isProcessing,
    setImage,
    resizeImage,
    downloadImage,
    clearImages,
  };
}

// ============= Component: ImageDropzone =============
function ImageDropzone({
  onImageSelect,
  hasImage,
  onClear,
}: {
  onImageSelect: (file: File) => void;
  hasImage: boolean;
  onClear: () => void;
}) {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);

      const files = e.dataTransfer.files;
      if (files.length > 0 && files[0].type.startsWith("image/")) {
        onImageSelect(files[0]);
      }
    },
    [onImageSelect]
  );

  const handleFileInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files;
      if (files && files.length > 0) {
        onImageSelect(files[0]);
      }
    },
    [onImageSelect]
  );

  if (hasImage) {
    return (
      <div className="flex items-center justify-center gap-3 p-4 rounded-xl bg-accent/50 border border-accent">
        <ImageIcon className="h-5 w-5 text-primary" />
        <span className="text-sm font-medium text-accent-foreground">
          Image loaded
        </span>
        <Button
          variant="ghost"
          size="sm"
          onClick={onClear}
          className="ml-auto text-muted-foreground hover:text-destructive"
        >
          <X className="h-4 w-4" />
          Clear
        </Button>
      </div>
    );
  }

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={cn("dropzone", isDragging && "dropzone-active")}
    >
      <input
        type="file"
        accept="image/*"
        onChange={handleFileInput}
        className="absolute inset-0 cursor-pointer opacity-0"
        aria-label="Upload image"
      />
      <div className="flex flex-col items-center gap-4 pointer-events-none">
        <div
          className={cn(
            "flex h-16 w-16 items-center justify-center rounded-2xl transition-all duration-300",
            isDragging ? "gradient-primary scale-110" : "bg-secondary"
          )}
        >
          <Upload
            className={cn(
              "h-7 w-7 transition-colors",
              isDragging ? "text-primary-foreground" : "text-muted-foreground"
            )}
          />
        </div>
        <div className="text-center">
          <p className="font-semibold text-foreground">
            {isDragging ? "Drop your image here" : "Drag & drop your image"}
          </p>
          <p className="mt-1 text-sm text-muted-foreground">
            or click to browse • PNG, JPG, WEBP
          </p>
        </div>
      </div>
    </div>
  );
}

// ============= Component: ImagePreview =============
function ImagePreview({
  original,
  resized,
  isProcessing,
}: {
  original: ImageData | null;
  resized: ResizedImage | null;
  isProcessing: boolean;
}) {
  if (!original) return null;

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-foreground">Original</h3>
          <span className="text-xs text-muted-foreground">
            {original.width} × {original.height}
          </span>
        </div>
        <div className="relative aspect-video overflow-hidden rounded-xl border border-border bg-secondary/50">
          <img
            src={original.url}
            alt="Original"
            className="h-full w-full object-contain"
          />
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-foreground">Resized</h3>
          {resized && (
            <span className="text-xs text-muted-foreground">
              {resized.width} × {resized.height}
            </span>
          )}
        </div>
        <div
          className={cn(
            "relative aspect-video overflow-hidden rounded-xl border border-border bg-secondary/50",
            isProcessing && "animate-pulse"
          )}
        >
          {resized ? (
            <img
              src={resized.url}
              alt="Resized"
              className="h-full w-full object-contain animate-scale-in"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
              {isProcessing ? "Processing..." : "Click 'Resize' to preview"}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ============= Component: ResizeControls =============
function ResizeControls({
  original,
  onResize,
  onDownload,
  isProcessing,
  hasResized,
  initialPreset,
}: {
  original: ImageData | null;
  onResize: (options: ResizeOptions) => void;
  onDownload: (format: string) => void;
  isProcessing: boolean;
  hasResized: boolean;
  initialPreset?: number | null;
}) {
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const [maintainAspectRatio, setMaintainAspectRatio] = useState(true);
  const [format, setFormat] = useState<"jpeg" | "png" | "webp">("jpeg");
  const [quality, setQuality] = useState(85);
  const [activePreset, setActivePreset] = useState<number | null>(null);

  const aspectRatio = original ? original.width / original.height : 1;

  useEffect(() => {
    if (original) {
      setWidth(original.width);
      setHeight(original.height);
    }
  }, [original]);

  useEffect(() => {
    if (initialPreset && original) {
      applyPreset(initialPreset);
    }
  }, [initialPreset, original]);

  const applyPreset = useCallback(
    (preset: number) => {
      if (!original) return;

      setActivePreset(preset);

      if (original.width >= original.height) {
        const newWidth = preset;
        const newHeight = maintainAspectRatio
          ? Math.round(preset / aspectRatio)
          : height;
        setWidth(newWidth);
        setHeight(newHeight);
      } else {
        const newHeight = preset;
        const newWidth = maintainAspectRatio
          ? Math.round(preset * aspectRatio)
          : width;
        setWidth(newWidth);
        setHeight(newHeight);
      }
    },
    [original, maintainAspectRatio, aspectRatio, width, height]
  );

  const applyPercentage = useCallback(
    (percent: number) => {
      if (!original) return;
      setActivePreset(null);
      setWidth(Math.round(original.width * percent));
      setHeight(Math.round(original.height * percent));
    },
    [original]
  );

  const handleWidthChange = (value: string) => {
    const newWidth = parseInt(value) || 0;
    setWidth(newWidth);
    setActivePreset(null);
    if (maintainAspectRatio && newWidth > 0) {
      setHeight(Math.round(newWidth / aspectRatio));
    }
  };

  const handleHeightChange = (value: string) => {
    const newHeight = parseInt(value) || 0;
    setHeight(newHeight);
    setActivePreset(null);
    if (maintainAspectRatio && newHeight > 0) {
      setWidth(Math.round(newHeight * aspectRatio));
    }
  };

  const handleResize = () => {
    if (!original || width <= 0 || height <= 0) return;
    onResize({ width, height, maintainAspectRatio, format, quality });
  };

  if (!original) {
    return (
      <div className="rounded-xl border border-dashed border-border p-8 text-center">
        <p className="text-muted-foreground">
          Upload an image to see resize options
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="control-group">
        <div className="flex items-center justify-between mb-3">
          <Label className="text-sm font-semibold">Dimensions</Label>
          <button
            onClick={() => setMaintainAspectRatio(!maintainAspectRatio)}
            className={cn(
              "flex items-center gap-1.5 text-xs font-medium px-2 py-1 rounded-md transition-colors",
              maintainAspectRatio
                ? "bg-primary/10 text-primary"
                : "bg-secondary text-muted-foreground"
            )}
          >
            {maintainAspectRatio ? (
              <Link2 className="h-3.5 w-3.5" />
            ) : (
              <Link2Off className="h-3.5 w-3.5" />
            )}
            {maintainAspectRatio ? "Linked" : "Unlinked"}
          </button>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1.5">
            <Label className="text-xs text-muted-foreground">Width (px)</Label>
            <Input
              type="number"
              value={width}
              onChange={(e) => handleWidthChange(e.target.value)}
              min={1}
              className="h-9"
            />
          </div>
          <div className="space-y-1.5">
            <Label className="text-xs text-muted-foreground">Height (px)</Label>
            <Input
              type="number"
              value={height}
              onChange={(e) => handleHeightChange(e.target.value)}
              min={1}
              className="h-9"
            />
          </div>
        </div>
      </div>

      <div className="control-group">
        <Label className="text-sm font-semibold">Quick Scale</Label>
        <div className="grid grid-cols-4 gap-2 mt-3">
          {PERCENTAGES.map(({ label, value }) => (
            <button
              key={value}
              onClick={() => applyPercentage(value)}
              className="h-9 rounded-lg border border-border bg-background text-sm font-medium transition-all hover:border-primary hover:bg-accent"
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="control-group">
        <Label className="text-sm font-semibold">Preset Sizes</Label>
        <div className="grid grid-cols-4 gap-2 mt-3">
          {PRESETS.map(({ label, value }) => (
            <button
              key={value}
              onClick={() => applyPreset(value)}
              className={cn(
                "h-9 rounded-lg border text-sm font-medium transition-all",
                activePreset === value
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-background hover:border-primary hover:bg-accent"
              )}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="control-group">
        <Label className="text-sm font-semibold">Output Format</Label>
        <div className="flex gap-2 mt-3">
          {FORMATS.map((f) => (
            <button
              key={f}
              onClick={() => setFormat(f)}
              className={cn(
                "flex-1 h-9 rounded-lg border text-sm font-medium uppercase transition-all",
                format === f
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-background hover:border-primary hover:bg-accent"
              )}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {format !== "png" && (
        <div className="control-group">
          <div className="flex items-center justify-between mb-3">
            <Label className="text-sm font-semibold">Quality</Label>
            <span className="text-sm font-medium text-primary">{quality}%</span>
          </div>
          <Slider
            value={[quality]}
            onValueChange={([val]) => setQuality(val)}
            min={10}
            max={100}
            step={5}
            className="w-full"
          />
          <div className="flex justify-between mt-1 text-xs text-muted-foreground">
            <span>Smaller file</span>
            <span>Higher quality</span>
          </div>
        </div>
      )}

      <div className="flex gap-3 pt-2">
        <Button
          onClick={handleResize}
          disabled={isProcessing || width <= 0 || height <= 0}
          variant="gradient"
          className="flex-1"
        >
          <Wand2 className="h-4 w-4" />
          {isProcessing ? "Processing..." : "Resize Image"}
        </Button>
        <Button
          onClick={() => onDownload(format)}
          disabled={!hasResized}
          variant="hero"
          className="flex-1"
        >
          <Download className="h-4 w-4" />
          Download
        </Button>
      </div>
    </div>
  );
}

// ============= Main Page Component =============
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

  useEffect(() => {
    if (selectedPreset && originalImage) {
      const timeout = setTimeout(clearPreset, 1000);
      return () => clearTimeout(timeout);
    }
  }, [selectedPreset, originalImage, clearPreset]);

  return (
    <Layout>
      <Helmet>
        <title>Free Image Resizer Online – Resize Photos Instantly | Resizer Lab</title>
        <meta name="description" content="Resize images free online in seconds. Fast, private browser-based tool with no uploads. Supports JPEG, PNG, WEBP. No signup needed." />
        <meta name="keywords" content="free image resizer, resize image online, photo resizer, resize photos, compress images, JPEG resizer, PNG resizer, WEBP converter" />
        <link rel="canonical" href="https://resizelab.app/" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            "name": "Resizer Lab",
            "description": "Free online image resizer tool. Resize photos instantly in your browser with complete privacy.",
            "url": "https://resizelab.app",
            "applicationCategory": "MultimediaApplication",
            "operatingSystem": "Any",
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "USD"
            },
            "featureList": ["Image resizing", "Format conversion", "Quality adjustment", "Browser-based processing"],
            "browserRequirements": "Requires a modern web browser with JavaScript enabled"
          })}
        </script>
      </Helmet>

      {/* Hero Section */}
      <section className="w-full bg-hero">
        <div className="container py-12 md:py-20 lg:py-24">
          <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 items-center">
            {/* Left Side - Content */}
            <div className="flex flex-col space-y-6 animate-fade-in">
              <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl lg:text-[3.25rem] lg:leading-tight">
                Resize Images Instantly{" "}
                <span className="text-hero-accent">Without Losing Quality</span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-xl leading-relaxed">
                Resize, compress, and optimize images online in seconds. Fast, secure, and free image resizer for web, social media, and professional use. No signup required.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                <Button 
                  size="xl" 
                  className="bg-hero-cta text-hero-cta-foreground hover:bg-hero-cta/90 shadow-lg"
                  onClick={() => {
                    const toolSection = document.getElementById('resize-tool');
                    if (toolSection) {
                      toolSection.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                >
                  Resize Image Now
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </div>
              
              {/* Feature badges */}
              <div className="flex flex-wrap gap-4 pt-4">
                {heroFeatures.map(({ icon: Icon, label, desc }, i) => (
                  <div
                    key={label}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg bg-secondary/50 border border-border animate-fade-in"
                    style={{ animationDelay: `${i * 100}ms` }}
                  >
                    <Icon className="h-4 w-4 text-hero-accent" />
                    <span className="text-sm font-medium text-foreground">{label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Side - Hero Illustration */}
            <div className="relative flex justify-center lg:justify-end animate-fade-in" style={{ animationDelay: '200ms' }}>
              <div className="relative w-full max-w-lg lg:max-w-xl">
                <img 
                  src={heroIllustration} 
                  alt="Image resizing illustration showing before and after comparison on a laptop screen" 
                  className="w-full h-auto rounded-2xl"
                  loading="eager"
                  width={1024}
                  height={768}
                />
                {/* Decorative accent */}
                <div className="absolute -z-10 inset-0 bg-hero-accent/10 blur-3xl rounded-full transform scale-75 translate-x-4 translate-y-4" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <AdPlaceholder position="banner" className="container mt-8" />

      {/* Main Tool Section */}
      <section id="resize-tool" className="container py-8 md:py-12 scroll-mt-4">
        <div className="mx-auto max-w-5xl">
          <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
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

            <aside
              className="animate-slide-up"
              style={{ animationDelay: "100ms" }}
            >
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

      {/* Features Section */}
      <section className="container py-12 md:py-16">
        <div className="mx-auto max-w-5xl">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
              Why Choose <span className="text-gradient">ResizeLab</span>?
            </h2>
            <p className="mt-3 text-muted-foreground max-w-2xl mx-auto">
              Everything you need to resize images quickly and securely, without compromises.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {mainFeatures.map(({ icon: Icon, title, desc }, i) => (
              <div
                key={title}
                className="rounded-xl border border-border bg-card p-6 transition-all hover:border-primary/50 hover:shadow-md animate-fade-in"
                style={{ animationDelay: `${i * 50}ms` }}
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-accent mb-4">
                  <Icon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">{title}</h3>
                <p className="text-sm text-muted-foreground">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="container py-12 md:py-16 bg-secondary/30 rounded-3xl mx-4 sm:mx-auto max-w-6xl">
        <div className="mx-auto max-w-4xl px-4">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
              How It Works
            </h2>
            <p className="mt-3 text-muted-foreground">
              Resize your images in three simple steps
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {howItWorks.map(({ step, icon: Icon, title, desc }) => (
              <div key={step} className="text-center">
                <div className="relative mx-auto mb-4">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl gradient-primary shadow-glow mx-auto">
                    <Icon className="h-7 w-7 text-primary-foreground" />
                  </div>
                  <span className="absolute -top-2 -right-2 flex h-7 w-7 items-center justify-center rounded-full bg-background border-2 border-primary text-sm font-bold text-primary">
                    {step}
                  </span>
                </div>
                <h3 className="font-semibold mb-2">{title}</h3>
                <p className="text-sm text-muted-foreground">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="container py-12 md:py-16">
        <div className="mx-auto max-w-5xl">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
              Key Benefits
            </h2>
            <p className="mt-3 text-muted-foreground max-w-2xl mx-auto">
              Designed to make image resizing effortless for everyone
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {benefits.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="flex gap-4 p-4 rounded-xl hover:bg-accent/50 transition-colors">
                <div className="flex-shrink-0">
                  <CheckCircle2 className="h-5 w-5 text-primary mt-0.5" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">{title}</h3>
                  <p className="text-sm text-muted-foreground">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <AdPlaceholder position="in-article" className="container" />

      {/* SEO Content Section */}
      <section className="container py-12 md:py-16">
        <div className="mx-auto max-w-3xl">
          <article className="prose prose-lg dark:prose-invert max-w-none">
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl text-center mb-8">
              The Best Free Online Image Resizer – Fast, Private, and Easy to Use
            </h2>
            
            <div className="space-y-6 text-muted-foreground leading-relaxed">
              <p>
                ResizeLab is a powerful, free online image resizer designed for anyone who needs to quickly adjust image dimensions without the hassle of complex software or expensive subscriptions. Whether you're a blogger preparing images for your website, a social media manager optimizing content for different platforms, an e-commerce seller creating product photos, or simply someone who needs to resize a photo for an email attachment, ResizeLab makes the entire process effortless and secure.
              </p>

              <h3 className="text-xl font-semibold text-foreground mt-8">What Is Image Resizing and Why Does It Matter?</h3>
              <p>
                Image resizing is the process of changing the dimensions (width and height) of a digital image. This is different from cropping, which removes parts of an image. When you resize, you're scaling the entire image up or down while maintaining its content. Proper image sizing is essential for web performance, social media optimization, email compatibility, and professional presentations.
              </p>
              <p>
                Websites with unoptimized images load slowly, frustrating visitors and hurting search engine rankings. Google's Core Web Vitals—key metrics that affect SEO—are directly impacted by image sizes. Large images consume bandwidth, increase hosting costs, and create poor user experiences on mobile devices. By resizing images to their actual display dimensions, you can reduce file sizes by 50-90% without any visible quality loss.
              </p>

              <h3 className="text-xl font-semibold text-foreground mt-8">What Makes ResizeLab Different from Other Image Resizers?</h3>
              <p>
                Unlike many online image tools that require you to upload files to remote servers—potentially compromising your privacy and wasting time on slow uploads—ResizeLab processes everything directly in your web browser using the HTML5 Canvas API. This client-side approach offers significant advantages that make it the preferred choice for privacy-conscious users and professionals alike.
              </p>
              <p>
                Your images remain completely private since they never leave your device. Processing is nearly instantaneous with no upload or download wait times. You can use the tool even with a slow internet connection once the page loads. And there's absolutely no risk of your photos being stored, analyzed, sold, or accessed by third parties. For those interested in understanding the technical aspects of image quality, our guide on <Link to="/blog/how-to-resize-images-without-losing-quality" className="text-primary hover:underline">how to resize images without losing quality</Link> provides in-depth information.
              </p>

              <h3 className="text-xl font-semibold text-foreground mt-8">Supported Image Formats: JPEG, PNG, and WEBP</h3>
              <p>
                ResizeLab supports the three most popular image formats used on the web today: JPEG, PNG, and WEBP. Each format has its optimal use cases that you should understand to make the best choices for your projects.
              </p>
              <p>
                <strong>JPEG (JPG)</strong> offers excellent compression for photographs and images with complex color gradients. It uses lossy compression, meaning some data is discarded to achieve smaller files, but at quality settings of 70-85%, the loss is virtually imperceptible to the human eye. JPEG is ideal for photographs, hero images, and any image where transparency isn't needed.
              </p>
              <p>
                <strong>PNG</strong> uses lossless compression, preserving every pixel perfectly. This makes it ideal for logos, graphics with text, screenshots, and images requiring transparency. PNG files are typically larger than JPEGs but maintain absolute quality through any number of edits and saves.
              </p>
              <p>
                <strong>WEBP</strong> is a modern format developed by Google that provides superior compression—typically 25-35% smaller than equivalent JPEG images with no quality loss. It supports both lossy and lossless compression, plus transparency. All modern browsers support WEBP, making it an excellent choice for web optimization. Learn more about choosing the right format in our detailed <Link to="/blog/best-image-formats-jpeg-png-webp-compared" className="text-primary hover:underline">JPEG vs PNG vs WEBP comparison guide</Link>.
              </p>

              <h3 className="text-xl font-semibold text-foreground mt-8">Who Should Use This Free Image Resizing Tool?</h3>
              <p>
                ResizeLab is designed for a wide range of users with diverse needs. <strong>Content creators and bloggers</strong> can quickly resize images to fit their website layouts while maintaining optimal page loading speeds. <strong>E-commerce sellers</strong> can prepare product photos with consistent dimensions required by marketplaces like Amazon, eBay, and Etsy. Our <Link to="/blog/ecommerce-product-image-optimization" className="text-primary hover:underline">e-commerce product image optimization guide</Link> covers platform-specific requirements.
              </p>
              <p>
                <strong>Social media managers</strong> can optimize images for different platform requirements—whether it's Instagram's square format, Facebook's cover photo dimensions, or Twitter's header image specifications. Check our comprehensive <Link to="/blog/social-media-image-sizes-guide" className="text-primary hover:underline">social media image sizes guide</Link> for exact dimensions for every major platform.
              </p>
              <p>
                <strong>Photographers and designers</strong> can create smaller versions of their work for web sharing, portfolio sites, or client previews. <strong>Website developers</strong> can optimize images for better Core Web Vitals scores and improved <Link to="/blog/seo-benefits-optimized-images" className="text-primary hover:underline">SEO performance</Link>. Even casual users who simply need to make a photo smaller for an email attachment will find ResizeLab intuitive, fast, and helpful.
              </p>

              <h3 className="text-xl font-semibold text-foreground mt-8">Common Use Cases for Image Resizing</h3>
              <p>
                The most popular uses for ResizeLab include preparing images for websites and blogs where file size and dimensions directly impact page speed and user experience. Creating properly sized thumbnails for galleries, portfolios, and image grids is another frequent application. Many users rely on our tool for adjusting photos to meet specific social media platform requirements, reducing image dimensions for faster email delivery and avoiding attachment size limits, and creating consistent image sizes for online marketplaces and product listings.
              </p>
              <p>
                Additionally, ResizeLab is invaluable for <Link to="/blog/optimize-images-website-speed" className="text-primary hover:underline">optimizing images for website speed</Link>—a critical factor for SEO rankings and user satisfaction. Real estate agents resize listing photos for MLS systems, teachers prepare images for presentations, and job seekers optimize headshots for LinkedIn profiles.
              </p>

              <h3 className="text-xl font-semibold text-foreground mt-8">Benefits of Browser-Based Image Processing</h3>
              <p>
                Traditional online image editors require uploading your files to their servers, which raises legitimate privacy concerns and creates frustrating delays—especially for large files or slow connections. With ResizeLab's browser-based approach, your original images and resized results exist only on your computer. There's no server-side processing, no data retention policies to worry about, and no risk of your photos being used for AI training or other purposes without your consent.
              </p>
              <p>
                This technology leverages the HTML5 Canvas API, a standard feature in all modern web browsers. ResizeLab works reliably across Chrome, Firefox, Safari, Edge, Brave, and other popular browsers without requiring any plugins, extensions, or software downloads. Simply visit the website, upload your image, choose your settings, and download your resized result—all within seconds, all completely free.
              </p>

              <h3 className="text-xl font-semibold text-foreground mt-8">Quality Control: Maintain Image Clarity While Resizing</h3>
              <p>
                One of the biggest concerns when resizing images is quality loss. ResizeLab addresses this by using high-quality resampling algorithms and giving you full control over output quality settings. When saving as JPEG or WEBP, you can adjust the quality slider to find the perfect balance between file size and visual fidelity. For a deeper understanding of compression techniques, explore our <Link to="/blog/image-compression-guide-reduce-file-size" className="text-primary hover:underline">image compression guide</Link> that explains how to reduce file size without sacrificing quality.
              </p>
              <p>
                The tool also features an aspect ratio lock, ensuring your images don't get stretched or distorted during resizing. Quick preset sizes and percentage-based scaling make it easy to achieve consistent results across multiple images. Whether you need a specific pixel dimension, a percentage reduction, or a standard web size, ResizeLab has you covered. For more advanced users, our guide on <Link to="/blog/understanding-aspect-ratios-images" className="text-primary hover:underline">understanding aspect ratios</Link> provides valuable insights for photography and design work.
              </p>

              <h3 className="text-xl font-semibold text-foreground mt-8">Start Resizing Images Today</h3>
              <p>
                Whether you need to optimize product photos for your online store, prepare images for your blog, or simply make a picture smaller for sharing, ResizeLab provides everything you need in a simple, free, and privacy-focused package. No signup required, no limitations, no hidden costs—just fast, high-quality image resizing that works exactly the way you need it to.
              </p>
            </div>
          </article>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="container py-12 md:py-16">
        <div className="mx-auto max-w-3xl">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
              Frequently Asked Questions
            </h2>
            <p className="mt-3 text-muted-foreground">
              Everything you need to know about using ResizeLab
            </p>
          </div>
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((faq, i) => (
              <AccordionItem
                key={i}
                value={`faq-${i}`}
                className="rounded-xl border border-border bg-card px-6 data-[state=open]:border-primary/50"
              >
                <AccordionTrigger className="text-left font-semibold hover:no-underline py-4">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-4">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      <AdPlaceholder position="bottom" className="container mb-8" />
    </Layout>
  );
}
