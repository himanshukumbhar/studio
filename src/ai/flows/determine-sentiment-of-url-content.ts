'use server';
/**
 * @fileOverview Determines the sentiment of the content of a URL using GenAI.
 *
 * - determineSentimentOfURLContent - A function that handles the sentiment analysis process.
 * - DetermineSentimentOfURLContentInput - The input type for the determineSentimentOfURLContent function.
 * - DetermineSentimentOfURLContentOutput - The return type for the determineSentimentOfURLContent function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const DetermineSentimentOfURLContentInputSchema = z.object({
  url: z.string().describe('The URL of the content to analyze.'),
  content: z.string().describe('The content of the URL.'),
});
export type DetermineSentimentOfURLContentInput = z.infer<typeof DetermineSentimentOfURLContentInputSchema>;

const DetermineSentimentOfURLContentOutputSchema = z.object({
  sentiment: z
    .string()
    .describe(
      'The overall sentiment expressed in the URL content (positive, negative, or neutral).'
    ),
});
export type DetermineSentimentOfURLContentOutput = z.infer<typeof DetermineSentimentOfURLContentOutputSchema>;

export async function determineSentimentOfURLContent(
  input: DetermineSentimentOfURLContentInput
): Promise<DetermineSentimentOfURLContentOutput> {
  return determineSentimentOfURLContentFlow(input);
}

const prompt = ai.definePrompt({
  name: 'determineSentimentOfURLContentPrompt',
  input: {schema: DetermineSentimentOfURLContentInputSchema},
  output: {schema: DetermineSentimentOfURLContentOutputSchema},
  prompt: `Determine the overall sentiment (positive, negative, or neutral) expressed in the following content:\n\nContent: {{{content}}}`,
});

const determineSentimentOfURLContentFlow = ai.defineFlow(
  {
    name: 'determineSentimentOfURLContentFlow',
    inputSchema: DetermineSentimentOfURLContentInputSchema,
    outputSchema: DetermineSentimentOfURLContentOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
