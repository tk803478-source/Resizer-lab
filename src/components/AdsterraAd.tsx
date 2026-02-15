import { useEffect, useRef, useId } from "react";

interface AdsterraAdProps {
  className?: string;
}

export function AdsterraAd({ className = "" }: AdsterraAdProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const loadedRef = useRef(false);

  useEffect(() => {
    if (loadedRef.current || !containerRef.current) return;
    loadedRef.current = true;

    const adContainer = document.createElement("div");
    adContainer.id = "container-3ec4c179c81289f3b19d4dc6a5ccf170";
    containerRef.current.appendChild(adContainer);

    const script = document.createElement("script");
    script.async = true;
    script.setAttribute("data-cfasync", "false");
    script.src =
      "https://pl28559934.effectivegatecpm.com/3ec4c179c81289f3b19d4dc6a5ccf170/invoke.js";
    containerRef.current.appendChild(script);
  }, []);

  return <div ref={containerRef} className={className} />;
}
