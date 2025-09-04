import { useState } from "react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import { useToast } from "@/hooks/use-toast";
import headerImage from "@/assets/herstory-header.jpg";
import Quiz from "../components/quiz";
import QuizTrivias from "@/components/QuizTrivias"
import banner from "@/assets/banner_trivias.png";
import Trivias from "@/components/aprende/Trivias";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Brain, Users, BookOpen, Trophy, Play, Sparkles } from "lucide-react";
import Memorama from "@/components/aprende/Memorama";
import OrdenarPalabras from "@/components/aprende/OrdenarPalabras";
  const Aprende = () => {
  const { toast } = useToast();
 const [showQuiz, setShowQuiz] = useState(false);


 

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="relative w-full h-48 overflow-hidden">
        <img 
          src={headerImage} 
          alt="HerStory Header" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">Aprende</h1>
            <p className="text-lg italic">Explora y reflexiona</p>
          </div>
        </div>
      </div>

      <Navbar />


      {/* Sección Informativa Principal */}
      <section className="py-16 px-4 subtle-gradient">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center space-y-6 mb-12">
            <div className="flex justify-center">
              <div className="h-16 w-16 bg-gradient-to-br from-purple-500 via-purple-600 to-purple-700 rounded-full flex items-center justify-center shadow-lg">
  <Play className="h-8 w-8 text-white" />
</div>

            </div>
            <h2 className="text-3xl md:text-4xl font-bold">
              Aprende <span className="bg-gradient-to-r from-purple-400 via-purple-500 to-purple-600 bg-clip-text text-transparent">Jugando</span>
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Sumérgete en una experiencia educativa única donde cada pregunta te acerca más al mundo 
              fascinante de las mujeres que marcaron la historia. Nuestra trivia potenciada por IA 
              adapta las preguntas a tu nivel, haciendo que cada sesión sea un nuevo desafío.
            </p>
          </div>

          {/* Card Principal de Llamada a la Acción */}
         {/*
          <div className="mb-16">
            <Card className="elegant-shadow hover:glow-shadow smooth-transition border-0 accent-gradient">
              <CardContent className="p-8 md:p-12 text-center">
                <div className="space-y-6">
                  <div className="flex justify-center">
                    <div className="bg-white/20 p-4 rounded-full">
                      <Users className="h-10 w-10 text-white" />
                    </div>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                    ¿Conoces a estas Mujeres Extraordinarias?
                  </h3>
                  <p className="text-white/90 text-lg max-w-2xl mx-auto mb-6">
                    Desde científicas pioneras como Marie Curie hasta activistas como Rosa Parks, 
                    cada pregunta te permitirá descubrir historias inspiradoras que quizás no conocías. 
                    ¡Pon a prueba tus conocimientos y aprende algo nuevo en cada partida!
                  </p>
                  <Button 
                    size="lg" 
                    variant="secondary"
                    onClick={() => setShowQuiz(true)}
                    className="text-lg px-8 py-4 h-auto font-semibold"
                  >
                    <Play className="h-5 w-5 mr-2" />
                    Comenzar Trivia
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
         */}

         {/* Card Principal de Llamada a la Acción */}
<div className="min-h-screen relative">
      {!showQuiz ? (
<div className="mb-16 relative rounded-xl overflow-hidde">
  <div 
    className="absolute inset-0 bg-cover bg-center rounded-xl" 
    style={{ backgroundImage: `url(${banner})` }}
  ></div>

  <Card className="relative elegant-shadow hover:glow-shadow smooth-transition border-0 bg-transparent">
    <CardContent className="p-8 md:p-12">
      <div className="flex flex-col md:flex-row items-center md:items-start">
        {/* Fondo de color a la izquierda */}
        <div className="md:w-1/2  p-6 rounded-lg text-black space-y-6">
          <div className="flex justify-center md:justify-start">
            <div className="bg-black/20 p-4 rounded-full">
              <Users className="h-10 w-10 text-white" />
            </div>
          </div>
          <h3 className="text-2xl md:text-3xl font-bold">
            ¿Que mujer historica eres?
          </h3>
          <p className="text-black/90 text-lg leading-relaxed">
            Desde científicas pioneras como Marie Curie hasta activistas como Rosa Parks, 
            cada pregunta te permitirá descubrir historias inspiradoras que quizás no conocías. 
            ¡Pon a prueba tus conocimientos y aprende algo nuevo en cada partida!
          </p>
          <Button 
            size="lg" 
            variant="secondary"
            onClick={() => setShowQuiz(true)}
            className="text-lg px-8 py-4 h-auto font-semibold"
          >
            <Play className="h-5 w-5 mr-2" />
            Comenzar Trivia
          </Button>
        </div>

        {/* Espacio vacío o imagen al lado derecho */}
        <div className="hidden md:block md:w-1/2"></div>
      </div>
    </CardContent>
  </Card>
</div> ): (

<div className="">
      <Quiz />
    </div>
)}
</div>

          <section className="pt-4 pb-12 px-4 subtle-gradient">
              <QuizTrivias />
            </section>

         
          {/* Sección de Motivación */}
          <div className="text-center space-y-6">
            <h3 className="text-2xl md:text-3xl font-bold">
              Cada Respuesta es un <span className="bg-gradient-to-r from-purple-400 via-purple-500 to-purple-600 bg-clip-text text-transparent">Nuevo Descubrimiento</span>
            </h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              No solo respondas preguntas, vive las experiencias de mujeres valientes que desafiaron 
              las normas de su época. Cada trivia es una ventana al pasado que te inspirará para el futuro.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button variant="hero" size="lg" onClick={() => setShowQuiz(true)}>
                <Sparkles className="h-5 w-5 mr-2" />
                <a href="/voces-silenciadas"> 
                Explorar Ahora
                </a>
              </Button>
              <Button variant="outline" size="lg" >
                 <a href="/herStory"> 
                <BookOpen className="h-5 w-5 mr-2" />
                Más Información
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









