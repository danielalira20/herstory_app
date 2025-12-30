import { BookOpen, Gamepad2, Mic, Lightbulb } from "lucide-react";
import FeatureCard from "../components/FeatureCard.tsx";

const features = [
  {
    Icon: BookOpen,
    title: "Museo Digital",
    description: "Conoce a mujeres históricas que cambiaron el mundo. Explora biografías interactivas y líneas de tiempo visuales.",
  },
  {
    Icon: Gamepad2,
    title: "Aprende Jugando",
    description: "Trivia, juegos y recursos educativos interactivos. Aprende mientras te diviertes con desafíos gamificados.",
  },
  {
    Icon: Mic,
    title: "Podcast Ella Dice",
    description: "Escucha historias inspiradoras contadas por voces femeninas empoderadas. Episodios semanales sobre mujeres que transformaron la historia.", // ← CAMBIO AQUÍ
  },
  {
    Icon: Lightbulb,
    title: "Guía de Concienciación",
    description: "Recursos para educadores y activistas. Materiales didácticos y guías de acción para el cambio.",
  },
];

const FeaturesSection = () => {
  return (
    <section className="relative py-24 px-6 bg-background">
      {/* Subtle gradient overlay at top */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-pink-900/20 to-transparent" />
      
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 
            className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 opacity-0 animate-fade-in-up"
          >
            Explora, Aprende, <span className="text-gradient">Inspírate</span>
          </h2>
          <p 
            className="text-pink-200/70 font-sans text-lg max-w-2xl mx-auto opacity-0 animate-fade-in-up"
            style={{ animationDelay: "0.1s" }}
          >
            Cuatro formas de conectar con las historias extraordinarias de mujeres que merecen ser recordadas
          </p>
        </div>
        
        {/* Features grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <FeatureCard
              key={feature.title}
              Icon={feature.Icon}
              title={feature.title}
              description={feature.description}
              delay={0.2 + index * 0.15}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
