// lib/env.ts
import { z } from 'zod';

const envSchema = z.object({
  // Server-side only (NO NEXT_PUBLIC)
  JUDGE0_API_URL: z.string().url(),

  // Public (must start with NEXT_PUBLIC_)
  NEXT_PUBLIC_SITE_NAME: z.string(),
  NEXT_PUBLIC_DATABASE_URL: z.string().url(),
});

// Validate and throw if any env is missing or invalid
const _env = envSchema.safeParse(process.env);

if (!_env.success) {
  console.error('❌ Invalid or missing environment variables:', _env.error.format());
  throw new Error('Invalid environment variables');
}

export const env = _env.data;
