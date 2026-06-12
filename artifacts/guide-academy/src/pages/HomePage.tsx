import { Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Award, Users, BookOpen, Clock, ShieldCheck, GraduationCap, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import directorPhoto from "@assets/file_00000000524071fa90c56b6272ed2ee2_1781297670516.png";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative h-screen min-h-[600px] flex items-center pt-20 overflow-hidden bg-sidebar">
          {/* Abstract background gradient */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/20 via-sidebar to-sidebar z-0"></div>
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1541888062831-294025114751?q=80&w=2940')] bg-cover bg-center opacity-10 mix-blend-overlay z-0"></div>

          <div className="container mx-auto px-4 md:px-6 relative z-10">
            <div className="max-w-4xl">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-6"
              >
                <Award className="w-4 h-4 text-primary" />
                <span className="text-white/80 text-sm font-medium tracking-wide">Internationally Recognized Safety Training</span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold text-white leading-tight mb-4"
              >
                THE GUIDE
                <span className="block text-3xl md:text-5xl lg:text-6xl text-white/90 mt-2 font-serif italic font-normal">International Academy</span>
              </motion.h1>

              <motion.div
                initial={{ opacity: 0, scaleX: 0 }}
                animate={{ opacity: 1, scaleX: 1 }}
                transition={{ duration: 1, delay: 0.4 }}
                className="h-1 w-24 bg-primary origin-left mb-8"
              ></motion.div>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="text-xl md:text-2xl text-white/80 font-light mb-10 max-w-2xl"
              >
                We Guide the Future Leaders. Elevate your career with world-class safety certifications and professional diplomas.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="flex flex-wrap gap-4"
              >
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-lg px-8 py-6 rounded-md" asChild>
                  <Link href="/courses">Explore Courses <ArrowRight className="ml-2 w-5 h-5" /></Link>
                </Button>
                <Button size="lg" variant="outline" className="bg-transparent border-white/20 text-white hover:bg-white/10 hover:text-white font-semibold text-lg px-8 py-6 rounded-md" asChild>
                  <Link href="/verify-certificate">Verify Certificate</Link>
                </Button>
                <Button size="lg" variant="outline" className="bg-transparent border-transparent text-white hover:bg-transparent hover:text-primary font-semibold text-lg px-4 py-6 rounded-md" asChild>
                  <Link href="/contact">Contact Us</Link>
                </Button>
              </motion.div>
            </div>
          </div>

          {/* Floating Accreditations */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, delay: 1 }}
            className="absolute bottom-10 left-0 w-full overflow-hidden flex justify-center z-10 px-4"
          >
            <div className="flex flex-wrap justify-center gap-6 md:gap-12 items-center opacity-60">
              <span className="text-white font-serif text-xl md:text-2xl tracking-wider border-b border-primary pb-1">NEBOSH</span>
              <span className="text-white font-serif text-xl md:text-2xl tracking-wider border-b border-primary pb-1">IOSH</span>
              <span className="text-white font-serif text-xl md:text-2xl tracking-wider border-b border-primary pb-1">OSHA</span>
              <span className="text-white font-serif text-xl md:text-2xl tracking-wider border-b border-primary pb-1">OTHM</span>
              <span className="text-white font-serif text-xl md:text-2xl tracking-wider border-b border-primary pb-1">NVQ</span>
            </div>
          </motion.div>
        </section>

        {/* Stats Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
              <div className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                    <Users className="w-8 h-8 text-primary" />
                  </div>
                </div>
                <h3 className="text-4xl font-serif font-bold text-foreground mb-2">5,000+</h3>
                <p className="text-muted-foreground font-medium uppercase tracking-wider text-sm">Students Trained</p>
              </div>
              <div className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                    <ShieldCheck className="w-8 h-8 text-primary" />
                  </div>
                </div>
                <h3 className="text-4xl font-serif font-bold text-foreground mb-2">10,000+</h3>
                <p className="text-muted-foreground font-medium uppercase tracking-wider text-sm">Certificates Issued</p>
              </div>
              <div className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                    <Clock className="w-8 h-8 text-primary" />
                  </div>
                </div>
                <h3 className="text-4xl font-serif font-bold text-foreground mb-2">15+</h3>
                <p className="text-muted-foreground font-medium uppercase tracking-wider text-sm">Years Experience</p>
              </div>
              <div className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                    <BookOpen className="w-8 h-8 text-primary" />
                  </div>
                </div>
                <h3 className="text-4xl font-serif font-bold text-foreground mb-2">25+</h3>
                <p className="text-muted-foreground font-medium uppercase tracking-wider text-sm">Professional Courses</p>
              </div>
            </div>
          </div>
        </section>

        {/* Director Message */}
        <section className="py-24 bg-muted/30">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
              <div className="w-full lg:w-1/2">
                <div className="relative">
                  <div className="absolute inset-0 bg-primary translate-x-4 translate-y-4 rounded-lg z-0"></div>
                  <img src={directorPhoto} alt="Director" className="relative z-10 w-full rounded-lg shadow-xl object-cover aspect-[3/4]" />
                </div>
              </div>
              <div className="w-full lg:w-1/2">
                <div className="flex items-center gap-4 mb-6">
                  <div className="h-px w-12 bg-primary"></div>
                  <span className="text-primary font-bold tracking-widest uppercase text-sm">Message from the Director</span>
                </div>
                <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-8 leading-tight">
                  Guiding Future Leaders to Excellence
                </h2>
                <blockquote className="text-xl md:text-2xl font-serif italic text-muted-foreground border-l-4 border-primary pl-6 py-2 mb-8 leading-relaxed">
                  "Our mission is not just to provide certification, but to instill a culture of safety and professional excellence that transforms workplaces globally."
                </blockquote>
                <p className="text-muted-foreground mb-8 leading-relaxed">
                  At THE GUIDE International Academy, we pride ourselves on delivering world-class education that meets the highest international standards. Our comprehensive training programs are designed to equip professionals with the knowledge and practical skills necessary to excel in their respective fields.
                </p>
                <Button variant="outline" className="border-sidebar text-sidebar hover:bg-sidebar hover:text-white" asChild>
                  <Link href="/director">Read Full Profile</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 bg-sidebar relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1503945438517-f65904a52ce6?q=80&w=2940')] bg-cover bg-center opacity-10 z-0"></div>
          <div className="container mx-auto px-4 md:px-6 relative z-10 text-center">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-6">Ready to Advance Your Career?</h2>
            <p className="text-xl text-white/80 max-w-2xl mx-auto mb-10">
              Join thousands of successful professionals who have transformed their careers with our internationally recognized certifications.
            </p>
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-lg px-10 py-6 rounded-md shadow-[0_0_20px_rgba(var(--primary),0.4)]" asChild>
              <Link href="/contact">Enroll Now</Link>
            </Button>
          </div>
        </section>

      </main>

      <Footer />

      {/* Floating WhatsApp Button */}
      <a
        href="https://wa.me/12345678900"
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-6 right-6 w-14 h-14 bg-green-500 rounded-full flex items-center justify-center text-white shadow-lg hover:scale-110 transition-transform z-50"
        aria-label="Chat on WhatsApp"
        data-testid="btn-whatsapp-floating"
      >
        <MessageCircle size={28} />
      </a>
    </div>
  );
}
