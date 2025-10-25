'use server';

/**
 * @fileOverview Generates a list of relevant keywords for a given URL's content using GenAI.
 *
 * - generateKeywordsForUrl - A function that generates keywords for a URL.
 * - GenerateKeywordsForUrlInput - The input type for the generateKeywordsForUrl function.
 * - GenerateKeywordsForUrlOutput - The return type for the generateKeywordsForUrl function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateKeywordsForUrlInputSchema = z.object({
  url: z.string().describe('The URL to extract keywords from.'),
  content: z.string().describe('The content of the URL.  This must be passed in, not fetched.'),
});
export type GenerateKeywordsForUrlInput = z.infer<typeof GenerateKeywordsForUrlInputSchema>;

const GenerateKeywordsForUrlOutputSchema = z.object({
  keywords: z.array(z.string()).describe('A list of relevant keywords for the URL.'),
});
export type GenerateKeywordsForUrlOutput = z.infer<typeof GenerateKeywordsForUrlOutputSchema>;

export async function generateKeywordsForUrl(input: GenerateKeywordsForUrlInput): Promise<GenerateKeywordsForUrlOutput> {
  return generateKeywordsForUrlFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateKeywordsForUrlPrompt',
  input: {schema: GenerateKeywordsForUrlInputSchema},
  output: {schema: GenerateKeywordsForUrlOutputSchema},
  prompt: `You are an SEO expert. Generate a list of keywords based on the content of the following URL.  The keywords should be relevant to the content and be useful for SEO purposes. Return a JSON array of strings.

Content: {{{content}}}`,
});

const generateKeywordsForUrlFlow = ai.defineFlow(
  {
    name: 'generateKeywordsForUrlFlow',
    inputSchema: GenerateKeywordsForUrlInputSchema,
    outputSchema: GenerateKeywordsForUrlOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
