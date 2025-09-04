import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Play, Headphones, Video, Clock, Users, X, ExternalLink, User } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MediaCardProps {
  id: string;
  title: string;
  description: string;
  type: 'podcast' | 'video' | 'audio';
  duration: string;
  author: string;
  thumbnail: string;
  topics: string[];
  participants?: string[];
  url?: string;
}

const typeConfig = {
  podcast: {
    icon: Headphones,
    label: 'Podcast',
    color: 'bg-gradient-primary'
  },
  video: {
    icon: Video,
    label: 'Video',
    color: 'bg-gradient-hero'
  },
  audio: {
    icon: Play,
    label: 'Audio',
    color: 'bg-accent'
  }
};

export function MediaCard({ 
  title, 
  description, 
  type, 
  duration, 
  author, 
  thumbnail, 
  topics, 
  participants,
  url
}: MediaCardProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [showEmbed, setShowEmbed] = useState(false);
  
  const config = typeConfig[type];
  const Icon = config.icon;

  const canEmbed = url && (type === 'podcast' || type === 'video');

  const handlePlay = () => {
    if (canEmbed) {
      setShowEmbed(!showEmbed);
    } else {
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div 
      className={cn(
        "group cursor-pointer transition-all duration-300 hover:shadow-elegant hover:-translate-y-1",
        "bg-card/50 backdrop-blur-sm border-border/50 rounded-lg border overflow-hidden",
        isHovered && "shadow-glow"
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Embed Player */}
      {showEmbed && canEmbed && (
        <div className="relative bg-black/90 p-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowEmbed(false)}
            className="absolute top-2 right-2 z-10 bg-black/50 hover:bg-black/70 text-white"
          >
            <X className="h-4 w-4" />
          </Button>
          

          <div className="aspect-video">
            <iframe
              src={url}
              width="100%"
              height="100%"
              frameBorder="0"
              allow="encrypted-media; autoplay"
              allowFullScreen
              className="rounded-lg"
            />
          </div>
        </div>
      )}

      <div className="p-6">
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <div className={cn("p-2 rounded-lg text-white", config.color)}>
                <Icon className="h-4 w-4" />
              </div>
              <Badge variant="secondary" className="text-xs">
                {config.label}
              </Badge>
            </div>
            <h3 className="text-lg font-semibold group-hover:text-primary transition-colors line-clamp-2 mb-1">
              {title}
            </h3>
            
            {/* Descripción con scroll */}
            <p className="text-sm text-muted-foreground mb-4 h-16 overflow-y-auto scrollbar-thin scrollbar-thumb-border scrollbar-track-transparent">
              {description}
            </p>
          </div>
          <div className="relative w-20 h-20 rounded-lg overflow-hidden bg-gradient-subtle flex-shrink-0">
            <img 
              src={thumbnail} 
              alt={title}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <Play className="h-6 w-6 text-white" />
            </div>
          </div>
        </div>
        
        <div className="space-y-3">
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              <span>{duration}</span>
            </div>
            <span>por {author}</span>
            
            {/* Modal para participantes */}
            {participants && participants.length > 0 && (
              <Dialog>
                <DialogTrigger asChild>
                  <button className="flex items-center gap-1 text-muted-foreground hover:text-primary transition-colors cursor-pointer">
                    <Users className="h-3 w-3" />
                    <span>{participants.length} participantes</span>
                  </button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>Participantes</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-2">
                    {participants.map((participant, index) => (
                      <div key={index} className="flex items-center gap-2 p-2 rounded-lg bg-muted/50">
                        <User className="h-4 w-4 text-primary" />
                        <span className="text-sm">{participant}</span>
                      </div>
                    ))}
                  </div>
                </DialogContent>
              </Dialog>
            )}
          </div>
          
          <div className="flex flex-wrap gap-1">
            {topics.slice(0, 3).map((topic) => (
              <Badge 
                key={topic} 
                variant="outline" 
                className="text-xs border-border/60 hover:border-primary/60 transition-colors"
              >
                {topic}
              </Badge>
            ))}
            {topics.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{topics.length - 3}
              </Badge>
            )}
          </div>

          <div className="flex gap-2">
            <Button 
              onClick={handlePlay}
              className={cn(
                "flex-1 transition-all duration-300",
                (isPlaying || showEmbed)
                  ? "bg-secondary hover:bg-secondary/90" 
                  : "bg-gradient-primary hover:shadow-glow"
              )}
            >
              <Icon className="h-4 w-4 mr-2" />
              {canEmbed ? (
                showEmbed ? 'Ocultar' : 'Reproducir'
              ) : (
                isPlaying ? 'Pausar' : 'Reproducir'
              )}
            </Button>

            {url && (
              <Button
                variant="outline"
                size="icon"
                onClick={() => window.open(url.replace('/embed/', '/'), '_blank')}
              >
                <ExternalLink className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}