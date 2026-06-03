import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabaseClient"

///ENDPOINTS PARA DASHBORD: CConteo de casos verificados y colectivos aliados

interface Stats {
  casosVerificados: number
  colectivosAliados: number
  loading: boolean
}

export const useStats = (): Stats => {
  const [casosVerificados, setCasosVerificados] = useState(0)
  const [colectivosAliados, setColectivosAliados] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      setLoading(true)
      try {
        // Conteo de casos verificados activos
        const { count: casos } = await supabase
          .from("personas")
          .select("*", { count: "exact", head: true })
          .eq("estado", "verificado")
          .eq("caso_cerrado", false)

        // Conteo de colectivos aliados activos
        const { count: colectivos } = await supabase
          .from("colectivos")
          .select("*", { count: "exact", head: true })
          .eq("es_aliado_verificador", true)
          .eq("activo", true)
          .eq("verificado", true)

        setCasosVerificados(casos ?? 0)
        setColectivosAliados(colectivos ?? 0)
      } catch (err) {
        console.error("Error fetching stats:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [])

  return { casosVerificados, colectivosAliados, loading }
}