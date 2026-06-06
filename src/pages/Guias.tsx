import { useState, useEffect } from "react";
import { getGuias } from "@/lib/guiasService";
import { GuideCard } from "@/components/ui/guide-card";
import NavbarLearn from "@/components/NavbarLearn";
import { Button } from "@/components/ui/button";
import { MessageCircle, BookOpen } from "lucide-react";
import headerImage from "@/assets/guides-book.jpg";

const categorias = [
  "Todas",
  "Derechos Humanos",
  "Derechos Laborales",
  "Salud Sexual",
  "Recursos Legales",
  "Violencia",
  "Empoderamiento",
  "Salud Digital",
];

const Guias = () => {
  const [guias, setGuias] = useState([]);
  const [categoriaActiva, setCategoriaActiva] = useState("Todas");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cargar = async () => {
      try {
        const data = await getGuias();
        setGuias(data);
      } catch (e) {
        console.error("Error cargando guías:", e);
      } finally {
        setLoading(false);
      }
    };
    cargar();
  }, []);

  const guiasFiltradas =
    categoriaActiva === "Todas"
      ? guias
      : guias.filter((g: any) => g.categoria === categoriaActiva);

  return (
    <div className="min-h-screen bg-background">
      <NavbarLearn />

      {/* Hero editorial */}
      <div className="relative w-full h-56 overflow-hidden">
        <img
          src={headerImage}
          alt="Guías de apoyo"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/30 flex items-end pb-8 px-8">
          <div className="text-white max-w-2xl">
            <p className="text-xs uppercase tracking-widest opacity-70 mb-1">Recursos</p>
            <h1 className="text-3xl md:text-4xl font-bold leading-tight">Guías de Apoyo</h1>
            <p className="text-sm opacity-80 mt-1">
              Documentos descargables para informarte, protegerte y actuar.
            </p>
          </div>
        </div>
      </div>

      <div className="container py-10 max-w-6xl">

        {/* Filtros */}
        <div className="flex flex-wrap gap-2 mb-10">
          {categorias.map((cat) => (
            <Button
              key={cat}
              variant={categoriaActiva === cat ? "default" : "outline"}
              size="sm"
              className="rounded-full text-xs"
              onClick={() => setCategoriaActiva(cat)}
            >
              {cat}
            </Button>
          ))}
        </div>

        {/* Contador */}
        {!loading && (
          <p className="text-sm text-muted-foreground mb-6">
            {guiasFiltradas.length} {guiasFiltradas.length === 1 ? "guía" : "guías"} disponibles
          </p>
        )}

        {/* Grid */}
        {loading ? (
          <div className="text-center py-24 text-muted-foreground">Cargando guías...</div>
        ) : guiasFiltradas.length === 0 ? (
          <div className="text-center py-24 text-muted-foreground">
            No hay guías en esta categoría.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {guiasFiltradas.map((guia: any) => (
              <GuideCard
                key={guia.id}
                title={guia.titulo}
                description={guia.descripcion}
                category={guia.categoria}
                downloadUrl={guia.url_descarga}
                isNew={guia.es_nueva}
              />
            ))}
          </div>
        )}

        {/* CTA Chatbot */}
        <div className="mt-16 border border-primary/20 rounded-2xl p-8 text-center bg-primary/5">
          <MessageCircle className="h-8 w-8 mx-auto mb-3 text-primary opacity-80" />
          <h2 className="text-lg font-semibold mb-1">¿No sabes qué guía necesitas?</h2>
          <p className="text-sm text-muted-foreground mb-4 max-w-md mx-auto">
            HerStoryBot puede orientarte según tu situación de forma privada y segura.
          </p>
          <Button
            variant="default"
            size="sm"
            className="gap-2"
            onClick={() => {
              const btn = document.querySelector("[data-herstorybot-trigger]") as HTMLButtonElement;
              btn?.click();
            }}
          >
            <MessageCircle className="h-4 w-4" />
            Hablar con HerStoryBot
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Guias;