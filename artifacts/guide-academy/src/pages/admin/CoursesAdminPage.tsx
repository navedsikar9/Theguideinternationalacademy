import { useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Plus, Search, Edit, Trash2, BookOpen, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow
} from "@/components/ui/table";
import { useListCourses, useCreateCourse, useUpdateCourse, useDeleteCourse } from "@workspace/api-client-react";
import type { Course, CourseInput } from "@workspace/api-client-react";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { useQueryClient } from "@tanstack/react-query";

const EMPTY: CourseInput = {
  title: "", slug: "", category: "International", duration: "", description: "",
  eligibility: "", syllabus: "", careerOpportunities: "",
};

function toSlug(title: string) {
  return title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

export default function CoursesAdminPage() {
  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Course | null>(null);
  const [form, setForm] = useState<CourseInput>(EMPTY);

  const qc = useQueryClient();
  const { toast } = useToast();
  const { data: courses = [], isLoading } = useListCourses({}, { query: { queryKey: ["admin-courses"] } });
  const createCourse = useCreateCourse();
  const updateCourse = useUpdateCourse();
  const deleteCourse = useDeleteCourse();

  const filtered = courses.filter(c =>
    c.title.toLowerCase().includes(search.toLowerCase()) ||
    c.category.toLowerCase().includes(search.toLowerCase())
  );

  const openAdd = () => {
    setEditing(null);
    setForm(EMPTY);
    setModalOpen(true);
  };

  const openEdit = (c: Course) => {
    setEditing(c);
    setForm({
      title: c.title, slug: c.slug, category: c.category,
      duration: c.duration, description: c.description,
      eligibility: c.eligibility ?? "", syllabus: c.syllabus ?? "",
      careerOpportunities: c.careerOpportunities ?? "",
    });
    setModalOpen(true);
  };

  const invalidate = () => qc.invalidateQueries({ queryKey: ["admin-courses"] });

  const handleSave = async () => {
    try {
      const payload = { ...form, slug: form.slug || toSlug(form.title) };
      if (editing) {
        await updateCourse.mutateAsync({ id: editing.id, data: payload });
        toast({ title: "Course updated" });
      } else {
        await createCourse.mutateAsync({ data: payload });
        toast({ title: "Course created" });
      }
      setModalOpen(false);
      invalidate();
    } catch {
      toast({ title: "Save failed", variant: "destructive" });
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Delete this course?")) return;
    try {
      await deleteCourse.mutateAsync({ id });
      toast({ title: "Course deleted" });
      invalidate();
    } catch {
      toast({ title: "Delete failed", variant: "destructive" });
    }
  };

  const isPending = createCourse.isPending || updateCourse.isPending;

  return (
    <AdminLayout>
      <div className="flex justify-between items-center mb-6">
        <div className="relative w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input placeholder="Search courses..." className="pl-9 bg-card" value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        <Button className="bg-primary text-primary-foreground gap-2" onClick={openAdd}>
          <Plus className="w-4 h-4" /> Add Course
        </Button>
      </div>

      <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50 hover:bg-muted/50">
              <TableHead>Title</TableHead>
              <TableHead>Slug</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Duration</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              Array(5).fill(0).map((_, i) => (
                <TableRow key={i}>
                  {Array(5).fill(0).map((_, j) => <TableCell key={j}><Skeleton className="h-4 w-24" /></TableCell>)}
                </TableRow>
              ))
            ) : filtered.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-12 text-muted-foreground">
                  <BookOpen className="w-8 h-8 mx-auto mb-2 opacity-30" />
                  No courses found.
                </TableCell>
              </TableRow>
            ) : (
              filtered.map(c => (
                <TableRow key={c.id}>
                  <TableCell className="font-medium">{c.title}</TableCell>
                  <TableCell className="font-mono text-xs text-muted-foreground">{c.slug}</TableCell>
                  <TableCell>
                    <Badge variant={c.category === "International" ? "default" : "secondary"}>
                      {c.category}
                    </Badge>
                  </TableCell>
                  <TableCell>{c.duration}</TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button variant="ghost" size="icon" className="h-8 w-8 hover:text-primary" onClick={() => openEdit(c)}>
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 hover:text-destructive" onClick={() => handleDelete(c.id)} disabled={deleteCourse.isPending}>
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
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="font-serif text-xl">{editing ? "Edit Course" : "Add New Course"}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-2">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label>Course Title *</Label>
                <Input value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value, slug: f.slug || toSlug(e.target.value) }))} placeholder="NEBOSH International General Certificate" />
              </div>
              <div className="space-y-1.5">
                <Label>Slug</Label>
                <Input value={form.slug} onChange={e => setForm(f => ({ ...f, slug: e.target.value }))} placeholder="nebosh-igc" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label>Category *</Label>
                <Select value={form.category} onValueChange={v => setForm(f => ({ ...f, category: v }))}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="International">International</SelectItem>
                    <SelectItem value="National Diplomas">National Diplomas</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label>Duration *</Label>
                <Input value={form.duration} onChange={e => setForm(f => ({ ...f, duration: e.target.value }))} placeholder="3-4 Days" />
              </div>
            </div>
            <div className="space-y-1.5">
              <Label>Description *</Label>
              <Textarea value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} rows={3} placeholder="Course description..." />
            </div>
            <div className="space-y-1.5">
              <Label>Eligibility</Label>
              <Textarea value={form.eligibility ?? ""} onChange={e => setForm(f => ({ ...f, eligibility: e.target.value }))} rows={2} placeholder="Who can apply..." />
            </div>
            <div className="space-y-1.5">
              <Label>Career Opportunities</Label>
              <Textarea value={form.careerOpportunities ?? ""} onChange={e => setForm(f => ({ ...f, careerOpportunities: e.target.value }))} rows={2} placeholder="Career outcomes..." />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setModalOpen(false)}><X className="w-4 h-4 mr-2" /> Cancel</Button>
            <Button onClick={handleSave} disabled={isPending} className="bg-primary text-primary-foreground">
              {isPending ? "Saving..." : editing ? "Update Course" : "Create Course"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
}
