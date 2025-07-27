'use client';

import * as React from 'react';
import { IntroAnimation } from '@/components/intro-animation';
import { Header } from '@/components/header';
import { HeroSection } from '@/components/hero-section';
import { PluginList } from '@/components/plugin-list';

export default function Home() {
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2500); // 2.5s for intro
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <IntroAnimation isVisible={loading} />

      <div
        className={`flex-grow transition-opacity duration-1000 ${
          loading ? 'opacity-0' : 'opacity-100'
        }`}
      >
        <Header />
        <main className="container mx-auto px-4 py-8">
          {error && <p className="text-destructive text-center mb-4">{error}</p>}
          <HeroSection />
          <PluginList />
        </main>
      </div>
    </div>
  );
}
