import { z } from "zod";

const envSchema = z.object({
  VITE_API_URL: z.string().url().default("http://localhost:3001/api"),
  VITE_SOCKET_URL: z.string().url().default("http://localhost:3001"),
  VITE_FIREBASE_API_KEY: z.string().optional(),
  VITE_FIREBASE_AUTH_DOMAIN: z.string().optional(),
  VITE_FIREBASE_PROJECT_ID: z.string().optional(),
  VITE_FIREBASE_STORAGE_BUCKET: z.string().optional(),
  VITE_FIREBASE_MESSAGING_SENDER_ID: z.string().optional(),
  VITE_FIREBASE_APP_ID: z.string().optional(),
  VITE_FIREBASE_DATABASE_URL: z.string().optional(),
  GROQ_API_KEY: z.string().optional(),
});

// Safely access environment variables depending on host runtime
const envData = {
  VITE_API_URL:
    typeof import.meta !== "undefined" ? import.meta.env.VITE_API_URL : process.env.VITE_API_URL,
  VITE_SOCKET_URL:
    typeof import.meta !== "undefined"
      ? import.meta.env.VITE_SOCKET_URL
      : process.env.VITE_SOCKET_URL,
  VITE_FIREBASE_API_KEY:
    typeof import.meta !== "undefined"
      ? import.meta.env.VITE_FIREBASE_API_KEY
      : process.env.VITE_FIREBASE_API_KEY,
  VITE_FIREBASE_AUTH_DOMAIN:
    typeof import.meta !== "undefined"
      ? import.meta.env.VITE_FIREBASE_AUTH_DOMAIN
      : process.env.VITE_FIREBASE_AUTH_DOMAIN,
  VITE_FIREBASE_PROJECT_ID:
    typeof import.meta !== "undefined"
      ? import.meta.env.VITE_FIREBASE_PROJECT_ID
      : process.env.VITE_FIREBASE_PROJECT_ID,
  VITE_FIREBASE_STORAGE_BUCKET:
    typeof import.meta !== "undefined"
      ? import.meta.env.VITE_FIREBASE_STORAGE_BUCKET
      : process.env.VITE_FIREBASE_STORAGE_BUCKET,
  VITE_FIREBASE_MESSAGING_SENDER_ID:
    typeof import.meta !== "undefined"
      ? import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID
      : process.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  VITE_FIREBASE_APP_ID:
    typeof import.meta !== "undefined"
      ? import.meta.env.VITE_FIREBASE_APP_ID
      : process.env.VITE_FIREBASE_APP_ID,
  VITE_FIREBASE_DATABASE_URL:
    typeof import.meta !== "undefined"
      ? import.meta.env.VITE_FIREBASE_DATABASE_URL
      : process.env.VITE_FIREBASE_DATABASE_URL,
  GROQ_API_KEY:
    typeof import.meta !== "undefined" ? import.meta.env.GROQ_API_KEY : process.env.GROQ_API_KEY,
};

const parsedEnv = envSchema.safeParse(envData);

if (!parsedEnv.success) {
  console.warn("⚠️ Environment variables validation warning:", parsedEnv.error.format());
}

export const env = parsedEnv.success ? parsedEnv.data : envSchema.parse({});
