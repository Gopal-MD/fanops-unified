import React, { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { Sparkles, Activity, TrendingUp, Loader2, Leaf, BarChart2, Check } from "lucide-react";
import { askGroqAssistant } from "@/lib/ops.functions";
import { KpiCard } from "./KpiCard";

interface SustainabilityIntervention {
  id: string;
  title: string;
  carbonReduction: string;
  cost: "free" | "low" | "medium";
  implemented: boolean;
}

/**
 * SustainabilityView component tracking green indicators, carbon footprint,
 * and presenting Sustainability Intelligence metrics.
 */
export function SustainabilityView() {
  const askFn = useServerFn(askGroqAssistant);
  const [tip, setTip] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const [interventions, setInterventions] = useState<SustainabilityIntervention[]>([
    {
      id: "int-1",
      title: "Encourage public transit via PWA alerts",
      carbonReduction: "8.0 tonnes CO₂",
      cost: "free",
      implemented: false,
    },
    {
      id: "int-2",
      title: "Optimize stadium shuttle routes",
      carbonReduction: "2.2 tonnes CO₂",
      cost: "low",
      implemented: false,
    },
    {
      id: "int-3",
      title: "Activate secondary waste sorting marshalling",
      carbonReduction: "1.5 tonnes CO₂",
      cost: "low",
      implemented: false,
    },
  ]);

  const [fanComparison, setFanComparison] = useState({
    driving: 12,
    transit: 0.8,
  });

  // Carbon Calculator state
  const [calcDistance, setCalcDistance] = useState(25);
  const [calcMode, setCalcMode] = useState<"car" | "ev" | "bus" | "metro">("car");

  const co2Factors = {
    car: 0.22, // kg CO2 per km
    ev: 0.05,
    bus: 0.08,
    metro: 0.01,
  };

  const calculatedCO2 = Math.round(calcDistance * co2Factors[calcMode] * 10) / 10;
  const carCO2Equivalent = Math.round(calcDistance * co2Factors.car * 10) / 10;
  const carbonSaved = Math.round(Math.max(0, carCO2Equivalent - calculatedCO2) * 10) / 10;

  const generate = async () => {
    setLoading(true);
    try {
      const res = await askFn({
        data: {
          question:
            "Provide 3 actionable tips for stadium green operations: 1 for waste recycling bin optimization, 1 for water dispenser refill alerts, and 1 for energy-aware smart lighting options.",
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

  useState(() => {
    generate();
  });

  const implementIntervention = (id: string) => {
    setInterventions(interventions.map((i) => (i.id === id ? { ...i, implemented: true } : i)));
  };

  return (
    <div className="space-y-6">
      {/* Stakeholder Target Header Banner */}
      <div className="rounded-2xl border border-brand/20 bg-gradient-brand-soft px-4 py-2.5 flex items-center justify-between text-xs text-brand font-bold">
        <span>👥 Target Stakeholders: Sustainability Teams, Stadium Operations Managers</span>
        <span className="flex items-center gap-1.5 uppercase tracking-wider text-[10px]">
          <Leaf className="h-3.5 w-3.5 text-success animate-pulse" /> Eco-Commander Active
        </span>
      </div>

      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Sustainability Operations</h2>
          <p className="text-sm text-muted-foreground">
            Monitor Carbon Impact and enforce live green mitigation decisions.
          </p>
        </div>
      </div>

      {/* Interactive Carbon Calculator Widget */}
      <div className="rounded-3xl border border-brand/10 bg-white p-5 shadow-soft">
        <h3 className="text-sm font-bold text-foreground flex items-center gap-1.5">
          <Leaf className="h-4.5 w-4.5 text-success" />
          Interactive Transit Offset Calculator
        </h3>
        <p className="text-xs text-muted-foreground mt-0.5">
          Estimate travel carbon footprint offsets based on fan transit choices.
        </p>

        <div className="mt-4 grid gap-4 sm:grid-cols-3 items-center">
          <div>
            <label className="text-[10px] font-black uppercase text-muted-foreground">Distance (km)</label>
            <input
              type="number"
              min="1"
              max="200"
              value={calcDistance}
              onChange={(e) => setCalcDistance(Math.max(1, parseInt(e.target.value) || 0))}
              className="mt-1 w-full rounded-xl border border-border bg-white px-3 py-1.5 text-xs font-bold outline-none"
            />
          </div>
          <div>
            <label className="text-[10px] font-black uppercase text-muted-foreground">Transport Mode</label>
            <select
              value={calcMode}
              onChange={(e: any) => setCalcMode(e.target.value)}
              className="mt-1 w-full rounded-xl border border-border bg-white px-3 py-1.5 text-xs font-bold"
            >
              <option value="car">Gasoline Car</option>
              <option value="ev">Electric Vehicle</option>
              <option value="bus">Shuttle Bus</option>
              <option value="metro">Metro Transit</option>
            </select>
          </div>
          <div className="rounded-2xl bg-gradient-brand-soft p-3 text-center border border-brand/5">
            <div className="text-[9px] font-extrabold uppercase text-brand">Estimated Carbon Saved</div>
            <div className="mt-1 text-base font-black text-brand">{carbonSaved} kg CO₂</div>
            <div className="text-[8px] text-muted-foreground mt-0.5">compared to single occupancy car</div>
          </div>
        </div>
      </div>

      {/* Carbon footprint metrics */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <KpiCard
          icon={<BarChart2 className="h-5 w-5 text-success" />}
          label="Est. Event Carbon Footprint"
          value="42.8 tonnes"
          sub="Goal limit: 50.0 tonnes"
          tone="success"
        />
        <KpiCard
          icon={<Activity className="h-5 w-5 text-brand" />}
          label="Recycling Divert Rate"
          value="72.4%"
          sub="+8% from last matches"
          tone="brand"
        />
        <KpiCard
          icon={<TrendingUp className="h-5 w-5 text-warning" />}
          label="Water Dispenser Refills"
          value="14,820 Liters"
          sub="Eliminated ~30,000 plastic bottles"
          tone="warning"
        />
      </div>

      {/* Carbon footprint analysis progress meter */}
      <div className="rounded-3xl bg-white p-6 shadow-soft ring-1 ring-border space-y-4">
        <h3 className="text-sm font-bold text-foreground">Operational Carbon Breakdown</h3>
        <div className="space-y-3">
          {[
            { cat: "Fan Transportation", value: 24.5, max: 30, color: "bg-brand" },
            { cat: "Venue Operations & Lighting", value: 13.2, max: 15, color: "bg-success" },
            { cat: "Food Service & Waste", value: 5.1, max: 5, color: "bg-warning" },
          ].map((item, idx) => (
            <div key={idx} className="space-y-1">
              <div className="flex justify-between text-xs font-semibold">
                <span>{item.cat}</span>
                <span>
                  {item.value} / {item.max} tonnes CO₂
                </span>
              </div>
              <div className="h-2 w-full rounded-full bg-secondary overflow-hidden">
                <div
                  className={`h-full ${item.color}`}
                  style={{ width: `${(item.value / item.max) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Environmental transit comparative logic */}
        <div className="rounded-3xl bg-white p-6 shadow-soft ring-1 ring-border">
          <h3 className="text-lg font-bold">Fan Transit Comparative Analytics</h3>
          <p className="mt-1 text-xs text-muted-foreground">
            Highlighting CO₂ savings for fans utilizing Metro Line 3 vs driving alone.
          </p>

          <div className="mt-4 space-y-3">
            <div className="flex items-center justify-between rounded-2xl border border-border p-3">
              <div>
                <div className="font-semibold text-sm">Driving Alone (Average vehicle)</div>
                <div className="text-[11px] text-muted-foreground">12 kg CO₂ produced per trip</div>
              </div>
              <div className="text-danger font-extrabold text-lg">{fanComparison.driving} kg</div>
            </div>

            <div className="flex items-center justify-between rounded-2xl border border-success bg-success-soft p-3">
              <div>
                <div className="font-semibold text-sm text-success">
                  Public Transit (Metro Line 3)
                </div>
                <div className="text-[11px] text-success/80">94% reduction in carbon footprint</div>
              </div>
              <div className="text-success font-extrabold text-lg">{fanComparison.transit} kg</div>
            </div>
          </div>
        </div>

        {/* Actionable interventions list */}
        <div className="rounded-3xl bg-white p-6 shadow-soft ring-1 ring-border">
          <h3 className="text-lg font-bold">Live Sustainability Interventions</h3>
          <div className="mt-4 space-y-3">
            {interventions.map((it) => (
              <div
                key={it.id}
                className={`flex items-center justify-between rounded-2xl border p-3 ${
                  it.implemented ? "border-success bg-success-soft" : "border-border bg-white"
                }`}
              >
                <div>
                  <div className="font-semibold text-xs">{it.title}</div>
                  <div className="text-[10px] text-muted-foreground mt-0.5">
                    Impact: -{it.carbonReduction} · Cost: {it.cost}
                  </div>
                </div>
                <button
                  onClick={() => implementIntervention(it.id)}
                  disabled={it.implemented}
                  className="rounded-xl border border-border bg-white px-3 py-1.5 text-xs font-bold hover:bg-brand hover:text-white transition disabled:opacity-50"
                >
                  {it.implemented ? "Active" : "Deploy"}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="rounded-3xl bg-white p-6 shadow-soft ring-1 ring-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brand">
            <Sparkles className="h-4 w-4" /> AI Eco-Tip
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
            tip
          )}
        </div>
      </div>
    </div>
  );
}
