'use client';

import * as React from 'react';
import useAdaptiveUiHook from '@/hooks/use-adaptive-ui';
import type { AdaptAnimationsToUserBehaviorOutput } from '@/ai/flows/adapt-animations-to-user-behavior';

type AnimationSpeed = 'fast' | 'medium' | 'slow';

interface AdaptiveUiContextType {
  settings: AdaptAnimationsToUserBehaviorOutput | null;
  animationSpeed: AnimationSpeed;
  loading: boolean;
}

const AdaptiveUiContext = React.createContext<AdaptiveUiContextType | undefined>(undefined);

export function AdaptiveUiProvider({ children }: { children: React.ReactNode }) {
  const { settings, loading } = useAdaptiveUiHook();
  
  const animationSpeed = settings?.animationSettings?.animationSpeed || 'medium';

  const value = {
    settings,
    animationSpeed,
    loading,
  };

  return (
    <AdaptiveUiContext.Provider value={value}>
      {children}
    </AdaptiveUiContext.Provider>
  );
}

export function useAdaptiveUi() {
  const context = React.useContext(AdaptiveUiContext);
  if (context === undefined) {
    throw new Error('useAdaptiveUi must be used within an AdaptiveUiProvider');
  }
  return context;
}
