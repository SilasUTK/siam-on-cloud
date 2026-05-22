import { BrandLogo, Container } from "@/components/ui";
import { Bot, BriefcaseBusiness, Sparkles } from "lucide-react";

const keyPoints = [
  {
    text: "Travel expertise with technology-first execution",
    icon: BriefcaseBusiness,
  },
  {
    text: "AI-powered workflow and customer support systems",
    icon: Bot,
  },
  {
    text: "Digital solutions designed for practical business growth",
    icon: Sparkles,
  },
];

const stats = ["Travel-Tech Focus", "AI Automation", "Digital Execution"];

export default function AboutSection() {
  return (
    <section
      id="about"
      className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-white to-sky-50 py-20"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -top-20 -right-12 h-72 w-72 rounded-full bg-gradient-to-br from-sky-100 to-transparent opacity-70 blur-3xl"
      />
      <Container>
        <div className="grid gap-10 lg:grid-cols-2 lg:items-stretch">
          <div className="space-y-6">
            <span className="inline-flex rounded-full border border-cyan-200 bg-cyan-50 px-4 py-1.5 text-xs font-semibold tracking-wide text-cyan-800">
              About Siam On Cloud
            </span>

            <h2 className="max-w-xl text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
              A Hybrid Travel-Tech Company Built for the Future
            </h2>

            <p className="max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg">
              Siam On Cloud is a premium travel-tech company combining air
              ticketing, travel services, AI automation, and rapid digital
              systems. We help businesses and travelers simplify complex
              journeys, automate workflows, and move faster with confidence.
            </p>

            <ul className="space-y-3">
              {keyPoints.map(({ text, icon: Icon }) => (
                <li
                  key={text}
                  className="flex items-start gap-3 rounded-xl border border-slate-200 bg-white/90 px-4 py-3"
                >
                  <span className="mt-0.5 inline-flex h-7 w-7 items-center justify-center rounded-lg bg-slate-100 text-slate-700">
                    <Icon size={16} strokeWidth={2.2} />
                  </span>
                  <p className="text-sm font-medium text-slate-700 sm:text-base">
                    {text}
                  </p>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-3xl border border-slate-200/90 bg-white/90 p-6 shadow-xl shadow-slate-900/5 backdrop-blur sm:p-8">
            <div className="flex items-center justify-between border-b border-slate-200 pb-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
                  Company Profile
                </p>
                <BrandLogo className="mt-2" />
              </div>
            </div>

            <div className="mt-5 rounded-2xl border border-slate-200 bg-gradient-to-br from-white to-slate-50 p-4">
              <p className="text-sm font-semibold text-slate-800">
                Elevation of Future Journeys
              </p>
              <p className="mt-1 text-sm text-slate-600">
                ยกระดับการเดินทางแห่งอนาคต
              </p>
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              {stats.map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-slate-200 bg-white px-3 py-4 text-center"
                >
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Core Area
                  </p>
                  <p className="mt-2 text-sm font-semibold text-slate-800">
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}