import {
  Map as MapIcon,
  Activity,
  AlertTriangle,
  Radio,
  Users,
  Sparkles,
  Calendar,
  Users2,
} from "lucide-react";

export type Tab =
  | "map"
  | "density"
  | "incidents"
  | "broadcast"
  | "volunteers"
  | "sustainability"
  | "scheduling"
  | "coordination";

interface SidebarProps {
  tab: Tab;
  setTab: (t: Tab) => void;
}

export function Sidebar({ tab, setTab }: SidebarProps) {
  const items: { id: Tab; label: string; icon: React.ElementType }[] = [
    { id: "map", label: "Map View", icon: MapIcon },
    { id: "density", label: "Crowd Density", icon: Activity },
    { id: "incidents", label: "Incidents", icon: AlertTriangle },
    { id: "broadcast", label: "Broadcast", icon: Radio },
    { id: "volunteers", label: "Volunteers", icon: Users },
    { id: "sustainability", label: "Sustainability", icon: Sparkles },
    { id: "scheduling", label: "Scheduling", icon: Calendar },
    { id: "coordination", label: "Coordination", icon: Users2 },
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
