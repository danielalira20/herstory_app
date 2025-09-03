// src/components/mujeres-desaparecidas/CarruselMujeres.tsx
import { useState } from "react";
import PersonCard from "./PersonCard";
import { Person } from "@/data/mockData";

interface CarruselMujeresProps {
  persons: Person[];
  onViewDetails: (person: Person) => void;
}

const CarruselMujeres = ({ persons, onViewDetails }: CarruselMujeresProps) => {
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 10;

  const totalPages = Math.ceil(persons.length / itemsPerPage);
  const currentItems = persons.slice(
    currentPage * itemsPerPage,
    currentPage * itemsPerPage + itemsPerPage
  );

  const handleNext = () => {
    if (currentPage < totalPages - 1) setCurrentPage(currentPage + 1);
  };

  const handlePrev = () => {
    if (currentPage > 0) setCurrentPage(currentPage - 1);
  };

  return (
    <div className="mb-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6 mb-8">
        {currentItems.map((person) => (
          <PersonCard key={person.id} person={person} onViewDetails={onViewDetails} />
        ))}
      </div>

      <div className="flex justify-center mt-4 gap-4">
        <button
          onClick={handlePrev}
          disabled={currentPage === 0}
          className="px-4 py-2 bg-primary text-white rounded disabled:opacity-50"
        >
          ◀ Anterior
        </button>
        <button
          onClick={handleNext}
          disabled={currentPage >= totalPages - 1}
          className="px-4 py-2 bg-primary text-white rounded disabled:opacity-50"
        >
          Siguiente ▶
        </button>
      </div>

      <p className="text-center text-sm text-muted-foreground mt-2">
        Página {currentPage + 1} de {totalPages}
      </p>
    </div>
  );
};

export default CarruselMujeres;
