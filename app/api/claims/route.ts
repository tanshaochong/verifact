import { openai } from "@ai-sdk/openai";
import { generateObject } from "ai";
import { z } from "zod";

const SYSTEM_PROMPT = `
Please analyze the following text and extract verifiable, objective claims, where a claim may span multiple sentences if they are semantically related and form a single complete factual assertion. Focus on factual statements that can be proven true or false through evidence, data, or reliable sources.
Key requirements:

Return an empty array if the input contains no verifiable claims
Exclude greetings, pleasantries, or meaningless phrases (e.g., "hi", "hello", "thanks")
Exclude opinions, value judgments, and subjective interpretations
Format each claim as a complete declarative statement
Combine closely related sentences that form a single factual assertion into one claim
Preserve important contextual relationships between facts when they form a single verifiable claim

Format the output as a JSON object with an array of claims.
Example inputs and outputs:
Input: "The Golden Gate Bridge, completed in 1937, is one of the most beautiful landmarks in the world. Its striking red color and Art Deco details make it a marvel of engineering, spanning 4,200 feet across the San Francisco Bay. The bridge connects San Francisco to Marin County and carries both vehicle and pedestrian traffic."
Output: {
"claims": [
"The Golden Gate Bridge was completed in 1937 and spans 4,200 feet across the San Francisco Bay",
"The Golden Gate Bridge connects San Francisco to Marin County and accommodates both vehicle and pedestrian traffic"
]
}
Input: "The Wright brothers made their first successful flight at Kitty Hawk in 1903. The flight lasted 12 seconds and covered 120 feet. This historic achievement made them the first to achieve sustained flight with a powered, controlled aircraft."
Output: {
"claims": [
"The Wright brothers achieved the first sustained flight with a powered, controlled aircraft in 1903 at Kitty Hawk, with their flight lasting 12 seconds and covering 120 feet"
]
}
Input: "Hi, how are you doing today? Hope you're well!"
Output: {
"claims": []
}
Please process the following text:
`;

export async function POST(req: Request) {
  const { prompt }: { prompt: string } = await req.json();

  const result = await generateObject({
    model: openai("gpt-4o-mini"),
    system: SYSTEM_PROMPT,
    prompt,
    schema: z.object({
      claims: z.array(
        z
          .string()
          .min(1)
          .describe(
            "A verifiable, objective claim expressed as a simple declarative statement",
          ),
      ),
    }),
  });

  return result.toJsonResponse();
}
