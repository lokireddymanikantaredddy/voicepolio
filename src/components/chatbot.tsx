"use client";

import { useState, useImperativeHandle, forwardRef, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { MessageCircle, Send, Bot, GripHorizontal } from 'lucide-react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { askQuestion } from '@/ai/flows/chatbot';
import { cn } from '@/lib/utils';
import Typewriter from "@/components/typewriter";

const CHATBOT_POSITION_KEY = 'chatbot-position';

type Message = {
  id: number;
  text: string;
  sender: 'user' | 'bot';
};

const formSchema = z.object({
  query: z.string().min(1, "Message cannot be empty."),
});

export interface ChatbotHandle {
  setInputValue: (value: string) => void;
  open: () => void;
  submit: () => void;
}

export interface ChatbotProps {
  // Add any future props here
}

const ChatbotComponent = forwardRef<ChatbotHandle, ChatbotProps>(function Chatbot(_, ref) {
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, text: "Hello! I'm LOKIREDDY MANIKANTA REDDY's AI assistant. Ask me anything about his work, projects, or skills.", sender: 'bot' }
  ]);
  const [isThinking, setIsThinking] = useState(false);
  const [open, setOpen] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(CHATBOT_POSITION_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return {
          x: Math.min(Math.max(0, parsed.x), window.innerWidth - 56),
          y: Math.min(Math.max(0, parsed.y), window.innerHeight - 56)
        };
      }
      return { x: window.innerWidth - 100, y: window.innerHeight - 100 };
    }
    return { x: 0, y: 0 };
  });

  const dragStartPos = useRef({ x: 0, y: 0 });
  const buttonRef = useRef<HTMLButtonElement>(null);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isThinking]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;

      const deltaX = e.clientX - dragStartPos.current.x;
      const deltaY = e.clientY - dragStartPos.current.y;
      
      const newX = Math.min(Math.max(0, position.x + deltaX), window.innerWidth - 56);
      const newY = Math.min(Math.max(0, position.y + deltaY), window.innerHeight - 56);

      setPosition({ x: newX, y: newY });
      dragStartPos.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseUp = () => {
      if (!isDragging) return;
      setIsDragging(false);
      localStorage.setItem(CHATBOT_POSITION_KEY, JSON.stringify(position));
    };

    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, position]);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button !== 0) return; // Only handle left click
    e.preventDefault();
    setIsDragging(true);
    dragStartPos.current = { x: e.clientX, y: e.clientY };
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { query: "" },
  });

  const [animatedBotId, setAnimatedBotId] = useState<number | null>(null);

  useImperativeHandle(ref, () => ({
    setInputValue: (value: string) => {
      form.setValue('query', value);
    },
    open: () => setOpen(true),
    submit: () => {
      const values = form.getValues();
      if (values.query && values.query.length > 0) {
        onSubmit(values);
      }
    }
  }));

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const userMessage: Message = { id: messages.length + 1, text: values.query, sender: 'user' };
    setMessages(prev => [...prev, userMessage]);
    form.reset();
    setIsThinking(true);

    try {
      const { response } = await askQuestion({ query: values.query });
      const botMessage: Message = { id: messages.length + 2, text: response, sender: 'bot' };
      setMessages(prev => [...prev, botMessage]);
      setAnimatedBotId(botMessage.id);
    } catch (error) {
      const errorMessage: Message = { id: messages.length + 2, text: "Sorry, I'm having trouble connecting. Please try again later.", sender: 'bot' };
      setMessages(prev => [...prev, errorMessage]);
      setAnimatedBotId(errorMessage.id);
      console.error("Chatbot error:", error);
    } finally {
      setIsThinking(false);
    }
  };

  return (
    <div 
      style={{ 
        position: 'fixed', 
        left: `${position.x}px`, 
        top: `${position.y}px`, 
        zIndex: 101,
        touchAction: 'none'
      }}
    >
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button
            ref={buttonRef}
            id="chatbot-trigger"
            className={cn(
              "group h-14 w-14 rounded-full shadow-lg cursor-grab select-none",
              isDragging && "cursor-grabbing opacity-70"
            )}
            size="icon"
            aria-label="Open chatbot"
            onMouseDown={handleMouseDown}
          >
            <GripHorizontal className="absolute h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
            <MessageCircle className="h-7 w-7" />
          </Button>
        </SheetTrigger>
        <SheetContent className="flex flex-col p-0 w-full sm:max-w-md">
          <SheetHeader className="p-4 border-b">
            <SheetTitle className="flex items-center gap-2 font-headline">
              <Bot />
              Chat with my AI
            </SheetTitle>
          </SheetHeader>
          <ScrollArea className="flex-1 p-4">
            <div ref={scrollAreaRef} className="space-y-4 h-full overflow-y-auto">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={cn(
                    "flex items-end gap-2",
                    message.sender === "user" ? "justify-end" : "justify-start"
                  )}
                >
                  {message.sender === "bot" && (
                    <Avatar className="h-8 w-8">
                      <AvatarFallback>
                        <Bot className="w-5 h-5" />
                      </AvatarFallback>
                    </Avatar>
                  )}
                  <div
                    className={cn(
                      "max-w-[75%] rounded-lg p-3 text-sm",
                      message.sender === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted"
                    )}
                  >
                    {message.sender === "bot" && message.id === animatedBotId ? (
                      <Typewriter
                        text={message.text}
                        onProgress={scrollToBottom}
                        onDone={() => setAnimatedBotId(null)}
                      />
                    ) : (
                      message.text
                    )}
                  </div>
                </div>
              ))}
              {isThinking && (
                <div className="flex items-end gap-2 justify-start">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback>
                      <Bot className="w-5 h-5" />
                    </AvatarFallback>
                  </Avatar>
                  <div className="max-w-[75%] rounded-lg p-3 text-sm bg-muted flex items-center gap-1">
                    <span className="h-2 w-2 bg-foreground rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                    <span className="h-2 w-2 bg-foreground rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                    <span className="h-2 w-2 bg-foreground rounded-full animate-bounce"></span>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>
          <div className="p-4 border-t bg-background">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="relative">
                <FormField
                  control={form.control}
                  name="query"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          placeholder="Ask a question..."
                          className="pr-12"
                          autoComplete="off"
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  size="icon"
                  className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8"
                  disabled={isThinking}
                >
                  <Send className="h-4 w-4" />
                </Button>
              </form>
            </Form>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
});

export const Chatbot = forwardRef<ChatbotHandle, ChatbotProps>(function Chatbot(props, ref) {
  return <ChatbotComponent ref={ref} />;
});
