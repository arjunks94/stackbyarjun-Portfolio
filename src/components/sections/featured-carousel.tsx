"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, ExternalLink, Github } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import type { Project } from "@/types";

export function FeaturedCarousel({ projects }: { projects: Project[] }) {
  const [index, setIndex] = useState(0);
  const featured = projects.filter((p) => p.featured);

  const next = useCallback(() => {
    setIndex((i) => (i + 1) % featured.length);
  }, [featured.length]);

  const prev = useCallback(() => {
    setIndex((i) => (i - 1 + featured.length) % featured.length);
  }, [featured.length]);

  useEffect(() => {
    if (featured.length <= 1) return;
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [featured.length, next]);

  if (featured.length === 0) return null;

  const current = featured[index];

  return (
    <section className="relative py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-2xl glass">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.slug}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
              className="grid lg:grid-cols-2"
            >
              <div className="relative aspect-video overflow-hidden lg:aspect-auto lg:min-h-[400px]">
                <Image
                  src={current.coverImage}
                  alt={current.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />
              </div>
              <div className="flex flex-col justify-center p-8 lg:p-12">
                <p className="text-sm font-medium uppercase tracking-widest text-accent">
                  Featured Project
                </p>
                <h3 className="mt-2 font-display text-2xl font-bold lg:text-3xl">
                  {current.title}
                </h3>
                <p className="mt-4 text-muted">{current.description}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {current.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-md bg-secondary px-2 py-0.5 text-xs text-muted"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="mt-6 flex items-center gap-4">
                  {current.liveUrl && (
                    <a
                      href={current.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm text-accent hover:underline"
                    >
                      Live Demo <ExternalLink className="h-4 w-4" />
                    </a>
                  )}
                  {current.githubUrl && (
                    <a
                      href={current.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm text-muted hover:text-foreground"
                    >
                      <Github className="h-4 w-4" /> Source
                    </a>
                  )}
                  <Link
                    href={`/projects/${current.slug}`}
                    className="ml-auto text-sm text-accent hover:underline"
                  >
                    View details
                  </Link>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {featured.length > 1 && (
            <>
              <button
                onClick={prev}
                className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full glass p-2 text-foreground hover:bg-white/10"
                aria-label="Previous project"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                onClick={next}
                className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full glass p-2 text-foreground hover:bg-white/10"
                aria-label="Next project"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
              <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
                {featured.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setIndex(i)}
                    className={`h-2 rounded-full transition-all ${
                      i === index ? "w-6 bg-accent" : "w-2 bg-muted/50"
                    }`}
                    aria-label={`Go to slide ${i + 1}`}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
