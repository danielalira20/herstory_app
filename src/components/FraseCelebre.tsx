// Juego "Frase Célebre" — ¿Quién dijo esta frase?
// Citas reales de mujeres históricas

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Quote, Star, ChevronRight, RotateCcw, Trophy, Flame } from "lucide-react";

interface Cita {
  frase: string;
  autora: string;
}

const CITAS: Cita[] = [
  { frase: "Yo no estudio por saber más, sino por ignorar menos.", autora: "Sor Juana Inés de la Cruz" },
  { frase: "Pies, ¿para qué los quiero si tengo alas para volar?", autora: "Frida Kahlo" },
  { frase: "No se nace mujer: se llega a serlo.", autora: "Simone de Beauvoir" },
  { frase: "El futuro pertenece a quienes creen en la belleza de sus sueños.", autora: "Eleanor Roosevelt" },
  { frase: "Nada en la vida debe ser temido, solo comprendido.", autora: "Marie Curie" },
  { frase: "Un niño, un maestro, un libro y una pluma pueden cambiar el mundo.", autora: "Malala Yousafzai" },
  { frase: "No acepto las cosas que no puedo cambiar. Cambio las cosas que no puedo aceptar.", autora: "Angela Davis" },
  { frase: "La libertad no se da, se conquista.", autora: "Flora Tristán" },
  { frase: "La mujer nace libre y permanece igual al hombre en derechos.", autora: "Olympe de Gouges" },
  { frase: "Ser mujer no es destino: es desafío.", autora: "Rosario Castellanos" },
  { frase: "Mi voz no es solo mía: es de mi pueblo.", autora: "Rigoberta Menchú" },
  { frase: "La dignidad no se negocia, se defiende.", autora: "Rigoberta Menchú" },
  { frase: "La tierra nos habla: escúchala.", autora: "Berta Cáceres" },
  { frase: "La igualdad no es un sueño, es una necesidad.", autora: "Chimamanda Ngozi Adichie" },
  { frase: "Educar es sembrar humanidad.", autora: "Gabriela Mistral" },
  { frase: "Si no puedo bailar, no es mi revolución.", autora: "Emma Goldman" },
  { frase: "El niño es el maestro si sabemos mirar.", autora: "María Montessori" },
  { frase: "Pintemos con lo que duele para que duela menos.", autora: "Frida Kahlo" },
  { frase: "La paciencia es también un instrumento de laboratorio.", autora: "Marie Curie" },
  { frase: "Yo no vine al mundo a complacer, vine a arder.", autora: "Chavela Vargas" },
  { frase: "Escribo porque el silencio no me basta.", autora: "Rosario Castellanos" },
  { frase: "La belleza sin inteligencia es decoración.", autora: "María Félix" },
  { frase: "La verdad incomoda, pero también libera.", autora: "Lydia Cacho" },
  { frase: "Fui al espacio siendo mujer: no pedí permiso.", autora: "Valentina Tereshkova" },
];

// Obtener todas las autoras únicas para generar opciones falsas
const AUTORAS_UNICAS = [...new Set(CITAS.map((c) => c.autora))];

const FraseCelebre = () => {
  const [ronda, setRonda] = useState(0);
  const [totalRondas] = useState(8);
  const [seleccion, setSeleccion] = useState<string | null>(null);
  const [resultado, setResultado] = useState<"correcto" | "incorrecto" | null>(null);
  const [puntos, setPuntos] = useState(0);
  const [racha, setRacha] = useState(0);
  const [mejorRacha, setMejorRacha] = useState(0);
  const [juegoTerminado, setJuegoTerminado] = useState(false);
  const [citasUsadas, setCitasUsadas] = useState<number[]>([]);

  const rondaActual = useMemo(() => {
    const disponibles = CITAS.filter((_, i) => !citasUsadas.includes(i));
    if (disponibles.length === 0) return null;

    const randomIndex = Math.floor(Math.random() * disponibles.length);
    const citaIndex = CITAS.indexOf(disponibles[randomIndex]);
    const cita = disponibles[randomIndex];

    // Generar 3 opciones falsas diferentes a la autora correcta
    const opcionesFalsas = AUTORAS_UNICAS
      .filter((a) => a !== cita.autora)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3);

    const opciones = [cita.autora, ...opcionesFalsas].sort(() => Math.random() - 0.5);

    return { cita, opciones, citaIndex };
  }, [ronda, citasUsadas]);

  const handleSeleccion = (autora: string) => {
    if (resultado) return;
    setSeleccion(autora);

    if (autora === rondaActual?.cita.autora) {
      setResultado("correcto");
      setPuntos((p) => p + 1);
      const nuevaRacha = racha + 1;
      setRacha(nuevaRacha);
      if (nuevaRacha > mejorRacha) setMejorRacha(nuevaRacha);
    } else {
      setResultado("incorrecto");
      setRacha(0);
    }
  };

  const siguienteRonda = () => {
    if (rondaActual) {
      setCitasUsadas((prev) => [...prev, rondaActual.citaIndex]);
    }

    if (ronda + 1 >= totalRondas) {
      setJuegoTerminado(true);
    } else {
      setRonda((r) => r + 1);
      setSeleccion(null);
      setResultado(null);
    }
  };

  const reiniciar = () => {
    setRonda(0);
    setSeleccion(null);
    setResultado(null);
    setPuntos(0);
    setRacha(0);
    setMejorRacha(0);
    setJuegoTerminado(false);
    setCitasUsadas([]);
  };

  if (juegoTerminado) {
    const porcentaje = Math.round((puntos / totalRondas) * 100);

    return (
      <div className="w-full max-w-2xl mx-auto text-center space-y-8 py-8">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring" }}
          className="w-20 h-20 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center mx-auto"
        >
          <Trophy className="w-10 h-10 text-white" />
        </motion.div>

        <h2 className="text-3xl font-serif font-bold text-purple-900">¡Juego terminado!</h2>

        <div className="flex justify-center gap-8">
          <div className="text-center">
            <div className="text-4xl font-bold text-purple-600">{puntos}/{totalRondas}</div>
            <p className="text-sm text-purple-500">Aciertos</p>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-pink-500">{mejorRacha}</div>
            <p className="text-sm text-pink-400">Mejor racha</p>
          </div>
        </div>

        <p className="text-lg text-purple-800">
          {porcentaje >= 80
            ? "¡Conoces sus voces como si fueran tuyas!"
            : porcentaje >= 50
            ? "¡Bien! Cada frase es una ventana a su mundo"
            : "Sus palabras esperan ser descubiertas"}
        </p>

        <button
          onClick={reiniciar}
          className="px-8 py-3 rounded-full text-white font-medium"
          style={{ background: "linear-gradient(135deg, #a855f7, #ec4899)" }}
        >
          <RotateCcw className="w-4 h-4 inline mr-2" />
          Jugar de nuevo
        </button>
      </div>
    );
  }

  if (!rondaActual) return null;

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6 py-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-purple-700">
          {ronda + 1} / {totalRondas}
        </span>
        <div className="flex items-center gap-4">
          {racha >= 2 && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="text-xs font-bold text-orange-500 bg-orange-100 px-2 py-1 rounded-full"
            >
              <Flame className="w-3 h-3 inline" /> Racha: {racha}
            </motion.span>
          )}
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 text-yellow-500" />
            <span className="text-sm font-bold text-purple-900">{puntos}</span>
          </div>
        </div>
      </div>

      {/* Progreso */}
      <div className="flex gap-1">
        {Array.from({ length: totalRondas }).map((_, i) => (
          <div
            key={i}
            className={`h-1.5 flex-1 rounded-full transition-all ${
              i < ronda ? "bg-purple-500" : i === ronda ? "bg-pink-400" : "bg-purple-100"
            }`}
          />
        ))}
      </div>

      {/* Cita */}
      <AnimatePresence mode="wait">
        <motion.div
          key={ronda}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4 }}
          className="p-8 rounded-2xl text-center"
          style={{
            background: "linear-gradient(135deg, rgba(168,85,247,0.08), rgba(236,72,153,0.08))",
            border: "1px solid rgba(168,85,247,0.15)",
          }}
        >
          <Quote className="w-8 h-8 text-purple-400 mx-auto mb-4" />
          <p className="text-xl md:text-2xl font-serif italic text-purple-900 leading-relaxed">
            "{rondaActual.cita.frase}"
          </p>
        </motion.div>
      </AnimatePresence>

      <p className="text-center text-sm text-purple-500 font-medium">¿Quién dijo esta frase?</p>

      {/* Opciones */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {rondaActual.opciones.map((autora) => {
          const esCorrecta = autora === rondaActual.cita.autora;
          const esSeleccionada = autora === seleccion;

          let estilo = "border-purple-200 hover:border-purple-400 hover:bg-purple-50";
          if (resultado) {
            if (esCorrecta) estilo = "border-green-400 bg-green-50";
            else if (esSeleccionada && !esCorrecta) estilo = "border-red-400 bg-red-50";
            else estilo = "border-gray-200 opacity-50";
          }

          return (
            <motion.button
              key={autora}
              whileHover={!resultado ? { scale: 1.02 } : {}}
              whileTap={!resultado ? { scale: 0.98 } : {}}
              onClick={() => handleSeleccion(autora)}
              className={`p-4 rounded-xl border-2 text-center font-medium transition-all duration-200 ${estilo}`}
              disabled={!!resultado}
            >
              <span className={resultado && esCorrecta ? "text-green-700" : "text-purple-900"}>
                {autora}
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
          <p className={`text-lg font-semibold ${resultado === "correcto" ? "text-green-600" : "text-red-500"}`}>
            {resultado === "correcto"
              ? "¡Correcto!"
              : `Era ${rondaActual.cita.autora}`}
          </p>

          <button
            onClick={siguienteRonda}
            className="flex items-center gap-2 mx-auto px-6 py-2.5 rounded-full text-white font-medium"
            style={{ background: "linear-gradient(135deg, #a855f7, #ec4899)" }}
          >
            {ronda + 1 >= totalRondas ? "Ver resultados" : "Siguiente"}
            <ChevronRight className="w-4 h-4" />
          </button>
        </motion.div>
      )}
    </div>
  );
};

export default FraseCelebre;