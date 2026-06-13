import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabaseClient"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import NavbarWrapper from "@/components/NavbarWrapper"
import { useAuth } from "@/hooks/useAuth"
import {
  Shield, CheckCircle, XCircle, Eye,
  Users, MapPin, Phone, Facebook, Video
} from "lucide-react"

// ─────────────────────────────────────────
// TIPOS
// ─────────────────────────────────────────
interface Solicitud {
  id: number
  nombre_colectivo: string
  estado_colectivo: string
  descripcion: string | null
  contacto: string
  nombre_representante: string
  estado: string
  revisado_por: string | null
  fecha_revision: string | null
  motivo_rechazo: string | null
  colectivo_id: number | null
  created_at: string
  logo_url: string | null
  video_url: string | null
  facebook_url: string | null
  whatsapp: string | null
}

// ─────────────────────────────────────────
// COMPONENTE
// ─────────────────────────────────────────
const AdminSolicitudes = () => {
  const { user } = useAuth()
  const { toast } = useToast()
  const [solicitudes, setSolicitudes] = useState<Solicitud[]>([])
  const [loading, setLoading] = useState(true)
  const [seleccionada, setSeleccionada] = useState<Solicitud | null>(null)
  const [procesando, setProcesando] = useState<number | null>(null)
  const [motivoRechazo, setMotivoRechazo] = useState("")
  const [mostrarRechazo, setMostrarRechazo] = useState(false)
  const [filtroEstado, setFiltroEstado] = useState<"pendiente" | "aprobada" | "rechazada">("pendiente")

  // ── Cargar solicitudes ──
  const cargarSolicitudes = async () => {
    setLoading(true)
    const { data } = await supabase
      .from("solicitudes_alianza")
      .select("*")
      .eq("estado", filtroEstado)
      .order("created_at", { ascending: false })

    if (data) setSolicitudes(data)
    setLoading(false)
  }

  useEffect(() => {
    cargarSolicitudes()
    setSeleccionada(null)
  }, [filtroEstado])

  // ── Aprobar solicitud ──
  const aprobarSolicitud = async (solicitud: Solicitud) => {
    setProcesando(solicitud.id)
    try {
      // Paso 1 — Crear colectivo en tabla colectivos
      const { data: nuevoColectivo, error: errorColectivo } = await supabase
        .from("colectivos")
        .insert({
          nombre: solicitud.nombre_colectivo,
          estado: solicitud.estado_colectivo,
          descripcion: solicitud.descripcion,
          contacto_publico: solicitud.contacto,
          logo_url: solicitud.logo_url,
          video_url: solicitud.video_url,
          facebook_url: solicitud.facebook_url,
          whatsapp: solicitud.whatsapp,
          verificado: true,
          activo: true,
          es_aliado_verificador: true,
          fecha_alianza: new Date().toISOString()
        })
        .select()
        .single()

      if (errorColectivo) throw errorColectivo

      // Paso 2 — Actualizar solicitud como aprobada
      const { error: errorSolicitud } = await supabase
        .from("solicitudes_alianza")
        .update({
          estado: "aprobada",
          revisado_por: user?.email,
          fecha_revision: new Date().toISOString(),
          colectivo_id: nuevoColectivo.id
        })
        .eq("id", solicitud.id)

      if (errorSolicitud) throw errorSolicitud

      setSolicitudes(prev => prev.filter(s => s.id !== solicitud.id))
      setSeleccionada(null)
      toast({ title: "Solicitud aprobada", description: `${solicitud.nombre_colectivo} ahora es aliado de HerStory` })

    } catch (err) {
      console.error(err)
      toast({ title: "Error al aprobar", variant: "destructive" })
    } finally {
      setProcesando(null)
    }
  }

  // ── Rechazar solicitud ──
  const rechazarSolicitud = async (solicitud: Solicitud) => {
    if (!motivoRechazo) {
      setMostrarRechazo(true)
      return
    }

    setProcesando(solicitud.id)
    try {
      const { error } = await supabase
        .from("solicitudes_alianza")
        .update({
          estado: "rechazada",
          revisado_por: user?.email,
          fecha_revision: new Date().toISOString(),
          motivo_rechazo: motivoRechazo
        })
        .eq("id", solicitud.id)

      if (error) throw error

      setSolicitudes(prev => prev.filter(s => s.id !== solicitud.id))
      setSeleccionada(null)
      setMostrarRechazo(false)
      setMotivoRechazo("")
      toast({ title: "Solicitud rechazada" })

    } catch {
      toast({ title: "Error al rechazar", variant: "destructive" })
    } finally {
      setProcesando(null)
    }
  }

  // ─────────────────────────────────────────
  // RENDER
  // ─────────────────────────────────────────
  return (
    <div className="min-h-screen bg-background">

      <div className="container py-8">

        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <Shield className="h-8 w-8 text-primary" />
          <div>
            <h1 className="text-2xl font-bold">Solicitudes de Alianza</h1>
            <p className="text-sm text-muted-foreground">
              Colectivos que quieren unirse a HerStory
            </p>
          </div>
        </div>

        {/* Tabs de estado */}
        <div className="flex gap-2 mb-6">
          {(["pendiente", "aprobada", "rechazada"] as const).map(estado => (
            <Button
              key={estado}
              variant={filtroEstado === estado ? "default" : "outline"}
              size="sm"
              onClick={() => setFiltroEstado(estado)}
              className="capitalize"
            >
              {estado === "pendiente" && " "}
              {estado === "aprobada" && " "}
              {estado === "rechazada" && ""}
              {estado.charAt(0).toUpperCase() + estado.slice(1)}
            </Button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* ── Lista de solicitudes ── */}
          <div className="space-y-3">
            {loading && (
              <p className="text-muted-foreground text-sm">Cargando solicitudes...</p>
            )}

            {!loading && solicitudes.length === 0 && (
              <Card>
                <CardContent className="pt-6 text-center">
                  <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-3" />
                  <p className="font-medium">
                    No hay solicitudes {filtroEstado}s
                  </p>
                </CardContent>
              </Card>
            )}

            {solicitudes.map(solicitud => (
              <Card
                key={solicitud.id}
                className={`cursor-pointer transition-all hover:border-primary ${
                  seleccionada?.id === solicitud.id ? "border-primary" : ""
                }`}
                onClick={() => {
                  setSeleccionada(solicitud)
                  setMostrarRechazo(false)
                  setMotivoRechazo("")
                }}
              >
                <CardContent className="pt-4 pb-4">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-start gap-3">
                      {solicitud.logo_url ? (
                        <img
                          src={solicitud.logo_url}
                          alt={solicitud.nombre_colectivo}
                          className="w-10 h-10 rounded-full object-cover shrink-0"
                        />
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                          <Users className="h-5 w-5 text-primary" />
                        </div>
                      )}
                      <div>
                        <p className="font-medium text-sm">
                          {solicitud.nombre_colectivo}
                        </p>
                        <div className="flex items-center gap-1 mt-0.5">
                          <MapPin className="h-3 w-3 text-muted-foreground" />
                          <span className="text-xs text-muted-foreground">
                            {solicitud.estado_colectivo}
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          Rep: {solicitud.nombre_representante}
                        </p>
                      </div>
                    </div>
                    <Badge
                      variant={
                        solicitud.estado === "aprobada" ? "default" :
                        solicitud.estado === "rechazada" ? "destructive" :
                        "secondary"
                      }
                      className="text-xs shrink-0"
                    >
                      {solicitud.estado}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* ── Detalle de solicitud ── */}
          <div>
            {!seleccionada && (
              <Card className="h-64 flex items-center justify-center">
                <CardContent className="text-center text-muted-foreground">
                  <Eye className="h-10 w-10 mx-auto mb-3 opacity-30" />
                  <p>Selecciona una solicitud para ver el detalle</p>
                </CardContent>
              </Card>
            )}

            {seleccionada && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-3">
                    {seleccionada.logo_url && (
                      <img
                        src={seleccionada.logo_url}
                        alt={seleccionada.nombre_colectivo}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                    )}
                    {seleccionada.nombre_colectivo}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">

                  {/* Datos básicos */}
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <p className="text-muted-foreground text-xs">Estado</p>
                      <p className="font-medium">{seleccionada.estado_colectivo}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground text-xs">Representante</p>
                      <p className="font-medium">{seleccionada.nombre_representante}</p>
                    </div>
                    <div className="col-span-2">
                      <p className="text-muted-foreground text-xs">Contacto</p>
                      <p className="font-medium">{seleccionada.contacto}</p>
                    </div>
                  </div>

                  {/* Descripción */}
                  {seleccionada.descripcion && (
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Descripción</p>
                      <p className="text-sm bg-muted/50 rounded p-2">
                        {seleccionada.descripcion}
                      </p>
                    </div>
                  )}

                  {/* Redes */}
                  <div className="space-y-1">
                    {seleccionada.whatsapp && (
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Phone className="h-3 w-3" />
                        <span>{seleccionada.whatsapp}</span>
                      </div>
                    )}
                    {seleccionada.facebook_url && (
                      <a
                        href={seleccionada.facebook_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-xs text-primary hover:underline"
                      >
                        <Facebook className="h-3 w-3" />
                        <span>Ver Facebook</span>
                      </a>
                    )}
                    {seleccionada.video_url && (
                      <a
                        href={seleccionada.video_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-xs text-primary hover:underline"
                      >
                        <Video className="h-3 w-3" />
                        <span>Ver video</span>
                      </a>
                    )}
                  </div>

                  {/* Fecha solicitud */}
                  <p className="text-xs text-muted-foreground">
                    Solicitud recibida:{" "}
                    {new Date(seleccionada.created_at).toLocaleDateString("es-MX", {
                      day: "numeric",
                      month: "long",
                      year: "numeric"
                    })}
                  </p>

                  {/* Motivo rechazo si ya fue rechazada */}
                  {seleccionada.estado === "rechazada" && seleccionada.motivo_rechazo && (
                    <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 rounded p-3">
                      <p className="text-xs font-medium text-red-700">Motivo de rechazo:</p>
                      <p className="text-xs text-red-600 mt-1">{seleccionada.motivo_rechazo}</p>
                    </div>
                  )}

                  {/* Revisado por si ya fue procesada */}
                  {seleccionada.revisado_por && (
                    <p className="text-xs text-muted-foreground">
                      Revisado por: {seleccionada.revisado_por}
                    </p>
                  )}

                  {/* Motivo rechazo input */}
                  {mostrarRechazo && (
                    <div className="space-y-2">
                      <p className="text-sm font-medium">Motivo de rechazo</p>
                      <select
                        className="w-full border rounded-md p-2 text-sm bg-background"
                        value={motivoRechazo}
                        onChange={e => setMotivoRechazo(e.target.value)}
                      >
                        <option value="">Seleccionar motivo</option>
                        <option value="informacion_insuficiente">Información insuficiente</option>
                        <option value="colectivo_no_verificable">Colectivo no verificable</option>
                        <option value="contacto_invalido">Contacto inválido</option>
                        <option value="duplicado">Ya existe en el directorio</option>
                        <option value="otro">Otro</option>
                      </select>
                    </div>
                  )}

                  {/* Botones solo si está pendiente */}
                  {seleccionada.estado === "pendiente" && (
                    <div className="flex gap-2 pt-2">
                      <Button
                        className="flex-1"
                        onClick={() => aprobarSolicitud(seleccionada)}
                        disabled={procesando === seleccionada.id}
                      >
                        <CheckCircle className="h-4 w-4 mr-1" />
                        {procesando === seleccionada.id ? "Procesando..." : "Aprobar"}
                      </Button>
                      <Button
                        variant="destructive"
                        className="flex-1"
                        onClick={() => rechazarSolicitud(seleccionada)}
                        disabled={procesando === seleccionada.id}
                      >
                        <XCircle className="h-4 w-4 mr-1" />
                        Rechazar
                      </Button>
                    </div>
                  )}

                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminSolicitudes