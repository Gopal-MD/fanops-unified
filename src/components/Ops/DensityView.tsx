import React, { useState } from "react";
import {
  ResponsiveContainer,
  AreaChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Area,
} from "recharts";
import { useOpsStore } from "@/store/opsStore";
import { DENSITY_HISTORY, densityColor } from "@/lib/mock-data";
import { Sparkles, TrendingUp, Users, ShieldAlert, Check, Clock } from "lucide-react";

interface PredictiveMetric {
  metric: string;
  current: number;
  predictions: Record<number, number>; // Maps timeframe minutes (15, 30, 60) to predicted percentages
  status: "normal" | "warning" | "critical";
  recommendation: string;
  urgency: "low" | "medium" | "high";
  confidence: number;
  why: string;
  expectedOutcome: string;
  estimatedImprovement: string;
  timeSensitivity: string;
  affectedStakeholders: string[];
  implemented?: boolean;
}

/**
 * DensityView component showing crowd occupancy trends, stats,
 * and the Organizer AI Predictive Congestion Forecast dashboard.
 * Targets: Match Organizers, Stadium Operations Managers
 */
export function DensityView() {
  const zones = useOpsStore((s) => s.zones);
  const [timeframe, setTimeframe] = useState<number>(30); // 15, 30, or 60 minutes

  const [predictiveMetrics, setPredictiveMetrics] = useState<PredictiveMetric[]>([
    {
      metric: "Gate 3 Entry Queue",
      current: 45,
      predictions: { 15: 62, 30: 82, 60: 95 },
      status: "critical",
      recommendation: "Redirect arriving traffic via Gate B and open secondary entry channels.",
      urgency: "high",
      confidence: 91,
      why: "Real-time computer vision feeds detect an influx of 1,200 fans arriving from the west light rail station.",
      expectedOutcome: "Distributes incoming traffic load more evenly across entryways.",
      estimatedImprovement: "↓ 42% queue wait time",
      timeSensitivity: "Immediate action required within 8 minutes",
      affectedStakeholders: ["Fans", "Security Teams", "Volunteers"],
    },
    {
      metric: "Section A Restrooms",
      current: 55,
      predictions: { 15: 68, 30: 78, 60: 85 },
      status: "warning",
      recommendation: "Activate auxiliary stalls at Corridor East and update digital signage directions.",
      urgency: "medium",
      confidence: 84,
      why: "Section A seating is at 92% occupancy; restroom load historically peaks 15 minutes before halftime.",
      expectedOutcome: "Alleviates congestion hotspot at main restrooms.",
      estimatedImprovement: "↓ 25% stall queue time",
      timeSensitivity: "Recommended deploy within 15 minutes",
      affectedStakeholders: ["Fans", "Venue Staff"],
    },
    {
      metric: "Parking Lot B Occupancy",
      current: 72,
      predictions: { 15: 84, 30: 94, 60: 100 },
      status: "critical",
      recommendation: "Redirect incoming shuttle lines to auxiliary Lot C to avoid transit lock.",
      urgency: "high",
      confidence: 94,
      why: "Lot B is nearing physical capacity. Diverting vehicles early stops local gridlocks from blocking adjacent roads.",
      expectedOutcome: "Maintains smooth vehicle entry speeds without backing up main highway.",
      estimatedImprovement: "↓ 15 mins parking search time",
      timeSensitivity: "Critical deploy within 5 minutes",
      affectedStakeholders: ["Transportation Teams", "Fans"],
    },
    {
      metric: "Section C Concessions Delay",
      current: 40,
      predictions: { 15: 52, 30: 65, 60: 78 },
      status: "warning",
      recommendation: "Alert dispatch crew to restock soda/snacks prior to half-time surge.",
      urgency: "medium",
      confidence: 88,
      why: "High volume of beverage orders predicted due to warm stadium microclimate temperature readings.",
      expectedOutcome: "Avoids stock depletion and shortens order processing delays.",
      estimatedImprovement: "↓ 30% order transaction latency",
      timeSensitivity: "Deploy within 20 minutes",
      affectedStakeholders: ["Venue Staff", "Fans"],
    },
  ]);

  const handleImplement = (index: number) => {
    const updated = [...predictiveMetrics];
    updated[index] = { ...updated[index], implemented: true };
    setPredictiveMetrics(updated);
  };

  return (
    <div className="space-y-6">
      {/* Stakeholder Target Header Banner */}
      <div className="rounded-2xl border border-brand/20 bg-gradient-brand-soft px-4 py-2.5 flex items-center justify-between text-xs text-brand font-bold">
        <span>👥 Target Stakeholders: Match Organizers, Stadium Operations Managers</span>
        <span className="flex items-center gap-1.5 uppercase tracking-wider text-[10px]">
          <Clock className="h-3.5 w-3.5" /> AI Predictive engine live
        </span>
      </div>

      {/* Organizer AI Dashboard */}
      <div className="rounded-3xl bg-white p-6 shadow-soft ring-1 ring-border">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-brand" />
              <h2 className="text-lg font-bold">Organizer AI Dashboard (Predictive Operations)</h2>
            </div>
            <p className="mt-1 text-xs text-muted-foreground">
              Computer vision feeds and historical stadium models predict crowding bottlenecks up to 60 minutes in advance.
            </p>
          </div>
          {/* Timeframe Selectors */}
          <div className="flex items-center gap-1.5 rounded-xl bg-secondary/40 p-1">
            {[15, 30, 60].map((t) => (
              <button
                key={t}
                onClick={() => setTimeframe(t)}
                className={`rounded-lg px-3 py-1 text-xs font-bold transition ${
                  timeframe === t
                    ? "bg-brand text-white shadow"
                    : "text-foreground/70 hover:bg-secondary/80"
                }`}
              >
                {t} Mins
              </button>
            ))}
          </div>
        </div>

        {/* Priority AI Suggestion */}
        <div className="mt-6 rounded-2xl bg-gradient-brand-soft p-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex gap-3">
            <ShieldAlert className="h-5 w-5 text-brand shrink-0 mt-0.5" />
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-brand">
                Top Priority Action Recommended ({timeframe} min forecast)
              </div>
              <div className="mt-1 text-sm font-bold text-foreground">
                {timeframe === 15
                  ? "Open Secondary Entry Channels at Gate C immediately"
                  : timeframe === 30
                    ? "Redirect Shuttle Bus Routes to Lot C immediately"
                    : "Activate Auxiliary Restroom Stalls at corridor East"}
              </div>
              <p className="mt-0.5 text-xs text-foreground/80">
                {timeframe === 15
                  ? "Diverts incoming congestion surge from Gate A, keeping entry speed high."
                  : timeframe === 30
                    ? "Improves transit wait times by 12 minutes and avoids traffic gridlock in the next 15 minutes."
                    : "Pre-empts extreme queues predicted during the halftime stadium exit rush."}
              </p>
            </div>
          </div>
          <button
            onClick={() => handleImplement(2)}
            className="shrink-0 rounded-xl bg-brand px-4 py-2 text-xs font-bold text-white shadow-glow hover:-translate-y-0.5 transition"
          >
            Apply Mitigation Route
          </button>
        </div>

        {/* Detailed Predictive Operational Decision Cards */}
        <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {predictiveMetrics.map((m, idx) => {
            const predVal = m.predictions[timeframe];
            const isCritical = predVal >= 80;
            return (
              <div
                key={idx}
                className={`rounded-2xl border bg-white p-5 shadow-soft flex flex-col justify-between transition hover:shadow-glow ${
                  m.implemented ? "border-success bg-success-soft/30" : "border-border"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between border-b border-secondary pb-2.5">
                    <span className="text-xs font-black text-foreground">{m.metric}</span>
                    <span
                      className={`rounded-full px-2 py-0.5 text-[9px] font-black uppercase ${
                        isCritical ? "bg-danger text-white" : "bg-warning text-white"
                      }`}
                    >
                      {isCritical ? "critical" : "warning"}
                    </span>
                  </div>

                  <div className="mt-4 flex items-baseline gap-2">
                    <span className="text-2xl font-extrabold">{m.current}%</span>
                    <span className="text-xs text-muted-foreground">→</span>
                    <span className="text-xl font-bold text-brand">{predVal}%</span>
                    <span className="text-[10px] text-muted-foreground">(in {timeframe} min)</span>
                  </div>

                  <div className="mt-1.5 flex items-center gap-1 text-[10px] text-muted-foreground">
                    <TrendingUp className="h-3 w-3 text-brand" /> +{predVal - m.current}% surge predicted
                  </div>

                  {/* Recommendation block */}
                  <div className="mt-4 rounded-xl bg-secondary/20 p-3">
                    <div className="text-[9px] font-black uppercase tracking-wider text-muted-foreground">
                      Mitigation Action
                    </div>
                    <p className="mt-1 text-xs font-bold text-foreground leading-snug">
                      {m.recommendation}
                    </p>
                  </div>

                  {/* Decision Explanation details */}
                  <div className="mt-4 space-y-2 text-[10px] text-foreground/80 leading-relaxed border-t border-dashed border-secondary pt-3">
                    <div>
                      <span className="font-bold text-brand uppercase tracking-wider text-[8px] block">
                        Reasoning
                      </span>
                      "{m.why}"
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Confidence:</span>
                      <span className="font-bold text-brand">{m.confidence}%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Improvement:</span>
                      <span className="font-extrabold text-success">{m.estimatedImprovement}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Outcome:</span>
                      <span className="font-semibold">{m.expectedOutcome}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Time Limit:</span>
                      <span className="font-bold text-danger">{m.timeSensitivity}</span>
                    </div>
                    <div>
                      <span className="font-bold text-muted-foreground uppercase text-[8px] block">
                        Impacted Roles
                      </span>
                      {m.affectedStakeholders.join(", ")}
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => handleImplement(idx)}
                  disabled={m.implemented}
                  className="mt-5 flex w-full items-center justify-center gap-1.5 rounded-xl bg-gradient-brand px-3 py-2 text-xs font-bold text-white shadow-glow hover:brightness-105 disabled:opacity-60 transition"
                >
                  {m.implemented ? (
                    <>
                      <Check className="h-4 w-4 text-white" /> Implemented
                    </>
                  ) : (
                    "Apply AI Guidance"
                  )}
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Historical charts */}
      <div className="rounded-3xl bg-white p-6 shadow-soft ring-1 ring-border">
        <div className="text-xs font-semibold uppercase tracking-widest text-brand">Trend</div>
        <h3 className="text-lg font-bold">Density over time</h3>
        <div className="mt-4 h-72">
          <ResponsiveContainer>
            <AreaChart data={DENSITY_HISTORY}>
              <defs>
                <linearGradient id="ga" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#7C3AED" stopOpacity={0.35} />
                  <stop offset="100%" stopColor="#7C3AED" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="gb" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#EF4444" stopOpacity={0.35} />
                  <stop offset="100%" stopColor="#EF4444" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="gc" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#06B6D4" stopOpacity={0.35} />
                  <stop offset="100%" stopColor="#06B6D4" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
              <XAxis dataKey="time" tick={{ fontSize: 12 }} stroke="#94A3B8" />
              <YAxis tick={{ fontSize: 12 }} stroke="#94A3B8" />
              <Tooltip
                contentStyle={{
                  borderRadius: 12,
                  border: "1px solid #e2e8f0",
                  boxShadow: "0 10px 40px -20px rgba(0,0,0,.2)",
                }}
              />
              <Area
                type="monotone"
                dataKey="gateA"
                stroke="#7C3AED"
                strokeWidth={2.5}
                fill="url(#ga)"
                name="Gate A"
              />
              <Area
                type="monotone"
                dataKey="gateB"
                stroke="#EF4444"
                strokeWidth={2.5}
                fill="url(#gb)"
                name="Gate B"
              />
              <Area
                type="monotone"
                dataKey="gateC"
                stroke="#06B6D4"
                strokeWidth={2.5}
                fill="url(#gc)"
                name="Gate C"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {zones.map((z) => {
          const c = densityColor(z.level);
          return (
            <div key={z.id} className="rounded-2xl bg-white p-5 shadow-soft ring-1 ring-border">
              <div className="flex items-center justify-between">
                <div className="text-sm font-bold">{z.name}</div>
                <span
                  className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white ${c.bg}`}
                >
                  {c.label}
                </span>
              </div>
              <div className="mt-4 text-3xl font-extrabold">
                {z.occupancy}
                <span className="text-base font-bold text-muted-foreground">%</span>
              </div>
              <div className="mt-2 h-2 overflow-hidden rounded-full bg-secondary">
                <div className={`h-full ${c.bg}`} style={{ width: `${z.occupancy}%` }} />
              </div>
              <div className="mt-2 text-xs text-muted-foreground">
                Cap {z.capacity.toLocaleString()}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
