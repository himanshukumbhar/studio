import { ShareButton } from './share-button';
import { Bot } from 'lucide-react';

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 flex items-center">
          <a className="mr-6 flex items-center space-x-2" href="/">
            <Bot className="h-6 w-6 text-primary" />
            <span className="font-bold">IDX Insights</span>
          </a>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-2">
            <ShareButton />
        </div>
      </div>
    </header>
  );
}
