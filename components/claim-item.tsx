"use client";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Claim, VerificationResponse, VerificationResult } from "@/types/api";
import { AlertCircle, Loader2, RefreshCw } from "lucide-react";
import { VerificationDetails } from "@/components/verification-details";
import { ErrorBoundary } from "@/components/error-boundary";

interface ClaimItemProps {
  claim: Claim;
  verificationResult?: VerificationResponse;
  isVerifying: boolean;
  error?: Error | null;
  onRetry?: () => void;
}

export function ClaimItem(props: ClaimItemProps) {
  return (
    <ErrorBoundary>
      <ClaimItemContent {...props} />
    </ErrorBoundary>
  );
}

function ClaimItemContent({
  claim,
  verificationResult,
  isVerifying,
  error,
  onRetry,
}: ClaimItemProps) {
  const parseVerificationResult = (): VerificationResult | null => {
    if (!verificationResult?.choices[0]?.message?.content) return null;
    try {
      return JSON.parse(verificationResult.choices[0].message.content);
    } catch (e) {
      console.error("Failed to parse verification result:", e);
      return null;
    }
  };

  const result = parseVerificationResult();

  return (
    <div className="rounded-md border bg-background p-4 shadow-sm">
      <p className="text-sm font-medium text-foreground">{claim.text}</p>
      <div className="mt-2">
        {isVerifying ? (
          <div className="flex items-center text-sm text-muted-foreground">
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Verifying...
          </div>
        ) : error ? (
          <div className="space-y-2">
            <Alert variant="destructive" className="py-2">
              <AlertDescription className="ml-2 text-sm">
                {error.message || "Failed to verify this claim"}
              </AlertDescription>
            </Alert>
            {onRetry && (
              <Button
                variant="outline"
                size="sm"
                onClick={onRetry}
                className="w-full shadow-none"
              >
                <RefreshCw className="mr-2 h-4 w-4" />
                Retry Verification
              </Button>
            )}
          </div>
        ) : result ? (
          <VerificationDetails
            result={result}
            citations={verificationResult?.citations}
          />
        ) : verificationResult && !result ? (
          <Alert variant="destructive" className="py-2">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription className="ml-2 text-sm">
              Failed to parse verification result
            </AlertDescription>
          </Alert>
        ) : null}
      </div>
    </div>
  );
}
