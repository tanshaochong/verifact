export async function POST(req: Request) {
  try {
    const { claim } = await req.json();

    const response = await fetch("https://api.perplexity.ai/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.PERPLEXITY_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "sonar-pro",
        messages: [
          {
            role: "system",
            content:
              "Determine if the user's claim is true, false or unverifiable.",
          },
          {
            role: "user",
            content: `${claim} Please output a JSON object containing the following fields: claim, verdict, confidence, and explanation (1-2 sentences explaining the reasoning).`,
          },
        ],
        response_format: {
          type: "json_schema",
          json_schema: {
            schema: {
              type: "object",
              properties: {
                claim: { type: "string" },
                verdict: {
                  type: "string",
                  enum: ["True", "False", "Unverifiable"],
                },
                confidence: {
                  type: "string",
                  enum: ["High", "Medium", "Low"],
                },
                explanation: { type: "string" },
              },
              required: ["claim", "verdict", "confidence", "explanation"],
            },
          },
        },
      }),
    });

    const data = await response.json();
    return Response.json(data);
  } catch (error) {
    console.error(error);
    return Response.json(
      { error: "Failed to process request" },
      { status: 500 },
    );
  }
}
