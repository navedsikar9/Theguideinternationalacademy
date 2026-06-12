import { Link } from "wouter";
import { useState, useEffect } from "react";
import { Menu, X, Phone, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-sidebar/95 backdrop-blur-md shadow-md py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          <Link href="/">
            <div className="flex flex-col cursor-pointer" data-testid="link-home">
              <span className={`text-2xl md:text-3xl font-serif font-bold tracking-tight ${isScrolled ? "text-primary" : "text-white"}`}>
                THE GUIDE
              </span>
              <span className={`text-xs uppercase tracking-widest font-medium ${isScrolled ? "text-foreground" : "text-white/80"}`}>
                International Academy
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8">
            <Link href="/" className={`text-sm font-medium hover:text-primary transition-colors ${isScrolled ? "text-foreground" : "text-white"}`} data-testid="link-nav-home">Home</Link>
            <Link href="/about" className={`text-sm font-medium hover:text-primary transition-colors ${isScrolled ? "text-foreground" : "text-white"}`} data-testid="link-nav-about">About</Link>
            <Link href="/courses" className={`text-sm font-medium hover:text-primary transition-colors ${isScrolled ? "text-foreground" : "text-white"}`} data-testid="link-nav-courses">Courses</Link>
            <Link href="/director" className={`text-sm font-medium hover:text-primary transition-colors ${isScrolled ? "text-foreground" : "text-white"}`} data-testid="link-nav-director">Director</Link>
            <Link href="/gallery" className={`text-sm font-medium hover:text-primary transition-colors ${isScrolled ? "text-foreground" : "text-white"}`} data-testid="link-nav-gallery">Gallery</Link>
            <Link href="/testimonials" className={`text-sm font-medium hover:text-primary transition-colors ${isScrolled ? "text-foreground" : "text-white"}`} data-testid="link-nav-testimonials">Testimonials</Link>
            <Link href="/contact" className={`text-sm font-medium hover:text-primary transition-colors ${isScrolled ? "text-foreground" : "text-white"}`} data-testid="link-nav-contact">Contact</Link>
            <Link href="/verify-certificate" className={`text-sm font-medium hover:text-primary transition-colors ${isScrolled ? "text-foreground" : "text-white"}`} data-testid="link-nav-verify">Verify Certificate</Link>
            <Button variant="default" className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold" asChild>
               <Link href="/contact" data-testid="btn-apply-now">Apply Now</Link>
            </Button>
          </nav>

          {/* Mobile Menu Toggle */}
          <button
            className={`lg:hidden p-2 ${isScrolled ? "text-foreground" : "text-white"}`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            data-testid="btn-mobile-menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {isMobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-sidebar border-b border-sidebar-border shadow-xl py-4 flex flex-col px-4 gap-4">
            <Link href="/" className="text-white hover:text-primary py-2 border-b border-white/10" onClick={() => setIsMobileMenuOpen(false)}>Home</Link>
            <Link href="/about" className="text-white hover:text-primary py-2 border-b border-white/10" onClick={() => setIsMobileMenuOpen(false)}>About</Link>
            <Link href="/courses" className="text-white hover:text-primary py-2 border-b border-white/10" onClick={() => setIsMobileMenuOpen(false)}>Courses</Link>
            <Link href="/director" className="text-white hover:text-primary py-2 border-b border-white/10" onClick={() => setIsMobileMenuOpen(false)}>Director</Link>
            <Link href="/gallery" className="text-white hover:text-primary py-2 border-b border-white/10" onClick={() => setIsMobileMenuOpen(false)}>Gallery</Link>
            <Link href="/testimonials" className="text-white hover:text-primary py-2 border-b border-white/10" onClick={() => setIsMobileMenuOpen(false)}>Testimonials</Link>
            <Link href="/contact" className="text-white hover:text-primary py-2 border-b border-white/10" onClick={() => setIsMobileMenuOpen(false)}>Contact</Link>
            <Link href="/verify-certificate" className="text-white hover:text-primary py-2 border-b border-white/10" onClick={() => setIsMobileMenuOpen(false)}>Verify Certificate</Link>
            <Button variant="default" className="w-full mt-4 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold" asChild onClick={() => setIsMobileMenuOpen(false)}>
               <Link href="/contact">Apply Now</Link>
            </Button>
        </div>
      )}
    </header>
  );
}
