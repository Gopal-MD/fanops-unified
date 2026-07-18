import { describe, it, expect } from "vitest";
import {
  detectConflicts,
  validateRestPeriods,
  validateTurnaround,
  getNextAvailableSlot,
  optimizeSchedule,
  type ScheduledEvent,
} from "../../lib/services/scheduling";

describe("Event Scheduling Engine", () => {
  const mockEvents: ScheduledEvent[] = [
    {
      id: "e1",
      title: "USA vs England Match",
      venue: "Main Pitch",
      startTime: new Date("2026-06-15T18:00:00Z"),
      endTime: new Date("2026-06-15T21:00:00Z"),
      type: "match",
      priority: "critical",
    },
    {
      id: "e2",
      title: "Opening Show Rehearsal",
      venue: "Main Pitch",
      startTime: new Date("2026-06-15T19:00:00Z"), // Overlap with e1
      endTime: new Date("2026-06-15T21:00:00Z"),
      type: "rehearsal",
      priority: "normal",
    },
    {
      id: "e3",
      title: "Spain vs France Match",
      venue: "Main Pitch",
      startTime: new Date("2026-06-16T18:00:00Z"), // Within 21 hours of e1 (violates 48h limit)
      endTime: new Date("2026-06-16T21:00:00Z"),
      type: "match",
      priority: "high",
    },
  ];

  it("should correctly detect overlapping events at the same venue", () => {
    const conflicts = detectConflicts(mockEvents);
    expect(conflicts.length).toBe(1);
    expect(conflicts[0].eventA.id).toBe("e1");
    expect(conflicts[0].eventB.id).toBe("e2");
    expect(conflicts[0].overlapMinutes).toBe(120);
  });

  it("should validate and flag rest period violations between matches", () => {
    const violations = validateRestPeriods(mockEvents);
    expect(violations.length).toBe(1);
    expect(violations[0].eventA.id).toBe("e1");
    expect(violations[0].eventB.id).toBe("e3");
    // e1 ends at 21:00, e3 starts 18:00 next day -> 21 hours difference
    expect(violations[0].gapHours).toBe(21);
  });

  it("should validate and flag turnaround violations between any event types", () => {
    const turnaroundEvents: ScheduledEvent[] = [
      {
        id: "t1",
        title: "Match Event",
        venue: "Main Pitch",
        startTime: new Date("2026-06-15T18:00:00Z"),
        endTime: new Date("2026-06-15T21:00:00Z"),
        type: "match",
        priority: "critical",
      },
      {
        id: "t2",
        title: "Setup Sponsor Gala",
        venue: "Main Pitch",
        startTime: new Date("2026-06-15T22:00:00Z"), // Only 1 hour difference (violates 4h gap)
        endTime: new Date("2026-06-16T01:00:00Z"),
        type: "setup",
        priority: "normal",
      },
    ];

    const violations = validateTurnaround(turnaroundEvents);
    expect(violations.length).toBe(1);
    expect(violations[0].gapHours).toBe(1);
  });

  it("should schedule next available slot without conflicting existing slots", () => {
    const nextSlot = getNextAvailableSlot(
      [mockEvents[0]], // only USA vs England ending at 21:00
      "Main Pitch",
      120, // 2 hours
      new Date("2026-06-15T15:00:00Z"),
    );

    // Turnaround is 4h, so candidate starts at 21:00 + 4h = 01:00 next day
    expect(nextSlot.start.toISOString()).toBe(new Date("2026-06-16T01:00:00.000Z").toISOString());
  });

  it("should optimize schedule by moving normal-priority events to clear conflicts", () => {
    const optimized = optimizeSchedule(mockEvents);
    const conflicts = detectConflicts(optimized);
    expect(conflicts.length).toBe(0);
  });
});
