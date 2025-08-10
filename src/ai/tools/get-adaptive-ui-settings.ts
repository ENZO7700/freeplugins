'use server';
/**
 * @fileOverview A tool to get adaptive UI settings based on device and network.
 * This replaces the previous AI flow to avoid hitting rate limits.
 *
 * - getAdaptiveUiSettings - A function that returns UI settings.
 * - AdaptiveUiSettingsInput - The input type for the function.
 * - AdaptiveUiSettingsOutput - The return type for the function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'zod';

const AnimationSettingsSchema = z.object({
  animationSpeed: z.enum(['fast', 'medium', 'slow']),
  transitionEffect: z.string(),
  elementVisibility: z.string(),
});

const UiElementAdjustmentsSchema = z.object({
  fontSize: z.string(),
  elementSpacing: z.string(),
  colorScheme: z.string(),
});

const AdaptiveUiSettingsInputSchema = z.object({
  deviceType: z.enum(['desktop', 'tablet', 'mobile']),
  networkSpeed: z.enum(['fast', 'medium', 'slow']),
});
export type AdaptiveUiSettingsInput = z.infer<
  typeof AdaptiveUiSettingsInputSchema
>;

const AdaptiveUiSettingsOutputSchema = z.object({
  animationSettings: AnimationSettingsSchema,
  uiElementAdjustments: UiElementAdjustmentsSchema,
});
export type AdaptiveUiSettingsOutput = z.infer<
  typeof AdaptiveUiSettingsOutputSchema
>;

/**
 * Provides adaptive UI settings based on simple business logic
 * instead of a full LLM call, to avoid rate-limiting issues.
 */
const getAdaptiveUiSettingsTool = ai.defineTool(
  {
    name: 'getAdaptiveUiSettingsTool',
    description:
      'Gets adaptive UI settings based on device type and network speed.',
    inputSchema: AdaptiveUiSettingsInputSchema,
    outputSchema: AdaptiveUiSettingsOutputSchema,
  },
  async ({deviceType, networkSpeed}) => {
    let animationSpeed: 'fast' | 'medium' | 'slow' = 'medium';
    let fontSize = '16px';
    let elementSpacing = '10px';

    if (networkSpeed === 'fast' && deviceType === 'desktop') {
      animationSpeed = 'fast';
      fontSize = '16px';
      elementSpacing = '12px';
    } else if (networkSpeed === 'slow' || deviceType === 'mobile') {
      animationSpeed = 'slow';
      fontSize = '14px';
      elementSpacing = '8px';
    } else {
      // Medium network or tablet
      animationSpeed = 'medium';
      fontSize = '15px';
      elementSpacing = '10px';
    }

    return {
      animationSettings: {
        animationSpeed,
        transitionEffect: 'fade',
        elementVisibility: 'visible',
      },
      uiElementAdjustments: {
        fontSize,
        elementSpacing,
        colorScheme: 'dark', // Default color scheme
      },
    };
  }
);

export async function getAdaptiveUiSettings(input: AdaptiveUiSettingsInput): Promise<AdaptiveUiSettingsOutput> {
    return await getAdaptiveUiSettingsTool(input);
}
