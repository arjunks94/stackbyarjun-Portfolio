"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export function PageLoader() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      onAnimationComplete={() => setVisible(false)}
      className="fixed inset-0 z-[200] flex items-center justify-center bg-background"
      aria-hidden="true"
    >
      <div className="flex flex-col items-center gap-4">
        <div className="h-10 w-10 animate-spin rounded-full border-2 border-border border-t-accent" />
        <p className="text-sm text-muted">Loading...</p>
      </div>
    </motion.div>
  );
}
