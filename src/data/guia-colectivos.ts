// ─────────────────────────────────────────
// GUÍA DE BUENAS PRÁCTICAS PARA COLECTIVOS
// Basada en fuentes oficiales verificadas
// ─────────────────────────────────────────

export interface Paso {
  titulo: string
  contenido: string
}

export interface Seccion {
  id: string
  titulo: string
  descripcion: string
  pasos: Paso[]
  queDiceLaLey: string
  erroresComunes: string[]
}

export interface Recurso {
  nombre: string
  dato: string
  tipo: "telefono" | "email" | "web"
}

export interface Fuente {
  nombre: string
  url: string
}

export const GUIA_COLECTIVOS = {
  meta: {
    titulo: "Guía de buenas prácticas para colectivos de búsqueda",
    subtitulo: "Herramientas para documentar, buscar y exigir justicia",
    descripcion: "Esta guía consolida los saberes empíricos de los colectivos mexicanos con los marcos legales vigentes, protocolos oficiales y directrices internacionales. Su propósito es ofrecer un instrumento táctico, accesible y riguroso para familias sin formación jurídica previa.",
    fuentes: [
      {
        nombre: "Manual de Documentación de Casos — IMDHD (2022)",
        url: "https://www.imdhd.org/wp-content/uploads/2022/07/manual-documentacion-de-casos.pdf"
      },
      {
        nombre: "Guía Práctica de Búsqueda — I(dh)eas (2017)",
        url: "https://www.idheas.org.mx/wp-content/uploads/2019/04/guia-practica-aplicacion-del-protocolo-busqueda-personas-desaparecidas.pdf"
      },
      {
        nombre: "Protocolo Homologado de Búsqueda — Comisión Nacional de Búsqueda",
        url: "https://comisionacionaldebusqueda.segob.gob.mx/protocolos/"
      },
      {
        nombre: "16 Principios Rectores ONU — Comité CED",
        url: "https://www.ohchr.org/sites/default/files/Documents/HRBodies/CED/PrincipiosRectores_DigitalisedVersion_SP.pdf"
      },
      {
        nombre: "No Están Solas — Saberes para la búsqueda",
        url: "https://noestansolas.mx/documentos/"
      },
      {
        nombre: "Guía de Autocuidado — Iniciativa Spotlight / ONU-DH",
        url: "https://hchr.org.mx/wp/wp-content/uploads/2021/08/Guia-Spotlight-Autocuidado-FINAL.pdf"
      },
      {
        nombre: "Estrategias para una búsqueda segura — IMDHD",
        url: "https://www.imdhd.org/wp-content/uploads/2024/03/estrategias-para-una-busqueda-egura.pdf"
      }
    ] as Fuente[]
  },

  secciones: [
    {
      id: "documentacion",
      titulo: "Cómo documentar un caso desde el primer momento",
      descripcion: "La documentación meticulosa es la principal herramienta de blindaje legal de las familias. Consiste en registrar de manera sistemática, cronológica y material cada evento, evidencia e interacción institucional relacionada con la desaparición.",
      pasos: [
        {
          titulo: "Crea un expediente unificado desde el primer momento",
          contenido: "Inicia un expediente físico y digital en cuanto percibas la ausencia. Incluye: nombre completo, fecha de nacimiento, domicilio, descripción física detallada (estatura, complexión, tono de piel, cabello, señas particulares como tatuajes, cicatrices, lunares o prótesis), indumentaria del último día, últimas conexiones en redes sociales y personas con quienes tuvo contacto reciente."
        },
        {
          titulo: "Primeras 24 horas — Fase I: Búsqueda Inmediata",
          contenido: "Documenta cada exigencia planteada a la autoridad ministerial. Lleva una bitácora con hora exacta, nombre y cargo del funcionario, y registra si el Ministerio Público solicitó: geolocalización en tiempo real del dispositivo móvil, rastreo de movimientos bancarios ante la CNBV, y búsqueda urgente en hospitales, centros de detención y Servicios Médicos Forenses (SEMEFOS)."
        },
        {
          titulo: "Entre 24 y 72 horas — Fase II",
          contenido: "Asegura que se hayan recabado evidencias digitales de rápida caducidad: sábanas de llamadas (registros de telecomunicaciones), videos de cámaras de seguridad públicas C4/C5 y privadas (se sobreescriben a los 7 días), y la emisión de alertas migratorias ante el INM. Copia e integra al expediente familiar todos los documentos generados por la autoridad."
        },
        {
          titulo: "Después de 72 horas — Fase III: Largo Plazo",
          contenido: "Formaliza el trato con las autoridades por escrito. Todo lo que no queda por escrito se olvida. Exige que cada reunión con fiscales o comisiones de búsqueda genere una minuta oficial con compromisos, plazos y firmas. Solicita acuse de recibo sellado de cada documento entregado."
        }
      ],
      queDiceLaLey: "El Protocolo Homologado para la Búsqueda (PHB) estipula que las primeras 24 horas constituyen el 'Mecanismo de búsqueda inmediata', ordenando actuar con celeridad absoluta. El Principio 6 de la ONU subraya que la búsqueda debe iniciarse 'sin dilación' y sin condicionar el inicio a la aportación de datos exhaustivos por parte de la familia.",
      erroresComunes: [
        "Conformarse con acuerdos verbales: sin respaldo documental firmado, la autoridad puede negar cualquier compromiso de investigación previo.",
        "Descartar detalles por considerarlos insignificantes: cambios en la rutina, mensajes borrados o vehículos sospechosos pueden ser piezas clave para las líneas de investigación."
      ]
    },
    {
      id: "denuncia",
      titulo: "Cómo presentar una denuncia correctamente",
      descripcion: "La denuncia es el acto jurídico que activa los mecanismos de búsqueda del Estado. Para mujeres desaparecidas existen lineamientos diferenciados con perspectiva de género. No esperes 72 horas: ninguna ley en México lo exige.",
      pasos: [
        {
          titulo: "Acude acompañada a la denuncia",
          contenido: "Ve a la fiscalía acompañada por representantes de un colectivo, asesores jurídicos u organizaciones de la sociedad civil. Esta presencia protege contra el maltrato institucional y la revictimización. Denuncia ante el Ministerio Público del fuero común o en Fiscalías Especializadas en Desaparición o Delitos de Género."
        },
        {
          titulo: "Exige tu número de folio y copia de la carpeta",
          contenido: "Al concluir la declaración, exige el Número de Folio único del reporte: es el identificador clave para cualquier trámite nacional. Solicita copia íntegra y gratuita de tu declaración y de la apertura de la carpeta de investigación. La ley garantiza que estas copias sean gratuitas."
        },
        {
          titulo: "Solicita la activación del Protocolo Alba",
          contenido: "Para desapariciones de mujeres, exige explícitamente la activación del Protocolo Alba. Este mecanismo obliga a conformar un Grupo Técnico de Colaboración con policías ministeriales, municipales, INM, SEMAR, hospitales y medios de comunicación. Lleva una fotografía reciente y clara sin filtros de la mujer desaparecida."
        },
        {
          titulo: "Aporta datos técnicos que aceleren el rastreo",
          contenido: "Entrega el código IMEI del dispositivo móvil, número telefónico, compañía proveedora y números de cuenta bancaria. Exige que en ese mismo acto el fiscal expida y envíe los oficios para solicitar geolocalización satelital en tiempo real y rastreo de movimientos financieros."
        }
      ],
      queDiceLaLey: "El Principio 6 de la ONU establece que 'el inicio de la búsqueda no puede estar condicionado a plazo de tiempo alguno'. Los lineamientos del Protocolo Alba consagran el principio de Inmediatez, prohibiendo cualquier retraso en las denuncias de desaparición de mujeres.",
      erroresComunes: [
        "Esperar 72 horas para interponer la denuncia: es la falacia más peligrosa, frecuentemente promovida por personal ministerial. Ninguna ley en México exige este plazo.",
        "Acudir sola y sin información: incrementa la vulnerabilidad emocional y facilita que las autoridades emitan juicios revictimizantes o se nieguen a abrir la carpeta."
      ]
    },
    {
      id: "evidencia",
      titulo: "Recolección y preservación de evidencia",
      descripcion: "La manipulación y recolección de evidencia debe tratarse con rigor científico. Si los indicios se contaminan o se rompe la cadena de custodia, pierden su validez probatoria y destruyen la posibilidad de identificación futura por ADN.",
      pasos: [
        {
          titulo: "Asegura muestras biológicas de referencia",
          contenido: "Localiza y aísla objetos de uso personal de la mujer desaparecida: cepillo de dientes, cepillo de cabello con folículos pilosos, rastrillos, ropa interior sin lavar. Usa guantes de látex o nitrilo para manipularlos. Guárdalos en bolsas de papel estraza individuales, selladas y en un lugar seco. Nunca uses bolsas de plástico: retienen humedad y destruyen el ADN."
        },
        {
          titulo: "Resguarda evidencia digital antes de que las autoridades la confisquen",
          contenido: "Realiza respaldos de historiales de navegación, conversaciones de redes sociales, registros de llamadas y correos electrónicos. La metadata contiene rutas, geolocalizaciones y posibles perfiles de perpetradores. Actúa con cuidado para no alterar la estructura de archivos de los dispositivos originales."
        },
        {
          titulo: "Exige el Registro de Cadena de Custodia (RCC)",
          contenido: "Cuando entregues cualquier pertenencia o muestra biológica a peritos o policía ministerial, exige el llenado del Registro de Cadena de Custodia (Anexo 3 del Acuerdo A/009/15). Este formato prueba legalmente quién recolectó la prueba, cuándo y cómo fue resguardada. Sin este acuse, la evidencia puede ser anulada o perdida."
        },
        {
          titulo: "Documenta fotográficamente cualquier hallazgo",
          contenido: "Si encuentras objetos o lugares relacionados con el caso, fotografíalos antes de moverlos. No alteres la escena. Reporta el hallazgo inmediatamente a la Fiscalía y solicita que peritos especializados procesen la zona bajo protocolos forenses oficiales."
        }
      ],
      queDiceLaLey: "La Guía Nacional de Cadena de Custodia y la jurisprudencia establecen que la obtención de muestras de personas vivas debe realizarse con consentimiento informado. Los perfiles genéticos son datos personales sensibles protegidos por la Ley General de Protección de Datos Personales.",
      erroresComunes: [
        "Guardar evidencia biológica en bolsas de plástico: la humedad crea condiciones para hongos y bacterias que destruyen el ADN, imposibilitando la identificación futura.",
        "Entregar objetos al MP sin acuse oficial: ceder pertenencias sin el Registro de Cadena de Custodia abre la puerta al extravío de pruebas irrepetibles."
      ]
    },
    {
      id: "autoridades",
      titulo: "Cómo exigir a las autoridades",
      descripcion: "El marco jurídico mexicano e internacional dota a las familias de herramientas coercitivas. El objetivo es transitar de la súplica ciudadana a la exigibilidad de derechos. Las familias son fiscalizadoras y auditoras del desempeño gubernamental.",
      pasos: [
        {
          titulo: "Exige el Plan de Búsqueda Individualizado",
          contenido: "Mediante oficio formal, exige que la autoridad diseñe un plan de acción a la medida del caso, no machotes genéricos. Debe contemplar el contexto específico de la desaparición, hipótesis razonables de localización libres de prejuicios de género, y una evaluación periódica conjunta con la familia."
        },
        {
          titulo: "Propón diligencias específicas por escrito",
          contenido: "Tienes derecho a solicitar por escrito la realización de rastreos, entrevistas a testigos, cateos o peritajes. Si el Ministerio Público se niega, forzarlo a emitir respuesta oficial fundamentada y por escrito. Esa negativa sirve como prueba de inactividad para interponer amparos."
        },
        {
          titulo: "Impulsa peritajes independientes",
          contenido: "Tienes derecho a nombrar expertos forenses independientes o equipos antropológicos de la sociedad civil para auditar carpetas, revisar hallazgos en campo o realizar segundas opiniones sobre restos óseos. No estás obligada a aceptar como verdad definitiva la versión oficial."
        },
        {
          titulo: "Documenta y presenta quejas por omisiones",
          contenido: "Si un funcionario comete omisiones graves o revictimiza a la familia, documenta: fecha, hora, nombre completo, cargo y descripción del acto negligente. Presenta una queja formal ante la CNDH o la Comisión Estatal. Las recomendaciones generan presión institucional y pavimentan el camino hacia la reparación del daño."
        }
      ],
      queDiceLaLey: "La Ley General de Víctimas (2013) y la Ley General en Materia de Desaparición Forzada (2017) consagran el derecho a recepción de información oportuna, acceso gratuito a expedientes, participación directa en la logística de campo, y oposición al manejo público de datos personales. El Principio 5 del Comité ONU prohíbe usar formalismos burocráticos para obstaculizar la participación de las familias.",
      erroresComunes: [
        "Aceptar negativas orales del MP: todo rechazo debe forzarse a ser emitido por escrito para poder interponer amparos por inacción.",
        "Pagar tarifas por copias de la carpeta de investigación: la ley garantiza copias totalmente gratuitas y completas para las víctimas."
      ]
    },
    {
      id: "campo",
      titulo: "Búsqueda en campo — prácticas seguras",
      descripcion: "Realizar búsquedas en territorio exige protocolos estrictos de seguridad. No es un acto improvisado: protege la vida de las buscadoras frente a grupos armados y garantiza que los hallazgos tengan validez forense.",
      pasos: [
        {
          titulo: "Organízate en células operativas",
          contenido: "Nunca realices búsqueda en solitario. Divide al grupo en células con roles específicos: prospección y excavación, seguridad perimetral y mapeo, comunicaciones externas y contacto con bases, primeros auxilios básicos. Esta estructura previene el caos durante emergencias."
        },
        {
          titulo: "Realiza análisis de riesgo previo",
          contenido: "Antes de ir a zona, investiga el contexto sociopolítico de la comunidad, cartografía rutas de escape viables, documenta presencia de grupos armados en el polígono de búsqueda, evalúa factores climáticos, y asegura sistemas de radiocomunicación ininterrumpida o puntos de encuentro seguros en caso de repliegue."
        },
        {
          titulo: "Exige custodia y acompañamiento oficial",
          contenido: "Las buscadoras tienen derecho a recibir acompañamiento policial y pericial durante las búsquedas en campo. Invoca formalmente ante el Estado la obligación de proveer custodia armada (Guardia Nacional o fuerzas estatales) para asegurar el perímetro. Este acompañamiento no es un favor: es una obligación constitucional."
        },
        {
          titulo: "Protocolo ante un hallazgo",
          contenido: "Al detectar tierra removida, restos óseos, prendas o identificaciones: delimita y congela la zona sin alterar nada. No extraigas restos por cuenta propia salvo riesgo inminente de destrucción. Notifica inmediatamente a la autoridad pericial especializada. Documenta fotográficamente la disposición original desde la periferia."
        }
      ],
      queDiceLaLey: "El Principio 14 de la ONU CED eleva a las buscadoras al estatus de 'personas defensoras de derechos humanos en situación de alta vulnerabilidad', imponiendo al Estado el deber de garantizar su protección durante la búsqueda.",
      erroresComunes: [
        "Contaminar la escena por desesperación: tocar, mover o desenterrar restos destruye evidencia microscópica irrecuperable (polen, entomología forense) e invalida el trabajo de identificación.",
        "Adoptar perfil confrontativo en territorio de alto riesgo: la filosofía de los colectivos es pacífica. Enfrentarse a actores armados locales pone en peligro inmediato a todos los miembros."
      ]
    },
    {
      id: "cuidado",
      titulo: "Cuidado colectivo y salud de las buscadoras",
      descripcion: "El cuidado colectivo no es un lujo: es una metodología de supervivencia política y protección integral. Las buscadoras enfrentan impactos físicos, emocionales y económicos severos que deben ser atendidos para poder continuar.",
      pasos: [
        {
          titulo: "Monitorea el impacto en tu cuerpo",
          contenido: "Usa la técnica de Mapas Corporales: dibuja la silueta de tu cuerpo e identifica en qué zonas se asienta la angustia (pecho oprimido, tensión cervical, dolores gástricos). Usa colores para visualizar las cargas. Con esto, diseña intervenciones específicas: respiración diafragmática, caminatas descalza sobre tierra, meditación atenta."
        },
        {
          titulo: "Distribuye las cargas equitativamente",
          contenido: "Ninguna persona debe monopolizar el peso total de la búsqueda. Rota y delega las responsabilidades desgastantes: tareas administrativas, trabajo físico en campo, incidencia política con funcionarios, y contacto de primer nivel con nuevas víctimas. El balance entre esfuerzo y reconocimiento previene rupturas internas."
        },
        {
          titulo: "Crea espacios de contención sin juicios",
          contenido: "Realiza reuniones periódicas separadas del análisis de expedientes. En estos espacios, fomenta la expresión libre de vulnerabilidad, miedo, frustración o depresión sin censura ni juicios. La escucha activa refuerza la cohesión del grupo y el sentido de pertenencia colectiva."
        },
        {
          titulo: "Teje redes de apoyo externo",
          contenido: "Conecta con instituciones académicas, clínicas jurídicas pro-bono y entidades de solidaridad internacional. Estas alianzas permiten delegar carga técnica y obtener apoyos que mitiguen el impacto económico. Muchas madres se ven obligadas a abandonar su empleo formal para dedicarse de tiempo completo a la búsqueda."
        }
      ],
      queDiceLaLey: "El Principio 14 de la ONU CED obliga a los Estados a 'brindar apoyo económico a las víctimas que buscan a un familiar para solventar daños en la economía familiar' y a ofrecer acompañamiento psicosocial integral sostenido durante todo el proceso.",
      erroresComunes: [
        "Normalizar el colapso emocional: ignorar señales de alarma del cuerpo bajo la premisa de que 'el dolor es el precio natural' acelera el colapso que inhabilitará a la buscadora.",
        "Tomar decisiones de manera vertical y sin consenso: imponer agendas sin acuerdo colectivo genera resentimientos y divisiones que debilitan la protección comunitaria."
      ]
    },
    {
      id: "marco-legal",
      titulo: "Marco legal básico que toda buscadora debe conocer",
      descripcion: "Conocer y empuñar el marco legal convierte a las familias en litigantes estratégicas. Estas normas son vinculantes: obligan al Estado a subordinarse a la protección de la víctima bajo los ejes de debida diligencia, imparcialidad y perspectiva de género.",
      pasos: [
        {
          titulo: "Presunción de vida: el principio más importante",
          contenido: "Toda acción judicial y pericial debe ejecutarse bajo el imperativo de que la mujer desaparecida continúa con vida y requiere rescate inminente. Esta presunción no puede anularse por el contexto de criminalidad de la región, el análisis delictivo o el tiempo transcurrido. Es el Principio 1 de la ONU CED."
        },
        {
          titulo: "Exige la perspectiva de género en la investigación",
          contenido: "Las desapariciones de mujeres no pueden investigarse igual que las de varones adultos. Exige que los planes de búsqueda analicen patrones de violencia feminicida y redes de trata. Denuncia cualquier declaración que estigmatice o culpabilice a la víctima por su vestimenta, conducta o moralidad."
        },
        {
          titulo: "Solicita la Declaración Especial de Ausencia",
          contenido: "Esta figura jurídica, contemplada en la Ley General, protege la vida económica de los dependientes: suspende cobro de créditos e hipotecas, protege la custodia de hijos menores, garantiza acceso continuo a la seguridad social y salvaguarda los derechos laborales adquiridos de la mujer desaparecida."
        },
        {
          titulo: "La búsqueda es permanente e imprescriptible",
          contenido: "Los expedientes de desaparición forzada no tienen fecha de caducidad. El Estado no queda liberado de su obligación hasta que se establezca el paradero de la persona con vida, o hasta que se logre la identificación científica y restitución digna de sus restos con consentimiento de la familia."
        }
      ],
      queDiceLaLey: "El marco legal se sostiene en: Ley General en Materia de Desaparición Forzada (2017), Ley General de Víctimas (2013), Ley General de Acceso de las Mujeres a una Vida Libre de Violencia, Protocolo Homologado de Búsqueda (PHB), y la Convención Internacional para la Protección contra las Desapariciones Forzadas ratificada por México.",
      erroresComunes: [
        "Subestimar los tratados internacionales: las resoluciones de un MP local no están por encima de los estándares de la ONU, que forman parte del bloque de constitucionalidad y son vinculantes para toda autoridad.",
        "Aceptar el archivo de la carpeta de investigación: ningún expediente puede clausurarse sin recuperación certera de indicios genéticos y sin el consentimiento libre e informado de la familia."
      ]
    }
  ] as Seccion[],

  recursos: [
    {
      nombre: "Línea de búsqueda de personas",
      dato: "800 028 77 83",
      tipo: "telefono"
    },
    {
      nombre: "CEDAC — FGR (denuncia federal)",
      dato: "800 008 5400",
      tipo: "telefono"
    },
    {
      nombre: "CNDH — Atención ciudadana 24/7",
      dato: "800 715 2000",
      tipo: "telefono"
    },
    {
      nombre: "CEDAC — FGR (correo)",
      dato: "cedac@pgr.gob.mx",
      tipo: "email"
    },
    {
      nombre: "CNDH — Quejas en línea",
      dato: "https://atencionciudadana.cndh.org.mx",
      tipo: "web"
    },
    {
      nombre: "Comisión Nacional de Búsqueda",
      dato: "https://comisionacionaldebusqueda.segob.gob.mx",
      tipo: "web"
    },
    {
      nombre: "Manual de documentación — IMDHD",
      dato: "https://www.imdhd.org/publicaciones/manuales/manual-de-documentacion-de-casos-para-colectivos-y-familiares-de-personas-desaparecidas/",
      tipo: "web"
    },
    {
      nombre: "No Están Solas — Recursos",
      dato: "https://noestansolas.mx/documentos/",
      tipo: "web"
    },
    {
      nombre: "Principios Rectores ONU — Descarga",
      dato: "https://www.ohchr.org/sites/default/files/Documents/HRBodies/CED/PrincipiosRectores_DigitalisedVersion_SP.pdf",
      tipo: "web"
    }
  ] as Recurso[]
}