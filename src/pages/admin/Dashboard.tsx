import { Link } from "react-router-dom";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useDashboardStats, useSiteSettings } from "@/hooks/useAdminData";
import {
  FileText,
  BookOpen,
  MessageSquare,
  Wrench,
  Plus,
  Edit,
  Eye,
  TrendingUp,
  Clock,
  AlertTriangle,
  RefreshCw,
} from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function AdminDashboard() {
  const { data: stats, isLoading: statsLoading, error: statsError, refetch: refetchStats } = useDashboardStats();
  const { data: settings, error: settingsError, refetch: refetchSettings } = useSiteSettings();

  const statCards = [
    {
      title: "Total Pages",
      value: stats?.totalPages || 0,
      icon: FileText,
      color: "from-blue-500 to-cyan-500",
      href: "/admin/pages",
    },
    {
      title: "Blog Posts",
      value: stats?.totalBlogPosts || 0,
      icon: BookOpen,
      color: "from-purple-500 to-pink-500",
      href: "/admin/blog",
    },
    {
      title: "Messages",
      value: stats?.totalMessages || 0,
      subtitle: stats?.unreadMessages ? `${stats.unreadMessages} unread` : undefined,
      icon: MessageSquare,
      color: "from-orange-500 to-red-500",
      href: "/admin/messages",
    },
    {
      title: "Tool Usage",
      value: stats?.toolUsageCount || 0,
      icon: Wrench,
      color: "from-green-500 to-emerald-500",
      href: "/admin/tool-content",
    },
  ];

  const quickActions = [
    { label: "Add Blog Post", icon: Plus, href: "/admin/blog/new" },
    { label: "Edit Homepage", icon: Edit, href: "/admin/pages/home" },
    { label: "View Messages", icon: Eye, href: "/admin/messages" },
    { label: "Update SEO", icon: TrendingUp, href: "/admin/seo" },
  ];

  const hasError = statsError || settingsError;

  const handleRetry = () => {
    if (statsError) refetchStats();
    if (settingsError) refetchSettings();
  };

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            Welcome to your admin panel. Manage your entire website from here.
          </p>
        </div>

        {/* Error Alert */}
        {hasError && (
          <Alert variant="destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Error loading data</AlertTitle>
            <AlertDescription className="flex items-center justify-between">
              <span>
                {statsError?.message || settingsError?.message || "Failed to load dashboard data. Please try again."}
              </span>
              <Button variant="outline" size="sm" onClick={handleRetry}>
                <RefreshCw className="h-4 w-4 mr-2" />
                Retry
              </Button>
            </AlertDescription>
          </Alert>
        )}

        {/* Stats Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {statCards.map((card) => (
            <Link key={card.title} to={card.href}>
              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    {card.title}
                  </CardTitle>
                  <div
                    className={`h-10 w-10 rounded-lg bg-gradient-to-br ${card.color} flex items-center justify-center`}
                  >
                    <card.icon className="h-5 w-5 text-white" />
                  </div>
                </CardHeader>
                <CardContent>
                  {statsLoading ? (
                    <Skeleton className="h-8 w-16" />
                  ) : (
                    <>
                      <div className="text-3xl font-bold">{card.value}</div>
                      {card.subtitle && (
                        <p className="text-xs text-orange-500 font-medium mt-1">
                          {card.subtitle}
                        </p>
                      )}
                    </>
                  )}
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common tasks for managing your website</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {quickActions.map((action) => (
                <Link key={action.label} to={action.href}>
                  <Button
                    variant="outline"
                    className="w-full justify-start gap-2 h-12"
                  >
                    <action.icon className="h-4 w-4" />
                    {action.label}
                  </Button>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Site Info */}
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Recent Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Activity tracking will show recent changes here.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Site Status</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Site Name</span>
                <span className="font-medium">
                  {settings?.general?.siteName || "Resizer Lab"}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">AdSense Ready</span>
                <span
                  className={`font-medium ${
                    settings?.ads?.adsenseReady ? "text-green-500" : "text-orange-500"
                  }`}
                >
                  {settings?.ads?.adsenseReady ? "Yes" : "Not yet"}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Animations</span>
                <span className="font-medium">
                  {settings?.design?.animationsEnabled ? "Enabled" : "Disabled"}
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
}
