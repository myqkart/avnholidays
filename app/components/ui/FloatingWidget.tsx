"use client";

import React from "react";
import { motion, useTransform } from "framer-motion";

export function FloatingWidget({ 
  children, 
  strength, 
  className, 
  smoothX, 
  smoothY 
}: {
  children: React.ReactNode;
  strength: number;
  className: string;
  smoothX: any;
  smoothY: any;
}) {
  const widgetX = useTransform(smoothX, (x: number) => x * strength * 60);
  const widgetY = useTransform(smoothY, (y: number) => y * strength * 60);

  return (
    <motion.div
      style={{ x: widgetX, y: widgetY }}
      className={`absolute glass-panel px-4 py-2.5 rounded-xl flex items-center gap-2.5 select-none pointer-events-auto border border-white/5 shadow-lg animate-float-slow ${className}`}
    >
      {children}
    </motion.div>
  );
}
