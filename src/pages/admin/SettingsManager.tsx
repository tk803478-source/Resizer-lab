import { useState, useEffect } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useSiteSettings, useUpdateSiteSettings } from "@/hooks/useAdminData";
import { Settings, Save, Globe, RefreshCw } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { useQueryClient } from "@tanstack/react-query";

interface GeneralSettings {
  siteName: string;
  siteDescription: string;
  siteTagline: string;
  contactEmail: string;
  socialLinks: {
    twitter?: string;
    facebook?: string;
    instagram?: string;
    linkedin?: string;
  };
}

const defaultSettings: GeneralSettings = {
  siteName: "Resizer Lab",
  siteDescription: "Free online image resizer - resize images instantly in your browser",
  siteTagline: "Resize images instantly",
  contactEmail: "",
  socialLinks: {},
};

export default function SettingsManager() {
  const { data: settings, isLoading } = useSiteSettings();
  const updateSettings = useUpdateSiteSettings();
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const [general, setGeneral] = useState<GeneralSettings>(defaultSettings);

  useEffect(() => {
    if (settings?.general) {
      setGeneral({
        ...defaultSettings,
        ...settings.general,
      });
    }
  }, [settings]);

  const handleSave = async () => {
    await updateSettings.mutateAsync({
      key: "general",
      value: general,
    });
  };

  const handleClearCache = () => {
    queryClient.invalidateQueries();
    toast({
      title: "Cache cleared",
      description: "All cached data has been refreshed",
    });
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Settings</h1>
            <p className="text-muted-foreground mt-1">
              General site settings and configuration
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={handleClearCache}>
              <RefreshCw className="h-4 w-4 mr-2" />
              Clear Cache
            </Button>
            <Button onClick={handleSave} disabled={updateSettings.isPending}>
              <Save className="h-4 w-4 mr-2" />
              {updateSettings.isPending ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </div>

        {isLoading ? (
          <div className="space-y-4">
            {[1, 2].map((i) => (
              <Skeleton key={i} className="h-48 w-full" />
            ))}
          </div>
        ) : (
          <>
            {/* General Settings */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="h-5 w-5" />
                  General Settings
                </CardTitle>
                <CardDescription>
                  Basic information about your website
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="siteName">Site Name</Label>
                    <Input
                      id="siteName"
                      value={general.siteName}
                      onChange={(e) =>
                        setGeneral({ ...general, siteName: e.target.value })
                      }
                      placeholder="Resizer Lab"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="siteTagline">Tagline</Label>
                    <Input
                      id="siteTagline"
                      value={general.siteTagline}
                      onChange={(e) =>
                        setGeneral({ ...general, siteTagline: e.target.value })
                      }
                      placeholder="Resize images instantly"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="siteDescription">Site Description</Label>
                  <Textarea
                    id="siteDescription"
                    value={general.siteDescription}
                    onChange={(e) =>
                      setGeneral({ ...general, siteDescription: e.target.value })
                    }
                    placeholder="A brief description of your website..."
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="contactEmail">Contact Email</Label>
                  <Input
                    id="contactEmail"
                    type="email"
                    value={general.contactEmail}
                    onChange={(e) =>
                      setGeneral({ ...general, contactEmail: e.target.value })
                    }
                    placeholder="contact@example.com"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Social Links */}
            <Card>
              <CardHeader>
                <CardTitle>Social Media Links</CardTitle>
                <CardDescription>
                  Add your social media profiles
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="twitter">Twitter / X</Label>
                    <Input
                      id="twitter"
                      value={general.socialLinks.twitter || ""}
                      onChange={(e) =>
                        setGeneral({
                          ...general,
                          socialLinks: {
                            ...general.socialLinks,
                            twitter: e.target.value,
                          },
                        })
                      }
                      placeholder="https://twitter.com/yourhandle"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="facebook">Facebook</Label>
                    <Input
                      id="facebook"
                      value={general.socialLinks.facebook || ""}
                      onChange={(e) =>
                        setGeneral({
                          ...general,
                          socialLinks: {
                            ...general.socialLinks,
                            facebook: e.target.value,
                          },
                        })
                      }
                      placeholder="https://facebook.com/yourpage"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="instagram">Instagram</Label>
                    <Input
                      id="instagram"
                      value={general.socialLinks.instagram || ""}
                      onChange={(e) =>
                        setGeneral({
                          ...general,
                          socialLinks: {
                            ...general.socialLinks,
                            instagram: e.target.value,
                          },
                        })
                      }
                      placeholder="https://instagram.com/yourhandle"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="linkedin">LinkedIn</Label>
                    <Input
                      id="linkedin"
                      value={general.socialLinks.linkedin || ""}
                      onChange={(e) =>
                        setGeneral({
                          ...general,
                          socialLinks: {
                            ...general.socialLinks,
                            linkedin: e.target.value,
                          },
                        })
                      }
                      placeholder="https://linkedin.com/company/yourcompany"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Cache & Performance */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  Performance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between p-4 bg-secondary rounded-lg">
                  <div>
                    <p className="font-medium">Clear Application Cache</p>
                    <p className="text-sm text-muted-foreground">
                      Refresh all cached data to show latest changes
                    </p>
                  </div>
                  <Button variant="outline" onClick={handleClearCache}>
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Clear Cache
                  </Button>
                </div>
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </AdminLayout>
  );
}
