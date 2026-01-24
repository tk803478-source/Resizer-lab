import { useState, useEffect } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useSiteSettings, useUpdateSiteSettings } from "@/hooks/useAdminData";
import { Megaphone, Save, AlertTriangle, CheckCircle } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface AdsSettings {
  adsenseReady: boolean;
  showPlaceholders: boolean;
  bannerEnabled: boolean;
  sidebarEnabled: boolean;
  bottomEnabled: boolean;
  inArticleEnabled: boolean;
}

const defaultAds: AdsSettings = {
  adsenseReady: false,
  showPlaceholders: true,
  bannerEnabled: true,
  sidebarEnabled: true,
  bottomEnabled: true,
  inArticleEnabled: false,
};

export default function AdsManager() {
  const { data: settings, isLoading } = useSiteSettings();
  const updateSettings = useUpdateSiteSettings();
  const [ads, setAds] = useState<AdsSettings>(defaultAds);

  useEffect(() => {
    if (settings?.ads) {
      setAds({
        ...defaultAds,
        ...settings.ads,
      });
    }
  }, [settings]);

  const handleSave = async () => {
    await updateSettings.mutateAsync({
      key: "ads",
      value: ads,
    });
  };

  const adPlacements = [
    {
      id: "bannerEnabled",
      label: "Top Banner",
      description: "Horizontal ad at the top of pages",
    },
    {
      id: "sidebarEnabled",
      label: "Sidebar",
      description: "Ads in the sidebar on desktop",
    },
    {
      id: "bottomEnabled",
      label: "Bottom Section",
      description: "Horizontal ad at the bottom of content",
    },
    {
      id: "inArticleEnabled",
      label: "In-Article",
      description: "Ads within blog post content",
    },
  ];

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Ads Control</h1>
            <p className="text-muted-foreground mt-1">
              Manage ad placements and AdSense readiness
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
            {/* Status */}
            <Alert variant={ads.adsenseReady ? "default" : "destructive"}>
              {ads.adsenseReady ? (
                <CheckCircle className="h-4 w-4" />
              ) : (
                <AlertTriangle className="h-4 w-4" />
              )}
              <AlertTitle>
                {ads.adsenseReady ? "Ready for AdSense" : "Not AdSense Ready"}
              </AlertTitle>
              <AlertDescription>
                {ads.adsenseReady
                  ? "Your site meets AdSense requirements. You can apply when ready."
                  : "Complete the checklist below before applying to AdSense."}
              </AlertDescription>
            </Alert>

            {/* Main Settings */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Megaphone className="h-5 w-5" />
                  Global Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="adsenseReady">Mark as AdSense Ready</Label>
                    <p className="text-sm text-muted-foreground">
                      Enable when your site is ready for AdSense approval
                    </p>
                  </div>
                  <Switch
                    id="adsenseReady"
                    checked={ads.adsenseReady}
                    onCheckedChange={(checked) =>
                      setAds({ ...ads, adsenseReady: checked })
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="showPlaceholders">Show Ad Placeholders</Label>
                    <p className="text-sm text-muted-foreground">
                      Display placeholder boxes where ads will appear
                    </p>
                  </div>
                  <Switch
                    id="showPlaceholders"
                    checked={ads.showPlaceholders}
                    onCheckedChange={(checked) =>
                      setAds({ ...ads, showPlaceholders: checked })
                    }
                  />
                </div>
              </CardContent>
            </Card>

            {/* Ad Placements */}
            <Card>
              <CardHeader>
                <CardTitle>Ad Placements</CardTitle>
                <CardDescription>
                  Control which ad positions are enabled (placeholders only for now)
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {adPlacements.map((placement) => (
                  <div
                    key={placement.id}
                    className="flex items-center justify-between p-4 rounded-lg border"
                  >
                    <div>
                      <Label>{placement.label}</Label>
                      <p className="text-sm text-muted-foreground">
                        {placement.description}
                      </p>
                    </div>
                    <Switch
                      checked={ads[placement.id as keyof AdsSettings] as boolean}
                      onCheckedChange={(checked) =>
                        setAds({ ...ads, [placement.id]: checked })
                      }
                    />
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* AdSense Checklist */}
            <Card>
              <CardHeader>
                <CardTitle>AdSense Approval Checklist</CardTitle>
                <CardDescription>
                  Make sure your site meets these requirements
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-sm">
                  {[
                    "Original, high-quality content (minimum 15-20 articles)",
                    "Privacy Policy page",
                    "Terms of Service page",
                    "About page with real information",
                    "Contact page with working form",
                    "Clean, professional design",
                    "Mobile-responsive layout",
                    "Fast page loading speed",
                    "No prohibited content",
                    "Site is at least 1-2 months old",
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-primary" />
                      {item}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </AdminLayout>
  );
}
