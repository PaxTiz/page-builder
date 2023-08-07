import { existsSync } from 'fs';
import { readFile } from 'fs/promises';
import { join } from 'path';

export default eventHandler((event) => {
  const path = event.context.params!.path;

  const filepath = join('.', 'server', 'storage', path);
  if (existsSync(filepath)) {
    return readFile(filepath);
  }

  throw createError({ status: 404 });
});
