import { Link } from "react-router-dom";
import { Heart } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border/50 bg-secondary/30 py-8">
      <div className="container">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 mb-8">
          {/* Brand */}
          <div>
            <Link to="/" className="font-bold text-lg">
              <span className="text-gradient">Resizer</span>
              <span className="text-foreground"> Lab</span>
            </Link>
            <p className="mt-2 text-sm text-muted-foreground">
              Free online image resizer. Fast, private, and easy to use.
            </p>
          </div>

          {/* Tools */}
          <div>
            <h4 className="font-semibold mb-3 text-sm">Tools</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/" className="hover:text-primary transition-colors">Image Resizer</Link></li>
              <li><Link to="/gallery" className="hover:text-primary transition-colors">Size Presets</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-semibold mb-3 text-sm">Resources</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/guides" className="hover:text-primary transition-colors">Guides & Tutorials</Link></li>
              <li><Link to="/blog" className="hover:text-primary transition-colors">Blog</Link></li>
              <li><Link to="/blog/social-media-image-sizes-guide" className="hover:text-primary transition-colors">Social Media Sizes</Link></li>
              <li><Link to="/blog/image-compression-guide-reduce-file-size" className="hover:text-primary transition-colors">Compression Guide</Link></li>
              <li><Link to="/blog/seo-benefits-optimized-images" className="hover:text-primary transition-colors">SEO & Images</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold mb-3 text-sm">Company</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/about" className="hover:text-primary transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="hover:text-primary transition-colors">Contact</Link></li>
              <li><Link to="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms" className="hover:text-primary transition-colors">Terms of Service</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border/50 pt-6 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Resizer Lab. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
