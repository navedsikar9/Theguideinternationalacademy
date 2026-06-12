import { useState } from "react";
import { Search, CheckCircle2, XCircle, ShieldCheck, Calendar, Award, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useVerifyCertificate } from "@workspace/api-client-react";
import { Skeleton } from "@/components/ui/skeleton";
import { format } from "date-fns";

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
      setSearchQuery(searchInput.trim());
    }
  };

  const loading = isLoading || isFetching;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      <main className="flex-1 pt-32 pb-20">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl">
          
          <div className="text-center mb-12">
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center border border-primary/20">
                <ShieldCheck className="w-10 h-10 text-primary" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-4">Verify Certificate</h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Enter the certificate number to verify the authenticity of credentials issued by THE GUIDE International Academy.
            </p>
          </div>

          <div className="bg-card border border-border shadow-xl rounded-2xl p-6 md:p-10 mb-12 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
            
            <form onSubmit={handleSearch} className="relative z-10 flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto">
              <Input 
                placeholder="Enter Certificate Number (e.g. TGA-2023-001)" 
                className="h-14 text-lg px-6 bg-background"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                data-testid="input-certificate-number"
              />
              <Button 
                type="submit" 
                className="h-14 px-8 text-lg font-semibold bg-sidebar text-white hover:bg-sidebar/90"
                disabled={loading || !searchInput.trim()}
                data-testid="btn-verify"
              >
                {loading ? "Verifying..." : "Verify Now"}
              </Button>
            </form>
          </div>

          {loading && (
            <div className="bg-card border border-border rounded-xl p-8 animate-pulse">
              <div className="flex items-center gap-4 mb-8">
                <Skeleton className="w-16 h-16 rounded-full" />
                <div>
                  <Skeleton className="h-6 w-48 mb-2" />
                  <Skeleton className="h-4 w-32" />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Skeleton className="h-16 w-full" />
                <Skeleton className="h-16 w-full" />
                <Skeleton className="h-16 w-full" />
                <Skeleton className="h-16 w-full" />
              </div>
            </div>
          )}

          {!loading && searchQuery && verificationResult && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              {verificationResult.found && verificationResult.certificate ? (
                <div className="bg-card border border-green-200 shadow-lg rounded-xl overflow-hidden relative">
                  <div className="absolute top-0 left-0 w-full h-2 bg-green-500"></div>
                  
                  <div className="p-8">
                    <div className="flex items-start justify-between flex-wrap gap-4 mb-8">
                      <div className="flex items-center gap-3">
                        <CheckCircle2 className="w-8 h-8 text-green-500" />
                        <div>
                          <h3 className="text-xl font-bold text-green-700">Verified Authentic</h3>
                          <p className="text-sm text-muted-foreground">Record found in official database</p>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <div className="text-sm text-muted-foreground uppercase tracking-wider font-semibold mb-1">Certificate No.</div>
                        <div className="text-xl font-mono font-bold text-foreground">{verificationResult.certificate.certificateNumber}</div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-12">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                          <User className="w-4 h-4" /> Student Name
                        </div>
                        <div className="text-lg font-semibold text-foreground">{verificationResult.certificate.studentName}</div>
                      </div>
                      
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                          <Award className="w-4 h-4" /> Course Name
                        </div>
                        <div className="text-lg font-semibold text-foreground">{verificationResult.certificate.courseName}</div>
                      </div>
                      
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                          <Calendar className="w-4 h-4" /> Completion Date
                        </div>
                        <div className="text-lg font-semibold text-foreground">
                          {format(new Date(verificationResult.certificate.completionDate), "MMMM dd, yyyy")}
                        </div>
                      </div>

                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                          <ShieldCheck className="w-4 h-4" /> Grade / Status
                        </div>
                        <div className="text-lg font-semibold text-foreground">
                          {verificationResult.certificate.grade} <span className="text-muted-foreground font-normal">|</span>{" "}
                          <span className={verificationResult.certificate.status === 'valid' ? 'text-green-600' : 'text-red-600'}>
                            {verificationResult.certificate.status.toUpperCase()}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-8 pt-6 border-t border-border flex justify-between items-center text-sm text-muted-foreground">
                      <div className="font-serif">THE GUIDE International Academy</div>
                      <div>Verified on {format(new Date(), "MMM dd, yyyy")}</div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-red-50 border border-red-200 rounded-xl p-8 text-center shadow-sm">
                  <div className="flex justify-center mb-4">
                    <XCircle className="w-16 h-16 text-red-500" />
                  </div>
                  <h3 className="text-2xl font-bold text-red-700 mb-2">No Record Found</h3>
                  <p className="text-red-600/80 max-w-md mx-auto">
                    We could not find any certificate matching the number "{searchQuery}". Please check the number and try again, or contact administration if you believe this is an error.
                  </p>
                </div>
              )}
            </div>
          )}

        </div>
      </main>

      <Footer />
    </div>
  );
}
