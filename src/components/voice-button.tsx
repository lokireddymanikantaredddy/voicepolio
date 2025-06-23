"use client";

import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { voiceNavigation } from '@/ai/flows/voice-navigation';
import { useSpeechRecognition } from '@/hooks/use-speech-recognition';
import { Mic, MicOff } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useEffect, useCallback, useRef, useState } from 'react';
import { projects } from '@/lib/data';
import { useTheme } from './theme-provider';
import { analyzeProject } from '@/ai/flows/project-analyzer';
import { Skeleton } from '@/components/ui/skeleton';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

export function VoiceButton() {
  const { toast } = useToast();
  const { theme, setTheme } = useTheme();
  const handleVoiceResultRef = useRef<(command: string) => Promise<void>>();
  
  const [analysis, setAnalysis] = useState<{ title: string; content: string } | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

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
          const projectIndex = projects.findIndex(p => p.title.toLowerCase() === target.toLowerCase());
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
        case 'analyzeProject': {
          const project = projects.find(p => p.title.toLowerCase() === target.toLowerCase());
          if (project) {
              toast({ title: "Analyzing project...", description: `Asking for insights on "${project.title}".` });
              setIsDialogOpen(true);
              setAnalysis(null);
              try {
                  const result = await analyzeProject({ title: project.title, description: project.description });
                  setAnalysis({ title: project.title, content: result.analysis });
              } catch(e) {
                  console.error(e);
                  toast({ variant: "destructive", title: "Analysis Error", description: "Failed to analyze project." });
                  setIsDialogOpen(false);
              }
          } else {
              toast({ variant: "destructive", title: "Analysis Failed", description: `Could not find project: "${target}".` });
          }
          break;
        }
        case 'unclear':
        default:
          toast({
            variant: "destructive",
            title: "Command not recognized",
            description: `Sorry, I didn't understand "${target}". Try "go to projects" or "analyze 'project name'".`,
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
  
  const closeDialog = () => {
    setIsDialogOpen(false);
    setAnalysis(null);
  };

  return (
    <>
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

      <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <AlertDialogContent className="max-w-2xl">
            <AlertDialogHeader>
                <AlertDialogTitle>
                    {analysis ? `Analysis of: ${analysis.title}` : 'Analyzing Project...'}
                </AlertDialogTitle>
            </AlertDialogHeader>
            <div className="max-h-[60vh] overflow-y-auto pr-4 text-sm text-muted-foreground">
                {analysis ? (
                    <p style={{ whiteSpace: 'pre-wrap' }}>{analysis.content}</p>
                ) : (
                    <div className="space-y-2 pt-2">
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-5/6" />
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-1/2" />
                    </div>
                )}
            </div>
            <AlertDialogFooter>
                <AlertDialogAction onClick={closeDialog}>Close</AlertDialogAction>
            </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
