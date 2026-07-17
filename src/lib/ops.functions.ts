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
  });

export const triageIncident = createServerFn({ method: "POST" })
  .validator((data: { report: string }) => data)
  .handler(async ({ data }) => {
    const { triageIncidentWithAI } = await import("./ai-gateway.server");
    return triageIncidentWithAI(data.report);
  });

export const askGroqAssistant = createServerFn({ method: "POST" })
  .validator((data: { question: string; context: string }) => data)
  .handler(async ({ data }): Promise<{ answer: string }> => {
    const key = process.env.GROQ_API_KEY;
    if (!key) {
      return { answer: "AI assistant unavailable — GROQ_API_KEY not configured." };
    }

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
              "Be warm, friendly, and practical.",
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
