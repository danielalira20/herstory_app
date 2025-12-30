import { MapPin, Database, Heart, AlertTriangle } from 'lucide-react'; // ← Cambié Users por Heart
import FeatureCard from '../components/FeatureCard.tsx';

const features = [
  {
    icon: MapPin,
    title: 'Mapa Nacional',
    description: 'Visualiza casos de mujeres desaparecidas en todo el país con datos actualizados en tiempo real.',
  },
  {
    icon: Database,
    title: 'Rastro Nacional',
    description: 'Base de datos y búsqueda inteligente de casos con filtros avanzados y alertas personalizadas.',
  },
  {
    icon: Heart, // ← Cambié de Users a Heart (más emotivo para testimonios)
    title: 'Voces Silenciadas',
    description: 'Testimonios reales de familias buscadoras. Historias de resistencia, esperanza y memoria que mantienen viva la búsqueda.', // ← DESCRIPCIÓN NUEVA Y CLARA
  },
  {
    icon: AlertTriangle,
    title: 'Reportar Caso',
    description: 'Ayuda a difundir información de personas desaparecidas y contribuye a la búsqueda.',
  },
];

const Features = () => {
  return (
    <section className="relative py-24 gradient-hero noise-overlay">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4 opacity-0 animate-fade-in-up">
            Herramientas de búsqueda
          </h2>
          <p className="text-purple-200/70 max-w-xl mx-auto opacity-0 animate-fade-in-up animation-delay-200">
            Recursos diseñados para apoyar a las familias en la búsqueda de sus seres queridos
          </p>
        </div>
        
        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {features.map((feature, index) => (
            <FeatureCard
              key={feature.title}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              delay={`${(index + 1) * 200}ms`}
            />
          ))}
        </div>
        
        {/* Bottom CTA */}
        <div className="text-center mt-16 opacity-0 animate-fade-in-up" style={{ animationDelay: '1000ms' }}>
          <p className="text-purple-300/60 text-sm mb-4">
            Juntas podemos hacer la diferencia
          </p>
          <button className="px-6 py-3 rounded-xl glass hover:bg-purple-500/20 text-foreground text-sm font-medium transition-all duration-300 hover:shadow-glow">
            Ver todos los recursos
          </button>
        </div>
      </div>
    </section>
  );
};

export default Features;
