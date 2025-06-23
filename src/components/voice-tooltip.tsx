"use client";

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Mic, X } from 'lucide-react';

const TOOLTIP_STORAGE_KEY = 'voicefolio-tooltip-dismissed';

export function VoiceTooltip() {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const dismissed = localStorage.getItem(TOOLTIP_STORAGE_KEY);
    const timer = setTimeout(() => {
      if (!dismissed) {
        setIsVisible(true);
      }
    }, 2000); // Show tooltip after 2 seconds on first visit
    
    return () => clearTimeout(timer);
  }, []);

  const handleDismiss = () => {
    localStorage.setItem(TOOLTIP_STORAGE_KEY, 'true');
    setIsVisible(false);
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div className="fixed bottom-20 right-4 w-80 shadow-2xl rounded-lg border bg-popover p-4 text-popover-foreground z-50 animate-in fade-in-50 slide-in-from-bottom-5">
        <div className="grid gap-4">
        <div className="space-y-2">
            <h4 className="font-medium leading-none font-headline flex items-center gap-2">
                <Mic className="h-5 w-5 text-primary" />
                Try Voice Navigation!
            </h4>
            <p className="text-sm text-muted-foreground">
            Click the microphone icon or press <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">Alt</kbd> + <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">V</kbd> and say "Go to Projects".
            </p>
        </div>
        <Button variant="outline" size="sm" onClick={handleDismiss}>Got it</Button>
        <button
            className="absolute top-2 right-2 p-1 rounded-full text-muted-foreground hover:bg-muted"
            onClick={handleDismiss}
            aria-label="Dismiss"
        >
            <X className="h-4 w-4" />
        </button>
        </div>
    </div>
  );
}
