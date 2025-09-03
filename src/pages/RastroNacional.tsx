import { useState, useMemo, useEffect } from "react";
import MexicoMap from "@/components/mujeres-desaparecidas/MexicoMap";
import PersonCard from "@/components/mujeres-desaparecidas/PersonCard";
import PersonModal from "@/components/mujeres-desaparecidas/PersonModal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, X } from "lucide-react";
import { mockPersons } from "@/data/mockData";
import { supabase } from "@/lib/supabaseClient";
import { usePersons, Person } from "@/hooks/usePersons";
import Navbar from "@/components/Navbar";

const RastroNacional = () => {
  const [selectedState, setSelectedState] = useState<string | null>(null);
  const [selectedPerson, setSelectedPerson] = useState<Person | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
const [people, setPeople] = useState<Person[]>([]);

 const { persons, loading, error } = usePersons();

  const filteredPersons = useMemo(() => {
    let filtered = persons;

    if (selectedState) {
      filtered = filtered.filter(person => person.estado === selectedState);
    }

    if (searchTerm) {
      filtered = filtered.filter(person =>
        person.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        person.estado.toLowerCase().includes(searchTerm.toLowerCase()) ||
        person.caracteristicas.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return filtered;
  }, [persons, selectedState, searchTerm]);

  const handleStateClick = (state: string) => {
    setSelectedState(selectedState === state ? null : state);
  };

  const handleViewDetails = (person: Person) => {
    setSelectedPerson(person);
    setIsModalOpen(true);
  };

  const clearFilters = () => {
    setSelectedState(null);
    setSearchTerm("");
  };

  return (
      <div className="min-h-screen bg-gradient-subtle">
        <Navbar />
        {/* Hero Section */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto text-center">
            <h1 className="text-5xl font-bold mb-6 bg-gradient-hero bg-clip-text text-transparent">
            Personas Desaparecidas en México
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Ayuda a encontrar a las personas desaparecidas. Cada rostro cuenta una historia, 
            cada búsqueda puede hacer la diferencia.
          </p>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8 text-card-foreground">
            Selecciona un Estado
          </h2>
          <MexicoMap onStateClick={handleStateClick} selectedState={selectedState} />
        </div>
      </section>

      {/* Search and Filters */}
      <section className="py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-8">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar por nombre, estado o características..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            {(selectedState || searchTerm) && (
              <Button
                onClick={clearFilters}
                variant="outline"
                className="gap-2"
              >
                <X className="h-4 w-4" />
                Limpiar filtros
              </Button>
            )}
          </div>

          <div className="text-center mb-6">
            <p className="text-muted-foreground">
              {filteredPersons.length === 0
                ? "No se encontraron resultados"
                : `${filteredPersons.length} persona${filteredPersons.length !== 1 ? 's' : ''} encontrada${filteredPersons.length !== 1 ? 's' : ''}`
              }
            </p>
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section className="py-8 px-4 pb-16">
        <div className="max-w-6xl mx-auto">
          {filteredPersons.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
             
              
                  {filteredPersons.map(person => (
                    <PersonCard
                        key={person.id}
                        person={person}
                        onViewDetails={handleViewDetails}
                    />
                    ))}
                
            
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="max-w-md mx-auto">
                <h3 className="text-xl font-semibold mb-2 text-card-foreground">
                  No se encontraron resultados
                </h3>
                <p className="text-muted-foreground mb-6">
                  {selectedState
                    ? `No hay personas desaparecidas registradas en ${selectedState} con los criterios actuales.`
                    : "Intenta con otros términos de búsqueda o selecciona un estado en el mapa."
                  }
                </p>
                <Button onClick={clearFilters} variant="outline">
                  Ver todas las personas
                </Button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Modal */}
      <PersonModal
        person={selectedPerson}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default RastroNacional;
