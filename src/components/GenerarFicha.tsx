import { useRef, useState } from "react"
import html2canvas from "html2canvas"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Download, ImagePlus, Loader2 } from "lucide-react"

interface GenerarFichaProps {
  nombre: string
  primerApellido: string
  segundoApellido?: string
  edad: string
  sexo?: string
  estatura?: string
  colorCabello?: string
  colorOjos?: string
  estado: string
  municipio?: string
  fechaDesaparicion: string
  caracteristicas?: string
  imagenUrl?: string
  telefonoFamiliar?: string
}

const HERSTORY_CONTACTO = "herstoryy2025@gmail.com"
const HERSTORY_LINEA = "089"

const CARTA_W = 816
const CARTA_H = 1056
const MARGEN = 48

const C = {
  bg: "#ffffff",
  border: "#e5e7eb",
  headerBg: "#f9f6ff",
  accentPurple: "#6d28d9",
  accentRed: "#dc2626",
  accentRedLight: "#fef2f2",
  accentPink: "#be185d",
  accentPinkLight: "#fce7f3",
  textPrimary: "#111827",
  textSecondary: "#6b7280",
  textMuted: "#9ca3af",
  divider: "#ede9fe",
  fotoBg: "#f3f4f6",
  chipBg: "#f3f4f6",
}

export default function GenerarFicha({
  nombre,
  primerApellido,
  segundoApellido,
  edad,
  sexo,
  estatura,
  colorCabello,
  colorOjos,
  estado,
  municipio,
  fechaDesaparicion,
  caracteristicas,
  imagenUrl,
  telefonoFamiliar,
}: GenerarFichaProps) {
  const fichaRef = useRef<HTMLDivElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [incluirTelefono, setIncluirTelefono] = useState(false)
  const [incluirCorreoHerstory, setIncluirCorreoHerstory] = useState(true)
  const [fotoLocal, setFotoLocal] = useState<string | null>(null)
  const [generando, setGenerando] = useState(false)
  const [descargada, setDescargada] = useState(false)

  const nombreCompleto = [nombre, primerApellido, segundoApellido].filter(Boolean).join(" ")
  const fotoFinal = fotoLocal || imagenUrl || null
  const ubicacion = municipio ? `${municipio}, ${estado}` : estado

  const handleFotoLocal = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (ev) => setFotoLocal(ev.target?.result as string)
    reader.readAsDataURL(file)
  }

  const formatearFecha = (fecha: string) => {
    if (!fecha) return "Fecha desconocida"
    try {
      return new Date(fecha).toLocaleDateString("es-MX", { day: "numeric", month: "long", year: "numeric" })
    } catch { return fecha }
  }

  const descargarFicha = async () => {
    if (!fichaRef.current) return
    setGenerando(true)
    const el = fichaRef.current
    el.style.position = "static"
    el.style.visibility = "visible"
    el.style.width = `${CARTA_W}px`
    el.style.height = `${CARTA_H}px`
    await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)))
    try {
      const canvas = await html2canvas(el, {
        scale: 2,
        useCORS: true,
        backgroundColor: C.bg,
        logging: false,
        width: CARTA_W,
        height: CARTA_H,
        windowWidth: CARTA_W,
        windowHeight: CARTA_H,
      })
      const link = document.createElement("a")
      link.download = `ficha-busqueda-${nombre}-${primerApellido}.png`
      link.href = canvas.toDataURL("image/png")
      link.click()
      setDescargada(true)
    } catch (err) {
      console.error("Error generando ficha:", err)
    } finally {
      el.style.position = "absolute"
      el.style.visibility = "hidden"
      setGenerando(false)
    }
  }

  const FichaContenido = ({ s }: { s: number }) => {
    const px = (n: number) => n * s

    // Chips de características físicas — solo los que tienen valor
    const fichasChips = [
      sexo && { icon: "♀", label: "Sexo", valor: sexo },
      estatura && { icon: "↕", label: "Estatura", valor: `${estatura} cm` },
      colorCabello && { icon: "◉", label: "Cabello", valor: colorCabello },
      colorOjos && { icon: "◎", label: "Ojos", valor: colorOjos },
    ].filter(Boolean) as { icon: string; label: string; valor: string }[]

    return (
      <div style={{
        width: px(CARTA_W),
        height: px(CARTA_H),
        background: C.bg,
        fontFamily: "system-ui, -apple-system, sans-serif",
        position: "relative",
        overflow: "hidden",
        flexShrink: 0,
      }}>

        {/* ── Header morado ── */}
        <div style={{
          background: C.accentPurple,
          padding: `${px(20)}px ${px(48)}px`,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: px(12) }}>
            <img
              src="/img/logo/logo_story.png"
              alt="HerStory"
              style={{ height: px(40), width: "auto", objectFit: "contain" }}
              crossOrigin="anonymous"
              onError={(e) => { (e.target as HTMLImageElement).style.display = "none" }}
            />
            <div>
              <p style={{ color: "#fff", fontWeight: 700, fontSize: px(22), margin: 0, lineHeight: 1.2 }}>HerStory</p>
              <p style={{ color: "rgba(255,255,255,0.6)", fontSize: px(10), margin: 0, letterSpacing: px(1.5), textTransform: "uppercase" }}>México</p>
            </div>
          </div>
          <div style={{ background: "rgba(255,255,255,0.15)", border: "1px solid rgba(255,255,255,0.3)", borderRadius: px(5), padding: `${px(5)}px ${px(16)}px` }}>
            <p style={{ color: "#fff", fontSize: px(10), fontWeight: 700, margin: 0, letterSpacing: px(2.5), textTransform: "uppercase" }}>
              Ficha de búsqueda
            </p>
          </div>
        </div>

        {/* ── Cuerpo ── */}
        <div style={{ padding: `${px(MARGEN)}px ${px(MARGEN)}px 0`, display: "flex", flexDirection: "column" }}>

          {/* Foto izquierda + datos derecha */}
          <div style={{ display: "flex", gap: px(36), marginBottom: px(24) }}>

            {/* Columna foto */}
            <div style={{ flexShrink: 0 }}>
              <div style={{
                width: px(260),
                height: px(330),
                borderRadius: px(8),
                overflow: "hidden",
                background: C.fotoBg,
                border: `1px solid ${C.border}`,
                position: "relative",
              }}>
                {fotoFinal ? (
                  <img
                    src={fotoFinal}
                    alt={nombreCompleto}
                    style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                    crossOrigin="anonymous"
                  />
                ) : (
                  <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: px(8) }}>
                    <svg width={px(48)} height={px(48)} viewBox="0 0 24 24" fill="none">
                      <circle cx="12" cy="8" r="4" fill={C.textMuted} />
                      <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" stroke={C.textMuted} strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                    <p style={{ color: C.textMuted, fontSize: px(12), textAlign: "center", lineHeight: 1.4, margin: 0 }}>Sin fotografía</p>
                  </div>
                )}
                {/* Marca de agua */}
                <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", pointerEvents: "none", overflow: "hidden" }}>
                  <p style={{
                    color: "rgba(255,255,255,0.28)",
                    fontSize: px(11),
                    fontWeight: 700,
                    letterSpacing: px(1.5),
                    textTransform: "uppercase",
                    transform: "rotate(-35deg)",
                    whiteSpace: "nowrap",
                    userSelect: "none",
                    textShadow: `0 1px ${px(3)}px rgba(0,0,0,0.5)`,
                    margin: 0,
                  }}>
                    Reporte ciudadano, no verificado
                  </p>
                </div>
              </div>
              <div style={{ marginTop: px(8), display: "flex", justifyContent: "center" }}>
                <div style={{ width: px(40), height: px(3), background: C.accentPink, borderRadius: px(2) }} />
              </div>
            </div>

            {/* Columna datos */}
            <div style={{ flex: 1, minWidth: 0 }}>

              {/* ── SE BUSCA — rojo, impacto máximo ── */}
              <p style={{
                color: C.accentRed,
                fontSize: px(60),
                fontWeight: 900,
                letterSpacing: px(4),
                textTransform: "uppercase",
                margin: `0 0 ${px(10)}px 0`,
                lineHeight: 1,
                fontStyle: "italic",
              }}>
                SE BUSCA
              </p>

              {/* Nombre */}
              <p style={{ color: C.textPrimary, fontWeight: 700, fontSize: px(30), margin: `0 0 ${px(4)}px 0`, lineHeight: 1.2, wordBreak: "break-word" }}>
                {nombreCompleto}
              </p>

              {/* Edad · Ubicación */}
              <p style={{ color: C.textSecondary, fontSize: px(18), margin: `0 0 ${px(18)}px 0`, lineHeight: 1.4 }}>
                {edad} años · {ubicacion}
              </p>

              {/* Fecha */}
              <div style={{ marginBottom: px(16) }}>
                <p style={{ color: C.accentPurple, fontSize: px(15), fontWeight: 700, letterSpacing: px(1.5), textTransform: "uppercase", margin: `0 0 ${px(3)}px 0` }}>
                  Desapareció el
                </p>
                <p style={{ color: C.textPrimary, fontSize: px(18), fontWeight: 700, margin: 0 }}>
                  {formatearFecha(fechaDesaparicion)}
                </p>
              </div>

              <div style={{ height: 1, background: C.divider, marginBottom: px(16) }} />

              {/* ── Chips de características físicas ── */}
              {fichasChips.length > 0 && (
                <div style={{ marginBottom: px(14) }}>
                  <p style={{ color: C.accentPurple, fontSize: px(15), fontWeight: 700, letterSpacing: px(1.5), textTransform: "uppercase", margin: `0 0 ${px(8)}px 0` }}>
                    Características físicas
                  </p>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: px(6) }}>
                    {fichasChips.map((chip) => (
                      <div
                        key={chip.label}
                        style={{
                          backgroundColor: C.chipBg,
                          borderRadius: px(6),
                          padding: `${px(6)}px ${px(10)}px`,
                          display: "flex",
                          alignItems: "center",
                          gap: px(5),
                        }}
                      >
                        <span style={{ color: C.accentPurple, fontSize: px(18), fontWeight: 700, flexShrink: 0 }}>{chip.label}:</span>
                        <span style={{ color: C.textPrimary, fontSize: px(16), fontWeight: 500 }}>{chip.valor}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Características / señas particulares */}
              {caracteristicas && (
                <div>
                  <p style={{ color: C.accentPurple, fontSize: px(15), fontWeight: 700, letterSpacing: px(1.5), textTransform: "uppercase", margin: `0 0 ${px(5)}px 0` }}>
                    Señas particulares
                  </p>
                  <p style={{ color: C.textSecondary, fontSize: px(18), lineHeight: 1.65, margin: 0, wordBreak: "break-word" }}>
                    {caracteristicas}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Divider */}
          <div style={{ height: 1, background: C.divider, marginBottom: px(20) }} />

          {/* Contacto */}
          {(incluirCorreoHerstory || (incluirTelefono && telefonoFamiliar)) && (
            <div style={{
              background: C.headerBg,
              border: `1px solid ${C.divider}`,
              borderRadius: px(8),
              padding: `${px(14)}px ${px(20)}px`,
            }}>
              <p style={{ color: C.accentPurple, fontSize: px(20), fontWeight: 700, letterSpacing: px(1.5), textTransform: "uppercase", margin: `0 0 ${px(8)}px 0`, textAlign: "center" }}>
                Si la has visto, contacta inmediatamente
              </p>
              <div style={{ display: "flex", gap: px(28), flexWrap: "wrap", justifyContent: "center" }}>
                {incluirCorreoHerstory && (
                  <p style={{ color: C.accentPink, fontSize: px(20), margin: 0, fontWeight: 500 }}>✉ {HERSTORY_CONTACTO}</p>
                )}
                {incluirTelefono && telefonoFamiliar && (
                  <p style={{ color: C.accentPink, fontSize: px(20), margin: 0, fontWeight: 500 }}>📞 {telefonoFamiliar}</p>
                )}
              </div>
              <p style={{ color: C.textMuted, fontSize: px(18), margin: `${px(5)}px 0 0 0`, textAlign: "center" }}>
                Línea de emergencia: {HERSTORY_LINEA}
              </p>
            </div>
          )}
        </div>

        {/* ── Pie pegado al fondo ── */}
        <div style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          background: C.accentPurple,
          padding: `${px(10)}px ${px(48)}px`,
          textAlign: "center",
        }}>
          <p style={{ color: "rgba(255,255,255,0.65)", fontSize: px(9), margin: 0, lineHeight: 1.5 }}>
            Reporte ciudadano pendiente de verificación · La información no ha sido confirmada oficialmente por HerStory
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
 
      {/* Aviso legal de responsabilidad */}
      <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 space-y-2">
        <div className="flex items-start gap-2">
          <span className="text-amber-600 text-base mt-0.5">⚖️</span>
          <div className="space-y-1.5">
            <p className="text-sm font-semibold text-amber-800">
              Uso responsable de esta herramienta
            </p>
            <p className="text-xs text-amber-700 leading-relaxed">
              Esta ficha es un apoyo ciudadano para la búsqueda de personas desaparecidas.
              Al generarla, confirmas que la información proporcionada es <strong>verídica y de tu conocimiento directo</strong>.
            </p>
            <p className="text-xs text-amber-700 leading-relaxed">
              Proporcionar datos falsos, alterados o fabricar una desaparición inexistente
              constituye un delito en México bajo el{" "}
              <strong>Artículo 247 del Código Penal Federal</strong> (falsedad de declaraciones)
              y puede derivar en responsabilidad penal adicional por{" "}
              <strong>uso indebido de comunicaciones</strong> o <strong>falsedad de reportes</strong>.
            </p>
            <p className="text-xs text-amber-600 font-medium">
              HerStory se reserva el derecho de reportar a las autoridades cualquier uso fraudulento detectado.
            </p>
          </div>
        </div>
      </div>

      {/* Opciones de contacto */}
      <div className="rounded-2xl border border-border bg-card p-5 space-y-4">
        <p className="text-sm font-medium">¿Qué datos de contacto quieres incluir en la ficha?</p>
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <Checkbox id="herstory-contacto" checked={incluirCorreoHerstory} onCheckedChange={(v) => setIncluirCorreoHerstory(v as boolean)} />
            <Label htmlFor="herstory-contacto" className="text-sm cursor-pointer">
              Correo de HerStory <span className="text-muted-foreground">(recomendado)</span>
            </Label>
          </div>
          {telefonoFamiliar && (
            <div className="flex items-center gap-3">
              <Checkbox id="telefono-familiar" checked={incluirTelefono} onCheckedChange={(v) => setIncluirTelefono(v as boolean)} />
              <Label htmlFor="telefono-familiar" className="text-sm cursor-pointer">
                Mi teléfono de contacto ({telefonoFamiliar})
              </Label>
            </div>
          )}
        </div>
        {!imagenUrl && (
          <div className="border-t pt-4 space-y-2">
            <p className="text-sm text-muted-foreground">
              Detectamos que no subiste una fotografía.{!fotoLocal && " ¿Deseas agregarla ahora?"}
            </p>
            {!fotoLocal ? (
              <Button variant="outline" size="sm" className="gap-2" onClick={() => fileInputRef.current?.click()}>
                <ImagePlus className="h-4 w-4" /> Agregar fotografía
              </Button>
            ) : (
              <p className="text-xs text-green-600">✓ Fotografía agregada</p>
            )}
            <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleFotoLocal} />
          </div>
        )}
      </div>


      {/* Preview visible */}
      <div style={{ width: "100%", overflowX: "hidden", display: "flex", justifyContent: "center" }}>
        <FichaContenido s={0.43} />
      </div>

      {/* Div oculto tamaño real para captura */}
      <div style={{ position: "absolute", visibility: "hidden", top: 0, left: 0, width: CARTA_W, pointerEvents: "none", zIndex: -1 }}>
        <div ref={fichaRef}>
          <FichaContenido s={1} />
        </div>
      </div>

      {/* Botón */}
      <Button onClick={descargarFicha} disabled={generando} className="w-full gap-2 rounded-xl h-12" size="lg">
        {generando ? (
          <><Loader2 className="h-4 w-4 animate-spin" /> Generando ficha...</>
        ) : descargada ? (
          <><Download className="h-4 w-4" /> Descargar de nuevo</>
        ) : (
          <><Download className="h-4 w-4" /> Descargar ficha de búsqueda</>
        )}
      </Button>

      {descargada && (
        <p className="text-center text-xs text-muted-foreground">
          ✓ Descargada en tamaño carta. Al imprimir selecciona "Tamaño real" o "100%".
        </p>
      )}
    </div>
  )
}