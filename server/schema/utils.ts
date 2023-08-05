import { sql } from "drizzle-orm";
import { customType } from "drizzle-orm/mysql-core";

export const uuidColumn = customType<{
  data: string;
  notNull: true;
  default: true;
}>({
  dataType() {
    return "varchar(36)";
  },
});

export const uuid = (column: string) =>
  uuidColumn(column).default(sql`(UUID())`);

interface NanoidColumn {
  data: string;
  notNull: true;
  default: true;
  length: number;
}

export const nanoidColumn = customType<NanoidColumn>({
  dataType(config: any) {
    return typeof config.length !== "undefined"
      ? `varchar(${config.length})`
      : "varchar";
  },
});

export const nanoid = (column: string, options?: { length: number }) =>
  nanoidColumn(column, options);
