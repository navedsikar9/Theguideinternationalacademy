import { Link, useLocation } from "wouter";
import {
  LayoutDashboard, Users, Award, BookOpen,
  Image as ImageIcon, MessageSquare, Mail, Settings, Upload, LogOut, ShieldCheck, Clock
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useGetAdminMe, useAdminLogout } from "@workspace/api-client-react";
import { useToast } from "@/hooks/use-toast";
import { useEffect } from "react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [location, setLocation] = useLocation();
  const { toast } = useToast();

  const { data: adminMe, isLoading, error } = useGetAdminMe({
    query: {
      queryKey: ["admin-me"],
      retry: false,
    }
  });

  const logout = useAdminLogout();

  useEffect(() => {
    if (!isLoading && (!adminMe || !adminMe.authenticated || error)) {
      setLocation("/admin/login");
    }
  }, [adminMe, isLoading, error, setLocation]);

  const handleLogout = async () => {
    try {
      await logout.mutateAsync();
      toast({ title: "Logged out successfully" });
      setLocation("/admin/login");
    } catch (e) {
      toast({ title: "Logout failed", variant: "destructive" });
    }
  };

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (!adminMe?.authenticated) {
    return null;
  }

  const navGroups = [
    {
      label: "Management",
      items: [
        { icon: LayoutDashboard, label: "Dashboard", href: "/admin" },
        { icon: Users, label: "Students", href: "/admin/students" },
        { icon: Award, label: "Certificates", href: "/admin/certificates" },
        { icon: BookOpen, label: "Courses", href: "/admin/courses" },
      ],
    },
    {
      label: "Content",
      items: [
        { icon: ImageIcon, label: "Gallery", href: "/admin/gallery" },
        { icon: MessageSquare, label: "Testimonials", href: "/admin/testimonials" },
        { icon: Mail, label: "Inquiries", href: "/admin/inquiries" },
      ],
    },
    {
      label: "Tools",
      items: [
        { icon: Upload, label: "Bulk Import", href: "/admin/bulk-import" },
        { icon: ShieldCheck, label: "Verification Logs", href: "/admin/verification-logs" },
        { icon: Settings, label: "Settings", href: "/admin/settings" },
      ],
    },
  ];

  return (
    <div className="min-h-screen flex bg-background">
      {/* Sidebar */}
      <aside className="w-64 bg-sidebar text-white flex flex-col fixed h-full z-20">
        <div className="h-16 flex items-center px-6 border-b border-sidebar-border">
          <div>
            <span className="text-base font-serif font-bold text-primary block leading-tight">THE GUIDE</span>
            <span className="text-xs text-white/40 uppercase tracking-widest">Admin Panel</span>
          </div>
        </div>

        <nav className="flex-1 py-4 px-3 overflow-y-auto">
          {navGroups.map(group => (
            <div key={group.label} className="mb-4">
              <div className="px-3 mb-1.5">
                <span className="text-white/30 text-xs font-bold uppercase tracking-widest">{group.label}</span>
              </div>
              <div className="space-y-0.5">
                {group.items.map(item => {
                  const Icon = item.icon;
                  const isActive = location === item.href;
                  return (
                    <Link key={item.href} href={item.href}>
                      <a className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${isActive ? 'bg-primary text-primary-foreground' : 'text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'}`}>
                        <Icon className="w-4 h-4 shrink-0" />
                        <span className="font-medium text-sm">{item.label}</span>
                      </a>
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        <div className="p-4 border-t border-sidebar-border">
          <div className="flex items-center gap-3 mb-3 px-1">
            <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
              <span className="text-primary text-xs font-bold uppercase">{(adminMe.username || "A")[0]}</span>
            </div>
            <div className="min-w-0">
              <div className="text-white text-sm font-medium truncate">{adminMe.username || "Admin"}</div>
              <div className="text-white/40 text-xs">Administrator</div>
            </div>
          </div>
          <Button
            variant="ghost"
            className="w-full justify-start text-sidebar-foreground hover:text-white hover:bg-sidebar-accent"
            onClick={handleLogout}
            disabled={logout.isPending}
          >
            <LogOut className="w-4 h-4 mr-3" />
            Logout
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-64 flex flex-col min-h-screen">
        <header className="h-16 bg-card border-b border-border flex items-center justify-between px-8 sticky top-0 z-10">
          <h2 className="text-lg font-semibold text-foreground capitalize">
            {location === "/admin" ? "Dashboard" :
              location.replace("/admin/", "").replace(/-/g, " ")}
          </h2>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground hidden sm:block">
              Logged in as <strong className="text-foreground">{adminMe.username || "Admin"}</strong>
            </span>
            <Button variant="outline" size="sm" asChild>
              <Link href="/">View Site</Link>
            </Button>
          </div>
        </header>

        <div className="p-8 flex-1 bg-muted/20">
          {children}
        </div>
      </main>
    </div>
  );
}
