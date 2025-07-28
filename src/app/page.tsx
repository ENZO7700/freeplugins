'use client';

import * as React from 'react';
import { IntroAnimation } from '@/components/intro-animation';
import { HeroSection } from '@/components/hero-section';
import { PluginList } from '@/components/plugin-list';
import { PageTransitionWrapper } from '@/components/page-transition-wrapper';

export default function Home() {
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2500); // 2.5s for intro
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <IntroAnimation isVisible={loading} />

      <div
        className={`flex-grow transition-opacity duration-1000 ${
          loading ? 'opacity-0' : 'opacity-100'
        }`}
      >
        <PageTransitionWrapper>
          <main>
            <HeroSection />
            <div className="container mx-auto px-4 py-8">
              <PluginList />
            </div>
          </main>
        </PageTransitionWrapper>
      </div>
    </div>
  );
}
