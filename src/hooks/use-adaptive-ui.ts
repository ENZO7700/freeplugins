
'use client';

import { useState, useEffect } from 'react';
import {
  getAdaptiveUiSettings,
  type AdaptiveUiSettingsOutput,
  type AdaptiveUiSettingsInput,
} from '@/ai/tools/get-adaptive-ui-settings';

export default function useAdaptiveUiHook() {
  const [settings, setSettings] = useState<AdaptiveUiSettingsOutput | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getAdaptedSettings = async () => {
      try {
        setLoading(true);
        // Simulate gathering user data
        const simulatedInput: AdaptiveUiSettingsInput = {
          deviceType: 'desktop' as const,
          networkSpeed: 'fast' as const,
        };

        // Use the more efficient tool instead of the rate-limited flow
        const result = await getAdaptiveUiSettings(simulatedInput);
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

    getAdaptedSettings();
  }, []);

  return { settings, loading };
}
