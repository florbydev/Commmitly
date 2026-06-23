const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:5000";

export type HealthResponse = {
  success: boolean;
  message: string;
  timestamp?: string;
};

export async function getHealth(): Promise<HealthResponse> {
  const response = await fetch(`${API_URL}/api/health`);

  if (!response.ok) {
    throw new Error(`Health check failed with status ${response.status}`);
  }

  return response.json() as Promise<HealthResponse>;
}
