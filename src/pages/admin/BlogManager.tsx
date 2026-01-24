import { useState } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { useBlogPosts, useUpsertBlogPost, useDeleteBlogPost } from "@/hooks/useAdminData";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
import { Plus, Edit, Trash2, Eye, EyeOff, BookOpen, Calendar, Clock } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";

interface BlogForm {
  id?: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  meta_title: string;
  meta_description: string;
  keywords: string[];
  read_time: string;
  is_published: boolean;
}

const defaultPost: BlogForm = {
  slug: "",
  title: "",
  excerpt: "",
  content: "",
  meta_title: "",
  meta_description: "",
  keywords: [],
  read_time: "5 min read",
  is_published: false,
};

export default function BlogManager() {
  const { data: posts, isLoading } = useBlogPosts();
  const upsertPost = useUpsertBlogPost();
  const deletePost = useDeleteBlogPost();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogForm>(defaultPost);
  const [keywordsInput, setKeywordsInput] = useState("");

  const handleSave = async () => {
    await upsertPost.mutateAsync({
      ...editingPost,
      keywords: keywordsInput.split(",").map((k) => k.trim()).filter(Boolean),
    });
    setIsDialogOpen(false);
    setEditingPost(defaultPost);
    setKeywordsInput("");
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
    });
    setKeywordsInput((post.keywords || []).join(", "));
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    await deletePost.mutateAsync(id);
  };

  const handleNew = () => {
    setEditingPost(defaultPost);
    setKeywordsInput("");
    setIsDialogOpen(true);
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Blog Manager</h1>
            <p className="text-muted-foreground mt-1">
              Create and manage blog posts
            </p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={handleNew}>
                <Plus className="h-4 w-4 mr-2" />
                Add Post
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>
                  {editingPost.id ? "Edit Blog Post" : "Create New Blog Post"}
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="slug">Slug (URL path)</Label>
                    <Input
                      id="slug"
                      value={editingPost.slug}
                      onChange={(e) =>
                        setEditingPost({ ...editingPost, slug: e.target.value })
                      }
                      placeholder="how-to-resize-images"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="read_time">Read Time</Label>
                    <Input
                      id="read_time"
                      value={editingPost.read_time}
                      onChange={(e) =>
                        setEditingPost({ ...editingPost, read_time: e.target.value })
                      }
                      placeholder="5 min read"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    value={editingPost.title}
                    onChange={(e) =>
                      setEditingPost({ ...editingPost, title: e.target.value })
                    }
                    placeholder="How to Resize Images Without Losing Quality"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="excerpt">Excerpt</Label>
                  <Textarea
                    id="excerpt"
                    value={editingPost.excerpt}
                    onChange={(e) =>
                      setEditingPost({ ...editingPost, excerpt: e.target.value })
                    }
                    placeholder="A brief summary of the post..."
                    rows={2}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="content">Content (Markdown)</Label>
                  <Textarea
                    id="content"
                    value={editingPost.content}
                    onChange={(e) =>
                      setEditingPost({ ...editingPost, content: e.target.value })
                    }
                    placeholder="# Your blog content here...&#10;&#10;Write in Markdown format."
                    rows={12}
                    className="font-mono text-sm"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="meta_title">Meta Title (SEO)</Label>
                    <Input
                      id="meta_title"
                      value={editingPost.meta_title}
                      onChange={(e) =>
                        setEditingPost({ ...editingPost, meta_title: e.target.value })
                      }
                      placeholder="SEO title"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="keywords">Keywords (comma-separated)</Label>
                    <Input
                      id="keywords"
                      value={keywordsInput}
                      onChange={(e) => setKeywordsInput(e.target.value)}
                      placeholder="resize, image, quality"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="meta_description">Meta Description (SEO)</Label>
                  <Textarea
                    id="meta_description"
                    value={editingPost.meta_description}
                    onChange={(e) =>
                      setEditingPost({
                        ...editingPost,
                        meta_description: e.target.value,
                      })
                    }
                    placeholder="SEO description..."
                    rows={2}
                  />
                </div>

                <div className="flex items-center gap-2">
                  <Switch
                    id="is_published"
                    checked={editingPost.is_published}
                    onCheckedChange={(checked) =>
                      setEditingPost({ ...editingPost, is_published: checked })
                    }
                  />
                  <Label htmlFor="is_published">Published</Label>
                </div>

                <div className="flex justify-end gap-2 pt-4">
                  <Button
                    variant="outline"
                    onClick={() => setIsDialogOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleSave}
                    disabled={upsertPost.isPending || !editingPost.slug || !editingPost.title || !editingPost.content}
                  >
                    {upsertPost.isPending ? "Saving..." : "Save Post"}
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
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
                No blog posts yet. Click "Add Post" to create one.
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
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleEdit(post)}
                      >
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
                              This will permanently delete "{post.title}". This
                              action cannot be undone.
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
