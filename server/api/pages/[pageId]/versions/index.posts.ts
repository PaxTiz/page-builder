import { eq, sql } from 'drizzle-orm';
import { z } from 'zod';
import { historyActions } from '../../../../../types';
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

  await database.transaction(async (tx) => {
    const count = counts[0].count;
    if (count >= 60) {
      await tx.execute(sql`
        DELETE FROM ${pagesHistory}
        WHERE ${pagesHistory.pageId} = ${input.pageId}
        ORDER BY ${pagesHistory.timestamp}
        LIMIT 1
    `);
    }

    await tx.insert(pagesHistory).values({
      id: input.id,
      action: input.action,
      timestamp: new Date(input.timestamp),
      blocks: input.blocks,
      pageId: input.pageId,
    });
  });

  return { message: 'page_history_created' };
});
