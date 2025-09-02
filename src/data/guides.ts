export interface Guide {
  id: string;
  title: string;
  description: string;
  category: "Derechos Humanos" | "Derechos Laborales" | "Salud Sexual" | "Recursos Legales" | "Violencia"| "Empoderamiento";
  downloadUrl?: string;
  isNew?: boolean;
}

export const guides: Guide[] = [
  {
    id: "1",
    title: "Guía de Capacitación en Derechos Humanos de las Mujeres",
    description: "Aprende a reconocer las señales de violencia psicológica y cómo actuar. Incluye técnicas de autoayuda y recursos de emergencia.",
    category: "Derechos Humanos",
    downloadUrl: "https://catedraunescodh.unam.mx/catedra/BibliotecaV2/Documentos/Trata/Libros/PaquetePedagogicoguia.pdf",
    isNew: false
  },
  {
    id: "2",
    title: "Género, Derechos Humanos y No Violencia",
    description: "esta guía proporciona herramientas para comprender y aplicar la perspectiva de género en diversos contextos.",
    category: "Violencia",
    downloadUrl: "http://cedoc.inmujeres.gob.mx/ftpg/Sinaloa/SIN_M960_2015.pdf"
  },
  {
    id: "3",
    title: "Salud Sexual y Reproductiva",
    description: "Información completa sobre anticoncepción, ITS, embarazo y derechos reproductivos. Incluye directorio de clínicas y centros de salud.",
    category: "Salud Sexual",
    downloadUrl: "#"
  },
  {
    id: "4",
    title: "Cómo Denunciar Violencia de Género",
    description: "Paso a paso para realizar una denuncia, qué documentos necesitas y qué esperar del proceso legal. Incluye contactos de emergencia.",
    category: "Recursos Legales",
    downloadUrl: "#",
    isNew: true
  },
  {
    id: "5",
    title: "Construyendo tu Autonomía Económica",
    description: "Estrategias para lograr independencia financiera, emprender un negocio y gestionar tus finanzas personales de forma efectiva.",
    category: "Empoderamiento",
    downloadUrl: "#"
  },
  {
    id: "6",
    title: "Plan de Seguridad Personal",
    description: "Cómo crear un plan de seguridad personalizado para situaciones de riesgo. Incluye plantillas y contactos de emergencia.",
    category: "Violencia",
    downloadUrl: "#"
  },
  {
    id: "7",
    title: "Conciliación Familiar y Laboral",
    description: "Guía sobre permisos, excedencias y derechos relacionados con la maternidad y cuidado de familiares.",
    category: "Derechos Laborales",
    downloadUrl: "#"
  },
  {
    id: "8",
    title: "Autoestima y Liderazgo Femenino",
    description: "Ejercicios prácticos para fortalecer la autoestima, desarrollar habilidades de liderazgo y romper barreras sociales.",
    category: "Empoderamiento",
    downloadUrl: "#",
    isNew: true
  }
];