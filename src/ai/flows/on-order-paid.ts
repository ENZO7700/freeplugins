
'use server';
/**
 * @fileOverview A Cloud Function triggered on order payment to generate license keys.
 * This flow is intended to be triggered by a payment provider webhook or a Pub/Sub event.
 *
 * - onOrderPaid - Handles license key generation and email notification.
 * - OnOrderPaidInput - The input type for the function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import * as admin from 'firebase-admin';
import { v4 as uuidv4 } from 'uuid';

// Initialize Firebase Admin SDK if not already initialized
if (!admin.apps.length) {
  admin.initializeApp();
}

const firestore = admin.firestore();

// Define input schema for the flow
const OnOrderPaidInputSchema = z.object({
  orderId: z.string().describe('The ID of the paid order document in Firestore.'),
  userId: z.string().describe('The ID of the user who made the purchase.'),
  userEmail: z.string().email().describe("The user's email address for notifications."),
  items: z.array(
    z.object({
      pluginId: z.string().describe('The ID of the purchased plugin.'),
      name: z.string().describe('The name of the plugin.'),
    })
  ).describe('An array of items included in the order.'),
});

export type OnOrderPaidInput = z.infer<typeof OnOrderPaidInputSchema>;

// This flow simulates license key generation and sending an email.
// In a real application, you would integrate a service like SendGrid for emails.
const onOrderPaidFlow = ai.defineFlow(
  {
    name: 'onOrderPaidFlow',
    inputSchema: OnOrderPaidInputSchema,
    outputSchema: z.void(),
  },
  async (input) => {
    console.log(`Processing order: ${input.orderId}`);
    const batch = firestore.batch();

    // 1. Generate license keys for each item
    for (const item of input.items) {
      const licenseKey = `LKEY-${uuidv4().toUpperCase()}`;
      const licenseDocRef = firestore.collection('licenseKeys').doc();
      
      batch.set(licenseDocRef, {
        keyString: licenseKey,
        pluginId: item.pluginId,
        userId: input.userId,
        orderId: input.orderId,
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
        isActive: true,
      });

      console.log(`Generated license key for ${item.name}: ${licenseKey}`);
    }

    // 2. Commit the batch write to Firestore
    await batch.commit();
    console.log(`Successfully saved ${input.items.length} license keys for order ${input.orderId}.`);

    // 3. Send a confirmation email (simulation)
    // In a real-world scenario, you would use an email service provider like SendGrid.
    // The email would contain the license keys and download links.
    console.log(`
      =====================================================
      SIMULATING EMAIL TO: ${input.userEmail}
      =====================================================
      Subject: Your order #${input.orderId} is complete!

      Hi there,

      Thank you for your purchase. Here are your license keys and download links:
      
      ${input.items.map(item => `- ${item.name}: Download at /plugins/${item.pluginId}/download`).join('\n')}

      You can view all your licenses in your dashboard.

      Thanks,
      The SOFTW4R3 Team
      =====================================================
    `);
  }
);

// Export a wrapper function if you intend to call it from other server-side code.
export async function onOrderPaid(input: OnOrderPaidInput): Promise<void> {
  await onOrderPaidFlow(input);
}
