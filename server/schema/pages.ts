import { InferSelectModel } from 'drizzle-orm';
import { json, mysqlTable, varchar } from 'drizzle-orm/mysql-core';
import { Block } from '../../types';
import { uuid } from './utils';

export const pages = mysqlTable('pages', {
  id: uuid('id').primaryKey(),
  name: varchar('name', { length: 191 }).notNull(),
  slug: varchar('slug', { length: 191 }).notNull(),
  blocks: json('blocks').$type<Array<Block>>().notNull(),
});

export type Page = InferSelectModel<typeof pages>;
