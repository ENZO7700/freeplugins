
'use server';
/**
 * @fileOverview An AI flow to act as a helpful assistant for the plugin marketplace.
 *
 * - aiAssistant - A function that provides answers to user queries about plugins or blog posts.
 * - AiAssistantOutput - The return type for the aiAssistant function.
 */

import { ai } from '@/ai/genkit';
import { findPlugins } from '@/services/plugin-service';
import { getAllPosts, BlogPost } from '@/lib/blog-posts';
import { z } from 'genkit';

// Define the schema for the output of the recommendation flow.
const AiAssistantOutputSchema = z.object({
  answer: z.string().describe('A friendly and helpful answer to the user\'s query, formatted in plain text. If you recommend plugins or blog posts, list their names clearly. Do not use markdown.'),
});
export type AiAssistantOutput = z.infer<typeof AiAssistantOutputSchema>;

// Export the main function that will be called from the UI.
export async function aiAssistant(query: string): Promise<AiAssistantOutput> {
  return aiAssistantFlow(query);
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
    return findPlugins(query, category);
  }
);

// Define the tool that the AI can use to find blog posts.
const findBlogPostsTool = ai.defineTool(
  {
    name: 'findBlogPosts',
    description: 'Finds blog posts based on a search query. Can be used to answer questions about topics covered in the blog like SEO, marketing, security, etc.',
    inputSchema: z.object({
      query: z.string().describe('A search query to match against blog post titles, summaries, and content.'),
    }),
    outputSchema: z.array(z.object({
        title: z.string(),
        summary: z.string(),
        content: z.string(),
    })),
  },
  async ({ query }) => {
    const posts = getAllPosts();
    const lowercasedQuery = query.toLowerCase();
    const results = posts.filter(post => 
        post.title.toLowerCase().includes(lowercasedQuery) ||
        post.summary.toLowerCase().includes(lowercasedQuery) ||
        post.content.toLowerCase().includes(lowercasedQuery)
    );
    // Return a subset of the data to not overload the context
    return results.map(p => ({ title: p.title, summary: p.summary, content: p.content }));
  }
);

// Define the prompt for the AI.
const assistantPrompt = ai.definePrompt({
  name: 'assistantPrompt',
  // Provide the tools to the AI.
  tools: [findPluginsTool, findBlogPostsTool],
  // The system message guides the AI's behavior.
  system: `You are a friendly and knowledgeable assistant for an online plugin marketplace called Freeplugins.org.
Your goal is to help users find the perfect plugin for their needs or answer their questions based on the available blog posts.
- First, understand the user's request.
- If the user is looking for a plugin, use the findPlugins tool to search for relevant plugins by keywords or category.
- If the user is asking a question about a topic like SEO, marketing, security, or how to choose a plugin, use the findBlogPosts tool to find relevant articles.
- Based on the tool results, formulate a helpful answer.
- If you recommend plugins, list one or two of the best matches and briefly explain why each one is a good fit, including the name.
- If you are answering based on a blog post, summarize the key points from the article to answer the user's question. Mention the title of the article you are referencing.
- If you don't find any matching plugins or articles, politely inform the user and maybe suggest a broader search.
- Keep your answers concise, helpful, and friendly. Do not use markdown.
- Do not make up plugins or information. Only use information returned by the tools.
`,
});

// Define the main flow.
const aiAssistantFlow = ai.defineFlow(
  {
    name: 'aiAssistantFlow',
    inputSchema: z.string(),
    outputSchema: AiAssistantOutputSchema,
  },
  async (userQuery) => {
    // Call the AI model with the system prompt and the user's query.
    const llmResponse = await assistantPrompt(userQuery);
    
    // Extract the text content from the response.
    const answer = llmResponse.text;
    if (!answer) {
      throw new Error("The AI failed to generate a response.");
    }
    
    return { answer };
  }
);
