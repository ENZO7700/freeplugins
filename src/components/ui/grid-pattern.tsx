
"use client";

import { cn } from "@/lib/utils";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import React from "react";

export interface GridPatternProps {
  width?: number;
  height?: number;
  x?: number;
  y?: number;
  strokeDasharray?: any;
  numSquares?: number;
  className?: string;
  maxOpacity?: number;
  duration?: number;
  repeatDelay?: number;
}

export function GridPattern({
  width = 40,
  height = 40,
  x = -1,
  y = -1,
  strokeDasharray = 0,
  numSquares = 50,
  className,
  maxOpacity = 0.5,
  ...props
}: GridPatternProps) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function onMouseMove({ currentTarget, clientX, clientY }: any) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  const maskImage = useMotionTemplate`radial-gradient(250px at ${mouseX}px ${mouseY}px, white, transparent)`;
  const style = {
    maskImage,
    WebkitMaskImage: maskImage,
  };

  return (
    <div
      onMouseMove={onMouseMove}
      className={cn(
        "absolute inset-0 h-full w-full skew-y-12 overflow-hidden",
        className,
      )}
    >
      <div className="absolute inset-0 z-0 h-full w-full bg-background"></div>
      <motion.div
        className="absolute inset-0 z-10 h-full w-full bg-gradient-to-b from-primary/10 to-primary/20"
        style={style}
      />
      <svg
        width="100%"
        height="100%"
        className="absolute inset-0 z-0 h-full w-full"
      >
        <defs>
          <pattern
            id="grid"
            width={width}
            height={height}
            patternUnits="userSpaceOnUse"
            x={x}
            y={y}
          >
           <path
              d={`M.5 ${height}V.5H${width}`}
              fill="none"
              stroke="hsl(var(--border) / 0.2)"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>
    </div>
  );
}
