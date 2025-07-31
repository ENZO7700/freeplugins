
'use server';
/**
 * @fileOverview An AI flow to recommend plugins to users.
 *
 * - recommendPlugin - A function that provides plugin recommendations.
 * - RecommendPluginOutput - The return type for the recommendPlugin function.
 */

import { ai } from '@/ai/genkit';
import { findPlugins } from '@/services/plugin-service';
import { z } from 'genkit';

// Define the schema for the output of the recommendation flow.
const RecommendPluginOutputSchema = z.object({
  answer: z.string().describe('A friendly and helpful answer to the user\'s query, formatted in plain text. If you recommend plugins, list their names clearly. Do not use markdown.'),
});
export type RecommendPluginOutput = z.infer<typeof RecommendPluginOutputSchema>;

// Export the main function that will be called from the UI.
export async function recommendPlugin(query: string): Promise<RecommendPluginOutput> {
  return recommendPluginFlow(query);
}

// Define the tool that the AI can use to find plugins.
const findPluginsTool = ai.defineTool(
  {
    name: 'findPlugins',
    description: 'Finds available software plugins based on a search query or category.',
    inputSchema: z.object({
      query: z.string().optional().describe('A search query to match against plugin names and descriptions.'),
      category: z.string().optional().describe('A specific category to filter plugins by.'),
    }),
    outputSchema: z.array(z.object({
        name: z.string(),
        description: z.string(),
        category: z.string(),
        price: z.string(),
    })),
  },
  async ({ query, category }) => {
    // Call the actual service function to get the data.
    return findPlugins(query, category);
  }
);

// Define the prompt for the AI.
const recommendPluginPrompt = ai.definePrompt({
  name: 'recommendPluginPrompt',
  // Provide the findPluginsTool to the AI.
  tools: [findPluginsTool],
  // The system message guides the AI's behavior.
  system: `You are a friendly and knowledgeable assistant for an online plugin marketplace called Freeplugins.org.
Your goal is to help users find the perfect plugin for their needs.
- First, understand the user's request.
- Then, use the findPlugins tool to search for relevant plugins. You can search by keywords or by category.
- If you find relevant plugins, recommend one or two of the best matches. Briefly explain why each one is a good fit. Include the plugin's name.
- If you don't find any matching plugins, politely inform the user and maybe suggest a broader search.
- Keep your answers concise, helpful, and friendly. Do not use markdown.
- Do not make up plugins. Only recommend plugins that are found by the findPlugins tool.
`,
});

// Define the main flow.
const recommendPluginFlow = ai.defineFlow(
  {
    name: 'recommendPluginFlow',
    inputSchema: z.string(),
    outputSchema: RecommendPluginOutputSchema,
  },
  async (userQuery) => {
    // Call the AI model with the system prompt and the user's query.
    const llmResponse = await recommendPluginPrompt(userQuery);
    
    // Extract the text content from the response.
    const answer = llmResponse.text;
    if (!answer) {
      throw new Error("The AI failed to generate a response.");
    }
    
    return { answer };
  }
);
