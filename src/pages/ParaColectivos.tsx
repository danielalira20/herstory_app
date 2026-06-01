import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabaseClient"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import NavbarWrapper from "@/components/NavbarWrapper"
import headerImage from "@/assets/herstory-header.jpg"
import { Users, MapPin, Phone, Video, Facebook, CheckCircle, Upload, Mail} from "lucide-react"

// ─────────────────────────────────────────
// TIPOS
// ─────────────────────────────────────────
interface Colectivo {
  id: number
  nombre: string
  estado: string
  descripcion: string | null
  contacto_publico: string | null
  verificado: boolean
  es_aliado_verificador: boolean
  logo_url: string | null
  video_url: string | null
  facebook_url: string | null
  whatsapp: string | null
}

interface FormAlianza {
  nombre_colectivo: string
  estado_colectivo: string
  descripcion: string
  contacto: string
  nombre_representante: string
  facebook_url: string
  whatsapp: string
  video_url: string
  logo_url: string
}

const estadosMexico = [
  "Aguascalientes","Baja California","Baja California Sur",
  "Campeche","Chiapas","Chihuahua","Ciudad de México",
  "Coahuila","Colima","Durango","Estado de México",
  "Guanajuato","Guerrero","Hidalgo","Jalisco","Michoacán",
  "Morelos","Nayarit","Nuevo León","Oaxaca","Puebla",
  "Querétaro","Quintana Roo","San Luis Potosí","Sinaloa",
  "Sonora","Tabasco","Tamaulipas","Tlaxcala","Veracruz",
  "Yucatán","Zacatecas","Nacional"
]

const estadoInicial: FormAlianza = {
  nombre_colectivo: "",
  estado_colectivo: "",
  descripcion: "",
  contacto: "",
  nombre_representante: "",
  facebook_url: "",
  whatsapp: "",
  video_url: "",
  logo_url: "",
}

const getEmbedUrl = (url: string): string | null => {
  if (!url) return null

  // YouTube formatos:
  // https://www.youtube.com/watch?v=VIDEO_ID
  // https://youtu.be/VIDEO_ID
  // https://www.youtube.com/embed/VIDEO_ID
  const regexYoutubeWatch = /youtube\.com\/watch\?v=([^&]+)/
  const regexYoutubeShort = /youtu\.be\/([^?]+)/
  const regexYoutubeEmbed = /youtube\.com\/embed\/([^?]+)/

  const matchWatch = url.match(regexYoutubeWatch)
  const matchShort = url.match(regexYoutubeShort)
  const matchEmbed = url.match(regexYoutubeEmbed)
  const youtubeId = matchWatch?.[1] || matchShort?.[1] || matchEmbed?.[1]

  if (youtubeId) {
    return `https://www.youtube.com/embed/${youtubeId}`
  }

  // Vimeo formatos:
  // https://vimeo.com/VIDEO_ID
  // https://player.vimeo.com/video/VIDEO_ID
  const regexVimeo = /vimeo\.com\/(?:video\/)?(\d+)/
  const matchVimeo = url.match(regexVimeo)

  if (matchVimeo?.[1]) {
    return `https://player.vimeo.com/video/${matchVimeo[1]}`
  }

  // Facebook y otros → no se embeben, link externo
  return null
}


// ─────────────────────────────────────────
// COMPONENTE PRINCIPAL
// ─────────────────────────────────────────
const ParaColectivos = () => {
  const { toast } = useToast()
  const [colectivos, setColectivos] = useState<Colectivo[]>([])
  const [filtroEstado, setFiltroEstado] = useState("Todos")
  const [loading, setLoading] = useState(true)
  const [mostrarFormulario, setMostrarFormulario] = useState(false)
  const [formData, setFormData] = useState<FormAlianza>(estadoInicial)
  const [enviando, setEnviando] = useState(false)
  const [enviado, setEnviado] = useState(false)
  const [loadingLogo, setLoadingLogo] = useState(false)
  const [busqueda, setBusqueda] = useState("")

  // ── Cargar colectivos ──
  useEffect(() => {
    const cargar = async () => {
      setLoading(true)
      const { data } = await supabase
        .from("colectivos")
        .select("*")
        .eq("activo", true)
        .eq("verificado", true)
        .order("estado")
      if (data) setColectivos(data)
      setLoading(false)
    }
    cargar()
  }, [])

  // ── Filtrar colectivos ──
  const colectivosFiltrados = colectivos.filter(c => {
  const matchEstado = filtroEstado === "Todos" ? true : c.estado === filtroEstado
  const matchBusqueda = busqueda === "" ? true :
    c.nombre.toLowerCase().includes(busqueda.toLowerCase())
  return matchEstado && matchBusqueda
})

  // ── Estados únicos para el filtro ──
  const estadosDisponibles = ["Todos", ...Array.from(new Set(colectivos.map(c => c.estado))).sort()]

  // ── Actualizar campo ──
  const actualizar = (campo: keyof FormAlianza, valor: string) => {
    setFormData(prev => ({ ...prev, [campo]: valor }))
  }

  // ── Subir logo a Cloudinary ──
  const subirLogo = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setLoadingLogo(true)
    try {
      const data = new FormData()
      data.append("file", file)
      data.append("upload_preset", "herStory_colectivos")
      
      const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUND_NAME
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        { method: "POST", body: data }
      )
      const json = await res.json()
      if (json.secure_url) {
        actualizar("logo_url", json.secure_url)
        toast({ title: "Logo subido correctamente" })
      }
    } catch {
      toast({ title: "Error al subir logo", variant: "destructive" })
    } finally {
      setLoadingLogo(false)
    }
  }

  // ── Enviar solicitud de alianza ──
  const enviarSolicitud = async () => {
    if (!formData.nombre_colectivo || !formData.estado_colectivo ||
        !formData.contacto || !formData.nombre_representante) {
      toast({
        title: "Campos incompletos",
        description: "Por favor completa los campos obligatorios.",
        variant: "destructive"
      })
      return
    }

    setEnviando(true)
    try {
      const { error } = await supabase
        .from("solicitudes_alianza")
        .insert({
          nombre_colectivo: formData.nombre_colectivo,
          estado_colectivo: formData.estado_colectivo,
          descripcion: formData.descripcion || null,
          contacto: formData.contacto,
          nombre_representante: formData.nombre_representante,
          facebook_url: formData.facebook_url || null,
          whatsapp: formData.whatsapp || null,
          video_url: formData.video_url || null,
          logo_url: formData.logo_url || null,
          estado: "pendiente"
        })

      if (error) throw error

      setEnviado(true)
      setFormData(estadoInicial)
      toast({ title: "Solicitud enviada correctamente" })

    } catch {
      toast({
        title: "Error al enviar solicitud",
        description: "Intenta de nuevo más tarde.",
        variant: "destructive"
      })
    } finally {
      setEnviando(false)
    }
  }

  // ─────────────────────────────────────────
  // RENDER
  // ─────────────────────────────────────────
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="relative w-full h-48 overflow-hidden">
        <img src={headerImage} alt="HerStory" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">Para Colectivos</h1>
            <p className="text-lg italic">Las buscadoras son las protagonistas</p>
          </div>
        </div>
      </div>
      <NavbarWrapper />

      <div className="container py-8 max-w-6xl mx-auto space-y-12">

        {/* ── Intro ── */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <h2 className="text-2xl font-bold">Directorio de colectivos de búsqueda</h2>
          <p className="text-muted-foreground">
            Estas organizaciones buscan activamente a mujeres desaparecidas en México.
            Si buscas a un familiar, pueden orientarte y acompañarte.
          </p>
        </div>

        {/* ── Filtro por estado ── */}
        <div className="space-y-3 max-w-2xl mx-auto w-full">
            <div className="flex flex-col sm:flex-row gap-3">
                <Input
                placeholder=" Buscar por nombre..."
                value={busqueda}
                onChange={e => setBusqueda(e.target.value)}
                className="flex-1"
                />
                <Select
                value={filtroEstado}
                onValueChange={setFiltroEstado}
                >
                <SelectTrigger className="w-full sm:w-52">
                    <SelectValue placeholder="Filtrar por estado" />
                </SelectTrigger>
                <SelectContent>
                    {estadosDisponibles.map(estado => (
                    <SelectItem key={estado} value={estado}>
                        {estado === "Todos" ? " Todos los estados" : ` ${estado}`}
                    </SelectItem>
                    ))}
                </SelectContent>
                </Select>
                {/* Botón CTA */}
                <Button
                onClick={() => {
                    setMostrarFormulario(true)
                    // Scroll suave hasta el formulario
                    setTimeout(() => {
                    document.getElementById("seccion-alianza")?.scrollIntoView({
                        behavior: "smooth"
                    })
                    }, 100)
                }}
                className="w-full sm:w-auto whitespace-nowrap"
                variant="outline"
                >
                <Users className="h-4 w-4 mr-2" />
                Unir mi colectivo
                </Button>
            </div>
            <p className="text-xs text-muted-foreground text-right">
                {colectivosFiltrados.length} colectivo(s) encontrado(s)
            </p>
            </div>

        {/* ── Directorio ── */}
        {loading && (
          <p className="text-center text-muted-foreground">Cargando colectivos...</p>
        )}

        {!loading && colectivosFiltrados.length === 0 && (
          <p className="text-center text-muted-foreground">
            No hay colectivos registrados para este estado todavía.
          </p>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {colectivosFiltrados.map(colectivo => (
            <Card key={colectivo.id} className="hover:border-primary transition-all">
              <CardContent className="pt-6 space-y-4">

                {/* Logo y nombre */}
                <div className="flex items-start gap-3">
                  {colectivo.logo_url ? (
                    <img
                      src={colectivo.logo_url}
                      alt={colectivo.nombre}
                      className="w-12 h-12 rounded-full object-cover shrink-0"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                      <Users className="h-6 w-6 text-primary" />
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-sm leading-tight">
                      {colectivo.nombre}
                    </h3>
                    <div className="flex items-center gap-1 mt-1">
                      <MapPin className="h-3 w-3 text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">
                        {colectivo.estado}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Badges */}
                <div className="flex flex-wrap gap-1">
                  {colectivo.verificado && (
                    <Badge variant="secondary" className="text-xs">
                      ✓ Verificado
                    </Badge>
                  )}
                  {colectivo.es_aliado_verificador && (
                    <Badge className="text-xs">
                      Aliado HerStory
                    </Badge>
                  )}
                </div>

                {/* Descripción */}
                {colectivo.descripcion && (
                  <p className="text-xs text-muted-foreground line-clamp-3">
                    {colectivo.descripcion}
                  </p>
                )}

                {/* Contacto y redes */}
                <div className="space-y-1">
                  {colectivo.contacto_publico && (
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Mail className="h-3 w-3" />
                      <span>{colectivo.contacto_publico}</span>
                    </div>
                  )}
                  {colectivo.whatsapp && (
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Phone className="h-3 w-3" />
                      <span>{colectivo.whatsapp}</span>
                    </div>
                  )}
                  {colectivo.facebook_url && (
                    <a
                      href={colectivo.facebook_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-xs text-primary hover:underline"
                    >
                      <Facebook className="h-3 w-3" />
                      <span>Facebook</span>
                    </a>
                  )}
                  {colectivo.video_url && (() => {
                    const embedUrl = getEmbedUrl(colectivo.video_url)
                    return embedUrl ? (
                        <div className="mt-2 space-y-1">
                        <p className="text-xs text-muted-foreground flex items-center gap-1">
                            <Video className="h-3 w-3" />
                            Entrevista
                        </p>
                        <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                            <iframe
                            src={embedUrl}
                            title={`Entrevista ${colectivo.nombre}`}
                            className="absolute inset-0 w-full h-full rounded-md"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            />
                        </div>
                        </div>
                    ) : (
                        <a
                        href={colectivo.video_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-xs text-primary hover:underline"
                        >
                        <Video className="h-3 w-3" />
                        <span>Ver entrevista</span>
                        </a>
                    )
                    })()}
                </div>

              </CardContent>
            </Card>
          ))}
        </div>

        {/* ── Sección formulario alianza ── */}
        <div id="seccion-alianza" className="border-t pt-12 space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <h2 className="text-2xl font-bold">¿Tu colectivo quiere ser aliado de HerStory?</h2>
            <p className="text-muted-foreground text-sm">
              Los colectivos aliados verificados pueden referenciar casos en el mapa
              y tienen visibilidad destacada en el directorio.
              Tu solicitud será revisada por nuestro equipo.
            </p>
          </div>

          {!mostrarFormulario && !enviado && (
            <div className="text-center">
              <Button onClick={() => setMostrarFormulario(true)} size="lg">
                Solicitar alianza
              </Button>
            </div>
          )}

          <div className="text-center mt-4">
            <a
                href="/reconocimiento"
                className="text-sm text-primary hover:underline"
            >
                Leer nuestro reconocimiento a las buscadoras →
            </a>
            </div>

          {/* Confirmación enviada */}
          {enviado && (
            <Card className="max-w-xl mx-auto">
              <CardContent className="pt-8 pb-8 text-center space-y-4">
                <CheckCircle className="h-14 w-14 text-green-500 mx-auto" />
                <h3 className="text-xl font-bold">Solicitud recibida</h3>
                <p className="text-muted-foreground text-sm">
                  Nuestro equipo revisará tu solicitud y se pondrá en contacto
                  a través del medio que indicaste.
                </p>
                <Button variant="outline" onClick={() => {
                  setEnviado(false)
                  setMostrarFormulario(false)
                }}>
                  Cerrar
                </Button>
              </CardContent>
            </Card>
          )}

          {/* Formulario */}
          {mostrarFormulario && !enviado && (
            <Card className="max-w-2xl mx-auto">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-primary" />
                  Formulario de alianza
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-5">

                {/* Datos obligatorios */}
                <div className="space-y-3">
                  <h3 className="font-semibold text-sm text-primary">
                    Información del colectivo *
                  </h3>
                  <div>
                    <Label>Nombre del colectivo *</Label>
                    <Input
                      value={formData.nombre_colectivo}
                      onChange={e => actualizar("nombre_colectivo", e.target.value)}
                      placeholder="Nombre oficial del colectivo"
                    />
                  </div>
                  <div>
                    <Label>Estado donde opera *</Label>
                    <Select
                      value={formData.estado_colectivo}
                      onValueChange={val => actualizar("estado_colectivo", val)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccionar estado" />
                      </SelectTrigger>
                      <SelectContent>
                        {estadosMexico.map(e => (
                          <SelectItem key={e} value={e}>{e}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Descripción breve</Label>
                    <Textarea
                      value={formData.descripcion}
                      onChange={e => actualizar("descripcion", e.target.value)}
                      placeholder="¿Qué hace tu colectivo? ¿Dónde opera?"
                      className="min-h-20"
                    />
                  </div>
                </div>

                {/* Contacto */}
                <div className="space-y-3">
                  <h3 className="font-semibold text-sm text-primary">
                    Contacto *
                  </h3>
                  <div>
                    <Label>Nombre de la persona representante *</Label>
                    <Input
                      value={formData.nombre_representante}
                      onChange={e => actualizar("nombre_representante", e.target.value)}
                      placeholder="Nombre completo"
                    />
                  </div>
                  <div>
                    <Label>Medio de contacto principal *</Label>
                    <Input
                      value={formData.contacto}
                      onChange={e => actualizar("contacto", e.target.value)}
                      placeholder="Email, teléfono o red social"
                    />
                  </div>
                </div>

                {/* Redes sociales */}
                <div className="space-y-3">
                  <h3 className="font-semibold text-sm text-primary">
                    Redes sociales (opcional)
                  </h3>
                  <div>
                    <Label>Facebook</Label>
                    <Input
                      value={formData.facebook_url}
                      onChange={e => actualizar("facebook_url", e.target.value)}
                      placeholder="https://facebook.com/tucolectivo"
                    />
                  </div>
                  <div>
                    <Label>WhatsApp público</Label>
                    <Input
                      value={formData.whatsapp}
                      onChange={e => actualizar("whatsapp", e.target.value)}
                      placeholder="10 dígitos"
                    />
                  </div>
                  <div>
                    <Label>Video o entrevista (YouTube, Vimeo, etc.)</Label>
                    <Input
                      value={formData.video_url}
                      onChange={e => actualizar("video_url", e.target.value)}
                      placeholder="https://youtube.com/..."
                    />
                  </div>
                </div>

                {/* Logo */}
                <div className="space-y-2">
                  <h3 className="font-semibold text-sm text-primary">
                    Logo del colectivo (opcional)
                  </h3>
                  <div
                    className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-4 text-center cursor-pointer hover:bg-muted/10 transition"
                    onClick={() => document.getElementById("logo-input")?.click()}
                  >
                    <Upload className="h-6 w-6 text-muted-foreground mx-auto mb-1" />
                    <p className="text-xs text-muted-foreground">
                      Haz clic para subir el logo
                    </p>
                    <input
                      id="logo-input"
                      type="file"
                      accept="image/*"
                      onChange={subirLogo}
                      className="hidden"
                    />
                  </div>
                  {loadingLogo && (
                    <p className="text-xs text-muted-foreground">Subiendo logo...</p>
                  )}
                  {formData.logo_url && (
                    <div className="text-center">
                      <img
                        src={formData.logo_url}
                        alt="Logo"
                        className="w-16 h-16 object-cover rounded-full mx-auto"
                      />
                      <p className="text-xs text-green-600 mt-1">✓ Logo subido</p>
                    </div>
                  )}
                </div>

                {/* Botones */}
                <div className="flex gap-3 pt-2">
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={() => setMostrarFormulario(false)}
                    disabled={enviando}
                  >
                    Cancelar
                  </Button>
                  <Button
                    className="flex-1"
                    onClick={enviarSolicitud}
                    disabled={enviando}
                  >
                    {enviando ? "Enviando..." : "Enviar solicitud"}
                  </Button>
                </div>

              </CardContent>
            </Card>
          )}
        </div>

      </div>
    </div>
  )
}

export default ParaColectivos