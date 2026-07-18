/**
 * FanOps Unified — Crowd Digital-Twin Simulator
 *
 * Generates ingress/egress crowd flow profiles, detects bottlenecks,
 * predicts future density, and models emergency evacuation patterns
 * across stadium zones for the FIFA World Cup 2026.
 */

export interface ZoneProfile {
  zoneId: string;
  zoneName: string;
  capacity: number;
  currentOccupancy: number;
  ingressRate: number; // people per minute entering
  egressRate: number; // people per minute leaving
}

export interface BottleneckAlert {
  zoneId: string;
  zoneName: string;
  currentDensityPercent: number;
  projectedDensityPercent: number;
  timeToThresholdMinutes: number;
  severity: "warning" | "critical";
  recommendation: string;
}

export interface DensityProjection {
  zoneId: string;
  currentOccupancy: number;
  projectedOccupancy: number;
  projectedDensityPercent: number;
  minutesAhead: number;
}

export interface EvacuationResult {
  zoneId: string;
  occupancy: number;
  nearestExitId: string;
  estimatedEvacTimeMinutes: number;
  exitCapacityPerMinute: number;
  requiresSecondaryExit: boolean;
}

/** Density threshold percentages */
const DENSITY_WARNING = 70;
const DENSITY_CRITICAL = 85;

/**
 * Generates ingress/egress flow profiles for a time window.
 * Models how crowd flows change over the given interval.
 */
export function generateFlowProfile(
  zone: ZoneProfile,
  intervalMinutes: number,
  step: number = 5,
): { minute: number; occupancy: number; densityPercent: number }[] {
  const profile: { minute: number; occupancy: number; densityPercent: number }[] = [];
  let currentOccupancy = zone.currentOccupancy;

  for (let t = 0; t <= intervalMinutes; t += step) {
    const densityPercent =
      zone.capacity > 0 ? Math.round((currentOccupancy / zone.capacity) * 100) : 0;

    profile.push({
      minute: t,
      occupancy: Math.round(currentOccupancy),
      densityPercent,
    });

    const netFlow = (zone.ingressRate - zone.egressRate) * step;
    currentOccupancy = Math.max(0, Math.min(zone.capacity, currentOccupancy + netFlow));
  }

  return profile;
}

/**
 * Detects bottleneck zones where density is at or approaching thresholds.
 */
export function detectBottlenecks(zones: ZoneProfile[]): BottleneckAlert[] {
  const alerts: BottleneckAlert[] = [];

  for (const zone of zones) {
    const currentDensity = zone.capacity > 0 ? (zone.currentOccupancy / zone.capacity) * 100 : 0;

    const netFlowPerMin = zone.ingressRate - zone.egressRate;

    // Only flag zones where density is growing
    if (netFlowPerMin <= 0 && currentDensity < DENSITY_WARNING) continue;

    // Project 30 minutes ahead
    const projectedOccupancy = Math.min(zone.capacity, zone.currentOccupancy + netFlowPerMin * 30);
    const projectedDensity = zone.capacity > 0 ? (projectedOccupancy / zone.capacity) * 100 : 0;

    // Calculate time to critical threshold
    let timeToThreshold = Infinity;
    if (netFlowPerMin > 0) {
      const remainingToThreshold = zone.capacity * (DENSITY_CRITICAL / 100) - zone.currentOccupancy;
      if (remainingToThreshold > 0) {
        timeToThreshold = Math.round(remainingToThreshold / netFlowPerMin);
      }
    }

    if (currentDensity >= DENSITY_CRITICAL || projectedDensity >= DENSITY_CRITICAL) {
      alerts.push({
        zoneId: zone.zoneId,
        zoneName: zone.zoneName,
        currentDensityPercent: Math.round(currentDensity),
        projectedDensityPercent: Math.round(projectedDensity),
        timeToThresholdMinutes: timeToThreshold === Infinity ? -1 : timeToThreshold,
        severity: "critical",
        recommendation: `Immediately redirect ingress away from ${zone.zoneName}. Open secondary gates.`,
      });
    } else if (currentDensity >= DENSITY_WARNING || projectedDensity >= DENSITY_WARNING) {
      alerts.push({
        zoneId: zone.zoneId,
        zoneName: zone.zoneName,
        currentDensityPercent: Math.round(currentDensity),
        projectedDensityPercent: Math.round(projectedDensity),
        timeToThresholdMinutes: timeToThreshold === Infinity ? -1 : timeToThreshold,
        severity: "warning",
        recommendation: `Monitor ${zone.zoneName} closely. Consider pre-emptive flow redirection.`,
      });
    }
  }

  return alerts.sort((a, b) => {
    if (a.severity === "critical" && b.severity !== "critical") return -1;
    if (b.severity === "critical" && a.severity !== "critical") return 1;
    return a.timeToThresholdMinutes - b.timeToThresholdMinutes;
  });
}

/**
 * Predicts crowd density N minutes into the future for each zone.
 */
export function predictDensity(zones: ZoneProfile[], minutesAhead: number): DensityProjection[] {
  return zones.map((zone) => {
    const netFlow = zone.ingressRate - zone.egressRate;
    const projectedOccupancy = Math.max(
      0,
      Math.min(zone.capacity, zone.currentOccupancy + netFlow * minutesAhead),
    );
    const projectedDensityPercent =
      zone.capacity > 0 ? Math.round((projectedOccupancy / zone.capacity) * 100) : 0;

    return {
      zoneId: zone.zoneId,
      currentOccupancy: zone.currentOccupancy,
      projectedOccupancy: Math.round(projectedOccupancy),
      projectedDensityPercent,
      minutesAhead,
    };
  });
}

/**
 * Models emergency evacuation patterns for each zone.
 * Calculates estimated evacuation time based on exit capacity and zone occupancy.
 */
export function simulateEvacuation(
  zones: ZoneProfile[],
  exitMap: Map<string, { exitId: string; capacityPerMinute: number }>,
): EvacuationResult[] {
  return zones.map((zone) => {
    const exitInfo = exitMap.get(zone.zoneId) ?? {
      exitId: "default-exit",
      capacityPerMinute: 200,
    };

    const estimatedTime =
      exitInfo.capacityPerMinute > 0
        ? Math.ceil(zone.currentOccupancy / exitInfo.capacityPerMinute)
        : 999;

    // If evacuation takes > 10 minutes, a secondary exit is needed
    const requiresSecondaryExit = estimatedTime > 10;

    return {
      zoneId: zone.zoneId,
      occupancy: zone.currentOccupancy,
      nearestExitId: exitInfo.exitId,
      estimatedEvacTimeMinutes: estimatedTime,
      exitCapacityPerMinute: exitInfo.capacityPerMinute,
      requiresSecondaryExit,
    };
  });
}
