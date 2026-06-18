"use client";

import { motion } from "framer-motion";

export function SectionDivider() {
  return (
    <div className="relative flex items-center justify-center py-8">
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: [0.21, 0.47, 0.32, 0.98] }}
        className="h-px w-full max-w-md bg-gradient-to-r from-transparent via-accent/50 to-transparent"
      />
      <motion.div
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="absolute h-2 w-2 rounded-full bg-accent"
      />
    </div>
  );
}
