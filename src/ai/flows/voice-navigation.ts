// src/ai/flows/voice-navigation.ts
'use server';
/**
 * @fileOverview A voice navigation AI agent.
 *
 * - voiceNavigation - A function that handles the voice navigation process.
 * - VoiceNavigationInput - The input type for the voiceNavigation function.
 * - VoiceNavigationOutput - The return type for the voiceNavigation function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const VoiceNavigationInputSchema = z.object({
  voiceCommand: z.string().describe('The voice command given by the user.'),
});
export type VoiceNavigationInput = z.infer<typeof VoiceNavigationInputSchema>;

const VoiceNavigationOutputSchema = z.object({
  navigationTarget: z.string().describe('The section of the portfolio to navigate to.'),
});
export type VoiceNavigationOutput = z.infer<typeof VoiceNavigationOutputSchema>;

export async function voiceNavigation(input: VoiceNavigationInput): Promise<VoiceNavigationOutput> {
  return voiceNavigationFlow(input);
}

const prompt = ai.definePrompt({
  name: 'voiceNavigationPrompt',
  input: {schema: VoiceNavigationInputSchema},
  output: {schema: VoiceNavigationOutputSchema},
  prompt: `You are an AI assistant that helps users navigate a portfolio website using voice commands.

  The portfolio has the following sections: Projects, Skills, Contact.

  Based on the user's voice command, determine which section of the portfolio the user wants to navigate to.

  Voice Command: {{{voiceCommand}}}

  Return the name of the section to navigate to in the navigationTarget field.
  If the voice command is not clear, or does not match a valid section, return "Home".`,
});

const voiceNavigationFlow = ai.defineFlow(
  {
    name: 'voiceNavigationFlow',
    inputSchema: VoiceNavigationInputSchema,
    outputSchema: VoiceNavigationOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
