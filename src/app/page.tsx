import { Header } from '@/components/header';
import { ProfileCard } from '@/components/profile-card';
import { ProjectCard, type Project } from '@/components/project-card';
import { SkillBadge } from '@/components/skill-badge';
import { ContactForm } from '@/components/contact-form';
import { Chatbot } from '@/components/chatbot';
import { VoiceTooltip } from '@/components/voice-tooltip';
import { Github, Linkedin, Twitter, Code, Brush, Server } from 'lucide-react';

const projects: Project[] = [
  {
    title: 'AI-Powered E-commerce Platform',
    description: 'A full-stack e-commerce solution with personalized recommendations and voice search capabilities.',
    imageUrl: 'https://placehold.co/600x400.png',
    tags: ['Next.js', 'TypeScript', 'GenAI', 'Tailwind CSS'],
    liveUrl: '#',
    repoUrl: '#',
    imageHint: 'e-commerce website'
  },
  {
    title: 'Interactive Data Visualization Dashboard',
    description: 'A dashboard for visualizing complex datasets with interactive charts and filters.',
    imageUrl: 'https://placehold.co/600x400.png',
    tags: ['React', 'D3.js', 'Firebase', 'Styled Components'],
    liveUrl: '#',
    repoUrl: '#',
    imageHint: 'dashboard chart'
  },
  {
    title: 'Mobile Health & Wellness App',
    description: 'A cross-platform mobile app to track fitness goals and connect with personal trainers.',
    imageUrl: 'https://placehold.co/600x400.png',
    tags: ['React Native', 'GraphQL', 'PostgreSQL', 'Figma'],
    liveUrl: '#',
    repoUrl: '#',
    imageHint: 'mobile app'
  },
];

const skills = {
  frontend: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Three.js'],
  backend: ['Node.js', 'Python', 'GraphQL', 'PostgreSQL', 'Firebase', 'Docker'],
  design: ['Figma', 'Sketch', 'Adobe XD', 'User Research', 'Prototyping'],
};


export default function Home() {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <Header />
      <main className="flex-1">
        <section id="home" className="w-full py-20 md:py-32 lg:py-40 bg-background">
          <div className="container px-4 md:px-6">
            <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
              <div className="flex flex-col items-start justify-center space-y-4">
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl xl:text-7xl/none font-headline">
                  Jane Doe
                </h1>
                <p className="text-2xl font-medium text-primary">
                  Creative Developer & UI/UX Designer
                </p>
                <p className="max-w-[600px] text-muted-foreground md:text-xl">
                  I build beautiful, interactive, and accessible web experiences. Passionate about blending technology with user-centric design.
                </p>
                <div className="flex gap-4 mt-4">
                  <a href="#" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                    <Twitter className="h-6 w-6 text-muted-foreground hover:text-primary transition-colors" />
                  </a>
                  <a href="#" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                    <Linkedin className="h-6 w-6 text-muted-foreground hover:text-primary transition-colors" />
                  </a>
                  <a href="#" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                    <Github className="h-6 w-6 text-muted-foreground hover:text-primary transition-colors" />
                  </a>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <ProfileCard />
              </div>
            </div>
          </div>
        </section>

        <section id="projects" className="w-full py-20 md:py-32 border-t">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline">My Projects</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Here are some of the things I've built.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-start gap-8 sm:grid-cols-2 md:gap-12 lg:max-w-none lg:grid-cols-3 mt-12">
              {projects.map((project, index) => (
                <ProjectCard key={index} project={project} />
              ))}
            </div>
          </div>
        </section>

        <section id="skills" className="w-full py-20 md:py-32 border-t bg-muted/40">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline">My Skills</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  A look at the technologies, languages, and tools I use.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-3xl items-start gap-8 sm:grid-cols-2 md:gap-12 lg:max-w-5xl lg:grid-cols-3 mt-12">
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  <Code className="h-8 w-8 text-primary" />
                  <h3 className="text-xl font-bold font-headline">Frontend</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {skills.frontend.map(skill => <SkillBadge key={skill} skill={skill} />)}
                </div>
              </div>
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  <Server className="h-8 w-8 text-primary" />
                  <h3 className="text-xl font-bold font-headline">Backend</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {skills.backend.map(skill => <SkillBadge key={skill} skill={skill} />)}
                </div>
              </div>
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  <Brush className="h-8 w-8 text-primary" />
                  <h3 className="text-xl font-bold font-headline">Design</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {skills.design.map(skill => <SkillBadge key={skill} skill={skill} />)}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="contact" className="w-full py-20 md:py-32 border-t">
          <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6">
            <div className="space-y-3">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight font-headline">Get in Touch</h2>
              <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Have a project in mind, or just want to say hi? Send me a message.
              </p>
            </div>
            <div className="mx-auto w-full max-w-sm space-y-2">
              <ContactForm />
            </div>
          </div>
        </section>
      </main>
      <Chatbot />
      <VoiceTooltip />
    </div>
  );
}
