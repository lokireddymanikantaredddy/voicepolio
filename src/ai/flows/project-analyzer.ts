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
});
export type ProjectAnalyzerInput = z.infer<typeof ProjectAnalyzerInputSchema>;

const ProjectAnalyzerOutputSchema = z.object({
  analysis: z
    .string()
    .describe(
      'A detailed analysis of the project, including strengths, challenges, and next steps.'
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
  prompt: `You are an expert tech industry analyst. Your goal is to provide a concise, insightful analysis of a given project based on its title and description.

Your analysis should be structured into three sections:
1.  **Strengths**: What is compelling about this project? What are its key selling points?
2.  **Potential Challenges**: What are some potential hurdles or risks this project might face in the real world (e.g., competition, technical complexity, market adoption)?
3.  **Suggested Next Steps**: What are 2-3 concrete, actionable steps that could be taken to improve or advance this project?

Please provide the output as a single block of text. Use newlines to separate paragraphs and sections. Do not use Markdown formatting like hashes or asterisks.

Project Title: {{{title}}}
Project Description: {{{description}}}`,
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
