import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
import { useState } from "react";

export const DISPLAY_LOCATION_OPTIONS = [
  { value: "blog_page", label: "Blog Page", description: "Show on the main /blog listing" },
  { value: "homepage", label: "Homepage Recent Posts", description: "Show in the homepage recent posts section" },
  { value: "sidebar", label: "Sidebar Widget", description: "Show in sidebar blog widgets" },
  { value: "footer", label: "Footer Blog Section", description: "Show in the footer blog links" },
  { value: "related", label: "Related Posts Section", description: "Include in related posts suggestions" },
] as const;

const LINKABLE_PAGES = [
  { value: "/", label: "Homepage" },
  { value: "/blog", label: "Blog" },
  { value: "/guides", label: "Guides" },
  { value: "/gallery", label: "Gallery" },
  { value: "/about", label: "About" },
  { value: "/contact", label: "Contact" },
];

interface BlogDisplaySettingsProps {
  displayLocations: string[];
  onDisplayLocationsChange: (locations: string[]) => void;
  isFeatured: boolean;
  onFeaturedChange: (featured: boolean) => void;
  linkedPages: string[];
  onLinkedPagesChange: (pages: string[]) => void;
}

export function BlogDisplaySettings({
  displayLocations,
  onDisplayLocationsChange,
  isFeatured,
  onFeaturedChange,
  linkedPages,
  onLinkedPagesChange,
}: BlogDisplaySettingsProps) {
  const [customPage, setCustomPage] = useState("");

  const toggleLocation = (value: string) => {
    if (displayLocations.includes(value)) {
      onDisplayLocationsChange(displayLocations.filter((l) => l !== value));
    } else {
      onDisplayLocationsChange([...displayLocations, value]);
    }
  };

  const toggleLinkedPage = (value: string) => {
    if (linkedPages.includes(value)) {
      onLinkedPagesChange(linkedPages.filter((p) => p !== value));
    } else {
      onLinkedPagesChange([...linkedPages, value]);
    }
  };

  const addCustomPage = () => {
    const page = customPage.trim();
    if (page && !linkedPages.includes(page)) {
      onLinkedPagesChange([...linkedPages, page.startsWith("/") ? page : `/${page}`]);
      setCustomPage("");
    }
  };

  return (
    <div className="space-y-6">
      {/* Display Locations */}
      <div className="space-y-4">
        <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wider">
          Display Locations
        </h3>
        <p className="text-xs text-muted-foreground">
          Choose where this blog post should appear on the website.
        </p>
        <div className="space-y-3">
          {DISPLAY_LOCATION_OPTIONS.map((option) => (
            <label
              key={option.value}
              className="flex items-start gap-3 p-3 rounded-lg border border-border hover:bg-accent/50 transition-colors cursor-pointer"
            >
              <Checkbox
                checked={displayLocations.includes(option.value)}
                onCheckedChange={() => toggleLocation(option.value)}
                className="mt-0.5"
              />
              <div>
                <p className="text-sm font-medium">{option.label}</p>
                <p className="text-xs text-muted-foreground">{option.description}</p>
              </div>
            </label>
          ))}
        </div>
      </div>

      {/* Featured Post */}
      <div className="space-y-4">
        <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wider">
          Featured Status
        </h3>
        <div className="flex items-center gap-3 p-3 rounded-lg border border-border">
          <Switch checked={isFeatured} onCheckedChange={onFeaturedChange} />
          <div>
            <Label className="text-sm font-medium">Mark as Featured Post</Label>
            <p className="text-xs text-muted-foreground">
              Featured posts get highlighted placement on the homepage and blog page.
            </p>
          </div>
        </div>
      </div>

      {/* Page Linking */}
      <div className="space-y-4">
        <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wider">
          Link to Pages
        </h3>
        <p className="text-xs text-muted-foreground">
          Link this post to specific pages where it should appear as recommended content.
        </p>
        <div className="space-y-2">
          {LINKABLE_PAGES.map((page) => (
            <label
              key={page.value}
              className="flex items-center gap-3 p-2 rounded-md hover:bg-accent/50 transition-colors cursor-pointer"
            >
              <Checkbox
                checked={linkedPages.includes(page.value)}
                onCheckedChange={() => toggleLinkedPage(page.value)}
              />
              <span className="text-sm">{page.label}</span>
              <span className="text-xs text-muted-foreground">{page.value}</span>
            </label>
          ))}
        </div>

        {/* Custom page input */}
        <div className="flex gap-2">
          <Input
            value={customPage}
            onChange={(e) => setCustomPage(e.target.value)}
            placeholder="Add custom page path, e.g. /tools/resizer"
            className="text-sm"
            onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addCustomPage())}
          />
          <button
            type="button"
            onClick={addCustomPage}
            className="px-3 py-1.5 text-sm rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            Add
          </button>
        </div>

        {/* Show custom linked pages */}
        {linkedPages.filter((p) => !LINKABLE_PAGES.some((lp) => lp.value === p)).length > 0 && (
          <div className="flex flex-wrap gap-2">
            {linkedPages
              .filter((p) => !LINKABLE_PAGES.some((lp) => lp.value === p))
              .map((page) => (
                <Badge key={page} variant="secondary" className="gap-1">
                  {page}
                  <X
                    className="h-3 w-3 cursor-pointer hover:text-destructive"
                    onClick={() => onLinkedPagesChange(linkedPages.filter((p) => p !== page))}
                  />
                </Badge>
              ))}
          </div>
        )}
      </div>
    </div>
  );
}
