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
  const groups: {
    title: string;
    items: { id: Tab; label: string; icon: React.ElementType }[];
  }[] = [
    {
      title: "General overview",
      items: [{ id: "map", label: "Map View", icon: MapIcon }],
    },
    {
      title: "Match organizers",
      items: [
        { id: "density", label: "Crowd Density", icon: Activity },
        { id: "scheduling", label: "Scheduling", icon: Calendar },
      ],
    },
    {
      title: "Security & Medical Teams",
      items: [{ id: "incidents", label: "Incidents", icon: AlertTriangle }],
    },
    {
      title: "Volunteers & Ushers",
      items: [{ id: "volunteers", label: "Volunteers", icon: Users }],
    },
    {
      title: "Sustainability managers",
      items: [{ id: "sustainability", label: "Sustainability", icon: Sparkles }],
    },
    {
      title: "Transportation staff",
      items: [{ id: "coordination", label: "Coordination", icon: Users2 }],
    },
    {
      title: "Broadcasters center",
      items: [{ id: "broadcast", label: "Broadcast", icon: Radio }],
    },
  ];

  return (
    <aside className="sticky top-0 hidden h-screen w-64 shrink-0 border-r border-border bg-white/60 backdrop-blur-xl md:block overflow-y-auto">
      <div className="flex h-16 items-center gap-2 px-5 shrink-0">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-brand text-white shadow-glow">
          <Sparkles className="h-4 w-4" />
        </div>
        <div>
          <div className="text-sm font-extrabold leading-none">FIFA 26</div>
          <div className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
            Operations Center
          </div>
        </div>
      </div>
      <nav className="mt-2 space-y-4 px-3 pb-24">
        {groups.map((group) => (
          <div key={group.title} className="space-y-1">
            <div className="px-3 text-[9px] font-black uppercase tracking-widest text-muted-foreground/80">
              {group.title}
            </div>
            {group.items.map((it) => (
              <button
                key={it.id}
                onClick={() => setTab(it.id)}
                className={`flex w-full items-center gap-3 rounded-xl px-3 py-2 text-xs font-semibold transition ${
                  tab === it.id
                    ? "bg-gradient-brand text-white shadow-glow"
                    : "text-foreground/75 hover:bg-secondary/60"
                }`}
              >
                <it.icon className="h-3.5 w-3.5" />
                {it.label}
              </button>
            ))}
          </div>
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
