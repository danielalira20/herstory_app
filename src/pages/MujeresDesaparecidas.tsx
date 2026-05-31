import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import NavbarWrapper from "@/components/NavbarWrapper";
import headerImage from "@/assets/herstory-header.jpg";
import FilterBar from "@/components/mujeres-desaparecidas/FilterBar";
import PersonCard from "@/components/mujeres-desaparecidas/PersonCard";
import PersonModal from "@/components/mujeres-desaparecidas/PersonModal";
import PrivacyNotice from "@/components/mujeres-desaparecidas/PrivacyNotice";
import { usePersons } from "@/hooks/usePersons";
import { mockPersons, Person } from "@/data/mockData";
import { Shield } from "lucide-react";
import CarruselMujeres from "@/components/mujeres-desaparecidas/CarruselMujeres";

const MujeresDesaparecidas = () => {
  const { toast } = useToast();
  const { persons, error } = usePersons();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);

  // Estado para modal
  const [selectedPerson, setSelectedPerson] = useState<Person | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Filtros
  const [selectedEstado, setSelectedEstado] = useState("Todos los estados");
  const [searchTerm, setSearchTerm] = useState("");

  //Busqueda
  const normalizeString = (str: string) =>
  str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

  // Filtrar personas
  const filteredPersons = persons.filter((person) => {
    const matchesEstado =
      selectedEstado === "Todos los estados" || person.estado === selectedEstado;
    const matchesSearch = normalizeString(person.name).includes(
      normalizeString(searchTerm)
    );
    return matchesEstado && matchesSearch;
  });

  useEffect(() => {
  setCurrentPage(0);
}, [filteredPersons]);

  const handleViewDetails = (person: Person) => {
    setSelectedPerson(person);
    setIsModalOpen(true);
  };

   //Carrusel 
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 10;

  //calcular elementos carrusel
  const totalPages = Math.ceil(filteredPersons.length / itemsPerPage);
const currentItems = filteredPersons.slice(
  currentPage * itemsPerPage,
  currentPage * itemsPerPage + itemsPerPage
);

const handleNext = () => {
  if (currentPage < totalPages - 1) {
    setCurrentPage(currentPage + 1);
  }
};

const handlePrev = () => {
  if (currentPage > 0) {
    setCurrentPage(currentPage - 1);
  }
};


  return (
    <>
      <div className="relative w-full h-48 overflow-hidden">
        <img src={headerImage} alt="HerStory Header" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">Mujeres Desaparecidas</h1>
            <p className="text-lg italic">Ayúdanos a encontrarlas</p>
          </div>
        </div>
      </div>
      <NavbarWrapper />
      <div className="min-h-screen bg-background">

      <main className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="flex items-center justify-center mb-4">
            <Shield className="h-8 w-8 text-primary mr-3" />
            <h1 className="text-3xl md:text-4xl font-bold">Mujeres Desaparecidas</h1>
          </div>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Ayúdanos a encontrarlas. Cada persona importa. También puedes reportar
            desapariciones en el formulario más abajo.
          </p>
        </div>

        {/* Barra de filtros */}
        <FilterBar
          selectedEstado={selectedEstado}
          onEstadoChange={setSelectedEstado}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
        />

    
        {filteredPersons.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">
              No se encontraron resultados para los filtros seleccionados.
            </p>
          </div>
        )}
        
       
               {/* Carrusel */}
        {filteredPersons.length > 0 ? (
          <CarruselMujeres persons={filteredPersons} onViewDetails={handleViewDetails} />
        ) : (
          <p className="text-center mt-4 text-muted-foreground">
            No se encontraron resultados para los filtros seleccionados.
          </p>
        )}

         


        {/* Footer y privacidad */}
        <footer className="mt-12 pt-8 border-t border-border">
          <div className="flex justify-center">
            <PrivacyNotice />
          </div>
        </footer>

        {/* =================== Formulario =================== */}
       
        <div className="mt-12 text-center space-y-4">
          <p className="text-muted-foreground">
            ¿Conoces a alguien que ha desaparecido?
          </p>
          <Button
            size="lg"
            onClick={() => window.location.href = "/reportar"}
          >
            Reportar desaparición
          </Button>
        </div>

      </main>

      {/* Modal de persona */}
      <PersonModal
        person={selectedPerson}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
    </> 
  );
};

export default MujeresDesaparecidas;