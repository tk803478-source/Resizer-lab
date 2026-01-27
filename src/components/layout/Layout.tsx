import { ReactNode, useEffect } from "react";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  useEffect(() => {
    // Load native banner ad script
    const existingNativeScript = document.getElementById("effectivegatecpm-ad");
    if (!existingNativeScript) {
      const script = document.createElement("script");
      script.id = "effectivegatecpm-ad";
      script.src = "https://pl28559934.effectivegatecpm.com/3ec4c179c81289f3b19d4dc6a5ccf170/invoke.js";
      script.async = true;
      script.setAttribute("data-cfasync", "false");
      document.body.appendChild(script);
    }

    // Load highperformanceformat banner ad script (728x90)
    const existingBannerScript = document.getElementById("highperformanceformat-ad");
    if (!existingBannerScript) {
      (window as any).atOptions = {
        'key': '954149f733f6d757596ec60626eeaf57',
        'format': 'iframe',
        'height': 90,
        'width': 728,
        'params': {}
      };
      
      const script = document.createElement("script");
      script.id = "highperformanceformat-ad";
      script.src = "https://www.highperformanceformat.com/954149f733f6d757596ec60626eeaf57/invoke.js";
      script.async = true;
      
      const container = document.getElementById("banner-ad-container");
      if (container) {
        container.appendChild(script);
      }
    }

    // Load highperformanceformat top banner ad script (300x250)
    const existingTopBannerScript = document.getElementById("highperformanceformat-top-ad");
    if (!existingTopBannerScript) {
      (window as any).atOptions = {
        'key': '5ce852d6721d68f87ef8f2aab1dfde06',
        'format': 'iframe',
        'height': 250,
        'width': 300,
        'params': {}
      };
      
      const script = document.createElement("script");
      script.id = "highperformanceformat-top-ad";
      script.src = "https://www.highperformanceformat.com/5ce852d6721d68f87ef8f2aab1dfde06/invoke.js";
      script.async = true;
      
      const container = document.getElementById("top-banner-ad-container");
      if (container) {
        container.appendChild(script);
      }
    }
  }, []);

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      
      {/* Top Banner Ad Container (300x250) */}
      <div className="container py-4 flex justify-center">
        <div id="top-banner-ad-container"></div>
      </div>
      
      <main className="flex-1">{children}</main>
      
      {/* Banner Ad Container (728x90) */}
      <div className="container py-4 flex justify-center">
        <div id="banner-ad-container"></div>
      </div>
      
      {/* Native Banner Ad Container */}
      <div className="container py-4">
        <div id="container-3ec4c179c81289f3b19d4dc6a5ccf170"></div>
      </div>
      
      <Footer />
    </div>
  );
}
