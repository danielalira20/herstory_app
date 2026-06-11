import { useState } from "react"
import { Link } from "react-router-dom"
import NavbarWrapper from "@/components/NavbarWrapper"
import headerImage from "@/assets/herstory-header.jpg"
import { GUIA_COLECTIVOS } from "@/data/guia-colectivos"
import {
  FileText, BookOpen, Search, Building2, Compass, Heart, Scale,
  Phone, Mail, Globe, ChevronRight, AlertTriangle, ExternalLink,
  ArrowRight, Gavel, Clock, Download, ArrowLeft, CheckCircle
} from "lucide-react"

import { lazy, Suspense } from "react"
const PDFDownloadLink = lazy(() =>
  import("@react-pdf/renderer").then(m => ({ default: m.PDFDownloadLink }))
)
const GuiaPDF = lazy(() =>
  import("@/components/GuiaPDF").then(m => ({ default: m.GuiaPDF }))
)



// ─────────────────────────────────────────
// Config por sección
// ─────────────────────────────────────────
const seccionConfig: Record<string, {
  icon: React.ElementType
  color: string
  bg: string
  border: string
  time: string
  tag?: string
}> = {
  documentacion: { icon: FileText,   color: "text-blue-600",   bg: "bg-blue-50",   border: "border-blue-200",   time: "12 min", tag: "Esencial" },
  denuncia:      { icon: BookOpen,   color: "text-purple-600", bg: "bg-purple-50", border: "border-purple-200", time: "9 min",  tag: "Jurídico" },
  evidencia:     { icon: Search,     color: "text-green-600",  bg: "bg-green-50",  border: "border-green-200",  time: "14 min" },
  autoridades:   { icon: Building2,  color: "text-orange-600", bg: "bg-orange-50", border: "border-orange-200", time: "10 min" },
  campo:         { icon: Compass,    color: "text-red-600",    bg: "bg-red-50",    border: "border-red-200",    time: "11 min", tag: "Crítico" },
  cuidado:       { icon: Heart,      color: "text-pink-600",   bg: "bg-pink-50",   border: "border-pink-200",   time: "8 min" },
  "marco-legal": { icon: Scale,      color: "text-indigo-600", bg: "bg-indigo-50", border: "border-indigo-200", time: "16 min", tag: "Referencia" },
}

const DisclaimerModal = ({ onClose }: { onClose: () => void }) => (
  <div
    className="fixed inset-0 z-50 flex items-center justify-center p-4"
    onClick={onClose}
  >
    {/* Backdrop con blur */}
    <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />

    {/* Panel */}
    <div
      className="relative z-10 max-w-md w-full rounded-3xl overflow-hidden shadow-2xl"
      onClick={e => e.stopPropagation()}
    >
      {/* Franja superior con gradiente */}
      <div
        className="relative px-8 pt-8 pb-6 text-white"
        style={{
          background: "linear-gradient(135deg, #1e1b4b 0%, #4c1d95 50%, #a21caf 100%)"
        }}
      >
        {/* Círculos decorativos */}
        <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-white/5 translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 left-0 w-20 h-20 rounded-full bg-pink-500/10 -translate-x-1/2 translate-y-1/2" />

        {/* Botón cerrar */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors text-white/70 hover:text-white"
        >
          ✕
        </button>

        {/* Icono */}
        <div className="w-12 h-12 rounded-2xl bg-white/15 backdrop-blur-sm flex items-center justify-center mb-4 ring-1 ring-white/20">
          <AlertTriangle className="h-6 w-6 text-pink-300" />
        </div>

        <h3
          className="text-2xl font-bold leading-tight"
          style={{ fontFamily: "Playfair Display, serif" }}
        >
          Antes de continuar
        </h3>
        
      </div>

      {/* Cuerpo */}
      <div className="bg-white px-8 py-6 space-y-4">
        <p className="text-sm text-foreground/80 leading-relaxed">
          {GUIA_COLECTIVOS.meta.descripcion}
        </p>
        <div className="flex items-start gap-3 rounded-xl bg-pink-50 border border-pink-100 p-4">
          <AlertTriangle className="h-4 w-4 text-pink-500 shrink-0 mt-0.5" />
          <p className="text-sm text-pink-800 leading-relaxed">
            Esta guía <strong>no sustituye</strong> la asesoría jurídica especializada. Ante una situación de riesgo, contacta a las autoridades o a una organización de derechos humanos.
          </p>
        </div>

        <button
          onClick={onClose}
          className="w-full rounded-xl py-3 text-sm font-semibold text-white transition-all hover:opacity-90 hover:-translate-y-0.5"
          style={{
            background: "linear-gradient(135deg, #7e22ce 0%, #a21caf 100%)"
          }}
        >
          Entendido, continuar →
        </button>

      </div>
    </div>
  </div>
)
// ─────────────────────────────────────────
// Tarjeta de sección expandible
// ─────────────────────────────────────────
const SeccionCard = ({ seccion, featured = false }: {
  seccion: typeof GUIA_COLECTIVOS.secciones[0]
  featured?: boolean
}) => {
  const [abierto, setAbierto] = useState(false)
  const [tab, setTab] = useState<"pasos" | "ley" | "errores">("pasos")
  const cfg = seccionConfig[seccion.id]
  const Icono = cfg?.icon || FileText

  return (
    <div
      className={`group relative overflow-hidden rounded-2xl border bg-white shadow-soft transition-all duration-300 ${
        abierto ? "border-primary/40 shadow-lg" : "border-border hover:border-primary/30 hover:-translate-y-0.5 hover:shadow-md"
      } ${featured ? "lg:col-span-2 lg:row-span-2" : ""}`}
    >
      {/* Dot pattern decorativo para featured */}
      {featured && (
        <div className="pointer-events-none absolute inset-x-0 top-0 h-32 opacity-30"
          style={{ backgroundImage: "radial-gradient(circle, hsl(var(--primary)/0.15) 1px, transparent 1px)", backgroundSize: "20px 20px" }}
        />
      )}

      {/* Header */}
      <button
        className="w-full text-left p-6 flex items-start gap-4"
        onClick={() => setAbierto(!abierto)}
      >
        <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ring-1 ${cfg?.bg} ${cfg?.border} ${cfg?.color}`}>
          <Icono className="h-5 w-5" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3
              className={`font-bold leading-tight text-foreground ${featured ? "text-2xl" : "text-lg"}`}
              style={{ fontFamily: "Playfair Display, serif" }}
            >
              {seccion.titulo}
            </h3>
            {cfg?.tag && (
              <span className={`hidden sm:inline-flex text-[10px] font-medium uppercase tracking-wider px-2 py-0.5 rounded-full ring-1 ${cfg.bg} ${cfg.border} ${cfg.color}`}>
                {cfg.tag}
              </span>
            )}
          </div>
          <p className={`text-muted-foreground leading-relaxed ${featured ? "text-base max-w-md" : "text-sm line-clamp-2"}`}>
            {seccion.descripcion}
          </p>
        </div>
        <div className="shrink-0 flex flex-col items-end gap-2 mt-1">
          <span className="hidden sm:flex items-center gap-1 text-xs text-muted-foreground">
            <Clock className="h-3 w-3" /> {cfg?.time}
          </span>
          <ChevronRight
            className={`h-4 w-4 text-muted-foreground transition-transform duration-300 ${
              abierto ? "rotate-90 text-primary" : "group-hover:translate-x-0.5 group-hover:text-primary"
            }`}
          />
        </div>
      </button>

      {/* Contenido expandible */}
      {abierto && (
        <div className="px-6 pb-6 space-y-5 border-t border-border/50">

          {/* Tabs */}
          <div className="flex gap-1 bg-muted/40 rounded-xl p-1 mt-4">
            {([
              { id: "pasos",   label: "Pasos",    icon: CheckCircle },
              { id: "ley",     label: "La ley",   icon: Gavel },
              { id: "errores", label: "Errores",  icon: AlertTriangle },
            ] as const).map(t => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg text-xs font-medium transition-all ${
                  tab === t.id
                    ? "bg-white shadow-sm text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <t.icon className="h-3.5 w-3.5" />
                {t.label}
              </button>
            ))}
          </div>

          {/* Tab: Pasos */}
          {tab === "pasos" && (
            <ol className="relative space-y-4 border-l border-border pl-6">
              {seccion.pasos.map((paso, i) => (
                <li key={i} className="relative">
                  <span className={`absolute -left-[30px] flex h-6 w-6 items-center justify-center rounded-full text-[10px] font-bold ring-4 ring-white ${cfg?.bg} ${cfg?.color}`}>
                    {i + 1}
                  </span>
                  <div className="rounded-xl border border-border bg-muted/20 p-4 hover:border-primary/20 transition-colors">
                    <p className="font-semibold text-sm mb-1">{paso.titulo}</p>
                    <p className="text-sm text-muted-foreground leading-relaxed">{paso.contenido}</p>
                  </div>
                </li>
              ))}
            </ol>
          )}

          {/* Tab: Ley */}
          {tab === "ley" && (
            <div className="rounded-xl border-l-4 border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20 p-5">
              <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-indigo-700 dark:text-indigo-300 mb-3">
                <Gavel className="h-4 w-4" /> Fundamento legal
              </div>
              <p className="text-sm text-indigo-800 dark:text-indigo-300 leading-relaxed">
                {seccion.queDiceLaLey}
              </p>
            </div>
          )}

          {/* Tab: Errores */}
          {tab === "errores" && (
            <div className="space-y-3">
              {seccion.erroresComunes.map((error, i) => (
                <div key={i} className="flex gap-3 rounded-xl border border-red-200 bg-red-50 dark:bg-red-900/20 p-4">
                  <AlertTriangle className="h-4 w-4 text-red-600 shrink-0 mt-0.5" />
                  <p className="text-sm text-red-700 dark:text-red-400 leading-relaxed">{error}</p>
                </div>
              ))}
            </div>
          )}

        </div>
      )}
    </div>
  )
}

// ─────────────────────────────────────────
// COMPONENTE PRINCIPAL
// ─────────────────────────────────────────
const GuiaColectivos = () => {
    const [mostrarDisclaimer, setMostrarDisclaimer] = useState(true)
  return (
    <div className="min-h-screen bg-background text-foreground">
      {mostrarDisclaimer && (
        <DisclaimerModal onClose={() => setMostrarDisclaimer(false)} />
      )}
      <NavbarWrapper />

      {/* ── HERO ── */}
      <div className="relative w-full h-64 overflow-hidden">
        <img src={headerImage} alt="HerStory" className="w-full h-full object-cover" />
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{
            background: "linear-gradient(135deg, rgba(46,16,101,0.88) 0%, rgba(88,28,135,0.78) 50%, rgba(126,34,206,0.72) 100%)"
          }}
        >
          <div className="text-center text-white px-6 max-w-3xl space-y-3">
            <p className="text-xs uppercase tracking-widest text-purple-300 font-medium">
              Para Colectivos
            </p>
            <h1
              className="text-3xl md:text-5xl font-bold"
              style={{ fontFamily: "Playfair Display, serif" }}
            >
              {GUIA_COLECTIVOS.meta.titulo}
            </h1>
            <p className="text-white/80 text-base md:text-lg">
              {GUIA_COLECTIVOS.meta.subtitulo}
            </p>
          </div>
        </div>
      </div>


      {/* ── ÍNDICE VISUAL ── */}
      <section className="border-b border-border/60 bg-white">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <div className="flex flex-wrap items-end justify-between gap-4 mb-10">
            <div className="max-w-2xl">
              <p className="text-xs font-medium uppercase tracking-wider text-primary mb-2">
                Navegación
              </p>
              <h2
                className="text-3xl md:text-4xl font-bold text-foreground"
                style={{ fontFamily: "Playfair Display, serif" }}
              >
                Un centro de conocimiento organizado por temas
              </h2>
              <p className="mt-3 text-muted-foreground text-base">
                Cada sección es independiente. Elige por dónde empezar según tu necesidad.
              </p>
            </div>
            <span className="text-sm text-muted-foreground">
              {GUIA_COLECTIVOS.secciones.length} secciones · {GUIA_COLECTIVOS.recursos.length} recursos
            </span>
          </div>

          {/* Grid de categorías estilo Lovable */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:grid-rows-3">
            {GUIA_COLECTIVOS.secciones.map((seccion, i) => {
              const cfg = seccionConfig[seccion.id]
              const Icono = cfg?.icon || FileText
              const featured = i === 0
              return (
                <a
                  key={seccion.id}
                  href={`#${seccion.id}`}
                  onClick={e => {
                    e.preventDefault()
                    document.getElementById(seccion.id)?.scrollIntoView({ behavior: "smooth", block: "center" })
                  }}
                  className={`group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-border bg-white p-6 shadow-soft transition hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md ${
                    featured ? "lg:col-span-2 lg:row-span-2" : ""
                  }`}
                >
                  {featured && (
                    <div className="pointer-events-none absolute inset-x-0 top-0 h-32 opacity-20"
                      style={{ backgroundImage: "radial-gradient(circle, hsl(var(--primary)/0.3) 1px, transparent 1px)", backgroundSize: "20px 20px" }}
                    />
                  )}
                  <div className="relative">
                    <div className="flex items-center justify-between">
                      <div className={`inline-flex h-11 w-11 items-center justify-center rounded-xl ring-1 ${cfg?.bg} ${cfg?.border} ${cfg?.color}`}>
                        <Icono className="h-5 w-5" />
                      </div>
                      {cfg?.tag && (
                        <span className={`text-[10px] font-medium uppercase tracking-wider px-2.5 py-0.5 rounded-full ring-1 ${cfg.bg} ${cfg.border} ${cfg.color}`}>
                          {cfg.tag}
                        </span>
                      )}
                    </div>
                    <h3
                      className={`mt-5 font-bold leading-tight text-foreground ${featured ? "text-2xl" : "text-lg"}`}
                      style={{ fontFamily: "Playfair Display, serif" }}
                    >
                      {seccion.titulo}
                    </h3>
                    <p className={`mt-2 text-muted-foreground ${featured ? "text-base max-w-sm" : "text-sm"}`}>
                      {seccion.descripcion}
                    </p>
                  </div>
                  <div className="mt-6 flex items-center justify-between text-xs text-muted-foreground">
                    <span className="flex items-center gap-1.5">
                      <Clock className="h-3.5 w-3.5" /> {cfg?.time} de lectura
                    </span>
                    <ChevronRight className="h-4 w-4 transition group-hover:translate-x-0.5 group-hover:text-primary" />
                  </div>
                </a>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── SECCIONES EXPANDIBLES ── */}
      <section className="border-b border-border/60 bg-muted/20">
        <div className="mx-auto max-w-4xl px-6 py-20">
          <div className="mb-12 text-center space-y-3">
            <p className="text-xs font-medium uppercase tracking-wider text-primary">
              Contenido completo
            </p>
            <h2
              className="text-3xl md:text-4xl font-bold"
              style={{ fontFamily: "Playfair Display, serif" }}
            >
              Explora cada sección en detalle
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Haz clic en cualquier sección para ver los pasos, el fundamento legal y los errores a evitar.
            </p>
          </div>

          <div className="space-y-4">
            {GUIA_COLECTIVOS.secciones.map((seccion, i) => (
              <div key={seccion.id} id={seccion.id}>
                <SeccionCard seccion={seccion} featured={i === 0} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── MARCO LEGAL DESTACADO ── */}
      <section className="border-b border-border/60 bg-white">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <div className="grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-4 space-y-4">
              <p className="text-xs font-medium uppercase tracking-wider text-primary">
                Qué dice la ley
              </p>
              <h2
                className="text-3xl md:text-4xl font-bold"
                style={{ fontFamily: "Playfair Display, serif" }}
              >
                Marco legal que respalda la búsqueda
              </h2>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Cada recomendación de esta guía está anclada a un fragmento normativo verificable.
              </p>

              <Suspense fallback={
                  <span className="inline-flex items-center gap-2 rounded-full bg-primary/50 px-5 py-2.5 text-sm font-medium text-white cursor-wait">
                    <Download className="h-4 w-4" /> Preparando PDF...
                  </span>
                }>
                  <PDFDownloadLink
                    document={<GuiaPDF />}
                    fileName="HerStory-Guia-Colectivos-2026.pdf"
                    className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-white hover:opacity-90 transition-all mt-2"
                  >
                    {({ loading }) =>
                      loading
                        ? "Generando PDF..."
                        : <><Download className="h-4 w-4" /> Descargar guía en PDF</>
                    }
                  </PDFDownloadLink>
                </Suspense>
            </div>
            <div className="space-y-4 lg:col-span-8">
              {[
                {
                  tag: "Protocolo Homologado de Búsqueda",
                  body: "Toda búsqueda debe iniciar de manera inmediata, exhaustiva y con enfoque diferencial. La obligación recae en el Estado, no en la familia."
                },
                {
                  tag: "Principios Rectores ONU — Principio 6",
                  body: "Las víctimas y sus familias tienen derecho a participar activamente en la investigación. La búsqueda no puede condicionarse a ningún plazo de tiempo."
                },
                {
                  tag: "Ley General de Víctimas, Art. 7",
                  body: "Derecho a la verdad, a la justicia, a la reparación integral y a medidas de no repetición, con perspectiva diferencial y especializada."
                },
              ].map((r, i) => (
                <div
                  key={i}
                  className="flex items-start gap-4 rounded-2xl border border-primary/15 bg-primary/5 p-6"
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-primary ring-1 ring-primary/20">
                    <Gavel className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wider text-primary mb-2">
                      {r.tag}
                    </p>
                    <p className="text-sm leading-relaxed text-foreground/80">{r.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── RECURSOS RÁPIDOS ── */}
      <section className="border-b border-border/60 bg-white" id="recursos">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <div className="grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-4 space-y-4">
              <p className="text-xs font-medium uppercase tracking-wider text-primary">
                Recursos rápidos
              </p>
              <h2
                className="text-3xl md:text-4xl font-bold"
                style={{ fontFamily: "Playfair Display, serif" }}
              >
                Acciones inmediatas
              </h2>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Líneas oficiales e instituciones para activar de inmediato cuando el tiempo es crítico.
              </p>
            </div>
            <div className="lg:col-span-8 grid gap-4 sm:grid-cols-2">
              {GUIA_COLECTIVOS.recursos.map((recurso, i) => (
                <div
                  key={i}
                  className="group flex flex-col justify-between rounded-2xl border border-border bg-primary/5 p-6 hover:border-primary/40 transition-all"
                >
                  <div>
                    <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-primary mb-3">
                      {recurso.tipo === "telefono" && <><Phone className="h-3.5 w-3.5" /> Línea oficial</>}
                      {recurso.tipo === "email" && <><Mail className="h-3.5 w-3.5" /> Correo</>}
                      {recurso.tipo === "web" && <><Globe className="h-3.5 w-3.5" /> Recurso web</>}
                    </div>
                    <h3
                      className="text-base font-bold text-foreground mb-1"
                      style={{ fontFamily: "Playfair Display, serif" }}
                    >
                      {recurso.nombre}
                    </h3>
                  </div>
                  <div className="mt-4 flex items-center justify-between border-t border-border/60 pt-4">
                    {recurso.tipo === "web" ? (
                      <a
                        href={recurso.dato}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm font-medium text-primary hover:underline flex items-center gap-1"
                      >
                        Ver recurso <ExternalLink className="h-3 w-3" />
                      </a>
                    ) : recurso.tipo === "email" ? (
                      <a
                        href={`mailto:${recurso.dato}`}
                        className="text-sm font-medium text-primary hover:underline"
                      >
                        {recurso.dato}
                      </a>
                    ) : (
                      <span className="font-mono text-lg font-bold text-foreground">
                        {recurso.dato}
                      </span>
                    )}
                    <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:translate-x-0.5 group-hover:text-primary transition-all" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── FUENTES ── */}
      <section className="border-b border-border/60 bg-muted/30" id="fuentes">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <div className="flex flex-wrap items-end justify-between gap-6 mb-12">
            <div className="max-w-2xl space-y-3">
              <p className="text-xs font-medium uppercase tracking-wider text-primary">
                Biblioteca
              </p>
              <h2
                className="text-3xl md:text-4xl font-bold"
                style={{ fontFamily: "Playfair Display, serif" }}
              >
                Fuentes y documentos consultados
              </h2>
              <p className="text-muted-foreground text-sm">
                Toda la guía está respaldada por documentación verificable de organismos oficiales,
                instituciones académicas y colectivos con trayectoria.
              </p>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {GUIA_COLECTIVOS.meta.fuentes.map((fuente, i) => (
              <a
                key={i}
                href={fuente.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col rounded-2xl border border-border bg-white p-6 hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md transition-all"
              >
                {/* Miniatura documento */}
                <div className="flex aspect-[4/3] items-center justify-center overflow-hidden rounded-xl border border-border bg-gradient-to-br from-primary/5 to-primary/10 mb-4">
                  <div className="relative h-3/4 w-2/3 rounded-md bg-white shadow-md">
                    <div className="absolute inset-x-4 top-4 h-2 rounded bg-primary/30" />
                    <div className="absolute inset-x-4 top-8 h-1 rounded bg-muted" />
                    <div className="absolute inset-x-4 top-11 h-1 rounded bg-muted" />
                    <div className="absolute inset-x-4 top-14 h-1 w-2/3 rounded bg-muted" />
                    <div className="absolute inset-x-4 bottom-4 flex items-center justify-between font-mono text-[8px] text-primary">
                      <span>PDF</span>
                      <span>DOC</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-start justify-between gap-2">
                  <p className="text-sm font-semibold leading-snug text-foreground group-hover:text-primary transition-colors">
                    {fuente.nombre}
                  </p>
                  <ExternalLink className="h-4 w-4 shrink-0 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>


    </div>
  )
}

export default GuiaColectivos