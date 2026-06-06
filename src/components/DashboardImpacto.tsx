// DashboardImpacto — Widget de impacto (DAS-F01 + DAS-F02)
// Métricas reales: casos verificados y colectivos aliados (useStats de Jass)
// Métricas pendientes: usuarias, conversaciones Auren, glosario (mock hasta que Dani y Jess entreguen)

import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Heart,
  MessageCircle,
  MapPin,
  Users,
  BookOpen,
} from "lucide-react";
import { useStats } from "@/hooks/usesStats";

// ─── Contador animado ───
const AnimatedCounter = ({ target }: { target: number }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: false, margin: "-50px" });
  const prevTarget = useRef(target);

  useEffect(() => {
    if (!isInView) return;

    const start = prevTarget.current !== target ? prevTarget.current : 0;
    prevTarget.current = target;

    const duration = 1200;
    const startTime = performance.now();

    const animate = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(start + (target - start) * eased));
      if (progress < 1) requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
  }, [target, isInView]);

  return <span ref={ref}>{count.toLocaleString("es-MX")}</span>;
};

// ─── Componente principal ───
const DashboardImpacto = () => {
  const { casosVerificados, colectivosAliados, loading: statsLoading } = useStats();

  // TODO: Reemplazar estos mocks cuando Dani y Jess entreguen sus endpoints
  // - Dani: conversaciones con Auren (conteo de sesiones de chat)
  // - Jess: términos del glosario consultados
  // - Pendiente: usuarias acompañadas (puede venir de auth o de un conteo en Supabase)
  const mockUsuarias = 128;
  const mockConversaciones = 347;
  const mockGlosario = 215;

  const metricas = [
    {
      id: "usuarias",
      label: "Usuarias acompañadas",
      valor: mockUsuarias,
      icon: <Heart className="w-5 h-5" />,
    },
    {
      id: "conversaciones",
      label: "Conversaciones con Auren",
      valor: mockConversaciones,
      icon: <MessageCircle className="w-5 h-5" />,
    },
    {
      id: "casos",
      label: "Casos en el mapa",
      valor: casosVerificados,
      icon: <MapPin className="w-5 h-5" />,
    },
    {
      id: "colectivos",
      label: "Colectivos aliados",
      valor: colectivosAliados,
      icon: <Users className="w-5 h-5" />,
    },
    {
      id: "glosario",
      label: "Términos consultados",
      valor: mockGlosario,
      icon: <BookOpen className="w-5 h-5" />,
    },
  ];

  if (statsLoading) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className="rounded-xl p-5 bg-purple-50 dark:bg-purple-950/20 animate-pulse"
          >
            <div className="w-8 h-8 rounded-lg bg-purple-200 dark:bg-purple-800/40 mb-3" />
            <div className="h-7 w-16 bg-purple-200 dark:bg-purple-800/40 rounded mb-2" />
            <div className="h-3 w-24 bg-purple-100 dark:bg-purple-900/30 rounded" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
      {metricas.map((m, i) => (
        <motion.div
          key={m.id}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.08, duration: 0.4 }}
          className="group rounded-xl p-4 bg-purple-50/80 dark:bg-purple-950/20 border border-purple-100 dark:border-purple-900/30 hover:border-purple-300 dark:hover:border-purple-700 transition-colors"
        >
          <div className="w-8 h-8 rounded-lg bg-purple-100 dark:bg-purple-900/40 flex items-center justify-center mb-3 text-purple-500 dark:text-purple-400 group-hover:scale-110 transition-transform">
            {m.icon}
          </div>

          <div className="text-2xl font-bold text-purple-700 dark:text-purple-300 leading-none mb-1">
            <AnimatedCounter target={m.valor} />
          </div>

          <p className="text-[11px] font-medium text-purple-600/50 dark:text-purple-400/50 leading-tight">
            {m.label}
          </p>
        </motion.div>
      ))}
    </div>
  );
};

export default DashboardImpacto;