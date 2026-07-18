# FanOps Unified — System Architecture

This document details the system design, component hierarchy, data flow pathways, and state management patterns of the FanOps Unified platform for the FIFA World Cup 2026.

---

## 🏗️ System Design Overview

FanOps Unified is built on **TanStack Start**, a full-stack React framework powered by **Vite** and **Nitro**. The application combines the speed of Server-Side Rendering (SSR) with client-side interactivity, connected to a local memory cache store and live mock databases (simulating high-throughput World Cup stadium operations).

```mermaid
graph TD
  Client[Fan PWA / Ops Dashboard] <--> |WebSocket Connection| WS[WebSocket Server: port 3001]
  Client <--> |RESTful JSON API Contracts| Server[TanStack Start Server Functions]
  Server <--> |In-Memory State Stores| Memory[opsStore / matchStore / userStore]
  Server <--> |Groq AI Triage Engine| Groq[Groq LLaMA 3.3 API]
  Server <--> |Realtime DB Sync| Firebase[Firebase Services]
```

---

## 📊 Core State Management (Client-Side Stores)

Client-side state is managed using **Zustand** stores designed for extreme latency tolerance and offline-first usage during live matches:

### 1. Operations Store (`opsStore.ts`)

- Manages real-time incident queues (reported, triaged, resolved).
- Manages stadium zones layout status (Gate A, B, C, D) and congestion alerts.
- **Hook selectors**: `useIncidents`, `useZones`, `useIncidentsByStatus`, `useCriticalZones`.

### 2. Match Scoreboard Store (`matchStore.ts`)

- Manages active matches, live scoreboard updates (goals, cards, timers), and team stats.
- **Hook selectors**: `useActiveMatch`, `useMatchStats`.

### 3. User Persona Store (`userStore.ts`)

- Manages the selected user profile (Fan, Ops, Volunteer) and authentication profiles.
- **Hook selectors**: `useUserProfile`, `useUserRole`.

---

## 🔄 Live Data Flow Diagrams

### 1. Incident Reporting and AI Triage Flow

```mermaid
sequenceDiagram
  autonumber
  actor User as Ops Command / Fan PWA
  participant Client as React Client (State Store)
  participant API as REST API (/api/stadium)
  participant AI as Groq LLaMA Triage Service
  participant WS as Socket.io Server

  User->>Client: Clicks "Report Incident" or "Triage"
  Client->>API: POST /api/stadium (Action: Triage)
  Note over API: Validates API request contract
  API->>AI: Send prompt (triage priority, response plan)
  AI-->>API: Returns JSON (Priority: High, Plan: ["Dispach Medical"])
  API-->>Client: Returns ApiResponse JSON Contract
  API->>WS: Broadcast incident update event
  WS-->>Client: Real-time update push to other dashboards
  Client->>User: Renders triaged state, actions list, and sounds alert
```

---

## 📡 RESTful API Route Contracts

All REST routes are under `src/routes/api/` and conform to the contract: `{ success: boolean, data: T | null, error: string | null }`.

### 1. System Health Endpoint (`/api/healthz`)

- **Method**: `GET`
- **Response**: Simple uptime and system checks.

### 2. System Performance Metrics (`/api/system`)

- **Method**: `GET`
- **Response**: Live server uptime, active memory usage, and socket client counts.

### 3. Stadium Action Dispatcher (`/api/stadium`)

- **Method**: `POST`
- **Actions**:
  - `triage`: Automatically triages an incident card using Groq AI LLaMA.
  - `route`: Evaluates evacuation or accessibility pathways during gate blockages.
  - `density`: Refreshes zone load ratios.

### 4. Groq Assistant Interface (`/api/assistant`)

- **Method**: `POST`
- **Response**: Answers stadium operations questions using specialized personas.
