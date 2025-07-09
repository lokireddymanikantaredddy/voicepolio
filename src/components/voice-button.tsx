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
import { Chatbot } from '@/components/chatbot';
import type { ChatbotHandle } from '@/components/chatbot';

export function VoiceButton() {
  const { toast } = useToast();
  const { theme, setTheme } = useTheme();
  const handleVoiceResultRef = useRef<(command: string) => Promise<void>>();
  const chatbotRef = useRef<ChatbotHandle>(null);
  
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
    toast({ 
      title: "Heard you!", 
      description: `Processing: "${command}"`,
      duration: 2000
    });
    
    try {
      const projectTitles = projects.map(p => p.title);
      const { action, target, linkType } = await voiceNavigation({ voiceCommand: command, projectTitles });

      switch (action) {
        case 'navigate': {
          const element = document.getElementById(target);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
            toast({ 
              title: "Navigating...", 
              description: `Going to ${target}`,
              duration: 2000
            });
          } else {
             toast({
              variant: "destructive",
              title: "Navigation failed",
              description: `Sorry, I couldn't find a section called "${target}".`,
              duration: 2000
            });
          }
          break;
        }
        case 'click': {
          const element = document.getElementById(target);
          if (element) {
            element.click();
            toast({ 
              title: "Action completed!", 
              description: `Flipping card.`,
              duration: 2000
            });
          } else {
             toast({
              variant: "destructive",
              title: "Action failed",
              description: `Could not find element to click: "${target}".`,
              duration: 2000
            });
          }
          break;
        }
        case 'stopListening':
          stopListening();
          toast({ 
            title: "Ok", 
            description: "Microphone off.",
            duration: 2000
          });
          break;
        case 'changeTheme': {
          const newTheme = theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches) ? 'light' : 'dark';
          setTheme(newTheme);
          toast({ 
            title: "Theme changed!", 
            description: `Switched to ${newTheme} mode.`,
            duration: 2000
          });
          break;
        }
        case 'openProjectLink': {
          const projectIndex = projects.findIndex(p => p.title.toLowerCase() === target.toLowerCase());
          if (projectIndex !== -1 && (linkType === 'live' || linkType === 'source')) {
            const element = document.getElementById(`project-${projectIndex}-${linkType}`);
            if (element) {
              element.click();
              toast({ 
                title: "Opening link...", 
                description: `Opening ${linkType} for ${target}.`,
                duration: 2000
              });
            } else {
               toast({
                variant: "destructive",
                title: "Action failed",
                description: `Could not find ${linkType} link for "${target}".`,
                duration: 2000
              });
            }
          } else {
            toast({
              variant: "destructive",
              title: "Action failed",
              description: `Could not find project: "${target}".`,
              duration: 2000
            });
          }
          break;
        }
        case 'openSocial': {
          const socialLinks = {
            github: document.getElementById('social-github'),
            linkedin: document.getElementById('social-linkedin'),
            twitter: document.getElementById('social-twitter'),
          };
          
          const link = socialLinks[target as keyof typeof socialLinks];
          if (link) {
            link.click();
            toast({ 
              title: "Opening link...", 
              description: `Opening ${target}`,
              duration: 2000
            });
          } else {
            toast({
              variant: "destructive",
              title: "Action failed",
              description: `Could not find link for ${target}.`,
              duration: 2000
            });
          }
          break;
        }
        case 'toggleChatbot': {
          const chatbotButton = document.getElementById('chatbot-trigger');
          if (chatbotButton) {
            chatbotButton.click();
            toast({ 
              title: "Chatbot", 
              description: `${target === 'open' ? 'Opening' : 'Closing'} chatbot` 
            });
          } else {
            toast({
              variant: "destructive",
              title: "Action failed",
              description: "Could not find chatbot control.",
            });
          }
          break;
        }
        case 'typeInChat': {
          const tryTypeInChat = (retries = 5) => {
            if (chatbotRef.current) {
              chatbotRef.current.open();
              chatbotRef.current.setInputValue(target);
              toast({ 
                title: "Chatbot ready", 
                description: "Message typed in chat. Press Enter to send." 
              });
            } else if (retries > 0) {
              setTimeout(() => tryTypeInChat(retries - 1), 100);
            } else {
              toast({
                variant: "destructive",
                title: "Action failed",
                description: "Could not access chatbot.",
              });
            }
          };
          tryTypeInChat();
          break;
        }
        case 'analyzeProject': {
          const project = projects.find(p => p.title.toLowerCase() === target.toLowerCase());
          if (project) {
            toast({ 
              title: "Analyzing project...", 
              description: `Asking for insights on "${project.title}"`,
              duration: 2000
            });
            setIsDialogOpen(true);
            setAnalysis(null);
            try {
              const result = await analyzeProject({ 
                title: project.title, 
                description: project.description,
                technologies: project.tags,
                liveUrl: project.liveUrl || '#',
                repoUrl: project.repoUrl || '#'
              });
              setAnalysis({ title: project.title, content: result.analysis });
            } catch(e) {
              console.error(e);
              toast({ 
                variant: "destructive", 
                title: "Analysis Error", 
                description: "Failed to analyze project.",
                duration: 2000
              });
              setIsDialogOpen(false);
            }
          } else {
            toast({ 
              variant: "destructive", 
              title: "Analysis Failed", 
              description: `Could not find project: "${target}"`,
              duration: 2000
            });
          }
          break;
        }
        case 'scrollUp': {
          window.scrollBy({ top: -window.innerHeight / 2, behavior: 'smooth' });
          toast({ title: 'Scrolled up' });
          break;
        }
        case 'scrollDown': {
          window.scrollBy({ top: window.innerHeight / 2, behavior: 'smooth' });
          toast({ title: 'Scrolled down' });
          break;
        }
        case 'goBack': {
          window.history.back();
          toast({ title: 'Going back' });
          break;
        }
        case 'chatbotExplain': {
          const tryChatbotExplain = (retries = 5) => {
            if (chatbotRef.current) {
              chatbotRef.current.open();
              chatbotRef.current.setInputValue(target);
              chatbotRef.current.submit();
              toast({ title: 'Chatbot', description: 'Explaining project...' });
            } else if (retries > 0) {
              setTimeout(() => tryChatbotExplain(retries - 1), 100);
            } else {
              toast({
                variant: 'destructive',
                title: 'Action failed',
                description: 'Could not access chatbot.',
              });
            }
          };
          tryChatbotExplain();
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
        description: e && typeof e === 'object' && 'message' in e ? (e as any).message : String(e) || "There was an error processing your voice command.",
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
      <div className="fixed inset-0 pointer-events-none z-[100]">
        <div className="pointer-events-auto">
          <Chatbot ref={chatbotRef} />
        </div>
      </div>
    </>
  );
}
