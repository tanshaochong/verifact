export const MESSAGES = {
  NO_CLAIMS_FOUND: {
    TITLE: "No Claims Found",
    DESCRIPTION:
      "We couldn't identify any verifiable claims in your content. Try modifying your text to include more factual statements.",
  },
  CLAIMS_EXTRACTED: {
    TITLE: "Claims Extracted",
    getDescription: (count: number) =>
      `Successfully extracted ${count} ${count === 1 ? "claim" : "claims"} from your content.`,
  },
  ERROR: {
    VERIFICATION: "Failed to verify claim",
    EXTRACTION: "Failed to extract claims from your content",
  },
} as const;
