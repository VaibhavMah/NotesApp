import { Schema, model, Document } from "mongoose";

interface INote extends Document {
  userId: string;
  content: string;
}

const NoteSchema = new Schema<INote>({
  userId: { type: String, required: true },
  content: { type: String, required: true },
});

export default model<INote>("Note", NoteSchema);
