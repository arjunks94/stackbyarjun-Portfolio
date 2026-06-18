"use client";

import { motion } from "framer-motion";
import { ArrowDown, Download, Mail, FolderOpen } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { AnimatedGrid } from "@/components/animations/animated-grid";
import { GradientOrbs } from "@/components/animations/gradient-orbs";
import { Spotlight } from "@/components/animations/spotlight";
import { MagneticButton } from "@/components/ui/magnetic-button";
import type { PersonalInfo } from "@/types";

export function HeroSection({ personal }: { personal: PersonalInfo }) {
  const [textIndex, setTextIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const texts = useMemo(
    () => (personal.introTexts.length > 0 ? personal.introTexts : [personal.tagline]),
    [personal.introTexts, personal.tagline],
  );

  useEffect(() => {
    const current = texts[textIndex % texts.length];
    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          if (displayText.length < current.length) {
            setDisplayText(current.slice(0, displayText.length + 1));
          } else {
            setTimeout(() => setIsDeleting(true), 2000);
          }
        } else {
          if (displayText.length > 0) {
            setDisplayText(displayText.slice(0, -1));
          } else {
            setIsDeleting(false);
            setTextIndex((i) => (i + 1) % texts.length);
          }
        }
      },
      isDeleting ? 40 : 80,
    );
    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, textIndex, texts]);

  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center justify-center overflow-hidden pt-[var(--header-height)]"
    >
      <AnimatedGrid />
      <GradientOrbs />
      <Spotlight />

      <div className="relative z-10 mx-auto max-w-7xl px-4 py-20 text-center sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
        >
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mb-4 text-sm font-medium uppercase tracking-[0.2em] text-accent"
          >
            Welcome to my portfolio
          </motion.p>

          <h1 className="font-display text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
            <span className="text-gradient">{personal.name}</span>
          </h1>

          <p className="mt-4 text-xl text-muted sm:text-2xl">{personal.title}</p>

          <div className="mt-6 flex h-8 items-center justify-center">
            <span className="font-mono text-lg text-accent sm:text-xl">
              {displayText}
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.8, repeat: Infinity }}
                className="ml-0.5 inline-block h-5 w-0.5 bg-accent"
              />
            </span>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-10 flex flex-wrap items-center justify-center gap-4"
          >
            <MagneticButton>
              <a
                href="#projects"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-accent to-accent-secondary px-8 py-3 text-base font-medium text-white shadow-glow hover:brightness-110"
              >
                <FolderOpen className="h-4 w-4" />
                View Projects
              </a>
            </MagneticButton>
            <MagneticButton>
              <a
                href={personal.resume}
                download
                className="glass inline-flex items-center justify-center gap-2 rounded-lg px-8 py-3 text-base font-medium text-foreground hover:bg-white/5"
              >
                <Download className="h-4 w-4" />
                Download Resume
              </a>
            </MagneticButton>
            <MagneticButton>
              <a
                href="#contact"
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-border px-8 py-3 text-base font-medium text-foreground hover:border-accent/50 hover:bg-accent/5"
              >
                <Mail className="h-4 w-4" />
                Contact
              </a>
            </MagneticButton>
          </motion.div>
        </motion.div>

        <motion.a
          href="#about"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-muted hover:text-foreground"
          aria-label="Scroll to about section"
        >
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity }}>
            <ArrowDown className="h-6 w-6" />
          </motion.div>
        </motion.a>
      </div>
    </section>
  );
}
