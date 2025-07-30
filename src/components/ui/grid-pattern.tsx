
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
  strokeDasharray = 4,
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

  const squares = React.useMemo(() => {
    return Array.from({ length: numSquares }).map((_, i) => {
      const col = Math.floor(i / (Math.sqrt(numSquares)));
      const row = i % Math.floor(Math.sqrt(numSquares));
      return (
        <rect
            key={i}
            width={width}
            height={height}
            x={col * width}
            y={row * height}
            strokeDasharray={strokeDasharray}
            {...props}
        />
      )
    });
  }, [width, height, numSquares, strokeDasharray, props]);

  return (
    <div
      onMouseMove={onMouseMove}
      className={cn(
        "absolute inset-0 h-full w-full skew-y-12 overflow-hidden",
        className,
      )}
    >
      <div className="absolute inset-0 z-0 h-full w-full bg-gradient-to-b from-background/90 to-background"></div>
      <motion.div
        className="absolute inset-0 z-10 h-full w-full bg-gradient-to-b from-primary/20 to-primary/5"
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
              stroke="hsl(var(--border) / 0.5)"
              strokeDasharray={strokeDasharray}
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>
    </div>
  );
}
