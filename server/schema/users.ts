import { InferModel } from 'drizzle-orm';
import { mysqlTable, varchar } from 'drizzle-orm/mysql-core';
import { uuid } from './utils';

export const users = mysqlTable('users', {
  id: uuid('id').primaryKey(),
  firstname: varchar('firstname', { length: 191 }).notNull(),
  lastname: varchar('lastname', { length: 191 }).notNull(),
  email: varchar('email', { length: 191 }).unique().notNull(),
  password: varchar('password', { length: 60 }).notNull(),
});

export type User = InferModel<typeof users>;
