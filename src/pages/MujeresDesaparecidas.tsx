import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { Upload, AlertCircle, Heart, Shield } from "lucide-react";
import Navbar from "@/components/Navbar";

const MujeresDesaparecidas = () => {
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    nombrePersona: "",
    edad: "",
    genero: "",
    fechaDesaparicion: "",
    lugarDesaparicion: "",
    ciudad: "",
    estado: "",
    descripcionFisica: "",
    ropasUltima: "",
    circunstancias: "",
    contactoNombre: "",
    contactoRelacion: "",
    contactoTelefono: "",
    contactoEmail: "",
    informacionAdicional: "",
    autorizaPublicacion: false,
    imagenUrl: "",
  });

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setLoading(true);
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "herStory_desaparecidas"); // tu preset de Cloudinary

    try {
      const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        { method: "POST", body: data }
      );
      const json = await res.json();
      setFormData((prev) => ({ ...prev, imagenUrl: json.secure_url }));
      toast({
        title: "Imagen subida",
        description: "La fotografía se subió correctamente",
      });
    } catch (error) {
      console.error("Error al subir imagen:", error);
      toast({
        title: "Error al subir imagen",
        description: "Intenta nuevamente más tarde",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Shield className="h-8 w-8 text-primary mr-3" />
            <h1 className="text-3xl md:text-4xl font-bold">Mujeres Desaparecidas</h1>
          </div>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Este formulario está dirigido a todas las personas que deseen reportar la
            desaparición de un ser querido. Tu información es valiosa y nos ayuda a
            crear una red de apoyo y búsqueda.
          </p>
        </div>

        {/* Alert */}
        <Card className="mb-8 border-amber-200 bg-amber-50 dark:border-amber-800 dark:bg-amber-900/20">
          <CardContent className="pt-6">
            <div className="flex items-start space-x-3">
              <AlertCircle className="h-5 w-5 text-amber-600 dark:text-amber-400 mt-0.5" />
              <div className="text-sm">
                <p className="font-medium text-amber-800 dark:text-amber-400 mb-1">
                  Información importante
                </p>
                <p className="text-amber-700 dark:text-amber-300">
                  Si tienes información sobre una persona desaparecida, también contacta
                  inmediatamente a las autoridades locales. Este formulario complementa,
                  pero no reemplaza, la denuncia oficial.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Form */}
        <Card className="max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Heart className="h-5 w-5 text-primary mr-2" />
              Formulario de Reporte
            </CardTitle>
            <CardDescription>
              Completa la mayor cantidad de información posible. Todos los campos
              marcados con * son obligatorios.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form
              action="https://formspree.io/f/mnnbzagw"
              method="POST"
              className="space-y-6"
            >
              {/* Información de la persona desaparecida */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-primary">
                  Información de la persona desaparecida
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="nombrePersona">Nombre completo *</Label>
                    <Input
                      id="nombrePersona"
                      name="nombrePersona"
                      value={formData.nombrePersona}
                      onChange={(e) =>
                        handleInputChange("nombrePersona", e.target.value)
                      }
                      required
                      placeholder="Nombre y apellidos"
                    />
                  </div>
                  <div>
                    <Label htmlFor="edad">Edad *</Label>
                    <Input
                      id="edad"
                      name="edad"
                      type="number"
                      value={formData.edad}
                      onChange={(e) => handleInputChange("edad", e.target.value)}
                      required
                      placeholder="Edad en años"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="genero">Identidad de género</Label>
                    <Select
                      name="genero"
                      value={formData.genero}
                      onValueChange={(value) => handleInputChange("genero", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccionar" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="mujer">Mujer</SelectItem>
                        <SelectItem value="no-binario">No binario</SelectItem>
                        <SelectItem value="otro">Otro</SelectItem>
                        <SelectItem value="prefiero-no-decir">Prefiero no decir</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="fechaDesaparicion">Fecha de desaparición *</Label>
                    <Input
                      id="fechaDesaparicion"
                      name="fechaDesaparicion"
                      type="date"
                      value={formData.fechaDesaparicion}
                      onChange={(e) =>
                        handleInputChange("fechaDesaparicion", e.target.value)
                      }
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="lugarDesaparicion">Lugar de desaparición *</Label>
                    <Input
                      id="lugarDesaparicion"
                      name="lugarDesaparicion"
                      value={formData.lugarDesaparicion}
                      onChange={(e) =>
                        handleInputChange("lugarDesaparicion", e.target.value)
                      }
                      required
                      placeholder="Ubicación específica"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="ciudad">Ciudad *</Label>
                    <Input
                      id="ciudad"
                      name="ciudad"
                      value={formData.ciudad}
                      onChange={(e) => handleInputChange("ciudad", e.target.value)}
                      required
                      placeholder="Ciudad"
                    />
                  </div>
                  <div>
                    <Label htmlFor="estado">Estado/Provincia *</Label>
                    <Input
                      id="estado"
                      name="estado"
                      value={formData.estado}
                      onChange={(e) => handleInputChange("estado", e.target.value)}
                      required
                      placeholder="Estado o provincia"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="descripcionFisica">Descripción física</Label>
                  <Textarea
                    id="descripcionFisica"
                    name="descripcionFisica"
                    value={formData.descripcionFisica}
                    onChange={(e) =>
                      handleInputChange("descripcionFisica", e.target.value)
                    }
                    placeholder="Estatura, complexión, color de cabello, ojos, señas particulares, etc."
                    className="min-h-24"
                  />
                </div>

                <div>
                  <Label htmlFor="ropasUltima">Ropa que vestía el último día</Label>
                  <Textarea
                    id="ropasUltima"
                    name="ropasUltima"
                    value={formData.ropasUltima}
                    onChange={(e) => handleInputChange("ropasUltima", e.target.value)}
                    placeholder="Describe la ropa y accesorios que llevaba"
                    className="min-h-20"
                  />
                </div>

                <div>
                  <Label htmlFor="circunstancias">Circunstancias de la desaparición</Label>
                  <Textarea
                    id="circunstancias"
                    name="circunstancias"
                    value={formData.circunstancias}
                    onChange={(e) =>
                      handleInputChange("circunstancias", e.target.value)
                    }
                    placeholder="Describe las circunstancias en las que desapareció"
                    className="min-h-32"
                  />
                </div>
              </div>

              {/* Información de contacto */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-primary">
                  Información de contacto
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="contactoNombre">Tu nombre *</Label>
                    <Input
                      id="contactoNombre"
                      name="contactoNombre"
                      value={formData.contactoNombre}
                      onChange={(e) =>
                        handleInputChange("contactoNombre", e.target.value)
                      }
                      required
                      placeholder="Tu nombre completo"
                    />
                  </div>
                  <div>
                    <Label htmlFor="contactoRelacion">Relación con la persona *</Label>
                    <Input
                      id="contactoRelacion"
                      name="contactoRelacion"
                      value={formData.contactoRelacion}
                      onChange={(e) =>
                        handleInputChange("contactoRelacion", e.target.value)
                      }
                      required
                      placeholder="Madre, padre, hijes, amigue, etc."
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="contactoTelefono">Teléfono *</Label>
                    <Input
                      id="contactoTelefono"
                      name="contactoTelefono"
                      type="tel"
                      value={formData.contactoTelefono}
                      onChange={(e) =>
                        handleInputChange("contactoTelefono", e.target.value)
                      }
                      required
                      placeholder="Número de teléfono"
                    />
                  </div>
                  <div>
                    <Label htmlFor="contactoEmail">Email *</Label>
                    <Input
                      id="contactoEmail"
                      name="contactoEmail"
                      type="email"
                      value={formData.contactoEmail}
                      onChange={(e) =>
                        handleInputChange("contactoEmail", e.target.value)
                      }
                      required
                      placeholder="Correo electrónico"
                    />
                  </div>
                </div>
              </div>

              {/* Información adicional y Upload */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-primary">Información adicional</h3>
                <div>
                  <Label htmlFor="informacionAdicional">
                    Información adicional que consideres relevante
                  </Label>
                  <Textarea
                    id="informacionAdicional"
                    name="informacionAdicional"
                    value={formData.informacionAdicional}
                    onChange={(e) =>
                      handleInputChange("informacionAdicional", e.target.value)
                    }
                    placeholder="Cualquier otra información que pueda ser útil"
                    className="min-h-32"
                  />
                </div>

                {/* Upload de imagen */}
                <div className="space-y-3">
                  <Label>Fotografía (opcional)</Label>
                  <div
                    className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center cursor-pointer hover:bg-muted/10 transition"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground">
                      Haz clic para subir una fotografía reciente
                    </p>
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      ref={fileInputRef}
                      className="hidden"
                    />
                  </div>
                  {loading && (
                    <p className="text-sm text-muted-foreground">Subiendo imagen...</p>
                  )}
                  {formData.imagenUrl && (
                    <img
                      src={formData.imagenUrl}
                      alt="Preview"
                      className="w-32 rounded-md mt-2 mx-auto"
                    />
                  )}
                  <input type="hidden" name="imagenUrl" value={formData.imagenUrl} />
                </div>
              </div>

              {/* Checkbox de autorización */}
              <div className="space-y-4 pt-4 border-t">
                <div className="flex items-start space-x-3">
                  <Checkbox
                    id="autorizacion"
                    name="autorizaPublicacion"
                    checked={formData.autorizaPublicacion}
                    onCheckedChange={(checked) =>
                      handleInputChange("autorizaPublicacion", checked as boolean)
                    }
                  />
                  <Label htmlFor="autorizacion" className="text-sm leading-relaxed">
                    Autorizo la publicación de esta información en la plataforma HerStory
                    para ayudar en la búsqueda. Entiendo que esta información será manejada
                    con total confidencialidad y respeto. *
                  </Label>
                </div>
              </div>

              <Button type="submit" className="w-full" size="lg">
                Enviar reporte
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Contact info */}
        <div className="mt-8 text-center text-sm text-muted-foreground">
          <p>
            Si necesitas ayuda para llenar este formulario o tienes preguntas, contáctanos
            en{" "}
            <a
              href="mailto:ayuda@herstory.com"
              className="text-primary hover:underline"
            >
              ayuda@herstory.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default MujeresDesaparecidas;





