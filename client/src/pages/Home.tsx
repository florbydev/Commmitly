import { useState } from "react";
import { EventsPanel } from "../components/EventsPanel";
import { Button } from "../components/Button";
import { getHealth, type HealthResponse } from "../services/api";

export function Home() {
  const [health, setHealth] = useState<HealthResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleHealthCheck() {
    try {
      setLoading(true);
      setError(null);

      const data = await getHealth();
      setHealth(data);
    } catch (err) {
      setHealth(null);
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-linear-to-br from-slate-50 via-white to-slate-100 px-6 py-10 text-slate-950">
      <section className="mx-auto flex max-w-5xl flex-col gap-10">
        <nav className="flex items-center justify-between">
          <div className="text-lg font-bold tracking-tight">Client Starter</div>

          <span className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-600 shadow-sm">
            React + TypeScript + Tailwind
          </span>
        </nav>

        <div className="grid gap-8 rounded-3xl border border-slate-200 bg-white p-8 shadow-xl shadow-slate-200/60 md:grid-cols-[1.3fr_0.7fr] md:p-12">
          <div className="flex flex-col justify-center gap-6">
            <div className="space-y-4">
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-500">
                Full-stack ready
              </p>

              <h1 className="max-w-2xl text-4xl font-black tracking-tight text-slate-950 md:text-6xl">
                React client wired for your Express API.
              </h1>

              <p className="max-w-xl text-lg leading-8 text-slate-600">
                This starter uses Vite, React, TypeScript, and Tailwind. It also
                includes an API health-check helper pointed at your backend.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Button onClick={handleHealthCheck} disabled={loading}>
                {loading ? "Checking..." : "Check API health"}
              </Button>
            </div>
          </div>

          <aside className="rounded-2xl bg-slate-950 p-5 text-sm text-slate-100 shadow-inner">
            <div className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
              API status
            </div>

            {health ? (
              <pre className="overflow-auto whitespace-pre-wrap rounded-xl bg-slate-900 p-4 text-emerald-300">
                {JSON.stringify(health, null, 2)}
              </pre>
            ) : error ? (
              <pre className="overflow-auto whitespace-pre-wrap rounded-xl bg-slate-900 p-4 text-red-300">
                {error}
              </pre>
            ) : (
              <p className="rounded-xl bg-slate-900 p-4 text-slate-400">
                Click the button to call <code>/api/health</code> on your
                backend API.
              </p>
            )}
          </aside>
        </div>
        <EventsPanel />
      </section>
    </main>
  );
}