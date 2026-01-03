import { useState, useEffect, useCallback } from "react";
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
} from "lucide-react";

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
    answer: "Yes, ResizeLab is 100% free to use. There are no hidden fees, premium features, or subscription requirements. You can resize unlimited images without any cost."
  },
  {
    question: "Is my data safe when using this tool?",
    answer: "Absolutely. Your images are processed entirely in your browser using the HTML5 Canvas API. Your files never leave your device or get uploaded to any server. We have no access to your images whatsoever."
  },
  {
    question: "Does this tool work on mobile devices?",
    answer: "Yes! ResizeLab is fully responsive and works perfectly on smartphones, tablets, and desktop computers. You can resize images on-the-go from any modern mobile browser."
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
    answer: "Yes, ResizeLab runs entirely in your web browser. This means you don't need to download or install any software, and you can use it on any device with a modern browser."
  },
  {
    question: "What image formats are supported?",
    answer: "ResizeLab supports the most common image formats including JPEG, PNG, and WEBP. You can also convert between these formats while resizing."
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
      {/* Hero Section */}
      <div className="gradient-hero">
        <section className="container py-12 md:py-16">
          <div className="mx-auto max-w-2xl text-center animate-fade-in">
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              Free Online Image Resizer – <span className="text-gradient">Resize Instantly</span>
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              Fast, free, and easy online tools for everyday use. Resize any image directly in your browser with complete privacy.
            </p>
          </div>

          <div className="mt-10 flex flex-wrap justify-center gap-4 md:gap-8">
            {heroFeatures.map(({ icon: Icon, label, desc }, i) => (
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

      <AdPlaceholder position="banner" className="container mt-8" />

      {/* Main Tool Section */}
      <section className="container py-8 md:py-12">
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
              The Best Free Online Image Resizer
            </h2>
            
            <div className="space-y-6 text-muted-foreground leading-relaxed">
              <p>
                ResizeLab is a powerful, free online image resizer designed for anyone who needs to quickly adjust image dimensions without the hassle of complex software. Whether you're a blogger preparing images for your website, a social media manager optimizing content for different platforms, or simply someone who needs to resize a photo for an email, ResizeLab makes the process effortless.
              </p>

              <h3 className="text-xl font-semibold text-foreground mt-8">What Makes ResizeLab Different?</h3>
              <p>
                Unlike many online image tools that require you to upload files to remote servers, ResizeLab processes everything directly in your web browser. This approach offers significant advantages: your images remain completely private since they never leave your device, processing is nearly instantaneous with no upload or download wait times, and you can use the tool even with a slow internet connection after the page loads.
              </p>

              <h3 className="text-xl font-semibold text-foreground mt-8">Who Should Use This Tool?</h3>
              <p>
                ResizeLab is perfect for a wide range of users. Content creators and bloggers can quickly resize images to fit their website layouts. E-commerce sellers can prepare product photos with consistent dimensions. Social media managers can optimize images for different platform requirements. Photographers can create smaller versions of their work for web sharing. Students and professionals can resize images for presentations and documents. Even casual users who just need to make a photo smaller for an email will find ResizeLab intuitive and helpful.
              </p>

              <h3 className="text-xl font-semibold text-foreground mt-8">Common Use Cases</h3>
              <p>
                The most popular uses for ResizeLab include preparing images for websites and blogs where file size and dimensions matter for page speed, creating properly sized thumbnails for galleries and portfolios, adjusting photos to meet social media platform requirements, reducing image dimensions for faster email delivery, and creating consistent image sizes for online marketplaces and product listings.
              </p>

              <h3 className="text-xl font-semibold text-foreground mt-8">Why Choose Browser-Based Processing?</h3>
              <p>
                Traditional online image editors require uploading your files to their servers, which raises privacy concerns and creates delays. With ResizeLab's browser-based approach, your original images and resized results exist only on your computer. There's no risk of your photos being stored, analyzed, or accessed by third parties. This makes ResizeLab ideal for resizing sensitive documents, personal photos, or business materials where confidentiality matters.
              </p>

              <p>
                The technology behind this is the HTML5 Canvas API, a standard feature in all modern web browsers. This means ResizeLab works reliably across Chrome, Firefox, Safari, Edge, and other popular browsers without requiring any plugins or downloads. Simply visit the website, upload your image, choose your settings, and download your resized result—all within seconds.
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
