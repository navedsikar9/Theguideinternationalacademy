import { MapPin, Phone, Mail, MessageCircle } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useCreateInquiry } from "@workspace/api-client-react";
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const inquirySchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Valid phone number required"),
  subject: z.string().min(2, "Subject is required"),
  courseInterest: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export default function ContactPage() {
  const { toast } = useToast();
  const createInquiry = useCreateInquiry();

  const form = useForm<z.infer<typeof inquirySchema>>({
    resolver: zodResolver(inquirySchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      subject: "",
      courseInterest: "",
      message: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof inquirySchema>) => {
    try {
      await createInquiry.mutateAsync({ data });
      toast({
        title: "Message Sent Successfully",
        description: "We have received your inquiry and will contact you soon.",
      });
      form.reset();
    } catch (error) {
      toast({
        title: "Submission Failed",
        description: "There was an error sending your message. Please try again later.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      <main className="flex-1 pt-32 pb-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mb-12 text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-4">Contact Us</h1>
            <p className="text-muted-foreground text-lg">
              Have questions about our courses or need assistance? Reach out to us and our team will be happy to guide you.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            {/* Contact Form */}
            <div className="bg-card border border-border shadow-xl rounded-2xl p-8">
              <h2 className="text-2xl font-serif font-bold text-foreground mb-6">Send us a Message</h2>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                  </div>

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

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="subject"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Subject</FormLabel>
                          <FormControl>
                            <Input placeholder="General Inquiry" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="courseInterest"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Course of Interest</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select a course" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="nebosh">NEBOSH</SelectItem>
                              <SelectItem value="iosh">IOSH</SelectItem>
                              <SelectItem value="osha">OSHA</SelectItem>
                              <SelectItem value="othm">OTHM</SelectItem>
                              <SelectItem value="nvq">NVQ</SelectItem>
                              <SelectItem value="other">Other / Not Sure</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Message</FormLabel>
                        <FormControl>
                          <Textarea placeholder="How can we help you?" className="min-h-[120px] resize-none" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button 
                    type="submit" 
                    size="lg"
                    className="w-full bg-sidebar text-white hover:bg-sidebar/90 font-semibold"
                    disabled={createInquiry.isPending}
                  >
                    {createInquiry.isPending ? "Sending..." : "Send Message"}
                  </Button>
                </form>
              </Form>
            </div>

            {/* Contact Info */}
            <div className="space-y-10">
              <div>
                <h2 className="text-2xl font-serif font-bold text-foreground mb-6">Contact Information</h2>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center shrink-0">
                      <MapPin className="text-primary w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-1">Our Location</h4>
                      <p className="text-muted-foreground leading-relaxed">
                        123 Safety Avenue, Professional District,<br />
                        Global Business Park, City 10001
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center shrink-0">
                      <Phone className="text-primary w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-1">Phone Number</h4>
                      <p className="text-muted-foreground">
                        <a href="tel:+12345678900" className="hover:text-primary transition-colors">+1 234 567 8900</a><br/>
                        <a href="tel:+19876543210" className="hover:text-primary transition-colors">+1 987 654 3210</a>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center shrink-0">
                      <Mail className="text-primary w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-1">Email Address</h4>
                      <p className="text-muted-foreground">
                        <a href="mailto:info@theguideacademy.com" className="hover:text-primary transition-colors">info@theguideacademy.com</a><br/>
                        <a href="mailto:admissions@theguideacademy.com" className="hover:text-primary transition-colors">admissions@theguideacademy.com</a>
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center shrink-0">
                      <MessageCircle className="text-green-600 w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-1">WhatsApp Support</h4>
                      <p className="text-muted-foreground mb-2">Available Mon-Sat, 9am - 6pm</p>
                      <Button variant="outline" className="border-green-600 text-green-600 hover:bg-green-50" asChild>
                        <a href="https://wa.me/12345678900" target="_blank" rel="noreferrer">Chat on WhatsApp</a>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Map Placeholder */}
              <div className="bg-muted rounded-xl overflow-hidden border border-border h-[300px] relative">
                <div className="absolute inset-0 flex items-center justify-center bg-card">
                   <div className="text-center text-muted-foreground">
                      <MapPin className="w-8 h-8 mx-auto mb-2 opacity-50" />
                      <p>Google Maps Integration</p>
                   </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
