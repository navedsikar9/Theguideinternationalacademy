import AdminLayout from "@/components/admin/AdminLayout";
import { Users, Award, BookOpen, Mail, AlertCircle, ShieldCheck } from "lucide-react";
import { useGetDashboardStats } from "@workspace/api-client-react";
import { Skeleton } from "@/components/ui/skeleton";

export default function DashboardPage() {
  const { data: stats, isLoading } = useGetDashboardStats();

  const statCards = [
    { label: "Total Students", value: stats?.totalStudents || 0, icon: Users, color: "text-blue-500", bg: "bg-blue-500/10" },
    { label: "Certificates", value: stats?.totalCertificates || 0, icon: Award, color: "text-green-500", bg: "bg-green-500/10" },
    { label: "Courses", value: stats?.totalCourses || 0, icon: BookOpen, color: "text-purple-500", bg: "bg-purple-500/10" },
    { label: "Total Inquiries", value: stats?.totalInquiries || 0, icon: Mail, color: "text-orange-500", bg: "bg-orange-500/10" },
    { label: "Pending Inquiries", value: stats?.pendingInquiries || 0, icon: AlertCircle, color: "text-red-500", bg: "bg-red-500/10" },
    { label: "Recent Verifications", value: stats?.recentVerificationsCount || 0, icon: ShieldCheck, color: "text-primary", bg: "bg-primary/10" },
  ];

  return (
    <AdminLayout>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {isLoading ? (
          Array(6).fill(0).map((_, i) => <Skeleton key={i} className="h-32 rounded-xl" />)
        ) : (
          statCards.map((stat, i) => (
            <div key={i} className="bg-card border border-border rounded-xl p-6 shadow-sm flex items-center gap-6">
              <div className={`w-14 h-14 rounded-full flex items-center justify-center shrink-0 ${stat.bg}`}>
                <stat.icon className={`w-7 h-7 ${stat.color}`} />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">{stat.label}</p>
                <h3 className="text-3xl font-bold text-foreground">{stat.value}</h3>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden">
        <div className="px-6 py-5 border-b border-border">
          <h3 className="text-lg font-semibold text-foreground">Dashboard Overview</h3>
        </div>
        <div className="p-6 text-center text-muted-foreground">
          Welcome to the admin dashboard. Use the sidebar to navigate and manage your resources.
        </div>
      </div>
    </AdminLayout>
  );
}
