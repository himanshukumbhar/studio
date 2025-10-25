'use server';

/**
 * @fileOverview Summarizes the content of a given URL using GenAI.
 *
 * - summarizeUrlContent - A function that takes a URL and returns a summary of the content.
 * - SummarizeUrlContentInput - The input type for the summarizeUrlContent function.
 * - SummarizeUrlContentOutput - The return type for the summarizeUrlContent function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeUrlContentInputSchema = z.object({
  url: z.string().url().describe('The URL to summarize.'),
  content: z.string().describe('The content of the URL.'),
});
export type SummarizeUrlContentInput = z.infer<typeof SummarizeUrlContentInputSchema>;

const SummarizeUrlContentOutputSchema = z.object({
  summary: z.string().describe('A summary of the content at the given URL.'),
});
export type SummarizeUrlContentOutput = z.infer<typeof SummarizeUrlContentOutputSchema>;

export async function summarizeUrlContent(input: SummarizeUrlContentInput): Promise<SummarizeUrlContentOutput> {
  return summarizeUrlContentFlow(input);
}

const summarizeUrlContentPrompt = ai.definePrompt({
  name: 'summarizeUrlContentPrompt',
  input: {schema: SummarizeUrlContentInputSchema},
  output: {schema: SummarizeUrlContentOutputSchema},
  prompt: `Summarize the content of the following URL.  Be concise and focus on the key points.\n\nContent: {{{content}}} `,
});

const summarizeUrlContentFlow = ai.defineFlow(
  {
    name: 'summarizeUrlContentFlow',
    inputSchema: SummarizeUrlContentInputSchema,
    outputSchema: SummarizeUrlContentOutputSchema,
  },
  async input => {
    const {output} = await summarizeUrlContentPrompt(input);
    return output!;
  }
);
