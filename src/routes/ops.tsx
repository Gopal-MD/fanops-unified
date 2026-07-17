import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useState, useEffect } from "react";
import {
  Map as MapIcon,
  Activity,
  AlertTriangle,
  Radio,
  Sparkles,
  Loader2,
  Users,
  Home,
  Search,
  Bell,
  X,
} from "lucide-react";
import { type Incident, type Zone } from "@/lib/mock-data";
import { askGroqAssistant } from "@/lib/ops.functions";
import { ModeToggle } from "@/components/mode-toggle";
import { Link } from "@tanstack/react-router";
import { useOpsStore } from "@/store/opsStore";
import { useWebSocket } from "@/hooks/useWebSocket";

// Import modular view components
import { MapView } from "@/components/Ops/MapView";
import { DensityView } from "@/components/Ops/DensityView";
import { IncidentsView } from "@/components/Ops/IncidentsView";
import { BroadcastView } from "@/components/Ops/BroadcastView";
import { VolunteerView } from "@/components/Ops/VolunteerView";
import { SustainabilityView } from "@/components/Ops/SustainabilityView";

export const Route = createFileRoute("/ops")({
  head: () => ({
    meta: [
      { title: "Ops Command — FIFA World Cup 2026" },
      {
        name: "description",
        content: "Stadium operations: crowd density, incidents, broadcast center.",
      },
    ],
  }),
  component: OpsPage,
});

type Tab = "map" | "density" | "incidents" | "broadcast" | "volunteers" | "sustainability";

export function OpsPage() {
  const { subscribe } = useWebSocket();
  const addIncident = useOpsStore((s) => s.addIncident);
  const updateIncident = useOpsStore((s) => s.updateIncident);
  const updateZone = useOpsStore((s) => s.updateZone);
  const [tab, setTab] = useState<Tab>("map");

  useEffect(() => {
    const unsubNew = subscribe("incident:new", (data) => {
      addIncident(data as Incident);
    });
    const unsubUpdate = subscribe("incident:update", (data) => {
      const incident = data as Incident;
      updateIncident(incident.id, incident);
    });
    const unsubCrowd = subscribe("crowd:density-update", (data) => {
      const zone = data as Zone;
      updateZone(zone.id, zone);
    });
    return () => {
      unsubNew();
      unsubUpdate();
      unsubCrowd();
    };
  }, [subscribe, addIncident, updateIncident, updateZone]);

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar tab={tab} setTab={setTab} />
      <div className="flex-1">
        <Topbar />
        <main className="mx-auto max-w-[1400px] px-6 pb-24 pt-6">
          {tab === "map" && <MapView />}
          {tab === "density" && <DensityView />}
          {tab === "incidents" && <IncidentsView />}
          {tab === "broadcast" && <BroadcastView />}
          {tab === "volunteers" && <VolunteerView />}
          {tab === "sustainability" && <SustainabilityView />}
        </main>
      </div>
      <ModeToggle />
    </div>
  );
}

/* ---------------- Sidebar ---------------- */

function Sidebar({ tab, setTab }: { tab: Tab; setTab: (t: Tab) => void }) {
  const items: { id: Tab; label: string; icon: React.ElementType }[] = [
    { id: "map", label: "Map View", icon: MapIcon },
    { id: "density", label: "Crowd Density", icon: Activity },
    { id: "incidents", label: "Incidents", icon: AlertTriangle },
    { id: "broadcast", label: "Broadcast", icon: Radio },
    { id: "volunteers", label: "Volunteers", icon: Users },
    { id: "sustainability", label: "Sustainability", icon: Sparkles },
  ];
  return (
    <aside className="sticky top-0 hidden h-screen w-64 shrink-0 border-r border-border bg-white/60 backdrop-blur-xl md:block">
      <div className="flex h-16 items-center gap-2 px-5">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-brand text-white shadow-glow">
          <Sparkles className="h-4 w-4" />
        </div>
        <div>
          <div className="text-sm font-extrabold leading-none">FIFA 26</div>
          <div className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
            Operations
          </div>
        </div>
      </div>
      <nav className="mt-4 space-y-1 px-3">
        {items.map((it) => (
          <button
            key={it.id}
            onClick={() => setTab(it.id)}
            className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition ${
              tab === it.id
                ? "bg-gradient-brand text-white shadow-glow"
                : "text-foreground/70 hover:bg-secondary"
            }`}
          >
            <it.icon className="h-4 w-4" />
            {it.label}
          </button>
        ))}
      </nav>

      <div className="absolute inset-x-3 bottom-4 rounded-2xl bg-gradient-brand-soft p-4">
        <div className="text-xs font-bold text-brand">System status</div>
        <div className="mt-1 text-sm font-semibold">All systems nominal</div>
        <div className="mt-2 flex items-center gap-1.5 text-[11px] text-muted-foreground">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-success" /> live
        </div>
      </div>
    </aside>
  );
}

/* ---------------- Topbar ---------------- */

function Topbar() {
  const [showBrief, setShowBrief] = useState(false);
  return (
    <>
      <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-border bg-white/70 px-6 backdrop-blur-xl">
        <div>
          <div className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
            Ops Command
          </div>
          <div className="text-lg font-bold">Live MatchDay Overview</div>
        </div>
        <div className="flex items-center gap-3">
          <div className="hidden items-center gap-2 rounded-xl border border-border bg-secondary/60 px-3 py-2 md:flex">
            <Search className="h-4 w-4 text-muted-foreground" />
            <input
              placeholder="Search zones, incidents…"
              className="w-56 bg-transparent text-sm outline-none"
            />
          </div>
          {/* Groq Situation Brief */}
          <button
            onClick={() => setShowBrief((v) => !v)}
            className="flex items-center gap-1.5 rounded-xl bg-gradient-brand px-3 py-2 text-xs font-bold text-white shadow-glow transition hover:-translate-y-0.5"
          >
            <Sparkles className="h-3.5 w-3.5" />
            AI Brief
          </button>
          <Link
            to="/"
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-border text-muted-foreground hover:text-foreground"
          >
            <Home className="h-4 w-4" />
          </Link>
          <button className="relative flex h-9 w-9 items-center justify-center rounded-xl border border-border text-muted-foreground">
            <Bell className="h-4 w-4" />
            <span className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-danger" />
          </button>
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-brand text-xs font-bold text-white">
            OP
          </div>
        </div>
      </header>
      {showBrief && <GroqSituationBrief onClose={() => setShowBrief(false)} />}
    </>
  );
}

function GroqSituationBrief({ onClose }: { onClose: () => void }) {
  const incidents = useOpsStore((s) => s.incidents);
  const zones = useOpsStore((s) => s.zones);
  const askFn = useServerFn(askGroqAssistant);
  const [brief, setBrief] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const generate = async () => {
    setLoading(true);
    const openCount = incidents.filter((i) => i.status !== "resolved").length;
    const criticalZones = zones
      .filter((z) => z.level === "high")
      .map((z) => z.name)
      .join(", ");
    const context = `${openCount} open incidents. Critical zones: ${criticalZones || "none"}.`;
    try {
      const res = await askFn({
        data: {
          question:
            "Give me a brief 2-sentence situation report for stadium operations staff right now.",
          context,
        },
      });
      setBrief(res.answer);
    } catch {
      setBrief("Unable to generate brief — please check manually.");
    } finally {
      setLoading(false);
    }
  };

  // Auto-generate on mount
  useState(() => {
    generate();
  });

  return (
    <div className="border-b border-border bg-gradient-brand-soft px-6 py-3">
      <div className="mx-auto flex max-w-[1400px] items-start justify-between gap-4">
        <div className="flex items-center gap-2">
          <Sparkles className="h-4 w-4 shrink-0 text-brand" />
          <span className="text-xs font-bold uppercase tracking-wider text-brand">
            Groq AI Situation Brief
          </span>
        </div>
        <div className="flex-1 text-sm text-foreground/80">
          {loading && (
            <span className="flex items-center gap-2 text-muted-foreground">
              <Loader2 className="h-3.5 w-3.5 animate-spin" /> Analysing current ops status…
            </span>
          )}
          {!loading && brief && <span>{brief}</span>}
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={generate}
            disabled={loading}
            className="text-xs font-semibold text-brand hover:underline disabled:opacity-50"
          >
            Refresh
          </button>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground">
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
