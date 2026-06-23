import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

import { env } from "./config/env";
import { healthRouter } from "./routes/health.routes";
import { AppError, errorMiddleware } from "./middleware/error.middleware";
import { databaseRouter } from "./routes/database.routes";
import { userRouter } from "./routes/user.routes";
import { eventsRouter } from "./routes/events.routes";

const app = express();

app.use(helmet());
app.use(
  cors({
    origin: env.clientUrl,
    credentials: true,
  }),
);
app.use(express.json());
app.use(morgan(env.nodeEnv === "production" ? "combined" : "dev"));

app.get("/", (_req, res) => {
  res.json({
    success: true,
    message: "Express TypeScript API is running",
  });
});

app.use("/api/health", healthRouter);
app.use("/api/db", databaseRouter);
app.use("/api/users", userRouter);
app.use("/api/events", eventsRouter);

app.use((req, _res, next) => {
  next(new AppError(`Route not found: ${req.method} ${req.originalUrl}`, 404));
});

app.use(errorMiddleware);

export default app;
