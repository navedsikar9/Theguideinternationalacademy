import { Link, useLocation } from "wouter";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useGetSettings } from "@workspace/api-client-react";

interface NavbarProps {
  solid?: boolean;
}

export default function Navbar({ solid = false }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [location] = useLocation();

  const { data: settings } = useGetSettings({ query: { queryKey: ["site-settings-nav"] } });

  const isHome = location === "/" || location === "";
  const alwaysSolid = solid || !isHome;
  const showSolid = alwaysSolid || isScrolled;

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/courses", label: "Courses" },
    { href: "/director", label: "Director" },
    { href: "/gallery", label: "Gallery" },
    { href: "/testimonials", label: "Testimonials" },
    { href: "/contact", label: "Contact" },
    { href: "/verify-certificate", label: "Verify Certificate" },
  ];

  const logoUrl = settings?.logoUrl || "/logo.jpg";

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        showSolid
          ? "bg-sidebar/98 backdrop-blur-md shadow-md py-2"
          : "bg-transparent py-4"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          <Link href="/">
            <div className="flex items-center gap-3 cursor-pointer" data-testid="link-home">
              <img
                src={logoUrl}
                alt="THE GUIDE International Academy Logo"
                className="w-12 h-12 object-contain rounded-sm"
                onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
              />
              <div className="flex flex-col">
                <span className="text-xl md:text-2xl font-serif font-bold tracking-tight text-white leading-tight">
                  THE GUIDE
                </span>
                <span className="text-[10px] uppercase tracking-widest font-medium text-white/70">
                  International Academy
                </span>
              </div>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-5 xl:gap-7">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors whitespace-nowrap ${
                  location === link.href
                    ? "text-primary"
                    : "text-white/85 hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Button
              variant="default"
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold shrink-0"
              asChild
            >
              <Link href="/contact" data-testid="btn-apply-now">Apply Now</Link>
            </Button>
          </nav>

          {/* Mobile Menu Toggle */}
          <button
            className="lg:hidden p-2 text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {isMobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-sidebar border-b border-white/10 shadow-xl py-4 flex flex-col px-6 gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`py-3 border-b border-white/10 text-sm font-medium transition-colors ${
                location === link.href ? "text-primary" : "text-white/85 hover:text-white"
              }`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Button
            variant="default"
            className="w-full mt-4 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold"
            asChild
          >
            <Link href="/contact" onClick={() => setIsMobileMenuOpen(false)}>Apply Now</Link>
          </Button>
        </div>
      )}
    </header>
  );
}
