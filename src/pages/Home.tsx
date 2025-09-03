import { useState, useCallback } from "react";
import { TrendingUp, BarChart3 } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Heart, Shield, Users, Mic, BookOpen, MessageCircle, Gamepad2, Send, Sparkles, Star, Crown } from "lucide-react";
import Navbar from "@/components/Navbar";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from "recharts";
import headerImage from "@/assets/herstory-header.jpg";
import dataVisualizationImage from "@/assets/data-visualization.jpg";
import communitySupportImage from "@/assets/community-support.jpg";

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

// Datos para las gráficas
const genderPayGapData = [
  { region: 'América Latina', brecha: 22, info: 'La brecha salarial promedio equivale a 5 años de salario' },
  { region: 'Europa', brecha: 16, info: 'Las políticas de igualdad están más avanzadas' },
  { region: 'Asia', brecha: 18, info: 'Se observa desigualdad significativa en sectores tecnológicos' },
  { region: 'África', brecha: 28, info: 'La brecha es la más alta de todas las regiones' },
  { region: 'Norteamérica', brecha: 19, info: 'Se están implementando programas de equidad salarial' },
];

const leadershipData = [
  { name: "Mujeres en liderazgo", value: 25, color: "#9333ea", info: "Según el Informe Global de Mujeres en el Trabajo 2023 de McKinsey, solo el 25% de los puestos directivos a nivel mundial están ocupados por mujeres." },
  { name: "Potencial no aprovechado", value: 75, color: "#e5e7eb", info: "Gran parte del liderazgo actual podría beneficiarse de estrategias para identificar y promover talento diverso, optimizando el desempeño organizacional." },
];

const Home = () => {
  const { toast } = useToast();
  const [suggestion, setSuggestion] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

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

{/* ¿Sabías qué? Section */}
<section className="py-20 bg-background">
  <div className="container">
    <div className="text-center mb-16">
      <Badge className="mb-4 bg-gradient-to-r from-purple-100 to-purple-50 text-purple-700 border-purple-200">
        Datos que importan
      </Badge>
      <h2 className="text-3xl md:text-4xl font-bold mb-4">
        ¿Sabías <span className="bg-gradient-hero bg-clip-text text-transparent">qué?</span>
      </h2>
      <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
        Conocer las estadísticas sobre desigualdad nos permite entender los retos que aún enfrentamos y nos inspira a seguir luchando por un mundo más justo e igualitario para todas y todos.
      </p>
    </div>

    {/* Grid principal */}
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
      
      {/* Izquierda: Card 22% + Imagen */}
<div className="space-y-6">
  <Card className="p-6 border-l-4 border-l-purple-500 bg-gradient-to-r from-purple-50 to-white hover:shadow-lg transition-shadow">
    <div className="flex items-center space-x-4">
      <div className="p-3 bg-purple-100 rounded-full">
        <TrendingUp className="h-6 w-6 text-purple-600" />
      </div>
      <div>
        <p className="text-4xl font-bold text-purple-600">22%</p>
        <p className="text-sm text-muted-foreground">
          Brecha salarial de género en América Latina
        </p>
      </div>
    </div>
  </Card>

  {/* Imagen con overlay interactivo */}
  <div className="relative group cursor-pointer">
    <img
      src={dataVisualizationImage}
      alt="Visualización de datos sobre empoderamiento femenino"
      className="w-full rounded-2xl shadow-elegant h-96 object-cover transition-transform duration-500 group-hover:scale-105"
    />
    {/* Overlay oculto hasta hover */}
    <div className="absolute inset-0 bg-purple-900/70 flex items-center justify-center text-white text-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl p-4">
      <p className="text-lg font-medium">
        Las mujeres aún enfrentan barreras en salarios, liderazgo y
        representación. <br />
        La igualdad requiere cambios estructurales.
      </p>
    </div>
  </div>
</div>


      {/* Derecha: Gráfica de liderazgo */}
      <div className="flex flex-col items-center space-y-1 h-[36rem]">
      {/* Gráfica circular más grande */}
      <div className="w-[30rem] h-[30rem]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={leadershipData}
              cx="50%"
              cy="50%"
              innerRadius={90}
              outerRadius={150}
              dataKey="value"
              paddingAngle={3}
              onMouseEnter={(_, index) => setActiveIndex(index)}
              onMouseLeave={() => setActiveIndex(null)}
            >
              {leadershipData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={entry.color}
                  cursor="pointer"
                  opacity={activeIndex === null || activeIndex === index ? 1 : 0.5}
                />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>

  {/* Texto informativo debajo */}
<div className="text-center mt-2 w-full md:w-2/3 lg:w-1/2 mx-auto">
  {activeIndex !== null ? (
    <div className="bg-gradient-to-r from-purple-100 to-purple-50 rounded-lg shadow-md p-4">
      <p className="font-bold text-purple-700 text-base md:text-lg">
        {leadershipData[activeIndex].name}
      </p>
      <p className="text-gray-500 text-sm md:text-base">
        {leadershipData[activeIndex].info}
      </p>
    </div>
  ) : (
    <p className="text-gray-500 italic text-sm md:text-base">
      Pasa el mouse sobre la gráfica
    </p>
  )}
</div>

</div>
    </div>

    {/* Abajo: Gráfica de brecha salarial interactiva */}
<div className="mt-12">
  <Card className="p-6">
    <CardHeader className="pb-4">
      <CardTitle className="flex items-center space-x-2">
        <BarChart3 className="h-5 w-5 text-purple-600" />
        <span>Brecha Salarial por Región (%)</span>
      </CardTitle>
      <CardDescription>
        Analiza la desigualdad salarial en diferentes regiones del mundo.
      </CardDescription>
    </CardHeader>
    <CardContent className="h-80">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={genderPayGapData}
          margin={{ top: 20, right: 20, left: -10, bottom: 20 }}
          onClick={(data, index) => {
            if (data && data.activeLabel) {
              const urlMap: Record<string, string> = {
                "América Latina": "/informacion/america-latina",
                "Europa": "/informacion/europa",
                "Asia": "/informacion/asia",
                "África": "/informacion/africa",
                "Norteamérica": "/informacion/norteamerica",
              };
              const url = urlMap[data.activeLabel];
              if (url) window.open(url, "_blank");
            }
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis dataKey="region" fontSize={12} tick={{ fill: '#6b7280' }} />
          <YAxis fontSize={12} tick={{ fill: '#6b7280' }} />
          <Tooltip
            formatter={(value: number, name: string, props: any) => [
              `${value}%`,
              props.payload.info,
            ]}
          />
          <Bar dataKey="brecha" fill="url(#gradient)" radius={[4, 4, 0, 0]} />
          <defs>
            <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#9333ea" />
              <stop offset="100%" stopColor="#c084fc" />
            </linearGradient>
          </defs>
        </BarChart>
      </ResponsiveContainer>
    </CardContent>
  </Card>
</div>


</div>
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
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

            {/* Ayuda */}
            <Card className="group hover:shadow-elegant transition-all duration-300 border-border/50">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-destructive/10 rounded-lg">
                    <Shield className="h-6 w-6 text-destructive" />
                  </div>
                  <CardTitle>Ayuda</CardTitle>
                </div>
                <CardDescription>
                  Centro de ayuda con información sobre organizaciones y guías didácticas.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Link to="/ayuda">
                  <Button variant="outline" className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    Acceder a recursos
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Mujeres Desaparecidas */}
            <Card className="group hover:shadow-elegant transition-all duration-300 border-border/50">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-destructive/10 rounded-lg">
                    <Shield className="h-6 w-6 text-destructive" />
                  </div>
                  <CardTitle>Mujeres Desaparecidas</CardTitle>
                </div>
                <CardDescription>
                  Base de datos para localizar y brindar apoyo a mujeres desaparecidas.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Link to="/mujeres-desaparecidas">
                  <Button variant="outline" className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    Buscar mujeres
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Rastro Nacional */}
            <Card className="group hover:shadow-elegant transition-all duration-300 border-border/50">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-destructive/10 rounded-lg">
                    <Shield className="h-6 w-6 text-destructive" />
                  </div>
                  <CardTitle>Rastro Nacional</CardTitle>
                </div>
                <CardDescription>
                  Mapa interactivo que muestra la red nacional de búsqueda.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Link to="/nos-faltan-ellas">
                  <Button variant="outline" className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    Ver mapa
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
      <footer className="border-t bg-gradient-subtle py-12">
        <div className="container">
          {/* Suggestion Form Section */}
          <div className="mb-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Formulario (Izquierda) */}
              <div>
                <h3 className="text-3xl font-bold mb-4">Envíanos tus sugerencias</h3>
                <p className="text-muted-foreground mb-8">
                  Tu voz es importante para nosotras. Comparte tus ideas y ayúdanos a mejorar esta plataforma.
                </p>
                <form onSubmit={handleSuggestionSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                      placeholder="Tu nombre"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      className="bg-background"
                    />
                    <Input
                      type="email"
                      placeholder="Tu email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="bg-background"
                    />
                  </div>
                  <Textarea
                    placeholder="Comparte tu sugerencia, opinión o mensaje..."
                    value={suggestion}
                    onChange={(e) => setSuggestion(e.target.value)}
                    required
                    className="min-h-32 bg-background"
                  />
                  <Button type="submit" className="w-full">
                    <Send className="mr-2 h-4 w-4" />
                    Enviar mensaje
                  </Button>
                </form>
              </div>

              {/* Imagen (Derecha) */}
              <div className="relative">
                <img 
                  src={communitySupportImage} 
                  alt="Mujeres apoyándose mutuamente en la comunidad" 
                  className="w-full rounded-2xl shadow-elegant"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-purple-600/20 to-transparent rounded-2xl"></div>
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <h4 className="text-xl font-bold mb-2">Juntas somos más fuertes</h4>
                  <p className="text-sm opacity-90">Cada voz cuenta en nuestra comunidad de empoderamiento</p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-semibold mb-3">Plataforma</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link to="/voces-silenciadas" className="hover:text-primary transition-colors">Voces Silenciadas</Link></li>
                <li><Link to="/ayuda" className="hover:text-primary transition-colors">Ayuda</Link></li>
                <li><Link to="/mujeres-desaparecidas" className="hover:text-primary transition-colors">Mujeres Desaparecidas</Link></li>
                <li><Link to="/rastro-nacional" className="hover:text-primary transition-colors">Rastro Nacional</Link></li>
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
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;



