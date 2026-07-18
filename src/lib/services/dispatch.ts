/**
 * FanOps Unified — Incident Dispatch Engine
 *
 * Automated responder assignment, ETA computation, dispatch plan generation,
 * and escalation logic for stadium emergency coordination during FIFA WC 2026.
 */

import { STADIUM_ZONES, findShortestPath } from "@/lib/routing";

export type TeamRole = "security" | "medical" | "volunteer" | "maintenance" | "transport";

export interface Responder {
  id: string;
  name: string;
  role: TeamRole;
  currentZoneId: string;
  available: boolean;
  skills: string[];
}

export interface DispatchAssignment {
  responderId: string;
  responderName: string;
  role: TeamRole;
  fromZone: string;
  toZone: string;
  estimatedMinutes: number;
  pathDescription: string;
}

export interface DispatchPlan {
  incidentZoneId: string;
  assignments: DispatchAssignment[];
  totalRespondersDispatched: number;
  estimatedFirstArrivalMinutes: number;
  escalationRequired: boolean;
  escalationReason?: string;
}

/** Maximum acceptable first-arrival time in minutes */
const MAX_FIRST_ARRIVAL_MINUTES = 8;

/** Walking speed estimate: ~60 meters per minute in a stadium */
const WALK_SPEED_M_PER_MIN = 60;

/**
 * Computes estimated travel time in minutes between two zones
 * using the Dijkstra routing engine.
 */
export function computeETA(fromZoneId: string, toZoneId: string): number {
  if (fromZoneId === toZoneId) return 0;

  try {
    const result = findShortestPath(fromZoneId, toZoneId);
    if (!result || result.totalDistance === Infinity) {
      return 15; // Fallback estimate for unreachable zones
    }
    return Math.ceil(result.totalDistance / WALK_SPEED_M_PER_MIN);
  } catch {
    // Zone not in graph — provide reasonable estimate
    return 10;
  }
}

/**
 * Finds the nearest available responder with the required role.
 * Returns null if no responder with the role is available.
 */
export function findNearestResponder(
  responders: Responder[],
  targetZoneId: string,
  role: TeamRole,
): { responder: Responder; eta: number } | null {
  const candidates = responders.filter((r) => r.role === role && r.available);
  if (candidates.length === 0) return null;

  let nearest: Responder | null = null;
  let bestETA = Infinity;

  for (const responder of candidates) {
    const eta = computeETA(responder.currentZoneId, targetZoneId);
    if (eta < bestETA) {
      bestETA = eta;
      nearest = responder;
    }
  }

  return nearest ? { responder: nearest, eta: bestETA } : null;
}

/**
 * Creates a comprehensive dispatch plan for an incident at a given zone.
 * Assigns the nearest responder for each required role and calculates ETAs.
 */
export function createDispatchPlan(
  responders: Responder[],
  incidentZoneId: string,
  requiredRoles: TeamRole[],
): DispatchPlan {
  const assignments: DispatchAssignment[] = [];
  let escalationRequired = false;
  let escalationReason: string | undefined;

  for (const role of requiredRoles) {
    const match = findNearestResponder(responders, incidentZoneId, role);

    if (!match) {
      escalationRequired = true;
      escalationReason = `No available ${role} responder found. Manual escalation required.`;
      continue;
    }

    const fromZoneName =
      STADIUM_ZONES[match.responder.currentZoneId]?.names?.English ?? match.responder.currentZoneId;
    const toZoneName = STADIUM_ZONES[incidentZoneId]?.names?.English ?? incidentZoneId;

    assignments.push({
      responderId: match.responder.id,
      responderName: match.responder.name,
      role: match.responder.role,
      fromZone: fromZoneName,
      toZone: toZoneName,
      estimatedMinutes: match.eta,
      pathDescription: `${fromZoneName} → ${toZoneName} (est. ${match.eta} min)`,
    });
  }

  const firstArrival =
    assignments.length > 0 ? Math.min(...assignments.map((a) => a.estimatedMinutes)) : Infinity;

  // Auto-escalate if first arrival exceeds threshold
  if (firstArrival > MAX_FIRST_ARRIVAL_MINUTES) {
    escalationRequired = true;
    escalationReason = `First arrival ETA (${firstArrival} min) exceeds ${MAX_FIRST_ARRIVAL_MINUTES}-minute threshold.`;
  }

  return {
    incidentZoneId,
    assignments,
    totalRespondersDispatched: assignments.length,
    estimatedFirstArrivalMinutes: firstArrival === Infinity ? -1 : firstArrival,
    escalationRequired,
    escalationReason,
  };
}

/**
 * Checks whether an incident should be escalated based on elapsed time
 * since creation and current resolution status.
 */
export function escalateIfNeeded(
  incidentCreatedAt: Date,
  isResolved: boolean,
  thresholdMinutes: number = 15,
): { shouldEscalate: boolean; elapsedMinutes: number; reason: string } {
  if (isResolved) {
    return { shouldEscalate: false, elapsedMinutes: 0, reason: "Incident already resolved." };
  }

  const elapsedMs = Date.now() - incidentCreatedAt.getTime();
  const elapsedMinutes = Math.round(elapsedMs / (1000 * 60));

  if (elapsedMinutes > thresholdMinutes) {
    return {
      shouldEscalate: true,
      elapsedMinutes,
      reason: `Incident unresolved after ${elapsedMinutes} minutes (threshold: ${thresholdMinutes} min).`,
    };
  }

  return {
    shouldEscalate: false,
    elapsedMinutes,
    reason: `Within resolution window (${elapsedMinutes}/${thresholdMinutes} min).`,
  };
}
