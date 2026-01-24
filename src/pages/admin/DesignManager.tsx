import { useState, useEffect } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useSiteSettings, useUpdateSiteSettings } from "@/hooks/useAdminData";
import { Palette, Save, Sparkles } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";

interface DesignSettings {
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  animationsEnabled: boolean;
  ctaButtonText: string;
  ctaSecondaryText: string;
}

const defaultDesign: DesignSettings = {
  primaryColor: "175 80% 40%",
  secondaryColor: "210 20% 96%",
  accentColor: "175 60% 95%",
  animationsEnabled: true,
  ctaButtonText: "Resize Now",
  ctaSecondaryText: "Learn More",
};

export default function DesignManager() {
  const { data: settings, isLoading } = useSiteSettings();
  const updateSettings = useUpdateSiteSettings();
  const { toast } = useToast();
  const [design, setDesign] = useState<DesignSettings>(defaultDesign);

  useEffect(() => {
    if (settings?.design) {
      setDesign({
        ...defaultDesign,
        ...settings.design,
      });
    }
  }, [settings]);

  const handleSave = async () => {
    await updateSettings.mutateAsync({
      key: "design",
      value: design,
    });
  };

  const colorPresets = [
    { name: "Teal (Default)", value: "175 80% 40%" },
    { name: "Blue", value: "220 90% 50%" },
    { name: "Purple", value: "270 80% 50%" },
    { name: "Green", value: "140 70% 40%" },
    { name: "Orange", value: "30 90% 50%" },
    { name: "Pink", value: "330 80% 50%" },
  ];

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Design & UI</h1>
            <p className="text-muted-foreground mt-1">
              Customize colors, animations, and UI elements
            </p>
          </div>
          <Button onClick={handleSave} disabled={updateSettings.isPending}>
            <Save className="h-4 w-4 mr-2" />
            {updateSettings.isPending ? "Saving..." : "Save Changes"}
          </Button>
        </div>

        {isLoading ? (
          <div className="space-y-4">
            {[1, 2].map((i) => (
              <Skeleton key={i} className="h-48 w-full" />
            ))}
          </div>
        ) : (
          <>
            {/* Colors */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Palette className="h-5 w-5" />
                  Color Scheme
                </CardTitle>
                <CardDescription>
                  Customize the primary colors used across the site
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="primaryColor">Primary Color (HSL)</Label>
                    <div className="flex gap-2">
                      <Input
                        id="primaryColor"
                        value={design.primaryColor}
                        onChange={(e) =>
                          setDesign({ ...design, primaryColor: e.target.value })
                        }
                        placeholder="175 80% 40%"
                      />
                      <div
                        className="w-12 h-10 rounded-lg border"
                        style={{
                          backgroundColor: `hsl(${design.primaryColor})`,
                        }}
                      />
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {colorPresets.map((preset) => (
                      <Button
                        key={preset.name}
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          setDesign({ ...design, primaryColor: preset.value })
                        }
                        className="gap-2"
                      >
                        <div
                          className="w-4 h-4 rounded-full"
                          style={{ backgroundColor: `hsl(${preset.value})` }}
                        />
                        {preset.name}
                      </Button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="secondaryColor">Secondary Color (HSL)</Label>
                  <div className="flex gap-2">
                    <Input
                      id="secondaryColor"
                      value={design.secondaryColor}
                      onChange={(e) =>
                        setDesign({ ...design, secondaryColor: e.target.value })
                      }
                      placeholder="210 20% 96%"
                    />
                    <div
                      className="w-12 h-10 rounded-lg border"
                      style={{
                        backgroundColor: `hsl(${design.secondaryColor})`,
                      }}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="accentColor">Accent Color (HSL)</Label>
                  <div className="flex gap-2">
                    <Input
                      id="accentColor"
                      value={design.accentColor}
                      onChange={(e) =>
                        setDesign({ ...design, accentColor: e.target.value })
                      }
                      placeholder="175 60% 95%"
                    />
                    <div
                      className="w-12 h-10 rounded-lg border"
                      style={{
                        backgroundColor: `hsl(${design.accentColor})`,
                      }}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Animations */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5" />
                  Animations & Effects
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="animations">Enable Animations</Label>
                    <p className="text-sm text-muted-foreground">
                      Toggle page transitions and micro-interactions
                    </p>
                  </div>
                  <Switch
                    id="animations"
                    checked={design.animationsEnabled}
                    onCheckedChange={(checked) =>
                      setDesign({ ...design, animationsEnabled: checked })
                    }
                  />
                </div>
              </CardContent>
            </Card>

            {/* CTA Buttons */}
            <Card>
              <CardHeader>
                <CardTitle>Button Text & CTAs</CardTitle>
                <CardDescription>
                  Customize call-to-action button labels
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="ctaButtonText">Primary CTA Text</Label>
                    <Input
                      id="ctaButtonText"
                      value={design.ctaButtonText}
                      onChange={(e) =>
                        setDesign({ ...design, ctaButtonText: e.target.value })
                      }
                      placeholder="Resize Now"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="ctaSecondaryText">Secondary CTA Text</Label>
                    <Input
                      id="ctaSecondaryText"
                      value={design.ctaSecondaryText}
                      onChange={(e) =>
                        setDesign({ ...design, ctaSecondaryText: e.target.value })
                      }
                      placeholder="Learn More"
                    />
                  </div>
                </div>

                {/* Preview */}
                <div className="p-4 bg-secondary rounded-lg">
                  <p className="text-sm text-muted-foreground mb-3">Preview:</p>
                  <div className="flex gap-2">
                    <Button
                      style={{
                        backgroundColor: `hsl(${design.primaryColor})`,
                      }}
                    >
                      {design.ctaButtonText || "Primary CTA"}
                    </Button>
                    <Button variant="outline">
                      {design.ctaSecondaryText || "Secondary CTA"}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </AdminLayout>
  );
}
