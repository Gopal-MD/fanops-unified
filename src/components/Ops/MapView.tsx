import React, { useMemo } from "react";
import { Users, TrendingUp, ShieldAlert, CheckCircle2 } from "lucide-react";
import { useOpsStore } from "@/store/opsStore";
import { densityColor } from "@/lib/mock-data";
import { KpiCard } from "./KpiCard";

function Legend({ color, label }: { color: string; label: string }) {
  return (
    <span className="inline-flex items-center gap-1.5">
      <span className={`h-2.5 w-2.5 rounded-full ${color}`} />
      {label}
    </span>
  );
}

function StadiumMap({ zones }: { zones: ReturnType<typeof useOpsStore>["zones"] }) {
  return (
    <div className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-gradient-to-br from-[#EEF2FF] via-white to-[#ECFEFF] ring-1 ring-border">
      {/* Field */}
      <div className="absolute left-1/2 top-1/2 h-[55%] w-[62%] -translate-x-1/2 -translate-y-1/2 rounded-[40%] bg-gradient-to-br from-[#10B981] to-[#059669] shadow-inner ring-4 ring-white/70">
        <div className="absolute left-1/2 top-1/2 h-16 w-16 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white/70" />
        <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-white/60" />
      </div>
      {/* Concentric ring */}
      <div className="absolute inset-6 rounded-[40px] border-2 border-dashed border-brand/20" />

      {/* Zone dots */}
      {zones.map((z) => {
        const c = densityColor(z.level);
        return (
          <div
            key={z.id}
            className="group absolute -translate-x-1/2 -translate-y-1/2"
            style={{ left: `${z.x}%`, top: `${z.y}%` }}
          >
            <div className={`h-4 w-4 rounded-full ${c.bg} ring-4 ${c.ring}/30 animate-pulse`} />
            <div className="glass absolute left-1/2 top-6 z-10 w-44 -translate-x-1/2 rounded-xl p-2.5 opacity-0 shadow-soft transition group-hover:opacity-100">
              <div className="text-xs font-bold">{z.name}</div>
              <div className={`text-[11px] font-semibold ${c.text}`}>
                {z.occupancy}% full · {c.label}
              </div>
            </div>
          </div>
        );
      })}

      {/* Floating summary cards */}
      <div className="absolute left-4 top-4 glass rounded-xl px-3 py-2 text-xs shadow-soft">
        <div className="font-bold">Gate B</div>
        <div className="text-danger">87% · Congested</div>
      </div>
      <div className="absolute right-4 bottom-4 glass rounded-xl px-3 py-2 text-xs shadow-soft">
        <div className="font-bold">Section 205</div>
        <div className="text-danger">92% · Congested</div>
      </div>
    </div>
  );
}

/**
 * MapView component representing stadium zones and density layout.
 */
export function MapView() {
  const zones = useOpsStore((s) => s.zones);
  
  const stats = useMemo(() => {
    // Guard Clause: avoid division by zero
    if (zones.length === 0) return { avg: 0, congested: 0, totalCap: 0, inside: 0 };
    
    const avg = Math.round(zones.reduce((s, z) => s + z.occupancy, 0) / zones.length);
    const congested = zones.filter((z) => z.level === "high").length;
    const totalCap = zones.reduce((s, z) => s + z.capacity, 0);
    const inside = Math.round(zones.reduce((s, z) => s + (z.capacity * z.occupancy) / 100, 0));
    return { avg, congested, totalCap, inside };
  }, [zones]);

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-4">
        <KpiCard icon={<Users className="h-5 w-5" />} label="Attendance" value={stats.inside.toLocaleString()} sub={`of ${stats.totalCap.toLocaleString()} capacity`} tone="brand" />
        <KpiCard icon={<TrendingUp className="h-5 w-5" />} label="Avg density" value={`${stats.avg}%`} sub="+4% last 10 min" tone="cyan" />
        <KpiCard icon={<ShieldAlert className="h-5 w-5" />} label="Congested zones" value={String(stats.congested)} sub="Gate B, Section 205" tone="warning" />
        <KpiCard icon={<CheckCircle2 className="h-5 w-5" />} label="Response SLA" value="98%" sub="under 90s dispatch" tone="success" />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 relative overflow-hidden rounded-3xl bg-white p-6 shadow-soft ring-1 ring-border">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <div className="text-xs font-semibold uppercase tracking-widest text-brand">Stadium Map</div>
              <h3 className="text-lg font-bold">Live zone density</h3>
            </div>
            <div className="flex items-center gap-3 text-xs">
              <Legend color="bg-success" label="Clear" />
              <Legend color="bg-warning" label="Moderate" />
              <Legend color="bg-danger" label="Congested" />
            </div>
          </div>
          <StadiumMap zones={zones} />
        </div>

        <div className="rounded-3xl bg-white p-6 shadow-soft ring-1 ring-border">
          <div className="text-xs font-semibold uppercase tracking-widest text-brand">Zone breakdown</div>
          <h3 className="text-lg font-bold">Occupancy</h3>
          <div className="mt-4 space-y-3">
            {zones.map((z) => {
              const c = densityColor(z.level);
              return (
                <div key={z.id} className="rounded-2xl border border-border p-3">
                  <div className="flex items-center justify-between">
                    <div className="text-sm font-bold">{z.name}</div>
                    <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white ${c.bg}`}>
                      {c.label}
                    </span>
                  </div>
                  <div className="mt-2 h-2 overflow-hidden rounded-full bg-secondary">
                    <div className={`h-full ${c.bg}`} style={{ width: `${z.occupancy}%` }} />
                  </div>
                  <div className="mt-1 flex justify-between text-[11px] text-muted-foreground">
                    <span>{z.occupancy}% full</span>
                    <span>{z.capacity.toLocaleString()} cap</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
