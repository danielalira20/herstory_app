import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Eye, MapPin, Calendar } from "lucide-react";

interface Person {
  id: string;
  name: string;
  age: number;
  estado: string;
  fechaDesaparicion: string;
  foto: string;
  caracteristicas: string;
}

interface PersonCardProps {
  person: Person;
  onViewDetails: (person: Person) => void;
}

const PersonCard = ({ person, onViewDetails }: PersonCardProps) => {
  return (
    <Card className="bg-gradient-card shadow-card hover:shadow-hover transition-all duration-300 overflow-hidden">
      <CardContent className="p-0">
        <div className="aspect-square overflow-hidden">
          <img 
            src={person.foto} 
            alt={`Foto de ${person.name}`}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />
        </div>
        <div className="p-4">
          <h3 className="font-semibold text-lg text-card-foreground mb-2">
            {person.name}
          </h3>
          <div className="space-y-2 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-primary" />
              <span>{person.estado}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-primary" />
              <span>{person.fechaDesaparicion}</span>
            </div>
            <p className="text-xs mt-2 line-clamp-2">
              {person.caracteristicas}
            </p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button 
          onClick={() => onViewDetails(person)}
          variant="outline"
          size="sm"
          className="w-full border-primary text-primary hover:bg-primary hover:text-primary-foreground"
        >
          <Eye className="h-4 w-4 mr-2" />
          Ver más detalles
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PersonCard;