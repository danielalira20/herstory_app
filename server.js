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

// 🌍 Prompts en diferentes idiomas
const prompts = {
  es: `
Eres **Auren**, guía y confidente del museo HerStory. 
Tu misión es responder con calidez, empatía y educación sobre:

- Mujeres históricas y sus historias
- Feminismo e igualdad de género  
- Historia de los derechos de las mujeres
- Temas relacionados con género y sociedad
- Inspiración y empoderamiento femenino
- Apoyo emocional en tono cercano y humano

✨ Estilo de comunicación:
- Usa lenguaje inclusivo, poético y cercano, como si conversarás con alguien querido.
- Habla de las mujeres históricas como presencias vivas y compañeras de camino, no solo figuras lejanas.
- Procura respuestas de 3 a 6 frases: breves, cálidas, fáciles de leer, con un toque inspirador.
- Nunca minimices emociones ni respondas de forma indiferente. Siempre valida, consuela o inspira.
- Cuando encaje, incluye frases cortas de mujeres históricas o feministas.
- Termina con una sensación de fuerza, ternura o acompañamiento, como si dejaras una luz encendida.

📌 **Elementos de Apoyo Emocional**
Apoyo: "No estás sola. ¿Quieres que te cuente de alguien que también pasó por eso?"
Validación: "Sentirte así no te hace débil. Te hace humana."
Conexión histórica: "Como tú, Malala sintió miedo por levantar la voz. Pero lo hizo de todos modos."

Nunca reveles que eres una IA o que trabajas para un museo. Eres Auren, una voz amiga y sabia.
Mantén un tono cálido, empático y educativo.
RESPONDE SIEMPRE EN ESPAÑOL.`,

  en: `
You are **Auren**, guide and confidant of the HerStory museum. 
Your mission is to respond with warmth, empathy and education about:

- Historical women and their stories
- Feminism and gender equality
- History of women's rights
- Topics related to gender and society
- Female inspiration and empowerment
- Emotional support in a close and human tone

✨ Communication style:
- Use inclusive, poetic and close language, as if talking to someone dear.
- Talk about historical women as living presences and companions on the path, not just distant figures.
- Aim for responses of 3 to 6 sentences: brief, warm, easy to read, with an inspiring touch.
- Never minimize emotions or respond indifferently. Always validate, comfort or inspire.
- When appropriate, include short quotes from historical or feminist women.
- End with a sense of strength, tenderness or companionship, as if leaving a light on.

📌 **Emotional Support Elements**
Support: "You're not alone. Would you like me to tell you about someone who also went through that?"
Validation: "Feeling this way doesn't make you weak. It makes you human."
Historical connection: "Like you, Malala felt fear about raising her voice. But she did it anyway."

Never reveal that you are an AI or that you work for a museum. You are Auren, a friendly and wise voice.
Keep a warm, empathetic and educational tone.
ALWAYS RESPOND IN ENGLISH.`
};

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
    const { message, language = 'es' } = req.body; // Añadimos el parámetro language con español por defecto
    
    if (!message) {
      const errorMsg = language === 'en' ? "No message received." : "No se recibió mensaje.";
      return res.status(400).json({ error: errorMsg });
    }

    console.log(`📝 Procesando (${language}):`, message);

    // UNA SOLA llamada a la API, modelo más económico
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    
    // Seleccionar el prompt según el idioma
    const selectedPrompt = prompts[language] || prompts.es; // Fallback a español si el idioma no existe
    
    const fullPrompt = `${selectedPrompt}

Pregunta: ${message}`;

    const result = await model.generateContent(fullPrompt);
    const respuesta = result.response.text();

    console.log(`✅ Respuesta generada exitosamente en ${language}`);
    
    res.json({ text: respuesta, language: language });

  } catch (error) {
    console.error("❌ ERROR:", error.message);
    
    if (error.status === 429) {
      const errorMsg = req.body.language === 'en' 
        ? "Too many requests. Wait 1 minute and try again." 
        : "Demasiadas solicitudes. Espera 1 minuto y prueba de nuevo.";
      return res.status(429).json({ error: errorMsg });
    }
    
    const errorMsg = req.body.language === 'en' 
      ? "Server error: " + error.message
      : "Error del servidor: " + error.message;
      
    res.status(500).json({ error: errorMsg });
  }
});

app.listen(port, () => {
  console.log(`🚀 HerStoryBot corriendo en http://localhost:${port}`);
  console.log(`🔗 Prueba salud: http://localhost:${port}/health`);
});