import { useState } from "react"
import { useProyeccionEdad } from "@/hooks/useProyeccionEdad"
import { Button } from "@/components/ui/button"
import { Cpu, AlertTriangle, Clock, RefreshCw } from "lucide-react"

interface Props {
  casoId: number
  imagenUrl: string
  edadActual: number
  fechaDesaparicion: string
  sexo: string
  proyeccionPath?: string | null
  consentimientoProyeccion: boolean
}

const ProyeccionEdad = ({
  casoId,
  imagenUrl,
  edadActual,
  fechaDesaparicion,
  sexo,
  proyeccionPath,
  consentimientoProyeccion
}: Props) => {
  const { generarProyeccion, obtenerProyeccion, loading, error } = useProyeccionEdad()
  const [proyeccionUrl, setProyeccionUrl] = useState<string | null>(null)
  const [generada, setGenerada] = useState(false)

  // Calcular años desaparecida
  const calcularAños = () => {
    const fechaDesp = new Date(fechaDesaparicion)
    const hoy = new Date()
    return Math.floor((hoy.getTime() - fechaDesp.getTime()) / (1000 * 60 * 60 * 24 * 365))
  }

  const añosDesaparecida = calcularAños()
  const edadProyectada = edadActual + añosDesaparecida

  const handleGenerar = async () => {
    const result = await generarProyeccion({
      casoId,
      imagenUrl,
      edadActual,
      edadProyectada,
      sexo,
      añosDesaparecida
    })

    if (result.success && result.proyeccionUrl) {
      setProyeccionUrl(result.proyeccionUrl)
      setGenerada(true)
    }
  }

  const handleCargarExistente = async () => {
    if (!proyeccionPath) return
    const url = await obtenerProyeccion(proyeccionPath)
    if (url) {
      setProyeccionUrl(url)
      setGenerada(true)
    }
  }

  // Sin consentimiento
  if (!consentimientoProyeccion) {
    return (
      <div className="rounded-xl border border-muted p-4 text-center space-y-2">
        <AlertTriangle className="h-6 w-6 text-muted-foreground mx-auto" />
        <p className="text-xs text-muted-foreground">
          La familia no autorizó la proyección de edad para este caso.
        </p>
      </div>
    )
  }

  // Sin imagen original
  if (!imagenUrl || imagenUrl.includes("default.png")) {
    return (
      <div className="rounded-xl border border-muted p-4 text-center space-y-2">
        <AlertTriangle className="h-6 w-6 text-muted-foreground mx-auto" />
        <p className="text-xs text-muted-foreground">
          Se requiere fotografía para generar la proyección.
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <Cpu className="h-4 w-4 text-primary" />
        <p className="text-sm font-semibold">Proyección de edad</p>
      </div>

      {/* Comparación lado a lado */}
      {generada && proyeccionUrl ? (
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground text-center">
                Al momento de desaparecer
              </p>
              <img
                src={imagenUrl}
                alt="Foto original"
                className="w-full aspect-square object-cover rounded-xl"
              />
              <p className="text-xs text-center font-medium">{edadActual} años</p>
            </div>
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground text-center">
                Proyección actual
              </p>
              <img
                src={proyeccionUrl}
                alt="Proyección de edad"
                className="w-full aspect-square object-cover rounded-xl"
              />
              <p className="text-xs text-center font-medium">~{edadProyectada} años</p>
            </div>
          </div>

          {/* Disclaimer */}
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
            <p className="text-xs text-amber-700 leading-relaxed">
              <strong>Imagen generada por IA.</strong> Esta proyección es una estimación
              visual con fines de búsqueda. No representa una fotografía real.
              Generada por HerStory con tecnología de inteligencia artificial.
            </p>
          </div>

          <Button
            variant="outline"
            size="sm"
            className="w-full"
            onClick={handleGenerar}
            disabled={loading}
          >
            <RefreshCw className="h-3.5 w-3.5 mr-2" />
            Regenerar proyección
          </Button>
        </div>
      ) : (
        <div className="space-y-3">
          {/* Info de la proyección */}
          <div className="bg-primary/5 border border-primary/20 rounded-xl p-4 space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-muted-foreground">Años desaparecida</span>
              <span className="font-bold">{añosDesaparecida} años</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-muted-foreground">Edad proyectada</span>
              <span className="font-bold">~{edadProyectada} años</span>
            </div>
          </div>

          {/* Botón generar o cargar existente */}
          {proyeccionPath ? (
            <Button
              className="w-full"
              size="sm"
              onClick={handleCargarExistente}
              disabled={loading}
            >
              <Cpu className="h-3.5 w-3.5 mr-2" />
              Ver proyección generada
            </Button>
          ) : (
            <Button
              className="w-full"
              size="sm"
              onClick={handleGenerar}
              disabled={loading}
            >
              {loading ? (
                <>
                  <Clock className="h-3.5 w-3.5 mr-2 animate-spin" />
                  Generando con IA...
                </>
              ) : (
                <>
                  <Cpu className="h-3.5 w-3.5 mr-2" />
                  Generar proyección de edad
                </>
              )}
            </Button>
          )}

          {error && (
            <p className="text-xs text-destructive text-center">{error}</p>
          )}
        </div>
      )}
    </div>
  )
}

export default ProyeccionEdad