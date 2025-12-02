import { useState, useEffect, useCallback } from "react";
import { Link2, Link2Off, Download, Wand2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";
import { ImageData, ResizeOptions } from "@/hooks/useImageResizer";

interface ResizeControlsProps {
  original: ImageData | null;
  onResize: (options: ResizeOptions) => void;
  onDownload: (format: string) => void;
  isProcessing: boolean;
  hasResized: boolean;
  initialPreset?: number | null;
}

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

export function ResizeControls({
  original,
  onResize,
  onDownload,
  isProcessing,
  hasResized,
  initialPreset,
}: ResizeControlsProps) {
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const [maintainAspectRatio, setMaintainAspectRatio] = useState(true);
  const [format, setFormat] = useState<"jpeg" | "png" | "webp">("jpeg");
  const [quality, setQuality] = useState(85);
  const [activePreset, setActivePreset] = useState<number | null>(null);

  const aspectRatio = original ? original.width / original.height : 1;

  // Initialize dimensions when original image loads
  useEffect(() => {
    if (original) {
      setWidth(original.width);
      setHeight(original.height);
    }
  }, [original]);

  // Handle initial preset from gallery
  useEffect(() => {
    if (initialPreset && original) {
      applyPreset(initialPreset);
    }
  }, [initialPreset, original]);

  const applyPreset = useCallback((preset: number) => {
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
  }, [original, maintainAspectRatio, aspectRatio, width, height]);

  const applyPercentage = useCallback((percent: number) => {
    if (!original) return;
    setActivePreset(null);
    setWidth(Math.round(original.width * percent));
    setHeight(Math.round(original.height * percent));
  }, [original]);

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
        <p className="text-muted-foreground">Upload an image to see resize options</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Dimensions */}
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

      {/* Percentage Scale */}
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

      {/* Presets */}
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

      {/* Format */}
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

      {/* Quality */}
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

      {/* Actions */}
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
