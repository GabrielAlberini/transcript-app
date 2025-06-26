import mongoose from "mongoose";

const transcriptionSchema = new mongoose.Schema({
  content: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }
}, { timestamps: true, versionKey: false });

export const Transcription = mongoose.model("Transcription", transcriptionSchema);
