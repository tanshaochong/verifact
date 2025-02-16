import { Content } from "@tiptap/react";

export type VerdictType = "TRUE" | "FALSE" | "PARTIALLY TRUE" | "UNVERIFIABLE";
export type ConfidenceLevel = "High" | "Medium" | "Low";

export interface ClaimsResponse {
  claims: string[];
}

export interface VerificationResponse {
  choices: Array<{
    message: {
      content: string;
    };
  }>;
  citations?: string[];
}

export interface VerificationResult {
  isVerified: boolean;
  confidence: ConfidenceLevel;
  explanation: string;
  verdict: VerdictType;
}

export interface Claim {
  id: string;
  text: string;
}

export interface EditorProps {
  value: Content;
  setValue: (value: Content) => void;
}
