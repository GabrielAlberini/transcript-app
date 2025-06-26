import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectToDatabase } from "./src/config/db.js";
import authRoutes from "./src/routes/auth.routes.js";
import transcriptionsRoutes from "./src/routes/transcriptions.routes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 1234;
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/transcriptions-app";

app.use(cors());
app.use(express.json());

// Conectar a DB
connectToDatabase(MONGO_URI);

// Rutas
app.use("/api/auth", authRoutes);
app.use("/api/transcriptions", transcriptionsRoutes);

app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
