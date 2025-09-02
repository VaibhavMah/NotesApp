// routes/notes.ts
import { Router } from "express";
import Note from "../models/Note";
import { authMiddleware } from "../middleware/authMiddleware";

const router = Router();

// Create Note
router.post("/", authMiddleware, async (req: any, res) => {
  try {
    const { title, content } = req.body;
    const note = new Note({ title, content, user: req.user.id });
    await note.save();
    res.status(201).json(note);
  } catch (err) {
    res.status(500).json({ message: "Error creating note" });
  }
});

// Get User Notes
router.get("/", authMiddleware, async (req: any, res) => {
  try {
    const notes = await Note.find({ user: req.user.id });
    res.json(notes);
  } catch (err) {
    res.status(500).json({ message: "Error fetching notes" });
  }
});

// Delete Note
router.delete("/:id", authMiddleware, async (req: any, res) => {
  try {
    const note = await Note.findOneAndDelete({ _id: req.params.id, user: req.user.id });
    if (!note) return res.status(404).json({ message: "Note not found" });
    res.json({ message: "Note deleted" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting note" });
  }
});

export default router;
