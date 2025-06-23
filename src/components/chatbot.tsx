"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { MessageCircle, Send, Bot } from 'lucide-react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { askQuestion } from '@/ai/flows/chatbot';
import { cn } from '@/lib/utils';

type Message = {
  id: number;
  text: string;
  sender: 'user' | 'bot';
};

const formSchema = z.object({
  query: z.string().min(1, "Message cannot be empty."),
});

export function Chatbot() {
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, text: "Hello! I'm Jane's AI assistant. Ask me anything about her work, projects, or skills.", sender: 'bot' }
  ]);
  const [isThinking, setIsThinking] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { query: "" },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const userMessage: Message = { id: Date.now(), text: values.query, sender: 'user' };
    setMessages(prev => [...prev, userMessage]);
    form.reset();
    setIsThinking(true);

    try {
      const { response } = await askQuestion({ query: values.query });
      const botMessage: Message = { id: Date.now() + 1, text: response, sender: 'bot' };
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      const errorMessage: Message = { id: Date.now() + 1, text: "Sorry, I'm having trouble connecting. Please try again later.", sender: 'bot' };
      setMessages(prev => [...prev, errorMessage]);
      console.error("Chatbot error:", error);
    } finally {
      setIsThinking(false);
    }
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          className="fixed bottom-4 right-4 h-14 w-14 rounded-full shadow-lg"
          size="icon"
          aria-label="Open chatbot"
        >
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
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={cn(
                  "flex items-end gap-2",
                  message.sender === 'user' ? 'justify-end' : 'justify-start'
                )}
              >
                {message.sender === 'bot' && (
                  <Avatar className="h-8 w-8">
                    <AvatarFallback>
                      <Bot className="w-5 h-5" />
                    </AvatarFallback>
                  </Avatar>
                )}
                <div
                  className={cn(
                    "max-w-[75%] rounded-lg p-3 text-sm",
                    message.sender === 'user'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted'
                  )}
                >
                  {message.text}
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
  );
}
