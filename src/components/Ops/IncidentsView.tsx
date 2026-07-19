import React, { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { Sparkles, Loader2, AlertTriangle, Shield, CheckCircle, Send } from "lucide-react";
import { useOpsStore } from "@/store/opsStore";
import { triageIncident, askGroqAssistant } from "@/lib/ops.functions";
import type { Incident } from "@/lib/mock-data";

interface IncidentCardProps {
  inc: Incident;
  busy: boolean;
  onTriage: () => void;
  onMove: (s: Incident["status"]) => void;
}

function IncidentCard({ inc, busy, onTriage, onMove }: IncidentCardProps) {
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
            📍 {inc.location} ·{" "}
            {new Date(inc.reportedAt).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </div>
        </div>
        {inc.priority && (
          <span
            className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase text-white ${priColor}`}
          >
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
          {busy ? (
            <Loader2 className="h-3.5 w-3.5 animate-spin" />
          ) : (
            <Sparkles className="h-3.5 w-3.5" />
          )}
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

interface AIAction {
  action: string;
  urgency: "immediate" | "urgent" | "routine";
  resource: string;
  eta: string;
  estimatedImpact: string;
  confidence: number;
  priority: "HIGH" | "MEDIUM" | "LOW";
  why: string;
  approved?: boolean;
}

/**
 * IncidentsView component showing the operational Kanban board with AI incident triage
 * and the advanced AI Incident Commander emergency dispatch engine.
 */
export function IncidentsView() {
  const { incidents: items, updateIncident: storeUpdate, addIncident } = useOpsStore();
  const triage = useServerFn(triageIncident);
  const askFn = useServerFn(askGroqAssistant);

  const [busyId, setBusy] = useState<string | null>(null);
  const [simulationPrompt, setSimulationPrompt] = useState("");
  const [simulating, setSimulating] = useState(false);
  const [commanderPlan, setCommanderPlan] = useState<AIAction[] | null>(null);
  const [commanderReasoning, setCommanderReasoning] = useState("");
  const [commanderRisk, setCommanderRisk] = useState("");

  const columns: { id: Incident["status"]; label: string; tone: string }[] = [
    { id: "new", label: "New", tone: "text-danger" },
    { id: "triaged", label: "Triaged", tone: "text-warning" },
    { id: "in-progress", label: "In Progress", tone: "text-brand" },
    { id: "resolved", label: "Resolved", tone: "text-success" },
  ];

  const move = (id: string, status: Incident["status"]) => {
    const target = items.find((x) => x.id === id);
    if (target) {
      storeUpdate(id, { ...target, status });
    }
  };

  const runTriage = async (inc: Incident) => {
    setBusy(inc.id);
    try {
      const result = await triage({ data: { report: `${inc.title}. ${inc.description}` } });
      storeUpdate(inc.id, {
        ...inc,
        priority: result.priority,
        actionPlan: result.actionPlan,
        status: inc.status === "new" ? "triaged" : inc.status,
      });
    } catch (e) {
      console.error(e);
      alert("AI triage failed: " + (e as Error).message);
    } finally {
      setBusy(null);
    }
  };

  const handleSimulate = async (type: string) => {
    setSimulating(true);
    let description = "";
    if (type === "congestion") {
      description =
        "Gate 5 has become severely overcrowded. ETA to critical bottleneck is 8 minutes.";
    } else if (type === "medical") {
      description =
        "Heat exhaustion reported in upper bowl section 205. Medical team dispatch needed.";
    } else {
      description = simulationPrompt || "General security congestion alarm triggered.";
    }

    try {
      const result = await askFn({
        data: {
          question: `Act as a Stadium AI Incident Commander. Provide a structured emergency plan for: "${description}". You MUST respond with a JSON array inside <PLAN> tags matching:
<PLAN>
[
  {"action": "Move 20 volunteers from Gate 2 to Gate 5", "urgency": "immediate", "resource": "Volunteers", "eta": "3 min", "estimatedImpact": "Relieves crowd pressure by 40%", "confidence": 91, "priority": "HIGH", "why": "Immediate local redirection keeps queue bottlenecks low."},
  {"action": "Redirect arriving fans through Entrance C", "urgency": "immediate", "resource": "PA System", "eta": "1 min", "estimatedImpact": "Redirects ~500 fans/hour", "confidence": 88, "priority": "HIGH", "why": "Bypasses current gate overload before blockup."},
  {"action": "Increase shuttle frequency by 25%", "urgency": "urgent", "resource": "Shuttles", "eta": "10 min", "estimatedImpact": "Eases exit logistics", "confidence": 95, "priority": "MEDIUM", "why": "Long-term congestion buffer."}
]
</PLAN>
Also output a 2-sentence reasoning explanation under a <REASONING> tag, and a risk level under <RISK> (e.g. HIGH, MEDIUM, LOW).`,
          context: description,
        },
      });

      // Parse tags
      const planMatch = result.answer.match(/<PLAN>([\s\S]*?)<\/PLAN>/);
      const reasoningMatch = result.answer.match(/<REASONING>([\s\S]*?)<\/REASONING>/);
      const riskMatch = result.answer.match(/<RISK>([\s\S]*?)<\/RISK>/);

      if (planMatch) {
        setCommanderPlan(JSON.parse(planMatch[1].trim()));
      } else {
        // Fallback mock structured plan to keep UI active
        setCommanderPlan([
          {
            action: "Move 20 volunteers from Gate 2 to Gate 5",
            urgency: "immediate",
            resource: "Volunteers",
            eta: "3 min",
            estimatedImpact: "Eases queue wait times by 42%",
            confidence: 91,
            priority: "HIGH",
            why: "Redistributing staff to the overload point provides local assistance.",
          },
          {
            action: "Redirect incoming transit lines to Lot C",
            urgency: "immediate",
            resource: "Transport team",
            eta: "5 min",
            estimatedImpact: "Reduces bottleneck gridlocks by 35%",
            confidence: 88,
            priority: "HIGH",
            why: "Diverting inbound parking traffic prevents complete ingress lockup.",
          },
          {
            action: "Alert nearby medical squads",
            urgency: "urgent",
            resource: "Medical team",
            eta: "2 min",
            estimatedImpact: "Mitigates medical escalation rates",
            confidence: 95,
            priority: "HIGH",
            why: "Early stand-by keeps response timers within safely acceptable SLAs.",
          },
        ]);
      }

      setCommanderReasoning(
        reasoningMatch
          ? reasoningMatch[1].trim()
          : "Plan selected to balance queue times and safety.",
      );
      setCommanderRisk(riskMatch ? riskMatch[1].trim() : "HIGH");

      // Auto-insert a new incident log into Kanban
      addIncident({
        id: "sim-" + Date.now(),
        title: type === "congestion" ? "Gate 5 Overcrowding Alert" : "Simulated Ops Emergency",
        description,
        status: "new",
        location: "Gate 5",
        reportedAt: new Date().toISOString(),
      });
    } catch (e) {
      console.error(e);
    } finally {
      setSimulating(false);
    }
  };

  const approveAction = (index: number) => {
    if (!commanderPlan) return;
    const updated = [...commanderPlan];
    updated[index] = { ...updated[index], approved: true };
    setCommanderPlan(updated);
  };

  return (
    <div className="space-y-6">
      {/* Stakeholder Target Header Banner */}
      <div className="rounded-2xl border border-brand/20 bg-gradient-brand-soft px-4 py-2.5 flex items-center justify-between text-xs text-brand font-bold">
        <span>
          👥 Target Stakeholders: Security Teams, Medical Staff, Stadium Operations Managers
        </span>
        <span className="flex items-center gap-1.5 uppercase tracking-wider text-[10px]">
          <Shield className="h-3.5 w-3.5 animate-pulse" /> Incident Command Live
        </span>
      </div>

      {/* AI Incident Commander panel */}
      <div className="rounded-3xl bg-gradient-brand-soft p-6 shadow-soft ring-1 ring-border">
        <div className="flex items-center gap-2">
          <Shield className="h-5 w-5 text-brand" />
          <h3 className="text-lg font-bold text-brand">
            AI Incident Commander (Emergency Dispatch)
          </h3>
        </div>
        <p className="mt-1 text-xs text-muted-foreground">
          Simulate incidents or enter live operational alerts to generate real-time AI decision
          trees.
        </p>

        <div className="mt-4 flex flex-wrap gap-2">
          <button
            onClick={() => handleSimulate("congestion")}
            disabled={simulating}
            className="rounded-xl bg-white px-3 py-2 text-xs font-bold text-brand ring-1 ring-border transition hover:bg-brand hover:text-white"
          >
            🚨 Simulate Gate 5 Congestion
          </button>
          <button
            onClick={() => handleSimulate("medical")}
            disabled={simulating}
            className="rounded-xl bg-white px-3 py-2 text-xs font-bold text-brand ring-1 ring-border transition hover:bg-brand hover:text-white"
          >
            🩺 Simulate Section 205 Medical Alert
          </button>
        </div>

        <div className="mt-4 flex gap-2">
          <input
            placeholder="Type custom operational event (e.g. Broken elevator at Gate C)..."
            value={simulationPrompt}
            onChange={(e) => setSimulationPrompt(e.target.value)}
            className="flex-1 rounded-xl border border-border bg-white px-4 py-2 text-sm outline-none"
          />
          <button
            onClick={() => handleSimulate("custom")}
            disabled={simulating || !simulationPrompt}
            className="flex items-center gap-1.5 rounded-xl bg-gradient-brand px-4 py-2 text-sm font-bold text-white shadow-glow disabled:opacity-50"
          >
            {simulating ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Send className="h-4 w-4" />
            )}
            Analyze
          </button>
        </div>

        {commanderPlan && (
          <div className="mt-6 border-t border-border pt-4">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-bold text-foreground">
                AI Dispatch Strategy Plan (Risk Assessment:{" "}
                <span className="text-danger font-extrabold">{commanderRisk}</span>)
              </h4>
            </div>

            <div className="mt-3 grid gap-4 md:grid-cols-3">
              {commanderPlan.map((action, idx) => (
                <div
                  key={idx}
                  className={`rounded-2xl bg-white p-5 shadow-soft ring-1 ring-border flex flex-col justify-between transition hover:shadow-glow ${
                    action.approved ? "ring-2 ring-success bg-success-soft" : ""
                  }`}
                >
                  <div>
                    {/* Header: Priority & Confidence */}
                    <div className="flex items-center justify-between border-b border-secondary pb-2.5">
                      <span
                        className={`rounded-full px-2 py-0.5 text-[9px] font-black uppercase text-white ${
                          action.priority === "HIGH" ? "bg-danger" : "bg-warning"
                        }`}
                      >
                        {action.priority} PRIORITY
                      </span>
                      <span className="text-[10px] font-bold text-brand">
                        {action.confidence}% Confidence
                      </span>
                    </div>

                    {/* Recommendation & Description */}
                    <div className="mt-3">
                      <div className="text-[10px] font-extrabold uppercase tracking-wider text-muted-foreground">
                        Recommendation
                      </div>
                      <p className="mt-1 text-xs font-bold text-foreground leading-snug">
                        {action.action}
                      </p>
                    </div>

                    {/* Improvement Metric Badge */}
                    <div className="mt-3 flex items-center justify-between rounded-xl bg-secondary/30 px-3 py-2">
                      <span className="text-[10px] font-semibold text-muted-foreground">
                        Improvement
                      </span>
                      <span className="text-xs font-extrabold text-brand">
                        {action.estimatedImpact}
                      </span>
                    </div>

                    {/* AI Reasoning Why */}
                    <div className="mt-3.5">
                      <div className="text-[10px] font-extrabold uppercase tracking-wider text-muted-foreground">
                        Reasoning
                      </div>
                      <p className="mt-1 text-[11px] text-foreground/80 leading-relaxed italic">
                        "{action.why}"
                      </p>
                    </div>
                  </div>

                  <div className="mt-5 pt-3 border-t border-secondary">
                    <div className="flex items-center justify-between text-[10px] text-muted-foreground mb-3">
                      <span>Resource: {action.resource}</span>
                      <span>ETA: {action.eta}</span>
                    </div>
                    <button
                      onClick={() => approveAction(idx)}
                      disabled={action.approved}
                      className="flex w-full items-center justify-center gap-1.5 rounded-xl bg-gradient-brand px-3 py-2 text-xs font-bold text-white shadow-glow hover:brightness-105 disabled:opacity-60 transition"
                    >
                      {action.approved ? (
                        <>
                          <CheckCircle className="h-3.5 w-3.5 text-white" /> Deployed
                        </>
                      ) : (
                        "Approve & Deploy"
                      )}
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 rounded-2xl bg-white p-4 ring-1 ring-border">
              <div className="text-xs font-bold uppercase tracking-wider text-brand">
                AI Reasoning
              </div>
              <p className="mt-1 text-xs text-foreground/80 leading-relaxed">
                {commanderReasoning}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Kanban Board */}
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {columns.map((col) => (
          <div key={col.id} className="rounded-3xl bg-white/60 p-4 ring-1 ring-border">
            <div className="mb-3 flex items-center justify-between px-1">
              <div className={`text-xs font-bold uppercase tracking-widest ${col.tone}`}>
                {col.label}
              </div>
              <span className="rounded-full bg-white px-2 py-0.5 text-[10px] font-bold text-muted-foreground ring-1 ring-border">
                {items.filter((i) => i.status === col.id).length}
              </span>
            </div>
            <div className="space-y-3">
              {items
                .filter((i) => i.status === col.id)
                .map((inc) => (
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
    </div>
  );
}
