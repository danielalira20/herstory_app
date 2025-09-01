export const processQuizWithGemini = async (userProfileText, womenData) => {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent`;

    const systemPrompt = "Eres un asistente experto en historia que analiza perfiles de personalidad y los relaciona con mujeres históricas. Responde únicamente con un array JSON.";

    const prompt = `
Analiza el siguiente perfil de usuario y compáralo con la lista de mujeres históricas.
Devuelve las 3 mujeres que más se parezcan, junto con un porcentaje de coincidencia y una breve explicación.

Perfil del usuario:
${userProfileText}

Base de datos de mujeres históricas:
${JSON.stringify(womenData)}
`;

    const payload = {
      contents: [{ parts: [{ text: prompt }] }],
      systemInstruction: { parts: [{ text: systemPrompt }] },
      generationConfig: { responseMimeType: "application/json" }
    };

    const response = await fetch(`${apiUrl}?key=${apiKey}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    if (!response.ok) throw new Error(`Error en la API: ${response.status} ${response.statusText}`);

    const result = await response.json();
    const generatedContent = result.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!generatedContent) throw new Error("La respuesta de la IA no contiene contenido.");

    return JSON.parse(generatedContent);
  } catch (error: any) {
    console.error("Error al procesar el quiz:", error);
    return { error: error.message };
  }
};
