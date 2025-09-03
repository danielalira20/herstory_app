import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();

const app = express();
const port = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

// 🔹 Verifica que Node lee la clave
console.log("API key detectada:", process.env.GEMINI_API_KEY?.slice(0, 5) + "...");
if (!process.env.GEMINI_API_KEY) {
  console.error("⚠️ ERROR: No se detectó GEMINI_API_KEY en el backend");
  process.exit(1);
}

// Inicializar Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Función para reintentar la llamada a la API con un retraso en caso de error 429
async function retryWithBackoff(func, maxRetries = 5, initialDelay = 1000) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await func();
    } catch (error) {
      if (error.status === 429 && i < maxRetries - 1) {
        const delay = initialDelay * Math.pow(2, i);
        console.warn(`Error 429 (Too Many Requests). Reintentando en ${delay}ms...`);
        await new Promise(resolve => setTimeout(resolve, delay));
      } else {
        throw error;
      }
    }
  }
}

// 🚀 Función para verificar relevancia
async function verificarRelevancia(message) {
  return retryWithBackoff(async () => {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro-latest" });

    const prompt = `
Eres un clasificador de temas para un bot llamado HerStoryBot. 
Tu única tarea es determinar si el siguiente mensaje de usuario está relacionado con mujeres históricas, 
figuras culturales femeninas, logros de mujeres en ciencia, arte, política o movimientos sociales, 
así como temas contemporáneos sobre mujeres, igualdad de género y los derechos de las mujeres. 
Responde ÚNICAMENTE "Sí" si es relevante o "No" si no lo es. No añadas ninguna otra palabra.

Mensaje: ${message}
    `;

    const result = await model.generateContent(prompt);
    const respuesta = result.response.text().trim().toLowerCase();

    return respuesta === "sí" || respuesta === "si";
  });
}

// 🚀 Endpoint principal
app.post("/chat", async (req, res) => {
  try {
    const { message } = req.body;
    if (!message) return res.status(400).json({ error: "No se recibió mensaje." });

    console.log("Mensaje recibido en backend:", message);

    // Paso 1: Clasificación
    const esRelevante = await verificarRelevancia(message);
    if (!esRelevante) {
      return res.json({
        text: "Lo siento, este bot solo responde preguntas sobre mujeres en la historia 🙅‍♀️",
      });
    }

    // Paso 2: Generar respuesta Gemini
    const result = await retryWithBackoff(async () => {
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro-latest" });
      return await model.generateContent(message);
    });

    res.json({ text: result.response.text() || "No tengo respuesta en este momento." });
  } catch (error) {
    console.error("ERROR REAL DE GEMINI:", error);
    res
      .status(error?.status || 500)
      .json({ error: { message: error?.message || "Error al procesar tu request." } });
  }
});

app.listen(port, () => {
  console.log(`🚀 HerStoryBot corriendo en http://localhost:${port}`);
});