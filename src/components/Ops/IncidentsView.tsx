import React, { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { Sparkles, Loader2 } from "lucide-react";
import { useOpsStore } from "@/store/opsStore";
import { triageIncident } from "@/lib/ops.functions";
import type { Incident } from "@/lib/mock-data";

interface IncidentCardProps {
  inc: Incident;
  busy: boolean;
  onTriage: () => void;
  onMove: (s: Incident["status"]) => void;
}

function IncidentCard({
  inc,
  busy,
  onTriage,
  onMove,
}: IncidentCardProps) {
  const priColor =
    inc.priority === "High"
      ? "bg-danger"
      : inc.priority === "Medium"
        ? "bg-warning"
        : inc.priority === "Low"
          ? "bg-success"
          : "bg-muted-foreground";

  const next: Record<Incident["status"], Incident["status"] | null> = {
    new: "triaged",
    triaged: "in-progress",
    "in-progress": "resolved",
    resolved: null,
  };
  const nxt = next[inc.status];

  return (
    <div className="group rounded-2xl bg-white p-4 shadow-soft ring-1 ring-border transition hover:-translate-y-0.5 hover:shadow-glow">
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0 flex-1">
          <div className="text-sm font-bold leading-snug">{inc.title}</div>
          <div className="mt-0.5 text-[11px] text-muted-foreground">
            📍 {inc.location} · {new Date(inc.reportedAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
          </div>
        </div>
        {inc.priority && (
          <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase text-white ${priColor}`}>
            {inc.priority}
          </span>
        )}
      </div>
      <p className="mt-2 text-xs text-foreground/70">{inc.description}</p>

      {inc.actionPlan && (
        <div className="mt-3 rounded-xl bg-gradient-brand-soft p-3">
          <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-brand">
            <Sparkles className="h-3 w-3" /> AI Action Plan
          </div>
          <p className="mt-1 text-xs text-foreground/80">{inc.actionPlan}</p>
        </div>
      )}

      <div className="mt-3 flex gap-2">
        <button
          onClick={onTriage}
          disabled={busy}
          className="flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-gradient-brand px-3 py-2 text-xs font-bold text-white shadow-glow transition hover:-translate-y-0.5 disabled:opacity-60"
        >
          {busy ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Sparkles className="h-3.5 w-3.5" />}
          AI Triage
        </button>
        {nxt && (
          <button
            onClick={() => onMove(nxt)}
            className="rounded-xl border border-border bg-white px-3 py-2 text-xs font-bold text-foreground/70 hover:text-foreground"
          >
            → {nxt.replace("-", " ")}
          </button>
        )}
      </div>
    </div>
  );
}

/**
 * IncidentsView component showing the operational Kanban board with AI incident triage.
 */
export function IncidentsView() {
  const { incidents: items, updateIncident: storeUpdate } = useOpsStore();
  const setItems = (updater: (xs: Incident[]) => Incident[]) =>
    updater(items).forEach((inc) => storeUpdate(inc.id, inc));
  
  const triage = useServerFn(triageIncident);
  const [busyId, setBusy] = useState<string | null>(null);

  const columns: { id: Incident["status"]; label: string; tone: string }[] = [
    { id: "new", label: "New", tone: "text-danger" },
    { id: "triaged", label: "Triaged", tone: "text-warning" },
    { id: "in-progress", label: "In Progress", tone: "text-brand" },
    { id: "resolved", label: "Resolved", tone: "text-success" },
  ];

  const move = (id: string, status: Incident["status"]) =>
    setItems((xs) => xs.map((x) => (x.id === id ? { ...x, status } : x)));

  const runTriage = async (inc: Incident) => {
    setBusy(inc.id);
    try {
      const result = await triage({ data: { report: `${inc.title}. ${inc.description}` } });
      setItems((xs) =>
        xs.map((x) =>
          x.id === inc.id
            ? { ...x, priority: result.priority, actionPlan: result.actionPlan, status: x.status === "new" ? "triaged" : x.status }
            : x,
        ),
      );
    } catch (e) {
      console.error(e);
      alert("AI triage failed: " + (e as Error).message);
    } finally {
      setBusy(null);
    }
  };

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {columns.map((col) => (
        <div key={col.id} className="rounded-3xl bg-white/60 p-4 ring-1 ring-border">
          <div className="mb-3 flex items-center justify-between px-1">
            <div className={`text-xs font-bold uppercase tracking-widest ${col.tone}`}>{col.label}</div>
            <span className="rounded-full bg-white px-2 py-0.5 text-[10px] font-bold text-muted-foreground ring-1 ring-border">
              {items.filter((i) => i.status === col.id).length}
            </span>
          </div>
          <div className="space-y-3">
            {items.filter((i) => i.status === col.id).map((inc) => (
              <IncidentCard
                key={inc.id}
                inc={inc}
                busy={busyId === inc.id}
                onTriage={() => runTriage(inc)}
                onMove={(s) => move(inc.id, s)}
              />
            ))}
            {items.filter((i) => i.status === col.id).length === 0 && (
              <div className="rounded-2xl border border-dashed border-border p-4 text-center text-xs text-muted-foreground">
                No incidents
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
