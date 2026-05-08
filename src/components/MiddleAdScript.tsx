import { useEffect, useRef } from "react";

export function MiddleAdScript() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    if (containerRef.current.dataset.loaded === "true") return;

    const s = document.createElement("script");
    (s as any).settings = {};
    s.src =
      "//masculine-employment.com/b.XSVjszdIGelb0oYsW/cX/qeim/9gucZRUfl/kOPnTicJwPM/j/kb2_O/TFcQtXNbzwANydOoTfczwfMMQT";
    s.async = true;
    s.referrerPolicy = "no-referrer-when-downgrade";
    containerRef.current.appendChild(s);
    containerRef.current.dataset.loaded = "true";
  }, []);

  return <div ref={containerRef} aria-hidden="true" className="my-6 flex justify-center" />;
}
