import { useState } from "react";
import { Search, Sparkles, Home, Bell, Loader2, X } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useOpsStore } from "@/store/opsStore";
import { askGroqAssistant } from "@/lib/ops.functions";

export function Topbar() {
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
