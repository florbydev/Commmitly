import { sql } from "kysely";

import { db } from "./index";

async function migrate() {
  await db.schema
    .createTable("users")
    .ifNotExists()
    .addColumn("id", "serial", (col) => col.primaryKey())
    .addColumn("email", "varchar(255)", (col) => col.notNull().unique())
    .addColumn("name", "varchar(255)")
    .addColumn("created_at", "timestamptz", (col) =>
      col.defaultTo(sql`now()`).notNull(),
    )
    .execute();

  console.log("Database migration completed");
}

migrate()
  .catch((error) => {
    console.error("Database migration failed");
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await db.destroy();
  });
