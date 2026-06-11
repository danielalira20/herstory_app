// Para usar la BD de personas desaparecidas
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

export interface Person {
  id: string;
  name: string;
  age: number;
  sexo: string;
  estado: string;
  fechaDesaparicion: string;
  folio: string;
  foto: string;
  estatura: string;
  peso: string;
  ojos: string;
  cabello: string;
  caracteristicas: string;
  proyeccionPath?: string | null;
  municipio_desaparicion?: string | null;
}

export function usePersons() {
  const [persons, setPersons] = useState<Person[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPersons = async () => {
      try {
        setLoading(true);
        setError(null);

        const { data, error } = await supabase
          .from("vista_mapa_publico")
          .select(`
            id,
            Nombre,
            Primer_apellido,
            Segundo_apellido,
            Edad,
            Sexo,
            "Desaparición",
            "Entidad_desaparición",
            folio,
            imagen_url,
            estatura,
            peso_kg,
            color_ojos,
            color_cabello,
            caracteriticas,
            proyeccion_path,
            municipio_desaparicion
          `)
          .order("id", { ascending: false })
          .limit(5000);

        if (error) {
          console.error("Error cargando personas:", error.message);
          setError("No se pudieron cargar los datos. Intenta más tarde.");
          setPersons([]);
          return;
        }

        if (!data || data.length === 0) {
          setError("No se encontraron registros de personas desaparecidas.");
          setPersons([]);
          return;
        }

        const transformed = data.map((item: any) => ({
          id: item.id?.toString(),
          name: `${item.Nombre || ""} ${item.Primer_apellido || ""} ${item.Segundo_apellido || ""}`.trim(),
          age: item.Edad || 0,
          sexo: item.Sexo || "No especificado",
          estado: item.Entidad_desaparición || "No especificado",
          fechaDesaparicion: item.Desaparición || "Fecha desconocida",
          folio: item.folio || "No disponible",
          foto: item.imagen_url ? item.imagen_url : "/assests/default.png",
          estatura: item.estatura ? `${item.estatura} cm` : "No especificada",
          peso: item.peso_kg ? `${item.peso_kg} kg` : "No especificado",
          ojos: item.color_ojos || "No especificado",
          cabello: item.color_cabello || "No especificado",
          caracteristicas: item.caracteriticas || "No hay información disponible",
          proyeccionPath: item.proyeccion_path || null,
          municipio_desaparicion: item.municipio_desaparicion || null,
        }));

        setPersons(transformed);
      } catch (err: any) {
        console.error("Error inesperado:", err.message);
        setError("Ocurrió un error inesperado. Intenta de nuevo más tarde.");
      } finally {
        setLoading(false);
      }
    };

    fetchPersons();
  }, []);

  return { persons, loading, error };
}
