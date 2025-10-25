import { analyzeUrl, type AnalysisResult } from '@/app/actions';
import {
  MetadataCard,
  SummaryCard,
  SentimentCard,
  TopicsCard,
  KeywordsCard,
} from '@/components/analysis-cards';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertTriangle } from 'lucide-react';

export async function AnalysisDisplay({ url }: { url: string }) {
  const result = await analyzeUrl(url);

  if ('error' in result) {
    return (
      <div className="max-w-3xl mx-auto mt-8">
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Analysis Failed</AlertTitle>
          <AlertDescription>
            {result.error}
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-6">
      <div className="lg:col-span-2">
        <MetadataCard title={result.title} description={result.description} />
      </div>
      <div className="lg:col-span-4">
        <SummaryCard summary={result.summary} />
      </div>
      <div className="lg:col-span-2">
        <SentimentCard sentiment={result.sentiment} />
      </div>
      <div className="lg:col-span-4">
        <TopicsCard topics={result.topics} />
      </div>
      <div className="lg:col-span-6">
        <KeywordsCard keywords={result.keywords} />
      </div>
    </div>
  );
}
