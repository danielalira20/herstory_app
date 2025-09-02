import { useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Heart, Shield, Users, Mic, BookOpen, MessageCircle, Gamepad2, Send, Sparkles, Star, Crown } from "lucide-react";
import Navbar from "@/components/Navbar";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import headerImage from "@/assets/herstory-header.jpg";

interface FloatingQuote {
  id: number;
  text: string;
  x: number;
  y: number;
  icon: React.ReactNode;
}

const motivationalQuotes = [
  "¡Eres increíble! ✨",
  "Tu fuerza inspira 💪",
  "Cambia el mundo 🌍",
  "Eres imparable 🚀",
  "Tu voz importa 📢",
  "Brillas con luz propia ⭐",
  "Eres únic@ y valios@ 💎",
  "Tu poder es infinito 🔥",
  "Tu pasión transforma 💜",
  "Eres historia viviente 📚",
  "Sigue adelante, eres fuerte 💪",
  "Cada día creces más 🌟",
  "Eres luz en el mundo ✨",
  "Tu creatividad no tiene límites 🎨",
  "Confía en tu intuición 💖",
  "Sigue adelante, estás creciendo 🌱",
  "Tu creatividad cambia vidas 🎨",
  "Eres fuerza, eres corazón ❤️",
  "Hoy es perfecto para brillar ✨",
  "Tú decides tu camino 🛤️",
  "Eres arte en movimiento 🎶",
  "Cada reto te hace más fuerte 💪",
  "Tu sonrisa ilumina el mundo 😊",
  "Eres valiente y resiliente 🦁",
];

const icons = [
  <Sparkles className="w-4 h-4" />,
  <Heart className="w-4 h-4" />,
  <Star className="w-4 h-4" />,
  <Crown className="w-4 h-4" />,
];

const Home = () => {
  const { toast } = useToast();
  const [suggestion, setSuggestion] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  // Estados para frases motivacionales
  const [floatingQuotes, setFloatingQuotes] = useState<FloatingQuote[]>([]);
  const [quoteId, setQuoteId] = useState(0);

const getRandomSidePosition = () => {
  const side = Math.random() < 0.5 ? -1 : 1; // izquierda o derecha
  const minDistance = 100;  // mínima distancia desde el botón
  const maxDistance = 400;  // máxima distancia desde el botón
  const x = side * (Math.random() * (maxDistance - minDistance) + minDistance);
  const y = (Math.random() - 0.5) * 600; // altura aleatoria, puede estar arriba o abajo
  return { x, y };
};

  const createFloatingQuote = useCallback(() => {
    const randomQuote = motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)];
    const randomIcon = icons[Math.floor(Math.random() * icons.length)];
    const position = getRandomSidePosition();

    const newQuote: FloatingQuote = {
      id: quoteId,
      text: randomQuote,
      x: position.x,
      y: position.y,
      icon: randomIcon,
    };

    setFloatingQuotes((prev) => [...prev, newQuote]);
    setQuoteId((prev) => prev + 1);

    setTimeout(() => {
      setFloatingQuotes((prev) => prev.filter((q) => q.id !== newQuote.id));
    }, 5000);
  }, [quoteId]);

  const handleSuggestionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "¡Mensaje enviado!",
      description: "Gracias por tu sugerencia. Te contactaremos pronto.",
    });
    setSuggestion("");
    setName("");
    setEmail("");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="relative w-full h-64 overflow-hidden">
        <img src={headerImage} alt="HerStory Header" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-4xl md:text-6xl font-bold mb-2">HerStory</h1>
            <p className="text-lg md:text-xl italic">"Voces que la historia olvidó"</p>
          </div>
        </div>
      </div>

      <Navbar />

{/* Hero Section */}
<section className="relative py-32 lg:py-40 bg-gradient-subtle overflow-hidden">
  <div className="container relative z-10 text-center max-w-4xl mx-auto">
    
    {/* Badge */}
    <Badge className="mb-6 bg-primary/10 text-primary border-primary/20">
      Plataforma para el empoderamiento femenino
    </Badge>

    {/* Texto principal */}
    <h5 className="text-lg md:text-xl lg:text-2xl font-bold mb-4">
      <span className="bg-gradient-hero bg-clip-text text-transparent">
        Un espacio seguro donde las voces femeninas se escuchan, se apoyan y se empoderan.
        Juntas construimos un futuro más justo e igualitario.
      </span>
    </h5>

    {/* Subtítulo */}
    <p className="text-sm md:text-base text-muted-foreground max-w-2xl mx-auto mt-2 mb-8">
      Descubre historias, recursos y herramientas para empoderar tu voz y conectar con otras mujeres.
    </p>

    {/* Botón Corazón con frases flotantes */}
    <div className="relative flex justify-center mt-12">
      <Button
        onClick={createFloatingQuote}
        className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-600 to-purple-300 text-white flex items-center justify-center text-2xl shadow-lg hover:scale-105 transition-transform z-20"
      >
        <Heart className="w-8 h-8" />
      </Button>

      {/* Frases flotantes */}
      <div className="absolute inset-0 pointer-events-none">
        {floatingQuotes.map((quote) => (
          <div
            key={quote.id}
            className="absolute flex items-center bg-white/95 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg border border-purple-300 transition-opacity"
            style={{
              left: `calc(50% + ${quote.x}px)`,
              top: `calc(50% + ${quote.y}px)`,
              transform: "translate(-50%, -50%)",
            }}
          >
            <span className="text-purple-600 mr-2">{quote.icon}</span>
            <span className="text-purple-600 font-medium text-sm">{quote.text}</span>
          </div>
        ))}
      </div>
    </div>

    {/* Botón de enlace */}
    <Link to="/voces-silenciadas">
      <Button variant="outline" size="lg" className="mt-10 z-20">
        Conoce las historias
      </Button>
    </Link>
  </div>

  {/* 🌟 Burbujas flotantes en toda la sección */}
  {Array.from({ length: 25 }).map((_, i) => {
    const size = Math.floor(Math.random() * 20) + 10; // tamaño entre 10px y 30px
    const left = Math.random() * 100; // porcentaje horizontal
    const top = Math.random() * 100; // porcentaje vertical
    const delay = Math.random() * 5; // retraso en segundos
    const duration = Math.random() * 10 + 5; // duración entre 5s y 15s
    const colorClasses = ["bg-purple-200/40", "bg-purple-300/30", "bg-purple-400/20", "bg-purple-500/10"];
    const color = colorClasses[Math.floor(Math.random() * colorClasses.length)];
    
    return (
      <div
        key={i}
        className={`absolute rounded-full ${color}`}
        style={{
          width: `${size}px`,
          height: `${size}px`,
          left: `${left}%`,
          top: `${top}%`,
          animation: `floatBubble ${duration}s ease-in-out ${delay}s infinite alternate`,
        }}
      />
    );
  })}
</section>

      {/* Features Section */}
      <section className="py-20 bg-background">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Nuestros <span className="bg-gradient-hero bg-clip-text text-transparent">Espacios</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Descubre las diferentes secciones diseñadas para informar, educar y empoderar.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Voces Silenciadas */}
            <Card className="group hover:shadow-elegant transition-all duration-300 border-border/50">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Mic className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Voces Silenciadas</CardTitle>
                </div>
                <CardDescription>
                  Historias y testimonios que necesitan ser escuchados para crear conciencia y cambio.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Link to="/voces-silenciadas">
                  <Button variant="outline" className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    Explorar historias
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Nos Faltan Ellas */}
            <Card className="group hover:shadow-elegant transition-all duration-300 border-border/50">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-destructive/10 rounded-lg">
                    <Shield className="h-6 w-6 text-destructive" />
                  </div>
                  <CardTitle>Nos Faltan Ellas</CardTitle>
                </div>
                <CardDescription>
                  Centro de recursos, ayuda y base de datos para mujeres desaparecidas.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Link to="/nos-faltan-ellas">
                  <Button variant="outline" className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    Acceder a recursos
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* HerStory */}
            <Card className="group hover:shadow-elegant transition-all duration-300 border-border/50">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-secondary/10 rounded-lg">
                    <BookOpen className="h-6 w-6 text-secondary" />
                  </div>
                  <CardTitle>HerStory</CardTitle>
                </div>
                <CardDescription>
                  Podcasts y contenido multimedia sobre historias de mujeres inspiradoras.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Link to="/herstory">
                  <Button variant="outline" className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    Escuchar podcasts
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Ella Dice */}
            <Card className="group hover:shadow-elegant transition-all duration-300 border-border/50">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-accent/10 rounded-lg">
                    <MessageCircle className="h-6 w-6 text-accent" />
                  </div>
                  <CardTitle>Ella Dice</CardTitle>
                </div>
                <CardDescription>
                  Foro de la comunidad donde puedes compartir experiencias y conectar con otras mujeres.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Link to="/ella-dice">
                  <Button variant="outline" className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    Unirse al foro
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Aprende */}
            <Card className="group hover:shadow-elegant transition-all duration-300 border-border/50">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Gamepad2 className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Aprende</CardTitle>
                </div>
                <CardDescription>
                  Juegos educativos interactivos sobre igualdad de género y empoderamiento.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Link to="/aprende">
                  <Button variant="outline" className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    Comenzar a jugar
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Nosotras */}
            <Card className="group hover:shadow-elegant transition-all duration-300 border-border/50">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-secondary/10 rounded-lg">
                    <Users className="h-6 w-6 text-secondary" />
                  </div>
                  <CardTitle>Nosotras</CardTitle>
                </div>
                <CardDescription>
                  Conoce nuestro equipo y la misión que nos impulsa cada día.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Link to="/nosotras">
                  <Button variant="outline" className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    Conocer el equipo
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-subtle">
        <div className="container text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            ¿Lista para hacer oír tu voz?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Únete a nuestra comunidad de mujeres empoderadas y sé parte del cambio que el mundo necesita.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/login">
              <Button variant="hero" size="lg">
                Crear cuenta gratuita
              </Button>
            </Link>
            <Link to="/contacto">
              <Button variant="outline" size="lg">
                Contactar
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-background py-12">
        <div className="container">
          {/* Suggestion Form */}
          <div className="mb-12 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-center mb-6">Envíanos tus sugerencias</h3>
            <form onSubmit={handleSuggestionSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  placeholder="Tu nombre"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
                <Input
                  type="email"
                  placeholder="Tu email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <Textarea
                placeholder="Comparte tu sugerencia, opinión o mensaje..."
                value={suggestion}
                onChange={(e) => setSuggestion(e.target.value)}
                required
                className="min-h-32"
              />
              <Button type="submit" className="w-full">
                <Send className="mr-2 h-4 w-4" />
                Enviar mensaje
              </Button>
            </form>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-semibold mb-3">Plataforma</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link to="/voces-silenciadas" className="hover:text-primary transition-colors">Voces Silenciadas</Link></li>
                <li><Link to="/nos-faltan-ellas" className="hover:text-primary transition-colors">Nos Faltan Ellas</Link></li>
                <li><Link to="/herstory" className="hover:text-primary transition-colors">HerStory</Link></li>
                <li><Link to="/ella-dice" className="hover:text-primary transition-colors">Ella Dice</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-3">Recursos</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link to="/aprende" className="hover:text-primary transition-colors">Aprende</Link></li>
                <li><Link to="/ayuda" className="hover:text-primary transition-colors">Ayuda</Link></li>
                <li><Link to="/rastro-nacional" className="hover:text-primary transition-colors">Rastro Nacional</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-3">Información</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link to="/nosotras" className="hover:text-primary transition-colors">Nosotras</Link></li>
                <li><Link to="/contacto" className="hover:text-primary transition-colors">Contacto</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-3">Redes</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">Instagram</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Facebook</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Twitter</a></li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;



