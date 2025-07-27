'use client';

import * as React from 'react';
import { IntroAnimation } from '@/components/intro-animation';
import { Header } from '@/components/header';
import { HeroSection } from '@/components/hero-section';
import { PluginList } from '@/components/plugin-list';

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
        <Header />
        <main className="container mx-auto px-4 py-8">
          <HeroSection />
          <PluginList />
        </main>
      </div>
    </div>
  );
}
