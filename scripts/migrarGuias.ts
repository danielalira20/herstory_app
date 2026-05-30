import "dotenv/config";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.VITE_SUPABASE_WOMEN_URL!,
  process.env.VITE_SUPABASE_WOMEN_ANON_KEY!
);

const guias = [
  {
    slug: "capacitacion-derechos-humanos",
    titulo: "Guía de Capacitación en Derechos Humanos de las Mujeres",
    descripcion: "Aprende a reconocer las señales de violencia psicológica y cómo actuar. Incluye técnicas de autoayuda y recursos de emergencia.",
    categoria: "Derechos Humanos",
    url_descarga: "https://catedraunescodh.unam.mx/catedra/BibliotecaV2/Documentos/Trata/Libros/PaquetePedagogicoguia.pdf",
    es_nueva: false,
  },
  {
    slug: "genero-derechos-humanos-no-violencia",
    titulo: "Género, Derechos Humanos y No Violencia",
    descripcion: "Esta guía proporciona herramientas para comprender y aplicar la perspectiva de género en diversos contextos.",
    categoria: "Violencia",
    url_descarga: "http://cedoc.inmujeres.gob.mx/ftpg/Sinaloa/SIN_M960_2015.pdf",
    es_nueva: false,
  },
  {
    slug: "salud-sexual-reproductiva",
    titulo: "Salud Sexual y Reproductiva",
    descripcion: "Información completa sobre anticoncepción, ITS, embarazo y derechos reproductivos.",
    categoria: "Salud Sexual",
    url_descarga: "http://cnegsr.salud.gob.mx/contenidos/descargas/Estudios/prodfinalguassyrmujyvih_gs.pdf",
    es_nueva: false,
  },
  {
    slug: "como-denunciar-violencia-genero",
    titulo: "Cómo Denunciar Violencia de Género",
    descripcion: "Paso a paso para realizar una denuncia, qué documentos necesitas y qué esperar del proceso legal. Incluye contactos de emergencia.",
    categoria: "Recursos Legales",
    url_descarga: "https://www.gob.mx/cms/uploads/attachment/file/635168/C_mo_puedes_denunciar__Agosto_2019.pdf",
    es_nueva: true,
  },
  {
    slug: "autonomia-economica",
    titulo: "Construyendo tu Autonomía Económica",
    descripcion: "Estrategias para lograr independencia financiera, emprender un negocio y gestionar tus finanzas personales de forma efectiva.",
    categoria: "Empoderamiento",
    url_descarga: "https://semujeres.cdmx.gob.mx/storage/app/media/Recomendaciones_para_impulsar_la_autonomia_economica_de_las_mujeres.pdf",
    es_nueva: false,
  },
  {
    slug: "plan-seguridad-personal",
    titulo: "Plan de Seguridad Personal",
    descripcion: "Cómo crear un plan de seguridad personalizado para situaciones de riesgo. Incluye plantillas y contactos de emergencia.",
    categoria: "Violencia",
    url_descarga: "https://semujeres.cdmx.gob.mx/storage/app/media/PAIMEF/2019/guiaparaelpersonal.pdf",
    es_nueva: false,
  },
  {
    slug: "conciliacion-familiar-laboral",
    titulo: "Conciliación Familiar y Laboral",
    descripcion: "Guía sobre permisos, excedencias y derechos relacionados con la maternidad y cuidado de familiares.",
    categoria: "Derechos Laborales",
    url_descarga: "https://www.inmujeres.gob.es/publicacioneselectronicas/documentacion/Documentos/DE1187.pdf",
    es_nueva: false,
  },
  {
    slug: "autoestima-liderazgo-femenino",
    titulo: "Autoestima y Liderazgo Femenino",
    descripcion: "Ejercicios prácticos para fortalecer la autoestima, desarrollar habilidades de liderazgo y romper barreras sociales.",
    categoria: "Empoderamiento",
    url_descarga: "https://inredh.org/archivos/pdf/pav_espa.pdf",
    es_nueva: true,
  },
  {
    slug: "salud-digital",
    titulo: "Salud Digital",
    descripcion: "Cómo ayudar a la gente joven a desafiar las normas de género sobre la salud en un mundo digital.",
    categoria: "Salud Digital",
    url_descarga: "https://www.inmujeres.gob.es/areasTematicas/AreaEducacion/MaterialesDidacticos/docs/GUIASaluddigitalygenero72p.pdf",
    es_nueva: true,
  },
];

const migrar = async () => {
  console.log(`Migrando ${guias.length} guías...`);

  const { error } = await supabase
    .from("guias")
    .upsert(guias, { onConflict: "slug" });

  if (error) {
    console.error("❌ Error:", error.message, error.details, error.hint);
    return;
  }

  const { count } = await supabase
    .from("guias")
    .select("*", { count: "exact", head: true });

  console.log(`✅ Migración completa. Total en BD: ${count}/${guias.length}`);
};

migrar();