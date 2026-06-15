import { useState } from "react";
import { OrganizationCard } from "@/components/ui/organization-card";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { organizations } from "@/data/organizations";
import { Heart, Filter } from "lucide-react";
import headerImage from "@/assets/herstory-header.jpg";
import WomenSilhouettes from "@/components/WomenSilhouettes";
import NavbarWrapper from "@/components/NavbarWrapper";

const Index = () => {
  const [selectedOrgType, setSelectedOrgType] = useState<string | null>(null);

  const filteredOrganizations = selectedOrgType
    ? organizations.filter(org => org.type === selectedOrgType)
    : organizations;

  const organizationTypes = [...new Set(organizations.map(org => org.type))];

  return (
    <div className="min-h-screen bg-gradient-subtle">

      {/* Hero */}
      <div className="relative w-full h-64 md:h-72 overflow-hidden">
        <img
          src={headerImage}
          alt="Ayuda y apoyo"
          className="w-full h-full object-cover scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-purple-900/60 via-purple-800/50 to-purple-700/40 flex items-center justify-center">
          <WomenSilhouettes />
          <div className="relative z-20 text-center text-white space-y-3 px-4">
            <p className="text-xs md:text-sm uppercase tracking-[4px] text-purple-200">
              HerStory · Ayuda
            </p>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight">
              Conectando con{" "}
              <span className="italic font-normal text-purple-200">la ayuda</span>
            </h1>
            <p className="text-sm md:text-base text-white/70 max-w-md mx-auto">
              Encuentra organizaciones aliadas y recursos para el empoderamiento femenino.
            </p>
          </div>
        </div>
      </div>

      <NavbarWrapper />

      {/* Organizations Section */}
      <section id="organizaciones" className="py-20">
        <div className="container mx-auto px-4">
          <div className="mb-12">
            <h2 className="text-4xl font-bold text-primary mb-6">
              Organizaciones de Apoyo
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              Conecta con fundaciones y asociaciones comprometidas con los derechos
              de las mujeres. Encuentra el apoyo que necesitas cerca de ti.
            </p>
            <div className="flex items-center gap-2 text-primary">
              <Heart className="h-5 w-5" />
              <span className="font-medium">{organizations.length} organizaciones disponibles</span>
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