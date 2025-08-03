
'use server';
/**
 * @fileOverview A flow to convert text to speech.
 *
 * - generateAudioFromText - Converts a given text string to an audio data URI.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import wav from 'wav';
import { googleAI } from '@genkit-ai/googleai';

export async function generateAudioFromText(text: string): Promise<string> {
    return textToSpeechFlow(text);
}

// Helper function to convert PCM audio data to WAV format
async function toWav(
  pcmData: Buffer,
  channels = 1,
  rate = 24000, // Gemini TTS default sample rate
  sampleWidth = 2
): Promise<string> {
  return new Promise((resolve, reject) => {
    const writer = new wav.Writer({
      channels,
      sampleRate: rate,
      bitDepth: sampleWidth * 8,
    });

    const bufs: Buffer[] = [];
    writer.on('error', reject);
    writer.on('data', (d) => {
      bufs.push(d);
    });
    writer.on('end', () => {
      resolve(Buffer.concat(bufs).toString('base64'));
    });

    writer.write(pcmData);
    writer.end();
  });
}

const textToSpeechFlow = ai.defineFlow(
  {
    name: 'textToSpeechFlow',
    inputSchema: z.string(),
    outputSchema: z.string(),
  },
  async (text) => {
    // Generate the audio from the text using the TTS model
    const { media } = await ai.generate({
      model: googleAI.model('gemini-2.5-flash-preview-tts'),
      config: {
        responseModalities: ['AUDIO'],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: { voiceName: 'Algenib' }, // A standard male voice
          },
        },
      },
      prompt: text,
    });

    if (!media) {
      throw new Error('No audio media was returned from the AI model.');
    }

    // The audio data is a base64 string within a data URI, so we need to extract it
    const audioBuffer = Buffer.from(
      media.url.substring(media.url.indexOf(',') + 1),
      'base64'
    );
    
    // Convert the raw PCM buffer to a WAV buffer and then to a base64 string
    const wavBase64 = await toWav(audioBuffer);

    // Return the audio as a data URI that can be used in an <audio> element
    return `data:audio/wav;base64,${wavBase64}`;
  }
);
