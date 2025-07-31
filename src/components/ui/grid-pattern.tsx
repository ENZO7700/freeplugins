
'use client';

import { useId, useRef, useState, useEffect, FC } from 'react';
import { motion, useAnimation, useMotionValue, useSpring } from 'framer-motion';
import { cn } from '@/lib/utils';

interface GridPatternProps {
  width?: number;
  height?: number;
  x?: number;
  y?: number;
  strokeDasharray?: any;
  interactive?: boolean;
  className?: string;
  [key: string]: any;
}

export function GridPattern({
  width = 40,
  height = 40,
  x = -1,
  y = -1,
  strokeDasharray = 0,
  interactive = false,
  className,
  ...props
}: GridPatternProps) {
  const id = useId();
  const containerRef = useRef<SVGSVGElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  const a = useAnimation();
  const mouseX = useSpring(0, { stiffness: 400, damping: 40 });
  const mouseY = useSpring(0, { stiffness: 400, damping: 40 });

  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setDimensions({ width: rect.width, height: rect.height });
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
    if (!interactive) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    mouseX.set(x);
    mouseY.set(y);
    a.start({
      opacity: 1,
      transition: {
        duration: 0.3,
      },
    });
  };

  const handleMouseLeave = () => {
    if (!interactive) return;
    a.start({
      opacity: 0,
      transition: {
        duration: 1,
      },
    });
  };

  return (
    <svg
      ref={containerRef}
      aria-hidden="true"
      className={cn(
        'pointer-events-none absolute inset-0 h-full w-full',
        className,
      )}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      <defs>
        <pattern
          id={id}
          width={width}
          height={height}
          patternUnits="userSpaceOnUse"
          x={x}
          y={y}
        >
          <path d={`M.5 ${height}V.5H${width}`} fill="none" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" strokeWidth={0} fill={`url(#${id})`} />
      {interactive && (
        <motion.g animate={a}>
          <motion.rect
            width={dimensions.width}
            height={dimensions.height}
            x={0}
            y={0}
            fill="transparent"
            style={{
              maskImage: `radial-gradient(300px at ${mouseX}px ${mouseY}px, white, transparent)`,
              WebkitMaskImage: `radial-gradient(300px at ${mouseX}px ${mouseY}px, white, transparent)`,
            }}
          >
            <rect width="100%" height="100%" strokeWidth={0} fill={`url(#${id})`} />
          </motion.rect>
        </motion.g>
      )}
    </svg>
  );
}

export default GridPattern;
