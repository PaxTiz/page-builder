import { eq } from 'drizzle-orm';
import { z } from 'zod';
import { database } from '../../../database';
import { pages } from '../../../schema';
import { validate } from '../../../validation';

export default eventHandler(async (event) => {
  const { params } = await validate(event, {
    params: z.object({
      pageId: z.string().uuid(),
    }),
  });

  return database.query.pages.findFirst({
    where: eq(pages.id, params.pageId),
  });
});
