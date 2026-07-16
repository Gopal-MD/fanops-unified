import { useEffect } from "react";
import { Swords, Clock, Wifi, Goal } from "lucide-react";
import { useMatchStore, useCurrentMatch, useMatchEvents, useIsLive, type MatchEvent } from "@/store/matchStore";
import { useWebSocket } from "@/hooks/useWebSocket";

/**
 * Live match scoreboard wired to useMatchStore + useWebSocket.
 * Subscribes to match:goal, match:card, match:substitution events.
 * Falls back gracefully to mock data when WebSocket is unavailable.
 */
export function MatchScoreboard() {
  const match = useCurrentMatch();
  const events = useMatchEvents();
  const isLive = useIsLive();
  const { addEvent } = useMatchStore();
  const { subscribe } = useWebSocket();

  useEffect(() => {
    // Subscribe to real-time match events
    const unsubGoal = subscribe("match:goal", (data) => addEvent(data as MatchEvent));
    const unsubCard = subscribe("match:card", (data) => addEvent(data as MatchEvent));
    const unsubSub = subscribe("match:substitution", (data) => addEvent(data as MatchEvent));

    return () => {
      unsubGoal();
      unsubCard();
      unsubSub();
    };
  }, [subscribe, addEvent]);

  if (!match) return null;

  const recentEvents = [...events].reverse().slice(0, 5);

  return (
    <div className="mt-5 rounded-3xl bg-white p-5 shadow-glow ring-1 ring-black/5">
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
          {match.minute && (
            <span className="flex items-center gap-1 rounded-full bg-secondary px-2 py-0.5 text-[10px] font-semibold text-muted-foreground">
              <Clock className="h-3 w-3" />
              {match.minute}&apos;
            </span>
          )}
        </div>
      </div>

      {/* Scoreboard */}
      <div className="mt-4 flex items-center justify-between gap-4">
        {/* Home team */}
        <div className="flex flex-1 flex-col items-center gap-1">
          <span className="text-2xl">{match.homeTeam.logo}</span>
          <div className="text-center text-xs font-bold leading-tight text-foreground">
            {match.homeTeam.name}
          </div>
        </div>

        {/* Score */}
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
            {match.status === "halftime" ? "Half Time" : match.status === "fulltime" ? "Full Time" : match.venue}
          </div>
        </div>

        {/* Away team */}
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

      {/* WebSocket status */}
      <div className="mt-3 flex items-center gap-1 text-[10px] text-muted-foreground">
        <Wifi className="h-3 w-3" />
        <span>Real-time via WebSocket · mock data active</span>
      </div>
    </div>
  );
}

function EventRow({ event }: { event: MatchEvent }) {
  const emoji =
    event.type === "goal" ? "⚽" :
    event.type === "card" ? "🟨" :
    event.type === "substitution" ? "🔄" :
    event.type === "halftime" ? "🔔" :
    event.type === "kickoff" ? "🏁" : "⏱";

  const teamColor = event.team === "home" ? "text-brand" : "text-danger";

  return (
    <div className="flex items-center gap-2 rounded-xl px-2 py-1 hover:bg-secondary/50">
      <span className="w-6 text-center text-xs">{emoji}</span>
      <span className="w-8 text-[10px] font-bold text-muted-foreground tabular-nums">
        {event.minute}&apos;
      </span>
      <span className={`flex-1 text-xs font-semibold ${teamColor}`}>
        {event.player || event.type.charAt(0).toUpperCase() + event.type.slice(1)}
      </span>
      <span className="text-[10px] text-muted-foreground capitalize">{event.team}</span>
    </div>
  );
}
