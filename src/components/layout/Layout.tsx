import { ReactNode } from "react";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { AdsterraAd } from "@/components/AdsterraAd";

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <AdsterraAd className="w-full flex justify-center py-2 bg-muted/20" />
      <main className="flex-1">{children}</main>
      <AdsterraAd className="w-full flex justify-center py-2 bg-muted/20" />
      <Footer />
    </div>
  );
}
