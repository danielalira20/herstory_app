import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabaseClient"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { MapPin, Calendar, FileText, Cpu, X } from "lucide-react"

interface Person {
  id: string
  name: string
  age: number
  estado: string
  fechaDesaparicion: string
  foto: string
  caracteristicas: string
  contacto?: string
  telefono?: string
  ultimaVez?: string
  estatura?: string
  peso?: string
  ojos?: string
  cabello?: string
  folio?: string
  proyeccionPath?: string | null
  municipio_desaparicion?: string | null;
}

interface PersonModalProps {
  person: Person | null
  isOpen: boolean
  onClose: () => void
}

// ── Lightbox para ver foto grande ──
// REEMPLAZA el componente Lightbox completo:
const Lightbox = ({
  src,
  alt,
  label,
  onClose
}: {
  src: string
  alt: string
  label: string
  onClose: () => void
}) => (
  <div
    className="fixed inset-0 z-[100] flex items-center justify-center p-8 bg-black/70 backdrop-blur-sm"
    onClick={onClose}
  >
    <div
      className="relative max-w-sm w-full"
      onClick={e => e.stopPropagation()}
    >
      {/* Botón X */}
      <button
        onClick={onClose}
        className="absolute -top-3 -right-3 z-10 w-7 h-7 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-gray-100 transition-colors"
      >
        <X className="h-4 w-4 text-gray-600" />
      </button>

      <img
        src={src}
        alt={alt}
        className="w-full rounded-xl object-cover shadow-2xl"
      />
      {label && (
        <p className="text-center text-white/80 text-xs mt-2">{label}</p>
      )}
    </div>
  </div>
)

const PersonModal = ({ person, isOpen, onClose }: PersonModalProps) => {
  const [proyeccionUrl, setProyeccionUrl] = useState<string | null>(null)
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null)
  const [lightboxLabel, setLightboxLabel] = useState("")

  const [mostrarDisclaimer, setMostrarDisclaimer] = useState(false)
  useEffect(() => {
    if (!person?.proyeccionPath) {
      setProyeccionUrl(null)
      return
    }
    const cargar = async () => {
      const { data } = await supabase.storage
        .from("proyecciones-edad")
        .createSignedUrl(person.proyeccionPath!, 3600)
      if (data) setProyeccionUrl(data.signedUrl)
    }
    cargar()
  }, [person?.proyeccionPath])

  // Calcular años desaparecida
  const calcularAños = () => {
    if (!person?.fechaDesaparicion) return null
    const fecha = new Date(person.fechaDesaparicion)
    const hoy = new Date()
    const años = Math.floor(
      (hoy.getTime() - fecha.getTime()) / (1000 * 60 * 60 * 24 * 365)
    )
    return años > 0 ? años : null
  }

  const añosDesaparecida = calcularAños()
  const edadProyectada = person?.age && añosDesaparecida
    ? person.age + añosDesaparecida
    : null

  const abrirLightbox = (src: string, label: string) => {
    setLightboxSrc(src)
    setLightboxLabel(label)
  }

  if (!person) return null

  return (
    <>
      {/* Lightbox */}
      {lightboxSrc && (
        <Lightbox
          src={lightboxSrc}
          alt="Foto ampliada"
          label={lightboxLabel}
          onClose={() => setLightboxSrc(null)}
        />
      )}

      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl text-primary">
              Información de Desaparición
            </DialogTitle>
          </DialogHeader>

          <div className="grid md:grid-cols-2 gap-6">
            {/* ── Fotos ── */}
            <div className="space-y-3">
              {proyeccionUrl ? (
                <>
                  {/* Con proyección: dos fotos lado a lado */}
                  <div className="grid grid-cols-2 gap-2">
                    <div className="space-y-1">
                      <p className="text-xs text-muted-foreground text-center">
                        Al desaparecer
                      </p>
                      <div
                        className="aspect-square overflow-hidden rounded-xl cursor-zoom-in hover:opacity-90 transition-opacity"
                        onClick={() => abrirLightbox(
                          person.foto,
                          `${person.name} — Al momento de desaparecer (${person.age} años)`
                        )}
                      >
                        <img
                          src={person.foto}
                          alt={`Foto de ${person.name}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <p className="text-xs text-center font-medium">
                        {person.age} años
                      </p>
                    </div>

                    <div className="space-y-1">
                      <div className="flex items-center justify-center gap-1">
                          <Cpu className="h-3 w-3 text-primary" />
                          <p className="text-xs text-muted-foreground text-center">
                            Proyección actual
                          </p>
                          {/* Ícono i de información */}
                          <div className="relative">
                            <button
                              onClick={() => setMostrarDisclaimer(!mostrarDisclaimer)}
                              className="w-4 h-4 rounded-full bg-amber-100 border border-amber-300 flex items-center justify-center hover:bg-amber-200 transition-colors"
                            >
                              <span className="text-amber-700 text-[10px] font-bold leading-none">i</span>
                            </button>
                            {mostrarDisclaimer && (
                              <div className="absolute top-5 right-0 w-52 bg-amber-50 border border-amber-200 rounded-lg p-3 shadow-lg z-10">
                                <p className="text-xs text-amber-700 leading-relaxed">
                                  Imagen generada por IA con fines de búsqueda.
                                  No representa una fotografía real.
                                  Generada por HerStory.
                                </p>
                              </div>
                            )}
                          </div>
                        </div>
                      <div
                        className="aspect-square overflow-hidden rounded-xl cursor-zoom-in hover:opacity-90 transition-opacity"
                        onClick={() => abrirLightbox(
                          proyeccionUrl,
                          `${person.name} — Proyección de edad (~${edadProyectada} años)`
                        )}
                      >
                        <img
                          src={proyeccionUrl}
                          alt="Proyección de edad"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <p className="text-xs text-center font-medium">
                        ~{edadProyectada} años
                      </p>
                    </div>
                  </div>

                  {/* Info años desaparecida */}
                  {añosDesaparecida && (
                    <div className="bg-primary/5 border border-primary/20 rounded-lg p-3 flex justify-between text-xs">
                      <span className="text-muted-foreground">
                        Años desaparecida
                      </span>
                      <span className="font-bold">{añosDesaparecida} años</span>
                    </div>
                  )}

                  
                </>
              ) : (
                /* Sin proyección: solo foto original */
                <div
                  className="aspect-square overflow-hidden rounded-xl cursor-zoom-in hover:opacity-90 transition-opacity"
                  onClick={() => abrirLightbox(
                    person.foto,
                    `${person.name} — ${person.age} años`
                  )}
                >
                  <img
                    src={person.foto}
                    alt={`Foto de ${person.name}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
            </div>

            {/* ── Datos ── */}
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
                {person.folio && (
                  <div className="flex items-center gap-3">
                    <FileText className="h-5 w-5 text-primary shrink-0" />
                    <div>
                      <p className="font-medium text-sm">Folio</p>
                      <p className="text-muted-foreground text-sm">
                        {person.folio}
                      </p>
                    </div>
                  </div>
                )}
                <div className="flex items-center gap-3">
                  <MapPin className="h-5 w-5 text-primary shrink-0" />
                  <div>
                    <p className="font-medium text-sm">Ubicación</p>
                    <p className="text-muted-foreground text-sm">
                      {person.municipio_desaparicion
                        ? `${person.municipio_desaparicion}, ${person.estado}`
                        : person.estado}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Calendar className="h-5 w-5 text-primary shrink-0" />
                  <div>
                    <p className="font-medium text-sm">Fecha de Desaparición</p>
                    <p className="text-muted-foreground text-sm">
                      {person.fechaDesaparicion}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ── Características físicas ── */}
          <div className="space-y-4 mt-2">
            <div>
              <h3 className="font-semibold text-lg mb-2">
                Características Físicas
              </h3>
              <div className="grid grid-cols-2 gap-3 text-sm">
                {person.estatura && (
                  <div className="bg-muted/40 rounded-lg p-3">
                    <span className="font-medium">Estatura</span>
                    <p className="text-muted-foreground">{person.estatura}</p>
                  </div>
                )}
                {person.peso && (
                  <div className="bg-muted/40 rounded-lg p-3">
                    <span className="font-medium">Peso</span>
                    <p className="text-muted-foreground">{person.peso}</p>
                  </div>
                )}
                {person.ojos && (
                  <div className="bg-muted/40 rounded-lg p-3">
                    <span className="font-medium">Color de ojos</span>
                    <p className="text-muted-foreground">{person.ojos}</p>
                  </div>
                )}
                {person.cabello && (
                  <div className="bg-muted/40 rounded-lg p-3">
                    <span className="font-medium">Cabello</span>
                    <p className="text-muted-foreground">{person.cabello}</p>
                  </div>
                )}
              </div>
              {person.caracteristicas && (
                <p className="text-muted-foreground text-sm mt-3 bg-muted/30 rounded-lg p-3">
                  {person.caracteristicas}
                </p>
              )}
            </div>
          </div>

        </DialogContent>
      </Dialog>
    </>
  )
}

export default PersonModal