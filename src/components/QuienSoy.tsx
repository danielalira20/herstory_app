// Juego "¿Quién soy?" — Pistas narrativas

import { useState, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  HelpCircle,
  Star,
  ChevronRight,
  RotateCcw,
  Eye,
  Clock,
  Lightbulb,
  Zap,
  Globe2,
} from "lucide-react";
import figurasData from "@/data/figuras_historicas.json";

const CATEGORIAS_PISTA: Record<string, string> = {
  voces_creadoras: "Se expresó a través del arte, la música o la palabra escrita",
  pensamiento_critico: "Transformó el mundo con sus ideas y su pensamiento",
  guardianas_dignidad: "Dedicó su vida a defender los derechos de quienes no tenían voz",
  liderazgo_transformacion: "Lideró movimientos que cambiaron el curso de la historia",
  deporte: "Rompió barreras y récords en el mundo del deporte",
  naturaleza_planeta: "Luchó por defender la tierra y las comunidades que la habitan",
  ciencia_salud_tecnologia: "Sus descubrimientos transformaron la ciencia y salvaron vidas",
};

const INJUSTICIAS_PISTA: Record<string, string> = {
  silenciamiento: "Intentaron borrar su nombre y su obra de la historia",
  control_coercitivo: "Vivió bajo el control de quienes intentaron apagar su luz",
  violencia_fisica: "Su cuerpo fue el campo de batalla, pero nunca se rindió",
  violencia_economica: "Le negaron los recursos que merecía por su trabajo",
  discriminacion_genero: "Tuvo que luchar el doble por ser mujer en un mundo de hombres",
  discriminacion_racial: "Enfrentó el racismo además de la desigualdad de género",
  negacion_educacion: "Le cerraron las puertas del conocimiento, pero encontró otra forma de entrar",
  violencia_sexual: "Sobrevivió a la violencia más íntima y aún así alzó la voz",
  exilio_desarraigo: "Fue arrancada de su tierra, pero su legado cruzó fronteras",
  violencia_institucional: "El poder mismo fue su enemigo, pero no logró doblegarla",
};

const EPOCA_PISTA: Record<string, string> = {
  "Siglo XVII": "Caminó por un mundo de imperios y conquistas, siglos antes de la era moderna",
  "Siglo IV-V d.C.": "Vivió cuando el mundo antiguo se transformaba en la era medieval",
  "Siglo VIII-VII a.C.": "Su voz resonó en los albores de la civilización",
  "Siglo I-II d.C.": "Vivió en la época del gran Imperio Romano",
  "Siglo IX": "En plena Edad Media, cuando pocas mujeres podían destacar",
  "Siglos X-XI": "En el Japón imperial, cuando escribir era un acto de rebeldía",
  "Siglos XI-XII": "Gobernó cuando las mujeres no podían siquiera opinar",
  "Siglos XIV-XV": "En la transición hacia el Renacimiento europeo",
  "Siglo XVI": "Cuando los imperios luchaban por el dominio del mundo",
  "Siglos XVI-XVII": "En la era de las exploraciones y los grandes reinos",
  "Siglo XVII-XVIII": "Entre el Barroco y la Ilustración",
  "Siglo XVIII": "En plena era de las revoluciones y el despertar de las ideas",
  "Siglos XVIII-XIX": "Cuando el mundo cambiaba entre revoluciones y descubrimientos",
  "Siglo XIX": "En la época donde las mujeres empezaban a exigir sus derechos",
  "Siglos XIX-XX": "En el cambio de siglo que transformó al mundo para siempre",
  "Siglo XX": "En un siglo marcado por guerras, revoluciones y luchas por la libertad",
  "Siglo XX-XXI": "Su lucha cruza siglos y sigue viva hasta hoy",
  "Siglo XXI": "Una voz contemporánea que inspira a las nuevas generaciones",
};

interface Figura {
  id: number;
  nombre: string;
  categoria_campo: string;
  injusticias: string[];
  epoca: string;
  region: string;
}

const figuras: Figura[] = figurasData.figuras as Figura[];

const QuienSoy = () => {
  const [pistaActual, setPistaActual] = useState(0);
  const [seleccion, setSeleccion] = useState<string | null>(null);
  const [resultado, setResultado] = useState<"correcto" | "incorrecto" | null>(null);
  const [puntos, setPuntos] = useState(0);
  const [ronda, setRonda] = useState(0);
  const [totalRondas] = useState(5);
  const [juegoTerminado, setJuegoTerminado] = useState(false);
  const [figurasUsadas, setFigurasUsadas] = useState<number[]>([]);

  const generarRonda = useCallback(() => {
    const disponibles = figuras.filter((f) => !figurasUsadas.includes(f.id));
    if (disponibles.length < 4) return null;

    const shuffled = [...disponibles].sort(() => Math.random() - 0.5);
    const correcta = shuffled[0];
    const opciones = [correcta, ...shuffled.slice(1, 4)]
      .sort(() => Math.random() - 0.5)
      .map((f) => f.nombre);

    return { correcta, opciones };
  }, [figurasUsadas]);

  const rondaActual = useMemo(() => generarRonda(), [ronda, generarRonda]);

  if (!rondaActual && !juegoTerminado) return null;

  const pistaIcons = [
    <Clock className="w-5 h-5 text-pink-500 dark:text-pink-400" />,
    <Lightbulb className="w-5 h-5 text-pink-500 dark:text-pink-400" />,
    <Zap className="w-5 h-5 text-pink-500 dark:text-pink-400" />,
    <Globe2 className="w-5 h-5 text-pink-500 dark:text-pink-400" />,
  ];

  const pistas = rondaActual
    ? [
        { texto: EPOCA_PISTA[rondaActual.correcta.epoca] || `Vivió durante ${rondaActual.correcta.epoca}` },
        { texto: CATEGORIAS_PISTA[rondaActual.correcta.categoria_campo] || rondaActual.correcta.categoria_campo },
        { texto: INJUSTICIAS_PISTA[rondaActual.correcta.injusticias[0]] || rondaActual.correcta.injusticias[0] },
        { texto: `Su historia nació en ${rondaActual.correcta.region}` },
      ]
    : [];

  const puntosRonda = Math.max(4 - pistaActual, 1);

  const handleSeleccion = (nombre: string) => {
    if (resultado) return;
    setSeleccion(nombre);

    if (nombre === rondaActual?.correcta.nombre) {
      setResultado("correcto");
      setPuntos((p) => p + puntosRonda);
    } else {
      setResultado("incorrecto");
    }
  };

  const siguienteRonda = () => {
    if (rondaActual) {
      setFigurasUsadas((prev) => [...prev, rondaActual.correcta.id]);
    }

    if (ronda + 1 >= totalRondas) {
      setJuegoTerminado(true);
    } else {
      setRonda((r) => r + 1);
      setPistaActual(0);
      setSeleccion(null);
      setResultado(null);
    }
  };

  const reiniciar = () => {
    setRonda(0);
    setPistaActual(0);
    setSeleccion(null);
    setResultado(null);
    setPuntos(0);
    setJuegoTerminado(false);
    setFigurasUsadas([]);
  };

  // ── Pantalla final ──
  if (juegoTerminado) {
    const maxPuntos = totalRondas * 4;
    const porcentaje = Math.round((puntos / maxPuntos) * 100);

    return (
      <div className="w-full max-w-2xl mx-auto text-center space-y-8 py-8">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring" }}
          className="w-20 h-20 rounded-full bg-gradient-to-r from-pink-400 to-rose-500 flex items-center justify-center mx-auto"
        >
          <Star className="w-10 h-10 text-white" />
        </motion.div>

        <h2 className="text-3xl font-bold text-pink-900 dark:text-pink-100">
          ¡Juego terminado!
        </h2>
        <div className="text-6xl font-bold text-pink-600 dark:text-pink-400">
          {puntos} pts
        </div>
        <p className="text-pink-700/60 dark:text-pink-400/60">
          {porcentaje}% de aciertos máximos
        </p>
        <p className="text-lg text-pink-800 dark:text-pink-300">
          {porcentaje >= 80
            ? "¡Increíble! Conoces muy bien a estas mujeres"
            : porcentaje >= 50
              ? "¡Buen trabajo! Sigue explorando sus historias"
              : "Cada partida te acerca más a sus voces"}
        </p>

        <button
          onClick={reiniciar}
          className="px-8 py-3 rounded-full text-white font-medium bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 transition"
        >
          <RotateCcw className="w-4 h-4 inline mr-2" />
          Jugar de nuevo
        </button>
      </div>
    );
  }

  // ── Juego activo ──
  return (
    <div className="w-full max-w-2xl mx-auto space-y-6 py-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <HelpCircle className="w-5 h-5 text-pink-500 dark:text-pink-400" />
          <span className="text-sm font-medium text-pink-700 dark:text-pink-300">
            Ronda {ronda + 1} / {totalRondas}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Star className="w-4 h-4 text-pink-400" />
          <span className="text-sm font-bold text-foreground">{puntos} pts</span>
        </div>
      </div>

      {/* Progreso de pistas */}
      <div className="flex gap-2">
        {pistas.map((_, i) => (
          <div
            key={i}
            className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${
              i <= pistaActual
                ? "bg-pink-500 dark:bg-pink-400"
                : "bg-pink-200 dark:bg-pink-900/40"
            }`}
          />
        ))}
      </div>

      {/* Pistas reveladas */}
      <div className="space-y-3">
        <AnimatePresence mode="popLayout">
          {pistas.slice(0, pistaActual + 1).map((pista, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
              className="flex items-start gap-3 p-4 rounded-xl bg-pink-50 dark:bg-pink-950/30 border border-pink-200 dark:border-pink-800"
            >
              <span className="mt-0.5">{pistaIcons[i]}</span>
              <span className="text-pink-800 dark:text-pink-200 font-medium leading-relaxed">
                {pista.texto}
              </span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Botón siguiente pista */}
      {pistaActual < pistas.length - 1 && !resultado && (
        <button
          onClick={() => setPistaActual((p) => p + 1)}
          className="flex items-center gap-2 text-sm text-pink-500 dark:text-pink-400 hover:text-pink-700 dark:hover:text-pink-300 transition-colors mx-auto"
        >
          <Eye className="w-4 h-4" />
          Revelar otra pista ({4 - pistaActual - 1} pts restantes)
        </button>
      )}

      {/* Opciones */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {rondaActual?.opciones.map((nombre) => {
          const esCorrecta = nombre === rondaActual.correcta.nombre;
          const esSeleccionada = nombre === seleccion;

          let estilo =
            "border-pink-200 dark:border-pink-800 hover:border-pink-400 dark:hover:border-pink-600 hover:bg-pink-50 dark:hover:bg-pink-950/30";
          if (resultado) {
            if (esCorrecta)
              estilo = "border-green-400 bg-green-50 dark:bg-green-950/30 dark:border-green-600";
            else if (esSeleccionada && !esCorrecta)
              estilo = "border-red-400 bg-red-50 dark:bg-red-950/30 dark:border-red-600";
            else estilo = "border-gray-200 dark:border-gray-700 opacity-50";
          }

          return (
            <motion.button
              key={nombre}
              whileHover={!resultado ? { scale: 1.02 } : {}}
              whileTap={!resultado ? { scale: 0.98 } : {}}
              onClick={() => handleSeleccion(nombre)}
              className={`p-4 rounded-xl border-2 text-left font-medium transition-all duration-200 ${estilo}`}
              disabled={!!resultado}
            >
              <span
                className={
                  resultado && esCorrecta
                    ? "text-green-700 dark:text-green-400"
                    : "text-foreground"
                }
              >
                {nombre}
              </span>
            </motion.button>
          );
        })}
      </div>

      {/* Resultado */}
      {resultado && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-4"
        >
          <p
            className={`text-lg font-semibold ${
              resultado === "correcto"
                ? "text-green-600 dark:text-green-400"
                : "text-red-500 dark:text-red-400"
            }`}
          >
            {resultado === "correcto"
              ? `¡Correcto! +${puntosRonda} puntos`
              : `Era ${rondaActual?.correcta.nombre}`}
          </p>

          <button
            onClick={siguienteRonda}
            className="flex items-center gap-2 mx-auto px-6 py-2.5 rounded-full text-white font-medium bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 transition"
          >
            {ronda + 1 >= totalRondas ? "Ver resultados" : "Siguiente"}
            <ChevronRight className="w-4 h-4" />
          </button>
        </motion.div>
      )}
    </div>
  );
};

export default QuienSoy;