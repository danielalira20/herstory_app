import { MapPin, Database, Heart, AlertTriangle } from 'lucide-react';
import { Link } from 'react-router-dom';
import FeatureCardSearch from '../components/FeatureCardSearch';
import FloatingShapesSearch from '../components/FloatingShapesSearch';
import NavbarSearch from '../components/NavbarSearch';

const features = [
  {
    icon: MapPin,
    title: 'Mapa Nacional',
    description: 'Visualiza casos de mujeres desaparecidas en todo el país con datos actualizados en tiempo real.',
    link: '/rastro-nacional',
  },
  {
    icon: Database,
    title: 'Rastro Nacional',
    description: 'Base de datos y búsqueda inteligente de casos con filtros avanzados y alertas personalizadas.',
    link: '/mujeres-desaparecidas',
  },
  {
    icon: Heart,
    title: 'Colectivos',
    description: 'Encuentra el directorio de colectivos verificados por estado, recursos y guías de buenas prácticas.',
    link: '/colectivos',
  },
  {
    icon: AlertTriangle,
    title: 'Reportar Caso',
    description: 'Ayuda a difundir información de personas desaparecidas y contribuye a la búsqueda.',
    link: '/reportar',
  },
];

const Search = () => {
  return (
    <>
      <NavbarSearch />
      <div className="min-h-screen pt-16 bg-gradient-to-br from-purple-100 via-purple-50 to-purple-50 dark:bg-none dark:bg-background">
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
          {/* Noise overlay - solo para este componente */}
          <div 
            className="absolute inset-0 opacity-[0.02] pointer-events-none"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`
            }}
          />
          
          <FloatingShapesSearch />
          
          {/* Content */}
          <div className="relative z-10 container mx-auto px-6 text-center">
            <div className="max-w-4xl mx-auto">
              {/* Badge */}
              <div 
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8 opacity-0 animate-fade-in-up"
                style={{
                  background: 'rgba(196, 181, 253, 0.3)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(167, 139, 250, 0.3)'
                }}
              >
                <span className="w-2 h-2 rounded-full bg-purple-500 animate-pulse" />
                <span className="text-sm text-purple-700 font-medium tracking-wide">
                  Plataforma de búsqueda
                </span>
              </div>
              
              {/* Main Title */}
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold mb-6 opacity-0 animate-fade-in-up animation-delay-200">
                <span 
                  className="bg-clip-text text-transparent"
                  style={{
                    backgroundImage: 'linear-gradient(135deg, #a855f7 0%, #c084fc 50%, #e879f9 100%)'
                  }}
                >
                  HerStory
                </span>
                <br />
                <span className="text-purple-900">Search</span>
              </h1>
              
              {/* Subtitle */}
              <p className="text-xl md:text-2xl text-purple-700 max-w-2xl mx-auto leading-relaxed opacity-0 animate-fade-in-up animation-delay-400">
                Herramientas para encontrar a quienes nos faltan
              </p>
              
              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 opacity-0 animate-fade-in-up" style={{ animationDelay: '600ms' }}>
                <button 
                  className="px-8 py-4 rounded-xl font-medium transition-all duration-300 hover:translate-y-[-2px]"
                  style={{
                    background: 'linear-gradient(135deg, #a855f7 0%, #9333ea 100%)',
                    color: 'white',
                    boxShadow: '0 4px 20px rgba(168, 85, 247, 0.3)'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.boxShadow = '0 8px 30px rgba(168, 85, 247, 0.5)'}
                  onMouseLeave={(e) => e.currentTarget.style.boxShadow = '0 4px 20px rgba(168, 85, 247, 0.3)'}
                >
                  Comenzar búsqueda
                </button>
                <button 
                  className="px-8 py-4 rounded-xl font-medium transition-all duration-300"
                  style={{
                    background: 'rgba(196, 181, 253, 0.2)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(167, 139, 250, 0.3)',
                    color: '#6b21a8'
                  }}
                >
                  Conocer más
                </button>
              </div>
              
              {/* Stats */}
              <div className="mt-16 grid grid-cols-3 gap-8 max-w-lg mx-auto opacity-0 animate-fade-in-up" style={{ animationDelay: '800ms' }}>
                <div className="text-center">
                  <div className="text-3xl font-serif font-bold text-purple-900">12K+</div>
                  <div className="text-sm text-purple-600 mt-1">Casos registrados</div>
                </div>
                <div className="text-center" style={{ borderLeft: '1px solid rgba(147, 51, 234, 0.2)', borderRight: '1px solid rgba(147, 51, 234, 0.2)' }}>
                  <div className="text-3xl font-serif font-bold text-purple-900">32</div>
                  <div className="text-sm text-purple-600 mt-1">Estados cubiertos</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-serif font-bold text-purple-900">847</div>
                  <div className="text-sm text-purple-600 mt-1">Reencuentros</div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Scroll indicator */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 opacity-0 animate-fade-in-up" style={{ animationDelay: '800ms' }}>
            <div 
              className="w-6 h-10 rounded-full flex items-start justify-center p-2"
              style={{ border: '2px solid rgba(168, 85, 247, 0.3)' }}
            >
              <div className="w-1 h-2 rounded-full bg-purple-400 animate-bounce" />
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="relative py-24 bg-gradient-to-b from-purple-50 to-purple-100 dark:bg-none dark:bg-background">
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
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-purple-900 mb-4 opacity-0 animate-fade-in-up">
                Herramientas de búsqueda
              </h2>
              <p className="text-purple-700 max-w-xl mx-auto opacity-0 animate-fade-in-up animation-delay-200">
                Recursos diseñados para apoyar a las familias en la búsqueda de sus seres queridos
              </p>
            </div>
            
            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto items-stretch">
              {features.map((feature, index) => (
                <Link 
                  key={feature.title}
                  to={feature.link}
                  className="block h-full"
                >
                  <FeatureCardSearch
                    icon={feature.icon}
                    title={feature.title}
                    description={feature.description}
                    delay={`${(index + 1) * 200}ms`}
                  />
                </Link>
              ))}
            </div>
            
            {/* Bottom CTA */}
            <div className="text-center mt-16 opacity-0 animate-fade-in-up" style={{ animationDelay: '1000ms' }}>
              <p className="text-purple-600 text-sm mb-4">
                Juntas podemos hacer la diferencia
              </p>
              <Link to="/nosotras">
                <button 
                  className="px-6 py-3 rounded-xl text-sm font-medium transition-all duration-300"
                  style={{
                    background: 'rgba(196, 181, 253, 0.2)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(167, 139, 250, 0.3)',
                    color: '#6b21a8'
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

export default Search;