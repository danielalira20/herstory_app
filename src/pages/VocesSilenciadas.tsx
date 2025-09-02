import { MediaSection } from '@/components/MediaSection';
import heroImage from '@/assets/women-empowerment-hero.jpg';
import { Users, Target, Globe, Heart } from 'lucide-react';
import Navbar from '@/components/Navbar';

const VocesSilenciadas = () => {
  return (
    
    <div className="min-h-screen bg-gradient-subtle">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-hero text-primary-foreground">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative container mx-auto px-4 py-20 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                Voces que Empoderan
                <span className="block text-primary-light">el Futuro</span>
              </h1>
              <p className="text-xl lg:text-2xl opacity-90 leading-relaxed">
                Descubre contenido inspirador sobre mujeres y el ODS5: podcasts, videos y audios 
                que celebran el empoderamiento femenino y la igualdad de género.
              </p>
              <div className="flex flex-wrap gap-4 pt-6">
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2">
                  <Users className="h-5 w-5" />
                  <span>200+ Historias</span>
                </div>
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2">
                  <Target className="h-5 w-5" />
                  <span>ODS 5</span>
                </div>
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2">
                  <Globe className="h-5 w-5" />
                  <span>Global</span>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-primary rounded-2xl blur-3xl opacity-30"></div>
              <img 
                src={heroImage} 
                alt="Mujeres empoderadas representando el ODS5"
                className="relative rounded-2xl shadow-elegant w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>
        <Navbar />
      {/* ODS5 Information */}
      <section className="py-16 bg-card/30 backdrop-blur-sm border-y border-border/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              ODS 5: Igualdad de Género
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Lograr la igualdad entre los géneros y empoderar a todas las mujeres y las niñas 
              es fundamental para el desarrollo sostenible.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center space-y-4 p-6 rounded-xl bg-card/50 backdrop-blur-sm border border-border/50 hover:shadow-elegant transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto">
                <Users className="h-8 w-8 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-semibold">Empoderamiento</h3>
              <p className="text-muted-foreground">
                Fortalecer la participación y liderazgo de las mujeres en todos los ámbitos de la sociedad.
              </p>
            </div>
            
            <div className="text-center space-y-4 p-6 rounded-xl bg-card/50 backdrop-blur-sm border border-border/50 hover:shadow-elegant transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-hero rounded-full flex items-center justify-center mx-auto">
                <Target className="h-8 w-8 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-semibold">Igualdad</h3>
              <p className="text-muted-foreground">
                Eliminar todas las formas de discriminación y violencia contra mujeres y niñas.
              </p>
            </div>
            
            <div className="text-center space-y-4 p-6 rounded-xl bg-card/50 backdrop-blur-sm border border-border/50 hover:shadow-elegant transition-all duration-300">
              <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto">
                <Heart className="h-8 w-8 text-accent-foreground" />
              </div>
              <h3 className="text-xl font-semibold">Derechos</h3>
              <p className="text-muted-foreground">
                Garantizar el acceso universal a la salud sexual y reproductiva y los derechos reproductivos.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Media Content Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Contenido Multimedia
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Explora nuestra colección de podcasts, videos y audios que destacan historias 
              inspiradoras de mujeres y promueven la igualdad de género.
            </p>
          </div>
          
          <MediaSection />
        </div>
      </section>
    </div>
    
  );
};

export default VocesSilenciadas;