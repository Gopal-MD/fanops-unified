/**
 * FanOps Unified — Event Scheduling Engine
 *
 * Provides constraint-solving event scheduling with venue conflict detection,
 * rest period enforcement, and optimal time slot allocation for FIFA WC 2026.
 */

export interface ScheduledEvent {
  id: string;
  title: string;
  venue: string;
  startTime: Date;
  endTime: Date;
  type: "match" | "rehearsal" | "setup" | "teardown" | "ceremony";
  teams?: [string, string];
  priority: "critical" | "high" | "normal";
}

export interface TimeSlot {
  start: Date;
  end: Date;
  venue: string;
}

export interface ScheduleConflict {
  eventA: ScheduledEvent;
  eventB: ScheduledEvent;
  overlapMinutes: number;
  venue: string;
}

/**
 * Minimum rest period between matches at the same venue (in hours).
 * FIFA regulations require at least 48 hours between matches.
 */
const MIN_REST_HOURS = 48;

/**
 * Minimum turnaround time between any events at the same venue (in hours).
 * Allows for teardown + setup.
 */
const MIN_TURNAROUND_HOURS = 4;

/**
 * Detects scheduling conflicts — overlapping events at the same venue.
 */
export function detectConflicts(events: ScheduledEvent[]): ScheduleConflict[] {
  const conflicts: ScheduleConflict[] = [];

  for (let i = 0; i < events.length; i++) {
    for (let j = i + 1; j < events.length; j++) {
      const a = events[i];
      const b = events[j];

      // Only check events at the same venue
      if (a.venue !== b.venue) continue;

      // Check for time overlap
      const overlapStart = Math.max(a.startTime.getTime(), b.startTime.getTime());
      const overlapEnd = Math.min(a.endTime.getTime(), b.endTime.getTime());

      if (overlapStart < overlapEnd) {
        const overlapMinutes = Math.round((overlapEnd - overlapStart) / (1000 * 60));
        conflicts.push({
          eventA: a,
          eventB: b,
          overlapMinutes,
          venue: a.venue,
        });
      }
    }
  }

  return conflicts;
}

/**
 * Validates that rest periods between matches at the same venue are enforced.
 * Returns events that violate the minimum rest period.
 */
export function validateRestPeriods(
  events: ScheduledEvent[],
): { eventA: ScheduledEvent; eventB: ScheduledEvent; gapHours: number }[] {
  const matches = events.filter((e) => e.type === "match");
  const violations: { eventA: ScheduledEvent; eventB: ScheduledEvent; gapHours: number }[] = [];

  // Group matches by venue
  const byVenue = new Map<string, ScheduledEvent[]>();
  for (const match of matches) {
    const existing = byVenue.get(match.venue) ?? [];
    existing.push(match);
    byVenue.set(match.venue, existing);
  }

  for (const [, venueMatches] of byVenue) {
    const sorted = [...venueMatches].sort((a, b) => a.startTime.getTime() - b.startTime.getTime());

    for (let i = 0; i < sorted.length - 1; i++) {
      const gapMs = sorted[i + 1].startTime.getTime() - sorted[i].endTime.getTime();
      const gapHours = gapMs / (1000 * 60 * 60);

      if (gapHours < MIN_REST_HOURS) {
        violations.push({
          eventA: sorted[i],
          eventB: sorted[i + 1],
          gapHours: Math.round(gapHours * 10) / 10,
        });
      }
    }
  }

  return violations;
}

/**
 * Validates turnaround time between consecutive events at the same venue.
 */
export function validateTurnaround(
  events: ScheduledEvent[],
): { eventA: ScheduledEvent; eventB: ScheduledEvent; gapHours: number }[] {
  const violations: { eventA: ScheduledEvent; eventB: ScheduledEvent; gapHours: number }[] = [];

  const byVenue = new Map<string, ScheduledEvent[]>();
  for (const event of events) {
    const existing = byVenue.get(event.venue) ?? [];
    existing.push(event);
    byVenue.set(event.venue, existing);
  }

  for (const [, venueEvents] of byVenue) {
    const sorted = [...venueEvents].sort((a, b) => a.startTime.getTime() - b.startTime.getTime());

    for (let i = 0; i < sorted.length - 1; i++) {
      const gapMs = sorted[i + 1].startTime.getTime() - sorted[i].endTime.getTime();
      const gapHours = gapMs / (1000 * 60 * 60);

      if (gapHours < MIN_TURNAROUND_HOURS) {
        violations.push({
          eventA: sorted[i],
          eventB: sorted[i + 1],
          gapHours: Math.round(gapHours * 10) / 10,
        });
      }
    }
  }

  return violations;
}

/**
 * Finds the next available time slot at a given venue that doesn't conflict.
 */
export function getNextAvailableSlot(
  events: ScheduledEvent[],
  venue: string,
  durationMinutes: number,
  searchFrom: Date = new Date(),
): TimeSlot {
  const venueEvents = events
    .filter((e) => e.venue === venue)
    .sort((a, b) => a.startTime.getTime() - b.startTime.getTime());

  let candidateStart = searchFrom;
  const durationMs = durationMinutes * 60 * 1000;
  const turnaroundMs = MIN_TURNAROUND_HOURS * 60 * 60 * 1000;

  for (const event of venueEvents) {
    const candidateEnd = new Date(candidateStart.getTime() + durationMs);

    // Check if candidate slot fits before this event (with turnaround)
    if (candidateEnd.getTime() + turnaroundMs <= event.startTime.getTime()) {
      return { start: candidateStart, end: candidateEnd, venue };
    }

    // Move candidate start to after this event + turnaround
    candidateStart = new Date(event.endTime.getTime() + turnaroundMs);
  }

  // No conflicts — the slot is after all existing events
  return {
    start: candidateStart,
    end: new Date(candidateStart.getTime() + durationMs),
    venue,
  };
}

/**
 * Greedy schedule optimizer — reorders non-critical events to eliminate conflicts.
 * Critical and high-priority events are pinned; normal-priority events can be moved.
 */
export function optimizeSchedule(events: ScheduledEvent[]): ScheduledEvent[] {
  const pinned = events.filter((e) => e.priority === "critical" || e.priority === "high");
  const movable = events.filter((e) => e.priority === "normal");
  const result = [...pinned];

  for (const event of movable) {
    const slot = getNextAvailableSlot(result, event.venue, getDurationMinutes(event));
    result.push({
      ...event,
      startTime: slot.start,
      endTime: slot.end,
    });
  }

  return result.sort((a, b) => a.startTime.getTime() - b.startTime.getTime());
}

function getDurationMinutes(event: ScheduledEvent): number {
  return Math.round((event.endTime.getTime() - event.startTime.getTime()) / (1000 * 60));
}
