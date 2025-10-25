import { Suspense } from 'react';
import { Header } from '@/components/header';
import { UrlForm } from '@/components/url-form';
import { AnalysisDisplay } from '@/components/analysis-display';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export default function Page({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const url = typeof searchParams?.url === 'string' ? searchParams.url : 'https://idx.google.com/studio-5437385302';

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8 md:py-12">
        <section className="max-w-3xl mx-auto text-center mb-12">
          <h1 className="text-3xl md:text-5xl font-bold font-headline mb-4 bg-gradient-to-r from-primary to-purple-400 text-transparent bg-clip-text">
            IDX Insights
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Uncover the secrets of any webpage. Enter a URL to get an AI-powered analysis of its content, topics, sentiment, and more.
          </p>
        </section>

        <UrlForm initialUrl={url} />
        
        <Suspense key={url} fallback={<AnalysisSkeleton />}>
          <AnalysisDisplay url={url} />
        </Suspense>
      </main>
      <footer className="py-4 text-center text-muted-foreground text-sm">
        <p>Powered by Google AI & Firebase</p>
      </footer>
    </div>
  );
}

function AnalysisSkeleton() {
  return (
    <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3 animate-pulse">
      <Card>
        <CardHeader><Skeleton className="h-6 w-1/2" /></CardHeader>
        <CardContent className="space-y-4">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
          <Skeleton className="h-4 w-3/4" />
        </CardContent>
      </Card>
      <Card className="md:col-span-2">
        <CardHeader><Skeleton className="h-6 w-1/3" /></CardHeader>
        <CardContent className="space-y-4">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
        </CardContent>
      </Card>
      <Card>
        <CardHeader><Skeleton className="h-6 w-1/2" /></CardHeader>
        <CardContent className="flex items-center justify-center pt-6">
          <Skeleton className="h-24 w-24 rounded-full" />
        </CardContent>
      </Card>
       <Card>
        <CardHeader><Skeleton className="h-6 w-1/2" /></CardHeader>
        <CardContent className="flex flex-wrap gap-2 pt-6">
          <Skeleton className="h-6 w-20 rounded-full" />
          <Skeleton className="h-6 w-24 rounded-full" />
          <Skeleton className="h-6 w-16 rounded-full" />
          <Skeleton className="h-6 w-28 rounded-full" />
        </CardContent>
      </Card>
       <Card>
        <CardHeader><Skeleton className="h-6 w-1/2" /></CardHeader>
        <CardContent className="flex flex-wrap gap-2 pt-6">
          <Skeleton className="h-6 w-24 rounded-full" />
          <Skeleton className="h-6 w-16 rounded-full" />
          <Skeleton className="h-6 w-28 rounded-full" />
          <Skeleton className="h-6 w-20 rounded-full" />
        </CardContent>
      </Card>
    </div>
  )
}
