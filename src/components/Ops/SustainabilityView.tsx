import React, { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { Sparkles, Activity, TrendingUp, Loader2 } from "lucide-react";
import { askGroqAssistant } from "@/lib/ops.functions";
import { KpiCard } from "./KpiCard";

/**
 * SustainabilityView component tracking green indicators, carbon footprint, and trash bins.
 */
export function SustainabilityView() {
  const askFn = useServerFn(askGroqAssistant);
  const [tip, setTip] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const generate = async () => {
    setLoading(true);
    try {
      const res = await askFn({
        data: {
          question: "Give a 1-sentence quick operational tip to improve stadium sustainability right now during a live match.",
          context: "Live match at MetLife Stadium.",
        },
      });
      setTip(res.answer);
    } catch {
      setTip("Unable to generate tip.");
    } finally {
      setLoading(false);
    }
  };

  useState(() => { generate(); });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Sustainability</h2>
          <p className="text-sm text-muted-foreground">Monitor waste management and carbon impact.</p>
        </div>
        <div className="flex items-center gap-2 rounded-xl border border-border bg-white px-3 py-1.5 text-sm font-semibold">
          <Sparkles className="h-4 w-4 text-success" /> Eco-Track Active
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <KpiCard icon={<Activity />} label="Recycling Rate" value="68%" sub="+4% from last match" tone="success" />
        <KpiCard icon={<TrendingUp />} label="Energy Saved" value="1.2 MWh" sub="Smart lighting optimization" tone="brand" />
      </div>

      <div className="rounded-3xl bg-white p-6 shadow-soft ring-1 ring-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brand">
            <Sparkles className="h-4 w-4" /> AI Eco-Tip
          </div>
          <button onClick={generate} disabled={loading} className="text-xs font-semibold text-brand hover:underline disabled:opacity-50">Refresh</button>
        </div>
        <div className="mt-3 rounded-2xl bg-secondary/50 p-4 text-sm font-medium">
          {loading ? (
            <span className="flex items-center gap-2 text-muted-foreground"><Loader2 className="h-3.5 w-3.5 animate-spin" /> Generating...</span>
          ) : (
            tip
          )}
        </div>
      </div>

      <div className="rounded-3xl bg-white p-6 shadow-soft ring-1 ring-border">
        <h3 className="text-lg font-bold">Waste Bins Status</h3>
        <div className="mt-4 space-y-3">
          {[
            { id: 1, loc: "Concourse East - Bin Cluster 4", fill: 85, type: "Mixed Recycling" },
            { id: 2, loc: "Food Court North - Bin Cluster 1", fill: 92, type: "Compost" },
            { id: 3, loc: "Gate A - Exit Bin", fill: 30, type: "Landfill" },
          ].map(bin => (
            <div key={bin.id} className="flex flex-col gap-2 rounded-2xl border border-border p-3">
              <div className="flex items-center justify-between">
                <div className="font-semibold text-sm">{bin.loc} <span className="ml-1 text-[10px] text-muted-foreground uppercase">{bin.type}</span></div>
                <div className={`text-xs font-bold ${bin.fill > 80 ? 'text-danger' : 'text-success'}`}>{bin.fill}% Full</div>
              </div>
              <div className="h-1.5 w-full rounded-full bg-secondary overflow-hidden">
                <div className={`h-full ${bin.fill > 80 ? 'bg-danger' : 'bg-success'}`} style={{ width: `${bin.fill}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
