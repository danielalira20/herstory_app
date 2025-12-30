import { BookOpen, Gamepad2, Mic, Lightbulb } from "lucide-react";
import { Link } from 'react-router-dom';
import FeatureCardLearn from "../components/FeatureCardLearn";

const features = [
  {
    Icon: BookOpen,
    title: "Museo Digital",
    description: "Conoce a mujeres históricas que cambiaron el mundo. Explora biografías interactivas y líneas de tiempo visuales.",
    link: '/herstory',
  },
  {
    Icon: Gamepad2,
    title: "Aprende Jugando",
    description: "Trivia, juegos y recursos educativos interactivos. Aprende mientras te diviertes con desafíos gamificados.",
    link: '/aprende',
  },
  {
    Icon: Mic,
    title: "Podcast Ella Dice",
    description: "Escucha historias inspiradoras contadas por voces femeninas empoderadas. Episodios semanales sobre mujeres que transformaron la historia.",
    link: '/ella-dice',
  },
  {
    Icon: Lightbulb,
    title: "Guía de Concienciación",
    description: "Recursos para educadores y activistas. Materiales didácticos y guías de acción para el cambio.",
    link: '/awareness-guide',
  },
];

const Learn = () => {
  return (
    <div 
      className="min-h-screen relative overflow-hidden" 
      style={{
        background: 'linear-gradient(135deg, #fce7f3 0%, #fbcfe8 35%, #f9a8d4 70%, #fbcfe8 100%)'
      }}
    >
      {/* Noise overlay */}
      <div 
        className="absolute inset-0 opacity-[0.015] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`
        }}
      />
      
      <div className="max-w-6xl mx-auto px-6 py-24 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-20">
          <div 
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8 opacity-0 animate-fade-in-up"
            style={{
              background: 'rgba(251, 207, 232, 0.5)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(244, 114, 182, 0.3)'
            }}
          >
            <span className="w-2 h-2 bg-pink-500 rounded-full animate-pulse"></span>
            <span className="text-sm font-medium tracking-wide" style={{ color: '#831843' }}>
              ✨ INSPIRADOR
            </span>
          </div>
          
          <h1 className="font-serif text-5xl md:text-7xl font-bold mb-6 opacity-0 animate-fade-in-up animation-delay-200" style={{ color: '#831843' }}>
            HerStory Learn
          </h1>
          
          <p className="text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed opacity-0 animate-fade-in-up animation-delay-400" style={{ color: '#9f1239' }}>
            Descubre las historias que la historia olvidó
          </p>
        </div>
        
        {/* Features grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <Link 
              key={feature.title}
              to={feature.link}
              className="block"
            >
              <FeatureCardLearn
                Icon={feature.Icon}
                title={feature.title}
                description={feature.description}
                delay={0.2 + index * 0.15}
              />
            </Link>
          ))}
        </div>
        
        {/* Footer CTA */}
        <div className="text-center mt-20 opacity-0 animate-fade-in-up" style={{ animationDelay: '1000ms' }}>
          <p className="text-base mb-6" style={{ color: '#9f1239' }}>
            Para estudiantes, docentes y cualquiera que quiera aprender con el corazón
          </p>
          <Link to="/nosotras">
            <button 
              className="px-8 py-3 rounded-full font-medium transition-all duration-300 hover:scale-105"
              style={{
                background: 'rgba(251, 207, 232, 0.4)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(244, 114, 182, 0.4)',
                color: '#831843',
                boxShadow: '0 4px 20px rgba(244, 114, 182, 0.2)'
              }}
              onMouseEnter={(e) => e.currentTarget.style.boxShadow = '0 8px 30px rgba(244, 114, 182, 0.35)'}
              onMouseLeave={(e) => e.currentTarget.style.boxShadow = '0 4px 20px rgba(244, 114, 182, 0.2)'}
            >
              Ver todos los recursos
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Learn;
