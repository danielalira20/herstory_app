import { supabaseMuseo } from "@/lib/supabaseMuseo";

export const getGuias = async () => {
  const { data, error } = await supabaseMuseo
    .from("guias")
    .select("*")
    .eq("activa", true)
    .order("fecha", { ascending: false });

  if (error) throw error;
  return data;
};

export const getGuiaBySlug = async (slug: string) => {
  const { data, error } = await supabaseMuseo
    .from("guias")
    .select("*")
    .eq("slug", slug)
    .eq("activa", true)
    .single();

  if (error) throw error;
  return data;
};