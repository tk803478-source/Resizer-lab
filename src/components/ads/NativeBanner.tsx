import { useEffect, useRef } from "react";

const CONTAINER_ID = "container-3ec4c179c81289f3b19d4dc6a5ccf170";
const SRC =
  "https://pl28559934.effectivecpmnetwork.com/3ec4c179c81289f3b19d4dc6a5ccf170/invoke.js";

export function NativeBanner({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = ref.current;
    if (!host) return;
    const script = document.createElement("script");
    script.src = SRC;
    script.async = true;
    script.setAttribute("data-cfasync", "false");
    host.appendChild(script);
    return () => {
      script.remove();
    };
  }, []);

  return (
    <div ref={ref} className={className}>
      <div id={CONTAINER_ID} />
    </div>
  );
}
