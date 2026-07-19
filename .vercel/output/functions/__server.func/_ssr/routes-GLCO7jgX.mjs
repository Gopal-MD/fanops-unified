import { r as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { G as Activity, S as Monitor, T as MapPin, d as Sparkles, f as Smartphone, y as Radio } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-GLCO7jgX.js
var import_jsx_runtime = require_jsx_runtime();
function Landing() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative min-h-screen overflow-hidden bg-background",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "pointer-events-none absolute inset-0",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute -top-40 -left-40 h-[500px] w-[500px] rounded-full bg-gradient-brand opacity-30 blur-3xl" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute -bottom-40 -right-40 h-[500px] w-[500px] rounded-full bg-gradient-cyan opacity-25 blur-3xl" })]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
			className: "relative mx-auto max-w-6xl px-6 pb-32 pt-16 md:pt-24",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2 text-sm font-semibold text-brand",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "inline-flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-brand text-white shadow-glow",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-4 w-4" })
					}), "MatchDay Command"]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
					className: "mt-8 max-w-3xl text-5xl font-extrabold leading-[1.05] tracking-tight md:text-7xl",
					children: [
						"Stadium ops and fan flow,",
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-gradient-brand",
							children: "in one command deck."
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-6 max-w-2xl text-lg text-muted-foreground",
					children: "Unified operations dashboard and mobile fan PWA — real-time crowd density, AI-triaged incidents, accessible wayfinding, and instant multilingual broadcasts. Built for MatchDay."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-10 grid gap-5 md:grid-cols-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/fan",
						className: "group relative overflow-hidden rounded-3xl bg-white p-8 shadow-soft ring-1 ring-border transition hover:-translate-y-1 hover:shadow-glow",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-x-0 top-0 h-1 bg-gradient-brand" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-brand-soft text-brand",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Smartphone, { className: "h-6 w-6" })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "rounded-full bg-brand/10 px-3 py-1 text-xs font-semibold text-brand",
									children: "Mobile PWA"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "mt-6 text-2xl font-bold",
								children: "Fan Experience"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-sm text-muted-foreground",
								children: "Accessible wayfinding, ETA-aware routes, live emergency alerts translated into your language."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-6 flex items-center gap-2 text-sm font-semibold text-brand",
								children: ["Enter Fan Mode", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									"aria-hidden": true,
									className: "transition group-hover:translate-x-1",
									children: "→"
								})]
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/ops",
						className: "group relative overflow-hidden rounded-3xl bg-white p-8 shadow-soft ring-1 ring-border transition hover:-translate-y-1 hover:shadow-glow",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-x-0 top-0 h-1 bg-gradient-cyan" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan/10 text-cyan",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Monitor, { className: "h-6 w-6" })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "rounded-full bg-cyan/10 px-3 py-1 text-xs font-semibold text-cyan",
									children: "Desktop Dashboard"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "mt-6 text-2xl font-bold",
								children: "Ops Command"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-sm text-muted-foreground",
								children: "Live crowd map, AI incident triage, Kanban response workflow, one-tap broadcast center."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-6 flex items-center gap-2 text-sm font-semibold text-cyan",
								children: ["Enter Ops Mode", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									"aria-hidden": true,
									className: "transition group-hover:translate-x-1",
									children: "→"
								})]
							})
						]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-16 grid gap-4 md:grid-cols-3",
					children: [
						{
							icon: MapPin,
							title: "Accessible Routing",
							body: "Wheelchair, visual-assist and low-sensory paths."
						},
						{
							icon: Activity,
							title: "Live Density",
							body: "Zone-by-zone occupancy with color-graded severity."
						},
						{
							icon: Radio,
							title: "Instant Broadcast",
							body: "Ops → Fan PWA in under a second."
						}
					].map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-2xl bg-white p-5 shadow-soft ring-1 ring-border",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(f.icon, { className: "h-5 w-5 text-brand" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-3 font-semibold",
								children: f.title
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-sm text-muted-foreground",
								children: f.body
							})
						]
					}, f.title))
				})
			]
		})]
	});
}
//#endregion
export { Landing as component };
