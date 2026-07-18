# FanOps Unified — REST API Reference Guide

All backend endpoints in FanOps Unified conform to the standardized JSON contract:

```json
{
  "success": boolean,
  "data": object | null,
  "error": string | null
}
```

---

## 📡 1. Endpoints Reference

### A. System Health Probe
Verify that the service is running.

* **Endpoint**: `/api/healthz`
* **Method**: `GET`
* **Response**:
```json
{
  "success": true,
  "data": {
    "status": "healthy",
    "timestamp": "2026-07-18T09:30:00Z"
  },
  "error": null
}
```

### B. System Metrics & Performance
Provides live performance information about memory usage, active connections, and socket counts.

* **Endpoint**: `/api/system`
* **Method**: `GET`
* **Response**:
```json
{
  "success": true,
  "data": {
    "uptimeSeconds": 14205,
    "memoryUsage": {
      "rss": "85.2 MB",
      "heapTotal": "48.1 MB",
      "heapUsed": "32.4 MB"
    },
    "activeSockets": 12
  },
  "error": null
}
```

### C. Stadium Command Dispatcher
Executes operations logic including incident triage, waypoint calculation, or density calculations.

* **Endpoint**: `/api/stadium`
* **Method**: `POST`
* **Payload Examples**:

#### 1. Action: `triage`
Triages reported incidents and produces a tactical action plan using LLaMA.
```json
{
  "action": "triage",
  "incident": {
    "title": "Gate A crush risk",
    "description": "Crowds accumulating at ticket turnstiles due to scanner failure.",
    "type": "crowd",
    "zoneId": "A",
    "locationDetails": "Outer gate turnstile segment 3"
  }
}
```
* **Response**:
```json
{
  "success": true,
  "data": {
    "priority": "critical",
    "actionPlan": [
      "Deploy crowd barriers immediately.",
      "Open manual inspection lanes 4 and 5."
    ]
  },
  "error": null
}
```

#### 2. Action: `route`
Calculates accessibility or sensory routing.
```json
{
  "action": "route",
  "fromZone": "A",
  "toZone": "C",
  "accessibilityMode": "wheelchair"
}
```

---

## 🚦 2. Error States Reference

If an API call fails due to invalid parameters, auth faults, or timeout, the server returns a matching status code and contract structure:

```json
{
  "success": false,
  "data": null,
  "error": "Centralized Error description detail"
}
```
