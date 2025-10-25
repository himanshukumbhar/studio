'use server';

/**
 * @fileOverview Extracts the main topics discussed in a URL's content using GenAI.
 *
 * - extractTopicsFromURL - A function that handles the topic extraction process.
 * - ExtractTopicsFromURLInput - The input type for the extractTopicsFromURL function.
 * - ExtractTopicsFromURLOutput - The return type for the extractTopicsFromURL function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ExtractTopicsFromURLInputSchema = z.object({
  url: z.string().url().describe('The URL to extract topics from.'),
  content: z.string().describe('The content of the URL.'),
});
export type ExtractTopicsFromURLInput = z.infer<typeof ExtractTopicsFromURLInputSchema>;

const ExtractTopicsFromURLOutputSchema = z.object({
  topics: z.array(z.string()).describe('The main topics discussed in the URL content.'),
});
export type ExtractTopicsFromURLOutput = z.infer<typeof ExtractTopicsFromURLOutputSchema>;

export async function extractTopicsFromURL(input: ExtractTopicsFromURLInput): Promise<ExtractTopicsFromURLOutput> {
  return extractTopicsFromURLFlow(input);
}

const prompt = ai.definePrompt({
  name: 'extractTopicsFromURLPrompt',
  input: {schema: ExtractTopicsFromURLInputSchema},
  output: {schema: ExtractTopicsFromURLOutputSchema},
  prompt: `You are an expert content analyzer. Your task is to identify the main topics discussed in the content of a given URL.

  URL: {{{url}}}
  Content: {{{content}}}

  Based on the content above, identify the key topics discussed. Return a list of topics.
  Ensure that topics are specific and concise.

  Topics:`,
});

const extractTopicsFromURLFlow = ai.defineFlow(
  {
    name: 'extractTopicsFromURLFlow',
    inputSchema: ExtractTopicsFromURLInputSchema,
    outputSchema: ExtractTopicsFromURLOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return {
      topics: output?.topics ?? [],
    };
  }
);
