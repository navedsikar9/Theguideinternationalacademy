import { Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowRight, Award, Users, BookOpen, Clock, ShieldCheck, GraduationCap, MessageCircle, CheckCircle2, Star, Instagram } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import directorPhoto from "@assets/file_000000003e9871fa93f3f1a7f5d270d2_1781391032795.png";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      <main className="flex-1">
        {/* ── Hero Section ── */}
        <section className="relative min-h-screen flex items-center pt-20 pb-32 overflow-hidden bg-sidebar">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/20 via-sidebar to-sidebar z-0" />
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1541888062831-294025114751?q=80&w=2940')] bg-cover bg-center opacity-10 mix-blend-overlay z-0" />

          <div className="container mx-auto px-4 md:px-6 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

              {/* Left — Text */}
              <div>
                {/* Trust badges */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="flex flex-wrap gap-2 mb-5"
                >
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/20 border border-primary/30 text-primary text-xs font-bold">
                    <CheckCircle2 className="w-3 h-3" /> ISO 9001:2015 Certified
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-white/80 text-xs font-bold">
                    <ShieldCheck className="w-3 h-3" /> Government Registered Institute
                  </span>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7 }}
                  className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/15 backdrop-blur-md mb-6"
                >
                  <Award className="w-4 h-4 text-primary" />
                  <span className="text-white/80 text-sm font-medium tracking-wide">Internationally Recognized Safety Training</span>
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.15 }}
                  className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-white leading-[1.05] mb-4"
                >
                  THE GUIDE
                  <span className="block text-3xl md:text-4xl lg:text-5xl text-white/85 mt-2 font-serif italic font-normal">
                    International Academy
                  </span>
                </motion.h1>

                <motion.div
                  initial={{ opacity: 0, scaleX: 0 }}
                  animate={{ opacity: 1, scaleX: 1 }}
                  transition={{ duration: 0.8, delay: 0.35 }}
                  className="h-1 w-20 bg-primary origin-left mb-7"
                />

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.45 }}
                  className="text-lg md:text-xl text-white/75 font-light mb-9 max-w-xl leading-relaxed"
                >
                  We Guide the Future Leaders. Elevate your career with world-class safety certifications and professional diplomas recognized globally. Based in Sikar, Rajasthan.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.55 }}
                  className="flex flex-wrap gap-4"
                >
                  <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-base px-7 py-5 rounded-md" asChild>
                    <Link href="/courses">Explore Courses <ArrowRight className="ml-2 w-5 h-5" /></Link>
                  </Button>
                  <Button size="lg" variant="outline" className="bg-transparent border-white/25 text-white hover:bg-white/10 hover:text-white font-semibold text-base px-7 py-5 rounded-md" asChild>
                    <Link href="/verify-certificate">Verify Certificate</Link>
                  </Button>
                  <Button size="lg" variant="ghost" className="text-white hover:bg-transparent hover:text-primary font-semibold text-base px-4 py-5" asChild>
                    <a href="https://wa.me/919509174366" target="_blank" rel="noreferrer">
                      <MessageCircle className="mr-2 w-5 h-5" /> WhatsApp Us
                    </a>
                  </Button>
                </motion.div>

                {/* Accreditations inline */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1, delay: 0.9 }}
                  className="mt-12 flex flex-wrap gap-6 items-center"
                >
                  <span className="text-white/40 text-xs uppercase tracking-widest font-semibold">Authorized by</span>
                  {["NEBOSH", "IOSH", "OSHA", "OTHM", "NVQ"].map((name) => (
                    <span key={name} className="text-white/60 font-serif text-lg tracking-wider border-b border-primary/60 pb-0.5 hover:text-white transition-colors">
                      {name}
                    </span>
                  ))}
                </motion.div>
              </div>

              {/* Right — Director photo */}
              <motion.div
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="hidden lg:flex justify-center"
              >
                <div className="relative w-[380px]">
                  {/* Glassmorphism glow */}
                  <div className="absolute -inset-4 bg-primary/20 rounded-3xl blur-2xl z-0" />
                  <div className="absolute inset-0 bg-[hsl(43,95%,52%)] translate-x-4 translate-y-4 rounded-2xl z-0 opacity-60" />
                  <img
                    src={directorPhoto}
                    alt="Abdul Rashid Khokhar — Founder, THE GUIDE International Academy"
                    className="relative z-10 w-full rounded-2xl shadow-2xl object-cover object-top aspect-[3/4]"
                  />
                  {/* Name card overlay */}
                  <div className="absolute bottom-4 left-4 right-4 z-20 bg-sidebar/90 backdrop-blur-sm rounded-xl p-4 border border-white/10">
                    <div className="text-white font-serif font-bold text-lg leading-tight">Abdul Rashid Khokhar</div>
                    <div className="text-white/60 text-xs mt-0.5">Founder & Director</div>
                    <div className="flex items-center gap-1.5 mt-2">
                      <div className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center">
                        <GraduationCap className="w-3 h-3 text-primary" />
                      </div>
                      <span className="text-white/50 text-xs">17+ Years Industry Experience</span>
                    </div>
                  </div>
                </div>
              </motion.div>

            </div>
          </div>
        </section>

        {/* ── Trust Badges Section ── */}
        <section className="py-10 bg-white border-b border-border">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-wrap justify-center items-center gap-8">
              {[
                { icon: <CheckCircle2 className="w-5 h-5 text-primary" />, label: "ISO 9001:2015 Certified", sub: "Quality Management" },
                { icon: <ShieldCheck className="w-5 h-5 text-primary" />, label: "Government Registered", sub: "Govt. of Rajasthan" },
                { icon: <Award className="w-5 h-5 text-primary" />, label: "NEBOSH Authorized", sub: "UK Certification" },
                { icon: <Star className="w-5 h-5 text-primary" />, label: "5,000+ Alumni", sub: "Across Industries" },
                { icon: <GraduationCap className="w-5 h-5 text-primary" />, label: "17+ Years Experience", sub: "Since 2007" },
              ].map((badge, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="flex items-center gap-3 px-5 py-3 rounded-xl bg-muted/50 border border-border"
                >
                  <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    {badge.icon}
                  </div>
                  <div>
                    <div className="font-semibold text-foreground text-sm">{badge.label}</div>
                    <div className="text-xs text-muted-foreground">{badge.sub}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Stats Section ── */}
        <section className="py-20 bg-white border-b border-border">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
              {[
                { icon: <Users className="w-8 h-8 text-primary" />, stat: "5,000+", label: "Students Trained" },
                { icon: <ShieldCheck className="w-8 h-8 text-primary" />, stat: "10,000+", label: "Certificates Issued" },
                { icon: <Clock className="w-8 h-8 text-primary" />, stat: "17+", label: "Years Experience" },
                { icon: <BookOpen className="w-8 h-8 text-primary" />, stat: "18+", label: "Professional Courses" },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  className="text-center"
                >
                  <div className="flex justify-center mb-4">
                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                      {item.icon}
                    </div>
                  </div>
                  <h3 className="text-4xl font-serif font-bold text-foreground mb-2">{item.stat}</h3>
                  <p className="text-muted-foreground font-medium uppercase tracking-wider text-sm">{item.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Director Message Section ── */}
        <section className="py-24 bg-muted/30">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">

              {/* Photo */}
              <motion.div
                className="w-full lg:w-2/5"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className="relative max-w-sm mx-auto">
                  <div className="absolute -inset-4 bg-primary/10 rounded-3xl blur-xl z-0" />
                  <div className="absolute inset-0 bg-[hsl(43,95%,52%)] translate-x-4 translate-y-4 rounded-2xl z-0 opacity-60" />
                  <img
                    src={directorPhoto}
                    alt="Abdul Rashid Khokhar — Founder & Director"
                    className="relative z-10 w-full rounded-2xl shadow-xl object-cover object-top aspect-[3/4]"
                  />
                </div>
              </motion.div>

              {/* Content */}
              <motion.div
                className="w-full lg:w-3/5"
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <div className="flex items-center gap-4 mb-5">
                  <div className="h-px w-12 bg-primary" />
                  <span className="text-primary font-bold tracking-widest uppercase text-sm">Message from the Director</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-6 leading-tight">
                  Guiding Future Leaders<br />to Excellence
                </h2>
                <blockquote className="text-lg md:text-xl font-serif italic text-muted-foreground border-l-4 border-primary pl-6 py-2 mb-6 leading-relaxed bg-white rounded-r-xl p-5">
                  "Our mission is not just to provide certification, but to instill a culture of safety and professional excellence that transforms workplaces globally."
                </blockquote>
                <p className="text-muted-foreground mb-3 leading-relaxed">
                  — <strong className="text-foreground">Abdul Rashid Khokhar</strong>, Founder & Director
                </p>
                <p className="text-muted-foreground mb-8 leading-relaxed">
                  With over 17 years of industry experience in oil & gas and industrial safety, he built THE GUIDE Academy to bridge the gap between certification and real-world competence. Our graduates are trusted by top employers worldwide.
                </p>
                <Button variant="outline" className="border-sidebar text-sidebar hover:bg-sidebar hover:text-white" asChild>
                  <Link href="/director">Read Full Profile <ArrowRight className="ml-2 w-4 h-4" /></Link>
                </Button>
              </motion.div>

            </div>
          </div>
        </section>

        {/* ── Courses Preview ── */}
        <section className="py-20 bg-white border-t border-border">
          <div className="container mx-auto px-4 md:px-6 text-center">
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="h-px w-12 bg-primary" />
              <span className="text-primary font-bold tracking-widest uppercase text-sm">Our Programs</span>
              <div className="h-px w-12 bg-primary" />
            </div>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4">
              Internationally Recognized Certifications
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-12 text-lg">
              From NEBOSH & IOSH to national safety diplomas — we have a course that fits your career goal.
            </p>

            {/* International */}
            <div className="mb-8">
              <div className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest mb-5">International Courses</div>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 max-w-4xl mx-auto">
                {[
                  { title: "NEBOSH (UK)", tag: "International" },
                  { title: "IOSH (UK)", tag: "International" },
                  { title: "OSHA (USA)", tag: "International" },
                  { title: "OTHM (UK)", tag: "International" },
                  { title: "NVQ (UK)", tag: "International" },
                ].map((course, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08, duration: 0.4 }}
                    className="bg-muted/30 border border-border rounded-xl p-5 text-center hover:border-primary/40 hover:shadow-sm transition-all group"
                  >
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-primary/20 transition-colors">
                      <ShieldCheck className="w-5 h-5 text-primary" />
                    </div>
                    <div className="font-semibold text-foreground text-sm mb-1">{course.title}</div>
                    <div className="text-xs text-muted-foreground">{course.tag}</div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* National */}
            <div className="mb-10">
              <div className="inline-block px-4 py-1 rounded-full bg-sidebar/10 text-sidebar text-xs font-bold uppercase tracking-widest mb-5">National Diplomas</div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
                {[
                  "Oil & Gas Safety", "Fire Fighting", "Construction Safety", "Industrial Safety",
                  "Fire & Safety", "First Aid & CPR", "HSE", "Scaffolding Inspector"
                ].map((name, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                    className="bg-sidebar/5 border border-sidebar/15 rounded-lg p-3 text-center hover:border-sidebar/30 transition-all"
                  >
                    <div className="font-medium text-sidebar text-sm">{name}</div>
                  </motion.div>
                ))}
              </div>
            </div>

            <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8" asChild>
              <Link href="/courses">View All Courses <ArrowRight className="ml-2 w-4 h-4" /></Link>
            </Button>
          </div>
        </section>

        {/* ── Instagram CTA ── */}
        <section className="py-16 bg-gradient-to-r from-purple-900 via-pink-900 to-purple-900 relative overflow-hidden">
          <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(255,255,255,0.1) 0%, transparent 50%), radial-gradient(circle at 80% 50%, rgba(255,255,255,0.1) 0%, transparent 50%)' }} />
          <div className="container mx-auto px-4 md:px-6 relative z-10">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20">
                  <Instagram className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-serif font-bold text-white">Follow Our Journey</h3>
                  <p className="text-white/70">@the_guide_fire_safety_academy — Latest updates, events & success stories</p>
                </div>
              </div>
              <a
                href="https://www.instagram.com/the_guide_fire_safety_academy"
                target="_blank"
                rel="noreferrer"
                className="px-8 py-3 rounded-full bg-white text-purple-900 font-bold text-base hover:scale-105 transition-transform shadow-xl"
              >
                Follow on Instagram
              </a>
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="py-24 bg-sidebar relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1503945438517-f65904a52ce6?q=80&w=2940')] bg-cover bg-center opacity-10 z-0" />
          <div className="container mx-auto px-4 md:px-6 relative z-10 text-center">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-5">Ready to Advance Your Career?</h2>
            <p className="text-xl text-white/75 max-w-2xl mx-auto mb-10">
              Join thousands of successful professionals who have transformed their careers with our internationally recognized certifications.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-lg px-10 py-6 rounded-md" asChild>
                <Link href="/contact">Enroll Now <ArrowRight className="ml-2 w-5 h-5" /></Link>
              </Button>
              <Button size="lg" variant="outline" className="bg-transparent border-white/30 text-white hover:bg-white/10 font-semibold text-lg px-10 py-6 rounded-md" asChild>
                <a href="tel:+919509174366">Call: +91 9509174366</a>
              </Button>
            </div>
          </div>
        </section>

      </main>

      <Footer />

      {/* Floating WhatsApp */}
      <a
        href="https://wa.me/919509174366"
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-6 right-6 w-14 h-14 bg-green-500 rounded-full flex items-center justify-center text-white shadow-lg hover:scale-110 transition-transform z-50"
        aria-label="Chat on WhatsApp"
      >
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
          <path d="M12 0C5.373 0 0 5.373 0 12c0 2.089.534 4.05 1.47 5.765L0 24l6.42-1.442A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.89 0-3.65-.491-5.18-1.352l-.37-.22-3.81.856.872-3.702-.242-.382A10 10 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
        </svg>
      </a>
    </div>
  );
}
