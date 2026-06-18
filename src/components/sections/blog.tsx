"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Clock } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { FadeIn } from "@/components/animations/fade-in";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { SectionHeader } from "@/components/ui/section-header";
import { cn } from "@/lib/utils";
import { formatDate } from "@/lib/utils";
import type { BlogPost } from "@/types";

export function BlogSection({
  posts,
  categories,
  tags,
}: {
  posts: BlogPost[];
  categories: string[];
  tags: string[];
}) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<string | null>(null);
  const [tag, setTag] = useState<string | null>(null);

  const filtered = useMemo(() => {
    return posts.filter((p) => {
      const q = search.toLowerCase();
      const matchesSearch =
        !search ||
        p.title.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q);
      const matchesCategory = !category || p.category === category;
      const matchesTag = !tag || p.tags.includes(tag);
      return matchesSearch && matchesCategory && matchesTag;
    });
  }, [posts, search, category, tag]);

  return (
    <section id="blog" className="relative bg-secondary/30 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <SectionHeader
            label="Blog"
            title="Thoughts & Insights"
            description="Technical articles, tutorials, and industry perspectives."
          />
        </FadeIn>

        <FadeIn delay={0.1}>
          <div className="mb-8 space-y-4">
            <Input
              icon
              placeholder="Search articles..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="max-w-md"
              aria-label="Search blog posts"
            />
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setCategory(null)}
                className={cn(
                  "rounded-full px-3 py-1.5 text-xs font-medium transition-all",
                  !category ? "bg-accent text-white" : "glass text-muted hover:text-foreground",
                )}
              >
                All Categories
              </button>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategory(category === cat ? null : cat)}
                  className={cn(
                    "rounded-full px-3 py-1.5 text-xs font-medium transition-all",
                    category === cat
                      ? "bg-accent text-white"
                      : "glass text-muted hover:text-foreground",
                  )}
                >
                  {cat}
                </button>
              ))}
            </div>
            <div className="flex flex-wrap gap-2">
              {tags.slice(0, 12).map((t) => (
                <button
                  key={t}
                  onClick={() => setTag(tag === t ? null : t)}
                  className={cn(
                    "rounded-full px-3 py-1 text-xs transition-all",
                    tag === t
                      ? "bg-accent-secondary/20 text-accent-secondary"
                      : "text-muted hover:text-foreground",
                  )}
                >
                  #{t}
                </button>
              ))}
            </div>
          </div>
        </FadeIn>

        <motion.div layout className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filtered.map((post) => (
              <motion.div
                key={post.slug}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <Link href={`/blog/${post.slug}`}>
                  <Card className="group h-full overflow-hidden p-0" hover glow>
                    {post.coverImage && (
                      <div className="relative aspect-[16/9] overflow-hidden">
                        <Image
                          src={post.coverImage}
                          alt={post.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                          sizes="(max-width: 768px) 100vw, 33vw"
                        />
                      </div>
                    )}
                    <div className="p-6">
                      <div className="flex items-center gap-3 text-xs text-muted">
                        <span>{formatDate(post.date)}</span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {post.readingTime}
                        </span>
                      </div>
                      <h3 className="mt-2 font-display text-lg font-semibold group-hover:text-accent">
                        {post.title}
                      </h3>
                      <p className="mt-2 line-clamp-2 text-sm text-muted">{post.description}</p>
                      <div className="mt-4 flex flex-wrap gap-2">
                        {post.tags.slice(0, 3).map((t) => (
                          <span key={t} className="text-xs text-accent-secondary">
                            #{t}
                          </span>
                        ))}
                      </div>
                      <span className="mt-4 inline-flex items-center gap-1 text-sm text-accent">
                        Read more
                        <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
                      </span>
                    </div>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filtered.length === 0 && (
          <p className="py-12 text-center text-muted">No articles found.</p>
        )}
      </div>
    </section>
  );
}
