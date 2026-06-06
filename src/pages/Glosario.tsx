import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getGlosario } from "@/lib/glosarioService";
import NavbarLearn from "@/components/NavbarLearn";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, BookOpen } from "lucide-react";

const categorias = ["Todas", "Violencia psicológica", "Manipulación", "Violencia", "Discriminación", "Empoderamiento"];

const categoryColors: Record<string, string> = {
  "Violencia psicológica": "bg-purple-100 text-purple-800 border-purple-200",
  "Manipulación":          "bg-pink-100 text-pink-800 border-pink-200",
  "Violencia":             "bg-red-100 text-red-800 border-red-200",
  "Discriminación":        "bg-amber-100 text-amber-800 border-amber-200",
  "Empoderamiento":        "bg-emerald-100 text-emerald-800 border-emerald-200",
};

const Glosario = () => {
  const [terminos, setTerminos] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [categoriaActiva, setCategoriaActiva] = useState("Todas");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cargar = async () => {
      try {
        const data = await getGlosario();
        setTerminos(data);
      } catch (e) {
        console.error("Error cargando glosario:", e);
      } finally {
        setLoading(false);
      }
    };
    cargar();
  }, []);

  const terminosFiltrados = terminos.filter((t: any) => {
    const matchBusqueda = t.termino.toLowerCase().includes(busqueda.toLowerCase());
    const matchCategoria = categoriaActiva === "Todas" || t.categoria === categoriaActiva;
    return matchBusqueda && matchCategoria;
  });

  const porLetra = terminosFiltrados.reduce((acc: any, t: any) => {
    const letra = t.termino[0].toUpperCase();
    if (!acc[letra]) acc[letra] = [];
    acc[letra].push(t);
    return acc;
  }, {});

  const letras = Object.keys(porLetra).sort();

  return (
    <div className="min-h-screen bg-background">
      <NavbarLearn />

      {/* Hero */}
      <div className="bg-gradient-to-r from-pink-50 to-purple-50 border-b border-pink-100 py-12 px-4">
        <div className="container max-w-4xl mx-auto text-center">
          <BookOpen className="h-10 w-10 mx-auto mb-3 text-primary opacity-80" />
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Glosario</h1>
          <p className="text-muted-foreground max-w-xl mx-auto text-sm">
            Nombrar lo que vivimos es el primer paso para entenderlo. Un diccionario de violencias sutiles y herramientas de empoderamiento.
          </p>
        </div>
      </div>

      <div className="container max-w-4xl py-10">

        {/* Buscador GLO-F03 */}
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar término..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Filtros por categoría */}
        <div className="flex flex-wrap gap-2 mb-8">
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
          <p className="text-sm text-muted-foreground mb-8">
            {terminosFiltrados.length} {terminosFiltrados.length === 1 ? "término" : "términos"}
          </p>
        )}

        {/* Índice alfabético GLO-F01 */}
        {loading ? (
          <div className="text-center py-24 text-muted-foreground">Cargando glosario...</div>
        ) : terminosFiltrados.length === 0 ? (
          <div className="text-center py-24 text-muted-foreground">No se encontraron términos.</div>
        ) : (
          <div className="space-y-10">
            {letras.map((letra) => (
              <div key={letra}>
                <h2 className="text-2xl font-bold text-primary mb-4 border-b border-primary/20 pb-2">
                  {letra}
                </h2>
                <div className="space-y-3">
                  {porLetra[letra].map((t: any) => (
                    <Link
                      key={t.slug}
                      to={`/glosario/${t.slug}`}
                      className="flex items-center justify-between p-4 rounded-xl border border-border hover:border-primary/30 hover:bg-primary/5 transition-all group"
                    >
                      <div className="flex items-center gap-3">
                        <span className="font-semibold text-foreground group-hover:text-primary transition-colors">
                          {t.termino}
                        </span>
                        <Badge className={`text-xs border ${categoryColors[t.categoria] ?? "bg-gray-100 text-gray-800"}`}>
                          {t.categoria}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground hidden md:block max-w-sm line-clamp-1">
                        {t.definicion}
                      </p>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Glosario;