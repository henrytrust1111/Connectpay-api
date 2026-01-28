import express from "express";
import cors from "cors";
import morgan from "morgan";

import authRoutes from "./routes/auth.routes";
import profileRoutes from "./routes/profile.routes";
import walletRoutes from "./routes/wallet.routes";
import chatRoutes from "./routes/chat.routes";
import callRoutes from "./routes/call.routes";
import userRoutes from "./routes/user.routes";
import pushRoutes from "./routes/push.routes";

import { errorHandler } from "./middlewares/error.middleware";
import { authenticate } from "./middlewares/auth.middlewares";

const app = express();

/**
 * Global Middlewares
 */
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

/**
 * Routes
 */
app.use("/api", authRoutes);
app.use("/api/profile", authenticate, profileRoutes);
app.use("/api/wallet", authenticate, walletRoutes);
app.use("/api/chats", authenticate, chatRoutes);
app.use("/api/call", authenticate, callRoutes);
app.use("/api/users", authenticate, userRoutes);
app.use("/api/push", pushRoutes);

/**
 * Health Check
 */
app.get("/health", (_, res) => {
  res.json({ status: "OK" });
});

/**
 * Error Handler (LAST middleware)
 */
app.use(errorHandler);

export default app;
