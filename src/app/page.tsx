'use client';

import * as React from 'react';
import { IntroAnimation } from '@/components/intro-animation';
import { Header } from '@/components/header';
import { HeroSection } from '@/components/hero-section';
import { AdaptiveUiController } from '@/components/adaptive-ui-controller';
import { useToast } from "@/hooks/use-toast";
import type { AdaptAnimationsToUserBehaviorOutput } from '@/ai/flows/adapt-animations-to-user-behavior';

export default function Home() {
  const [loading, setLoading] = React.useState(true);
  const [animationStyle, setAnimationStyle] = React.useState({});
  const [uiStyle, setUiStyle] = React.useState({});
  const { toast } = useToast();

  React.useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2500); // 2.5s for intro
    return () => clearTimeout(timer);
  }, []);

  const handleAdaptation = (
    result: AdaptAnimationsToUserBehaviorOutput
  ) => {
    setAnimationStyle(result.animationSettings);
    setUiStyle(result.uiElementAdjustments);
    toast({
      title: 'UI Adapted!',
      description: 'Animations and styles have been updated by AI.',
    });
  };

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
          <HeroSection animationStyle={animationStyle} uiStyle={uiStyle} />
        </main>
      </div>

      <AdaptiveUiController onAdapt={handleAdaptation} />
    </div>
  );
}
