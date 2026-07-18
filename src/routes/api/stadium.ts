import { createFileRoute } from "@tanstack/react-router";
import { createSuccessResponse, createErrorResponse } from "@/lib/api-helper";
import { z } from "zod";
import {
  CrowdDensityUpdateSchema,
  IncidentReportV2Schema,
  VolunteerDispatchSchema,
} from "@/lib/validations/stadium";
import { crowdDensityCache } from "@/lib/services/cache";

// Zod schemas for input validation
const RouteSchema = z.object({
  start: z.string().max(100),
  destination: z.string().max(100),
  wheelchair: z.boolean().default(false),
  visualAssist: z.boolean().default(false),
  lowSensory: z.boolean().default(false),
  lang: z.string().max(50).optional(),
});

const TriageSchema = z.object({
  report: z.string().max(2000),
});

/**
 * Handles operations under /api/stadium.
 * Supports:
 * - POST /api/stadium?action=route -> Calculates AI-powered accessible routing.
 * - POST /api/stadium?action=triage -> Triages incidents using AI.
 * - POST /api/stadium?action=density_update -> Validates crowd density sensor payloads.
 * - POST /api/stadium?action=report_incident -> Validates structured incident reports.
 * - POST /api/stadium?action=volunteer_dispatch -> Validates volunteer dispatch tasks.
 * - GET /api/stadium?action=density -> Fetches crowd density mock metrics.
 *
 * Personas: Fans, Organizers, Volunteers, Security Command, Medical Teams, Venue Staff.
 */
export const Route = createFileRoute("/api/stadium")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        try {
          const url = new URL(request.url);
          const action = url.searchParams.get("action");

          // Guard Clause: check action validity
          if (action !== "density") {
            return createErrorResponse("Invalid action parameter for GET request", 400);
          }

          // Caching Layer read
          const cacheKey = "all_zones_density";
          const cachedData = crowdDensityCache.get(cacheKey);
          if (cachedData) {
            console.info("[caching] Returning cached crowd density metrics");
            return createSuccessResponse(cachedData);
          }

          // Return high-fidelity mock crowd density data
          const densityData = {
            stadium: "MetLife Stadium (FIFA WC 2026)",
            zones: [
              {
                id: "gate-a",
                name: "Gate A (Concourse)",
                occupancyPercentage: 84,
                status: "Critical",
              },
              { id: "gate-b", name: "Gate B (Entry)", occupancyPercentage: 42, status: "Normal" },
              {
                id: "section-101",
                name: "Section 101 (Seats)",
                occupancyPercentage: 92,
                status: "Critical",
              },
              {
                id: "food-court-west",
                name: "Food Court West",
                occupancyPercentage: 65,
                status: "Warning",
              },
            ],
            timestamp: new Date().toISOString(),
          };

          // Cache write
          crowdDensityCache.set(cacheKey, densityData);

          return createSuccessResponse(densityData);
        } catch (error: unknown) {
          return createErrorResponse(
            error instanceof Error ? error.message : "Internal server error",
            500,
          );
        }
      },

      POST: async ({ request }) => {
        try {
          const url = new URL(request.url);
          const action = url.searchParams.get("action");

          // Guard Clause: action must be provided
          if (!action) {
            return createErrorResponse("Missing action parameter", 400);
          }

          const body = await request.json();

          // Route Calculation Action
          if (action === "route") {
            const validated = RouteSchema.safeParse(body);
            if (!validated.success) {
              return createErrorResponse("Invalid route request body", 400);
            }

            const { calculateRoute } = await import("@/lib/ops.functions");
            const result = await calculateRoute({ data: validated.data });
            return createSuccessResponse(result);
          }

          // Incident Triage Action
          if (action === "triage") {
            const validated = TriageSchema.safeParse(body);
            if (!validated.success) {
              return createErrorResponse("Invalid triage request body", 400);
            }

            // Invalidate Caching Layer: clean density cache because of reported incidents
            crowdDensityCache.delete("all_zones_density");
            console.info("[caching] Invalided crowd density cache due to triage event");

            const { triageIncident } = await import("@/lib/ops.functions");
            const result = await triageIncident({ data: validated.data });
            return createSuccessResponse(result);
          }

          // ── Crowd Density Update Action ────────────────────────────────
          if (action === "density_update") {
            const validated = CrowdDensityUpdateSchema.safeParse(body);
            if (!validated.success) {
              const firstError = validated.error.errors[0]?.message ?? "Invalid density payload";
              return createErrorResponse(firstError, 400);
            }

            // Invalidate density cache on live sensor update
            crowdDensityCache.delete("all_zones_density");

            return createSuccessResponse({
              data: validated.data,
              receivedAt: new Date().toISOString(),
            });
          }

          // ── Incident Report V2 Action ──────────────────────────────────
          if (action === "report_incident") {
            const validated = IncidentReportV2Schema.safeParse(body);
            if (!validated.success) {
              const firstError = validated.error.errors[0]?.message ?? "Invalid incident payload";
              return createErrorResponse(firstError, 400);
            }

            // Invalidate density cache on reported incident
            crowdDensityCache.delete("all_zones_density");

            return createSuccessResponse({
              data: validated.data,
              receivedAt: new Date().toISOString(),
            });
          }

          // ── Volunteer Dispatch Action ──────────────────────────────────
          if (action === "volunteer_dispatch") {
            const validated = VolunteerDispatchSchema.safeParse(body);
            if (!validated.success) {
              const firstError = validated.error.errors[0]?.message ?? "Invalid dispatch payload";
              return createErrorResponse(firstError, 400);
            }

            return createSuccessResponse({
              data: validated.data,
              dispatchedAt: new Date().toISOString(),
            });
          }

          // Guard Clause: fallthrough for invalid actions
          return createErrorResponse(`Unsupported action: ${action}`, 400);
        } catch (error: unknown) {
          return createErrorResponse(
            error instanceof Error ? error.message : "Internal server error",
            500,
          );
        }
      },
    },
  },
});
