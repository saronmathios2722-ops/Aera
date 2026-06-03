"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  hover?: boolean;
}

export default function GlassCard({ children, className = "", delay = 0, hover = false }: GlassCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={hover ? { 
        y: -12, 
        transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } 
      } : undefined}
      transition={{
        duration: 1.4,
        delay,
        ease: [0.16, 1, 0.3, 1]
      }}
      className={`backdrop-blur-2xl bg-white/20 border border-white/40 rounded-[3rem] shadow-soft p-10 transition-shadow duration-700 ${hover ? 'hover:shadow-floating hover:bg-white/30' : ''} ${className}`}
    >
      {children}
    </motion.div>
  );
}
