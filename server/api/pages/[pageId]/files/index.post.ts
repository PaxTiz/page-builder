import { existsSync } from 'fs';
import { mkdir, writeFile } from 'fs/promises';
import { join } from 'path';
import { eq } from 'drizzle-orm';
import { z } from 'zod';
import { database } from '../../../../database';
import { pages } from '../../../../schema';
import { validate } from '../../../../validation';

const BASE_STORAGE_PATH = join('.', 'server', 'storage', 'media', 'pages');

export default eventHandler(async (event) => {
  const { params, files } = await validate(event, {
    params: z.object({
      pageId: z.string().uuid(),
    }),
    files: {
      file: {
        required: true,
      },
    },
  });

  const exists = await database.query.pages.findFirst({
    where: eq(pages.id, params.pageId),
  });

  if (!exists) {
    throw createError({ status: 404 });
  }

  const pageDirectory = join(BASE_STORAGE_PATH, params.pageId);
  if (!existsSync(pageDirectory)) {
    await mkdir(pageDirectory, { recursive: true });
  }

  const file = files.file;
  await writeFile(join(BASE_STORAGE_PATH, params.pageId, file.filename!), file.data);

  return {
    message: 'file_uploaded',
    url: `/api/storage/media/pages/${params.pageId}/${file.filename!}`,
  };
});
