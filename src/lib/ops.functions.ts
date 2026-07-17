import { createServerFn } from "@tanstack/react-start";

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

export const calculateRoute = createServerFn({ method: "POST" })
  .validator(
    (data: {
      start: string;
      destination: string;
      wheelchair: boolean;
      visualAssist: boolean;
      lowSensory: boolean;
    }) => data,
  )
  .handler(async ({ data }): Promise<RouteResult> => {
    const { start, destination, wheelchair, visualAssist, lowSensory } = data;
    const key = process.env.GROQ_API_KEY;

    // Fallback if no API key
    if (!key) {
      console.info("[calculateRoute] GROQ_API_KEY missing, using deterministic fallback.");
      const base: RouteStep[] = [
        { instruction: `Exit ${start || "your location"} heading east`, distanceM: 40, icon: "start" },
        { instruction: "Follow the main concourse", distanceM: 120, icon: "turn" },
        wheelchair
          ? { instruction: "Take the elevator up 1 level", distanceM: 15, icon: "elevator" }
          : { instruction: "Take the escalator up 1 level", distanceM: 20, icon: "escalator" },
        { instruction: "Turn right past the merchandise stand", distanceM: 60, icon: "turn" },
        {
          instruction: `Arrive at ${destination || "your destination"}`,
          distanceM: 25,
          icon: "arrive",
        },
      ];
      const distanceM = base.reduce((s, x) => s + x.distanceM, 0);
      const paceMps = wheelchair ? 0.9 : 1.35;
      const etaMinutes = Math.max(2, Math.round(distanceM / paceMps / 60));
  
      const notes: string[] = [];
      if (wheelchair) notes.push("Step-free route selected. Elevators prioritized.");
      if (visualAssist) notes.push("Audio guidance & high-contrast signage available along route.");
      if (lowSensory) notes.push("Quiet corridor selected. Avoids Fan Zone and DJ stage.");
      if (!notes.length) notes.push("Standard route — fastest available path.");
  
      return { etaMinutes, distanceM, steps: base, accessibilityNotes: notes };
    }

    try {
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
                "You are an AI routing system for a large stadium (MetLife Stadium for FIFA WC 2026). " +
                "Generate a step-by-step route from the start location to the destination. " +
                "Respond ONLY with valid JSON matching this schema: " +
                '{"etaMinutes": number, "distanceM": number, "steps": [{"instruction": string, "distanceM": number, "icon": "start"|"turn"|"stairs"|"elevator"|"escalator"|"arrive"}], "accessibilityNotes": [string]}. ' +
                "If wheelchair=true, use elevators instead of stairs/escalators. If lowSensory=true, suggest quieter paths. Ensure realistic distances and times."
            },
            {
              role: "user",
              content: `Start: ${start}. Destination: ${destination}. Wheelchair: ${wheelchair}. Visual Assist: ${visualAssist}. Low Sensory: ${lowSensory}.`,
            },
          ],
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to fetch route from Groq.");
      }

      const json = await res.json();
      const content = json.choices?.[0]?.message?.content ?? "{}";
      const result = JSON.parse(content) as RouteResult;
      
      // Safety defaults if AI hallucinates
      if (!result.steps || result.steps.length === 0) throw new Error("Invalid format");
      return result;
    } catch (e) {
      console.error("[calculateRoute] AI route generation failed, falling back:", e);
      // Simple fallback on error
      return {
        etaMinutes: 5,
        distanceM: 200,
        steps: [
          { instruction: `Head towards ${destination}`, distanceM: 200, icon: "start" },
          { instruction: `Arrive at ${destination}`, distanceM: 0, icon: "arrive" }
        ],
        accessibilityNotes: ["AI routing unavailable. Standard direct path assumed."]
      };
    }
  });

export const triageIncident = createServerFn({ method: "POST" })
  .validator((data: { report: string }) => data)
  .handler(async ({ data }) => {
    const { triageIncidentWithAI } = await import("./ai-gateway.server");
    return triageIncidentWithAI(data.report);
  });

export const askGroqAssistant = createServerFn({ method: "POST" })
  .validator((data: { question: string; context: string; lang?: string }) => data)
  .handler(async ({ data }): Promise<{ answer: string }> => {
    const key = process.env.GROQ_API_KEY;
    if (!key) {
      return { answer: "AI assistant unavailable — GROQ_API_KEY not configured." };
    }

    const languageInstruction = data.lang && data.lang !== "English" 
      ? ` Please reply in ${data.lang}.` 
      : "";

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
              "You are a helpful stadium assistant at a live football match. " +
              "Answer fan questions about navigation, facilities, food, and safety concisely in 1-2 sentences. " +
              "Be warm, friendly, and practical." + languageInstruction,
          },
          {
            role: "user",
            content: `Context: ${data.context}\n\nFan question: ${data.question}`,
          },
        ],
      }),
    });

    if (!res.ok) {
      return { answer: "Sorry, I couldn't fetch an answer right now. Please ask a staff member for help." };
    }

    const json = await res.json();
    const answer = json.choices?.[0]?.message?.content?.trim() ?? "I'm not sure — please ask nearby staff.";
    return { answer };
  });
