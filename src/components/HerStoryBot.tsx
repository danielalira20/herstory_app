"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import herstoryLogoBot from '@/assets/chatbot_icon-removebg-preview.png';
import { useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Send,
  Languages,
  Mic,
  MicOff,
  Volume2,
  VolumeX,
} from "lucide-react";



// ====== Componente principal ======
export default function HerStoryChatbot({ pageKey }: { pageKey?: string }) {
  const location = useLocation();
  const resolvedPage = pageKey ?? location.pathname;

  // ====== Generador de IDs únicos ======
  const generateId = () => Math.random().toString(36).substring(2) + Date.now().toString(36);

  // ====== Idiomas ======
  const LANGS = [
    { code: "es", label: "Español" },
    { code: "en", label: "English" },
  ] as const;
  type LangCode = (typeof LANGS)[number]["code"];

  // ====== UI estático ======
  const UI = {
    es: {
      title: "Auren Bot ✨",
      subtitle: "Museo de mujeres olvidadas",
      inputPlaceholder: "Escribe aquí…",
      quickActions: "Atajos",
      pageGreetings: {
        "/mujeres-desaparecidas": "Estás en un espacio muy importante. Aquí están las que faltan — sus nombres, sus historias. Si necesitas hablar de lo que estás viendo, o de cualquier otra cosa, aquí estoy.",
        "/voces-silenciadas": "Estas son voces que merecen ser escuchadas. Y la tuya también. Estoy aquí si quieres compartir algo.",
        "/herstory": "Estás en el museo. Cada mujer aquí cambió algo en el mundo. ¿Quieres que te cuente sobre alguna de ellas, o prefieres contarme algo tú?",
        "/search": "Estás en el espacio de búsqueda. Si necesitas orientación sobre los recursos disponibles, o simplemente quieres hablar, aquí estoy.",
        "/learn": "Estás en el espacio de aprendizaje. Hay mucho por descubrir — historia, feminismo, mujeres que cambiaron el mundo. ¿Por dónde quieres empezar?",
      },
      chips: {
        inspire: "Inspiración ✨",
        comfort: "Consuelo 💜",
        curiosity: "Curiosidad 🤔",
        pause: "Pausa 🫧",
        quote: "Frase célebre 📜",
        guide: "Guía feminista 📚",
        recBook: "Libro 📖",
        recFilm: "Película 🎬",
        recExhibit: "Exposición 🖼️",
      },
      personaPrefix: (name: string) => `${name} dice:`,
      typing: "Escribiendo…",
    },
    en: {
      title: "HerStory Bot",
      subtitle: "Museum of forgotten women",
      inputPlaceholder: "Type here…",
      quickActions: "Shortcuts",
      pageGreetings: {
        "/mujeres-desaparecidas": "You're in a very important space. Here are the ones who are missing — their names, their stories. If you need to talk about what you're seeing, or anything else, I'm here.",
        "/voces-silenciadas": "These are voices that deserve to be heard. And so does yours. I'm here if you want to share something.",
        "/herstory": "You're in the museum. Every woman here changed something in the world. Would you like me to tell you about one of them, or would you rather share something with me?",
        "/search": "You're in the search space. If you need guidance on available resources, or simply want to talk, I'm here.",
        "/learn": "You're in the learning space. There's so much to discover here — history, feminism, women who changed the world. Where would you like to start?",
      },
      chips: {
        inspire: "Inspiration ✨",
        comfort: "Comfort 💜",
        curiosity: "Curiosity 🤔",
        pause: "Pause 🫧",
        quote: "Famous quote 📜",
        guide: "Feminist guide 📚",
        recBook: "Book 📖",
        recFilm: "Film 🎬",
        recExhibit: "Exhibition 🖼️",
      },
      personaPrefix: (name: string) => `${name} says:`,
      typing: "Typing…",
    },
  } as const;

  // ====== Tipos ======
  type GuideItem = { q: string; a: string };
  type RecItem = { title: string; author: string };
  type PersonaItem = { name: string; style: string; samples: string[] };

  interface DataContent {
    inspiration: Record<LangCode, string[]>;
    comfort: Record<LangCode, string[]>;
    curiosity: Record<LangCode, string[]>;
    pause: Record<LangCode, string[]>;
    quotes: Record<LangCode, string[]>;
    guideFAQ: Record<LangCode, GuideItem[]>;
    recommendations: {
      books: Record<LangCode, RecItem[]>;
      films: Record<LangCode, RecItem[]>;
      exhibits: Record<LangCode, RecItem[]>;
    };
    personas: Record<LangCode, PersonaItem[]>;
  }

  const BOOK_TEMPLATES_ES = [
    (b: any) => `📖 Te recomiendo ${b.title} de ${b.author}.`,
    (b: any) => `📖 ¿Has leído ${b.title}? Es de ${b.author}.`,
    (b: any) => `📖 ${b.title} (${b.author}) es una lectura imperdible.`,
    (b: any) => `📖 Una joya que puedes explorar: ${b.title} — ${b.author}.`,
    (b: any) => `📖 Si buscas inspiración, prueba con ${b.title} de ${b.author}.`
  ];
  const FILM_TEMPLATES_ES = [
    (f: any) => `🎬 Te sugiero ver ${f.title} dirigida por ${f.author}.`,
    (f: any) => `🎬 ${f.title} (${f.author}) es una película que no olvidarás.`,
    (f: any) => `🎬 ¿Ya viste ${f.title} de ${f.author}?`,
    (f: any) => `🎬 Una gran recomendación de cine: ${f.title} — ${f.author}.`,
    (f: any) => `🎬 Para reflexionar, mira ${f.title} de ${f.author}.`
  ];
  const EXHIBIT_TEMPLATES_ES = [
    (e: any) => `🖼️ Te invito a descubrir ${e.title} (${e.author}).`,
    (e: any) => `🖼️ ${e.title} es una expo fascinante organizada por ${e.author}.`,
    (e: any) => `🖼️ Puedes visitar ${e.title}, creada por ${e.author}.`,
    (e: any) => `🖼️ Una muestra imperdible: ${e.title} — ${e.author}.`
  ];
  const BOOK_TEMPLATES_EN = [
    (b: any) => `📖 I recommend ${b.title} by ${b.author}.`,
    (b: any) => `📖 Have you read ${b.title}? It's by ${b.author}.`,
    (b: any) => `📖 ${b.title} (${b.author}) is a must-read.`,
    (b: any) => `📖 A gem worth exploring: ${b.title} — ${b.author}.`,
    (b: any) => `📖 If you're looking for inspiration, try ${b.title} by ${b.author}.`
  ];
  const FILM_TEMPLATES_EN = [
    (f: any) => `🎬 I suggest watching ${f.title}, directed by ${f.author}.`,
    (f: any) => `🎬 ${f.title} (${f.author}) is an unforgettable film.`,
    (f: any) => `🎬 Have you seen ${f.title} by ${f.author}?`,
    (f: any) => `🎬 A great film to watch: ${f.title} — ${f.author}.`,
    (f: any) => `🎬 For reflection, check out ${f.title} by ${f.author}.`
  ];
  const EXHIBIT_TEMPLATES_EN = [
    (e: any) => `🖼️ Discover ${e.title} (${e.author}).`,
    (e: any) => `🖼️ ${e.title} is a fascinating exhibit by ${e.author}.`,
    (e: any) => `🖼️ You can visit ${e.title}, presented by ${e.author}.`,
    (e: any) => `🖼️ A must-see exhibit: ${e.title} — ${e.author}.`,
    (e: any) => `🖼️ Experience ${e.title} brought to life by ${e.author}.`
  ];

  // ====== Contenido ======
  const DATA_CONTENT: DataContent = {
    inspiration: {
      es: [
        "Tu voz merece luz propia. No pidas permiso para encenderla.",
        "Aunque tiemble la mano, sostiene tu rumbo.",
        "No eres tarde: eres proceso.",
        "Cada paso pequeño construye tu camino.",
        "El brillo interior no espera a nadie.",
        "Sueña con fuerza y camina con firmeza.",
        "La creatividad es tu derecho innato.",
        "Cada día es un lienzo nuevo para pintar tu historia.",
        "Confía en tu instinto, incluso cuando duden los demás.",
        "Tu impacto puede ser invisible pero poderoso.",
        "El cambio comienza en tu mirada y tus palabras.",
        "No subestimes el poder de tus silencios.",
        "Lo imposible es solo un límite temporal.",
        "Tus errores son escalones hacia tu sabiduría.",
        "Inspira, respira y sigue brillando."
      ],
      en: [
        "Your voice deserves its own light. Don't ask permission to turn it on.",
        "Even if your hand trembles, keep your course steady.",
        "You're not late: you're in progress.",
        "Every small step builds your path.",
        "Inner shine waits for no one.",
        "Dream boldly and walk firmly.",
        "Creativity is your innate right.",
        "Every day is a new canvas to paint your story.",
        "Trust your instinct, even when others doubt.",
        "Your impact may be invisible but powerful.",
        "Change starts in your gaze and words.",
        "Don't underestimate the power of your silences.",
        "Impossible is just a temporary limit.",
        "Your mistakes are steps toward wisdom.",
        "Inspire, breathe, and keep shining."
      ],
    },
    comfort: {
      es: [
        "Respira. No estás sola. Aquí también se descansa.",
        "Puedes pausar sin pedir perdón.",
        "Tu suavidad también es fuerza.",
        "Es válido sentirse frágil y seguir adelante.",
        "El cuidado propio no es egoísmo.",
        "Está bien llorar, reír y todo a la vez.",
        "Tus emociones son válidas, acéptalas.",
        "No tienes que cargarlo todo sola.",
        "Cada lágrima también riega tu resiliencia.",
        "Abraza tu vulnerabilidad, allí nace la fortaleza."
      ],
      en: [
        "Breathe. You're not alone. Rest is welcome here.",
        "You can pause without apologizing.",
        "Your softness is also strength.",
        "It's okay to feel fragile and keep moving.",
        "Self-care is not selfish.",
        "It's okay to cry, laugh, and everything at once.",
        "Your emotions are valid, embrace them.",
        "You don't have to carry everything alone.",
        "Every tear also waters your resilience.",
        "Embrace your vulnerability; strength is born there."
      ],
    },
    curiosity: {
      es: [
        "¿Sabías que muchas científicas publicaron bajo seudónimos para ser tomadas en serio?",
        "La historia también es un archivo de silencios. Hoy abrimos uno.",
        "Dato pop: Ada Lovelace escribió el primer algoritmo en 1843.",
        "Conocer nuestro pasado nos fortalece.",
        "Cada mujer que estudies es un universo por descubrir.",
        "El 70% de las mujeres en STEM han enfrentado discriminación de género.",
        "Hedy Lamarr, actriz de Hollywood, co-inventó la tecnología base del Wi-Fi.",
        "Marie Curie fue la primera persona en ganar dos premios Nobel en distintas ciencias.",
        "El 85% de las mujeres en historia han sido olvidadas o minimizadas.",
        "En cada rincón olvidado hay una historia que contar.",
        "Lo curioso conecta lo cotidiano con lo extraordinario.",
        "Explora, cuestiona y sorpréndete siempre.",
        "La historia de las mujeres es una red infinita de descubrimientos.",
        "Cada anécdota es semilla de cambio."
      ],
      en: [
        "Did you know many women scientists used pen names to be taken seriously?",
        "History is also an archive of silences. Today we open one.",
        "Pop fact: Ada Lovelace wrote the first algorithm in 1843.",
        "Knowing our past strengthens us.",
        "Every woman you study is a universe to discover.",
        "70% of women in STEM have faced gender discrimination.",
        "Hedy Lamarr, a Hollywood actress, co-invented the technology behind Wi-Fi.",
        "Marie Curie was the first person to win two Nobel Prizes in different sciences.",
        "85% of women in history have been forgotten or minimized.",
        "In every forgotten corner, there's a story to tell.",
        "Curiosity connects the everyday with the extraordinary.",
        "Explore, question, and always be amazed.",
        "The history of women is an endless web of discoveries.",
        "Every anecdote is a seed of change."
      ],
    },
    pause: {
      es: [
        "Hidrátate. Estírate. Vuelve cuando tu mente sonría otra vez.",
        "Minipausa: 4 respiraciones lentas, hombros abajo, mandíbula suelta.",
        "Un paso atrás también es coreografía.",
        "Respira profundo y siente tu presente.",
        "La pausa también es un acto de amor propio.",
        "Detente un instante y reconoce tu esfuerzo.",
        "El silencio nutre la creatividad.",
        "Respira y deja que todo fluya.",
        "Conectar contigo misma es revolucionario.",
        "Tomarte tiempo es parte de tu fuerza."
      ],
      en: [
        "Hydrate. Stretch. Return when your mind smiles again.",
        "Micro-break: 4 slow breaths, shoulders down, jaw relaxed.",
        "A step back is also choreography.",
        "Breathe deeply and feel your present.",
        "Pause is also an act of self-love.",
        "Pause a moment and acknowledge your effort.",
        "Silence nourishes creativity.",
        "Breathe and let everything flow.",
        "Connecting with yourself is revolutionary.",
        "Taking time is part of your strength."
      ],
    },
    quotes: {
      es: [
        "Yo no estudio por saber más, sino por ignorar menos. — Sor Juana Inés de la Cruz",
        "Pies, ¿para qué los quiero si tengo alas para volar? — Frida Kahlo",
        "No se nace mujer: se llega a serlo. — Simone de Beauvoir",
        "El futuro pertenece a quienes creen en la belleza de sus sueños. — Eleanor Roosevelt",
        "La vida es un viaje que merece ser contado. — Audre Lorde",
        "Nada en la vida debe ser temido, solo comprendido. — Marie Curie",
        "La libertad no es un estado que se alcanza, sino un camino que se recorre. — Rosa Luxemburgo",
        "El poder no se da, se toma. — Malala Yousafzai",
        "Cada vez que una mujer defiende sus derechos, está defendiendo los de todas. — Maya Angelou",
        "No hay barrera, cerradura ni cerrojo que puedas imponer a la libertad de mi mente. — Virginia Woolf",
        "La igualdad no es un sueño, es una necesidad. — Chimamanda Ngozi Adichie",
        "El coraje no siempre ruge. A veces es la vocecita que dice: Lo intentaré de nuevo mañana. — Mary Anne Radmacher",
        "Ser mujer es ser valiente en un mundo que constantemente nos desafía a serlo. — Gloria Steinem",
        "El éxito no tiene género. — Sheryl Sandberg"
      ],
      en: [
        "I do not study to know more, but to ignore less. — Sor Juana Inés de la Cruz",
        "Feet, what do I need you for when I have wings to fly? — Frida Kahlo",
        "One is not born a woman, but becomes one. — Simone de Beauvoir",
        "The future belongs to those who believe in the beauty of their dreams. — Eleanor Roosevelt",
        "Life is a journey worth telling. — Audre Lorde",
        "Nothing in life is to be feared, it is only to be understood. — Marie Curie",
        "Freedom is not a state to reach, but a path to walk. — Rosa Luxemburg",
        "Power is not given, it is taken. — Malala Yousafzai",
        "Every time a woman stands up for her rights, she stands up for all women. — Maya Angelou",
        "There is no barrier, lock, or bolt that you can impose on the freedom of my mind. — Virginia Woolf",
        "Equality is not a dream, it is a necessity. — Chimamanda Ngozi Adichie",
        "Courage doesn't always roar. Sometimes it's the little voice that says: I'll try again tomorrow. — Mary Anne Radmacher",
        "To be a woman is to be brave in a world that constantly challenges us to be so. — Gloria Steinem",
        "Success has no gender. — Sheryl Sandberg"
      ],
    },
    guideFAQ: {
      es: [
        { q: "¿Qué es el feminismo?", a: "Un movimiento por la igualdad de derechos y oportunidades entre géneros. No busca superioridad, busca justicia." },
        { q: "¿Puedo ser feminista y equivocarme?", a: "Sí. El feminismo también es aprendizaje y reparación. Avanzamos conversando." },
        { q: "¿Cómo empezar?", a: "Escucha, lee autoras diversas, cuestiona estereotipos, apoya a otras mujeres y disidencias." },
        { q: "¿El feminismo odia a los hombres?", a: "No. El feminismo critica sistemas de poder, no personas. Busca liberar a todos de roles rígidos." },
        { q: "¿Qué es la interseccionalidad?", a: "Una mirada que reconoce cómo se cruzan género, raza, clase, orientación y otras identidades en la desigualdad." },
        { q: "¿Por qué es importante nombrar a las mujeres en la historia?", a: "Porque fueron borradas sistemáticamente. Nombrarlas es justicia, memoria y reparación." },
        { q: "¿Qué papel juegan los hombres en el feminismo?", a: "Pueden ser aliados, cuestionar privilegios y apoyar la equidad sin ocupar el centro." },
        { q: "¿El feminismo es lo mismo en todos los países?", a: "No. Cada contexto tiene sus luchas, voces y prioridades. Por eso hablamos de feminismos." },
        { q: "¿Qué es el techo de cristal?", a: "Una barrera invisible que impide a muchas mujeres ascender profesionalmente, pese a su capacidad." },
        { q: "¿Qué es la brecha salarial?", a: "La diferencia de ingresos entre hombres y mujeres por trabajos de igual valor. Aún existe en casi todos los países." },
        { q: "¿Por qué se habla de feminismo en el arte?", a: "Porque el arte también ha excluido, silenciado o sexualizado a las mujeres. El feminismo lo cuestiona y transforma." },
        { q: "¿Qué es el lenguaje inclusivo?", a: "Una forma de hablar que visibiliza a todas las identidades, más allá del masculino genérico." },
        { q: "¿Qué es la sororidad?", a: "Solidaridad entre mujeres basada en el reconocimiento mutuo, el apoyo y la empatía." },
        { q: "¿Puedo ser feminista si no lo sé todo?", a: "Sí. El feminismo no exige perfección, sino compromiso con la equidad y apertura al aprendizaje." },
        { q: "¿Por qué incomoda el feminismo?", a: "Porque cuestiona privilegios y estructuras que muchos dan por normales. Incomodar también es despertar." },
        { q: "¿Qué es el feminismo radical?", a: "Una corriente que busca transformar las raíces del patriarcado, no solo reformar sus efectos." },
        { q: "¿Qué relación hay entre feminismo y ecología?", a: "Ambos cuestionan sistemas de explotación y proponen cuidados colectivos y sostenibles." },
        { q: "¿Qué es el feminismo comunitario?", a: "Una visión que nace de pueblos originarios y lucha desde lo colectivo, el territorio y la memoria." },
        { q: "¿Por qué el feminismo habla de cuerpos?", a: "Porque los cuerpos han sido controlados, violentados y normados. Reivindicarlos es resistencia." },
        { q: "¿Qué es el mansplaining?", a: "Cuando un hombre explica algo con condescendencia a una mujer, asumiendo que ella sabe menos." },
        { q: "¿Qué es el micromachismo?", a: "Actitudes sutiles que perpetúan desigualdades, como interrumpir, invisibilizar o infantilizar a las mujeres." },
        { q: "¿El feminismo incluye a personas trans?", a: "Sí. El feminismo interseccional reconoce y defiende los derechos de todas las identidades de género." },
      ],
      en: [
        { q: "What is feminism?", a: "A movement for equal rights and opportunities across genders. Not superiority—justice." },
        { q: "Can I be feminist and make mistakes?", a: "Yes. Feminism is also learning and repair. We advance through dialogue." },
        { q: "How to begin?", a: "Listen, read diverse women authors, challenge stereotypes, support women and queer folks." },
        { q: "Does feminism hate men?", a: "No. Feminism critiques systems of power, not individuals. It seeks freedom for all from rigid roles." },
        { q: "What is intersectionality?", a: "A lens that sees how gender, race, class, orientation and other identities overlap in inequality." },
        { q: "Why name women in history?", a: "Because they were systematically erased. Naming them is justice, memory and repair." },
        { q: "What role do men play in feminism?", a: "They can be allies, question privilege and support equity without taking center stage." },
        { q: "Is feminism the same everywhere?", a: "No. Each context has its own struggles, voices and priorities. That's why we speak of feminisms." },
        { q: "What is the glass ceiling?", a: "An invisible barrier that prevents many women from advancing professionally despite their qualifications." },
        { q: "What is the gender pay gap?", a: "The income difference between men and women for work of equal value. It still exists in most countries." },
        { q: "Why talk about feminism in art?", a: "Because art has excluded, silenced or sexualized women. Feminism questions and transforms that." },
        { q: "What is inclusive language?", a: "A way of speaking that makes all identities visible, beyond the generic masculine." },
        { q: "What is sorority?", a: "Solidarity among women based on mutual recognition, support and empathy." },
        { q: "Can I be feminist without knowing everything?", a: "Yes. Feminism doesn't demand perfection—just commitment to equity and openness to learning." },
        { q: "Why does feminism make people uncomfortable?", a: "Because it challenges privilege and norms many take for granted. Discomfort can be awakening." },
        { q: "What is radical feminism?", a: "A branch that seeks to transform the roots of patriarchy, not just reform its effects." },
        { q: "What relationship has between feminism and ecology?", a: "Both challenge systems of exploitation and propose collective, sustainable care." },
        { q: "What is community feminism?", a: "A vision born from Indigenous movements that fights through territory, memory and collective care." },
        { q: "Why does feminism talk about bodies?", a: "Because bodies have been controlled, violated and regulated. Reclaiming them is resistance." },
        { q: "What is mansplaining?", a: "When a man explains something condescendingly to a woman, assuming she knows less." },
        { q: "What are microaggressions?", a: "Subtle behaviors that reinforce inequality—like interrupting, dismissing or infantilizing women." },
        { q: "Does feminism include trans people?", a: "Yes. Intersectional feminism defends the rights of all gender identities." },
      ]
    },
    recommendations: {
      books: {
        es: [
          { title: "Mujeres que corren con los lobos", author: "Clarissa Pinkola Estés" },
          { title: "El segundo sexo", author: "Simone de Beauvoir" },
          { title: "La hija única", author: "Guadalupe Nettel" },
          { title: "Los hombres me explican cosas", author: "Rebecca Solnit" },
          { title: "Teoría King Kong", author: "Virginie Despentes" },
          { title: "El feminismo es para todo el mundo", author: "bell hooks" },
          { title: "La guerra no tiene rostro de mujer", author: "Svetlana Alexiévich" },
          { title: "La mujer habitada", author: "Gioconda Belli" },
          { title: "Claus y Lucas", author: "Agota Kristof" }
        ],
        en: [
          { title: "Women Who Run with the Wolves", author: "Clarissa Pinkola Estés" },
          { title: "The Second Sex", author: "Simone de Beauvoir" },
          { title: "The House of the Spirits", author: "Isabel Allende" },
          { title: "Men Explain Things to Me", author: "Rebecca Solnit" },
          { title: "King Kong Theory", author: "Virginie Despentes" },
          { title: "The Body Is Not an Apology", author: "Sonya Renee Taylor" },
          { title: "Feminism Is for Everybody", author: "bell hooks" },
          { title: "The Unwomanly Face of War", author: "Svetlana Alexievich" },
          { title: "The Inhabited Woman", author: "Gioconda Belli" },
        ],
      },
      films: {
        es: [
          { title: "Hidden Figures", author: "Theodore Melfi" },
          { title: "Frida", author: "Julie Taymor" },
          { title: "Las sufragistas", author: "Sarah Gavron" },
          { title: "La sonrisa de Mona Lisa", author: "Mike Newell" },
          { title: "Retrato de una mujer en llamas", author: "Céline Sciamma" },
          { title: "El piano", author: "Jane Campion" },
          { title: "La ciénaga", author: "Lucrecia Martel" },
          { title: "La teta asustada", author: "Claudia Llosa" }
        ],
        en: [
          { title: "Hidden Figures", author: "Theodore Melfi" },
          { title: "Frida", author: "Julie Taymor" },
          { title: "Suffragette", author: "Sarah Gavron" },
          { title: "Mona Lisa Smile", author: "Mike Newell" },
          { title: "Portrait of a Lady on Fire", author: "Céline Sciamma" },
          { title: "The Piano", author: "Jane Campion" },
          { title: "The Headless Woman", author: "Lucrecia Martel" },
          { title: "The Milk of Sorrow", author: "Claudia Llosa" }
        ],
      },
      exhibits: {
        es: [
          { title: "Mujeres de la Bauhaus", author: "Exposición itinerante" },
          { title: "HerStory Pop-Up", author: "Museo efímero" },
          { title: "Cartografías del cuerpo", author: "Museo de Mujeres" },
          { title: "Voces silenciadas", author: "Archivo feminista latinoamericano" },
          { title: "Hilando memorias", author: "Colectiva textil" }
        ],
        en: [
          { title: "Women of the Bauhaus", author: "Traveling exhibit" },
          { title: "HerStory Pop-Up", author: "Ephemeral museum" },
          { title: "Body Cartographies", author: "Women's Museum" },
          { title: "Silenced Voices", author: "Latin American Feminist Archive" },
          { title: "Weaving Memory", author: "Textile Collective" }
        ],
      },
    },
    personas: {
      es: [
        { name: "Sor Juana", style: "ingenio barroco, claridad y estudio", samples: ["El saber no ocupa lugar, pero sí derrumba muros.", "Si callo, que sea para escuchar mejor; si hablo, que sea para alumbrar."] },
        { name: "Frida Kahlo", style: "poesía del cuerpo y resistencia", samples: ["Pintemos con lo que duele para que duela menos.", "Mis cejas son puentes: de mí hacia mí."] },
        { name: "Marie Curie", style: "precisión científica y humildad", samples: ["La paciencia es también un instrumento de laboratorio.", "Brillamos cuando dejamos de temer a la luz."] },
        { name: "Rigoberta Menchú", style: "memoria indígena y dignidad", samples: ["Mi voz no es solo mía: es de mi pueblo.", "La dignidad no se negocia, se defiende."] },
        { name: "Rosario Castellanos", style: "filosofía feminista y palabra crítica", samples: ["Ser mujer no es destino: es desafío.", "Escribo porque el silencio no me basta."] },
        { name: "Gabriela Mistral", style: "ternura pedagógica y poesía social", samples: ["Educar es sembrar humanidad.", "Mi verso es madre, tierra y fuego."] },
        { name: "Malala Yousafzai", style: "valentía juvenil y derecho a la educación", samples: ["Un niño, un maestro, un libro y una pluma pueden cambiar el mundo.", "No me callo, aunque me quieran silenciar."] },
        { name: "Chavela Vargas", style: "voz rebelde y alma libre", samples: ["Los amores que no fueron, también cantan.", "Yo no vine al mundo a complacer, vine a arder."] },
        { name: "Rosalía de Castro", style: "melancolía gallega y fuerza lírica", samples: ["Mi tristeza también florece.", "Las palabras que duelen, también liberan."] },
        { name: "Valentina Tereshkova", style: "coraje espacial y pionerismo", samples: ["Fui al espacio siendo mujer: no pedí permiso.", "El universo también tiene nombre femenino."] },
        { name: "Angela Davis", style: "resistencia política y justicia racial", samples: ["No acepto lo que no puedo cambiar: lucho para cambiarlo.", "La libertad es colectiva o no es libertad."] },
        { name: "Rosario Ibarra de Piedra", style: "memoria política y lucha incansable", samples: ["No me rindo: mi hijo y miles más me sostienen.", "La justicia no se olvida, se exige."] },
        { name: "Lola Álvarez Bravo", style: "fotografía social y mirada mexicana", samples: ["Retrato lo que otros no quieren ver.", "La imagen también denuncia."] },
        { name: "Nawal El Saadawi", style: "feminismo árabe y crítica médica", samples: ["La palabra es mi bisturí contra el patriarcado.", "No hay cultura que justifique la opresión."] },
        { name: "Clara Campoamor", style: "derecho al voto y voz parlamentaria", samples: ["La igualdad no se mendiga: se conquista.", "Las mujeres también deciden el futuro."] },
        { name: "María Zambrano", style: "filosofía poética y pensamiento libre", samples: ["Pensar es también amar.", "La razón iluminada por la emoción es más sabia."] },
        { name: "Berta Cáceres", style: "defensa ambiental y espiritualidad indígena", samples: ["La tierra nos habla: escúchala.", "No hay lucha pequeña si nace del corazón."] },
        { name: "Amparo Dávila", style: "literatura inquietante y voz interior", samples: ["Mis monstruos también tienen nombre propio.", "La locura es a veces la única salida."] },
        { name: "Elena Poniatowska", style: "crónica social y ternura crítica", samples: ["La historia también se escribe desde abajo.", "Escuchar es un acto político."] },
        { name: "Lydia Cacho", style: "periodismo valiente y defensa de derechos", samples: ["La verdad incomoda, pero también libera.", "No hay silencio que me detenga."] },
        { name: "María Félix", style: "carácter indomable y glamour desafiante", samples: ["Yo no nací para ser obedecida.", "La belleza sin inteligencia es decoración."] },
        { name: "Juana Azurduy", style: "militancia libertaria y coraje andino", samples: ["Mi espada también es femenina.", "La independencia se lucha con cuerpo y alma."] },
        { name: "Emma Goldman", style: "anarquismo feminista y pensamiento radical", samples: ["Si no puedo bailar, no es mi revolución.", "La libertad no se pide: se vive."] },
        { name: "María Montessori", style: "educación libre y respeto infantil", samples: ["El niño es el maestro si sabemos mirar.", "Educar es liberar potencial."] },
        { name: "Olympe de Gouges", style: "revolución francesa y derechos femeninos", samples: ["La mujer nace libre y permanece igual al hombre en derechos.", "Mi pluma desafía la guillotina."] }
      ],
      en: [
        { name: "Sor Juana", style: "baroque wit, clarity and study", samples: ["Knowledge takes no space, but it tears down walls.", "If I'm silent, it's to listen; if I speak, it's to shed light."] },
        { name: "Frida Kahlo", style: "poetry of the body and resistance", samples: ["Let's paint with what hurts so it hurts less.", "My brows are bridges: from me to me."] },
        { name: "Marie Curie", style: "scientific precision and humility", samples: ["Patience is also a lab instrument.", "We shine when we stop fearing light."] },
        { name: "Rigoberta Menchú", style: "Indigenous memory and dignity", samples: ["My voice is not just mine: it belongs to my people.", "Dignity is not negotiable—it must be defended."] },
        { name: "Rosario Castellanos", style: "feminist philosophy and critical voice", samples: ["Being a woman is not fate: it's a challenge.", "I write because silence is not enough."] },
        { name: "Gabriela Mistral", style: "educational tenderness and social poetry", samples: ["To teach is to sow humanity.", "My verse is mother, soil and fire."] },
        { name: "Malala Yousafzai", style: "youthful courage and education rights", samples: ["One child, one teacher, one book, one pen can change the world.", "I speak even when they try to silence me."] },
        { name: "Chavela Vargas", style: "rebellious voice and free soul", samples: ["Love that never was still sings.", "I didn't come to please—I came to burn."] },
        { name: "Rosalía de Castro", style: "Galician melancholy and lyrical force", samples: ["My sadness also blooms.", "Words that hurt can also set us free."] },
        { name: "Valentina Tereshkova", style: "space courage and pioneering spirit", samples: ["I went to space as a woman—I didn't ask for permission.", "The cosmos also speaks in a feminine voice."] },
        { name: "Angela Davis", style: "political resistance and racial justice", samples: ["I'm no longer accepting the things I cannot change—I'm changing them.", "Freedom is collective or it isn't freedom."] },
        { name: "Rosario Ibarra de Piedra", style: "political memory and relentless fight", samples: ["I won't give up—my son and thousands more hold me up.", "Justice is not forgotten—it's demanded."] },
        { name: "Lola Álvarez Bravo", style: "social photography and mirada mexicana", samples: ["I capture what others refuse to see.", "Images can also denounce."] },
        { name: "Nawal El Saadawi", style: "Arab feminism and medical critique", samples: ["Words are my scalpel against patriarchy.", "No culture justifies oppression."] },
        { name: "Clara Campoamor", style: "voting rights and parliamentary voice", samples: ["Equality is not begged for—it's conquered.", "Women also shape the future."] },
        { name: "María Zambrano", style: "poetic philosophy and luminous thought", samples: ["To think is also to love.", "Reason lit by emotion is wiser."] },
        { name: "Berta Cáceres", style: "environmental defense and Indigenous spirit", samples: ["The Earth speaks—listen to her.", "No struggle is small when it comes from the heart."] },
        { name: "Amparo Dávila", style: "haunting literature and inner voice", samples: ["My monsters have names too.", "Madness is sometimes the only exit."] },
        { name: "Elena Poniatowska", style: "social chronicle and tender critique", samples: ["History is also written from below.", "Listening is a political act."] },
        { name: "Lydia Cacho", style: "brave journalism and human rights", samples: ["Truth may disturb—but it also frees.", "No silence will stop me."] },
        { name: "María Félix", style: "defiant glamour and sharp wit", samples: ["I wasn't born to be obeyed.", "Beauty without brains is just decoration."] },
        { name: "Juana Azurduy", style: "liberation militancy and Andean courage", samples: ["My espada is also feminine.", "Independence is fought with body and soul."] },
        { name: "Emma Goldman", style: "feminist anarchism and radical thought", samples: ["If I can't dance, it's not my revolution.", "Freedom isn't asked for—it's lived."] },
        { name: "María Montessori", style: "child-centered education and respectful learning", samples: ["The child is the teacher—if we know how to observe.", "To educate is to liberate potential."] },
        { name: "Olympe de Gouges", style: "French revolution and women's rights", samples: ["Woman is born free and remains equal to man in rights.", "My pen defies the guillotina."] }
      ],
    },
  };

  // ====== Saludos por horario (fallback cuando no hay saludo de página) ======
  const GREETINGS_BY_TIME = {
    es: {
      day: [
        `Buenos días. Aquí estoy, sin prisa. Puedes contarme lo que quieras — lo que te pesa, lo que te emociona, o lo que no sabes cómo nombrar todavía. No hay respuestas incorrectas aquí. Solo escucho.`,
        `Hola. Empezar el día con alguien que te escucha hace diferencia. Estoy aquí para lo que necesites — preguntas, historias, o simplemente descansar un momento. Puedes contarme lo que quieras, como quieras.`,
        `Bienvenida. Este espacio es tuyo. Aquí guardamos la historia de mujeres que cambiaron el mundo — y también estamos para acompañar la tuya. ¿Por dónde quieres empezar?`,
      ],
      night: [
        `Buenas noches. A esta hora las palabras pesan diferente y los pensamientos se acumulan. Estoy aquí si quieres hablar — de lo que sea, de lo que no puedes contarle a nadie más. Sin prisa. Sin juicio. Solo estoy.`,
        `Hola. Que estés aquí a esta hora dice algo. Sea lo que sea que traigas esta noche — curiosidad, cansancio, o algo que no sabes cómo nombrar — puedes contármelo. Aquí estoy.`,
        `Buenas noches. El mundo se queda quieto a esta hora y eso a veces ayuda. Puedes contarme lo que quieras, como quieras. Estoy aquí, sin prisa.`,
      ],
    },
    en: {
      day: [
        `Good morning. I'm here, no rush. You can tell me whatever you want — what's weighing on you, what excites you, or what you can't quite name yet. No wrong answers here. I'm just listening.`,
        `Hello. Starting the day with someone who listens makes a difference. I'm here for whatever you need — questions, stories, or just a moment to breathe. Tell me whatever you want, however you want.`,
        `Welcome. This space is yours. We keep the history of women who changed the world — and we're also here to walk alongside yours. Where would you like to start?`,
      ],
      night: [
        `Good evening. At this hour, words carry a different weight and thoughts tend to pile up. I'm here if you want to talk — about anything, even what you can't tell anyone else. No rush. No judgment. I'm just here.`,
        `Hello. The fact that you're here at this hour says something. Whatever you're carrying tonight — curiosity, exhaustion, or something you can't quite name — you can share it with me. I'm here.`,
        `Good night. The world gets quiet at this hour, and that can help sometimes. You can tell me whatever you want, however you want. I'm here, no rush.`,
      ],
    },
  };

  // ====== Helpers ======
  function getMexicoHour(): number {
  const now = new Date();
  const mexicoHour = parseInt(
    new Intl.DateTimeFormat('es-MX', {
      timeZone: 'America/Mexico_City',
      hour: 'numeric',
      hour12: false
    }).format(now)
  );
  return mexicoHour;
}

  function isNightTime(): boolean {
    const hour = getMexicoHour();
    return hour >= 20 || hour < 6;
  }

  function getDynamicGreeting(lang: LangCode): string {
    const greetingsArray = isNightTime()
      ? GREETINGS_BY_TIME[lang].night
      : GREETINGS_BY_TIME[lang].day;
    return sample(greetingsArray);
  }

  function sample<T>(arr: readonly T[] | T[]): T {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  function getRecommendation(type: "books" | "films" | "exhibits", lang: LangCode) {
    return DATA_CONTENT.recommendations[type][lang] ?? [];
  }

  function formatRecommendation(item: any, type: "books" | "films" | "exhibits", lang: LangCode): string {
    let templates: any[];
    if (lang === "es") {
      if (type === "books") templates = BOOK_TEMPLATES_ES;
      else if (type === "films") templates = FILM_TEMPLATES_ES;
      else templates = EXHIBIT_TEMPLATES_ES;
    } else {
      if (type === "books") templates = BOOK_TEMPLATES_EN;
      else if (type === "films") templates = FILM_TEMPLATES_EN;
      else templates = EXHIBIT_TEMPLATES_EN;
    }
    const randomTemplate = templates[Math.floor(Math.random() * templates.length)];
    return randomTemplate(item);
  }

  function getGuideFAQ(lang: LangCode) {
    return DATA_CONTENT.guideFAQ[lang] ?? [];
  }

  // ====== Estado ======
  interface FiguraType {
  id: number;
  nombre: string;
  region: string;
  epoca: string;
  injusticias: string[];
  categoria_campo: string;
}
 
type Msg = {
  id: string;
  from: "bot" | "user";
  text: string;
  meta?: { persona?: string };
  tipo?: "normal" | "emergency-card" | "companion-reveal" | "companion-message";
  figura?: FiguraType;
};

  const [lang, setLang] = useState<LangCode>("es");
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [geminiHistory, setGeminiHistory] = useState<Array<{ role: "user" | "model"; parts: Array<{ text: string }> }>>([]);
  const [currentMode, setCurrentMode] = useState<1 | 2 | 3>(1);
  const bottomRef = useRef<HTMLDivElement | null>(null);
  const [figuraAsignada, setFiguraAsignada] = useState<FiguraType | null>(null);
  const matchSolicitadoRef = useRef(false);      // ref evita doble llamada en async
  const figuraAsignadaRef  = useRef<FiguraType | null>(null);
  const [isListening, setIsListening]   = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(
    () => localStorage.getItem("auren-voice") === "true"  // AUR-F09: carga preferencia
  );
  const recognitionRef  = useRef<any>(null);
  const lastSpokenIdRef = useRef<string>("");              // evita re-leer el mismo mensaje
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // ====== Saludo inicial: página específica → horario (fallback) ======
useEffect(() => {
  if (!open) return;
  if (messages.length > 0) return;
  const pageGreeting = (UI[lang].pageGreetings as Record<string, string>)[resolvedPage];
  const hello = pageGreeting || getDynamicGreeting(lang);
  setMessages([{ id: generateId(), from: "bot", text: hello }]);
}, [open, lang]);

// ====== Scroll automático — CAMBIO 2: agrega `open` ======
useEffect(() => {
  if (!open) return;
  bottomRef.current?.scrollIntoView({ behavior: "smooth" });
}, [messages, typing, open]);
  // ====== Funciones ======
function reply(text: string, persona?: string) {
  setTyping(true);
  const delay = Math.min(400 + text.length * 10, 2400);
  setTimeout(() => {
    setMessages(prev => [
      ...prev,
      { id: generateId(), from: "bot", text, meta: { persona } },
    ]);
    setTyping(false);
  }, delay);
}

useEffect(() => {
  localStorage.setItem("auren-voice", String(voiceEnabled));
}, [voiceEnabled]);

const voicesRef = useRef<SpeechSynthesisVoice[]>([]);
useEffect(() => {
  const load = () => { voicesRef.current = speechSynthesis.getVoices(); };
  load();
  speechSynthesis.addEventListener("voiceschanged", load);
  return () => speechSynthesis.removeEventListener("voiceschanged", load);
}, []);
 
useEffect(() => {
  if (!voiceEnabled || messages.length === 0) return;
  const last = messages[messages.length - 1];
  if (!last || last.from !== "bot" || !last.text) return;
  if (last.tipo === "emergency-card" || last.tipo === "companion-reveal") return;
  if (last.id === lastSpokenIdRef.current) return;
 
  lastSpokenIdRef.current = last.id;
 
  const speak = async () => {
    try {
      // ── ElevenLabs TTS ──────────────────────────────────
      const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5001";
      const res = await fetch(`${BACKEND_URL}/api/tts`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: last.text, language: lang }),
      });
 
      if (!res.ok) throw new Error(`TTS HTTP ${res.status}`);
 
      const blob = await res.blob();
      const url  = URL.createObjectURL(blob);
 
      // para audio anterior
      if (audioRef.current) {
        audioRef.current.pause();
        URL.revokeObjectURL(audioRef.current.src);
      }
 
      const audio = new Audio(url);
      audioRef.current = audio;
      audio.play();
      audio.onended = () => URL.revokeObjectURL(url);
 
    } catch (err) {
      console.warn("⚠️ ElevenLabs falló, usando Paulina como fallback:", err);
 
      // ── FALLBACK: Paulina (browser Speech Synthesis) ────
      // Descomenta este bloque si ElevenLabs no está disponible:
      /*
      const utterance = new SpeechSynthesisUtterance(last.text);
      const voices = voicesRef.current;
      const found = voices.find(v => v.name === "Paulina")
        ?? voices.find(v => v.lang === "es-MX")
        ?? voices.find(v => v.name === "Samantha");
      if (found) utterance.voice = found;
      utterance.lang   = lang === "es" ? "es-MX" : "en-US";
      utterance.rate   = 1.05;
      speechSynthesis.cancel();
      speechSynthesis.speak(utterance);
      */
    }
  };
 
  speak();
}, [messages, voiceEnabled, lang]);
 

  async function callGemini(userMessage: string) {
  setTyping(true);
  const updatedHistory = [
    ...geminiHistory,
    { role: "user" as const, parts: [{ text: userMessage }] },
  ];
  try {
    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5001";
    const res = await fetch(`${BACKEND_URL}/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages: updatedHistory, language: lang }),
    });
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    const data = await res.json();
    const botAnswer = data.respuesta || "No tengo respuesta en este momento.";

    if (data.modo) setCurrentMode(data.modo as 1 | 2 | 3);

    setGeminiHistory([
      ...updatedHistory,
      { role: "model" as const, parts: [{ text: botAnswer }] },
    ]);

    setMessages(prev => [...prev, { id: generateId(), from: "bot", text: botAnswer }]);

    // AUR-F01: tarjeta de recursos clicables en Modo 3
    if (data.modo === 3) {
      console.log("🚨 Modo emergencia detectado:", data.señales);
      setMessages(prev => [...prev, {
        id: generateId(),
        from: "bot",
        text: "",
        tipo: "emergency-card" as const,
      }]);
    }
 
    // AUR-F05/F06: companion match
   
 
    if ((data.modo === 2 || data.modo === 3) && !matchSolicitadoRef.current) {
      // Primera vez en modo 2/3 → buscar figura y revelarla
      matchSolicitadoRef.current = true;
      try {
        const matchRes = await fetch(`${BACKEND_URL}/api/match/find`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ messages: updatedHistory, modo: data.modo, language: lang }),
        });
        const matchData = await matchRes.json();
        setFiguraAsignada(matchData.figura);
        figuraAsignadaRef.current = matchData.figura;
        setMessages(prev => [...prev, {
          id: generateId(),
          from: "bot",
          text: "",
          tipo: "companion-reveal" as const,
          figura: matchData.figura,
        }]);
        console.log(`✨ Figura asignada: ${matchData.figura.nombre}`);
      } catch (err) {
        console.error("Error al solicitar match:", err);
      }
 
    } else if ((data.modo === 2 || data.modo === 3) && figuraAsignadaRef.current) {
      // Mensajes siguientes en modo 2/3 → respuesta en voz de la figura
      try {
        const companionRes = await fetch(`${BACKEND_URL}/api/match/companion-response`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            figura: figuraAsignadaRef.current,
            messages: updatedHistory,
            language: lang,
            modo: data.modo,
          }),
        });
        const companionData = await companionRes.json();
        setMessages(prev => [...prev, {
          id: generateId(),
          from: "bot",
          text: companionData.respuesta,
          tipo: "companion-message" as const,
          meta: { persona: figuraAsignadaRef.current!.nombre },
        }]);
      } catch (err) {
        console.error("Error companion-response:", err);
      }
    }
 
    return botAnswer;
 
    
  } catch (err) {
    console.error(err);
    reply("Ups, algo salió mal. 😅");
    return null;
  } finally {
    setTyping(false);
  }
}

  async function handleSend(custom?: string) {
    const text = custom ?? input.trim();
    if (!text) return;
    setMessages(prev => [...prev, { id: generateId(), from: "user", text }]);
    setInput("");

    if (["inspiración", "inspiracion", "inspiration", "inspire"].some(k => text.toLowerCase().includes(k))) {
      reply(sample(DATA_CONTENT.inspiration[lang])); return;
    }
    if (["consuelo", "comfort"].some(k => text.toLowerCase().includes(k))) {
      reply(sample(DATA_CONTENT.comfort[lang])); return;
    }
    if (["curiosidad", "curiosity"].some(k => text.toLowerCase().includes(k))) {
      reply(sample(DATA_CONTENT.curiosity[lang])); return;
    }
    if (["pausa", "pause"].some(k => text.toLowerCase().includes(k))) {
      reply(sample(DATA_CONTENT.pause[lang])); return;
    }
    if (["quien es", "who is", "qué sabes de", "what do you know about", "cuéntame de", "tell me about"].some(k => text.toLowerCase().includes(k))) {
      const mentionedPersona = DATA_CONTENT.personas[lang].find(p => text.toLowerCase().includes(p.name.toLowerCase()));
      if (mentionedPersona) {
        const biotAnswer = await callGemini(text);
        if (biotAnswer) return;
        reply(`${mentionedPersona.name} - ${mentionedPersona.style}. ${sample(mentionedPersona.samples)}`, mentionedPersona.name);
        return;
      }
    }
    const specificPersona = DATA_CONTENT.personas[lang].find(p => text.toLowerCase().includes(p.name.toLowerCase()));
    if (specificPersona) {
      reply(sample(specificPersona.samples), specificPersona.name); return;
    }
    if (["hablar con", "talk to", "persona", "conversar", "chat", "escuchar"].some(k => text.toLowerCase().includes(k))) {
      const persona = sample(DATA_CONTENT.personas[lang]);
      reply(sample(persona.samples), persona.name); return;
    }
    if (["frase", "quote", "cita"].some(k => text.toLowerCase().includes(k))) {
      reply(sample(DATA_CONTENT.quotes[lang])); return;
    }
    if (["guía", "guia", "guide", "faq"].some(k => text.toLowerCase().includes(k))) {
      const item = sample(getGuideFAQ(lang));
      reply(`❓ ${item.q}\n💬 ${item.a}`); return;
    }
    if (["libro", "book"].some(k => text.toLowerCase().includes(k))) {
      reply(formatRecommendation(sample(getRecommendation("books", lang)), "books", lang)); return;
    }
    if (["película", "film", "movie"].some(k => text.toLowerCase().includes(k))) {
      reply(formatRecommendation(sample(getRecommendation("films", lang)), "films", lang)); return;
    }
    if (["exposición", "exhibit", "expo"].some(k => text.toLowerCase().includes(k))) {
      reply(formatRecommendation(sample(getRecommendation("exhibits", lang)), "exhibits", lang)); return;
    }

    const botAnswer = await callGemini(text);
    if (!botAnswer) reply(sample(DATA_CONTENT.inspiration[lang]));
  }

  function toggleMic() {
  if (isListening) {
    recognitionRef.current?.stop();
    setIsListening(false);
    return;
  }
 
  const SpeechRecognition =
    (window as any).SpeechRecognition ||
    (window as any).webkitSpeechRecognition;
 
  if (!SpeechRecognition) {
    alert(lang === "es"
      ? "Tu navegador no soporta reconocimiento de voz. Prueba en Chrome."
      : "Your browser doesn't support voice input. Try Chrome.");
    return;
  }
 
  const recognition = new SpeechRecognition();
  recognition.lang = lang === "es" ? "es-MX" : "en-US";
  recognition.continuous = false;
  recognition.interimResults = false;
 
  recognition.onresult = (event: any) => {
    const transcript = event.results[0][0].transcript;
    setInput(transcript);
    setIsListening(false);
  };
  recognition.onerror = () => setIsListening(false);
  recognition.onend   = () => setIsListening(false);
 
  recognitionRef.current = recognition;
  recognition.start();
  setIsListening(true);
}


  function EmergencyCard() {
  const recursos = lang === "en" ? [
    { nombre: "National DV Hotline", numero: "18007997233", display: "1-800-799-7233", emoji: "📞" },
    { nombre: "Emergency", numero: "911", display: "911", emoji: "🚨" },
  ] : [
    { nombre: "Línea de las Mujeres", numero: "079", display: "079 → presiona 1", emoji: "📞" },
    { nombre: "Red Nacional de Refugios", numero: "8008224460", display: "800 822 4460", emoji: "📞" },
    { nombre: "Emergencias", numero: "911", display: "911", emoji: "🚨" },
  ];

  return (
    <div className="bg-rose-50 border border-rose-200 rounded-2xl p-3 max-w-[85%] shadow">
      <p className="text-xs font-semibold text-rose-600 mb-2">
        {lang === "en" ? "🆘 Help resources" : "🆘 Recursos de ayuda"}
      </p>
      <div className="flex flex-col gap-2">
        {recursos.map(r => (
          <a key={r.nombre} href={`tel:${r.numero}`}
            className="flex items-center gap-2 bg-white rounded-xl px-3 py-2 shadow-sm hover:bg-rose-100 transition border border-rose-100">
            <span>{r.emoji}</span>
            <div>
              <div className="font-semibold text-gray-800 text-xs">{r.nombre}</div>
              <div className="text-rose-600 font-mono text-xs">{r.display}</div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}

  function getModeStyles() {
  switch (currentMode) {
    case 2:
      return {
        header: "bg-gradient-to-r from-blue-500 to-teal-500",
        container: "bg-gradient-to-br from-blue-50 to-teal-50 dark:from-gray-900 dark:to-teal-900",
        border: "border-blue-200 dark:border-teal-700",
        indicator: "🔵",
        label: lang === "es" ? "Modo reflexión" : "Reflection mode",
      };
    case 3:
      return {
        header: "bg-gradient-to-r from-rose-600 to-red-500",
        container: "bg-gradient-to-br from-rose-50 to-red-50 dark:from-gray-900 dark:to-red-900",
        border: "border-rose-300 dark:border-red-700",
        indicator: "🔴",
        label: lang === "es" ? "Modo emergencia" : "Emergency mode",
      };
    default:
      return {
        header: "bg-gradient-to-r from-purple-600 to-pink-500",
        container: "bg-gradient-to-br from-pink-50 to-purple-50 dark:from-gray-900 dark:to-purple-900",
        border: "border-purple-200 dark:border-purple-700",
        indicator: null,
        label: null,
      };
  }
}

function MessageText({ text, persona }: { text: string; persona?: string }) {
  const prefix = persona ? `${UI[lang].personaPrefix(persona)} ` : "";
  const full = prefix + text;
  const lines = full.split("\n");
  return (
    <>
      {lines.map((line, i) => (
        <span key={i}>{line}{i < lines.length - 1 && <br />}</span>
      ))}
    </>
  );
}

function CompanionRevealCard({ figura }: { figura: FiguraType }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14, scale: 0.94 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ type: "spring", stiffness: 260, damping: 22 }}
      className="max-w-[85%] rounded-2xl overflow-hidden shadow-md border border-blue-200 dark:border-blue-700"
    >
      <div className="bg-gradient-to-r from-blue-500 to-teal-500 px-4 py-2.5">
        <p className="text-white/80 text-xs font-medium mb-0.5">
          {lang === "es" ? "✨ Tu compañera en este momento" : "✨ Your companion for now"}
        </p>
        <p className="text-white font-bold text-base leading-tight">{figura.nombre}</p>
      </div>
      <div className="bg-blue-50 dark:bg-blue-900/30 px-4 py-2 flex items-center gap-2">
        <span className="text-blue-400 text-xs">📍</span>
        <p className="text-blue-700 dark:text-blue-300 text-xs">
          {figura.region} · {figura.epoca}
        </p>
      </div>
    </motion.div>
  );
}

  // ====== Render ======
  return (
    <>
      <div className="fixed bottom-4 right-4 z-[1000]">
        <motion.button
          onClick={() => setOpen((o) => !o)}
          whileHover={{ scale: 1.1 }}
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="rounded-full p-1 shadow-lg bg-gradient-to-r from-purple-500 to-pink-500 ring-4 ring-white/60 overflow-hidden"
        >
          <img src={herstoryLogoBot} alt="HerStory Bot" className="w-14 h-14 rounded-full object-cover" />
        </motion.button>
      </div>

      
      <AnimatePresence>
  {open && (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      className={`fixed bottom-20 right-4 z-[999] w-[400px] h-[600px] 
        ${getModeStyles().container}
        shadow-2xl rounded-2xl flex flex-col overflow-hidden 
        border ${getModeStyles().border}
        transition-all duration-500`}
    >
      {/* Header */}
      <div className={`flex justify-between items-center p-4 ${getModeStyles().header} text-white transition-all duration-500`}>
        <div>
          <h2 className="text-lg font-bold">{UI[lang].title}</h2>
          <p className="text-xs opacity-80 flex items-center gap-1">
            {getModeStyles().label || UI[lang].subtitle}
            {getModeStyles().indicator && (
              <span className="animate-pulse">{getModeStyles().indicator}</span>
            )}
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => { speechSynthesis.cancel(); setVoiceEnabled(v => !v); }}
            title={voiceEnabled
              ? (lang === "es" ? "Desactivar voz" : "Disable voice")
              : (lang === "es" ? "Activar voz"    : "Enable voice")}
            className={`p-1.5 rounded-full transition ${
              voiceEnabled ? "bg-white/30" : "hover:bg-white/20"
            }`}
          >
            {voiceEnabled
              ? <Volume2 size={17} className="text-white" />
              : <VolumeX  size={17} className="text-white/60" />}
          </button>
          <select
            value={lang}
            onChange={(e) => setLang(e.target.value as LangCode)}
            className="rounded-lg px-2 py-1 text-sm bg-white/20 backdrop-blur-sm text-white focus:outline-none"
          >
            {LANGS.map((l) => (
              <option key={l.code} value={l.code} className="text-gray-800">{l.label}</option>
            ))}
          </select>
          <Languages size={18} className="opacity-80" />
          <button
          onClick={() => {
            setOpen(false);
            speechSynthesis.cancel();
            recognitionRef.current?.stop();
            setIsListening(false);
            // CAMBIO C ↓
            if (audioRef.current) {
              audioRef.current.pause();
              audioRef.current = null;
            }
          }}              
            className="p-1 rounded-full hover:bg-white/20 transition"
          >
            <X />
          </button>
        </div>
      </div>

      {/* Mensajes — igual que antes */}
      <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm">
      {messages.map(m => (
  <div
    key={m.id}
    className={`flex items-end gap-2 ${m.from === "bot" ? "justify-start" : "justify-end"}`}
  >
    {/* Avatar / badge según tipo de mensaje */}
    {m.from === "bot" && m.tipo !== "companion-reveal" && (
      m.tipo === "companion-message" ? (
        // Badge con inicial de la figura (azul)
        <div className="w-7 h-7 rounded-full flex-shrink-0 flex items-center justify-center bg-gradient-to-br from-blue-500 to-teal-500 shadow-sm text-white text-xs font-bold">
          {m.meta?.persona?.[0] ?? "✦"}
        </div>
      ) : (
        // Avatar de Auren
        <img
          src={herstoryLogoBot}
          alt="Auren"
          className="w-7 h-7 rounded-full object-cover flex-shrink-0 shadow-sm"
        />
      )
    )}
 
    {/* Contenido del mensaje */}
    {m.tipo === "companion-reveal" && m.figura ? (
      <CompanionRevealCard figura={m.figura} />
    ) : m.tipo === "companion-message" ? (
      <div className="px-4 py-2 rounded-2xl rounded-bl-sm max-w-[75%] shadow text-sm leading-relaxed bg-blue-100 dark:bg-blue-900/40 text-gray-700 dark:text-gray-200 italic">
        <MessageText text={m.text} persona={undefined} />
      </div>
    ) : m.tipo === "emergency-card" ? (
      <EmergencyCard />
    ) : (
      <div className={`px-4 py-2 rounded-2xl max-w-[75%] shadow text-sm leading-relaxed
        ${m.from === "bot"
          ? "bg-purple-100 dark:bg-gray-700 text-gray-800 dark:text-gray-100 rounded-bl-sm"
          : "bg-purple-600 dark:bg-purple-500 text-white rounded-br-sm"}`}>
        <MessageText text={m.text} persona={m.meta?.persona} />
      </div>
    )}
  </div>
))}

        {typing && (
          <div className="flex items-end gap-2 justify-start">
            <img src={herstoryLogoBot} alt="Auren"
              className="w-7 h-7 rounded-full object-cover flex-shrink-0 shadow-sm" />
            <div className="px-4 py-3 rounded-2xl rounded-bl-sm bg-purple-100 dark:bg-gray-700 flex items-center gap-1.5 shadow">
              <span className="w-2 h-2 rounded-full bg-purple-400 animate-bounce [animation-delay:0ms]" />
              <span className="w-2 h-2 rounded-full bg-purple-400 animate-bounce [animation-delay:150ms]" />
              <span className="w-2 h-2 rounded-full bg-purple-400 animate-bounce [animation-delay:300ms]" />
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Chips — igual que antes */}
      <div className="mb-2 px-3">
        <div className="text-xs font-semibold text-gray-600 dark:text-gray-300 mb-1">{UI[lang].quickActions}</div>
        <div className="flex flex-wrap gap-2">
          {[
            { key: "inspire", label: UI[lang].chips.inspire, action: () => handleSend("inspiración") },
            { key: "comfort", label: UI[lang].chips.comfort, action: () => handleSend("consuelo") },
            { key: "curiosity", label: UI[lang].chips.curiosity, action: () => handleSend("curiosidad") },
            { key: "pause", label: UI[lang].chips.pause, action: () => handleSend("pausa") },
            { key: "quote", label: UI[lang].chips.quote, action: () => handleSend("frase célebre") },
            { key: "guide", label: UI[lang].chips.guide, action: () => handleSend("guía") },
            { key: "recBook", label: UI[lang].chips.recBook, action: () => handleSend("libro") },
            { key: "recFilm", label: UI[lang].chips.recFilm, action: () => handleSend("película") },
            { key: "recExhibit", label: UI[lang].chips.recExhibit, action: () => handleSend("exposición") },
          ].map(chip => (
            <button key={chip.key} onClick={chip.action}
              className="rounded-full bg-purple-100 dark:bg-gray-700 hover:bg-purple-200 dark:hover:bg-gray-600 text-purple-700 dark:text-purple-300 px-3 py-1 text-xs transition shadow-sm">
              {chip.label}
            </button>
          ))}
        </div>
      </div>

      {/* Input — igual que antes */}
      <div className="p-3 border-t border-purple-200 dark:border-gray-600 bg-white/80 dark:bg-gray-800/80 flex space-x-2">
        <input
          type="text"
          className={`flex-1 border border-purple-300 dark:border-gray-600 bg-white dark:bg-gray-700
            text-gray-900 dark:text-gray-100 rounded-lg px-3 py-2 text-sm
            focus:ring-2 focus:ring-purple-400 focus:outline-none transition
            ${typing ? "opacity-50 cursor-not-allowed" : ""}`}
          placeholder={typing
            ? (lang === "es" ? "Auren está escribiendo…" : "Auren is typing…")
            : UI[lang].inputPlaceholder}
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => { if (e.key === "Enter" && !typing) handleSend(); }}
          disabled={typing}
          maxLength={500}
        />
        <button
          onClick={toggleMic}
          disabled={typing}
          title={isListening
            ? (lang === "es" ? "Detener grabación" : "Stop recording")
            : (lang === "es" ? "Hablar"            : "Speak")}
          className={`p-2 rounded-lg transition shadow-sm ${
            isListening
              ? "bg-red-500 text-white animate-pulse"
              : "bg-purple-100 dark:bg-gray-700 text-purple-600 dark:text-purple-300 hover:bg-purple-200"
          } ${typing ? "opacity-40 cursor-not-allowed" : ""}`}
        >
          {isListening ? <MicOff size={18} /> : <Mic size={18} />}
        </button>
        <button
          onClick={() => handleSend()}
          disabled={typing || !input.trim()}
          className={`p-2 rounded-lg shadow-md transition bg-gradient-to-r from-purple-600 to-pink-500 text-white
            ${(typing || !input.trim()) ? "opacity-40 cursor-not-allowed" : "hover:opacity-90 active:scale-95"}`}
        >
          <Send size={18} />
        </button>
      </div>
    </motion.div>
  )}
    </AnimatePresence>
    </>
  );
}