
'use server';
/**
 * @fileOverview A flow to generate a plugin idea based on a user's concept.
 *
 * - generatePluginIdea - A function that handles generating the plugin details.
 * - GeneratePluginIdeaInput - The input type for the function.
 * - GeneratePluginIdeaOutput - The return type for the function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const GeneratePluginIdeaInputSchema = z.object({
  concept: z.string().describe('A brief description of the plugin idea.'),
});
export type GeneratePluginIdeaInput = z.infer<typeof GeneratePluginIdeaInputSchema>;

const GeneratePluginIdeaOutputSchema = z.object({
  name: z.string().describe('A creative and catchy name for the plugin.'),
  description: z.string().describe('A detailed description of the plugin, including its main features and benefits.'),
  targetAudience: z.string().describe('The ideal target audience for this plugin.'),
  pricingStrategy: z.string().describe('A suggested pricing strategy (e.g., one-time fee, subscription, freemium).'),
});
export type GeneratePluginIdeaOutput = z.infer<typeof GeneratePluginIdeaOutputSchema>;

export async function generatePluginIdea(input: GeneratePluginIdeaInput): Promise<GeneratePluginIdeaOutput> {
  return generatePluginIdeaFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generatePluginIdeaPrompt',
  input: { schema: GeneratePluginIdeaInputSchema },
  output: { schema: GeneratePluginIdeaOutputSchema },
  prompt: `You are an expert product manager specializing in software plugins. Your task is to flesh out a plugin idea based on a user's concept.

  User's Concept:
  "{{{concept}}}"

  Based on this concept, generate the following:
  1.  **Name**: A creative, memorable, and relevant name for the plugin.
  2.  **Description**: A detailed paragraph explaining what the plugin does, its key features, and why it's valuable.
  3.  **Target Audience**: A clear description of the ideal user for this plugin (e.g., "Freelance web developers", "Marketing agencies", "Content creators").
  4.  **Pricing Strategy**: A simple, suggested pricing model. Examples: "One-time fee of $49", "Subscription starting at $15/month", "Freemium with a Pro plan at $99/year".

  Provide a well-structured and plausible output.
`,
});

const generatePluginIdeaFlow = ai.defineFlow(
  {
    name: 'generatePluginIdeaFlow',
    inputSchema: GeneratePluginIdeaInputSchema,
    outputSchema: GeneratePluginIdeaOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    if (!output) {
      throw new Error('AI failed to generate a plugin idea.');
    }
    return output;
  }
);
