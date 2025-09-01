import { useState, useEffect} from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Edit, Star, Award, Crown, Zap } from "lucide-react";
import { EditProfile } from "./EditProfile";
import { BadgeGrid } from "./BadgeGrid";
import { useNavigate } from "react-router-dom";
import {supabase} from '../lib/supabaseClient'
import { useAuth } from "@/hooks/useAuth";



export const UserProfile = () => {
  const { user } = useAuth();
  const [userData, setUserData] = useState<any>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [badges, setBadges] = useState<any[]>([]);
 const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  
  const fetchProfile = async () => {
    if (!user) return;
try{
     let { data: profile } = await supabase
      .from("profile")
      .select("*")
      .eq("id", user.id)
      .single()

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
    
      setUserData({
      ...profile,
      email: user.email
    });

    // Obtener todas las insignias
       const { data: allBadges } = await supabase
        .from("insignia")
        .select("*");

      // Obtener insignias que el usuario ya tiene
      const { data: userBadges} = await supabase
        .from("usuario_insignia")
        .select("insignia_id, fecha_obtenida")
        .eq("user_id", user.id);

      const earnedIds = userBadges?.map((b: any) => b.insignia_id) || [];

      // Mapear para BadgeGrid
      const mappedBadges = allBadges?.map((badge: any) => ({
        id: badge.id,
        name: badge.titulo,
        //description: badge.descripcion,
        //icon: "star", // Puedes cambiar según badge.tipo si lo tienes
        img : badge.imagen_url,
        earned: earnedIds.includes(badge.id),
        earnedDate: earnedIds.find((id: any) => id === badge.id)
          ? userBadges?.find((b: any) => b.insignia_id === badge.id)?.fecha_obtenida
          : undefined,
      })) || [];

      setBadges(mappedBadges);


}catch (error)
{
    console.error("Error fetching profile:", error);
} finally
{
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
    return name.split(" ").map((n: string) => n[0]).join("").toUpperCase();
  };

  const earnedBadges = badges.filter(badge => badge.earned);
const availableBadges = badges.filter(badge => !badge.earned);
  
  return (
    <div className="min-h-screen bg-gradient-subtle p-6">
      <div className="max-w-4xl mx-auto space-y-6">
      
       <div className="mb-4">
          <Button
            variant="secondary"
            onClick={() => navigate("/")} 
            className="bg-gradient-primary hover:bg-gradient-to-r from-primary to-secondary text-white font-semibold px-4 py-2 rounded-xl shadow-md transition-all duration-300 ease-in-out"
          >
            ⬅ Volver al Inicio
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
                <p className="text-sm text-muted-foreground">Insignias Obtenidas</p>
              </div>
              <div className="space-y-2">
                <div className="text-2xl font-bold text-secondary">
                  {availableBadges.length}
                </div>
                <p className="text-sm text-muted-foreground">Por Conseguir</p>
              </div>
              <div className="space-y-2">
                <div className="text-2xl font-bold text-accent">
                  {badges.length ? Math.round((earnedBadges.length / badges.length) * 100) : 0}%
                </div>
                <p className="text-sm text-muted-foreground">Progreso</p>
              </div>
            </div>
          </CardContent>

        </Card>

        {/* Badges Section */}
        <BadgeGrid badges={badges} />

        {/* Edit Profile Modal */}
        {isEditing && (
          <EditProfile
            userId={user.id}
            onSave={async () => { setIsEditing(false);
                            await fetchProfile(); }}
            onCancel={() => setIsEditing(false)}
          />
        )}
      </div>
    </div>
  );
};