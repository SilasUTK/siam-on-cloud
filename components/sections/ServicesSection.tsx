import { Container, SectionHeading } from "@/components/ui";
import {
  Plane,
  Briefcase,
  Bot,
  MonitorSmartphone,
} from "lucide-react";

const services = [
  {
    title: "Air Ticketing",
    description:
      "Global FIT and group booking support with fast coordination, complex routing, and professional travel documentation.",
    icon: Plane,
  },
  {
    title: "Travel & Visa Services",
    description:
      "Visa document support, embassy booking preparation, hotel reservations, and travel consulting for individual and business clients.",
    icon: Briefcase,
  },
  {
    title: "AI & Automation",
    description:
      "AI chatbots, lead intake, workflow automation, customer support systems, and smart business process optimization.",
    icon: Bot,
  },
  {
    title: "Digital Solutions",
    description:
      "Fast landing pages, booking systems, CRM workflows, dashboards, and digital tools designed for business execution.",
    icon: MonitorSmartphone,
  },
];

export default function ServicesSection() {
  return (
    <section
      id="services"
      className="relative py-20 bg-gradient-to-br from-slate-50 via-white to-slate-100 overflow-hidden"
    >
      {/* Soft background gradient blob */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 -left-32 h-96 w-96 rounded-full bg-gradient-to-tr from-blue-100 via-sky-100 to-transparent opacity-60 blur-3xl"
      />
      <Container>
        <div className="mb-8 flex flex-col items-center text-center">
          <span className="mb-2 inline-block rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700 tracking-wide">
            Our Core Services
          </span>
          <SectionHeading
            title="Integrated Travel-Tech Solutions for Modern Businesses"
            subtitle="Siam On Cloud brings together travel expertise, AI automation, and digital systems to support faster operations, smarter workflows, and scalable growth."
          />
        </div>
        <div
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 mt-10"
        >
          {services.map(({ title, description, icon: Icon }) => (
            <div
              key={title}
              className="group flex flex-col items-start rounded-2xl border border-slate-200 bg-white/80 p-6 shadow-sm transition hover:shadow-lg hover:border-blue-300 hover:bg-white/90 focus-within:shadow-lg focus-within:border-blue-400"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-700 group-hover:bg-blue-100 transition">
                <Icon size={28} strokeWidth={2.2} />
              </div>
              <h3 className="mb-2 text-lg font-semibold text-slate-900">
                {title}
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                {description}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
