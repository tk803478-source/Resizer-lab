import { useState, useCallback, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DraggableResizeBox } from "@/components/resizer/DraggableResizeBox";
import { cn } from "@/lib/utils";
import {
  Upload,
  ImageIcon,
  X,
  Link2,
  Link2Off,
  Download,
  Wand2,
  RotateCcw,
  Sparkles,
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
      <div className="flex items-center justify-between gap-3 p-4 rounded-xl bg-accent/50 border border-accent">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
            <ImageIcon className="h-5 w-5 text-primary" />
          </div>
          <div>
            <span className="text-sm font-medium text-foreground block">
              Image loaded successfully
            </span>
            <span className="text-xs text-muted-foreground">
              Ready to resize
            </span>
          </div>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={onClear}
          className="text-muted-foreground hover:text-destructive hover:border-destructive"
        >
          <X className="h-4 w-4 mr-1" />
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
      className={cn(
        "relative border-2 border-dashed rounded-2xl p-12 transition-all duration-300 ease-out",
        isDragging
          ? "border-primary bg-primary/5 scale-[1.02] shadow-glow"
          : "border-border hover:border-primary/50 hover:bg-accent/30"
      )}
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
            "flex h-20 w-20 items-center justify-center rounded-2xl transition-all duration-300",
            isDragging ? "gradient-primary scale-110" : "bg-secondary"
          )}
        >
          <Upload
            className={cn(
              "h-9 w-9 transition-colors",
              isDragging ? "text-primary-foreground" : "text-muted-foreground"
            )}
          />
        </div>
        <div className="text-center">
          <p className="text-lg font-semibold text-foreground">
            {isDragging ? "Drop your image here" : "Drag & drop your image"}
          </p>
          <p className="mt-2 text-sm text-muted-foreground">
            or click to browse • Supports PNG, JPG, WEBP
          </p>
        </div>
      </div>
    </div>
  );
}

// ============= Main Page Component =============
export default function ImageResizer() {
  const {
    originalImage,
    resizedImage,
    isProcessing,
    setImage,
    resizeImage,
    downloadImage,
    clearImages,
  } = useImageResizer();

  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const [maintainAspectRatio, setMaintainAspectRatio] = useState(true);
  const [format, setFormat] = useState<"jpeg" | "png" | "webp">("jpeg");
  const [quality, setQuality] = useState(85);
  const [activePreset, setActivePreset] = useState<number | null>(null);

  const aspectRatio = originalImage
    ? originalImage.width / originalImage.height
    : 1;

  useEffect(() => {
    if (originalImage) {
      setWidth(originalImage.width);
      setHeight(originalImage.height);
    }
  }, [originalImage]);

  const handleDragResize = useCallback(
    (newWidth: number, newHeight: number) => {
      setWidth(newWidth);
      setHeight(newHeight);
      setActivePreset(null);
    },
    []
  );

  const applyPreset = useCallback(
    (preset: number) => {
      if (!originalImage) return;

      setActivePreset(preset);

      if (originalImage.width >= originalImage.height) {
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
    [originalImage, maintainAspectRatio, aspectRatio, width, height]
  );

  const applyPercentage = useCallback(
    (percent: number) => {
      if (!originalImage) return;
      setActivePreset(null);
      setWidth(Math.round(originalImage.width * percent));
      setHeight(Math.round(originalImage.height * percent));
    },
    [originalImage]
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
    if (!originalImage || width <= 0 || height <= 0) return;
    resizeImage({ width, height, maintainAspectRatio, format, quality });
  };

  const handleReset = () => {
    if (originalImage) {
      setWidth(originalImage.width);
      setHeight(originalImage.height);
      setActivePreset(null);
    }
  };

  return (
    <Layout>
      <Helmet>
        <title>Image Resizer Tool – Resize Photos with Drag Controls | Resizer Lab</title>
        <meta
          name="description"
          content="Interactive image resizer with visual drag controls. Resize images by dragging handles, use presets, or enter custom dimensions. Free, fast, and private."
        />
        <link rel="canonical" href="https://resizerlab.lovable.app/image-resizer" />
      </Helmet>

      {/* Hero Header */}
      <section className="bg-gradient-to-b from-accent/50 to-background py-8 md:py-12">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              <Sparkles className="h-4 w-4" />
              Interactive Resizer
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl">
              Resize Images with{" "}
              <span className="text-gradient">Drag Controls</span>
            </h1>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              Use our interactive resize box with draggable handles for precise
              control. See exactly how your resized image will look before
              downloading.
            </p>
          </div>
        </div>
      </section>

      {/* Main Tool */}
      <section className="container py-8 md:py-12">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
            {/* Left: Upload & Preview */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Upload className="h-5 w-5 text-primary" />
                    Upload Image
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ImageDropzone
                    onImageSelect={setImage}
                    hasImage={!!originalImage}
                    onClear={clearImages}
                  />
                </CardContent>
              </Card>

              {originalImage && (
                <Card className="animate-fade-in">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span className="flex items-center gap-2">
                        <ImageIcon className="h-5 w-5 text-primary" />
                        Visual Resize Editor
                      </span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleReset}
                        className="text-muted-foreground"
                      >
                        <RotateCcw className="h-4 w-4 mr-1" />
                        Reset
                      </Button>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <DraggableResizeBox
                      imageUrl={originalImage.url}
                      imageWidth={originalImage.width}
                      imageHeight={originalImage.height}
                      targetWidth={width}
                      targetHeight={height}
                      onResize={handleDragResize}
                      maintainAspectRatio={maintainAspectRatio}
                    />
                  </CardContent>
                </Card>
              )}

              {/* Result Preview */}
              {resizedImage && (
                <Card className="animate-scale-in">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span className="flex items-center gap-2">
                        <Sparkles className="h-5 w-5 text-primary" />
                        Resized Result
                      </span>
                      <span className="text-sm font-normal text-muted-foreground">
                        {resizedImage.width} × {resizedImage.height} px
                      </span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="relative rounded-xl border border-border bg-secondary/30 overflow-hidden">
                      <img
                        src={resizedImage.url}
                        alt="Resized result"
                        className="w-full h-auto max-h-[400px] object-contain"
                      />
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Right: Controls */}
            <aside className="lg:sticky lg:top-24 lg:self-start space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Resize Options</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {!originalImage ? (
                    <div className="rounded-xl border border-dashed border-border p-8 text-center">
                      <p className="text-muted-foreground text-sm">
                        Upload an image to see resize options
                      </p>
                    </div>
                  ) : (
                    <>
                      {/* Dimensions */}
                      <div className="control-group">
                        <div className="flex items-center justify-between mb-3">
                          <Label className="text-sm font-semibold">
                            Dimensions
                          </Label>
                          <button
                            onClick={() =>
                              setMaintainAspectRatio(!maintainAspectRatio)
                            }
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
                            <Label className="text-xs text-muted-foreground">
                              Width (px)
                            </Label>
                            <Input
                              type="number"
                              value={width}
                              onChange={(e) => handleWidthChange(e.target.value)}
                              min={1}
                              className="h-9"
                            />
                          </div>
                          <div className="space-y-1.5">
                            <Label className="text-xs text-muted-foreground">
                              Height (px)
                            </Label>
                            <Input
                              type="number"
                              value={height}
                              onChange={(e) =>
                                handleHeightChange(e.target.value)
                              }
                              min={1}
                              className="h-9"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Quick Scale */}
                      <div className="control-group">
                        <Label className="text-sm font-semibold">
                          Quick Scale
                        </Label>
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

                      {/* Preset Sizes */}
                      <div className="control-group">
                        <Label className="text-sm font-semibold">
                          Preset Sizes
                        </Label>
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

                      {/* Output Format */}
                      <div className="control-group">
                        <Label className="text-sm font-semibold">
                          Output Format
                        </Label>
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

                      {/* Quality Slider */}
                      {format !== "png" && (
                        <div className="control-group">
                          <div className="flex items-center justify-between mb-3">
                            <Label className="text-sm font-semibold">
                              Quality
                            </Label>
                            <span className="text-sm font-medium text-primary">
                              {quality}%
                            </span>
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

                      {/* Action Buttons */}
                      <div className="flex flex-col gap-3 pt-2">
                        <Button
                          onClick={handleResize}
                          disabled={isProcessing || width <= 0 || height <= 0}
                          className="w-full gradient-primary hover:opacity-90"
                          size="lg"
                        >
                          <Wand2 className="h-4 w-4 mr-2" />
                          {isProcessing ? "Processing..." : "Resize Image"}
                        </Button>
                        <Button
                          onClick={() => downloadImage(format)}
                          disabled={!resizedImage}
                          variant="outline"
                          size="lg"
                          className="w-full"
                        >
                          <Download className="h-4 w-4 mr-2" />
                          Download Result
                        </Button>
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>
            </aside>
          </div>
        </div>
      </section>
    </Layout>
  );
}
