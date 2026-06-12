import { useParams } from "wouter";
import { Link } from "wouter";
import { CheckCircle2, Clock, Award, FileText, Briefcase, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useListCourses, useCreateInquiry } from "@workspace/api-client-react";
import { Skeleton } from "@/components/ui/skeleton";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

const FALLBACK_COURSES = [
  { id: 1, title: "NEBOSH (UK)", slug: "nebosh", category: "International", duration: "10 Days", description: "Globally recognized health and safety qualification.", syllabus: "Unit 1: Management of Health and Safety\nUnit 2: Controlling Workplace Hazards\nUnit 3: Health and Safety Practical Application", careerOpportunities: "Safety Officer, HSE Manager, Risk Assessor", certificationDetails: "Awarded by NEBOSH UK. Valid globally.", eligibility: "Any degree or diploma. Basic understanding of English.", featured: true },
];

const inquirySchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Valid phone number required"),
  subject: z.string().min(2, "Subject is required"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export default function CourseDetailPage() {
  const params = useParams();
  const slug = params.slug;
  const { toast } = useToast();
  
  const { data: courses, isLoading } = useListCourses({});
  const createInquiry = useCreateInquiry();

  const form = useForm<z.infer<typeof inquirySchema>>({
    resolver: zodResolver(inquirySchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      subject: `Inquiry regarding course: ${slug}`,
      message: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof inquirySchema>) => {
    try {
      await createInquiry.mutateAsync({
        data: {
          ...data,
          courseInterest: course?.title || slug,
        }
      });
      toast({
        title: "Inquiry Sent",
        description: "We will get back to you shortly.",
      });
      form.reset();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send inquiry. Please try again.",
        variant: "destructive",
      });
    }
  };

  const courseList = courses && courses.length > 0 ? courses : FALLBACK_COURSES;
  const course = courseList.find((c) => c.slug === slug);

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Navbar />
        <main className="flex-1 pt-24 pb-20 container mx-auto px-4">
          <Skeleton className="h-64 w-full mb-8" />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <Skeleton className="h-32 w-full" />
              <Skeleton className="h-64 w-full" />
            </div>
            <Skeleton className="h-96 w-full" />
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Navbar />
        <main className="flex-1 pt-32 pb-20 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-serif font-bold mb-4 text-foreground">Course Not Found</h1>
            <p className="text-muted-foreground mb-8">The course you are looking for does not exist or has been removed.</p>
            <Button asChild>
              <Link href="/courses">Browse All Courses</Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      <main className="flex-1">
        {/* Header */}
        <div className="bg-sidebar pt-32 pb-16 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/20 via-sidebar to-sidebar z-0"></div>
          <div className="container mx-auto px-4 md:px-6 relative z-10">
            <div className="max-w-4xl">
              <div className="flex items-center gap-3 mb-4">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary text-primary-foreground">
                  {course.category}
                </span>
                {course.duration && (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-white/10 text-white">
                    <Clock className="w-3 h-3 mr-1.5" />
                    {course.duration}
                  </span>
                )}
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white mb-6">
                {course.title}
              </h1>
              <p className="text-xl text-white/80 leading-relaxed max-w-3xl">
                {course.description}
              </p>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 md:px-6 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-12">
              <section>
                <div className="flex items-center gap-2 mb-6 border-b border-border pb-2">
                  <Info className="w-5 h-5 text-primary" />
                  <h2 className="text-2xl font-serif font-bold text-foreground">Course Overview</h2>
                </div>
                <div className="prose prose-slate max-w-none text-muted-foreground">
                  <p>{course.description}</p>
                  {course.eligibility && (
                    <div className="bg-muted/50 p-4 rounded-lg mt-6 border border-border">
                      <h4 className="font-semibold text-foreground mb-2">Eligibility Criteria:</h4>
                      <p className="m-0 text-sm">{course.eligibility}</p>
                    </div>
                  )}
                </div>
              </section>

              {course.syllabus && (
                <section>
                  <div className="flex items-center gap-2 mb-6 border-b border-border pb-2">
                    <FileText className="w-5 h-5 text-primary" />
                    <h2 className="text-2xl font-serif font-bold text-foreground">Syllabus Highlights</h2>
                  </div>
                  <ul className="space-y-3">
                    {course.syllabus.split('\n').map((item, idx) => item.trim() && (
                      <li key={idx} className="flex items-start gap-3 bg-card p-4 border border-border rounded-lg shadow-sm">
                        <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                        <span className="text-muted-foreground">{item.trim()}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              {course.careerOpportunities && (
                <section>
                  <div className="flex items-center gap-2 mb-6 border-b border-border pb-2">
                    <Briefcase className="w-5 h-5 text-primary" />
                    <h2 className="text-2xl font-serif font-bold text-foreground">Career Scope</h2>
                  </div>
                  <div className="bg-card border border-border rounded-lg p-6 shadow-sm">
                    <p className="text-muted-foreground leading-relaxed">{course.careerOpportunities}</p>
                  </div>
                </section>
              )}
              
              {course.certificationDetails && (
                <section>
                  <div className="flex items-center gap-2 mb-6 border-b border-border pb-2">
                    <Award className="w-5 h-5 text-primary" />
                    <h2 className="text-2xl font-serif font-bold text-foreground">Certification</h2>
                  </div>
                  <div className="bg-card border border-border rounded-lg p-6 shadow-sm flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center shrink-0">
                      <Award className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <p className="text-muted-foreground leading-relaxed">{course.certificationDetails}</p>
                    </div>
                  </div>
                </section>
              )}
            </div>

            {/* Sidebar / Inquiry Form */}
            <div className="lg:col-span-1">
              <div className="sticky top-28 bg-card border border-border rounded-xl shadow-lg p-6">
                <h3 className="text-xl font-serif font-bold text-foreground mb-2">Interested in this course?</h3>
                <p className="text-sm text-muted-foreground mb-6">Fill out the form below and our admission counselor will contact you.</p>

                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Name</FormLabel>
                          <FormControl>
                            <Input placeholder="John Doe" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email Address</FormLabel>
                          <FormControl>
                            <Input placeholder="john@example.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone Number</FormLabel>
                          <FormControl>
                            <Input placeholder="+1 234 567 8900" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Message (Optional)</FormLabel>
                          <FormControl>
                            <Textarea placeholder="Any specific questions?" className="resize-none" rows={3} {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <Button 
                      type="submit" 
                      className="w-full bg-primary text-primary-foreground font-semibold"
                      disabled={createInquiry.isPending}
                    >
                      {createInquiry.isPending ? "Submitting..." : "Submit Inquiry"}
                    </Button>
                  </form>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
