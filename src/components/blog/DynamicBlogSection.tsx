import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Link } from "react-router-dom";
import { Calendar, Clock, ArrowRight } from "lucide-react";

interface DynamicBlogSectionProps {
  location: string;
  limit?: number;
  title?: string;
  showViewAll?: boolean;
  compact?: boolean;
  linkedPage?: string;
}

interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  featured_image: string | null;
  read_time: string | null;
  created_at: string;
  publish_date: string | null;
  author_name: string | null;
  category: string | null;
  is_featured: boolean;
}

export function useBlogsByLocation(location: string, limit?: number) {
  return useQuery({
    queryKey: ["blogs-by-location", location, limit],
    queryFn: async () => {
      let query = supabase
        .from("blog_posts")
        .select("id, slug, title, excerpt, featured_image, read_time, created_at, publish_date, author_name, category, is_featured")
        .eq("is_published", true)
        .contains("display_locations", [location])
        .order("publish_date", { ascending: false });

      if (limit) query = query.limit(limit);

      const { data, error } = await query;
      if (error) throw error;
      return data as BlogPost[];
    },
  });
}

export function useBlogsByLinkedPage(page: string, limit?: number) {
  return useQuery({
    queryKey: ["blogs-by-linked-page", page, limit],
    queryFn: async () => {
      let query = supabase
        .from("blog_posts")
        .select("id, slug, title, excerpt, featured_image, read_time, created_at, publish_date, author_name, category, is_featured")
        .eq("is_published", true)
        .contains("linked_pages", [page])
        .order("publish_date", { ascending: false });

      if (limit) query = query.limit(limit);

      const { data, error } = await query;
      if (error) throw error;
      return data as BlogPost[];
    },
    enabled: !!page,
  });
}

export function DynamicBlogSection({
  location,
  limit = 3,
  title = "Recent Posts",
  showViewAll = true,
  compact = false,
  linkedPage,
}: DynamicBlogSectionProps) {
  const locationQuery = useBlogsByLocation(location, linkedPage ? undefined : limit);
  const linkedQuery = useBlogsByLinkedPage(linkedPage || "", linkedPage ? limit : undefined);

  const { data: posts, isLoading } = linkedPage ? linkedQuery : locationQuery;

  if (isLoading) {
    return (
      <div className="space-y-4">
        {title && <h2 className="text-2xl font-bold text-foreground">{title}</h2>}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="rounded-xl border border-border bg-card animate-pulse">
              <div className="h-40 bg-muted rounded-t-xl" />
              <div className="p-4 space-y-2">
                <div className="h-4 bg-muted rounded w-3/4" />
                <div className="h-3 bg-muted rounded w-full" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (!posts || posts.length === 0) return null;

  if (compact) {
    return (
      <div className="space-y-3">
        {title && <h3 className="text-lg font-semibold text-foreground">{title}</h3>}
        {posts.map((post) => (
          <Link
            key={post.id}
            to={`/blog/${post.slug}`}
            className="block p-3 rounded-lg border border-border hover:bg-accent/50 transition-colors"
          >
            <h4 className="text-sm font-medium line-clamp-2">{post.title}</h4>
            <p className="text-xs text-muted-foreground mt-1">
              {new Date(post.publish_date || post.created_at).toLocaleDateString()}
            </p>
          </Link>
        ))}
        {showViewAll && (
          <Link
            to="/blog"
            className="flex items-center gap-1 text-sm text-primary hover:underline"
          >
            View all posts <ArrowRight className="h-3 w-3" />
          </Link>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {title && (
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-foreground">{title}</h2>
          {showViewAll && (
            <Link
              to="/blog"
              className="flex items-center gap-1 text-sm text-primary hover:underline"
            >
              View all <ArrowRight className="h-4 w-4" />
            </Link>
          )}
        </div>
      )}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <Link
            key={post.id}
            to={`/blog/${post.slug}`}
            className="group rounded-xl border border-border bg-card overflow-hidden hover:shadow-lg transition-all"
          >
            {post.featured_image && (
              <div className="aspect-video overflow-hidden">
                <img
                  src={post.featured_image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
              </div>
            )}
            <div className="p-4 space-y-2">
              {post.category && (
                <span className="text-xs font-medium text-primary">{post.category}</span>
              )}
              <h3 className="font-semibold line-clamp-2 group-hover:text-primary transition-colors">
                {post.title}
              </h3>
              {post.excerpt && (
                <p className="text-sm text-muted-foreground line-clamp-2">{post.excerpt}</p>
              )}
              <div className="flex items-center gap-3 text-xs text-muted-foreground pt-1">
                <span className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  {new Date(post.publish_date || post.created_at).toLocaleDateString()}
                </span>
                {post.read_time && (
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {post.read_time}
                  </span>
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
