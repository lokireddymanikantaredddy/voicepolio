import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { GraduationCap } from 'lucide-react';

export type Education = {
  institution: string;
  degree: string;
  years: string;
  description: string;
};

export function EducationCard({ education }: { education: Education }) {
  return (
    <Card className="transition-all duration-300 hover:shadow-lg">
      <CardHeader className="grid grid-cols-[auto_1fr_auto] items-start gap-4 space-y-0">
        <div className="p-3 bg-muted rounded-full">
            <GraduationCap className="h-6 w-6 text-primary" />
        </div>
        <div className="space-y-1 text-left">
          <CardTitle className="text-xl font-headline">{education.degree}</CardTitle>
          <CardDescription>{education.institution}</CardDescription>
        </div>
        <div className="text-muted-foreground text-sm font-medium">
            {education.years}
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground text-sm text-left">{education.description}</p>
      </CardContent>
    </Card>
  );
}
