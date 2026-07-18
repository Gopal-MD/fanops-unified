/**
 * FanOps Unified — Centralized Domain Types
 * FIFA World Cup 2026 Smart Stadiums & Tournament Operations
 */

// ── SYSTEM API CONTRACTS ──────────────────────────────────────────────────────

export interface ApiResponse<T = unknown> {
  success: boolean;
  data: T | null;
  error: string | null;
}

export interface ApiErrorResponse {
  success: false;
  data: null;
  error: string;
}

// ── STADIUM & ZONES ───────────────────────────────────────────────────────────

export type DensityLevel = "low" | "medium" | "high" | "critical";

export interface Zone {
  id: string;
  name: string;
  density: number; // Percentage 0-100
  status: DensityLevel;
  volunteersCount: number;
  incidentsCount: number;
  capacityLimit: number;
  currentCount: number;
}

// ── INCIDENT MANAGEMENT ──────────────────────────────────────────────────────

export type IncidentStatus = "reported" | "triaged" | "resolved";
export type IncidentPriority = "low" | "medium" | "high" | "critical";
export type IncidentType = "medical" | "security" | "logistics" | "crowd";

export interface Incident {
  id: string;
  title: string;
  description: string;
  type: IncidentType;
  status: IncidentStatus;
  priority: IncidentPriority;
  zoneId: string;
  locationDetails: string;
  reportedAt: string;
  resolvedAt?: string;
  actionPlan?: string[];
}

export interface IncidentInput {
  title: string;
  description: string;
  type: IncidentType;
  zoneId: string;
  locationDetails: string;
}

// ── BROADCAST PUSH SYSTEM ────────────────────────────────────────────────────

export interface BroadcastAlert {
  id: string;
  message: string;
  severity: "info" | "warning" | "critical";
  language: string;
  sentAt: string;
}

// ── USER PERSONAS ─────────────────────────────────────────────────────────────

export type UserRole = "fan" | "ops" | "volunteer";

export interface UserProfile {
  uid: string;
  displayName: string | null;
  email: string | null;
  role: UserRole;
  currentZoneId?: string;
  ticketId?: string;
}
