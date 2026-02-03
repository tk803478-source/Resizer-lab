import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { AuthProvider } from "@/contexts/AuthContext";
import { AdminRoute } from "@/components/admin/AdminRoute";
import ScrollToTop from "@/components/ScrollToTop";
import Index from "./pages/Index";
import ImageResizer from "./pages/ImageResizer";
import Gallery from "./pages/Gallery";
import About from "./pages/About";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import Guides from "./pages/Guides";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/Dashboard";
import PagesManager from "./pages/admin/PagesManager";
import BlogManager from "./pages/admin/BlogManager";
import ToolContentManager from "./pages/admin/ToolContentManager";
import SEOManager from "./pages/admin/SEOManager";
import DesignManager from "./pages/admin/DesignManager";
import AdsManager from "./pages/admin/AdsManager";
import MediaManager from "./pages/admin/MediaManager";
import MessagesManager from "./pages/admin/MessagesManager";
import SettingsManager from "./pages/admin/SettingsManager";

const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <ScrollToTop />
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/image-resizer" element={<ImageResizer />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/guides" element={<Guides />} />
              <Route path="/about" element={<About />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:slug" element={<BlogPost />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/contact" element={<Contact />} />
              
              {/* Admin Routes */}
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/admin" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
              <Route path="/admin/pages" element={<AdminRoute><PagesManager /></AdminRoute>} />
              <Route path="/admin/blog" element={<AdminRoute><BlogManager /></AdminRoute>} />
              <Route path="/admin/tool-content" element={<AdminRoute><ToolContentManager /></AdminRoute>} />
              <Route path="/admin/seo" element={<AdminRoute><SEOManager /></AdminRoute>} />
              <Route path="/admin/design" element={<AdminRoute><DesignManager /></AdminRoute>} />
              <Route path="/admin/ads" element={<AdminRoute><AdsManager /></AdminRoute>} />
              <Route path="/admin/media" element={<AdminRoute><MediaManager /></AdminRoute>} />
              <Route path="/admin/messages" element={<AdminRoute><MessagesManager /></AdminRoute>} />
              <Route path="/admin/settings" element={<AdminRoute><SettingsManager /></AdminRoute>} />
              
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
