import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer"
import { GUIA_COLECTIVOS } from "@/data/guia-colectivos"

const C = {
  morado: "#4c1d95",
  moradoOscuro: "#1e1b4b",
  moradoMedio: "#5b21b6",
  moradoClaro: "#7c3aed",
  lila: "#ede9fe",
  lilaTexto: "#6d28d9",
  rosa: "#831843",
  rosaMedio: "#9d174d",
  rosaClaro: "#fdf4ff",
  rosaBorde: "#e9d5ff",
  gris: "#6b7280",
  grisClaro: "#f8fafc",
  blanco: "#ffffff",
  rojo: "#f43f5e",
  rojoBg: "#fff1f2",
  rojoBorde: "#fecaca",
  rojoTexto: "#881337",
  verdeBox: "#f5f3ff",
  verdeBorde: "#7c3aed",
}

const headerColors = [
  C.morado, C.rosa, C.moradoMedio, C.rosaMedio,
  C.morado, C.rosa, C.moradoMedio,
]

const s = StyleSheet.create({
  page: {
    fontFamily: "Helvetica",
    backgroundColor: C.grisClaro,
    paddingBottom: 55,
  },

  // ── Footer ──
  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: C.moradoOscuro,
    paddingHorizontal: 36,
    paddingVertical: 9,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  footerLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  footerLogo: {
    fontSize: 9,
    fontFamily: "Helvetica-Bold",
    color: "#a78bfa",
  },
  footerDot: { fontSize: 9, color: "#4c1d95" },
  footerFrase: {
    fontSize: 7,
    color: "#7c3aed",
    fontFamily: "Helvetica-Oblique",
  },
  footerPage: {
    fontSize: 9,
    fontFamily: "Helvetica-Bold",
    color: "#c4b5fd",
  },

  // ── Portada ──
  portada: {
    backgroundColor: C.moradoOscuro,
    flex: 1,
    paddingHorizontal: 48,
    paddingTop: 60,
    paddingBottom: 40,
    justifyContent: "space-between",
  },
  portadaAccent1: {
    position: "absolute",
    top: -40,
    right: -40,
    width: 220,
    height: 220,
    borderRadius: 110,
    backgroundColor: C.moradoClaro,
    opacity: 0.15,
  },
  portadaAccent2: {
    position: "absolute",
    bottom: 60,
    left: -30,
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: "#db2777",
    opacity: 0.1,
  },
  portadaTag: {
    fontSize: 8,
    fontFamily: "Helvetica-Bold",
    color: "#c4b5fd",
    letterSpacing: 2,
    textTransform: "uppercase",
    marginBottom: 16,
  },
  portadaTitulo: {
    fontSize: 30,
    fontFamily: "Helvetica-Bold",
    color: C.blanco,
    lineHeight: 1.2,
    marginBottom: 14,
    maxWidth: 440,
  },
  portadaSubtitulo: {
    fontSize: 13,
    color: "#e9d5ff",
    lineHeight: 1.5,
    marginBottom: 32,
  },
  portadaDivisor: {
    height: 1,
    backgroundColor: "#3b1f8c",
    marginBottom: 20,
  },
  portadaMeta: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  portadaMetaBadge: {
    backgroundColor: "#2d1b69",
    borderRadius: 4,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderWidth: 1,
    borderColor: "#4c1d95",
  },
  portadaMetaText: {
    fontSize: 9,
    fontFamily: "Helvetica-Bold",
    color: "#a78bfa",
  },
  portadaBottom: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  portadaFrase: {
    fontSize: 10,
    color: "#c4b5fd",
    fontFamily: "Helvetica-Oblique",
    maxWidth: 300,
    lineHeight: 1.5,
  },
  portadaYear: {
    fontSize: 32,
    fontFamily: "Helvetica-Bold",
    color: "#2d1b69",
  },

  // ── Aviso ──
  avisoPage: {
    paddingHorizontal: 40,
    paddingTop: 36,
  },
  aviso: {
    backgroundColor: C.rosaClaro,
    borderLeftWidth: 4,
    borderLeftColor: "#f472b6",
    borderRadius: 6,
    padding: 16,
    marginBottom: 24,
  },
  avisoTitulo: {
    fontSize: 10,
    fontFamily: "Helvetica-Bold",
    color: "#86198f",
    letterSpacing: 1,
    textTransform: "uppercase",
    marginBottom: 6,
  },
  avisoTexto: {
    fontSize: 10,
    color: "#701a75",
    lineHeight: 1.6,
  },

  // ── Sección (una por página) ──
  seccionPage: {
    paddingHorizontal: 36,
    paddingTop: 24,
  },
  seccionHeader: {
    borderRadius: 8,
    paddingHorizontal: 18,
    paddingVertical: 14,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 20,
  },
  seccionNumBadge: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "rgba(255,255,255,0.15)",
    alignItems: "center",
    justifyContent: "center",
  },
  seccionNum: {
    fontSize: 12,
    fontFamily: "Helvetica-Bold",
    color: C.blanco,
  },
  seccionTitulo: {
    fontSize: 16,
    fontFamily: "Helvetica-Bold",
    color: C.blanco,
    flex: 1,
  },
  seccionDesc: {
    fontSize: 9,
    color: C.gris,
    lineHeight: 1.5,
    marginBottom: 14,
    paddingLeft: 4,
    borderLeftWidth: 2,
    borderLeftColor: "#e9d5ff",
  },

  // ── Pasos ──
  pasosLabel: {
    fontSize: 8,
    fontFamily: "Helvetica-Bold",
    color: C.moradoClaro,
    letterSpacing: 1.5,
    textTransform: "uppercase",
    marginBottom: 12,
    paddingBottom: 5,
    borderBottomWidth: 1,
    borderBottomColor: "#ede9fe",
  },
  paso: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 8,
  },
  pasoBullet: {
    width: 20,
    height: 20,
    borderRadius: 4,
    backgroundColor: C.lila,
    borderWidth: 1,
    borderColor: "#c4b5fd",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    marginTop: 1,
  },
  pasoBulletText: {
    fontSize: 8,
    fontFamily: "Helvetica-Bold",
    color: C.lilaTexto,
  },
  pasoContent: { flex: 1 },
  pasoTitulo: {
    fontSize: 9,
    fontFamily: "Helvetica-Bold",
    color: C.moradoOscuro,
    marginBottom: 2,
  },
  pasoTexto: {
    fontSize: 8,
    color: C.gris,
    lineHeight: 1.5,
  },

  divisor: {
    height: 1,
    backgroundColor: "#f3e8ff",
    marginVertical: 10,
  },

  // ── Ley ──
  leyBox: {
    backgroundColor: "#f5f3ff",
    borderLeftWidth: 3,
    borderLeftColor: C.moradoClaro,
    borderRadius: 5,
    padding: 9,
    marginBottom: 8,
  },
  leyLabel: {
    fontSize: 8,
    fontFamily: "Helvetica-Bold",
    color: "#5b21b6",
    letterSpacing: 1,
    textTransform: "uppercase",
    marginBottom: 5,
  },
  leyTexto: {
    fontSize: 8,
    color: C.morado,
    lineHeight: 1.5,
  },

  // ── Errores ──
  erroresBox: {
    backgroundColor: C.rojoBg,
    borderLeftWidth: 3,
    borderLeftColor: C.rojo,
    borderRadius: 5,
    padding: 9,
  },
  erroresLabel: {
    fontSize: 8,
    fontFamily: "Helvetica-Bold",
    color: "#be123c",
    letterSpacing: 1,
    textTransform: "uppercase",
    marginBottom: 8,
  },
  error: {
    flexDirection: "row",
    gap: 6,
    marginBottom: 6,
  },
  errorBullet: {
    fontSize: 9,
    fontFamily: "Helvetica-Bold",
    color: C.rojo,
    flexShrink: 0,
  },
  errorTexto: {
    fontSize: 8,
    color: C.rojoTexto,
    lineHeight: 1.45,
    flex: 1,
  },

  // ── Recursos ──
  recursosPage: {
    paddingHorizontal: 40,
    paddingTop: 32,
  },
  recursosPageTitle: {
    fontSize: 20,
    fontFamily: "Helvetica-Bold",
    color: C.moradoOscuro,
    marginBottom: 6,
  },
  recursosPageSubtitle: {
    fontSize: 10,
    color: C.gris,
    marginBottom: 20,
    lineHeight: 1.5,
  },
  recursosGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginBottom: 28,
  },
  recursoCard: {
    width: "48%",
    backgroundColor: C.blanco,
    borderRadius: 7,
    padding: 12,
    borderWidth: 1,
    borderColor: C.rosaBorde,
    borderLeftWidth: 3,
    borderLeftColor: C.moradoClaro,
  },
  recursoTipo: {
    fontSize: 7,
    fontFamily: "Helvetica-Bold",
    color: "#a855f7",
    letterSpacing: 1,
    textTransform: "uppercase",
    marginBottom: 4,
  },
  recursoNombre: {
    fontSize: 10,
    fontFamily: "Helvetica-Bold",
    color: C.moradoOscuro,
    marginBottom: 5,
  },
  recursoDato: {
    fontSize: 11,
    fontFamily: "Helvetica-Bold",
    color: C.moradoClaro,
  },

  // ── Fuentes ──
  fuentesTitle: {
    fontSize: 14,
    fontFamily: "Helvetica-Bold",
    color: C.moradoOscuro,
    marginBottom: 12,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#e9d5ff",
  },
  fuente: {
    flexDirection: "row",
    gap: 8,
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderBottomColor: "#f3e8ff",
  },
  fuenteBullet: {
    fontSize: 9,
    color: "#a855f7",
    flexShrink: 0,
  },
  fuenteNombre: {
    fontSize: 9,
    color: C.morado,
    flex: 1,
    lineHeight: 1.5,
  },

  // ── Cierre ──
  cierrePage: {
    flex: 1,
    backgroundColor: C.moradoOscuro,
    paddingHorizontal: 48,
    paddingTop: 60,
    justifyContent: "center",
    alignItems: "center",
  },
  cierreAccent: {
    position: "absolute",
    top: 20,
    right: 20,
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: C.moradoClaro,
    opacity: 0.08,
  },
  cierreTitulo: {
    fontSize: 32,
    fontFamily: "Helvetica-Bold",
    color: C.blanco,
    textAlign: "center",
    marginBottom: 16,
    letterSpacing: 2,
  },
  cierreLinea: {
    height: 2,
    width: 60,
    backgroundColor: "#7c3aed",
    marginBottom: 20,
  },
  cierreTexto: {
    fontSize: 12,
    color: "#c4b5fd",
    textAlign: "center",
    lineHeight: 1.7,
    marginBottom: 24,
    maxWidth: 380,
  },
  cierreFrase: {
    fontSize: 13,
    fontFamily: "Helvetica-BoldOblique",
    color: "#f0abfc",
    textAlign: "center",
    maxWidth: 360,
    lineHeight: 1.5,
  },
  cierreBuap: {
    marginTop: 32,
    fontSize: 9,
    color: "#4c1d95",
    textAlign: "center",
    letterSpacing: 1,
    textTransform: "uppercase",
  },
})

// ── Footer reutilizable ──
const Footer = () => (
  <View style={s.footer} fixed>
    <View style={s.footerLeft}>
      <Text style={s.footerLogo}>HerStory</Text>
      <Text style={s.footerDot}>·</Text>
      <Text style={s.footerFrase}>
        Ninguna historia se pierde, ninguna desaparicion sin buscar
      </Text>
    </View>
    <Text
      style={s.footerPage}
      render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`}
    />
  </View>
)

export const GuiaPDF = () => (
  <Document
    title={GUIA_COLECTIVOS.meta.titulo}
    author="HerStory"
    subject={GUIA_COLECTIVOS.meta.subtitulo}
    creator="HerStory — BUAP Infomatrix 2026"
  >

    {/* ── PÁGINA 1: PORTADA ── */}
    <Page size="A4" style={s.page}>
      <View style={s.portada}>
        <View style={s.portadaAccent1} />
        <View style={s.portadaAccent2} />

        <View>
          <Text style={s.portadaTag}>HerStory · Manual Tactico · 2026</Text>
          <Text style={s.portadaTitulo}>{GUIA_COLECTIVOS.meta.titulo}</Text>
          <Text style={s.portadaSubtitulo}>{GUIA_COLECTIVOS.meta.subtitulo}</Text>
          <View style={s.portadaDivisor} />
          <View style={s.portadaMeta}>
            <View style={s.portadaMetaBadge}>
              <Text style={s.portadaMetaText}>
                {GUIA_COLECTIVOS.secciones.length} Modulos
              </Text>
            </View>
            <View style={s.portadaMetaBadge}>
              <Text style={s.portadaMetaText}>
                {GUIA_COLECTIVOS.recursos.length} Contactos
              </Text>
            </View>
            <View style={s.portadaMetaBadge}>
              <Text style={s.portadaMetaText}>
                {GUIA_COLECTIVOS.meta.fuentes.length} Fuentes verificadas
              </Text>
            </View>
            <View style={s.portadaMetaBadge}>
              <Text style={s.portadaMetaText}>BUAP · Infomatrix 2026</Text>
            </View>
          </View>
        </View>

        <View style={s.portadaBottom}>
          <Text style={s.portadaFrase}>
            "La etica no limita la tecnologia: la dirige."
          </Text>
          <Text style={s.portadaYear}>2026</Text>
        </View>
      </View>
      <Footer />
    </Page>

    {/* ── PÁGINA 2: AVISO + ÍNDICE ── */}
    <Page size="A4" style={s.page}>
      <View style={s.avisoPage}>

        <Text style={[s.recursosPageTitle, { marginBottom: 16 }]}>
          Como usar esta guia
        </Text>

        <View style={s.aviso}>
          <Text style={s.avisoTitulo}>Informacion importante</Text>
          <Text style={s.avisoTexto}>
            {GUIA_COLECTIVOS.meta.descripcion} Esta guia no reemplaza el
            acompanamiento juridico especializado. Ante cualquier situacion de riesgo,
            contacta inmediatamente a las autoridades o una organizacion de derechos humanos.
          </Text>
        </View>

        {/* Índice visual */}
        <Text style={[s.pasosLabel, { marginBottom: 14 }]}>
          Contenido de esta guia
        </Text>
        {GUIA_COLECTIVOS.secciones.map((sec, i) => (
          <View
            key={sec.id}
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 12,
              paddingVertical: 8,
              paddingHorizontal: 12,
              marginBottom: 6,
              backgroundColor: i % 2 === 0 ? "#faf7ff" : C.blanco,
              borderRadius: 6,
              borderWidth: 1,
              borderColor: "#f3e8ff",
            }}
          >
            <View style={{
              width: 22,
              height: 22,
              borderRadius: 11,
              backgroundColor: headerColors[i % headerColors.length],
              alignItems: "center",
              justifyContent: "center",
            }}>
              <Text style={{ fontSize: 9, fontFamily: "Helvetica-Bold", color: C.blanco }}>
                {i + 1}
              </Text>
            </View>
            <Text style={{ fontSize: 10, fontFamily: "Helvetica-Bold", color: C.moradoOscuro, flex: 1 }}>
              {sec.titulo}
            </Text>
            <Text style={{ fontSize: 8, color: C.gris }}>
              {sec.pasos.length} pasos
            </Text>
          </View>
        ))}
      </View>
      <Footer />
    </Page>

    {/* ── UNA PÁGINA POR SECCIÓN ── */}
    {GUIA_COLECTIVOS.secciones.map((seccion, i) => (
      <Page key={seccion.id} size="A4" style={s.page}>
        <View style={s.seccionPage}>

          {/* Header */}
          <View style={[s.seccionHeader, { backgroundColor: headerColors[i % headerColors.length] }]}>
            <View style={s.seccionNumBadge}>
              <Text style={s.seccionNum}>{i + 1}</Text>
            </View>
            <Text style={s.seccionTitulo}>{seccion.titulo}</Text>
          </View>

          {/* Descripción */}
          <Text style={s.seccionDesc}>{seccion.descripcion}</Text>

          {/* Pasos */}
          <Text style={s.pasosLabel}>Ruta de accion</Text>
          {seccion.pasos.map((paso, j) => (
            <View key={j} style={s.paso}>
              <View style={s.pasoBullet}>
                <Text style={s.pasoBulletText}>{j + 1}</Text>
              </View>
              <View style={s.pasoContent}>
                <Text style={s.pasoTitulo}>{paso.titulo}</Text>
                <Text style={s.pasoTexto}>{paso.contenido}</Text>
              </View>
            </View>
          ))}

          <View style={s.divisor} />

          {/* Ley */}
          <View style={s.leyBox}>
            <Text style={s.leyLabel}>Tu respaldo legal</Text>
            <Text style={s.leyTexto}>{seccion.queDiceLaLey}</Text>
          </View>

          {/* Errores */}
          <View style={[s.erroresBox, { marginTop: 10 }]}>
            <Text style={s.erroresLabel}>Alertas y errores criticos</Text>
            {seccion.erroresComunes.map((error, j) => (
              <View key={j} style={s.error}>
                <Text style={s.errorBullet}>x</Text>
                <Text style={s.errorTexto}>{error}</Text>
              </View>
            ))}
          </View>

        </View>
        <Footer />
      </Page>
    ))}

    {/* ── PÁGINA RECURSOS ── */}
    <Page size="A4" style={s.page}>
      <View style={s.recursosPage}>

        <Text style={s.recursosPageTitle}>Directorio de emergencia</Text>
        <Text style={s.recursosPageSubtitle}>
          Guarda este directorio. Estos contactos pueden ser determinantes
          en los momentos mas criticos de la busqueda.
        </Text>

        <View style={s.recursosGrid}>
          {GUIA_COLECTIVOS.recursos.map((recurso, i) => (
            <View key={i} style={s.recursoCard}>
              <Text style={s.recursoTipo}>
                {recurso.tipo === "telefono" ? "Telefono" :
                 recurso.tipo === "email" ? "Correo" : "Web"}
              </Text>
              <Text style={s.recursoNombre}>{recurso.nombre}</Text>
              <Text style={s.recursoDato}>{recurso.dato}</Text>
            </View>
          ))}
        </View>

      </View>
      <Footer />
    </Page>

    {/* ── PÁGINA CIERRE ── */}
    <Page size="A4" style={[s.page, { paddingBottom: 0 }]}>
      <View style={s.cierrePage}>
        <View style={s.cierreAccent} />
        <Text style={s.cierreTitulo}>HerStory</Text>
        <View style={s.cierreLinea} />
        <Text style={s.cierreTexto}>
          Construido por mujeres, para mujeres.{"\n"}
          Tecnologia creada para que ninguna historia se pierda{"\n"}
          y ninguna desaparicion se quede sin buscar.
        </Text>
        <Text style={s.cierreFrase}>
          "La etica no limita la tecnologia: la dirige."
        </Text>
        <Text style={s.cierreBuap}>
          Benemerita Universidad Autonoma de Puebla · Infomatrix 2026
        </Text>
      </View>
      <Footer />
    </Page>

  </Document>
)