import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabaseClient"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import NavbarWrapper from "@/components/NavbarWrapper"
import { Shield, CheckCircle, XCircle, AlertCircle, Eye } from "lucide-react"
import { useAuth } from "@/hooks/useAuth"

// ─────────────────────────────────────────
// TIPOS
// ─────────────────────────────────────────
interface CasoPendiente {
  id: number
  Nombre: string | null
  Primer_apellido: string | null
  Segundo_apellido: string | null
  Edad: number | null
  "Desaparición": string | null
  "Entidad_desaparición": string | null
  folio: string | null
  imagen_url: string | null
  caracteriticas: string | null
  contacto_desaparecida: string | null
  estado: string
  estado_verificacion_duplicado: string
  posible_duplicado_de: number | null
  coherencia_validada: boolean
  errores_coherencia: string[]
  fecha_consentimiento: string | null
  created_at?: string | null
}

interface CasoComparacion extends CasoPendiente {}

// ─────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────
const getBadgeVariant = (estado: string) => {
  switch (estado) {
    case "posible_duplicado": return "destructive"
    case "requiere_revision": return "warning"
    case "limpio": return "success"
    default: return "secondary"
  }
}

const getBadgeLabel = (estado: string) => {
  switch (estado) {
    case "posible_duplicado": return "Posible duplicado"
    case "requiere_revision": return "Requiere revisión"
    case "limpio": return "Limpio"
    default: return estado
  }
}

const getErrorLabel = (error: string) => {
  switch (error) {
    case "fecha_futura": return "Fecha de desaparición futura"
    case "edad_invalida": return "Edad inválida"
    case "estatura_invalida": return "Estatura inválida"
    default: return error
  }
}

// ─────────────────────────────────────────
// COMPONENTE PRINCIPAL
// ─────────────────────────────────────────
const AdminVerificacion = () => {
  const { user } = useAuth()
  const [casos, setCasos] = useState<CasoPendiente[]>([])
  const [loading, setLoading] = useState(true)
  const [casoSeleccionado, setCasoSeleccionado] = useState<CasoPendiente | null>(null)
  const [casoDuplicado, setCasoDuplicado] = useState<CasoComparacion | null>(null)
  const [procesando, setProcesando] = useState<number | null>(null)
  const [motivoRechazo, setMotivoRechazo] = useState("")
  const [mostrarRechazo, setMostrarRechazo] = useState(false)

  // ── Cargar casos pendientes ──
  const cargarCasos = async () => {
    setLoading(true)
    const { data, error } = await supabase
      .from("personas")
      .select(`
        id, Nombre, Primer_apellido, Segundo_apellido,
        Edad, Desaparición, Entidad_desaparición,
        folio, imagen_url, caracteriticas,
        contacto_desaparecida, estado,
        estado_verificacion_duplicado, posible_duplicado_de,
        coherencia_validada, errores_coherencia,
        fecha_consentimiento
      `)
      .eq("estado", "pendiente")
      .order("estado_verificacion_duplicado", { ascending: false })
        .returns<CasoPendiente[]>()

    if (!error && data) setCasos(data)
    setLoading(false)
  }

  useEffect(() => { cargarCasos() }, [])

  // ── Cargar caso duplicado para comparación ──
  const cargarCasoDuplicado = async (id: number) => {
    const { data } = await supabase
      .from("personas")
      .select(`
        id, Nombre, Primer_apellido, Segundo_apellido,
        Edad, Desaparición, Entidad_desaparición,
        folio, imagen_url, caracteriticas,
        contacto_desaparecida, estado,
        estado_verificacion_duplicado, posible_duplicado_de,
        coherencia_validada, errores_coherencia,
        fecha_consentimiento
      `)
      .eq("id", id)
      .returns<CasoComparacion[]>()
      .single()

    if (data) setCasoDuplicado(data)
  }

  // ── Ver detalle de un caso ──
  const verDetalle = async (caso: CasoPendiente) => {
    setCasoSeleccionado(caso)
    setCasoDuplicado(null)
    setMotivoRechazo("")
    setMostrarRechazo(false)

    if (caso.posible_duplicado_de) {
      await cargarCasoDuplicado(caso.posible_duplicado_de)
    }
  }

  // ── Aprobar caso ──
  const aprobarCaso = async (id: number) => {
    setProcesando(id)
    const { error } = await supabase
      .from("personas")
      .update({
        estado: "verificado",
        verificado_por: user?.email,
        fecha_verificacion: new Date().toISOString()
      })
      .eq("id", id)

    if (!error) {
      setCasos(prev => prev.filter(c => c.id !== id))
      if (casoSeleccionado?.id === id) setCasoSeleccionado(null)
    }
    setProcesando(null)
  }

  // ── Rechazar caso ──
  const rechazarCaso = async (id: number) => {
    if (!motivoRechazo) {
      setMostrarRechazo(true)
      return
    }

    setProcesando(id)
    const { error } = await supabase
      .from("personas")
      .update({
        estado: "rechazado",
        verificado_por: user?.email,
        fecha_verificacion: new Date().toISOString(),
        motivo_rechazo: motivoRechazo
      })
      .eq("id", id)

    if (!error) {
      setCasos(prev => prev.filter(c => c.id !== id))
      if (casoSeleccionado?.id === id) setCasoSeleccionado(null)
      setMostrarRechazo(false)
      setMotivoRechazo("")
    }
    setProcesando(null)
  }

  // ─────────────────────────────────────────
  // RENDER
  // ─────────────────────────────────────────
  return (
    <div className="min-h-screen bg-background">
      <NavbarWrapper />

      <div className="container py-8">

        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <Shield className="h-8 w-8 text-primary" />
          <div>
            <h1 className="text-2xl font-bold">Panel de Verificación</h1>
            <p className="text-sm text-muted-foreground">
              {casos.length} caso(s) pendientes de revisión
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* ── Lista de casos ── */}
          <div className="space-y-3">
            <h2 className="font-semibold text-lg">Casos pendientes</h2>

            {loading && (
              <p className="text-muted-foreground text-sm">Cargando casos...</p>
            )}

            {!loading && casos.length === 0 && (
              <Card>
                <CardContent className="pt-6 text-center">
                  <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-3" />
                  <p className="font-medium">No hay casos pendientes</p>
                  <p className="text-sm text-muted-foreground">
                    Todos los casos han sido revisados
                  </p>
                </CardContent>
              </Card>
            )}

            {casos.map(caso => (
              <Card
                key={caso.id}
                className={`cursor-pointer transition-all hover:border-primary ${
                  casoSeleccionado?.id === caso.id ? "border-primary" : ""
                }`}
                onClick={() => verDetalle(caso)}
              >
                <CardContent className="pt-4 pb-4">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <p className="font-medium truncate">
                        {caso.Nombre} {caso.Primer_apellido} {caso.Segundo_apellido}
                      </p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        Folio: {caso.folio || "Sin folio"}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {caso["Entidad_desaparición"]} · {caso["Desaparición"]}
                      </p>
                    </div>
                    <div className="flex flex-col gap-1 items-end shrink-0">
                      <Badge
                        variant={
                          caso.estado_verificacion_duplicado === "posible_duplicado"
                            ? "destructive"
                            : caso.estado_verificacion_duplicado === "requiere_revision"
                            ? "outline"
                            : "secondary"
                        }
                        className="text-xs"
                      >
                        {getBadgeLabel(caso.estado_verificacion_duplicado)}
                      </Badge>
                      {!caso.coherencia_validada && (
                        <Badge variant="outline" className="text-xs text-amber-600">
                          Coherencia
                        </Badge>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* ── Detalle del caso seleccionado ── */}
          <div>
            {!casoSeleccionado && (
              <Card className="h-64 flex items-center justify-center">
                <CardContent className="text-center text-muted-foreground">
                  <Eye className="h-10 w-10 mx-auto mb-3 opacity-30" />
                  <p>Selecciona un caso para ver el detalle</p>
                </CardContent>
              </Card>
            )}

            {casoSeleccionado && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">
                    {casoSeleccionado.Nombre} {casoSeleccionado.Primer_apellido}{" "}
                    {casoSeleccionado.Segundo_apellido}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">

                  {/* Foto */}
                  {casoSeleccionado.imagen_url && (
                    <img
                      src={casoSeleccionado.imagen_url}
                      alt="Foto"
                      className="w-24 h-24 object-cover rounded-lg"
                    />
                  )}

                  {/* Datos básicos */}
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <p className="text-muted-foreground">Folio</p>
                      <p className="font-medium">{casoSeleccionado.folio || "—"}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Edad</p>
                      <p className="font-medium">{casoSeleccionado.Edad || "—"}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Fecha desaparición</p>
                      <p className="font-medium">{casoSeleccionado["Desaparición"] || "—"}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Estado</p>
                      <p className="font-medium">{casoSeleccionado["Entidad_desaparición"] || "—"}</p>
                    </div>
                  </div>

                  {/* Características */}
                  {casoSeleccionado.caracteriticas && (
                    <div className="text-sm">
                      <p className="text-muted-foreground mb-1">Características</p>
                      <p className="text-sm bg-muted/50 rounded p-2">
                        {casoSeleccionado.caracteriticas}
                      </p>
                    </div>
                  )}

                  {/* Alertas de coherencia */}
                  {!casoSeleccionado.coherencia_validada &&
                    casoSeleccionado.errores_coherencia?.length > 0 && (
                    <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 rounded-lg p-3">
                      <p className="text-sm font-medium text-amber-800 dark:text-amber-400 mb-1">
                        ⚠️ Errores de coherencia detectados:
                      </p>
                      {casoSeleccionado.errores_coherencia.map(err => (
                        <p key={err} className="text-xs text-amber-700 dark:text-amber-300">
                          • {getErrorLabel(err)}
                        </p>
                      ))}
                    </div>
                  )}

                  {/* Alerta de duplicado */}
                  {casoSeleccionado.estado_verificacion_duplicado !== "limpio" && (
                    <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 rounded-lg p-3">
                      <p className="text-sm font-medium text-red-800 dark:text-red-400 mb-2">
                        {casoSeleccionado.estado_verificacion_duplicado === "posible_duplicado"
                          ? "🔴 Posible duplicado detectado"
                          : "🟡 Requiere revisión adicional"}
                      </p>

                      {/* Comparación lado a lado */}
                      {casoDuplicado && (
                        <div className="mt-2">
                          <p className="text-xs font-medium text-red-700 mb-2">
                            Caso similar existente:
                          </p>
                          <div className="grid grid-cols-2 gap-2 text-xs">
                            <div className="bg-white dark:bg-gray-800 rounded p-2">
                              <p className="font-medium text-green-700 mb-1">Caso existente</p>
                              <p>{casoDuplicado.Nombre} {casoDuplicado.Primer_apellido}</p>
                              <p className="text-muted-foreground">Folio: {casoDuplicado.folio}</p>
                              <p className="text-muted-foreground">{casoDuplicado["Desaparición"]}</p>
                              <p className="text-muted-foreground">{casoDuplicado["Entidad_desaparición"]}</p>
                            </div>
                            <div className="bg-white dark:bg-gray-800 rounded p-2">
                              <p className="font-medium text-red-700 mb-1">Caso nuevo</p>
                              <p>{casoSeleccionado.Nombre} {casoSeleccionado.Primer_apellido}</p>
                              <p className="text-muted-foreground">Folio: {casoSeleccionado.folio}</p>
                              <p className="text-muted-foreground">{casoSeleccionado["Desaparición"]}</p>
                              <p className="text-muted-foreground">{casoSeleccionado["Entidad_desaparición"]}</p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Motivo de rechazo */}
                  {mostrarRechazo && (
                    <div className="space-y-2">
                      <p className="text-sm font-medium">Motivo de rechazo</p>
                      <select
                        className="w-full border rounded-md p-2 text-sm bg-background"
                        value={motivoRechazo}
                        onChange={e => setMotivoRechazo(e.target.value)}
                      >
                        <option value="">Seleccionar motivo</option>
                        <option value="duplicado_confirmado">Duplicado confirmado</option>
                        <option value="folio_invalido">Folio inválido</option>
                        <option value="datos_inconsistentes">Datos inconsistentes</option>
                        <option value="caso_falso_detectado">Caso falso detectado</option>
                        <option value="imagen_no_valida">Imagen no válida</option>
                        <option value="informacion_insuficiente">Información insuficiente</option>
                      </select>
                    </div>
                  )}

                  {/* Botones de acción */}
                  <div className="flex gap-2 pt-2">
                    <Button
                      className="flex-1"
                      onClick={() => aprobarCaso(casoSeleccionado.id)}
                      disabled={procesando === casoSeleccionado.id}
                    >
                      <CheckCircle className="h-4 w-4 mr-1" />
                      {procesando === casoSeleccionado.id ? "Procesando..." : "Aprobar"}
                    </Button>
                    <Button
                      variant="destructive"
                      className="flex-1"
                      onClick={() => rechazarCaso(casoSeleccionado.id)}
                      disabled={procesando === casoSeleccionado.id}
                    >
                      <XCircle className="h-4 w-4 mr-1" />
                      Rechazar
                    </Button>
                  </div>

                  {/* Botón "Necesita más información" */}
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={async () => {
                      await supabase
                        .from("personas")
                        .update({ estado: "en_revision" })
                        .eq("id", casoSeleccionado.id)
                      setCasos(prev => prev.filter(c => c.id !== casoSeleccionado.id))
                      setCasoSeleccionado(null)
                    }}
                  >
                    <AlertCircle className="h-4 w-4 mr-1" />
                    Necesita más información
                  </Button>

                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminVerificacion