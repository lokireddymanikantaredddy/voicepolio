import { Header } from '@/components/header';
import { ProjectCard } from '@/components/project-card';
import { projects } from '@/lib/data';
import { ScrollReveal } from '@/components/scroll-reveal';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function ProjectsPage() {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <Header />
      <main className="flex-1">
        <section className="w-full py-8 md:py-12 lg:py-16">
          <div className="container px-4 md:px-6">
            <div className="flex items-center mb-8">
              <Button asChild variant="ghost" size="sm">
                <Link href="/#projects">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back
                </Link>
              </Button>
            </div>
            <ScrollReveal>
              <div className="flex flex-col items-center justify-center space-y-4 text-center">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline">All Projects</h1>
                  <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                    A complete showcase of my work and projects.
                  </p>
                </div>
              </div>
            </ScrollReveal>
            <div className="mx-auto grid grid-cols-1 md:grid-cols-2 gap-y-16 gap-x-8 max-w-6xl mt-12">
              {projects.map((project, index) => (
                <div
                  key={index}
                  className={`flex flex-col ${index % 2 === 0 ? 'md:items-start' : 'md:items-end'}`}
                >
                  <ScrollReveal delay={0.1 * index}>
                    <ProjectCard project={project} index={index} />
                  </ScrollReveal>
                  {/* Optionally add a testimonial/quote here */}
                  {/* <div className="mt-4 text-sm text-muted-foreground italic">"Testimonial here..."</div> */}
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
} 