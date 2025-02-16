import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { AlertTriangle, RefreshCw } from "lucide-react";
import { ErrorBoundary } from "./error-boundary";

export function ClaimsErrorFallback({
  error,
  resetErrorBoundary,
}: {
  error: Error;
  resetErrorBoundary: () => void;
}) {
  return (
    <Alert variant="destructive" className="my-4">
      <AlertTriangle className="h-4 w-4" />
      <AlertTitle>Failed to Process Claims</AlertTitle>
      <AlertDescription className="mt-2">
        <p className="mb-2">
          We encountered an error while processing your claims: {error.message}
        </p>
        <Button variant="outline" onClick={resetErrorBoundary} className="mt-2">
          <RefreshCw className="mr-2 h-4 w-4" />
          Try Again
        </Button>
      </AlertDescription>
    </Alert>
  );
}

interface ClaimsErrorBoundaryProps {
  children: React.ReactNode;
}

export function ClaimsErrorBoundary({ children }: ClaimsErrorBoundaryProps) {
  return (
    <ErrorBoundary fallback={ClaimsErrorFallback}>{children}</ErrorBoundary>
  );
}
