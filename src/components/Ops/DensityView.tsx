import React from "react";
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

/**
 * DensityView component showing crowd occupancy trends and stats.
 */
export function DensityView() {
  const zones = useOpsStore((s) => s.zones);

  return (
    <div className="space-y-6">
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
