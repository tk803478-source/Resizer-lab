import { ReactNode, useEffect } from "react";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  useEffect(() => {
    // Load ad script only once
    const existingScript = document.getElementById("effectivegatecpm-ad");
    if (!existingScript) {
      const script = document.createElement("script");
      script.id = "effectivegatecpm-ad";
      script.src = "https://pl28559934.effectivegatecpm.com/3ec4c179c81289f3b19d4dc6a5ccf170/invoke.js";
      script.async = true;
      script.setAttribute("data-cfasync", "false");
      document.body.appendChild(script);
    }
  }, []);

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">{children}</main>
      
      {/* Native Banner Ad Container */}
      <div className="container py-4">
        <div id="container-3ec4c179c81289f3b19d4dc6a5ccf170"></div>
      </div>
      
      <Footer />
    </div>
  );
}
