import { Badge } from "@/components/ui/badge";

export function SkillBadge({ skill }: { skill: string }) {
  return (
    <Badge variant="outline" className="px-4 py-2 text-sm bg-background">
      {skill}
    </Badge>
  );
}
