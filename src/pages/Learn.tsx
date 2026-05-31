import { BookOpen, Gamepad2, Mic, Lightbulb } from "lucide-react";
import { Link } from 'react-router-dom';
import FeatureCardLearn from "../components/FeatureCardLearn";
import FloatingShapesLearn from "../components/FloatingShapesLearn";
import NavbarLearn from "../components/NavbarLearn";

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
  /*{
    Icon: Mic,
    title: "Podcast Ella Dice",
    description: "Escucha historias inspiradoras contadas por voces femeninas empoderadas. Episodios semanales sobre mujeres que transformaron la historia.",
    link: '/ella-dice',
  },*/
  {
    Icon: Lightbulb,
    title: "Guía de Concienciación",
    description: "Recursos para educadores y activistas. Materiales didácticos y guías de acción para el cambio.",
    link: '/awareness-guide',
  },
  {
  Icon: BookOpen,
  title: "Guías de Apoyo",
  description: "Recursos descargables sobre derechos, salud, seguridad y empoderamiento. Encuentra la guía que necesitas.",
  link: '/guias',
},
];

const Learn = () => {
  return (
    <>
      <NavbarLearn />
      <div className="min-h-screen pt-16 bg-gradient-to-br from-pink-100 via-pink-50 to-fuchsia-50 dark:bg-none dark:bg-background">

        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
          {/* Noise overlay */}
          <div
            className="absolute inset-0 opacity-[0.02] pointer-events-none"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`
            }}
          />

          <FloatingShapesLearn />

          {/* Content */}
          <div className="relative z-10 container mx-auto px-6 text-center">
            <div className="max-w-4xl mx-auto">

              {/* Badge */}
              <div
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8 opacity-0 animate-fade-in-up"
                style={{
                  background: 'rgba(251, 207, 232, 0.4)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(244, 114, 182, 0.3)'
                }}
              >
                <span className="w-2 h-2 rounded-full bg-pink-500 animate-pulse" />
                <span className="text-sm text-pink-700 font-medium tracking-wide">
                  INSPIRADOR
                </span>
              </div>

              {/* Main Title */}
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold mb-6 opacity-0 animate-fade-in-up animation-delay-200">
                <span
                  className="bg-clip-text text-transparent"
                  style={{
                    backgroundImage: 'linear-gradient(135deg, #ec4899 0%, #f472b6 50%, #e879f9 100%)'
                  }}
                >
                  HerStory
                </span>
                <br />
                <span className="text-pink-900">Learn</span>
              </h1>

              {/* Subtitle */}
              <p className="text-xl md:text-2xl text-pink-700 max-w-2xl mx-auto leading-relaxed opacity-0 animate-fade-in-up animation-delay-400">
                Descubre las historias que han sido olvidadas
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 opacity-0 animate-fade-in-up" style={{ animationDelay: '600ms' }}>
                <Link to="/herstory">
                  <button
                    className="px-8 py-4 rounded-xl font-medium transition-all duration-300 hover:translate-y-[-2px]"
                    style={{
                      background: 'linear-gradient(135deg, #ec4899 0%, #db2777 100%)',
                      color: 'white',
                      boxShadow: '0 4px 20px rgba(236, 72, 153, 0.3)'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.boxShadow = '0 8px 30px rgba(236, 72, 153, 0.5)'}
                    onMouseLeave={(e) => e.currentTarget.style.boxShadow = '0 4px 20px rgba(236, 72, 153, 0.3)'}
                  >
                    Explorar museo
                  </button>
                </Link>
                <Link to="/awareness-guide">
                  <button
                    className="px-8 py-4 rounded-xl font-medium transition-all duration-300"
                    style={{
                      background: 'rgba(251, 207, 232, 0.3)',
                      backdropFilter: 'blur(10px)',
                      border: '1px solid rgba(244, 114, 182, 0.3)',
                      color: '#9d174d'
                    }}
                  >
                    Ver guías
                  </button>
                </Link>
              </div>

              {/* Stats */}
              <div className="mt-16 grid grid-cols-3 gap-8 max-w-lg mx-auto opacity-0 animate-fade-in-up" style={{ animationDelay: '800ms' }}>
                <div className="text-center">
                  <div className="text-3xl font-serif font-bold text-pink-900">80+</div>
                  <div className="text-sm text-pink-600 mt-1">Mujeres históricas</div>
                </div>
                <div className="text-center" style={{ borderLeft: '1px solid rgba(236, 72, 153, 0.2)', borderRight: '1px solid rgba(236, 72, 153, 0.2)' }}>
                  <div className="text-3xl font-serif font-bold text-pink-900">7</div>
                  <div className="text-sm text-pink-600 mt-1">Categorías</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-serif font-bold text-pink-900">4</div>
                  <div className="text-sm text-pink-600 mt-1">Recursos</div>
                </div>
              </div>
            </div>
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 opacity-0 animate-fade-in-up" style={{ animationDelay: '800ms' }}>
            <div
              className="w-6 h-10 rounded-full flex items-start justify-center p-2"
              style={{ border: '2px solid rgba(236, 72, 153, 0.3)' }}
            >
              <div className="w-1 h-2 rounded-full bg-pink-400 animate-bounce" />
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="relative py-24 bg-gradient-to-b from-pink-50 to-pink-100 dark:bg-none dark:bg-background">
          {/* Noise overlay */}
          <div
            className="absolute inset-0 opacity-[0.02] pointer-events-none"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`
            }}
          />

          <div className="container mx-auto px-6 relative z-10">
            {/* Section Header */}
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-pink-900 mb-4 opacity-0 animate-fade-in-up">
                Recursos de aprendizaje
              </h2>
              <p className="text-pink-700 max-w-xl mx-auto opacity-0 animate-fade-in-up animation-delay-200">
                Para estudiantes, docentes y cualquiera que quiera aprender con el corazón
              </p>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
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

            {/* Bottom CTA */}
            <div className="text-center mt-16 opacity-0 animate-fade-in-up" style={{ animationDelay: '1000ms' }}>
              <p className="text-pink-600 text-sm mb-4">
                Juntas podemos recordar y transformar
              </p>
              <Link to="/nosotras">
                <button
                  className="px-6 py-3 rounded-xl text-sm font-medium transition-all duration-300"
                  style={{
                    background: 'rgba(251, 207, 232, 0.3)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(244, 114, 182, 0.3)',
                    color: '#9d174d'
                  }}
                >
                  Ver todos los recursos
                </button>
              </Link>
            </div>
          </div>
        </section>

      </div>
    </>
  );
};

export default Learn;