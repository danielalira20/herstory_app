import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
// Usa un puerto diferente al de Vite
const PORT = 3000;

app.use(cors());
app.use(express.json({ limit: "5mb" }));
// Endpoint para el quiz
app.post("/api/quiz", async (req, res) => {
  try {
    const { userProfileText, womenData } = req.body;

    if (!userProfileText || !womenData) {
      return res.status(400).json({ error: "Faltan datos en la petición." });
    }

    const womenDataMini = womenData.map(w => ({
      id: w.id,
      nombre_completo: w.nombre_completo,
      ocupacion: w.ocupacion,
      categoria: w.categoria,
      logros: w.logros.slice(0, 50), // resumen de 50 caracteres
      biografia: w.biografia.slice(0, 50), // resumen de 50 caracteres
    //  imagen_url: w.imagen_url || "/assets/default.png"
    }));

     const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ error: "API Key no configurada." });
    }

    const apiUrl =
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent";

    // Prompt para la IA
    const prompt = `
Eres un experto en historia. Analiza el perfil del usuario y encuentra las 3 mujeres históricas más parecidas con respecto a su perfil.
Devuelve un JSON con la estructura:
[
  {
    "name": "Nombre de la mujer",
    "coincidencePercentage": 85,
    "explanation": "Explicación muy breve por qué coincide con el usuario"
  }
]
---
Perfil del usuario:
${userProfileText}

Base de datos de mujeres históricas:
${JSON.stringify(womenDataMini)}
`;

    const payload = {
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: {
        responseMimeType: "application/json"
      }
    };

    const response = await fetch(`${apiUrl}?key=${apiKey}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`Error en la API: ${response.status} ${response.statusText}`);
    }

    const result = await response.json();

    // Obtenemos el texto generado por la IA
    const generatedContent = result.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!generatedContent) {
      throw new Error("La IA no devolvió contenido.");
    }

    // Parseamos la respuesta de Gemini
    let parsedResult;
    try {
      parsedResult = JSON.parse(generatedContent);
      
    } catch {
      throw new Error("No se pudo parsear la respuesta de la IA.");
    }

    {/*
    const finalResult = parsedResult.map((item) => {
  const match = womenData.find(
    (w) => item.name.toLowerCase().includes(w.nombre_completo.toLowerCase())
  );

      return {
        ...item,
        imagen_url: match?.imagen_url || "/assets/default.png", // Si no hay imagen, usamos una por defecto
      };
     
    });
    */}
    res.json({ result: parsedResult });
  } catch (error) {
    console.error("Error en /api/quiz:", error);
    res.status(500).json({ error: error.message });
  }
});


app.listen(PORT, () => {
  console.log(`Servidor de la API corriendo en http://localhost:${PORT}`);
});