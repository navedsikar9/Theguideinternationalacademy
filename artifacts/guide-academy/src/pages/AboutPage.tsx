import { motion } from "framer-motion";
import { CheckCircle2, Award, Users, BookOpen, Globe, ShieldCheck, Target, Eye } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.12, duration: 0.5 } }),
};

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar solid />
      {/* Page Header */}
      <section className="bg-sidebar pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-primary/20 via-transparent to-transparent z-0" />
        <div className="container mx-auto px-4 md:px-6 relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="h-px w-12 bg-primary" />
              <span className="text-primary font-bold tracking-widest uppercase text-sm">About Us</span>
              <div className="h-px w-12 bg-primary" />
            </div>
            <h1 className="text-4xl md:text-6xl font-serif font-bold text-white mb-4">
              THE GUIDE International Academy
            </h1>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              A premier safety and health training institute dedicated to producing world-class HSE professionals.
            </p>
          </motion.div>
        </div>
      </section>
      <main className="flex-1">

        {/* Who We Are */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-4xl mx-auto">
              <motion.div custom={0} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                <div className="flex items-center gap-4 mb-4">
                  <div className="h-px w-12 bg-primary" />
                  <span className="text-primary font-bold tracking-widest uppercase text-sm">Who We Are</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-6">
                  Bridging the Gap Between Certification and Competence
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed text-lg">
                  <p>
                    <strong className="text-foreground">THE GUIDE International Academy</strong> is a leading safety, health, and environmental training institute established with a single clear mission — to produce industry-ready HSE professionals who are not just certified, but genuinely competent to protect lives and workplaces.
                  </p>
                  <p>
                    Founded by <strong className="text-foreground">Abdul Rashid Khokhar</strong>, with over 17 years of hands-on experience in the oil & gas and industrial safety sectors, the academy brings real-world expertise into every classroom. We are an authorized training partner for globally recognized bodies including <strong className="text-foreground">NEBOSH, IOSH, and OSHA</strong>, and we offer a range of national diplomas that meet the highest industry standards.
                  </p>
                  <p>
                    Our graduates work in top oil & gas companies, construction firms, manufacturing plants, and government organizations across the Middle East, South Asia, and beyond.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-16 bg-muted/30 border-y border-border">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { icon: <Users className="w-8 h-8" />, value: "5,000+", label: "Professionals Trained" },
                { icon: <Award className="w-8 h-8" />, value: "10,000+", label: "Certificates Issued" },
                { icon: <BookOpen className="w-8 h-8" />, value: "25+", label: "Professional Courses" },
                { icon: <Globe className="w-8 h-8" />, value: "17+", label: "Years Experience" },
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  custom={i}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="text-center"
                >
                  <div className="flex justify-center mb-3">
                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                      {stat.icon}
                    </div>
                  </div>
                  <div className="text-4xl font-serif font-bold text-foreground mb-1">{stat.value}</div>
                  <div className="text-sm text-muted-foreground font-medium uppercase tracking-wider">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              <motion.div
                custom={0}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="bg-sidebar rounded-2xl p-8 text-white"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center mb-6">
                  <Target className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-2xl font-serif font-bold mb-4">Our Mission</h3>
                <p className="text-white/80 leading-relaxed">
                  To deliver internationally recognized, practically focused safety and health training that transforms professionals into confident, competent leaders — capable of protecting lives, preventing accidents, and building safer workplaces worldwide.
                </p>
              </motion.div>

              <motion.div
                custom={1}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="bg-muted/30 border border-border rounded-2xl p-8"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
                  <Eye className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-2xl font-serif font-bold text-foreground mb-4">Our Vision</h3>
                <p className="text-muted-foreground leading-relaxed">
                  To be the most trusted safety training academy in the region — a centre of excellence that sets the benchmark for HSE education and produces graduates who are sought after by leading employers across all industries globally.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-14">
              <div className="flex items-center justify-center gap-4 mb-4">
                <div className="h-px w-12 bg-primary" />
                <span className="text-primary font-bold tracking-widest uppercase text-sm">Why Choose Us</span>
                <div className="h-px w-12 bg-primary" />
              </div>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground">
                What Sets THE GUIDE Academy Apart
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {[
                { icon: <ShieldCheck className="w-6 h-6" />, title: "Internationally Recognized", desc: "All programs are accredited by NEBOSH, IOSH, OSHA, OTHM, and other globally recognized bodies." },
                { icon: <Users className="w-6 h-6" />, title: "Expert Faculty", desc: "Our instructors are active industry professionals with 10–25 years of real-world HSE experience." },
                { icon: <Award className="w-6 h-6" />, title: "Proven Track Record", desc: "Over 5,000 graduates placed in top companies across the oil & gas, construction, and industrial sectors." },
                { icon: <BookOpen className="w-6 h-6" />, title: "Comprehensive Curriculum", desc: "Courses cover theory, practical application, case studies, and real-world scenario training." },
                { icon: <Globe className="w-6 h-6" />, title: "Global Opportunities", desc: "Our certifications are recognized by employers in the Middle East, UK, USA, and beyond." },
                { icon: <Target className="w-6 h-6" />, title: "Placement Support", desc: "We actively support our students with career guidance, CV preparation, and employer connections." },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  custom={i}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="bg-card border border-border rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-4">
                    {item.icon}
                  </div>
                  <h4 className="font-serif font-bold text-foreground text-lg mb-2">{item.title}</h4>
                  <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Accreditations */}
        <section className="py-16 bg-white border-t border-border">
          <div className="container mx-auto px-4 md:px-6 text-center">
            <p className="text-muted-foreground uppercase tracking-widest text-sm font-semibold mb-10">courses we offered</p>
            <div className="flex flex-wrap justify-center gap-8 md:gap-16 items-center">
              {["NEBOSH", "IOSH", "OSHA", "OTHM", "NVQ"].map((name) => (
                <div key={name} className="text-3xl font-serif font-bold text-primary/70 border-b-2 border-primary pb-1 hover:text-primary transition-colors">
                  {name}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-sidebar relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/20 via-transparent to-transparent z-0" />
          <div className="container mx-auto px-4 md:px-6 text-center relative z-10">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-4">Ready to Start Your Journey?</h2>
            <p className="text-white/70 text-lg max-w-2xl mx-auto mb-8">
              Join thousands of certified safety professionals. Enroll in a program that will advance your career globally.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8" asChild>
                <Link href="/courses">Explore Courses</Link>
              </Button>
              <Button size="lg" variant="outline" className="bg-transparent border-white/30 text-white hover:bg-white/10 hover:text-white font-semibold px-8" asChild>
                <Link href="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
