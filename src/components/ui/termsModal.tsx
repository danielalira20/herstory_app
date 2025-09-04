import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Checkbox } from "@/components/ui/checkbox"

export default function TermsModal() {
  const [open, setOpen] = useState(false)
  const [accepted, setAccepted] = useState(false)

  const handleAccept = () => {
    if (accepted) {
      setOpen(false)
      // Aquí podrías manejar el estado global, o marcar que ya aceptó
      console.log("Términos aceptados ✅")
    }
  }

  return (
    <>
      <Button onClick={() => setOpen(true)} className="rounded-2xl shadow-md">
        Ver Términos y Condiciones
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-2xl p-6 rounded-2xl shadow-lg bg-background">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold text-primary">
              Términos y Condiciones
            </DialogTitle>
          </DialogHeader>

          <ScrollArea className="h-64 pr-4 text-sm text-foreground/90 space-y-4">
            <p>
              Este proyecto busca dar visibilidad y apoyo en casos de mujeres desaparecidas. Para participar en el formulario y el foro anónimo, es importante que leas y aceptes lo siguiente:
            </p>

            <ul className="list-disc pl-6 space-y-2">
              <li>
                <span className="font-medium">Uso de imágenes:</span> Las imágenes que subas se usarán únicamente dentro de esta plataforma para fines de visibilización. No serán compartidas con terceros sin tu consentimiento.
              </li>
              <li>
                <span className="font-medium">Privacidad:</span> Los datos personales sensibles estarán protegidos y no se mostrarán públicamente.
              </li>
              <li>
                <span className="font-medium">Foro anónimo:</span> El espacio de discusión está pensado para compartir experiencias y apoyo. Evita compartir información que te pueda poner en riesgo.
              </li>
              <li>
                <span className="font-medium">Responsabilidad:</span> Esta plataforma no sustituye procesos legales ni denuncias formales. Es un espacio comunitario de apoyo y memoria.
              </li>
              <li>
                <span className="font-medium">Respeto:</span> Cualquier contenido ofensivo, violento o que vulnere a otras personas podrá ser eliminado.
              </li>
            </ul>

            <p>
              Al marcar la casilla y presionar <em>Aceptar</em>, confirmas que comprendes y aceptas estos términos.
            </p>
          </ScrollArea>

          <DialogFooter className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mt-4">
            <div className="flex items-center space-x-2">
              <Checkbox id="terms" checked={accepted} onCheckedChange={(v) => setAccepted(!!v)} />
              <label htmlFor="terms" className="text-sm text-foreground/80 cursor-pointer">
                He leído y acepto los términos y condiciones
              </label>
            </div>

            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setOpen(false)}>
                Cancelar
              </Button>
              <Button onClick={handleAccept} disabled={!accepted}>
                Aceptar
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
