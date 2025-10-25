'use client';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Share2, Link as LinkIcon } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

export function ShareButton() {
  const { toast } = useToast();
  const [currentUrl, setCurrentUrl] = useState('');

  useEffect(() => {
    // This code runs only on the client, after hydration
    setCurrentUrl(window.location.href);
  }, []);

  const copyLink = () => {
    if (!currentUrl) return;
    navigator.clipboard.writeText(currentUrl).then(() => {
      toast({
        title: "Link Copied!",
        description: "The analysis URL has been copied to your clipboard.",
      });
    }).catch(err => {
        console.error("Failed to copy: ", err);
        toast({
            variant: "destructive",
            title: "Failed to Copy",
            description: "Could not copy the link to your clipboard.",
        });
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          <Share2 className="mr-0 sm:mr-2 h-4 w-4" />
          <span className="hidden sm:inline">Share</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={copyLink} disabled={!currentUrl}>
          <LinkIcon className="mr-2 h-4 w-4" />
          <span>Copy Link</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
