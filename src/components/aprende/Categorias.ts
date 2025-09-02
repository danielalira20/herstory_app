export type Pregunta = {
  question: string;
  options: string[];
  answer: number;
};

export type Categorias = Record<string, Pregunta[]>;

export const categorias: Categorias = {
  igualdadGenero: [
    { question: "¿Qué es la igualdad de género?", options: ["Hombres y mujeres con mismos derechos", "Solo mujeres tienen más derechos", "Solo hombres tienen más derechos", "No existen leyes"], answer: 0 },
    { question: "¿Cuál es un ejemplo de desigualdad de género?", options: ["Mismo salario por mismo trabajo", "Mujeres ganando menos que hombres por igual trabajo", "Mismo acceso a educación", "Participación igual en política"], answer: 1 },
    { question: "¿Qué significa empoderamiento femenino?", options: ["Dar poder solo a mujeres", "Que las mujeres tomen decisiones y lideren", "Quitar derechos a hombres", "Ignorar la igualdad"], answer: 1 },
    { question: "ODS relacionado con igualdad de género", options: ["ODS 3", "ODS 5", "ODS 7", "ODS 10"], answer: 1 },
    { question: "Un estereotipo de género es...", options: ["Una creencia que limita roles de género", "Un tipo de salario", "Un derecho legal", "Un premio"], answer: 0 },
    { question: "¿Qué busca la brecha salarial de género?", options: ["Igualar salarios", "Que hombres ganen más", "Que mujeres ganen más", "Ignorar salarios"], answer: 0 },
    { question: "Violencia de género es...", options: ["Abuso solo físico", "Abuso basado en género", "Abuso laboral solo", "Ignorar leyes"], answer: 1 },
    { question: "Equidad vs igualdad", options: ["Son lo mismo", "Equidad considera necesidades distintas", "Equidad no existe", "Igualdad es injusta"], answer: 1 },
    { question: "Participación política femenina", options: ["Debe ser limitada", "Debe ser igual que masculina", "No importa", "Solo en algunos países"], answer: 1 },
    { question: "Educación inclusiva significa...", options: ["Acceso igualitario a todos", "Solo educación para hombres", "Solo educación para mujeres", "Ignorar la educación"], answer: 0 },
  ],
  historiaMujeres: [
    { question: "Primera mujer en recibir Nobel de la Paz", options: ["Marie Curie", "Malala Yousafzai", "Bertha von Suttner", "Rigoberta Menchú"], answer: 2 },
    { question: "Quién luchó por el sufragio femenino en EEUU", options: ["Susan B. Anthony", "Frida Kahlo", "Simone de Beauvoir", "Clara Zetkin"], answer: 0 },
    { question: "Famosa científica que descubrió radio", options: ["Ada Lovelace", "Marie Curie", "Rosalind Franklin", "Jane Goodall"], answer: 1 },
    { question: "Mujer pionera en aviación", options: ["Amelia Earhart", "Harriet Tubman", "Marie Curie", "Valentina Tereshkova"], answer: 0 },
    { question: "Primera mujer presidenta en el mundo", options: ["Sirimavo Bandaranaike", "Angela Merkel", "Margaret Thatcher", "Indira Gandhi"], answer: 0 },
    { question: "Activista por derechos civiles en EEUU", options: ["Rosa Parks", "Eleanor Roosevelt", "Malala Yousafzai", "Marie Curie"], answer: 0 },
    { question: "Premio Nobel de Literatura femenina", options: ["Toni Morrison", "Gabriela Mistral", "Virginia Woolf", "Todas las anteriores"], answer: 3 },
    { question: "Mujer importante en computación temprana", options: ["Ada Lovelace", "Marie Curie", "Grace Hopper", "Rosalind Franklin"], answer: 0 },
    { question: "Pionera del movimiento feminista en Francia", options: ["Simone de Beauvoir", "Marie Curie", "Jeanne d'Arc", "Clara Zetkin"], answer: 0 },
    { question: "Conocida por su activismo por niñas", options: ["Malala Yousafzai", "Rosa Parks", "Angela Merkel", "Marie Curie"], answer: 0 },
  ],
  derechosHumanos: [
    { question: "Declaración Universal de Derechos Humanos se firmó en", options: ["1945", "1948", "1950", "1960"], answer: 1 },
    { question: "Derecho a educación es...", options: ["Derecho fundamental", "Solo opcional", "Solo para hombres", "Solo para mujeres"], answer: 0 },
    { question: "Derecho a la salud significa...", options: ["Acceso a servicios médicos", "Opcional", "Solo hospitales privados", "No es derecho"], answer: 0 },
    { question: "Derecho a la igualdad", options: ["Igualdad ante la ley", "Solo hombres", "Solo mujeres", "Solo ricos"], answer: 0 },
    { question: "Derecho a la libertad de expresión", options: ["Expresar ideas sin represalias", "No se permite", "Solo en redes", "Solo adultos"], answer: 0 },
    { question: "Prohibición de tortura es un", options: ["Derecho humano", "Ley opcional", "Costumbre", "Norma social"], answer: 0 },
    { question: "Derecho a voto es", options: ["Fundamental", "Solo hombres", "Solo mujeres", "No existe"], answer: 0 },
    { question: "Derecho a reunirse es", options: ["Permitir reuniones pacíficas", "Solo políticos", "Solo estudiantes", "No permitido"], answer: 0 },
    { question: "Derecho a privacidad incluye", options: ["Protección de datos personales", "Publicar todo online", "Ignorar privacidad", "Solo empresas"], answer: 0 },
    { question: "Derecho laboral incluye", options: ["Trabajo justo y seguro", "Salario arbitrario", "Sin contratos", "Solo voluntariado"], answer: 0 },
  ],
    activismoSocial: [
    { question: "Activismo social es...", options: ["Acción para cambiar la sociedad", "Ignorar problemas", "Solo protestas violentas", "Solo redes sociales"], answer: 0 },
    { question: "Una forma de activismo pacífico", options: ["Marchas y campañas", "Robos", "Ataques", "Ignorar causas"], answer: 0 },
    { question: "Voluntariado es", options: ["Ayudar sin fines de lucro", "Trabajo obligatorio", "Solo por dinero", "Ignorar causas"], answer: 0 },
    { question: "Lobbying responsable significa", options: ["Influir en políticas", "Ignorar leyes", "Solo propaganda", "Robos"], answer: 0 },
    { question: "Difusión de información correcta es", options: ["Educar y concienciar", "Mentir", "Ignorar hechos", "Solo rumores"], answer: 0 },
    { question: "Manifestación pacífica es", options: ["Expresar opiniones legalmente", "Violenta", "Ilegal", "Ignorar causas"], answer: 0 },
    { question: "Uso de redes para activismo", options: ["Campañas y concientización", "Solo memes", "Ignorar redes", "Spam"], answer: 0 },
    { question: "Acción comunitaria efectiva", options: ["Trabajar con comunidad", "Solo individuos", "Ignorar problemas", "Solo gobierno"], answer: 0 },
    { question: "Empoderamiento social incluye", options: ["Dar voz a todos", "Ignorar a minorías", "Solo líderes", "Solo ricos"], answer: 0 },
    { question: "Solidaridad es", options: ["Apoyar causas justas", "Ignorar problemas", "Solo palabras", "Solo dinero"], answer: 0 },
  ],
  arteYCultura: [
    { question: "El arte es...", options: ["Expresión creativa", "Solo pintura", "Solo música", "Solo baile"], answer: 0 },
    { question: "Cultura incluye...", options: ["Tradiciones y costumbres", "Solo música", "Solo religión", "Solo idioma"], answer: 0 },
    { question: "Mujeres en arte importante", options: ["Frida Kahlo", "Todas las anteriores", "Mary Cassatt", "Artemisia Gentileschi"], answer: 1 },
    { question: "Movimientos culturales incluyen", options: ["Renaissance, Modernismo", "Solo actual", "Solo pasado", "Nada"], answer: 0 },
    { question: "Arte feminista busca", options: ["Visibilizar mujeres", "Ignorar género", "Solo estética", "Solo hombres"], answer: 0 },
    { question: "Música y empoderamiento femenino", options: ["Canciones que inspiran igualdad", "Ignorar música", "Solo instrumental", "Solo hombres"], answer: 0 },
    { question: "Literatura escrita por mujeres", options: ["Jane Austen, Gabriela Mistral", "Solo hombres", "Ignorar literatura", "Solo infantil"], answer: 0 },
    { question: "Teatro feminista destaca...", options: ["Temas de igualdad", "Solo comedia", "Solo danza", "Ignorar género"], answer: 0 },
    { question: "Patrimonio cultural incluye...", options: ["Tradiciones y arte", "Solo edificios", "Solo monumentos", "Nada"], answer: 0 },
    { question: "Museos destacan...", options: ["Mujeres artistas", "Solo hombres", "Solo historia", "Nada"], answer: 0 },
  ],
  tecnologiaYJusticia: [
  { question: "Qué es la justicia digital?", options: ["Equidad en el acceso a tecnología", "Solo castigos online", "Ignorar datos", "Solo leyes tradicionales"], answer: 0 },
  { question: "Ciberseguridad protege...", options: ["Información y sistemas", "Solo computadoras viejas", "Ignorar datos", "Solo redes sociales"], answer: 0 },
  { question: "Inteligencia artificial responsable significa...", options: ["Evitar sesgos y daños", "Solo eficiencia", "Ignorar ética", "Solo lucro"], answer: 0 },
  { question: "Derechos digitales incluyen...", options: ["Privacidad y acceso a información", "Solo redes sociales", "Ignorar datos", "Solo hackers"], answer: 0 },
  { question: "Big data debe usarse para...", options: ["Tomar decisiones justas", "Solo marketing", "Ignorar personas", "Solo estadísticas"], answer: 0 },
  { question: "Algoritmos injustos pueden...", options: ["Discriminar grupos", "Solo mejorar procesos", "Ignorar problemas", "Nada"], answer: 0 },
  { question: "Educación tecnológica ayuda a...", options: ["Empoderar y reducir desigualdad", "Solo programadores", "Ignorar ciudadanía", "Solo empresas"], answer: 0 },
  { question: "Hacktivismo es...", options: ["Activismo con tecnología", "Robar datos", "Ignorar causas", "Solo memes"], answer: 0 },
  { question: "Privacidad online protege...", options: ["Datos personales", "Solo correos", "Ignorar información", "Solo contraseñas"], answer: 0 },
  { question: "Inclusión digital significa...", options: ["Acceso de todos a la tecnología", "Solo jóvenes", "Ignorar adultos", "Solo ciudades grandes"], answer: 0 },
],
};

