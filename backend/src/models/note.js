import mongoose from "mongoose";

// 1st step: You need to create a schema
// 2nd step: You would create a model based off of that schema

const noteSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId, // user stores the ID of the user who created the note
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }, // createdAt, updatedAt
);

const Note = mongoose.model("Note", noteSchema);

export default Note;
