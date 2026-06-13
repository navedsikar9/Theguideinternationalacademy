import { useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Search, ShieldCheck, ShieldX, Clock, RefreshCw } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow
} from "@/components/ui/table";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";

interface VerificationLog {
  id: number;
  certificateNumber: string;
  found: boolean;
  ipAddress: string | null;
  verifiedAt: string;
}

async function fetchLogs(): Promise<VerificationLog[]> {
  const res = await fetch("/api/dashboard/recent-verifications", { credentials: "include" });
  if (!res.ok) throw new Error("Failed to fetch");
  return res.json();
}

export default function VerificationLogsPage() {
  const [search, setSearch] = useState("");

  const { data: logs = [], isLoading, refetch, isFetching } = useQuery({
    queryKey: ["verification-logs"],
    queryFn: fetchLogs,
  });

  const filtered = logs.filter(l =>
    l.certificateNumber.toLowerCase().includes(search.toLowerCase()) ||
    (l.ipAddress ?? "").includes(search)
  );

  const found = logs.filter(l => l.found).length;
  const notFound = logs.filter(l => !l.found).length;

  return (
    <AdminLayout>
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-card border border-border rounded-xl p-5 flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center">
            <ShieldCheck className="w-6 h-6 text-blue-500" />
          </div>
          <div>
            <p className="text-2xl font-bold text-foreground">{logs.length}</p>
            <p className="text-sm text-muted-foreground">Total Lookups</p>
          </div>
        </div>
        <div className="bg-card border border-border rounded-xl p-5 flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center">
            <ShieldCheck className="w-6 h-6 text-green-500" />
          </div>
          <div>
            <p className="text-2xl font-bold text-foreground">{found}</p>
            <p className="text-sm text-muted-foreground">Verified (Found)</p>
          </div>
        </div>
        <div className="bg-card border border-border rounded-xl p-5 flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center">
            <ShieldX className="w-6 h-6 text-red-500" />
          </div>
          <div>
            <p className="text-2xl font-bold text-foreground">{notFound}</p>
            <p className="text-sm text-muted-foreground">Not Found</p>
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center mb-4">
        <div className="relative w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search by certificate # or IP..."
            className="pl-9 bg-card"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        <Button variant="outline" size="sm" onClick={() => refetch()} disabled={isFetching} className="gap-2">
          <RefreshCw className={`w-4 h-4 ${isFetching ? "animate-spin" : ""}`} />
          Refresh
        </Button>
      </div>

      <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50 hover:bg-muted/50">
              <TableHead>#</TableHead>
              <TableHead>Certificate Number</TableHead>
              <TableHead>Result</TableHead>
              <TableHead>IP Address</TableHead>
              <TableHead>Date & Time</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              Array(8).fill(0).map((_, i) => (
                <TableRow key={i}>
                  {Array(5).fill(0).map((_, j) => <TableCell key={j}><Skeleton className="h-4 w-24" /></TableCell>)}
                </TableRow>
              ))
            ) : filtered.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-12 text-muted-foreground">
                  <Clock className="w-8 h-8 mx-auto mb-2 opacity-30" />
                  {search ? "No matching logs." : "No verification attempts yet."}
                </TableCell>
              </TableRow>
            ) : (
              filtered.map((log, i) => (
                <TableRow key={log.id}>
                  <TableCell className="text-muted-foreground text-sm">{i + 1}</TableCell>
                  <TableCell>
                    <span className="font-mono text-sm font-semibold text-foreground">{log.certificateNumber}</span>
                  </TableCell>
                  <TableCell>
                    {log.found ? (
                      <Badge className="bg-green-100 text-green-700 border-green-200 gap-1">
                        <ShieldCheck className="w-3 h-3" /> Found
                      </Badge>
                    ) : (
                      <Badge className="bg-red-100 text-red-700 border-red-200 gap-1">
                        <ShieldX className="w-3 h-3" /> Not Found
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell className="font-mono text-xs text-muted-foreground">{log.ipAddress ?? "—"}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {new Date(log.verifiedAt).toLocaleString("en-IN", {
                      day: "2-digit", month: "short", year: "numeric",
                      hour: "2-digit", minute: "2-digit"
                    })}
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
