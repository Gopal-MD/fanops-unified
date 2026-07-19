import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { findShortestPath, getLocalizedInstruction, STADIUM_ZONES } from "./routing";

export interface RouteStep {
  instruction: string;
  distanceM: number;
  icon: "start" | "turn" | "stairs" | "elevator" | "escalator" | "arrive";
}

export interface RouteResult {
  etaMinutes: number;
  distanceM: number;
  steps: RouteStep[];
  accessibilityNotes: string[];
}

/**
 * Calculates a dynamic, accessible route through the stadium.
 * Runs Dijkstra's algorithm deterministically before using Groq LLaMA for phrasing.
 */
export const calculateRoute = createServerFn({ method: "POST" })
  .validator((data: unknown) => {
    return z
      .object({
        start: z.string().max(100),
        destination: z.string().max(100),
        wheelchair: z.boolean(),
        visualAssist: z.boolean(),
        lowSensory: z.boolean(),
        lang: z.string().max(50).optional(),
      })
      .parse(data);
  })
  .handler(async ({ data }): Promise<RouteResult> => {
    const { start, destination, wheelchair, visualAssist, lowSensory, lang = "English" } = data;
    const key = process.env.GROQ_API_KEY;

    // 1. Resolve path deterministically using Dijkstra rules engine
    const resolvedRoute = findShortestPath(start, destination, { wheelchair, lowSensory });

    if (!resolvedRoute) {
      console.warn(`[routing] No route found from ${start} to ${destination}`);
      return {
        etaMinutes: 5,
        distanceM: 0,
        steps: [
          { instruction: `Proceed directly to ${destination}.`, distanceM: 0, icon: "start" },
        ],
        accessibilityNotes: ["No route found matching accessibility constraints."],
      };
    }

    // 2. Build local steps
    const steps: RouteStep[] = resolvedRoute.path.map((edge, idx) => {
      const isFinal = idx === resolvedRoute.path.length - 1;
      const targetZone = STADIUM_ZONES[edge.to];
      const name = targetZone.names[lang] || targetZone.names["English"] || edge.to;
      const icon =
        edge.means === "stairs"
          ? "stairs"
          : edge.means === "elevator"
            ? "elevator"
            : edge.means === "ramp"
              ? "elevator"
              : "turn";
      return {
        instruction: getLocalizedInstruction(edge, name, isFinal, lang),
        distanceM: edge.distance,
        icon,
      };
    });

    // Calculate pace-based ETA
    const paceMps = wheelchair ? 0.8 : 1.3;
    const etaMinutes = Math.max(1, Math.round(resolvedRoute.totalDistance / paceMps / 60));

    const notes: string[] = [];
    if (wheelchair)
      notes.push(
        lang === "Español"
          ? "Ruta sin escaleras seleccionada. Ascensores priorizados."
          : "Step-free route selected. Elevators prioritized.",
      );
    if (visualAssist)
      notes.push(
        lang === "Español"
          ? "Guía por audio disponible en el camino."
          : "Audio guidance & high-contrast signage available along route.",
      );
    if (lowSensory)
      notes.push(
        lang === "Español"
          ? "Ruta de bajo estímulo seleccionada."
          : "Quiet corridor selected. Avoids busy food courts.",
      );

    // 3. Fallback to templates if Groq API key is absent
    if (!key) {
      console.info("[calculateRoute] GROQ_API_KEY missing. Returning deterministic path.");
      return {
        etaMinutes,
        distanceM: resolvedRoute.totalDistance,
        steps,
        accessibilityNotes: notes,
      };
    }

    try {
      // 4. Grounded LLM phrasing
      const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${key}`,
        },
        body: JSON.stringify({
          model: "llama-3.3-70b-versatile",
          temperature: 0.2,
          max_tokens: 300,
          response_format: { type: "json_object" },
          messages: [
            {
              role: "system",
              content:
                "You are the FIFA World Cup 2026 Stadium Navigation Phrasing AI. " +
                "Phrase the route steps in natural language for the fan. " +
                "CRITICAL: You MUST output exactly the same number of steps as provided in the Input Steps. Do NOT combine or summarize steps. " +
                "Translate or phrase each individual step into a helpful instruction. " +
                "Do NOT invent zones or facilities that are not in the input. " +
                "Ensure the reply matches the requested language. " +
                "Respond ONLY with valid JSON matching this schema: " +
                '{"etaMinutes": number, "distanceM": number, "steps": [{"instruction": string, "distanceM": number, "icon": string}], "accessibilityNotes": [string]}.',
            },
            {
              role: "user",
              content: `Language: ${lang}. Start: ${start}. Destination: ${destination}. Total Distance: ${resolvedRoute.totalDistance}m. ETA: ${etaMinutes} mins. Input Steps: ${JSON.stringify(steps)}. Accessibility Notes: ${JSON.stringify(notes)}.`,
            },
          ],
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to phrase route from Groq.");
      }

      const json = await res.json();
      let content = json.choices?.[0]?.message?.content ?? "{}";
      
      // Strip markdown code blocks if the LLM added them
      content = content.replace(/^```json\s*/, "").replace(/^```\s*/, "").replace(/\s*```$/, "").trim();
      
      const result = JSON.parse(content) as RouteResult;

      if (!result.steps || result.steps.length === 0) throw new Error("Invalid format");
      
      // Safety constraint: LLM must not hallucinate different number of steps
      if (result.steps.length !== steps.length) {
         console.warn("[routing] LLM changed step count. Falling back to deterministic steps.");
         throw new Error("Step count mismatch");
      }

      // Enforce data integrity: use LLM phrasing, but retain deterministic distances and icons
      result.steps = result.steps.map((aiStep, idx) => ({
        instruction: aiStep.instruction || steps[idx].instruction,
        distanceM: steps[idx].distanceM,
        icon: steps[idx].icon
      }));
      
      return result;
    } catch (e) {
      console.error("[calculateRoute] AI route phrasing failed, returning deterministic steps:", e);
      return {
        etaMinutes,
        distanceM: resolvedRoute.totalDistance,
        steps,
        accessibilityNotes: notes,
      };
    }
  });

/**
 * Triages an incident report using AI, falling back to local deterministic rules.
 * @param {string} data.report - The raw text of the incident.
 */
export const triageIncident = createServerFn({ method: "POST" })
  .validator((data: unknown) => {
    return z
      .object({
        report: z.string().max(2000), // Max 2k characters to prevent abuse
      })
      .parse(data);
  })
  .handler(async ({ data }) => {
    const { triageIncidentWithAI } = await import("./ai-gateway.server");
    return triageIncidentWithAI(data.report);
  });

/**
 * Connects fans directly to Groq LLaMA 3.3 for live match questions.
 * @param {string} data.question - The fan's question.
 * @param {string} data.context - Hidden context (venue, live status).
 * @param {string} [data.lang] - The preferred language of the fan.
 */
export const askGroqAssistant = createServerFn({ method: "POST" })
  .validator((data: unknown) => {
    return z
      .object({
        question: z.string().max(500), // Limit question length
        context: z.string().max(1000),
        lang: z.string().max(50).optional(),
      })
      .parse(data);
  })
  .handler(async ({ data }): Promise<{ answer: string }> => {
    const key = process.env.GROQ_API_KEY;
    if (!key) {
      return { answer: "AI assistant unavailable — GROQ_API_KEY not configured." };
    }

    const languageInstruction =
      data.lang && data.lang !== "English" ? ` Please reply in ${data.lang}.` : "";

    const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${key}`,
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        temperature: 0.4,
        max_tokens: 150,
        messages: [
          {
            role: "system",
            content:
              "You are the Official FIFA World Cup 2026 Multilingual Fan & Volunteer Assistant. " +
              "Your persona is a helpful and professional Tournament Ambassador. " +
              "Provide quick, practical operational intelligence support to Fans, Organizers, Volunteers, and Venue Staff. " +
              "Cover questions about match info, navigation, accessibility, crowd density redirection, and transit/transport dispatch. " +
              "Keep answers concise (1-2 sentences) and warm." +
              languageInstruction,
          },
          {
            role: "user",
            content: `Context: ${data.context}\n\nFan question: ${data.question}`,
          },
        ],
      }),
    });

    if (!res.ok) {
      return {
        answer: "Sorry, I couldn't fetch an answer right now. Please ask a staff member for help.",
      };
    }

    const json = await res.json();
    const answer =
      json.choices?.[0]?.message?.content?.trim() ?? "I'm not sure — please ask nearby staff.";
    return { answer };
  });
