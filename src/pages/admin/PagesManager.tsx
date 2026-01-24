import { useState } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { usePages, useUpsertPage, useDeletePage } from "@/hooks/useAdminData";
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
import { Plus, Edit, Trash2, Eye, EyeOff, FileText } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";

interface PageForm {
  id?: string;
  slug: string;
  title: string;
  meta_title: string;
  meta_description: string;
  content: any;
  is_published: boolean;
}

const defaultPage: PageForm = {
  slug: "",
  title: "",
  meta_title: "",
  meta_description: "",
  content: {},
  is_published: true,
};

export default function PagesManager() {
  const { data: pages, isLoading } = usePages();
  const upsertPage = useUpsertPage();
  const deletePage = useDeletePage();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingPage, setEditingPage] = useState<PageForm>(defaultPage);

  const handleSave = async () => {
    await upsertPage.mutateAsync(editingPage);
    setIsDialogOpen(false);
    setEditingPage(defaultPage);
  };

  const handleEdit = (page: any) => {
    setEditingPage({
      id: page.id,
      slug: page.slug,
      title: page.title,
      meta_title: page.meta_title || "",
      meta_description: page.meta_description || "",
      content: page.content || {},
      is_published: page.is_published,
    });
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    await deletePage.mutateAsync(id);
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Pages Manager</h1>
            <p className="text-muted-foreground mt-1">
              Create and manage website pages
            </p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={() => setEditingPage(defaultPage)}>
                <Plus className="h-4 w-4 mr-2" />
                Add Page
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>
                  {editingPage.id ? "Edit Page" : "Create New Page"}
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="slug">Slug (URL path)</Label>
                    <Input
                      id="slug"
                      value={editingPage.slug}
                      onChange={(e) =>
                        setEditingPage({ ...editingPage, slug: e.target.value })
                      }
                      placeholder="about-us"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="title">Page Title</Label>
                    <Input
                      id="title"
                      value={editingPage.title}
                      onChange={(e) =>
                        setEditingPage({ ...editingPage, title: e.target.value })
                      }
                      placeholder="About Us"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="meta_title">Meta Title (SEO)</Label>
                  <Input
                    id="meta_title"
                    value={editingPage.meta_title}
                    onChange={(e) =>
                      setEditingPage({ ...editingPage, meta_title: e.target.value })
                    }
                    placeholder="About Us | Resizer Lab"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="meta_description">Meta Description (SEO)</Label>
                  <Textarea
                    id="meta_description"
                    value={editingPage.meta_description}
                    onChange={(e) =>
                      setEditingPage({
                        ...editingPage,
                        meta_description: e.target.value,
                      })
                    }
                    placeholder="Learn more about Resizer Lab..."
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="content">Page Content (JSON)</Label>
                  <Textarea
                    id="content"
                    value={JSON.stringify(editingPage.content, null, 2)}
                    onChange={(e) => {
                      try {
                        setEditingPage({
                          ...editingPage,
                          content: JSON.parse(e.target.value),
                        });
                      } catch {
                        // Invalid JSON, ignore
                      }
                    }}
                    placeholder='{"heading": "About Us", "text": "..."}'
                    rows={6}
                    className="font-mono text-sm"
                  />
                </div>

                <div className="flex items-center gap-2">
                  <Switch
                    id="is_published"
                    checked={editingPage.is_published}
                    onCheckedChange={(checked) =>
                      setEditingPage({ ...editingPage, is_published: checked })
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
                    disabled={upsertPage.isPending || !editingPage.slug || !editingPage.title}
                  >
                    {upsertPage.isPending ? "Saving..." : "Save Page"}
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              All Pages
            </CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <Skeleton key={i} className="h-16 w-full" />
                ))}
              </div>
            ) : pages?.length === 0 ? (
              <p className="text-center text-muted-foreground py-8">
                No pages created yet. Click "Add Page" to create one.
              </p>
            ) : (
              <div className="space-y-3">
                {pages?.map((page) => (
                  <div
                    key={page.id}
                    className="flex items-center justify-between p-4 rounded-lg border border-border hover:bg-accent/50 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <FileText className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <h3 className="font-medium">{page.title}</h3>
                        <p className="text-sm text-muted-foreground">
                          /{page.slug}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={page.is_published ? "default" : "secondary"}>
                        {page.is_published ? (
                          <Eye className="h-3 w-3 mr-1" />
                        ) : (
                          <EyeOff className="h-3 w-3 mr-1" />
                        )}
                        {page.is_published ? "Published" : "Draft"}
                      </Badge>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleEdit(page)}
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
                            <AlertDialogTitle>Delete Page?</AlertDialogTitle>
                            <AlertDialogDescription>
                              This will permanently delete "{page.title}". This
                              action cannot be undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => handleDelete(page.id)}
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
