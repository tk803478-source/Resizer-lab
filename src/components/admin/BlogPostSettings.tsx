import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { Upload, X } from "lucide-react";

export interface BlogPostFormData {
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
  featured_image: string;
  author_name: string;
  category: string;
  tags: string[];
  publish_date: string;
  display_locations: string[];
  is_featured: boolean;
  linked_pages: string[];
}

interface BlogPostSettingsProps {
  form: BlogPostFormData;
  onChange: (form: BlogPostFormData) => void;
  keywordsInput: string;
  onKeywordsChange: (value: string) => void;
  tagsInput: string;
  onTagsChange: (value: string) => void;
}

export function BlogPostSettings({
  form,
  onChange,
  keywordsInput,
  onKeywordsChange,
  tagsInput,
  onTagsChange,
}: BlogPostSettingsProps) {
  const { toast } = useToast();
  const [isUploadingImage, setIsUploadingImage] = useState(false);

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .trim();
  };

  const handleTitleChange = (title: string) => {
    const slug = form.id ? form.slug : generateSlug(title);
    onChange({ ...form, title, slug });
  };

  const handleFeaturedImageUpload = async (file: File) => {
    setIsUploadingImage(true);
    try {
      const filePath = `blog/featured/${Date.now()}-${file.name}`;
      const { error } = await supabase.storage.from("media").upload(filePath, file);
      if (error) throw error;
      const { data: { publicUrl } } = supabase.storage.from("media").getPublicUrl(filePath);
      onChange({ ...form, featured_image: publicUrl });
      toast({ title: "Featured image uploaded" });
    } catch (err: any) {
      toast({ variant: "destructive", title: "Upload failed", description: err.message });
    } finally {
      setIsUploadingImage(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Basic Info */}
      <div className="space-y-4">
        <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wider">Post Settings</h3>

        <div className="space-y-2">
          <Label>Title</Label>
          <Input
            value={form.title}
            onChange={(e) => handleTitleChange(e.target.value)}
            placeholder="Your blog post title"
          />
        </div>

        <div className="space-y-2">
          <Label>URL Slug</Label>
          <Input
            value={form.slug}
            onChange={(e) => onChange({ ...form, slug: e.target.value })}
            placeholder="auto-generated-from-title"
          />
        </div>

        <div className="space-y-2">
          <Label>Excerpt</Label>
          <Textarea
            value={form.excerpt}
            onChange={(e) => onChange({ ...form, excerpt: e.target.value })}
            placeholder="Brief summary..."
            rows={2}
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-2">
            <Label>Author</Label>
            <Input
              value={form.author_name}
              onChange={(e) => onChange({ ...form, author_name: e.target.value })}
              placeholder="Author name"
            />
          </div>
          <div className="space-y-2">
            <Label>Read Time</Label>
            <Input
              value={form.read_time}
              onChange={(e) => onChange({ ...form, read_time: e.target.value })}
              placeholder="5 min read"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label>Publish Date</Label>
          <Input
            type="datetime-local"
            value={form.publish_date ? form.publish_date.slice(0, 16) : ""}
            onChange={(e) => onChange({ ...form, publish_date: e.target.value ? new Date(e.target.value).toISOString() : "" })}
          />
        </div>

        <div className="space-y-2">
          <Label>Category</Label>
          <Input
            value={form.category}
            onChange={(e) => onChange({ ...form, category: e.target.value })}
            placeholder="e.g. Tutorials, Tips"
          />
        </div>

        <div className="space-y-2">
          <Label>Tags (comma-separated)</Label>
          <Input
            value={tagsInput}
            onChange={(e) => onTagsChange(e.target.value)}
            placeholder="resize, optimize, webp"
          />
        </div>
      </div>

      {/* Featured Image */}
      <div className="space-y-2">
        <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wider">Featured Image</h3>
        {form.featured_image ? (
          <div className="relative rounded-lg overflow-hidden border border-border">
            <img src={form.featured_image} alt="Featured" className="w-full h-32 object-cover" />
            <Button
              variant="destructive"
              size="icon"
              className="absolute top-2 right-2 h-6 w-6"
              onClick={() => onChange({ ...form, featured_image: "" })}
            >
              <X className="h-3 w-3" />
            </Button>
          </div>
        ) : (
          <label className="flex items-center justify-center gap-2 p-6 border-2 border-dashed border-input rounded-lg cursor-pointer hover:border-primary/50 transition-colors">
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) handleFeaturedImageUpload(file);
                e.target.value = "";
              }}
            />
            {isUploadingImage ? (
              <span className="h-5 w-5 border-2 border-primary border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <Upload className="h-5 w-5 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Upload featured image</span>
              </>
            )}
          </label>
        )}
      </div>

      {/* SEO Settings */}
      <div className="space-y-4">
        <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wider">SEO Settings</h3>

        <div className="space-y-2">
          <Label>Meta Title</Label>
          <Input
            value={form.meta_title}
            onChange={(e) => onChange({ ...form, meta_title: e.target.value })}
            placeholder="SEO title"
          />
          <p className="text-xs text-muted-foreground">{form.meta_title.length}/60 characters</p>
        </div>

        <div className="space-y-2">
          <Label>Meta Description</Label>
          <Textarea
            value={form.meta_description}
            onChange={(e) => onChange({ ...form, meta_description: e.target.value })}
            placeholder="SEO description..."
            rows={2}
          />
          <p className="text-xs text-muted-foreground">{form.meta_description.length}/160 characters</p>
        </div>

        <div className="space-y-2">
          <Label>Focus Keywords (comma-separated)</Label>
          <Input
            value={keywordsInput}
            onChange={(e) => onKeywordsChange(e.target.value)}
            placeholder="resize, image, quality"
          />
        </div>
      </div>

      {/* Publish */}
      <div className="space-y-4">
        <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wider">Status</h3>
        <div className="flex items-center gap-3">
          <Switch
            checked={form.is_published}
            onCheckedChange={(checked) => onChange({ ...form, is_published: checked })}
          />
          <Label>{form.is_published ? "Published" : "Draft"}</Label>
        </div>
      </div>
    </div>
  );
}
