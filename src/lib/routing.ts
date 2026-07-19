/**
 * FanOps Unified — Stadium Dijkstra Routing Engine
 * Provides deterministic, accessibility-constrained topological navigation.
 */

export interface Edge {
  to: string;
  means: "walk" | "ramp" | "elevator" | "stairs";
  stepFree: boolean;
  distance: number;
}

export interface ZoneNode {
  id: string;
  names: Record<string, string>;
  type: "gate" | "concourse" | "seating";
  level: "ground" | "lower" | "upper";
  isHighSensory?: boolean;
}

export const STADIUM_ZONES: Record<string, ZoneNode> = {
  gA: {
    id: "gA",
    names: {
      English: "Gate A (Main West)",
      Español: "Puerta A (Principal Oeste)",
      Français: "Porte A (Principale Ouest)",
    },
    type: "gate",
    level: "ground",
  },
  gB: {
    id: "gB",
    names: {
      English: "Gate B (VIP South)",
      Español: "Puerta B (VIP Sur)",
      Français: "Porte B (VIP Sud)",
    },
    type: "gate",
    level: "ground",
  },
  gC: {
    id: "gC",
    names: {
      English: "Gate C (Transit East)",
      Español: "Puerta C (Tránsito Este)",
      Français: "Porte C (Transit Est)",
    },
    type: "gate",
    level: "ground",
  },
  gD: {
    id: "gD",
    names: {
      English: "Gate D (North Concourse)",
      Español: "Puerta D (Norte)",
      Français: "Porte D (Nord)",
    },
    type: "gate",
    level: "ground",
  },
  food: {
    id: "food",
    names: {
      English: "Food Court North",
      Español: "Plaza de Comidas Norte",
      Français: "Zone de Restauration Nord",
    },
    type: "concourse",
    level: "lower",
    isHighSensory: true, // Noise and crowd hotspot
  },
  conc: {
    id: "conc",
    names: { English: "Concourse East", Español: "Vestíbulo Este", Français: "Hall Est" },
    type: "concourse",
    level: "lower",
  },
  s101: {
    id: "s101",
    names: {
      English: "Section 101 Seating (Lower Bowl)",
      Español: "Asientos Sección 101",
      Français: "Tribune Section 101",
    },
    type: "seating",
    level: "lower",
  },
  s205: {
    id: "s205",
    names: {
      English: "Section 205 Seating (Upper Bowl)",
      Español: "Asientos Sección 205",
      Français: "Tribune Section 205",
    },
    type: "seating",
    level: "upper",
  },
};

// Adjacency connections
export const STADIUM_EDGES: Record<string, Edge[]> = {
  gA: [{ to: "food", means: "walk", stepFree: true, distance: 40 }],
  gB: [{ to: "conc", means: "walk", stepFree: true, distance: 45 }],
  gC: [{ to: "conc", means: "walk", stepFree: true, distance: 50 }],
  gD: [{ to: "food", means: "walk", stepFree: true, distance: 40 }],
  food: [
    { to: "gA", means: "walk", stepFree: true, distance: 40 },
    { to: "gD", means: "walk", stepFree: true, distance: 40 },
    { to: "conc", means: "walk", stepFree: true, distance: 90 },
    { to: "s101", means: "ramp", stepFree: true, distance: 30 },
    { to: "s205", means: "stairs", stepFree: false, distance: 40 }, // Direct but stairs
  ],
  conc: [
    { to: "gB", means: "walk", stepFree: true, distance: 45 },
    { to: "gC", means: "walk", stepFree: true, distance: 50 },
    { to: "food", means: "walk", stepFree: true, distance: 90 },
    { to: "s101", means: "walk", stepFree: true, distance: 50 },
    { to: "s205", means: "elevator", stepFree: true, distance: 60 }, // Long but stepFree
  ],
  s101: [
    { to: "food", means: "ramp", stepFree: true, distance: 30 },
    { to: "conc", means: "walk", stepFree: true, distance: 50 },
  ],
  s205: [
    { to: "food", means: "stairs", stepFree: false, distance: 40 },
    { to: "conc", means: "elevator", stepFree: true, distance: 60 },
  ],
};

interface DijkstraNode {
  id: string;
  distance: number;
  previous: string | null;
  viaEdge: Edge | null;
}

/**
 * Calculates shortest path using Dijkstra's Algorithm under accessibility constraints.
 */
export function findShortestPath(
  start: string,
  end: string,
  options: {
    wheelchair?: boolean;
    lowSensory?: boolean;
  } = {},
): { path: Edge[]; totalDistance: number } | null {
  const resolveId = (input: string) => {
    if (STADIUM_ZONES[input]) return input;
    const lower = input.toLowerCase();
    for (const key of Object.keys(STADIUM_ZONES)) {
      const names = STADIUM_ZONES[key].names;
      if (Object.values(names).some(n => n.toLowerCase().includes(lower))) return key;
    }
    if (lower.includes("gate a")) return "gA";
    if (lower.includes("gate b")) return "gB";
    if (lower.includes("gate c")) return "gC";
    if (lower.includes("gate d")) return "gD";
    if (lower.includes("food")) return "food";
    if (lower.includes("conc")) return "conc";
    if (lower.includes("101") || lower.includes("102")) return "s101"; // Fallback to 101 for nearby sections
    if (lower.includes("205")) return "s205";
    return null;
  };

  const startId = resolveId(start);
  const endId = resolveId(end);

  if (!startId || !endId) return null;
  if (startId === endId) return { path: [], totalDistance: 0 };

  const { wheelchair, lowSensory } = options;

  const table: Record<string, DijkstraNode> = {};
  const unvisited = new Set<string>();

  for (const key of Object.keys(STADIUM_ZONES)) {
    table[key] = {
      id: key,
      distance: Infinity,
      previous: null,
      viaEdge: null,
    };
    unvisited.add(key);
  }

  table[startId].distance = 0;

  while (unvisited.size > 0) {
    // Find node with minimum distance
    let currentId: string | null = null;
    let minDistance = Infinity;

    for (const key of unvisited) {
      if (table[key].distance < minDistance) {
        minDistance = table[key].distance;
        currentId = key;
      }
    }

    if (currentId === null || minDistance === Infinity) break;
    if (currentId === endId) break;

    unvisited.delete(currentId);

    const neighbors = STADIUM_EDGES[currentId] || [];
    for (const edge of neighbors) {
      if (!unvisited.has(edge.to)) continue;

      // Constraint: wheelchair access must avoid stairs
      if (wheelchair && !edge.stepFree) continue;

      let edgeWeight = edge.distance;

      // Constraint: low-sensory users avoid high sensory nodes (e.g. food courts)
      const targetZone = STADIUM_ZONES[edge.to];
      if (lowSensory && targetZone.isHighSensory) {
        edgeWeight += 200; // Large penalty to reroute away
      }

      const alt = table[currentId].distance + edgeWeight;
      if (alt < table[edge.to].distance) {
        table[edge.to].distance = alt;
        table[edge.to].previous = currentId;
        table[edge.to].viaEdge = edge;
      }
    }
  }

  if (table[endId].distance === Infinity) return null;

  // Reconstruct path
  const path: Edge[] = [];
  let curr = endId;
  while (curr !== startId) {
    const node = table[curr];
    if (!node.viaEdge || !node.previous) return null;
    path.unshift(node.viaEdge);
    curr = node.previous;
  }

  // Calculate actual distance without penalties
  const actualDistance = path.reduce((sum, e) => sum + e.distance, 0);

  return { path, totalDistance: actualDistance };
}

/**
 * Returns localized instructions for a given edge traversal
 */
export function getLocalizedInstruction(
  edge: Edge,
  toZoneName: string,
  isFinal: boolean,
  language: string,
): string {
  const isEs = language === "Español";
  const isFr = language === "Français";

  if (edge.means === "elevator") {
    if (isEs) return `Tome el ascensor hasta el ${toZoneName}`;
    if (isFr) return `Prenez l'ascenseur jusqu'à ${toZoneName}`;
    return `Take the elevator to ${toZoneName}`;
  }
  if (edge.means === "ramp") {
    if (isEs) return `Use la rampa hacia el ${toZoneName}`;
    if (isFr) return `Utilisez la rampe vers ${toZoneName}`;
    return `Use the ramp to ${toZoneName}`;
  }
  if (edge.means === "stairs") {
    if (isEs) return `Suba las escaleras hasta el ${toZoneName}`;
    if (isFr) return `Prenez les escaliers jusqu'à ${toZoneName}`;
    return `Take the stairs to ${toZoneName}`;
  }

  if (isFinal) {
    if (isEs) return `Camine y llegue a su destino en ${toZoneName}`;
    if (isFr) return `Marchez pour arriver à votre destination à ${toZoneName}`;
    return `Walk to arrive at your destination in ${toZoneName}`;
  }

  if (isEs) return `Camine por el pasillo hacia el ${toZoneName}`;
  if (isFr) return `Marchez vers ${toZoneName}`;
  return `Walk along the concourse to ${toZoneName}`;
}
