"use client";

import { motion } from "framer-motion";
import { useScrollProgress } from "@/hooks/use-client";

export function ScrollProgress() {
  const progress = useScrollProgress();

  return (
    <motion.div
      className="fixed left-0 top-0 z-[100] h-[2px] origin-left bg-gradient-to-r from-accent to-accent-secondary"
      style={{ width: `${progress * 100}%` }}
    />
  );
}
