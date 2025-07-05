"use client"
import { Header } from '@/components/header';
import { ProfileCard } from '@/components/profile-card';
import { ProjectCard } from '@/components/project-card';
import { SkillBadge } from '@/components/skill-badge';
import { ContactForm } from '@/components/contact-form';
import { VoiceTooltip } from '@/components/voice-tooltip';
import { EducationCard } from '@/components/education-card';
import { Github, Linkedin, Twitter, Code, Brush, Server, GraduationCap, ExternalLink } from 'lucide-react';
import { projects, skills, education } from '@/lib/data';
import { RollingText } from '@/components/rolling-text';
import { ScrollReveal } from '@/components/scroll-reveal';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import BackgroundVideo from '@/components/BackgroundVideo';
import React from 'react';
import SkillsShowcase from '@/components/SkillsShowcase';

function IntroSection() {
  return (
    <section className="relative h-screen flex flex-col items-center justify-center overflow-hidden">
      <BackgroundVideo />
      <div className="absolute inset-0 z-0 backdrop-blur-sm bg-black/30" />
      <div className="relative z-10 flex flex-col items-center justify-center h-full w-full text-center text-white px-4">
        <h1
          className="text-4xl md:text-6xl font-bold drop-shadow-lg mb-4
            bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500
            bg-[length:200%_200%] bg-clip-text text-transparent animate-gradient-x"
        >
          Welcome to My Portfolio
        </h1>
        <p className="text-lg md:text-2xl font-medium drop-shadow-md mb-8">Showcasing innovation, voice control, and creative technology <br />you can control the website with your voice by clicking on the voice icon</p>
        {/* Optionally add a scroll-down indicator */}
        <div className="animate-bounce mt-8">
          <svg width="32" height="32" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="mx-auto text-white opacity-70">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <Header />
      <main className="flex-1">
        <IntroSection />
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
                  <a 
                    id="social-twitter"
                    href="https://twitter.com/lokireddy" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    aria-label="Twitter"
                  >
                    <Twitter className="h-6 w-6 text-muted-foreground hover:text-primary transition-colors" />
                  </a>
                  <a 
                    id="social-linkedin"
                    href="https://linkedin.com/in/lokireddy" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    aria-label="LinkedIn"
                  >
                    <Linkedin className="h-6 w-6 text-muted-foreground hover:text-primary transition-colors" />
                  </a>
                  <a 
                    id="social-github"
                    href="https://github.com/lokireddymanikantaredddy" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    aria-label="GitHub"
                  >
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
            <ScrollReveal>
              <div className="flex flex-col items-center justify-center space-y-4 text-center">
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline">My Projects</h2>
                  <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                    Here are some of the things I've built.
                  </p>
                </div>
              </div>
            </ScrollReveal>
            <div className="mx-auto grid max-w-5xl items-start gap-8 sm:grid-cols-2 md:gap-12 lg:max-w-6xl mt-12">
              {projects.slice(0, 4).map((project, index) => (
                <ScrollReveal key={index} delay={0.1 * index}>
                  <ProjectCard project={project} index={index} />
                </ScrollReveal>
              ))}
            </div>
            {projects.length > 4 && (
              <ScrollReveal delay={0.5}>
                <div className="flex justify-center mt-12">
                  <Button asChild size="lg" variant="outline">
                    <Link href="/projects">
                      See More Projects
                      <ExternalLink className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </ScrollReveal>
            )}
          </div>
        </section>

        <SkillsShowcase />

        <section id="education" className="w-full py-8 md:py-12 lg:py-16 border-t">
          <div className="container px-4 md:px-6">
            <ScrollReveal>
              <div className="flex flex-col items-center justify-center space-y-4 text-center">
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline">Education</h2>
                  <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                    My academic background and qualifications.
                  </p>
                </div>
              </div>
            </ScrollReveal>
            <div className="mx-auto grid max-w-3xl gap-8 mt-12">
              {education.map((edu, index) => (
                <ScrollReveal key={index} delay={0.1 * index}>
                  <EducationCard education={edu} />
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="w-full py-8 md:py-12 lg:py-16 border-t">
          <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6">
            <ScrollReveal>
              <div className="space-y-3">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight font-headline">Get in Touch</h2>
                <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Have a project in mind, or just want to say hi? Send me a message.
                </p>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
  <div className="mx-auto w-full max-w-8xl flex justify-center">
    <ContactForm />
  </div>
</ScrollReveal>
          </div>
        </section>
      </main>
      <VoiceTooltip />
    </div>
  );
}
