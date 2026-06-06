import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { getTerminoBySlug, getGlosario } from "@/lib/glosarioService";
import NavbarLearn from "@/components/NavbarLearn";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, BookOpen, Quote } from "lucide-react";

const categoryColors: Record<string, string> = {
  "Violencia psicológica": "bg-purple-100 text-purple-800 border-purple-200",
  "Manipulación":          "bg-pink-100 text-pink-800 border-pink-200",
  "Violencia":             "bg-red-100 text-red-800 border-red-200",
  "Discriminación":        "bg-amber-100 text-amber-800 border-amber-200",
  "Empoderamiento":        "bg-emerald-100 text-emerald-800 border-emerald-200",
};

const GlosarioDetalle = () => {
  const { slug } = useParams();
  const [termino, setTermino] = useState<any>(null);
  const [relacionados, setRelacionados] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cargar = async () => {
      try {
        const data = await getTerminoBySlug(slug!);
        setTermino(data);

        if (data.terminos_relacionados?.length) {
          const todos = await getGlosario();
          const rel = todos.filter((t: any) =>
            data.terminos_relacionados.includes(t.slug)
          );
          setRelacionados(rel);
        }
      } catch (e) {
        console.error("Error cargando término:", e);
      } finally {
        setLoading(false);
      }
    };
    cargar();
  }, [slug]);

  if (loading) return (
    <div className="min-h-screen bg-background">
      <NavbarLearn />
      <div className="text-center py-24 text-muted-foreground">Cargando...</div>
    </div>
  );

  if (!termino) return (
    <div className="min-h-screen bg-background">
      <NavbarLearn />
      <div className="text-center py-24 text-muted-foreground">Término no encontrado.</div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <NavbarLearn />

      <div className="container max-w-2xl py-10 px-4">

        {/* Volver */}
        <Link
          to="/glosario"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-8"
        >
          <ArrowLeft className="h-4 w-4" />
          Volver al glosario
        </Link>

        {/* Encabezado */}
        <div className="mb-8">
          <Badge className={`text-xs border mb-3 ${categoryColors[termino.categoria] ?? "bg-gray-100 text-gray-800"}`}>
            {termino.categoria}
          </Badge>
          <h1 className="text-4xl font-bold mb-4">{termino.termino}</h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            {termino.definicion}
          </p>
        </div>

        {/* Ejemplo cotidiano */}
        <div className="bg-primary/5 border-l-4 border-primary rounded-r-xl p-5 mb-8">
          <p className="text-xs uppercase tracking-widest text-primary mb-2 font-medium">Ejemplo cotidiano</p>
          <p className="text-sm leading-relaxed">{termino.ejemplo_cotidiano}</p>
        </div>

        {/* Historia narrativa */}
        <div className="mb-10">
          <div className="flex items-center gap-2 mb-4">
            <Quote className="h-5 w-5 text-primary opacity-60" />
            <p className="text-xs uppercase tracking-widest text-muted-foreground font-medium">
              Una historia que {termino.figura_historica} me contó alguna vez
            </p>
          </div>
          <blockquote className="font-serif text-base leading-relaxed text-foreground italic border-l-2 border-primary/20 pl-5">
            "{termino.historia}"
          </blockquote>
        </div>

        {/* Términos relacionados */}
        {relacionados.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-4">
              <BookOpen className="h-4 w-4 text-muted-foreground" />
              <p className="text-sm font-medium text-muted-foreground uppercase tracking-widest">
                Términos relacionados
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              {relacionados.map((r: any) => (
                <Link key={r.slug} to={`/glosario/${r.slug}`}>
                  <Badge
                    variant="outline"
                    className="hover:bg-primary/10 hover:border-primary/30 transition-colors cursor-pointer"
                  >
                    {r.termino}
                  </Badge>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GlosarioDetalle;