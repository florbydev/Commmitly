import { useEffect, useState } from "react";

const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:5000";

type LiveEvent = {
  id: string;
  type: string;
  data: unknown;
  receivedAt: string;
};

export function EventsPanel() {
  const [status, setStatus] = useState<"connecting" | "connected" | "error">(
    "connecting"
  );
  const [events, setEvents] = useState<LiveEvent[]>([]);

  useEffect(() => {
    const eventSource = new EventSource(`${API_URL}/api/events`);

    eventSource.onopen = () => {
      setStatus("connected");
    };

    eventSource.onerror = () => {
      setStatus("error");
    };

    function handleEvent(type: string, message: MessageEvent) {
      const event: LiveEvent = {
        id: message.lastEventId || crypto.randomUUID(),
        type,
        data: JSON.parse(message.data),
        receivedAt: new Date().toISOString(),
      };

      setEvents((currentEvents) => [event, ...currentEvents].slice(0, 10));
    }

    eventSource.addEventListener("connected", (message) => {
      handleEvent("connected", message);
    });

    eventSource.addEventListener("user.created", (message) => {
      handleEvent("user.created", message);
    });

    return () => {
      eventSource.close();
    };
  }, []);

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-4 flex items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-slate-950">Live events</h2>
          <p className="text-sm text-slate-500">
            Server-Sent Events stream from the Express API.
          </p>
        </div>

        <span className="rounded-full border border-slate-200 px-3 py-1 text-xs font-semibold text-slate-600">
          {status}
        </span>
      </div>

      {events.length === 0 ? (
        <p className="rounded-xl bg-slate-50 p-4 text-sm text-slate-500">
          No events yet. Create a user to trigger a live event.
        </p>
      ) : (
        <div className="space-y-3">
          {events.map((event) => (
            <article
              key={event.id}
              className="rounded-xl bg-slate-950 p-4 text-sm text-slate-100"
            >
              <div className="mb-2 flex items-center justify-between gap-4">
                <span className="font-semibold">{event.type}</span>
                <span className="text-xs text-slate-400">
                  {new Date(event.receivedAt).toLocaleTimeString()}
                </span>
              </div>

              <pre className="overflow-auto whitespace-pre-wrap text-xs text-emerald-300">
                {JSON.stringify(event.data, null, 2)}
              </pre>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}