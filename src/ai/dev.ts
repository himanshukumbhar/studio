import { config } from 'dotenv';
config();

import '@/ai/flows/extract-topics-from-url.ts';
import '@/ai/flows/determine-sentiment-of-url-content.ts';
import '@/ai/flows/summarize-url-content.ts';
import '@/ai/flows/generate-keywords-for-url.ts';