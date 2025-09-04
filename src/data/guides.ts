export interface Guide {
  id: string;
  title: string;
  description: string;
  category: "Derechos Humanos" | "Derechos Laborales" | "Salud Sexual" | "Recursos Legales" | "Violencia"| "Empoderamiento"| "Salud Digital";
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
    description: "Esta guía proporciona herramientas para comprender y aplicar la perspectiva de género en diversos contextos.",
    category: "Violencia",
    downloadUrl: "http://cedoc.inmujeres.gob.mx/ftpg/Sinaloa/SIN_M960_2015.pdf"
  },
  {
    id: "3",
    title: "Salud Sexual y Reproductiva",
    description: "Información completa sobre anticoncepción, ITS, embarazo y derechos reproductivos.",
    category: "Salud Sexual",
    downloadUrl: "http://cnegsr.salud.gob.mx/contenidos/descargas/Estudios/prodfinalguassyrmujyvih_gs.pdf"
  },
  {
    id: "4",
    title: "Cómo Denunciar Violencia de Género",
    description: "Paso a paso para realizar una denuncia, qué documentos necesitas y qué esperar del proceso legal. Incluye contactos de emergencia.",
    category: "Recursos Legales",
    downloadUrl: "https://www.gob.mx/cms/uploads/attachment/file/635168/C_mo_puedes_denunciar__Agosto_2019.pdf",
    isNew: true
  },
  {
    id: "5",
    title: "Construyendo tu Autonomía Económica",
    description: "Estrategias para lograr independencia financiera, emprender un negocio y gestionar tus finanzas personales de forma efectiva.",
    category: "Empoderamiento",
    downloadUrl: "https://semujeres.cdmx.gob.mx/storage/app/media/Recomendaciones_para_impulsar_la_autonomia_economica_de_las_mujeres.pdf"
  },
  {
    id: "6",
    title: "Plan de Seguridad Personal",
    description: "Cómo crear un plan de seguridad personalizado para situaciones de riesgo. Incluye plantillas y contactos de emergencia.",
    category: "Violencia",
    downloadUrl: "https://semujeres.cdmx.gob.mx/storage/app/media/PAIMEF/2019/guiaparaelpersonal.pdf"
  },
  {
    id: "7",
    title: "Conciliación Familiar y Laboral",
    description: "Guía sobre permisos, excedencias y derechos relacionados con la maternidad y cuidado de familiares.",
    category: "Derechos Laborales",
    downloadUrl: "https://www.inmujeres.gob.es/publicacioneselectronicas/documentacion/Documentos/DE1187.pdf"
  },
  {
    id: "8",
    title: "Autoestima y Liderazgo Femenino",
    description: "Ejercicios prácticos para fortalecer la autoestima, desarrollar habilidades de liderazgo y romper barreras sociales.",
    category: "Empoderamiento",
    downloadUrl: "https://inredh.org/archivos/pdf/pav_espa.pdf",
    isNew: true
  }
  ,{
    id: "9",
    title: "Salud Digital",
    description: " Cómo ayudar a la gente joven a desafiar las normas de género sobre la salud  en un mundo digital.",
    category: "Salud Digital",
    downloadUrl: "https://www.inmujeres.gob.es/areasTematicas/AreaEducacion/MaterialesDidacticos/docs/GUIASaluddigitalygenero72p.pdf",
    isNew: true
  }
];