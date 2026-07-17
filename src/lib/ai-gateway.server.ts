// Server-only helper for incident triage.
// Uses Lovable AI Gateway when LOVABLE_API_KEY is set.
// Falls back to a smart local rule-based engine when the key is absent.

export interface TriageResult {
  priority: "Low" | "Medium" | "High";
  actionPlan: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// Rule-based local fallback
// ─────────────────────────────────────────────────────────────────────────────
const HIGH_KEYWORDS = [
  "unconscious", "cardiac", "collapse", "collapsed", "heart attack",
  "fire", "smoke", "explosion", "weapon", "knife", "gun", "bomb",
  "suspicious", "unattended bag", "threat", "fight", "assault",
  "medical emergency", "not breathing", "blood", "injury", "injured",
];

const MEDIUM_KEYWORDS = [
  "lost child", "lost", "crowd", "congestion", "overcrowded",
  "spill", "slip", "fall", "faint", "dizzy", "drunk",
  "broken", "damage", "stuck", "trapped", "elevator",
  "harassment", "argument", "confrontation",
];

function buildActionPlan(text: string, priority: "High" | "Medium" | "Low"): string {
  if (text.includes("unconscious") || text.includes("collapse") || text.includes("medical emergency") || text.includes("not breathing")) {
    return "Dispatch first aid team and call emergency services immediately. Clear a 5-metre radius around the patient and guide paramedics from the nearest gate.";
  }
  if (text.includes("fire") || text.includes("smoke") || text.includes("explosion")) {
    return "Activate fire protocol — alert security lead and initiate evacuation of the affected zone. Contact the fire brigade and keep all exits clear.";
  }
  if (text.includes("suspicious") || text.includes("unattended bag") || text.includes("weapon") || text.includes("bomb")) {
    return "Secure a 15-metre perimeter immediately and notify the K9 unit and security lead. Do not touch the item — await specialist clearance before resuming normal operations.";
  }
  if (text.includes("fight") || text.includes("assault") || text.includes("threat")) {
    return "Dispatch security personnel to the scene immediately and separate involved parties. Document witness accounts and escalate to police if required.";
  }
  if (text.includes("lost child") || text.includes("lost")) {
    return "Escort the individual to Guest Services and make a PA announcement in English and local language. Coordinate with nearby staff to locate the guardian within 10 minutes.";
  }
  if (text.includes("spill") || text.includes("slip")) {
    return "Dispatch janitorial team to the reported location within 5 minutes. Place caution signage immediately to prevent slip hazards until the area is cleared.";
  }
  if (text.includes("crowd") || text.includes("congestion") || text.includes("overcrowded")) {
    return "Activate crowd-flow protocol — open auxiliary exits and redirect fans via PA announcement. Alert section stewards to manage queuing and prevent further build-up.";
  }
  if (text.includes("injury") || text.includes("injured") || text.includes("blood")) {
    return "Dispatch medical staff to assess the injury on site. Arrange transport to first aid station if the fan is unable to walk unassisted.";
  }
  if (priority === "High") {
    return "Dispatch security and medical personnel to the location immediately. Assess the situation and escalate to emergency services if required.";
  }
  if (priority === "Medium") {
    return "Assign the nearest available staff member to attend and assess. Document findings and update incident status within 15 minutes.";
  }
  return "Log the incident and assign the nearest available staff member to investigate. Monitor the situation and escalate if conditions worsen.";
}

function localTriage(report: string): TriageResult {
  const text = report.toLowerCase();

  if (HIGH_KEYWORDS.some((kw) => text.includes(kw))) {
    return { priority: "High", actionPlan: buildActionPlan(text, "High") };
  }
  if (MEDIUM_KEYWORDS.some((kw) => text.includes(kw))) {
    return { priority: "Medium", actionPlan: buildActionPlan(text, "Medium") };
  }
  return { priority: "Low", actionPlan: buildActionPlan(text, "Low") };
}

// ─────────────────────────────────────────────────────────────────────────────
// Main export
// ─────────────────────────────────────────────────────────────────────────────
export async function triageIncidentWithAI(report: string): Promise<TriageResult> {
  const key = process.env.LOVABLE_API_KEY;

  // No API key → use local rule-based engine (no error thrown)
  if (!key) {
    console.info("[AI Triage] LOVABLE_API_KEY not set — using local rule-based triage.");
    return localTriage(report);
  }

  // API key present → call Lovable AI gateway with fallback on failure
  try {
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
      console.warn(`[AI Triage] Gateway error [${res.status}] — falling back to local triage. ${body}`);
      return localTriage(report);
    }

    const data = await res.json();
    const content = data.choices?.[0]?.message?.content ?? "{}";
    const parsed = JSON.parse(content);
    return {
      priority: parsed.priority ?? "Medium",
      actionPlan: parsed.actionPlan ?? "Review incident and dispatch appropriate team.",
    };
  } catch (err) {
    console.warn("[AI Triage] Network error — falling back to local triage:", err);
    return localTriage(report);
  }
}
