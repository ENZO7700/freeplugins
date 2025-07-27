'use client';

import { cn } from '@/lib/utils';

interface IntroAnimationProps {
  isVisible: boolean;
}

export function IntroAnimation({ isVisible }: IntroAnimationProps) {
  return (
    <div
      className={cn(
        'fixed inset-0 z-50 flex items-center justify-center bg-background transition-opacity duration-500 ease-out pointer-events-none',
        isVisible ? 'opacity-100' : 'opacity-0'
      )}
    >
      <div className="text-center">
        <h1 className="text-4xl md:text-6xl font-bold font-headline text-primary animate-glow opacity-0 animate-fade-in" style={{animationDelay: '0.2s'}}>
          Expresívny
        </h1>
        <h2 className="text-5xl md:text-7xl font-bold font-headline text-foreground opacity-0 animate-fade-in-up" style={{animationDelay: '0.6s'}}>
          Navigátor
        </h2>
      </div>
    </div>
  );
}
