import { VerdictType, VerificationResult } from "@/types/api";
import { VerdictBadge } from "@/components/verdict-badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface VerificationDetailsProps {
  result: VerificationResult;
  citations?: string[];
}

export function VerificationDetails({
  result,
  citations,
}: VerificationDetailsProps) {
  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="details" className="border-b-0">
        <AccordionTrigger className="p-0 text-sm text-gray-700 hover:no-underline">
          <div className="flex items-center gap-3">
            <VerdictBadge
              verdict={result.verdict.toUpperCase() as VerdictType}
            />
            <span className="text-sm text-muted-foreground">
              Confidence: {result.confidence}
            </span>
          </div>
        </AccordionTrigger>
        <AccordionContent className="pb-0">
          <div className="mt-3 space-y-3">
            <p className="text-sm text-muted-foreground">
              {result.explanation}
            </p>
            {citations?.length ? (
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">
                  Sources:
                </p>
                <ol className="list-inside list-decimal space-y-1">
                  {citations.map((citation, index) => (
                    <li key={index} className="text-sm">
                      <a
                        href={citation}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        {citation}
                      </a>
                    </li>
                  ))}
                </ol>
              </div>
            ) : null}
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
