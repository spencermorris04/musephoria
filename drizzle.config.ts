import type { Config } from 'drizzle-kit';
import * as dotenv from 'dotenv';

dotenv.config({
  path: '.env.local',
})

export default {
  schema: './lib/db/schema.ts',
  out: './lib/db/migrations',
  driver: 'mysql2',
  dbCredentials: {
    uri: process.env.DATABASE_URL as string,
  },
} satisfies Config;