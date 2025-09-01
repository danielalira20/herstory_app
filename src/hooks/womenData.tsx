{/* Mnadar a llamar la BD de mujeres historicas para la trivia con IA */ }

import { useEffect, useState } from "react";
import { supabaseMuseo } from "@/lib/supabaseMuseo";

export interface Categoria {
  id: number;
  nombre: string;
}

export interface Woman {
  id: number;
  nombre_completo: string;
  biografia: string;
  año_nacimiento: number;
  año_fallecimiento: number;
  imagen_url: string;
  categoria?: Categoria; 
  logros: string;
  ocupacion: string;
}

export const useWomen = () => {
  const [women, setWomen] = useState<Woman[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWomen = async () => {
      setLoading(true);
      const { data, error } = await supabaseMuseo
        .from("mujeres")
        .select(`*,
          categorias (id, nombre)`);

      if (error) {
        console.error("Error fetching women:", error);
        setError(error.message);
      } else if (data) {
        setWomen(data as Woman[]);
      }

      setLoading(false);
    };

    fetchWomen();
  }, []);

  return { women, loading, error };
};
