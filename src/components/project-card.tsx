import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ExternalLink, Github } from 'lucide-react';

export type Project = {
  title: string;
  description: string;
  imageUrl: string;
  imageHint?: string;
  tags: string[];
  liveUrl?: string;
  repoUrl?: string;
};

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Card className="flex flex-col h-full overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
      <CardHeader className="p-0">
        <Image
          src={project.imageUrl}
          data-ai-hint={project.imageHint}
          alt={`Screenshot of ${project.title}`}
          width={600}
          height={400}
          className="object-cover w-full h-48"
        />
      </CardHeader>
      <CardContent className="p-6 flex-1">
        <CardTitle className="text-xl font-headline mb-2">{project.title}</CardTitle>
        <p className="text-muted-foreground text-sm mb-4">{project.description}</p>
        <div className="flex flex-wrap gap-2">
          {project.tags.map(tag => (
            <Badge key={tag} variant="secondary">{tag}</Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter className="p-6 pt-0 flex gap-2">
        {project.liveUrl && (
          <Button asChild className="flex-1">
            <Link href={project.liveUrl} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="mr-2 h-4 w-4" /> Live Demo
            </Link>
          </Button>
        )}
        {project.repoUrl && (
          <Button asChild variant="outline" className="flex-1">
            <Link href={project.repoUrl} target="_blank" rel="noopener noreferrer">
              <Github className="mr-2 h-4 w-4" /> Source
            </Link>
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
