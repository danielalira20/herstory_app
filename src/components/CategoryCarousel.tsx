// MUS-B01 [BACK] + MUS-F01 [FRONT] — Daf — Semana 1
// MUS-B01: Paginación de 12 en 12 con .range() en Supabase
// MUS-F01: Scroll infinito con Intersection Observer en el último item

import { useState, useEffect, useCallback, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import WomanCard from "./WomanCard";
import { supabaseMuseo } from "@/lib/supabaseMuseo";

const LIMIT = 12;

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
  const [women, setWomen] = useState<Woman[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const scrollRef = useRef<HTMLDivElement>(null);
  const lastItemRef = useRef<HTMLDivElement>(null);
  const loadingMoreRef = useRef(false);

  // MUS-B01: carga paginada con .range()
  const loadWomen = useCallback(async (pageNum: number, append: boolean) => {
    try {
      if (append) setLoadingMore(true);
      else setLoading(true);

      const from = pageNum * LIMIT;
      const to = from + LIMIT - 1;

      const { data, error } = await supabaseMuseo
        .from("mujeres")
        .select(`
          id,
          nombre_conocido,
          imagen_url,
          categoria_id,
          citas(texto)
        `)
        .eq("categoria_id", categoryId)
        .order("id", { ascending: true })
        .range(from, to);

      if (error) throw error;

      const newWomen = data ?? [];
      setHasMore(newWomen.length === LIMIT);

      if (append) {
        setWomen(prev => [...prev, ...newWomen]);
      } else {
        setWomen(newWomen);
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Error desconocido";
      console.error("Error loading women:", message);
    } finally {
      setLoading(false);
      setLoadingMore(false);
      loadingMoreRef.current = false;
    }
  }, [categoryId]);

  // Carga inicial
  useEffect(() => {
    setWomen([]);
    setHasMore(true);
    loadingMoreRef.current = false;
    loadWomen(0, false);
  }, [categoryId, loadWomen]);

  // MUS-F01: Intersection Observer en el último item
  // root = scrollRef para que funcione dentro de overflow-x: auto
  useEffect(() => {
    const lastItem = lastItemRef.current;
    const container = scrollRef.current;
    if (!lastItem || !container || !hasMore || loadingMoreRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loadingMoreRef.current) {
          loadingMoreRef.current = true;
          const nextPage = Math.floor(women.length / LIMIT);
          loadWomen(nextPage, true);
        }
      },
      {
        root: container,
        threshold: 0.5,
      }
    );

    observer.observe(lastItem);
    return () => observer.disconnect();
  }, [women, hasMore, loadWomen]);

  // Actualizar estado de flechas al hacer scroll
  const handleScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 10);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 10);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener("scroll", handleScroll, { passive: true });
    return () => el.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const scrollLeft = () => {
    scrollRef.current?.scrollBy({ left: -scrollRef.current.clientWidth * 0.8, behavior: "smooth" });
  };

  const scrollRight = () => {
    scrollRef.current?.scrollBy({ left: scrollRef.current.clientWidth * 0.8, behavior: "smooth" });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-72">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary" />
      </div>
    );
  }

  if (!women.length) {
    return (
      <p className="text-center text-muted-foreground py-12">
        No hay mujeres en esta categoría.
      </p>
    );
  }

  return (
    <div className="relative group w-full">
      {/* Degradado izquierda */}
      {canScrollLeft && (
        <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
      )}

      {/* Degradado derecha */}
      <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

      {/* Botón izquierda — solo cuando hay scroll a la izquierda */}
      {canScrollLeft && (
        <button
          onClick={scrollLeft}
          className="absolute left-2 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-background/90 border border-primary/20 shadow-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-primary/10 hover:border-primary/50"
        >
          <ChevronLeft className="h-5 w-5 text-primary" />
        </button>
      )}

      {/* Botón derecha — solo cuando hay más scroll o más items */}
      {(canScrollRight || hasMore) && (
        <button
          onClick={scrollRight}
          className="absolute right-2 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-background/90 border border-primary/20 shadow-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-primary/10 hover:border-primary/50"
        >
          {loadingMore
            ? <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
            : <ChevronRight className="h-5 w-5 text-primary" />
          }
        </button>
      )}

      {/* Contenedor scrolleable estilo Netflix */}
      <div
        ref={scrollRef}
        className="flex gap-3 overflow-x-auto scroll-smooth pb-2"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {women.map((woman, index) => (
          <div
            key={woman.id}
            className="flex-shrink-0 w-[calc(80%-9px)] sm:w-[calc(45%-9px)] md:w-[calc(33%-9px)] lg:w-[calc(25%-9px)]"
            ref={index === women.length - 1 ? lastItemRef : null}
          >
            <WomanCard
              id={woman.id}
              imageUrl={woman.imagen_url}
              nombreConocido={woman.nombre_conocido}
              citas={woman.citas}
            />
          </div>
        ))}

        {/* Spinner al final mientras carga más */}
        {loadingMore && (
          <div className="flex-shrink-0 w-[calc(25%-9px)] flex items-center justify-center h-72">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary opacity-50" />
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryCarousel;