import { Router } from "express";

export const healthRouter = Router();

healthRouter.get("/", (_req, res) => {
  res.json({
    success: true,
    message: "API is healthy...",
    timestamp: new Date().toISOString(),
  });
});
