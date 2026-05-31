import { useState } from "react"
import { supabase } from "@/lib/supabaseClient"

// ─────────────────────────────────────────
// TIPOS
// ─────────────────────────────────────────
export interface FormularioReporte {
  // Datos de la persona desaparecida
  Nombre: string
  Primer_apellido: string
  Segundo_apellido: string
  Edad: string
  Sexo: string
  Nacionalidad: string
  Desaparicion: string        // fecha
  Entidad_desaparicion: string
  folio: string
  estatura: string
  peso_kg: string
  color_ojos: string
  color_cabello: string
  caracteriticas: string      // descripción física + circunstancias

  // Contacto del familiar
  contacto_nombre: string
  contacto_relacion: string
  contacto_telefono: string
  contacto_email: string

  // Consentimiento
  consentimiento_almacenamiento: boolean
  consentimiento_proyeccion: boolean

  // Imagen
  imagen_url: string

  // Colectivo opcional
  colectivo_id: string
}

export interface ResultadoVerificacion {
  estado: 'limpio' | 'requiere_revision' | 'posible_duplicado'
  posible_duplicado_de: number | null
  similitud: number
}

// ─────────────────────────────────────────
// ESTADO INICIAL
// ─────────────────────────────────────────
const estadoInicial: FormularioReporte = {
  Nombre: "",
  Primer_apellido: "",
  Segundo_apellido: "",
  Edad: "",
  Sexo: "",
  Nacionalidad: "Mexicana",
  Desaparicion: "",
  Entidad_desaparicion: "",
  folio: "",
  estatura: "",
  peso_kg: "",
  color_ojos: "",
  color_cabello: "",
  caracteriticas: "",
  contacto_nombre: "",
  contacto_relacion: "",
  contacto_telefono: "",
  contacto_email: "",
  consentimiento_almacenamiento: false,
  consentimiento_proyeccion: false,
  imagen_url: "",
  colectivo_id: "",
}

// ─────────────────────────────────────────
// LEVENSHTEIN NORMALIZADO
// ─────────────────────────────────────────
function levenshteinNormalizado(a: string, b: string): number {
  if (!a || !b) return 0

  // Normalizar: minúsculas, sin acentos, sin espacios extra
  const normalizar = (str: string) =>
    str
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .trim()

  const s1 = normalizar(a)
  const s2 = normalizar(b)

  if (s1 === s2) return 1

  const m = s1.length
  const n = s2.length

  // Matriz de distancias
  const dp: number[][] = Array.from(
    { length: m + 1 },
    (_, i) => Array.from({ length: n + 1 }, (_, j) => (i === 0 ? j : j === 0 ? i : 0))
  )

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (s1[i - 1] === s2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1]
      } else {
        dp[i][j] = 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1])
      }
    }
  }

  const distancia = dp[m][n]
  const maxLen = Math.max(m, n)
  return 1 - distancia / maxLen
}

// ─────────────────────────────────────────
// VALIDACIONES DE COHERENCIA
// ─────────────────────────────────────────
function validarCoherencia(datos: FormularioReporte): string[] {
  const errores: string[] = []

  // Fecha no puede ser futura
  if (datos.Desaparicion) {
    const fecha = new Date(datos.Desaparicion)
    const hoy = new Date()
    if (fecha > hoy) {
      errores.push("fecha_futura")
    }
  }

  // Edad debe ser un número razonable
  if (datos.Edad) {
    const edad = parseInt(datos.Edad)
    if (isNaN(edad) || edad < 0 || edad > 120) {
      errores.push("edad_invalida")
    }
  }

  // Estatura razonable si se proporciona
  if (datos.estatura) {
    const estatura = parseInt(datos.estatura)
    if (isNaN(estatura) || estatura < 50 || estatura > 250) {
      errores.push("estatura_invalida")
    }
  }

  return errores
}

// ─────────────────────────────────────────
// HOOK PRINCIPAL
// ─────────────────────────────────────────
export function useReportar() {
  const [formData, setFormData] = useState<FormularioReporte>(estadoInicial)
  const [loadingImagen, setLoadingImagen] = useState(false)
  const [loadingEnvio, setLoadingEnvio] = useState(false)
  const [enviado, setEnviado] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [paso, setPaso] = useState<1 | 2 | 3>(1)
  // paso 1: formulario
  // paso 2: consentimiento
  // paso 3: confirmación

  // ── Actualizar campo ──
  const actualizarCampo = (campo: keyof FormularioReporte, valor: string | boolean) => {
    setFormData(prev => ({ ...prev, [campo]: valor }))
  }

  // ── Subir imagen a Cloudinary ──
  const subirImagen = async (archivo: File): Promise<string | null> => {
    setLoadingImagen(true)
    try {
      const data = new FormData()
      data.append("file", archivo)
      data.append("upload_preset", "herStory_desaparecidas")
      data.append("folder", "mujeresDesaparecidas")

      const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUND_NAME
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        { method: "POST", body: data }
      )
      const json = await res.json()

      if (json.secure_url) {
        actualizarCampo("imagen_url", json.secure_url)
        return json.secure_url
      }
      return null
    } catch (err) {
      console.error("Error subiendo imagen:", err)
      return null
    } finally {
      setLoadingImagen(false)
    }
  }

  // ── Verificar duplicados con Levenshtein ──
  const verificarDuplicados = async (): Promise<ResultadoVerificacion> => {
  try {
    // Primero verificar match exacto de folio
    if (formData.folio) {
      const { data: folioMatch } = await supabase
        .from("personas")
        .select("id")
        .eq("folio", formData.folio.trim())
        .eq("estado", "verificado")
        .maybeSingle()

      if (folioMatch) {
        return {
          estado: 'posible_duplicado',
          posible_duplicado_de: folioMatch.id,
          similitud: 1
        }
      }
    }

    // Usar función de PostgreSQL para comparar nombres
    const { data, error } = await supabase
        .rpc('buscar_duplicados', {
            p_nombre: formData.Nombre,
            p_primer_apellido: formData.Primer_apellido,
            p_segundo_apellido: formData.Segundo_apellido || '',
            p_folio: formData.folio || null
        })

        if (error) {
        console.error("Error en buscar_duplicados:", error)
        return { estado: 'limpio', posible_duplicado_de: null, similitud: 0 }
        }

        if (data && data.length > 0) {
        // Ordenar por similitud descendente y tomar el más similar
        const mejorMatch = data.sort((a: any, b: any) => b.similitud - a.similitud)[0]
        return {
            estado: 'posible_duplicado',
            posible_duplicado_de: mejorMatch.caso_id,
            similitud: mejorMatch.similitud
        }
        }

        return { estado: 'limpio', posible_duplicado_de: null, similitud: 0 }

    } catch (err) {
        console.error("Error verificando duplicados:", err)
        return { estado: 'limpio', posible_duplicado_de: null, similitud: 0 }
    }
    }

  // ── Enviar email de confirmación vía Formspree ──
  const enviarEmailConfirmacion = async () => {
    try {
      await fetch("https://formspree.io/f/mnnbzagw", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          _replyto: formData.contacto_email,
          _subject: `Reporte recibido - ${formData.Nombre} ${formData.Primer_apellido}`,
          nombre_familiar: formData.contacto_nombre,
          nombre_desaparecida: `${formData.Nombre} ${formData.Primer_apellido} ${formData.Segundo_apellido}`,
          email_contacto: formData.contacto_email,
          telefono_contacto: formData.contacto_telefono,
          mensaje: `Hemos recibido el reporte de ${formData.Nombre} ${formData.Primer_apellido}. 
Nuestro equipo lo revisará en las próximas 24-48 horas.
Si tienes dudas escríbenos a herstoryy2025@gmail.com`
        })
      })
    } catch (err) {
      // El email es secundario, no bloqueamos el flujo si falla
      console.error("Error enviando email:", err)
    }
  }

  // ── Enviar formulario completo ──
  const enviarReporte = async (): Promise<boolean> => {
    setLoadingEnvio(true)
    setError(null)

    try {
      // Validar consentimiento mínimo obligatorio
      if (!formData.consentimiento_almacenamiento) {
        setError("Debes autorizar el almacenamiento de la información para continuar.")
        return false
      }

      // Validar campos obligatorios
      if (!formData.Nombre || !formData.Primer_apellido ||
          !formData.Desaparicion || !formData.Entidad_desaparicion ||
          !formData.folio || !formData.contacto_email || !formData.contacto_telefono) {
        setError("Por favor completa todos los campos obligatorios.")
        return false
      }

      // Validar coherencia
      const erroresCoherencia = validarCoherencia(formData)
      if (erroresCoherencia.includes("fecha_futura")) {
        setError("La fecha de desaparición no puede ser una fecha futura.")
        return false
      }

      // Verificar duplicados
      const resultadoVerificacion = await verificarDuplicados()

      // Obtener IP (aproximada, solo para registro)
      let ip = ""
      try {
        const ipRes = await fetch("https://api.ipify.org?format=json")
        const ipJson = await ipRes.json()
        ip = ipJson.ip
      } catch {
        ip = "no_disponible"
      }

      // Guardar en Supabase
      const { error: supabaseError } = await supabase
        .from("personas")
        .insert({
          // Datos de la persona
          Nombre: formData.Nombre,
          Primer_apellido: formData.Primer_apellido,
          Segundo_apellido: formData.Segundo_apellido || null,
          Edad: formData.Edad ? parseInt(formData.Edad) : null,
          Sexo: formData.Sexo || null,
          Nacionalidad: formData.Nacionalidad || "Mexicana",
          "Desaparición": formData.Desaparicion,
          "Entidad_desaparición": formData.Entidad_desaparicion,
          folio: formData.folio,
          imagen_url: formData.consentimiento_almacenamiento
            ? formData.imagen_url || null
            : null,
          estatura: formData.estatura ? parseInt(formData.estatura) : null,
          peso_kg: formData.peso_kg ? parseInt(formData.peso_kg) : null,
          color_ojos: formData.color_ojos || null,
          color_cabello: formData.color_cabello || null,
          caracteriticas: formData.caracteriticas || null,
          contacto_desaparecida: formData.contacto_telefono,

          // Estado inicial
          estado: "pendiente",
          coherencia_validada: erroresCoherencia.length === 0,
          errores_coherencia: erroresCoherencia,

          // Verificación duplicados
          estado_verificacion_duplicado: resultadoVerificacion.estado,
          posible_duplicado_de: resultadoVerificacion.posible_duplicado_de,

          // Consentimiento
          consentimiento_almacenamiento: formData.consentimiento_almacenamiento,
          consentimiento_proyeccion: formData.consentimiento_proyeccion,
          fecha_consentimiento: new Date().toISOString(),
          consentimiento_ip: ip,

          // Caso activo
          caso_cerrado: false,
        })

      if (supabaseError) {
        console.error("Error Supabase:", supabaseError)
        setError("Hubo un problema al enviar tu reporte. Por favor intenta de nuevo.")
        return false
      }

      // Vincular colectivo si se seleccionó uno
      if (formData.colectivo_id && formData.colectivo_id !== "ninguno") {
        const { data: casoInsertado } = await supabase
          .from("personas")
          .select("id")
          .eq("folio", formData.folio)
          .single()

        if (casoInsertado) {
          await supabase
            .from("caso_colectivo")
            .insert({
              caso_id: casoInsertado.id,
              colectivo_id: parseInt(formData.colectivo_id),
              vinculado_por: "familiar"
            })
        }
      }

      // Enviar email de confirmación
      await enviarEmailConfirmacion()

      setEnviado(true)
      setPaso(3)
      return true

    } catch (err) {
      console.error("Error inesperado:", err)
      setError("Ocurrió un error inesperado. Por favor intenta de nuevo.")
      return false
    } finally {
      setLoadingEnvio(false)
    }
  }

  const reiniciar = () => {
    setFormData(estadoInicial)
    setEnviado(false)
    setError(null)
    setPaso(1)
  }

  return {
    formData,
    actualizarCampo,
    subirImagen,
    enviarReporte,
    reiniciar,
    loadingImagen,
    loadingEnvio,
    enviado,
    error,
    paso,
    setPaso,
  }
}