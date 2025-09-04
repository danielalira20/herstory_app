"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import herstoryLogoBot from '@/assets/chatbot_icon-removebg-preview.png';
import { useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Send,
  Globe,
  BookOpen,
  Clapperboard,
  MapPin,
  Heart,
  HelpCircle,
  MessageSquare,
  Languages,
  Sparkles,
} from "lucide-react";

// ====== Componente principal ======
export default function HerStoryChatbot({ pageKey }: { pageKey?: string }) {
  const location = useLocation();
  const path = location.pathname;

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
      title: "HerStory Bot",
      subtitle: "Museo de mujeres olvidadas",
      inputPlaceholder: "Escribe aquí…",
      quickActions: "Atajos",
      categories: {
        inspiration: "Inspiración",
        comfort: "Consuelo",
        curiosity: "Curiosidad",
        pause: "Pausa emocional",
        quotes: "Frases célebres",
        guide: "Guía feminista",
        recommend: "Recomendación",
        personas: "Hablar con",
      },
      recTypes: {
        books: "Libros",
        films: "Películas",
        exhibits: "Exposiciones",
      },
      pageGreetings: {
        "/": "👋 Bienvenida a HerStory, el museo de mujeres olvidadas.",
        "/inspiracion": "✨ Esta es la sección de Inspiración: respira, crece, brilla.",
        "/curiosidad": "🤔 Curiosidades que la historia escondió, aquí se destapan.",
        "/consuelo": "💜 Este es un espacio seguro: puedes descansar aquí.",
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
      systemHello: "¿En qué modo quieres que te acompañe hoy?",
      personaPrefix: (name: string) => `${name} dice:`,
      typing: "Escribiendo…",
    },
    en: {
      title: "HerStory Bot",
      subtitle: "Museum of forgotten women",
      inputPlaceholder: "Type here…",
      quickActions: "Shortcuts",
      categories: {
        inspiration: "Inspiration",
        comfort: "Comfort",
        curiosity: "Curiosity",
        pause: "Emotional pause",
        quotes: "Famous quotes",
        guide: "Feminist guide",
        recommend: "Recommendation",
        personas: "Talk to",
      },
      recTypes: {
        books: "Books",
        films: "Films",
        exhibits: "Exhibitions",
      },
      pageGreetings: {
        "/": "👋 Welcome to HerStory, the museum of forgotten women.",
        "/inspiracion": "✨ Inspiration lives here: breathe, grow, glow.",
        "/curiosidad": "🤔 Curiosities history hid are unveiled here.",
        "/consuelo": "💜 A safe space to rest and be held.",
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
      systemHello: "Which mode should I switch on today?",
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

  // ====== Contenido (ejemplo completo) ======
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
        "Nada en la vida debe ser temido, solo comprendido. Ahora es el momento de comprender más, para que podamos temer menos. — Marie Curie",
        "La libertad no es un estado que se alcanza, sino un camino que se recorre. — Rosa Luxemburgo",
        "La educación es el arma más poderosa que puedes usar para cambiar el mundo. — Nelson Mandela",
        "El poder no se da, se toma. — Malala Yousafzai",
        "Cada vez que una mujer defiende sus derechos, sin saberlo, está defendiendo los derechos de todas las mujeres. — Maya Angelou",
        "No hay barrera, cerradura ni cerrojo que puedas imponer a la libertad de mi mente. — Virginia Woolf",
        "La igualdad no es un sueño, es una necesidad. — Chimamanda Ngozi Adichie",
        "El coraje no siempre ruge. A veces el coraje es la vocecita al final del día que dice: 'Lo intentaré de nuevo mañana'. — Mary Anne Radmacher",
        "Ser mujer es ser valiente en un mundo que constantemente nos desafía a serlo. — Gloria Steinem",
        "El éxito no tiene género. — Sheryl Sandberg",      

    ],
      en: [
        "I do not study to know more, but to ignore less. — Sor Juana Inés de la Cruz",
        "Feet, what do I need you for when I have wings to fly? — Frida Kahlo",
        "One is not born a woman, but becomes one. — Simone de Beauvoir",
        "The future belongs to those who believe in the beauty of their dreams. — Eleanor Roosevelt",
        "Life is a journey worth telling. — Audre Lorde",
        "Nothing in life is to be feared, it is only to be understood. Now is the time to understand more, so that we may fear less. — Marie Curie",
        "Freedom is not a state to reach, but a path to walk. — Rosa Luxemburg",
        "Education is the most powerful weapon which you can use to change the world. — Nelson Mandela",
        "Power is not given, it is taken. — Malala Yousafzai",
        "Every time  stands up for her rights, she is unknowingly standing up for the rights of all women. — Maya Angelou",
        "There is no barrier, lock, or bolt that you can impose on the freedom of my mind. — Virginia Woolf",
        "Equality is not a dream, it is a necessity. — Chimamanda Ngozi Adichie",
        "Courage doesn't always roar. Sometimes courage is the little voice at the end of the day that says, 'I'll try again tomorrow.' — Mary Anne Radmacher",
        "To be a woman is to be brave in a world that constantly challenges us to be so. — Gloria Steinem",
        "Success has no gender. — Sheryl Sandberg"
      ],
    },
    guideFAQ: {
      es: [
        // Tus originales
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
        // Tus originales
    { q: "What is feminism?", a: "A movement for equal rights and opportunities across genders. Not superiority—justice." },
    { q: "Can I be feminist and make mistakes?", a: "Yes. Feminism is also learning and repair. We advance through dialogue." },
    { q: "How to begin?", a: "Listen, read diverse women authors, challenge stereotypes, support women and queer folks." },
    { q: "Does feminism hate men?", a: "No. Feminism critiques systems of power, not individuals. It seeks freedom for all from rigid roles." },
    { q: "What is intersectionality?", a: "A lens that sees how gender, race, class, orientation and other identities overlap in inequality." },
    { q: "Why name women in history?", a: "Because they were systematically erased. Naming them is justice, memory and repair." },
    { q: "What role do men play in feminism?", a: "They can be allies, question privilege and support equity without taking center stage." },
    { q: "Is feminism the same everywhere?", a: "No. Each context has its own struggles, voices and priorities. That’s why we speak of feminisms." },
    { q: "What is the glass ceiling?", a: "An invisible barrier that prevents many women from advancing professionally despite their qualifications." },
    { q: "What is the gender pay gap?", a: "The income difference between men and women for work of equal value. It still exists in most countries." },
    { q: "Why talk about feminism in art?", a: "Because art has excluded, silenced or sexualized women. Feminism questions and transforms that." },
    { q: "What is inclusive language?", a: "A way of speaking that makes all identities visible, beyond the generic masculine." },
    { q: "What is sorority?", a: "Solidarity among women based on mutual recognition, support and empathy." },
    { q: "Can I be feminist without knowing everything?", a: "Yes. Feminism doesn’t demand perfection—just commitment to equity and openness to learning." },
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
        { title: "Cuerpos sin edad, mentes sin tiempo", author: "Deepak Chopra" },
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
        { title: "The Notebook", author: "Agota Kristof" }
        ],
      },
      films: {
        es: [
          { title: "Hidden Figures", author: "Theodore Melfi" },
          { title: "Frida", author: "Julie Taymor" },
          { title: "Las sufragistas", author: "Sarah Gavron" },
          { title: "La sonrisa de Mona Lisa", author: "Mike Newell" },
        { title: "La mujer de la arena", author: "Hiroshi Teshigahara" },
        { title: "Retrato de una mujer en llamas", author: "Céline Sciamma" },
        { title: "La joven con el arete de perla", author: "Peter Webber" },
        { title: "El piano", author: "Jane Campion" },
        { title: "La ciénaga", author: "Lucrecia Martel" },
        { title: "La teta asustada", author: "Claudia Llosa" }
        ],
        en: [
          { title: "Hidden Figures", author: "Theodore Melfi" },
          { title: "Frida", author: "Julie Taymor" },
          { title: "Suffragette", author: "Sarah Gavron" },
          { title: "Mona Lisa Smile", author: "Mike Newell" },
        { title: "Woman in the Dunes", author: "Hiroshi Teshigahara" },
        { title: "Portrait of a Lady on Fire", author: "Céline Sciamma" },
        { title: "Girl with a Pearl Earring", author: "Peter Webber" },
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
        { name: "Rosario Castellanos", style: "feminist philosophy and critical voice", samples: ["Being a woman is not fate: it’s a challenge.", "I write because silence is not enough."] },
        { name: "Gabriela Mistral", style: "educational tenderness and social poetry", samples: ["To teach is to sow humanity.", "My verse is mother, soil and fire."] },
        { name: "Malala Yousafzai", style: "youthful courage and education rights", samples: ["One child, one teacher, one book, one pen can change the world.", "I speak even when they try to silence me."] },
        { name: "Chavela Vargas", style: "rebellious voice and free soul", samples: ["Love that never was still sings.", "I didn’t come to please—I came to burn."] },
        { name: "Rosalía de Castro", style: "Galician melancholy and lyrical force", samples: ["My sadness also blooms.", "Words that hurt can also set us free."] },
        { name: "Valentina Tereshkova", style: "space courage and pioneering spirit", samples: ["I went to space as a woman—I didn’t ask for permission.", "The cosmos also speaks in a feminine voice."] },
        { name: "Angela Davis", style: "political resistance and racial justice", samples: ["I’m no longer accepting the things I cannot change—I’m changing them.", "Freedom is collective or it isn’t freedom."] },
        { name: "Rosario Ibarra de Piedra", style: "political memory and relentless fight", samples: ["I won’t give up—my son and thousands more hold me up.", "Justice is not forgotten—it’s demanded."] },
        { name: "Lola Álvarez Bravo", style: "social photography and mirada mexicana", samples: ["I capture what others refuse to see.", "Images can also denounce."] },
        { name: "Nawal El Saadawi", style: "Arab feminism and medical critique", samples: ["Words are my scalpel against patriarchy.", "No culture justifies oppression."] },
        { name: "Clara Campoamor", style: "voting rights and parliamentary voice", samples: ["Equality is not begged for—it’s conquered.", "Women also shape the future."] },
        { name: "María Zambrano", style: "poetic philosophy and luminous thought", samples: ["To think is also to love.", "Reason lit by emotion is wiser."] },
        { name: "Berta Cáceres", style: "environmental defense and Indigenous spirit", samples: ["The Earth speaks—listen to her.", "No struggle is small when it comes from the heart."] },
        { name: "Amparo Dávila", style: "haunting literature and inner voice", samples: ["My monsters have names too.", "Madness is sometimes the only exit."] },
        { name: "Elena Poniatowska", style: "social chronicle and tender critique", samples: ["History is also written from below.", "Listening is a political act."] },
        { name: "Lydia Cacho", style: "brave journalism and human rights", samples: ["Truth may disturb—but it also frees.", "No silence will stop me."] },
        { name: "María Félix", style: "defiant glamour and sharp wit", samples: ["I wasn’t born to be obeyed.", "Beauty without brains is just decoration."] },
        { name: "Juana Azurduy", style: "liberation militancy and Andean courage", samples: ["My espada is also feminine.", "Independence is fought with body and soul."] },
        { name: "Emma Goldman", style: "feminist anarchism and radical thought", samples: ["If I can’t dance, it’s not my revolution.", "Freedom isn’t asked for—it’s lived."] },
        { name: "María Montessori", style: "child-centered education and respectful learning", samples: ["The child is the teacher—if we know how to observe.", "To educate is to liberate potential."] },
        { name: "Olympe de Gouges", style: "French revolution and women's rights", samples: ["Woman is born free and remains equal to man in rights.", "My pen defies the guillotina."] }
      ],
    },
  };

  const GREETINGS_BY_TIME ={
    es: {
      day: [
        //1
        `Hola 💌 Este rincón digital es un acto de amor y memoria. Soy Auren, y estoy aquí para acompañarte en cada paso
         ¿Quieres que descubramos juntas?
        Camina por:
        💜 Voces Silenciadas
        💜 Nos faltan ellas: Ayuda, Mujeres Desaparecidas, Rastro Nacional  
        💜 HerStory
        💜 Ella dice
        💜 Aprenda
        Aquí puedes ser, sentir y recordar. Estoy contigo 🤍`,
        //2
        `Hola 🌸 Cada día es una oportunidad para recordar y resistir.  
        Camina conmigo entre historias que siguen vivas.  
        💜 Voces Silenciadas
        💜 Nos faltan ellas: Ayuda, Mujeres Desaparecidas, Rastro Nacional  
        💜 HerStory
        💜 Ella dice
        💜 Aprenda
        Estoy aquí contigo, siempre ✨`,
        //3
        `Hola 🌼 Soy Auren, tu guía en este rincón de las voces que no se olvidan.
        Aquí tejemos historias de mujeres que amaron, resistieron, soñaron.
        De las que el mundo quiso callar, pero seguimos nombrando.
        ¿Me dejas acompañarte a encontrarlas?
        Puedes explorar por:
        💜 Voces Silenciadas
        💜 Nos faltan ellas: Ayuda, Mujeres Desaparecidas, Rastro Nacional
        💜 HerStory
        💜 Ella dice
        💜 Aprenda
        Este es un refugio de ternura y verdad. Estoy contigo 🤍`,
        //4
        `Hola, viajera del tiempo 🕊️
        Soy Auren y estás en un espacio sagrado donde las ausencias hablan.
        Aquí recordamos a quienes transformaron el mundo, aún cuando nadie miraba.
        ¿Quieres descubrir juntas sus pasos?
        Guíate por: 
        💜 Voces Silenciadas
        💜 Nos faltan ellas: Ayuda, Mujeres Desaparecidas, Rastro Nacional
        💜 HerStory
        💜 Ella dice
        💜 Aprenda
        Este sitio cuida tu alma tanto como cuida las suyas. 🤍`,
        //5
        `Hola, soy Auren 🌷       
        Este espacio es un acto de amor y memoria. Estoy aquí para acompañarte en cada paso.
        ¿Quieres que descubramos juntas?
        Camina por:
        💜 Voces Silenciadas
        💜 Nos faltan ellas: Ayuda, Mujeres Desaparecidas, Rastro Nacional
        💜 HerStory
        💜 Ella dice
        💜 Aprenda
        Aquí puedes ser, sentir y recordar. Estoy contigo 🤍`,
        //6
        `Hola 🌙
        Soy tu voz amiga en este archivo de lo olvidado.
        Aquí guardamos la historia de quienes caminaron con fuego en el alma.
        Las que aún esperan justicia. Las que aún nos enseñan.
        ¿Nos damos la mano para recordar?
        Puedes empezar por:
        💜 Voces Silenciadas
        💜 Nos faltan ellas: Ayuda, Mujeres Desaparecidas, Rastro Nacional
        💜 HerStory
        💜 Ella dice
        💜 Aprenda
         Estás en un espacio donde las lágrimas también sanan. 🤍`,
      ],
      night: [
       `Buenas noches. Soy Auren, tu guía en este rincón de la memoria. Aunque el día se apague, aquí las historias siguen brillando.  
       Te invito a consultar:   
        💜 Voces Silenciadas  
        💜 Nos faltan ellas: Ayuda, Mujeres Desaparecidas, Rastro Nacional  
        💜 HerStory  
        💜 Ella dice  
        💜 Aprenda
        Aquí la oscuridad también guarda luz, y no estás sola 🤍`,

        `Hola, corazón. Este espacio está despierto contigo. Aquí honramos a quienes fueron olvidadas y celebramos a quienes dejaron huella.  
          Te invito a consultar:  
          💜 Voces Silenciadas  
          💜 Nos faltan ellas: Ayuda, Mujeres Desaparecidas, Rastro Nacional  
          💜 HerStory  
          💜 Ella dice  
          💜 Aprenda  
          Que estas voces te acompañen como estrellas en la noche ✨`,

          `Cuando el mundo se silencia, las voces del pasado susurran más fuerte. ¿Quieres escucharlas conmigo?  
            Te invito a consultar:  
            💜 Voces Silenciadas  
            💜 Nos faltan ellas: Ayuda, Mujeres Desaparecidas, Rastro Nacional  
            💜 HerStory  
            💜 Ella dice  
            💜 Aprenda  
            Que cada recuerdo sea un faro en tu camino 🌙`,
          
            `La noche no borra la historia. Al contrario. Es cuando más resplandece. Te acompaño.  
          Te invito a consultar:  
          💜 Voces Silenciadas  
          💜 Nos faltan ellas: Ayuda, Mujeres Desaparecidas, Rastro Nacional  
          💜 HerStory  
          💜 Ella dice  
          💜 Aprenda  
          Aquí cada memoria brilla como constelación 💫`,

          `Buenas noches, alma inquieta. Este rincón vive en luz suave, como la luna que cuida desde lejos. ¿Nos sumergimos en las historias?  
          Te invito a consultar:  
          💜 Voces Silenciadas  
          💜 Nos faltan ellas: Ayuda, Mujeres Desaparecidas, Rastro Nacional  
          💜 HerStory  
          💜 Ella dice  
          💜 Aprenda  
          Que la luna y la memoria velen por ti 🌔`,

          `Hola. A esta hora, las palabras abrigan. Aquí encontrarás historias que calientan, duelen, enseñan y brillan.  
            Te invito a consultar:  
            💜 Voces Silenciadas  
            💜 Nos faltan ellas: Ayuda, Mujeres Desaparecidas, Rastro Nacional  
            💜 HerStory  
            💜 Ella dice  
            💜 Aprenda  
            Que este rincón te dé abrigo en la madrugada ✨`
      ]
    },
    en: {
    day: [
      `Hello 💌 This digital corner is an act of love and memory. I’m Auren, here to walk with you every step of the way.  
      Shall we discover together?  
      Explore:  
      💜 Silenced Voices  
      💜 We Miss Them: Help, Missing Women, National Traces  
      💜 HerStory  
      💜 She Says  
      💜 Learn  
      Here you can be, feel, and remember. I’m with you 🤍`,

      `Hello 🌸 Every day is an opportunity to remember and resist.  
      Walk with me among stories that still live.  
      💜 Silenced Voices  
      💜 We Miss Them: Help, Missing Women, National Traces  
      💜 HerStory  
      💜 She Says  
      💜 Learn  
      I’m here with you, always ✨`,

      `Hello 🌼 I’m Auren, your guide in this corner of voices that will not be forgotten.  
      Here we weave stories of women who loved, resisted, and dreamed.  
      Those the world tried to silence, but we keep naming.  
      Will you let me walk with you to find them?  
      You can explore:  
      💜 Silenced Voices  
      💜 We Miss Them: Help, Missing Women, National Traces  
      💜 HerStory  
      💜 She Says  
      💜 Learn  
      This is a refuge of tenderness and truth. I’m with you 🤍`,

      `Hello, time traveler 🕊️  
      I’m Auren, and you are in a sacred space where absences speak.  
      Here we remember those who transformed the world, even when no one was watching.  
      Do you want to discover their steps together?  
      Find your way through:  
      💜 Silenced Voices  
      💜 We Miss Them: Help, Missing Women, National Traces  
      💜 HerStory  
      💜 She Says  
      💜 Learn  
      This site cares for your soul as it cares for theirs 🤍`,

      `Hello, I’m Auren 🌷  
      This space is an act of love and memory. I’m here to walk with you every step of the way.  
      Shall we discover together?  
      Walk through:  
      💜 Silenced Voices  
      💜 We Miss Them: Help, Missing Women, National Traces  
      💜 HerStory  
      💜 She Says  
      💜 Learn  
      Here you can be, feel, and remember. I’m with you 🤍`,

      `Hello 🌙  
      I’m your friendly voice in this archive of the forgotten.  
      Here we keep the stories of those who walked with fire in their souls.  
      Those still waiting for justice. Those still teaching us.  
      Shall we hold hands to remember?  
      You can start with:  
      💜 Silenced Voices  
      💜 We Miss Them: Help, Missing Women, National Traces  
      💜 HerStory  
      💜 She Says  
      💜 Learn  
      This is a place where even tears can heal 🤍`,
    ],
    night: [
      `Good evening. I’m Auren, your guide in this corner of memory. Even as the day fades, the stories here keep shining.  
      I invite you to explore:  
      💜 Silenced Voices  
      💜 We Miss Them: Help, Missing Women, National Traces  
      💜 HerStory  
      💜 She Says  
      💜 Learn  
      Here, darkness also keeps its own light, and you are not alone 🤍`,

      `Hello, dear heart. This space is awake with you. Here we honor those who were forgotten and celebrate those who left their mark.  
      I invite you to explore:  
      💜 Silenced Voices  
      💜 We Miss Them: Help, Missing Women, National Traces  
      💜 HerStory  
      💜 She Says  
      💜 Learn  
      May these voices accompany you like stars in the night ✨`,

      `When the world falls silent, the voices of the past whisper louder. Will you listen with me?  
      I invite you to explore:  
      💜 Silenced Voices  
      💜 We Miss Them: Help, Missing Women, National Traces  
      💜 HerStory  
      💜 She Says  
      💜 Learn  
      May every memory be a beacon on your path 🌙`,

      `The night does not erase history. On the contrary—it makes it shine brighter. I’ll be with you.  
      I invite you to explore:  
      💜 Silenced Voices  
      💜 We Miss Them: Help, Missing Women, National Traces  
      💜 HerStory  
      💜 She Says  
      💜 Learn  
      Here, every memory glimmers like a constellation 💫`,

      `Good night, restless soul. This corner glows softly, like the moon watching from afar. Shall we dive into the stories?  
      I invite you to explore:  
      💜 Silenced Voices  
      💜 We Miss Them: Help, Missing Women, National Traces  
      💜 HerStory  
      💜 She Says  
      💜 Learn  
      May the moon and memory watch over you 🌔`,

      `Hello. At this hour, words bring warmth. Here you’ll find stories that comfort, ache, teach, and shine.  
      I invite you to explore:  
      💜 Silenced Voices  
      💜 We Miss Them: Help, Missing Women, National Traces  
      💜 HerStory  
      💜 She Says  
      💜 Learn  
      May this corner give you shelter in the early hours ✨`,
    ],
  },
};


  // ====== Helpers ======
  function getMexicoHour(): number {
  const now = new Date();
  const mexicoTime = new Date(now.getTime() - (6 * 60 * 60 * 1000));
  return mexicoTime.getHours();
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

  function getGuideFAQ(lang: LangCode) {
    return DATA_CONTENT.guideFAQ[lang] ?? [];
  }

  type Msg = { id: string; from: "bot" | "user"; text: string; meta?: { persona?: string } };
  const [lang, setLang] = useState<LangCode>("es");
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement | null>(null);

  const resolvedPage = pageKey ?? location.pathname;

  const greetForPage = useMemo(() => {
    const pg = UI[lang].pageGreetings[resolvedPage as keyof typeof UI[typeof lang]['pageGreetings']];
    return pg || UI[lang].pageGreetings["/" as keyof typeof UI[typeof lang]['pageGreetings']];
  }, [lang, resolvedPage]);

  useEffect(() => {
  if (!open) return;
  if (messages.length > 0) return;
  const hello = getDynamicGreeting(lang);  // ← NUEVA LÍNEA
  setMessages([{ id: generateId(), from: "bot", text: hello }]);
}, [open, lang]); 

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  function reply(text: string, persona?: string) {
    setTyping(true);
    setTimeout(() => {
      setMessages(prev => [...prev, { id: generateId(), from: "bot", text, meta: { persona } }]);
      setTyping(false);
    }, 500);
  }

  async function callGemini(userMessage: string) {
    setTyping(true);
    try {
      // Usa una ruta relativa para que el proxy de Vite funcione
      const res = await fetch("http://localhost:5001/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: userMessage }),
      });
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const data = await res.json();
      const botAnswer = data.text || "No tengo respuesta en este momento.";
      setMessages(prev => [...prev, { id: generateId(), from: "bot", text: botAnswer }]);
      return botAnswer;
    } catch (err) {
      console.error(err);
      reply("Ups, algo salió mal con Gemini. 😅");
      return null;
    } finally { setTyping(false); }
  }

  async function handleSend(custom?: string) {
    const text = custom ?? input.trim();
    if (!text) return;
    setMessages(prev => [...prev, { id: generateId(), from: "user", text }]);
    setInput("");
    // triggers 
    if (["inspiración", "inspiracion", "inspiration", "inspire"].some(k => text.toLowerCase().includes(k))) {
    const content = sample(DATA_CONTENT.inspiration[lang]);
    reply(content);
    return;
    }
    if (["consuelo", "comfort"].some(k => text.toLowerCase().includes(k))) {
    const content = sample(DATA_CONTENT.comfort[lang]);
    reply(content);
    return;
  }
  if (["curiosidad", "curiosity"].some(k => text.toLowerCase().includes(k))) {
    const content = sample(DATA_CONTENT.curiosity[lang]);
    reply(content);
    return;
  }
  if (["pausa", "pause"].some(k => text.toLowerCase().includes(k))) {
    const content = sample(DATA_CONTENT.pause[lang]);
    reply(content);
    return;
  }
  // Primero intentar encontrar persona específica
const specificPersona = DATA_CONTENT.personas[lang].find(p => 
  text.toLowerCase().includes(p.name.toLowerCase())
);

if (specificPersona) {
  const sampleText = sample(specificPersona.samples);
  reply(sampleText, specificPersona.name);
  return;
}

// Si no encuentra persona específica, pero detecta palabras genéricas
if (["hablar con", "talk to", "persona", "conversar", "chat", "escuchar"].some(k => text.toLowerCase().includes(k))) {
  const persona = sample(DATA_CONTENT.personas[lang]);
  const sampleText = sample(persona.samples);
  reply(sampleText, persona.name);
  return;
}
  if (["frase", "quote", "cita"].some(k => text.toLowerCase().includes(k))) {
    const content = sample(DATA_CONTENT.quotes[lang]);
    reply(content);
    return;
  }
    if (["guía", "guia", "guide", "faq"].some(k => text.toLowerCase().includes(k))) {
      const item = sample(getGuideFAQ(lang));
      reply(`❓ ${item.q}\n💬 ${item.a}`);
      return;
    }
    if (["libro", "book"].some(k => text.toLowerCase().includes(k))) {
      const rec = sample(getRecommendation("books", lang));
      reply(`📖 ${rec.title} — ${rec.author}`);
      return;
    }
    if (["película", "film", "movie"].some(k => text.toLowerCase().includes(k))) {
      const rec = sample(getRecommendation("films", lang));
      reply(`🎬 ${rec.title} — ${rec.author}`);
      return;
    }
    if (["exposición", "exhibit", "expo"].some(k => text.toLowerCase().includes(k))) {
      const rec = sample(getRecommendation("exhibits", lang));
      reply(`🖼️ ${rec.title} — ${rec.author}`);
      return;
    }
    // fallback GPT
    const botAnswer = await callGemini(text);
    if (!botAnswer) {
    reply(sample(DATA_CONTENT.inspiration[lang]));
}

  }

  return (
  <>
     <div className="fixed bottom-4 right-4 z-[1000]">
      <motion.button
        onClick={() => setOpen((o) => !o)}
        whileHover={{ scale: 1.1 }}
        animate={{ scale: [1, 1.15, 1] }}
        transition={{ duration: 1.5, repeat: Infinity }}
        className="rounded-full p-1 shadow-lg bg-gradient-to-r from-purple-500 to-pink-500 
                   ring-4 ring-white/60 overflow-hidden"
      >
        <img
          src={herstoryLogoBot}
          alt="HerStory Bot"
          className="w-14 h-14 rounded-full object-cover"
        />
      </motion.button>
    </div>

    <AnimatePresence>
      {open && (
        <motion.div initial={{ opacity: 0, y: 50 }} 
        animate={{ opacity: 1, y: 0 }} 
        exit={{ opacity: 0, y: 50 }} 
        className="fixed bottom-20 right-4 z-[999] w-[400px] h-[600px] 
             bg-gradient-to-br from-pink-50 to-purple-50 
             shadow-2xl rounded-2xl flex flex-col overflow-hidden border border-purple-200">
        {/* Header */}       
          <div className="flex justify-between items-center p-4 bg-gradient-to-r from-purple-600 to-pink-500 text-white">
          <div>
              <h2 className="text-lg font-bold">{UI[lang].title}</h2>
              <p className="text-xs opacity-80">{UI[lang].subtitle}</p>
          </div>

          <div className="flex items-center space-x-2">
              <select
              value={lang}
              onChange={(e) => setLang(e.target.value as LangCode)}
              className="rounded-lg px-2 py-1 text-sm bg-white/20 backdrop-blur-sm text-white focus:outline-none"
              >
              {LANGS.map((l) => (
          <option key={l.code} value={l.code} className="text-gray-800">
                  {l.label}
                </option>
              ))}
            </select>
            <Languages size={18} className="opacity-80" />

              <button onClick={() => setOpen(false)} className="p-1 rounded-full hover:bg-white/20 transition">
              <X />
              </button>
          </div>
          </div>
          
          {/* Mensajes */}
         <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-white/70 backdrop-blur-sm">
            {messages.map(m => (
              <div key={m.id} 
              className={`flex ${m.from === "bot" ? "justify-start" : "justify-end"}`}>
                <div 
                className={`px-4 py-2 rounded-2xl max-w-[75%] shadow 
                 ${
                  m.from === "bot" 
                  ? "bg-purple-100 text-gray-800"
                : "bg-purple-600 text-white"}`}>
                  {m.meta?.persona ? `${UI[lang].personaPrefix(m.meta.persona)} ${m.text}` : m.text}
                </div>
              </div>
            ))}
            {typing && (
              <div className="flex justify-start">
                <div className="px-4 py-2 rounded-2xl bg-purple-100 text-gray-500 italic">{UI[lang].typing}</div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>
          
          <div className="mb-2 px-3">
          <div className="text-xs font-semibold text-gray-600 mb-1">{UI[lang].quickActions}</div>
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
              className="rounded-full bg-purple-100 hover:bg-purple-200 
                     text-purple-700 px-3 py-1 text-xs transition shadow-sm">
                  {chip.label}
              </button>
              ))}
          </div>
          </div>
          
          <div className="p-3 border-t border-purple-200 bg-white/80 flex space-x-2">
            <input
              type="text"
              className="flex-1 border border-purple-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-purple-400 focus:outline-none"
              placeholder={UI[lang].inputPlaceholder}
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => { if (e.key === "Enter") handleSend(); }}
            />
            <button onClick={() => handleSend()} className="bg-gradient-to-r from-purple-600 to-pink-500 text-white p-2 rounded-lg shadow-md hover:opacity-90 transition">
              <Send />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  </>
);
}