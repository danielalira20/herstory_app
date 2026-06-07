import { useState, useEffect } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { MessageCircle, Send, Phone } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface Person {
  id: string
  name: string
  folio?: string
}

interface Props {
  person: Person | null
  isOpen: boolean
  onClose: () => void
}

const MensajeAnonimoModal = ({ person, isOpen, onClose }: Props) => {
  const { toast } = useToast()
  const [contacto, setContacto] = useState("")
  const [enviando, setEnviando] = useState(false)
  const [mensaje, setMensaje] = useState("")

  // Actualizar mensaje cuando cambia la persona
  useEffect(() => {
    if (person) {
      setMensaje(
        `Tengo información sobre: ${person.name}${person.folio ? `. Expediente: ${person.folio}` : ""}. `
      )
    }
  }, [person])

  if (!person) return null

  const whatsappUrl = `https://wa.me/5212225801683?text=${encodeURIComponent(mensaje)}`

  const handleEnviarFormspree = async () => {
    setEnviando(true)
    try {
      await fetch("https://formspree.io/f/mnnbzagw", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          _subject: `Mensaje anónimo — ${person.name}`,
          mensaje: mensaje,
          contacto_opcional: contacto || "Anónimo",
          folio: person.folio || "Sin folio"
        })
      })
      toast({
        title: "Mensaje enviado",
        description: "Gracias por tu información. El equipo lo revisará."
      })
      setContacto("")
      onClose()
    } catch {
      toast({ title: "Error al enviar", variant: "destructive" })
    } finally {
      setEnviando(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-primary">
            <MessageCircle className="h-5 w-5" />
            Mensaje anónimo
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-5">
          <p className="text-sm text-muted-foreground leading-relaxed">
            Si tienes información sobre{" "}
            <strong className="text-foreground">{person.name}</strong>,
            puedes compartirla de forma anónima. Tu identidad está protegida.
          </p>

          {/* Mensaje editable */}
          <div className="space-y-2">
            <Label className="text-sm font-medium">Tu mensaje</Label>
            <Textarea
              value={mensaje}
              onChange={e => {
                if (e.target.value.length <= 500) {
                  setMensaje(e.target.value)
                }
              }}
              className="text-sm resize-none"
              rows={4}
              placeholder="Escribe aquí tu mensaje..."
            />
            <div className="flex justify-between items-center">
              <p className="text-xs text-muted-foreground">
                Puedes editar o agregar más información.
              </p>
              <p className={`text-xs ${mensaje.length > 450 ? "text-red-500" : "text-muted-foreground"}`}>
                {mensaje.length}/500
              </p>
            </div>
          </div>

          {/* Contacto opcional */}
          <div className="space-y-2">
            <Label className="text-sm font-medium">
              Contacto opcional
            </Label>
            <Input
              value={contacto}
              onChange={e => setContacto(e.target.value)}
              placeholder="Teléfono o email (opcional)"
            />
            <p className="text-xs text-muted-foreground">
              Solo si deseas que el equipo pueda contactarte.
            </p>
          </div>

          {/* Botones */}
          <div className="space-y-3">
            {/* WhatsApp */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white rounded-lg py-2.5 px-4 text-sm font-medium transition-colors"
            >
              <Phone className="h-4 w-4" />
              Enviar por WhatsApp
            </a>

            {/* Formulario */}
            <Button
              className="w-full"
              onClick={handleEnviarFormspree}
              disabled={enviando || mensaje.trim().length === 0}
            >
              <Send className="h-4 w-4 mr-2" />
              {enviando ? "Enviando..." : "Enviar mensaje"}
            </Button>

            <Button
              variant="ghost"
              className="w-full text-muted-foreground"
              onClick={onClose}
            >
              Cancelar
            </Button>
          </div>

          {/* Aviso privacidad */}
          <div className="bg-muted/40 rounded-lg p-3">
            <p className="text-xs text-muted-foreground text-center leading-relaxed">
              Este formulario no almacena tu dirección IP ni datos de
              identificación personal. Solo se registra el contenido
              del mensaje y la fecha de envío. HerStory actúa como
              intermediario y canaliza la información a quienes
              pueden investigar.
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default MensajeAnonimoModal