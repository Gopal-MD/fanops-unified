// Server-only helper for calling Lovable AI Gateway.
export interface TriageResult {
  priority: "Low" | "Medium" | "High";
  actionPlan: string;
}

export async function triageIncidentWithAI(report: string): Promise<TriageResult> {
  const key = process.env.LOVABLE_API_KEY;
  if (!key) throw new Error("Missing LOVABLE_API_KEY");

  const res = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${key}`,
    },
    body: JSON.stringify({
      model: "google/gemini-2.5-flash",
      messages: [
        {
          role: "system",
          content:
            "You are a stadium incident triage AI. Return concise, actionable plans in exactly 2 sentences. Respond ONLY as JSON matching the schema.",
        },
        {
          role: "user",
          content: `Incident report: ${report}\n\nReturn JSON: {"priority": "Low"|"Medium"|"High", "actionPlan": "<2 sentences>"}`,
        },
      ],
      response_format: {
        type: "json_schema",
        json_schema: {
          name: "triage",
          strict: true,
          schema: {
            type: "object",
            additionalProperties: false,
            properties: {
              priority: { type: "string", enum: ["Low", "Medium", "High"] },
              actionPlan: { type: "string" },
            },
            required: ["priority", "actionPlan"],
          },
        },
      },
    }),
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`AI gateway failed [${res.status}]: ${body}`);
  }
  const data = await res.json();
  const content = data.choices?.[0]?.message?.content ?? "{}";
  const parsed = JSON.parse(content);
  return {
    priority: parsed.priority ?? "Medium",
    actionPlan: parsed.actionPlan ?? "Review incident and dispatch appropriate team.",
  };
}
