{/* Renderiza cada ficha de la mujer individualmente */}
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface WomanCardProps {
  id: number;
  imageUrl: string;
  nombreConocido: string;
  citas: { texto: string }[];
}

const WomanCard = ({ id, imageUrl, nombreConocido, citas }: WomanCardProps) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/mujer/${id}`);
  };

  return (
    <Card className="group cursor-pointer transition-all duration-500 hover:scale-105 hover:shadow-[var(--shadow-elegant)] bg-gradient-to-br from-card via-card to-muted/20 border-primary/20 hover:border-primary/40 h-full flex flex-col">
      <CardContent className="p-0 overflow-hidden flex flex-col h-full">
        {/* Imagen */}
        <div className="relative aspect-[3/4] overflow-hidden">
          <img
            src={imageUrl || "/assets/default.png"}
            alt={nombreConocido}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </div>

        {/* Contenido */}
        <div className="p-6 flex-1 flex flex-col justify-between">
          <div>
            <h3 className="text-xl font-bold text-primary group-hover:text-accent transition-colors duration-300">
              {nombreConocido}
            </h3>
            {/* Cita */}
            <blockquote
              className="text-muted-foreground italic text-sm overflow-hidden text-ellipsis border-l-4 border-primary/30 pl-4 mt-2"
              style={{ display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical' }}
            >
              {citas?.[0]?.texto || "Sin cita disponible"}
            </blockquote>
          </div>

          <Button 
            onClick={handleCardClick}
            className="w-full mt-4 bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-primary-foreground shadow-[var(--shadow-glow)] transition-all duration-300 hover:shadow-[var(--shadow-elegant)]"
          >
            Conocer más
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default WomanCard;
