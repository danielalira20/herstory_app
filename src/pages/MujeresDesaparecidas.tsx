import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";
import FilterBar from "@/components/mujeres-desaparecidas/FilterBar";
import PersonCard from "@/components/mujeres-desaparecidas/PersonCard";
import PersonModal from "@/components/mujeres-desaparecidas/PersonModal";
import PrivacyNotice from "@/components/mujeres-desaparecidas/PrivacyNotice";
import { mockPersons, Person } from "@/data/mockData";
import { Shield, Heart, Upload, AlertCircle } from "lucide-react";

const MujeresDesaparecidas = () => {
  const [selectedPerson, setSelectedPerson] = useState<Person | null>(null);
  const [selectedEstado, setSelectedEstado] = useState("Todos los estados");
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);

  // Estado del formulario
  const [formData, setFormData] = useState({
    nombrePersona: "",
    edad: "",
    genero: "",
    fechaDesaparicion: "",
    lugarDesaparicion: "",
    ciudad: "",
    estado: "",
    descripcionFisica: "",
    ropasUltima: "",
    circunstancias: "",
    contactoNombre: "",
    contactoRelacion: "",
    contactoTelefono: "",
    contactoEmail: "",
    informacionAdicional: "",
    autorizaPublicacion: false,
    imagenUrl: "",
  });

  // Filtro de personas
  const filteredPersons = mockPersons.filter((person) => {
    const matchesEstado =
      selectedEstado === "Todos los estados" ||
      person.estado === selectedEstado;
    const matchesSearch = person.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    return matchesEstado && matchesSearch;
  });

  // Abrir modal de detalles
  const handleViewDetails = (person: Person) => {
    setSelectedPerson(person);
    setIsModalOpen(true);
  };

  // Manejo de inputs del formulario
  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // Subir imagen a Cloudinary
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setLoading(true);
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "herStory_desaparecidas");

    try {
      const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        { method: "POST", body: data }
      );
      const json = await res.json();
      setFormData((prev) => ({ ...prev, imagenUrl: json.secure_url }));
      toast({
        title: "Imagen subida",
        description: "La fotografía se subió correctamente",
      });
    } catch (error) {
      console.error("Error al subir imagen:", error);
      toast({
        title: "Error al subir imagen",
        description: "Intenta nuevamente más tarde",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navbar */}
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

        {/* Barra de filtros */}
        <FilterBar
          selectedEstado={selectedEstado}
          onEstadoChange={setSelectedEstado}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
        />

        {/* Cards */}
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

      {/* Modal de detalles */}
      <PersonModal
        person={selectedPerson}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default MujeresDesaparecidas;






