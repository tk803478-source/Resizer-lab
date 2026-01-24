import { useState, useEffect } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { usePages, useUpsertPage } from "@/hooks/useAdminData";
import { Search, Save, Globe, FileText } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface PageSEO {
  slug: string;
  title: string;
  meta_title: string;
  meta_description: string;
  og_image: string;
}

export default function SEOManager() {
  const { data: pages, isLoading } = usePages();
  const upsertPage = useUpsertPage();
  const { toast } = useToast();
  const [seoData, setSeoData] = useState<PageSEO[]>([]);

  useEffect(() => {
    if (pages) {
      setSeoData(
        pages.map((p) => ({
          slug: p.slug,
          title: p.title,
          meta_title: p.meta_title || "",
          meta_description: p.meta_description || "",
          og_image: p.og_image || "",
        }))
      );
    }
  }, [pages]);

  const handleChange = (slug: string, field: keyof PageSEO, value: string) => {
    setSeoData((prev) =>
      prev.map((p) => (p.slug === slug ? { ...p, [field]: value } : p))
    );
  };

  const handleSave = async (slug: string) => {
    const page = pages?.find((p) => p.slug === slug);
    const seo = seoData.find((s) => s.slug === slug);
    
    if (!page || !seo) return;

    await upsertPage.mutateAsync({
      ...page,
      meta_title: seo.meta_title,
      meta_description: seo.meta_description,
      og_image: seo.og_image,
    });
  };

  const handleSaveAll = async () => {
    for (const seo of seoData) {
      const page = pages?.find((p) => p.slug === seo.slug);
      if (page) {
        await upsertPage.mutateAsync({
          ...page,
          meta_title: seo.meta_title,
          meta_description: seo.meta_description,
          og_image: seo.og_image,
        });
      }
    }
    toast({ title: "All SEO settings saved successfully" });
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">SEO Manager</h1>
            <p className="text-muted-foreground mt-1">
              Manage meta titles, descriptions, and OG tags for all pages
            </p>
          </div>
          <Button onClick={handleSaveAll} disabled={upsertPage.isPending}>
            <Save className="h-4 w-4 mr-2" />
            Save All Changes
          </Button>
        </div>

        {/* SEO Tips */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Search className="h-5 w-5" />
              SEO Best Practices
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="text-sm text-muted-foreground space-y-2">
              <li>• <strong>Meta Title:</strong> Keep under 60 characters. Include primary keyword.</li>
              <li>• <strong>Meta Description:</strong> Keep under 160 characters. Compelling summary.</li>
              <li>• <strong>OG Image:</strong> Use 1200x630px images for social sharing.</li>
            </ul>
          </CardContent>
        </Card>

        {/* Pages SEO */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="h-5 w-5" />
              Page SEO Settings
            </CardTitle>
            <CardDescription>
              Edit SEO settings for each page
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <Skeleton key={i} className="h-32 w-full" />
                ))}
              </div>
            ) : seoData.length === 0 ? (
              <p className="text-center text-muted-foreground py-8">
                No pages found. Create pages first in the Pages Manager.
              </p>
            ) : (
              <Tabs defaultValue={seoData[0]?.slug}>
                <TabsList className="flex-wrap h-auto gap-1 mb-4">
                  {seoData.map((page) => (
                    <TabsTrigger key={page.slug} value={page.slug}>
                      <FileText className="h-4 w-4 mr-1" />
                      {page.title || page.slug}
                    </TabsTrigger>
                  ))}
                </TabsList>

                {seoData.map((page) => (
                  <TabsContent key={page.slug} value={page.slug}>
                    <div className="space-y-4 p-4 border rounded-lg">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium">/{page.slug}</h3>
                        <Button
                          size="sm"
                          onClick={() => handleSave(page.slug)}
                          disabled={upsertPage.isPending}
                        >
                          <Save className="h-4 w-4 mr-1" />
                          Save
                        </Button>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor={`meta_title_${page.slug}`}>
                          Meta Title
                          <span className="ml-2 text-xs text-muted-foreground">
                            ({page.meta_title.length}/60)
                          </span>
                        </Label>
                        <Input
                          id={`meta_title_${page.slug}`}
                          value={page.meta_title}
                          onChange={(e) =>
                            handleChange(page.slug, "meta_title", e.target.value)
                          }
                          placeholder="Page Title | Resizer Lab"
                          maxLength={70}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor={`meta_description_${page.slug}`}>
                          Meta Description
                          <span className="ml-2 text-xs text-muted-foreground">
                            ({page.meta_description.length}/160)
                          </span>
                        </Label>
                        <Textarea
                          id={`meta_description_${page.slug}`}
                          value={page.meta_description}
                          onChange={(e) =>
                            handleChange(page.slug, "meta_description", e.target.value)
                          }
                          placeholder="A compelling description for search results..."
                          rows={3}
                          maxLength={170}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor={`og_image_${page.slug}`}>
                          OG Image URL
                        </Label>
                        <Input
                          id={`og_image_${page.slug}`}
                          value={page.og_image}
                          onChange={(e) =>
                            handleChange(page.slug, "og_image", e.target.value)
                          }
                          placeholder="https://example.com/og-image.png"
                        />
                      </div>

                      {/* Preview */}
                      <div className="mt-4 p-4 bg-secondary rounded-lg">
                        <p className="text-xs text-muted-foreground mb-2">
                          Google Search Preview:
                        </p>
                        <div className="text-blue-600 text-lg hover:underline cursor-pointer">
                          {page.meta_title || page.title || "Page Title"}
                        </div>
                        <div className="text-green-700 text-sm">
                          resizerlab.lovable.app/{page.slug}
                        </div>
                        <div className="text-sm text-muted-foreground mt-1">
                          {page.meta_description || "No description provided..."}
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                ))}
              </Tabs>
            )}
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
