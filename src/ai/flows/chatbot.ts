'use server';

/**
 * @fileOverview A chatbot AI agent that answers questions about the portfolio owner's life, work, and projects.
 *
 * - askQuestion - A function that handles the chatbot interaction.
 * - ChatbotInput - The input type for the askQuestion function.
 * - ChatbotOutput - The return type for the askQuestion function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ChatbotInputSchema = z.object({
  query: z.string().describe('The user query about the portfolio owner.'),
});
export type ChatbotInput = z.infer<typeof ChatbotInputSchema>;

const ChatbotOutputSchema = z.object({
  response: z.string().describe('The chatbot response to the user query.'),
});
export type ChatbotOutput = z.infer<typeof ChatbotOutputSchema>;

export async function askQuestion(input: ChatbotInput): Promise<ChatbotOutput> {
  return chatbotFlow(input);
}

const prompt = ai.definePrompt({
  name: 'chatbotPrompt',
  input: {schema: ChatbotInputSchema},
  output: {schema: ChatbotOutputSchema},
  prompt: `You are a chatbot designed to answer questions about the portfolio owner.\n\nUse the following information to answer the user's query. If the information cannot be found, respond politely, and let the user know that you don't have information about what they are asking about.\n\nUser Query: {{{query}}}`,
});

const chatbotFlow = ai.defineFlow(
  {
    name: 'chatbotFlow',
    inputSchema: ChatbotInputSchema,
    outputSchema: ChatbotOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
