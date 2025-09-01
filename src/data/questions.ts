export interface Question {
  id: number;
  question: string;
  options: string[];
}

export const questions: Question[] = [
  {
    id: 1,
    question: "¿Qué actividad disfrutas más?",
    options: ["Pintar o escribir", "Resolver problemas matemáticos", "Organizar eventos", "Investigar nuevas ideas"]
  },
  {
    id: 2,
    question: "¿Qué valor te representa mejor?",
    options: ["Creatividad", "Conocimiento", "Liderazgo", "Justicia"]
  },
  {
    id: 3,
    question: "Si tuvieras un día libre, ¿qué harías?",
    options: ["Pintar un cuadro", "Leer sobre ciencia", "Hacer deporte", "Salir a la naturaleza"]
  },
  {
    id: 4,
    question: "Elige una época que te atraiga más:",
    options: ["Renacimiento", "Revolución Científica", "Siglo XXI", "Antigüedad"]
  },
  {
    id: 5,
    question: "¿Qué tipo de impacto te gustaría dejar en el mundo?",
    options: ["Inspirar a otros", "Crear descubrimientos", "Defender causas", "Innovar tecnologías"]
  },
  {
    id: 6,
    question: "Si tuvieras que elegir una carrera, ¿cuál sería?",
    options: ["Arte o literatura", "Medicina o biología", "Política o liderazgo", "Ingeniería o tecnología"]
  },
  {
    id: 7,
    question: "¿Cómo prefieres trabajar?",
    options: ["De forma independiente", "En equipo", "Liderando proyectos", "Experimentando cosas nuevas"]
  },
  {
   id: 8,
  question: "¿Qué tipo de legado te gustaría dejar en la historia?",
  options: ["Artístico y cultural", "Científico y tecnológico", "Social y humanitario", "Defensa del medio ambiente"]
  },
  {
    id: 9,
    question: "Si pudieras cambiar algo en el mundo, sería:",
    options: ["Más arte y cultura", "Más ciencia e innovación", "Más justicia social", "Más cuidado ambiental"]
  },
  {
    id: 10,
    question: "¿Cómo te describen mejor?",
    options: ["Creativa", "Analítica", "Empática", "Persistente"]
  }
];
