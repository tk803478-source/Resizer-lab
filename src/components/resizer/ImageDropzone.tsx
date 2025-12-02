import { useCallback, useState } from "react";
import { Upload, ImageIcon, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface ImageDropzoneProps {
  onImageSelect: (file: File) => void;
  hasImage: boolean;
  onClear: () => void;
}

export function ImageDropzone({ onImageSelect, hasImage, onClear }: ImageDropzoneProps) {
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
        <span className="text-sm font-medium text-accent-foreground">Image loaded</span>
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
        <div className={cn(
          "flex h-16 w-16 items-center justify-center rounded-2xl transition-all duration-300",
          isDragging ? "gradient-primary scale-110" : "bg-secondary"
        )}>
          <Upload className={cn(
            "h-7 w-7 transition-colors",
            isDragging ? "text-primary-foreground" : "text-muted-foreground"
          )} />
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
