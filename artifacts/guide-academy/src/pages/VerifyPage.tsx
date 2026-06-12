import { useState } from "react";
import { Search, CheckCircle2, XCircle, ShieldCheck, Calendar, Award, User, Hash, GraduationCap, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useVerifyCertificate } from "@workspace/api-client-react";
import { Skeleton } from "@/components/ui/skeleton";
import { format } from "date-fns";

const STATUS_CONFIG: Record<string, { label: string; color: string; bg: string }> = {
  valid: { label: "VALID", color: "text-green-700", bg: "bg-green-100" },
  revoked: { label: "REVOKED", color: "text-red-700", bg: "bg-red-100" },
  expired: { label: "EXPIRED", color: "text-yellow-700", bg: "bg-yellow-100" },
};

export default function VerifyPage() {
  const [searchInput, setSearchInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const { data: verificationResult, isLoading, isFetching } = useVerifyCertificate(
    { number: searchQuery },
    { query: { enabled: !!searchQuery } }
  );

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      setSearchQuery(searchInput.trim().toUpperCase());
    }
  };

  const loading = isLoading || isFetching;
  const cert = verificationResult?.certificate;
  const found = verificationResult?.found && cert;

  const statusConfig = cert ? (STATUS_CONFIG[cert.status] ?? STATUS_CONFIG.valid) : null;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      <main className="flex-1 pt-32 pb-20">
        <div className="container mx-auto px-4 md:px-6 max-w-3xl">

          {/* Hero */}
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center border-2 border-primary/20">
                <ShieldCheck className="w-10 h-10 text-primary" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-4">
              Verify Certificate
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Instantly verify the authenticity of any certificate issued by{" "}
              <strong className="text-foreground">THE GUIDE International Academy</strong>.
              Enter the certificate number printed on the document.
            </p>
          </motion.div>

          {/* Search Card */}
          <div className="bg-card border border-border shadow-xl rounded-2xl p-6 md:p-10 mb-10 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />

            <form onSubmit={handleSearch} className="relative z-10 flex flex-col sm:flex-row gap-3 max-w-2xl mx-auto">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  placeholder="Enter Certificate Number (e.g. TGA-2024-001)"
                  className="h-14 text-base pl-12 pr-4 bg-background font-mono uppercase tracking-wider"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value.toUpperCase())}
                  data-testid="input-certificate-number"
                />
              </div>
              <Button
                type="submit"
                className="h-14 px-8 text-base font-semibold bg-primary text-primary-foreground hover:bg-primary/90 shrink-0"
                disabled={loading || !searchInput.trim()}
                data-testid="btn-verify"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Verifying...
                  </span>
                ) : "Verify Now"}
              </Button>
            </form>

            {/* Hint */}
            <p className="text-center text-xs text-muted-foreground mt-4 relative z-10">
              Certificate numbers follow the format: <span className="font-mono font-semibold text-foreground">TGA-YYYY-XXX</span>
            </p>
          </div>

          {/* Loading skeleton */}
          {loading && (
            <div className="bg-card border border-border rounded-2xl p-8 space-y-6">
              <div className="flex items-center gap-4">
                <Skeleton className="w-16 h-16 rounded-full" />
                <div className="space-y-2 flex-1">
                  <Skeleton className="h-5 w-48" />
                  <Skeleton className="h-4 w-32" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-6">
                {Array(4).fill(0).map((_, i) => <Skeleton key={i} className="h-20 w-full rounded-xl" />)}
              </div>
            </div>
          )}

          {/* Result */}
          <AnimatePresence mode="wait">
            {!loading && searchQuery && verificationResult && (
              <motion.div
                key={searchQuery}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4 }}
              >
                {found ? (
                  /* ✅ FOUND */
                  <div className={`rounded-2xl overflow-hidden shadow-lg border ${cert.status === 'valid' ? 'border-green-200' : cert.status === 'revoked' ? 'border-red-200' : 'border-yellow-200'}`}>
                    {/* Top stripe */}
                    <div className={`h-2 w-full ${cert.status === 'valid' ? 'bg-green-500' : cert.status === 'revoked' ? 'bg-red-500' : 'bg-yellow-400'}`} />

                    <div className="bg-card p-8">
                      {/* Verified header */}
                      <div className="flex items-start justify-between flex-wrap gap-4 mb-8 pb-6 border-b border-border">
                        <div className="flex items-center gap-3">
                          {cert.status === 'valid' ? (
                            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                              <CheckCircle2 className="w-7 h-7 text-green-600" />
                            </div>
                          ) : cert.status === 'revoked' ? (
                            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                              <XCircle className="w-7 h-7 text-red-600" />
                            </div>
                          ) : (
                            <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                              <AlertCircle className="w-7 h-7 text-yellow-600" />
                            </div>
                          )}
                          <div>
                            <h3 className={`text-lg font-bold ${cert.status === 'valid' ? 'text-green-700' : cert.status === 'revoked' ? 'text-red-700' : 'text-yellow-700'}`}>
                              {cert.status === 'valid' ? 'Certificate Verified — Authentic' : cert.status === 'revoked' ? 'Certificate Revoked' : 'Certificate Expired'}
                            </h3>
                            <p className="text-sm text-muted-foreground">
                              {cert.status === 'valid'
                                ? 'This certificate is genuine and issued by THE GUIDE International Academy.'
                                : cert.status === 'revoked'
                                ? 'This certificate has been revoked. Please contact administration.'
                                : 'This certificate has expired. Please contact administration.'}
                            </p>
                          </div>
                        </div>

                        <div className="text-right">
                          <div className="text-xs text-muted-foreground uppercase tracking-widest font-semibold mb-1">Certificate No.</div>
                          <div className="text-xl font-mono font-bold text-foreground tracking-wider">{cert.certificateNumber}</div>
                          {statusConfig && (
                            <span className={`mt-1 inline-block px-3 py-0.5 rounded-full text-xs font-bold ${statusConfig.bg} ${statusConfig.color}`}>
                              {statusConfig.label}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Certificate details grid */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                        <DetailBlock icon={<User className="w-4 h-4" />} label="Student Name" value={cert.studentName} large />
                        <DetailBlock icon={<Award className="w-4 h-4" />} label="Course / Program" value={cert.courseName} large />
                        <DetailBlock
                          icon={<Calendar className="w-4 h-4" />}
                          label="Completion Date"
                          value={format(new Date(cert.completionDate), "MMMM dd, yyyy")}
                        />
                        <DetailBlock
                          icon={<GraduationCap className="w-4 h-4" />}
                          label="Grade Awarded"
                          value={cert.grade}
                        />
                        <DetailBlock
                          icon={<Hash className="w-4 h-4" />}
                          label="Certificate ID"
                          value={cert.certificateNumber}
                          mono
                        />
                        <DetailBlock
                          icon={<ShieldCheck className="w-4 h-4" />}
                          label="Verified On"
                          value={format(new Date(), "MMMM dd, yyyy")}
                        />
                      </div>

                      {/* Footer watermark */}
                      <div className="pt-5 border-t border-border flex flex-col sm:flex-row justify-between items-center gap-2 text-sm text-muted-foreground">
                        <div className="font-serif font-semibold text-foreground">THE GUIDE International Academy</div>
                        <div className="text-xs text-center sm:text-right">
                          Internationally Recognized Safety &amp; Health Training Institute
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  /* ❌ NOT FOUND */
                  <div className="bg-red-50 border border-red-200 rounded-2xl p-10 text-center shadow-sm">
                    <div className="flex justify-center mb-5">
                      <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
                        <XCircle className="w-9 h-9 text-red-500" />
                      </div>
                    </div>
                    <h3 className="text-2xl font-serif font-bold text-red-700 mb-2">No Record Found</h3>
                    <p className="text-red-600/80 max-w-md mx-auto mb-6">
                      We could not find a certificate matching <span className="font-mono font-bold">{searchQuery}</span>.
                      Please double-check the certificate number or contact the academy administration.
                    </p>
                    <div className="bg-white border border-red-200 rounded-xl p-4 max-w-sm mx-auto text-sm text-left">
                      <p className="font-semibold text-red-700 mb-1">What to check:</p>
                      <ul className="text-red-600/80 space-y-1 list-disc list-inside">
                        <li>Ensure the number matches exactly (e.g. <span className="font-mono">TGA-2024-001</span>)</li>
                        <li>Check for typos or missing digits</li>
                        <li>Contact us if you believe this is an error</li>
                      </ul>
                    </div>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </main>

      <Footer />
    </div>
  );
}

function DetailBlock({
  icon, label, value, large, mono,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  large?: boolean;
  mono?: boolean;
}) {
  return (
    <div className="bg-muted/30 rounded-xl p-4 border border-border">
      <div className="flex items-center gap-2 text-xs text-muted-foreground uppercase tracking-wider font-semibold mb-2">
        {icon}
        {label}
      </div>
      <div className={`font-semibold text-foreground ${large ? "text-lg" : "text-base"} ${mono ? "font-mono tracking-wider" : ""}`}>
        {value}
      </div>
    </div>
  );
}
