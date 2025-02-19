import { drizzle } from 'drizzle-orm/postgres-js';
import { env } from '@/env.mjs';
import * as schema from '@/db/schema';

const url = env.DATABASE_URL;

export const db = drizzle(url, { schema });
