/**
 * FanOps Unified — App-wide Constants
 * FIFA World Cup 2026 Smart Stadiums & Tournament Operations
 */

export const APP_CONSTANTS = {
  STADIUM: {
    NAME: "MetLife Stadium",
    CITY: "East Rutherford, NJ",
    CAPACITY: 82500,
    ZONES: [
      { id: "A", name: "Gate A (Main Entrance)", cap: 25000 },
      { id: "B", name: "Gate B (VIP & Hospitality)", cap: 15000 },
      { id: "C", name: "Gate C (Public Transit Hub)", cap: 30000 },
      { id: "D", name: "Gate D (North Concourse)", cap: 12500 },
    ],
  },

  REFRESH_INTERVALS: {
    CROWD_DENSITY: 5000, // 5 seconds
    INCIDENT_POLL: 10000, // 10 seconds
    BROADCAST_SYNC: 15000, // 15 seconds
  },

  AI_CONFIG: {
    DEFAULT_MODEL: "llama-3.3-70b-versatile",
    SYSTEM_PROMPT_PREFIX: "You are the Lead FIFA World Cup 2026 Stadium Operations Director.",
  },

  SOCKET_EVENTS: {
    CONNECT: "connect",
    DISCONNECT: "disconnect",
    CROWD_UPDATE: "crowd_update",
    INCIDENT_REPORTED: "incident_reported",
    INCIDENT_TRIAGED: "incident_triaged",
    BROADCAST_SENT: "broadcast_sent",
  },

  SUSTAINABILITY: {
    RECYCLING_TARGET_PERCENT: 80,
    ENERGY_SAVING_TARGET_MWH: 1.5,
  },

  API_TIMEOUT_MS: 15000,
};
