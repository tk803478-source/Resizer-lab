import { ImageData, ResizedImage } from "@/hooks/useImageResizer";
import { cn } from "@/lib/utils";

interface ImagePreviewProps {
  original: ImageData | null;
  resized: ResizedImage | null;
  isProcessing: boolean;
}

export function ImagePreview({ original, resized, isProcessing }: ImagePreviewProps) {
  if (!original) return null;

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {/* Original Image */}
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

      {/* Resized Image */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-foreground">Resized</h3>
          {resized && (
            <span className="text-xs text-muted-foreground">
              {resized.width} × {resized.height}
            </span>
          )}
        </div>
        <div className={cn(
          "relative aspect-video overflow-hidden rounded-xl border border-border bg-secondary/50",
          isProcessing && "animate-pulse"
        )}>
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
