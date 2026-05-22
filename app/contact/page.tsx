import type { Metadata } from "next";
import { Footer, Navbar } from "@/components";
import ContactForm from "@/components/forms/ContactForm";
import ContactHeroSection from "@/components/sections/ContactHeroSection";
import { Container } from "@/components/ui";
import { buildMetadata } from "@/lib";

export const metadata: Metadata = buildMetadata({
  title: "Contact Siam On Cloud",
  description:
    "Let’s discuss how travel-tech and AI can support your business.",
  alternates: {
    canonical: "/contact",
  },
});

export default function ContactPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <ContactHeroSection />

        <section className="bg-slate-50 py-14 sm:py-16">
          <Container>
            <div className="grid gap-6 lg:grid-cols-[1fr_320px] lg:items-start">
              <ContactForm />

              <aside className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-7">
                <h2 className="text-lg font-semibold text-slate-900">Why contact us</h2>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">
                  Share your goals and our team will design practical travel,
                  AI, and digital solutions tailored to your operations.
                </p>

                <ul className="mt-5 space-y-2 text-sm text-slate-600">
                  <li>Response target: within 1 business day</li>
                  <li>Location: Bangkok, Thailand</li>
                  <li>Email: info@siamon.cloud</li>
                </ul>
              </aside>
            </div>
          </Container>
        </section>
      </main>
      <Footer />
    </div>
  );
}