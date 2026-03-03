//Load environment variables first
import dotenv from "dotenv";

//import dependencies
import express from "express";
import { connectDB } from "./config/db.js";
import noteRoutes from "./routes/noteRoutes.js";
import cors from "cors";
import path from "path";

dotenv.config();

const app = express();
const PORT = process.env.PORT;
const __dirname = path.resolve();

//middelware
if (process.env.NOD_ENV !== "production") {
  app.use(
    cors({
      origin: "http://localhost:5173",
    }),
  ); //not for production or if only for devlopment
}
app.use(express.json()); // this middleware will parse JSON bodies: req.body
app.use("/api/notes", noteRoutes);

if (process.env.NOD_ENV === "production") {
  //for devlopment
  app.use(express.static(path.join(__dirname, "../frontend/dist")));
  
}

connectDB().then(() => {
  app.listen(PORT || 5001, () => {
    console.log("server is star to listen on ", PORT);
  });
});
