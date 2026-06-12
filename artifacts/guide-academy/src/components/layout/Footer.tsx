import { Link } from "wouter";
import { Phone, Mail, MapPin, Facebook, Instagram, Linkedin, Youtube, MessageCircle } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-sidebar text-white pt-16 pb-8 border-t border-sidebar-border">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Institute Info */}
          <div>
            <div className="flex flex-col mb-6">
              <span className="text-2xl font-serif font-bold tracking-tight text-primary">
                THE GUIDE
              </span>
              <span className="text-xs uppercase tracking-widest text-white/70">
                International Academy
              </span>
            </div>
            <p className="text-white/70 text-sm leading-relaxed mb-6">
              We Guide the Future Leaders. Premium international safety and professional certification training institute. Govt. Registered, internationally recognized.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors" data-testid="link-facebook">
                <Facebook size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors" data-testid="link-instagram">
                <Instagram size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors" data-testid="link-linkedin">
                <Linkedin size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors" data-testid="link-youtube">
                <Youtube size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-serif font-semibold mb-6 text-white border-b border-primary/30 pb-2 inline-block">Quick Links</h3>
            <ul className="space-y-3">
              <li><Link href="/" className="text-white/70 hover:text-primary transition-colors text-sm flex items-center gap-2 before:content-[''] before:w-1.5 before:h-1.5 before:bg-primary before:rounded-full">Home</Link></li>
              <li><Link href="/about" className="text-white/70 hover:text-primary transition-colors text-sm flex items-center gap-2 before:content-[''] before:w-1.5 before:h-1.5 before:bg-primary before:rounded-full">About Us</Link></li>
              <li><Link href="/courses" className="text-white/70 hover:text-primary transition-colors text-sm flex items-center gap-2 before:content-[''] before:w-1.5 before:h-1.5 before:bg-primary before:rounded-full">Courses</Link></li>
              <li><Link href="/director" className="text-white/70 hover:text-primary transition-colors text-sm flex items-center gap-2 before:content-[''] before:w-1.5 before:h-1.5 before:bg-primary before:rounded-full">Director Profile</Link></li>
              <li><Link href="/verify-certificate" className="text-white/70 hover:text-primary transition-colors text-sm flex items-center gap-2 before:content-[''] before:w-1.5 before:h-1.5 before:bg-primary before:rounded-full">Verify Certificate</Link></li>
            </ul>
          </div>

          {/* Courses */}
          <div>
            <h3 className="text-lg font-serif font-semibold mb-6 text-white border-b border-primary/30 pb-2 inline-block">Top Courses</h3>
            <ul className="space-y-3">
              <li><Link href="/courses/nebosh" className="text-white/70 hover:text-primary transition-colors text-sm">NEBOSH (UK)</Link></li>
              <li><Link href="/courses/iosh" className="text-white/70 hover:text-primary transition-colors text-sm">IOSH (UK)</Link></li>
              <li><Link href="/courses/osha" className="text-white/70 hover:text-primary transition-colors text-sm">OSHA (USA)</Link></li>
              <li><Link href="/courses/othm" className="text-white/70 hover:text-primary transition-colors text-sm">OTHM (UK)</Link></li>
              <li><Link href="/courses/nvq" className="text-white/70 hover:text-primary transition-colors text-sm">NVQ (UK)</Link></li>
              <li><Link href="/courses/oil-and-gas" className="text-white/70 hover:text-primary transition-colors text-sm">Oil & Gas Safety</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-serif font-semibold mb-6 text-white border-b border-primary/30 pb-2 inline-block">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="text-primary mt-1 shrink-0" size={18} />
                <span className="text-white/70 text-sm leading-relaxed">
                  123 Safety Avenue, Professional District,<br />
                  Global Business Park, City 10001
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="text-primary shrink-0" size={18} />
                <a href="tel:+12345678900" className="text-white/70 hover:text-primary transition-colors text-sm">
                  +1 234 567 8900
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="text-primary shrink-0" size={18} />
                <a href="mailto:info@theguideacademy.com" className="text-white/70 hover:text-primary transition-colors text-sm">
                  info@theguideacademy.com
                </a>
              </li>
              <li className="flex items-center gap-3">
                <MessageCircle className="text-green-500 shrink-0" size={18} />
                <a href="https://wa.me/12345678900" className="text-white/70 hover:text-primary transition-colors text-sm" target="_blank" rel="noreferrer">
                  WhatsApp Support
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/50 text-sm">
            © {new Date().getFullYear()} THE GUIDE International Academy. All rights reserved.
          </p>
          <div className="flex gap-4">
             <Link href="/privacy" className="text-white/50 hover:text-white text-sm">Privacy Policy</Link>
             <Link href="/terms" className="text-white/50 hover:text-white text-sm">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
