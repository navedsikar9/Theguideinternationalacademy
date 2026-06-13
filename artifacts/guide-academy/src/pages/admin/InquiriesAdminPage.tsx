import { useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Search, Mail, Eye } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow
} from "@/components/ui/table";
import { useListInquiries } from "@workspace/api-client-react";
import type { Inquiry } from "@workspace/api-client-react";
import { Skeleton } from "@/components/ui/skeleton";

export default function InquiriesAdminPage() {
  const [search, setSearch] = useState("");
  const [viewing, setViewing] = useState<Inquiry | null>(null);

  const { data: inquiries = [], isLoading } = useListInquiries(
    {},
    { query: { queryKey: ["admin-inquiries"] } }
  );

  const filtered = inquiries.filter(inq =>
    inq.name.toLowerCase().includes(search.toLowerCase()) ||
    inq.email.toLowerCase().includes(search.toLowerCase()) ||
    (inq.subject ?? "").toLowerCase().includes(search.toLowerCase())
  );

  const statusColor = (s: string) => {
    if (s === "resolved") return "bg-green-100 text-green-700";
    if (s === "in_progress") return "bg-blue-100 text-blue-700";
    return "bg-yellow-100 text-yellow-700";
  };

  return (
    <AdminLayout>
      <div className="flex justify-between items-center mb-6">
        <div className="relative w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input placeholder="Search by name, email, subject..." className="pl-9 bg-card" value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        <p className="text-sm text-muted-foreground">{inquiries.length} total inquiries</p>
      </div>

      <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50 hover:bg-muted/50">
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Subject</TableHead>
              <TableHead>Course</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-right">View</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              Array(5).fill(0).map((_, i) => (
                <TableRow key={i}>
                  {Array(8).fill(0).map((_, j) => <TableCell key={j}><Skeleton className="h-4 w-20" /></TableCell>)}
                </TableRow>
              ))
            ) : filtered.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="text-center py-12 text-muted-foreground">
                  <Mail className="w-8 h-8 mx-auto mb-2 opacity-30" />
                  {search ? "No matching inquiries." : "No inquiries yet."}
                </TableCell>
              </TableRow>
            ) : (
              filtered.map(inq => (
                <TableRow key={inq.id} className="hover:bg-muted/30">
                  <TableCell className="font-medium">{inq.name}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">{inq.email}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">{inq.phone ?? "—"}</TableCell>
                  <TableCell className="text-sm max-w-[120px] truncate">{inq.subject}</TableCell>
                  <TableCell>
                    {inq.courseInterest
                      ? <Badge variant="outline" className="text-xs">{inq.courseInterest}</Badge>
                      : "—"}
                  </TableCell>
                  <TableCell>
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium capitalize ${statusColor(inq.status ?? "pending")}`}>
                      {(inq.status ?? "pending").replace("_", " ")}
                    </span>
                  </TableCell>
                  <TableCell className="text-xs text-muted-foreground">
                    {inq.createdAt ? new Date(inq.createdAt).toLocaleDateString("en-IN") : "—"}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon" className="h-8 w-8 hover:text-primary" onClick={() => setViewing(inq)}>
                      <Eye className="w-4 h-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <Dialog open={!!viewing} onOpenChange={open => !open && setViewing(null)}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="font-serif text-xl">Inquiry from {viewing?.name}</DialogTitle>
          </DialogHeader>
          {viewing && (
            <div className="space-y-4 py-2">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div><span className="font-semibold text-foreground">Name:</span><p className="text-muted-foreground">{viewing.name}</p></div>
                <div><span className="font-semibold text-foreground">Email:</span><p className="text-muted-foreground">{viewing.email}</p></div>
                <div><span className="font-semibold text-foreground">Phone:</span><p className="text-muted-foreground">{viewing.phone ?? "—"}</p></div>
                <div><span className="font-semibold text-foreground">Course:</span><p className="text-muted-foreground">{viewing.courseInterest ?? "—"}</p></div>
                <div><span className="font-semibold text-foreground">Status:</span><p className="text-muted-foreground capitalize">{(viewing.status ?? "pending").replace("_", " ")}</p></div>
                <div><span className="font-semibold text-foreground">Date:</span><p className="text-muted-foreground">{viewing.createdAt ? new Date(viewing.createdAt).toLocaleString("en-IN") : "—"}</p></div>
              </div>
              <div>
                <span className="font-semibold text-foreground text-sm">Subject:</span>
                <p className="text-muted-foreground text-sm mt-1">{viewing.subject}</p>
              </div>
              <div>
                <span className="font-semibold text-foreground text-sm">Message:</span>
                <div className="mt-2 p-4 bg-muted rounded-lg text-sm text-muted-foreground leading-relaxed whitespace-pre-wrap">
                  {viewing.message}
                </div>
              </div>
              <div className="flex gap-3">
                <Button asChild className="flex-1 bg-primary text-primary-foreground">
                  <a href={`mailto:${viewing.email}?subject=Re: ${encodeURIComponent(viewing.subject ?? "")}`}>
                    Reply by Email
                  </a>
                </Button>
                {viewing.phone && (
                  <Button variant="outline" asChild className="flex-1">
                    <a href={`https://wa.me/${viewing.phone.replace(/\D/g, "")}`} target="_blank" rel="noreferrer">
                      WhatsApp
                    </a>
                  </Button>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
}
