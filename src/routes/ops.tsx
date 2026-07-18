import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { type Incident, type Zone } from "@/lib/mock-data";
import { ModeToggle } from "@/components/mode-toggle";
import { useOpsStore } from "@/store/opsStore";
import { useWebSocket } from "@/hooks/useWebSocket";

// Import modular view components
import { MapView } from "@/components/Ops/MapView";
import { DensityView } from "@/components/Ops/DensityView";
import { IncidentsView } from "@/components/Ops/IncidentsView";
import { BroadcastView } from "@/components/Ops/BroadcastView";
import { VolunteerView } from "@/components/Ops/VolunteerView";
import { SustainabilityView } from "@/components/Ops/SustainabilityView";
import { SchedulingView } from "@/components/Ops/SchedulingView";
import { CoordinationView } from "@/components/Ops/CoordinationView";
import { Sidebar, type Tab } from "@/components/Ops/Sidebar";
import { Topbar } from "@/components/Ops/Topbar";

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
          {tab === "scheduling" && <SchedulingView />}
          {tab === "coordination" && <CoordinationView />}
        </main>
      </div>
      <ModeToggle />
    </div>
  );
}
