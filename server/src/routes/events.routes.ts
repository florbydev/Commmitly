import { randomUUID } from "node:crypto";
import { Router } from "express";

import { addSseClient, getSseClientCount } from "../events/sse";

export const eventsRouter = Router();

eventsRouter.get("/", (req, res) => {
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache, no-transform");
  res.setHeader("Connection", "keep-alive");
  res.setHeader("X-Accel-Buffering", "no");

  res.flushHeaders?.();

  const clientId = randomUUID();
  const removeClient = addSseClient(clientId, res);

  req.on("close", () => {
    removeClient();
  });
});

eventsRouter.get("/status", (req, res) => {
  res.json({
    success: true,
    connectedClients: getSseClientCount(),
  });
});
