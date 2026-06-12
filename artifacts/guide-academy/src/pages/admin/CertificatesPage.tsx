import { useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Plus, Search, Edit, Trash2, X, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  useListCertificates,
  useDeleteCertificate,
  useCreateCertificate,
  useUpdateCertificate,
} from "@workspace/api-client-react";
import type { Certificate } from "@workspace/api-client-react";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";

interface CertFormState {
  certificateNumber: string;
  studentName: string;
  courseName: string;
  completionDate: string;
  grade: string;
  status: string;
}

const EMPTY_FORM: CertFormState = {
  certificateNumber: "",
  studentName: "",
  courseName: "",
  completionDate: "",
  grade: "",
  status: "valid",
};

const GRADE_OPTIONS = ["Pass", "Merit", "Distinction", "Credit", "Fail"];
const STATUS_OPTIONS = ["valid", "revoked", "expired"];

const STATUS_COLORS: Record<string, string> = {
  valid: "bg-green-100 text-green-700",
  revoked: "bg-red-100 text-red-700",
  expired: "bg-yellow-100 text-yellow-700",
};

export default function CertificatesPage() {
  const [search, setSearch] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingCert, setEditingCert] = useState<Certificate | null>(null);
  const [form, setForm] = useState<CertFormState>(EMPTY_FORM);
  const [saving, setSaving] = useState(false);

  const { data: certificatesPage, isLoading, refetch } = useListCertificates({ search, page: 1, limit: 100 });
  const deleteCertificate = useDeleteCertificate();
  const createCertificate = useCreateCertificate();
  const updateCertificate = useUpdateCertificate();
  const { toast } = useToast();

  const certificates = certificatesPage?.data || [];

  const openCreate = () => {
    setEditingCert(null);
    setForm(EMPTY_FORM);
    setDialogOpen(true);
  };

  const openEdit = (cert: Certificate) => {
    setEditingCert(cert);
    setForm({
      certificateNumber: cert.certificateNumber,
      studentName: cert.studentName,
      courseName: cert.courseName,
      completionDate: cert.completionDate.slice(0, 10),
      grade: cert.grade,
      status: cert.status,
    });
    setDialogOpen(true);
  };

  const closeDialog = () => {
    setDialogOpen(false);
    setEditingCert(null);
    setForm(EMPTY_FORM);
  };

  const setField = (field: keyof CertFormState, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const handleSave = async () => {
    if (!form.certificateNumber.trim() || !form.studentName.trim() || !form.courseName.trim() || !form.completionDate || !form.grade) {
      toast({ title: "Please fill all required fields", variant: "destructive" });
      return;
    }

    setSaving(true);
    try {
      if (editingCert) {
        await updateCertificate.mutateAsync({
          id: editingCert.id,
          data: {
            certificateNumber: form.certificateNumber.trim(),
            studentName: form.studentName.trim(),
            courseName: form.courseName.trim(),
            completionDate: form.completionDate,
            grade: form.grade,
            status: form.status,
          },
        });
        toast({ title: "Certificate updated successfully" });
      } else {
        await createCertificate.mutateAsync({
          data: {
            certificateNumber: form.certificateNumber.trim(),
            studentName: form.studentName.trim(),
            courseName: form.courseName.trim(),
            completionDate: form.completionDate,
            grade: form.grade,
            status: form.status,
          },
        });
        toast({ title: "Certificate issued successfully" });
      }
      closeDialog();
      refetch();
    } catch (e: any) {
      toast({
        title: editingCert ? "Failed to update certificate" : "Failed to issue certificate",
        description: e?.message || "Please try again.",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: number, certNum: string) => {
    if (!confirm(`Delete certificate ${certNum}? This action cannot be undone.`)) return;
    try {
      await deleteCertificate.mutateAsync({ id });
      toast({ title: "Certificate deleted" });
      refetch();
    } catch {
      toast({ title: "Failed to delete", variant: "destructive" });
    }
  };

  return (
    <AdminLayout>
      {/* Header Row */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-serif font-bold text-foreground">Certificates</h1>
          <p className="text-sm text-muted-foreground mt-0.5">Issue, edit, and manage all student certificates</p>
        </div>
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search by name, course, cert #..."
              className="pl-9 bg-card"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <Button className="bg-primary text-primary-foreground gap-2 shrink-0" onClick={openCreate}>
            <Plus className="w-4 h-4" /> Issue Certificate
          </Button>
        </div>
      </div>

      {/* Stats bar */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {[
          { label: "Total", value: certificates.length, color: "text-foreground" },
          { label: "Valid", value: certificates.filter(c => c.status === "valid").length, color: "text-green-600" },
          { label: "Revoked / Expired", value: certificates.filter(c => c.status !== "valid").length, color: "text-red-500" },
        ].map((s) => (
          <div key={s.label} className="bg-card border border-border rounded-xl p-4 text-center shadow-sm">
            <div className={`text-2xl font-bold font-serif ${s.color}`}>{s.value}</div>
            <div className="text-xs text-muted-foreground uppercase tracking-wider mt-0.5">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50 hover:bg-muted/50">
              <TableHead className="font-semibold">Certificate #</TableHead>
              <TableHead className="font-semibold">Student Name</TableHead>
              <TableHead className="font-semibold">Course</TableHead>
              <TableHead className="font-semibold">Date</TableHead>
              <TableHead className="font-semibold">Grade</TableHead>
              <TableHead className="font-semibold">Status</TableHead>
              <TableHead className="text-right font-semibold">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              Array(5).fill(0).map((_, i) => (
                <TableRow key={i}>
                  {Array(7).fill(0).map((_, j) => (
                    <TableCell key={j}><Skeleton className="h-4 w-full" /></TableCell>
                  ))}
                </TableRow>
              ))
            ) : certificates.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-16 text-muted-foreground">
                  <ShieldCheck className="w-10 h-10 mx-auto mb-3 opacity-30" />
                  <div className="font-medium">{search ? "No certificates match your search." : "No certificates issued yet."}</div>
                  {!search && (
                    <Button size="sm" className="mt-4 bg-primary text-primary-foreground" onClick={openCreate}>
                      <Plus className="w-3 h-3 mr-1" /> Issue First Certificate
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ) : (
              certificates.map((cert) => (
                <TableRow key={cert.id} className="hover:bg-muted/30 transition-colors">
                  <TableCell className="font-mono text-xs font-bold text-primary">{cert.certificateNumber}</TableCell>
                  <TableCell className="font-medium">{cert.studentName}</TableCell>
                  <TableCell className="text-muted-foreground text-sm max-w-[200px] truncate">{cert.courseName}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {format(new Date(cert.completionDate), "MMM dd, yyyy")}
                  </TableCell>
                  <TableCell>
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-primary/10 text-primary">
                      {cert.grade}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${STATUS_COLORS[cert.status] || "bg-gray-100 text-gray-700"}`}>
                      {cert.status.toUpperCase()}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-muted-foreground hover:text-primary hover:bg-primary/10"
                        onClick={() => openEdit(cert)}
                        title="Edit certificate"
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-muted-foreground hover:text-destructive hover:bg-red-50"
                        onClick={() => handleDelete(cert.id, cert.certificateNumber)}
                        disabled={deleteCertificate.isPending}
                        title="Delete certificate"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Create / Edit Dialog */}
      <Dialog open={dialogOpen} onOpenChange={(o) => { if (!o) closeDialog(); }}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="font-serif text-xl">
              {editingCert ? "Edit Certificate" : "Issue New Certificate"}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4 py-2">
            <div className="space-y-1.5">
              <Label htmlFor="certNum">Certificate Number <span className="text-red-500">*</span></Label>
              <Input
                id="certNum"
                placeholder="e.g. TGA-2024-007"
                value={form.certificateNumber}
                onChange={(e) => setField("certificateNumber", e.target.value)}
                className="font-mono"
              />
              <p className="text-xs text-muted-foreground">This is the unique ID used on the Verify Certificate page.</p>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="studentName">Student Name <span className="text-red-500">*</span></Label>
              <Input
                id="studentName"
                placeholder="Full name as it appears on certificate"
                value={form.studentName}
                onChange={(e) => setField("studentName", e.target.value)}
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="courseName">Course Name <span className="text-red-500">*</span></Label>
              <Input
                id="courseName"
                placeholder="e.g. NEBOSH International General Certificate"
                value={form.courseName}
                onChange={(e) => setField("courseName", e.target.value)}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="completionDate">Completion Date <span className="text-red-500">*</span></Label>
                <Input
                  id="completionDate"
                  type="date"
                  value={form.completionDate}
                  onChange={(e) => setField("completionDate", e.target.value)}
                />
              </div>

              <div className="space-y-1.5">
                <Label>Grade <span className="text-red-500">*</span></Label>
                <Select value={form.grade} onValueChange={(v) => setField("grade", v)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select grade" />
                  </SelectTrigger>
                  <SelectContent>
                    {GRADE_OPTIONS.map((g) => (
                      <SelectItem key={g} value={g}>{g}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-1.5">
              <Label>Certificate Status</Label>
              <Select value={form.status} onValueChange={(v) => setField("status", v)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="valid">Valid — Publicly verifiable</SelectItem>
                  <SelectItem value="revoked">Revoked — Shows as revoked on verification</SelectItem>
                  <SelectItem value="expired">Expired — Shows as expired on verification</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={closeDialog} disabled={saving}>
              <X className="w-4 h-4 mr-1" /> Cancel
            </Button>
            <Button className="bg-primary text-primary-foreground" onClick={handleSave} disabled={saving}>
              {saving ? "Saving..." : editingCert ? "Save Changes" : "Issue Certificate"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
}
