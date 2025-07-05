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
import { projects, skills, education, philosophy, funFacts, awards } from '@/lib/data';

const ChatbotInputSchema = z.object({
  query: z.string().describe('The user query about the portfolio owner.'),
});
export type ChatbotInput = z.infer<typeof ChatbotInputSchema>;

const ChatbotOutputSchema = z.object({
  response: z.string().describe('The chatbot response to the user query.'),
});
export type ChatbotOutput = z.infer<typeof ChatbotOutputSchema>;

export async function askQuestion(input: ChatbotInput): Promise<ChatbotOutput> {
  // Get dynamic data
  const projectInfo = projects.map(p => ({
    title: p.title,
    description: p.description,
    technologies: p.tags,
    type: p.imageHint || 'project'
  }));

  const skillsInfo = {
    frontend: skills.frontend,
    backend: skills.backend,
    design: skills.design
  };

  const educationInfo = education.map(e => ({
    degree: e.degree,
    institution: e.institution,
    year: e.years,
    description: e.description
  }));

  return chatbotFlow({ ...input, projectInfo, skillsInfo, educationInfo, philosophy, funFacts, awards });
}

const prompt = ai.definePrompt({
  name: 'chatbotPrompt',
  input: {
    schema: z.object({
      query: ChatbotInputSchema.shape.query,
      projectInfo: z.array(z.object({
        title: z.string(),
        description: z.string(),
        technologies: z.array(z.string()),
        type: z.string()
      })),
      skillsInfo: z.object({
        frontend: z.array(z.string()),
        backend: z.array(z.string()),
        design: z.array(z.string())
      }),
      educationInfo: z.array(z.object({
        degree: z.string(),
        institution: z.string(),
        year: z.string(),
        description: z.string()
      })),
      philosophy: z.string(),
      funFacts: z.array(z.string()),
      awards: z.array(z.object({
        title: z.string(),
        year: z.string(),
        description: z.string()
      }))
    })
  },
  output: {schema: ChatbotOutputSchema},
  prompt: `You are an AI assistant for LOKIREDDY MANIKANTA REDDY's portfolio website. You help visitors learn about Lokireddy's background, skills, projects, and experience. Be professional, friendly, and informative.

ABOUT LOKIREDDY:
- Full Stack Developer specializing in creating clean, responsive, and intuitive user experiences
- Expertise in React.js, Tailwind CSS, Node.js, and the MERN stack
- Passionate about blending great design with powerful functionality
- Focus on writing maintainable code and continuous learning
- Experienced in modern UI animations, performance optimization, and innovative features

PROJECTS:
{{#each projectInfo}}
Project: {{title}}
Type: {{type}}
Description: {{description}}
Technologies: {{#each technologies}}{{this}}{{#unless @last}}, {{/unless}}{{/each}}

{{/each}}

SKILLS:
Frontend Technologies: {{#each skillsInfo.frontend}}{{this}}{{#unless @last}}, {{/unless}}{{/each}}
Backend Technologies: {{#each skillsInfo.backend}}{{this}}{{#unless @last}}, {{/unless}}{{/each}}
Design Tools: {{#each skillsInfo.design}}{{this}}{{#unless @last}}, {{/unless}}{{/each}}

EDUCATION:
{{#each educationInfo}}
Degree: {{degree}}
Institution: {{institution}}
Year: {{year}}
Details: {{description}}

{{/each}}

PHILOSOPHY:
{{philosophy}}

FUN FACTS:
{{#each funFacts}}
- {{this}}
{{/each}}

AWARDS & RECOGNITIONS:
{{#each awards}}
- {{title}} ({{year}}): {{description}}
{{/each}}

INSTRUCTIONS:
1. Answer questions about Lokireddy's experience, skills, projects, or education using the provided information
2. If asked about specific projects, provide detailed information about technologies used and key features
3. For technical questions, emphasize relevant skills and experience
4. If asked about availability or contact, direct them to use the contact form
5. If information isn't available, politely say so and suggest what information you can provide
6. Keep responses concise but informative
7. Use a professional and friendly tone
8. If asked about personal philosophy, fun facts, or awards, use the provided information.

User Query: {{{query}}}

Please provide a helpful response based on the above information.`,
});

const chatbotFlow = ai.defineFlow(
  {
    name: 'chatbotFlow',
    inputSchema: z.object({
      query: ChatbotInputSchema.shape.query,
      projectInfo: z.array(z.object({
        title: z.string(),
        description: z.string(),
        technologies: z.array(z.string()),
        type: z.string()
      })),
      skillsInfo: z.object({
        frontend: z.array(z.string()),
        backend: z.array(z.string()),
        design: z.array(z.string())
      }),
      educationInfo: z.array(z.object({
        degree: z.string(),
        institution: z.string(),
        year: z.string(),
        description: z.string()
      })),
      philosophy: z.string(),
      funFacts: z.array(z.string()),
      awards: z.array(z.object({
        title: z.string(),
        year: z.string(),
        description: z.string()
      }))
    }),
    outputSchema: ChatbotOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
