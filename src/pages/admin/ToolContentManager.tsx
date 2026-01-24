import { useState } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { useToolContent, useUpsertToolContent } from "@/hooks/useAdminData";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus, Edit, Wrench, GripVertical, Eye, EyeOff } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";

interface ToolContentForm {
  id?: string;
  section: string;
  title: string;
  content: any;
  is_enabled: boolean;
  sort_order: number;
}

const defaultContent: ToolContentForm = {
  section: "",
  title: "",
  content: {},
  is_enabled: true,
  sort_order: 0,
};

const sectionTemplates = [
  { section: "hero", label: "Hero Section", description: "Main heading and description" },
  { section: "features", label: "Features", description: "Feature cards list" },
  { section: "how-it-works", label: "How It Works", description: "Step-by-step guide" },
  { section: "faqs", label: "FAQs", description: "Frequently asked questions" },
  { section: "benefits", label: "Benefits", description: "Why use this tool" },
  { section: "cta", label: "Call to Action", description: "Action prompts" },
];

export default function ToolContentManager() {
  const { data: contents, isLoading } = useToolContent();
  const upsertContent = useUpsertToolContent();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingContent, setEditingContent] = useState<ToolContentForm>(defaultContent);

  const handleSave = async () => {
    await upsertContent.mutateAsync(editingContent);
    setIsDialogOpen(false);
    setEditingContent(defaultContent);
  };

  const handleEdit = (content: any) => {
    setEditingContent({
      id: content.id,
      section: content.section,
      title: content.title || "",
      content: content.content || {},
      is_enabled: content.is_enabled,
      sort_order: content.sort_order,
    });
    setIsDialogOpen(true);
  };

  const handleNew = (section?: string) => {
    const template = sectionTemplates.find((t) => t.section === section);
    setEditingContent({
      ...defaultContent,
      section: section || "",
      title: template?.label || "",
    });
    setIsDialogOpen(true);
  };

  const toggleEnabled = async (content: any) => {
    await upsertContent.mutateAsync({
      ...content,
      is_enabled: !content.is_enabled,
    });
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Tool Content</h1>
            <p className="text-muted-foreground mt-1">
              Manage the image resizer tool text, FAQs, and sections
            </p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={() => handleNew()}>
                <Plus className="h-4 w-4 mr-2" />
                Add Section
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>
                  {editingContent.id ? "Edit Section" : "Create New Section"}
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="section">Section ID</Label>
                    <Input
                      id="section"
                      value={editingContent.section}
                      onChange={(e) =>
                        setEditingContent({ ...editingContent, section: e.target.value })
                      }
                      placeholder="hero"
                      disabled={!!editingContent.id}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="sort_order">Sort Order</Label>
                    <Input
                      id="sort_order"
                      type="number"
                      value={editingContent.sort_order}
                      onChange={(e) =>
                        setEditingContent({
                          ...editingContent,
                          sort_order: parseInt(e.target.value) || 0,
                        })
                      }
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="title">Section Title</Label>
                  <Input
                    id="title"
                    value={editingContent.title}
                    onChange={(e) =>
                      setEditingContent({ ...editingContent, title: e.target.value })
                    }
                    placeholder="Hero Section"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="content">Content (JSON)</Label>
                  <Textarea
                    id="content"
                    value={JSON.stringify(editingContent.content, null, 2)}
                    onChange={(e) => {
                      try {
                        setEditingContent({
                          ...editingContent,
                          content: JSON.parse(e.target.value),
                        });
                      } catch {
                        // Invalid JSON
                      }
                    }}
                    placeholder='{"heading": "Resize Images", "description": "..."}'
                    rows={10}
                    className="font-mono text-sm"
                  />
                  <p className="text-xs text-muted-foreground">
                    Enter content as JSON. Structure depends on section type.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <Switch
                    id="is_enabled"
                    checked={editingContent.is_enabled}
                    onCheckedChange={(checked) =>
                      setEditingContent({ ...editingContent, is_enabled: checked })
                    }
                  />
                  <Label htmlFor="is_enabled">Enabled</Label>
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
                    disabled={upsertContent.isPending || !editingContent.section}
                  >
                    {upsertContent.isPending ? "Saving..." : "Save Section"}
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Section Templates */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Add Sections</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {sectionTemplates.map((template) => {
                const exists = contents?.some((c) => c.section === template.section);
                return (
                  <Button
                    key={template.section}
                    variant="outline"
                    className="justify-start h-auto py-3"
                    onClick={() => handleNew(template.section)}
                    disabled={exists}
                  >
                    <div className="text-left">
                      <div className="font-medium">{template.label}</div>
                      <div className="text-xs text-muted-foreground">
                        {exists ? "Already created" : template.description}
                      </div>
                    </div>
                  </Button>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Existing Sections */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Wrench className="h-5 w-5" />
              Active Sections
            </CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <Skeleton key={i} className="h-16 w-full" />
                ))}
              </div>
            ) : contents?.length === 0 ? (
              <p className="text-center text-muted-foreground py-8">
                No sections created yet. Use the templates above to add sections.
              </p>
            ) : (
              <div className="space-y-3">
                {contents?.map((content) => (
                  <div
                    key={content.id}
                    className="flex items-center justify-between p-4 rounded-lg border border-border hover:bg-accent/50 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <GripVertical className="h-5 w-5 text-muted-foreground cursor-move" />
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-medium">
                            {content.title || content.section}
                          </h3>
                          <Badge variant={content.is_enabled ? "default" : "secondary"}>
                            {content.is_enabled ? (
                              <Eye className="h-3 w-3 mr-1" />
                            ) : (
                              <EyeOff className="h-3 w-3 mr-1" />
                            )}
                            {content.is_enabled ? "Enabled" : "Disabled"}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Section: {content.section} • Order: {content.sort_order}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Switch
                        checked={content.is_enabled}
                        onCheckedChange={() => toggleEnabled(content)}
                      />
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleEdit(content)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
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
