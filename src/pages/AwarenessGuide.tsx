import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AlertTriangle, Phone, Heart, Shield, Users, MessageCircle, MapPin, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Dialog, DialogContent, DialogTitle, DialogDescription, DialogClose } from "@/components/ui/dialog";
import solidarityHero from "@/assets/solidarity-hero.jpg";

type Guide = {
  title: string;
  description: string;
  icon: any;
  urgent: boolean;
  content: string[];
};

const AwarenessGuide = () => {
  const navigate = useNavigate();
  const [selectedGuide, setSelectedGuide] = useState<Guide | null>(null);

  const guides: Guide[] = [
    {
      title: "Violencia Doméstica",
      description: "Reconoce las señales y conoce tus opciones para protegerte y buscar apoyo.",
      icon: Shield,
      urgent: true,
      content: [
        "Identifica los tipos de violencia: física, emocional, sexual y económica.",
        "Crea un plan de seguridad personal con rutas de escape y contactos de emergencia.",
        "Documenta incidentes con fechas, fotos, mensajes y evidencia relevante.",
        "Contacta organizaciones especializadas y autoridades competentes.",
        "Busca apoyo psicológico para ti y tu entorno cercano."
      ]
    },
    {
      title: "Desaparición de Personas",
      description: "Pasos inmediatos a seguir ante un caso de desaparición.",
      icon: MapPin,
      urgent: true,
      content: [
        "Reporta inmediatamente a las autoridades locales y nacionales.",
        "Contacta la Comisión Nacional de Búsqueda y colectivos de apoyo.",
        "Difunde información confiable en redes sociales y medios de comunicación.",
        "Únete a grupos de familias afectadas para apoyo y asesoría legal.",
        "Mantén un registro de toda la información y actualizaciones."
      ]
    },
    {
      title: "Acoso Laboral o Escolar",
      description: "Herramientas y estrategias para enfrentar el acoso en entornos educativos o laborales.",
      icon: Users,
      urgent: false,
      content: [
        "Documenta cada incidente con fechas, lugares y testigos.",
        "Busca testigos y apoyo de colegas, docentes o supervisores.",
        "Conoce tus derechos legales y procedimientos internos de denuncia.",
        "Reporta a autoridades competentes y organizaciones de apoyo.",
        "Busca ayuda psicológica para manejar el impacto emocional."
      ]
    },
    {
      title: "Apoyo Emocional",
      description: "Recursos y técnicas para fortalecer tu bienestar mental.",
      icon: Heart,
      urgent: false,
      content: [
        "Busca terapia psicológica especializada según tus necesidades.",
        "Únete a grupos de apoyo y comunidades seguras.",
        "Practica técnicas de autocuidado y mindfulness.",
        "Construye redes de apoyo confiables y seguras.",
        "Realiza actividades que fomenten tu resiliencia y autoestima."
      ]
    },
    {
      title: "Prevención y Educación",
      description: "Cómo informarte y educar a otros para prevenir la violencia.",
      icon: Shield,
      urgent: false,
      content: [
        "Infórmate sobre los diferentes tipos de violencia y sus señales.",
        "Comparte información confiable en redes sociales y comunidades.",
        "Organiza talleres o charlas sobre prevención y derechos.",
        "Enseña sobre consentimiento, respeto y relaciones saludables.",
        "Participa en campañas de sensibilización y educación."
      ]
    },
    {
      title: "Empoderamiento Comunitario",
      description: "Acciones colectivas para fortalecer a las mujeres en tu entorno.",
      icon: Users,
      urgent: false,
      content: [
        "Crea o participa en redes de apoyo comunitarias.",
        "Promueve espacios seguros y accesibles para mujeres.",
        "Fomenta liderazgo femenino en escuelas, trabajos y asociaciones.",
        "Difunde historias y experiencias de mujeres líderes.",
        "Trabaja con organizaciones locales para proyectos de impacto social."
      ]
    }
  ];

  const actionSteps = [
    "Edúcate sobre los diferentes tipos de violencia",
    "Comparte información confiable en tus redes",
    "Apoya a organizaciones que trabajan en el tema",
    "Cuestiona actitudes machistas en tu entorno",
    "Enseña sobre consentimiento y respeto",
    "Reporta situaciones de violencia que presencies"
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${solidarityHero})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-awareness/80"></div>
        </div>
        <div className="relative container mx-auto px-4 py-24">
          <div className="max-w-3xl text-center mx-auto text-white">
            <h1 className="text-5xl font-bold mb-6">
              Guía de Concientización y Apoyo
            </h1>
            <p className="text-xl mb-8 opacity-90">
              Recursos, información y herramientas para prevenir y enfrentar la violencia contra las mujeres.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="emergency" size="lg" className="gap-2" onClick={() => navigate("/")}>
                <Phone className="h-5 w-5" />
                Regresar a Inicio
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Guides Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Guías de Ayuda por Situación
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            {guides.map((guide, index) => (
              <Card key={index} className={`transition-all hover:shadow-lg ${guide.urgent ? 'border-emergency/30' : 'border-primary/30'}`}>
                <CardHeader>
                  <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-lg ${guide.urgent ? 'bg-emergency/10' : 'bg-primary/10'}`}>
                      <guide.icon className={`h-6 w-6 ${guide.urgent ? 'text-emergency' : 'text-primary'}`} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <CardTitle className="text-xl">{guide.title}</CardTitle>
                        {guide.urgent && (
                          <Badge variant="destructive" className="text-xs">
                            <AlertTriangle className="h-3 w-3 mr-1" />
                            Urgente
                          </Badge>
                        )}
                      </div>
                      <CardDescription>{guide.description}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {guide.content.slice(0, 3).map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                        <span className="text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                  <Button
                    variant={guide.urgent ? "emergency" : "support"}
                    className="w-full mt-4"
                    onClick={() => setSelectedGuide(guide)}
                  >
                    Ver Detalles
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Modal Mejorado */}
      <Dialog open={!!selectedGuide} onOpenChange={(open) => !open && setSelectedGuide(null)}>
        <DialogContent className="sm:max-w-3xl w-full bg-background rounded-2xl shadow-xl p-8 mx-4">
          <DialogClose asChild>
            <Button variant="ghost" className="absolute top-4 right-4">
              <X className="h-5 w-5" />
            </Button>
          </DialogClose>

          {selectedGuide && (
            <div className="flex flex-col items-center text-center">
              <div className={`p-4 rounded-full mb-4 ${selectedGuide.urgent ? 'bg-emergency/20' : 'bg-primary/20'}`}>
                <selectedGuide.icon className={`h-12 w-12 ${selectedGuide.urgent ? 'text-emergency' : 'text-primary'}`} />
              </div>
              <DialogTitle className="text-3xl font-bold">{selectedGuide.title}</DialogTitle>
              {selectedGuide.urgent && (
                <Badge variant="destructive" className="mt-2 mb-4">
                  <AlertTriangle className="h-3 w-3 mr-1" />
                  Urgente
                </Badge>
              )}
              <DialogDescription className="mb-6 text-lg">{selectedGuide.description}</DialogDescription>
              <div className="space-y-3 text-left">
                {selectedGuide.content.map((item, idx) => (
                  <p key={idx} className="text-base flex items-start gap-2">
                    <span className="w-5 font-bold">{idx + 1}.</span>
                    {item}
                  </p>
                ))}
              </div>
              <Button variant="secondary" className="mt-8" onClick={() => setSelectedGuide(null)}>
                Cerrar
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Cómo Ayudar */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">
              ¿Cómo Puedes Ayudar a Cambiar la Situación?
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold mb-6 text-awareness">
                  Acciones que Puedes Tomar:
                </h3>
                <div className="space-y-4">
                  {actionSteps.map((action, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="bg-awareness text-awareness-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">
                        {index + 1}
                      </div>
                      <p className="text-sm">{action}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-gradient-to-br from-primary/10 to-awareness/10 p-8 rounded-lg">
                <h3 className="text-xl font-semibold mb-4">Recuerda que...</h3>
                <div className="space-y-4 text-sm">
                  <p>🟣 <strong>No estás sola:</strong> Hay organizaciones y personas dispuestas a ayudar.</p>
                  <p>🟣 <strong>La violencia no es normal:</strong> Todas merecemos vivir libres de violencia.</p>
                  <p>🟣 <strong>Buscar ayuda es valiente:</strong> Pedir apoyo es un acto de fortaleza.</p>
                  <p>🟣 <strong>El cambio es posible:</strong> Cada acción cuenta para crear un mundo más seguro.</p>
                </div>
                <Separator className="my-6" />
                <div className="text-center">
                  <Button variant="awareness" className="gap-2">
                    <Heart className="h-4 w-4" />
                    Únete al Movimiento
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-primary to-awareness text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Juntas Somos Más Fuertes</h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            La prevención y erradicación de la violencia contra las mujeres es responsabilidad de toda la sociedad.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="secondary" size="lg" className="gap-2">
              <Users className="h-5 w-5" />
              Formar Parte del Cambio
            </Button>
            <Button variant="outline" size="lg" className="gap-2 bg-white/10 border-white/30 text-white hover:bg-white/20">
              Compartir Recursos
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AwarenessGuide;


