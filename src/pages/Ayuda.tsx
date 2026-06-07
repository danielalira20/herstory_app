import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { HeroSection } from "@/components/ui/hero-section";
import { OrganizationCard } from "@/components/ui/organization-card";
//import { GuideCard } from "@/components/ui/guide-card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { organizations } from "@/data/organizations";
import { guides } from "@/data/guides";
import { Users, BookOpen, Heart, Filter } from "lucide-react";
import supportImage from "@/assets/support-hands.jpg";
//import guidesImage from "@/assets/guides-book.jpg";

const Index = () => {
  const navigate = useNavigate();
  const [selectedOrgType, setSelectedOrgType] = useState<string | null>(null);
  const [selectedGuideCategory, setSelectedGuideCategory] = useState<string | null>(null);

  const filteredOrganizations = selectedOrgType
    ? organizations.filter(org => org.type === selectedOrgType)
    : organizations;

  

  const organizationTypes = [...new Set(organizations.map(org => org.type))];
  //const guideCategories = [...new Set(guides.map(guide => guide.category))];

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <div id="hero">
        <HeroSection
          title="Conectando con la Ayuda"
          subtitle="Tu red de apoyo y recursos para el empoderamiento femenino. Encuentra organizaciones aliadas y guías prácticas para situaciones que importan."
          onExploreClick={() => scrollToSection('organizaciones')}
        />
      </div>

      {/* Navigation — estilo igual que NavbarSearch */}
<nav className="sticky top-0 z-50 w-full border-b backdrop-blur supports-[backdrop-filter]:bg-purple-50/60 bg-purple-100/95 dark:bg-background/95 border-purple-200/60 dark:border-purple-900/40">
  <div className="container mx-auto px-4 py-3">
    <div className="flex items-center justify-center gap-2">
      <Button variant="ghost" onClick={() => navigate('/search')}
        className="flex items-center gap-2 text-purple-800 hover:text-purple-800 dark:hover:text-purple-800 hover:bg-purple-200/50 dark:hover:bg-purple-800/50">
        <Heart className="h-4 w-4" /> Regresar
      </Button>
      <Button variant="ghost" onClick={() => scrollToSection('organizaciones')}
        className="flex items-center gap-2 text-purple-800 hover:text-purple-800 dark:hover:text-purple-800 hover:bg-purple-200/50 dark:hover:bg-purple-800/50">
        <Users className="h-4 w-4" /> Organizaciones
      </Button>
      <Button variant="ghost" onClick={() => scrollToSection('guias')}
        className="flex items-center gap-2 text-purple-800 hover:text-purple-800 dark:hover:text-purple-800 hover:bg-purple-200/50 dark:hover:bg-purple-800/50">
        <BookOpen className="h-4 w-4" /> Guías
      </Button>
    </div>
  </div>
</nav>

      {/* Organizations Section */}
      <section id="organizaciones" className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-12">
            <div>
              <h2 className="text-4xl font-bold text-primary mb-6">
                Organizaciones de Apoyo
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                Conecta con fundaciones, colectivos y asociaciones comprometidas con los derechos 
                de las mujeres. Encuentra el apoyo que necesitas cerca de ti.
              </p>
              <div className="flex items-center gap-2 text-primary">
                <Heart className="h-5 w-5" />
                <span className="font-medium">{organizations.length} organizaciones disponibles</span>
              </div>
            </div>
            <div className="relative">
              <img
                src={supportImage}
                alt="Manos de apoyo"
                className="rounded-lg shadow-elegant w-full h-64 object-cover"
              />
            </div>
          </div>

          {/* Organization Filters */}
          <div className="flex flex-wrap gap-2 mb-8">
            <Button
              variant={selectedOrgType === null ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedOrgType(null)}
              className="flex items-center gap-2"
            >
              <Filter className="h-4 w-4" />
              Todas
            </Button>
            {organizationTypes.map((type) => (
              <Button
                key={type}
                variant={selectedOrgType === type ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedOrgType(type)}
              >
                {type}
              </Button>
            ))}
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredOrganizations.map((org) => (
              <OrganizationCard key={org.id} {...org} />
            ))}
          </div>
        </div>
      </section>

      

      {/* Emergency Contact Section */}
      <section className="py-20 bg-gradient-hero">
        <div className="container mx-auto px-4 text-center">
          <Card className="max-w-2xl mx-auto p-8 bg-white/10 backdrop-blur-md border-white/20">
            <h3 className="text-2xl font-bold text-white mb-4">
              ¿Necesitas ayuda inmediata?
            </h3>
            <p className="text-white/90 mb-6">
              Si te encuentras en una situación de emergencia, no dudes en contactar con estos números.
            </p>
            <div className="space-y-3">
              <div className="bg-white/20 rounded-lg p-4">
                <h4 className="font-bold text-white">Emergencias</h4>
                <p className="text-white/90 text-xl font-bold">112</p>
              </div>
              <div className="bg-white/20 rounded-lg p-4">
                <h4 className="font-bold text-white">Violencia de Género</h4>
                <p className="text-white/90 text-xl font-bold">016</p>
              </div>
            </div>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default Index;
