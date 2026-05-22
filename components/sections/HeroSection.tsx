"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { BrandLogo, Container } from "@/components/ui";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="relative overflow-hidden bg-[radial-gradient(circle_at_10%_10%,rgba(56,189,248,0.14),transparent_45%),radial-gradient(circle_at_90%_15%,rgba(14,165,233,0.14),transparent_40%),linear-gradient(180deg,#f8fbff_0%,#eef6ff_52%,#f6faff_100%)] pt-18 pb-14 sm:pt-24 sm:pb-20"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-cyan-300/25 blur-3xl" />
        <div className="absolute right-0 bottom-0 h-56 w-56 translate-x-1/4 translate-y-1/4 rounded-full bg-sky-300/25 blur-3xl" />
      </div>

      <Container className="relative">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-14">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            transition={{ duration: 0.55, ease: "easeOut" }}
            className="space-y-7"
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-sky-200 bg-white/80 px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-sky-700 shadow-sm backdrop-blur">
              <Sparkles size={14} />
              Elevation of Future Journeys
            </span>

            <div className="space-y-4">
              <h1 className="max-w-2xl text-4xl font-semibold leading-tight tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
                Elevating Future Journeys with Travel, Technology & AI
              </h1>
              <p className="max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">
                Siam On Cloud combines air ticketing, travel services, AI automation, and digital solutions to help
                businesses and travelers move faster, smarter, and more confidently.
              </p>
            </div>

            <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:items-center">
              <Link
                href="#services"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-700"
              >
                Explore Services
                <ArrowUpRight size={16} />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white/85 px-6 py-3 text-sm font-semibold text-slate-800 transition hover:border-slate-400 hover:bg-white"
              >
                Contact Us
              </Link>
            </div>

            <div className="space-y-1 border-l-2 border-sky-200 pl-4 pt-1">
              <p className="text-sm font-medium text-slate-800">Elevation of Future Journeys</p>
              <p className="text-sm text-slate-600">ยกระดับการเดินทางแห่งอนาคต</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.12, ease: "easeOut" }}
            className="relative mx-auto w-full max-w-xl"
          >
            <div className="rounded-3xl border border-white/60 bg-white/65 p-5 shadow-[0_25px_70px_-35px_rgba(2,132,199,0.55)] backdrop-blur-xl sm:p-7">
              <div className="rounded-2xl border border-sky-100 bg-gradient-to-br from-slate-900 to-sky-900 p-6 text-white sm:p-7">
                <BrandLogo variant="light" className="mb-5 max-w-[18rem]" />

                <div className="mt-6 grid grid-cols-2 gap-3 text-xs sm:text-sm">
                  <div className="rounded-xl border border-white/15 bg-white/10 px-3 py-2">AI-Driven Operations</div>
                  <div className="rounded-xl border border-white/15 bg-white/10 px-3 py-2">Smart Travel Services</div>
                  <div className="rounded-xl border border-white/15 bg-white/10 px-3 py-2">Digital Enablement</div>
                  <div className="rounded-xl border border-white/15 bg-white/10 px-3 py-2">Enterprise Reliability</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
