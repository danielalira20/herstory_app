export interface Organization {
  id: string;
  name: string;
  description: string;
  type: "Fundación" | "Colectivo" | "Asociación" | "ONG"| "Gobierno Local";
  phone?: string;
  email?: string;
  address?: string;
  website?: string;
  services: string[];
}

export const organizations: Organization[] = [
  {
    id: "1",
    name: "EQUIS - Justicia para las Mujeres",
    description: "Organización feminista que busca garantizar el acceso a la justicia para todas las mujeres, transformando estructuras que generan opresión y exclusión.",
    type: "ONG",
    phone: "9818112656",
    email: "equis@equis.org.mx",
    address: "Calle 53, Zona Centro, 24000 Campeche, Campeche",
    website: "https://equis.org.mx/",
    services: ["Capacitación", "Asesoría legal",  "Talleres de empoderamiento"]
  },
  {
    id: "2",
    name: "Fundación Ana Bella",
    description: "Red de mujeres supervivientes que actúa en 82 países como una solución global a la violencia contra las mujeres, canalizando la empatía y experiencia de las supervivientes.",
    type: "Fundación",
    phone: "+34 667 233 133",
    email: "comunicacion@fundacionanabella.org",
    address: "Torneo Parque Empresarial, Torre 4, Local 71, 41015, Sevilla",
    website: "https://www.fundacionanabella.org/",
    services: ["Grupos de apoyo",  "Acompañamiento", "Activismo"]
  },
  {
    id: "3",
    name: "Asociación Mexicana de Juzgadoras (AMJ)",
    description: "Asociacion que promueve la justicia con perspectiva de género en el ámbito judicial mexicano.",
    type: "Asociación",
    phone: "(55) 53773000",
    
    address: "Blvd. Adolfo López Mateos 231,Torre A Planta Baja,Col. Tlacopac San Ángel,Álvaro Obregón CP.01760",
    website: "https://amjac-juzgadoras.org/",
    services: ["Congresos", "Talleres", "Apoyo jurídico", "Mediación familiar"]
  },
  {
    id: "4",
    name: "Red Nacional de Refugios (RNR)",
    description: "Organización feminista integrada por más de 75 espacios de prevención, atención y protección para mujeres, niñas y niños víctimas de violencia de género.",
    type: "Asociación",
    phone: "800 822 4460",
    email: "renarac@rednacionalderefugios.org.mx",
    address: "Calle de la Libertad, 33, Sevilla",
    website: "https://www.facebook.com/RedNacionaldeRefugiosAC/",
    services: ["Refugios", "Apoyo emocional", "Apoyo Juridico", "Apoyo medico"]
  },
  {
    id: "5",
    name: "Centro de Justicia para las Mujeres (CDMX)",
    description: "Institución que ofrece servicios integrales a mujeres víctimas de violencia, incluyendo atención jurídica, psicológica y médica.",
    type: "Gobierno Local",
    phone: "(55) 5346 8394",
    email: "gestion_fiscal@fgjcdmx.gob.mx",
    address: "Avenida San Pablo Xalpa número. 396, Colonia San Martin Xochinahuac, Alcaldía Azcapotzalco, C.P. 02125",
    website: "https://www.fgjcdmx.gob.mx/",
    services: ["Atención 24h", "Línea de crisis", "Terapia especializada", "Apoyo Juridico"]
  },
  {
    id: "6",
    name: "Colectiva Luchadoras",
    description: "Organización feminista mexicana fundada en 2012, enfocada en combatir los estereotipos de género y la violencia digital.",
    type: "Colectivo",
    
    email: "hola@luchadoras.org",

    website: "https://luchadoras.mx/",
    services: ["Autodefensa feminista", "Empoderamiento personal", "Apoyo entre pares"]
  }
];