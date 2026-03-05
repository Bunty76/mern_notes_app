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

const app = express();
const PORT = process.env.PORT;
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

if (process.env.NODE_ENV === "production") {
  //serve static files in production
  app.use(express.static(path.join(__dirname, "../../frontend/dist")));
}

connectDB().then(() => {
  app.listen(PORT || 5001, () => {
    console.log("server is star to listen on ", PORT);
  });
});
