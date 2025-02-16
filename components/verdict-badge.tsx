import { Badge } from "@/components/ui/badge";
import { VerdictType } from "@/types/api";

interface VerdictBadgeProps {
  verdict: VerdictType;
}

const verdictVariants: Record<
  VerdictType,
  "green" | "red" | "yellow" | "secondary"
> = {
  TRUE: "green",
  FALSE: "red",
  "PARTIALLY TRUE": "yellow",
  UNVERIFIABLE: "secondary",
};

export function VerdictBadge({ verdict }: VerdictBadgeProps) {
  return (
    <Badge variant={verdictVariants[verdict]} className="font-medium">
      {verdict}
    </Badge>
  );
}
