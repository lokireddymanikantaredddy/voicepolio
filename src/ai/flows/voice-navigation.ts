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
    .enum([
      'navigate', 'click', 'stopListening', 'changeTheme', 'openProjectLink',
      'analyzeProject', 'unclear', 'openSocial', 'toggleChatbot', 'typeInChat',
      'scroll Up', 'scroll Down', 'goBack', 'chatbotExplain',
      'scrollUp', 'scrollDown'
    ])
    .describe('The action to perform.'),
  target: z
    .string()
    .describe(
      'The target for the action. For "navigate", it is a section ID. For "click", it is an element ID. For "openProjectLink" or "analyzeProject", it is the project title. For "openSocial", it is the social media platform. For "typeInChat", it is the message to type. For others, it can be an empty string.'
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

The portfolio has the following sections: "Home", "Projects", "Skills", "Education", "Contact".

The user can also say:
- "Change theme" to toggle between light and dark mode.
- "Stop listening" or "stop mic" to deactivate voice control.
- "Flip the card" or "flip profile" to flip the profile card.
- "Analyze [project name]" to get an AI analysis of a project.
- "Open GitHub" or "go to GitHub" to open the GitHub profile.
- "Open LinkedIn" or "go to LinkedIn" to open the LinkedIn profile.
- "Open Twitter" or "go to Twitter" to open the Twitter profile.
- "Open chat" or "open chatbot" or "show chat" to open the chatbot.
- "Close chat" or "close chatbot" or "hide chat" to close the chatbot.
- "Type [message]" or "ask [question]" to open the chatbot and type a message.
- "See more projects" to navigate to the full projects page.
- "Scroll up" to scroll the page up.
- "Scroll down" to scroll the page down.
- "Go back" to navigate to the previous page.
- "Tell me more about this project" or similar to paste the command into the chatbot and trigger an explanation.

The user can also ask to open project links. Here are the available projects:
{{#each projectTitles}}
- "{{this}}"
{{/each}}

If the user wants to open a project link, identify the project title and whether they want the "live demo" or "source code".

Voice Command: {{{voiceCommand}}}

Respond with the appropriate action and target in the JSON output.
- For navigation, set action to "navigate" and target to the section name in lowercase (e.g., "projects").
- For changing the theme, set action to "changeTheme" and target to an empty string.
- For stopping the microphone, set action to "stopListening" and target to an empty string.
- For flipping the profile card, set action to "click" and target to "profile-card-container".
- For opening a project link, set action to "openProjectLink", target to the full project title you identified, and linkType to "live" or "source".
- For analyzing a project, set action to "analyzeProject" and target to the full project title.
- For opening social media, set action to "openSocial" and target to the platform name in lowercase (e.g., "github", "linkedin", "twitter").
- For chatbot control, set action to "toggleChatbot" and target to either "open" or "close".
- For typing in chat, set action to "typeInChat" and target to the message or question to type (e.g., if command is "type what are you doing", target should be "what are you doing").
- For "See more projects", set action to "navigate" and target to "projects".
- For "Scroll up", set action to "scrollUp" and target to an empty string.
- For "Scroll down", set action to "scrollDown" and target to an empty string.
- For "Go back", set action to "goBack" and target to an empty string.
- For "Tell me more about this project" or similar, set action to "chatbotExplain" and target to the current project title or context.

If the command is unclear or doesn't match any known action, set action to "unclear" and target to the original voice command. If no linkType is specified for a project, default to "none".

For type commands, detect patterns like:
- "type [message]"
- "ask [question]"
- "say [message]"
And extract everything after these keywords as the target message.`,
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
