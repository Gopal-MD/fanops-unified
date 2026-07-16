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
  .inputValidator(
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
  .inputValidator((data: { report: string }) => data)
  .handler(async ({ data }) => {
    const { triageIncidentWithAI } = await import("./ai-gateway.server");
    return triageIncidentWithAI(data.report);
  });
