//Load environment variables first
import dotenv from "dotenv";

//import dependencies
import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import noteRoutes from "./routes/noteRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT;

//middelware
app.use(cors());
app.use(express.json()); // this middleware will parse JSON bodies: req.body
app.use("/api/notes", noteRoutes);

connectDB().then(() => {
  app.listen(PORT || 5001, () => {
    console.log("server is star to listen on ", PORT);
  });
});
