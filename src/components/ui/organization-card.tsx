import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Phone, Mail, MapPin, ExternalLink } from "lucide-react";

interface OrganizationCardProps {
  name: string;
  description: string;
  type: string;
  phone?: string;
  email?: string;
  address?: string;
  website?: string;
  services: string[];
}

export const OrganizationCard = ({
  name,
  description,
  type,
  phone,
  email,
  address,
  website,
  services
}: OrganizationCardProps) => {
  return (
    <Card className="p-6 hover:shadow-elegant transition-all duration-300 hover:-translate-y-1 group">
      <div className="space-y-4">
        <div>
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-xl font-bold text-primary group-hover:text-primary-light transition-colors">
              {name}
            </h3>
            <Badge variant="secondary" className="text-xs">
              {type}
            </Badge>
          </div>
          <p className="text-muted-foreground leading-relaxed">
            {description}
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          {services.map((service, index) => (
            <Badge key={index} variant="outline" className="text-xs">
              {service}
            </Badge>
          ))}
        </div>

        <div className="space-y-2">
          {phone && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Phone className="h-4 w-4" />
              <span>{phone}</span>
            </div>
          )}
          {email && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Mail className="h-4 w-4" />
              <span>{email}</span>
            </div>
          )}
          {address && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4" />
              <span>{address}</span>
            </div>
          )}
        </div>

        {website && (
          <Button 
            variant="outline" 
            size="sm" 
            className="w-full mt-4 group-hover:border-primary-light group-hover:text-primary-light transition-colors"
            asChild
          >
            <a href={website} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="h-4 w-4 mr-2" />
              Visitar sitio web
            </a>
          </Button>
        )}
      </div>
    </Card>
  );
};