import express from "express";
import cors from "cors";
import { createClient } from "@supabase/supabase-js";
import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Inicializar Supabase y Gemini
const supabase = createClient(
  process.env.VITE_SUPABASE_WOMEN_URL,
  process.env.VITE_SUPABASE_WOMEN_ANON_KEY
);

const genAI = new GoogleGenerativeAI(process.env.VITE_GEMINI_API_KEY);

// Ruta para buscar las mujeres más parecidas
app.post("/search-women", async (req, res) => {
  try {
    const { userProfileText } = req.body;

    if (!userProfileText || userProfileText.trim().length === 0) {
      return res.status(400).json({ error: "Texto inválido" });
    }

    // 1. Generar embedding del perfil del usuario
    const model = genAI.getGenerativeModel({ model: "models/embedding-001" });

    const embeddingResponse = await model.embedContent({
      content: { parts: [{ text: userProfileText }] },
    });

    const queryEmbedding = embeddingResponse.embedding.values;

    // 2. Llamar a la función RPC para búsqueda vectorial
    const { data, error } = await supabase.rpc("match_mujeres", {
      query_embedding: queryEmbedding,
      match_count: 3, // Los 3 más relevantes
    });

    if (error) {
      console.error("❌ Error en Supabase:", error);
      return res.status(500).json({ error: error.message });
    }

    res.json({ results: data });
  } catch (err) {
    console.error("❌ Error en /search-women:", err);
    res.status(500).json({ error: err.message });
  }
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`🚀 Servidor de búsqueda vectorial corriendo en http://localhost:${PORT}`);
});
