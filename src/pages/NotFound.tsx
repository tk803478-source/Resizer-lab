import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Home, Search } from "lucide-react";

export default function NotFound() {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <Layout>
      <div className="container flex min-h-[60vh] flex-col items-center justify-center py-16 text-center">
        <div className="animate-fade-in">
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-secondary">
            <Search className="h-10 w-10 text-muted-foreground" />
          </div>
          <h1 className="text-6xl font-bold text-gradient">404</h1>
          <p className="mt-4 text-xl text-muted-foreground">
            Oops! This page doesn't exist.
          </p>
          <p className="mt-2 text-sm text-muted-foreground">
            The page you're looking for might have been moved or deleted.
          </p>
          <Button asChild variant="gradient" size="lg" className="mt-8">
            <Link to="/">
              <Home className="h-4 w-4" />
              Back to Home
            </Link>
          </Button>
        </div>
      </div>
    </Layout>
  );
}
