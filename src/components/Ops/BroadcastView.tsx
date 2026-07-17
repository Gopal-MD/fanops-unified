import React, { useState } from "react";
import { Send } from "lucide-react";
import { pushBroadcast, useBroadcasts } from "@/lib/broadcast-store";

/**
 * BroadcastView component enabling operators to dispatch announcements to all fans in real-time.
 */
export function BroadcastView() {
  const [msg, setMsg] = useState("Gate B is closed due to congestion. Please reroute to Gate C.");
  const [severity, setSev] = useState<"info" | "warning" | "critical">("warning");
  const [lang, setLang] = useState("English");
  const list = useBroadcasts();

  const send = () => {
    if (!msg.trim()) return;
    pushBroadcast({ message: msg.trim(), severity, language: lang });
  };

  const presets = [
    "Gate B is closed. Please use Gate C.",
    "Medical incident cleared at Section 205.",
    "Weather advisory: light rain expected in 15 minutes.",
    "Match starts in 10 minutes — please take your seats.",
  ];

  return (
    <div className="grid gap-6 lg:grid-cols-3">
      <div className="lg:col-span-2 rounded-3xl bg-white p-6 shadow-soft ring-1 ring-border">
        <div className="text-xs font-semibold uppercase tracking-widest text-brand">Broadcast Center</div>
        <h3 className="text-lg font-bold">Push an alert to every Fan PWA</h3>

        <div className="mt-4">
          <label className="mb-2 block text-xs font-semibold text-muted-foreground">Message</label>
          <textarea
            value={msg}
            onChange={(e) => setMsg(e.target.value)}
            rows={4}
            className="w-full rounded-2xl border border-border bg-secondary/50 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-brand/40"
          />
        </div>

        <div className="mt-4 grid gap-3 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-xs font-semibold text-muted-foreground">Severity</label>
            <div className="flex gap-2">
              {(["info", "warning", "critical"] as const).map((s) => (
                <button
                  key={s}
                  onClick={() => setSev(s)}
                  className={`flex-1 rounded-xl px-3 py-2 text-xs font-bold uppercase transition ${
                    severity === s
                      ? s === "critical"
                        ? "bg-danger text-white shadow-glow"
                        : s === "warning"
                          ? "bg-warning text-white shadow-glow"
                          : "bg-gradient-brand text-white shadow-glow"
                      : "border border-border bg-white text-foreground/70"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="mb-2 block text-xs font-semibold text-muted-foreground">Language</label>
            <select
              value={lang}
              onChange={(e) => setLang(e.target.value)}
              className="w-full rounded-xl border border-border bg-white px-3 py-2 text-sm font-semibold outline-none"
            >
              {["English", "Español", "Français", "العربية", "Português"].map((l) => (
                <option key={l}>{l}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="mt-4">
          <div className="mb-2 text-xs font-semibold text-muted-foreground">Quick templates</div>
          <div className="flex flex-wrap gap-2">
            {presets.map((p) => (
              <button
                key={p}
                onClick={() => setMsg(p)}
                className="rounded-full border border-border bg-white px-3 py-1.5 text-xs font-medium text-foreground/70 hover:border-brand/40 hover:text-brand"
              >
                {p}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={send}
          className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-brand px-5 py-3.5 text-sm font-bold text-white shadow-glow transition hover:-translate-y-0.5"
        >
          <Send className="h-4 w-4" /> Send Broadcast
        </button>

        <p className="mt-3 text-center text-[11px] text-muted-foreground">
          Delivered instantly to the Fan PWA on this device and any other open tab.
        </p>
      </div>

      <div className="rounded-3xl bg-white p-6 shadow-soft ring-1 ring-border">
        <div className="text-xs font-semibold uppercase tracking-widest text-brand">History</div>
        <h3 className="text-lg font-bold">Recent broadcasts</h3>
        <div className="mt-4 space-y-3">
          {list.length === 0 && (
            <div className="rounded-2xl border border-dashed border-border p-4 text-center text-xs text-muted-foreground">
              No broadcasts yet.
            </div>
          )}
          {list.map((b) => (
            <div key={b.id} className="rounded-2xl border border-border p-3">
              <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-wider">
                <span className={
                  b.severity === "critical" ? "text-danger"
                  : b.severity === "warning" ? "text-warning" : "text-brand"
                }>{b.severity}</span>
                <span className="text-muted-foreground">
                  {new Date(b.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                </span>
              </div>
              <div className="mt-1 text-sm font-semibold">{b.message}</div>
              <div className="mt-1 text-[11px] text-muted-foreground">{b.language}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
