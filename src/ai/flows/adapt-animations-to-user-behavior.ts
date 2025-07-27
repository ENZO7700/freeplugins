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
  animationSpeed: z.enum(['fast', 'medium', 'slow']),
  transitionEffect: z.string(),
  elementVisibility: z.string(),
});

const UiElementAdjustmentsSchema = z.object({
  fontSize: z.string(),
  elementSpacing: z.string(),
  colorScheme: z.string(),
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
    'The animation settings, which should be a JSON object that includes details such as animation speed, transition effects, and UI element visibility.'
  ),
  uiElementAdjustments: UiElementAdjustmentsSchema.describe(
    'The UI element adjustments, which should be a JSON object that includes details such as font size, element spacing, and color scheme.'
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
  - High network speed and powerful devices should enable more complex and visually appealing animations.
  - Low network speed and less powerful devices should simplify animations to improve performance.
  - User behavior should inform UI element adjustments, such as font size and element spacing, to improve readability and ease of use.

  Return the animation settings and UI element adjustments as JSON objects.

  Example:
  {
    "animationSettings": {
      "animationSpeed": "fast",
      "transitionEffect": "fade",
      "elementVisibility": "visible"
    },
    "uiElementAdjustments": {
      "fontSize": "16px",
      "elementSpacing": "10px",
      "colorScheme": "light"
    }
  }

  Ensure the JSON objects are valid and contain appropriate values for the given context.
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
