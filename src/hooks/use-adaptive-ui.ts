
'use client';

import { useState, useEffect } from 'react';
import {
  adaptAnimationsToUserBehavior,
  type AdaptAnimationsToUserBehaviorOutput,
} from '@/ai/flows/adapt-animations-to-user-behavior';

export default function useAdaptiveUiHook() {
  const [settings, setSettings] = useState<AdaptAnimationsToUserBehaviorOutput | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getAdaptiveSettings = async () => {
      try {
        setLoading(true);
        // Simulate gathering user data
        const simulatedInput = {
          userActions: 'Clicked on 3 plugins, scrolled through category page.',
          deviceType: 'desktop' as const,
          networkSpeed: 'fast' as const,
        };

        const result = await adaptAnimationsToUserBehavior(simulatedInput);
        setSettings(result);
      } catch (error) {
        console.error('Failed to get adaptive UI settings:', error);
        // Fallback to default settings
        setSettings({
            animationSettings: {
                animationSpeed: "medium",
                transitionEffect: "fade",
                elementVisibility: "visible"
            },
            uiElementAdjustments: {
                fontSize: "16px",
                elementSpacing: "10px",
                colorScheme: "dark"
            }
        });
      } finally {
        setLoading(false);
      }
    };

    getAdaptiveSettings();
  }, []);

  return { settings, loading };
}
