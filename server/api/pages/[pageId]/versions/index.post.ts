import { eq, sql } from 'drizzle-orm';
import { z } from 'zod';
import { database } from '~/server/database';
import { pages, pagesHistory } from '~/server/schema';
import { validate } from '~/server/validation';
import { historyActions } from '~/types';

export default eventHandler(async (event) => {
  const { params, body } = await validate(event, {
    params: z.object({
      pageId: z.string().uuid(),
    }),
    body: z.object({
      id: z.string().length(10),
      timestamp: z.number(),
      action: z.enum(historyActions),
      blocks: z.array(z.any()),
    }),
  });

  const page = await database.query.pages.findFirst({
    where: eq(pages.id, params.pageId),
  });

  if (!page) {
    throw createError({ status: 404 });
  }

  const counts = await database.select({
    count: sql<number>`COUNT(*) as count`,
  }).from(pagesHistory).where(eq(pagesHistory.pageId, params.pageId));

  await database.transaction(async (tx) => {
    const count = counts[0].count;
    if (count >= 60) {
      await tx.execute(sql`
        DELETE FROM ${pagesHistory}
        WHERE ${pagesHistory.pageId} = ${params.pageId}
        ORDER BY ${pagesHistory.timestamp}
        LIMIT 1
    `);
    }

    await tx.insert(pagesHistory).values({
      id: body.id,
      action: body.action,
      timestamp: new Date(body.timestamp),
      blocks: body.blocks,
      pageId: params.pageId,
    });
  });

  return { message: 'page_history_created' };
});
