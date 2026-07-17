import React, { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { Users, Sparkles, Loader2 } from "lucide-react";
import { askGroqAssistant } from "@/lib/ops.functions";

/**
 * VolunteerView component tracking active match day staff and generating dynamic briefings.
 */
export function VolunteerView() {
  const askFn = useServerFn(askGroqAssistant);
  const [brief, setBrief] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const generate = async () => {
    setLoading(true);
    try {
      const res = await askFn({
        data: {
          question:
            "Generate a 2-sentence shift briefing for volunteers. Focus on crowd management, hydration, and assisting fans with directions.",
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

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Volunteer Management</h2>
          <p className="text-sm text-muted-foreground">
            Track staff assignments and shift briefings.
          </p>
        </div>
        <div className="flex items-center gap-2 rounded-xl border border-border bg-white px-3 py-1.5 text-sm font-semibold">
          <Users className="h-4 w-4 text-brand" /> {volunteers.length} Active
        </div>
      </div>

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
              <Loader2 className="h-3.5 w-3.5 animate-spin" /> Generating...
            </span>
          ) : (
            brief
          )}
        </div>
      </div>

      <div className="rounded-3xl bg-white p-6 shadow-soft ring-1 ring-border">
        <h3 className="text-lg font-bold">Current Assignments</h3>
        <div className="mt-4 space-y-3">
          {volunteers.map((v) => (
            <div
              key={v.id}
              className="flex items-center justify-between rounded-2xl border border-border p-3"
            >
              <div>
                <div className="font-semibold">{v.name}</div>
                <div className="text-[11px] text-muted-foreground">
                  {v.role} • {v.zone}
                </div>
              </div>
              <div
                className={`rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider ${v.status === "Active" ? "bg-success/20 text-success" : "bg-warning/20 text-warning"}`}
              >
                {v.status}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
