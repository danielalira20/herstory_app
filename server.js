
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();

const app = express();
const port = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

// Verificar API key
if (!process.env.GEMINI_API_KEY) {
  console.error("⚠️ ERROR: No se detectó GEMINI_API_KEY");
  process.exit(1);
}

console.log("✅ API key configurada correctamente");

// Inicializar Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// 🚀 Endpoint de salud para verificar que todo funciona
app.get("/health", (req, res) => {
  res.json({ 
    status: "Backend funcionando",
    gemini_key: process.env.GEMINI_API_KEY ? "Configurada" : "NO encontrada",
    timestamp: new Date().toISOString()
  });
});

// 🚀 Endpoint principal del chat
app.post("/chat", async (req, res) => {
  try {
    const { message } = req.body;
    
    if (!message) {
      return res.status(400).json({ error: "No se recibió mensaje." });
    }

    console.log("📝 Procesando:", message);

    // UNA SOLA llamada a la API, modelo más económico
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    
    const prompt = `Eres Auren, guía del museo HerStory. Respondes preguntas sobre:
    - Mujeres históricas y sus historias
    - Feminismo e igualdad de género  
    - Historia de los derechos de las mujeres
    - Temas relacionados con género y sociedad
    - Inspiración y empoderamiento femenino
    Mantén un tono cálido, empático y educativo.";

Pregunta: ${message}`;

    const result = await model.generateContent(prompt);
    const respuesta = result.response.text();

    console.log("✅ Respuesta generada exitosamente");
    
    res.json({ text: respuesta });

  } catch (error) {
    console.error("❌ ERROR:", error.message);
    
    if (error.status === 429) {
      return res.status(429).json({ 
        error: "Demasiadas solicitudes. Espera 1 minuto y prueba de nuevo." 
      });
    }
    
    res.status(500).json({ 
      error: "Error del servidor: " + error.message 
    });
  }
});

app.listen(port, () => {
  console.log(`🚀 HerStoryBot corriendo en http://localhost:${port}`);
  console.log(`🔗 Prueba salud: http://localhost:${port}/health`);
});