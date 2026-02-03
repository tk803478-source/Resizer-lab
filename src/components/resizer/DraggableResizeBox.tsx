import { useState, useRef, useCallback, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Move, Maximize2 } from "lucide-react";

interface DraggableResizeBoxProps {
  imageUrl: string;
  imageWidth: number;
  imageHeight: number;
  targetWidth: number;
  targetHeight: number;
  onResize: (width: number, height: number) => void;
  maintainAspectRatio: boolean;
}

export function DraggableResizeBox({
  imageUrl,
  imageWidth,
  imageHeight,
  targetWidth,
  targetHeight,
  onResize,
  maintainAspectRatio,
}: DraggableResizeBoxProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragHandle, setDragHandle] = useState<string | null>(null);
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });

  // Calculate display scale to fit image in container
  const maxDisplayWidth = 600;
  const maxDisplayHeight = 400;
  const displayScale = Math.min(
    maxDisplayWidth / imageWidth,
    maxDisplayHeight / imageHeight,
    1
  );

  const displayImageWidth = imageWidth * displayScale;
  const displayImageHeight = imageHeight * displayScale;

  // Scale factor between display and actual dimensions
  const widthScale = imageWidth / displayImageWidth;
  const heightScale = imageHeight / displayImageHeight;

  // Target box dimensions in display space
  const boxWidth = Math.min(targetWidth / widthScale, displayImageWidth);
  const boxHeight = Math.min(targetHeight / heightScale, displayImageHeight);

  const aspectRatio = imageWidth / imageHeight;

  useEffect(() => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      setContainerSize({ width: rect.width, height: rect.height });
    }
  }, [displayImageWidth, displayImageHeight]);

  const handleMouseDown = useCallback(
    (e: React.MouseEvent, handle: string) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(true);
      setDragHandle(handle);
    },
    []
  );

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!isDragging || !dragHandle || !containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      let newWidth = boxWidth;
      let newHeight = boxHeight;

      // Calculate new dimensions based on drag handle
      if (dragHandle.includes("e")) {
        newWidth = Math.max(50, Math.min(mouseX, displayImageWidth));
      }
      if (dragHandle.includes("w")) {
        newWidth = Math.max(50, displayImageWidth - mouseX);
      }
      if (dragHandle.includes("s")) {
        newHeight = Math.max(50, Math.min(mouseY, displayImageHeight));
      }
      if (dragHandle.includes("n")) {
        newHeight = Math.max(50, displayImageHeight - mouseY);
      }

      // Apply aspect ratio constraint if needed
      if (maintainAspectRatio) {
        if (dragHandle === "e" || dragHandle === "w") {
          newHeight = newWidth / aspectRatio;
        } else if (dragHandle === "n" || dragHandle === "s") {
          newWidth = newHeight * aspectRatio;
        } else {
          // Corner drag - use the larger dimension
          const widthRatio = newWidth / boxWidth;
          const heightRatio = newHeight / boxHeight;
          if (widthRatio > heightRatio) {
            newHeight = newWidth / aspectRatio;
          } else {
            newWidth = newHeight * aspectRatio;
          }
        }
      }

      // Clamp to image bounds
      newWidth = Math.min(newWidth, displayImageWidth);
      newHeight = Math.min(newHeight, displayImageHeight);

      // Convert to actual image dimensions
      const actualWidth = Math.round(newWidth * widthScale);
      const actualHeight = Math.round(newHeight * heightScale);

      onResize(actualWidth, actualHeight);
    },
    [isDragging, dragHandle, boxWidth, boxHeight, displayImageWidth, displayImageHeight, widthScale, heightScale, maintainAspectRatio, aspectRatio, onResize]
  );

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
    setDragHandle(null);
  }, []);

  useEffect(() => {
    if (isDragging) {
      const handleGlobalMouseUp = () => {
        setIsDragging(false);
        setDragHandle(null);
      };
      window.addEventListener("mouseup", handleGlobalMouseUp);
      return () => window.removeEventListener("mouseup", handleGlobalMouseUp);
    }
  }, [isDragging]);

  const handleStyle = "absolute w-4 h-4 bg-primary border-2 border-primary-foreground rounded-full shadow-lg cursor-pointer hover:scale-125 transition-transform z-20";
  const edgeHandleStyle = "absolute bg-primary/80 z-20";

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Maximize2 className="h-4 w-4 text-primary" />
          <span className="text-sm font-medium text-foreground">
            Drag the handles to resize
          </span>
        </div>
        <span className="text-xs text-muted-foreground">
          {targetWidth} × {targetHeight} px
        </span>
      </div>

      <div
        ref={containerRef}
        className="relative rounded-xl border-2 border-dashed border-border bg-secondary/30 overflow-hidden"
        style={{
          width: displayImageWidth,
          height: displayImageHeight,
          maxWidth: "100%",
          margin: "0 auto",
        }}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        {/* Background Image */}
        <img
          src={imageUrl}
          alt="Original"
          className="absolute inset-0 w-full h-full object-contain opacity-40"
          draggable={false}
        />

        {/* Resize Box */}
        <div
          className={cn(
            "absolute top-0 left-0 border-2 border-primary bg-transparent transition-shadow",
            isDragging ? "shadow-glow" : "shadow-lg"
          )}
          style={{
            width: boxWidth,
            height: boxHeight,
            maxWidth: displayImageWidth,
            maxHeight: displayImageHeight,
          }}
        >
          {/* Active preview area */}
          <div className="absolute inset-0 overflow-hidden">
            <img
              src={imageUrl}
              alt="Preview"
              className="absolute top-0 left-0"
              style={{
                width: displayImageWidth,
                height: displayImageHeight,
              }}
              draggable={false}
            />
          </div>

          {/* Grid overlay */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="w-full h-full grid grid-cols-3 grid-rows-3">
              {[...Array(9)].map((_, i) => (
                <div key={i} className="border border-primary/20" />
              ))}
            </div>
          </div>

          {/* Corner handles */}
          <div
            className={cn(handleStyle, "-top-2 -left-2 cursor-nwse-resize")}
            onMouseDown={(e) => handleMouseDown(e, "nw")}
          />
          <div
            className={cn(handleStyle, "-top-2 -right-2 cursor-nesw-resize")}
            onMouseDown={(e) => handleMouseDown(e, "ne")}
          />
          <div
            className={cn(handleStyle, "-bottom-2 -left-2 cursor-nesw-resize")}
            onMouseDown={(e) => handleMouseDown(e, "sw")}
          />
          <div
            className={cn(handleStyle, "-bottom-2 -right-2 cursor-nwse-resize")}
            onMouseDown={(e) => handleMouseDown(e, "se")}
          />

          {/* Edge handles */}
          <div
            className={cn(edgeHandleStyle, "top-1/2 -left-1 w-2 h-8 -translate-y-1/2 rounded-full cursor-ew-resize hover:bg-primary transition-colors")}
            onMouseDown={(e) => handleMouseDown(e, "w")}
          />
          <div
            className={cn(edgeHandleStyle, "top-1/2 -right-1 w-2 h-8 -translate-y-1/2 rounded-full cursor-ew-resize hover:bg-primary transition-colors")}
            onMouseDown={(e) => handleMouseDown(e, "e")}
          />
          <div
            className={cn(edgeHandleStyle, "-top-1 left-1/2 w-8 h-2 -translate-x-1/2 rounded-full cursor-ns-resize hover:bg-primary transition-colors")}
            onMouseDown={(e) => handleMouseDown(e, "n")}
          />
          <div
            className={cn(edgeHandleStyle, "-bottom-1 left-1/2 w-8 h-2 -translate-x-1/2 rounded-full cursor-ns-resize hover:bg-primary transition-colors")}
            onMouseDown={(e) => handleMouseDown(e, "s")}
          />

          {/* Center drag indicator */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="bg-background/90 backdrop-blur-sm rounded-lg px-3 py-2 shadow-lg border border-border">
              <div className="flex items-center gap-2 text-xs font-medium">
                <Move className="h-3 w-3 text-primary" />
                <span>{targetWidth} × {targetHeight}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Dimension labels */}
        <div className="absolute bottom-2 right-2 bg-background/90 backdrop-blur-sm rounded-md px-2 py-1 text-xs font-medium border border-border">
          Original: {imageWidth} × {imageHeight}
        </div>
      </div>

      <p className="text-xs text-center text-muted-foreground">
        Drag corner or edge handles to adjust the output size
      </p>
    </div>
  );
}
