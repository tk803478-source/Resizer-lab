import { useCallback, useRef, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Upload, Download, Eraser, Loader2, X, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const MAX_DIMENSION = 1024;

function resizeIfNeeded(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, image: HTMLImageElement) {
  let width = image.naturalWidth;
  let height = image.naturalHeight;
  if (width > MAX_DIMENSION || height > MAX_DIMENSION) {
    if (width > height) {
      height = Math.round((height * MAX_DIMENSION) / width);
      width = MAX_DIMENSION;
    } else {
      width = Math.round((width * MAX_DIMENSION) / height);
      height = MAX_DIMENSION;
    }
  }
  canvas.width = width;
  canvas.height = height;
  ctx.drawImage(image, 0, 0, width, height);
  return { width, height };
}

export default function BackgroundRemover() {
  const [originalUrl, setOriginalUrl] = useState<string | null>(null);
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [stage, setStage] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const fileRef = useRef<File | null>(null);

  const handleFile = (file: File) => {
    if (!file.type.startsWith("image/")) {
      toast.error("Please upload an image file");
      return;
    }
    fileRef.current = file;
    if (originalUrl) URL.revokeObjectURL(originalUrl);
    if (resultUrl) URL.revokeObjectURL(resultUrl);
    setOriginalUrl(URL.createObjectURL(file));
    setResultUrl(null);
  };

  const removeBackground = useCallback(async () => {
    if (!fileRef.current) return;
    setLoading(true);
    setProgress(0);
    setStage("Loading AI model...");

    try {
      const { pipeline, env } = await import("@huggingface/transformers");
      env.allowLocalModels = false;
      env.useBrowserCache = true;

      const segmenter = await pipeline(
        "background-removal",
        "Xenova/modnet",
        {
          device: "webgpu" as any,
          progress_callback: (p: any) => {
            if (p?.status === "progress" && typeof p.progress === "number") {
              setProgress(Math.round(p.progress));
              setStage(`Downloading model... ${Math.round(p.progress)}%`);
            }
          },
        } as any
      ).catch(async () => {
        // Fallback to CPU/WASM if WebGPU unavailable
        return pipeline("background-removal", "Xenova/modnet");
      });

      setStage("Processing image...");
      setProgress(50);

      const img = new Image();
      img.crossOrigin = "anonymous";
      img.src = URL.createObjectURL(fileRef.current);
      await new Promise((res, rej) => {
        img.onload = res;
        img.onerror = rej;
      });

      const inputCanvas = document.createElement("canvas");
      const inputCtx = inputCanvas.getContext("2d")!;
      const { width, height } = resizeIfNeeded(inputCanvas, inputCtx, img);
      const dataUrl = inputCanvas.toDataURL("image/png");

      setProgress(75);
      setStage("Removing background...");

      const output: any = await (segmenter as any)(dataUrl);
      const first = Array.isArray(output) ? output[0] : output;

      // transformers background-removal returns a RawImage with RGBA data
      const outCanvas = document.createElement("canvas");
      outCanvas.width = width;
      outCanvas.height = height;
      const outCtx = outCanvas.getContext("2d")!;

      if (first?.data && first?.width && first?.height) {
        // Output is already a cut-out RawImage
        const rgba = first.channels === 4
          ? first.data
          : (() => {
              // Treat as mask: apply to original
              const imageData = inputCtx.getImageData(0, 0, width, height);
              for (let i = 0; i < first.data.length; i++) {
                imageData.data[i * 4 + 3] = first.data[i];
              }
              outCtx.putImageData(imageData, 0, 0);
              return null;
            })();
        if (rgba) {
          const imageData = new ImageData(new Uint8ClampedArray(rgba), first.width, first.height);
          outCanvas.width = first.width;
          outCanvas.height = first.height;
          outCtx.putImageData(imageData, 0, 0);
        }
      }

      const blob = await new Promise<Blob>((resolve, reject) =>
        outCanvas.toBlob((b) => (b ? resolve(b) : reject(new Error("Blob failed"))), "image/png")
      );

      if (resultUrl) URL.revokeObjectURL(resultUrl);
      setResultUrl(URL.createObjectURL(blob));
      setProgress(100);
      setStage("Done");
      toast.success("Background removed!");
    } catch (e: any) {
      console.error(e);
      toast.error(e.message || "Failed to remove background");
    } finally {
      setLoading(false);
    }
  }, [resultUrl]);

  const download = () => {
    if (!resultUrl) return;
    const a = document.createElement("a");
    a.href = resultUrl;
    a.download = `no-bg-${Date.now()}.png`;
    a.click();
  };

  const clear = () => {
    if (originalUrl) URL.revokeObjectURL(originalUrl);
    if (resultUrl) URL.revokeObjectURL(resultUrl);
    setOriginalUrl(null);
    setResultUrl(null);
    fileRef.current = null;
  };

  return (
    <Layout>
      <Helmet>
        <title>AI Background Remover + Resize Image to Passport, Logo & Custom Size | Resizer Lab</title>
        <meta
          name="description"
          content="Remove backgrounds and resize the image size in one flow — transparent PNGs perfect to resize image to passport size, logo size, Instagram size, or any custom size. 100% private, browser-based."
        />
        <meta name="keywords" content="background remover, remove image background, transparent png, resize image to passport size, resize image to logo size, resize image to instagram size, resize image custom size, image resizer custom size, resize image size without losing quality" />
        <link rel="canonical" href="https://resizerlab.lovable.app/background-remover" />
      </Helmet>

      <section className="bg-gradient-to-b from-accent/50 to-background py-10">
        <div className="container max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            <Sparkles className="h-4 w-4" />
            AI-Powered • Runs in your browser
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            <span className="text-gradient">Background</span> Remover
          </h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Drop an image and get a transparent PNG in seconds. Nothing leaves
            your device — processing happens entirely in your browser.
          </p>
        </div>
      </section>

      <section className="container py-10 max-w-5xl">
        {!originalUrl ? (
          <Card>
            <CardContent
              className="p-6"
              onDragOver={(e) => {
                e.preventDefault();
                setIsDragging(true);
              }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={(e) => {
                e.preventDefault();
                setIsDragging(false);
                const f = e.dataTransfer.files?.[0];
                if (f) handleFile(f);
              }}
            >
              <div
                className={cn(
                  "relative border-2 border-dashed rounded-2xl p-12 transition-all",
                  isDragging
                    ? "border-primary bg-primary/5"
                    : "border-border hover:border-primary/50 hover:bg-accent/30"
                )}
              >
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
                  className="absolute inset-0 cursor-pointer opacity-0"
                  aria-label="Upload image"
                />
                <div className="flex flex-col items-center gap-4 pointer-events-none">
                  <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-secondary">
                    <Upload className="h-9 w-9 text-muted-foreground" />
                  </div>
                  <div className="text-center">
                    <p className="text-lg font-semibold">Drop your image here</p>
                    <p className="mt-2 text-sm text-muted-foreground">
                      or click to browse • PNG, JPG, WEBP
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Original</CardTitle>
                </CardHeader>
                <CardContent>
                  <img src={originalUrl} alt="Original" className="w-full rounded-lg" />
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Result</CardTitle>
                </CardHeader>
                <CardContent>
                  {resultUrl ? (
                    <div
                      className="w-full rounded-lg"
                      style={{
                        backgroundImage:
                          "linear-gradient(45deg, hsl(var(--muted)) 25%, transparent 25%), linear-gradient(-45deg, hsl(var(--muted)) 25%, transparent 25%), linear-gradient(45deg, transparent 75%, hsl(var(--muted)) 75%), linear-gradient(-45deg, transparent 75%, hsl(var(--muted)) 75%)",
                        backgroundSize: "20px 20px",
                        backgroundPosition: "0 0, 0 10px, 10px -10px, -10px 0",
                      }}
                    >
                      <img src={resultUrl} alt="Background removed" className="w-full rounded-lg" />
                    </div>
                  ) : (
                    <div className="flex aspect-square items-center justify-center rounded-lg border-2 border-dashed border-border text-muted-foreground text-sm">
                      {loading ? "Processing..." : 'Click "Remove Background"'}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {loading && (
              <Card>
                <CardContent className="p-4 space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    {stage}
                  </div>
                  <Progress value={progress} />
                </CardContent>
              </Card>
            )}

            <div className="flex flex-wrap gap-3 justify-center">
              <Button onClick={removeBackground} disabled={loading} size="lg" variant="hero">
                {loading ? <Loader2 className="animate-spin" /> : <Eraser />}
                Remove Background
              </Button>
              {resultUrl && (
                <Button onClick={download} size="lg" variant="outline">
                  <Download /> Download PNG
                </Button>
              )}
              <Button onClick={clear} size="lg" variant="ghost">
                <X /> Clear
              </Button>
            </div>

            <p className="text-xs text-muted-foreground text-center max-w-xl mx-auto">
              First run downloads the AI model (~40MB) — it's cached for subsequent uses.
              Large images are scaled to {MAX_DIMENSION}px for performance.
            </p>
          </div>
        )}
      </section>
    </Layout>
  );
}
