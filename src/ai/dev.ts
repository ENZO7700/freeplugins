
'use server';
import { config } from 'dotenv';
config();

import '@/ai/flows/generate-plugin-marketing-copy.ts';
import '@/ai/flows/generate-plugin-idea.ts';
import '@/ai/flows/generate-audio-from-text.ts';
import '@/ai/flows/generate-plugin-logo.ts';

