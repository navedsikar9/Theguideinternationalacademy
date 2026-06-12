import { Link, useLocation } from "wouter";
import { 
  LayoutDashboard, Users, Award, BookOpen, 
  Image as ImageIcon, MessageSquare, Mail, Settings, Upload, LogOut 
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
      await logout.mutateAsync({});
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
    return null; // Will redirect
  }

  const navItems = [
    { icon: LayoutDashboard, label: "Dashboard", href: "/admin" },
    { icon: Users, label: "Students", href: "/admin/students" },
    { icon: Award, label: "Certificates", href: "/admin/certificates" },
    { icon: Upload, label: "Bulk Import", href: "/admin/bulk-import" },
    { icon: BookOpen, label: "Courses", href: "/admin/courses" },
    { icon: ImageIcon, label: "Gallery", href: "/admin/gallery" },
    { icon: MessageSquare, label: "Testimonials", href: "/admin/testimonials" },
    { icon: Mail, label: "Inquiries", href: "/admin/inquiries" },
    { icon: Settings, label: "Settings", href: "/admin/settings" },
  ];

  return (
    <div className="min-h-screen flex bg-background">
      {/* Sidebar */}
      <aside className="w-64 bg-sidebar text-white flex flex-col fixed h-full z-20">
        <div className="h-16 flex items-center px-6 border-b border-sidebar-border">
          <span className="text-xl font-serif font-bold text-primary">THE GUIDE Admin</span>
        </div>
        
        <nav className="flex-1 py-6 px-3 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location === item.href;
            return (
              <Link key={item.href} href={item.href}>
                <a className={`flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${isActive ? 'bg-primary text-primary-foreground' : 'text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'}`}>
                  <Icon className="w-5 h-5" />
                  <span className="font-medium text-sm">{item.label}</span>
                </a>
              </Link>
            );
          })}
        </nav>
        
        <div className="p-4 border-t border-sidebar-border">
          <Button 
            variant="ghost" 
            className="w-full justify-start text-sidebar-foreground hover:text-white hover:bg-sidebar-accent border-sidebar-border"
            onClick={handleLogout}
            disabled={logout.isPending}
          >
            <LogOut className="w-5 h-5 mr-3" />
            Logout
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-64 flex flex-col min-h-screen">
        <header className="h-16 bg-card border-b border-border flex items-center justify-between px-8 sticky top-0 z-10">
          <h2 className="text-xl font-semibold text-foreground capitalize">
            {location.replace('/admin', '').replace('/', '') || 'Dashboard'}
          </h2>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">Logged in as <strong className="text-foreground">{adminMe.username || 'Admin'}</strong></span>
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
