
'use server';
/**
 * @fileOverview A flow to simulate fetching affiliate statistics for a user.
 *
 * - getAffiliateStats - Fetches simulated affiliate data.
 * - AffiliateStatsOutput - The return type for the function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

// The output will be a summary of the affiliate's performance.
export const AffiliateStatsOutputSchema = z.object({
    clicks: z.number().describe('Total number of clicks on affiliate links.'),
    conversions: z.number().describe('Total number of successful conversions (purchases).'),
    totalEarnings: z.number().describe('Total earnings in USD.'),
    conversionRate: z.number().describe('The conversion rate from clicks to purchases (in percent).'),
});
export type AffiliateStatsOutput = z.infer<typeof AffiliateStatsOutputSchema>;


const getAffiliateStatsFlow = ai.defineFlow(
  {
    name: 'getAffiliateStatsFlow',
    inputSchema: z.void(),
    outputSchema: AffiliateStatsOutputSchema,
  },
  async () => {
    console.log('Simulating fetching of affiliate stats...');

    // SIMULATION: In a real app, this data would come from a database.
    const clicks = Math.floor(Math.random() * 2000) + 500; // 500 - 2500
    const conversions = Math.floor(clicks * (Math.random() * 0.05 + 0.01)); // 1% - 6% conversion rate
    const totalEarnings = parseFloat((conversions * (Math.random() * 15 + 5)).toFixed(2)); // $5 - $20 per conversion
    const conversionRate = parseFloat(((conversions / clicks) * 100).toFixed(2));

    return {
        clicks,
        conversions,
        totalEarnings,
        conversionRate,
    };
  }
);

// Export a wrapper function for server-side calls.
export async function getAffiliateStats(): Promise<AffiliateStatsOutput> {
    return await getAffiliateStatsFlow();
}
