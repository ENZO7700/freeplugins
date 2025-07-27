'use client';

import * as React from 'react';
import { IntroAnimation } from '@/components/intro-animation';
import { Header } from '@/components/header';
import { HeroSection } from '@/components/hero-section';
import { PluginList } from '@/components/plugin-list';
import {
  adaptAnimationsToUserBehavior,
  type AdaptAnimationsToUserBehaviorOutput,
} from '@/ai/flows/adapt-animations-to-user-behavior';

type AnimationSettings = AdaptAnimationsToUserBehaviorOutput['animationSettings'];
type UiElementAdjustments = AdaptAnimationsToUserBehaviorOutput['uiElementAdjustments'];

export default function Home() {
  const [loading, setLoading] = React.useState(true);
  const [animationStyle, setAnimationStyle] = React.useState<AnimationSettings | undefined>();
  const [uiStyle, setUiStyle] = React.useState<UiElementAdjustments | undefined>();
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2500); // 2.5s for intro

    const getAdaptiveStyles = async () => {
      try {
        // @ts-ignore-next-line
        const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
        const networkSpeed = connection?.effectiveType.includes('4g') ? 'fast' : connection?.effectiveType.includes('3g') ? 'medium' : 'slow';
        const deviceType = window.innerWidth > 1024 ? 'desktop' : window.innerWidth > 768 ? 'tablet' : 'mobile';

        const result = await adaptAnimationsToUserBehavior({
          userActions: 'Initial load',
          deviceType,
          networkSpeed,
        });
        
        setAnimationStyle(result.animationSettings);
        setUiStyle(result.uiElementAdjustments);

      } catch (err) {
        console.error('Failed to adapt UI:', err);
        setError('Could not dynamically adapt UI.');
      }
    };

    getAdaptiveStyles();
    
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
          <HeroSection animationStyle={animationStyle} uiStyle={uiStyle} />
          <PluginList />
        </main>
      </div>
    </div>
  );
}
