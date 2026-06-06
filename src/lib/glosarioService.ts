import { supabaseMuseo } from "@/lib/supabaseMuseo";

export const getGlosario = async () => {
  const { data, error } = await supabaseMuseo
    .from("glosario")
    .select("*")
    .eq("activo", true)
    .order("termino", { ascending: true });

  if (error) throw error;
  return data;
};

export const getTerminoBySlug = async (slug: string) => {
  const { data, error } = await supabaseMuseo
    .from("glosario")
    .select("*")
    .eq("slug", slug)
    .eq("activo", true)
    .single();

  if (error) throw error;
  return data;
};