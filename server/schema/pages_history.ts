import { InferModel, relations } from 'drizzle-orm';
import { datetime, json, mysqlEnum, mysqlTable } from 'drizzle-orm/mysql-core';
import { Block, historyActions } from '../../types';
import { pages } from './pages';
import { nanoid, uuidColumn } from './utils';

export const pagesHistory = mysqlTable('pages_history', {
  id: nanoid('id', { length: 10 }).primaryKey(),
  blocks: json('blocks').$type<Array<Block>>().notNull(),
  timestamp: datetime('timestamp').notNull(),
  action: mysqlEnum('action', historyActions).notNull(),
  pageId: uuidColumn('pageId').notNull().references(() => pages.id, {
    onDelete: 'cascade',
  }),
});

export const pagesHistoryRelations = relations(pagesHistory, ({ one }) => ({
  page: one(pages, {
    fields: [pagesHistory.pageId],
    references: [pages.id],
  }),
}));

export type PageHistorry = InferModel<typeof pagesHistory>
