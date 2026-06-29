"use client";

import React from "react";
import { motion, useTransform } from "framer-motion";

export function FloatingCard({ 
  children, 
  strength, 
  className, 
  smoothX, 
  smoothY, 
  setRef 
}: {
  children: React.ReactNode;
  strength: number;
  className: string;
  smoothX: any;
  smoothY: any;
  setRef?: (el: HTMLDivElement | null) => void;
}) {
  const cardX = useTransform(smoothX, (x: number) => x * strength * 80);
  const cardY = useTransform(smoothY, (y: number) => y * strength * 80);

  return (
    <motion.div
      ref={setRef}
      style={{ x: cardX, y: cardY }}
      className={`absolute glass-card px-5 py-3.5 rounded-2xl flex items-center gap-3 select-none pointer-events-auto transition-shadow hover:shadow-[0_12px_40px_rgba(255,255,255,0.06)] duration-500 ${className}`}
    >
      {children}
    </motion.div>
  );
}
