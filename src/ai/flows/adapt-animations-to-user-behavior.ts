
'use server';
/**
 * @fileOverview A flow to adapt animations and UI elements based on user behavior.
 *
 * - adaptAnimationsToUserBehavior - A function that handles the adaptation of animations.
 * - AdaptAnimationsToUserBehaviorInput - The input type for the adaptAnimationsToUserBehavior function.
 * - AdaptAnimationsToUserBehaviorOutput - The return type for the adaptAnimationsToUserBehavior function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnimationSettingsSchema = z.object({
  animationSpeed: z.enum(['fast', 'medium', 'slow']).describe('The speed of animations.'),
  transitionEffect: z.string().describe('The type of transition effect, e.g., "fade", "slide".'),
  elementVisibility: z.string().describe('Controls the visibility of certain UI elements to reduce clutter.'),
});

const UiElementAdjustmentsSchema = z.object({
  fontSize: z.string().describe('The base font size, e.g., "16px".'),
  elementSpacing: z.string().describe('The spacing between UI elements, e.g., "10px".'),
  colorScheme: z.string().describe('The color scheme, e.g., "light", "dark", "high-contrast".'),
});


const AdaptAnimationsToUserBehaviorInputSchema = z.object({
  userActions: z
    .string()
    .describe(
      'A log of user actions, including clicks, scrolls, and other interactions.'
    ),
  deviceType: z.enum(['desktop', 'tablet', 'mobile']),
  networkSpeed: z.enum(['fast', 'medium', 'slow']),
});
export type AdaptAnimationsToUserBehaviorInput = z.infer<
  typeof AdaptAnimationsToUserBehaviorInputSchema
>;

const AdaptAnimationsToUserBehaviorOutputSchema = z.object({
  animationSettings: AnimationSettingsSchema.describe(
    'An object containing details such as animation speed, transition effects, and UI element visibility.'
  ),
  uiElementAdjustments: UiElementAdjustmentsSchema.describe(
    'An object containing details such as font size, element spacing, and color scheme.'
  ),
});
export type AdaptAnimationsToUserBehaviorOutput = z.infer<
  typeof AdaptAnimationsToUserBehaviorOutputSchema
>;

export async function adaptAnimationsToUserBehavior(
  input: AdaptAnimationsToUserBehaviorInput
): Promise<AdaptAnimationsToUserBehaviorOutput> {
  return adaptAnimationsToUserBehaviorFlow(input);
}

const prompt = ai.definePrompt({
  name: 'adaptAnimationsToUserBehaviorPrompt',
  input: {schema: AdaptAnimationsToUserBehaviorInputSchema},
  output: {schema: AdaptAnimationsToUserBehaviorOutputSchema},
  prompt: `You are an expert UI/UX designer who specializes in optimizing application performance and user experience.

  Based on the user's behavior, device type, and network speed, you will adapt the animations and UI elements of the application to ensure optimal performance and a personalized experience.

  User Actions: {{{userActions}}}
  Device Type: {{{deviceType}}}
  Network Speed: {{{networkSpeed}}}

  Consider the following:
  - For 'fast' networkSpeed on 'desktop', set animationSpeed to 'fast', fontSize to '16px' and elementSpacing to '12px'.
  - For 'medium' networkSpeed or 'tablet', set animationSpeed to 'medium', fontSize to '15px' and elementSpacing to '10px'.
  - For 'slow' networkSpeed or 'mobile', set animationSpeed to 'slow', fontSize to '14px' and elementSpacing to '8px'.
  - Always return 'fade' for transitionEffect and 'visible' for elementVisibility.
  - Return the animation settings and UI element adjustments as structured JSON objects.
`,
});

const adaptAnimationsToUserBehaviorFlow = ai.defineFlow(
  {
    name: 'adaptAnimationsToUserBehaviorFlow',
    inputSchema: AdaptAnimationsToUserBehaviorInputSchema,
    outputSchema: AdaptAnimationsToUserBehaviorOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    if (!output) {
      throw new Error('AI failed to generate adaptation settings.');
    }
    return output;
  }
);
