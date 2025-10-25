
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

    const [summaryResult, topicsResult, sentimentResult, keywordsResult] = await Promise.allSettled([
      summarizeUrlContent({ url: validatedUrl }),
      extractTopicsFromURL({ url: validatedUrl }),
      determineSentimentOfURLContent({ url: validatedUrl, content }),
      generateKeywordsForUrl({ url: validatedUrl, content })
    ]);

    const getResult = <T>(promiseSettledResult: PromiseSettledResult<T>): T | null => {
        if (promiseSettledResult.status === 'fulfilled') {
            return promiseSettledResult.value;
        }
        console.error('AI Flow failed:', promiseSettledResult.reason);
        return null;
    }

    const summary = getResult(summaryResult)?.summary ?? 'Could not generate summary.';
    const topics = getResult(topicsResult)?.topics ?? [];
    const sentiment = getResult(sentimentResult)?.sentiment ?? 'neutral';
    const keywords = getResult(keywordsResult)?.keywords ?? [];


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
    return { error: `An unexpected error occurred: ${error.message}`, url };
  }
}
