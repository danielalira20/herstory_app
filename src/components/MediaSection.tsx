import { useState, useMemo } from 'react';
import { MediaCard } from './MediaCard';
import { MediaFilters } from './MediaFilters';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Grid, List } from 'lucide-react';
import { cn } from '@/lib/utils';

// Mock data for demonstration - SIN AUDIOS
const mediaData = [
  {
    id: '1',
    title: 'El dia de la mujer Negra',
    description: 'En este episodio abordamos la falta de interseccionalidad en el feminismo y las experiencias únicas de las mujeres negras. Con Adriana Boho y Asaari Bibang como invitadas, exploramos sus vivencias y reflexiones en primera persona.',
    type: 'podcast' as const,
    duration: '61 min',
    author: 'No hay negros en el Tibet',
    thumbnail: '/placeholder.svg',
    topics: ['Identidad Racial', 'Activismo Social', 'Visibilidad en medios'],
    participants: ['Adriana Boho', 'Asaari Bibang'],
    url: 'https://open.spotify.com/embed/show/1z6lMMjBfcnJUapUZcDLko?utm_source=generator'
  },
  {
    id: '2',
    title: '267 años para alcanzar la paridad en salarios',
    description: 'ODS 5: Igualdad de Género – 267 años para alcanzar la paridad en salarios Este episodio aborda la alarmante brecha salarial entre hombres y mujeres en América Latina, donde se estima que tomará más de two siglos alcanzar la paridad.',
    type: 'video' as const,
    duration: '16 min',
    author: 'Agenda El Cambio',
    thumbnail: '/placeholder.svg',
    topics: ['Igualdad de género', 'Equidad', 'Agenda 2030'],
    participants: ['Mara Medina'],
    url: 'https://www.youtube.com/embed/K34FclHLjtU?si=DsbDQvN6ZbUrgo4d'
  },
  {
    id: '3',
    title: 'Tu cuerpo: 50 razones para amarlo',
    description: 'En este episodio, exploramos las razones científicas que explican cómo funciona nuestro cuerpo, desde curiosidades biológicas hasta hábitos cotidianos que impactan nuestra salud. Una conversación íntima para reconectar con lo que somos, desde dentro.',
    type: 'podcast' as const,
    duration: ' min',
    author: 'El Podcast de Cristina Mitre',
    thumbnail: '/placeholder.svg',
    topics: ['Ciencia', 'Empoderamiento', 'Bienestar'],
    participants: ['Cristina Mitre', 'Teresa Arnandis'],
    url: 'https://open.spotify.com/embed/episode/7y25NsSswLIk7NkudZ1OU4?utm_source=generator'
  },
  {
  id: '4',
  title: 'Cómo educar en la igualdad de género',
  description: 'La socióloga Marina Subirats reflexiona sobre cómo transformar la educación para promover la igualdad de género desde la infancia. Parte del ciclo Aprendemos Juntos 2030 de BBVA.',
  type: 'video' as const,
  duration: '16 min',
  author: 'Aprendemos Juntos 2030',
  thumbnail: '/placeholder.svg',
  topics: ['Igualdad de género', 'Educación', 'Infancia'],
  participants: ['Marina Subirats'],
  url: 'https://www.youtube.com/embed/gl6c1kLrJnU?si=yedU_l0IXLNBn_Ls" title="YouTube video player'
},
  {
    id: '5',
    title: 'El peor FEMINICIO que escucharas',
    description: 'Su objetivo es exponer no solo la brutalidad del crimen, sino también exponer el sufrimiento humano detrás de la historia y reflexionar sobre las dinámicas estructurales que permiten que tragedias como esta ocurran',
    type: 'podcast' as const,
    duration: '129 min',
    author: 'Relatos Forenses Podcast',
    thumbnail: '/placeholder.svg',
    topics: [ 'Violencia Estructural', 'Feminicidio'],
    url: 'https://open.spotify.com/embed/episode/6oJw0amuKqcv20rUTqzvOn/video?utm_source=generator'
  },
{
  id: '6',
  title: '¿Por qué existe aún desigualdad entre hombres y mujeres?',
  description: 'Un análisis educativo sobre las causas que mantienen la brecha de género en la sociedad actual, dentro del ciclo Aprendemos Juntos 2030 de BBVA.',
  type: 'video' as const,
  duration: '15 min',
  author: 'Aprendemos Juntos 2030',
  thumbnail: '/placeholder.svg',
  topics: ['Desigualdad de género', 'Sociedad', 'Educación'],
  url: 'https://www.youtube.com/embed/iyCHxB7wdeQ'
},
{
  id: '7',
  title: '¿Mujeres en una carrera STEM? Susana Arrechea te lo cuenta',
  description: 'Susana Arrechea reflexiona sobre los retos de que mujeres estudien carreras STEM en Guatemala, abordando desigualdades y barreras culturales.',
  type: 'video' as const,
  duration: '1 min',            // No se especifica la duración exacta en la descripción
  author: 'Fundadoras Podcast',
  thumbnail: '/placeholder.svg',
  topics: ['STEM', 'Igualdad de género', 'Mujeres en ciencia'],
  participants: ['Susana Arrechea'],
  url: 'https://www.youtube.com/embed/bDKT437PCxE'
},
{
  id: '8',
  title: 'Violencia sexual en México: cada hora dos mujeres son agredidas',
  description: 'En este episodio de *TU DÍA CON EL UNIVERSAL*, se aborda la alarmante realidad de la violencia sexual en México, donde cada hora al menos dos mujeres son agredidas. También se tratan temas como los daños en la CDMX, la situación en Argentina frente al narco, despliegue militar de EE.UU. en el Caribe y hasta noticias de entretenimiento.',
  type: 'podcast' as const,
  duration: '≈15 min',
  author: 'El Universal',
  thumbnail: '/placeholder.svg',
  topics: ['Violencia sexual', 'Noticias'],
  participants: ['Tavo Stone', 'Cinthia García', 'Karen Vázquez', 'Darío Soto'],
  url: 'https://open.spotify.com/embed/episode/0qMh9GBqZD93UUElNnHfSu?utm_source=generator'
},
{
  id: '9',
  title: '¿Eres aliada también en casa?',
  description: 'La igualdad también se practica en casa. Paola Rojas conversa con Marcelina Bautista (directora y fundadora de CACEH Nacional) sobre los derechos laborales, la dignidad y el trato justo para las trabajadoras del hogar.',
  type: 'podcast' as const,
  duration: '29 min',
  author: 'Somos Aliadas',
  thumbnail: '/placeholder.svg',
  topics: ['Igualdad de género', 'Derechos laborales', 'Trabajadoras del hogar'],
  participants: ['Paola Rojas', 'Marcelina Bautista'],
  url: 'https://open.spotify.com/embed/episode/4RY36BFpgbeXzhIwcciIWr/video?utm_source=generator'
},
{
  id: '10',
  title: '¿Las empresas apoyan a las mujeres emprendedoras?',
  description: 'En este episodio, se explora el papel de las empresas en el apoyo a las mujeres emprendedoras, analizando iniciativas, desafíos y oportunidades en el ecosistema empresarial.',
  type: 'video' as const,
  duration: '1 min', 
  author: 'Fundadoras Podcast',
  thumbnail: '/placeholder.svg',
  topics: ['Emprendimiento femenino', 'Apoyo empresarial', 'Igualdad de género'],
  url: 'https://www.youtube.com/embed/LNIH9e6GsmM?si=i-_8Vwlj9X-Iwe26'
},
{
  id: '11',
  title: 'Mamá y mujer empoderada',
  description: 'Las mujeres dejamos atrás una personalidad cuando nos convertimos en mamás, pero este episodio explora cómo mantener nuestra esencia y balancear la maternidad sin perdernos. Ana Lore conversa con Jimena Férez sobre el reencontrar el poder femenino después de ser mamá.',
  type: 'podcast' as const,
  duration: '31 min',
  author: 'Mamás en Pausa',
  thumbnail: '/placeholder.svg',
  topics: ['Maternidad', 'Poder femenino', 'Desarrollo personal'],
  participants: ['Jimena Férez', 'Ana Lore'],
  url: 'https://open.spotify.com/embed/episode/55Zjbjp5iBGqZUVpCGPPa0/video?utm_source=generator'
},
{
  id: '12',
  title: '¿Ves lo que yo? (Cortometraje sobre igualdad de género)',
  description: 'Este cortometraje aborda la dificultad que tienen algunos hombres para reconocer y visibilizar los actos de acoso hacia las mujeres. A través de la historia de dos personajes con perspectivas opuestas sobre su día a día, el cortometraje muestra cómo, al final, la empatía y la reflexión permiten “quitarse la venda” y entender la realidad del acoso cotidiano.',
  type: 'video' as const,
  duration: '5 min', 
  author: 'Mr. De La Riva',
  thumbnail: '/placeholder.svg',
  participants: ['Alberto De La Riva', 'Melannie Chavez', 'Alex Ochoa'],
  topics: ['Violencia de género', 'Conciencia social', 'Igualdad de género'],
  url: 'https://www.youtube.com/embed/Id0KeN49jHY?si=gUSKFPf5lJsPQ7yE'
},
{
  id: '13',
  title: 'Necesitamos referentes femeninos para dar más oportunidades a las niñas',
  description: 'En este vídeo, la socióloga Marina Subirats conversa con una joven de 17 años sobre la representación de la mujer en la sociedad, empoderamiento, movimientos sociales por la igualdad, relaciones tóxicas en la adolescencia y la sororidad. Subirats, catedrática emérita de Sociología de la Universidad Autónoma de Barcelona, analiza cómo la ausencia de referentes femeninos en libros escolares impacta la educación y el futuro de las niñas.',
  type: 'video' as const,
  duration: '21 min',
  author: 'Aprendemos Juntos 2030',
  thumbnail: '/placeholder.svg',
  topics: ['Igualdad de género', 'Educación', 'Referentes femeninos', 'Empoderamiento'],
  participants: ['Marina Subirats', 'Joven de 17 años'],
  url: 'https://www.youtube.com/embed/BLOesA3i3sU?si=IUeqoLWXsFsxKFGs'
},
{
  id: '14',
  title: 'Acoso Callejero',
  description: 'La Iniciativa Spotlight en Honduras y el Sub Clúster de Violencia Basada en Género presentan este episodio del podcast #LaOtraPandemia, enfocado en los diferentes tipos de acoso: sexual, laboral y callejero. Participan Sofia Pineda, actriz e influencer de 17 años, quien comparte su experiencia como adolescente ante el acoso callejero, y Nora Urbina, abogada experta en Derechos Humanos y Fiscal de la Niñez, quien analiza el marco legal y lo que establece el código penal.',
  type: 'podcast' as const,
  duration: '30 min',
  author: 'Igualdad de Genero',
  thumbnail: '/placeholder.svg',
  topics: ['Acoso callejero', 'Derechos humanos', 'Protección de la niñez'],
  participants: ['Sofia Pineda', 'Nora Urbina'],
  url: 'https://open.spotify.com/embed/episode/1jA7i8PEfnmpTggiih4Zz0?utm_source=generator'
},
{
  id: '15',
  title: 'Mujeres invisibles',
  description: 'En el episodio 64 de PATRIAHORCADO, conversamos con Carme Valls, política, médica y autora de "Mujeres invisibles en la medicina", sobre la invisibilización histórica de las mujeres en la medicina. Además, analizamos el bochorno del 8M, exploramos la vida de Clara Zetkin, periodista y revolucionaria que promovió el Día Internacional de la Mujer, y compartimos recomendaciones culturales y lecturas para el fin de semana.',
  type: 'podcast' as const,
  duration: '58 min',
  author: 'PatriaHorcado',
  thumbnail: '/placeholder.svg',
  topics: ['Mujeres en medicina', 'Historia de mujeres', 'Igualdad de género'],
  participants: ['Carme Valls', 'Clara Zetkin (histórica)'],
  url: 'https://open.spotify.com/embed/episode/4jGIoQMyHq6naDlpzXOSUG?utm_source=generator'
},

  
];

const allTopics = Array.from(new Set(mediaData.flatMap(item => item.topics)));

export function MediaSection() {
  const [selectedType, setSelectedType] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const filteredMedia = useMemo(() => {
    return mediaData.filter(item => {
      const matchesType = selectedType === 'all' || item.type === selectedType;
      const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           item.author.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesTopics = selectedTopics.length === 0 || 
                           selectedTopics.some(topic => item.topics.includes(topic));
      
      return matchesType && matchesSearch && matchesTopics;
    });
  }, [selectedType, searchQuery, selectedTopics]);

  const handleTopicToggle = (topic: string) => {
    setSelectedTopics(prev => 
      prev.includes(topic) 
        ? prev.filter(t => t !== topic)
        : [...prev, topic]
    );
  };

  const stats = {
    total: mediaData.length,
    podcasts: mediaData.filter(item => item.type === 'podcast').length,
    videos: mediaData.filter(item => item.type === 'video').length
    // REMOVED: audios count
  };

  return (
    <div className="space-y-8">
      {/* Stats Section - SOLO PODCAST Y VIDEO */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <div className="bg-gradient-primary p-4 rounded-xl text-primary-foreground text-center">
          <div className="text-2xl font-bold">{stats.total}</div>
          <div className="text-sm opacity-90">Total Contenidos</div>
        </div>
        <div className="bg-card/50 backdrop-blur-sm p-4 rounded-xl border border-border/50 text-center">
          <div className="text-2xl font-bold text-primary">{stats.podcasts}</div>
          <div className="text-sm text-muted-foreground">Podcasts</div>
        </div>
        <div className="bg-card/50 backdrop-blur-sm p-4 rounded-xl border border-border/50 text-center">
          <div className="text-2xl font-bold text-secondary">{stats.videos}</div>
          <div className="text-sm text-muted-foreground">Videos</div>
        </div>
        {/* REMOVED: Audio stats card */}
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filters Sidebar */}
        <aside className="lg:w-80 flex-shrink-0">
          <MediaFilters
            selectedType={selectedType}
            onTypeChange={setSelectedType}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            selectedTopics={selectedTopics}
            onTopicToggle={handleTopicToggle}
            availableTopics={allTopics}
          />
        </aside>

        {/* Main Content */}
        <main className="flex-1 space-y-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold">
                {filteredMedia.length} contenido{filteredMedia.length !== 1 ? 's' : ''} encontrado{filteredMedia.length !== 1 ? 's' : ''}
              </h2>
              {selectedTopics.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-2">
                  <span className="text-sm text-muted-foreground">Filtrado por:</span>
                  {selectedTopics.map(topic => (
                    <Badge key={topic} variant="secondary" className="text-xs">
                      {topic}
                    </Badge>
                  ))}
                </div>
              )}
            </div>
            
            <div className="flex items-center gap-2">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('grid')}
                className={cn(
                  viewMode === 'grid' && "bg-gradient-primary"
                )}
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('list')}
                className={cn(
                  viewMode === 'list' && "bg-gradient-primary"
                )}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Media Grid */}
          <div className={cn(
            "grid gap-6 transition-all duration-300",
            viewMode === 'grid' 
              ? "grid-cols-1 md:grid-cols-2 xl:grid-cols-3" 
              : "grid-cols-1"
          )}>
            {filteredMedia.map((item) => (
              <MediaCard
                key={item.id}
                {...item}
              />
            ))}
          </div>

          {/* Empty State */}
          {filteredMedia.length === 0 && (
            <div className="text-center py-12">
              <div className="text-muted-foreground mb-4">
                <div className="text-lg">No se encontraron contenidos</div>
                <div className="text-sm">Intenta ajustar tus filtros de búsqueda</div>
              </div>
              <Button 
                variant="outline" 
                onClick={() => {
                  setSelectedType('all');
                  setSearchQuery('');
                  setSelectedTopics([]);
                }}
              >
                Limpiar filtros
              </Button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}