import express from "express";

import { authMiddleware } from "../middleware/authMiddleware.js";
import {
  createNote,
  getAllNotes,
  deleteNote,
  getNoteById,
  updateNote,
} from "../controllers/noteController.js";

const router = express.Router();

// All routes require authentication
router.use(authMiddleware);

router.get("/", getAllNotes);
router.get("/:id", getNoteById);
router.post("/", createNote);
router.put("/:id", updateNote);
router.delete("/:id", deleteNote);

export default router;
