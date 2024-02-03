import { eq } from 'drizzle-orm';
import { z } from 'zod';
import { database } from '~/server/database';
import { pagesHistory } from '~/server/schema';
import { validate } from '~/server/validation';

export default eventHandler(async (event) => {
  const { params } = await validate(event, {
    params: z.object({
      pageId: z.string().uuid(),
    }),
  });

  return database.query.pagesHistory.findMany({
    columns: {
      id: true,
      timestamp: true,
      action: true,
      blocks: true,
    },
    where: eq(pagesHistory.pageId, params.pageId),
  });
});
