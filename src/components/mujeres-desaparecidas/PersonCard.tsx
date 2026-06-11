import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Eye, MapPin, Calendar, MessageCircle } from "lucide-react";

interface Person {
  id: string;
  name: string;
  age: number;
  estado: string;
  fechaDesaparicion: string;
  foto?: string;
  caracteristicas: string;
  folio?: string;
  municipio_desaparicion?: string | null;
}

interface PersonCardProps {
  person: Person;
  onViewDetails: (person: Person) => void;
  onMensajeAnonimo: (person: Person) => void;
}

const PersonCard = ({ person, onViewDetails, onMensajeAnonimo }: PersonCardProps) => {
  const formattedDate = person.fechaDesaparicion
    ? new Date(person.fechaDesaparicion).toLocaleDateString("es-MX", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "Fecha desconocida";

  return (
    <Card className="bg-gradient-card shadow-card hover:shadow-hover transition-all duration-300 overflow-hidden flex flex-col">
      <CardContent className="p-0 flex-grow">
        <div className="aspect-square overflow-hidden">
          <img
            src={person.foto || "/assests/default.png"}
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
              <span>
                  {person.municipio_desaparicion 
                    ? `${person.municipio_desaparicion}, ${person.estado}` 
                    : person.estado}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-primary" />
              <span>{formattedDate}</span>
            </div>
            <p className="text-xs mt-2 line-clamp-2">
              {person.caracteristicas}
            </p>
          </div>
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0 mt-auto flex gap-2">
        <Button
          onClick={() => onViewDetails(person)}
          variant="outline"
          size="sm"
          className="flex-1 border-primary text-primary hover:bg-primary hover:text-primary-foreground text-xs px-2"
        >
          <Eye className="h-3.5 w-3.5 mr-1 shrink-0" />
          Ver detalles
        </Button>
        <Button
          onClick={() => onMensajeAnonimo(person)}
          variant="outline"
          size="sm"
          className="flex-1 border-pink-400 text-pink-600 hover:bg-pink-50 text-xs px-2"
        >
          <MessageCircle className="h-3.5 w-3.5 mr-1 shrink-0" />
          Mensaje
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PersonCard;