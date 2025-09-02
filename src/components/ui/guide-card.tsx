import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileText, Download } from "lucide-react";

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
  isNew = false
}: GuideCardProps) => {
  return (
    <Card className="p-6 hover:shadow-elegant transition-all duration-300 hover:-translate-y-1 group">
      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <FileText className="h-5 w-5 text-primary" />
              {isNew && (
                <Badge className="bg-accent text-accent-foreground text-xs">
                  Nuevo
                </Badge>
              )}
            </div>
            <h3 className="text-lg font-bold text-primary group-hover:text-primary-light transition-colors">
              {title}
            </h3>
          </div>
          <Badge variant="outline" className="text-xs">
            {category}
          </Badge>
        </div>

        <p className="text-muted-foreground leading-relaxed">
          {description}
        </p>

        {downloadUrl && (
          <Button 
            variant="outline" 
            size="sm" 
            className="w-full group-hover:border-primary-light group-hover:text-primary-light transition-colors"
            asChild
          >
            <a href={downloadUrl} target="_blank" rel="noopener noreferrer">
              <Download className="h-4 w-4 mr-2" />
              Descargar guía
            </a>
          </Button>
        )}
      </div>
    </Card>
  );
};