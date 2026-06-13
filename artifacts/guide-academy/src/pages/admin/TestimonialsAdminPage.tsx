import { useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Plus, Edit, Trash2, Star, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow
} from "@/components/ui/table";
import { useListTestimonials, useCreateTestimonial, useUpdateTestimonial, useDeleteTestimonial } from "@workspace/api-client-react";
import type { Testimonial, TestimonialInput } from "@workspace/api-client-react";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { useQueryClient } from "@tanstack/react-query";

const EMPTY: TestimonialInput = {
  studentName: "", courseName: "", rating: 5, review: "",
  photoUrl: "", designation: "", approved: true,
};

function StarRating({ value, onChange }: { value: number; onChange: (v: number) => void }) {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map(n => (
        <button key={n} type="button" onClick={() => onChange(n)} className={n <= value ? "text-yellow-400" : "text-muted-foreground"}>
          <Star className="w-5 h-5 fill-current" />
        </button>
      ))}
    </div>
  );
}

export default function TestimonialsAdminPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Testimonial | null>(null);
  const [form, setForm] = useState<TestimonialInput>(EMPTY);

  const qc = useQueryClient();
  const { toast } = useToast();
  const { data: testimonials = [], isLoading } = useListTestimonials(
    { approved: undefined },
    { query: { queryKey: ["admin-testimonials"] } }
  );
  const createT = useCreateTestimonial();
  const updateT = useUpdateTestimonial();
  const deleteT = useDeleteTestimonial();

  const invalidate = () => qc.invalidateQueries({ queryKey: ["admin-testimonials"] });

  const openAdd = () => {
    setEditing(null);
    setForm(EMPTY);
    setModalOpen(true);
  };

  const openEdit = (t: Testimonial) => {
    setEditing(t);
    setForm({
      studentName: t.studentName, courseName: t.courseName,
      rating: t.rating ?? 5, review: t.review,
      photoUrl: t.photoUrl ?? "", designation: t.designation ?? "",
      approved: t.approved ?? true,
    });
    setModalOpen(true);
  };

  const handleSave = async () => {
    if (!form.studentName || !form.review) {
      toast({ title: "Name and review are required", variant: "destructive" });
      return;
    }
    try {
      if (editing) {
        await updateT.mutateAsync({ id: editing.id, data: form });
        toast({ title: "Testimonial updated" });
      } else {
        await createT.mutateAsync({ data: form });
        toast({ title: "Testimonial added" });
      }
      setModalOpen(false);
      invalidate();
    } catch {
      toast({ title: "Save failed", variant: "destructive" });
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Delete this testimonial?")) return;
    try {
      await deleteT.mutateAsync({ id });
      toast({ title: "Testimonial deleted" });
      invalidate();
    } catch {
      toast({ title: "Delete failed", variant: "destructive" });
    }
  };

  return (
    <AdminLayout>
      <div className="flex justify-between items-center mb-6">
        <p className="text-muted-foreground">{testimonials.length} testimonials</p>
        <Button className="bg-primary text-primary-foreground gap-2" onClick={openAdd}>
          <Plus className="w-4 h-4" /> Add Testimonial
        </Button>
      </div>

      <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50 hover:bg-muted/50">
              <TableHead>Student</TableHead>
              <TableHead>Course</TableHead>
              <TableHead>Rating</TableHead>
              <TableHead>Review</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              Array(4).fill(0).map((_, i) => (
                <TableRow key={i}>
                  {Array(6).fill(0).map((_, j) => <TableCell key={j}><Skeleton className="h-4 w-20" /></TableCell>)}
                </TableRow>
              ))
            ) : testimonials.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-12 text-muted-foreground">No testimonials yet.</TableCell>
              </TableRow>
            ) : (
              testimonials.map(t => (
                <TableRow key={t.id}>
                  <TableCell className="font-medium">{t.studentName}</TableCell>
                  <TableCell className="text-muted-foreground text-sm">{t.courseName}</TableCell>
                  <TableCell>
                    <div className="flex gap-0.5">
                      {Array(t.rating ?? 5).fill(0).map((_, i) => <Star key={i} className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />)}
                    </div>
                  </TableCell>
                  <TableCell className="max-w-[200px]">
                    <p className="truncate text-sm text-muted-foreground">{t.review}</p>
                  </TableCell>
                  <TableCell>
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${t.approved ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                      {t.approved ? "Approved" : "Pending"}
                    </span>
                  </TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button variant="ghost" size="icon" className="h-8 w-8 hover:text-primary" onClick={() => openEdit(t)}>
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 hover:text-destructive" onClick={() => handleDelete(t.id)} disabled={deleteT.isPending}>
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
            <DialogTitle className="font-serif text-xl">{editing ? "Edit Testimonial" : "Add Testimonial"}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-2">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label>Student Name *</Label>
                <Input value={form.studentName} onChange={e => setForm(f => ({ ...f, studentName: e.target.value }))} placeholder="John Doe" />
              </div>
              <div className="space-y-1.5">
                <Label>Course Name *</Label>
                <Input value={form.courseName} onChange={e => setForm(f => ({ ...f, courseName: e.target.value }))} placeholder="NEBOSH IGC" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label>Designation</Label>
                <Input value={form.designation ?? ""} onChange={e => setForm(f => ({ ...f, designation: e.target.value }))} placeholder="Safety Officer" />
              </div>
              <div className="space-y-1.5">
                <Label>Photo URL</Label>
                <Input value={form.photoUrl ?? ""} onChange={e => setForm(f => ({ ...f, photoUrl: e.target.value }))} placeholder="https://..." />
              </div>
            </div>
            <div className="space-y-1.5">
              <Label>Rating</Label>
              <StarRating value={form.rating ?? 5} onChange={v => setForm(f => ({ ...f, rating: v }))} />
            </div>
            <div className="space-y-1.5">
              <Label>Review *</Label>
              <Textarea value={form.review} onChange={e => setForm(f => ({ ...f, review: e.target.value }))} rows={4} placeholder="What the student said..." />
            </div>
            <div className="flex items-center gap-3">
              <input type="checkbox" id="approved" checked={form.approved ?? true} onChange={e => setForm(f => ({ ...f, approved: e.target.checked }))} className="w-4 h-4 accent-primary" />
              <Label htmlFor="approved" className="cursor-pointer">Approved (visible on website)</Label>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setModalOpen(false)}><X className="w-4 h-4 mr-2" /> Cancel</Button>
            <Button onClick={handleSave} disabled={createT.isPending || updateT.isPending} className="bg-primary text-primary-foreground">
              {(createT.isPending || updateT.isPending) ? "Saving..." : editing ? "Update" : "Add Testimonial"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
}
