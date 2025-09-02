import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

const estadosMexico = [
  "Todos los estados",
  "Aguascalientes",
  "Baja california",
  "Baja california sur",
  "Campeche",
  "Chiapas",
  "Chihuahua",
  "Ciudad de mexico",
  "Coahuila",
  "Colima",
  "Durango",
  "Estado de mexico",
  "Guanajuato",
  "Guerrero",
  "Hidalgo",
  "Jalisco",
  "Michoacan",
  "Morelos",
  "Nayarit",
  "Nuevo leon",
  "Oaxaca",
  "Puebla",
  "Queretaro",
  "Quintana roo",
  "San luis potosi",
  "Sinaloa",
  "Sonora",
  "Tabasco",
  "Tamaulipas",
  "Tlaxcala",
  "Veracruz",
  "Yucatan",
  "Zacatecas"
];

interface FilterBarProps {
  selectedEstado: string;
  onEstadoChange: (estado: string) => void;
  searchTerm: string;
  onSearchChange: (term: string) => void;
}

const FilterBar = ({ selectedEstado, onEstadoChange, searchTerm, onSearchChange }: FilterBarProps) => {
  return (
    <div className="bg-card shadow-card rounded-lg p-6 mb-8">
      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-card-foreground">
            Filtrar por Estado
          </label>
          <Select value={selectedEstado} onValueChange={onEstadoChange}>
            <SelectTrigger>
              <SelectValue placeholder="Selecciona un estado" />
            </SelectTrigger>
            <SelectContent>
              {estadosMexico.map((estado) => (
                <SelectItem key={estado} value={estado}>
                  {estado}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium text-card-foreground">
            Buscar por nombre
          </label>
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar persona..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterBar;