import type { ColumnType, Generated } from "kysely";

export type Timestamp = ColumnType<Date, string | undefined, never>;

export type UserTable = {
  id: Generated<number>;
  email: string;
  name: string | null;
  created_at: Timestamp;
};

export type Database = {
  users: UserTable;
};
