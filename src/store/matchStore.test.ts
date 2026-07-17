import { describe, it, expect, beforeEach } from 'vitest';
import { useMatchStore } from './matchStore';

describe('MatchStore', () => {
  beforeEach(() => {
    useMatchStore.getState().reset();
  });

  it('should initialize with default empty/null states after reset', () => {
    const state = useMatchStore.getState();
    expect(state.currentMatch).toBeNull();
    expect(state.events).toEqual([]);
    expect(state.isLive).toBe(false);
  });

  it('should correctly update the match', () => {
    const mockMatch = {
      id: "match-test-1",
      homeTeam: { name: "Test A", score: 0, logo: "A" },
      awayTeam: { name: "Test B", score: 0, logo: "B" },
      venue: "Test Stadium",
      kickoffTime: new Date().toISOString(),
      status: "live" as const,
    };
    
    useMatchStore.getState().updateMatch(mockMatch);
    expect(useMatchStore.getState().currentMatch).toEqual(mockMatch);
  });

  it('should add an event and increment the score automatically on a goal', () => {
    const mockMatch = {
      id: "match-test-2",
      homeTeam: { name: "Test A", score: 1, logo: "A" },
      awayTeam: { name: "Test B", score: 0, logo: "B" },
      venue: "Test Stadium",
      kickoffTime: new Date().toISOString(),
      status: "live" as const,
    };
    
    useMatchStore.getState().updateMatch(mockMatch);

    const goalEvent = {
      id: "ev-test",
      type: "goal" as const,
      team: "home" as const,
      player: "Striker 1",
      minute: 12,
      timestamp: Date.now()
    };

    useMatchStore.getState().addEvent(goalEvent);

    const state = useMatchStore.getState();
    expect(state.events).toHaveLength(1);
    expect(state.events[0]).toEqual(goalEvent);
    // Score should automatically increment for homeTeam
    expect(state.currentMatch?.homeTeam.score).toBe(2);
  });
});
