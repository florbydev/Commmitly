import { Router } from "express";
import { sql } from "kysely";

import { db } from "../db";

export const databaseRouter = Router();

databaseRouter.get("/health", async (req, res, next) => {
  try {
    const result = await sql<{ ok: number }>`select 1 as ok`.execute(db);

    res.json({
      success: true,
      database: "connected",
      result: result.rows[0],
    });
  } catch (error) {
    next(error);
  }
});
