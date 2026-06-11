// lib/badges.ts — 6 insignias actualizadas para HerStory
import { supabase } from "./supabaseClient";
import { toast } from "@/hooks/use-toast";

// Función base para asignar cualquier insignia
const giveBadge = async (
  userId: string,
  insigniaId: number,
  toastTitle: string,
  toastDescription: string
) => {
  try {
    // Verificar si ya la tiene
  const { data: existing, error: checkError } = await supabase
  .from("usuario_insignia")
  .select("id")
  .eq("user_id", userId)
  .eq("insignia_id", insigniaId)
  .limit(1);

if (checkError) throw checkError;
if (existing && existing.length > 0) return; // Ya la tiene

    // Asignar insignia
    const { error } = await supabase.from("usuario_insignia").insert([
      {
        user_id: userId,
        insignia_id: insigniaId,
        asignar: true,
      },
    ]);

    if (error) throw error;

    console.log(`✅ Insignia ${insigniaId} asignada`);
    toast({ title: toastTitle, description: toastDescription });
  } catch (err) {
    console.error(`Error asignando insignia ${insigniaId}:`, err);
  }
};

// ── 1. Bienvenida — Iniciar sesión por primera vez ──
// Trigger: en el hook de login/auth
export const giveFirstBadge = (userId: string) =>
  giveBadge(userId, 1, "¡Bienvenida! 🎉", "Has ganado la insignia por iniciar sesión por primera vez.");

// ── 2. Tu historia comienza — Completar onboarding + match ──
// Trigger: en Quiz.tsx cuando onComplete se ejecuta
export const giveOnboardingBadge = (userId: string) =>
  giveBadge(userId, 2, "¡Tu historia comienza! ✨", "Descubriste a tu compañera histórica.");

// ── 3. Voz que escucha — Primera conversación con Auren ──
// Trigger: en HerStoryBot.tsx al enviar el primer mensaje
export const giveAurenBadge = (userId: string) =>
  giveBadge(userId, 3, "¡Voz que escucha! 💬", "Tuviste tu primera conversación con Auren.");

// ── 4. Exploradora — Visitar el museo / ver una figura ──
// Trigger: en WomanDetail.tsx al abrir el detalle de una mujer
export const giveExploradoraBadge = (userId: string) =>
  giveBadge(userId, 4, "¡Exploradora! 🏛️", "Visitaste el museo y conociste a una mujer histórica.");

// ── 5. Jugadora — Completar cualquier trivia o juego ──
// Trigger: en QuizTrivias.tsx, QuienSoy.tsx, o FraseCelebre.tsx al terminar
export const giveJugadoraBadge = (userId: string) =>
  giveBadge(userId, 5, "¡Jugadora! 🎮", "Completaste tu primera trivia o juego.");

// ── 6. Protegida — Configurar código del botón de pánico ──
// Trigger: en PanicSettings.tsx al guardar el código
export const giveProtegidaBadge = (userId: string) =>
  giveBadge(userId, 6, "¡Protegida! 🛡️", "Configuraste tu código del botón de pánico.");

// ── Exports legacy (compatibilidad con código existente) ──
export const giveForumBadge = giveOnboardingBadge;
export const giveThirdBadge = giveJugadoraBadge;
export const giveFourthBadge = giveJugadoraBadge;
export const giveFifthBadge = giveExploradoraBadge;