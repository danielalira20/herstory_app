import { useState, useEffect } from "react";
import { getGuias } from "@/lib/guiasService";
import { GuideCard } from "@/components/ui/guide-card";
import NavbarLearn from "@/components/NavbarLearn";
import { Button } from "@/components/ui/button";
import { BookOpen, MessageCircle } from "lucide-react";
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

  const guiasFiltradas = categoriaActiva === "Todas"
    ? guias
    : guias.filter((g: any) => g.categoria === categoriaActiva);

  return (
    <div className="min-h-screen bg-background">
      <NavbarLearn />

      {/* Hero */}
      <div className="relative w-full h-52 overflow-hidden">
        <img
          src={headerImage}
          alt="Guías de apoyo"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <div className="text-center text-white">
            <BookOpen className="h-10 w-10 mx-auto mb-2 opacity-80" />
            <h1 className="text-3xl md:text-4xl font-bold mb-1">Guías de Apoyo</h1>
            <p className="text-lg opacity-80">Recursos descargables para cada situación</p>
          </div>
        </div>
      </div>

      <div className="container py-10">

        {/* Filtros */}
        <div className="flex flex-wrap gap-2 mb-8 justify-center">
          {categorias.map((cat) => (
            <Button
              key={cat}
              variant={categoriaActiva === cat ? "default" : "outline"}
              size="sm"
              onClick={() => setCategoriaActiva(cat)}
            >
              {cat}
            </Button>
          ))}
        </div>

        {/* Grid de guías */}
        {loading ? (
          <div className="text-center py-20 text-muted-foreground">Cargando guías...</div>
        ) : guiasFiltradas.length === 0 ? (
          <div className="text-center py-20 text-muted-foreground">No hay guías en esta categoría.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
        <div className="mt-16 text-center bg-primary/5 border border-primary/20 rounded-2xl p-8">
          <MessageCircle className="h-10 w-10 mx-auto mb-3 text-primary" />
          <h2 className="text-xl font-bold mb-2">¿No sabes qué guía necesitas?</h2>
          <p className="text-muted-foreground mb-4">
            HerStoryBot puede orientarte según tu situación de forma privada y segura.
          </p>
          <Button
            variant="default"
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