import { Container } from "@/components/ui";
import {
  Bot,
  Brain,
  CheckCircle2,
  MessageSquareText,
  Network,
  Route,
  UserCheck,
  Workflow,
} from "lucide-react";

const solutions = [
  { label: "AI Chatbot for Customer Support", icon: MessageSquareText },
  { label: "Lead Intake & Qualification", icon: UserCheck },
  { label: "Workflow Automation", icon: Workflow },
  { label: "Smart Task Routing", icon: Route },
  { label: "CRM & Follow-up Systems", icon: Network },
  { label: "Business Process Optimization", icon: Brain },
];

export default function AISolutionsSection() {
  return (
    <section
      id="ai-solutions"
      className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-cyan-950 py-20 text-slate-100"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -top-20 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-cyan-400/20 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-24 right-0 h-72 w-72 rounded-full bg-sky-500/15 blur-3xl"
      />

      <Container>
        <div className="grid gap-10 lg:grid-cols-2 lg:items-stretch">
          <div className="space-y-6">
            <span className="inline-flex rounded-full border border-cyan-300/30 bg-cyan-300/10 px-4 py-1.5 text-xs font-semibold tracking-wide text-cyan-100">
              AI & Automation
            </span>

            <h2 className="max-w-xl text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              Intelligent Systems That Reduce Manual Work
            </h2>

            <p className="max-w-2xl text-base leading-relaxed text-slate-300 sm:text-lg">
              We design AI-powered workflows that help businesses capture leads,
              respond faster, organize tasks, and improve daily operations with
              less repetitive work.
            </p>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-5 shadow-2xl shadow-cyan-900/20 backdrop-blur-sm">
              <div className="flex items-center gap-3">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-300/20 text-cyan-100">
                  <Bot size={20} strokeWidth={2.2} />
                </span>
                <div>
                  <p className="text-sm font-semibold text-slate-100">
                    AI Systems Layer
                  </p>
                  <p className="text-sm text-slate-300">
                    Connected automation for support, leads, and operations.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl shadow-cyan-900/20 backdrop-blur-sm sm:p-8">
            <div className="mb-5 flex items-center justify-between border-b border-white/10 pb-4">
              <h3 className="text-lg font-semibold text-white">
                AI Solution Checklist
              </h3>
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-cyan-300/20 text-cyan-100">
                <CheckCircle2 size={18} strokeWidth={2.3} />
              </span>
            </div>

            <ul className="grid gap-3 sm:grid-cols-2">
              {solutions.map(({ label, icon: Icon }) => (
                <li
                  key={label}
                  className="group rounded-2xl border border-white/10 bg-slate-900/40 px-4 py-4 transition hover:border-cyan-300/50 hover:bg-slate-900/70"
                >
                  <div className="flex items-start gap-3">
                    <span className="mt-0.5 inline-flex h-8 w-8 items-center justify-center rounded-lg bg-cyan-300/15 text-cyan-100 transition group-hover:bg-cyan-300/25">
                      <Icon size={16} strokeWidth={2.2} />
                    </span>
                    <p className="text-sm font-medium leading-relaxed text-slate-200">
                      {label}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}
