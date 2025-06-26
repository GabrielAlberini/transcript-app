import { Transcription } from "../models/Transcription.js";
import { transcriptionSchemaZod } from "../validators/transcription.js";

export async function createTranscription(req, res) {
  const parsed = transcriptionSchemaZod.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ success: false, error: parsed.error.format() });
  }

  try {
    const newItem = await Transcription.create({
      content: parsed.data.content,
      userId: req.user.id
    });
    res.status(201).json({ success: true, data: newItem });
  } catch {
    res.status(500).json({ success: false, error: "Error al guardar en MongoDB" });
  }
}

export async function getTranscriptions(req, res) {
  try {
    const items = await Transcription.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.json({ success: true, data: items });
  } catch {
    res.status(500).json({ success: false, error: "Error al obtener las transcripciones" });
  }
}

export async function deleteAllTranscriptions(req, res) {
  try {
    await Transcription.deleteMany({ userId: req.user.id });
    res.json({ success: true, message: "Historial eliminado correctamente" });
  } catch {
    res.status(500).json({ success: false, error: "Error al eliminar historial" });
  }
}
