import { describe, it, expect } from "vitest";
import { findShortestPath, getLocalizedInstruction, STADIUM_ZONES } from "../../lib/routing";

describe("stadium dijkstra routing engine", () => {
  it("returns empty path when start and end are identical", () => {
    const result = findShortestPath("gA", "gA");
    expect(result).not.toBeNull();
    expect(result!.path).toEqual([]);
    expect(result!.totalDistance).toBe(0);
  });

  it("returns null for non-existent starting zone or destination", () => {
    expect(findShortestPath("nowhere", "gA")).toBeNull();
    expect(findShortestPath("gA", "nowhere")).toBeNull();
  });

  it("calculates shortest path correctly on the standard graph", () => {
    // Path from gA (Gate A) to s101: gA -> food -> s101 (40m + 30m = 70m)
    const result = findShortestPath("gA", "s101");
    expect(result).not.toBeNull();
    expect(result!.totalDistance).toBe(70);
    expect(result!.path.map((e) => e.to)).toEqual(["food", "s101"]);
  });

  it("wheelchair accessibility mode avoids stairs and routes via elevator", () => {
    // Path from food to s205:
    // Standard: food -> s205 (stairs, 40m)
    const standard = findShortestPath("food", "s205");
    expect(standard).not.toBeNull();
    expect(standard!.path.some((e) => e.means === "stairs")).toBe(true);
    expect(standard!.totalDistance).toBe(40);

    // Wheelchair: must avoid stairs, takes food -> conc -> s205 (elevator, 90m + 60m = 150m)
    // Wheelchair: must avoid stairs, takes food -> s101 -> conc -> s205 (elevator, 30m + 50m + 60m = 140m)
    const wheelchair = findShortestPath("food", "s205", { wheelchair: true });
    expect(wheelchair).not.toBeNull();
    expect(wheelchair!.path.some((e) => e.means === "stairs")).toBe(false);
    expect(wheelchair!.path.some((e) => e.means === "elevator")).toBe(true);
    expect(wheelchair!.totalDistance).toBe(140);
  });

  it("lowSensory mode avoids high-sensory food court if possible", () => {
    // Path from gB to s101:
    // Standard: gB -> conc -> s101 (45m + 50m = 95m)
    // There is no food court on this path, so standard is fine.
    const resultStandard = findShortestPath("gB", "s101", { lowSensory: true });
    expect(resultStandard!.path.map((e) => e.to)).toEqual(["conc", "s101"]);

    // Path from gA to conc:
    // Standard: gA -> food -> s101 -> conc (40m + 30m + 50m = 120m)
    const resultSensory = findShortestPath("gA", "conc", { lowSensory: true });
    expect(resultSensory!.path.map((e) => e.to)).toEqual(["food", "s101", "conc"]);
  });

  describe("getLocalizedInstruction()", () => {
    const walkEdge = { to: "conc", means: "walk" as const, stepFree: true, distance: 90 };
    const elevatorEdge = { to: "s205", means: "elevator" as const, stepFree: true, distance: 60 };
    const stairsEdge = { to: "s205", means: "stairs" as const, stepFree: false, distance: 40 };
    const rampEdge = { to: "s101", means: "ramp" as const, stepFree: true, distance: 30 };

    it("returns correct English translations", () => {
      expect(getLocalizedInstruction(walkEdge, "Concourse East", false, "English")).toBe(
        "Walk along the concourse to Concourse East",
      );
      expect(getLocalizedInstruction(walkEdge, "Concourse East", true, "English")).toBe(
        "Walk to arrive at your destination in Concourse East",
      );
      expect(getLocalizedInstruction(elevatorEdge, "Section 205", false, "English")).toBe(
        "Take the elevator to Section 205",
      );
      expect(getLocalizedInstruction(stairsEdge, "Section 205", false, "English")).toBe(
        "Take the stairs to Section 205",
      );
      expect(getLocalizedInstruction(rampEdge, "Section 101", false, "English")).toBe(
        "Use the ramp to Section 101",
      );
    });

    it("returns correct Spanish translations", () => {
      expect(getLocalizedInstruction(walkEdge, "Vestíbulo Este", false, "Español")).toBe(
        "Camine por el pasillo hacia el Vestíbulo Este",
      );
      expect(getLocalizedInstruction(walkEdge, "Vestíbulo Este", true, "Español")).toBe(
        "Camine y llegue a su destino en Vestíbulo Este",
      );
      expect(getLocalizedInstruction(elevatorEdge, "Sección 205", false, "Español")).toBe(
        "Tome el ascensor hasta el Sección 205",
      );
    });

    it("returns correct French translations", () => {
      expect(getLocalizedInstruction(walkEdge, "Hall Est", false, "Français")).toBe(
        "Marchez vers Hall Est",
      );
      expect(getLocalizedInstruction(walkEdge, "Hall Est", true, "Français")).toBe(
        "Marchez pour arriver à votre destination à Hall Est",
      );
      expect(getLocalizedInstruction(elevatorEdge, "Section 205", false, "Français")).toBe(
        "Prenez l'ascenseur jusqu'à Section 205",
      );
    });
  });
});
