import { useState, useEffect, useCallback } from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
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
const features = [
  { icon: Zap, label: "Lightning Fast", desc: "Browser-based processing" },
  { icon: Shield, label: "100% Private", desc: "No uploads to servers" },
  { icon: Sparkles, label: "High Quality", desc: "Maintains image clarity" },
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
      <div className="gradient-hero">
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
    </Layout>
  );
}
