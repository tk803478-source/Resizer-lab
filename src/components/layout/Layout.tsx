import { ReactNode } from "react";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { AdBanner } from "@/components/ads/AdBanner";
import { NativeBanner } from "@/components/ads/NativeBanner";

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <AdBanner
        adKey="954149f733f6d757596ec60626eeaf57"
        width={728}
        height={90}
        className="container py-4"
      />
      <main className="flex-1">{children}</main>
      <div className="container py-6 space-y-6">
        <AdBanner
          adKey="5ce852d6721d68f87ef8f2aab1dfde06"
          width={300}
          height={250}
        />
        <NativeBanner />
      </div>
      <Footer />
    </div>
  );
}
