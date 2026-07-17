import { useEffect, useState } from "react";
import { Swords, Clock, Wifi, MessageCircle, Loader2, Send } from "lucide-react";
import { useMatchStore, useCurrentMatch, useMatchEvents, useIsLive, type MatchEvent } from "@/store/matchStore";
import { useWebSocket } from "@/hooks/useWebSocket";
import { useServerFn } from "@tanstack/react-start";
import { askGroqAssistant } from "@/lib/ops.functions";

/**
 * Live match scoreboard + Groq-powered fan Q&A assistant.
 * Wired to useMatchStore + useWebSocket.
 */
export function MatchScoreboard({ lang = "English" }: { lang?: string }) {
  const match = useCurrentMatch();
  const events = useMatchEvents();
  const isLive = useIsLive();
  const { addEvent } = useMatchStore();
  const { subscribe } = useWebSocket();

  // Live match minute ticker
  const [displayMinute, setDisplayMinute] = useState(match?.minute ?? 0);
  useEffect(() => {
    if (!isLive) return;
    const interval = setInterval(() => {
      setDisplayMinute((m) => Math.min(m + 1, 90));
    }, 60_000);
    return () => clearInterval(interval);
  }, [isLive]);
  useEffect(() => {
    setDisplayMinute(match?.minute ?? 0);
  }, [match?.minute]);

  // WebSocket subscriptions
  useEffect(() => {
    const unsubGoal = subscribe("match:goal", (data) => addEvent(data as MatchEvent));
    const unsubCard = subscribe("match:card", (data) => addEvent(data as MatchEvent));
    const unsubSub  = subscribe("match:substitution", (data) => addEvent(data as MatchEvent));
    return () => { unsubGoal(); unsubCard(); unsubSub(); };
  }, [subscribe, addEvent]);

  if (!match) return null;

  const recentEvents = [...events].reverse().slice(0, 5);

  return (
    <div className="mt-5 space-y-4">
      {/* ── Scoreboard ─────────────────────────────────────────────────── */}
      <div className="rounded-3xl bg-white p-5 shadow-glow ring-1 ring-black/5">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brand">
            <Swords className="h-4 w-4" />
            Live Match
          </div>
          <div className="flex items-center gap-1.5">
            {isLive && (
              <span className="flex items-center gap-1 rounded-full bg-danger/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-danger">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-danger" />
                Live
              </span>
            )}
            <span className="flex items-center gap-1 rounded-full bg-secondary px-2 py-0.5 text-[10px] font-semibold text-muted-foreground">
              <Clock className="h-3 w-3" />
              {displayMinute}&apos;
            </span>
          </div>
        </div>

        {/* Score */}
        <div className="mt-4 flex items-center justify-between gap-4">
          <div className="flex flex-1 flex-col items-center gap-1">
            <span className="text-2xl">{match.homeTeam.logo}</span>
            <div className="text-center text-xs font-bold leading-tight text-foreground">
              {match.homeTeam.name}
            </div>
          </div>

          <div className="flex flex-col items-center">
            <div className="flex items-center gap-3 rounded-2xl bg-gradient-brand px-6 py-3 shadow-glow">
              <span className="text-3xl font-extrabold text-white tabular-nums">
                {match.homeTeam.score}
              </span>
              <span className="text-lg font-bold text-white/60">:</span>
              <span className="text-3xl font-extrabold text-white tabular-nums">
                {match.awayTeam.score}
              </span>
            </div>
            <div className="mt-1 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
              {match.status === "halftime"
                ? "Half Time"
                : match.status === "fulltime"
                  ? "Full Time"
                  : match.venue}
            </div>
          </div>

          <div className="flex flex-1 flex-col items-center gap-1">
            <span className="text-2xl">{match.awayTeam.logo}</span>
            <div className="text-center text-xs font-bold leading-tight text-foreground">
              {match.awayTeam.name}
            </div>
          </div>
        </div>

        {/* Event timeline */}
        {recentEvents.length > 0 && (
          <div className="mt-4 space-y-1.5 border-t border-border pt-3">
            <div className="mb-2 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
              Recent Events
            </div>
            {recentEvents.map((ev) => (
              <EventRow key={ev.id} event={ev} />
            ))}
          </div>
        )}

        {/* Status bar */}
        <div className="mt-3 flex items-center gap-1 text-[10px] text-muted-foreground">
          <Wifi className="h-3 w-3" />
          <span>Real-time · mock data active</span>
        </div>
      </div>

      {/* ── Groq AI Fan Assistant ──────────────────────────────────────── */}
      <AskGroqWidget venue={match.venue} lang={lang} />
    </div>
  );
}

/* ── Event Row ────────────────────────────────────────────────────────────── */
function EventRow({ event }: { event: MatchEvent }) {
  const emoji =
    event.type === "goal"         ? "⚽" :
    event.type === "card"         ? "🟨" :
    event.type === "substitution" ? "🔄" :
    event.type === "halftime"     ? "🔔" :
    event.type === "kickoff"      ? "🏁" : "⏱";
  const teamColor = event.team === "home" ? "text-brand" : "text-danger";
  return (
    <div className="flex items-center gap-2 rounded-xl px-2 py-1 hover:bg-secondary/50">
      <span className="w-6 text-center text-xs">{emoji}</span>
      <span className="w-8 text-[10px] font-bold text-muted-foreground tabular-nums">
        {event.minute}&apos;
      </span>
      <span className={`flex-1 text-xs font-semibold ${teamColor}`}>
        {event.player || (event.type.charAt(0).toUpperCase() + event.type.slice(1))}
      </span>
      <span className="text-[10px] capitalize text-muted-foreground">{event.team}</span>
    </div>
  );
}

/* ── Groq AI Ask Widget ───────────────────────────────────────────────────── */
function AskGroqWidget({ venue, lang = "English" }: { venue: string; lang?: string }) {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const askFn = useServerFn(askGroqAssistant);

  const QUICK = [
    "Where's the nearest toilet?",
    "When does the match end?",
    "How do I get to MetLife Stadium by train?",
    "Where is the shuttle bus pickup?",
  ];

  const ask = async (q: string) => {
    if (!q.trim() || busy) return;
    setBusy(true);
    setAnswer(null);
    try {
      const result = await askFn({
        data: {
          question: q.trim(),
          context: `Venue: ${venue}. Match is currently live. Transport info: Nearest train is Meadowlands Rail Station. Free shuttle buses available at Lot C.`,
          lang: lang,
        },
      });
      setAnswer(result.answer);
    } catch {
      setAnswer("Sorry, something went wrong. Please ask a staff member.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="rounded-3xl bg-white p-5 shadow-soft ring-1 ring-black/5">
      {/* Header */}
      <div className="flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-brand shadow-glow">
          <MessageCircle className="h-4 w-4 text-white" />
        </div>
        <div>
          <div className="text-xs font-bold uppercase tracking-wider text-brand">AI Assistant</div>
          <div className="text-[11px] text-muted-foreground">Powered by Groq · LLaMA 3.3 70B</div>
        </div>
      </div>

      {/* Quick questions */}
      <div className="mt-3 flex flex-wrap gap-1.5">
        {QUICK.map((q) => (
          <button
            key={q}
            onClick={() => { setQuestion(q); ask(q); }}
            disabled={busy}
            className="rounded-full border border-border bg-secondary/50 px-3 py-1 text-[11px] font-medium text-foreground/70 transition hover:border-brand/40 hover:text-brand disabled:opacity-50"
          >
            {q}
          </button>
        ))}
      </div>

      {/* Input */}
      <div className="mt-3 flex gap-2">
        <input
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && ask(question)}
          placeholder="Ask anything about the stadium…"
          className="flex-1 rounded-2xl border border-border bg-secondary/40 px-4 py-2.5 text-sm outline-none transition focus:border-brand/40 focus:ring-2 focus:ring-brand/20"
        />
        <button
          onClick={() => ask(question)}
          disabled={busy || !question.trim()}
          className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-brand shadow-glow transition hover:-translate-y-0.5 disabled:opacity-50"
        >
          {busy
            ? <Loader2 className="h-4 w-4 animate-spin text-white" />
            : <Send className="h-4 w-4 text-white" />}
        </button>
      </div>

      {/* Answer */}
      {answer && (
        <div className="mt-3 rounded-2xl bg-gradient-brand-soft p-4">
          <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-brand">
            <span className="h-1.5 w-1.5 rounded-full bg-brand" />
            AI Answer
          </div>
          <p className="mt-1.5 text-sm leading-relaxed text-foreground/80">{answer}</p>
        </div>
      )}
    </div>
  );
}
