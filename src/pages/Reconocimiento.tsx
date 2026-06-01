import NavbarWrapper from "@/components/NavbarWrapper"
import headerImage from "@/assets/herstory-header.jpg"
import { RECONOCIMIENTO } from "@/data/reconocimiento"
import { Heart } from "lucide-react"

const Reconocimiento = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="relative w-full h-48 overflow-hidden">
        <img src={headerImage} alt="HerStory" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">
              Reconocimiento
            </h1>
            <p className="text-lg italic">
              Este espacio es suyo. Siempre lo fue.
            </p>
          </div>
        </div>
      </div>
      <NavbarWrapper />

      <div className="container py-12 max-w-3xl mx-auto space-y-16">

        {/* ── Buscadoras ── */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <Heart className="h-6 w-6 text-primary shrink-0" />
            <h2 className="text-xl font-bold">A las buscadoras</h2>
          </div>
          <div className="prose prose-sm max-w-none">
            {RECONOCIMIENTO.es.buscadoras
              .split("\n\n")
              .map((parrafo, i) => (
                <p
                  key={i}
                  className="text-muted-foreground leading-relaxed mb-4 whitespace-pre-line"
                >
                  {parrafo}
                </p>
              ))}
          </div>
        </section>

        {/* Separador visual */}
        <div className="h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

        {/* ── Ecosistema ── */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <Heart className="h-6 w-6 text-primary shrink-0" />
            <h2 className="text-xl font-bold">A quienes las acompañan</h2>
          </div>
          <div>
            {RECONOCIMIENTO.es.ecosistema
              .split("\n\n")
              .map((parrafo, i) => (
                <p
                  key={i}
                  className="text-muted-foreground leading-relaxed mb-4 whitespace-pre-line"
                >
                  {parrafo}
                </p>
              ))}
          </div>
        </section>

        {/* Separador visual */}
        <div className="h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

        {/* ── Cierre ── */}
        <section className="text-center space-y-4 py-8">
          <p className="text-lg font-medium text-primary italic leading-relaxed">
            {RECONOCIMIENTO.es.cierre}
          </p>
        </section>

      </div>
    </div>
  )
}

export default Reconocimiento