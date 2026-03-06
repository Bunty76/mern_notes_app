//Load environment variables first
import dotenv from "dotenv";

//import dependencies
import express from "express";
import { connectDB } from "./config/db.js";
import noteRoutes from "./routes/noteRoutes.js";
import cors from "cors";
import path from "path";

import userRoutes from "./routes/userRoutes.js";
import cookieParser from "cookie-parser";
dotenv.config();

// Validate required environment variables
const requiredEnvVars = ['MONGO_URI', 'JWT_SECRET'];
for (const envVar of requiredEnvVars) {
  if (!process.env[envVar]) {
    console.error(`Error: Missing required environment variable: ${envVar}`);
    process.exit(1);
  }
}

const app = express();
const PORT = process.env.PORT || 5000;
const __dirname = path.resolve();

//middleware
if (process.env.NODE_ENV !== "production") {
  app.use(
    cors({
      origin: true, // Allow any origin in development
    }),
  ); //for development only
}
app.use(cookieParser());
app.use(express.json()); // this middleware will parse JSON bodies: req.body
app.use("/api/notes", noteRoutes);
app.use("/api/auth", userRoutes);

// Note: Static files are served by a separate frontend service on Render
// If you want to serve frontend from this backend, uncomment below and set FRONTEND_BUILD_PATH
// if (process.env.NODE_ENV === "production" && process.env.FRONTEND_BUILD_PATH) {
//   app.use(express.static(path.resolve(process.env.FRONTEND_BUILD_PATH)));
// }

connectDB().then(() => {
  app.listen(PORT || 5001, () => {
    console.log("server is star to listen on ", PORT);
  });
});
