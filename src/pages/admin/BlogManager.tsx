import { useState } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useBlogPosts, useUpsertBlogPost, useDeleteBlogPost } from "@/hooks/useAdminData";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Plus, Edit, Trash2, Eye, EyeOff, BookOpen, Calendar, Clock, ArrowLeft, Star } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RichTextEditor } from "@/components/admin/RichTextEditor";
import { BlogPostSettings, type BlogPostFormData } from "@/components/admin/BlogPostSettings";
import { BlogDisplaySettings } from "@/components/admin/BlogDisplaySettings";
import { BlogPreview } from "@/components/admin/BlogPreview";
import { useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";

const defaultPost: BlogPostFormData = {
  slug: "",
  title: "",
  excerpt: "",
  content: "",
  meta_title: "",
  meta_description: "",
  keywords: [],
  read_time: "5 min read",
  is_published: false,
  featured_image: "",
  author_name: "Resizer Lab",
  category: "",
  tags: [],
  publish_date: new Date().toISOString(),
  display_locations: ["blog_page"],
  is_featured: false,
  linked_pages: [],
};

export default function BlogManager() {
  const { data: posts, isLoading } = useBlogPosts();
  const upsertPost = useUpsertBlogPost();
  const deletePost = useDeleteBlogPost();
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const [editingPost, setEditingPost] = useState<BlogPostFormData | null>(null);
  const [keywordsInput, setKeywordsInput] = useState("");
  const [tagsInput, setTagsInput] = useState("");
  const [activeTab, setActiveTab] = useState("write");

  const handleSave = async (publish?: boolean) => {
    if (!editingPost) return;
    const postData = {
      ...editingPost,
      is_published: publish !== undefined ? publish : editingPost.is_published,
      keywords: keywordsInput.split(",").map((k) => k.trim()).filter(Boolean),
      tags: tagsInput.split(",").map((t) => t.trim()).filter(Boolean),
    };
    try {
      await upsertPost.mutateAsync(postData);
      queryClient.invalidateQueries({ queryKey: ["public-blog-posts"] });
      queryClient.invalidateQueries({ queryKey: ["public-blog-post"] });
      toast({
        title: publish ? "Post published!" : "Post saved!",
        description: publish
          ? "Your post is now live on the blog."
          : "Your draft has been saved.",
      });
      setEditingPost(null);
    } catch {
      toast({ variant: "destructive", title: "Error saving post" });
    }
  };

  const handleEdit = (post: any) => {
    setEditingPost({
      id: post.id,
      slug: post.slug,
      title: post.title,
      excerpt: post.excerpt || "",
      content: post.content,
      meta_title: post.meta_title || "",
      meta_description: post.meta_description || "",
      keywords: post.keywords || [],
      read_time: post.read_time || "5 min read",
      is_published: post.is_published,
      featured_image: post.featured_image || "",
      author_name: post.author_name || "Resizer Lab",
      category: post.category || "",
      tags: post.tags || [],
      publish_date: post.publish_date || post.created_at,
      display_locations: post.display_locations || ["blog_page"],
      is_featured: post.is_featured || false,
      linked_pages: post.linked_pages || [],
    });
    setKeywordsInput((post.keywords || []).join(", "));
    setTagsInput((post.tags || []).join(", "));
    setActiveTab("write");
  };

  const handleDelete = async (id: string) => {
    await deletePost.mutateAsync(id);
  };

  // Editor view
  if (editingPost) {
    return (
      <AdminLayout>
        <div className="space-y-4">
          {/* Top bar */}
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <Button variant="ghost" onClick={() => setEditingPost(null)}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Posts
            </Button>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                onClick={() => handleSave(false)}
                disabled={upsertPost.isPending || !editingPost.slug || !editingPost.title}
              >
                {upsertPost.isPending ? "Saving..." : "Save Draft"}
              </Button>
              <Button
                onClick={() => handleSave(true)}
                disabled={upsertPost.isPending || !editingPost.slug || !editingPost.title}
              >
                {upsertPost.isPending ? "Publishing..." : "Publish Post"}
              </Button>
            </div>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList>
              <TabsTrigger value="write">Write</TabsTrigger>
              <TabsTrigger value="settings">Settings & SEO</TabsTrigger>
              <TabsTrigger value="display">Display Locations</TabsTrigger>
              <TabsTrigger value="preview">Preview</TabsTrigger>
            </TabsList>

            <TabsContent value="write" className="mt-4">
              <RichTextEditor
                content={editingPost.content}
                onChange={(html) => setEditingPost({ ...editingPost, content: html })}
              />
            </TabsContent>

            <TabsContent value="settings" className="mt-4">
              <Card>
                <CardContent className="pt-6">
                  <BlogPostSettings
                    form={editingPost}
                    onChange={setEditingPost}
                    keywordsInput={keywordsInput}
                    onKeywordsChange={setKeywordsInput}
                    tagsInput={tagsInput}
                    onTagsChange={setTagsInput}
                  />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="display" className="mt-4">
              <Card>
                <CardContent className="pt-6">
                  <BlogDisplaySettings
                    displayLocations={editingPost.display_locations}
                    onDisplayLocationsChange={(locations) =>
                      setEditingPost({ ...editingPost, display_locations: locations })
                    }
                    isFeatured={editingPost.is_featured}
                    onFeaturedChange={(featured) =>
                      setEditingPost({ ...editingPost, is_featured: featured })
                    }
                    linkedPages={editingPost.linked_pages}
                    onLinkedPagesChange={(pages) =>
                      setEditingPost({ ...editingPost, linked_pages: pages })
                    }
                  />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="preview" className="mt-4">
              <BlogPreview
                post={{
                  ...editingPost,
                  tags: tagsInput.split(",").map((t) => t.trim()).filter(Boolean),
                }}
              />
            </TabsContent>
          </Tabs>
        </div>
      </AdminLayout>
    );
  }

  // List view
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Blog Manager</h1>
            <p className="text-muted-foreground mt-1">Create and manage blog posts</p>
          </div>
          <Button onClick={() => setEditingPost({ ...defaultPost })}>
            <Plus className="h-4 w-4 mr-2" />
            New Post
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5" />
              All Blog Posts
            </CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <Skeleton key={i} className="h-20 w-full" />
                ))}
              </div>
            ) : posts?.length === 0 ? (
              <p className="text-center text-muted-foreground py-8">
                No blog posts yet. Click "New Post" to create one.
              </p>
            ) : (
              <div className="space-y-3">
                {posts?.map((post) => (
                  <div
                    key={post.id}
                    className="flex items-center justify-between p-4 rounded-lg border border-border hover:bg-accent/50 transition-colors"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium truncate">{post.title}</h3>
                        <Badge variant={post.is_published ? "default" : "secondary"}>
                          {post.is_published ? (
                            <Eye className="h-3 w-3 mr-1" />
                          ) : (
                            <EyeOff className="h-3 w-3 mr-1" />
                          )}
                          {post.is_published ? "Published" : "Draft"}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {new Date(post.created_at).toLocaleDateString()}
                        </span>
                        {post.read_time && (
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {post.read_time}
                          </span>
                        )}
                        <span>/blog/{post.slug}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 ml-4">
                      <Button variant="ghost" size="icon" onClick={() => handleEdit(post)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Delete Post?</AlertDialogTitle>
                            <AlertDialogDescription>
                              This will permanently delete "{post.title}". This action cannot be undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => handleDelete(post.id)}
                              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                            >
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
