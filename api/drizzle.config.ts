import { defineConfig } from 'drizzle-kit';
import { env } from './src/env.mjs';

export default defineConfig({
  schema: './src/db/schema.ts',
  out: './src/db/migrations',
  dbCredentials: {
    url: env.DATABASE_URL,
  },
  dialect: 'postgresql',
  verbose: true,
  strict: true,
});
