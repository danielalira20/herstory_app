import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import NavbarWrapper from "@/components/NavbarWrapper";
import headerImage from "@/assets/herstory-header.jpg";
import PersonModal from "@/components/mujeres-desaparecidas/PersonModal";
import PrivacyNotice from "@/components/mujeres-desaparecidas/PrivacyNotice";
import { usePersons } from "@/hooks/usePersons";
import { Person } from "@/data/mockData";
import { Shield, Search, SlidersHorizontal, X, ArrowRight, Sparkles } from "lucide-react";
import CarruselMujeres from "@/components/mujeres-desaparecidas/CarruselMujeres";
import MensajeAnonimoModal from "@/components/mujeres-desaparecidas/MensajeAnonimoModal"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const estadosMexico = [
  "Todos los estados",
  "Aguascalientes", "Baja california", "Baja california sur",
  "Campeche", "Chiapas", "Chihuahua", "Ciudad de mexico",
  "Coahuila", "Colima", "Durango", "Estado de mexico",
  "Guanajuato", "Guerrero", "Hidalgo", "Jalisco",
  "Michoacan", "Morelos", "Nayarit", "Nuevo leon",
  "Oaxaca", "Puebla", "Queretaro", "Quintana roo",
  "San luis potosi", "Sinaloa", "Sonora", "Tabasco",
  "Tamaulipas", "Tlaxcala", "Veracruz", "Yucatan", "Zacatecas"
]

const MujeresDesaparecidas = () => {
  const { persons, error } = usePersons()
  const [selectedEstado, setSelectedEstado] = useState("Todos los estados")
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedPerson, setSelectedPerson] = useState<Person | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [personaMensaje, setPersonaMensaje] = useState<Person | null>(null)
  const [isMensajeOpen, setIsMensajeOpen] = useState(false)
  const [currentPage, setCurrentPage] = useState(0)

  const normalizeString = (str: string) =>
    str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase()

  const filteredPersons = persons.filter((person) => {
    const matchesEstado =
      selectedEstado === "Todos los estados" || person.estado === selectedEstado
    const matchesSearch = normalizeString(person.name).includes(
      normalizeString(searchTerm)
    )
    return matchesEstado && matchesSearch
  })

  useEffect(() => { setCurrentPage(0) }, [filteredPersons.length])

  const handleViewDetails = (person: Person) => {
    setSelectedPerson(person)
    setIsModalOpen(true)
  }

  const handleMensajeAnonimo = (person: Person) => {
    setPersonaMensaje(person)
    setIsMensajeOpen(true)
  }

  const clearFilters = () => {
    setSearchTerm("")
    setSelectedEstado("Todos los estados")
  }

  const hasFilters = searchTerm || selectedEstado !== "Todos los estados"

  return (
    <>
      {/* ── Hero Header ── */}
      <div className="relative w-full h-64 md:h-72 overflow-hidden">
        <img
          src={headerImage}
          alt="HerStory Header"
          className="w-full h-full object-cover scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-pink-900/60 via-pink-800/50 to-pink-700/40 flex items-center justify-center">
          <div className="text-center text-white space-y-3">
            <p className="text-xs md:text-sm uppercase tracking-[4px] text-pink-200">
              HerStory · Mujeres desaparecidas
            </p>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight">
              No descansaremos hasta{" "}
              <span className="italic font-normal text-pink-200">encontrarlas</span>
            </h1>
            <p className="text-sm md:text-base text-white/70 max-w-md mx-auto">
              Ayudnaos a encontrarlas.
            </p>
          </div>
        </div>
      </div>

       <NavbarWrapper />
      <div className="min-h-screen bg-background">
        <main className="container mx-auto px-4 py-8 max-w-7xl">

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

          {/* ── Barra de búsqueda estilo Lovable ── */}
          <div className="relative -mt-8 mb-10 glass rounded-3xl p-4 md:p-5 shadow-glow border border-border/60 bg-background/80 backdrop-blur-xl">
            <div className="flex items-center gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground pointer-events-none" />
                <Input
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  placeholder="Buscar por nombre..."
                  className="h-14 rounded-2xl border-transparent bg-background/60 pl-12 pr-4 text-base shadow-none focus-visible:border-primary focus-visible:ring-primary/30"
                />
              </div>
              <Select value={selectedEstado} onValueChange={setSelectedEstado}>
                <SelectTrigger className="h-14 w-48 rounded-2xl hidden md:flex">
                  <SelectValue placeholder="Estado" />
                </SelectTrigger>
                <SelectContent>
                  {estadosMexico.map(estado => (
                    <SelectItem key={estado} value={estado}>
                      {estado}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {hasFilters && (
                <Button
                  onClick={clearFilters}
                  variant="outline"
                  className="h-14 rounded-2xl gap-2 hidden md:flex"
                >
                  <X className="h-4 w-4" />
                  Limpiar
                </Button>
              )}
            </div>

            {/* Filtro estado mobile */}
            <div className="mt-3 md:hidden">
              <Select value={selectedEstado} onValueChange={setSelectedEstado}>
                <SelectTrigger className="w-full rounded-xl">
                  <SelectValue placeholder="Filtrar por estado" />
                </SelectTrigger>
                <SelectContent>
                  {estadosMexico.map(estado => (
                    <SelectItem key={estado} value={estado}>
                      {estado}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* ── Header resultados ── */}
          <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
            <div>
              <p className="text-xs font-medium uppercase tracking-widest text-primary mb-1">
                Resultados
              </p>
              <h2 className="text-2xl md:text-3xl font-bold">
                {filteredPersons.length === 0
                  ? "Sin coincidencias"
                  : selectedEstado !== "Todos los estados"
                  ? `${filteredPersons.length} personas registradas en ${selectedEstado}`
                  : `${filteredPersons.length} personas esperan ser encontradas`}
              </h2>
            </div>
            <div className="flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-xs text-muted-foreground">
              <Shield className="h-3.5 w-3.5 text-primary" />
              Información verificada
            </div>
          </div>

          {/* ── Carrusel / Sin resultados ── */}
          {filteredPersons.length === 0 ? (
            <div className="text-center py-20 rounded-3xl border border-dashed border-border bg-card/50">
              <h3 className="text-xl font-semibold mb-2">
                No encontramos coincidencias
              </h3>
              <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                Intenta con otros términos o limpia los filtros para explorar
                todos los registros disponibles.
              </p>
              <Button onClick={clearFilters} className="rounded-xl">
                Limpiar filtros
              </Button>
            </div>
          ) : (
            <CarruselMujeres
              persons={filteredPersons}
              onViewDetails={handleViewDetails}
              onMensajeAnonimo={handleMensajeAnonimo}
            />
          )}

          {/* ── CTA Reportar ── */}
          <div className="mt-16 relative overflow-hidden rounded-3xl border border-border p-10 md:p-16"
            style={{
              background: "linear-gradient(135deg, #1e1b4b 0%, #4c1d95 60%, #7e22ce 100%)"
            }}
          >
            <div className="pointer-events-none absolute -right-24 -top-24 w-80 h-80 rounded-full bg-white/10 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-32 -left-20 w-96 h-96 rounded-full bg-pink-500/20 blur-3xl" />
            <div className="relative grid items-center gap-8 md:grid-cols-2">
              <div className="text-white">
                <p className="text-xs font-medium uppercase tracking-widest text-white/60 mb-3">
                  Colabora con HerStory
                </p>
                <h3 className="text-2xl md:text-4xl font-bold leading-tight mb-4">
                  Una pista tuya puede ser la respuesta que una familia espera.
                </h3>
                <p className="text-white/75 leading-relaxed">
                  Comparte un caso, reporta un avistamiento o únete como voluntaria.
                  Cada acción acerca a alguien a casa.
                </p>
              </div>
              <div className="flex flex-col gap-3 md:items-end">
                <Button
                  size="lg"
                  className="h-12 gap-2 rounded-xl bg-white text-purple-900 hover:bg-white/90 px-6"
                  onClick={() => window.location.href = "/reportar"}
                >
                  Reportar desaparición
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* ── Privacidad ── */}
          <footer className="mt-12 pt-8 border-t border-border">
            <div className="flex justify-center">
              <PrivacyNotice />
            </div>
          </footer>

        </main>
      </div>

      <PersonModal
        person={selectedPerson}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />

      <MensajeAnonimoModal
        person={personaMensaje}
        isOpen={isMensajeOpen}
        onClose={() => setIsMensajeOpen(false)}
      />
    </>
  )
}

export default MujeresDesaparecidas