import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar"; // navbar unificada
import FilterBar from "@/components/mujeres-desaparecidas/FilterBar";
import PersonCard from "@/components/mujeres-desaparecidas/PersonCard";
import PersonModal from "@/components/mujeres-desaparecidas/PersonModal";
import PrivacyNotice from "@/components/mujeres-desaparecidas/PrivacyNotice";
import { mockPersons, Person } from "@/data/mockData";

const MujeresDesaparecidas = () => {
  const [selectedPerson, setSelectedPerson] = useState<Person | null>(null);
  const [selectedEstado, setSelectedEstado] = useState("Todos los estados");
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { toast } = useToast();

  const filteredPersons = mockPersons.filter((person) => {
    const matchesEstado = selectedEstado === "Todos los estados" || person.estado === selectedEstado;
    const matchesSearch = person.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesEstado && matchesSearch;
  });

  const handleViewDetails = (person: Person) => {
    setSelectedPerson(person);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navbar unificada */}
      <Navbar />

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Registro de Mujeres Desaparecidas
          </h1>
          <p className="text-muted-foreground">
            Ayúdanos a encontrarlas. Cada persona importa.
          </p>
        </div>

        <FilterBar 
          selectedEstado={selectedEstado}
          onEstadoChange={setSelectedEstado}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6 mb-8">
          {filteredPersons.map((person) => (
            <PersonCard 
              key={person.id}
              person={person}
              onViewDetails={handleViewDetails}
            />
          ))}
        </div>

        {filteredPersons.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">
              No se encontraron resultados para los filtros seleccionados.
            </p>
          </div>
        )}

        <footer className="mt-12 pt-8 border-t border-border">
          <div className="flex justify-center">
            <PrivacyNotice />
          </div>
        </footer>
      </main>

      <PersonModal 
        person={selectedPerson}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default MujeresDesaparecidas;
