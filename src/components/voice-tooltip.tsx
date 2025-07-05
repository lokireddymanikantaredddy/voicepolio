"use client";

import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Mic, X } from 'lucide-react';

const TOOLTIP_STORAGE_KEY = 'voice-tooltip-dismissed';

export function VoiceTooltip() {
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const isDismissed = localStorage.getItem(TOOLTIP_STORAGE_KEY);
      setDismissed(!!isDismissed);
      if (!isDismissed) {
        const timer = setTimeout(() => {
          setDismissed(true);
          localStorage.setItem(TOOLTIP_STORAGE_KEY, 'true');
        }, 8000);
        return () => clearTimeout(timer);
      }
    }
  }, []);

  if (dismissed) return null;
  return (
    <div className="fixed bottom-4 right-4 bg-primary text-white px-4 py-2 rounded shadow-lg z-50">
      Try voice navigation! Click the mic icon and say a command.
    </div>
  );
}
