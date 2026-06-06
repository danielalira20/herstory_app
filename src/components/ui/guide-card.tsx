import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Download, ArrowUpRight } from "lucide-react";

const categoryColors: Record<string, string> = {
  "Derechos Humanos":    "bg-purple-100 text-purple-800 border-purple-200",
  "Derechos Laborales":  "bg-blue-100 text-blue-800 border-blue-200",
  "Salud Sexual":        "bg-pink-100 text-pink-800 border-pink-200",
  "Recursos Legales":    "bg-amber-100 text-amber-800 border-amber-200",
  "Violencia":           "bg-red-100 text-red-800 border-red-200",
  "Empoderamiento":      "bg-emerald-100 text-emerald-800 border-emerald-200",
  "Salud Digital":       "bg-teal-100 text-teal-800 border-teal-200",
};

const categoryAccents: Record<string, string> = {
  "Derechos Humanos":    "border-l-purple-400",
  "Derechos Laborales":  "border-l-blue-400",
  "Salud Sexual":        "border-l-pink-400",
  "Recursos Legales":    "border-l-amber-400",
  "Violencia":           "border-l-red-400",
  "Empoderamiento":      "border-l-emerald-400",
  "Salud Digital":       "border-l-teal-400",
};

interface GuideCardProps {
  title: string;
  description: string;
  category: string;
  downloadUrl?: string;
  isNew?: boolean;
}

export const GuideCard = ({
  title,
  description,
  category,
  downloadUrl,
  isNew = false,
}: GuideCardProps) => {
  const colorClass = categoryColors[category] ?? "bg-gray-100 text-gray-800 border-gray-200";
  const accentClass = categoryAccents[category] ?? "border-l-gray-400";

  return (
    <Card className={`group flex flex-col justify-between p-6 border-l-4 ${accentClass} hover:shadow-md transition-all duration-300 hover:-translate-y-1`}>
      <div className="space-y-3">
        {/* Categoría + Nuevo */}
        <div className="flex items-center gap-2 flex-wrap">
          <Badge className={`text-xs font-medium border ${colorClass}`}>
            {category}
          </Badge>
          {isNew && (
            <Badge className="text-xs bg-primary text-primary-foreground">
              Nuevo
            </Badge>
          )}
        </div>

        {/* Título */}
        <h3 className="text-base font-semibold leading-snug text-foreground group-hover:text-primary transition-colors">
          {title}
        </h3>

        {/* Descripción */}
        <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
          {description}
        </p>
      </div>

      {/* Botón */}
      {downloadUrl && (
        <a
          href={downloadUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
        >
          <Download className="h-4 w-4" />
          Descargar guía
          <ArrowUpRight className="h-3 w-3 opacity-60" />
        </a>
      )}
    </Card>
  );
};