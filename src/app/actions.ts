
'use server';

import { determineSentimentOfURLContent } from "@/ai/flows/determine-sentiment-of-url-content";
import { extractTopicsFromURL } from "@/ai/flows/extract-topics-from-url";
import { generateKeywordsForUrl } from "@/ai/flows/generate-keywords-for-url";
import { summarizeUrlContent } from "@/ai/flows/summarize-url-content";
import { extractFromUrl } from "@/services/url-extraction";

export type AnalysisResult = {
  url: string;
  title: string;
  description: string;
  summary: string;
  topics: string[];
  sentiment: string;
  keywords: string[];
};

export type AnalysisError = {
  error: string;
  url: string;
};

export async function analyzeUrl(url: string): Promise<AnalysisResult | AnalysisError> {
  try {
    const validatedUrl = new URL(url).toString();

    const { title, description, content } = await extractFromUrl(validatedUrl);

    if (!content) {
      return { error: 'Could not extract content from the URL.', url: validatedUrl };
    }
    
    // Run AI flows sequentially to avoid rate limiting on the free tier.
    const summary = (await summarizeUrlContent({ url: validatedUrl }))?.summary ?? 'Could not generate summary.';
    const topics = (await extractTopicsFromURL({ url: validatedUrl }))?.topics ?? [];
    const sentiment = (await determineSentimentOfURLContent({ url: validatedUrl, content }))?.sentiment ?? 'neutral';
    const keywords = (await generateKeywordsForUrl({ url: validatedUrl, content }))?.keywords ?? [];

    return {
      url: validatedUrl,
      title,
      description,
      summary,
      topics,
      sentiment,
      keywords,
    };
  } catch (error: any) {
    console.error('Error analyzing URL:', error);
    if (error.code === 'ERR_INVALID_URL') {
        return { error: 'The provided URL is invalid. Please enter a valid URL.', url };
    }
    // Check for rate limit error
    if (error.message && error.message.includes('429')) {
      return { error: 'API rate limit exceeded. Please wait a moment and try again.', url };
    }
    return { error: `An unexpected error occurred: ${error.message}`, url };
  }
}
