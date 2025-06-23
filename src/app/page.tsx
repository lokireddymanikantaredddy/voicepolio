
import { Header } from '@/components/header';
import { ProfileCard } from '@/components/profile-card';
import { ProjectCard } from '@/components/project-card';
import { SkillBadge } from '@/components/skill-badge';
import { ContactForm } from '@/components/contact-form';
import { Chatbot } from '@/components/chatbot';
import { VoiceTooltip } from '@/components/voice-tooltip';
import { EducationCard } from '@/components/education-card';
import { Github, Linkedin, Twitter, Code, Brush, Server, GraduationCap } from 'lucide-react';
import { projects, skills, education } from '@/lib/data';
import { RollingText } from '@/components/rolling-text';

export default function Home() {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <Header />
      <main className="flex-1">
        <section id="home" className="w-full py-8 md:py-12 lg:py-16 bg-background">
          <div className="container px-4 md:px-6">
            <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
              <div className="flex flex-col items-start justify-center space-y-4">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl xl:text-6xl/none font-headline">
                  LOKIREDDY MANIKANTA REDDY
                </h1>
                <RollingText />
                <p className="max-w-[600px] text-muted-foreground md:text-xl">
                  a dedicated Full Stack Developer with a strong focus on creating clean, responsive, and intuitive user experiences. I specialize in building scalable web applications using React.js, Tailwind CSS, Node.js, and the MERN stack.  My passion lies in blending great design with powerful functionality — whether it's integrating modern UI animations, optimizing performance, or experimenting with innovative features like voice-controlled navigation.  I believe in writing maintainable code, staying curious, and continuously learning to deliver impactful digital solutions.
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

        <section id="projects" className="w-full py-8 md:py-12 lg:py-16 border-t">
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
                <ProjectCard key={index} project={project} index={index} />
              ))}
            </div>
          </div>
        </section>

        <section id="skills" className="w-full py-8 md:py-12 lg:py-16 border-t bg-muted/40">
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

        <section id="education" className="w-full py-8 md:py-12 lg:py-16 border-t">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline">Education</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  My academic background and qualifications.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-3xl gap-8 mt-12">
              {education.map((edu, index) => (
                <EducationCard key={index} education={edu} />
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="w-full py-8 md:py-12 lg:py-16 border-t">
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
