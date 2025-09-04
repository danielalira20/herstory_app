import { createClient } from "@supabase/supabase-js";
import GeminiAI from "gemini-ai";
import dotenv from "dotenv";
import { GoogleGenerativeAI  } from "@google/generative-ai";

dotenv.config();

const gemini = new GoogleGenerativeAI(process.env.VITE_GEMINI_API_KEY);

const supabaseAi = createClient(
  process.env.VITE_SUPABASE_WOMEN_URL,
  process.env.VITE_SUPABASE_WOMEN_ANON_KEY
);

function limpiarTexto(texto, maxLength = 500) {
  if (!texto) return "";

  return texto
    .normalize("NFKD")                         // Normaliza caracteres Unicode
    .replace(/[“”"']/g, "")                    // Quita comillas dobles y simples
    .replace(/\s+/g, " ")                      // Colapsa múltiples espacios
    .replace(/[^\p{L}\p{N}\s,.-]/gu, "")       // Quita caracteres raros
    .trim()
    .slice(0, maxLength);                      // Limita longitud
}


async function generateEmbeddings() {
  // Obtenemos todas las biografías
  const { data: mujeres, error } = await supabaseAi.from("mujeres").select("id, nombre_completo, biografia");

   if (error) {
    console.error("❌ Error al traer datos:", error);
    return;
  }

  if (!mujeres || mujeres.length === 0) {
    console.log("⚠️ No hay mujeres en la base de datos.");
    return;
  }

 const model = gemini.getGenerativeModel({ model: "models/embedding-001" });

  for (const mujer of mujeres) {
    try {

    let texto = `${mujer.nombre_completo || ""}, ${mujer.biografia || ""}`;
      texto = limpiarTexto(texto, 500);

      if (!texto || texto.length === 0) {
        console.warn(`⚠️ No hay texto válido para: ${mujer.nombre_completo}`);
        continue;
      }

    console.log(`📝 Generando embedding para: ${mujer.nombre_completo}`);
    
    const embeddingResponse = await model.embedContent({
        model: "models/embedding-001",
        content: {
          parts: [{ text: texto }],
        },
      });

    const embedding = embeddingResponse.embedding.values;

     const { error: updateError } = await supabaseAi
        .from("mujeres")
        .update({ embedding })
        .eq("id", mujer.id);

      if (updateError) {
        console.error(`❌ Error al actualizar embedding para ${mujer.nombre_completo}:`, updateError);
      } else {
        console.log(`✅ Embedding generado para: ${mujer.nombre_completo}`);
      }
    } catch (err) {
      console.error(`❌ Error con ${mujer.nombre_completo}:`, err);
    }
  }

  console.log("🎉 Embeddings generados correctamente.");
}

generateEmbeddings();
