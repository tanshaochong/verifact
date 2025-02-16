import { ClaimsResponse, VerificationResponse } from "@/types/api";

export const claimsService = {
  extractClaims: async (content: string): Promise<ClaimsResponse> => {
    const response = await fetch("/api/claims", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt: content }),
    });

    if (!response.ok) {
      throw new Error(`Failed to extract claims: ${response.statusText}`);
    }

    return response.json();
  },

  verifyClaim: async (claim: string): Promise<VerificationResponse> => {
    const response = await fetch("/api/verify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ claim }),
    });

    if (!response.ok) {
      throw new Error(`Failed to verify claim: ${response.statusText}`);
    }

    return response.json();
  },
};
