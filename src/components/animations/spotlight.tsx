"use client";

import { motion } from "framer-motion";
import { useMousePosition } from "@/hooks/use-client";

export function Spotlight() {
  const { x, y } = useMousePosition();

  return (
    <motion.div
      className="pointer-events-none fixed inset-0 z-30 transition-opacity duration-300"
      animate={{
        background: `radial-gradient(600px circle at ${x}px ${y}px, var(--spotlight), transparent 40%)`,
      }}
      transition={{ type: "tween", ease: "linear", duration: 0.15 }}
    />
  );
}
