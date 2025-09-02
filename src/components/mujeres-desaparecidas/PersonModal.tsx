import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { MapPin, Calendar, User, Phone, Mail } from "lucide-react";

interface Person {
  id: string;
  name: string;
  age: number;
  estado: string;
  fechaDesaparicion: string;
  foto: string;
  caracteristicas: string;
  contacto?: string;
  telefono?: string;
  ultimaVez?: string;
  estatura?: string;
  peso?: string;
  ojos?: string;
  cabello?: string;
}

interface PersonModalProps {
  person: Person | null;
  isOpen: boolean;
  onClose: () => void;
}

const PersonModal = ({ person, isOpen, onClose }: PersonModalProps) => {
  if (!person) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl text-primary">
            Información de Desaparición
          </DialogTitle>
        </DialogHeader>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="aspect-square overflow-hidden rounded-lg">
              <img 
                src={person.foto} 
                alt={`Foto de ${person.name}`}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          
          <div className="space-y-4">
            <div>
              <h2 className="text-2xl font-bold text-card-foreground mb-2">
                {person.name}
              </h2>
              <Badge variant="secondary" className="mb-4">
                {person.age} años
              </Badge>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <MapPin className="h-5 w-5 text-primary" />
                <div>
                  <p className="font-medium">Estado</p>
                  <p className="text-muted-foreground">{person.estado}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <Calendar className="h-5 w-5 text-primary" />
                <div>
                  <p className="font-medium">Fecha de Desaparición</p>
                  <p className="text-muted-foreground">{person.fechaDesaparicion}</p>
                </div>
              </div>
              
              {person.ultimaVez && (
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-primary mt-1" />
                  <div>
                    <p className="font-medium">Última vez vista</p>
                    <p className="text-muted-foreground">{person.ultimaVez}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        
        <div className="space-y-4 mt-6">
          <div>
            <h3 className="font-semibold text-lg mb-2">Características Físicas</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              {person.estatura && (
                <div>
                  <span className="font-medium">Estatura:</span> {person.estatura}
                </div>
              )}
              {person.peso && (
                <div>
                  <span className="font-medium">Peso:</span> {person.peso}
                </div>
              )}
              {person.ojos && (
                <div>
                  <span className="font-medium">Color de ojos:</span> {person.ojos}
                </div>
              )}
              {person.cabello && (
                <div>
                  <span className="font-medium">Cabello:</span> {person.cabello}
                </div>
              )}
            </div>
            <p className="text-muted-foreground mt-3">{person.caracteristicas}</p>
          </div>
          
          {(person.contacto || person.telefono) && (
            <div>
              <h3 className="font-semibold text-lg mb-2">Información de Contacto</h3>
              <div className="space-y-2">
                {person.contacto && (
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-primary" />
                    <span className="text-sm">{person.contacto}</span>
                  </div>
                )}
                {person.telefono && (
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-primary" />
                    <span className="text-sm">{person.telefono}</span>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PersonModal;