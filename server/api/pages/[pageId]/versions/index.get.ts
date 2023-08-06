import { eq } from 'drizzle-orm';
import { z } from 'zod';
import { database } from '../../../../database';
import { pagesHistory } from '../../../../schema';
import { validate } from '../../../../validation';

export default eventHandler(async (event) => {
  const schema = z.object({
    pageId: z.string().uuid(),
  });

  const params = await validate<z.infer<typeof schema>>(event, schema, ['params']);

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
