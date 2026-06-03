import { useState } from "react";
import { Button } from "@/components/ui/button";
import NavbarWrapper from "@/components/NavbarWrapper";
import { useToast } from "@/hooks/use-toast";
import headerImage from "@/assets/herstory-header.jpg";
import QuizTrivias from "@/components/QuizTrivias";
import {
  Brain,
  BookOpen,
  Play,
  Sparkles,
  HelpCircle,
  Quote,
  ArrowRight,
  ArrowLeft,
  GraduationCap,
  Gamepad2,
} from "lucide-react";
import QuienSoy from "@/components/QuienSoy";
import FraseCelebre from "@/components/FraseCelebre";

const Aprende = () => {
  const { toast } = useToast();
  const [activeGame, setActiveGame] = useState<
    "quienSoy" | "fraseCelebre" | null
  >(null);

  return (
    <div className="min-h-screen bg-background">
      {/* ── Hero Header ── */}
      <div className="relative w-full h-64 md:h-72 overflow-hidden">
        <img
          src={headerImage}
          alt="HerStory Header"
          className="w-full h-full object-cover scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-pink-900/60 via-pink-800/50 to-pink-700/40 flex items-center justify-center">
          <div className="text-center text-white space-y-3">
            <p className="text-xs md:text-sm uppercase tracking-[4px] text-pink-200">
              HerStory · Aprende
            </p>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight">
              Aprende{" "}
              <span className="italic font-normal text-pink-200">jugando</span>
            </h1>
            <p className="text-sm md:text-base text-white/70 max-w-md mx-auto">
              Sumérgete en la historia de las mujeres que cambiaron el mundo,
              una pregunta a la vez.
            </p>
          </div>
        </div>
      </div>

      <NavbarWrapper />

      {/* ── Stats rápidos ── */}
      <section className="py-10 px-4">
        <div className="container mx-auto max-w-5xl">
          <div className="grid grid-cols-3 gap-4">
            {[
              { num: "5", label: "Categorías de trivia", icon: <Brain className="w-5 h-5" /> },
              { num: "2", label: "Juegos interactivos", icon: <Gamepad2 className="w-5 h-5" /> },
              { num: "∞", label: "Historias por descubrir", icon: <BookOpen className="w-5 h-5" /> },
            ].map((stat) => (
              <div
                key={stat.label}
                className="bg-pink-50 dark:bg-pink-950/30 border border-pink-100 dark:border-pink-900/40 rounded-xl p-5 text-center"
              >
                <div className="flex justify-center mb-2 text-pink-400 dark:text-pink-400">
                  {stat.icon}
                </div>
                <span className="text-3xl md:text-4xl font-bold text-pink-700 dark:text-pink-300 block">
                  {stat.num}
                </span>
                <span className="text-xs text-pink-800/60 dark:text-pink-400/60 mt-1 block">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Quiz Trivias ── */}
      <section className="pb-12 px-4">
        <div className="container mx-auto max-w-5xl">
          <div className="flex items-center gap-3 mb-1">
            <GraduationCap className="w-5 h-5 text-pink-400" />
            <p className="text-xs uppercase tracking-[3px] text-pink-400 dark:text-pink-400">
              Trivias
            </p>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold mb-2 text-foreground">
            Pon a prueba tu conocimiento
          </h2>
          <p className="text-sm text-muted-foreground mb-8">
            Elige una categoría y responde preguntas sobre igualdad, historia, derechos y más.
          </p>
          <QuizTrivias />
        </div>
      </section>

      {/* ── Separador decorativo ── */}
      <div className="container mx-auto max-w-5xl px-4">
        <div className="flex items-center gap-4">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-pink-300 dark:via-pink-700 to-transparent" />
          <Sparkles className="w-4 h-4 text-pink-300 dark:text-pink-600" />
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-pink-300 dark:via-pink-700 to-transparent" />
        </div>
      </div>

      {/* ── Juegos ── */}
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-5xl">
          {!activeGame ? (
            <>
              <div className="mb-8">
                <div className="flex items-center gap-3 mb-1">
                  <Gamepad2 className="w-5 h-5 text-pink-400" />
                  <p className="text-xs uppercase tracking-[3px] text-pink-400 dark:text-pink-400">
                    Juegos
                  </p>
                </div>
                <h2 className="text-2xl md:text-3xl font-bold mb-2 text-foreground">
                  Desafíos interactivos
                </h2>
                <p className="text-sm text-muted-foreground">
                  Dos formas divertidas de conocer a las mujeres que hicieron historia.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
                {/* ¿Quién Soy? */}
                <div
                  className="relative cursor-pointer rounded-2xl overflow-hidden group transition-transform duration-300 hover:-translate-y-1"
                  onClick={() => setActiveGame("quienSoy")}
                >
                  <div className="w-full h-52 bg-gradient-to-br from-pink-300 via-pink-400 to-pink-600 dark:from-pink-700 dark:via-pink-600 dark:to-pink-800 flex flex-col items-start justify-end gap-2 p-6">
                    <div className="w-12 h-12 rounded-full bg-white/25 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                      <HelpCircle className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-white font-bold text-xl">
                      ¿Quién Soy?
                    </span>
                    <p className="text-white/70 text-xs max-w-[200px] leading-relaxed">
                      Descubre mujeres históricas con pistas progresivas
                    </p>
                    <ArrowRight className="absolute bottom-5 right-5 w-5 h-5 text-white/40 group-hover:text-white/80 transition-colors" />
                  </div>
                </div>

                {/* Frase Célebre */}
                <div
                  className="relative cursor-pointer rounded-2xl overflow-hidden group transition-transform duration-300 hover:-translate-y-1"
                  onClick={() => setActiveGame("fraseCelebre")}
                >
                  <div className="w-full h-52 bg-gradient-to-br from-pink-200 via-rose-300 to-pink-700 dark:from-rose-700 dark:via-pink-600 dark:to-rose-800 flex flex-col items-start justify-end gap-2 p-6">
                    <div className="w-12 h-12 rounded-full bg-white/25 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                      <Quote className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-white font-bold text-xl">
                      Frase Célebre
                    </span>
                    <p className="text-white/70 text-xs max-w-[200px] leading-relaxed">
                      ¿Sabes quién dijo estas palabras que marcaron la historia?
                    </p>
                    <ArrowRight className="absolute bottom-5 right-5 w-5 h-5 text-white/40 group-hover:text-white/80 transition-colors" />
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="w-full max-w-6xl mx-auto mt-4">
              <Button
                onClick={() => setActiveGame(null)}
                className="mb-6 px-5 py-2 bg-pink-600 dark:bg-pink-700 text-white rounded-full hover:bg-pink-700 dark:hover:bg-pink-600 transition-colors text-sm"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Volver al menú
              </Button>

              {activeGame === "quienSoy" && <QuienSoy />}
              {activeGame === "fraseCelebre" && <FraseCelebre />}
            </div>
          )}
        </div>
      </section>

      {/* ── CTA / Motivación ── */}
      <section className="pb-20 px-4">
        <div className="container mx-auto max-w-3xl">
          <div className="bg-pink-50 dark:bg-pink-950/30 border border-pink-200 dark:border-pink-800/50 rounded-2xl p-8 md:p-10 text-center space-y-5">
            <Quote className="w-8 h-8 text-pink-300 dark:text-pink-600 mx-auto" />
            <p className="text-lg md:text-xl italic text-pink-900/70 dark:text-pink-200/80 leading-relaxed">
              "Una mujer con educación es una mujer con poder."
            </p>
            <p className="text-xs text-pink-500 dark:text-pink-400 tracking-wide">
              — Malala Yousafzai
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center items-center pt-2">
              <Button
                className="bg-pink-600 hover:bg-pink-700 dark:bg-pink-700 dark:hover:bg-pink-600 text-white rounded-full px-6"
                size="lg"
              >
                <Sparkles className="h-4 w-4 mr-2" />
                <a href="/voces-silenciadas">Explorar historias</a>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="rounded-full border-pink-300 dark:border-pink-700 text-pink-800 dark:text-pink-300 hover:bg-pink-50 dark:hover:bg-pink-950/50 px-6"
              >
                <a href="/herstory" className="flex items-center">
                  <BookOpen className="h-4 w-4 mr-2" />
                  Más información
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Aprende;