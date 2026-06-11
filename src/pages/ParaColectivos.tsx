import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabaseClient"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useToast } from "@/hooks/use-toast"
import NavbarWrapper from "@/components/NavbarWrapper"
import headerImage from "@/assets/herstory-header.jpg"
import {
  Users, MapPin, Phone, Video, Facebook, CheckCircle,
  Upload, Mail, ArrowRight, Search, X, Sparkles
} from "lucide-react"

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
  const regexYoutubeWatch = /youtube\.com\/watch\?v=([^&]+)/
  const regexYoutubeShort = /youtu\.be\/([^?]+)/
  const regexYoutubeEmbed = /youtube\.com\/embed\/([^?]+)/
  const matchWatch = url.match(regexYoutubeWatch)
  const matchShort = url.match(regexYoutubeShort)
  const matchEmbed = url.match(regexYoutubeEmbed)
  const youtubeId = matchWatch?.[1] || matchShort?.[1] || matchEmbed?.[1]
  if (youtubeId) return `https://www.youtube.com/embed/${youtubeId}`
  const regexVimeo = /vimeo\.com\/(?:video\/)?(\d+)/
  const matchVimeo = url.match(regexVimeo)
  if (matchVimeo?.[1]) return `https://player.vimeo.com/video/${matchVimeo[1]}`
  return null
}

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
  const [videoModal, setVideoModal] = useState<{ url: string; nombre: string } | null>(null)

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

  const colectivosFiltrados = colectivos.filter(c => {
    const matchEstado = filtroEstado === "Todos" ? true : c.estado === filtroEstado
    const matchBusqueda = busqueda === "" ? true :
      c.nombre.toLowerCase().includes(busqueda.toLowerCase())
    return matchEstado && matchBusqueda
  })

  const estadosDisponibles = ["Todos", ...Array.from(new Set(colectivos.map(c => c.estado))).sort()]

  const actualizar = (campo: keyof FormAlianza, valor: string) => {
    setFormData(prev => ({ ...prev, [campo]: valor }))
  }

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

  return (

    
    <div className="min-h-screen bg-background">
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
              HerStory · Colectivos de búsqueda
            </p>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight">
              Tu{" "}
              <span className="italic font-normal text-pink-200">eres parte de Herstory</span>
            </h1>
          </div>
        </div>
      </div>

<NavbarWrapper />
      {/* ── Hero con imagen de fondo — sin degradado blanco ── */}
      <div className="relative w-full overflow-hidden" style={{ minHeight: "320px" }}>
        <img
          src={headerImage}
          alt="HerStory"
          className="w-full h-full object-cover absolute inset-0 scale-105"
        />
        <div className="absolute inset-0" style={{
          background: "linear-gradient(to bottom, rgba(27,15,51,0.88) 0%, rgba(76,29,149,0.82) 60%, rgba(126,34,206,0.9) 100%)"
        }} />
        <div className="relative mx-auto max-w-7xl px-5 lg:px-8 pt-20 pb-12">
          <div className="max-w-2xl text-white">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3.5 py-1.5 text-xs font-medium backdrop-blur mb-4">
              <Sparkles className="h-3.5 w-3.5" />
              Directorio ciudadano · HerStory México
            </span>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-3">
              Las buscadoras son{" "}
              <span className="bg-gradient-to-r from-[#F5D0FE] via-[#F0ABFC] to-[#FBCFE8] bg-clip-text text-transparent italic font-normal">
                las protagonistas
              </span>
            </h1>
            <p className="text-white/80 text-lg mb-8 max-w-xl">
              Colectivos que buscan activamente a personas desaparecidas en México.
              Si buscas a un familiar, pueden orientarte y acompañarte.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button
                size="lg"
                className="h-12 gap-2 rounded-xl bg-white px-6 text-base text-[#1B0F33] hover:bg-white/90"
                onClick={() => {
                  setMostrarFormulario(true)
                  setTimeout(() => {
                    document.getElementById("seccion-alianza")?.scrollIntoView({ behavior: "smooth" })
                  }, 100)
                }}
              >
                Unir mi colectivo <ArrowRight className="h-4 w-4" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="h-12 rounded-xl border-white/30 bg-white/5 px-6 text-base text-white backdrop-blur hover:bg-white/15 hover:text-white"
                onClick={() => document.getElementById("directorio")?.scrollIntoView({ behavior: "smooth" })}
              >
                Ver directorio
              </Button>
            </div>
          </div>

          {/* Métricas — pegadas al fondo del hero, no flotan */}
          <div className="mt-10 flex flex-wrap gap-4">
            <div className="rounded-2xl border border-white/15 bg-white/10 backdrop-blur-md px-5 py-3">
              <p className="text-2xl font-bold text-white">{colectivos.length}</p>
              <p className="text-xs text-white/60 uppercase tracking-wider">Colectivos aliados</p>
            </div>
            <div className="rounded-2xl border border-white/15 bg-white/10 backdrop-blur-md px-5 py-3">
              <p className="text-2xl font-bold text-white">
                {Array.from(new Set(colectivos.map(c => c.estado))).length}
              </p>
              <p className="text-xs text-white/60 uppercase tracking-wider">Estados cubiertos</p>
            </div>
            <div className="rounded-2xl border border-pink-400/30 bg-white/10 backdrop-blur-md px-5 py-3">
              <p className="text-2xl font-bold text-pink-200">
                {colectivos.filter(c => c.es_aliado_verificador).length}
              </p>
              <p className="text-xs text-white/60 uppercase tracking-wider">Aliados verificadores</p>
            </div>
          </div>
        </div>
      </div>

      {/* ── Barra separadora — corta limpio el hero ── */}
      <div className="h-1 w-full" style={{ background: "linear-gradient(90deg, #7e22ce, #ec4899, #7e22ce)" }} />

      

      {/* ── RECONOCIMIENTO — sección bold activista ── */}
      <section className="relative overflow-hidden" style={{ background: "#581c87" }}>
        <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full opacity-20" style={{ background: "#ec4899" }} />
        <div className="pointer-events-none absolute -left-8 bottom-0 h-40 w-40 rounded-full opacity-10" style={{ background: "#f0abfc" }} />
        <div className="relative mx-auto max-w-7xl px-5 lg:px-8 py-16 md:py-20">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-pink-300 mb-3">
                Para las que no se rinden
              </p>
              <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight mb-5">
                Reconocimiento<br />a las buscadoras
              </h2>
              <p className="text-white/70 text-base leading-relaxed mb-8 max-w-md">
                Un tributo a las madres y familias que dedican su vida a buscar a sus seres queridos.
                Su valentía merece ser nombrada y recordada.
              </p>
              <a
                href="/reconocimiento"
                className="inline-flex items-center gap-2 bg-white text-purple-900 font-semibold px-6 py-3 rounded-xl hover:bg-white/90 transition-colors text-sm"
              >
                Leer reconocimiento <ArrowRight className="h-4 w-4" />
              </a>
            </div>

            {/* Quote de impacto */}
            <div className="border-l-4 border-pink-400 pl-8">
              <p className="text-xl md:text-2xl text-white leading-relaxed italic mb-6">
                "Buscamos porque las amamos.<br />
                Seguimos porque merecen<br />
                ser encontradas."
              </p>
              <p className="text-xs uppercase tracking-widest text-white/40">
                Voz de las buscadoras de México
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── GUÍA DE BUENAS PRÁCTICAS ── */}
      <section className="border-b border-border bg-background">
        <div className="mx-auto max-w-7xl px-5 lg:px-8 py-16 md:py-20">
          <div className="grid md:grid-cols-2 gap-12 items-center">

            {/* Pasos visibles — no escondidos detrás de un link */}
            <div className="space-y-8">
              {[
                {
                  num: "01",
                  titulo: "Reporta la desaparición",
                  desc: "Acude al Ministerio Público dentro de las primeras 24 horas. No esperes más tiempo."
                },
                {
                  num: "02",
                  titulo: "Contacta un colectivo",
                  desc: "Los colectivos aliados pueden orientarte y acompañarte desde el primer momento."
                },
                {
                  num: "03",
                  titulo: "Documenta todo",
                  desc: "Guarda evidencias, registros y comunicaciones desde el inicio del proceso."
                },
              ].map(({ num, titulo, desc }) => (
                <div key={num} className="flex gap-5 items-start">
                  <span className="text-3xl font-bold text-primary/30 leading-none min-w-[2rem]">{num}</span>
                  <div>
                    <p className="font-semibold text-foreground mb-1">{titulo}</p>
                    <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-3">
                Si lastimosamente lo necesitas
              </p>
              <h2 className="text-3xl md:text-4xl font-bold leading-tight mb-5">
                Guía de buenas prácticas
              </h2>
              <p className="text-muted-foreground text-base leading-relaxed mb-8 max-w-md">
                Pasos concretos y orientación clara para familias que enfrentan la desaparición
                de un ser querido. No estás sola en esto.
              </p>
              <a
                href="/guia-colectivos"
                className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-semibold px-6 py-3 rounded-xl hover:bg-primary/90 transition-colors text-sm"
              >
                Ver guía completa <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── DIRECTORIO ── */}
      <div className="max-w-7xl mx-auto px-5 lg:px-8 py-10 space-y-8">

        {/* Encabezado del directorio */}
        <div id="directorio" className="flex items-end justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-1">
              Directorio verificado
            </p>
            <h2 className="text-2xl font-bold">Colectivos aliados</h2>
          </div>
        </div>

        {/* Barra búsqueda y filtros */}
        <div className="rounded-2xl border border-border/60 bg-card shadow-sm p-4 md:p-5">
          <div className="flex flex-col sm:flex-row gap-3 items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
              <Input
                placeholder="Buscar por nombre..."
                value={busqueda}
                onChange={e => setBusqueda(e.target.value)}
                className="pl-10 h-11 rounded-xl border-transparent bg-muted/50"
              />
            </div>
            <Select value={filtroEstado} onValueChange={setFiltroEstado}>
              <SelectTrigger className="h-11 w-full sm:w-52 rounded-xl">
                <SelectValue placeholder="Filtrar por estado" />
              </SelectTrigger>
              <SelectContent>
                {estadosDisponibles.map(estado => (
                  <SelectItem key={estado} value={estado}>{estado}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            {(busqueda || filtroEstado !== "Todos") && (
              <Button
                variant="outline"
                size="sm"
                className="h-11 rounded-xl gap-1"
                onClick={() => { setBusqueda(""); setFiltroEstado("Todos") }}
              >
                <X className="h-3.5 w-3.5" /> Limpiar
              </Button>
            )}
          </div>
          <p className="text-xs text-muted-foreground mt-3">
            {colectivosFiltrados.length} colectivo{colectivosFiltrados.length !== 1 ? "s" : ""} encontrado{colectivosFiltrados.length !== 1 ? "s" : ""}
          </p>
        </div>

        {/* Grid de colectivos */}
        {loading && (
          <p className="text-center text-muted-foreground py-12">Cargando colectivos...</p>
        )}

        {!loading && colectivosFiltrados.length === 0 && (
          <div className="text-center py-16 rounded-3xl border border-dashed border-border bg-card/50">
            <Users className="h-12 w-12 text-muted-foreground/30 mx-auto mb-3" />
            <p className="text-muted-foreground">No hay colectivos para este filtro.</p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {colectivosFiltrados.map(colectivo => {
            const embedUrl = colectivo.video_url ? getEmbedUrl(colectivo.video_url) : null
            return (
              <Card
                key={colectivo.id}
                className={`flex flex-col transition-all duration-200 hover:shadow-md ${
                  colectivo.es_aliado_verificador
                    ? "border-primary/40 hover:border-primary"
                    : "hover:border-primary/30"
                }`}
              >
                {colectivo.es_aliado_verificador && (
                  <div className="bg-primary text-primary-foreground text-xs font-semibold text-center py-1.5 rounded-t-lg tracking-wide">
                    Aliado HerStory verificado
                  </div>
                )}
                <CardContent className="pt-5 flex flex-col flex-1 gap-4">
                  <div className="flex items-start gap-3">
                    {colectivo.logo_url ? (
                      <img
                        src={colectivo.logo_url}
                        alt={colectivo.nombre}
                        className="w-12 h-12 rounded-full object-cover shrink-0 ring-2 ring-border"
                      />
                    ) : (
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                        <Users className="h-6 w-6 text-primary" />
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-sm leading-tight line-clamp-2">
                        {colectivo.nombre}
                      </h3>
                      <div className="flex items-center gap-1 mt-1">
                        <MapPin className="h-3 w-3 text-muted-foreground shrink-0" />
                        <span className="text-xs text-muted-foreground truncate">{colectivo.estado}</span>
                      </div>
                    </div>
                  </div>

                  {colectivo.verificado && (
                    <div>
                      <Badge variant="secondary" className="text-xs">✓ Verificado</Badge>
                    </div>
                  )}

                  {colectivo.descripcion && (
                    <p className="text-xs text-muted-foreground line-clamp-3 leading-relaxed">
                      {colectivo.descripcion}
                    </p>
                  )}

                  <div className="space-y-1.5 mt-auto">
                    {colectivo.contacto_publico && (
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Mail className="h-3 w-3 shrink-0" />
                        <span className="truncate">{colectivo.contacto_publico}</span>
                      </div>
                    )}
                    {colectivo.whatsapp && (
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Phone className="h-3 w-3 shrink-0" />
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
                        <Facebook className="h-3 w-3 shrink-0" />
                        Facebook
                      </a>
                    )}
                  </div>

                  {embedUrl && (
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full gap-2 mt-1 rounded-xl border-primary/30 text-primary hover:bg-primary/5"
                      onClick={() => setVideoModal({ url: embedUrl, nombre: colectivo.nombre })}
                    >
                      <Video className="h-3.5 w-3.5" />
                      Ver entrevista
                    </Button>
                  )}
                  {colectivo.video_url && !embedUrl && (
                    <a
                      href={colectivo.video_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 text-xs text-primary hover:underline mt-1"
                    >
                      <Video className="h-3.5 w-3.5" />
                      Ver entrevista
                    </a>
                  )}
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* ── CTA ALIANZA — compacto al final ── */}
        <section
          id="seccion-alianza"
          className="relative overflow-hidden rounded-[2rem] p-10 md:p-14"
          style={{ background: "linear-gradient(135deg, #1B0F33 0%, #4c1d95 55%, #7e22ce 100%)" }}
        >
          <div className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-white/10 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-32 -left-20 h-96 w-96 rounded-full opacity-25 blur-3xl" style={{ background: "#ec4899" }} />
          <div className="relative flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
            <div className="text-white max-w-xl">
              <p className="text-xs font-semibold uppercase tracking-widest text-white/50 mb-3">
                Únete a HerStory
              </p>
              <h3 className="text-3xl md:text-4xl font-bold leading-tight mb-4">
                ¿Tu colectivo quiere ser aliado?
              </h3>
              <p className="text-white/75 leading-relaxed">
                Los colectivos aliados verificados pueden referenciar casos en el mapa
                y tienen visibilidad destacada en el directorio.
              </p>
            </div>
            <div className="shrink-0">
              {!enviado ? (
                <Button
                  size="lg"
                  className="h-12 gap-2 rounded-xl bg-white px-8 text-base font-semibold text-[#1B0F33] hover:bg-white/90"
                  onClick={() => setMostrarFormulario(true)}
                >
                  Solicitar alianza <ArrowRight className="h-4 w-4" />
                </Button>
              ) : (
                <div className="flex items-center gap-2 text-white">
                  <CheckCircle className="h-5 w-5 text-green-400" />
                  <span className="text-sm">Solicitud enviada</span>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* ── Formulario de alianza ── */}
        {mostrarFormulario && !enviado && (
          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                Formulario de alianza
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-5">
              <div className="space-y-3">
                <h3 className="font-semibold text-sm text-primary">Información del colectivo *</h3>
                <div>
                  <Label>Nombre del colectivo *</Label>
                  <Input value={formData.nombre_colectivo} onChange={e => actualizar("nombre_colectivo", e.target.value)} placeholder="Nombre oficial" />
                </div>
                <div>
                  <Label>Estado donde opera *</Label>
                  <Select value={formData.estado_colectivo} onValueChange={val => actualizar("estado_colectivo", val)}>
                    <SelectTrigger><SelectValue placeholder="Seleccionar estado" /></SelectTrigger>
                    <SelectContent>
                      {estadosMexico.map(e => <SelectItem key={e} value={e}>{e}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Descripción breve</Label>
                  <Textarea value={formData.descripcion} onChange={e => actualizar("descripcion", e.target.value)} placeholder="¿Qué hace tu colectivo?" className="min-h-20" />
                </div>
              </div>
              <div className="space-y-3">
                <h3 className="font-semibold text-sm text-primary">Contacto *</h3>
                <div>
                  <Label>Nombre de la persona representante *</Label>
                  <Input value={formData.nombre_representante} onChange={e => actualizar("nombre_representante", e.target.value)} placeholder="Nombre completo" />
                </div>
                <div>
                  <Label>Medio de contacto principal *</Label>
                  <Input value={formData.contacto} onChange={e => actualizar("contacto", e.target.value)} placeholder="Email, teléfono o red social" />
                </div>
              </div>
              <div className="space-y-3">
                <h3 className="font-semibold text-sm text-primary">Redes sociales (opcional)</h3>
                <div>
                  <Label>Facebook</Label>
                  <Input value={formData.facebook_url} onChange={e => actualizar("facebook_url", e.target.value)} placeholder="https://facebook.com/tucolectivo" />
                </div>
                <div>
                  <Label>WhatsApp público</Label>
                  <Input value={formData.whatsapp} onChange={e => actualizar("whatsapp", e.target.value)} placeholder="10 dígitos" />
                </div>
                <div>
                  <Label>Video o entrevista</Label>
                  <Input value={formData.video_url} onChange={e => actualizar("video_url", e.target.value)} placeholder="https://youtube.com/..." />
                </div>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold text-sm text-primary">Logo (opcional)</h3>
                <div
                  className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-4 text-center cursor-pointer hover:bg-muted/10 transition"
                  onClick={() => document.getElementById("logo-input")?.click()}
                >
                  <Upload className="h-6 w-6 text-muted-foreground mx-auto mb-1" />
                  <p className="text-xs text-muted-foreground">Haz clic para subir el logo</p>
                  <input id="logo-input" type="file" accept="image/*" onChange={subirLogo} className="hidden" />
                </div>
                {loadingLogo && <p className="text-xs text-muted-foreground">Subiendo logo...</p>}
                {formData.logo_url && (
                  <div className="text-center">
                    <img src={formData.logo_url} alt="Logo" className="w-16 h-16 object-cover rounded-full mx-auto" />
                    <p className="text-xs text-green-600 mt-1">✓ Logo subido</p>
                  </div>
                )}
              </div>
              <div className="flex gap-3 pt-2">
                <Button variant="outline" className="flex-1" onClick={() => setMostrarFormulario(false)} disabled={enviando}>Cancelar</Button>
                <Button className="flex-1" onClick={enviarSolicitud} disabled={enviando}>
                  {enviando ? "Enviando..." : "Enviar solicitud"}
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {enviado && (
          <Card className="max-w-xl mx-auto">
            <CardContent className="pt-8 pb-8 text-center space-y-4">
              <CheckCircle className="h-14 w-14 text-green-500 mx-auto" />
              <h3 className="text-xl font-bold">Solicitud recibida</h3>
              <p className="text-muted-foreground text-sm">
                Nuestro equipo revisará tu solicitud y se pondrá en contacto a través del medio que indicaste.
              </p>
              <Button variant="outline" onClick={() => { setEnviado(false); setMostrarFormulario(false) }}>
                Cerrar
              </Button>
            </CardContent>
          </Card>
        )}

      </div>

      {/* ── Modal de video ── */}
      <Dialog open={!!videoModal} onOpenChange={() => setVideoModal(null)}>
        <DialogContent className="max-w-2xl p-0 overflow-hidden rounded-2xl">
          <DialogHeader className="px-6 pt-5 pb-3">
            <DialogTitle className="flex items-center gap-2 text-base">
              <Video className="h-4 w-4 text-primary" />
              {videoModal?.nombre}
            </DialogTitle>
          </DialogHeader>
          {videoModal && (
            <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
              <iframe
                src={videoModal.url}
                title={videoModal.nombre}
                className="absolute inset-0 w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          )}
        </DialogContent>
      </Dialog>

    </div>
  )
}

export default ParaColectivos