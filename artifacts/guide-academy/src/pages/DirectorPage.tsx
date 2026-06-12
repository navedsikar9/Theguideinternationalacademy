import { Award, Shield, BookOpen, GraduationCap, CheckCircle2, Briefcase, Star } from "lucide-react";
import { motion } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import directorPhoto from "@assets/file_000000009f2072099a707bcdf207370f_1781298907119.png";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5 } }),
};

export default function DirectorPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      <main className="flex-1 pt-24 pb-20">
        <div className="container mx-auto px-4 md:px-6">

          <div className="flex flex-col lg:flex-row gap-14 items-start">

            {/* Left Column - Photo & Stats */}
            <motion.div
              className="w-full lg:w-1/3"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="sticky top-28 space-y-6">
                {/* Photo with gold shadow accent */}
                <div className="relative">
                  <div className="absolute inset-0 bg-[hsl(43,95%,52%)] translate-x-3 translate-y-3 rounded-2xl z-0 opacity-70"></div>
                  <img
                    src={directorPhoto}
                    alt="Abdul Rashid Khokhar — Director, THE GUIDE International Academy"
                    className="relative z-10 w-full rounded-2xl shadow-2xl object-cover object-top aspect-[3/4]"
                  />
                </div>

                {/* Experience badge */}
                <div className="bg-primary text-primary-foreground rounded-xl p-5 text-center shadow-lg">
                  <div className="text-5xl font-serif font-bold text-[hsl(43,95%,52%)] leading-none">17+</div>
                  <div className="text-sm font-semibold tracking-widest uppercase mt-1 opacity-90">Years of Experience</div>
                </div>

                {/* Credentials */}
                <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
                  <h3 className="font-serif font-bold text-lg mb-4 border-b border-border pb-2">Credentials</h3>
                  <ul className="space-y-3 text-sm text-muted-foreground">
                    <li className="flex items-center gap-3">
                      <GraduationCap className="w-4 h-4 text-primary shrink-0" />
                      <span>Diploma in Industrial Safety & HSE</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <Award className="w-4 h-4 text-primary shrink-0" />
                      <span>NEBOSH IGC Certified Professional</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <Shield className="w-4 h-4 text-primary shrink-0" />
                      <span>IOSH Accredited Safety Trainer</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <Briefcase className="w-4 h-4 text-primary shrink-0" />
                      <span>Oil & Gas Industry Expert</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <BookOpen className="w-4 h-4 text-primary shrink-0" />
                      <span>OSHA Certified Trainer</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <Star className="w-4 h-4 text-primary shrink-0" />
                      <span>5,000+ Professionals Trained</span>
                    </li>
                  </ul>
                </div>
              </div>
            </motion.div>

            {/* Right Column - Content */}
            <div className="w-full lg:w-2/3 space-y-10">

              {/* Header */}
              <motion.div custom={0} variants={fadeUp} initial="hidden" animate="visible">
                <div className="flex items-center gap-4 mb-4">
                  <div className="h-px w-12 bg-primary"></div>
                  <span className="text-primary font-bold tracking-widest uppercase text-sm">Director Profile</span>
                </div>
                <h1 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-1">
                  Abdul Rashid Khokhar
                </h1>
                <p className="text-xl text-muted-foreground font-medium mb-6">
                  Founder & Managing Director — THE GUIDE International Academy
                </p>

                <blockquote className="text-xl font-serif italic text-sidebar border-l-4 border-[hsl(43,95%,52%)] pl-6 py-2 bg-muted/30 rounded-r-xl p-6 leading-relaxed">
                  "Safety is not a checkbox; it is a culture. Our goal is to forge leaders who instinctively prioritize human life and operational integrity in every decision they make."
                </blockquote>
              </motion.div>

              {/* Biography */}
              <motion.section custom={1} variants={fadeUp} initial="hidden" animate="visible">
                <h2 className="text-2xl font-serif font-bold text-foreground mb-4">Professional Biography</h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    With over <strong className="text-foreground">17 years of dedicated experience</strong> in the Health, Safety, and Environment (HSE) sector, <strong className="text-foreground">Abdul Rashid Khokhar</strong> has established himself as a leading authority in occupational safety training, industrial risk management, and oil & gas safety compliance. His career began in the demanding environments of heavy industry and offshore operations, where he developed a deep, hands-on understanding of real-world safety challenges.
                  </p>
                  <p>
                    Recognizing the critical gap between theoretical safety knowledge and its practical application, he founded <strong className="text-foreground">THE GUIDE International Academy</strong> — with a single, unwavering mission: to deliver world-class, internationally recognized safety training that transforms professionals into confident, competent safety leaders.
                  </p>
                  <p>
                    Under his leadership, the academy has grown into a premier institution partnering with globally recognized bodies including <strong className="text-foreground">NEBOSH, IOSH, and OSHA</strong>, offering both international certifications and national diplomas that are respected by employers across the Middle East, South Asia, and beyond.
                  </p>
                </div>
              </motion.section>

              {/* Vision */}
              <motion.section custom={2} variants={fadeUp} initial="hidden" animate="visible">
                <h2 className="text-2xl font-serif font-bold text-foreground mb-4">Vision for THE GUIDE Academy</h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    The vision has always been clear — to bridge the gap between classroom certification and real-world safety competence. By insisting on experienced industry instructors, comprehensive course curricula, and a student-first approach, THE GUIDE Academy ensures that every graduate is not merely certified, but truly prepared to protect lives.
                  </p>
                  <p>
                    Mr. Khokhar is committed to expanding the academy's reach, enabling safety professionals across all industries — oil & gas, construction, manufacturing, and healthcare — to access globally recognized qualifications that open doors worldwide.
                  </p>
                </div>
              </motion.section>

              {/* Achievements */}
              <motion.section custom={3} variants={fadeUp} initial="hidden" animate="visible">
                <h2 className="text-2xl font-serif font-bold text-foreground mb-6">Key Achievements</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    "Successfully trained over 5,000 safety professionals across multiple countries.",
                    "Founded THE GUIDE International Academy — a premier globally recognized training institute.",
                    "Authorized training partner for NEBOSH, IOSH, and OSHA international certification programs.",
                    "Trained professionals placed in top oil & gas, construction, and industrial firms worldwide.",
                    "17+ years of hands-on industry expertise in HSE, Oil & Gas, and industrial safety.",
                    "Recipient of regional excellence awards in HSE education and professional development.",
                  ].map((item, i) => (
                    <div key={i} className="bg-muted/30 p-4 rounded-xl border border-border flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                      <span className="text-muted-foreground text-sm leading-relaxed">{item}</span>
                    </div>
                  ))}
                </div>
              </motion.section>

              {/* Industries */}
              <motion.section custom={4} variants={fadeUp} initial="hidden" animate="visible">
                <h2 className="text-2xl font-serif font-bold text-foreground mb-4">Industry Expertise</h2>
                <div className="flex flex-wrap gap-3">
                  {["Oil & Gas", "Construction Safety", "Industrial Safety", "Fire Safety", "Occupational Health", "Risk Assessment", "NEBOSH", "IOSH", "OSHA", "HSE Management", "Incident Investigation", "Permit to Work"].map((tag) => (
                    <span key={tag} className="px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium border border-primary/20">
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.section>

            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
