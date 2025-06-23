"use client";

import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { voiceNavigation } from '@/ai/flows/voice-navigation';
import { useSpeechRecognition } from '@/hooks/use-speech-recognition';
import { Mic, MicOff } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useEffect, useCallback, useRef } from 'react';
import { projects } from '@/lib/data';
import { useTheme } from './theme-provider';

export function VoiceButton() {
  const { toast } = useToast();
  const { theme, setTheme } = useTheme();
  const handleVoiceResultRef = useRef<(command: string) => Promise<void>>();

  const { isListening, startListening, stopListening, hasSupport, error } = useSpeechRecognition(
    (command) => {
      if (handleVoiceResultRef.current) {
        handleVoiceResultRef.current(command);
      }
    }
  );

  const handleVoiceResult = useCallback(async (command: string) => {
    if (!command) return;
    toast({ title: "Heard you!", description: `Processing: "${command}"` });
    
    try {
      const projectTitles = projects.map(p => p.title);
      const { action, target, linkType } = await voiceNavigation({ voiceCommand: command, projectTitles });

      switch (action) {
        case 'navigate': {
          const element = document.getElementById(target);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
            toast({ title: "Navigating...", description: `Going to ${target}` });
          } else {
             toast({
              variant: "destructive",
              title: "Navigation failed",
              description: `Sorry, I couldn't find a section called "${target}".`,
            });
          }
          break;
        }
        case 'click': {
          const element = document.getElementById(target);
          if (element) {
            element.click();
            toast({ title: "Action completed!", description: `Flipping card.` });
          } else {
             toast({
              variant: "destructive",
              title: "Action failed",
              description: `Could not find element to click: "${target}".`,
            });
          }
          break;
        }
        case 'stopListening':
          stopListening();
          toast({ title: "Ok", description: "Microphone off." });
          break;
        case 'changeTheme': {
          const newTheme = theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches) ? 'light' : 'dark';
          setTheme(newTheme);
          toast({ title: "Theme changed!", description: `Switched to ${newTheme} mode.` });
          break;
        }
        case 'openProjectLink': {
          const projectIndex = projects.findIndex(p => p.title === target);
          if (projectIndex !== -1 && (linkType === 'live' || linkType === 'source')) {
            const element = document.getElementById(`project-${projectIndex}-${linkType}`);
            if (element) {
              element.click();
              toast({ title: "Opening link...", description: `Opening ${linkType} for ${target}.` });
            } else {
               toast({
                variant: "destructive",
                title: "Action failed",
                description: `Could not find ${linkType} link for "${target}".`,
              });
            }
          } else {
            toast({
              variant: "destructive",
              title: "Action failed",
              description: `Could not find project: "${target}".`,
            });
          }
          break;
        }
        case 'unclear':
        default:
          toast({
            variant: "destructive",
            title: "Command not recognized",
            description: `Sorry, I didn't understand "${target}". Try "go to projects" or "change theme".`,
          });
          break;
      }
    } catch (e) {
      toast({
        variant: "destructive",
        title: "AI Error",
        description: "There was an error processing your voice command.",
      });
      console.error(e);
    }
  }, [toast, theme, setTheme, stopListening]);

  useEffect(() => {
    handleVoiceResultRef.current = handleVoiceResult;
  }, [handleVoiceResult]);

  useEffect(() => {
    if (error) {
      let description = error;
      if (error.includes('not-allowed')) {
        description = "Microphone access was denied. Please allow microphone access in your browser settings to use this feature.";
      }
      toast({
        variant: "destructive",
        title: "Voice Recognition Error",
        description: description,
      });
    }
  }, [error, toast]);

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
