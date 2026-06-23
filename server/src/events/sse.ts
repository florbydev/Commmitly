import type { Response } from "express";

type SseClient = {
  id: string;
  response: Response;
};

const clients = new Map<string, SseClient>();

let eventId = 0;

function nextEventId() {
  eventId += 1;
  return String(eventId);
}

export function addSseClient(id: string, response: Response) {
  clients.set(id, {
    id,
    response,
  });

  sendSseEvent(response, "connected", {
    clientId: id,
    message: "Connected to server events",
  });

  const heartbeat = setInterval(() => {
    response.write(": heartbeat\n\n");
  }, 25_000);

  return () => {
    clearInterval(heartbeat);
    clients.delete(id);
  };
}

export function sendSseEvent(response: Response, event: string, data: unknown) {
  response.write(`id: ${nextEventId()}\n`);
  response.write(`event: ${event}\n`);
  response.write(`data: ${JSON.stringify(data)}\n\n`);
}

export function broadcastSseEvent(event: string, data: unknown) {
  for (const client of clients.values()) {
    sendSseEvent(client.response, event, data);
  }
}

export function getSseClientCount() {
  return clients.size;
}
