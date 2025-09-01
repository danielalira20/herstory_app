import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, ExternalLink, Calendar, MapPin, Award, Book } from "lucide-react";
import { supabaseMuseo } from "@/lib/supabaseMuseo";

interface WomanData {
  id: number;
  imagen_url: string;
  nombre_completo: string;
  siglo: string  | null;
  año_nacimiento: number;
  año_fallecimiento: number;
  ocupacion: string;
  logros: string;
  biografia: string;
  origen_id: number | null;
}

interface WomanQuery {
  id: number;
  nombre_completo: string;
  biografia: string;
  año_nacimiento: number;
  año_fallecimiento: number | null;
  imagen_url: string;
  ocupacion: string;
  logros: string;
  origen: { id: number; nombre: string } | null;
  siglo: { id: number; numero: string } | null;
}


interface Origin {
  id: number;
  nombre: string;
}

interface Link {
  id: number;
  url: string;
  descripcion: string;
  mujer_id: number;
}
interface LinkQuery {
  id: number;
  url: string;
  descripcion: string;
  mujer_id: number;
}

const WomanDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [woman, setWoman] = useState<WomanData | null>(null);
  const [origin, setOrigin] = useState<Origin | null>(null);
  const [links, setLinks] = useState<Link[]>([]);
  const [loading, setLoading] = useState(true);

useEffect(() => {
  const loadWomanData = async () => {
    if (!id) return;

    try {
      setLoading(true);

       const { data: womanData, error: womanError } = await supabaseMuseo
        .from("mujeres")
        .select(`
          id,
          nombre_completo,
          biografia,
          año_nacimiento,
          año_fallecimiento,
          imagen_url,
          ocupacion,
          logros,
          origen:origen (id, nombre),
          siglo:siglos (id, numero)
        `)
        .eq("id", id)
        .single<WomanQuery>();

      if (womanError) throw womanError;

      const { data: linksData, error: linksError } = await supabaseMuseo
        .from("links")
        .select("id, url, descripcion")
        .eq("mujer_id", id)
        .order("id", { ascending: true })
        .returns<LinkQuery[]>();

      if (linksError) throw linksError;

       setWoman({
        id: womanData.id,
        imagen_url: womanData.imagen_url,
        nombre_completo: womanData.nombre_completo,
        siglo: womanData.siglo?.numero || "Desconocido",
        año_nacimiento: womanData.año_nacimiento,
        año_fallecimiento: womanData.año_fallecimiento,
        ocupacion: womanData.ocupacion,
        logros: womanData.logros,
        biografia: womanData.biografia,
        origen_id: womanData.origen?.id || null,
      });

      setOrigin(womanData.origen || null);
      setLinks(linksData || []);
    } catch (error) {
      console.error("Error cargando datos de la mujer:", error);
    } finally {
      setLoading(false);
    }
  };

  loadWomanData();
}, [id]);


  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!woman) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Mujer no encontrada</h1>
          <Button onClick={() => navigate('/')}>Volver al inicio</Button>
        </div>
      </div>
    );
  }

  const logrosArray = woman.logros
  ? woman.logros.split("\n").map((logro) => logro.trim())
  : [];

  return (
    
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-secondary text-primary-foreground py-6">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <Button
            variant="ghost"
            onClick={() => navigate('/herstory')}
            className="text-primary-foreground hover:bg-white/20 mb-4"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Volver
          </Button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Hero section */}
            <div className="grid md:grid-cols-2 gap-8">
              <div className="relative">
                <img
                  src={woman.imagen_url || "/assets/default.png"}
                  alt={woman.nombre_completo}
                  className="w-full aspect-[3/4] object-cover rounded-2xl shadow-[var(--shadow-elegant)]"
                />
              </div>
              
              <div className="space-y-6">
                <div>
                  <h1 className="text-4xl md:text-5xl font-bold mb-4 cinematic-text">
                    {woman.nombre_completo}
                  </h1>
                  <div className="flex flex-wrap gap-2 mb-6">
                    <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">
                      Siglo {woman.siglo}
                    </span>
                    <span className="bg-secondary/10 text-secondary px-3 py-1 rounded-full text-sm font-medium">
                      {origin?.nombre}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center text-muted-foreground">
                    <Calendar className="mr-2 h-4 w-4" />
                    <span className="text-sm">
                      {woman.año_nacimiento}
                      {woman.año_fallecimiento && ` - ${woman.año_fallecimiento}`}
                    </span>
                  </div>
                  <div className="flex items-center text-muted-foreground">
                    <MapPin className="mr-2 h-4 w-4" />
                    <span className="text-sm">{origin?.nombre}</span>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-start">
                    <Book className="mr-3 h-5 w-5 text-primary mt-1" />
                    <div>
                      <h3 className="font-semibold mb-2">Ocupación</h3>
                      <p className="text-muted-foreground">{woman.ocupacion}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Award className="mr-3 h-5 w-5 text-primary mt-1" />
                    <div>
                      <h3 className="font-semibold mb-2">Logros Destacados</h3>
                      {logrosArray.length > 0 ? (
                        <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                          {logrosArray.map((logro, index) => (
                            <li key={index}>{logro}</li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-gray-500">No hay logros registrados.</p>
                      )}
                     </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Biography */}
            <Card>
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold mb-6 cinematic-text">Biografía</h2>
                <div className="prose prose-lg max-w-none text-muted-foreground leading-relaxed">
                  <p>{woman.biografia}</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar - Educational resources */}
          <div className="lg:col-span-1">
            <Card className="sticky top-8">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-6 cinematic-text">
                  Recursos Educativos
                </h3>
                
                <div className="space-y-4">
                  {links.map((link) => (
                    <a
                      key={link.id}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block group"
                    >
                      <div className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors duration-200">
                        <div className="flex-1">
                          <p className="font-medium group-hover:text-primary transition-colors">
                            {link.descripcion}
                          </p>
                        </div>
                        <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                      </div>
                    </a>
                  ))}
                </div>

                <div className="mt-8 pt-6 border-t border-border">
                  <Button 
                    onClick={() => navigate('/herstory')}
                    className="w-full bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90"
                  >
                    Explorar más mujeres
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WomanDetail;