
'use client';

import * as React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export function HeroSection() {
  return (
    <section className="bg-background py-20 md:py-32">
      <div className="container mx-auto px-4 text-center max-w-4xl">
        <h2 className="text-4xl md:text-6xl font-bold font-headline tracking-tighter">
          The Ultimate Software Marketplace
        </h2>
        <p className="mt-6 text-lg md:text-xl text-muted-foreground">
          Find, share, and sell software plugins and tools that power your projects.
        </p>
        <div className="inline-block mt-8">
          <Button size="lg">
            Explore Plugins <ArrowRight className="ml-2" />
          </Button>
        </div>
      </div>
    </section>
  );
}
