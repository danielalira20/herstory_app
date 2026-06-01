import { useEffect, useRef } from "react"
import { Link } from "react-router-dom"
import NavbarWrapper from "@/components/NavbarWrapper"
import { Heart, ArrowLeft, Search, BookOpen, Mic, Users } from "lucide-react"
import headerImage from "@/assets/herstory-header.jpg"
import { RECONOCIMIENTO } from "@/data/reconocimiento"

import g1 from "@/assets/reconocimiento/gallery-1.jpg"
import g2 from "@/assets/reconocimiento/gallery-2.jpg"
import g3 from "@/assets/reconocimiento/gallery-3.jpg"
import g4 from "@/assets/reconocimiento/gallery-4.jpg"
// ─────────────────────────────────────────
// Hook animaciones scroll
// ─────────────────────────────────────────
const useScrollAnimation = () => {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible")
          }
        })
      },
      { threshold: 0.1 }
    )
    const elements = ref.current?.querySelectorAll(".reveal")
    elements?.forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])
  return ref
}

// ─────────────────────────────────────────
// Parsear texto en párrafos
// ─────────────────────────────────────────
const parseParagraphs = (text: string) =>
  text.split("\n\n").map(p => p.trim()).filter(Boolean)

// ─────────────────────────────────────────
// Datos estructurados desde reconocimiento.ts
// ─────────────────────────────────────────

// Párrafos de buscadoras
const parrafosBuscadoras = parseParagraphs(RECONOCIMIENTO.es.buscadoras)
// [0] = "Este proyecto tiene nombre..."
// [1] = "En las que madrugan..."
// [2] = "Ustedes nos enseñaron..."
// [3] = "HerStory existe porque..."
// [4] = "Cada función de esta plataforma..."
// [5] = "No somos expertas..."

// Citas extraídas del texto
const citas = [
  "Buscar es un acto de amor que no caduca.",
  "HerStory existe porque ustedes existen.",
  "Somos estudiantes de su valentía.",
]

// Legado — extraído del párrafo [4]
const legacyItems = [
  {
    emoji: "",
    title: "Mapa de personas desaparecidas",
    desc: "El mapa que muestra dónde están las que faltan — es por ustedes.",
  },
  {
    emoji: "",
    title: "Verificación con inteligencia artificial",
    desc: "Para que ninguna desaparezca dos veces, primero en la vida y luego en los registros.",
  },
  {
    emoji: "",
    title: "Espacio para colectivos",
    desc: "Porque su trabajo merece ser visto, reconocido y apoyado.",
  },
  {
    emoji: "",
    title: "Auren",
    desc: "Que escucha sin juzgar — porque aprendimos de ustedes que acompañar es también una forma de buscar.",
  },
]

// Ecosistema — parseado línea por línea
const ecosistemaIcons = [BookOpen, Mic, Users, Search]
const ecosistemaLineas = RECONOCIMIENTO.es.ecosistema
  .split("\n")
  .filter(l => l.startsWith("A "))
  .map((l, i) => ({
    icon: ecosistemaIcons[i % ecosistemaIcons.length],
    texto: l
  }))

const muralWords = [
  "Memoria", "Justicia", "Verdad", "Esperanza", "Amor",
  "Resistencia", "Búsqueda", "Dignidad", "Ternura",
  "Coraje", "Comunidad", "Presencia",
]

const galleryItems = [
  {
    img: g1,
    name: "Madres en marcha",
    text: "Cada paso es una pregunta, cada pregunta una semilla.",
  },
  {
    img: g2,
    name: "Colectivos hermanos",
    text: "Donde una busca, todas acompañamos.",
  },
  {
    img: g3,
    name: "Memoria viva",
    text: "Sus rostros nos enseñan a no rendirnos.",
  },
  {
    img: g4,
    name: "Velas y flores",
    text: "Una luz que se enciende cuando otra se cansa.",
  },
]


// ─────────────────────────────────────────
// COMPONENTE
// ─────────────────────────────────────────
const Reconocimiento = () => {
  const ref = useScrollAnimation()

  return (
    <main className="min-h-screen bg-background text-foreground antialiased overflow-x-hidden">
       <div className="fixed top-0 left-0 right-0 z-50">
            <NavbarWrapper />
        </div>
      {/* ── HERO ── */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        <img
          src={headerImage}
          alt="Buscadoras"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(135deg, rgba(46,16,101,0.88) 0%, rgba(88,28,135,0.78) 50%, rgba(126,34,206,0.72) 100%)"
          }}
        />

        {/* Partículas */}
        <div className="pointer-events-none absolute inset-0">
          {Array.from({ length: 18 }).map((_, i) => (
            <span
              key={i}
              className="absolute block rounded-full bg-white/70 animate-float"
              style={{
                width: `${2 + (i % 4)}px`,
                height: `${2 + (i % 4)}px`,
                left: `${(i * 53) % 100}%`,
                top: `${(i * 37) % 100}%`,
                animationDelay: `${i * 0.4}s`,
                animationDuration: `${5 + (i % 5)}s`,
                boxShadow: "0 0 8px rgba(216,180,254,0.8)"
              }}
            />
          ))}
        </div>

        <div className="relative z-10 mx-auto max-w-4xl px-6 text-center space-y-8">
          <span className="inline-flex items-center gap-2 glass rounded-full px-5 py-2 text-xs uppercase tracking-widest text-white/90">
            <span className="h-1.5 w-1.5 rounded-full bg-purple-300" />
            Un homenaje
          </span>
          <h1
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white leading-tight"
            style={{ fontFamily: "Playfair Display, serif" }}
          >
            Este proyecto existe
            <br />
            <em className="font-normal italic text-purple-300">
              gracias a ustedes.
            </em>
          </h1>
          <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto leading-relaxed">
            Un homenaje a quienes transformaron el amor en búsqueda, memoria y resistencia.
          </p>
          <div className="flex flex-col items-center gap-2 text-white/60 pt-4">
           
            <span className="h-12 w-px bg-gradient-to-b from-white/50 to-transparent" />
          </div>
        </div>
      </section>

      {/* ── CONTENIDO ── */}
      <div ref={ref}>

        {/* ── CARTA ABIERTA ── */}
        <section className="relative py-32 px-6 overflow-hidden">
          <div className="absolute -left-32 top-20 h-96 w-96 rounded-full bg-purple-200/20 blur-3xl pointer-events-none" />
          <div className="absolute -right-32 bottom-20 h-96 w-96 rounded-full bg-pink-200/20 blur-3xl pointer-events-none" />

          <article className="relative mx-auto max-w-3xl">

            {/* Título sección */}
            <header className="reveal opacity-0 translate-y-10 transition-all duration-700 mb-16 text-center space-y-4">
              
              <h2
                className="text-4xl md:text-5xl lg:text-6xl font-bold"
                style={{ fontFamily: "Playfair Display, serif" }}
              >
                Para quienes nunca dejaron
                <br />
                <em className="text-primary font-normal">de buscar.</em>
              </h2>
            </header>

            <div className="space-y-10 text-lg leading-[1.85] text-foreground/80">

              {/* Párrafo 0 — apertura con letra capitular */}
              <p
                className="reveal opacity-0 translate-y-10 transition-all duration-700"
                style={{ transitionDelay: "100ms" }}
              >
                <span
                  className="float-left mr-3 font-bold text-primary leading-none"
                  style={{
                    fontFamily: "Playfair Display, serif",
                    fontSize: "5rem",
                    lineHeight: "0.85"
                  }}
                >
                  E
                </span>
                ste proyecto tiene nombre de mujer porque fue construido pensando en ustedes.
              </p>

              {/* Párrafo 1 — las que... */}
              <p
                className="reveal opacity-0 translate-y-10 transition-all duration-700 whitespace-pre-line"
                style={{ transitionDelay: "200ms" }}
              >
                {parrafosBuscadoras[1]}
              </p>

              {/* Cita 1 */}
              <blockquote
                className="reveal opacity-0 translate-y-10 transition-all duration-700 my-10 border-l-4 border-primary pl-8"
                style={{ transitionDelay: "300ms" }}
              >
                <p
                  className="text-2xl md:text-3xl italic text-primary leading-snug"
                  style={{ fontFamily: "Playfair Display, serif" }}
                >
                  "{citas[0]}"
                </p>
              </blockquote>

              {/* Párrafo 2 — ustedes nos enseñaron */}
              <p
                className="reveal opacity-0 translate-y-10 transition-all duration-700 whitespace-pre-line"
                style={{ transitionDelay: "400ms" }}
              >
                {parrafosBuscadoras[2]}
              </p>

              {/* Cita 2 */}
              <blockquote
                className="reveal opacity-0 translate-y-10 transition-all duration-700 my-10 border-l-4 border-primary pl-8"
                style={{ transitionDelay: "500ms" }}
              >
                <p
                  className="text-2xl md:text-3xl italic text-primary leading-snug"
                  style={{ fontFamily: "Playfair Display, serif" }}
                >
                  "{citas[1]}"
                </p>
              </blockquote>

              {/* Cita 3 */}
              <blockquote
                className="reveal opacity-0 translate-y-10 transition-all duration-700 my-10 border-l-4 border-primary pl-8"
                style={{ transitionDelay: "600ms" }}
              >
                <p
                  className="text-2xl md:text-3xl italic text-primary leading-snug"
                  style={{ fontFamily: "Playfair Display, serif" }}
                >
                  "{citas[2]}"
                </p>
              </blockquote>

              {/* Firma */}
              <p
                className="reveal opacity-0 translate-y-10 transition-all duration-700 pt-4 text-2xl italic text-primary"
                style={{
                  fontFamily: "Playfair Display, serif",
                  transitionDelay: "700ms"
                }}
              >
                — Con admiración, el equipo de HerStory.
              </p>

            </div>
          </article>
        </section>

        {/* ── GALERÍA ── */}
            <section className="relative py-32 px-6 bg-muted/30">
            <div className="mx-auto max-w-7xl">

                {/* Header */}
                <div className="reveal opacity-0 translate-y-10 transition-all duration-700 mb-16 flex flex-col md:flex-row items-start md:items-end justify-between gap-6">
                <div className="max-w-xl space-y-4">
                    <span className="text-xs uppercase tracking-widest text-primary/60 font-medium">
                    Galería de reconocimiento
                    </span>
                    <h2
                    className="text-4xl md:text-5xl lg:text-6xl font-bold"
                    style={{ fontFamily: "Playfair Display, serif" }}
                    >
                    Rostros, manos, presencias.
                    </h2>
                </div>
                <p className="max-w-sm text-base leading-relaxed text-muted-foreground">
                    Cada una es un fragmento de una historia que sigue escribiéndose.
                </p>
                </div>

                {/* Grid de fotos */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {galleryItems.map((item, i) => (
                    <figure
                    key={item.name}
                    className="reveal opacity-0 translate-y-10 transition-all duration-700 group relative aspect-[3/4] overflow-hidden rounded-2xl shadow-elegant cursor-pointer"
                    style={{
                        marginTop: i % 2 === 1 ? "2.5rem" : "0",
                        transitionDelay: `${i * 120}ms`
                    }}
                    >
                    <img
                        src={item.img}
                        alt={item.name}
                        loading="lazy"
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-110"
                    />
                    {/* Overlay gradiente */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                    {/* Caption */}
                    <figcaption className="absolute inset-x-0 bottom-0 p-6 text-white">
                        <h3
                        className="text-2xl italic"
                        style={{ fontFamily: "Playfair Display, serif" }}
                        >
                        {item.name}
                        </h3>
                        <p className="mt-2 text-sm leading-relaxed text-white/90 opacity-0 max-h-0 overflow-hidden group-hover:opacity-100 group-hover:max-h-20 transition-all duration-500">
                        {item.text}
                        </p>
                    </figcaption>
                    </figure>
                ))}
                </div>

            </div>
            </section>
        {/* ── LEGADO ── */}
        <section className="relative py-32 px-6 bg-muted/30">
          <div className="mx-auto max-w-5xl">
            <div className="reveal opacity-0 translate-y-10 transition-all duration-700 mb-20 text-center space-y-4">
              <span className="text-xs uppercase tracking-widest text-primary/60 font-medium">
                El impacto de su legado
              </span>
              <h2
                className="text-4xl md:text-5xl lg:text-6xl font-bold"
                style={{ fontFamily: "Playfair Display, serif" }}
              >
                Cada función de HerStory
                <br />
                <em className="text-primary font-normal">nace de su enseñanza.</em>
              </h2>
            </div>

            {/* Timeline */}
            <div className="relative">
              <div className="hidden md:block absolute left-1/2 top-0 h-full w-px bg-gradient-to-b from-transparent via-primary/30 to-transparent" />
              <ul className="space-y-10">
                {legacyItems.map((item, i) => (
                  <li
                    key={item.title}
                    className="reveal opacity-0 translate-y-10 transition-all duration-700 relative md:grid md:grid-cols-2 md:gap-12"
                    style={{ transitionDelay: `${i * 150}ms` }}
                  >
                    <div className={i % 2 === 1 ? "md:order-2" : ""}>
                      <div className="glass-card hover:-translate-y-1 transition-transform duration-300">
                        <div className="mb-4 text-4xl">{item.emoji}</div>
                        <h3
                          className="mb-3 text-2xl font-bold"
                          style={{ fontFamily: "Playfair Display, serif" }}
                        >
                          {item.title}
                        </h3>
                        <p className="text-muted-foreground leading-relaxed">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                    <div className="hidden md:block" />
                    <span className="hidden md:block absolute left-1/2 top-8 h-3 w-3 -translate-x-1/2 rounded-full bg-primary ring-4 ring-background" />
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ── ECOSISTEMA ── */}
        <section className="py-32 px-6">
          <div className="mx-auto max-w-4xl space-y-16">
            <div className="reveal opacity-0 translate-y-10 transition-all duration-700 text-center space-y-4">
              <span className="text-xs uppercase tracking-widest text-primary/60 font-medium">
                Con gratitud
              </span>
              <h2
                className="text-4xl md:text-5xl lg:text-6xl font-bold"
                style={{ fontFamily: "Playfair Display, serif" }}
              >
                A quienes las acompañan
              </h2>
              <p className="text-muted-foreground max-w-xl mx-auto leading-relaxed">
                {RECONOCIMIENTO.es.ecosistema.split("\n\n")[0]}
              </p>
            </div>

            {/* Tarjetas ecosistema */}
            <div className="reveal opacity-0 translate-y-10 transition-all duration-700 grid grid-cols-1 sm:grid-cols-2 gap-5">
              {ecosistemaLineas.map((item, i) => (
                <div
                  key={i}
                  className="group rounded-2xl p-6 space-y-3 border border-border hover:border-primary/40 hover:shadow-glow transition-all duration-300"
                  style={{ transitionDelay: `${i * 80}ms` }}
                >
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <item.icon className="h-5 w-5 text-primary" />
                  </div>
                  <p className="text-sm text-foreground/80 leading-relaxed">{item.texto}</p>
                </div>
              ))}
            </div>

            {/* Cierre ecosistema */}
            <div className="reveal opacity-0 translate-y-10 transition-all duration-700 text-center space-y-3">
              {RECONOCIMIENTO.es.ecosistema
                .split("\n\n")
                .slice(-1)[0]
                .split("\n")
                .map((linea, i) => (
                  <p
                    key={i}
                    className={`leading-relaxed ${i === 0 ? "text-lg text-muted-foreground" : "text-xl font-medium"}`}
                  >
                    {linea}
                  </p>
                ))}
            </div>
          </div>
        </section>

        {/* ── MURAL DE PALABRAS ── */}
        <section className="py-24 px-6 bg-muted/30 overflow-hidden">
          <div className="mx-auto max-w-5xl text-center space-y-12">
            <div className="reveal opacity-0 translate-y-10 transition-all duration-700 space-y-4">
              <span className="text-xs uppercase tracking-widest text-primary/60 font-medium">
                Mural de memoria
              </span>
              <h2
                className="text-4xl md:text-5xl font-bold"
                style={{ fontFamily: "Playfair Display, serif" }}
              >
                Palabras que ustedes
                <br />
                <em className="text-primary font-normal">nos enseñaron a sostener.</em>
              </h2>
            </div>

            <div className="reveal opacity-0 translate-y-10 transition-all duration-700 flex flex-wrap items-center justify-center gap-x-8 gap-y-5">
              {muralWords.map((word, i) => (
                <span
                  key={word}
                  className="font-bold italic text-primary animate-float"
                  style={{
                    fontFamily: "Playfair Display, serif",
                    fontSize: `${1.4 + ((i * 7) % 5) * 0.4}rem`,
                    opacity: 0.5 + ((i * 3) % 4) * 0.15,
                    animationDelay: `${i * 0.3}s`,
                    animationDuration: `${6 + (i % 4)}s`,
                  }}
                >
                  {word}
                </span>
              ))}
            </div>

            {/* Marquee */}
            <div className="reveal opacity-0 translate-y-10 transition-all duration-700 overflow-hidden">
              <div
                className="flex gap-10 whitespace-nowrap"
                style={{ animation: "marquee 25s linear infinite" }}
              >
                {[...muralWords, ...muralWords, ...muralWords].map((w, i) => (
                  <span
                    key={i}
                    className="text-xl italic text-muted-foreground/50"
                    style={{ fontFamily: "Playfair Display, serif" }}
                  >
                    · {w} ·
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── CIERRE ── */}
        <section
          className="relative py-32 px-6 overflow-hidden"
          style={{
            background: "linear-gradient(135deg, #1e1b4b 0%, #4c1d95 60%, #7e22ce 100%)"
          }}
        >
          <div className="pointer-events-none absolute inset-0">
            {Array.from({ length: 40 }).map((_, i) => (
              <span
                key={i}
                className="absolute block rounded-full bg-white animate-float"
                style={{
                  width: `${1 + (i % 3)}px`,
                  height: `${1 + (i % 3)}px`,
                  left: `${(i * 91) % 100}%`,
                  top: `${(i * 67) % 100}%`,
                  animationDelay: `${(i % 7) * 0.4}s`,
                  opacity: 0.5
                }}
              />
            ))}
          </div>

          <div className="relative mx-auto max-w-3xl text-center text-white space-y-8">
            <Heart className="h-10 w-10 text-pink-300 mx-auto animate-float" />
            <h2
              className="text-4xl md:text-5xl lg:text-7xl font-bold leading-tight"
              style={{ fontFamily: "Playfair Display, serif" }}
            >
              {RECONOCIMIENTO.es.cierre.split("\n")[0]}
              <br />
              <em className="font-normal text-purple-300">
                {RECONOCIMIENTO.es.cierre.split("\n")[1]}
              </em>
              <br />
              <span className="text-3xl md:text-4xl font-normal text-white/80">
                {RECONOCIMIENTO.es.cierre.split("\n")[2]}
              </span>
            </h2>
            <div className="h-px w-24 mx-auto bg-white/30" />
            <p
              className="text-xl italic text-white/80"
              style={{ fontFamily: "Playfair Display, serif" }}
            >
              {RECONOCIMIENTO.es.cierre.split("\n\n")[1]}
            </p>
          </div>
        </section>

      </div>

      {/* CSS animaciones */}
      <style>{`
        .reveal {
          transition: opacity 0.7s ease, transform 0.7s ease;
        }
        .reveal.visible {
          opacity: 1 !important;
          transform: translateY(0) !important;
        }
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.33%); }
        }
      `}</style>
    </main>
  )
}

export default Reconocimiento