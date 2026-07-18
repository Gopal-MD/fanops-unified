import React, { useState } from "react";
import {
  Calendar,
  AlertTriangle,
  CheckCircle,
  Play,
  RotateCcw,
  Clock,
  Sparkles,
} from "lucide-react";
import {
  detectConflicts,
  validateRestPeriods,
  validateTurnaround,
  optimizeSchedule,
  type ScheduledEvent,
} from "@/lib/services/scheduling";

// Initial set of events with conflicts built-in to demonstrate simulation
const INITIAL_EVENTS: ScheduledEvent[] = [
  {
    id: "e1",
    title: "Match 1: USA vs England",
    venue: "MetLife Main Pitch",
    startTime: new Date("2026-06-15T18:00:00"),
    endTime: new Date("2026-06-15T21:00:00"),
    type: "match",
    teams: ["USA", "England"],
    priority: "critical",
  },
  {
    id: "e2",
    title: "Opening Ceremony Rehearsal",
    venue: "MetLife Main Pitch",
    startTime: new Date("2026-06-15T19:30:00"), // overlapping e1
    endTime: new Date("2026-06-15T21:30:00"),
    type: "rehearsal",
    priority: "normal",
  },
  {
    id: "e3",
    title: "Match 2: Spain vs France",
    venue: "MetLife Main Pitch",
    startTime: new Date("2026-06-16T15:00:00"), // violating 48h rest period
    endTime: new Date("2026-06-16T18:00:00"),
    type: "match",
    teams: ["Spain", "France"],
    priority: "high",
  },
  {
    id: "e4",
    title: "Press Briefing Setup",
    venue: "Press Room A",
    startTime: new Date("2026-06-17T09:00:00"),
    endTime: new Date("2026-06-17T11:00:00"),
    type: "setup",
    priority: "normal",
  },
  {
    id: "e5",
    title: "Sponsor Gala Setup",
    venue: "MetLife Main Pitch",
    startTime: new Date("2026-06-16T18:15:00"), // violating turnaround gap (only 15m after e3)
    endTime: new Date("2026-06-16T21:00:00"),
    type: "setup",
    priority: "normal",
  },
];

export function SchedulingView() {
  const [events, setEvents] = useState<ScheduledEvent[]>(INITIAL_EVENTS);
  const [optimized, setOptimized] = useState(false);

  const conflicts = detectConflicts(events);
  const restViolations = validateRestPeriods(events);
  const turnaroundViolations = validateTurnaround(events);

  const handleOptimize = () => {
    const solved = optimizeSchedule(events);
    setEvents(solved);
    setOptimized(true);
  };

  const handleReset = () => {
    setEvents(INITIAL_EVENTS);
    setOptimized(false);
  };

  const hasIssues =
    conflicts.length > 0 || restViolations.length > 0 || turnaroundViolations.length > 0;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Tournament Scheduling Engine</h2>
          <p className="text-sm text-muted-foreground">
            Enforce safety margins, volunteer rest gaps, and FIFA-mandated 48-hour team rest
            windows.
          </p>
        </div>
        <div className="flex gap-2">
          {hasIssues ? (
            <button
              onClick={handleOptimize}
              className="flex items-center gap-1.5 rounded-xl bg-gradient-brand px-4 py-2 text-xs font-bold text-white shadow-glow transition hover:-translate-y-0.5"
            >
              <Sparkles className="h-3.5 w-3.5" /> Optimize Schedule
            </button>
          ) : (
            optimized && (
              <button
                onClick={handleReset}
                className="flex items-center gap-1.5 rounded-xl border border-border bg-white px-4 py-2 text-xs font-bold text-foreground/75 transition hover:bg-secondary"
              >
                <RotateCcw className="h-3.5 w-3.5" /> Reset Simulation
              </button>
            )
          )}
        </div>
      </div>

      {/* Constraints & Violations Alerts Panel */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="rounded-3xl border border-border bg-white p-5 shadow-soft">
          <div className="flex items-center gap-2">
            <AlertTriangle
              className={`h-5 w-5 ${conflicts.length > 0 ? "text-danger" : "text-success"}`}
            />
            <h3 className="font-bold text-sm">Venue Overlaps</h3>
          </div>
          {conflicts.length > 0 ? (
            <div className="mt-3 space-y-2">
              {conflicts.map((c, i) => (
                <div
                  key={i}
                  className="rounded-xl bg-danger-soft p-3 text-xs border border-danger/10"
                >
                  <div className="font-bold text-danger">Overlap at {c.venue}</div>
                  <div className="mt-1 text-foreground/80">
                    "{c.eventA.title}" overlaps with "{c.eventB.title}" by {c.overlapMinutes} mins.
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="mt-3 text-xs text-muted-foreground">
              No overlapping events found at the same venue.
            </p>
          )}
        </div>

        <div className="rounded-3xl border border-border bg-white p-5 shadow-soft">
          <div className="flex items-center gap-2">
            <AlertTriangle
              className={`h-5 w-5 ${restViolations.length > 0 ? "text-warning" : "text-success"}`}
            />
            <h3 className="font-bold text-sm">FIFA Rest Violations (48h)</h3>
          </div>
          {restViolations.length > 0 ? (
            <div className="mt-3 space-y-2">
              {restViolations.map((v, i) => (
                <div
                  key={i}
                  className="rounded-xl bg-warning-soft p-3 text-xs border border-warning/10"
                >
                  <div className="font-bold text-warning-dark">
                    Rest window violated ({v.gapHours} hours)
                  </div>
                  <div className="mt-1 text-foreground/80">
                    Gap between Match {v.eventA.id} and Match {v.eventB.id} is below 48-hour
                    threshold.
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="mt-3 text-xs text-muted-foreground">
              All consecutive matches respect the FIFA 48-hour rest limit.
            </p>
          )}
        </div>

        <div className="rounded-3xl border border-border bg-white p-5 shadow-soft">
          <div className="flex items-center gap-2">
            <Clock
              className={`h-5 w-5 ${turnaroundViolations.length > 0 ? "text-warning" : "text-success"}`}
            />
            <h3 className="font-bold text-sm">Setup Turnaround gaps (4h)</h3>
          </div>
          {turnaroundViolations.length > 0 ? (
            <div className="mt-3 space-y-2">
              {turnaroundViolations.map((v, i) => (
                <div
                  key={i}
                  className="rounded-xl bg-warning-soft p-3 text-xs border border-warning/10"
                >
                  <div className="font-bold text-warning-dark">
                    Short turnaround ({v.gapHours} hours)
                  </div>
                  <div className="mt-1 text-foreground/80">
                    Only {v.gapHours}h gap between consecutive operations on {v.eventA.venue}.
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="mt-3 text-xs text-muted-foreground">
              All venue setup and teardown turnaround targets satisfied.
            </p>
          )}
        </div>
      </div>

      {/* Main Timetable View */}
      <div className="rounded-3xl border border-border bg-white p-6 shadow-soft">
        <div className="flex items-center gap-2">
          <Calendar className="h-5 w-5 text-brand" />
          <h3 className="font-bold">Tournament Master Calendar</h3>
        </div>
        <p className="mt-1 text-xs text-muted-foreground">
          Timetable scheduler showing matched, rehearsals, and setup periods.
        </p>

        <div className="mt-6 overflow-hidden rounded-2xl border border-border">
          <table className="w-full border-collapse text-left text-xs">
            <thead>
              <tr className="bg-secondary/50 font-bold border-b border-border text-muted-foreground">
                <th className="p-3">Event Details</th>
                <th className="p-3">Venue</th>
                <th className="p-3">Scheduled Time</th>
                <th className="p-3">Type</th>
                <th className="p-3">Priority</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {events.map((e) => (
                <tr key={e.id} className="hover:bg-secondary/20 transition">
                  <td className="p-3 font-semibold text-foreground">{e.title}</td>
                  <td className="p-3 text-muted-foreground">{e.venue}</td>
                  <td className="p-3">
                    <span className="font-medium text-foreground">
                      {e.startTime.toLocaleDateString([], { month: "short", day: "numeric" })}
                    </span>{" "}
                    {e.startTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })} -{" "}
                    {e.endTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  </td>
                  <td className="p-3">
                    <span
                      className={`inline-flex rounded-full px-2 py-0.5 text-[10px] font-bold uppercase ${
                        e.type === "match"
                          ? "bg-brand-soft text-brand"
                          : e.type === "setup"
                            ? "bg-success-soft text-success"
                            : "bg-muted-foreground/15 text-foreground/75"
                      }`}
                    >
                      {e.type}
                    </span>
                  </td>
                  <td className="p-3 uppercase font-extrabold text-[10px]">
                    <span
                      className={
                        e.priority === "critical"
                          ? "text-danger"
                          : e.priority === "high"
                            ? "text-warning-dark"
                            : "text-muted-foreground"
                      }
                    >
                      {e.priority}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
