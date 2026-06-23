import dotenv from "dotenv";

dotenv.config();

function required(name: string): string {
  const value = process.env[name];

  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }

  return value;
}

export const env = {
  nodeEnv: process.env.NODE_ENV ?? "development",
  port: Number(process.env.PORT ?? 5000),
  clientUrl: process.env.CLIENT_URL ?? "http://localhost:5173",
  databaseUrl: required("DATABASE_URL"),
};
