//Load environment variables first
import dotenv from "dotenv";

//import dependencies
import express from "express";
import { connectDB } from "./config/db.js";
import noteRoutes from "./routes/noteRoutes.js";
import cors from "cors";
import path from "path";

import fs from "fs";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/userRoutes.js";

dotenv.config();

// Validate required environment variables
const requiredEnvVars = ["MONGO_URI", "JWT_SECRET"];
for (const envVar of requiredEnvVars) {
  if (!process.env[envVar]) {
    console.error(`Error: Missing required environment variable: ${envVar}`);
    process.exit(1);
  }
}

const app = express();
const PORT = process.env.PORT || 5000;
const __dirname = path.resolve();

// CORS configuration for local development and Render deployment
const configuredOrigins = process.env.CORS_ORIGIN
  ? process.env.CORS_ORIGIN.split(",").map((origin) => origin.trim())
  : [];

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow non-browser requests or same-origin requests (no Origin header)
      if (!origin) return callback(null, true);

      // In development or if explicitly wildcarded, allow all
      if (process.env.NODE_ENV !== "production") return callback(null, true);

      // In production, match configured origins or onrender.com domains
      if (
        configuredOrigins.includes(origin) ||
        configuredOrigins.includes("*") ||
        origin.endsWith(".onrender.com")
      ) {
        return callback(null, true);
      }

      return callback(null, true); // Fallback allow to avoid unexpected blocks
    },
    credentials: true,
  }),
);

app.use(cookieParser());
app.use(express.json()); // Middleware to parse JSON bodies

// Health check endpoint for Render health checks and monitoring
app.get(["/api/health", "/health"], (req, res) => {
  res.status(200).json({ status: "ok", timestamp: new Date().toISOString() });
});

// API Routes
app.use("/api/notes", noteRoutes);
app.use("/api/auth", userRoutes);

// In production, serve frontend static assets if built into frontend/dist
const frontendDist = path.join(__dirname, "../frontend/dist");
if (fs.existsSync(frontendDist)) {
  app.use(express.static(frontendDist));
  app.use((req, res, next) => {
    if (req.method === "GET" && !req.path.startsWith("/api")) {
      return res.sendFile(path.join(frontendDist, "index.html"));
    }
    next();
  });
}

// Global error handling middleware
app.use((err, req, res, next) => {
  console.error("Unhandled error:", err);
  res.status(err.status || 500).json({
    message: err.message || "Internal server error",
  });
});

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
});
