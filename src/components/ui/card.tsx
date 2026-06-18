"use client";

import { motion } from "framer-motion";
import { forwardRef } from "react";
import { cn } from "@/lib/utils";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  glow?: boolean;
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, children, hover = true, glow = false }, ref) => {
    const classes = cn(
      "glass rounded-xl p-6 shadow-card",
      hover && "transition-shadow duration-300 hover:shadow-lift",
      glow && "hover:shadow-glow",
      className,
    );

    if (!hover) {
      return (
        <div ref={ref} className={classes}>
          {children}
        </div>
      );
    }

    return (
      <motion.div
        ref={ref}
        whileHover={{ y: -6, transition: { duration: 0.3 } }}
        className={classes}
      >
        {children}
      </motion.div>
    );
  },
);

Card.displayName = "Card";
