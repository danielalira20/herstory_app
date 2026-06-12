import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Edit, Star, Award, Crown, Zap, Sparkles, MapPin, Clock } from "lucide-react";
import { EditProfile } from "./EditProfile";
import { BadgeGrid } from "./BadgeGrid";
import PanicSettings from "@/components/PanicSettings";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";
import { useAuth } from "@/hooks/useAuth";

const CATEGORIAS_LABEL: Record<string, string> = {
  voces_creadoras: "Voces Creadoras",
  pensamiento_critico: "Pensamiento Crítico y Sabiduría",
  guardianas_dignidad: "Guardianas de la Dignidad",
  liderazgo_transformacion: "Liderazgo y Transformación",
  deporte: "Deporte",
  naturaleza_planeta: "Naturaleza y Defensa del Planeta",
  ciencia_salud_tecnologia: "Ciencia, Salud y Tecnología",
};

export const UserProfile = () => {
  const { user, signOut } = useAuth();
  const [userData, setUserData] = useState<any>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [badges, setBadges] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchProfile = async () => {
    if (!user) return;
    try {
      let { data: profile } = await supabase
        .from("profile")
        .select("*")
        .eq("id", user.id)
        .single();

      if (!profile) {
        const { data: newProfile } = await supabase
          .from("profile")
          .insert({
            id: user.id,
            full_name: `Usuario ${user.id.slice(0, 5)}`,
            avatar_url: "",
          })
          .select()
          .single();
        profile = newProfile;
      }

      // ── Sincronización del match histórico ──
      const matchLocal = localStorage.getItem("herstory-match");

      if (matchLocal && !profile.match_figura) {
        try {
          const figura = JSON.parse(matchLocal);
          const { data: updatedProfile } = await supabase
            .from("profile")
            .update({ match_figura: figura })
            .eq("id", user.id)
            .select()
            .single();

          if (updatedProfile) profile = updatedProfile;
          console.log("✨ Match sincronizado a Supabase:", figura.nombre);
        } catch (err) {
          console.error("Error sincronizando match:", err);
        }
      } else if (profile.match_figura && !matchLocal) {
        localStorage.setItem(
          "herstory-match",
          JSON.stringify(profile.match_figura)
        );
        console.log(
          "✨ Match cargado desde Supabase:",
          profile.match_figura.nombre
        );
      }

      setUserData({
        ...profile,
        email: user.email,
      });

      // Obtener todas las insignias
      const { data: allBadges } = await supabase
        .from("insignia")
        .select("*");

      // Obtener insignias que el usuario ya tiene
      const { data: userBadges } = await supabase
        .from("usuario_insignia")
        .select("insignia_id, fecha_obtenida")
        .eq("user_id", user.id);

      const earnedIds = userBadges?.map((b: any) => b.insignia_id) || [];

      const mappedBadges =
        allBadges?.map((badge: any) => ({
          id: badge.id,
          name: badge.titulo,
          img: badge.imagen_url,
          earned: earnedIds.includes(badge.id),
          earnedDate: earnedIds.find((id: any) => id === badge.id)
            ? userBadges?.find((b: any) => b.insignia_id === badge.id)
                ?.fecha_obtenida
            : undefined,
        })) || [];

      setBadges(mappedBadges);
    } catch (error) {
      console.error("Error fetching profile:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      await fetchProfile();
      setLoading(false);
    };
    if (user) load();
  }, [user]);

  if (loading || !userData) return <div>Cargando...</div>;

  const getInitials = (name: string) => {
    if (!name) return "";
    return name
      .split(" ")
      .map((n: string) => n[0])
      .join("")
      .toUpperCase();
  };

  const earnedBadges = badges.filter((badge) => badge.earned);
  const availableBadges = badges.filter((badge) => !badge.earned);
  const figura = userData.match_figura;

  return (
    <div className="min-h-screen bg-gradient-subtle p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="mb-4 flex items-center justify-between">
          <Button
            variant="secondary"
            onClick={() => navigate("/")}
            className="bg-gradient-primary hover:bg-gradient-to-r from-primary to-secondary text-white font-semibold px-4 py-2 rounded-xl shadow-md transition-all duration-300 ease-in-out"
          >
            ⬅ Volver al Inicio
          </Button>

          <Button
            variant="outline"
            onClick={async () => {
            await signOut();
            navigate("/login");
        }}
            className="border-2 border-purple-300 text-purple-700 hover:bg-purple-100 hover:text-purple-800 font-semibold px-4 py-2 rounded-xl"
          >
            Cerrar sesión
          </Button>
    </div>

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-2">
            Mi Perfil
          </h1>
          <p className="text-muted-foreground">
            Tu progreso navegando por HerStory
          </p>
        </div>

        {/* Profile Card */}
        <Card className="card-elegant">
          <CardHeader className="text-center pb-2">
            <div className="relative mx-auto mb-4">
              <Avatar className="w-24 h-24 border-4 border-primary/20">
                <AvatarImage src={userData.avatar_url} />
                <AvatarFallback className="bg-gradient-primary text-primary-foreground text-xl font-bold">
                  {getInitials(userData.full_name)}
                </AvatarFallback>
              </Avatar>
              <Button
                variant="outline"
                size="icon"
                className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full border-2 border-background bg-primary hover:bg-primary/90 text-primary-foreground"
                onClick={() => setIsEditing(true)}
              >
                <Edit className="w-4 h-4" />
              </Button>
            </div>
            <CardTitle className="text-2xl">{userData.full_name}</CardTitle>
            <p className="text-muted-foreground">{userData.email}</p>
          </CardHeader>

          <CardContent className="pt-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div className="space-y-2">
                <div className="text-2xl font-bold text-primary">
                  {earnedBadges.length}
                </div>
                <p className="text-sm text-muted-foreground">
                  Insignias Obtenidas
                </p>
              </div>
              <div className="space-y-2">
                <div className="text-2xl font-bold text-secondary">
                  {availableBadges.length}
                </div>
                <p className="text-sm text-muted-foreground">Por Conseguir</p>
              </div>
              <div className="space-y-2">
                <div className="text-2xl font-bold text-accent">
                  {badges.length
                    ? Math.round(
                        (earnedBadges.length / badges.length) * 100
                      )
                    : 0}
                  %
                </div>
                <p className="text-sm text-muted-foreground">Progreso</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tu compañera histórica */}
        {figura && (
          <Card className="card-elegant overflow-hidden">
            <div
              className="p-6"
              style={{
                background:
                  "linear-gradient(135deg, #4c1d95 0%, #7e22ce 50%, #a855f7 100%)",
              }}
            >
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="w-4 h-4 text-pink-200" />
                <p className="text-xs uppercase tracking-[3px] text-pink-200">
                  Tu compañera histórica
                </p>
              </div>

              <div className="flex items-center gap-4">
                {figura.imagen_url && (
                  <img
                    src={figura.imagen_url}
                    alt={figura.nombre}
                    className="w-20 h-20 rounded-full object-cover border-2 border-pink-300/30 shadow-lg flex-shrink-0"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                    }}
                  />
                )}

                <div className="flex-1 min-w-0">
                  <h3 className="text-2xl font-serif font-bold text-white truncate">
                    {figura.nombre}
                  </h3>
                  <p className="text-purple-200/80 font-serif italic text-sm mb-2">
                    {CATEGORIAS_LABEL[figura.categoria_campo] ||
                      figura.categoria_campo}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {figura.epoca && (
                      <span className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/10 border border-white/10 text-xs text-white/80">
                        <Clock className="w-3 h-3 text-pink-300" />
                        {figura.epoca}
                      </span>
                    )}
                    {figura.region && (
                      <span className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/10 border border-white/10 text-xs text-white/80">
                        <MapPin className="w-3 h-3 text-pink-300" />
                        {figura.region}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </Card>
        )}

        {/* Badges Section */}
        <BadgeGrid badges={badges} />

        {/* Configuración del botón de pánico */}
        <PanicSettings />

        {/* Edit Profile Modal */}
        {isEditing && (
          <EditProfile
            userId={user.id}
            onSave={async () => {
              setIsEditing(false);
              await fetchProfile();
            }}
            onCancel={() => setIsEditing(false)}
          />
        )}
      </div>
    </div>
  );
};