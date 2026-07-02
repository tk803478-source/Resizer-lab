import { useEffect, useRef } from "react";

export function TopAds() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    container.innerHTML = "";

    // Ad 1: Native banner (invoke.js + container div)
    const nativeWrap = document.createElement("div");
    const nativeScript = document.createElement("script");
    nativeScript.async = true;
    nativeScript.setAttribute("data-cfasync", "false");
    nativeScript.src =
      "https://pl28559934.effectivecpmnetwork.com/3ec4c179c81289f3b19d4dc6a5ccf170/invoke.js";
    const nativeDiv = document.createElement("div");
    nativeDiv.id = "container-3ec4c179c81289f3b19d4dc6a5ccf170";
    nativeWrap.appendChild(nativeScript);
    nativeWrap.appendChild(nativeDiv);
    container.appendChild(nativeWrap);

    // Ad 2: 728x90 banner
    const banner728 = document.createElement("div");
    banner728.style.margin = "12px auto";
    banner728.style.textAlign = "center";
    const opts728 = document.createElement("script");
    opts728.type = "text/javascript";
    opts728.text = `atOptions = {'key':'954149f733f6d757596ec60626eeaf57','format':'iframe','height':90,'width':728,'params':{}};`;
    const inv728 = document.createElement("script");
    inv728.type = "text/javascript";
    inv728.src =
      "https://www.highperformanceformat.com/954149f733f6d757596ec60626eeaf57/invoke.js";
    banner728.appendChild(opts728);
    banner728.appendChild(inv728);
    container.appendChild(banner728);

    // Ad 3: 300x250 banner
    const banner300 = document.createElement("div");
    banner300.style.margin = "12px auto";
    banner300.style.textAlign = "center";
    const opts300 = document.createElement("script");
    opts300.type = "text/javascript";
    opts300.text = `atOptions = {'key':'5ce852d6721d68f87ef8f2aab1dfde06','format':'iframe','height':250,'width':300,'params':{}};`;
    const inv300 = document.createElement("script");
    inv300.type = "text/javascript";
    inv300.src =
      "https://www.highperformanceformat.com/5ce852d6721d68f87ef8f2aab1dfde06/invoke.js";
    banner300.appendChild(opts300);
    banner300.appendChild(inv300);
    container.appendChild(banner300);

    return () => {
      container.innerHTML = "";
    };
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="w-full flex flex-col items-center gap-2 py-2"
    />
  );
}
