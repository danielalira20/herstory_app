# HerStory — Plataforma Digital de Empoderamiento Femenino

> Una plataforma integral en español dedicada a la seguridad, la memoria histórica y el empoderamiento de mujeres en América Latina.

---

## Índice

- [Acerca del proyecto](#acerca-del-proyecto)
- [Funcionalidades](#funcionalidades)
- [Stack tecnológico](#stack-tecnológico)
- [Estructura del proyecto](#estructura-del-proyecto)
- [Primeros pasos](#primeros-pasos)
  - [Prerrequisitos](#prerrequisitos)
  - [Instalación](#instalación)
  - [Variables de entorno](#variables-de-entorno)
- [Uso en desarrollo](#uso-en-desarrollo)
- [Scripts disponibles](#scripts-disponibles)
- [Rutas del frontend](#rutas-del-frontend)
- [API del backend](#api-del-backend)
- [Integraciones externas](#integraciones-externas)

---

## Acerca del proyecto

HerStory es una PWA (Progressive Web App) pensada para mujeres en situación de vulnerabilidad o que buscan recursos feministas en América Latina, con foco en México. Combina tres ejes:

1. **Seguridad en tiempo real** — Modo Campo con alertas por WhatsApp, modo pánico disfrazado de calculadora y reportes de acoso geolocalizados.
2. **Memoria histórica** — Museo digital con más de 66 mujeres olvidadas por la historia, con sistema de matching por afinidad de injusticias vividas.
3. **Educación y comunidad** — Guías feministas descargables, trivias educativas, recursos para colectivos y un chatbot de acompañamiento con IA.

---

## Funcionalidades

### Auren — Chatbot de acompañamiento con IA
- Tres modos de conversación: **Exploración**, **Reflexión** y **Emergencia**.
- Detección automática de palabras clave de crisis que activan el modo de emergencia de forma inmediata.
- Perfiles de respuesta adaptativos según el estado emocional de la usuaria.
- Voz sintetizada con ElevenLabs (español/inglés).
- Sistema de matching con figuras históricas basado en injusticias detectadas en la conversación.

### Modo Campo
- La usuaria registra su destino y hora estimada de regreso.
- Se envía una alerta automática por WhatsApp al contacto de confianza vía Twilio.
- Revisión periódica cada 15 minutos; si la usuaria no confirma su regreso, se escala la alerta.
- Confirmación de llegada segura al finalizar la sesión.

### Modo Pánico / Calculadora
- Activación con doble tecla Escape.
- La app se camufla visualmente como una calculadora (título, favicon y UI completa).
- Manipulación del historial del navegador para impedir rastreo.
- Configuración de código secreto en el perfil de usuario.

### Mapa de Acoso
- Reporte de incidentes de acoso por estado (32 estados de México) y categoría.
- Rate limiting de 3 reportes/hora por IP usando Upstash Redis.
- Visualización de estadísticas en tiempo real.

### Museo HerStory
- Más de 66 mujeres históricas con biografías, épocas y regiones.
- 7 campos temáticos y 10 categorías de injusticia para el sistema de matching.
- Sistema de acompañamiento: la figura histórica matched responde con mensajes de empatía en el idioma de la usuaria.

### Mujeres Desaparecidas
- Registro nacional de mujeres desaparecidas.
- Búsqueda por nombre, estado y otros filtros.
- Formulario de reporte de nuevos casos.

### Notificaciones Push
- Check-in diario opcional: "¿Todo bien hoy?"
- Configuración de frecuencia (diaria, semanal).
- Respuestas de usuaria registradas en base de datos.

### Recursos y comunidad
- Guías feministas descargables en PDF.
- Guía de concientización para educadores.
- Sección dedicada a colectivos feministas.
- Trivias y juegos educativos sobre figuras históricas.

---

## Stack tecnológico

### Frontend
| Herramienta | Versión | Uso |
|---|---|---|
| React | 18.3.1 | Framework UI |
| TypeScript | — | Tipado estático |
| Vite | 5.4.19 | Build tool y dev server |
| React Router DOM | 6.30.1 | Enrutamiento SPA |
| TanStack Query | 5.83.0 | Fetching y caché de datos |
| Tailwind CSS | 3.4.17 | Estilos utilitarios |
| shadcn/ui + Radix UI | — | Componentes accesibles |
| Framer Motion | 12.23.26 | Animaciones |
| React Hook Form + Zod | — | Formularios y validación |
| @react-pdf/renderer | 4.5.1 | Generación de PDFs |
| vite-plugin-pwa | 1.3.0 | Service Worker y manifiesto PWA |

### Backend
| Herramienta | Versión | Uso |
|---|---|---|
| Node.js + Express | 5.1.0 | Servidor HTTP |
| ES Modules | — | Sistema de módulos |
| ts-node | — | Ejecución de TypeScript en servidor |
| node-cron | — | Jobs periódicos (revisión de Modo Campo) |

### Base de datos y auth
| Servicio | Uso |
|---|---|
| Supabase (PostgreSQL) | Base de datos principal, autenticación |
| Supabase (instancia secundaria) | Base de datos de mujeres históricas |

### Servicios externos
| Servicio | Uso |
|---|---|
| Google Gemini 2.5 Flash | LLM principal (Auren chatbot) |
| OpenAI | LLM alternativo |
| ElevenLabs | Text-to-speech multilingüe |
| Twilio | Alertas SMS/WhatsApp (Modo Campo) |
| Upstash Redis | Rate limiting |
| Cloudinary | Almacenamiento de imágenes |
| Web Push (VAPID) | Notificaciones push del navegador |

---

## Estructura del proyecto

```
herstory_app/
├── src/
│   ├── pages/              # 25+ páginas de la aplicación
│   ├── components/         # 40+ componentes React reutilizables
│   ├── hooks/              # Custom hooks (useAuth, usePanicMode, etc.)
│   ├── lib/                # Clientes de Supabase y utilidades
│   ├── context/            # React Context (SectionContext)
│   ├── data/               # Datos estáticos (figuras_historicas.json, guías)
│   ├── App.tsx             # Configuración de rutas principal
│   ├── main.tsx            # Entry point
│   └── sw.ts               # Service Worker (PWA)
├── server.js               # Servidor Express principal (Auren, TTS, Push)
├── campoRoutes.js          # Endpoints de Modo Campo
├── acosoRoutes.js          # Endpoints del Mapa de Acoso
├── serverGemini.js         # Servidor alternativo solo-Gemini
├── vectorSearchserver.js   # Servidor de búsqueda vectorial
├── triggers.json           # Palabras clave de detección de crisis
├── vite.config.ts          # Configuración de Vite
├── tailwind.config.ts      # Configuración de Tailwind
└── package.json
```

---

## Primeros pasos

### Prerrequisitos

- **Node.js** >= 18
- **npm** >= 9
- Cuenta en [Supabase](https://supabase.com) (dos proyectos)
- Cuenta en [Google AI Studio](https://aistudio.google.com) (Gemini API)
- Cuenta en [Twilio](https://twilio.com) con WhatsApp Sandbox habilitado
- Cuenta en [ElevenLabs](https://elevenlabs.io)
- Cuenta en [Upstash](https://upstash.com) con una base de datos Redis

### Instalación

```bash
git clone https://github.com/tu-usuario/herstory_app.git
cd herstory_app
npm install
```

### Variables de entorno

Crea un archivo `.env` en la raíz del proyecto con las siguientes variables:

```env
# ── Supabase ──────────────────────────────────────────────
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# Supabase secundario (base de datos de mujeres)
VITE_SUPABASE_WOMEN_URL=
VITE_SUPABASE_WOMEN_ANON_KEY=
SUPABASE_PUSH_URL=

# ── IA ────────────────────────────────────────────────────
VITE_GEMINI_API_KEY=
GEMINI_API_KEY=
OPENAI_API_KEY=

# ── ElevenLabs (TTS) ──────────────────────────────────────
ELEVENLABS_API_KEY=
ELEVENLABS_VOICE_ID=

# ── Twilio (WhatsApp / Modo Campo) ────────────────────────
TWILIO_ACCOUNT_SID=
TWILIO_AUTH_TOKEN=

# ── Web Push (VAPID) ─────────────────────────────────────
VAPID_PUBLIC_KEY=
VAPID_PRIVATE_KEY=
VAPID_EMAIL=

# ── Upstash Redis (rate limiting) ─────────────────────────
UPSTASH_REDIS_REST_URL=
UPSTASH_REDIS_REST_TOKEN=

# ── Cloudinary (imágenes) ─────────────────────────────────
VITE_CLOUDINARY_CLOUND_NAME=
VITE_CLOUDINARY_API_KEY=
VITE_CLOUDINARY_API_SECRET=

# ── Servidor ──────────────────────────────────────────────
PORT=5001                              # Opcional, default: 5001
VITE_BACKEND_URL=http://localhost:5001 # Opcional en desarrollo
```

Para generar las claves VAPID:

```bash
npx web-push generate-vapid-keys
```

---

## Uso en desarrollo

Necesitas dos terminales:

```bash
# Terminal 1 — Frontend (Vite en puerto 8080)
npm run dev

# Terminal 2 — Backend (Express en puerto 5001)
npm run start:ts
```

Abre [http://localhost:8080](http://localhost:8080) en tu navegador.

El proxy de Vite redirige automáticamente las llamadas a `/chat` y `/campo` al servidor backend.

---

## Scripts disponibles

| Script | Descripción |
|---|---|
| `npm run dev` | Inicia el servidor de desarrollo de Vite (puerto 8080) |
| `npm run build` | Genera el bundle de producción en `/dist` |
| `npm run build:dev` | Build en modo desarrollo |
| `npm run preview` | Previsualiza el build de producción localmente |
| `npm run lint` | Ejecuta ESLint |
| `npm run start:ts` | Inicia el servidor Express con ts-node |
| `npm run start:js` | Inicia el servidor Express con Node directamente |
| `npm run deploy` | Publica en GitHub Pages vía gh-pages |

---

## Rutas del frontend

| Ruta | Descripción |
|---|---|
| `/` | Landing page |
| `/onboarding` | Configuración inicial y cuestionario |
| `/login` | Autenticación con Supabase |
| `/perfil` | Perfil y configuración de usuario |
| `/herstory` | Museo digital de mujeres históricas |
| `/mujer/:id` | Detalle biográfico de una figura histórica |
| `/mapa-acoso` | Mapa de reportes de acoso por estado |
| `/mujeres-desaparecidas` | Registro de mujeres desaparecidas |
| `/rastro-nacional` | Búsqueda en la base de datos nacional |
| `/reportar` | Formulario de reporte de persona desaparecida |
| `/modo-campo` | Activación del modo de seguridad en campo |
| `/calc` | Modo pánico (disfrazado de calculadora) |
| `/aprende` | Trivias y juegos educativos |
| `/guias` | Guías descargables en PDF |
| `/awareness-guide` | Guía de concientización feminista |
| `/para-colectivos` | Recursos para colectivos |
| `/guia-colectivos` | Guía específica para colectivos |
| `/nosotras` | Acerca de HerStory |
| `/contacto` | Formulario de contacto |
| `/ayuda` | Centro de ayuda y recursos |
| `/admin/verificacion` | Panel de admin — verificación de envíos |
| `/admin/solicitudes` | Panel de admin — gestión de solicitudes |

---

## API del backend

Base URL: `http://localhost:5001`

### Chatbot

| Método | Ruta | Descripción |
|---|---|---|
| `POST` | `/chat` | Envía un mensaje a Auren y recibe respuesta |
| `POST` | `/api/match/find` | Busca figura histórica compatible con las injusticias detectadas |
| `POST` | `/api/match/companion-response` | Obtiene el mensaje de acompañamiento de la figura matched |

### Text-to-Speech

| Método | Ruta | Descripción |
|---|---|---|
| `POST` | `/api/tts` | Genera audio a partir de texto usando ElevenLabs |

### Notificaciones Push

| Método | Ruta | Descripción |
|---|---|---|
| `GET` | `/api/push/vapid-public-key` | Devuelve la clave pública VAPID |
| `POST` | `/api/push/subscribe` | Registra una suscripción push |
| `POST` | `/api/push/unsubscribe` | Cancela una suscripción push |
| `POST` | `/api/push/send-checkin` | Envía un check-in manual |
| `POST` | `/api/push/checkin-response` | Registra la respuesta de la usuaria al check-in |

### Modo Campo

| Método | Ruta | Descripción |
|---|---|---|
| `POST` | `/campo/start` | Activa el Modo Campo y envía alerta por WhatsApp |
| `POST` | `/campo/end` | Desactiva el Modo Campo y confirma llegada segura |
| `GET` | `/campo/active/:userId` | Consulta si existe una sesión de campo activa |

### Mapa de Acoso

| Método | Ruta | Descripción |
|---|---|---|
| `POST` | `/acoso/report` | Registra un reporte de acoso |
| `GET` | `/acoso/stats` | Devuelve estadísticas de acoso por estado y categoría |

### Health

| Método | Ruta | Descripción |
|---|---|---|
| `GET` | `/health` | Verifica que el servidor esté en línea |

---

## Integraciones externas

### Google Gemini 2.5 Flash
Motor principal del chatbot Auren. Procesa el contexto de conversación, detecta el modo emocional de la usuaria y genera respuestas empáticas especializadas. El archivo `triggers.json` contiene las frases de crisis que cortocircuitan la llamada a Gemini y activan el modo de emergencia de forma inmediata.

### ElevenLabs
Sintetiza las respuestas de Auren en voz. Soporta voces en español e inglés. La llamada TTS se realiza desde el servidor backend para proteger la API key.

### Twilio WhatsApp
Utilizado exclusivamente en Modo Campo. Al activar la sesión, Twilio envía un mensaje de WhatsApp al contacto de confianza con el destino y hora estimada de regreso. Si la usuaria no confirma su llegada, se envía un segundo mensaje de alerta.

### Supabase
Gestiona la autenticación de usuarias (email/password y OAuth) y todas las tablas de la aplicación: perfiles, reportes, suscripciones push, sesiones de campo y figuras históricas.

### Upstash Redis
Implementa rate limiting en el endpoint `/acoso/report`: máximo 3 reportes por IP por hora, sin necesidad de mantener estado en memoria del servidor.

---

*HerStory — Porque su historia también importa.*
