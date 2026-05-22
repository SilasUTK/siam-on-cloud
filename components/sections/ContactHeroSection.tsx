import { BrandLogo, Container } from "@/components/ui";
import { Mail, MapPin } from "lucide-react";

export default function ContactHeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-white to-sky-50 py-16 sm:py-20">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-16 right-0 h-72 w-72 rounded-full bg-cyan-100/70 blur-3xl"
      />
      <Container className="relative">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
          <div className="space-y-5">
            <span className="inline-flex rounded-full border border-cyan-200 bg-cyan-50 px-4 py-1.5 text-xs font-semibold tracking-wide text-cyan-800">
              Contact Siam On Cloud
            </span>

            <h1 className="max-w-3xl text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
              Contact Siam On Cloud
            </h1>

            <p className="max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg">
              Let&apos;s discuss how travel-tech and AI can support your business.
            </p>

            <p className="text-sm font-medium text-slate-700">
              Elevation of Future Journeys
            </p>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white/95 p-6 shadow-sm sm:p-7">
            <BrandLogo className="mb-5 max-w-[19rem]" />

            <div className="space-y-3 text-sm text-slate-700">
              <a
                href="mailto:info@siamon.cloud"
                className="inline-flex items-start gap-2 transition hover:text-cyan-700"
              >
                <Mail size={16} className="mt-0.5" />
                <span>info@siamon.cloud</span>
              </a>

              <p className="inline-flex items-start gap-2">
                <MapPin size={16} className="mt-0.5" />
                <span>Bangkok, Thailand</span>
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}