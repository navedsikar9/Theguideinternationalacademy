import { useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Plus, Search, Edit, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow 
} from "@/components/ui/table";
import { useListCertificates, useDeleteCertificate } from "@workspace/api-client-react";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";

export default function CertificatesPage() {
  const [search, setSearch] = useState("");
  const { data: certificatesPage, isLoading, refetch } = useListCertificates({ search, page: 1, limit: 50 });
  const deleteCertificate = useDeleteCertificate();
  const { toast } = useToast();

  const handleDelete = async (id: number) => {
    if (confirm("Are you sure you want to delete this certificate?")) {
      try {
        await deleteCertificate.mutateAsync({ id });
        toast({ title: "Certificate deleted" });
        refetch();
      } catch (e) {
        toast({ title: "Failed to delete", variant: "destructive" });
      }
    }
  };

  const certificates = certificatesPage?.data || [];

  return (
    <AdminLayout>
      <div className="flex justify-between items-center mb-6">
        <div className="relative w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input 
            placeholder="Search certificates..." 
            className="pl-9 bg-card"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <Button className="bg-primary text-primary-foreground gap-2">
          <Plus className="w-4 h-4" /> Issue Certificate
        </Button>
      </div>

      <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50 hover:bg-muted/50">
              <TableHead>Cert #</TableHead>
              <TableHead>Student Name</TableHead>
              <TableHead>Course</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              Array(5).fill(0).map((_, i) => (
                <TableRow key={i}>
                  <TableCell><Skeleton className="h-4 w-24" /></TableCell>
                  <TableCell><Skeleton className="h-4 w-32" /></TableCell>
                  <TableCell><Skeleton className="h-4 w-32" /></TableCell>
                  <TableCell><Skeleton className="h-4 w-24" /></TableCell>
                  <TableCell><Skeleton className="h-4 w-16" /></TableCell>
                  <TableCell className="text-right"><Skeleton className="h-8 w-16 ml-auto" /></TableCell>
                </TableRow>
              ))
            ) : certificates.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                  No certificates found.
                </TableCell>
              </TableRow>
            ) : (
              certificates.map((cert) => (
                <TableRow key={cert.id}>
                  <TableCell className="font-mono text-xs font-medium">{cert.certificateNumber}</TableCell>
                  <TableCell>{cert.studentName}</TableCell>
                  <TableCell>{cert.courseName}</TableCell>
                  <TableCell>{format(new Date(cert.completionDate), "MMM dd, yyyy")}</TableCell>
                  <TableCell>
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${cert.status === 'valid' ? 'bg-green-100 text-green-700' : cert.status === 'revoked' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'}`}>
                      {cert.status.toUpperCase()}
                    </span>
                  </TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-primary">
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-8 w-8 text-muted-foreground hover:text-destructive"
                      onClick={() => handleDelete(cert.id)}
                      disabled={deleteCertificate.isPending}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </AdminLayout>
  );
}
