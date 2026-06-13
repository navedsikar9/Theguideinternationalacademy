import { useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Plus, Search, Edit, Trash2, X, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow
} from "@/components/ui/table";
import { useListStudents, useCreateStudent, useUpdateStudent, useDeleteStudent } from "@workspace/api-client-react";
import type { Student } from "@workspace/api-client-react";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { useQueryClient } from "@tanstack/react-query";

interface StudentForm {
  name: string;
  certificateNumber: string;
  courseName: string;
  status: string;
  photoUrl: string;
  email: string;
  phone: string;
}

const EMPTY: StudentForm = {
  name: "", certificateNumber: "", courseName: "", status: "active",
  photoUrl: "", email: "", phone: "",
};

export default function StudentsPage() {
  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Student | null>(null);
  const [form, setForm] = useState<StudentForm>(EMPTY);

  const qc = useQueryClient();
  const { toast } = useToast();
  const { data: studentsPage, isLoading } = useListStudents({ search, page: 1, limit: 50 }, { query: { queryKey: ["admin-students", search] } });
  const createStudent = useCreateStudent();
  const updateStudent = useUpdateStudent();
  const deleteStudent = useDeleteStudent();

  const students = studentsPage?.data || [];

  const invalidate = () => qc.invalidateQueries({ queryKey: ["admin-students"] });

  const openAdd = () => {
    setEditing(null);
    setForm(EMPTY);
    setModalOpen(true);
  };

  const openEdit = (s: Student) => {
    setEditing(s);
    setForm({
      name: s.name, certificateNumber: s.certificateNumber ?? "",
      courseName: s.courseName ?? "", status: s.status ?? "active",
      photoUrl: (s as any).photoUrl ?? "", email: (s as any).email ?? "",
      phone: (s as any).phone ?? "",
    });
    setModalOpen(true);
  };

  const handleSave = async () => {
    if (!form.name) {
      toast({ title: "Name is required", variant: "destructive" });
      return;
    }
    try {
      const payload: any = { ...form };
      if (editing) {
        await updateStudent.mutateAsync({ id: editing.id, data: payload });
        toast({ title: "Student updated" });
      } else {
        await createStudent.mutateAsync({ data: payload });
        toast({ title: "Student added" });
      }
      setModalOpen(false);
      invalidate();
    } catch {
      toast({ title: "Save failed", variant: "destructive" });
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Delete this student record?")) return;
    try {
      await deleteStudent.mutateAsync({ id });
      toast({ title: "Student deleted" });
      invalidate();
    } catch {
      toast({ title: "Delete failed", variant: "destructive" });
    }
  };

  const isPending = createStudent.isPending || updateStudent.isPending;

  return (
    <AdminLayout>
      <div className="flex justify-between items-center mb-6">
        <div className="relative w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search students..."
            className="pl-9 bg-card"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        <Button className="bg-primary text-primary-foreground gap-2" onClick={openAdd}>
          <Plus className="w-4 h-4" /> Add Student
        </Button>
      </div>

      <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50 hover:bg-muted/50">
              <TableHead>Photo</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Certificate #</TableHead>
              <TableHead>Course</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              Array(5).fill(0).map((_, i) => (
                <TableRow key={i}>
                  {Array(6).fill(0).map((_, j) => <TableCell key={j}><Skeleton className="h-4 w-24" /></TableCell>)}
                </TableRow>
              ))
            ) : students.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-12 text-muted-foreground">
                  <User className="w-8 h-8 mx-auto mb-2 opacity-30" />
                  No students found.
                </TableCell>
              </TableRow>
            ) : (
              students.map(student => (
                <TableRow key={student.id}>
                  <TableCell>
                    {(student as any).photoUrl ? (
                      <img src={(student as any).photoUrl} alt={student.name} className="w-9 h-9 rounded-full object-cover border" />
                    ) : (
                      <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center">
                        <User className="w-4 h-4 text-primary" />
                      </div>
                    )}
                  </TableCell>
                  <TableCell className="font-medium">{student.name}</TableCell>
                  <TableCell className="font-mono text-xs">{student.certificateNumber}</TableCell>
                  <TableCell>{student.courseName}</TableCell>
                  <TableCell>
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${student.status === 'active' || student.status === 'valid' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                      {(student.status ?? "active").toUpperCase()}
                    </span>
                  </TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button variant="ghost" size="icon" className="h-8 w-8 hover:text-primary" onClick={() => openEdit(student)}>
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 hover:text-destructive"
                      onClick={() => handleDelete(student.id)}
                      disabled={deleteStudent.isPending}
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

      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="font-serif text-xl">{editing ? "Edit Student" : "Add New Student"}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-2">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label>Full Name *</Label>
                <Input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} placeholder="Student Name" />
              </div>
              <div className="space-y-1.5">
                <Label>Certificate Number</Label>
                <Input value={form.certificateNumber} onChange={e => setForm(f => ({ ...f, certificateNumber: e.target.value }))} placeholder="TGA-2024-NEBOSH-001" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label>Course Name</Label>
                <Input value={form.courseName} onChange={e => setForm(f => ({ ...f, courseName: e.target.value }))} placeholder="NEBOSH IGC" />
              </div>
              <div className="space-y-1.5">
                <Label>Status</Label>
                <Select value={form.status} onValueChange={v => setForm(f => ({ ...f, status: v }))}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="valid">Valid</SelectItem>
                    <SelectItem value="expired">Expired</SelectItem>
                    <SelectItem value="revoked">Revoked</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label>Email</Label>
                <Input value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} placeholder="student@email.com" type="email" />
              </div>
              <div className="space-y-1.5">
                <Label>Phone</Label>
                <Input value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} placeholder="+91 XXXXX XXXXX" />
              </div>
            </div>
            <div className="space-y-1.5">
              <Label>Photo URL</Label>
              <Input value={form.photoUrl} onChange={e => setForm(f => ({ ...f, photoUrl: e.target.value }))} placeholder="https://... (link to student photo)" />
              {form.photoUrl && (
                <img src={form.photoUrl} alt="Preview" className="mt-2 w-16 h-16 rounded-full object-cover border" onError={e => (e.currentTarget.style.display = "none")} />
              )}
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setModalOpen(false)}><X className="w-4 h-4 mr-2" /> Cancel</Button>
            <Button onClick={handleSave} disabled={isPending} className="bg-primary text-primary-foreground">
              {isPending ? "Saving..." : editing ? "Update Student" : "Add Student"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
}
