"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ExternalLink, Github, Search, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { FadeIn } from "@/components/animations/fade-in";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { SectionHeader } from "@/components/ui/section-header";
import { cn, normalizeDate } from "@/lib/utils";
import type { Project } from "@/types";

type SortOption = "newest" | "oldest" | "featured";

export function ProjectsSection({
  projects,
  technologies,
}: {
  projects: Project[];
  technologies: string[];
}) {
  const [search, setSearch] = useState("");
  const [techFilter, setTechFilter] = useState<string | null>(null);
  const [sort, setSort] = useState<SortOption>("newest");

  const filtered = useMemo(() => {
    let result = [...projects];

    if (search) {
      const q = search.toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.techStack.some((t) => t.toLowerCase().includes(q)),
      );
    }

    if (techFilter) {
      result = result.filter((p) => p.techStack.includes(techFilter));
    }

    switch (sort) {
      case "newest":
        result.sort((a, b) => normalizeDate(b.date).localeCompare(normalizeDate(a.date)));
        break;
      case "oldest":
        result.sort((a, b) => normalizeDate(a.date).localeCompare(normalizeDate(b.date)));
        break;
      case "featured":
        result.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
        break;
    }

    return result;
  }, [projects, search, techFilter, sort]);

  return (
    <section id="projects" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <SectionHeader
            label="Projects"
            title="Featured Work"
            description="Labs and practical work across security operations, infrastructure, and scripting."
          />
        </FadeIn>

        <FadeIn delay={0.1}>
          <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <Input
              icon
              placeholder="Search projects..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="max-w-md"
              aria-label="Search projects"
            />
            <div className="flex flex-wrap items-center gap-3">
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as SortOption)}
                className="glass rounded-lg border border-border bg-transparent px-4 py-2.5 text-sm text-foreground focus:border-accent/50 focus:outline-none"
                aria-label="Sort projects"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="featured">Featured</option>
              </select>
            </div>
          </div>

          <div className="mb-8 flex flex-wrap gap-2">
            <button
              onClick={() => setTechFilter(null)}
              className={cn(
                "rounded-full px-3 py-1.5 text-xs font-medium transition-all",
                !techFilter ? "bg-accent text-white" : "glass text-muted hover:text-foreground",
              )}
            >
              All
            </button>
            {technologies.map((tech) => (
              <button
                key={tech}
                onClick={() => setTechFilter(techFilter === tech ? null : tech)}
                className={cn(
                  "rounded-full px-3 py-1.5 text-xs font-medium transition-all",
                  techFilter === tech
                    ? "bg-accent text-white"
                    : "glass text-muted hover:text-foreground",
                )}
              >
                {tech}
              </button>
            ))}
          </div>
        </FadeIn>

        <motion.div layout className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filtered.map((project) => (
              <motion.div
                key={project.slug}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="group h-full overflow-hidden p-0" glow>
                  <div className="relative aspect-video overflow-hidden">
                    <Image
                      src={project.coverImage}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    {project.featured && (
                      <span className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-accent/90 px-2 py-1 text-xs font-medium text-white">
                        <Star className="h-3 w-3" />
                        Featured
                      </span>
                    )}
                  </div>
                  <div className="p-6">
                    <h3 className="font-display text-lg font-semibold text-foreground">
                      {project.title}
                    </h3>
                    <p className="mt-2 line-clamp-2 text-sm text-muted">{project.description}</p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {project.techStack.slice(0, 4).map((tech) => (
                        <span
                          key={tech}
                          className="rounded-md bg-secondary px-2 py-0.5 text-xs text-muted"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    <div className="mt-4 flex items-center gap-3">
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-muted hover:text-foreground"
                          aria-label={`${project.title} GitHub`}
                        >
                          <Github className="h-4 w-4" />
                        </a>
                      )}
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-muted hover:text-foreground"
                          aria-label={`${project.title} live demo`}
                        >
                          <ExternalLink className="h-4 w-4" />
                        </a>
                      )}
                      <Link
                        href={`/projects/${project.slug}`}
                        className="ml-auto text-sm text-accent hover:underline"
                      >
                        View details
                      </Link>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filtered.length === 0 && (
          <p className="py-12 text-center text-muted">
            <Search className="mx-auto mb-2 h-8 w-8 opacity-50" />
            No projects found matching your criteria.
          </p>
        )}
      </div>
    </section>
  );
}
