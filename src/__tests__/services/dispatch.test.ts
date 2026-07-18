import { describe, it, expect } from "vitest";
import {
  computeETA,
  findNearestResponder,
  createDispatchPlan,
  escalateIfNeeded,
  type Responder,
} from "../../lib/services/dispatch";

describe("Incident Dispatch Engine", () => {
  const mockResponders: Responder[] = [
    {
      id: "r1",
      name: "Officer A",
      role: "security",
      currentZoneId: "gA",
      available: true,
      skills: ["Crowd Control"],
    },
    {
      id: "r2",
      name: "Paramedic B",
      role: "medical",
      currentZoneId: "conc",
      available: true,
      skills: ["CPR"],
    },
    {
      id: "r3",
      name: "Officer C",
      role: "security",
      currentZoneId: "food",
      available: false, // unavailable
      skills: ["De-escalation"],
    },
  ];

  it("should calculate travel ETA between zones based on distance", () => {
    // Gate A to Gate A
    expect(computeETA("gA", "gA")).toBe(0);
    // Gate A to Food Court North (distance 40m / Walk speed 60m/min) -> 1 min
    expect(computeETA("gA", "food")).toBe(1);
  });

  it("should find the nearest available responder with matching role", () => {
    // Target is s101 (seating section near Food Court North)
    const match = findNearestResponder(mockResponders, "s101", "security");
    expect(match).not.toBeNull();
    // Officer C is unavailable, so Officer A at Gate A is chosen
    expect(match!.responder.id).toBe("r1");
  });

  it("should generate a complete dispatch plan with responders and ETAs", () => {
    const plan = createDispatchPlan(mockResponders, "s101", ["security", "medical"]);
    expect(plan.totalRespondersDispatched).toBe(2);
    expect(plan.assignments.length).toBe(2);
    expect(plan.assignments[0].responderId).toBe("r1");
    expect(plan.assignments[1].responderId).toBe("r2");
    expect(plan.escalationRequired).toBe(false);
  });

  it("should escalate plans if responders are missing or response threshold is exceeded", () => {
    const plan = createDispatchPlan(mockResponders, "s101", ["security", "transport"]);
    // No transport responder is registered in mock list
    expect(plan.escalationRequired).toBe(true);
    expect(plan.escalationReason).toContain("No available transport responder found");
  });

  it("should auto-escalate unresolved incidents exceeding threshold SLAs", () => {
    const unresolvedPast = new Date(Date.now() - 20 * 60 * 1000); // 20 mins ago
    const escalation = escalateIfNeeded(unresolvedPast, false, 15);
    expect(escalation.shouldEscalate).toBe(true);
    expect(escalation.reason).toContain("Incident unresolved after 20 minutes");

    const resolved = escalateIfNeeded(unresolvedPast, true, 15);
    expect(resolved.shouldEscalate).toBe(false);
  });
});
