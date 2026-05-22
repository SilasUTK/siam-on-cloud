import { BrandLogo, Container } from "@/components/ui";
import { Mail, MapPin } from "lucide-react";

const footerLinks = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/#services" },
  { label: "AI Solutions", href: "/#ai-solutions" },
  { label: "Travel Solutions", href: "/#travel-solutions" },
  { label: "About", href: "/#about" },
  { label: "Contact", href: "/contact" },
];

const services = [
  "Air Ticketing",
  "Travel & Visa Services",
  "AI & Automation",
  "Digital Solutions",
];

export default function Footer() {
  return (
    <footer
      id="contact"
      className="border-t border-white/10 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-slate-200"
    >
      <Container className="py-14 sm:py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <BrandLogo variant="light" className="max-w-[18rem]" />
            <p className="text-sm leading-relaxed text-slate-400">
              ยกระดับการเดินทางแห่งอนาคต
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-white">
              Links
            </h3>
            <ul className="mt-4 space-y-3 text-sm text-slate-300">
              {footerLinks.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="transition hover:text-cyan-200 focus-visible:text-cyan-200"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-white">
              Services
            </h3>
            <ul className="mt-4 space-y-3 text-sm text-slate-300">
              {services.map((service) => (
                <li key={service}>{service}</li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-white">
              Contact
            </h3>
            <ul className="mt-4 space-y-4 text-sm text-slate-300">
              <li>
                <a
                  href="mailto:info@siamon.cloud"
                  className="inline-flex items-start gap-2 transition hover:text-cyan-200"
                >
                  <Mail size={16} className="mt-0.5" />
                  <span>info@siamon.cloud</span>
                </a>
              </li>
              <li className="inline-flex items-start gap-2">
                <MapPin size={16} className="mt-0.5" />
                <span>Bangkok, Thailand</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-white/10 pt-6 text-xs text-slate-400 sm:text-sm">
          © 2026 Siam On Cloud. All rights reserved.
        </div>
      </Container>
    </footer>
  );
}
