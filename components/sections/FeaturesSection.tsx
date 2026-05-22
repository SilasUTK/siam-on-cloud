import { Container, SectionHeading } from "@/components/ui";
import {
  Zap,
  Briefcase,
  Bot,
  MonitorSmartphone,
  Users,
  Layers,
} from "lucide-react";

const features = [
  {
    title: "Fast Execution",
    description:
      "Designed for quick turnaround workflows, urgent travel requests, and rapid business deployment.",
    icon: Zap,
    iconBg: "from-blue-100 via-blue-50 to-white",
  },
  {
    title: "Travel Industry Expertise",
    description:
      "Practical experience in air ticketing, visa support, embassy documentation, and complex travel coordination.",
    icon: Briefcase,
    iconBg: "from-sky-100 via-blue-50 to-white",
  },
  {
    title: "AI-Driven Workflow",
    description:
      "Smart automation for lead intake, customer support, task routing, and operational follow-up.",
    icon: Bot,
    iconBg: "from-fuchsia-100 via-pink-50 to-white",
  },
  {
    title: "Business-Ready Systems",
    description:
      "Digital tools built for real operations, including booking flows, dashboards, CRM pipelines, and landing pages.",
    icon: MonitorSmartphone,
    iconBg: "from-emerald-100 via-green-50 to-white",
  },
  {
    title: "Human + AI Service Model",
    description:
      "We combine expert human handling with AI-powered systems for faster, clearer, and more reliable service.",
    icon: Users,
    iconBg: "from-yellow-100 via-orange-50 to-white",
  },
  {
    title: "Scalable Digital Foundation",
    description:
      "Structured to support future growth across travel services, automation, digital products, and online revenue channels.",
    icon: Layers,
    iconBg: "from-indigo-100 via-blue-50 to-white",
  },
];

export function FeaturesSection() {
  return (
    <section
      id="features"
      className="relative py-20 bg-gradient-to-br from-white via-slate-50 to-slate-100 overflow-hidden"
    >
      {/* Soft background gradient blob */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 -right-32 h-96 w-96 rounded-full bg-gradient-to-tr from-blue-100 via-sky-100 to-transparent opacity-60 blur-3xl"
      />
      <Container>
        <div className="mb-8 flex flex-col items-center text-center">
          <span className="mb-2 inline-block rounded-full bg-fuchsia-100 px-3 py-1 text-xs font-semibold text-fuchsia-700 tracking-wide">
            Why Siam On Cloud
          </span>
          <SectionHeading
            title="Built for Speed, Precision, and Scalable Growth"
            subtitle="We combine travel industry knowledge with modern technology to help businesses operate faster, reduce manual work, and deliver better customer experiences."
          />
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mt-10">
          {features.map(({ title, description, icon: Icon, iconBg }) => (
            <div
              key={title}
              className="group flex flex-col items-start rounded-2xl border border-slate-200 bg-white/80 p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg hover:border-fuchsia-300 hover:bg-white/90 focus-within:shadow-lg focus-within:border-fuchsia-400"
            >
              <div
                className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${iconBg} text-fuchsia-700 group-hover:bg-fuchsia-100 transition`}
              >
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
