import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface PublicBlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  meta_description: string | null;
  meta_title: string | null;
  keywords: string[] | null;
  created_at: string;
  read_time: string | null;
  content: string;
  is_published: boolean;
}

export function usePublicBlogPosts() {
  return useQuery({
    queryKey: ["public-blog-posts"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("blog_posts")
        .select("*")
        .eq("is_published", true)
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data as PublicBlogPost[];
    },
  });
}

export function usePublicBlogPost(slug: string) {
  return useQuery({
    queryKey: ["public-blog-post", slug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("blog_posts")
        .select("*")
        .eq("slug", slug)
        .eq("is_published", true)
        .maybeSingle();

      if (error) throw error;
      return data as PublicBlogPost | null;
    },
    enabled: !!slug,
  });
}
