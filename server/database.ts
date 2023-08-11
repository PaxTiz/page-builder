import { exit } from 'process';
import { config } from 'dotenv';

import { drizzle } from 'drizzle-orm/mysql2';
import { migrate } from 'drizzle-orm/mysql2/migrator';
import { createPool } from 'mysql2';
import * as schema from './schema';
config();

const isMigration = process.argv.length === 3 && process.argv[2] === 'migrate';

const connection = createPool({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASS,
  database: process.env.DATABASE_NAME,
  port: Number(process.env.DATABASE_PORT),
  multipleStatements: isMigration,
});

export const database = drizzle(connection, {
  schema,
  mode: 'default',
  logger: Boolean(process.env.ENABLE_SQL_LOGS),
});

if (isMigration) {
  (async () => {
    await migrate(database, { migrationsFolder: './server/migrations' });
    exit(0);
  })();
}
