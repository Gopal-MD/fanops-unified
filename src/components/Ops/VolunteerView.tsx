import React, { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { Users, Sparkles, Loader2, ClipboardList, Check, UserCheck, Shield } from "lucide-react";
import { askGroqAssistant } from "@/lib/ops.functions";

interface TaskItem {
  id: string;
  priority: number;
  type: "usher" | "security" | "medical" | "accessibility";
  location: string;
  details: string;
  eta: string;
  requiredSkills: string[];
  status: "pending" | "completed";
}

/**
 * VolunteerView component tracking active match day staff, shift schedules,
 * and presenting the Volunteer Task Copilot interface.
 */
export function VolunteerView() {
  const askFn = useServerFn(askGroqAssistant);
  const [brief, setBrief] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const [tasks, setTasks] = useState<TaskItem[]>([
    {
      id: "task-1",
      priority: 1,
      type: "accessibility",
      location: "Gate 3 West Entrance",
      details:
        "Assist a family of 4 requiring wheelchair access and companion seating near elevators.",
      eta: "5 mins",
      requiredSkills: ["Accessibility Routing", "A11y Aid"],
      status: "pending",
    },
    {
      id: "task-2",
      priority: 2,
      type: "medical",
      location: "Section A Row 12",
      details:
        "Heat exhaustion case reported. Squad 3 dispatched. Volunteer usher needed to cordon area.",
      eta: "2 mins",
      requiredSkills: ["First Aid Support", "Crowd Control"],
      status: "pending",
    },
    {
      id: "task-3",
      priority: 3,
      type: "usher",
      location: "Gate 5 Concourse",
      details: "Greeting guests and ticket validating at the main ingress corridors.",
      eta: "10 mins",
      requiredSkills: ["Wayfinding Assistance"],
      status: "pending",
    },
    {
      id: "task-4",
      priority: 4,
      type: "security",
      location: "Food Court East",
      details: "Monitor minor bottleneck build-up at snack lines.",
      eta: "12 mins",
      requiredSkills: ["Redirecting Flow"],
      status: "pending",
    },
  ]);

  const generate = async () => {
    setLoading(true);
    try {
      const res = await askFn({
        data: {
          question:
            "Generate a 2-sentence shift briefing for stadium volunteers. Focus on crowd management, hydration checkpoints, and aiding mobility requests.",
          context: "Live match at MetLife Stadium.",
        },
      });
      setBrief(res.answer);
    } catch {
      setBrief("Unable to generate briefing.");
    } finally {
      setLoading(false);
    }
  };

  useState(() => {
    generate();
  });

  const markComplete = (id: string) => {
    setTasks(tasks.map((t) => (t.id === id ? { ...t, status: "completed" } : t)));
  };

  const volunteers = [
    { id: "v1", name: "Sarah J.", zone: "Gate A", role: "Wayfinding", status: "Active" },
    { id: "v2", name: "Miguel O.", zone: "Section 101", role: "Seating Assist", status: "Active" },
    {
      id: "v3",
      name: "Chen W.",
      zone: "Food Court North",
      role: "Information",
      status: "On Break",
    },
    { id: "v4", name: "Aisha T.", zone: "Concourse East", role: "Accessibility", status: "Active" },
  ];

  // Volunteer Q&A states
  const [qaQuery, setQaQuery] = useState("");
  const [qaAnswer, setQaAnswer] = useState<string | null>(null);
  const [qaLoading, setQaLoading] = useState(false);

  const handleQaAsk = async () => {
    if (!qaQuery.trim()) return;
    setQaLoading(true);
    try {
      const res = await askFn({
        data: {
          question: `Act as the FIFA 2026 Volunteer Copilot. Provide a concise 2-sentence response for volunteer guide: "${qaQuery}"`,
          context: "Live shift directory: " + JSON.stringify(volunteers),
        },
      });
      setQaAnswer(res.answer);
    } catch {
      setQaAnswer("Error retrieving Copilot instructions. Check system network status.");
    } finally {
      setQaLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Stakeholder Target Header Banner */}
      <div className="rounded-2xl border border-brand/20 bg-gradient-brand-soft px-4 py-2.5 flex items-center justify-between text-xs text-brand font-bold">
        <span>👥 Target Stakeholders: Volunteers, Ushers, Shift Coordinators</span>
        <span className="flex items-center gap-1.5 uppercase tracking-wider text-[10px]">
          <Users className="h-3.5 w-3.5 animate-pulse" /> Volunteer Copilot Active
        </span>
      </div>

      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Volunteer Management</h2>
          <p className="text-sm text-muted-foreground">
            Track staff assignments, task queues, and dynamic shift instructions.
          </p>
        </div>
        <div className="flex items-center gap-2 rounded-xl border border-border bg-white px-3 py-1.5 text-sm font-semibold">
          <Users className="h-4 w-4 text-brand" /> {volunteers.length} Active Staff
        </div>
      </div>

      {/* AI Shift Briefing */}
      <div className="rounded-3xl bg-white p-6 shadow-soft ring-1 ring-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brand">
            <Sparkles className="h-4 w-4" /> AI Shift Briefing
          </div>
          <button
            onClick={generate}
            disabled={loading}
            className="text-xs font-semibold text-brand hover:underline disabled:opacity-50"
          >
            Refresh
          </button>
        </div>
        <div className="mt-3 rounded-2xl bg-secondary/50 p-4 text-sm font-medium">
          {loading ? (
            <span className="flex items-center gap-2 text-muted-foreground">
              <Loader2 className="h-3.5 w-3.5 animate-spin" /> Generating briefing...
            </span>
          ) : (
            brief
          )}
        </div>
      </div>

      {/* Volunteer Copilot AI Q&A Terminal */}
      <div className="rounded-3xl border border-brand/30 bg-gradient-brand-soft/40 p-6 shadow-soft">
        <h3 className="text-sm font-black text-brand flex items-center gap-2 uppercase tracking-wide">
          <Sparkles className="h-4.5 w-4.5 text-brand" />
          Volunteer AI Copilot Q&A
        </h3>
        <p className="mt-1 text-xs text-muted-foreground">
          Ask the Copilot: "Where should I go?", "Nearest medical squad?", "Explain Section A
          accessibility assistance options?", etc.
        </p>

        <div className="mt-4 flex gap-2">
          <input
            placeholder="Type your Volunteer Copilot query here..."
            value={qaQuery}
            onChange={(e) => setQaQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleQaAsk()}
            className="flex-1 rounded-xl border border-border bg-white px-4 py-2 text-sm outline-none shadow-sm"
          />
          <button
            onClick={handleQaAsk}
            disabled={qaLoading || !qaQuery.trim()}
            className="flex items-center gap-1.5 rounded-xl bg-gradient-brand px-5 py-2 text-sm font-bold text-white shadow-glow disabled:opacity-50"
          >
            {qaLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Ask Copilot"}
          </button>
        </div>

        {qaAnswer && (
          <div className="mt-4 rounded-2xl border border-brand/10 bg-white p-4">
            <div className="text-[10px] font-black uppercase tracking-wider text-brand">
              Copilot Response
            </div>
            <p className="mt-1 text-xs font-semibold text-foreground/80 leading-relaxed">
              {qaAnswer}
            </p>
          </div>
        )}
      </div>

      {/* Volunteer Task Copilot Queue */}
      <div className="rounded-3xl bg-white p-6 shadow-soft ring-1 ring-border">
        <div className="flex items-center gap-2">
          <ClipboardList className="h-5 w-5 text-brand" />
          <h3 className="text-lg font-bold">Volunteer Copilot Active Task Queue</h3>
        </div>

        <div className="mt-4 grid gap-4 md:grid-cols-2">
          {tasks.map((task) => (
            <div
              key={task.id}
              className={`rounded-2xl border p-4 shadow-soft transition flex flex-col justify-between ${
                task.status === "completed"
                  ? "bg-success-soft border-success"
                  : "bg-white border-border"
              }`}
            >
              <div>
                <div className="flex items-center justify-between">
                  <span
                    className={`rounded-full px-2 py-0.5 text-[9px] font-bold uppercase text-white ${
                      task.type === "medical"
                        ? "bg-danger"
                        : task.type === "accessibility"
                          ? "bg-brand"
                          : task.type === "security"
                            ? "bg-warning"
                            : "bg-success"
                    }`}
                  >
                    {task.type}
                  </span>
                  <span className="text-[10px] text-muted-foreground">
                    Priority P{task.priority} · ETA {task.eta}
                  </span>
                </div>
                <div className="mt-2 text-sm font-bold">{task.location}</div>
                <p className="mt-1 text-xs text-foreground/80 leading-relaxed">{task.details}</p>
                <div className="mt-3 flex flex-wrap gap-1">
                  {task.requiredSkills.map((s, idx) => (
                    <span
                      key={idx}
                      className="rounded-full bg-secondary/80 px-2 py-0.5 text-[9px] font-semibold text-muted-foreground"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              <button
                onClick={() => markComplete(task.id)}
                disabled={task.status === "completed"}
                className={`mt-4 flex w-full items-center justify-center gap-1.5 rounded-xl py-2 text-xs font-bold transition ${
                  task.status === "completed"
                    ? "bg-success/20 text-success cursor-default"
                    : "bg-gradient-brand text-white shadow-glow hover:-translate-y-0.5"
                }`}
              >
                {task.status === "completed" ? (
                  <>
                    <Check className="h-3.5 w-3.5" /> Task Dispatched & Handled
                  </>
                ) : (
                  <>
                    <UserCheck className="h-3.5 w-3.5" /> Accept & Complete Task
                  </>
                )}
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Staff details */}
        <div className="rounded-3xl bg-white p-6 shadow-soft ring-1 ring-border">
          <h3 className="text-lg font-bold">Active Staff Directory</h3>
          <div className="mt-4 space-y-3">
            {volunteers.map((v) => (
              <div
                key={v.id}
                className="flex items-center justify-between rounded-2xl border border-border p-3"
              >
                <div>
                  <div className="font-semibold text-sm">{v.name}</div>
                  <div className="text-[11px] text-muted-foreground">
                    {v.role} • {v.zone}
                  </div>
                </div>
                <div
                  className={`rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider ${
                    v.status === "Active"
                      ? "bg-success/20 text-success"
                      : "bg-warning/20 text-warning"
                  }`}
                >
                  {v.status}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Break schedule details */}
        <div className="rounded-3xl bg-white p-6 shadow-soft ring-1 ring-border">
          <h3 className="text-lg font-bold">Shift & Rest Schedule</h3>
          <div className="mt-4 space-y-3">
            {[
              { team: "Wayfinding Cohort 1", duration: "14:30 - 15:00", location: "Break Room B" },
              {
                team: "Seating Assist Cohort A",
                duration: "15:00 - 15:30",
                location: "Staff Zone West",
              },
              {
                team: "Accessibility Escorts",
                duration: "15:30 - 16:00",
                location: "Break Room B",
              },
            ].map((s, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between border-b border-border pb-3 last:border-0 last:pb-0"
              >
                <div>
                  <div className="font-semibold text-sm">{s.team}</div>
                  <div className="text-[11px] text-muted-foreground">
                    📍 Rest Room: {s.location}
                  </div>
                </div>
                <div className="text-xs font-bold text-brand">{s.duration}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
