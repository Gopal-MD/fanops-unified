import React, { useState } from "react";
import {
  Users,
  Shield,
  Activity,
  Truck,
  Sparkles,
  Play,
  CheckCircle,
  AlertTriangle,
} from "lucide-react";
import {
  createDispatchPlan,
  escalateIfNeeded,
  type Responder,
  type TeamRole,
  type DispatchPlan,
  type DispatchAssignment,
} from "@/lib/services/dispatch";

// Simulated real-time stadium responders list
const RESPONDERS: Responder[] = [
  {
    id: "r1",
    name: "Officer Davis",
    role: "security",
    currentZoneId: "gA",
    available: true,
    skills: ["Crowd Control"],
  },
  {
    id: "r2",
    name: "Paramedic Gomez",
    role: "medical",
    currentZoneId: "conc",
    available: true,
    skills: ["Trauma Response"],
  },
  {
    id: "r3",
    name: "Marshall Lee",
    role: "volunteer",
    currentZoneId: "food",
    available: true,
    skills: ["Wayfinding"],
  },
  {
    id: "r4",
    name: "Officer Ramirez",
    role: "security",
    currentZoneId: "s101",
    available: true,
    skills: ["First Aid Support"],
  },
  {
    id: "r5",
    name: "Dispatcher Chen",
    role: "transport",
    currentZoneId: "gC",
    available: true,
    skills: ["Transit Coordination"],
  },
];

export function CoordinationView() {
  const [responders, setResponders] = useState<Responder[]>(RESPONDERS);
  const [activeDispatch, setActiveDispatch] = useState<DispatchPlan | null>(null);
  const [selectedIncidentZone, setSelectedIncidentZone] = useState("s205");

  const runSimulation = () => {
    // Generate dispatch plan for an incident in the selected zone (e.g. s205 - Section 205 Seats)
    // requiring security + medical + volunteers
    const plan = createDispatchPlan(responders, selectedIncidentZone, [
      "security",
      "medical",
      "volunteer",
    ]);
    setActiveDispatch(plan);

    // Set dispatched responders as unavailable
    const dispatchedIds = plan.assignments.map((a) => a.responderId);
    setResponders(
      responders.map((r) => (dispatchedIds.includes(r.id) ? { ...r, available: false } : r)),
    );
  };

  const handleResolve = () => {
    setActiveDispatch(null);
    setResponders(RESPONDERS);
  };

  return (
    <div className="space-y-6">
      {/* Stakeholder Target Header Banner */}
      <div className="rounded-2xl border border-brand/20 bg-gradient-brand-soft px-4 py-2.5 flex items-center justify-between text-xs text-brand font-bold">
        <span>
          👥 Target Stakeholders: Transportation Teams, Security Teams, Medical Staff, Stadium
          Operations Managers
        </span>
        <span className="flex items-center gap-1.5 uppercase tracking-wider text-[10px]">
          <Users className="h-3.5 w-3.5" /> Dispatch Coordination Live
        </span>
      </div>

      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Multi-Team Coordination Hub</h2>
          <p className="text-sm text-muted-foreground">
            Bridges communication, status tracking, and dispatch coordination across all operations
            cadres.
          </p>
        </div>
        <div className="flex gap-2">
          {activeDispatch ? (
            <button
              onClick={handleResolve}
              className="flex items-center gap-1.5 rounded-xl border border-border bg-white px-4 py-2 text-xs font-bold text-success transition hover:bg-success-soft"
            >
              <CheckCircle className="h-3.5 w-3.5" /> Mark Incident Resolved
            </button>
          ) : (
            <div className="flex gap-2">
              <select
                value={selectedIncidentZone}
                onChange={(e) => setSelectedIncidentZone(e.target.value)}
                className="rounded-xl border border-border bg-white px-3 py-1 text-xs font-bold"
              >
                <option value="s205">Section 205 (Seats)</option>
                <option value="s101">Section 101 (Seats)</option>
                <option value="food">Food Court North</option>
              </select>
              <button
                onClick={runSimulation}
                className="flex items-center gap-1.5 rounded-xl bg-gradient-brand px-4 py-2 text-xs font-bold text-white shadow-glow transition hover:-translate-y-0.5"
              >
                <Play className="h-3.5 w-3.5" /> Simulate Emergency Dispatch
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {/* Responders Status Console */}
        <div className="rounded-3xl border border-border bg-white p-5 shadow-soft md:col-span-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-brand" />
              <h3 className="font-bold">Active Responders Console</h3>
            </div>
            <span className="rounded-full bg-success-soft px-2 py-0.5 text-[10px] font-bold text-success uppercase">
              {responders.filter((r) => r.available).length} Available
            </span>
          </div>

          <div className="mt-6 space-y-3">
            {responders.map((r) => (
              <div
                key={r.id}
                className="flex items-center justify-between rounded-2xl border border-border bg-secondary/25 p-4"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white shadow-soft text-brand">
                    {r.role === "security" && <Shield className="h-4 w-4" />}
                    {r.role === "medical" && <Activity className="h-4 w-4" />}
                    {r.role === "volunteer" && <Users className="h-4 w-4" />}
                    {r.role === "transport" && <Truck className="h-4 w-4" />}
                  </div>
                  <div>
                    <div className="text-xs font-bold text-foreground">{r.name}</div>
                    <div className="text-[10px] uppercase font-semibold text-muted-foreground">
                      {r.role} · {r.skills.join(", ")}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-semibold text-muted-foreground">
                    Zone: {r.currentZoneId}
                  </span>
                  <span
                    className={`inline-block h-2 w-2 rounded-full ${
                      r.available ? "bg-success" : "bg-danger animate-pulse"
                    }`}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Live Dispatch Engine Details */}
        <div className="rounded-3xl border border-border bg-white p-5 shadow-soft">
          <h3 className="font-bold flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-brand" />
            Live Dispatch Plan
          </h3>

          {activeDispatch ? (
            <div className="mt-4 space-y-4">
              <div className="rounded-2xl bg-gradient-brand-soft p-4 border border-brand/10">
                <div className="text-[10px] font-extrabold uppercase tracking-widest text-brand">
                  Incident Zone
                </div>
                <div className="mt-1 text-sm font-bold">Zone: {activeDispatch.incidentZoneId}</div>
                <div className="mt-2 text-xs text-foreground/80">
                  Estimated arrival of first responder:{" "}
                  <span className="font-bold text-brand">
                    {activeDispatch.estimatedFirstArrivalMinutes} mins
                  </span>
                </div>
              </div>

              <div className="space-y-3">
                <div className="text-xs font-bold text-muted-foreground">Assignments:</div>
                {activeDispatch.assignments.map((a: DispatchAssignment, i: number) => (
                  <div
                    key={i}
                    className="rounded-xl border border-border bg-secondary/10 p-3 text-xs"
                  >
                    <div className="flex items-center justify-between font-bold text-foreground">
                      <span>{a.responderName}</span>
                      <span className="text-[10px] uppercase text-brand">{a.role}</span>
                    </div>
                    <p className="mt-1 text-muted-foreground text-[11px]">{a.pathDescription}</p>
                  </div>
                ))}
              </div>

              {activeDispatch.escalationRequired && (
                <div className="flex gap-2 rounded-xl bg-danger-soft p-3 text-xs border border-danger/10 text-danger">
                  <AlertTriangle className="h-4 w-4 shrink-0 mt-0.5" />
                  <div>
                    <div className="font-bold">Auto-Escalation Active</div>
                    <div className="mt-0.5 text-foreground/80">
                      {activeDispatch.escalationReason}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="mt-12 text-center">
              <Users className="mx-auto h-8 w-8 text-muted-foreground/45" />
              <p className="mt-2 text-xs text-muted-foreground">No active dispatches.</p>
              <p className="text-[10px] text-muted-foreground/75 mt-1">
                Select an incident zone and trigger simulation.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
