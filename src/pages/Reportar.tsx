import { useRef, useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { useToast } from "@/hooks/use-toast"
import { Upload, AlertCircle, Heart, Shield, CheckCircle, ChevronRight } from "lucide-react"
import NavbarWrapper from "@/components/NavbarWrapper"
import headerImage from "@/assets/herstory-header.jpg"
import { useReportar } from "@/hooks/useReportar"
import { supabase } from "@/lib/supabaseClient"

// ─────────────────────────────────────────
// TIPO COLECTIVO
// ─────────────────────────────────────────
interface Colectivo {
  id: number
  nombre: string
  estado: string
}

const Reportar = () => {
  const { toast } = useToast()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const {
    formData,
    actualizarCampo,
    subirImagen,
    enviarReporte,
    reiniciar,
    loadingImagen,
    loadingEnvio,
    enviado,
    error,
    paso,
    setPaso,
  } = useReportar()

  const [colectivos, setColectivos] = useState<Colectivo[]>([])

  // Cargar colectivos para el selector
  useEffect(() => {
    const cargarColectivos = async () => {
      const { data } = await supabase
        .from("colectivos")
        .select("id, nombre, estado")
        .eq("activo", true)
        .eq("verificado", true)
        .order("estado")
      if (data) setColectivos(data)
    }
    cargarColectivos()
  }, [])

  // Manejar subida de imagen
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const url = await subirImagen(file)
    if (url) {
      toast({ title: "Fotografía subida correctamente" })
    } else {
      toast({
        title: "Error al subir la fotografía",
        description: "Intenta de nuevo",
        variant: "destructive"
      })
    }
  }

  // Manejar envío
  const handleEnviar = async () => {
    const exito = await enviarReporte()
    if (!exito && error) {
      toast({
        title: "Error al enviar",
        description: error,
        variant: "destructive"
      })
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="relative w-full h-48 overflow-hidden">
        <img src={headerImage} alt="HerStory Header" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">Reportar Desaparición</h1>
            <p className="text-lg italic">Tu voz puede hacer la diferencia</p>
          </div>
        </div>
      </div>
      <NavbarWrapper />

      <div className="container py-8 max-w-4xl mx-auto">

        {/* Alerta importante */}
        <Card className="mb-8 border-amber-200 bg-amber-50 dark:border-amber-800 dark:bg-amber-900/20">
          <CardContent className="pt-6">
            <div className="flex items-start space-x-3">
              <AlertCircle className="h-5 w-5 text-amber-600 dark:text-amber-400 mt-0.5 shrink-0" />
              <div className="text-sm">
                <p className="font-medium text-amber-800 dark:text-amber-400 mb-1">
                  Información importante
                </p>
                <p className="text-amber-700 dark:text-amber-300">
                  Si tienes información sobre una persona desaparecida, contacta
                  inmediatamente a las autoridades locales. Este formulario complementa,
                  pero no reemplaza, la denuncia oficial. Línea de emergencia: 800 028 77 83
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Indicador de pasos */}
        {!enviado && (
          <div className="flex items-center justify-center mb-8 gap-4">
            {[1, 2].map((p) => (
              <div key={p} className="flex items-center gap-2">
                <div className={`
                  w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold
                  ${paso >= p
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground"}
                `}>
                  {p}
                </div>
                <span className="text-sm text-muted-foreground hidden md:block">
                  {p === 1 ? "Información" : "Consentimiento"}
                </span>
                {p < 2 && <ChevronRight className="h-4 w-4 text-muted-foreground" />}
              </div>
            ))}
          </div>
        )}

        {/* ═══════════════════════════════════
            PASO 1 — FORMULARIO
        ═══════════════════════════════════ */}
        {paso === 1 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Heart className="h-5 w-5 text-primary" />
                Información de la persona desaparecida
              </CardTitle>
              <CardDescription>
                Completa la mayor cantidad de información posible.
                Los campos marcados con * son obligatorios.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">

              {/* Nombre */}
              <div className="space-y-3">
                <h3 className="font-semibold text-primary">Nombre completo</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="Nombre">Nombre(s) *</Label>
                    <Input
                      id="Nombre"
                      value={formData.Nombre}
                      onChange={e => actualizarCampo("Nombre", e.target.value)}
                      placeholder="Nombre(s)"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="Primer_apellido">Primer apellido *</Label>
                    <Input
                      id="Primer_apellido"
                      value={formData.Primer_apellido}
                      onChange={e => actualizarCampo("Primer_apellido", e.target.value)}
                      placeholder="Primer apellido"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="Segundo_apellido">Segundo apellido</Label>
                    <Input
                      id="Segundo_apellido"
                      value={formData.Segundo_apellido}
                      onChange={e => actualizarCampo("Segundo_apellido", e.target.value)}
                      placeholder="Segundo apellido"
                    />
                  </div>
                </div>
              </div>

              {/* Folio */}
              <div className="space-y-2">
                <Label htmlFor="folio">
                  Número de folio de denuncia *
                </Label>
                <Input
                  id="folio"
                  value={formData.folio}
                  onChange={e => actualizarCampo("folio", e.target.value)}
                  placeholder="Ej: FGJEM/T3/UI3CM/D/01003/2024"
                  required
                />
                <p className="text-xs text-muted-foreground">
                  El folio te fue asignado al levantar la denuncia de desaparición
                  ante las autoridades. Es necesario para verificar el caso.
                </p>
              </div>

              {/* Datos básicos */}
              <div className="space-y-3">
                <h3 className="font-semibold text-primary">Datos básicos</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="Edad">Edad *</Label>
                    <Input
                      id="Edad"
                      type="number"
                      value={formData.Edad}
                      onChange={e => actualizarCampo("Edad", e.target.value)}
                      placeholder="Edad en años"
                      min="0"
                      max="120"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="Sexo">Sexo</Label>
                    <Select
                      value={formData.Sexo}
                      onValueChange={val => actualizarCampo("Sexo", val)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccionar" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Mujer">Mujer</SelectItem>
                        <SelectItem value="Hombre">Hombre</SelectItem>
                        <SelectItem value="No binario">No binario</SelectItem>
                        <SelectItem value="Prefiero no decir">Prefiero no decir</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="Nacionalidad">Nacionalidad</Label>
                    <Input
                      id="Nacionalidad"
                      value={formData.Nacionalidad}
                      onChange={e => actualizarCampo("Nacionalidad", e.target.value)}
                      placeholder="Mexicana"
                    />
                  </div>
                </div>
              </div>

              {/* Desaparición */}
              <div className="space-y-3">
                <h3 className="font-semibold text-primary">Desaparición</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="Desaparicion">Fecha de desaparición *</Label>
                    <Input
                      id="Desaparicion"
                      type="date"
                      value={formData.Desaparicion}
                      onChange={e => actualizarCampo("Desaparicion", e.target.value)}
                      max={new Date().toISOString().split("T")[0]}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="Entidad_desaparicion">Estado de desaparición *</Label>
                    <Select
                      value={formData.Entidad_desaparicion}
                      onValueChange={val => actualizarCampo("Entidad_desaparicion", val)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccionar estado" />
                      </SelectTrigger>
                      <SelectContent>
                        {[
                          "Aguascalientes","Baja California","Baja California Sur",
                          "Campeche","Chiapas","Chihuahua","Ciudad de México",
                          "Coahuila","Colima","Durango","Estado de México",
                          "Guanajuato","Guerrero","Hidalgo","Jalisco","Michoacán",
                          "Morelos","Nayarit","Nuevo León","Oaxaca","Puebla",
                          "Querétaro","Quintana Roo","San Luis Potosí","Sinaloa",
                          "Sonora","Tabasco","Tamaulipas","Tlaxcala","Veracruz",
                          "Yucatán","Zacatecas"
                        ].map(estado => (
                          <SelectItem key={estado} value={estado}>{estado}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* Características físicas */}
              <div className="space-y-3">
                <h3 className="font-semibold text-primary">Características físicas</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <Label htmlFor="estatura">Estatura (cm)</Label>
                    <Input
                      id="estatura"
                      type="number"
                      value={formData.estatura}
                      onChange={e => actualizarCampo("estatura", e.target.value)}
                      placeholder="Ej: 160"
                      min="50"
                      max="250"
                    />
                  </div>
                  <div>
                    <Label htmlFor="peso_kg">Peso (kg)</Label>
                    <Input
                      id="peso_kg"
                      type="number"
                      value={formData.peso_kg}
                      onChange={e => actualizarCampo("peso_kg", e.target.value)}
                      placeholder="Ej: 55"
                    />
                  </div>
                  <div>
                    <Label htmlFor="color_ojos">Color de ojos</Label>
                    <Select
                      value={formData.color_ojos}
                      onValueChange={val => actualizarCampo("color_ojos", val)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccionar" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Negro">Negro</SelectItem>
                        <SelectItem value="Café">Café</SelectItem>
                        <SelectItem value="Verde">Verde</SelectItem>
                        <SelectItem value="Azul">Azul</SelectItem>
                        <SelectItem value="Gris">Gris</SelectItem>
                        <SelectItem value="Miel">Miel</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="color_cabello">Color de cabello</Label>
                    <Select
                      value={formData.color_cabello}
                      onValueChange={val => actualizarCampo("color_cabello", val)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccionar" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Negro">Negro</SelectItem>
                        <SelectItem value="Castaño">Castaño</SelectItem>
                        <SelectItem value="Rubio">Rubio</SelectItem>
                        <SelectItem value="Rojo">Rojo</SelectItem>
                        <SelectItem value="Canoso">Canoso</SelectItem>
                        <SelectItem value="Teñido">Teñido</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div>
                  <Label htmlFor="caracteriticas">
                    Señas particulares y descripción adicional
                  </Label>
                  <Textarea
                    id="caracteriticas"
                    value={formData.caracteriticas}
                    onChange={e => actualizarCampo("caracteriticas", e.target.value)}
                    placeholder="Tatuajes, cicatrices, lunares, ropa que vestía, circunstancias de la desaparición..."
                    className="min-h-24"
                  />
                </div>
              </div>

              {/* Fotografía */}
              <div className="space-y-3">
                <h3 className="font-semibold text-primary">Fotografía</h3>
                <div
                  className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center cursor-pointer hover:bg-muted/10 transition"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">
                    Haz clic para subir una fotografía reciente
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    La publicación de la foto requiere tu autorización en el siguiente paso
                  </p>
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    ref={fileInputRef}
                    className="hidden"
                  />
                </div>
                {loadingImagen && (
                  <p className="text-sm text-muted-foreground text-center">
                    Subiendo fotografía...
                  </p>
                )}
                {formData.imagen_url && (
                  <div className="text-center">
                    <img
                      src={formData.imagen_url}
                      alt="Vista previa"
                      className="w-32 h-32 object-cover rounded-lg mx-auto"
                    />
                    <p className="text-xs text-green-600 mt-1">
                      ✓ Fotografía subida correctamente
                    </p>
                  </div>
                )}
              </div>

              {/* Información de contacto */}
              <div className="space-y-3">
                <h3 className="font-semibold text-primary">
                  Tu información de contacto
                </h3>
                <p className="text-sm text-muted-foreground">
                  Esta información es confidencial y solo se usa para
                  comunicarnos contigo sobre el reporte.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="contacto_nombre">Tu nombre completo *</Label>
                    <Input
                      id="contacto_nombre"
                      value={formData.contacto_nombre}
                      onChange={e => actualizarCampo("contacto_nombre", e.target.value)}
                      placeholder="Tu nombre"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="contacto_relacion">Relación con la persona *</Label>
                    <Input
                      id="contacto_relacion"
                      value={formData.contacto_relacion}
                      onChange={e => actualizarCampo("contacto_relacion", e.target.value)}
                      placeholder="Madre, padre, hermana, amiga..."
                      required
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="contacto_telefono">Teléfono *</Label>
                    <Input
                      id="contacto_telefono"
                      type="tel"
                      value={formData.contacto_telefono}
                      onChange={e => actualizarCampo("contacto_telefono", e.target.value)}
                      placeholder="10 dígitos"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="contacto_email">Correo electrónico *</Label>
                    <Input
                      id="contacto_email"
                      type="email"
                      value={formData.contacto_email}
                      onChange={e => actualizarCampo("contacto_email", e.target.value)}
                      placeholder="tu@correo.com"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Colectivo opcional */}
              {colectivos.length > 0 && (
                <div className="space-y-2">
                  <Label htmlFor="colectivo_id">
                    ¿Algún colectivo de búsqueda conoce este caso? (opcional)
                  </Label>
                  <Select
                    value={formData.colectivo_id}
                    onValueChange={val => actualizarCampo("colectivo_id", val)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar colectivo (opcional)" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ningunos">Ninguno / No lo sé</SelectItem>
                      {colectivos.map(col => (
                        <SelectItem key={col.id} value={String(col.id)}>
                          {col.nombre} — {col.estado}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-muted-foreground">
                    Esto ayuda a nuestro equipo a verificar el caso más rápido.
                    El colectivo no recibirá tus datos automáticamente.
                  </p>
                </div>
              )}

              <Button
                className="w-full"
                size="lg"
                onClick={() => setPaso(2)}
                disabled={
                  !formData.Nombre ||
                  !formData.Primer_apellido ||
                  !formData.Desaparicion ||
                  !formData.Entidad_desaparicion ||
                  !formData.folio ||
                  !formData.contacto_email ||
                  !formData.contacto_telefono
                }
              >
                Continuar
                <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </CardContent>
          </Card>
        )}

        {/* ═══════════════════════════════════
            PASO 2 — CONSENTIMIENTO
        ═══════════════════════════════════ */}
        {paso === 2 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-primary" />
                Autorización y privacidad
              </CardTitle>
              <CardDescription>
                Antes de enviar, necesitamos tu autorización sobre cómo
                usaremos la información. Cada autorización es independiente.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">

              {/* Consentimiento almacenamiento */}
              <div className="border rounded-lg p-4 space-y-3">
                <div className="flex items-start space-x-3">
                  <Checkbox
                    id="consentimiento_almacenamiento"
                    checked={formData.consentimiento_almacenamiento}
                    onCheckedChange={checked =>
                      actualizarCampo("consentimiento_almacenamiento", checked as boolean)
                    }
                  />
                  <div>
                    <Label
                      htmlFor="consentimiento_almacenamiento"
                      className="text-sm font-medium leading-relaxed cursor-pointer"
                    >
                      Autorizo el almacenamiento y publicación de esta información *
                    </Label>
                    <p className="text-xs text-muted-foreground mt-1">
                      Autorizo que el nombre, fecha de desaparición, estado y características
                      de {formData.Nombre || "la persona"} sean almacenados en HerStory
                      y visibles públicamente en el mapa de búsqueda mientras el caso esté activo.
                    </p>
                  </div>
                </div>
              </div>

              {/* Consentimiento proyección */}
              <div className="border rounded-lg p-4 space-y-3">
                <div className="flex items-start space-x-3">
                  <Checkbox
                    id="consentimiento_proyeccion"
                    checked={formData.consentimiento_proyeccion}
                    onCheckedChange={checked =>
                      actualizarCampo("consentimiento_proyeccion", checked as boolean)
                    }
                  />
                  <div>
                    <Label
                      htmlFor="consentimiento_proyeccion"
                      className="text-sm font-medium leading-relaxed cursor-pointer"
                    >
                      Autorizo la generación de proyección de edad con inteligencia artificial
                      (opcional)
                    </Label>
                    <p className="text-xs text-muted-foreground mt-1">
                      Autorizo que HerStory use la fotografía para generar una imagen aproximada
                      de cómo podría verse {formData.Nombre || "la persona"} actualmente.
                      Esta imagen es una aproximación generada por IA, no una fotografía real,
                      y será visible junto al caso en el mapa.
                    </p>
                    <p className="text-xs text-amber-600 mt-1">
                      Solo aplica si subiste una fotografía y autorizas el almacenamiento.
                    </p>
                  </div>
                </div>
              </div>

              {/* Aviso de privacidad */}
              <div className="bg-muted/50 rounded-lg p-4 text-xs text-muted-foreground space-y-2">
                <p className="font-medium text-foreground">Aviso de privacidad</p>
                <p>
                  La información proporcionada será usada exclusivamente para apoyar
                  la búsqueda activa de {formData.Nombre || "la persona desaparecida"}.
                  No será compartida con terceros sin tu consentimiento explícito.
                </p>
                <p>
                  Puedes solicitar la eliminación de cualquier dato en cualquier momento
                  escribiendo a herstoryy2025@gmail.com
                </p>
                <p>
                  Si alguien más tiene acceso a este dispositivo, considera que esta
                  información quedará registrada.
                </p>
              </div>

              {error && (
                <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-3">
                  <p className="text-sm text-destructive">{error}</p>
                </div>
              )}

              <div className="flex gap-3">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => setPaso(1)}
                  disabled={loadingEnvio}
                >
                  Regresar
                </Button>
                <Button
                  className="flex-1"
                  onClick={handleEnviar}
                  disabled={!formData.consentimiento_almacenamiento || loadingEnvio}
                >
                  {loadingEnvio ? "Enviando..." : "Enviar reporte"}
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* ═══════════════════════════════════
            PASO 3 — CONFIRMACIÓN
        ═══════════════════════════════════ */}
        {paso === 3 && enviado && (
          <Card>
            <CardContent className="pt-8 pb-8 text-center space-y-6">
              <CheckCircle className="h-16 w-16 text-green-500 mx-auto" />

              <div className="space-y-2">
                <h2 className="text-2xl font-bold">Reporte recibido</h2>
                <p className="text-muted-foreground">
                  Hemos recibido la información de{" "}
                  <span className="font-medium text-foreground">
                    {formData.Nombre} {formData.Primer_apellido}
                  </span>
                </p>
              </div>

              <div className="bg-muted/50 rounded-lg p-4 text-sm text-left space-y-2">
                <p>✓ Tu reporte fue guardado correctamente</p>
                <p>✓ Nuestro equipo lo revisará en las próximas 24-48 horas</p>
                <p>✓ Recibirás un correo de confirmación en {formData.contacto_email}</p>
                {formData.consentimiento_proyeccion && formData.imagen_url && (
                  <p>✓ Se generará una proyección de edad cuando el caso sea verificado</p>
                )}
              </div>

              <p className="text-sm text-muted-foreground">
                Si tienes dudas escríbenos a{" "}
                <a
                  href="mailto:herstoryy2025@gmail.com"
                  className="text-primary hover:underline"
                >
                  herstoryy2025@gmail.com
                </a>
              </p>

              <Button onClick={reiniciar} variant="outline">
                Enviar otro reporte
              </Button>
            </CardContent>
          </Card>
        )}

      </div>
    </div>
  )
}

export default Reportar