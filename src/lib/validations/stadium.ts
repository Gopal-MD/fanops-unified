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

export type IncidentReportInput = z.infer<typeof IncidentReportSchema>;
export type CrowdDensityInput = z.infer<typeof CrowdDensitySchema>;
export type VolunteerDispatchInput = z.infer<typeof VolunteerDispatchSchema>;
