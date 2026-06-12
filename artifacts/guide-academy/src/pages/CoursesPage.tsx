import { useState } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowRight, Clock, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useListCourses } from "@workspace/api-client-react";
import { Skeleton } from "@/components/ui/skeleton";

const FALLBACK_COURSES = [
  { id: 1, title: "NEBOSH (UK)", slug: "nebosh", category: "International", duration: "10 Days", description: "Globally recognized health and safety qualification.", featured: true },
  { id: 2, title: "IOSH (UK)", slug: "iosh", category: "International", duration: "3 Days", description: "Managing safely certification for managers and supervisors.", featured: true },
  { id: 3, title: "OSHA (USA)", slug: "osha", category: "International", duration: "30 Hours", description: "Occupational Safety and Health Administration standards.", featured: false },
  { id: 4, title: "OTHM (UK)", slug: "othm", category: "International", duration: "6 Months", description: "Level 6 Diploma in Occupational Health and Safety.", featured: false },
  { id: 5, title: "NVQ (UK)", slug: "nvq", category: "International", duration: "1 Year", description: "National Vocational Qualification in Health and Safety.", featured: false },
  { id: 6, title: "Oil & Gas Safety", slug: "oil-and-gas", category: "National", duration: "1 Month", description: "Specialized safety training for the oil and gas sector.", featured: true },
  { id: 7, title: "Fire Fighting", slug: "fire-fighting", category: "National", duration: "2 Weeks", description: "Advanced fire prevention and firefighting techniques.", featured: false },
  { id: 8, title: "First Aid & CPR", slug: "first-aid", category: "National", duration: "2 Days", description: "Essential life-saving skills and CPR certification.", featured: false },
  { id: 9, title: "Construction Safety", slug: "construction-safety", category: "National", duration: "1 Month", description: "Safety protocols and risk management in construction.", featured: false },
  { id: 10, title: "HSE", slug: "hse", category: "National", duration: "2 Months", description: "Health, Safety, and Environment comprehensive diploma.", featured: false },
];

export default function CoursesPage() {
  const [filter, setFilter] = useState("All");
  const { data: dbCourses, isLoading } = useListCourses({});

  const courses = (dbCourses && dbCourses.length > 0) ? dbCourses : FALLBACK_COURSES;
  const filteredCourses = filter === "All" ? courses : courses.filter(c => c.category === filter);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      <main className="flex-1 pt-24 pb-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mb-12 text-center">
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-4">Our Professional Courses</h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Elevate your career with our internationally recognized safety certifications and national diplomas.
            </p>
          </div>

          <div className="flex justify-center gap-4 mb-12 flex-wrap">
            <Button 
              variant={filter === "All" ? "default" : "outline"} 
              onClick={() => setFilter("All")}
              className={filter === "All" ? "bg-primary text-primary-foreground" : "border-primary text-primary"}
              data-testid="filter-all"
            >
              All Courses
            </Button>
            <Button 
              variant={filter === "International" ? "default" : "outline"} 
              onClick={() => setFilter("International")}
              className={filter === "International" ? "bg-primary text-primary-foreground" : "border-primary text-primary"}
              data-testid="filter-international"
            >
              International
            </Button>
            <Button 
              variant={filter === "National" ? "default" : "outline"} 
              onClick={() => setFilter("National")}
              className={filter === "National" ? "bg-primary text-primary-foreground" : "border-primary text-primary"}
              data-testid="filter-national"
            >
              National Diplomas
            </Button>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map(i => (
                <Skeleton key={i} className="h-80 w-full rounded-xl" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredCourses.map((course, i) => (
                <motion.div
                  key={course.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-card border border-border rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all group flex flex-col h-full"
                  data-testid={`course-card-${course.slug}`}
                >
                  <div className="h-2 w-full bg-gradient-to-r from-sidebar to-primary"></div>
                  <div className="p-6 flex-1 flex flex-col">
                    <div className="flex justify-between items-start mb-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20">
                        {course.category}
                      </span>
                      {course.duration && (
                        <span className="inline-flex items-center text-xs text-muted-foreground font-medium">
                          <Clock className="w-3 h-3 mr-1" />
                          {course.duration}
                        </span>
                      )}
                    </div>
                    
                    <h3 className="text-xl font-serif font-bold text-foreground mb-3">{course.title}</h3>
                    <p className="text-muted-foreground text-sm flex-1 mb-6">{course.description}</p>
                    
                    <div className="flex items-center gap-3 mt-auto">
                      <Button asChild className="flex-1 bg-sidebar hover:bg-sidebar/90 text-white">
                        <Link href={`/courses/${course.slug}`}>Learn More</Link>
                      </Button>
                      <Button asChild variant="outline" className="flex-1 border-primary text-primary hover:bg-primary/5">
                        <Link href="/contact">Apply Now</Link>
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {!isLoading && filteredCourses.length === 0 && (
             <div className="text-center py-20 text-muted-foreground">
               No courses found for the selected category.
             </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
