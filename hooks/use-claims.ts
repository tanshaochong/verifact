import { MESSAGES } from "@/constants/messages";
import { useToast } from "@/hooks/use-toast";
import { claimsService } from "@/services/claims";
import { Claim, ClaimsResponse } from "@/types/api";
import {
  useMutation,
  useQueries,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import * as React from "react";
import { v4 as uuidv4 } from "uuid";

interface MutationContext {
  previousClaims: Claim[] | undefined;
}

export function useClaims(content: string) {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const claimsQuery = useQuery<Claim[]>({
    queryKey: ["claims"],
    enabled: false, // Disable automatic fetching
  });

  const { mutate: extractClaims, isPending: isExtracting } = useMutation<
    ClaimsResponse,
    Error,
    string,
    MutationContext
  >({
    mutationFn: claimsService.extractClaims,
    onMutate: async (content) => {
      await queryClient.cancelQueries({ queryKey: ["verification"] });
      const previousClaims = queryClient.getQueryData<Claim[]>(["claims"]);
      return { previousClaims };
    },
    onSuccess: (data, _, context) => {
      const claimsWithIds = data.claims.map((claim) => ({
        id: uuidv4(),
        text: claim,
      }));

      queryClient.setQueryData<Claim[]>(["claims"], claimsWithIds);

      if (claimsWithIds.length === 0) {
        toast({
          title: MESSAGES.NO_CLAIMS_FOUND.TITLE,
          description: MESSAGES.NO_CLAIMS_FOUND.DESCRIPTION,
        });
      } else {
        toast({
          title: MESSAGES.CLAIMS_EXTRACTED.TITLE,
          description: MESSAGES.CLAIMS_EXTRACTED.getDescription(
            claimsWithIds.length,
          ),
        });
      }

      claimsWithIds.forEach((claim) => {
        queryClient.prefetchQuery({
          queryKey: ["verification", claim.id],
          queryFn: () => claimsService.verifyClaim(claim.text),
        });
      });
    },
    onError: (error: Error, _, context) => {
      if (context?.previousClaims) {
        queryClient.setQueryData<Claim[]>(["claims"], context.previousClaims);
      }

      toast({
        variant: "destructive",
        title: "Error",
        description: MESSAGES.ERROR.EXTRACTION,
      });
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["claims"] });
    },
  });

  const verificationQueries = useQueries({
    queries: (claimsQuery.data ?? []).map((claim) => ({
      queryKey: ["verification", claim.id],
      queryFn: () => claimsService.verifyClaim(claim.text),
      enabled: !!claim.id && claimsQuery.status === "success",
      retry: 2,
      staleTime: 5 * 60 * 1000,
      onError: (error: Error) => {
        toast({
          variant: "destructive",
          title: "Error",
          description: MESSAGES.ERROR.VERIFICATION,
        });
      },
    })),
  });

  const isVerifying = verificationQueries.some((query) => query.isPending);
  const hasErrors = verificationQueries.some((query) => query.isError);

  const handleExtractClaims = React.useCallback(() => {
    if (!content?.trim()) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please provide some content to analyze.",
      });
      return;
    }

    extractClaims(content);
  }, [content, extractClaims]);

  return {
    claims: claimsQuery.data,
    isExtracting,
    hasErrors,
    isLoading: isExtracting || isVerifying,
    handleExtractClaims,
    verificationQueries,
    claimsQueryState: claimsQuery,
  };
}
