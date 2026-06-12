import { Award, Shield, BookOpen, GraduationCap, CheckCircle2 } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import directorPhoto from "@assets/file_00000000524071fa90c56b6272ed2ee2_1781297670516.png";

export default function DirectorPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      <main className="flex-1 pt-24 pb-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col lg:flex-row gap-16 items-start">
            
            {/* Left Column - Photo & Quick Stats */}
            <div className="w-full lg:w-1/3">
              <div className="sticky top-28">
                <div className="relative mb-8">
                  <div className="absolute inset-0 bg-primary translate-x-3 translate-y-3 rounded-xl z-0"></div>
                  <img 
                    src={directorPhoto} 
                    alt="Director Profile" 
                    className="relative z-10 w-full rounded-xl shadow-xl object-cover aspect-[3/4]"
                  />
                </div>
                
                <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
                  <h3 className="font-serif font-bold text-lg mb-4 border-b border-border pb-2">Credentials Highlight</h3>
                  <ul className="space-y-3 text-sm text-muted-foreground">
                    <li className="flex items-center gap-3">
                      <GraduationCap className="w-4 h-4 text-primary" />
                      <span>MSc in Occupational Health & Safety</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <Award className="w-4 h-4 text-primary" />
                      <span>Certified NEBOSH IGC Specialist</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <Shield className="w-4 h-4 text-primary" />
                      <span>IOSH Graduate Member</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <BookOpen className="w-4 h-4 text-primary" />
                      <span>20+ Years Industry Experience</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Right Column - Content */}
            <div className="w-full lg:w-2/3">
              <div className="mb-10">
                <div className="flex items-center gap-4 mb-4">
                  <div className="h-px w-12 bg-primary"></div>
                  <span className="text-primary font-bold tracking-widest uppercase text-sm">Director Profile</span>
                </div>
                <h1 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-2">John Doe</h1>
                <p className="text-xl text-muted-foreground font-medium mb-8">Managing Director & Chief Safety Consultant</p>
                
                <blockquote className="text-2xl font-serif italic text-sidebar border-l-4 border-primary pl-6 py-2 mb-10 leading-relaxed bg-muted/30 p-6 rounded-r-lg">
                  "Safety is not a checkbox; it is a culture. Our goal is to forge leaders who instinctively prioritize human life and operational integrity in every decision."
                </blockquote>
              </div>

              <div className="space-y-10 text-muted-foreground leading-relaxed">
                <section>
                  <h2 className="text-2xl font-serif font-bold text-foreground mb-4">Professional Biography</h2>
                  <p className="mb-4">
                    With over two decades of dedicated service in the health, safety, and environmental (HSE) sector, John Doe has established himself as a leading authority in workplace safety and compliance. His journey began in the challenging environments of offshore oil rigs, where he developed a profound understanding of risk management in high-stakes scenarios.
                  </p>
                  <p>
                    Recognizing the critical need for standardized, high-quality safety education, he founded THE GUIDE International Academy. Under his leadership, the academy has grown into a premier institution, partnering with global bodies like NEBOSH, IOSH, and OSHA to deliver world-class training.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-serif font-bold text-foreground mb-4">Vision for THE GUIDE Academy</h2>
                  <p className="mb-4">
                    The vision has always been clear: to bridge the gap between theoretical knowledge and practical application. By insisting on experienced instructors and comprehensive curriculums, the academy ensures that every graduate is not just certified, but truly competent.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-serif font-bold text-foreground mb-4">Key Achievements</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                    <div className="bg-muted/30 p-4 rounded-lg border border-border flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                      <span>Successfully trained over 5,000 professionals across the globe.</span>
                    </div>
                    <div className="bg-muted/30 p-4 rounded-lg border border-border flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                      <span>Spearheaded safety audits for Fortune 500 manufacturing firms.</span>
                    </div>
                    <div className="bg-muted/30 p-4 rounded-lg border border-border flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                      <span>Author of numerous publications on modern industrial safety.</span>
                    </div>
                    <div className="bg-muted/30 p-4 rounded-lg border border-border flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                      <span>Recipient of the 'Excellence in HSE Education' regional award.</span>
                    </div>
                  </div>
                </section>
              </div>

            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
