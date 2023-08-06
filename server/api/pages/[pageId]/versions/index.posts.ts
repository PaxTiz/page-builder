import { eq, sql } from 'drizzle-orm';
import { z } from 'zod';
import { Block, historyActions } from '../../../../../types';
import { database } from '../../../../database';
import { pages, pagesHistory } from '../../../../schema';
import { validate } from '../../../../validation';

export default eventHandler(async (event) => {
  const schema = z.object({
    pageId: z.string().uuid(),
    id: z.string().length(10),
    timestamp: z.number(),
    action: z.enum(historyActions),
    blocks: z.array(z.any()),
  });

  const input = await validate<z.infer<typeof schema>>(event, schema, ['params', 'body']);

  const page = await database.query.pages.findFirst({
    where: eq(pages.id, input.pageId),
  });

  if (!page) {
    throw createError({ status: 404 });
  }

  const counts = await database.select({
    count: sql<number>`COUNT(*) as count`,
  }).from(pagesHistory).where(eq(pagesHistory.pageId, input.pageId));

  const count = counts[0].count;
  if (count === 60) {
    await database.execute(sql`
      DELETE FROM ${pagesHistory}
      WHERE ${pagesHistory.pageId} = ${input.pageId}
      ORDER BY ${pagesHistory.timestamp} DESC
      LIMIT 1
  `);
  }

  await database.insert(pagesHistory).values({
    id: input.id,
    action: input.action,
    timestamp: new Date(input.timestamp),
    blocks: input.blocks as Array<Block>,
    pageId: input.pageId,
  });

  return { message: 'page_history_created' };
});
