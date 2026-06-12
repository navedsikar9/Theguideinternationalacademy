import { useState } from "react";
import { Maximize2, X } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useListGallery } from "@workspace/api-client-react";
import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "framer-motion";

const CATEGORIES = ["All", "Classrooms", "Students", "Events", "Workshops", "Certifications", "Training Sessions"];

const FALLBACK_IMAGES = [
  { id: 1, imageUrl: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=800", category: "Classrooms", title: "Main Lecture Hall" },
  { id: 2, imageUrl: "https://images.unsplash.com/photo-1541888062831-294025114751?q=80&w=800", category: "Training Sessions", title: "Practical Fire Safety" },
  { id: 3, imageUrl: "https://images.unsplash.com/photo-1516321497487-e288fb19713f?q=80&w=800", category: "Events", title: "Annual Convocation" },
  { id: 4, imageUrl: "https://images.unsplash.com/photo-1531496730074-83b638c0a7ac?q=80&w=800", category: "Students", title: "Batch of 2023" },
  { id: 5, imageUrl: "https://images.unsplash.com/photo-1581092921461-eab62e97a780?q=80&w=800", category: "Workshops", title: "Industrial Safety Drill" },
  { id: 6, imageUrl: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=800", category: "Classrooms", title: "Interactive Session" },
];

export default function GalleryPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);

  const { data: dbImages, isLoading } = useListGallery(
    { category: selectedCategory !== "All" ? selectedCategory : undefined },
    { query: { queryKey: ['gallery', selectedCategory] } }
  );

  const images = (dbImages && dbImages.length > 0) ? dbImages : (selectedCategory === "All" ? FALLBACK_IMAGES : FALLBACK_IMAGES.filter(img => img.category === selectedCategory));

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      <main className="flex-1 pt-32 pb-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mb-12 text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-4">Life at THE GUIDE</h1>
            <p className="text-muted-foreground text-lg">
              Explore our world-class facilities, dynamic training sessions, and the vibrant student community.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {CATEGORIES.map(category => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => setSelectedCategory(category)}
                className={`rounded-full px-6 ${selectedCategory === category ? "bg-sidebar text-white" : "border-border text-foreground hover:bg-muted"}`}
              >
                {category}
              </Button>
            ))}
          </div>

          {isLoading ? (
            <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-6 space-y-6">
              {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
                <Skeleton key={i} className={`w-full rounded-xl ${i % 2 === 0 ? 'h-64' : 'h-80'}`} />
              ))}
            </div>
          ) : (
            <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-6 space-y-6">
              {images.map((image, i) => (
                <motion.div
                  key={image.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.05 }}
                  className="relative group rounded-xl overflow-hidden cursor-pointer break-inside-avoid shadow-sm border border-border"
                  onClick={() => setLightboxImage(image.imageUrl)}
                >
                  <img 
                    src={image.imageUrl} 
                    alt={image.title || "Gallery image"} 
                    className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-sidebar/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-4 text-center">
                    <Maximize2 className="w-8 h-8 text-white mb-3" />
                    {image.title && <h3 className="text-white font-bold font-serif text-lg">{image.title}</h3>}
                    {image.category && <span className="text-primary font-medium text-sm mt-1">{image.category}</span>}
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {!isLoading && images.length === 0 && (
            <div className="text-center py-20 text-muted-foreground border border-dashed border-border rounded-xl">
              No images found in this category.
            </div>
          )}
        </div>
      </main>

      <Footer />

      <Dialog open={!!lightboxImage} onOpenChange={(open) => !open && setLightboxImage(null)}>
        <DialogContent className="max-w-5xl p-1 bg-transparent border-none shadow-none">
          <div className="relative">
            <button 
              onClick={() => setLightboxImage(null)}
              className="absolute -top-12 right-0 text-white hover:text-primary transition-colors bg-black/50 p-2 rounded-full"
            >
              <X className="w-6 h-6" />
            </button>
            {lightboxImage && (
              <img 
                src={lightboxImage} 
                alt="Enlarged view" 
                className="w-full max-h-[85vh] object-contain rounded-lg"
              />
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
