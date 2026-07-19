//#region node_modules/.nitro/vite/services/ssr/assets/routing-CkGXTZRe.js
var STADIUM_ZONES = {
	gA: {
		id: "gA",
		names: {
			English: "Gate A (Main West)",
			Español: "Puerta A (Principal Oeste)",
			Français: "Porte A (Principale Ouest)"
		},
		type: "gate",
		level: "ground"
	},
	gB: {
		id: "gB",
		names: {
			English: "Gate B (VIP South)",
			Español: "Puerta B (VIP Sur)",
			Français: "Porte B (VIP Sud)"
		},
		type: "gate",
		level: "ground"
	},
	gC: {
		id: "gC",
		names: {
			English: "Gate C (Transit East)",
			Español: "Puerta C (Tránsito Este)",
			Français: "Porte C (Transit Est)"
		},
		type: "gate",
		level: "ground"
	},
	gD: {
		id: "gD",
		names: {
			English: "Gate D (North Concourse)",
			Español: "Puerta D (Norte)",
			Français: "Porte D (Nord)"
		},
		type: "gate",
		level: "ground"
	},
	food: {
		id: "food",
		names: {
			English: "Food Court North",
			Español: "Plaza de Comidas Norte",
			Français: "Zone de Restauration Nord"
		},
		type: "concourse",
		level: "lower",
		isHighSensory: true
	},
	conc: {
		id: "conc",
		names: {
			English: "Concourse East",
			Español: "Vestíbulo Este",
			Français: "Hall Est"
		},
		type: "concourse",
		level: "lower"
	},
	s101: {
		id: "s101",
		names: {
			English: "Section 101 Seating (Lower Bowl)",
			Español: "Asientos Sección 101",
			Français: "Tribune Section 101"
		},
		type: "seating",
		level: "lower"
	},
	s205: {
		id: "s205",
		names: {
			English: "Section 205 Seating (Upper Bowl)",
			Español: "Asientos Sección 205",
			Français: "Tribune Section 205"
		},
		type: "seating",
		level: "upper"
	}
};
var STADIUM_EDGES = {
	gA: [{
		to: "food",
		means: "walk",
		stepFree: true,
		distance: 40
	}],
	gB: [{
		to: "conc",
		means: "walk",
		stepFree: true,
		distance: 45
	}],
	gC: [{
		to: "conc",
		means: "walk",
		stepFree: true,
		distance: 50
	}],
	gD: [{
		to: "food",
		means: "walk",
		stepFree: true,
		distance: 40
	}],
	food: [
		{
			to: "gA",
			means: "walk",
			stepFree: true,
			distance: 40
		},
		{
			to: "gD",
			means: "walk",
			stepFree: true,
			distance: 40
		},
		{
			to: "conc",
			means: "walk",
			stepFree: true,
			distance: 90
		},
		{
			to: "s101",
			means: "ramp",
			stepFree: true,
			distance: 30
		},
		{
			to: "s205",
			means: "stairs",
			stepFree: false,
			distance: 40
		}
	],
	conc: [
		{
			to: "gB",
			means: "walk",
			stepFree: true,
			distance: 45
		},
		{
			to: "gC",
			means: "walk",
			stepFree: true,
			distance: 50
		},
		{
			to: "food",
			means: "walk",
			stepFree: true,
			distance: 90
		},
		{
			to: "s101",
			means: "walk",
			stepFree: true,
			distance: 50
		},
		{
			to: "s205",
			means: "elevator",
			stepFree: true,
			distance: 60
		}
	],
	s101: [{
		to: "food",
		means: "ramp",
		stepFree: true,
		distance: 30
	}, {
		to: "conc",
		means: "walk",
		stepFree: true,
		distance: 50
	}],
	s205: [{
		to: "food",
		means: "stairs",
		stepFree: false,
		distance: 40
	}, {
		to: "conc",
		means: "elevator",
		stepFree: true,
		distance: 60
	}]
};
/**
* Calculates shortest path using Dijkstra's Algorithm under accessibility constraints.
*/
function findShortestPath(start, end, options = {}) {
	if (!STADIUM_ZONES[start] || !STADIUM_ZONES[end]) return null;
	if (start === end) return {
		path: [],
		totalDistance: 0
	};
	const { wheelchair, lowSensory } = options;
	const table = {};
	const unvisited = /* @__PURE__ */ new Set();
	for (const key of Object.keys(STADIUM_ZONES)) {
		table[key] = {
			id: key,
			distance: Infinity,
			previous: null,
			viaEdge: null
		};
		unvisited.add(key);
	}
	table[start].distance = 0;
	while (unvisited.size > 0) {
		let currentId = null;
		let minDistance = Infinity;
		for (const key of unvisited) if (table[key].distance < minDistance) {
			minDistance = table[key].distance;
			currentId = key;
		}
		if (currentId === null || minDistance === Infinity) break;
		if (currentId === end) break;
		unvisited.delete(currentId);
		const neighbors = STADIUM_EDGES[currentId] || [];
		for (const edge of neighbors) {
			if (!unvisited.has(edge.to)) continue;
			if (wheelchair && !edge.stepFree) continue;
			let edgeWeight = edge.distance;
			const targetZone = STADIUM_ZONES[edge.to];
			if (lowSensory && targetZone.isHighSensory) edgeWeight += 200;
			const alt = table[currentId].distance + edgeWeight;
			if (alt < table[edge.to].distance) {
				table[edge.to].distance = alt;
				table[edge.to].previous = currentId;
				table[edge.to].viaEdge = edge;
			}
		}
	}
	if (table[end].distance === Infinity) return null;
	const path = [];
	let curr = end;
	while (curr !== start) {
		const node = table[curr];
		if (!node.viaEdge || !node.previous) return null;
		path.unshift(node.viaEdge);
		curr = node.previous;
	}
	return {
		path,
		totalDistance: path.reduce((sum, e) => sum + e.distance, 0)
	};
}
/**
* Returns localized instructions for a given edge traversal
*/
function getLocalizedInstruction(edge, toZoneName, isFinal, language) {
	const isEs = language === "Español";
	const isFr = language === "Français";
	if (edge.means === "elevator") {
		if (isEs) return `Tome el ascensor hasta el ${toZoneName}`;
		if (isFr) return `Prenez l'ascenseur jusqu'à ${toZoneName}`;
		return `Take the elevator to ${toZoneName}`;
	}
	if (edge.means === "ramp") {
		if (isEs) return `Use la rampa hacia el ${toZoneName}`;
		if (isFr) return `Utilisez la rampe vers ${toZoneName}`;
		return `Use the ramp to ${toZoneName}`;
	}
	if (edge.means === "stairs") {
		if (isEs) return `Suba las escaleras hasta el ${toZoneName}`;
		if (isFr) return `Prenez les escaliers jusqu'à ${toZoneName}`;
		return `Take the stairs to ${toZoneName}`;
	}
	if (isFinal) {
		if (isEs) return `Camine y llegue a su destino en ${toZoneName}`;
		if (isFr) return `Marchez pour arriver à votre destination à ${toZoneName}`;
		return `Walk to arrive at your destination in ${toZoneName}`;
	}
	if (isEs) return `Camine por el pasillo hacia el ${toZoneName}`;
	if (isFr) return `Marchez vers ${toZoneName}`;
	return `Walk along the concourse to ${toZoneName}`;
}
//#endregion
export { findShortestPath as n, getLocalizedInstruction as r, STADIUM_ZONES as t };
