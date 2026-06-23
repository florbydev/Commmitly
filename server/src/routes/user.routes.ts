import { Router } from "express";

import { db } from "../db";
import { broadcastSseEvent } from "../events/sse";

export const userRouter = Router();

userRouter.get("/", async (req, res, next) => {
  try {
    const users = await db
      .selectFrom("users")
      .selectAll()
      .orderBy("created_at", "desc")
      .execute();

    res.json({
      success: true,
      data: users,
    });
  } catch (error) {
    next(error);
  }
});

userRouter.post("/", async (req, res, next) => {
  try {
    const { email, name } = req.body as {
      email?: string;
      name?: string;
    };

    if (!email) {
      res.status(400).json({
        success: false,
        message: "Email is required",
      });
      return;
    }

    const user = await db
      .insertInto("users")
      .values({
        email,
        name: name ?? null,
      })
      .returningAll()
      .executeTakeFirstOrThrow();

    broadcastSseEvent("user.created", {
      user,
      createdAt: new Date().toISOString(),
    });

    res.status(201).json({
      success: true,
      data: user,
    });
  } catch (error) {
    next(error);
  }
});
