import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Shield } from "lucide-react";

const PrivacyNotice = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary">
          <Shield className="h-4 w-4 mr-2" />
          Aviso de Privacidad
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[80vh]">
        <DialogHeader>
          <DialogTitle className="text-2xl text-primary">Aviso de Privacidad</DialogTitle>
        </DialogHeader>
        <ScrollArea className="max-h-[60vh] pr-4">
          <div className="space-y-4 text-sm text-card-foreground">
            <p className="font-medium">
              Última actualización: {new Date().toLocaleDateString('es-MX')}
            </p>
            
            <section>
              <h3 className="font-semibold text-base mb-2">1. Responsable del Tratamiento</h3>
              <p>
                La presente plataforma es responsable del tratamiento de los datos personales 
                que nos proporcione, con domicilio en México, y se compromete a proteger la 
                privacidad de los datos de las personas desaparecidas y sus familiares.
              </p>
            </section>
            
            <section>
              <h3 className="font-semibold text-base mb-2">2. Finalidades del Tratamiento</h3>
              <p>Los datos personales serán utilizados para:</p>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li>Facilitar la búsqueda y localización de personas desaparecidas</li>
                <li>Mantener un registro que permita la identificación</li>
                <li>Proporcionar información de contacto para casos de localización</li>
                <li>Generar estadísticas anónimas para autoridades competentes</li>
              </ul>
            </section>
            
            <section>
              <h3 className="font-semibold text-base mb-2">3. Datos Personales Recabados</h3>
              <p>Se recaban los siguientes tipos de datos:</p>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li>Datos de identificación (nombre, edad, fotografía)</li>
                <li>Datos de localización (estado, última ubicación conocida)</li>
                <li>Características físicas</li>
                <li>Datos de contacto del reportante</li>
              </ul>
            </section>
            
            <section>
              <h3 className="font-semibold text-base mb-2">4. Derechos ARCO</h3>
              <p>
                Usted tiene derecho a Acceder, Rectificar, Cancelar u Oponerse al tratamiento 
                de sus datos personales. Para ejercer estos derechos, puede contactarnos a 
                través de los medios de contacto disponibles en la plataforma.
              </p>
            </section>
            
            <section>
              <h3 className="font-semibold text-base mb-2">5. Seguridad de los Datos</h3>
              <p>
                Implementamos medidas de seguridad físicas, técnicas y administrativas para 
                proteger los datos personales contra daño, pérdida, alteración, destrucción 
                o uso no autorizado.
              </p>
            </section>
            
            <section>
              <h3 className="font-semibold text-base mb-2">6. Transferencias</h3>
              <p>
                Los datos podrán ser compartidos únicamente con autoridades competentes en 
                materia de búsqueda de personas desaparecidas, previa solicitud oficial y 
                dentro del marco legal aplicable.
              </p>
            </section>
            
            <section>
              <h3 className="font-semibold text-base mb-2">7. Cambios al Aviso</h3>
              <p>
                Nos reservamos el derecho de modificar este aviso de privacidad. Los cambios 
                serán notificados a través de la plataforma.
              </p>
            </section>
            
            <div className="bg-accent/50 p-4 rounded-lg mt-6">
              <p className="text-sm font-medium">
                Al utilizar esta plataforma, usted acepta el tratamiento de datos personales 
                conforme a este Aviso de Privacidad.
              </p>
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default PrivacyNotice;