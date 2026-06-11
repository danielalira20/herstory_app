import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Mail, Phone, MapPin, Clock, Send, AlertTriangle, ArrowRight } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import headerImage from "@/assets/herstory-header.jpg"
import NavbarWrapper from '@/components/NavbarWrapper'

const Contacto = () => {
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    category: "",
    message: ""
  })

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await fetch("https://formspree.io/f/mwpnrkjr", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })
      if (response.ok) {
        toast({
          title: "¡Mensaje enviado!",
          description: "Te contactaremos pronto. Gracias por escribirnos.",
        })
        setFormData({ name: "", email: "", phone: "", subject: "", category: "", message: "" })
      } else {
        toast({
          title: "Error",
          description: "Hubo un problema al enviar tu mensaje. Intenta nuevamente.",
          variant: "destructive",
        })
      }
    } catch {
      toast({
        title: "Error",
        description: "No se pudo enviar el mensaje. Verifica tu conexión.",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="min-h-screen bg-background">

      {/* ── Hero ── */}
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
              HerStory · Contacto
            </p>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight">
              Contactanos{" "}
              <span className="italic font-normal text-pink-200">Siempre</span>
            </h1>
            <p className="text-sm md:text-base text-white/70 max-w-md mx-auto">
              Estamos aqui para escucharte 
            </p>
          </div>
        </div>
      </div>


      {/* ── Barra separadora ── */}
      <div className="h-1 w-full" style={{ background: "linear-gradient(90deg, #7e22ce, #ec4899, #7e22ce)" }} />

      <NavbarWrapper />

      {/* ── Contenido principal ── */}
      <div className="mx-auto max-w-7xl px-5 lg:px-8 py-12 grid lg:grid-cols-3 gap-10">

        {/* Columna izquierda */}
        <div className="space-y-6">

          {/* Datos de contacto */}
          <div className="rounded-2xl border border-border bg-card px-5 py-5 space-y-4">
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Información de contacto
            </p>
            {[
              { icon: Mail,   label: "Email",    value: "herstoryy2025@gmail.com" },
              { icon: Phone,  label: "Teléfono", value: "+52 55 1234 5678" },
              { icon: MapPin, label: "Ciudad",   value: "Puebla, Puebla" },
              { icon: Clock,  label: "Horario",  value: "Lun–Vie 9:00–18:00" },
            ].map(({ icon: Icon, label, value }) => (
              <div key={label} className="flex items-center gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                  <Icon className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-muted-foreground">{label}</p>
                  <p className="text-sm text-foreground">{value}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Emergencias — destacada arriba */}
          <div className="rounded-2xl overflow-hidden border border-red-200 dark:border-red-900">
            <div className="flex items-center gap-2 px-5 py-3 bg-red-50 dark:bg-red-950/40 border-b border-red-200 dark:border-red-900">
              <AlertTriangle className="h-4 w-4 text-red-600 dark:text-red-400" />
              <p className="text-sm font-semibold text-red-700 dark:text-red-300">¿Necesitas ayuda inmediata?</p>
            </div>
            <div className="px-5 py-4 bg-card space-y-3">
              <p className="text-sm text-muted-foreground leading-relaxed">
                Si estás en una situación de emergencia, contacta de inmediato a:
              </p>
              {[
                { label: "Línea Nacional", value: "911", urgent: true },
                { label: "Red Nacional de Refugios", value: "800 822 4460", urgent: false },
                { label: "LOCATEL", value: "56 58 11 11", urgent: false },
              ].map(({ label, value, urgent }) => (
                <div key={label} className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">{label}</span>
                  <span className={`text-sm font-bold ${urgent ? "text-red-600 dark:text-red-400" : "text-foreground"}`}>
                    {value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Cómo respondemos */}
          <div className="rounded-2xl border border-border bg-card px-5 py-5 space-y-4">
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Cómo respondemos
            </p>
            {[
              { paso: "01", texto: "Recibimos tu mensaje y lo clasificamos por categoría." },
              { paso: "02", texto: "Te enviamos una confirmación en menos de 24 horas." },
              { paso: "03", texto: "Una integrante del equipo te da seguimiento directo." },
            ].map(({ paso, texto }) => (
              <div key={paso} className="flex items-start gap-3">
                <span className="text-xl font-bold text-primary/30 leading-none min-w-[2rem]">{paso}</span>
                <p className="text-sm text-muted-foreground leading-relaxed">{texto}</p>
              </div>
            ))}
          </div>

          {/* Colaboraciones */}
          <div
            className="rounded-2xl px-5 py-5"
            style={{ background: "#581c87" }}
          >
            <p className="text-xs font-semibold uppercase tracking-widest text-pink-300 mb-2">
              Colaboraciones
            </p>
            <p className="text-sm text-white/70 leading-relaxed mb-4">
              ¿Eres colectivo, organización o medio? Tenemos una vía específica para ti.
            </p>
            <a
              href="/para-colectivos"
              className="inline-flex items-center gap-2 text-sm font-semibold text-white hover:text-pink-200 transition-colors"
            >
              Ver alianzas <ArrowRight className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>

        {/* Formulario */}
        <div className="lg:col-span-2">
          <div className="rounded-2xl border border-border bg-card overflow-hidden">
            <div className="px-6 py-5 border-b border-border">
              <h2 className="text-lg font-bold text-foreground">Envíanos un mensaje</h2>
              <p className="text-sm text-muted-foreground mt-0.5">
                Completa el formulario y te respondemos lo antes posible.
              </p>
            </div>
            <form onSubmit={handleSubmit} className="px-6 py-6 space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="name">Nombre completo *</Label>
                  <Input
                    id="name"
                    placeholder="Tu nombre"
                    value={formData.name}
                    onChange={e => handleChange("name", e.target.value)}
                    required
                    className="rounded-xl"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="tu@email.com"
                    value={formData.email}
                    onChange={e => handleChange("email", e.target.value)}
                    required
                    className="rounded-xl"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="phone">Teléfono (opcional)</Label>
                  <Input
                    id="phone"
                    placeholder="+52 55 1234 5678"
                    value={formData.phone}
                    onChange={e => handleChange("phone", e.target.value)}
                    className="rounded-xl"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="category">Categoría *</Label>
                  <Select value={formData.category} onValueChange={value => handleChange("category", value)}>
                    <SelectTrigger className="rounded-xl">
                      <SelectValue placeholder="Selecciona una categoría" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="general">Consulta general</SelectItem>
                      <SelectItem value="apoyo">Necesito apoyo</SelectItem>
                      <SelectItem value="colaboracion">Colaboración</SelectItem>
                      <SelectItem value="prensa">Prensa</SelectItem>
                      <SelectItem value="tecnico">Soporte técnico</SelectItem>
                      <SelectItem value="sugerencias">Sugerencias</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="subject">Asunto *</Label>
                <Input
                  id="subject"
                  placeholder="Breve descripción del tema"
                  value={formData.subject}
                  onChange={e => handleChange("subject", e.target.value)}
                  required
                  className="rounded-xl"
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="message">Mensaje *</Label>
                <Textarea
                  id="message"
                  placeholder="Describe tu consulta, sugerencia o mensaje en detalle..."
                  value={formData.message}
                  onChange={e => handleChange("message", e.target.value)}
                  required
                  className="min-h-36 rounded-xl resize-none"
                />
              </div>

              <Button
                type="submit"
                size="lg"
                className="w-full h-12 rounded-xl gap-2 text-base font-semibold"
              >
                <Send className="h-4 w-4" />
                Enviar mensaje
              </Button>
            </form>
          </div>
        </div>
      </div>

    </div>
  )
}

export default Contacto