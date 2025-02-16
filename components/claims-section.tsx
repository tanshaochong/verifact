"use client";

import * as React from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Frown, Loader2, ScrollText } from "lucide-react";
import { ClaimItem } from "@/components/claim-item";
import { useClaims } from "@/hooks/use-claims";
import { ClaimsErrorBoundary } from "@/components/claims-error-boundary";

interface ClaimsSectionProps {
  content: string;
}

function LoadingState() {
  return (
    <div className="flex h-full w-full flex-col">
      <div className="flex flex-1 flex-col items-center justify-center gap-6">
        <div className="rounded-md border-2 border-muted-foreground p-4">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
        <div className="flex flex-col gap-2 text-center">
          <h3 className="font-semibold">Extracting Claims</h3>
          <p className="max-w-sm text-balance text-sm text-muted-foreground">
            Analyzing your content to identify verifiable claims...
          </p>
        </div>
      </div>
    </div>
  );
}

function EmptyState({
  onExtract,
  isLoading,
}: {
  onExtract: () => void;
  isLoading: boolean;
}) {
  return (
    <div className="flex h-full w-full flex-col">
      <div className="flex flex-1 flex-col items-center justify-center gap-6">
        <div className="rounded-md border-2 border-muted-foreground p-4">
          <ScrollText className="h-8 w-8 text-muted-foreground" />
        </div>
        <div className="flex flex-col gap-2 text-center">
          <h3 className="font-semibold">No Claims Yet</h3>
          <p className="max-w-sm text-balance text-sm text-muted-foreground">
            Click below to analyze your content and extract claims for
            verification.
          </p>
        </div>
        <Button
          className="w-64 py-4 font-semibold"
          size="lg"
          onClick={onExtract}
          disabled={isLoading}
        >
          Extract & Verify Claims
        </Button>
      </div>
    </div>
  );
}

function NoClaimsFound({
  onRetry,
  isLoading,
}: {
  onRetry: () => void;
  isLoading: boolean;
}) {
  return (
    <div className="flex h-full w-full flex-col">
      <div className="flex flex-1 flex-col items-center justify-center gap-6">
        <div className="rounded-md border-2 border-muted-foreground p-4">
          <Frown className="h-8 w-8 text-muted-foreground" />
        </div>
        <div className="flex flex-col gap-2 text-center">
          <h3 className="font-semibold">No Claims Found</h3>
          <p className="max-w-sm text-balance text-sm text-muted-foreground">
            We couldn&apos;t identify any verifiable claims in your content. Try
            modifying your text or try again.
          </p>
        </div>
        <Button
          className="w-64 py-4 font-semibold"
          size="lg"
          onClick={onRetry}
          disabled={isLoading}
        >
          Try Again
        </Button>
      </div>
    </div>
  );
}

export function ClaimsSection({ content }: ClaimsSectionProps) {
  return (
    <ClaimsErrorBoundary>
      <ClaimsSectionContent content={content} />
    </ClaimsErrorBoundary>
  );
}

function ClaimsSectionContent({ content }: ClaimsSectionProps) {
  const {
    claims,
    isExtracting,
    hasErrors,
    isLoading,
    handleExtractClaims,
    verificationQueries,
    claimsQueryState,
  } = useClaims(content);

  // Show loading state during extraction
  if (isExtracting) {
    return <LoadingState />;
  }

  // Show empty state when no extraction has been attempted yet
  if (claimsQueryState.status === "pending") {
    return <EmptyState onExtract={handleExtractClaims} isLoading={isLoading} />;
  }

  // Show no claims found when extraction was attempted but found no claims
  if (
    claimsQueryState.status === "success" &&
    (!claims || claims.length === 0)
  ) {
    return (
      <NoClaimsFound onRetry={handleExtractClaims} isLoading={isLoading} />
    );
  }

  return (
    <div className="flex h-full w-full flex-col gap-4">
      {hasErrors && (
        <Alert variant="destructive">
          <AlertDescription>
            Some claims failed to verify. Please try again or check your
            connection.
          </AlertDescription>
        </Alert>
      )}
      <Button
        className="w-full py-4 font-semibold"
        size="lg"
        onClick={handleExtractClaims}
        disabled={isLoading}
      >
        {isLoading ? "Processing..." : "Extract & Verify Claims"}
      </Button>
      <div className="space-y-4 overflow-y-auto pb-12">
        {claims?.map((claim, index) => (
          <ClaimItem
            key={claim.id}
            claim={claim}
            verificationResult={verificationQueries[index]?.data}
            isVerifying={verificationQueries[index]?.isPending}
            error={verificationQueries[index]?.error as Error}
            onRetry={() => verificationQueries[index]?.refetch()}
          />
        ))}
      </div>
    </div>
  );
}
