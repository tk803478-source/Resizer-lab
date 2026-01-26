import { ReactNode } from "react";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">{children}</main>
      
      {/* Ad Network Script */}
      <div className="container py-4">
        <script async data-cfasync="false" src="https://pl28559934.effectivegatecpm.com/3ec4c179c81289f3b19d4dc6a5ccf170/invoke.js"></script>
        <div id="container-3ec4c179c81289f3b19d4dc6a5ccf170"></div>
      </div>
      
      <Footer />
    </div>
  );
}
