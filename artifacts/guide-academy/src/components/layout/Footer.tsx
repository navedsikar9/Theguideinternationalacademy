import { Link } from "wouter";
import { Phone, Mail, MapPin, Instagram, Linkedin, Youtube, MessageCircle } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-sidebar text-white pt-16 pb-8 border-t border-sidebar-border">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Institute Info */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img src="/logo.jpg" alt="Logo" className="w-12 h-12 object-contain rounded-sm" onError={(e) => { (e.currentTarget as HTMLImageElement).style.display='none'; }} />
              <div className="flex flex-col">
                <span className="text-2xl font-serif font-bold tracking-tight text-primary">THE GUIDE</span>
                <span className="text-xs uppercase tracking-widest text-white/70">International Academy</span>
              </div>
            </div>
            <p className="text-white/70 text-sm leading-relaxed mb-4">
              We Guide the Future Leaders. Premium international safety and professional certification training institute. Govt. Registered, internationally recognized.
            </p>
            <div className="flex flex-wrap gap-2 mb-5">
              <span className="px-2.5 py-1 rounded-full bg-primary/20 border border-primary/30 text-white text-xs font-bold">ISO <span className="text-primary font-extrabold">9001:2015</span></span>
              <span className="px-2.5 py-1 rounded-full bg-white/5 border border-white/15 text-white/70 text-xs font-semibold">Govt. Registered</span>
            </div>
            <div className="flex gap-3">
              <a
                href="https://www.instagram.com/the_guide_fire_safety_academy"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center hover:scale-110 transition-transform"
                aria-label="Follow us on Instagram"
              >
                <Instagram size={18} />
              </a>
              <a
                href="https://in.linkedin.com/in/abdul-rashid-khokhar-338318126"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-full bg-[#0077b5] flex items-center justify-center hover:bg-[#005fa3] hover:scale-110 transition-all"
                aria-label="LinkedIn"
              >
                <Linkedin size={18} />
              </a>
              <a
                href="https://youtube.com/@tgia-rj23"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-full bg-[#ff0000] flex items-center justify-center hover:bg-[#cc0000] hover:scale-110 transition-all"
                aria-label="YouTube"
              >
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
              <li><Link href="/gallery" className="text-white/70 hover:text-primary transition-colors text-sm flex items-center gap-2 before:content-[''] before:w-1.5 before:h-1.5 before:bg-primary before:rounded-full">Gallery</Link></li>
              <li><Link href="/verify-certificate" className="text-white/70 hover:text-primary transition-colors text-sm flex items-center gap-2 before:content-[''] before:w-1.5 before:h-1.5 before:bg-primary before:rounded-full">Verify Certificate</Link></li>
            </ul>
          </div>

          {/* Courses */}
          <div>
            <h3 className="text-lg font-serif font-semibold mb-6 text-white border-b border-primary/30 pb-2 inline-block">Courses We Offer</h3>
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
                <MapPin className="text-primary mt-1 shrink-0" size={16} />
                <div>
                  <span className="text-primary text-xs font-bold uppercase tracking-wider block mb-0.5">India — Sikar</span>
                  <span className="text-white/70 text-sm leading-relaxed">
                    Opp Indian Mobile, Railway Station,<br />
                    Kalyan Circle, Station Road,<br />
                    Sikar - 332001, Rajasthan
                  </span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="text-primary mt-1 shrink-0" size={16} />
                <div>
                  <span className="text-primary text-xs font-bold uppercase tracking-wider block mb-0.5">Dubai Branch</span>
                  <span className="text-white/70 text-sm leading-relaxed">
                    S15, Spain Cluster,<br />
                    International City, Dubai,<br />
                    United Arab Emirates
                  </span>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="text-primary shrink-0" size={16} />
                <div>
                  <a href="tel:+919509174366" className="text-white/70 hover:text-primary transition-colors text-sm block">+91 9509174366</a>
                  <a href="tel:+917339915890" className="text-white/70 hover:text-primary transition-colors text-sm block">+91 73399 15890</a>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="text-primary shrink-0" size={16} />
                <a href="mailto:enquirytheguide@gmail.com" className="text-white/70 hover:text-primary transition-colors text-sm break-all">
                  enquirytheguide@gmail.com
                </a>
              </li>
              <li className="flex items-center gap-3">
                <MessageCircle className="text-green-500 shrink-0" size={16} />
                <a href="https://wa.me/919509174366" className="text-white/70 hover:text-primary transition-colors text-sm" target="_blank" rel="noreferrer">
                  WhatsApp: +91 9509174366
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Instagram Follow Banner */}
        <div className="mb-8 p-4 rounded-xl bg-gradient-to-r from-purple-900/40 via-pink-900/30 to-purple-900/40 border border-purple-500/20 flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
              <Instagram size={20} />
            </div>
            <div>
              <div className="text-white font-semibold text-sm">Follow us on Instagram</div>
              <div className="text-white/50 text-xs">@the_guide_fire_safety_academy</div>
            </div>
          </div>
          <a
            href="https://www.instagram.com/the_guide_fire_safety_academy"
            target="_blank"
            rel="noreferrer"
            className="px-5 py-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm font-semibold hover:scale-105 transition-transform"
          >
            Follow Now
          </a>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-center md:text-left">
            <p className="text-white/50 text-sm">
              © {new Date().getFullYear()} THE GUIDE International Academy. All rights reserved. | Sikar, Rajasthan, India
            </p>
            <p className="text-white/30 text-xs mt-1 font-medium tracking-widest">MADE BY BHATI</p>
          </div>
          <div className="flex gap-4 items-center">
            <Link href="/privacy" className="text-white/50 hover:text-white text-sm">Privacy Policy</Link>
            <Link href="/terms" className="text-white/50 hover:text-white text-sm">Terms of Service</Link>
            <span className="text-white/20 text-sm">|</span>
            <Link href="/admin/login" className="text-white/30 hover:text-white/70 text-xs transition-colors">Admin</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
