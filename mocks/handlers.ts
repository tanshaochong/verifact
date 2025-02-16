import { http, HttpResponse } from "msw";
import type {
  ClaimsResponse,
  VerificationResponse,
  VerificationResult,
  VerdictType,
  ConfidenceLevel,
} from "@/types/api";

interface VerifyRequest {
  claim: string;
}

interface ExtractClaimsRequest {
  prompt: string;
}

const MOCK_CITATIONS = [
  "https://www.worldatlas.com/articles/who-invented-the-paperclip.html",
  "https://en.wikipedia.org/wiki/Paper_clip",
  "https://www.smithsonianmag.com/arts-culture/history-paper-clip-180972878/",
];

export const handlers = [
  http.post<never, VerifyRequest>("/api/verify", async ({ request }) => {
    const { claim } = await request.json();

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 800));

    // Simulate random failures (30% chance)
    if (Math.random() < 0.3) {
      return HttpResponse.json(
        { error: "Failed to verify claim" },
        { status: 500 },
      );
    }

    const verificationResult: VerificationResult = {
      isVerified: true,
      verdict: "TRUE" as VerdictType,
      confidence: "High" as ConfidenceLevel,
      explanation:
        "This claim has been verified through multiple reliable sources.",
    };

    const response: VerificationResponse = {
      choices: [
        {
          message: {
            content: JSON.stringify(verificationResult),
          },
        },
      ],
      citations: MOCK_CITATIONS,
    };

    return HttpResponse.json(response);
  }),

  http.post<never, ExtractClaimsRequest>("/api/claims", async ({ request }) => {
    const { prompt } = await request.json();

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 600));

    // Simulate random failures (20% chance)
    if (Math.random() < 0.2) {
      return HttpResponse.json(
        { error: "Failed to extract claims" },
        { status: 500 },
      );
    }

    // Generate 1-3 mock claims based on the input text
    const numClaims = Math.floor(Math.random() * 3) + 1;
    const claims = Array(numClaims)
      .fill(null)
      .map((_, i) => `Mock Claim ${i + 1} from: "${prompt.slice(0, 30)}..."`);

    const response: ClaimsResponse = {
      claims,
    };

    return HttpResponse.json(response);
  }),
];
