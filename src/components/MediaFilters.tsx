import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, Filter, Headphones, Video, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MediaFiltersProps {
  selectedType: string;
  onTypeChange: (type: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedTopics: string[];
  onTopicToggle: (topic: string) => void;
  availableTopics: string[];
}

const mediaTypes = [
  { id: 'all', label: 'Todo', icon: Filter },
  { id: 'podcast', label: 'Podcasts', icon: Headphones },
  { id: 'video', label: 'Videos', icon: Video },
  // ELIMINADO: { id: 'audio', label: 'Audios', icon: Play },
];

export function MediaFilters({
  selectedType,
  onTypeChange,
  searchQuery,
  onSearchChange,
  selectedTopics,
  onTopicToggle,
  availableTopics
}: MediaFiltersProps) {
  return (
    <div className="space-y-6 bg-card/30 backdrop-blur-sm rounded-xl p-6 border border-border/50">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-foreground">Filtros</h3>
        
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar contenido..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10 bg-background/50"
          />
        </div>

        {/* Media Type Filters */}
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
            Tipo de Contenido
          </h4>
          <div className="grid grid-cols-2 gap-2">
            {mediaTypes.map((type) => {
              const Icon = type.icon;
              return (
                <Button
                  key={type.id}
                  variant={selectedType === type.id ? "default" : "ghost"}
                  size="sm"
                  onClick={() => onTypeChange(type.id)}
                  className={cn(
                    "justify-start gap-2 transition-all duration-200",
                    selectedType === type.id 
                      ? "bg-gradient-primary text-primary-foreground shadow-elegant" 
                      : "hover:bg-muted/50"
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {type.label}
                </Button>
              );
            })}
          </div>
        </div>

        {/* Topic Filters */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
              Temas
            </h4>
            {selectedTopics.length > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => selectedTopics.forEach(topic => onTopicToggle(topic))}
                className="text-xs h-6 px-2"
              >
                Limpiar
              </Button>
            )}
          </div>
          <div className="flex flex-wrap gap-2">
            {availableTopics.map((topic) => {
              const isSelected = selectedTopics.includes(topic);
              return (
                <Badge
                  key={topic}
                  variant={isSelected ? "default" : "outline"}
                  className={cn(
                    "cursor-pointer transition-all duration-200 text-xs",
                    isSelected 
                      ? "bg-gradient-primary border-primary/50 text-primary-foreground hover:shadow-glow" 
                      : "hover:border-primary/60 hover:bg-primary/5"
                  )}
                  onClick={() => onTopicToggle(topic)}
                >
                  {topic}
                  {isSelected && <X className="h-3 w-3 ml-1" />}
                </Badge>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}