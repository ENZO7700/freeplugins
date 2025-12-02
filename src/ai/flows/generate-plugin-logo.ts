
'use server';
/**
 * @fileOverview A flow to generate a logo for a plugin using an image generation model.
 *
 * - generatePluginLogo - A function that handles generating the logo.
 * - GeneratePluginLogoInput - The input type for the function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import { googleAI } from '@genkit-ai/googleai';

const GeneratePluginLogoInputSchema = z.object({
  name: z.string().describe('The name of the plugin.'),
  description: z.string().describe('A brief description of what the plugin does.'),
});
export type GeneratePluginLogoInput = z.infer<typeof GeneratePluginLogoInputSchema>;

export async function generatePluginLogo(input: GeneratePluginLogoInput): Promise<string> {
  return generatePluginLogoFlow(input);
}

const generatePluginLogoFlow = ai.defineFlow(
  {
    name: 'generatePluginLogoFlow',
    inputSchema: GeneratePluginLogoInputSchema,
    outputSchema: z.string(),
  },
  async ({ name, description }) => {
    console.log('Generating logo for:', name);

    const prompt = `Create a simple, modern, flat, minimalist logo for a software plugin named "${name}". 
    The plugin is for: "${description}". 
    The logo should be on a clean, solid background. Avoid text. It should be abstract and iconic.`;

    const { media } = await ai.generate({
      model: googleAI.model('imagen-4.0-fast-generate-001'),
      prompt: prompt,
    });

    if (!media || !media.url) {
      throw new Error('AI failed to generate a logo image.');
    }

    console.log('Logo generated successfully');
    return media.url; // Returns the data URI of the generated image
  }
);
