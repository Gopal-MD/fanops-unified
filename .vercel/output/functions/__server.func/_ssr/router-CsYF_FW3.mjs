import { o as __toESM } from "../_runtime.mjs";
import { i as require_react, n as QueryClientProvider, r as require_jsx_runtime, t as useMutation } from "../_libs/react+tanstack__react-query.mjs";
import { D as isRedirect, _ as useRouter, c as HeadContent, d as createRouter, f as Outlet, g as Link, h as createRootRouteWithContext, l as useRouterState, m as createFileRoute, p as lazyRouteComponent, s as Scripts } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as getServerFnById, r as createServerFn, t as TSS_SERVER_FUNCTION } from "./ssr.mjs";
import { n as findShortestPath, t as STADIUM_ZONES } from "./routing-CkGXTZRe.mjs";
import { t as z } from "../_libs/zod.mjs";
import { t as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { A as Footprints, B as Calendar, C as MessageSquare, D as Leaf, E as LoaderCircle, F as CircleCheck, G as Activity, H as ArrowUp, I as CircleCheckBig, K as Accessibility, L as ChevronsRight, M as Eye, N as Clock, O as Languages, P as ClipboardList, R as Check, S as Monitor, T as MapPin, U as ArrowUpFromLine, V as Bell, W as ArrowRight, _ as Ruler, a as UsersRound, b as Play, c as TriangleAlert, d as Sparkles, f as Smartphone, g as Search, h as Send, i as Users, j as Flag, k as House, l as TrendingUp, m as ShieldAlert, n as Wifi, o as UserCheck, p as Shield, r as Volume2, s as Truck, t as X, u as Swords, v as RotateCcw, w as Map$1, x as Navigation, y as Radio, z as ChartNoAxesColumn } from "../_libs/lucide-react.mjs";
import { n as create, t as subscribeWithSelector } from "../_libs/zustand.mjs";
import { t as lookup } from "../_libs/socket.io-client+[...].mjs";
import { a as CartesianGrid, i as Area, n as YAxis, o as ResponsiveContainer, r as XAxis, s as Tooltip, t as AreaChart } from "../_libs/recharts+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-CsYF_FW3.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var createSsrRpc = (functionId) => {
	const url = "/_serverFn/" + functionId;
	const serverFnMeta = { id: functionId };
	const fn = async (...args) => {
		return (await getServerFnById(functionId, { origin: "server" }))(...args);
	};
	return Object.assign(fn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
function useServerFn(serverFn) {
	const router = useRouter();
	return import_react.useCallback(async (...args) => {
		try {
			const res = await serverFn(...args);
			if (isRedirect(res)) throw res;
			return res;
		} catch (err) {
			if (isRedirect(err)) {
				err.options._fromLocation = router.stores.location.get();
				return router.navigate(router.resolveRedirect(err).options);
			}
			throw err;
		}
	}, [router, serverFn]);
}
/**
* Calculates a dynamic, accessible route through the stadium.
* Runs Dijkstra's algorithm deterministically before using Groq LLaMA for phrasing.
*/
var calculateRoute = createServerFn({ method: "POST" }).validator((data) => {
	return z.object({
		start: z.string().max(100),
		destination: z.string().max(100),
		wheelchair: z.boolean(),
		visualAssist: z.boolean(),
		lowSensory: z.boolean(),
		lang: z.string().max(50).optional()
	}).parse(data);
}).handler(createSsrRpc("c98c4b820457d24665b6a9a7bd7c0bde0d88867ed5af3aac228a136161958c45"));
/**
* Triages an incident report using AI, falling back to local deterministic rules.
* @param {string} data.report - The raw text of the incident.
*/
var triageIncident = createServerFn({ method: "POST" }).validator((data) => {
	return z.object({ report: z.string().max(2e3) }).parse(data);
}).handler(createSsrRpc("296b2ae78a6291faf32e443e7039b62560e8019d4b3ccb329f2d9429d36d5afd"));
/**
* Connects fans directly to Groq LLaMA 3.3 for live match questions.
* @param {string} data.question - The fan's question.
* @param {string} data.context - Hidden context (venue, live status).
* @param {string} [data.lang] - The preferred language of the fan.
*/
var askGroqAssistant = createServerFn({ method: "POST" }).validator((data) => {
	return z.object({
		question: z.string().max(500),
		context: z.string().max(1e3),
		lang: z.string().max(50).optional()
	}).parse(data);
}).handler(createSsrRpc("c6b4dd67b03e518a5fad3f58069fc9c62ff23f60df535dea7e97070e52c1958b"));
var styles_default = "/assets/styles-CmE1KxMI.css";
function reportLovableError(error, context = {}) {
	if (typeof window === "undefined") return;
	window.__lovableEvents?.captureException?.(error, {
		source: "react_error_boundary",
		route: window.location.pathname,
		...context
	}, {
		mechanism: "react_error_boundary",
		handled: false,
		severity: "error"
	});
}
function NotFoundComponent() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-7xl font-bold text-gradient-brand",
					children: "404"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-4 text-xl font-semibold",
					children: "Page not found"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "The page you're looking for doesn't exist."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "inline-flex items-center justify-center rounded-xl bg-gradient-brand px-5 py-2.5 text-sm font-semibold text-white shadow-glow transition hover:-translate-y-0.5",
						children: "Go home"
					})
				})
			]
		})
	});
}
function ErrorComponent({ error, reset }) {
	console.error(error);
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		reportLovableError(error, { boundary: "tanstack_root_error_component" });
	}, [error]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-xl font-semibold",
					children: "This page didn't load"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "Something went wrong. Try again or head home."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 flex flex-wrap justify-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => {
							router.invalidate();
							reset();
						},
						className: "inline-flex items-center justify-center rounded-xl bg-gradient-brand px-5 py-2.5 text-sm font-semibold text-white shadow-glow",
						children: "Try again"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "/",
						className: "inline-flex items-center justify-center rounded-xl border border-input bg-background px-5 py-2.5 text-sm font-medium",
						children: "Go home"
					})]
				})
			]
		})
	});
}
var Route$7 = createRootRouteWithContext()({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1, viewport-fit=cover"
			},
			{
				name: "theme-color",
				content: "#7C3AED"
			},
			{ title: "MatchDay Command — Stadium Operations & Fan Experience" },
			{
				name: "description",
				content: "Unified stadium ops dashboard and fan PWA for MatchDay operations: routing, crowd density, incident triage, and real-time broadcasts."
			},
			{
				property: "og:title",
				content: "MatchDay Command"
			},
			{
				property: "og:description",
				content: "Stadium Operations & Fan Experience Platform."
			},
			{
				property: "og:type",
				content: "website"
			},
			{
				name: "twitter:card",
				content: "summary_large_image"
			}
		],
		links: [
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Poppins:wght@600;700;800&display=swap"
			},
			{
				rel: "icon",
				href: "/favicon.ico",
				type: "image/x-icon"
			}
		]
	}),
	shellComponent: RootShell,
	component: RootComponent,
	notFoundComponent: NotFoundComponent,
	errorComponent: ErrorComponent
});
function RootShell({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "en",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})] })]
	});
}
function RootComponent() {
	const { queryClient } = Route$7.useRouteContext();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryClientProvider, {
		client: queryClient,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {})
	});
}
function ModeToggle() {
	const path = useRouterState({ select: (s) => s.location.pathname });
	const fan = path.startsWith("/fan");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "fixed bottom-5 left-1/2 z-50 -translate-x-1/2",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "glass flex items-center gap-1 rounded-full p-1 shadow-glow",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/fan",
				className: `flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold transition ${fan ? "bg-gradient-brand text-white shadow-glow" : "text-foreground/70 hover:text-foreground"}`,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Smartphone, { className: "h-3.5 w-3.5" }), "Fan Mode"]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/ops",
				className: `flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold transition ${!fan && path.startsWith("/ops") ? "bg-gradient-brand text-white shadow-glow" : "text-foreground/70 hover:text-foreground"}`,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Monitor, { className: "h-3.5 w-3.5" }), "Ops Mode"]
			})]
		})
	});
}
var ZONES = [
	{
		id: "gA",
		name: "Gate A",
		capacity: 5e3,
		occupancy: 42,
		level: "low",
		x: 15,
		y: 25
	},
	{
		id: "gB",
		name: "Gate B",
		capacity: 5e3,
		occupancy: 87,
		level: "high",
		x: 82,
		y: 22
	},
	{
		id: "gC",
		name: "Gate C",
		capacity: 5e3,
		occupancy: 64,
		level: "medium",
		x: 82,
		y: 78
	},
	{
		id: "gD",
		name: "Gate D",
		capacity: 5e3,
		occupancy: 31,
		level: "low",
		x: 15,
		y: 78
	},
	{
		id: "s101",
		name: "Section 101",
		capacity: 1200,
		occupancy: 74,
		level: "medium",
		x: 35,
		y: 45
	},
	{
		id: "s205",
		name: "Section 205",
		capacity: 1200,
		occupancy: 92,
		level: "high",
		x: 65,
		y: 45
	},
	{
		id: "food",
		name: "Food Court North",
		capacity: 800,
		occupancy: 58,
		level: "medium",
		x: 50,
		y: 15
	},
	{
		id: "conc",
		name: "Concourse East",
		capacity: 2e3,
		occupancy: 71,
		level: "medium",
		x: 70,
		y: 60
	}
];
var INITIAL_INCIDENTS = [
	{
		id: "inc-1",
		title: "Medical emergency at Gate C",
		description: "Fan collapsed near turnstile 3, appears unconscious. First aid en route.",
		location: "Gate C",
		reportedAt: (/* @__PURE__ */ new Date(Date.now() - 1e3 * 60 * 3)).toISOString(),
		status: "new"
	},
	{
		id: "inc-2",
		title: "Spilled drinks blocking aisle",
		description: "Section 205 row K aisle has slippery spill, cleanup requested.",
		location: "Section 205",
		reportedAt: (/* @__PURE__ */ new Date(Date.now() - 1e3 * 60 * 12)).toISOString(),
		status: "triaged",
		priority: "Low",
		actionPlan: "Dispatch janitorial to Section 205 row K. Place caution signage within 5 minutes."
	},
	{
		id: "inc-3",
		title: "Suspicious unattended bag",
		description: "Black backpack left near Concourse East pillar 7 for 20+ minutes.",
		location: "Concourse East",
		reportedAt: (/* @__PURE__ */ new Date(Date.now() - 1e3 * 60 * 8)).toISOString(),
		status: "in-progress",
		priority: "High",
		actionPlan: "Secure 15m perimeter. Alert K9 unit and security lead. Verify with adjacent cameras."
	},
	{
		id: "inc-4",
		title: "Lost child reported",
		description: "6yo child separated from family near Food Court North.",
		location: "Food Court North",
		reportedAt: (/* @__PURE__ */ new Date(Date.now() - 1e3 * 60 * 22)).toISOString(),
		status: "resolved",
		priority: "Medium",
		actionPlan: "Escort to guest services. Announce over PA (English + Spanish). Reunite with guardian."
	}
];
var DENSITY_HISTORY = Array.from({ length: 12 }).map((_, i) => ({
	time: `${String(14 + Math.floor(i / 2)).padStart(2, "0")}:${i % 2 === 0 ? "00" : "30"}`,
	gateA: 20 + Math.round(Math.sin(i / 2) * 15 + Math.random() * 10) + i * 2,
	gateB: 30 + Math.round(Math.cos(i / 3) * 20 + Math.random() * 12) + i * 4,
	gateC: 25 + Math.round(Math.sin(i / 4) * 12 + Math.random() * 8) + i * 3
}));
function densityColor(level) {
	return level === "high" ? {
		bg: "bg-danger",
		ring: "ring-danger",
		text: "text-danger",
		label: "Congested"
	} : level === "medium" ? {
		bg: "bg-warning",
		ring: "ring-warning",
		text: "text-warning",
		label: "Moderate"
	} : {
		bg: "bg-success",
		ring: "ring-success",
		text: "text-success",
		label: "Clear"
	};
}
var useOpsStore = create()((set) => ({
	incidents: INITIAL_INCIDENTS,
	zones: ZONES,
	addIncident: (incident) => set((state) => ({ incidents: [incident, ...state.incidents] })),
	updateIncident: (id, patch) => set((state) => ({ incidents: state.incidents.map((inc) => inc.id === id ? {
		...inc,
		...patch
	} : inc) })),
	deleteIncident: (id) => set((state) => ({ incidents: state.incidents.filter((inc) => inc.id !== id) })),
	updateZone: (id, patch) => set((state) => ({ zones: state.zones.map((z) => z.id === id ? {
		...z,
		...patch
	} : z) })),
	setZones: (zones) => set({ zones })
}));
function getSocketUrl() {
	return null;
}
/**
* Reusable WebSocket hook using Socket.io.
*
* Usage:
*   const { subscribe, emit, connected } = useWebSocket();
*
*   useEffect(() => {
*     const unsub = subscribe("match:goal", (data) => addEvent(data));
*     return unsub;
*   }, []);
*/
var useWebSocket = () => {
	const socketRef = (0, import_react.useRef)(null);
	const connectedRef = (0, import_react.useRef)(false);
	(0, import_react.useEffect)(() => {
		const SOCKET_URL = getSocketUrl();
		if (!SOCKET_URL) return;
		const token = typeof localStorage !== "undefined" ? localStorage.getItem("authToken") : null;
		socketRef.current = lookup(SOCKET_URL, {
			reconnection: true,
			reconnectionDelay: 1e3,
			reconnectionDelayMax: 5e3,
			reconnectionAttempts: 5,
			auth: token ? { token } : void 0
		});
		socketRef.current.on("connect", () => {
			connectedRef.current = true;
			console.log("[WS] Connected to", SOCKET_URL);
		});
		socketRef.current.on("disconnect", (reason) => {
			connectedRef.current = false;
			console.log("[WS] Disconnected:", reason);
		});
		socketRef.current.on("connect_error", (err) => {
			console.warn("[WS] Connection error:", err.message);
		});
		return () => {
			socketRef.current?.disconnect();
			socketRef.current = null;
			connectedRef.current = false;
		};
	}, []);
	return {
		subscribe: (0, import_react.useCallback)((event, callback) => {
			socketRef.current?.on(event, callback);
			return () => {
				socketRef.current?.off(event, callback);
			};
		}, []),
		emit: (0, import_react.useCallback)((event, data) => {
			if (socketRef.current?.connected) socketRef.current.emit(event, data);
			else console.warn("[WS] Cannot emit — not connected:", event);
		}, []),
		/** True when the socket is currently connected */
		get connected() {
			return connectedRef.current;
		}
	};
};
/**
* Standardized KPI display card for operational dashboards.
*
* @param {KpiCardProps} props - Component properties.
* @returns {React.ReactElement} The KPI card markup.
*/
function KpiCard({ icon, label, value, sub, tone = "brand" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-2xl bg-white p-5 shadow-soft ring-1 ring-border",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: `flex h-10 w-10 items-center justify-center rounded-xl ${tone === "brand" ? "bg-gradient-brand" : tone === "cyan" ? "bg-gradient-cyan" : tone === "success" ? "bg-success" : tone === "warning" ? "bg-warning" : "bg-danger"} text-white shadow-glow`,
					children: icon
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-[10px] font-semibold uppercase tracking-widest text-muted-foreground",
					children: label
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-4 text-3xl font-extrabold",
				children: value
			}),
			sub && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-1 text-xs text-muted-foreground",
				children: sub
			})
		]
	});
}
function Legend({ color, label }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		className: "inline-flex items-center gap-1.5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: `h-2.5 w-2.5 rounded-full ${color}` }), label]
	});
}
function StadiumMap({ zones }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative aspect-[16/10] overflow-hidden rounded-2xl bg-gradient-to-br from-[#EEF2FF] via-white to-[#ECFEFF] ring-1 ring-border",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "absolute left-1/2 top-1/2 h-[55%] w-[62%] -translate-x-1/2 -translate-y-1/2 rounded-[40%] bg-gradient-to-br from-[#10B981] to-[#059669] shadow-inner ring-4 ring-white/70",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute left-1/2 top-1/2 h-16 w-16 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white/70" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-white/60" })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-6 rounded-[40px] border-2 border-dashed border-brand/20" }),
			zones.map((z) => {
				const c = densityColor(z.level);
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "group absolute -translate-x-1/2 -translate-y-1/2",
					style: {
						left: `${z.x}%`,
						top: `${z.y}%`
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: `h-4 w-4 rounded-full ${c.bg} ring-4 ${c.ring}/30 animate-pulse` }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "glass absolute left-1/2 top-6 z-10 w-44 -translate-x-1/2 rounded-xl p-2.5 opacity-0 shadow-soft transition group-hover:opacity-100",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-xs font-bold",
							children: z.name
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: `text-[11px] font-semibold ${c.text}`,
							children: [
								z.occupancy,
								"% full · ",
								c.label
							]
						})]
					})]
				}, z.id);
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "absolute left-4 top-4 glass rounded-xl px-3 py-2 text-xs shadow-soft",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "font-bold",
					children: "Gate B"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "text-danger",
					children: "87% · Congested"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "absolute right-4 bottom-4 glass rounded-xl px-3 py-2 text-xs shadow-soft",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "font-bold",
					children: "Section 205"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "text-danger",
					children: "92% · Congested"
				})]
			})
		]
	});
}
/**
* MapView component representing stadium zones and density layout.
*/
function MapView() {
	const zones = useOpsStore((s) => s.zones);
	const stats = (0, import_react.useMemo)(() => {
		if (zones.length === 0) return {
			avg: 0,
			congested: 0,
			totalCap: 0,
			inside: 0
		};
		return {
			avg: Math.round(zones.reduce((s, z) => s + z.occupancy, 0) / zones.length),
			congested: zones.filter((z) => z.level === "high").length,
			totalCap: zones.reduce((s, z) => s + z.capacity, 0),
			inside: Math.round(zones.reduce((s, z) => s + z.capacity * z.occupancy / 100, 0))
		};
	}, [zones]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-2xl border border-brand/20 bg-gradient-brand-soft px-4 py-2.5 flex items-center justify-between text-xs text-brand font-bold",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "👥 Target Stakeholders: Security Teams, Medical Staff, Transportation Teams, Stadium Operations Managers" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "flex items-center gap-1.5 uppercase tracking-wider text-[10px]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, { className: "h-3.5 w-3.5" }), " Command Center Live"]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-4 md:grid-cols-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KpiCard, {
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, { className: "h-5 w-5" }),
						label: "Attendance",
						value: stats.inside.toLocaleString(),
						sub: `of ${stats.totalCap.toLocaleString()} capacity`,
						tone: "brand"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KpiCard, {
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrendingUp, { className: "h-5 w-5" }),
						label: "Avg density",
						value: `${stats.avg}%`,
						sub: "+4% last 10 min",
						tone: "cyan"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KpiCard, {
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldAlert, { className: "h-5 w-5" }),
						label: "Congested zones",
						value: String(stats.congested),
						sub: "Gate B, Section 205",
						tone: "warning"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KpiCard, {
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "h-5 w-5" }),
						label: "Response SLA",
						value: "98%",
						sub: "under 90s dispatch",
						tone: "success"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-3xl border border-brand/20 bg-white p-6 shadow-soft ring-1 ring-border",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
						className: "text-sm font-black text-brand flex items-center gap-2 uppercase tracking-wide",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-4.5 w-4.5" }), "AI Stadium Digital Twin Explanation Console"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-muted-foreground mt-0.5",
						children: "Real-time AI digital twin status tracking across MetLife Stadium zones, gates, parking, restrooms, VIP boxes, and wheelchair access routes."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-4 grid gap-4 sm:grid-cols-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-2xl bg-secondary/35 p-3.5 border border-border",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-[10px] font-black uppercase text-brand",
									children: "Accessible Wheelchair Routes"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 text-xs text-foreground/80 leading-relaxed",
									children: "Step-free lift conduits from Concourse East to Upper Section 205 are operational. Elevated ramp corridor at Gate A is clear."
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-2xl bg-secondary/35 p-3.5 border border-border",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-[10px] font-black uppercase text-brand",
									children: "Restroom & Food Stall Queues"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 text-xs text-foreground/80 leading-relaxed",
									children: "Food Court North congestion is high (84%). Restrooms at corridor East are experiencing normal load. Signage rerouting active."
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-2xl bg-secondary/35 p-3.5 border border-border",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-[10px] font-black uppercase text-brand",
									children: "VIP Areas & Shuttle Access"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 text-xs text-foreground/80 leading-relaxed",
									children: "VIP Gate B entrance flowing at normal capacity. Lot B parking occupies 94%; incoming shuttle lines successfully diverted to Lot C."
								})]
							})
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-6 lg:grid-cols-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "lg:col-span-2 relative overflow-hidden rounded-3xl bg-white p-6 shadow-soft ring-1 ring-border",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-4 flex items-center justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-xs font-semibold uppercase tracking-widest text-brand",
							children: "Stadium Map"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "text-lg font-bold",
							children: "Live zone density"
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-3 text-xs",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Legend, {
									color: "bg-success",
									label: "Clear"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Legend, {
									color: "bg-warning",
									label: "Moderate"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Legend, {
									color: "bg-danger",
									label: "Congested"
								})
							]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StadiumMap, { zones })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-3xl bg-white p-6 shadow-soft ring-1 ring-border",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-xs font-semibold uppercase tracking-widest text-brand",
							children: "Zone breakdown"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "text-lg font-bold",
							children: "Occupancy"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-4 space-y-3",
							children: zones.map((z) => {
								const c = densityColor(z.level);
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "rounded-2xl border border-border p-3",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center justify-between",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "text-sm font-bold",
												children: z.name
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: `rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white ${c.bg}`,
												children: c.label
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "mt-2 h-2 overflow-hidden rounded-full bg-secondary",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: `h-full ${c.bg}`,
												style: { width: `${z.occupancy}%` }
											})
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "mt-1 flex justify-between text-[11px] text-muted-foreground",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [z.occupancy, "% full"] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [z.capacity.toLocaleString(), " cap"] })]
										})
									]
								}, z.id);
							})
						})
					]
				})]
			})
		]
	});
}
/**
* DensityView component showing crowd occupancy trends, stats,
* and the Organizer AI Predictive Congestion Forecast dashboard.
* Targets: Match Organizers, Stadium Operations Managers
*/
function DensityView() {
	const zones = useOpsStore((s) => s.zones);
	const [timeframe, setTimeframe] = (0, import_react.useState)(30);
	const [predictiveMetrics, setPredictiveMetrics] = (0, import_react.useState)([
		{
			metric: "Gate 3 Entry Queue",
			current: 45,
			predictions: {
				15: 62,
				30: 82,
				60: 95
			},
			status: "critical",
			recommendation: "Redirect arriving traffic via Gate B and open secondary entry channels.",
			urgency: "high",
			confidence: 91,
			why: "Real-time computer vision feeds detect an influx of 1,200 fans arriving from the west light rail station.",
			expectedOutcome: "Distributes incoming traffic load more evenly across entryways.",
			estimatedImprovement: "↓ 42% queue wait time",
			timeSensitivity: "Immediate action required within 8 minutes",
			affectedStakeholders: [
				"Fans",
				"Security Teams",
				"Volunteers"
			]
		},
		{
			metric: "Section A Restrooms",
			current: 55,
			predictions: {
				15: 68,
				30: 78,
				60: 85
			},
			status: "warning",
			recommendation: "Activate auxiliary stalls at Corridor East and update digital signage directions.",
			urgency: "medium",
			confidence: 84,
			why: "Section A seating is at 92% occupancy; restroom load historically peaks 15 minutes before halftime.",
			expectedOutcome: "Alleviates congestion hotspot at main restrooms.",
			estimatedImprovement: "↓ 25% stall queue time",
			timeSensitivity: "Recommended deploy within 15 minutes",
			affectedStakeholders: ["Fans", "Venue Staff"]
		},
		{
			metric: "Parking Lot B Occupancy",
			current: 72,
			predictions: {
				15: 84,
				30: 94,
				60: 100
			},
			status: "critical",
			recommendation: "Redirect incoming shuttle lines to auxiliary Lot C to avoid transit lock.",
			urgency: "high",
			confidence: 94,
			why: "Lot B is nearing physical capacity. Diverting vehicles early stops local gridlocks from blocking adjacent roads.",
			expectedOutcome: "Maintains smooth vehicle entry speeds without backing up main highway.",
			estimatedImprovement: "↓ 15 mins parking search time",
			timeSensitivity: "Critical deploy within 5 minutes",
			affectedStakeholders: ["Transportation Teams", "Fans"]
		},
		{
			metric: "Section C Concessions Delay",
			current: 40,
			predictions: {
				15: 52,
				30: 65,
				60: 78
			},
			status: "warning",
			recommendation: "Alert dispatch crew to restock soda/snacks prior to half-time surge.",
			urgency: "medium",
			confidence: 88,
			why: "High volume of beverage orders predicted due to warm stadium microclimate temperature readings.",
			expectedOutcome: "Avoids stock depletion and shortens order processing delays.",
			estimatedImprovement: "↓ 30% order transaction latency",
			timeSensitivity: "Deploy within 20 minutes",
			affectedStakeholders: ["Venue Staff", "Fans"]
		}
	]);
	const handleImplement = (index) => {
		const updated = [...predictiveMetrics];
		updated[index] = {
			...updated[index],
			implemented: true
		};
		setPredictiveMetrics(updated);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-2xl border border-brand/20 bg-gradient-brand-soft px-4 py-2.5 flex items-center justify-between text-xs text-brand font-bold",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "👥 Target Stakeholders: Match Organizers, Stadium Operations Managers" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "flex items-center gap-1.5 uppercase tracking-wider text-[10px]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "h-3.5 w-3.5" }), " AI Predictive engine live"]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-3xl bg-white p-6 shadow-soft ring-1 ring-border",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col sm:flex-row sm:items-center justify-between gap-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-5 w-5 text-brand" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "text-lg font-bold",
								children: "Organizer AI Dashboard (Predictive Operations)"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-xs text-muted-foreground",
							children: "Computer vision feeds and historical stadium models predict crowding bottlenecks up to 60 minutes in advance."
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex items-center gap-1.5 rounded-xl bg-secondary/40 p-1",
							children: [
								15,
								30,
								60
							].map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								onClick: () => setTimeframe(t),
								className: `rounded-lg px-3 py-1 text-xs font-bold transition ${timeframe === t ? "bg-brand text-white shadow" : "text-foreground/70 hover:bg-secondary/80"}`,
								children: [t, " Mins"]
							}, t))
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-6 rounded-2xl bg-gradient-brand-soft p-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldAlert, { className: "h-5 w-5 text-brand shrink-0 mt-0.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "text-xs font-bold uppercase tracking-wider text-brand",
									children: [
										"Top Priority Action Recommended (",
										timeframe,
										" min forecast)"
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mt-1 text-sm font-bold text-foreground",
									children: timeframe === 15 ? "Open Secondary Entry Channels at Gate C immediately" : timeframe === 30 ? "Redirect Shuttle Bus Routes to Lot C immediately" : "Activate Auxiliary Restroom Stalls at corridor East"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-0.5 text-xs text-foreground/80",
									children: timeframe === 15 ? "Diverts incoming congestion surge from Gate A, keeping entry speed high." : timeframe === 30 ? "Improves transit wait times by 12 minutes and avoids traffic gridlock in the next 15 minutes." : "Pre-empts extreme queues predicted during the halftime stadium exit rush."
								})
							] })]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => handleImplement(2),
							className: "shrink-0 rounded-xl bg-brand px-4 py-2 text-xs font-bold text-white shadow-glow hover:-translate-y-0.5 transition",
							children: "Apply Mitigation Route"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-4",
						children: predictiveMetrics.map((m, idx) => {
							const predVal = m.predictions[timeframe];
							const isCritical = predVal >= 80;
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: `rounded-2xl border bg-white p-5 shadow-soft flex flex-col justify-between transition hover:shadow-glow ${m.implemented ? "border-success bg-success-soft/30" : "border-border"}`,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center justify-between border-b border-secondary pb-2.5",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-xs font-black text-foreground",
											children: m.metric
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: `rounded-full px-2 py-0.5 text-[9px] font-black uppercase ${isCritical ? "bg-danger text-white" : "bg-warning text-white"}`,
											children: isCritical ? "critical" : "warning"
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mt-4 flex items-baseline gap-2",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "text-2xl font-extrabold",
												children: [m.current, "%"]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-xs text-muted-foreground",
												children: "→"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "text-xl font-bold text-brand",
												children: [predVal, "%"]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "text-[10px] text-muted-foreground",
												children: [
													"(in ",
													timeframe,
													" min)"
												]
											})
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mt-1.5 flex items-center gap-1 text-[10px] text-muted-foreground",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrendingUp, { className: "h-3 w-3 text-brand" }),
											" +",
											predVal - m.current,
											"% surge predicted"
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mt-4 rounded-xl bg-secondary/20 p-3",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "text-[9px] font-black uppercase tracking-wider text-muted-foreground",
											children: "Mitigation Action"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "mt-1 text-xs font-bold text-foreground leading-snug",
											children: m.recommendation
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mt-4 space-y-2 text-[10px] text-foreground/80 leading-relaxed border-t border-dashed border-secondary pt-3",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "font-bold text-brand uppercase tracking-wider text-[8px] block",
													children: "Reasoning"
												}),
												"\"",
												m.why,
												"\""
											] }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-center justify-between",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-muted-foreground",
													children: "Confidence:"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
													className: "font-bold text-brand",
													children: [m.confidence, "%"]
												})]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-center justify-between",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-muted-foreground",
													children: "Improvement:"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "font-extrabold text-success",
													children: m.estimatedImprovement
												})]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-center justify-between",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-muted-foreground",
													children: "Outcome:"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "font-semibold",
													children: m.expectedOutcome
												})]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-center justify-between",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-muted-foreground",
													children: "Time Limit:"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "font-bold text-danger",
													children: m.timeSensitivity
												})]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "font-bold text-muted-foreground uppercase text-[8px] block",
												children: "Impacted Roles"
											}), m.affectedStakeholders.join(", ")] })
										]
									})
								] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => handleImplement(idx),
									disabled: m.implemented,
									className: "mt-5 flex w-full items-center justify-center gap-1.5 rounded-xl bg-gradient-brand px-3 py-2 text-xs font-bold text-white shadow-glow hover:brightness-105 disabled:opacity-60 transition",
									children: m.implemented ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-4 w-4 text-white" }), " Implemented"] }) : "Apply AI Guidance"
								})]
							}, idx);
						})
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-3xl bg-white p-6 shadow-soft ring-1 ring-border",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-xs font-semibold uppercase tracking-widest text-brand",
						children: "Trend"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "text-lg font-bold",
						children: "Density over time"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-4 h-72",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AreaChart, {
							data: DENSITY_HISTORY,
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("defs", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("linearGradient", {
										id: "ga",
										x1: "0",
										y1: "0",
										x2: "0",
										y2: "1",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
											offset: "0%",
											stopColor: "#7C3AED",
											stopOpacity: .35
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
											offset: "100%",
											stopColor: "#7C3AED",
											stopOpacity: 0
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("linearGradient", {
										id: "gb",
										x1: "0",
										y1: "0",
										x2: "0",
										y2: "1",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
											offset: "0%",
											stopColor: "#EF4444",
											stopOpacity: .35
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
											offset: "100%",
											stopColor: "#EF4444",
											stopOpacity: 0
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("linearGradient", {
										id: "gc",
										x1: "0",
										y1: "0",
										x2: "0",
										y2: "1",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
											offset: "0%",
											stopColor: "#06B6D4",
											stopOpacity: .35
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
											offset: "100%",
											stopColor: "#06B6D4",
											stopOpacity: 0
										})]
									})
								] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
									strokeDasharray: "3 3",
									stroke: "#E2E8F0"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
									dataKey: "time",
									tick: { fontSize: 12 },
									stroke: "#94A3B8"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
									tick: { fontSize: 12 },
									stroke: "#94A3B8"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, { contentStyle: {
									borderRadius: 12,
									border: "1px solid #e2e8f0",
									boxShadow: "0 10px 40px -20px rgba(0,0,0,.2)"
								} }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Area, {
									type: "monotone",
									dataKey: "gateA",
									stroke: "#7C3AED",
									strokeWidth: 2.5,
									fill: "url(#ga)",
									name: "Gate A"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Area, {
									type: "monotone",
									dataKey: "gateB",
									stroke: "#EF4444",
									strokeWidth: 2.5,
									fill: "url(#gb)",
									name: "Gate B"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Area, {
									type: "monotone",
									dataKey: "gateC",
									stroke: "#06B6D4",
									strokeWidth: 2.5,
									fill: "url(#gc)",
									name: "Gate C"
								})
							]
						}) })
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-4 md:grid-cols-2 lg:grid-cols-4",
				children: zones.map((z) => {
					const c = densityColor(z.level);
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-2xl bg-white p-5 shadow-soft ring-1 ring-border",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-sm font-bold",
									children: z.name
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: `rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white ${c.bg}`,
									children: c.label
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-4 text-3xl font-extrabold",
								children: [z.occupancy, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-base font-bold text-muted-foreground",
									children: "%"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-2 h-2 overflow-hidden rounded-full bg-secondary",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: `h-full ${c.bg}`,
									style: { width: `${z.occupancy}%` }
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-2 text-xs text-muted-foreground",
								children: ["Cap ", z.capacity.toLocaleString()]
							})
						]
					}, z.id);
				})
			})
		]
	});
}
function IncidentCard({ inc, busy, onTriage, onMove }) {
	const priColor = inc.priority === "High" ? "bg-danger" : inc.priority === "Medium" ? "bg-warning" : inc.priority === "Low" ? "bg-success" : "bg-muted-foreground";
	const nxt = {
		new: "triaged",
		triaged: "in-progress",
		"in-progress": "resolved",
		resolved: null
	}[inc.status];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "group rounded-2xl bg-white p-4 shadow-soft ring-1 ring-border transition hover:-translate-y-0.5 hover:shadow-glow",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-start justify-between gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-w-0 flex-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-sm font-bold leading-snug",
						children: inc.title
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-0.5 text-[11px] text-muted-foreground",
						children: [
							"📍 ",
							inc.location,
							" ·",
							" ",
							new Date(inc.reportedAt).toLocaleTimeString([], {
								hour: "2-digit",
								minute: "2-digit"
							})
						]
					})]
				}), inc.priority && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: `rounded-full px-2 py-0.5 text-[10px] font-bold uppercase text-white ${priColor}`,
					children: inc.priority
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-xs text-foreground/70",
				children: inc.description
			}),
			inc.actionPlan && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-3 rounded-xl bg-gradient-brand-soft p-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-brand",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-3 w-3" }), " AI Action Plan"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-xs text-foreground/80",
					children: inc.actionPlan
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-3 flex gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					onClick: onTriage,
					disabled: busy,
					className: "flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-gradient-brand px-3 py-2 text-xs font-bold text-white shadow-glow transition hover:-translate-y-0.5 disabled:opacity-60",
					children: [busy ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-3.5 w-3.5 animate-spin" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-3.5 w-3.5" }), "AI Triage"]
				}), nxt && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					onClick: () => onMove(nxt),
					className: "rounded-xl border border-border bg-white px-3 py-2 text-xs font-bold text-foreground/70 hover:text-foreground",
					children: ["→ ", nxt.replace("-", " ")]
				})]
			})
		]
	});
}
/**
* IncidentsView component showing the operational Kanban board with AI incident triage
* and the advanced AI Incident Commander emergency dispatch engine.
*/
function IncidentsView() {
	const { incidents: items, updateIncident: storeUpdate, addIncident } = useOpsStore();
	const triage = useServerFn(triageIncident);
	const askFn = useServerFn(askGroqAssistant);
	const [busyId, setBusy] = (0, import_react.useState)(null);
	const [simulationPrompt, setSimulationPrompt] = (0, import_react.useState)("");
	const [simulating, setSimulating] = (0, import_react.useState)(false);
	const [commanderPlan, setCommanderPlan] = (0, import_react.useState)(null);
	const [commanderReasoning, setCommanderReasoning] = (0, import_react.useState)("");
	const [commanderRisk, setCommanderRisk] = (0, import_react.useState)("");
	const columns = [
		{
			id: "new",
			label: "New",
			tone: "text-danger"
		},
		{
			id: "triaged",
			label: "Triaged",
			tone: "text-warning"
		},
		{
			id: "in-progress",
			label: "In Progress",
			tone: "text-brand"
		},
		{
			id: "resolved",
			label: "Resolved",
			tone: "text-success"
		}
	];
	const move = (id, status) => {
		const target = items.find((x) => x.id === id);
		if (target) storeUpdate(id, {
			...target,
			status
		});
	};
	const runTriage = async (inc) => {
		setBusy(inc.id);
		try {
			const result = await triage({ data: { report: `${inc.title}. ${inc.description}` } });
			storeUpdate(inc.id, {
				...inc,
				priority: result.priority,
				actionPlan: result.actionPlan,
				status: inc.status === "new" ? "triaged" : inc.status
			});
		} catch (e) {
			console.error(e);
			alert("AI triage failed: " + e.message);
		} finally {
			setBusy(null);
		}
	};
	const handleSimulate = async (type) => {
		setSimulating(true);
		let description = "";
		if (type === "congestion") description = "Gate 5 has become severely overcrowded. ETA to critical bottleneck is 8 minutes.";
		else if (type === "medical") description = "Heat exhaustion reported in upper bowl section 205. Medical team dispatch needed.";
		else description = simulationPrompt || "General security congestion alarm triggered.";
		try {
			const result = await askFn({ data: {
				question: `Act as a Stadium AI Incident Commander. Provide a structured emergency plan for: "${description}". You MUST respond with a JSON array inside <PLAN> tags matching:
<PLAN>
[
  {"action": "Move 20 volunteers from Gate 2 to Gate 5", "urgency": "immediate", "resource": "Volunteers", "eta": "3 min", "estimatedImpact": "Relieves crowd pressure by 40%", "confidence": 91, "priority": "HIGH", "why": "Immediate local redirection keeps queue bottlenecks low."},
  {"action": "Redirect arriving fans through Entrance C", "urgency": "immediate", "resource": "PA System", "eta": "1 min", "estimatedImpact": "Redirects ~500 fans/hour", "confidence": 88, "priority": "HIGH", "why": "Bypasses current gate overload before blockup."},
  {"action": "Increase shuttle frequency by 25%", "urgency": "urgent", "resource": "Shuttles", "eta": "10 min", "estimatedImpact": "Eases exit logistics", "confidence": 95, "priority": "MEDIUM", "why": "Long-term congestion buffer."}
]
</PLAN>
Also output a 2-sentence reasoning explanation under a <REASONING> tag, and a risk level under <RISK> (e.g. HIGH, MEDIUM, LOW).`,
				context: description
			} });
			const planMatch = result.answer.match(/<PLAN>([\s\S]*?)<\/PLAN>/);
			const reasoningMatch = result.answer.match(/<REASONING>([\s\S]*?)<\/REASONING>/);
			const riskMatch = result.answer.match(/<RISK>([\s\S]*?)<\/RISK>/);
			if (planMatch) setCommanderPlan(JSON.parse(planMatch[1].trim()));
			else setCommanderPlan([
				{
					action: "Move 20 volunteers from Gate 2 to Gate 5",
					urgency: "immediate",
					resource: "Volunteers",
					eta: "3 min",
					estimatedImpact: "Eases queue wait times by 42%",
					confidence: 91,
					priority: "HIGH",
					why: "Redistributing staff to the overload point provides local assistance."
				},
				{
					action: "Redirect incoming transit lines to Lot C",
					urgency: "immediate",
					resource: "Transport team",
					eta: "5 min",
					estimatedImpact: "Reduces bottleneck gridlocks by 35%",
					confidence: 88,
					priority: "HIGH",
					why: "Diverting inbound parking traffic prevents complete ingress lockup."
				},
				{
					action: "Alert nearby medical squads",
					urgency: "urgent",
					resource: "Medical team",
					eta: "2 min",
					estimatedImpact: "Mitigates medical escalation rates",
					confidence: 95,
					priority: "HIGH",
					why: "Early stand-by keeps response timers within safely acceptable SLAs."
				}
			]);
			setCommanderReasoning(reasoningMatch ? reasoningMatch[1].trim() : "Plan selected to balance queue times and safety.");
			setCommanderRisk(riskMatch ? riskMatch[1].trim() : "HIGH");
			addIncident({
				id: "sim-" + Date.now(),
				title: type === "congestion" ? "Gate 5 Overcrowding Alert" : "Simulated Ops Emergency",
				description,
				status: "new",
				location: "Gate 5",
				reportedAt: (/* @__PURE__ */ new Date()).toISOString()
			});
		} catch (e) {
			console.error(e);
		} finally {
			setSimulating(false);
		}
	};
	const approveAction = (index) => {
		if (!commanderPlan) return;
		const updated = [...commanderPlan];
		updated[index] = {
			...updated[index],
			approved: true
		};
		setCommanderPlan(updated);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-2xl border border-brand/20 bg-gradient-brand-soft px-4 py-2.5 flex items-center justify-between text-xs text-brand font-bold",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "👥 Target Stakeholders: Security Teams, Medical Staff, Stadium Operations Managers" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "flex items-center gap-1.5 uppercase tracking-wider text-[10px]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shield, { className: "h-3.5 w-3.5 animate-pulse" }), " Incident Command Live"]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-3xl bg-gradient-brand-soft p-6 shadow-soft ring-1 ring-border",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shield, { className: "h-5 w-5 text-brand" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "text-lg font-bold text-brand",
							children: "AI Incident Commander (Emergency Dispatch)"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-xs text-muted-foreground",
						children: "Simulate incidents or enter live operational alerts to generate real-time AI decision trees."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-4 flex flex-wrap gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => handleSimulate("congestion"),
							disabled: simulating,
							className: "rounded-xl bg-white px-3 py-2 text-xs font-bold text-brand ring-1 ring-border transition hover:bg-brand hover:text-white",
							children: "🚨 Simulate Gate 5 Congestion"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => handleSimulate("medical"),
							disabled: simulating,
							className: "rounded-xl bg-white px-3 py-2 text-xs font-bold text-brand ring-1 ring-border transition hover:bg-brand hover:text-white",
							children: "🩺 Simulate Section 205 Medical Alert"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-4 flex gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							placeholder: "Type custom operational event (e.g. Broken elevator at Gate C)...",
							value: simulationPrompt,
							onChange: (e) => setSimulationPrompt(e.target.value),
							className: "flex-1 rounded-xl border border-border bg-white px-4 py-2 text-sm outline-none"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: () => handleSimulate("custom"),
							disabled: simulating || !simulationPrompt,
							className: "flex items-center gap-1.5 rounded-xl bg-gradient-brand px-4 py-2 text-sm font-bold text-white shadow-glow disabled:opacity-50",
							children: [simulating ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-4 w-4 animate-spin" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Send, { className: "h-4 w-4" }), "Analyze"]
						})]
					}),
					commanderPlan && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-6 border-t border-border pt-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex items-center justify-between",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h4", {
									className: "text-sm font-bold text-foreground",
									children: [
										"AI Dispatch Strategy Plan (Risk Assessment:",
										" ",
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-danger font-extrabold",
											children: commanderRisk
										}),
										")"
									]
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-3 grid gap-4 md:grid-cols-3",
								children: commanderPlan.map((action, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: `rounded-2xl bg-white p-5 shadow-soft ring-1 ring-border flex flex-col justify-between transition hover:shadow-glow ${action.approved ? "ring-2 ring-success bg-success-soft" : ""}`,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center justify-between border-b border-secondary pb-2.5",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: `rounded-full px-2 py-0.5 text-[9px] font-black uppercase text-white ${action.priority === "HIGH" ? "bg-danger" : "bg-warning"}`,
												children: [action.priority, " PRIORITY"]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "text-[10px] font-bold text-brand",
												children: [action.confidence, "% Confidence"]
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "mt-3",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "text-[10px] font-extrabold uppercase tracking-wider text-muted-foreground",
												children: "Recommendation"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "mt-1 text-xs font-bold text-foreground leading-snug",
												children: action.action
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "mt-3 flex items-center justify-between rounded-xl bg-secondary/30 px-3 py-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-[10px] font-semibold text-muted-foreground",
												children: "Improvement"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-xs font-extrabold text-brand",
												children: action.estimatedImpact
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "mt-3.5",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "text-[10px] font-extrabold uppercase tracking-wider text-muted-foreground",
												children: "Reasoning"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
												className: "mt-1 text-[11px] text-foreground/80 leading-relaxed italic",
												children: [
													"\"",
													action.why,
													"\""
												]
											})]
										})
									] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mt-5 pt-3 border-t border-secondary",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center justify-between text-[10px] text-muted-foreground mb-3",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["Resource: ", action.resource] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["ETA: ", action.eta] })]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											onClick: () => approveAction(idx),
											disabled: action.approved,
											className: "flex w-full items-center justify-center gap-1.5 rounded-xl bg-gradient-brand px-3 py-2 text-xs font-bold text-white shadow-glow hover:brightness-105 disabled:opacity-60 transition",
											children: action.approved ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheckBig, { className: "h-3.5 w-3.5 text-white" }), " Deployed"] }) : "Approve & Deploy"
										})]
									})]
								}, idx))
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-4 rounded-2xl bg-white p-4 ring-1 ring-border",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-xs font-bold uppercase tracking-wider text-brand",
									children: "AI Reasoning"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 text-xs text-foreground/80 leading-relaxed",
									children: commanderReasoning
								})]
							})
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-4 md:grid-cols-2 xl:grid-cols-4",
				children: columns.map((col) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-3xl bg-white/60 p-4 ring-1 ring-border",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-3 flex items-center justify-between px-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: `text-xs font-bold uppercase tracking-widest ${col.tone}`,
							children: col.label
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "rounded-full bg-white px-2 py-0.5 text-[10px] font-bold text-muted-foreground ring-1 ring-border",
							children: items.filter((i) => i.status === col.id).length
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-3",
						children: [items.filter((i) => i.status === col.id).map((inc) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IncidentCard, {
							inc,
							busy: busyId === inc.id,
							onTriage: () => runTriage(inc),
							onMove: (s) => move(inc.id, s)
						}, inc.id)), items.filter((i) => i.status === col.id).length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "rounded-2xl border border-dashed border-border p-4 text-center text-xs text-muted-foreground",
							children: "No incidents"
						})]
					})]
				}, col.id))
			})
		]
	});
}
var KEY = "matchday.broadcasts";
var CHANNEL = "matchday-broadcasts";
function read() {
	if (typeof window === "undefined") return [];
	try {
		return JSON.parse(localStorage.getItem(KEY) || "[]");
	} catch {
		return [];
	}
}
function write(list) {
	localStorage.setItem(KEY, JSON.stringify(list.slice(0, 20)));
}
function pushBroadcast(b) {
	const full = {
		...b,
		id: `bc-${Date.now()}`,
		createdAt: Date.now()
	};
	write([full, ...read()]);
	try {
		new BroadcastChannel(CHANNEL).postMessage(full);
	} catch {}
	window.dispatchEvent(new StorageEvent("storage", { key: KEY }));
	return full;
}
function useBroadcasts() {
	const [list, setList] = (0, import_react.useState)([]);
	(0, import_react.useEffect)(() => {
		setList(read());
		const onStorage = (e) => {
			if (e.key === KEY || e.key === null) setList(read());
		};
		window.addEventListener("storage", onStorage);
		let bc = null;
		try {
			bc = new BroadcastChannel(CHANNEL);
			bc.onmessage = () => setList(read());
		} catch {}
		return () => {
			window.removeEventListener("storage", onStorage);
			bc?.close();
		};
	}, []);
	return list;
}
function useLatestBroadcast() {
	return useBroadcasts()[0] ?? null;
}
/**
* BroadcastView component enabling operators to dispatch announcements to all fans in real-time.
*/
function BroadcastView() {
	const [msg, setMsg] = (0, import_react.useState)("Gate B is closed due to congestion. Please reroute to Gate C.");
	const [severity, setSev] = (0, import_react.useState)("warning");
	const [lang, setLang] = (0, import_react.useState)("English");
	const list = useBroadcasts();
	const send = () => {
		if (!msg.trim()) return;
		pushBroadcast({
			message: msg.trim(),
			severity,
			language: lang
		});
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid gap-6 lg:grid-cols-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "lg:col-span-2 rounded-3xl bg-white p-6 shadow-soft ring-1 ring-border",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "text-xs font-semibold uppercase tracking-widest text-brand",
					children: "Broadcast Center"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "text-lg font-bold",
					children: "Push an alert to every Fan PWA"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						htmlFor: "broadcast-message",
						className: "mb-2 block text-xs font-semibold text-muted-foreground",
						children: "Message"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
						id: "broadcast-message",
						value: msg,
						onChange: (e) => setMsg(e.target.value),
						rows: 4,
						className: "w-full rounded-2xl border border-border bg-secondary/50 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-brand/40"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-4 grid gap-3 md:grid-cols-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						id: "severity-label",
						className: "mb-2 block text-xs font-semibold text-muted-foreground",
						children: "Severity"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex gap-2",
						role: "group",
						"aria-labelledby": "severity-label",
						children: [
							"info",
							"warning",
							"critical"
						].map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => setSev(s),
							className: `flex-1 rounded-xl px-3 py-2 text-xs font-bold uppercase transition ${severity === s ? s === "critical" ? "bg-danger text-white shadow-glow" : s === "warning" ? "bg-warning text-white shadow-glow" : "bg-gradient-brand text-white shadow-glow" : "border border-border bg-white text-foreground/70"}`,
							children: s
						}, s))
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						htmlFor: "broadcast-language",
						className: "mb-2 block text-xs font-semibold text-muted-foreground",
						children: "Language"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
						id: "broadcast-language",
						value: lang,
						onChange: (e) => setLang(e.target.value),
						className: "w-full rounded-xl border border-border bg-white px-3 py-2 text-sm font-semibold outline-none",
						children: [
							"English",
							"Español",
							"Français",
							"العربية",
							"Português"
						].map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: l }, l))
					})] })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mb-2 text-xs font-semibold text-muted-foreground",
						children: "Quick templates"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex flex-wrap gap-2",
						children: [
							"Gate B is closed. Please use Gate C.",
							"Medical incident cleared at Section 205.",
							"Weather advisory: light rain expected in 15 minutes.",
							"Match starts in 10 minutes — please take your seats."
						].map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => setMsg(p),
							className: "rounded-full border border-border bg-white px-3 py-1.5 text-xs font-medium text-foreground/70 hover:border-brand/40 hover:text-brand",
							children: p
						}, p))
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					onClick: send,
					className: "mt-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-brand px-5 py-3.5 text-sm font-bold text-white shadow-glow transition hover:-translate-y-0.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Send, { className: "h-4 w-4" }), " Send Broadcast"]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 text-center text-[11px] text-muted-foreground",
					children: "Delivered instantly to the Fan PWA on this device and any other open tab."
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "rounded-3xl bg-white p-6 shadow-soft ring-1 ring-border",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "text-xs font-semibold uppercase tracking-widest text-brand",
					children: "History"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "text-lg font-bold",
					children: "Recent broadcasts"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-4 space-y-3",
					children: [list.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "rounded-2xl border border-dashed border-border p-4 text-center text-xs text-muted-foreground",
						children: "No broadcasts yet."
					}), list.map((b) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-2xl border border-border p-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between text-[10px] font-bold uppercase tracking-wider",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: b.severity === "critical" ? "text-danger" : b.severity === "warning" ? "text-warning" : "text-brand",
									children: b.severity
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-muted-foreground",
									children: new Date(b.createdAt).toLocaleTimeString([], {
										hour: "2-digit",
										minute: "2-digit"
									})
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-1 text-sm font-semibold",
								children: b.message
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-1 text-[11px] text-muted-foreground",
								children: b.language
							})
						]
					}, b.id))]
				})
			]
		})]
	});
}
/**
* VolunteerView component tracking active match day staff, shift schedules,
* and presenting the Volunteer Task Copilot interface.
*/
function VolunteerView() {
	const askFn = useServerFn(askGroqAssistant);
	const [brief, setBrief] = (0, import_react.useState)(null);
	const [loading, setLoading] = (0, import_react.useState)(false);
	const [tasks, setTasks] = (0, import_react.useState)([
		{
			id: "task-1",
			priority: 1,
			type: "accessibility",
			location: "Gate 3 West Entrance",
			details: "Assist a family of 4 requiring wheelchair access and companion seating near elevators.",
			eta: "5 mins",
			requiredSkills: ["Accessibility Routing", "A11y Aid"],
			status: "pending"
		},
		{
			id: "task-2",
			priority: 2,
			type: "medical",
			location: "Section A Row 12",
			details: "Heat exhaustion case reported. Squad 3 dispatched. Volunteer usher needed to cordon area.",
			eta: "2 mins",
			requiredSkills: ["First Aid Support", "Crowd Control"],
			status: "pending"
		},
		{
			id: "task-3",
			priority: 3,
			type: "usher",
			location: "Gate 5 Concourse",
			details: "Greeting guests and ticket validating at the main ingress corridors.",
			eta: "10 mins",
			requiredSkills: ["Wayfinding Assistance"],
			status: "pending"
		},
		{
			id: "task-4",
			priority: 4,
			type: "security",
			location: "Food Court East",
			details: "Monitor minor bottleneck build-up at snack lines.",
			eta: "12 mins",
			requiredSkills: ["Redirecting Flow"],
			status: "pending"
		}
	]);
	const generate = async () => {
		setLoading(true);
		try {
			setBrief((await askFn({ data: {
				question: "Generate a 2-sentence shift briefing for stadium volunteers. Focus on crowd management, hydration checkpoints, and aiding mobility requests.",
				context: "Live match at MetLife Stadium."
			} })).answer);
		} catch {
			setBrief("Unable to generate briefing.");
		} finally {
			setLoading(false);
		}
	};
	(0, import_react.useState)(() => {
		generate();
	});
	const markComplete = (id) => {
		setTasks(tasks.map((t) => t.id === id ? {
			...t,
			status: "completed"
		} : t));
	};
	const volunteers = [
		{
			id: "v1",
			name: "Sarah J.",
			zone: "Gate A",
			role: "Wayfinding",
			status: "Active"
		},
		{
			id: "v2",
			name: "Miguel O.",
			zone: "Section 101",
			role: "Seating Assist",
			status: "Active"
		},
		{
			id: "v3",
			name: "Chen W.",
			zone: "Food Court North",
			role: "Information",
			status: "On Break"
		},
		{
			id: "v4",
			name: "Aisha T.",
			zone: "Concourse East",
			role: "Accessibility",
			status: "Active"
		}
	];
	const [qaQuery, setQaQuery] = (0, import_react.useState)("");
	const [qaAnswer, setQaAnswer] = (0, import_react.useState)(null);
	const [qaLoading, setQaLoading] = (0, import_react.useState)(false);
	const handleQaAsk = async () => {
		if (!qaQuery.trim()) return;
		setQaLoading(true);
		try {
			setQaAnswer((await askFn({ data: {
				question: `Act as the FIFA 2026 Volunteer Copilot. Provide a concise 2-sentence response for volunteer guide: "${qaQuery}"`,
				context: "Live shift directory: " + JSON.stringify(volunteers)
			} })).answer);
		} catch {
			setQaAnswer("Error retrieving Copilot instructions. Check system network status.");
		} finally {
			setQaLoading(false);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-2xl border border-brand/20 bg-gradient-brand-soft px-4 py-2.5 flex items-center justify-between text-xs text-brand font-bold",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "👥 Target Stakeholders: Volunteers, Ushers, Shift Coordinators" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "flex items-center gap-1.5 uppercase tracking-wider text-[10px]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, { className: "h-3.5 w-3.5 animate-pulse" }), " Volunteer Copilot Active"]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-2xl font-bold",
					children: "Volunteer Management"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted-foreground",
					children: "Track staff assignments, task queues, and dynamic shift instructions."
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2 rounded-xl border border-border bg-white px-3 py-1.5 text-sm font-semibold",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, { className: "h-4 w-4 text-brand" }),
						" ",
						volunteers.length,
						" Active Staff"
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-3xl bg-white p-6 shadow-soft ring-1 ring-border",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brand",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-4 w-4" }), " AI Shift Briefing"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: generate,
						disabled: loading,
						className: "text-xs font-semibold text-brand hover:underline disabled:opacity-50",
						children: "Refresh"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-3 rounded-2xl bg-secondary/50 p-4 text-sm font-medium",
					children: loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "flex items-center gap-2 text-muted-foreground",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-3.5 w-3.5 animate-spin" }), " Generating briefing..."]
					}) : brief
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-3xl border border-brand/30 bg-gradient-brand-soft/40 p-6 shadow-soft",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
						className: "text-sm font-black text-brand flex items-center gap-2 uppercase tracking-wide",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-4.5 w-4.5 text-brand" }), "Volunteer AI Copilot Q&A"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-xs text-muted-foreground",
						children: "Ask the Copilot: \"Where should I go?\", \"Nearest medical squad?\", \"Explain Section A accessibility assistance options?\", etc."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-4 flex gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							placeholder: "Type your Volunteer Copilot query here...",
							value: qaQuery,
							onChange: (e) => setQaQuery(e.target.value),
							onKeyDown: (e) => e.key === "Enter" && handleQaAsk(),
							className: "flex-1 rounded-xl border border-border bg-white px-4 py-2 text-sm outline-none shadow-sm"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: handleQaAsk,
							disabled: qaLoading || !qaQuery.trim(),
							className: "flex items-center gap-1.5 rounded-xl bg-gradient-brand px-5 py-2 text-sm font-bold text-white shadow-glow disabled:opacity-50",
							children: qaLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-4 w-4 animate-spin" }) : "Ask Copilot"
						})]
					}),
					qaAnswer && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-4 rounded-2xl border border-brand/10 bg-white p-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-[10px] font-black uppercase tracking-wider text-brand",
							children: "Copilot Response"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-xs font-semibold text-foreground/80 leading-relaxed",
							children: qaAnswer
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-3xl bg-white p-6 shadow-soft ring-1 ring-border",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ClipboardList, { className: "h-5 w-5 text-brand" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "text-lg font-bold",
						children: "Volunteer Copilot Active Task Queue"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-4 grid gap-4 md:grid-cols-2",
					children: tasks.map((task) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: `rounded-2xl border p-4 shadow-soft transition flex flex-col justify-between ${task.status === "completed" ? "bg-success-soft border-success" : "bg-white border-border"}`,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: `rounded-full px-2 py-0.5 text-[9px] font-bold uppercase text-white ${task.type === "medical" ? "bg-danger" : task.type === "accessibility" ? "bg-brand" : task.type === "security" ? "bg-warning" : "bg-success"}`,
									children: task.type
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-[10px] text-muted-foreground",
									children: [
										"Priority P",
										task.priority,
										" · ETA ",
										task.eta
									]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-2 text-sm font-bold",
								children: task.location
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-xs text-foreground/80 leading-relaxed",
								children: task.details
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-3 flex flex-wrap gap-1",
								children: task.requiredSkills.map((s, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "rounded-full bg-secondary/80 px-2 py-0.5 text-[9px] font-semibold text-muted-foreground",
									children: s
								}, idx))
							})
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => markComplete(task.id),
							disabled: task.status === "completed",
							className: `mt-4 flex w-full items-center justify-center gap-1.5 rounded-xl py-2 text-xs font-bold transition ${task.status === "completed" ? "bg-success/20 text-success cursor-default" : "bg-gradient-brand text-white shadow-glow hover:-translate-y-0.5"}`,
							children: task.status === "completed" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-3.5 w-3.5" }), " Task Dispatched & Handled"] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserCheck, { className: "h-3.5 w-3.5" }), " Accept & Complete Task"] })
						})]
					}, task.id))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-6 md:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-3xl bg-white p-6 shadow-soft ring-1 ring-border",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "text-lg font-bold",
						children: "Active Staff Directory"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-4 space-y-3",
						children: volunteers.map((v) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between rounded-2xl border border-border p-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "font-semibold text-sm",
								children: v.name
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "text-[11px] text-muted-foreground",
								children: [
									v.role,
									" • ",
									v.zone
								]
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: `rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider ${v.status === "Active" ? "bg-success/20 text-success" : "bg-warning/20 text-warning"}`,
								children: v.status
							})]
						}, v.id))
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-3xl bg-white p-6 shadow-soft ring-1 ring-border",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "text-lg font-bold",
						children: "Shift & Rest Schedule"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-4 space-y-3",
						children: [
							{
								team: "Wayfinding Cohort 1",
								duration: "14:30 - 15:00",
								location: "Break Room B"
							},
							{
								team: "Seating Assist Cohort A",
								duration: "15:00 - 15:30",
								location: "Staff Zone West"
							},
							{
								team: "Accessibility Escorts",
								duration: "15:30 - 16:00",
								location: "Break Room B"
							}
						].map((s, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between border-b border-border pb-3 last:border-0 last:pb-0",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "font-semibold text-sm",
								children: s.team
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "text-[11px] text-muted-foreground",
								children: ["📍 Rest Room: ", s.location]
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-xs font-bold text-brand",
								children: s.duration
							})]
						}, idx))
					})]
				})]
			})
		]
	});
}
/**
* SustainabilityView component tracking green indicators, carbon footprint,
* and presenting Sustainability Intelligence metrics.
*/
function SustainabilityView() {
	const askFn = useServerFn(askGroqAssistant);
	const [tip, setTip] = (0, import_react.useState)(null);
	const [loading, setLoading] = (0, import_react.useState)(false);
	const [interventions, setInterventions] = (0, import_react.useState)([
		{
			id: "int-1",
			title: "Encourage public transit via PWA alerts",
			carbonReduction: "8.0 tonnes CO₂",
			cost: "free",
			implemented: false
		},
		{
			id: "int-2",
			title: "Optimize stadium shuttle routes",
			carbonReduction: "2.2 tonnes CO₂",
			cost: "low",
			implemented: false
		},
		{
			id: "int-3",
			title: "Activate secondary waste sorting marshalling",
			carbonReduction: "1.5 tonnes CO₂",
			cost: "low",
			implemented: false
		}
	]);
	const [fanComparison, setFanComparison] = (0, import_react.useState)({
		driving: 12,
		transit: .8
	});
	const [calcDistance, setCalcDistance] = (0, import_react.useState)(25);
	const [calcMode, setCalcMode] = (0, import_react.useState)("car");
	const co2Factors = {
		car: .22,
		ev: .05,
		bus: .08,
		metro: .01
	};
	const calculatedCO2 = Math.round(calcDistance * co2Factors[calcMode] * 10) / 10;
	const carCO2Equivalent = Math.round(calcDistance * co2Factors.car * 10) / 10;
	const carbonSaved = Math.round(Math.max(0, carCO2Equivalent - calculatedCO2) * 10) / 10;
	const generate = async () => {
		setLoading(true);
		try {
			setTip((await askFn({ data: {
				question: "Provide 3 actionable tips for stadium green operations: 1 for waste recycling bin optimization, 1 for water dispenser refill alerts, and 1 for energy-aware smart lighting options.",
				context: "Live match at MetLife Stadium."
			} })).answer);
		} catch {
			setTip("Unable to generate tip.");
		} finally {
			setLoading(false);
		}
	};
	(0, import_react.useState)(() => {
		generate();
	});
	const implementIntervention = (id) => {
		setInterventions(interventions.map((i) => i.id === id ? {
			...i,
			implemented: true
		} : i));
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-2xl border border-brand/20 bg-gradient-brand-soft px-4 py-2.5 flex items-center justify-between text-xs text-brand font-bold",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "👥 Target Stakeholders: Sustainability Teams, Stadium Operations Managers" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "flex items-center gap-1.5 uppercase tracking-wider text-[10px]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Leaf, { className: "h-3.5 w-3.5 text-success animate-pulse" }), " Eco-Commander Active"]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex items-center justify-between",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-2xl font-bold",
					children: "Sustainability Operations"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted-foreground",
					children: "Monitor Carbon Impact and enforce live green mitigation decisions."
				})] })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-3xl border border-brand/10 bg-white p-5 shadow-soft",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
						className: "text-sm font-bold text-foreground flex items-center gap-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Leaf, { className: "h-4.5 w-4.5 text-success" }), "Interactive Transit Offset Calculator"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-muted-foreground mt-0.5",
						children: "Estimate travel carbon footprint offsets based on fan transit choices."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-4 grid gap-4 sm:grid-cols-3 items-center",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "text-[10px] font-black uppercase text-muted-foreground",
								children: ["Distance (km)", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "number",
									min: "1",
									max: "200",
									value: calcDistance,
									onChange: (e) => setCalcDistance(Math.max(1, parseInt(e.target.value) || 0)),
									className: "mt-1 w-full rounded-xl border border-border bg-white px-3 py-1.5 text-xs font-bold outline-none"
								})]
							}) }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "text-[10px] font-black uppercase text-muted-foreground",
								children: ["Transport Mode", /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
									value: calcMode,
									onChange: (e) => setCalcMode(e.target.value),
									className: "mt-1 w-full rounded-xl border border-border bg-white px-3 py-1.5 text-xs font-bold",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "car",
											children: "Gasoline Car"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "ev",
											children: "Electric Vehicle"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "bus",
											children: "Shuttle Bus"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "metro",
											children: "Metro Transit"
										})
									]
								})]
							}) }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-2xl bg-gradient-brand-soft p-3 text-center border border-brand/5",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-[9px] font-extrabold uppercase text-brand",
										children: "Estimated Carbon Saved"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mt-1 text-base font-black text-brand",
										children: [carbonSaved, " kg CO₂"]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-[8px] text-muted-foreground mt-0.5",
										children: "compared to single occupancy car"
									})
								]
							})
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-1 gap-6 md:grid-cols-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KpiCard, {
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartNoAxesColumn, { className: "h-5 w-5 text-success" }),
						label: "Est. Event Carbon Footprint",
						value: "42.8 tonnes",
						sub: "Goal limit: 50.0 tonnes",
						tone: "success"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KpiCard, {
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Activity, { className: "h-5 w-5 text-brand" }),
						label: "Recycling Divert Rate",
						value: "72.4%",
						sub: "+8% from last matches",
						tone: "brand"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KpiCard, {
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrendingUp, { className: "h-5 w-5 text-warning" }),
						label: "Water Dispenser Refills",
						value: "14,820 Liters",
						sub: "Eliminated ~30,000 plastic bottles",
						tone: "warning"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-3xl bg-white p-6 shadow-soft ring-1 ring-border space-y-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "text-sm font-bold text-foreground",
					children: "Operational Carbon Breakdown"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "space-y-3",
					children: [
						{
							cat: "Fan Transportation",
							value: 24.5,
							max: 30,
							color: "bg-brand"
						},
						{
							cat: "Venue Operations & Lighting",
							value: 13.2,
							max: 15,
							color: "bg-success"
						},
						{
							cat: "Food Service & Waste",
							value: 5.1,
							max: 5,
							color: "bg-warning"
						}
					].map((item, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex justify-between text-xs font-semibold",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: item.cat }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
								item.value,
								" / ",
								item.max,
								" tonnes CO₂"
							] })]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "h-2 w-full rounded-full bg-secondary overflow-hidden",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: `h-full ${item.color}`,
								style: { width: `${item.value / item.max * 100}%` }
							})
						})]
					}, idx))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-6 md:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-3xl bg-white p-6 shadow-soft ring-1 ring-border",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "text-lg font-bold",
							children: "Fan Transit Comparative Analytics"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-xs text-muted-foreground",
							children: "Highlighting CO₂ savings for fans utilizing Metro Line 3 vs driving alone."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-4 space-y-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between rounded-2xl border border-border p-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "font-semibold text-sm",
									children: "Driving Alone (Average vehicle)"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-[11px] text-muted-foreground",
									children: "12 kg CO₂ produced per trip"
								})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "text-danger font-extrabold text-lg",
									children: [fanComparison.driving, " kg"]
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between rounded-2xl border border-success bg-success-soft p-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "font-semibold text-sm text-success",
									children: "Public Transit (Metro Line 3)"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-[11px] text-success/80",
									children: "94% reduction in carbon footprint"
								})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "text-success font-extrabold text-lg",
									children: [fanComparison.transit, " kg"]
								})]
							})]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-3xl bg-white p-6 shadow-soft ring-1 ring-border",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "text-lg font-bold",
						children: "Live Sustainability Interventions"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-4 space-y-3",
						children: interventions.map((it) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: `flex items-center justify-between rounded-2xl border p-3 ${it.implemented ? "border-success bg-success-soft" : "border-border bg-white"}`,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "font-semibold text-xs",
								children: it.title
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "text-[10px] text-muted-foreground mt-0.5",
								children: [
									"Impact: -",
									it.carbonReduction,
									" · Cost: ",
									it.cost
								]
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => implementIntervention(it.id),
								disabled: it.implemented,
								className: "rounded-xl border border-border bg-white px-3 py-1.5 text-xs font-bold hover:bg-brand hover:text-white transition disabled:opacity-50",
								children: it.implemented ? "Active" : "Deploy"
							})]
						}, it.id))
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-3xl bg-white p-6 shadow-soft ring-1 ring-border",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brand",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-4 w-4" }), " AI Eco-Tip"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: generate,
						disabled: loading,
						className: "text-xs font-semibold text-brand hover:underline disabled:opacity-50",
						children: "Refresh"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-3 rounded-2xl bg-secondary/50 p-4 text-sm font-medium",
					children: loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "flex items-center gap-2 text-muted-foreground",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-3.5 w-3.5 animate-spin" }), " Generating..."]
					}) : tip
				})]
			})
		]
	});
}
/**
* Minimum rest period between matches at the same venue (in hours).
* FIFA regulations require at least 48 hours between matches.
*/
var MIN_REST_HOURS = 48;
/**
* Minimum turnaround time between any events at the same venue (in hours).
* Allows for teardown + setup.
*/
var MIN_TURNAROUND_HOURS = 4;
/**
* Detects scheduling conflicts — overlapping events at the same venue.
*/
function detectConflicts(events) {
	const conflicts = [];
	for (let i = 0; i < events.length; i++) for (let j = i + 1; j < events.length; j++) {
		const a = events[i];
		const b = events[j];
		if (a.venue !== b.venue) continue;
		const overlapStart = Math.max(a.startTime.getTime(), b.startTime.getTime());
		const overlapEnd = Math.min(a.endTime.getTime(), b.endTime.getTime());
		if (overlapStart < overlapEnd) {
			const overlapMinutes = Math.round((overlapEnd - overlapStart) / (1e3 * 60));
			conflicts.push({
				eventA: a,
				eventB: b,
				overlapMinutes,
				venue: a.venue
			});
		}
	}
	return conflicts;
}
/**
* Validates that rest periods between matches at the same venue are enforced.
* Returns events that violate the minimum rest period.
*/
function validateRestPeriods(events) {
	const matches = events.filter((e) => e.type === "match");
	const violations = [];
	const byVenue = /* @__PURE__ */ new Map();
	for (const match of matches) {
		const existing = byVenue.get(match.venue) ?? [];
		existing.push(match);
		byVenue.set(match.venue, existing);
	}
	for (const [, venueMatches] of byVenue) {
		const sorted = [...venueMatches].sort((a, b) => a.startTime.getTime() - b.startTime.getTime());
		for (let i = 0; i < sorted.length - 1; i++) {
			const gapHours = (sorted[i + 1].startTime.getTime() - sorted[i].endTime.getTime()) / (1e3 * 60 * 60);
			if (gapHours < MIN_REST_HOURS) violations.push({
				eventA: sorted[i],
				eventB: sorted[i + 1],
				gapHours: Math.round(gapHours * 10) / 10
			});
		}
	}
	return violations;
}
/**
* Validates turnaround time between consecutive events at the same venue.
*/
function validateTurnaround(events) {
	const violations = [];
	const byVenue = /* @__PURE__ */ new Map();
	for (const event of events) {
		const existing = byVenue.get(event.venue) ?? [];
		existing.push(event);
		byVenue.set(event.venue, existing);
	}
	for (const [, venueEvents] of byVenue) {
		const sorted = [...venueEvents].sort((a, b) => a.startTime.getTime() - b.startTime.getTime());
		for (let i = 0; i < sorted.length - 1; i++) {
			const gapHours = (sorted[i + 1].startTime.getTime() - sorted[i].endTime.getTime()) / (1e3 * 60 * 60);
			if (gapHours < MIN_TURNAROUND_HOURS) violations.push({
				eventA: sorted[i],
				eventB: sorted[i + 1],
				gapHours: Math.round(gapHours * 10) / 10
			});
		}
	}
	return violations;
}
/**
* Finds the next available time slot at a given venue that doesn't conflict.
*/
function getNextAvailableSlot(events, venue, durationMinutes, searchFrom = /* @__PURE__ */ new Date()) {
	const venueEvents = events.filter((e) => e.venue === venue).sort((a, b) => a.startTime.getTime() - b.startTime.getTime());
	let candidateStart = searchFrom;
	const durationMs = durationMinutes * 60 * 1e3;
	const turnaroundMs = MIN_TURNAROUND_HOURS * 60 * 60 * 1e3;
	for (const event of venueEvents) {
		const candidateEnd = new Date(candidateStart.getTime() + durationMs);
		if (candidateEnd.getTime() + turnaroundMs <= event.startTime.getTime()) return {
			start: candidateStart,
			end: candidateEnd,
			venue
		};
		candidateStart = new Date(event.endTime.getTime() + turnaroundMs);
	}
	return {
		start: candidateStart,
		end: new Date(candidateStart.getTime() + durationMs),
		venue
	};
}
/**
* Greedy schedule optimizer — reorders non-critical events to eliminate conflicts.
* Critical and high-priority events are pinned; normal-priority events can be moved.
*/
function optimizeSchedule(events) {
	const pinned = events.filter((e) => e.priority === "critical" || e.priority === "high");
	const movable = events.filter((e) => e.priority === "normal");
	const result = [...pinned];
	for (const event of movable) {
		const slot = getNextAvailableSlot(result, event.venue, getDurationMinutes(event));
		result.push({
			...event,
			startTime: slot.start,
			endTime: slot.end
		});
	}
	return result.sort((a, b) => a.startTime.getTime() - b.startTime.getTime());
}
function getDurationMinutes(event) {
	return Math.round((event.endTime.getTime() - event.startTime.getTime()) / (1e3 * 60));
}
var INITIAL_EVENTS = [
	{
		id: "e1",
		title: "Match 1: USA vs England",
		venue: "MetLife Main Pitch",
		startTime: /* @__PURE__ */ new Date("2026-06-15T18:00:00"),
		endTime: /* @__PURE__ */ new Date("2026-06-15T21:00:00"),
		type: "match",
		teams: ["USA", "England"],
		priority: "critical"
	},
	{
		id: "e2",
		title: "Opening Ceremony Rehearsal",
		venue: "MetLife Main Pitch",
		startTime: /* @__PURE__ */ new Date("2026-06-15T19:30:00"),
		endTime: /* @__PURE__ */ new Date("2026-06-15T21:30:00"),
		type: "rehearsal",
		priority: "normal"
	},
	{
		id: "e3",
		title: "Match 2: Spain vs France",
		venue: "MetLife Main Pitch",
		startTime: /* @__PURE__ */ new Date("2026-06-16T15:00:00"),
		endTime: /* @__PURE__ */ new Date("2026-06-16T18:00:00"),
		type: "match",
		teams: ["Spain", "France"],
		priority: "high"
	},
	{
		id: "e4",
		title: "Press Briefing Setup",
		venue: "Press Room A",
		startTime: /* @__PURE__ */ new Date("2026-06-17T09:00:00"),
		endTime: /* @__PURE__ */ new Date("2026-06-17T11:00:00"),
		type: "setup",
		priority: "normal"
	},
	{
		id: "e5",
		title: "Sponsor Gala Setup",
		venue: "MetLife Main Pitch",
		startTime: /* @__PURE__ */ new Date("2026-06-16T18:15:00"),
		endTime: /* @__PURE__ */ new Date("2026-06-16T21:00:00"),
		type: "setup",
		priority: "normal"
	}
];
function SchedulingView() {
	const [events, setEvents] = (0, import_react.useState)(INITIAL_EVENTS);
	const [optimized, setOptimized] = (0, import_react.useState)(false);
	const conflicts = detectConflicts(events);
	const restViolations = validateRestPeriods(events);
	const turnaroundViolations = validateTurnaround(events);
	const handleOptimize = () => {
		setEvents(optimizeSchedule(events));
		setOptimized(true);
	};
	const handleReset = () => {
		setEvents(INITIAL_EVENTS);
		setOptimized(false);
	};
	const hasIssues = conflicts.length > 0 || restViolations.length > 0 || turnaroundViolations.length > 0;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-2xl border border-brand/20 bg-gradient-brand-soft px-4 py-2.5 flex items-center justify-between text-xs text-brand font-bold",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "👥 Target Stakeholders: Match Organizers, Tournament Operations Coordinators" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "flex items-center gap-1.5 uppercase tracking-wider text-[10px]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Calendar, { className: "h-3.5 w-3.5" }), " Scheduling engine active"]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-2xl font-bold",
					children: "Tournament Scheduling Engine"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted-foreground",
					children: "Enforce safety margins, volunteer rest gaps, and FIFA-mandated 48-hour team rest windows."
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex gap-2",
					children: hasIssues ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: handleOptimize,
						className: "flex items-center gap-1.5 rounded-xl bg-gradient-brand px-4 py-2 text-xs font-bold text-white shadow-glow transition hover:-translate-y-0.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-3.5 w-3.5" }), " Optimize Schedule"]
					}) : optimized && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: handleReset,
						className: "flex items-center gap-1.5 rounded-xl border border-border bg-white px-4 py-2 text-xs font-bold text-foreground/75 transition hover:bg-secondary",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCcw, { className: "h-3.5 w-3.5" }), " Reset Simulation"]
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-1 gap-6 md:grid-cols-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-3xl border border-border bg-white p-5 shadow-soft",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { className: `h-5 w-5 ${conflicts.length > 0 ? "text-danger" : "text-success"}` }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "font-bold text-sm",
								children: "Venue Overlaps"
							})]
						}), conflicts.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-3 space-y-2",
							children: conflicts.map((c, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-xl bg-danger-soft p-3 text-xs border border-danger/10",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "font-bold text-danger",
									children: ["Overlap at ", c.venue]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-1 text-foreground/80",
									children: [
										"\"",
										c.eventA.title,
										"\" overlaps with \"",
										c.eventB.title,
										"\" by ",
										c.overlapMinutes,
										" mins."
									]
								})]
							}, i))
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 text-xs text-muted-foreground",
							children: "No overlapping events found at the same venue."
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-3xl border border-border bg-white p-5 shadow-soft",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { className: `h-5 w-5 ${restViolations.length > 0 ? "text-warning" : "text-success"}` }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "font-bold text-sm",
								children: "FIFA Rest Violations (48h)"
							})]
						}), restViolations.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-3 space-y-2",
							children: restViolations.map((v, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-xl bg-warning-soft p-3 text-xs border border-warning/10",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "font-bold text-warning-dark",
									children: [
										"Rest window violated (",
										v.gapHours,
										" hours)"
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-1 text-foreground/80",
									children: [
										"Gap between Match ",
										v.eventA.id,
										" and Match ",
										v.eventB.id,
										" is below 48-hour threshold."
									]
								})]
							}, i))
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 text-xs text-muted-foreground",
							children: "All consecutive matches respect the FIFA 48-hour rest limit."
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-3xl border border-border bg-white p-5 shadow-soft",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: `h-5 w-5 ${turnaroundViolations.length > 0 ? "text-warning" : "text-success"}` }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "font-bold text-sm",
								children: "Setup Turnaround gaps (4h)"
							})]
						}), turnaroundViolations.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-3 space-y-2",
							children: turnaroundViolations.map((v, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-xl bg-warning-soft p-3 text-xs border border-warning/10",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "font-bold text-warning-dark",
									children: [
										"Short turnaround (",
										v.gapHours,
										" hours)"
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-1 text-foreground/80",
									children: [
										"Only ",
										v.gapHours,
										"h gap between consecutive operations on ",
										v.eventA.venue,
										"."
									]
								})]
							}, i))
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 text-xs text-muted-foreground",
							children: "All venue setup and teardown turnaround targets satisfied."
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-3xl border border-border bg-white p-6 shadow-soft",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Calendar, { className: "h-5 w-5 text-brand" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "font-bold",
							children: "Tournament Master Calendar"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-xs text-muted-foreground",
						children: "Timetable scheduler showing matched, rehearsals, and setup periods."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-6 overflow-hidden rounded-2xl border border-border",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
							className: "w-full border-collapse text-left text-xs",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
								className: "bg-secondary/50 font-bold border-b border-border text-muted-foreground",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "p-3",
										children: "Event Details"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "p-3",
										children: "Venue"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "p-3",
										children: "Scheduled Time"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "p-3",
										children: "Type"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "p-3",
										children: "Priority"
									})
								]
							}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", {
								className: "divide-y divide-border",
								children: events.map((e) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
									className: "hover:bg-secondary/20 transition",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "p-3 font-semibold text-foreground",
											children: e.title
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "p-3 text-muted-foreground",
											children: e.venue
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
											className: "p-3",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "font-medium text-foreground",
													children: e.startTime.toLocaleDateString([], {
														month: "short",
														day: "numeric"
													})
												}),
												" ",
												e.startTime.toLocaleTimeString([], {
													hour: "2-digit",
													minute: "2-digit"
												}),
												" -",
												" ",
												e.endTime.toLocaleTimeString([], {
													hour: "2-digit",
													minute: "2-digit"
												})
											]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "p-3",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: `inline-flex rounded-full px-2 py-0.5 text-[10px] font-bold uppercase ${e.type === "match" ? "bg-brand-soft text-brand" : e.type === "setup" ? "bg-success-soft text-success" : "bg-muted-foreground/15 text-foreground/75"}`,
												children: e.type
											})
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "p-3 uppercase font-extrabold text-[10px]",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: e.priority === "critical" ? "text-danger" : e.priority === "high" ? "text-warning-dark" : "text-muted-foreground",
												children: e.priority
											})
										})
									]
								}, e.id))
							})]
						})
					})
				]
			})
		]
	});
}
/**
* FanOps Unified — Incident Dispatch Engine
*
* Automated responder assignment, ETA computation, dispatch plan generation,
* and escalation logic for stadium emergency coordination during FIFA WC 2026.
*/
/** Maximum acceptable first-arrival time in minutes */
var MAX_FIRST_ARRIVAL_MINUTES = 8;
/** Walking speed estimate: ~60 meters per minute in a stadium */
var WALK_SPEED_M_PER_MIN = 60;
/**
* Computes estimated travel time in minutes between two zones
* using the Dijkstra routing engine.
*/
function computeETA(fromZoneId, toZoneId) {
	if (fromZoneId === toZoneId) return 0;
	try {
		const result = findShortestPath(fromZoneId, toZoneId);
		if (!result || result.totalDistance === Infinity) return 15;
		return Math.ceil(result.totalDistance / WALK_SPEED_M_PER_MIN);
	} catch {
		return 10;
	}
}
/**
* Finds the nearest available responder with the required role.
* Returns null if no responder with the role is available.
*/
function findNearestResponder(responders, targetZoneId, role) {
	const candidates = responders.filter((r) => r.role === role && r.available);
	if (candidates.length === 0) return null;
	let nearest = null;
	let bestETA = Infinity;
	for (const responder of candidates) {
		const eta = computeETA(responder.currentZoneId, targetZoneId);
		if (eta < bestETA) {
			bestETA = eta;
			nearest = responder;
		}
	}
	return nearest ? {
		responder: nearest,
		eta: bestETA
	} : null;
}
/**
* Creates a comprehensive dispatch plan for an incident at a given zone.
* Assigns the nearest responder for each required role and calculates ETAs.
*/
function createDispatchPlan(responders, incidentZoneId, requiredRoles) {
	const assignments = [];
	let escalationRequired = false;
	let escalationReason;
	for (const role of requiredRoles) {
		const match = findNearestResponder(responders, incidentZoneId, role);
		if (!match) {
			escalationRequired = true;
			escalationReason = `No available ${role} responder found. Manual escalation required.`;
			continue;
		}
		const fromZoneName = STADIUM_ZONES[match.responder.currentZoneId]?.names?.English ?? match.responder.currentZoneId;
		const toZoneName = STADIUM_ZONES[incidentZoneId]?.names?.English ?? incidentZoneId;
		assignments.push({
			responderId: match.responder.id,
			responderName: match.responder.name,
			role: match.responder.role,
			fromZone: fromZoneName,
			toZone: toZoneName,
			estimatedMinutes: match.eta,
			pathDescription: `${fromZoneName} → ${toZoneName} (est. ${match.eta} min)`
		});
	}
	const firstArrival = assignments.length > 0 ? Math.min(...assignments.map((a) => a.estimatedMinutes)) : Infinity;
	if (firstArrival > MAX_FIRST_ARRIVAL_MINUTES) {
		escalationRequired = true;
		escalationReason = `First arrival ETA (${firstArrival} min) exceeds ${MAX_FIRST_ARRIVAL_MINUTES}-minute threshold.`;
	}
	return {
		incidentZoneId,
		assignments,
		totalRespondersDispatched: assignments.length,
		estimatedFirstArrivalMinutes: firstArrival === Infinity ? -1 : firstArrival,
		escalationRequired,
		escalationReason
	};
}
var RESPONDERS = [
	{
		id: "r1",
		name: "Officer Davis",
		role: "security",
		currentZoneId: "gA",
		available: true,
		skills: ["Crowd Control"]
	},
	{
		id: "r2",
		name: "Paramedic Gomez",
		role: "medical",
		currentZoneId: "conc",
		available: true,
		skills: ["Trauma Response"]
	},
	{
		id: "r3",
		name: "Marshall Lee",
		role: "volunteer",
		currentZoneId: "food",
		available: true,
		skills: ["Wayfinding"]
	},
	{
		id: "r4",
		name: "Officer Ramirez",
		role: "security",
		currentZoneId: "s101",
		available: true,
		skills: ["First Aid Support"]
	},
	{
		id: "r5",
		name: "Dispatcher Chen",
		role: "transport",
		currentZoneId: "gC",
		available: true,
		skills: ["Transit Coordination"]
	}
];
function CoordinationView() {
	const [responders, setResponders] = (0, import_react.useState)(RESPONDERS);
	const [activeDispatch, setActiveDispatch] = (0, import_react.useState)(null);
	const [selectedIncidentZone, setSelectedIncidentZone] = (0, import_react.useState)("s205");
	const runSimulation = () => {
		const plan = createDispatchPlan(responders, selectedIncidentZone, [
			"security",
			"medical",
			"volunteer"
		]);
		setActiveDispatch(plan);
		const dispatchedIds = plan.assignments.map((a) => a.responderId);
		setResponders(responders.map((r) => dispatchedIds.includes(r.id) ? {
			...r,
			available: false
		} : r));
	};
	const handleResolve = () => {
		setActiveDispatch(null);
		setResponders(RESPONDERS);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-2xl border border-brand/20 bg-gradient-brand-soft px-4 py-2.5 flex items-center justify-between text-xs text-brand font-bold",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "👥 Target Stakeholders: Transportation Teams, Security Teams, Medical Staff, Stadium Operations Managers" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "flex items-center gap-1.5 uppercase tracking-wider text-[10px]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, { className: "h-3.5 w-3.5" }), " Dispatch Coordination Live"]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-2xl font-bold",
					children: "Multi-Team Coordination Hub"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted-foreground",
					children: "Bridges communication, status tracking, and dispatch coordination across all operations cadres."
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex gap-2",
					children: activeDispatch ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: handleResolve,
						className: "flex items-center gap-1.5 rounded-xl border border-border bg-white px-4 py-2 text-xs font-bold text-success transition hover:bg-success-soft",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheckBig, { className: "h-3.5 w-3.5" }), " Mark Incident Resolved"]
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
							value: selectedIncidentZone,
							onChange: (e) => setSelectedIncidentZone(e.target.value),
							className: "rounded-xl border border-border bg-white px-3 py-1 text-xs font-bold",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "s205",
									children: "Section 205 (Seats)"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "s101",
									children: "Section 101 (Seats)"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "food",
									children: "Food Court North"
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: runSimulation,
							className: "flex items-center gap-1.5 rounded-xl bg-gradient-brand px-4 py-2 text-xs font-bold text-white shadow-glow transition hover:-translate-y-0.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, { className: "h-3.5 w-3.5" }), " Simulate Emergency Dispatch"]
						})]
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-1 gap-6 md:grid-cols-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-3xl border border-border bg-white p-5 shadow-soft md:col-span-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, { className: "h-5 w-5 text-brand" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "font-bold",
								children: "Active Responders Console"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "rounded-full bg-success-soft px-2 py-0.5 text-[10px] font-bold text-success uppercase",
							children: [responders.filter((r) => r.available).length, " Available"]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-6 space-y-3",
						children: responders.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between rounded-2xl border border-border bg-secondary/25 p-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex h-9 w-9 items-center justify-center rounded-xl bg-white shadow-soft text-brand",
									children: [
										r.role === "security" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shield, { className: "h-4 w-4" }),
										r.role === "medical" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Activity, { className: "h-4 w-4" }),
										r.role === "volunteer" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, { className: "h-4 w-4" }),
										r.role === "transport" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Truck, { className: "h-4 w-4" })
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-xs font-bold text-foreground",
									children: r.name
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "text-[10px] uppercase font-semibold text-muted-foreground",
									children: [
										r.role,
										" · ",
										r.skills.join(", ")
									]
								})] })]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-[11px] font-semibold text-muted-foreground",
									children: ["Zone: ", r.currentZoneId]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: `inline-block h-2 w-2 rounded-full ${r.available ? "bg-success" : "bg-danger animate-pulse"}` })]
							})]
						}, r.id))
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-3xl border border-border bg-white p-5 shadow-soft",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
						className: "font-bold flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-5 w-5 text-brand" }), "Live Dispatch Plan"]
					}), activeDispatch ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-4 space-y-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-2xl bg-gradient-brand-soft p-4 border border-brand/10",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-[10px] font-extrabold uppercase tracking-widest text-brand",
										children: "Incident Zone"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mt-1 text-sm font-bold",
										children: ["Zone: ", activeDispatch.incidentZoneId]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mt-2 text-xs text-foreground/80",
										children: [
											"Estimated arrival of first responder:",
											" ",
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "font-bold text-brand",
												children: [activeDispatch.estimatedFirstArrivalMinutes, " mins"]
											})
										]
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-xs font-bold text-muted-foreground",
									children: "Assignments:"
								}), activeDispatch.assignments.map((a, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "rounded-xl border border-border bg-secondary/10 p-3 text-xs",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center justify-between font-bold text-foreground",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: a.responderName }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-[10px] uppercase text-brand",
											children: a.role
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-1 text-muted-foreground text-[11px]",
										children: a.pathDescription
									})]
								}, i))]
							}),
							activeDispatch.escalationRequired && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex gap-2 rounded-xl bg-danger-soft p-3 text-xs border border-danger/10 text-danger",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { className: "h-4 w-4 shrink-0 mt-0.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "font-bold",
									children: "Auto-Escalation Active"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mt-0.5 text-foreground/80",
									children: activeDispatch.escalationReason
								})] })]
							})
						]
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-12 text-center",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, { className: "mx-auto h-8 w-8 text-muted-foreground/45" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-xs text-muted-foreground",
								children: "No active dispatches."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[10px] text-muted-foreground/75 mt-1",
								children: "Select an incident zone and trigger simulation."
							})
						]
					})]
				})]
			})
		]
	});
}
function Sidebar({ tab, setTab }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
		className: "sticky top-0 hidden h-screen w-64 shrink-0 border-r border-border bg-white/60 backdrop-blur-xl md:block overflow-y-auto",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex h-16 items-center gap-2 px-5 shrink-0",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-brand text-white shadow-glow",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-4 w-4" })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "text-sm font-extrabold leading-none",
					children: "FIFA 26"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "text-[10px] font-semibold uppercase tracking-widest text-muted-foreground",
					children: "Operations Center"
				})] })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
				className: "mt-2 space-y-4 px-3 pb-24",
				children: [
					{
						title: "General overview",
						items: [{
							id: "map",
							label: "Map View",
							icon: Map$1
						}]
					},
					{
						title: "Match organizers",
						items: [{
							id: "density",
							label: "Crowd Density",
							icon: Activity
						}, {
							id: "scheduling",
							label: "Scheduling",
							icon: Calendar
						}]
					},
					{
						title: "Security & Medical Teams",
						items: [{
							id: "incidents",
							label: "Incidents",
							icon: TriangleAlert
						}]
					},
					{
						title: "Volunteers & Ushers",
						items: [{
							id: "volunteers",
							label: "Volunteers",
							icon: Users
						}]
					},
					{
						title: "Sustainability managers",
						items: [{
							id: "sustainability",
							label: "Sustainability",
							icon: Sparkles
						}]
					},
					{
						title: "Transportation staff",
						items: [{
							id: "coordination",
							label: "Coordination",
							icon: UsersRound
						}]
					},
					{
						title: "Broadcasters center",
						items: [{
							id: "broadcast",
							label: "Broadcast",
							icon: Radio
						}]
					}
				].map((group) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "px-3 text-[9px] font-black uppercase tracking-widest text-muted-foreground/80",
						children: group.title
					}), group.items.map((it) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: () => setTab(it.id),
						className: `flex w-full items-center gap-3 rounded-xl px-3 py-2 text-xs font-semibold transition ${tab === it.id ? "bg-gradient-brand text-white shadow-glow" : "text-foreground/75 hover:bg-secondary/60"}`,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(it.icon, { className: "h-3.5 w-3.5" }), it.label]
					}, it.id))]
				}, group.title))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "absolute inset-x-3 bottom-4 rounded-2xl bg-gradient-brand-soft p-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-xs font-bold text-brand",
						children: "System status"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-1 text-sm font-semibold",
						children: "All systems nominal"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-2 flex items-center gap-1.5 text-[11px] text-muted-foreground",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-1.5 w-1.5 animate-pulse rounded-full bg-success" }), " live"]
					})
				]
			})
		]
	});
}
function Topbar() {
	const [showBrief, setShowBrief] = (0, import_react.useState)(false);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
		className: "sticky top-0 z-30 flex h-16 items-center justify-between border-b border-border bg-white/70 px-6 backdrop-blur-xl",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "text-[11px] font-semibold uppercase tracking-widest text-muted-foreground",
			children: "Ops Command"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "text-lg font-bold",
			children: "Live MatchDay Overview"
		})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center gap-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "hidden items-center gap-2 rounded-xl border border-border bg-secondary/60 px-3 py-2 md:flex",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "h-4 w-4 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						placeholder: "Search zones, incidents…",
						className: "w-56 bg-transparent text-sm outline-none"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					onClick: () => setShowBrief((v) => !v),
					className: "flex items-center gap-1.5 rounded-xl bg-gradient-brand px-3 py-2 text-xs font-bold text-white shadow-glow transition hover:-translate-y-0.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-3.5 w-3.5" }), "AI Brief"]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/",
					className: "flex h-9 w-9 items-center justify-center rounded-xl border border-border text-muted-foreground hover:text-foreground",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(House, { className: "h-4 w-4" })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					className: "relative flex h-9 w-9 items-center justify-center rounded-xl border border-border text-muted-foreground",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bell, { className: "h-4 w-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-danger" })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-brand text-xs font-bold text-white",
					children: "OP"
				})
			]
		})]
	}), showBrief && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GroqSituationBrief, { onClose: () => setShowBrief(false) })] });
}
function GroqSituationBrief({ onClose }) {
	const incidents = useOpsStore((s) => s.incidents);
	const zones = useOpsStore((s) => s.zones);
	const askFn = useServerFn(askGroqAssistant);
	const [brief, setBrief] = (0, import_react.useState)(null);
	const [loading, setLoading] = (0, import_react.useState)(false);
	const generate = async () => {
		setLoading(true);
		const context = `${incidents.filter((i) => i.status !== "resolved").length} open incidents. Critical zones: ${zones.filter((z) => z.level === "high").map((z) => z.name).join(", ") || "none"}.`;
		try {
			setBrief((await askFn({ data: {
				question: "Give me a brief 2-sentence situation report for stadium operations staff right now.",
				context
			} })).answer);
		} catch {
			setBrief("Unable to generate brief — please check manually.");
		} finally {
			setLoading(false);
		}
	};
	(0, import_react.useState)(() => {
		generate();
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "border-b border-border bg-gradient-brand-soft px-6 py-3",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto flex max-w-[1400px] items-start justify-between gap-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-4 w-4 shrink-0 text-brand" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-xs font-bold uppercase tracking-wider text-brand",
						children: "Groq AI Situation Brief"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex-1 text-sm text-foreground/80",
					children: [loading && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "flex items-center gap-2 text-muted-foreground",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-3.5 w-3.5 animate-spin" }), " Analysing current ops status…"]
					}), !loading && brief && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: brief })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2 shrink-0",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: generate,
						disabled: loading,
						className: "text-xs font-semibold text-brand hover:underline disabled:opacity-50",
						children: "Refresh"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: onClose,
						className: "text-muted-foreground hover:text-foreground",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-4 w-4" })
					})]
				})
			]
		})
	});
}
var Route$6 = createFileRoute("/ops")({
	head: () => ({ meta: [{ title: "Ops Command — FIFA World Cup 2026" }, {
		name: "description",
		content: "Stadium operations: crowd density, incidents, broadcast center."
	}] }),
	component: OpsPage
});
function OpsPage() {
	const { subscribe } = useWebSocket();
	const addIncident = useOpsStore((s) => s.addIncident);
	const updateIncident = useOpsStore((s) => s.updateIncident);
	const updateZone = useOpsStore((s) => s.updateZone);
	const [tab, setTab] = (0, import_react.useState)("map");
	(0, import_react.useEffect)(() => {
		const unsubNew = subscribe("incident:new", (data) => {
			addIncident(data);
		});
		const unsubUpdate = subscribe("incident:update", (data) => {
			const incident = data;
			updateIncident(incident.id, incident);
		});
		const unsubCrowd = subscribe("crowd:density-update", (data) => {
			const zone = data;
			updateZone(zone.id, zone);
		});
		return () => {
			unsubNew();
			unsubUpdate();
			unsubCrowd();
		};
	}, [
		subscribe,
		addIncident,
		updateIncident,
		updateZone
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex min-h-screen bg-background",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sidebar, {
				tab,
				setTab
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex-1",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Topbar, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
					className: "mx-auto max-w-[1400px] px-6 pb-24 pt-6",
					children: [
						tab === "map" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapView, {}),
						tab === "density" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DensityView, {}),
						tab === "incidents" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IncidentsView, {}),
						tab === "broadcast" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BroadcastView, {}),
						tab === "volunteers" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(VolunteerView, {}),
						tab === "sustainability" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SustainabilityView, {}),
						tab === "scheduling" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SchedulingView, {}),
						tab === "coordination" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CoordinationView, {})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ModeToggle, {})
		]
	});
}
var DEFAULT_MATCH = {
	id: "match-wc-01",
	homeTeam: {
		name: "USA",
		score: 2,
		logo: "🇺🇸"
	},
	awayTeam: {
		name: "Mexico",
		score: 1,
		logo: "🇲🇽"
	},
	venue: "MetLife Stadium",
	kickoffTime: (/* @__PURE__ */ new Date()).toISOString(),
	status: "live",
	minute: 67
};
var DEFAULT_EVENTS = [
	{
		id: "ev-1",
		type: "kickoff",
		team: "home",
		minute: 0,
		timestamp: Date.now() - 67 * 6e4
	},
	{
		id: "ev-2",
		type: "goal",
		team: "home",
		player: "Christian Pulisic",
		minute: 23,
		timestamp: Date.now() - 44 * 6e4
	},
	{
		id: "ev-3",
		type: "goal",
		team: "away",
		player: "Santiago Giménez",
		minute: 38,
		timestamp: Date.now() - 29 * 6e4
	},
	{
		id: "ev-4",
		type: "halftime",
		team: "home",
		minute: 45,
		timestamp: Date.now() - 22 * 6e4
	},
	{
		id: "ev-5",
		type: "goal",
		team: "home",
		player: "Folarin Balogun",
		minute: 55,
		timestamp: Date.now() - 12 * 6e4
	},
	{
		id: "ev-6",
		type: "card",
		team: "away",
		player: "Edson Álvarez",
		minute: 62,
		timestamp: Date.now() - 5 * 6e4
	}
];
var useMatchStore = create()(subscribeWithSelector((set) => ({
	currentMatch: DEFAULT_MATCH,
	events: DEFAULT_EVENTS,
	isLive: true,
	updateMatch: (match) => set({ currentMatch: match }),
	addEvent: (event) => set((state) => ({
		events: [...state.events, event],
		currentMatch: event.type === "goal" && state.currentMatch ? {
			...state.currentMatch,
			[event.team === "home" ? "homeTeam" : "awayTeam"]: {
				...state.currentMatch[event.team === "home" ? "homeTeam" : "awayTeam"],
				score: state.currentMatch[event.team === "home" ? "homeTeam" : "awayTeam"].score + 1
			}
		} : state.currentMatch
	})),
	setIsLive: (live) => set({ isLive: live }),
	reset: () => set({
		currentMatch: null,
		events: [],
		isLive: false
	})
})));
var useCurrentMatch = () => useMatchStore((state) => state.currentMatch);
var useMatchEvents = () => useMatchStore((state) => state.events);
var useIsLive = () => useMatchStore((state) => state.isLive);
/**
* Live match scoreboard + Groq-powered fan Q&A assistant.
* Wired to useMatchStore + useWebSocket.
*/
function MatchScoreboard({ lang = "English" }) {
	const match = useCurrentMatch();
	const events = useMatchEvents();
	const isLive = useIsLive();
	const { addEvent } = useMatchStore();
	const { subscribe } = useWebSocket();
	const [displayMinute, setDisplayMinute] = (0, import_react.useState)(match?.minute ?? 0);
	(0, import_react.useEffect)(() => {
		if (!isLive) return;
		const interval = setInterval(() => {
			setDisplayMinute((m) => Math.min(m + 1, 90));
		}, 6e4);
		return () => clearInterval(interval);
	}, [isLive]);
	(0, import_react.useEffect)(() => {
		setDisplayMinute(match?.minute ?? 0);
	}, [match?.minute]);
	(0, import_react.useEffect)(() => {
		const unsubGoal = subscribe("match:goal", (data) => addEvent(data));
		const unsubCard = subscribe("match:card", (data) => addEvent(data));
		const unsubSub = subscribe("match:substitution", (data) => addEvent(data));
		return () => {
			unsubGoal();
			unsubCard();
			unsubSub();
		};
	}, [subscribe, addEvent]);
	if (!match) return null;
	const recentEvents = [...events].reverse().slice(0, 5);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mt-5 space-y-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "rounded-3xl bg-white p-5 shadow-glow ring-1 ring-black/5",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brand",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Swords, { className: "h-4 w-4" }), "Live Match"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-1.5",
						children: [isLive && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "flex items-center gap-1 rounded-full bg-danger/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-danger",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-1.5 w-1.5 animate-pulse rounded-full bg-danger" }), "Live"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "flex items-center gap-1 rounded-full bg-secondary px-2 py-0.5 text-[10px] font-semibold text-muted-foreground",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "h-3 w-3" }),
								displayMinute,
								"'"
							]
						})]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-4 flex items-center justify-between gap-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-1 flex-col items-center gap-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-2xl",
								children: match.homeTeam.logo
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-center text-xs font-bold leading-tight text-foreground",
								children: match.homeTeam.name
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-col items-center",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-3 rounded-2xl bg-gradient-brand px-6 py-3 shadow-glow",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-3xl font-extrabold text-white tabular-nums",
										children: match.homeTeam.score
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-lg font-bold text-white/60",
										children: ":"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-3xl font-extrabold text-white tabular-nums",
										children: match.awayTeam.score
									})
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-1 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground",
								children: match.status === "halftime" ? "Half Time" : match.status === "fulltime" ? "Full Time" : match.venue
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-1 flex-col items-center gap-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-2xl",
								children: match.awayTeam.logo
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-center text-xs font-bold leading-tight text-foreground",
								children: match.awayTeam.name
							})]
						})
					]
				}),
				recentEvents.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-4 space-y-1.5 border-t border-border pt-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mb-2 text-[10px] font-bold uppercase tracking-wider text-muted-foreground",
						children: "Recent Events"
					}), recentEvents.map((ev) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EventRow, { event: ev }, ev.id))]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-3 flex items-center gap-1 text-[10px] text-muted-foreground",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wifi, { className: "h-3 w-3" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Real-time · mock data active" })]
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AskGroqWidget, {
			venue: match.venue,
			lang
		})]
	});
}
function EventRow({ event }) {
	const emoji = event.type === "goal" ? "⚽" : event.type === "card" ? "🟨" : event.type === "substitution" ? "🔄" : event.type === "halftime" ? "🔔" : event.type === "kickoff" ? "🏁" : "⏱";
	const teamColor = event.team === "home" ? "text-brand" : "text-danger";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-center gap-2 rounded-xl px-2 py-1 hover:bg-secondary/50",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "w-6 text-center text-xs",
				children: emoji
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "w-8 text-[10px] font-bold text-muted-foreground tabular-nums",
				children: [event.minute, "'"]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: `flex-1 text-xs font-semibold ${teamColor}`,
				children: event.player || event.type.charAt(0).toUpperCase() + event.type.slice(1)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-[10px] capitalize text-muted-foreground",
				children: event.team
			})
		]
	});
}
function AskGroqWidget({ venue, lang = "English" }) {
	const [question, setQuestion] = (0, import_react.useState)("");
	const [answer, setAnswer] = (0, import_react.useState)(null);
	const [busy, setBusy] = (0, import_react.useState)(false);
	const askFn = useServerFn(askGroqAssistant);
	const QUICK = (0, import_react.useMemo)(() => [
		"Where's the nearest toilet?",
		"When does the match end?",
		"How do I get to MetLife Stadium by train?",
		"Where is the shuttle bus pickup?"
	], []);
	const ask = async (q) => {
		if (!q.trim() || busy) return;
		setBusy(true);
		setAnswer(null);
		try {
			setAnswer((await askFn({ data: {
				question: q.trim(),
				context: `Venue: ${venue}. Match is currently live. Transport info: Nearest train is Meadowlands Rail Station. Free shuttle buses available at Lot C.`,
				lang
			} })).answer);
		} catch {
			setAnswer("Assistant temporarily unavailable.");
		} finally {
			setBusy(false);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mt-5 rounded-3xl bg-white p-5 shadow-glow ring-1 ring-black/5",
		role: "region",
		"aria-label": "AI Fan Assistant",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brand",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageSquare, { className: "h-4 w-4" }), " AI Assistant"]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-1 text-sm text-muted-foreground",
				children: "Powered by Groq · LLaMA 3.3 70B"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-4 flex flex-wrap gap-2",
				children: QUICK.map((q) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: () => {
						setQuestion(q);
						ask(q);
					},
					className: "rounded-full border border-border px-3 py-1.5 text-xs font-medium text-foreground transition hover:border-brand hover:text-brand",
					"aria-label": `Ask: ${q}`,
					children: q
				}, q))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 flex items-center gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					className: "flex-1 rounded-2xl border border-border bg-secondary/50 px-4 py-3 text-sm outline-none transition focus:border-brand focus:ring-1 focus:ring-brand",
					placeholder: "Ask a question...",
					value: question,
					onChange: (e) => setQuestion(e.target.value),
					onKeyDown: (e) => e.key === "Enter" && ask(question),
					"aria-label": "Ask the AI a question"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: () => ask(question),
					disabled: busy || !question.trim(),
					className: "flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand text-white transition hover:scale-105 disabled:opacity-50",
					"aria-label": "Send question",
					children: busy ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-5 w-5 animate-spin" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Send, { className: "h-4 w-4" })
				})]
			}),
			(busy || answer) && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 rounded-2xl bg-brand-soft p-4",
				"aria-live": "polite",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider text-brand",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-1.5 w-1.5 animate-pulse rounded-full bg-brand" }), " AI Answer"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-2 text-sm font-medium text-foreground",
					children: busy ? "Thinking..." : answer
				})]
			})
		]
	});
}
var Route$5 = createFileRoute("/fan")({
	head: () => ({ meta: [{ title: "Fan PWA — FIFA World Cup 2026" }, {
		name: "description",
		content: "Find your way, get real-time alerts, arrive comfortably."
	}] }),
	component: FanPage
});
var LANGS = [
	"English",
	"Español",
	"Français",
	"العربية",
	"Português"
];
function stepIcon(k) {
	const cls = "h-4 w-4";
	return k === "start" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Flag, { className: cls }) : k === "turn" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronsRight, { className: cls }) : k === "stairs" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUp, { className: cls }) : k === "elevator" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpFromLine, { className: cls }) : k === "escalator" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUp, { className: cls }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: cls });
}
function FanPage() {
	const [start, setStart] = (0, import_react.useState)("Gate B");
	const [dest, setDest] = (0, import_react.useState)("Section 101");
	const [wheelchair, setW] = (0, import_react.useState)(false);
	const [visual, setV] = (0, import_react.useState)(false);
	const [lowSensory, setL] = (0, import_react.useState)(false);
	const [lang, setLang] = (0, import_react.useState)("English");
	const [dismissed, setDismissed] = (0, import_react.useState)(null);
	const calc = useServerFn(calculateRoute);
	const routeMut = useMutation({ mutationFn: () => calc({ data: {
		start,
		destination: dest,
		wheelchair,
		visualAssist: visual,
		lowSensory,
		lang
	} }) });
	const broadcast = useLatestBroadcast();
	const showBroadcast = broadcast && dismissed !== broadcast.id;
	const bcColor = (0, import_react.useMemo)(() => {
		if (!broadcast) return "";
		return broadcast.severity === "critical" ? "from-danger to-[#c026d3]" : broadcast.severity === "warning" ? "from-warning to-danger" : "from-brand to-brand-2";
	}, [broadcast]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative min-h-screen bg-background",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "pointer-events-none absolute inset-x-0 top-0 h-72 bg-gradient-brand opacity-90" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "pointer-events-none absolute inset-x-0 top-0 h-72 bg-[radial-gradient(circle_at_top,white,transparent_60%)] opacity-30" }),
			showBroadcast && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "sticky top-0 z-40 px-3 pt-3",
				"aria-live": "assertive",
				role: "alert",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: `glass overflow-hidden rounded-2xl bg-gradient-to-r ${bcColor} p-[1px] shadow-glow`,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-start gap-3 rounded-2xl bg-white/95 p-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: `mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-gradient-to-r ${bcColor} text-white`,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bell, { className: "h-4 w-4" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "min-w-0 flex-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "flex items-center gap-2",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "text-[10px] font-bold uppercase tracking-wider text-muted-foreground",
										children: [
											broadcast.severity,
											" · ",
											lang
										]
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm font-semibold leading-snug text-foreground",
									children: broadcast.message
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => setDismissed(broadcast.id),
								className: "rounded-full p-1 text-muted-foreground hover:bg-muted",
								"aria-label": "Dismiss",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-4 w-4" })
							})
						]
					})
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative mx-auto max-w-md px-4 pt-6 pb-32 md:max-w-lg",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-2xl border border-white/20 bg-white/10 px-4 py-2.5 flex items-center justify-between text-xs text-white font-bold mb-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "👥 Target Stakeholders: Fans" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "flex items-center gap-1.5 uppercase tracking-wider text-[10px]",
							children: "♿ Accessible PWA Active"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between text-white",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-[11px] font-semibold uppercase tracking-widest opacity-80",
							children: "FIFA WC 2026"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "text-2xl font-bold",
							children: "Hey, Fan 👋"
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "glass flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold text-white",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Languages, { className: "h-3.5 w-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
								value: lang,
								onChange: (e) => setLang(e.target.value),
								className: "bg-transparent text-white outline-none",
								children: LANGS.map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									className: "text-foreground",
									value: l,
									children: l
								}, l))
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-5 rounded-3xl bg-white p-5 shadow-glow ring-1 ring-black/5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brand",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navigation, { className: "h-4 w-4" }), " Wayfinding"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "mt-1 text-xl font-bold",
								children: "Where to next?"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-4 space-y-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
									icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "h-4 w-4 text-brand" }),
									label: "Start",
									value: start,
									onChange: setStart,
									placeholder: "e.g. Gate B"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
									icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Flag, { className: "h-4 w-4 text-brand-2" }),
									label: "Destination",
									value: dest,
									onChange: setDest,
									placeholder: "e.g. Section 101"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground",
									children: "Accessibility"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid grid-cols-3 gap-2",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toggle, {
											label: "Wheelchair",
											icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Accessibility, { className: "h-4 w-4" }),
											on: wheelchair,
											onChange: setW
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toggle, {
											label: "Visual",
											icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, { className: "h-4 w-4" }),
											on: visual,
											onChange: setV
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toggle, {
											label: "Low-sensory",
											icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Volume2, { className: "h-4 w-4" }),
											on: lowSensory,
											onChange: setL
										})
									]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => routeMut.mutate(),
								disabled: routeMut.isPending,
								className: "mt-5 flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-brand px-5 py-3.5 text-sm font-bold text-white shadow-glow transition hover:-translate-y-0.5 disabled:opacity-70",
								children: routeMut.isPending ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-4 w-4 animate-spin" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: ["Get Route ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-4 w-4" })] })
							})
						]
					}),
					routeMut.data && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-5 space-y-4",
						"aria-live": "polite",
						"aria-atomic": "true",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid grid-cols-2 gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Metric, {
									icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "h-4 w-4" }),
									label: "ETA",
									value: `${routeMut.data.etaMinutes} min`,
									tone: "brand"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Metric, {
									icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ruler, { className: "h-4 w-4" }),
									label: "Distance",
									value: `${routeMut.data.distanceM} m`,
									tone: "cyan"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-3xl bg-white p-5 shadow-soft ring-1 ring-border",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brand",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Footprints, { className: "h-4 w-4" }), " Step by step"]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
									className: "space-y-3",
									children: routeMut.data.steps.map((s, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
										className: "flex items-start gap-3",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-gradient-brand-soft text-brand",
											children: stepIcon(s.icon)
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "min-w-0 flex-1",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "text-sm font-semibold",
												children: s.instruction
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "text-xs text-muted-foreground",
												children: [s.distanceM, " m"]
											})]
										})]
									}, i))
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-2xl bg-gradient-brand-soft p-4 ring-1 ring-brand/20",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brand",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-4 w-4" }), " Personalized notes"]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
									className: "space-y-1.5",
									children: routeMut.data.accessibilityNotes.map((n, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
										className: "text-sm text-foreground/80",
										children: ["• ", n]
									}, i))
								})]
							})
						]
					}),
					routeMut.error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-4 rounded-2xl bg-danger/10 p-4 text-sm text-danger",
						children: routeMut.error.message
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MatchScoreboard, { lang })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ModeToggle, {})
		]
	});
}
function Field({ icon, label, value, onChange, placeholder }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
		className: "block",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "mb-1 block text-xs font-semibold text-muted-foreground",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: "flex items-center gap-2 rounded-2xl border border-border bg-secondary/50 px-3 py-3 focus-within:ring-2 focus-within:ring-brand/40",
			children: [icon, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				value,
				onChange: (e) => onChange(e.target.value),
				placeholder,
				className: "min-w-0 flex-1 bg-transparent text-sm font-medium outline-none placeholder:text-muted-foreground/60"
			})]
		})]
	});
}
function Toggle({ label, icon, on, onChange }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		type: "button",
		onClick: () => onChange(!on),
		className: `flex flex-col items-center gap-1.5 rounded-2xl border p-3 text-xs font-semibold transition ${on ? "border-transparent bg-gradient-brand text-white shadow-glow" : "border-border bg-white text-foreground/70 hover:border-brand/30"}`,
		children: [icon, label]
	});
}
function Metric({ icon, label, value, tone }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-2xl bg-white p-4 shadow-soft ring-1 ring-border",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: `flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider ${tone === "brand" ? "text-brand" : "text-cyan"}`,
			children: [icon, label]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-1 text-2xl font-extrabold",
			children: value
		})]
	});
}
var $$splitComponentImporter = () => import("./routes-GLCO7jgX.mjs");
var Route$4 = createFileRoute("/")({ component: lazyRouteComponent($$splitComponentImporter, "component") });
/**
* Returns a standardized successful JSON Response.
*
* @template T
* @param {T} data - The payload data to return.
* @param {number} [status=200] - HTTP status code.
* @returns {Response} Standardized Response object.
*/
function createSuccessResponse(data, status = 200) {
	return new Response(JSON.stringify({
		success: true,
		data,
		error: null
	}), {
		status,
		headers: { "Content-Type": "application/json" }
	});
}
/**
* Returns a standardized error JSON Response.
*
* @param {string} errorMessage - Description of the error.
* @param {number} [status=500] - HTTP status code.
* @returns {Response} Standardized Response object.
*/
function createErrorResponse(errorMessage, status = 500) {
	return new Response(JSON.stringify({
		success: false,
		data: null,
		error: errorMessage
	}), {
		status,
		headers: { "Content-Type": "application/json" }
	});
}
var startEpoch = Date.now();
/**
* RESTful endpoint /api/system.
* Returns core system metrics and uptime conforming to the unified JSON Contract.
*/
var Route$3 = createFileRoute("/api/system")({ server: { handlers: { GET: async ({ request }) => {
	try {
		const metrics = {
			status: "healthy",
			uptimeSeconds: Math.floor((Date.now() - startEpoch) / 1e3),
			timestamp: (/* @__PURE__ */ new Date()).toISOString(),
			environment: "production",
			version: "1.0.0"
		};
		if (!metrics.status) return createErrorResponse("System status is degraded", 503);
		return createSuccessResponse(metrics);
	} catch (error) {
		return createErrorResponse(error instanceof Error ? error.message : "Internal server error", 500);
	}
} } } });
z.object({
	title: z.string().min(3).max(100),
	description: z.string().min(5).max(2e3),
	type: z.enum([
		"medical",
		"security",
		"logistics",
		"crowd"
	]),
	zoneId: z.string().min(2).max(10),
	locationDetails: z.string().min(3).max(200)
});
z.object({
	zoneId: z.string().min(2).max(10),
	density: z.number().min(0).max(100),
	volunteersCount: z.number().nonnegative().optional()
});
var VolunteerDispatchSchema = z.object({
	volunteerId: z.string().min(3).max(50),
	zoneId: z.string().min(2).max(10),
	task: z.string().min(3).max(200)
});
/**
* FIFA 2026 Crowd Density Update Schema — validates real-time
* crowd sensor payloads for the density_update API action.
*/
var CrowdDensityUpdateSchema = z.object({
	stadiumZone: z.string().min(3, { message: "Stadium zone identifier must be at least 3 characters long." }),
	currentCapacity: z.number().min(0, { message: "Capacity percentage must be between 0 and 100." }).max(100, { message: "Capacity percentage must be between 0 and 100." }),
	densityStatus: z.enum([
		"LOW",
		"MODERATE",
		"HIGH",
		"CRITICAL"
	]),
	flowRatePerMinute: z.number().nonnegative(),
	timestamp: z.string().datetime()
});
/**
* FIFA 2026 Incident Report V2 Schema — validates structured
* incident reports for the report_incident API action.
*/
var IncidentReportV2Schema = z.object({
	incidentId: z.string().uuid(),
	category: z.enum([
		"CROWD_CONGESTION",
		"MEDICAL_EMERGENCY",
		"SECURITY_BREACH",
		"INFRASTRUCTURE",
		"WEATHER",
		"OTHER"
	]),
	locationDescription: z.string().min(5).max(500),
	severityLevel: z.enum([
		"MINOR",
		"MODERATE",
		"MAJOR",
		"CRITICAL"
	]),
	reportedInLanguage: z.string().min(2).max(10),
	reportedAt: z.string().datetime()
});
var LruCache = class {
	cache = /* @__PURE__ */ new Map();
	maxEntries;
	defaultTtlMs;
	constructor(maxEntries = 100, defaultTtlMs = 15e3) {
		this.maxEntries = maxEntries;
		this.defaultTtlMs = defaultTtlMs;
	}
	/**
	* Retrieves an item from the cache if it hasn't expired.
	*/
	get(key) {
		const entry = this.cache.get(key);
		if (!entry) return null;
		if (Date.now() > entry.expiresAt) {
			this.cache.delete(key);
			return null;
		}
		this.cache.delete(key);
		this.cache.set(key, entry);
		return entry.value;
	}
	/**
	* Inserts or updates an item in the cache.
	*/
	set(key, value, ttlMs = this.defaultTtlMs) {
		if (this.cache.has(key)) this.cache.delete(key);
		else if (this.cache.size >= this.maxEntries) {
			const oldestKey = this.cache.keys().next().value;
			if (oldestKey !== void 0) this.cache.delete(oldestKey);
		}
		this.cache.set(key, {
			value,
			expiresAt: Date.now() + ttlMs
		});
	}
	/**
	* Invalidates a specific key.
	*/
	delete(key) {
		return this.cache.delete(key);
	}
	/**
	* Clears the entire cache map.
	*/
	clear() {
		this.cache.clear();
	}
	/**
	* Returns current active size.
	*/
	size() {
		return this.cache.size;
	}
};
var crowdDensityCache = new LruCache(50, 1e4);
new LruCache(10, 5e3);
var RouteSchema = z.object({
	start: z.string().max(100),
	destination: z.string().max(100),
	wheelchair: z.boolean().default(false),
	visualAssist: z.boolean().default(false),
	lowSensory: z.boolean().default(false),
	lang: z.string().max(50).optional()
});
var TriageSchema = z.object({ report: z.string().max(2e3) });
/**
* Handles operations under /api/stadium.
* Supports:
* - POST /api/stadium?action=route -> Calculates AI-powered accessible routing.
* - POST /api/stadium?action=triage -> Triages incidents using AI.
* - POST /api/stadium?action=density_update -> Validates crowd density sensor payloads.
* - POST /api/stadium?action=report_incident -> Validates structured incident reports.
* - POST /api/stadium?action=volunteer_dispatch -> Validates volunteer dispatch tasks.
* - GET /api/stadium?action=density -> Fetches crowd density mock metrics.
*
* Personas: Fans, Organizers, Volunteers, Security Command, Medical Teams, Venue Staff.
*/
var Route$2 = createFileRoute("/api/stadium")({ server: { handlers: {
	GET: async ({ request }) => {
		try {
			if (new URL(request.url).searchParams.get("action") !== "density") return createErrorResponse("Invalid action parameter for GET request", 400);
			const cacheKey = "all_zones_density";
			const cachedData = crowdDensityCache.get(cacheKey);
			if (cachedData) {
				console.info("[caching] Returning cached crowd density metrics");
				return createSuccessResponse(cachedData);
			}
			const densityData = {
				stadium: "MetLife Stadium (FIFA WC 2026)",
				zones: [
					{
						id: "gate-a",
						name: "Gate A (Concourse)",
						occupancyPercentage: 84,
						status: "Critical"
					},
					{
						id: "gate-b",
						name: "Gate B (Entry)",
						occupancyPercentage: 42,
						status: "Normal"
					},
					{
						id: "section-101",
						name: "Section 101 (Seats)",
						occupancyPercentage: 92,
						status: "Critical"
					},
					{
						id: "food-court-west",
						name: "Food Court West",
						occupancyPercentage: 65,
						status: "Warning"
					}
				],
				timestamp: (/* @__PURE__ */ new Date()).toISOString()
			};
			crowdDensityCache.set(cacheKey, densityData);
			return createSuccessResponse(densityData);
		} catch (error) {
			return createErrorResponse(error instanceof Error ? error.message : "Internal server error", 500);
		}
	},
	POST: async ({ request }) => {
		try {
			const action = new URL(request.url).searchParams.get("action");
			if (!action) return createErrorResponse("Missing action parameter", 400);
			const body = await request.json();
			if (action === "route") {
				const validated = RouteSchema.safeParse(body);
				if (!validated.success) return createErrorResponse("Invalid route request body", 400);
				const { calculateRoute } = await import("./ops.functions-DIWQRFJH.mjs");
				return createSuccessResponse(await calculateRoute({ data: validated.data }));
			}
			if (action === "triage") {
				const validated = TriageSchema.safeParse(body);
				if (!validated.success) return createErrorResponse("Invalid triage request body", 400);
				crowdDensityCache.delete("all_zones_density");
				console.info("[caching] Invalided crowd density cache due to triage event");
				const { triageIncident } = await import("./ops.functions-DIWQRFJH.mjs");
				return createSuccessResponse(await triageIncident({ data: validated.data }));
			}
			if (action === "density_update") {
				const validated = CrowdDensityUpdateSchema.safeParse(body);
				if (!validated.success) return createErrorResponse(validated.error.errors[0]?.message ?? "Invalid density payload", 400);
				crowdDensityCache.delete("all_zones_density");
				return createSuccessResponse({
					data: validated.data,
					receivedAt: (/* @__PURE__ */ new Date()).toISOString()
				});
			}
			if (action === "report_incident") {
				const validated = IncidentReportV2Schema.safeParse(body);
				if (!validated.success) return createErrorResponse(validated.error.errors[0]?.message ?? "Invalid incident payload", 400);
				crowdDensityCache.delete("all_zones_density");
				return createSuccessResponse({
					data: validated.data,
					receivedAt: (/* @__PURE__ */ new Date()).toISOString()
				});
			}
			if (action === "volunteer_dispatch") {
				const validated = VolunteerDispatchSchema.safeParse(body);
				if (!validated.success) return createErrorResponse(validated.error.errors[0]?.message ?? "Invalid dispatch payload", 400);
				return createSuccessResponse({
					data: validated.data,
					dispatchedAt: (/* @__PURE__ */ new Date()).toISOString()
				});
			}
			return createErrorResponse(`Unsupported action: ${action}`, 400);
		} catch (error) {
			return createErrorResponse(error instanceof Error ? error.message : "Internal server error", 500);
		}
	}
} } });
/**
* RESTful endpoint /api/healthz.
* Returns simple health status conforming to the unified JSON Contract.
*/
var Route$1 = createFileRoute("/api/healthz")({ server: { handlers: { GET: async ({ request }) => {
	try {
		const health = {
			status: "OK",
			timestamp: (/* @__PURE__ */ new Date()).toISOString()
		};
		if (health.status !== "OK") return createErrorResponse("Health check failed", 500);
		return createSuccessResponse(health);
	} catch (error) {
		return createErrorResponse(error instanceof Error ? error.message : "Internal server error", 500);
	}
} } } });
var AssistantSchema = z.object({
	question: z.string().max(500),
	context: z.string().max(1e3),
	lang: z.string().max(50).default("English")
});
/**
* Handles operations under /api/assistant.
* Supports:
* - POST /api/assistant -> Asks the Groq GenAI assistant with contextual data.
*
* Personas: Fans, Volunteers.
*/
var Route = createFileRoute("/api/assistant")({ server: { handlers: { POST: async ({ request }) => {
	try {
		const body = await request.json();
		const validated = AssistantSchema.safeParse(body);
		if (!validated.success) return createErrorResponse("Invalid assistant request payload", 400);
		const { askGroqAssistant } = await import("./ops.functions-DIWQRFJH.mjs");
		return createSuccessResponse(await askGroqAssistant({ data: validated.data }));
	} catch (error) {
		return createErrorResponse(error instanceof Error ? error.message : "Internal server error", 500);
	}
} } } });
var OpsRoute = Route$6.update({
	id: "/ops",
	path: "/ops",
	getParentRoute: () => Route$7
});
var FanRoute = Route$5.update({
	id: "/fan",
	path: "/fan",
	getParentRoute: () => Route$7
});
var IndexRoute = Route$4.update({
	id: "/",
	path: "/",
	getParentRoute: () => Route$7
});
var ApiSystemRoute = Route$3.update({
	id: "/api/system",
	path: "/api/system",
	getParentRoute: () => Route$7
});
var ApiStadiumRoute = Route$2.update({
	id: "/api/stadium",
	path: "/api/stadium",
	getParentRoute: () => Route$7
});
var ApiHealthzRoute = Route$1.update({
	id: "/api/healthz",
	path: "/api/healthz",
	getParentRoute: () => Route$7
});
var rootRouteChildren = {
	IndexRoute,
	FanRoute,
	OpsRoute,
	ApiAssistantRoute: Route.update({
		id: "/api/assistant",
		path: "/api/assistant",
		getParentRoute: () => Route$7
	}),
	ApiHealthzRoute,
	ApiStadiumRoute,
	ApiSystemRoute
};
var routeTree = Route$7._addFileChildren(rootRouteChildren)._addFileTypes();
var getRouter = () => {
	return createRouter({
		routeTree,
		context: { queryClient: new QueryClient() },
		scrollRestoration: true,
		defaultPreloadStaleTime: 0
	});
};
//#endregion
export { getRouter, calculateRoute as n, triageIncident as r, askGroqAssistant as t };
