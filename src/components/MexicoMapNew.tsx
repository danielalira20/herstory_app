import { useState, useEffect, useMemo } from "react"
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
} from "react-simple-maps"
import { estadoArchivoMap } from "@/data/estados-geojson-map"
import { Person } from "@/data/mockData"
import { X, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"

const MEXICO_ESTADOS_URL = "/geojson/mexico-estados.json"
const MAP_WIDTH = 800
const MAP_HEIGHT = 500

interface MexicoMapNewProps {
  persons: Person[]
  selectedEstado: string | null
  onEstadoSelect: (estado: string | null) => void
}

const ESTADO_NOMBRE_MAP: Record<string, string> = {
  "AGUASCALIENTES": "Aguascalientes",
  "BAJA CALIFORNIA": "Baja california",
  "BAJA CALIFORNIA SUR": "Baja california sur",
  "CAMPECHE": "Campeche",
  "CHIAPAS": "Chiapas",
  "CHIHUAHUA": "Chihuahua",
  "CIUDAD DE MÉXICO": "Ciudad de mexico",
  "COAHUILA DE ZARAGOZA": "Coahuila",
  "COLIMA": "Colima",
  "DURANGO": "Durango",
  "ESTADO DE MÉXICO": "Estado de mexico",
  "MÉXICO": "Estado de mexico",
  "GUANAJUATO": "Guanajuato",
  "GUERRERO": "Guerrero",
  "HIDALGO": "Hidalgo",
  "JALISCO": "Jalisco",
  "MICHOACÁN DE OCAMPO": "Michoacan",
  "MORELOS": "Morelos",
  "NAYARIT": "Nayarit",
  "NUEVO LEÓN": "Nuevo leon",
  "OAXACA": "Oaxaca",
  "PUEBLA": "Puebla",
  "QUERÉTARO": "Queretaro",
  "QUINTANA ROO": "Quintana roo",
  "SAN LUIS POTOSÍ": "San luis potosi",
  "SINALOA": "Sinaloa",
  "SONORA": "Sonora",
  "TABASCO": "Tabasco",
  "TAMAULIPAS": "Tamaulipas",
  "TLAXCALA": "Tlaxcala",
  "VERACRUZ DE IGNACIO DE LA LLAVE": "Veracruz",
  "YUCATÁN": "Yucatan",
  "ZACATECAS": "Zacatecas",
}

function normalizarNombreEstado(nombreGeo: string): string {
  return ESTADO_NOMBRE_MAP[nombreGeo?.toUpperCase()] ?? nombreGeo
}

// Convierte un FeatureCollection GeoJSON a paths SVG usando proyección
// equirectangular directa (lng/lat → px). No depende de d3-geo ni de
// react-simple-maps — es matemática pura, siempre funciona.
function geojsonToSvgPaths(
  features: any[],
  width: number,
  height: number,
  padding = 20
): { d: string; nombre: string; cvegeo: string }[] {
  if (!features.length) return []

  // 1. Bounding box
  let minLng = Infinity, maxLng = -Infinity
  let minLat = Infinity, maxLat = -Infinity

  const flatten = (arr: any[]): [number, number][] => {
    if (typeof arr[0] === "number") return [arr as [number, number]]
    return arr.flatMap(flatten)
  }

  features.forEach(f => {
    const coords = f.geometry?.coordinates
    if (!coords) return
    flatten(coords).forEach(([lng, lat]) => {
      if (lng < minLng) minLng = lng
      if (lng > maxLng) maxLng = lng
      if (lat < minLat) minLat = lat
      if (lat > maxLat) maxLat = lat
    })
  })

  const lngSpan = maxLng - minLng
  const latSpan = maxLat - minLat

  const availW = width - padding * 2
  const availH = height - padding * 2

  // 2. Escala uniforme para preservar proporciones
  const scaleX = availW / lngSpan
  const scaleY = availH / latSpan
  const scale = Math.min(scaleX, scaleY)

  // Offset para centrar dentro del área disponible
  const offsetX = padding + (availW - lngSpan * scale) / 2
  const offsetY = padding + (availH - latSpan * scale) / 2

  // 3. Funciones de proyección (lat se invierte porque SVG Y crece hacia abajo)
  const projLng = (lng: number) => offsetX + (lng - minLng) * scale
  const projLat = (lat: number) => offsetY + (maxLat - lat) * scale

  // 4. Convertir cada feature a path SVG
  return features.map(feature => {
    const type = feature.geometry?.type
    const coords = feature.geometry?.coordinates
    if (!coords) return { d: "", nombre: "", cvegeo: "" }

    let d = ""

    const ringToPath = (ring: [number, number][]) => {
      return ring.map(([lng, lat], i) =>
        `${i === 0 ? "M" : "L"}${projLng(lng).toFixed(3)},${projLat(lat).toFixed(3)}`
      ).join("") + "Z"
    }

    if (type === "Polygon") {
      d = coords.map(ringToPath).join(" ")
    } else if (type === "MultiPolygon") {
      d = coords.flatMap((poly: any) => poly.map(ringToPath)).join(" ")
    }

    return {
      d,
      nombre: feature.properties?.NOMGEO ?? "",
      cvegeo: feature.properties?.CVEGEO ?? "",
    }
  })
}

export default function MexicoMapNew({
  persons,
  selectedEstado,
  onEstadoSelect,
}: MexicoMapNewProps) {

  const [municipioGeo, setMunicipioGeo] = useState<any>(null)
  const [loadingMunicipio, setLoadingMunicipio] = useState(false)
  const [hoveredEstado, setHoveredEstado] = useState<string | null>(null)
  const [hoveredMunicipio, setHoveredMunicipio] = useState<string | null>(null)
  const [tooltip, setTooltip] = useState<{ x: number; y: number; text: string } | null>(null)

  const casosPorEstado = useMemo(() =>
    persons.reduce<Record<string, number>>((acc, p) => {
      const e = p.estado ?? ""
      acc[e] = (acc[e] ?? 0) + 1
      return acc
    }, {}),
    [persons]
  )

  const casosPorMunicipio = useMemo(() =>
    persons
      .filter(p => p.estado === selectedEstado && p.municipio_desaparicion)
      .reduce<Record<string, number>>((acc, p) => {
        const m = p.municipio_desaparicion!
        acc[m] = (acc[m] ?? 0) + 1
        return acc
      }, {}),
    [persons, selectedEstado]
  )

  const maxCasos = useMemo(() =>
    Math.max(...Object.values(casosPorEstado), 1),
    [casosPorEstado]
  )

  const municipioSvgPaths = useMemo(() => {
    if (!municipioGeo?.features?.length) return []
    return geojsonToSvgPaths(municipioGeo.features, MAP_WIDTH, MAP_HEIGHT)
  }, [municipioGeo, selectedEstado])

  useEffect(() => {
    if (!selectedEstado) {
      setMunicipioGeo(null)
      return
    }

    const archivo = estadoArchivoMap[selectedEstado]
    if (!archivo) {
      console.warn("[MunicipioMap] No se encontró archivo para:", selectedEstado)
      return
    }

    setLoadingMunicipio(true)
    fetch(`/geojson/${archivo}.json?v=${Date.now()}`)
      .then(r => r.json())
      .then(data => {
        const sanitizedFeatures = data.features.map((feature: any) => {
          if (!feature.geometry?.coordinates) return feature
          const type = feature.geometry.type
          let coords = feature.geometry.coordinates
          if (
            type === "Polygon" &&
            Array.isArray(coords[0]) &&
            Array.isArray(coords[0][0]) &&
            Array.isArray(coords[0][0][0])
          ) {
            coords = coords[0]
          }
          return { ...feature, geometry: { ...feature.geometry, coordinates: coords } }
        })
        setMunicipioGeo({ ...data, features: sanitizedFeatures })
      })
      .catch(err => console.error("[MunicipioMap] Error:", err))
      .finally(() => setLoadingMunicipio(false))
  }, [selectedEstado])

  const getEstadoColor = (nombreEstado: string) => {
    const casos = casosPorEstado[nombreEstado] ?? 0
    if (casos === 0) return "#e2e8f0"
    const intensity = casos / maxCasos
    if (intensity < 0.2) return "#e9d5ff"
    if (intensity < 0.4) return "#c084fc"
    if (intensity < 0.6) return "#a855f7"
    if (intensity < 0.8) return "#7e22ce"
    return "#581c87"
  }

  const getMunicipioColor = (nombreMunicipio: string) => {
    const casos = casosPorMunicipio[nombreMunicipio] ?? 0
    if (casos === 0) return "#ddd6fe"
    if (casos === 1) return "#c084fc"
    if (casos <= 3) return "#a855f7"
    return "#7e22ce"
  }

  return (
    <div className="w-full">
      {selectedEstado && (
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-primary" />
            <span className="font-semibold">{selectedEstado}</span>
            <span className="text-sm text-muted-foreground">
              — {casosPorEstado[selectedEstado] ?? 0} casos registrados
            </span>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="gap-1 rounded-full text-xs"
            onClick={() => onEstadoSelect(null)}
          >
            <X className="h-3 w-3" /> Ver todo México
          </Button>
        </div>
      )}

      {tooltip && (
        <div
          className="fixed z-50 pointer-events-none px-3 py-1.5 rounded-lg bg-popover border border-border shadow-lg text-sm font-medium"
          style={{ left: tooltip.x + 12, top: tooltip.y - 8 }}
        >
          {tooltip.text}
        </div>
      )}

      {loadingMunicipio && (
        <div className="flex items-center justify-center h-64 text-muted-foreground text-sm">
          Cargando municipios de {selectedEstado}...
        </div>
      )}

      {/* Vista nacional */}
      {!selectedEstado && (
        <ComposableMap
          projection="geoMercator"
          projectionConfig={{ center: [-102, 24], scale: 1100 }}
          className="w-full h-auto"
        >
          <ZoomableGroup>
            <Geographies geography={MEXICO_ESTADOS_URL}>
              {({ geographies }) =>
                geographies.map(geo => {
                  const nombreGeo = geo.properties?.NOMGEO || geo.properties?.name || geo.properties?.NOMBRE || ""
                  const nombreHerstory = normalizarNombreEstado(nombreGeo)
                  const casos = casosPorEstado[nombreHerstory] ?? 0
                  return (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      onClick={() => onEstadoSelect(nombreHerstory)}
                      onMouseEnter={(e) => {
                        setHoveredEstado(nombreHerstory)
                        setTooltip({ x: e.clientX, y: e.clientY, text: `${nombreHerstory} — ${casos} caso${casos !== 1 ? "s" : ""}` })
                      }}
                      onMouseLeave={() => { setHoveredEstado(null); setTooltip(null) }}
                      onMouseMove={(e) => setTooltip(prev => prev ? { ...prev, x: e.clientX, y: e.clientY } : null)}
                      style={{
                        default: { fill: hoveredEstado === nombreHerstory ? "#ec4899" : getEstadoColor(nombreHerstory), stroke: "#ffffff", strokeWidth: 0.5, outline: "none", cursor: "pointer" },
                        hover: { fill: "#ec4899", stroke: "#ffffff", strokeWidth: 0.5, outline: "none", cursor: "pointer" },
                        pressed: { fill: "#db2777", outline: "none" },
                      }}
                    />
                  )
                })
              }
            </Geographies>
          </ZoomableGroup>
        </ComposableMap>
      )}

      {/* Vista municipal — proyección equirectangular directa, sin d3-geo */}
      {selectedEstado && municipioGeo && !loadingMunicipio && (
        <svg
          viewBox={`0 0 ${MAP_WIDTH} ${MAP_HEIGHT}`}
          className="w-full h-auto rounded-xl border border-border"
        >
          {municipioSvgPaths.map(({ d, nombre, cvegeo }) => {
            const casos = casosPorMunicipio[nombre] ?? 0
            return (
              <path
                key={cvegeo}
                d={d}
                fill={hoveredMunicipio === nombre ? "#ec4899" : getMunicipioColor(nombre)}
                stroke="#7c3aed"
                strokeWidth={0.8}
                style={{ cursor: "pointer", outline: "none" }}
                onMouseEnter={(e) => {
                  setHoveredMunicipio(nombre)
                  setTooltip({ x: e.clientX, y: e.clientY, text: casos > 0 ? `${nombre} — ${casos} caso${casos !== 1 ? "s" : ""}` : nombre })
                }}
                onMouseLeave={() => { setHoveredMunicipio(null); setTooltip(null) }}
                onMouseMove={(e) => setTooltip(prev => prev ? { ...prev, x: e.clientX, y: e.clientY } : null)}
              />
            )
          })}
        </svg>
      )}

      {/* Leyenda */}
      <div className="mt-4 flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
        {!selectedEstado ? (
          <>
            <span className="font-medium">Casos por estado:</span>
            <div className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-sm inline-block" style={{ background: "#e9d5ff" }} /> Pocos</div>
            <div className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-sm inline-block" style={{ background: "#a855f7" }} /> Medios</div>
            <div className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-sm inline-block" style={{ background: "#581c87" }} /> Muchos</div>
            <div className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-sm inline-block" style={{ background: "#e2e8f0" }} /> Sin casos</div>
          </>
        ) : (
          <>
            <span className="font-medium">Municipios con casos:</span>
            <div className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-sm inline-block" style={{ background: "#c084fc" }} /> 1 caso</div>
            <div className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-sm inline-block" style={{ background: "#7e22ce" }} /> 3+ casos</div>
            <div className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-sm inline-block" style={{ background: "#ddd6fe" }} /> Sin casos</div>
          </>
        )}
      </div>
    </div>
  )
}