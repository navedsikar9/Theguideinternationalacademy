import { useState, useRef } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Upload, FileSpreadsheet, AlertCircle, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useBulkImportStudents } from "@workspace/api-client-react";
import { useToast } from "@/hooks/use-toast";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow 
} from "@/components/ui/table";

type ParsedRecord = {
  name: string;
  certificateNumber: string;
  courseName: string;
  completionDate: string;
  grade: string;
  email?: string;
  phone?: string;
};

export default function BulkImportPage() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<ParsedRecord[]>([]);
  const [isParsing, setIsParsing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const bulkImport = useBulkImportStudents();
  const { toast } = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      if (selectedFile.name.endsWith('.csv')) {
        setFile(selectedFile);
        parseCSV(selectedFile);
      } else {
        toast({ title: "Invalid file type", description: "Please select a .csv file", variant: "destructive" });
        setFile(null);
        setPreview([]);
      }
    }
  };

  const parseCSV = (file: File) => {
    setIsParsing(true);
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const text = event.target?.result as string;
        const lines = text.split('\n');
        
        // Basic parsing - assuming header row exists
        // name,certificateNumber,courseName,completionDate,grade,email,phone
        const records: ParsedRecord[] = [];
        
        // Skip header
        for (let i = 1; i < lines.length; i++) {
          const line = lines[i].trim();
          if (!line) continue;
          
          // Simple split - won't handle commas inside quotes well, but sufficient for basic CSV
          const parts = line.split(',');
          if (parts.length >= 5) {
            records.push({
              name: parts[0]?.trim() || '',
              certificateNumber: parts[1]?.trim() || '',
              courseName: parts[2]?.trim() || '',
              completionDate: parts[3]?.trim() || new Date().toISOString(),
              grade: parts[4]?.trim() || 'Pass',
              email: parts[5]?.trim(),
              phone: parts[6]?.trim(),
            });
          }
        }
        
        setPreview(records);
      } catch (err) {
        toast({ title: "Parse Error", description: "Failed to parse CSV file", variant: "destructive" });
      } finally {
        setIsParsing(false);
      }
    };
    reader.onerror = () => {
      toast({ title: "File Error", description: "Could not read file", variant: "destructive" });
      setIsParsing(false);
    };
    reader.readAsText(file);
  };

  const handleImport = async () => {
    if (!preview.length) return;
    
    try {
      const result = await bulkImport.mutateAsync({
        data: {
          records: preview.map(r => ({
            ...r,
            status: "active"
          }))
        }
      });
      
      toast({ 
        title: "Import Complete", 
        description: `Successfully imported ${result.imported} records. Failed: ${result.failed}.` 
      });
      
      // Reset
      setFile(null);
      setPreview([]);
      if (fileInputRef.current) fileInputRef.current.value = "";
      
    } catch (e) {
      toast({ title: "Import Failed", description: "An error occurred during import.", variant: "destructive" });
    }
  };

  return (
    <AdminLayout>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-foreground mb-2">Bulk Import Students</h2>
        <p className="text-muted-foreground">Upload a CSV file to import multiple student records and certificates at once.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
            <div className="mb-4">
              <h3 className="font-semibold text-foreground mb-2">Upload CSV File</h3>
              <p className="text-sm text-muted-foreground mb-4">
                The file must contain the following columns: name, certificateNumber, courseName, completionDate, grade.
              </p>
            </div>
            
            <div className="border-2 border-dashed border-border rounded-lg p-8 text-center bg-muted/30">
              <FileSpreadsheet className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
              <p className="text-sm font-medium mb-3">{file ? file.name : "Select a CSV file to upload"}</p>
              
              <input 
                type="file" 
                accept=".csv" 
                className="hidden" 
                ref={fileInputRef}
                onChange={handleFileChange}
              />
              <Button 
                variant="outline" 
                onClick={() => fileInputRef.current?.click()}
                disabled={isParsing || bulkImport.isPending}
              >
                Choose File
              </Button>
            </div>

            {preview.length > 0 && (
              <div className="mt-6 pt-6 border-t border-border">
                <div className="flex items-center gap-2 mb-4 text-sm font-medium text-foreground">
                  <CheckCircle2 className="w-4 h-4 text-green-500" />
                  Found {preview.length} valid records
                </div>
                <Button 
                  className="w-full bg-primary text-primary-foreground"
                  onClick={handleImport}
                  disabled={bulkImport.isPending}
                >
                  <Upload className="w-4 h-4 mr-2" />
                  {bulkImport.isPending ? "Importing..." : "Start Import"}
                </Button>
              </div>
            )}
          </div>
        </div>

        <div className="lg:col-span-2">
          <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden h-full flex flex-col">
            <div className="px-6 py-4 border-b border-border flex justify-between items-center bg-muted/20">
              <h3 className="font-semibold text-foreground">Data Preview</h3>
              {isParsing && <span className="text-sm text-muted-foreground">Parsing...</span>}
            </div>
            
            <div className="flex-1 overflow-auto max-h-[500px]">
              {preview.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-muted-foreground py-20 px-6 text-center">
                  <AlertCircle className="w-12 h-12 mb-4 opacity-20" />
                  <p>Upload a file to see a preview of the data to be imported.</p>
                </div>
              ) : (
                <Table>
                  <TableHeader className="sticky top-0 bg-card z-10">
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Certificate #</TableHead>
                      <TableHead>Course</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Grade</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {preview.slice(0, 100).map((record, i) => (
                      <TableRow key={i}>
                        <TableCell className="font-medium text-sm">{record.name}</TableCell>
                        <TableCell className="font-mono text-xs">{record.certificateNumber}</TableCell>
                        <TableCell className="text-sm max-w-[150px] truncate" title={record.courseName}>{record.courseName}</TableCell>
                        <TableCell className="text-sm">{record.completionDate.split('T')[0]}</TableCell>
                        <TableCell className="text-sm">{record.grade}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
              {preview.length > 100 && (
                <div className="p-4 text-center text-sm text-muted-foreground bg-muted/10 border-t border-border">
                  Showing first 100 records of {preview.length} total
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
