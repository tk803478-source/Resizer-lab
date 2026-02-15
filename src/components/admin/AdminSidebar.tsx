import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import logo from "@/assets/logo.png";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  FileText,
  BookOpen,
  Settings,
  Image,
  MessageSquare,
  Palette,
  Search,
  Megaphone,
  Wrench,
  LogOut,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/admin" },
  { icon: FileText, label: "Pages", href: "/admin/pages" },
  { icon: BookOpen, label: "Blog Posts", href: "/admin/blog" },
  { icon: Wrench, label: "Tool Content", href: "/admin/tool-content" },
  { icon: Search, label: "SEO Manager", href: "/admin/seo" },
  { icon: Palette, label: "Design & UI", href: "/admin/design" },
  { icon: Megaphone, label: "Ads Control", href: "/admin/ads" },
  { icon: Image, label: "Media Library", href: "/admin/media" },
  { icon: MessageSquare, label: "Messages", href: "/admin/messages" },
  { icon: Settings, label: "Settings", href: "/admin/settings" },
];

export function AdminSidebar() {
  const location = useLocation();
  const { signOut, user } = useAuth();
  const [collapsed, setCollapsed] = useState(false);

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 z-40 h-screen border-r border-border bg-card transition-all duration-300",
        collapsed ? "w-16" : "w-64"
      )}
    >
      <div className="flex h-full flex-col">
        {/* Header */}
        <div className="flex h-16 items-center justify-between border-b border-border px-4">
          {!collapsed && (
            <Link to="/admin" className="flex items-center gap-2">
              <img src={logo} alt="Resizer Lab" className="h-8 w-8 rounded-lg object-contain" />
              <span className="font-semibold text-foreground">Admin Panel</span>
            </Link>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setCollapsed(!collapsed)}
            className="ml-auto"
          >
            {collapsed ? (
              <ChevronRight className="h-4 w-4" />
            ) : (
              <ChevronLeft className="h-4 w-4" />
            )}
          </Button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto p-3 space-y-1">
          {navItems.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.href}
                to={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                )}
              >
                <item.icon className="h-5 w-5 flex-shrink-0" />
                {!collapsed && <span>{item.label}</span>}
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="border-t border-border p-3 space-y-2">
          {!collapsed && user && (
            <div className="px-3 py-2 text-xs text-muted-foreground truncate">
              {user.email}
            </div>
          )}
          <Button
            variant="ghost"
            className={cn(
              "w-full justify-start text-muted-foreground hover:text-destructive",
              collapsed && "justify-center px-0"
            )}
            onClick={handleSignOut}
          >
            <LogOut className="h-5 w-5" />
            {!collapsed && <span className="ml-3">Sign Out</span>}
          </Button>
          <Link to="/" className="block">
            <Button
              variant="outline"
              className={cn("w-full", collapsed && "px-0")}
            >
              {collapsed ? "←" : "← Back to Site"}
            </Button>
          </Link>
        </div>
      </div>
    </aside>
  );
}
