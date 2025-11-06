//Load environment variables first
import dotenv from "dotenv";

import express from "express";
import { connectDB } from "./config/db.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT;
connectDB().then(() => {
  app.listen(PORT || 5001, () => {
    console.log("server is star to listen on ", PORT);
  });
});
