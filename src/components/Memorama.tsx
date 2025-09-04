// components/aprende/Memorama.tsx
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

interface MemoramaProps {
  onClose: () => void;
}

const imagenes = [
  "/img/memorama/1.jpeg",
  "/img/memorama/2.jpeg",
  "/img/memorama/3.jpeg",
  "/img/memorama/4.jpeg",
  "/img/memorama/5.jpeg",
  "/img/memorama/6.jpeg",
  "/img/memorama/7.jpeg",
  "/img/memorama/8.jpeg",
  "/img/memorama/9.jpeg",
  "/img/memorama/10.jpeg",
  "/img/memorama/11.jpeg",
  "/img/memorama/12.jpeg",
];

// Duplicamos y mezclamos
const inicializarCartas = () => {
  const cartas = [...imagenes, ...imagenes].map((img, index) => ({
    id: index,
    img,
    volteada: false,
    encontrada: false,
  }));
  return cartas.sort(() => Math.random() - 0.5);
};

const Memorama = ({ onClose }: MemoramaProps) => {
  const [cartas, setCartas] = useState(inicializarCartas);
  const [seleccionadas, setSeleccionadas] = useState<number[]>([]);
  const [modo, setModo] = useState<"individual" | "multijugador" | null>(null);
  const [jugador, setJugador] = useState<1 | 2>(1);
  const [puntos, setPuntos] = useState({ j1: 0, j2: 0 });
  const [mensaje, setMensaje] = useState<string | null>(null);

  const handleClick = (index: number) => {
    if (
      seleccionadas.length < 2 &&
      !cartas[index].volteada &&
      !cartas[index].encontrada
    ) {
      const nuevasCartas = [...cartas];
      nuevasCartas[index].volteada = true;
      setCartas(nuevasCartas);
      setSeleccionadas([...seleccionadas, index]);
    }
  };

  useEffect(() => {
    if (seleccionadas.length === 2) {
      const [i1, i2] = seleccionadas;
      if (cartas[i1].img === cartas[i2].img) {
        setTimeout(() => {
          const nuevasCartas = [...cartas];
          nuevasCartas[i1].encontrada = true;
          nuevasCartas[i2].encontrada = true;
          setCartas(nuevasCartas);

          if (modo === "multijugador") {
            if (jugador === 1) setPuntos((p) => ({ ...p, j1: p.j1 + 1 }));
            else setPuntos((p) => ({ ...p, j2: p.j2 + 1 }));
          }

          setSeleccionadas([]);
        }, 500);
      } else {
        setTimeout(() => {
          const nuevasCartas = [...cartas];
          nuevasCartas[i1].volteada = false;
          nuevasCartas[i2].volteada = false;
          setCartas(nuevasCartas);

          if (modo === "multijugador") {
            setJugador(jugador === 1 ? 2 : 1);
          }

          setSeleccionadas([]);
        }, 1000);
      }
    }
  }, [seleccionadas, cartas, jugador, modo]);

  useEffect(() => {
    if (cartas.every((c) => c.encontrada)) {
      if (modo === "multijugador") {
        if (puntos.j1 > puntos.j2) setMensaje("🎉 ¡Jugador 1 gana! 🎉");
        else if (puntos.j2 > puntos.j1) setMensaje("🎉 ¡Jugador 2 gana! 🎉");
        else setMensaje("🤝 ¡Empate!");
      } else {
        setMensaje("🎉 ¡Felicidades, completaste el memorama! 🎉");
      }
    }
  }, [cartas, puntos, modo]);

  const reiniciar = () => {
    setCartas(inicializarCartas());
    setSeleccionadas([]);
    setJugador(1);
    setPuntos({ j1: 0, j2: 0 });
    setMensaje(null);
    setModo(null);
  };

  return (
    <div className="p-6 min-h-screen bg-gradient-to-b from-purple-100 to-purple-300 flex flex-col items-center">
      <h1 className="text-4xl font-bold mb-4 text-purple-900">Memorama</h1>

      {/* Selección de modo de juego */}
      {!modo && (
        <div className="mb-6 flex gap-4">
          <Button
            onClick={() => setModo("individual")}
            className="bg-white text-purple-700 hover:bg-purple-100 px-6 py-2 rounded-xl"
          >
            Individual
          </Button>
          <Button
            onClick={() => setModo("multijugador")}
            className="bg-white text-purple-700 hover:bg-purple-100 px-6 py-2 rounded-xl"
          >
            Multijugador
          </Button>
        </div>
      )}

      {/* Marcador solo en multijugador */}
{modo === "multijugador" && (
  <div className="flex gap-6 mb-6 justify-center">
    <div className={`flex flex-col items-center p-4 rounded-xl shadow-md transition-all duration-300
                     ${jugador === 1 ? "bg-purple-600 text-white scale-105 shadow-lg" : "bg-purple-100 text-purple-800"}`}>
      <span className="font-semibold text-lg">Jugador 1</span>
      <span className="text-2xl font-bold">{puntos.j1}</span>
    </div>

    <div className={`flex flex-col items-center p-4 rounded-xl shadow-md transition-all duration-300
                     ${jugador === 2 ? "bg-purple-600 text-white scale-105 shadow-lg" : "bg-purple-100 text-purple-800"}`}>
      <span className="font-semibold text-lg">Jugador 2</span>
      <span className="text-2xl font-bold">{puntos.j2}</span>
    </div>
  </div>
)}


      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4 w-full max-w-7xl">
  {cartas.map((carta, index) => (
    <div
      key={carta.id}
      className="w-full h-40 sm:h-48 md:h-56 cursor-pointer rounded-lg overflow-hidden flex items-center justify-center text-4xl font-bold text-white select-none"
      onClick={() => handleClick(index)}
    >
      {carta.volteada || carta.encontrada ? (
        <img
          src={carta.img}
          alt={`Carta ${index}`}
          className="w-full h-full object-cover"
        />
      ) : (
        <div className="w-full h-full bg-purple-400 flex items-center justify-center">
          ?
        </div>
      )}
    </div>
  ))}
</div>


      {mensaje && (
        <div className="mt-6 text-2xl font-bold text-purple-900 text-center">
          {mensaje}
        </div>
      )}

      <div className="mt-8 flex gap-4">
        <Button
          onClick={reiniciar}
          className="bg-white text-purple-700 hover:bg-purple-100 px-6 py-2 rounded-xl"
        >
          Reiniciar
        </Button>
      </div>
    </div>
  );
};

export default Memorama;