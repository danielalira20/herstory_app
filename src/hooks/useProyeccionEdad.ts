import { useState } from "react"
import { supabase } from "@/lib/supabaseClient"

interface ProyeccionInput {
  casoId: number
  imagenUrl: string
  edadActual: number
  edadProyectada: number
  sexo: string
  añosDesaparecida: number
}

interface ProyeccionResult {
  success: boolean
  proyeccionUrl?: string
  error?: string
}

export const useProyeccionEdad = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // ── Convertir imagen URL a base64 ──
  const urlToBase64 = async (url: string): Promise<string> => {
    const response = await fetch(url)
    const blob = await response.blob()
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onloadend = () => {
        const base64 = (reader.result as string).split(",")[1]
        resolve(base64)
      }
      reader.onerror = reject
      reader.readAsDataURL(blob)
    })
  }

  // ── Generar proyección con Gemini ──
  const generarProyeccion = async (
    input: ProyeccionInput
  ): Promise<ProyeccionResult> => {
    setLoading(true)
    setError(null)

    try {
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY
      if (!apiKey) throw new Error("API key de Gemini no configurada")

      // Convertir imagen original a base64
      const imagenBase64 = await urlToBase64(input.imagenUrl)

      // Prompt forense
      const prompt = `Eres un sistema forense de proyección de edad para casos de personas desaparecidas en México.

TAREA:
A partir de la fotografía proporcionada, genera una imagen realista que muestre cómo podría verse esta persona después de ${input.añosDesaparecida} años de su desaparición.

CONTEXTO:
- Edad al momento de la desaparición: ${input.edadActual} años
- Edad proyectada: ${input.edadProyectada} años
- Sexo: ${input.sexo}

INSTRUCCIONES TÉCNICAS:
- Mantén los rasgos faciales únicos e identificables (estructura ósea, forma de ojos, nariz, orejas)
- Aplica cambios naturales de envejecimiento propios de la edad proyectada
- Conserva el tono de piel original
- Ajusta cabello de manera natural según el paso del tiempo
- NO agregues cicatrices, tatuajes ni marcas que no estén en la foto original
- NO cambies la identidad visual de la persona
- La imagen debe ser lo más realista y útil posible para identificación visual

RESTRICCIONES ÉTICAS:
- Esta imagen es únicamente para uso forense en búsqueda de personas desaparecidas
- La imagen no debe usarse para ningún otro propósito

Genera únicamente la imagen proyectada.`

      // Llamada a Gemini API con imagen
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent?key=${apiKey}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    inline_data: {
                      mime_type: "image/jpeg",
                      data: imagenBase64
                    }
                  },
                  { text: prompt }
                ]
              }
            ],
            generationConfig: {
              responseModalities: ["IMAGE", "TEXT"],
              temperature: 0.4,
            }
          })
        }
      )

      if (!response.ok) {
        const errData = await response.json()
        throw new Error(errData.error?.message || "Error en Gemini API")
      }

      const data = await response.json()

      // Extraer imagen generada
      const parts = data.candidates?.[0]?.content?.parts || []
      const imagePart = parts.find((p: any) => p.inline_data?.mime_type?.startsWith("image/"))

      if (!imagePart?.inline_data?.data) {
        throw new Error("Gemini no devolvió una imagen")
      }

      const imagenGeneradaBase64 = imagePart.inline_data.data
      const mimeType = imagePart.inline_data.mime_type

      // Convertir base64 a Blob
      const byteCharacters = atob(imagenGeneradaBase64)
      const byteNumbers = Array.from(byteCharacters, c => c.charCodeAt(0))
      const byteArray = new Uint8Array(byteNumbers)
      const blob = new Blob([byteArray], { type: mimeType })

      // Subir a Supabase Storage
      const fileName = `caso_${input.casoId}_proyeccion_${Date.now()}.jpg`
      const { error: uploadError } = await supabase.storage
        .from("proyecciones-edad")
        .upload(fileName, blob, {
          contentType: mimeType,
          upsert: true
        })

      if (uploadError) throw uploadError

      // Generar URL firmada (1 hora)
      const { data: signedData, error: signedError } = await supabase.storage
        .from("proyecciones-edad")
        .createSignedUrl(fileName, 3600)

      if (signedError) throw signedError

      // Guardar path en tabla personas
      await supabase
        .from("personas")
        .update({ proyeccion_path: fileName })
        .eq("id", input.casoId)

      return {
        success: true,
        proyeccionUrl: signedData.signedUrl
      }

    } catch (err: any) {
      const mensaje = err.message || "Error al generar proyección"
      setError(mensaje)
      return { success: false, error: mensaje }
    } finally {
      setLoading(false)
    }
  }

  // ── Obtener URL firmada de proyección existente ──
  const obtenerProyeccion = async (
    proyeccionPath: string
  ): Promise<string | null> => {
    try {
      const { data, error } = await supabase.storage
        .from("proyecciones-edad")
        .createSignedUrl(proyeccionPath, 3600)

      if (error) throw error
      return data.signedUrl
    } catch {
      return null
    }
  }

  return {
    generarProyeccion,
    obtenerProyeccion,
    loading,
    error
  }
}