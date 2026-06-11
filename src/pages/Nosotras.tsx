import { Heart, Target, Eye, Users, ArrowRight, Code2, Palette } from "lucide-react"
import { Button } from "@/components/ui/button"
import headerImage from "@/assets/herstory-header.jpg"
import NavbarWrapper from '@/components/NavbarWrapper'
import { useNavigate } from "react-router-dom"

const teamMembers = [
  {
    name: "Daniela Guadalupe Lira Huerta",
    role: "Desarrolladora Backend",
    roleIcon: Code2,
    description: "Estudiante de la FCC. Le gustan los gatos, Taylor Swift y el diseño. Creadora de Auren y backend del proyecto.",
    initials: "DL",
    color: { bg: "#581c87", text: "#F0ABFC" },
  },
  {
    name: "Jasmin Ixcheel Huerta Ramos",
    role: "Desarrolladora Backend",
    roleIcon: Code2,
    description: "Estudiante de la FCC. Le gusta Stray Kids, la coca cola y la programación. Encargada del backend del proyecto.",
    initials: "JH",
    color: { bg: "#831843", text: "#FBCFE8" },
  },
  {
    name: "Dafne Cirne Hernández",
    role: "Diseñadora Frontend",
    roleIcon: Palette,
    description: "Estudiante de la FCC. Le gusta el gym, el anime y el desarrollo web. Encargada del frontend del proyecto.",
    initials: "DC",
    color: { bg: "#1e1b4b", text: "#C7D2FE" },
  },
  {
    name: "Jessica Nahomi Corona Hernández",
    role: "Diseñadora Frontend",
    roleIcon: Palette,
    description: "Estudiante de la FCC. Le gusta Latin Mafia, Kenia OS y el desarrollo web. Encargada del frontend del proyecto.",
    initials: "JC",
    color: { bg: "#134e4a", text: "#99F6E4" },
  },
]

const valores = [
  {
    icon: Heart,
    titulo: "Empatía",
    desc: "Escuchamos con el corazón y comprendemos cada historia.",
    color: "#831843",
    bg: "#fdf2f8",
  },
  {
    icon: Users,
    titulo: "Comunidad",
    desc: "Fortalecemos lazos y construimos redes de apoyo.",
    color: "#581c87",
    bg: "#faf5ff",
  },
  {
    icon: Target,
    titulo: "Propósito",
    desc: "Cada acción tiene un impacto positivo y medible.",
    color: "#7e22ce",
    bg: "#f5f3ff",
  },
  {
    icon: Eye,
    titulo: "Transparencia",
    desc: "Operamos con honestidad y responsabilidad.",
    color: "#1e3a5f",
    bg: "#eff6ff",
  },
]

const Nosotras = () => {
  const navigate = useNavigate()

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
              HerStory · Nosotras
            </p>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight">
              Nosotras{" "}
              <span className="italic font-normal text-pink-200">somos</span>
            </h1>
            <p className="text-sm md:text-base text-white/70 max-w-md mx-auto">
              el equipo detras de Hersotry
            </p>
          </div>
        </div>
      </div>


      {/* ── Barra separadora ── */}
      <div className="h-1 w-full" style={{ background: "linear-gradient(90deg, #7e22ce, #ec4899, #7e22ce)" }} />

      <NavbarWrapper />

      {/* ── MISIÓN + VISIÓN — fondo claro en light, oscuro en dark ── */}
      <section className="relative overflow-hidden bg-card border-b border-border">
        <div className="pointer-events-none absolute -right-20 top-0 h-72 w-72 rounded-full opacity-5" style={{ background: "#ec4899" }} />
        <div className="mx-auto max-w-7xl px-5 lg:px-8 py-16 md:py-20 grid md:grid-cols-2 gap-0 divide-y md:divide-y-0 md:divide-x divide-border">

          {/* Misión */}
          <div className="pb-10 md:pb-0 md:pr-14">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl mb-6 bg-pink-100 dark:bg-pink-950/40">
              <Target className="h-6 w-6 text-pink-600 dark:text-pink-300" />
            </div>
            <p className="text-xs font-semibold uppercase tracking-widest mb-3 text-pink-600 dark:text-pink-300">
              Nuestra misión
            </p>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground leading-tight mb-5">
              Visibilizar, preservar<br />y honrar la memoria
            </h2>
            <p className="text-muted-foreground text-base leading-relaxed mb-5">
              HerStory nace para sacar del silencio a las mujeres históricamente
              invisibilizadas. A través de tecnología interactiva, creamos un espacio
              de denuncia, reflexión y aprendizaje.
            </p>
            <ul className="space-y-3">
              {[
                "Publicar y consultar casos en un foro comunitario",
                "Navegar un mapa interactivo de historias por estado",
                "Explorar un blog sobre mujeres ignoradas por la historia",
                "Acceder a juegos que fomentan el conocimiento de género",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-muted-foreground leading-relaxed">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full shrink-0 bg-pink-500" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Visión */}
          <div className="pt-10 md:pt-0 md:pl-14">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl mb-6 bg-purple-100 dark:bg-purple-950/40">
              <Eye className="h-6 w-6 text-purple-600 dark:text-purple-300" />
            </div>
            <p className="text-xs font-semibold uppercase tracking-widest mb-3 text-purple-600 dark:text-purple-300">
              Nuestra visión
            </p>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground leading-tight mb-5">
              La plataforma líder<br />en América Latina
            </h2>
            <p className="text-muted-foreground text-base leading-relaxed mb-8">
              Ser el referente de empoderamiento femenino digital, donde cada mujer
              tenga las herramientas, el apoyo y la confianza para contar su historia,
              reclamar su espacio y contribuir a un mundo más equitativo.
            </p>
            {/* Quote de impacto */}
            <div className="border-l-4 border-purple-500 pl-5">
              <p className="text-lg text-foreground italic leading-relaxed">
                "Transformando vidas,<br />cambiando el mundo."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── VALORES — franja de color, no cards flotantes ── */}
      <section className="border-y border-border bg-background">
        <div className="mx-auto max-w-7xl px-5 lg:px-8 py-16">
          <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-2 text-center">
            Lo que nos mueve
          </p>
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">
            Nuestros valores
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {valores.map(({ icon: Icon, titulo, desc, color, bg }) => (
              <div
                key={titulo}
                className="rounded-2xl p-6 flex flex-col gap-4 border border-border/60"
                style={{ background: bg }}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ background: color + "18" }}
                >
                  <Icon className="h-5 w-5" style={{ color }} />
                </div>
                <div>
                  <p className="font-semibold text-foreground mb-1">{titulo}</p>
                  <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── EQUIPO — cards con color por persona ── */}
      <section className="bg-background">
        <div className="mx-auto max-w-7xl px-5 lg:px-8 py-16 md:py-20">
          <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-2 text-center">
            Quiénes somos
          </p>
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">
            El equipo detrás del cambio
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {teamMembers.map((member) => {
              const RoleIcon = member.roleIcon
              return (
                <div
                  key={member.name}
                  className="rounded-2xl overflow-hidden border border-border/60 flex flex-col"
                >
                  {/* Franja de color superior con avatar e iniciales */}
                  <div
                    className="px-6 pt-8 pb-6 flex items-end gap-5"
                    style={{ background: member.color.bg }}
                  >
                    <div
                      className="w-16 h-16 rounded-2xl flex items-center justify-center text-xl font-bold shrink-0"
                      style={{ background: "rgba(255,255,255,0.12)", color: member.color.text }}
                    >
                      {member.initials}
                    </div>
                    <div>
                      <p className="font-bold text-white text-lg leading-tight">
                        {member.name}
                      </p>
                      <span
                        className="inline-flex items-center gap-1.5 text-xs font-semibold mt-2 px-3 py-1 rounded-full"
                        style={{ background: "rgba(255,255,255,0.12)", color: member.color.text }}
                      >
                        <RoleIcon className="h-3 w-3" />
                        {member.role}
                      </span>
                    </div>
                  </div>

                  {/* Contenido blanco */}
                  <div className="px-6 py-5 flex flex-col gap-4 bg-card flex-1">
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {member.description}
                    </p>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-fit gap-2 rounded-xl"
                      onClick={() => navigate("/contacto")}
                    >
                      Contactar <ArrowRight className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── CTA final ── */}
      <section
        className="relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, #1B0F33 0%, #4c1d95 55%, #7e22ce 100%)" }}
      >
        <div className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-white/10 blur-3xl" />
        <div className="mx-auto max-w-7xl px-5 lg:px-8 py-14 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="text-white text-center md:text-left">
            <h3 className="text-2xl md:text-3xl font-bold mb-2">
              ¿Tienes algo que decirnos?
            </h3>
            <p className="text-white/65 text-base">
              Estamos abiertas a escuchar, colaborar y crecer juntas.
            </p>
          </div>
          <Button
            size="lg"
            className="h-12 gap-2 rounded-xl bg-white px-8 text-base font-semibold text-[#1B0F33] hover:bg-white/90 shrink-0"
            onClick={() => navigate("/contacto")}
          >
            Contáctanos <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </section>

    </div>
  )
}

export default Nosotras