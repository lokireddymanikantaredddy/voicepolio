"use client";

import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { voiceNavigation } from '@/ai/flows/voice-navigation';
import { useSpeechRecognition } from '@/hooks/use-speech-recognition';
import { Mic, MicOff } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useEffect } from 'react';

export function VoiceButton() {
  const { toast } = useToast();

  const handleVoiceResult = async (command: string) => {
    if(!command) return;
    try {
      toast({ title: "Heard you!", description: `Processing: "${command}"` });
      const { navigationTarget } = await voiceNavigation({ voiceCommand: command });
      
      const targetId = navigationTarget.toLowerCase();
      const element = document.getElementById(targetId);
      
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        toast({ title: "Navigating...", description: `Going to ${navigationTarget}` });
      } else {
        toast({
          variant: "destructive",
          title: "Navigation failed",
          description: `Sorry, I couldn't find a section called "${navigationTarget}".`,
        });
      }
    } catch (e) {
      toast({
        variant: "destructive",
        title: "AI Error",
        description: "There was an error processing your voice command.",
      });
      console.error(e);
    }
  };

  const { isListening, startListening, stopListening, hasSupport } = useSpeechRecognition(handleVoiceResult);
  
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'v' && event.altKey) {
        event.preventDefault();
        if(isListening) {
          stopListening();
        } else {
          startListening();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isListening, startListening, stopListening]);


  if (!hasSupport) {
    return null;
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={isListening ? stopListening : startListening}
      aria-label={isListening ? 'Stop listening' : 'Start voice navigation (Alt+V)'}
      className={cn("relative", isListening && "text-destructive")}
    >
      {isListening ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
       {isListening && <span className="absolute h-3 w-3 rounded-full bg-destructive/80 top-1 right-1 animate-ping"></span>}
    </Button>
  );
}
