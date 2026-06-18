"use client";

import { motion } from "framer-motion";
import { Briefcase } from "lucide-react";
import { FadeIn } from "@/components/animations/fade-in";
import { SectionHeader } from "@/components/ui/section-header";
import { formatDate } from "@/lib/utils";
import type { Experience } from "@/types";

export function ExperienceSection({ experience }: { experience: Experience[] }) {
  return (
    <section id="experience" className="relative bg-secondary/30 py-24 sm:py-32">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <SectionHeader
            label="Experience"
            title="Professional Journey"
            description="Building impactful solutions across diverse industries and teams."
          />
        </FadeIn>

        <div className="relative">
          <div className="absolute left-8 top-0 h-full w-px bg-gradient-to-b from-accent via-accent-secondary to-transparent md:left-1/2" />

          {experience.map((item, index) => (
            <FadeIn key={item.slug} delay={index * 0.1}>
              <div
                className={`relative mb-12 flex flex-col md:flex-row ${
                  index % 2 === 0 ? "md:flex-row-reverse" : ""
                }`}
              >
                <div className="hidden w-1/2 md:block" />
                <motion.div
                  whileInView={{ scale: [0, 1.2, 1] }}
                  viewport={{ once: true }}
                  className="absolute left-8 z-10 flex h-4 w-4 -translate-x-1/2 items-center justify-center rounded-full border-2 border-accent bg-background md:left-1/2"
                >
                  <Briefcase className="h-2 w-2 text-accent" />
                </motion.div>

                <div className="ml-16 w-full md:ml-0 md:w-1/2 md:px-8">
                  <div className="glass rounded-xl p-6 shadow-card transition-shadow hover:shadow-lift">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <h3 className="font-display text-lg font-semibold">{item.role}</h3>
                      {item.current && (
                        <span className="rounded-full bg-green-500/10 px-2 py-0.5 text-xs text-green-400">
                          Current
                        </span>
                      )}
                    </div>
                    <p className="mt-1 text-accent">{item.company}</p>
                    <p className="mt-1 text-sm text-muted">
                      {formatDate(item.startDate)} —{" "}
                      {item.current ? "Present" : formatDate(item.endDate)}
                    </p>
                    <p className="mt-1 text-xs text-muted">{item.location}</p>
                    <p className="mt-4 text-sm leading-relaxed text-muted">{item.description}</p>
                    {item.highlights.length > 0 && (
                      <ul className="mt-4 space-y-2">
                        {item.highlights.map((h) => (
                          <li key={h} className="flex items-start gap-2 text-sm text-muted">
                            <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-accent" />
                            {h}
                          </li>
                        ))}
                      </ul>
                    )}
                    <div className="mt-4 flex flex-wrap gap-2">
                      {item.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="rounded-md bg-secondary px-2 py-0.5 text-xs text-muted"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
