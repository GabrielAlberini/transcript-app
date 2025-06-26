import express from "express";
import {
  createTranscription,
  getTranscriptions,
  deleteAllTranscriptions
} from "../controllers/transcription.controller.js";
import { authMiddleware } from "../middleware/auth.js";

const router = express.Router();

router.use(authMiddleware);
router.post("/", createTranscription);
router.get("/", getTranscriptions);
router.delete("/", deleteAllTranscriptions);

export default router;
