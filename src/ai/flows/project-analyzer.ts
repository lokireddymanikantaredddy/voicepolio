'use server';
/**
 * @fileOverview A project analysis AI agent.
 *
 * - analyzeProject - A function that handles the project analysis.
 * - ProjectAnalyzerInput - The input type for the analyzeProject function.
 * - ProjectAnalyzerOutput - The return type for the analyzeProject function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ProjectAnalyzerInputSchema = z.object({
  title: z.string().describe('The title of the project.'),
  description: z.string().describe('The description of the project.'),
  technologies: z.array(z.string()).describe('The technologies used in the project.'),
  liveUrl: z.string().describe('The live demo URL of the project.'),
  repoUrl: z.string().describe('The repository URL of the project.')
});
export type ProjectAnalyzerInput = z.infer<typeof ProjectAnalyzerInputSchema>;

const ProjectAnalyzerOutputSchema = z.object({
  analysis: z
    .string()
    .describe(
      'A detailed analysis of the project, including technical overview, implementation details, and potential improvements.'
    ),
});
export type ProjectAnalyzerOutput = z.infer<typeof ProjectAnalyzerOutputSchema>;

export async function analyzeProject(
  input: ProjectAnalyzerInput
): Promise<ProjectAnalyzerOutput> {
  return projectAnalyzerFlow(input);
}

const prompt = ai.definePrompt({
  name: 'projectAnalyzerPrompt',
  input: {schema: ProjectAnalyzerInputSchema},
  output: {schema: ProjectAnalyzerOutputSchema},
  prompt: `You are an expert full-stack developer and technical analyst. Your goal is to provide a comprehensive analysis of a software project based on its details.

Your analysis should cover:

1. Technical Overview:
   - Core technologies used and their roles
   - Architecture and implementation approach
   - Key features and functionalities

2. Implementation Highlights:
   - Notable technical decisions
   - Integration points and data flow
   - User experience considerations
   - Performance optimizations

3. Areas for Enhancement:
   - Potential technical improvements
   - Scalability considerations
   - Additional features that could add value
   - Security and performance optimizations

4. Development Journey:
   - Technical challenges overcome
   - Learning outcomes
   - Best practices implemented

Please provide a well-structured analysis that would be helpful for both technical and non-technical readers. Focus on concrete details and specific technical aspects while maintaining clarity.

Project Details:
Title: {{{title}}}
Description: {{{description}}}
Technologies: {{#each technologies}}{{this}}{{#unless @last}}, {{/unless}}{{/each}}
Live Demo: {{{liveUrl}}}
Repository: {{{repoUrl}}}`,
});

const projectAnalyzerFlow = ai.defineFlow(
  {
    name: 'projectAnalyzerFlow',
    inputSchema: ProjectAnalyzerInputSchema,
    outputSchema: ProjectAnalyzerOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
