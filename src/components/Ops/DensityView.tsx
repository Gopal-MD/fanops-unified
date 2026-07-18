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
import { Sparkles, TrendingUp, Users, ShieldAlert, Check } from "lucide-react";

interface PredictiveMetric {
  metric: string;
  current: number;
  predicted_30min: number;
  status: "normal" | "warning" | "critical";
  recommendation: string;
  urgency: "low" | "medium" | "high";
  implemented?: boolean;
}

/**
 * DensityView component showing crowd occupancy trends, stats,
 * and the Organizer AI Predictive Congestion Forecast dashboard.
 */
export function DensityView() {
  const zones = useOpsStore((s) => s.zones);

  const [predictiveMetrics, setPredictiveMetrics] = useState<PredictiveMetric[]>([
    {
      metric: "Gate 3 Entry Queue",
      current: 45,
      predicted_30min: 82,
      status: "critical",
      recommendation: "Redirect arriving traffic via Gate B and open secondary entry channels.",
      urgency: "high",
    },
    {
      metric: "Section A Restrooms",
      current: 55,
      predicted_30min: 78,
      status: "warning",
      recommendation:
        "Activate auxiliary stalls at Corridor East and update digital signage directions.",
      urgency: "medium",
    },
    {
      metric: "Parking Lot B Occupancy",
      current: 72,
      predicted_30min: 94,
      status: "critical",
      recommendation: "Redirect incoming shuttle lines to auxiliary Lot C to avoid transit lock.",
      urgency: "high",
    },
    {
      metric: "Section C Concessions Delay",
      current: 40,
      predicted_30min: 65,
      status: "warning",
      recommendation: "Alert dispatch crew to restock soda/snacks prior to half-time surge.",
      urgency: "medium",
    },
  ]);

  const handleImplement = (index: number) => {
    const updated = [...predictiveMetrics];
    updated[index] = { ...updated[index], implemented: true };
    setPredictiveMetrics(updated);
  };

  return (
    <div className="space-y-6">
      {/* Organizer AI Dashboard */}
      <div className="rounded-3xl bg-white p-6 shadow-soft ring-1 ring-border">
        <div className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-brand" />
          <h2 className="text-lg font-bold">Organizer AI Dashboard (Predictive Operations)</h2>
        </div>
        <p className="mt-1 text-xs text-muted-foreground">
          Computer vision feeds and historical stadium models predict crowding bottlenecks 30
          minutes in advance.
        </p>

        {/* Priority AI Suggestion */}
        <div className="mt-4 rounded-2xl bg-gradient-brand-soft p-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex gap-3">
            <ShieldAlert className="h-5 w-5 text-brand shrink-0 mt-0.5" />
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-brand">
                Top Priority Action Recommended
              </div>
              <div className="mt-1 text-sm font-bold text-foreground">
                Redirect Shuttle Bus Routes to Lot C immediately
              </div>
              <p className="mt-0.5 text-xs text-foreground/80">
                Improves transit wait times by 12 minutes and avoids traffic gridlock in the next 15
                minutes.
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

        {/* Predictive Metrics Grid */}
        <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {predictiveMetrics.map((m, idx) => (
            <div key={idx} className="rounded-2xl border border-border bg-white p-4 shadow-soft">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-foreground/80">{m.metric}</span>
                <span
                  className={`rounded-full px-2 py-0.5 text-[9px] font-bold uppercase ${
                    m.status === "critical"
                      ? "bg-danger/10 text-danger"
                      : "bg-warning/10 text-warning"
                  }`}
                >
                  {m.status}
                </span>
              </div>
              <div className="mt-3 flex items-baseline gap-2">
                <span className="text-2xl font-extrabold">{m.current}%</span>
                <span className="text-xs text-muted-foreground">→</span>
                <span className="text-xl font-bold text-brand">{m.predicted_30min}%</span>
                <span className="text-[10px] text-muted-foreground">(in 30 min)</span>
              </div>
              <div className="mt-1 flex items-center gap-1 text-[10px] text-muted-foreground">
                <TrendingUp className="h-3 w-3 text-brand" /> +{m.predicted_30min - m.current}%
                surge predicted
              </div>
              <p className="mt-3 text-[11px] text-foreground/80 leading-relaxed bg-secondary/30 p-2 rounded-xl">
                {m.recommendation}
              </p>
              <button
                onClick={() => handleImplement(idx)}
                disabled={m.implemented}
                className="mt-3 flex w-full items-center justify-center gap-1 rounded-xl bg-secondary py-1.5 text-xs font-bold hover:bg-brand hover:text-white transition disabled:opacity-60"
              >
                {m.implemented ? (
                  <>
                    <Check className="h-3 w-3 text-success" /> Implemented
                  </>
                ) : (
                  "Apply AI Guidance"
                )}
              </button>
            </div>
          ))}
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
