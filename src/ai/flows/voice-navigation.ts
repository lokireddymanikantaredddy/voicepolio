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
  projectTitles: z.array(z.string()).describe('A list of available project titles.'),
});
export type VoiceNavigationInput = z.infer<typeof VoiceNavigationInputSchema>;

const VoiceNavigationOutputSchema = z.object({
  action: z
    .enum(['navigate', 'click', 'stopListening', 'changeTheme', 'openProjectLink', 'unclear'])
    .describe('The action to perform.'),
  target: z
    .string()
    .describe(
      'The target for the action. For "navigate", it is a section ID. For "click", it is an element ID. For "openProjectLink", it is the project title. For others, it can be an empty string.'
    ),
  linkType: z
    .enum(['live', 'source', 'none'])
    .optional()
    .describe(
      'Specifies which link to open for a project. Can be "live" or "source". Default to "none".'
    ),
});
export type VoiceNavigationOutput = z.infer<typeof VoiceNavigationOutputSchema>;

export async function voiceNavigation(
  input: VoiceNavigationInput
): Promise<VoiceNavigationOutput> {
  return voiceNavigationFlow(input);
}

const prompt = ai.definePrompt({
  name: 'voiceNavigationPrompt',
  input: {schema: VoiceNavigationInputSchema},
  output: {schema: VoiceNavigationOutputSchema},
  prompt: `You are an AI assistant that helps users navigate a portfolio website using voice commands.

The portfolio has the following sections: "Home", "Projects", "Skills", "Contact".

The user can also say:
- "Change theme" to toggle between light and dark mode.
- "Stop listening" or "stop mic" to deactivate voice control.
- "Flip the card" or "flip profile" to flip the profile card.

The user can also ask to open project links. Here are the available projects:
{{#each projectTitles}}
- "{{this}}"
{{/each}}

If the user wants to open a project link, identify the project title and whether they want the "live demo" or "source code".

Based on the user's voice command, determine the action to perform and the target.

Voice Command: {{{voiceCommand}}}

Respond with the appropriate action and target in the JSON output.
- For navigation, set action to "navigate" and target to the section name in lowercase (e.g., "projects").
- For changing the theme, set action to "changeTheme" and target to an empty string.
- For stopping the microphone, set action to "stopListening" and target to an empty string.
- For flipping the profile card, set action to "click" and target to "profile-card-container".
- For opening a project link, set action to "openProjectLink", target to the full project title you identified, and linkType to "live" or "source".

If the command is unclear or doesn't match any known action, set action to "unclear" and target to the original voice command. If no linkType is specified for a project, default to "none".`,
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
