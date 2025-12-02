import { Heart } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border/50 bg-secondary/30 py-6">
      <div className="container flex flex-col items-center justify-center gap-2 text-center text-sm text-muted-foreground">
        <p className="flex items-center gap-1.5">
          Built with{" "}
          <span className="inline-flex items-center gap-1 font-semibold text-primary">
            Lovable
            <Heart className="h-4 w-4 fill-primary text-primary" />
          </span>
        </p>
        <p className="text-xs">100% browser-based • No data stored</p>
      </div>
    </footer>
  );
}
