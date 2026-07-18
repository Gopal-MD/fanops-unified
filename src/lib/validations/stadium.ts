import { z } from "zod";

export const IncidentReportSchema = z.object({
  title: z.string().min(3).max(100),
  description: z.string().min(5).max(2000),
  type: z.enum(["medical", "security", "logistics", "crowd"]),
  zoneId: z.string().min(2).max(10),
  locationDetails: z.string().min(3).max(200),
});

export const CrowdDensitySchema = z.object({
  zoneId: z.string().min(2).max(10),
  density: z.number().min(0).max(100),
  volunteersCount: z.number().nonnegative().optional(),
});

export const VolunteerDispatchSchema = z.object({
  volunteerId: z.string().min(3).max(50),
  zoneId: z.string().min(2).max(10),
  task: z.string().min(3).max(200),
});

/**
 * FIFA 2026 Crowd Density Update Schema — validates real-time
 * crowd sensor payloads for the density_update API action.
 */
export const CrowdDensityUpdateSchema = z.object({
  stadiumZone: z
    .string()
    .min(3, { message: "Stadium zone identifier must be at least 3 characters long." }),
  currentCapacity: z
    .number()
    .min(0, { message: "Capacity percentage must be between 0 and 100." })
    .max(100, { message: "Capacity percentage must be between 0 and 100." }),
  densityStatus: z.enum(["LOW", "MODERATE", "HIGH", "CRITICAL"]),
  flowRatePerMinute: z.number().nonnegative(),
  timestamp: z.string().datetime(),
});

/**
 * FIFA 2026 Incident Report V2 Schema — validates structured
 * incident reports for the report_incident API action.
 */
export const IncidentReportV2Schema = z.object({
  incidentId: z.string().uuid(),
  category: z.enum([
    "CROWD_CONGESTION",
    "MEDICAL_EMERGENCY",
    "SECURITY_BREACH",
    "INFRASTRUCTURE",
    "WEATHER",
    "OTHER",
  ]),
  locationDescription: z.string().min(5).max(500),
  severityLevel: z.enum(["MINOR", "MODERATE", "MAJOR", "CRITICAL"]),
  reportedInLanguage: z.string().min(2).max(10),
  reportedAt: z.string().datetime(),
});

export type IncidentReportInput = z.infer<typeof IncidentReportSchema>;
export type CrowdDensityInput = z.infer<typeof CrowdDensitySchema>;
export type VolunteerDispatchInput = z.infer<typeof VolunteerDispatchSchema>;
export type CrowdDensityUpdateInput = z.infer<typeof CrowdDensityUpdateSchema>;
export type IncidentReportV2Input = z.infer<typeof IncidentReportV2Schema>;
