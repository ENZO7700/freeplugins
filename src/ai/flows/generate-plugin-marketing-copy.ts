'use server';
/**
 * @fileOverview A flow to generate marketing copy for a plugin.
 *
 * - generatePluginMarketingCopy - A function that handles generating the copy.
 * - GeneratePluginMarketingCopyInput - The input type for the function.
 * - GeneratePluginMarketingCopyOutput - The return type for the function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GeneratePluginMarketingCopyInputSchema = z.object({
  name: z.string().describe('The name of the plugin.'),
  description: z.string().describe('The description of the plugin.'),
  category: z.string().describe('The category of the plugin.'),
});
export type GeneratePluginMarketingCopyInput = z.infer<
  typeof GeneratePluginMarketingCopyInputSchema
>;

const GeneratePluginMarketingCopyOutputSchema = z.object({
    copy: z.string().describe('The generated marketing copy, optimized for social media.')
});
export type GeneratePluginMarketingCopyOutput = z.infer<
  typeof GeneratePluginMarketingCopyOutputSchema
>;

export async function generatePluginMarketingCopy(
  input: GeneratePluginMarketingCopyInput
): Promise<GeneratePluginMarketingCopyOutput> {
  return generatePluginMarketingCopyFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generatePluginMarketingCopyPrompt',
  input: {schema: GeneratePluginMarketingCopyInputSchema},
  output: {schema: GeneratePluginMarketingCopyOutputSchema},
  prompt: `You are a marketing expert specializing in software plugins. Your task is to generate a short, punchy, and engaging marketing copy for a plugin. The copy should be suitable for social media posts (e.g., Twitter, LinkedIn).

  Plugin Details:
  - Name: {{{name}}}
  - Category: {{{category}}}
  - Description: {{{description}}}

  Generate a compelling marketing copy that highlights the key benefit of the plugin and includes a call to action. Keep it concise and under 280 characters. Use emojis to make it more engaging.
`,
});

const generatePluginMarketingCopyFlow = ai.defineFlow(
  {
    name: 'generatePluginMarketingCopyFlow',
    inputSchema: GeneratePluginMarketingCopyInputSchema,
    outputSchema: GeneratePluginMarketingCopyOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    if (!output) {
      throw new Error('AI failed to generate marketing copy.');
    }
    return output;
  }
);
