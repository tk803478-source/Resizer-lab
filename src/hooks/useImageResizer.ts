import { useState, useCallback } from "react";

export interface ImageData {
  file: File;
  url: string;
  width: number;
  height: number;
  name: string;
}

export interface ResizeOptions {
  width: number;
  height: number;
  maintainAspectRatio: boolean;
  format: "jpeg" | "png" | "webp";
  quality: number;
}

export interface ResizedImage {
  url: string;
  blob: Blob;
  width: number;
  height: number;
}

export function useImageResizer() {
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

  const setImage = useCallback(async (file: File) => {
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
  }, [loadImage, originalImage, resizedImage]);

  const resizeImage = useCallback(async (options: ResizeOptions) => {
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

      // Use high-quality image smoothing
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";

      ctx.drawImage(img, 0, 0, options.width, options.height);

      const mimeType = `image/${options.format}`;
      const quality = options.format === "png" ? undefined : options.quality / 100;

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
  }, [originalImage, resizedImage]);

  const downloadImage = useCallback((format: string) => {
    if (!resizedImage || !originalImage) return;

    const link = document.createElement("a");
    link.href = resizedImage.url;
    link.download = `${originalImage.name}-resized.${format}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, [resizedImage, originalImage]);

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
