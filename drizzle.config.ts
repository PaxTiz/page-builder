import { config } from 'dotenv';

import type { Config } from 'drizzle-kit';
config();

export default {
  schema: './server/schema/index.ts',
  out: './server/migrations',
  dbCredentials: {
    host: process.env.DATABASE_HOST!,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASS,
    database: process.env.DATABASE_NAME!,
    port: Number(process.env.DATABASE_PORT),
  },
} satisfies Config;
