import { useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Plus, Trash2, Image as ImageIcon, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { useListGallery, useCreateGalleryImage, useDeleteGalleryImage } from "@workspace/api-client-react";
import type { GalleryImageInput } from "@workspace/api-client-react";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { useQueryClient } from "@tanstack/react-query";

const EMPTY: GalleryImageInput = { imageUrl: "", category: "Campus", title: "", description: "" };
const CATS = ["Campus", "Classroom", "Training", "Events", "Students", "Certifications"];

export default function GalleryAdminPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState<GalleryImageInput>(EMPTY);

  const qc = useQueryClient();
  const { toast } = useToast();
  const { data: images = [], isLoading } = useListGallery({}, { query: { queryKey: ["admin-gallery"] } });
  const createImage = useCreateGalleryImage();
  const deleteImage = useDeleteGalleryImage();

  const invalidate = () => qc.invalidateQueries({ queryKey: ["admin-gallery"] });

  const handleSave = async () => {
    if (!form.imageUrl) {
      toast({ title: "Image URL is required", variant: "destructive" });
      return;
    }
    try {
      await createImage.mutateAsync({ data: form });
      toast({ title: "Image added to gallery" });
      setForm(EMPTY);
      setModalOpen(false);
      invalidate();
    } catch {
      toast({ title: "Failed to add image", variant: "destructive" });
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Remove this image from gallery?")) return;
    try {
      await deleteImage.mutateAsync({ id });
      toast({ title: "Image removed" });
      invalidate();
    } catch {
      toast({ title: "Delete failed", variant: "destructive" });
    }
  };

  return (
    <AdminLayout>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold text-foreground">{images.length} images in gallery</h2>
        <Button className="bg-primary text-primary-foreground gap-2" onClick={() => setModalOpen(true)}>
          <Plus className="w-4 h-4" /> Add Image
        </Button>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {Array(8).fill(0).map((_, i) => <Skeleton key={i} className="h-48 rounded-xl" />)}
        </div>
      ) : images.length === 0 ? (
        <div className="text-center py-20 text-muted-foreground border border-dashed border-border rounded-xl bg-card">
          <ImageIcon className="w-12 h-12 mx-auto mb-3 opacity-20" />
          <p className="text-lg font-medium mb-1">No images yet</p>
          <p className="text-sm">Add your first gallery image to get started.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.map(img => (
            <div key={img.id} className="relative group rounded-xl overflow-hidden border border-border bg-card shadow-sm">
              <img src={img.imageUrl} alt={img.title || "Gallery"} className="w-full h-48 object-cover" loading="lazy" />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleDelete(img.id)}
                  disabled={deleteImage.isPending}
                >
                  <Trash2 className="w-4 h-4 mr-1" /> Remove
                </Button>
              </div>
              <div className="p-3">
                <div className="font-medium text-sm truncate">{img.title || "Untitled"}</div>
                <div className="text-xs text-muted-foreground">{img.category}</div>
              </div>
            </div>
          ))}
        </div>
      )}

      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="font-serif text-xl">Add Gallery Image</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-2">
            <div className="space-y-1.5">
              <Label>Image URL *</Label>
              <Input value={form.imageUrl} onChange={e => setForm(f => ({ ...f, imageUrl: e.target.value }))} placeholder="https://... or /gallery/image.jpg" />
              {form.imageUrl && (
                <img src={form.imageUrl} alt="Preview" className="mt-2 w-full h-40 object-cover rounded-lg border" onError={e => (e.currentTarget.style.display = 'none')} />
              )}
            </div>
            <div className="space-y-1.5">
              <Label>Title</Label>
              <Input value={form.title ?? ""} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} placeholder="e.g. Classroom Training Session" />
            </div>
            <div className="space-y-1.5">
              <Label>Category</Label>
              <Select value={form.category} onValueChange={v => setForm(f => ({ ...f, category: v }))}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {CATS.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setModalOpen(false)}><X className="w-4 h-4 mr-2" /> Cancel</Button>
            <Button onClick={handleSave} disabled={createImage.isPending} className="bg-primary text-primary-foreground">
              {createImage.isPending ? "Adding..." : "Add Image"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
}
