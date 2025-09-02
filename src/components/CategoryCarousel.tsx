import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import WomanCard from "./WomanCard";
import { supabaseMuseo } from "@/lib/supabaseMuseo";
import { set } from "date-fns";

interface Woman {
  id: number;
  imagen_url: string;
  nombre_conocido: string;
  categoria_id: number;
  citas: { texto: string }[];
}

interface CategoryCarouselProps {
  categoryId: number;
}

const CategoryCarousel = ({ categoryId }: CategoryCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [women, setWomen] = useState<Woman[]>([]);
  const [loading, setLoading] = useState(true);

  // Mock data - replace with actual Supabase calls
  useEffect(() => {
    const loadData = async () => {
      try {
      setLoading(true);
      const { data, error } = await supabaseMuseo
        .from("mujeres")
          .select(`
            id,
            nombre_conocido,
            imagen_url,
            categoria_id,
            citas(texto)
          `)
          .eq("categoria_id", categoryId);
            if (error) throw error;
        setWomen(data || []);
      } catch (err: any) {
        console.error("Error loading women:", err.message);
      } finally {
        setLoading(false);
      }
    };
        
 loadData();
  }, [categoryId]);

  const nextSlide = () => {
    setCurrentIndex(prev => (prev === women.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex(prev => (prev === 0 ? women.length - 1 : prev - 1));
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!women.length) {
    return <p className="text-center text-muted-foreground">No hay mujeres en esta categoría.</p>;
  }

  return (
    <div className="relative w-full max-w-6xl mx-auto">
      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 25}%)` }}
        >
          {women.map((woman) => (
            <div key={woman.id} className="w-1/4 flex-shrink-0 px-2">
              <div className="h-full flex">
               <WomanCard
                  id={woman.id}
                  imageUrl={woman.imagen_url}
                  nombreConocido={woman.nombre_conocido}
                  citas={woman.citas}
              />
            </div>
          </div>
          ))}
        </div>
      </div>

      {/* Botones de navegación */}
      <Button
        variant="outline"
        size="icon"
        className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 bg-background/80 backdrop-blur-sm border-primary/30 hover:border-primary hover:bg-primary/10"
        onClick={prevSlide}
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 bg-background/80 backdrop-blur-sm border-primary/30 hover:border-primary hover:bg-primary/10"
        onClick={nextSlide}
      >
        <ChevronRight className="h-4 w-4" />
      </Button>

      {/* Indicadores de página */}
      <div className="flex justify-center mt-6 space-x-2">
        {Array.from({ length: Math.ceil(women.length / 4) }).map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              Math.floor(currentIndex / 4) === index
                ? "bg-primary shadow-[var(--shadow-glow)]"
                : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
            }`}
            onClick={() => setCurrentIndex(index * 4)}
          />
        ))}
      </div>
    </div>
  );
};


export default CategoryCarousel;