import { useState, useMemo, useCallback, useRef, useEffect } from "react"
import MexicoMapNew from "@/components/MexicoMapNew"
import PersonCard from "@/components/mujeres-desaparecidas/PersonCard"
import PersonModal from "@/components/mujeres-desaparecidas/PersonModal"
import MensajeAnonimoModal from "@/components/mujeres-desaparecidas/MensajeAnonimoModal"
import NavbarWrapper from "@/components/NavbarWrapper"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { usePersons, Person } from "@/hooks/usePersons"
import headerImage from "@/assets/herstory-header.jpg"
import { Search, X, MapPin, Info, Users } from "lucide-react"

const ITEMS_POR_PAGINA = 20

const RastroNacional = () => {
  const [selectedEstado, setSelectedEstado] = useState<string | null>(null)
  const [selectedPerson, setSelectedPerson] = useState<Person | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [personaMensaje, setPersonaMensaje] = useState<Person | null>(null)
  const [isMensajeOpen, setIsMensajeOpen] = useState(false)
  const [visibleCount, setVisibleCount] = useState(ITEMS_POR_PAGINA)
  const loaderRef = useRef<HTMLDivElement>(null)
  const [selectedMunicipio, setSelectedMunicipio] = useState<string | null>(null)


  const { persons, loading } = usePersons()

  // Reset visible count al cambiar filtros
  useEffect(() => {
    setVisibleCount(ITEMS_POR_PAGINA)
  }, [selectedEstado, searchTerm])

  // Scroll infinito con IntersectionObserver
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisibleCount(prev => prev + ITEMS_POR_PAGINA)
        }
      },
      { threshold: 0.1 }
    )
    if (loaderRef.current) observer.observe(loaderRef.current)
    return () => observer.disconnect()
  }, [])

  const filteredPersons = useMemo(() => {
  let filtered = persons
  if (selectedEstado) {
    filtered = filtered.filter(p => p.estado === selectedEstado)
  }
  if (selectedMunicipio) {
    filtered = filtered.filter(p => p.municipio_desaparicion === selectedMunicipio)
  }
  if (searchTerm) {
    const q = searchTerm.toLowerCase()
    filtered = filtered.filter(p =>
      p.name.toLowerCase().includes(q) ||
      p.estado.toLowerCase().includes(q) ||
      p.caracteristicas.toLowerCase().includes(q)
    )
  }
  return filtered
}, [persons, selectedEstado, selectedMunicipio, searchTerm])

  const visiblePersons = filteredPersons.slice(0, visibleCount)
  const hayMas = visibleCount < filteredPersons.length

  useEffect(() => {
  if (!loaderRef.current) return
  
  const observer = new IntersectionObserver(
    (entries) => {
      console.log("Observer triggered:", entries[0].isIntersecting)
      if (entries[0].isIntersecting) {
        setVisibleCount(prev => prev + ITEMS_POR_PAGINA)
      }
    },
    { threshold: 0.1, rootMargin: "100px" }
  )
  
  observer.observe(loaderRef.current)
  return () => observer.disconnect()
}, [hayMas]) // ← depende de hayMas para re-registrar cuando cambia

  // Casos con municipio en el estado seleccionado
  const casosConMunicipio = useMemo(() => {
    if (!selectedEstado) return 0
    return persons.filter(p => p.estado === selectedEstado && p.municipio_desaparicion).length
  }, [persons, selectedEstado])

  const totalCasosEstado = useMemo(() => {
    if (!selectedEstado) return 0
    return persons.filter(p => p.estado === selectedEstado).length
  }, [persons, selectedEstado])

  const handleEstadoSelect = (estado: string | null) => {
  setSelectedEstado(estado)
  setSelectedMunicipio(null)
}

  const clearFilters = () => {
    setSelectedEstado(null)
    setSelectedMunicipio(null)
    setSearchTerm("")
  }
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
              HerStory · Rastro Nacional
            </p>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight">
              Tú{" "}
              <span className="italic font-normal text-pink-200">nos faltas</span>
            </h1>
            <p className="text-sm md:text-base text-white/70 max-w-md mx-auto">
              Rastro de quienes nos faltan.
            </p>
          </div>
        </div>
      </div>

      <NavbarWrapper />
      <div className="min-h-screen bg-background">
        <div className="max-w-7xl mx-auto px-4 py-6">

          {/* ── Barra búsqueda ── */}
          <div className="flex items-center gap-3 mb-6">
            <div className="relative flex-1 max-w-lg">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
              <Input
                placeholder="Buscar por nombre, estado o características..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="pl-10 h-11 rounded-xl"
              />
            </div>
            {(selectedEstado || searchTerm) && (
              <Button onClick={clearFilters} variant="outline" className="gap-2 h-11 rounded-xl">
                <X className="h-4 w-4" /> Limpiar
              </Button>
            )}
            <div className="ml-auto flex items-center gap-2 text-sm text-muted-foreground">
              <Users className="h-4 w-4" />
              <span>
                {loading ? "Cargando..." : `${filteredPersons.length.toLocaleString("es-MX")} persona${filteredPersons.length !== 1 ? "s" : ""}`}
              </span>
            </div>
          </div>

          {/* ── Layout dos columnas ── */}
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] xl:grid-cols-[1fr_460px] gap-6 items-start">

            {/* ── Columna izquierda: Mapa ── */}
            <div className="sticky top-4">
              <div className="rounded-2xl border border-border bg-card p-4 shadow-sm">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <p className="text-xs font-medium uppercase tracking-widest text-primary mb-0.5">
                      Mapa nacional
                    </p>
                    <h2 className="text-lg font-bold">
                      {selectedEstado ? selectedEstado : "Selecciona un estado"}
                    </h2>
                  </div>
                  {selectedEstado && (
                    <Button
                      variant="outline"
                      size="sm"
                      className="gap-1 rounded-full text-xs"
                      onClick={() => setSelectedEstado(null)}
                    >
                      <X className="h-3 w-3" /> Ver México
                    </Button>
                  )}
                </div>

                <MexicoMapNew
                  persons={persons}
                  selectedEstado={selectedEstado}
                  onEstadoSelect={handleEstadoSelect}
                  selectedMunicipio={selectedMunicipio}
                  onMunicipioSelect={setSelectedMunicipio}
                />

                {/* ── Banner UX municipios sin datos ── */}
                {selectedEstado && casosConMunicipio === 0 && totalCasosEstado > 0 && (
                  <div className="mt-3 flex items-start gap-2.5 rounded-xl bg-purple-50 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-800 p-3">
                    <Info className="h-4 w-4 text-purple-500 shrink-0 mt-0.5" />
                    <div className="text-xs text-purple-700 dark:text-purple-300 leading-relaxed">
                      <span className="font-semibold">Hay {totalCasosEstado} casos en {selectedEstado}</span>, pero aún
                      no tienen municipio registrado. Los municipios se irán marcando conforme
                      se actualicen los registros. Puedes ver todos los casos en la lista.
                    </div>
                  </div>
                )}

                {selectedEstado && casosConMunicipio > 0 && (
                  <div className="mt-3 flex items-center gap-2 text-xs text-muted-foreground">
                    <MapPin className="h-3.5 w-3.5 text-pink-500" />
                    <span>
                      {casosConMunicipio} de {totalCasosEstado} casos tienen municipio registrado
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* ── Columna derecha: Cards ── */}
            <div>
              {loading ? (
                <div className="flex items-center justify-center h-64 text-muted-foreground text-sm">
                  Cargando registros...
                </div>
              ) : filteredPersons.length === 0 ? (
                <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-card/50 px-6 py-16 text-center">
                  <Search className="h-12 w-12 text-muted-foreground/30 mb-3" />
                  <h3 className="font-semibold text-lg mb-1">Sin coincidencias</h3>
                  <p className="text-sm text-muted-foreground mb-4 max-w-xs">
                    {selectedEstado
                      ? `No hay registros en ${selectedEstado} con los criterios actuales.`
                      : "Intenta con otros términos de búsqueda."}
                  </p>
                  <Button onClick={clearFilters} variant="outline" className="rounded-xl">
                    Ver todos
                  </Button>
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {visiblePersons.map(person => (
                      <PersonCard
                        key={person.id}
                        person={person}
                        onViewDetails={p => { setSelectedPerson(p); setIsModalOpen(true) }}
                        onMensajeAnonimo={p => { setPersonaMensaje(p); setIsMensajeOpen(true) }}
                      />
                    ))}
                  </div>

                  {/* ── Loader scroll infinito ── */}
                  {hayMas && (
                    <div ref={loaderRef} className="flex justify-center py-8">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <div className="h-4 w-4 rounded-full border-2 border-primary border-t-transparent animate-spin" />
                        Cargando más...
                      </div>
                    </div>
                  )}
                  {!hayMas && filteredPersons.length > ITEMS_POR_PAGINA && (
                    <p className="text-center text-xs text-muted-foreground py-6">
                      Has visto todos los {filteredPersons.length} registros
                    </p>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
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

export default RastroNacional