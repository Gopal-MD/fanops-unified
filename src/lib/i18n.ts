/**
 * FanOps Unified — Lightweight i18n Translation Dictionary
 * Supporting English, Español, and Français for FIFA WC 2026.
 */

export const TRANSLATIONS: Record<string, Record<string, string>> = {
  English: {
    welcome: "Hey, Fan 👋",
    whereTo: "Where to next?",
    startPlaceholder: "Start location (e.g. Gate A)",
    destPlaceholder: "Destination (e.g. Section 101)",
    wheelchair: "Wheelchair",
    visualAssist: "Visual Assist",
    lowSensory: "Low-Sensory",
    getRoute: "Get Route",
    calculating: "Calculating accessible route...",
    stepByStep: "Step-by-step route",
    eta: "ETA",
    distance: "Distance",
    audioGuidance: "Audio guidance activated.",
    sensoryCorridors: "Low-sensory route selected.",
    stepFree: "Step-free route selected.",
    standardRoute: "Standard route.",
    chatTitle: "AI MatchDay Assistant",
    chatPlaceholder: "Ask about gates, food, restrooms...",
    send: "Send",
    quickQuestions: "Quick Questions",
  },
  Español: {
    welcome: "Hola, Fan 👋",
    whereTo: "¿Adónde vas ahora?",
    startPlaceholder: "Origen (ej. Puerta A)",
    destPlaceholder: "Destino (ej. Sección 101)",
    wheelchair: "Silla de Ruedas",
    visualAssist: "Asistencia Visual",
    lowSensory: "Bajo Estímulo",
    getRoute: "Calcular Ruta",
    calculating: "Calculando ruta accesible...",
    stepByStep: "Ruta paso a paso",
    eta: "Tiempo estimado",
    distance: "Distancia",
    audioGuidance: "Guía de audio activada.",
    sensoryCorridors: "Ruta de bajo estímulo seleccionada.",
    stepFree: "Ruta libre de escaleras seleccionada.",
    standardRoute: "Ruta estándar.",
    chatTitle: "Asistente AI de Partido",
    chatPlaceholder: "Pregunte sobre accesos, comidas, baños...",
    send: "Enviar",
    quickQuestions: "Preguntas Rápidas",
  },
  Français: {
    welcome: "Salut, Fan 👋",
    whereTo: "Où allez-vous ensuite ?",
    startPlaceholder: "Lieu de départ (ex. Porte A)",
    destPlaceholder: "Destination (ex. Section 101)",
    wheelchair: "Fauteuil Roulant",
    visualAssist: "Aide Visuelle",
    lowSensory: "Faible Estime",
    getRoute: "Obtenir l'itinéraire",
    calculating: "Calcul de l'itinéraire accessible...",
    stepByStep: "Itinéraire étape par étape",
    eta: "Temps estimé",
    distance: "Distance",
    audioGuidance: "Guidage audio activé.",
    sensoryCorridors: "Itinéraire à faible stimulation sélectionné.",
    stepFree: "Itinéraire sans escalier sélectionné.",
    standardRoute: "Itinéraire standard.",
    chatTitle: "Assistant MatchDay IA",
    chatPlaceholder: "Posez des questions sur les portes, repas...",
    send: "Envoyer",
    quickQuestions: "Questions Rapides",
  },
};

/**
 * Resolves translation key with language fallback.
 */
export function translate(key: string, language = "English"): string {
  const dict = TRANSLATIONS[language] || TRANSLATIONS["English"];
  return dict[key] || TRANSLATIONS["English"][key] || key;
}
