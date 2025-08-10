
'use server';
/**
 * @fileOverview A flow to summarize the user's event vibe description.
 *
 * - summarizeVibe - A function that takes a description and returns a structured summary.
 * - SummarizeVibeInput - The input type for the summarizeVibe function.
 * - SummarizeVibeOutput - The return type for the summarizeVibe function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';

export const SummarizeVibeInputSchema = z.object({
  description: z.string().describe('The user\'s description of their desired event vibe.'),
});
export type SummarizeVibeInput = z.infer<typeof SummarizeVibeInputSchema>;

export const SummarizeVibeOutputSchema = z.object({
  colorScheme: z.string().describe('The color scheme for the event.'),
  themeStyle: z.string().describe('The overall theme or style of the event (e.g., vibrant and classy).'),
  flowers: z.string().describe('Specific flowers mentioned for floral arrangements.'),
  decor: z.string().describe('Specific decor items mentioned (e.g., glassware, table runners).'),
  lightingAmbiance: z.string().describe('The desired lighting and ambiance (e.g., moody lighting, candles).'),
  music: z.string().describe('The type of music to be played (e.g., live jazz trio).'),
  overallVibe: z.string().describe('A short summary of the overall feeling or vibe (e.g., luxurious yet welcoming).'),
});
export type SummarizeVibeOutput = z.infer<typeof SummarizeVibeOutputSchema>;

const summarizeVibePrompt = ai.definePrompt({
  name: 'summarizeVibePrompt',
  input: { schema: SummarizeVibeInputSchema },
  output: { schema: SummarizeVibeOutputSchema },
  prompt: `You are an expert event planner. A user has provided a description of the vibe they want for their event.
  Analyze the following description and extract the key details into a structured format.

  Description: {{{description}}}

  Extract the color scheme, theme/style, flowers, decor, lighting & ambiance, music, and the overall vibe.
  Provide a concise summary for each field based on the user's input.
  `,
});

const summarizeVibeFlow = ai.defineFlow(
  {
    name: 'summarizeVibeFlow',
    inputSchema: SummarizeVibeInputSchema,
    outputSchema: SummarizeVibeOutputSchema,
  },
  async (input) => {
    const { output } = await summarizeVibePrompt(input);
    return output!;
  }
);

export async function summarizeVibe(input: SummarizeVibeInput): Promise<SummarizeVibeOutput> {
  return summarizeVibeFlow(input);
}
