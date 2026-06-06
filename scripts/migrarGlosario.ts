import "dotenv/config";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.VITE_SUPABASE_WOMEN_URL!,
  process.env.VITE_SUPABASE_WOMEN_ANON_KEY!
);

const terminos = [
  {
    slug: "gaslighting",
    termino: "Gaslighting",
    categoria: "Violencia psicológica",
    definicion: "Manipulación psicológica en la que alguien distorsiona la realidad de otra persona para hacerla dudar de su propia memoria, percepción o juicio. Con el tiempo, la víctima empieza a depender de la versión del agresor para entender lo que vive.",
    ejemplo_cotidiano: "Tu pareja rompe un objeto en un momento de ira y después te dice 'eso nunca pasó, siempre exageras todo'. Lo repite tanto que empiezas a creerle.",
    historia: "Una vez conocí a una mujer que escribía. Llenaba cuadernos con una letra pequeña y precisa, como quien sabe que el papel guarda mejor que la memoria. Su esposo los leía sin permiso y luego le decía que ella nunca había escrito eso, que lo había soñado. Pasaron años antes de que ella dejara de preguntarse si acaso estaba perdiendo la razón. El día que encontró uno de sus cuadernos escondido detrás de los libros de él, entendió que su mente siempre había estado bien. Era él quien necesitaba que ella dudara.",
    figura_historica: "Sor Juana Inés de la Cruz",
    figura_id: "sor-juana-ines-de-la-cruz",
    terminos_relacionados: ["stonewalling", "control-coercitivo", "victim-blaming"],
  },
  {
    slug: "stonewalling",
    termino: "Stonewalling",
    categoria: "Violencia psicológica",
    definicion: "Bloqueo emocional deliberado en el que una persona se cierra por completo a la comunicación: ignora, guarda silencio o se retira sin explicación. No es pausar una conversación, es usarla como castigo.",
    ejemplo_cotidiano: "Le dices a tu pareja que algo te lastimó y responde con silencio absoluto durante días, como si no existieras.",
    historia: "Me contaron de una mujer que aprendió a leer el silencio como se lee una amenaza. Cada vez que decía algo que incomodaba, la casa entera se volvía de hielo. No había gritos, no había portazos — solo una ausencia calculada que podía durar días. Ella aprendió a no decir ciertas cosas para no quedarse sola en medio de alguien.",
    figura_historica: "Frida Kahlo",
    figura_id: "frida-kahlo",
    terminos_relacionados: ["gaslighting", "control-coercitivo", "ghosting-emocional"],
  },
  {
    slug: "love-bombing",
    termino: "Love bombing",
    categoria: "Manipulación",
    definicion: "Bombardeo de atención, afecto y gestos exagerados al inicio de una relación con el objetivo de crear dependencia emocional rápida. Lo que parece intensidad romántica es en realidad una estrategia de control.",
    ejemplo_cotidiano: "Alguien que conociste hace dos semanas ya te dice que eres su persona, te manda flores todos los días y quiere pasar cada momento contigo.",
    historia: "Hubo una chica que confundió la intensidad con el amor porque nadie le había explicado la diferencia. Él aparecía con flores un martes sin razón, le escribía poemas a las dos de la mañana, decía que nunca había sentido algo así. En tres semanas ya hablaban de vivir juntos. Ella tardó meses en entender que tanta luz al principio fue para que no viera bien lo que venía después.",
    figura_historica: "Simone de Beauvoir",
    figura_id: "simone-de-beauvoir",
    terminos_relacionados: ["breadcrumbing", "triangulacion", "control-coercitivo"],
  },
  {
    slug: "breadcrumbing",
    termino: "Breadcrumbing",
    categoria: "Manipulación",
    definicion: "Envío de señales intermitentes de interés —un mensaje, un like, una llamada— justo cuando la otra persona está a punto de alejarse. No hay intención de compromiso real; solo de mantener a alguien disponible.",
    ejemplo_cotidiano: "No te escribe en semanas, pero justo cuando decides olvidarlo aparece con un 'hola, ¿cómo estás?' y desaparece otra vez.",
    historia: "Había una mujer que esperaba. No siempre supo que eso era lo que hacía — esperaba un mensaje, una llamada, una señal de que importaba. Él aparecía justo cuando ella había decidido no esperar más: un 'hola' sin contexto, una foto sin texto, suficiente para reiniciar el ciclo. Nunca fue suficiente para quedarse. Solo para que ella no se fuera del todo.",
    figura_historica: "Rosario Castellanos",
    figura_id: "rosario-castellanos",
    terminos_relacionados: ["love-bombing", "ghosting-emocional", "triangulacion"],
  },
  {
    slug: "ghosting-emocional",
    termino: "Ghosting emocional",
    categoria: "Manipulación",
    definicion: "Desaparición abrupta y sin explicación de alguien con quien se tenía un vínculo afectivo. No hay cierre, no hay conversación: la persona simplemente deja de existir en la vida de otra.",
    ejemplo_cotidiano: "Llevaban meses hablando todos los días y de repente deja de responder. Sin pelea, sin razón, sin nada.",
    historia: "Una mujer me describió una vez el silencio más raro que había conocido: el de alguien que todavía existe pero actúa como si ella no existiera. No hubo pelea, no hubo distancia gradual. Un día había conversación y al siguiente no había nada. Dijo que lo más difícil no fue la ausencia — fue no tener ningún lugar donde poner la pregunta.",
    figura_historica: "Elena Poniatowska",
    figura_id: "elena-poniatowska",
    terminos_relacionados: ["breadcrumbing", "stonewalling", "love-bombing"],
  },
  {
    slug: "triangulacion",
    termino: "Triangulación",
    categoria: "Manipulación",
    definicion: "Uso de una tercera persona —real o inventada— para generar celos, inseguridad o competencia. Quien triangula busca mantener el control emocional de la situación sin confrontar directamente.",
    ejemplo_cotidiano: "Tu pareja menciona constantemente a una 'amiga' que lo entiende mejor que tú, cada vez que intentas hablar de algo importante.",
    historia: "Conocí a una mujer que pasó años sintiéndose en competencia sin haber aceptado participar en ningún concurso. Él siempre mencionaba a alguien más — una amiga que lo entendía, una expareja que no era tan complicada — justo cuando ella intentaba hablar de algo importante. Con el tiempo entendió que esa tercera persona nunca fue una amenaza real. Era solo una herramienta.",
    figura_historica: "Gabriela Mistral",
    figura_id: "gabriela-mistral",
    terminos_relacionados: ["love-bombing", "gaslighting", "control-coercitivo"],
  },
  {
    slug: "control-coercitivo",
    termino: "Control coercitivo",
    categoria: "Violencia",
    definicion: "Patrón sostenido de comportamientos que buscan dominar, aislar y controlar a una persona. No siempre hay golpes: puede ser económico, social o emocional, pero el objetivo es siempre el mismo — que la víctima pierda autonomía.",
    ejemplo_cotidiano: "Él revisa tu teléfono, decide con quién puedes salir, administra tu dinero y justifica todo diciendo que es 'por tu bien'.",
    historia: "Una mujer de mi comunidad tardó mucho en llamarle violencia a lo que vivía porque nunca hubo golpes. Había restricciones: a dónde podía ir, con quién podía hablar, cuánto dinero podía gastar. Todo se presentaba como protección. El día que quiso salir sola a hacer una diligencia y tuvo que pedir permiso como si fuera una niña, algo en ella supo el nombre de lo que estaba pasando.",
    figura_historica: "Rigoberta Menchú",
    figura_id: "rigoberta-menchu",
    terminos_relacionados: ["gaslighting", "stonewalling", "violencia-vicaria"],
  },
  {
    slug: "victim-blaming",
    termino: "Victim blaming",
    categoria: "Violencia",
    definicion: "Mecanismo social y cultural que responsabiliza a la víctima por la violencia que sufrió, en lugar de al agresor. Aparece en comentarios, preguntas y actitudes que cuestionan el comportamiento de quien fue lastimada.",
    ejemplo_cotidiano: "Una mujer reporta acoso y le preguntan '¿cómo ibas vestida?' o '¿para qué fuiste a ese lugar?'",
    historia: "Supe de una joven que fue a pedir ayuda y lo primero que le preguntaron fue qué había hecho para provocarlo. Repasó mentalmente cada decisión de esa noche intentando encontrar su error. Tardó mucho en entender que esa pregunta no era para ayudarla — era para absolverlo a él.",
    figura_historica: "Olympe de Gouges",
    figura_id: "olympe-de-gouges",
    terminos_relacionados: ["acoso-callejero", "silenciamiento", "microagresiones"],
  },
  {
    slug: "acoso-callejero",
    termino: "Acoso callejero",
    categoria: "Violencia",
    definicion: "Conductas no deseadas en el espacio público —comentarios, silbidos, seguimientos, tocamientos— que invaden el espacio y la tranquilidad de una persona. Normalizado durante mucho tiempo, es una forma de violencia que limita la libertad de movimiento.",
    ejemplo_cotidiano: "Caminas sola y alguien te grita algo sobre tu cuerpo desde un coche. Apuras el paso sin saber por qué sientes miedo.",
    historia: "Había una niña que aprendió a caminar mirando el suelo antes de aprender por qué lo hacía. Después entendió: era para no cruzar miradas que se sentían como manos. Aprendió rutas más largas, horarios más seguros, ropa más invisible. Nadie le enseñó eso — lo fue aprendiendo sola, como aprenden todas.",
    figura_historica: "Virginia Woolf",
    figura_id: "virginia-woolf",
    terminos_relacionados: ["victim-blaming", "manspreading", "microagresiones"],
  },
  {
    slug: "violencia-vicaria",
    termino: "Violencia vicaria",
    categoria: "Violencia",
    definicion: "Forma de violencia en la que el agresor daña o amenaza a los hijos, mascotas u otras personas queridas para lastimar indirectamente a la madre o pareja. Es una extensión del control cuando la víctima intenta alejarse.",
    ejemplo_cotidiano: "Ella decide separarse y él le dice 'si te vas, te quito a los niños'. No la golpea a ella — la golpea a través de lo que más ama.",
    historia: "Una madre me dijo que el momento más aterrador no fue cuando él la amenazó a ella — fue cuando amenazó a sus hijos. Dijo que en ese momento entendió que ya no había salida fácil, porque irse significaba exponerlos y quedarse también. Esa trampa tiene nombre, aunque tardamos en aprenderlo.",
    figura_historica: "Malala Yousafzai",
    figura_id: "malala-yousafzai",
    terminos_relacionados: ["control-coercitivo", "gaslighting", "stonewalling"],
  },
  {
    slug: "silenciamiento",
    termino: "Silenciamiento",
    categoria: "Discriminación",
    definicion: "Mecanismo estructural e interpersonal que impide que la voz de alguien sea escuchada, tomada en cuenta o tomada en serio. Puede ser explícito o sutil, individual o colectivo.",
    ejemplo_cotidiano: "En una reunión propones una idea y nadie responde. Minutos después, un colega dice lo mismo y todos aplauden.",
    historia: "Hubo una mujer que dejó de hablar en reuniones. No porque no tuviera ideas — las tenía, y eran buenas — sino porque había aprendido que sus palabras desaparecían en el aire mientras que las mismas palabras, dichas por otra voz, llenaban la sala. No fue una decisión consciente. Fue un agotamiento que se fue acumulando propuesta por propuesta.",
    figura_historica: "Simone Weil",
    figura_id: "simone-weil",
    terminos_relacionados: ["mansplaining", "microagresiones", "victim-blaming"],
  },
  {
    slug: "microagresiones",
    termino: "Microagresiones",
    categoria: "Discriminación",
    definicion: "Actos cotidianos —comentarios, gestos, preguntas— que comunican mensajes hostiles o descalificadores hacia personas de grupos marginados. Son 'micro' en forma, pero su impacto acumulado es profundo.",
    ejemplo_cotidiano: "Eres ingeniera y en cada reunión alguien asume que eres la asistente. Nadie lo dice con mala intención, pero pasa siempre.",
    historia: "Una escritora que conocí guardaba una lista mental de todas las veces que alguien había dudado de ella antes de conocerla. La recepcionista que la mandó a esperar mientras buscaba 'al doctor'. El colega que le explicó su propio campo de investigación. El editor que le sugirió 'suavizar el tono'. Ninguno fue un monstruo. Todos pusieron un ladrillo.",
    figura_historica: "bell hooks",
    figura_id: "bell-hooks",
    terminos_relacionados: ["mansplaining", "silenciamiento", "victim-blaming"],
  },
  {
    slug: "mansplaining",
    termino: "Mansplaining",
    categoria: "Discriminación",
    definicion: "Explicar algo a una mujer de forma condescendiente, asumiendo que no lo sabe o no lo entiende, independientemente de su experiencia o conocimiento en el tema.",
    ejemplo_cotidiano: "Eres médica y un paciente le pregunta al residente —hombre— la misma pregunta que tú acabas de responder, como si tu respuesta no fuera suficiente.",
    historia: "Una científica con décadas de investigación me contó que en una conferencia internacional, un colega más joven le explicó —con mucha paciencia— los fundamentos de su propio campo de estudio. Ella lo escuchó hasta el final. Cuando él terminó, ella dijo su nombre y el de los dos premios Nobel que sostenían su trabajo. Él no supo dónde poner los ojos.",
    figura_historica: "Marie Curie",
    figura_id: "marie-curie",
    terminos_relacionados: ["silenciamiento", "microagresiones", "manspreading"],
  },
  {
    slug: "manspreading",
    termino: "Manspreading",
    categoria: "Discriminación",
    definicion: "Ocupación excesiva e inconsiderada del espacio físico en lugares públicos compartidos, en detrimento de quienes están alrededor. Refleja una apropiación inconsciente del espacio como derecho propio.",
    ejemplo_cotidiano: "En el metro, el hombre de al lado tiene las piernas completamente abiertas y tú llevas todo el trayecto encogida para no 'invadir' su espacio.",
    historia: "Una mujer describió algo tan pequeño que casi da vergüenza nombrarlo: el ritual cotidiano de encogerse. En el camión, en la sala de espera, en la oficina. Siempre haciendo espacio para que alguien más se expandiera. Un día decidió no encogerse y el hombre de al lado la miró molesto, como si ella hubiera tomado algo que era suyo. Ese momento le enseñó más que muchos libros.",
    figura_historica: "Rosa Parks",
    figura_id: "rosa-parks",
    terminos_relacionados: ["acoso-callejero", "microagresiones", "silenciamiento"],
  },
  {
    slug: "sororidad",
    termino: "Sororidad",
    categoria: "Empoderamiento",
    definicion: "Alianza, solidaridad y apoyo mutuo entre mujeres, basada en el reconocimiento de experiencias compartidas. No es solo amistad — es un acto político de cuidado colectivo.",
    ejemplo_cotidiano: "Una compañera de trabajo está siendo acosada y en lugar de ignorarlo, sus colegas la creen, la acompañan y actúan juntas.",
    historia: "Hubo un tiempo en que una mujer estaba a punto de rendirse. No de manera dramática — simplemente estaba agotada de sostenerse sola. Entonces otras mujeres, sin que ella pidiera nada, empezaron a aparecer. Una la creyó. Otra la acompañó. Otra habló cuando ella no podía. No resolvieron todo — pero ella dejó de cargarlo sola. Eso, a veces, es suficiente para seguir.",
    figura_historica: "Dolores Huerta",
    figura_id: "dolores-huerta",
    terminos_relacionados: ["silenciamiento", "microagresiones", "victim-blaming"],
  },
];

const migrar = async () => {
  console.log(`Migrando ${terminos.length} términos del glosario...`);

  const { error } = await supabase
    .from("glosario")
    .upsert(terminos, { onConflict: "slug" });

  if (error) {
    console.error("❌ Error:", error.message, error.details, error.hint);
    return;
  }

  const { count } = await supabase
    .from("glosario")
    .select("*", { count: "exact", head: true });

  console.log(`✅ Migración completa. Total en BD: ${count}/${terminos.length}`);
};

migrar();