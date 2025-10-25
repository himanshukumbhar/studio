import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FileText, MessageSquareText, Smile, Frown, Meh, Tags, KeyRound } from "lucide-react";
import React from "react";

const cardIconClasses = "h-6 w-6 text-muted-foreground";

export function MetadataCard({ title, description }: { title: string; description: string }) {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className={cardIconClasses} />
          Metadata
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h3 className="font-semibold text-sm mb-1">Title</h3>
          <p className="text-muted-foreground">{title}</p>
        </div>
        <div>
          <h3 className="font-semibold text-sm mb-1">Description</h3>
          <p className="text-muted-foreground">{description}</p>
        </div>
      </CardContent>
    </Card>
  );
}

export function SummaryCard({ summary }: { summary: string }) {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MessageSquareText className={cardIconClasses} />
          AI Summary
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">{summary}</p>
      </CardContent>
    </Card>
  );
}

const sentimentConfig = {
  positive: {
    Icon: Smile,
    label: 'Positive',
    colorClass: 'text-[hsl(var(--chart-2))]',
    description: "The overall sentiment of the content is positive."
  },
  negative: {
    Icon: Frown,
    label: 'Negative',
    colorClass: 'text-destructive',
    description: "The overall sentiment of the content is negative."
  },
  neutral: {
    Icon: Meh,
    label: 'Neutral',
    colorClass: 'text-muted-foreground',
    description: "The overall sentiment of the content is neutral."
  }
};

export function SentimentCard({ sentiment }: { sentiment: string }) {
  const sentimentKey = sentiment.toLowerCase() as keyof typeof sentimentConfig;
  const config = sentimentConfig[sentimentKey] || sentimentConfig.neutral;

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <config.Icon className={cardIconClasses} />
          Sentiment
        </CardTitle>
      </CardHeader>
      <CardContent className="text-center flex flex-col items-center justify-center pt-2">
        <config.Icon className={`h-20 w-20 mb-4 ${config.colorClass}`} />
        <p className={`text-2xl font-bold ${config.colorClass}`}>{config.label}</p>
        <p className="text-muted-foreground mt-2 text-sm">{config.description}</p>
      </CardContent>
    </Card>
  );
}

export function TopicsCard({ topics }: { topics: string[] }) {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Tags className={cardIconClasses} />
          Main Topics
        </CardTitle>
      </CardHeader>
      <CardContent>
        {topics.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {topics.map((topic) => (
              <Badge key={topic} variant="secondary">{topic}</Badge>
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground text-sm">No topics were identified.</p>
        )}
      </CardContent>
    </Card>
  );
}

export function KeywordsCard({ keywords }: { keywords: string[] }) {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <KeyRound className={cardIconClasses} />
          Generated Keywords
        </CardTitle>
      </CardHeader>
      <CardContent>
        {keywords.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {keywords.map((keyword) => (
              <Badge key={keyword} variant="outline">{keyword}</Badge>
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground text-sm">No keywords were generated.</p>
        )}
      </CardContent>
    </Card>
  );
}
