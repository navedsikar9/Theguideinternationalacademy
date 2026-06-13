import { Star, Quote } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useListTestimonials } from "@workspace/api-client-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const FALLBACK_TESTIMONIALS = [
  { id: 1, studentName: "Michael Chang", courseName: "NEBOSH IGC", rating: 5, review: "The training standard here is exceptional. The instructors have real industry experience which makes the theoretical concepts much easier to grasp. Passed my NEBOSH with distinction.", designation: "HSE Manager, Qatar" },
  { id: 2, studentName: "Sarah Al-Fayed", courseName: "IOSH Managing Safely", rating: 5, review: "Highly recommend THE GUIDE. The facilities are top-notch and the administrative staff is incredibly supportive. The course content was delivered perfectly.", designation: "Operations Lead" },
  { id: 3, studentName: "David O'Connor", courseName: "OSHA 30-Hour", rating: 4, review: "A very professional environment. The practical sessions were rigorous and exactly what I needed to upgrade my safety oversight skills on construction sites.", designation: "Site Supervisor" },
  { id: 4, studentName: "Priya Sharma", courseName: "Fire Fighting & First Aid", rating: 5, review: "The practical drills were life-changing. I now feel completely confident in handling emergency situations. Thank you to the wonderful instructors.", designation: "Safety Coordinator" },
  { id: 5, studentName: "James Wilson", courseName: "NVQ Level 6", rating: 5, review: "Completing my NVQ here was the best career decision. The mentorship provided by the director himself was invaluable for my professional growth.", designation: "Safety Director" },
  { id: 6, studentName: "Ahmed Hassan", courseName: "Oil & Gas Safety", rating: 5, review: "Very specialized and detailed curriculum. It covers all the latest international standards required to work in the modern petroleum industry.", designation: "Rig Safety Officer" },
];

export default function TestimonialsPage() {
  const { data: dbTestimonials, isLoading } = useListTestimonials({ approved: true });

  const testimonials = (dbTestimonials && dbTestimonials.length > 0) ? dbTestimonials : FALLBACK_TESTIMONIALS;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      <main className="flex-1 pt-32 pb-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mb-16 text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-4">Student Success Stories</h1>
            <p className="text-muted-foreground text-lg">
              Don't just take our word for it. Read what our alumni have to say about their experience at THE GUIDE International Academy.
            </p>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map(i => (
                <Skeleton key={i} className="h-64 w-full rounded-xl" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {testimonials.map((testimonial) => (
                <div key={testimonial.id} className="bg-card border border-border rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow relative">
                  <Quote className="absolute top-6 right-6 w-10 h-10 text-primary/10" />
                  
                  <div className="flex items-center gap-1 mb-6">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`w-5 h-5 ${i < testimonial.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} 
                      />
                    ))}
                  </div>
                  
                  <p className="text-muted-foreground leading-relaxed mb-8 italic">
                    "{testimonial.review}"
                  </p>
                  
                  <div className="flex items-center gap-4 mt-auto">
                    <Avatar className="w-12 h-12 border-2 border-primary/20">
                      <AvatarImage src={(testimonial as any).photoUrl || ""} alt={testimonial.studentName} />
                      <AvatarFallback className="bg-sidebar text-white font-bold">
                        {testimonial.studentName.split(' ').map(n => n[0]).join('').substring(0, 2)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="font-bold text-foreground font-serif">{testimonial.studentName}</h4>
                      <p className="text-xs text-muted-foreground">{testimonial.designation || "Alumni"}</p>
                      <span className="inline-block mt-1 text-[10px] font-semibold uppercase tracking-wider text-primary bg-primary/10 px-2 py-0.5 rounded">
                        {testimonial.courseName}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
