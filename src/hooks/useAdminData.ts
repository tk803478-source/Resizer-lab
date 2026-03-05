import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

// Site Settings
export function useSiteSettings() {
  return useQuery({
    queryKey: ["site-settings"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("site_settings")
        .select("*");
      
      if (error) throw error;
      
      // Convert to object for easier access
      const settings: Record<string, any> = {};
      data?.forEach((item) => {
        settings[item.key] = item.value;
      });
      return settings;
    },
  });
}

export function useUpdateSiteSettings() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({ key, value }: { key: string; value: any }) => {
      const { error } = await supabase
        .from("site_settings")
        .upsert({ key, value }, { onConflict: "key" });
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["site-settings"] });
      toast({ title: "Settings updated successfully" });
    },
    onError: (error: Error) => {
      toast({ variant: "destructive", title: "Error", description: error.message });
    },
  });
}

// Pages
export function usePages() {
  return useQuery({
    queryKey: ["admin-pages"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("pages")
        .select("*")
        .order("created_at", { ascending: false });
      
      if (error) throw error;
      return data;
    },
  });
}

export function usePage(slug: string) {
  return useQuery({
    queryKey: ["admin-page", slug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("pages")
        .select("*")
        .eq("slug", slug)
        .maybeSingle();
      
      if (error) throw error;
      return data;
    },
    enabled: !!slug,
  });
}

export function useUpsertPage() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (page: any) => {
      const { error } = await supabase
        .from("pages")
        .upsert(page, { onConflict: "slug" });
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-pages"] });
      toast({ title: "Page saved successfully" });
    },
    onError: (error: Error) => {
      toast({ variant: "destructive", title: "Error", description: error.message });
    },
  });
}

export function useDeletePage() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from("pages")
        .delete()
        .eq("id", id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-pages"] });
      toast({ title: "Page deleted successfully" });
    },
    onError: (error: Error) => {
      toast({ variant: "destructive", title: "Error", description: error.message });
    },
  });
}

// Blog Posts
export function useBlogPosts() {
  return useQuery({
    queryKey: ["admin-blog-posts"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("blog_posts")
        .select("*")
        .order("created_at", { ascending: false });
      
      if (error) throw error;
      return data;
    },
  });
}

export function useBlogPost(slug: string) {
  return useQuery({
    queryKey: ["admin-blog-post", slug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("blog_posts")
        .select("*")
        .eq("slug", slug)
        .maybeSingle();
      
      if (error) throw error;
      return data;
    },
    enabled: !!slug,
  });
}

export function useUpsertBlogPost() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (post: any) => {
      const { error } = await supabase
        .from("blog_posts")
        .upsert(post, { onConflict: "slug" });
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-blog-posts"] });
      queryClient.invalidateQueries({ queryKey: ["public-blog-posts"] });
      queryClient.invalidateQueries({ queryKey: ["public-blog-post"] });
      toast({ title: "Blog post saved successfully" });
    },
    onError: (error: Error) => {
      toast({ variant: "destructive", title: "Error", description: error.message });
    },
  });
}

export function useDeleteBlogPost() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from("blog_posts")
        .delete()
        .eq("id", id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-blog-posts"] });
      toast({ title: "Blog post deleted successfully" });
    },
    onError: (error: Error) => {
      toast({ variant: "destructive", title: "Error", description: error.message });
    },
  });
}

// Tool Content
export function useToolContent() {
  return useQuery({
    queryKey: ["admin-tool-content"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("tool_content")
        .select("*")
        .order("sort_order", { ascending: true });
      
      if (error) throw error;
      return data;
    },
  });
}

export function useUpsertToolContent() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (content: any) => {
      const { error } = await supabase
        .from("tool_content")
        .upsert(content, { onConflict: "section" });
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-tool-content"] });
      toast({ title: "Tool content saved successfully" });
    },
    onError: (error: Error) => {
      toast({ variant: "destructive", title: "Error", description: error.message });
    },
  });
}

// Contact Messages
export function useContactMessages() {
  return useQuery({
    queryKey: ["admin-contact-messages"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("contact_messages")
        .select("*")
        .order("created_at", { ascending: false });
      
      if (error) throw error;
      return data;
    },
  });
}

export function useMarkMessageRead() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, is_read }: { id: string; is_read: boolean }) => {
      const { error } = await supabase
        .from("contact_messages")
        .update({ is_read })
        .eq("id", id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-contact-messages"] });
    },
  });
}

export function useDeleteMessage() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from("contact_messages")
        .delete()
        .eq("id", id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-contact-messages"] });
      toast({ title: "Message deleted" });
    },
    onError: (error: Error) => {
      toast({ variant: "destructive", title: "Error", description: error.message });
    },
  });
}

// Media
export function useMedia() {
  return useQuery({
    queryKey: ["admin-media"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("media")
        .select("*")
        .order("created_at", { ascending: false });
      
      if (error) throw error;
      return data;
    },
  });
}

export function useUploadMedia() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (file: File) => {
      const filePath = `${Date.now()}-${file.name}`;
      
      // Upload to storage
      const { error: uploadError } = await supabase.storage
        .from("media")
        .upload(filePath, file);
      
      if (uploadError) throw uploadError;

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from("media")
        .getPublicUrl(filePath);

      // Save to media table
      const { error: dbError } = await supabase
        .from("media")
        .insert({
          name: file.name,
          file_path: filePath,
          file_type: file.type,
          file_size: file.size,
        });
      
      if (dbError) throw dbError;

      return publicUrl;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-media"] });
      toast({ title: "File uploaded successfully" });
    },
    onError: (error: Error) => {
      toast({ variant: "destructive", title: "Upload failed", description: error.message });
    },
  });
}

export function useDeleteMedia() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({ id, filePath }: { id: string; filePath: string }) => {
      // Delete from storage
      const { error: storageError } = await supabase.storage
        .from("media")
        .remove([filePath]);
      
      if (storageError) throw storageError;

      // Delete from database
      const { error: dbError } = await supabase
        .from("media")
        .delete()
        .eq("id", id);
      
      if (dbError) throw dbError;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-media"] });
      toast({ title: "File deleted successfully" });
    },
    onError: (error: Error) => {
      toast({ variant: "destructive", title: "Delete failed", description: error.message });
    },
  });
}

// Analytics
export function useAnalytics() {
  return useQuery({
    queryKey: ["admin-analytics"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("analytics")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(1000);
      
      if (error) throw error;
      return data;
    },
  });
}

// Dashboard Stats
export function useDashboardStats() {
  return useQuery({
    queryKey: ["admin-dashboard-stats"],
    queryFn: async () => {
      const results = await Promise.allSettled([
        supabase.from("pages").select("id", { count: "exact", head: true }),
        supabase.from("blog_posts").select("id", { count: "exact", head: true }),
        supabase.from("contact_messages").select("id, is_read"),
        supabase.from("analytics").select("event_type").eq("event_type", "tool_usage"),
      ]);

      const pages = results[0].status === "fulfilled" ? results[0].value : null;
      const blogPosts = results[1].status === "fulfilled" ? results[1].value : null;
      const messages = results[2].status === "fulfilled" ? results[2].value : null;
      const analytics = results[3].status === "fulfilled" ? results[3].value : null;

      const unreadMessages = messages?.data?.filter((m: any) => !m.is_read).length || 0;

      return {
        totalPages: pages?.count || 0,
        totalBlogPosts: blogPosts?.count || 0,
        totalMessages: messages?.data?.length || 0,
        unreadMessages,
        toolUsageCount: analytics?.data?.length || 0,
      };
    },
    retry: 2,
    retryDelay: 1000,
  });
}
