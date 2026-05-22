import { Container } from "@/components/ui";
import { Briefcase, Compass, FileCheck2, PlaneTakeoff } from "lucide-react";

const travelSolutions = [
  {
    title: "Air Ticketing Support",
    description:
      "FIT and group booking coordination, complex routing support, and professional travel handling.",
    icon: PlaneTakeoff,
  },
  {
    title: "Visa Travel Documents",
    description:
      "Flight reservation documents, hotel booking support, itinerary preparation, and embassy-ready travel documentation.",
    icon: FileCheck2,
  },
  {
    title: "Business Travel Coordination",
    description:
      "Organized travel support for companies, teams, urgent trips, and multi-destination travel needs.",
    icon: Briefcase,
  },
  {
    title: "Travel Consulting",
    description:
      "Practical guidance for route planning, travel document preparation, and smoother customer journeys.",
    icon: Compass,
  },
];

export default function TravelSolutionsSection() {
  return (
    <section
      id="travel-solutions"
      className="relative overflow-hidden bg-gradient-to-br from-white via-slate-50 to-cyan-50 py-20"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -right-20 top-6 h-72 w-72 rounded-full bg-cyan-100/70 blur-3xl"
      />

      <Container>
        <div className="mb-10 space-y-5">
          <span className="inline-flex rounded-full border border-sky-200 bg-sky-50 px-4 py-1.5 text-xs font-semibold tracking-wide text-sky-800">
            Travel Solutions
          </span>

          <h2 className="max-w-3xl text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
            Professional Travel Support for Complex Journeys
          </h2>

          <p className="max-w-3xl text-base leading-relaxed text-slate-600 sm:text-lg">
            We support travelers and businesses with air ticketing, visa-related
            travel documents, hotel reservations, and practical travel
            coordination for smoother journeys.
          </p>
        </div>

        <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_340px] lg:items-start">
          <div className="grid gap-4 sm:grid-cols-2">
            {travelSolutions.map(({ title, description, icon: Icon }) => (
              <article
                key={title}
                className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:border-cyan-300 hover:shadow-md"
              >
                <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-sky-100 to-cyan-100 text-sky-700 transition group-hover:from-sky-200 group-hover:to-cyan-200">
                  <Icon size={21} strokeWidth={2.2} />
                </div>
                <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  {description}
                </p>
              </article>
            ))}
          </div>

          <aside className="rounded-3xl border border-slate-200 bg-white/95 p-6 shadow-sm lg:sticky lg:top-28">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
              Journey Network
            </p>
            <h3 className="mt-2 text-xl font-semibold text-slate-900">
              Coordinated Travel Flow
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-slate-600">
              Structured travel support from planning to departure, with clearer
              coordination across tickets, documents, hotels, and timing.
            </p>

            <div className="mt-6 rounded-2xl border border-cyan-100 bg-gradient-to-br from-sky-50 via-white to-cyan-50 p-4">
              <div className="grid grid-cols-3 gap-2">
                <div className="h-2 rounded-full bg-sky-300" />
                <div className="h-2 rounded-full bg-cyan-300" />
                <div className="h-2 rounded-full bg-blue-300" />
              </div>
              <div className="mt-4 space-y-2">
                <div className="h-2 rounded-full bg-slate-200" />
                <div className="h-2 w-4/5 rounded-full bg-slate-200" />
                <div className="h-2 w-2/3 rounded-full bg-slate-200" />
              </div>
            </div>
          </aside>
        </div>
      </Container>
    </section>
  );
}
