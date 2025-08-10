
'use server';
import { config } from 'dotenv';
config();

// This file is used for production deployment, and it should
// import all the flows that are used in the application.
import '@/ai/flows/generate-plugin-marketing-copy.ts';
import '@/ai/flows/on-order-paid.ts';
import '@/ai/flows/calculate-affiliate-payouts.ts';
import '@/ai/flows/generate-plugin-idea.ts';
import '@/ai/flows/generate-audio-from-text.ts';
import '@/ai/flows/generate-plugin-logo.ts';
import '@/ai/flows/get-affiliate-stats.ts';
import '@/ai/tools/get-adaptive-ui-settings.ts';
