import { eq } from 'drizzle-orm';
import { z } from 'zod';
import { database } from '../../../database';
import { pages } from '../../../schema';
import { validate } from '../../../validation';

export default eventHandler(async (event) => {
  const schema = z.object({
    id: z.string().uuid(),
  });

  const params = await validate(event, schema, 'params');

  return database.query.pages.findFirst({
    where: eq(pages.id, params.id),
  });
});
