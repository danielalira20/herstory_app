import { useState } from "react";
import { GameButton } from "@/components/ui/game-button";

interface Categoria {
  nombre: string;
  palabras: string[];
  emoji: string;
}

const categorias: Categoria[] = [
  { nombre: "Ciencia", palabras: ["ATOMO", "CELULA", "GRAVEDAD", "ENERGIA"], emoji: "🔬" },
  { nombre: "Arte", palabras: ["PINTURA", "ESCULTURA", "MUSICA", "DIBUJO"], emoji: "🎨" },
  { nombre: "Historia", palabras: ["REVOLUCION", "IMPERIO", "CONQUISTA", "CIVILIZACION"], emoji: "🏰" },
  { nombre: "Naturaleza", palabras: ["ARBOL", "RIO", "MONTAÑA", "OCEANO"], emoji: "🌳" },
];

const shuffleArray = (array: string[]) => array.sort(() => Math.random() - 0.5);

const OrdenarPalabras = () => {
  const [categoriaActual, setCategoriaActual] = useState<Categoria | null>(null);
  const [palabraActual, setPalabraActual] = useState<string>("");
  const [letrasDisponibles, setLetrasDisponibles] = useState<string[]>([]);
  const [letrasSeleccionadas, setLetrasSeleccionadas] = useState<string[]>([]);
  const [mensaje, setMensaje] = useState<string>("");

  const iniciarCategoria = (cat: Categoria) => {
    setCategoriaActual(cat);
    seleccionarNuevaPalabra(cat);
  };

  const seleccionarNuevaPalabra = (cat: Categoria) => {
    const palabra = cat.palabras[Math.floor(Math.random() * cat.palabras.length)];
    setPalabraActual(palabra);
    setLetrasDisponibles(shuffleArray(palabra.split("")));
    setLetrasSeleccionadas([]);
    setMensaje("");
  };

  const seleccionarLetra = (letra: string) => {
    setLetrasSeleccionadas([...letrasSeleccionadas, letra]);
    setLetrasDisponibles(letrasDisponibles.filter(l => l !== letra));

    const intento = [...letrasSeleccionadas, letra].join("");
    if (intento.length === palabraActual.length) {
      if (intento === palabraActual) {
        setMensaje("✅ ¡Correcto!");
        setTimeout(() => {
          if (categoriaActual) seleccionarNuevaPalabra(categoriaActual);
        }, 1000);
      } else {
        setMensaje("❌ Intenta de nuevo");
        setTimeout(() => {
          setLetrasDisponibles(shuffleArray(palabraActual.split("")));
          setLetrasSeleccionadas([]);
          setMensaje("");
        }, 1000);
      }
    }
  };

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-start p-6">
      {!categoriaActual ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-12 w-full max-w-6xl">
  {categorias.map((cat) => (
    <GameButton
      key={cat.nombre}
      onClick={() => iniciarCategoria(cat)}
      className="h-64 w-full text-4xl font-bold flex flex-col items-center justify-center gap-6 rounded-3xl shadow-xl"
    >
      <span className="text-7xl">{cat.emoji}</span>
      {cat.nombre}
    </GameButton>
  ))}
</div>

      ) : (
        <div className="flex flex-col items-center w-full max-w-5xl gap-12 mt-6">
          <h2 className="text-5xl font-extrabold">{categoriaActual.nombre}</h2>

          {/* Palabra desordenada animada */}
<div className="flex justify-center flex-wrap mb-8 gap-4">
  {letrasDisponibles.map((letra, i) => (
    <span
      key={i}
      className="text-6xl md:text-8xl font-extrabold text-purple-700 inline-block"
      style={{
        display: "inline-block",
        transform: `rotate(${Math.floor(Math.random() * 20 - 10)}deg) translate(${Math.floor(Math.random() * 10 - 5)}px, ${Math.floor(Math.random() * 10 - 5)}px)`,
        transition: "transform 0.5s ease-in-out",
      }}
    >
      {letra}
    </span>
  ))}
</div>


          {/* Espacios de la palabra para escribir */}
          <div className="flex justify-center gap-4 text-4xl md:text-5xl mb-8 flex-wrap">
            {palabraActual.split("").map((_, i) => (
              <div
                key={i}
                className="w-20 h-20 md:w-24 md:h-24 border-b-4 border-purple-500 flex items-center justify-center text-3xl md:text-4xl font-bold"
              >
                {letrasSeleccionadas[i] || ""}
              </div>
            ))}
          </div>

          {/* Letras disponibles */}
          <div className="flex flex-wrap justify-center gap-4 mb-6">
            {letrasDisponibles.map((letra, i) => (
              <GameButton
                key={i}
                onClick={() => seleccionarLetra(letra)}
                className="p-6 md:p-8 text-3xl md:text-5xl font-bold"
              >
                {letra}
              </GameButton>
            ))}
          </div>

          {/* Mensaje */}
          <div className="text-3xl font-semibold text-purple-700 h-10">{mensaje}</div>

          <div className="flex flex-col md:flex-row gap-6 mt-6">
            <GameButton
              onClick={() => categoriaActual && seleccionarNuevaPalabra(categoriaActual)}
              className="p-4 text-2xl"
            >
              🔄 Siguiente palabra
            </GameButton>
            <GameButton
              onClick={() => setCategoriaActual(null)}
              className="p-4 text-2xl"
            >
              ⬅ Volver a categorías
            </GameButton>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrdenarPalabras;