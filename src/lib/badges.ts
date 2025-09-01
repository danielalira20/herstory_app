// lib/badges.ts
import { supabase } from "./supabaseClient";
import { toast } from "@/hooks/use-toast";

export const giveFirstBadge = async (userId: string) => {
  try {
    // 1. Verificamos si el usuario ya tiene la insignia asignada
    const { data: existingBadge, error: checkError } = await supabase
      .from("usuario_insignia")
      .select("id")
      .eq("user_id", userId)
      .eq("insignia_id", 1) 
      .maybeSingle();

    if (checkError) throw checkError;

    // Si ya tiene la insignia → salimos de la función
    if (existingBadge) {
      console.log("El usuario ya tiene la insignia asignada.");
      return;
    }

    // 2. Insertamos la insignia solo si no la tenía
    const { data, error } = await supabase
      .from("usuario_insignia")
      .insert([
        {
          user_id: userId,
          insignia_id: 1,
          asignar: true,
        },
      ])
      .select();

    if (error) throw error;

    console.log("Insignia asignada correctamente:", data);

       toast({
      title: "¡Felicidades! 🎉",
      description: "Has ganado la insignia por iniciar sesión por primera vez.",
    });
  } catch (error) {
    console.error("Error asignando insignia:", error);
  }
};


//SEGUNDA INSGNIA

export const giveForumBadge = async (userId: string) => {
  try {
    // Verificar si el usuario ya tiene la insignia
    const { data: existingBadge, error: checkError } = await supabase
      .from("usuario_insignia")
      .select("*")
      .eq("user_id", userId)
      .eq("insignia_id", 2) 
      .maybeSingle();

    if (checkError && checkError.code !== "PGRST116") {
      console.error("Error verificando insignia:", checkError);
      return;
    }

    // Si ya tiene la insignia, no hacemos nada
    if (existingBadge) return;

    // Insertar la nueva insignia
    const { error: insertError } = await supabase.from("usuario_insignia").insert([
      {
        user_id: userId,
        insignia_id: 2, 
        asignar: true,
      },
    ]);

    if (insertError) {
      console.error("Error asignando insignia 2:", insertError);
      return;
    }  toast({
      title: "¡Felicidades! 🎉",
      description: "Has ganado la insignia 'Pensamiento crítico y sabiduría'.",
    });



  } catch (err) {
    console.error("Error general al asignar insignia:", err);
  }
};


///TERCERA INSGNIA 
export const giveThirdBadge = async (userId: string) => {
  try {
    const { data: existingBadge, error } = await supabase
      .from("usuario_insignia")
      .select("*")
      .eq("user_id", userId)
      .eq("insignia_id", 3)
      .maybeSingle();

    if (error) throw error;
    if (existingBadge) return;

    await supabase.from("usuario_insignia").insert([{ user_id: userId, insignia_id: 3, asignar: true },]);
    console.log("Tercera insignia asignada!");
    toast({
      title: "¡Felicidades! 🎉",
      description: "Has ganado la insignia 'Liderazgo y transformación'.",
    });

  
  } catch (err) {
    console.error("Error asignando tercera insignia:", err);
  }
};

///CUARTA INSGNIA
export const giveFourthBadge = async (userId: string) => {
  try {
    const { data: existingBadge, error } = await supabase
      .from("usuario_insignia")
      .select("*")
      .eq("user_id", userId)
      .eq("insignia_id", 4)
      .maybeSingle();

    if (error) throw error;
    if (existingBadge) return;

    await supabase.from("usuario_insignia").insert([{ user_id: userId, insignia_id: 4, asignar: true }]);
    console.log("Cuarta insignia asignada!");
    toast({
      title: "¡Felicidades! 🎉",
      description: "Has ganado la insignia 'Haciendo Conciencia'.",
    });

  } catch (err) {
    console.error("Error asignando cuarta insignia:", err);
  }
};


//QUINTA INSGNIA
export const giveFifthBadge = async (userId: string) => {
  try {
    const { data: existingBadge, error } = await supabase
      .from("usuario_insignia")
      .select("*")
      .eq("user_id", userId)
      .eq("insignia_id", 5)
      .maybeSingle();

    if (error) throw error;
    if (existingBadge) return;

    await supabase.from("usuario_insignia").insert([{ user_id: userId, insignia_id: 5, asignar: true }]);
    console.log("Quinta insignia asignada!");
    toast({
      title: "¡Felicidades! 🎉",
      description: "Has ganado la insignia 'Mujeres como tú'.",
    });

  } catch (err) {
    console.error("Error asignando quinta insignia:", err);
  }
};
