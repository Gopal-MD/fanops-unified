import { r as createServerFn, t as TSS_SERVER_FUNCTION } from "./ssr.mjs";
import { n as findShortestPath, r as getLocalizedInstruction, t as STADIUM_ZONES } from "./routing-CkGXTZRe.mjs";
import { t as z } from "../_libs/zod.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/ops.functions-BBJ7EXSN.js
var createServerRpc = (serverFnMeta, splitImportFn) => {
	const url = "/_serverFn/" + serverFnMeta.id;
	return Object.assign(splitImportFn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var calculateRoute_createServerFn_handler = createServerRpc({
	id: "c98c4b820457d24665b6a9a7bd7c0bde0d88867ed5af3aac228a136161958c45",
	name: "calculateRoute",
	filename: "src/lib/ops.functions.ts"
}, (opts) => calculateRoute.__executeServer(opts));
var calculateRoute = createServerFn({ method: "POST" }).validator((data) => {
	return z.object({
		start: z.string().max(100),
		destination: z.string().max(100),
		wheelchair: z.boolean(),
		visualAssist: z.boolean(),
		lowSensory: z.boolean(),
		lang: z.string().max(50).optional()
	}).parse(data);
}).handler(calculateRoute_createServerFn_handler, async ({ data }) => {
	const { start, destination, wheelchair, visualAssist, lowSensory, lang = "English" } = data;
	const key = process.env.GROQ_API_KEY;
	const resolvedRoute = findShortestPath(start, destination, {
		wheelchair,
		lowSensory
	});
	if (!resolvedRoute) {
		console.warn(`[routing] No route found from ${start} to ${destination}`);
		return {
			etaMinutes: 5,
			distanceM: 0,
			steps: [{
				instruction: `Proceed directly to ${destination}.`,
				distanceM: 0,
				icon: "start"
			}],
			accessibilityNotes: ["No route found matching accessibility constraints."]
		};
	}
	const steps = resolvedRoute.path.map((edge, idx) => {
		const isFinal = idx === resolvedRoute.path.length - 1;
		const targetZone = STADIUM_ZONES[edge.to];
		const name = targetZone.names[lang] || targetZone.names["English"] || edge.to;
		const icon = edge.means === "stairs" ? "stairs" : edge.means === "elevator" ? "elevator" : edge.means === "ramp" ? "elevator" : "turn";
		return {
			instruction: getLocalizedInstruction(edge, name, isFinal, lang),
			distanceM: edge.distance,
			icon
		};
	});
	const paceMps = wheelchair ? .8 : 1.3;
	const etaMinutes = Math.max(1, Math.round(resolvedRoute.totalDistance / paceMps / 60));
	const notes = [];
	if (wheelchair) notes.push(lang === "Español" ? "Ruta sin escaleras seleccionada. Ascensores priorizados." : "Step-free route selected. Elevators prioritized.");
	if (visualAssist) notes.push(lang === "Español" ? "Guía por audio disponible en el camino." : "Audio guidance & high-contrast signage available along route.");
	if (lowSensory) notes.push(lang === "Español" ? "Ruta de bajo estímulo seleccionada." : "Quiet corridor selected. Avoids busy food courts.");
	if (!key) {
		console.info("[calculateRoute] GROQ_API_KEY missing. Returning deterministic path.");
		return {
			etaMinutes,
			distanceM: resolvedRoute.totalDistance,
			steps,
			accessibilityNotes: notes
		};
	}
	try {
		const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${key}`
			},
			body: JSON.stringify({
				model: "llama-3.3-70b-versatile",
				temperature: .2,
				max_tokens: 300,
				response_format: { type: "json_object" },
				messages: [{
					role: "system",
					content: "You are the FIFA World Cup 2026 Stadium Navigation Phrasing AI. Phrase the route steps in natural language for the fan. Do NOT invent zones or facilities that are not in the input. Ensure the reply matches the requested language. Respond ONLY with valid JSON matching this schema: {\"etaMinutes\": number, \"distanceM\": number, \"steps\": [{\"instruction\": string, \"distanceM\": number, \"icon\": string}], \"accessibilityNotes\": [string]}."
				}, {
					role: "user",
					content: `Language: ${lang}. Start: ${start}. Destination: ${destination}. Total Distance: ${resolvedRoute.totalDistance}m. ETA: ${etaMinutes} mins. Input Steps: ${JSON.stringify(steps)}. Accessibility Notes: ${JSON.stringify(notes)}.`
				}]
			})
		});
		if (!res.ok) throw new Error("Failed to phrase route from Groq.");
		const content = (await res.json()).choices?.[0]?.message?.content ?? "{}";
		const result = JSON.parse(content);
		if (!result.steps || result.steps.length === 0) throw new Error("Invalid format");
		return result;
	} catch (e) {
		console.error("[calculateRoute] AI route phrasing failed, returning deterministic steps:", e);
		return {
			etaMinutes,
			distanceM: resolvedRoute.totalDistance,
			steps,
			accessibilityNotes: notes
		};
	}
});
var triageIncident_createServerFn_handler = createServerRpc({
	id: "296b2ae78a6291faf32e443e7039b62560e8019d4b3ccb329f2d9429d36d5afd",
	name: "triageIncident",
	filename: "src/lib/ops.functions.ts"
}, (opts) => triageIncident.__executeServer(opts));
var triageIncident = createServerFn({ method: "POST" }).validator((data) => {
	return z.object({ report: z.string().max(2e3) }).parse(data);
}).handler(triageIncident_createServerFn_handler, async ({ data }) => {
	const { triageIncidentWithAI } = await import("./ai-gateway.server-CVPHV4bb.mjs");
	return triageIncidentWithAI(data.report);
});
var askGroqAssistant_createServerFn_handler = createServerRpc({
	id: "c6b4dd67b03e518a5fad3f58069fc9c62ff23f60df535dea7e97070e52c1958b",
	name: "askGroqAssistant",
	filename: "src/lib/ops.functions.ts"
}, (opts) => askGroqAssistant.__executeServer(opts));
var askGroqAssistant = createServerFn({ method: "POST" }).validator((data) => {
	return z.object({
		question: z.string().max(500),
		context: z.string().max(1e3),
		lang: z.string().max(50).optional()
	}).parse(data);
}).handler(askGroqAssistant_createServerFn_handler, async ({ data }) => {
	const key = process.env.GROQ_API_KEY;
	if (!key) return { answer: "AI assistant unavailable — GROQ_API_KEY not configured." };
	const languageInstruction = data.lang && data.lang !== "English" ? ` Please reply in ${data.lang}.` : "";
	const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${key}`
		},
		body: JSON.stringify({
			model: "llama-3.3-70b-versatile",
			temperature: .4,
			max_tokens: 150,
			messages: [{
				role: "system",
				content: "You are the Official FIFA World Cup 2026 Multilingual Fan & Volunteer Assistant. Your persona is a helpful and professional Tournament Ambassador. Provide quick, practical operational intelligence support to Fans, Organizers, Volunteers, and Venue Staff. Cover questions about match info, navigation, accessibility, crowd density redirection, and transit/transport dispatch. Keep answers concise (1-2 sentences) and warm." + languageInstruction
			}, {
				role: "user",
				content: `Context: ${data.context}\n\nFan question: ${data.question}`
			}]
		})
	});
	if (!res.ok) return { answer: "Sorry, I couldn't fetch an answer right now. Please ask a staff member for help." };
	return { answer: (await res.json()).choices?.[0]?.message?.content?.trim() ?? "I'm not sure — please ask nearby staff." };
});
//#endregion
export { askGroqAssistant_createServerFn_handler, calculateRoute_createServerFn_handler, triageIncident_createServerFn_handler };
