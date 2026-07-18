import { describe, it, expect } from "vitest";
import {
  generateFlowProfile,
  detectBottlenecks,
  predictDensity,
  simulateEvacuation,
  type ZoneProfile,
} from "../../lib/services/crowd-simulation";

describe("Crowd Digital-Twin Simulator", () => {
  const mockZones: ZoneProfile[] = [
    {
      zoneId: "gate-a",
      zoneName: "Gate A Ingress",
      capacity: 1000,
      currentOccupancy: 860, // 86% - critical
      ingressRate: 50,
      egressRate: 10,
    },
    {
      zoneId: "gate-b",
      zoneName: "Gate B Entry",
      capacity: 1000,
      currentOccupancy: 450, // 45% - normal
      ingressRate: 20, // net flow: 10/min -> 30 mins: +300 -> 75% (warning)
      egressRate: 10,
    },
  ];

  it("should generate flow profiles step by step over intervals", () => {
    const profile = generateFlowProfile(mockZones[1], 15, 5);
    expect(profile.length).toBe(4); // 0, 5, 10, 15 min steps
    expect(profile[0].occupancy).toBe(450);
    // Net rate is +10 people/min. At minute 15, occupancy should increase by 150.
    expect(profile[3].occupancy).toBe(600);
    expect(profile[3].densityPercent).toBe(60);
  });

  it("should correctly detect bottleneck alerts at zones", () => {
    const alerts = detectBottlenecks(mockZones);
    expect(alerts.length).toBe(2);
    expect(alerts[0].zoneId).toBe("gate-a");
    expect(alerts[0].severity).toBe("critical");
    expect(alerts[1].zoneId).toBe("gate-b");
    expect(alerts[1].severity).toBe("warning"); // projects to 90% (critical/warning zone) in 30 mins
  });

  it("should predict future crowd density metrics", () => {
    const predictions = predictDensity(mockZones, 10);
    expect(predictions.length).toBe(2);
    // Gate A: 860 + (50 - 10) * 10 = 1260 -> capped at capacity 1000
    expect(predictions[0].projectedOccupancy).toBe(1000);
    expect(predictions[0].projectedDensityPercent).toBe(100);
  });

  it("should simulate emergency evacuation times", () => {
    const exitMap = new Map<string, { exitId: string; capacityPerMinute: number }>([
      ["gate-a", { exitId: "exit-1", capacityPerMinute: 100 }],
      ["gate-b", { exitId: "exit-2", capacityPerMinute: 10 }],
    ]);

    const results = simulateEvacuation(mockZones, exitMap);
    expect(results.length).toBe(2);
    // Gate A: 860 occupancy / 100 exit capacity = 9 mins
    expect(results[0].estimatedEvacTimeMinutes).toBe(9);
    expect(results[0].requiresSecondaryExit).toBe(false);

    // Gate B: 450 occupancy / 10 exit capacity = 45 mins (> 10 mins threshold)
    expect(results[1].estimatedEvacTimeMinutes).toBe(45);
    expect(results[1].requiresSecondaryExit).toBe(true);
  });
});
