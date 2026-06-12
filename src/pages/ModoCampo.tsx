import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../hooks/useAuth';
import { useModoCampo } from '../hooks/useModoCampo';
import NavbarWrapper from "@/components/NavbarWrapper";

function getAnonymousId(): string {
  const key = 'campo_anon_id';
  let id = localStorage.getItem(key);
  if (!id) { id = crypto.randomUUID(); localStorage.setItem(key, id); }
  return id;
}

function getTimeRemaining(estimatedReturn: string) {
  const diff = new Date(estimatedReturn).getTime() - Date.now();
  if (diff <= 0) return { text: '¡Tiempo cumplido!', urgent: true };
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  return {
    text: hours > 0 ? `${hours}h ${minutes}m restantes` : `${minutes} min restantes`,
    urgent: diff < 30 * 60 * 1000
  };
}

const features = [
  { icon: '📍', label: 'Destino registrado' },
  { icon: '⏰', label: 'Alerta automática' },
  { icon: '📵', label: 'Sin internet en campo' },
  { icon: '💬', label: 'Aviso por WhatsApp' },
];

export default function ModoCampo() {
  const { user } = useAuth();
  const { session, loading, error, startCampo, endCampo } = useModoCampo();

  const [form, setForm] = useState({
    contactName: '', contactPhone: '', destination: '', returnTime: ''
  });
  const [confirmed, setConfirmed] = useState(false);
  const [timeInfo, setTimeInfo] = useState({ text: '', urgent: false });

  useEffect(() => {
    if (!session) return;
    setTimeInfo(getTimeRemaining(session.estimatedReturn));
    const interval = setInterval(() =>
      setTimeInfo(getTimeRemaining(session.estimatedReturn)), 30000);
    return () => clearInterval(interval);
  }, [session]);

  const handleStart = async () => {
    const today = new Date();
    const [h, m] = form.returnTime.split(':');
    today.setHours(parseInt(h), parseInt(m), 0, 0);
    if (today.getTime() < Date.now()) today.setDate(today.getDate() + 1);
    await startCampo({
      userId: user?.id || getAnonymousId(),
      contactName: form.contactName,
      contactPhone: form.contactPhone,
      destination: form.destination,
      estimatedReturn: today.toISOString()
    });
  };

  const handleEnd = async () => {
    const result = await endCampo();
    if (result?.success) setConfirmed(true);
  };

  const formValid = form.contactName &&
    form.contactPhone.match(/^\d{10}$/) &&
    form.destination &&
    form.returnTime;

  // ── Llegó segura ──
  if (confirmed) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-white to-emerald-50 p-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center max-w-sm"
        >
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 text-4xl">✅</div>
          <h2 className="text-3xl font-bold text-gray-900 mb-3">Llegaste segura</h2>
          <p className="text-gray-500 mb-8">Tu contacto recibió la confirmación por WhatsApp.</p>
          <button onClick={() => setConfirmed(false)} className="text-green-600 text-sm underline underline-offset-4">
            Volver al inicio
          </button>
        </motion.div>
      </div>
    );
  }

  // ── Sesión activa ──
  if (session) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-slate-900 to-rose-900 flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
        >
          <div className="flex justify-center mb-8">
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-4 py-2">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-3 w-3 bg-red-400" />
              </span>
              <span className="text-white/90 text-sm font-medium">Modo Campo activo</span>
            </div>
          </div>

          <h1 className="text-4xl font-bold text-white text-center mb-2">Estás protegida</h1>
          <p className="text-white/50 text-center mb-8">Tu contacto ya fue notificado por WhatsApp</p>

          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-6 mb-6 space-y-4">
            {[
              { label: 'Destino', value: session.destination },
              { label: 'Contacto', value: session.contactName },
              {
                label: 'Regreso estimado',
                value: new Date(session.estimatedReturn).toLocaleTimeString('es-MX', { hour: '2-digit', minute: '2-digit' })
              },
            ].map((item, i) => (
              <div key={i} className={`flex justify-between items-center py-3 ${i < 2 ? 'border-b border-white/10' : ''}`}>
                <span className="text-white/50 text-sm">{item.label}</span>
                <span className="text-white font-medium text-sm text-right max-w-[60%]">{item.value}</span>
              </div>
            ))}
            <div className="flex justify-between items-center pt-1">
              <span className="text-white/50 text-sm">Tiempo restante</span>
              <span className={`font-bold text-sm ${timeInfo.urgent ? 'text-red-300' : 'text-purple-300'}`}>
                {timeInfo.text}
              </span>
            </div>
          </div>

          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={handleEnd}
            disabled={loading}
            className="w-full bg-green-400 hover:bg-green-300 text-green-900 font-bold py-5 rounded-2xl text-lg transition-all disabled:opacity-50 shadow-2xl shadow-green-900/30"
          >
            {loading ? 'Confirmando...' : '✅  Llegué segura'}
          </motion.button>

          {error && <p className="text-red-300 text-sm text-center mt-4">{error}</p>}
          <p className="text-white/30 text-xs text-center mt-6 leading-relaxed">
            Si no confirmas a tiempo, tu contacto recibirá una alerta automática.
          </p>
        </motion.div>
      </div>
    );
  }

  // ── Formulario ──
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-rose-50">
      <NavbarWrapper />
      {/* Header */}
      <div className="max-w-6xl mx-auto px-6 pt-8">
        <div className="flex items-center gap-3">
          <span className="bg-gray-900 text-white px-4 py-1.5 rounded-full text-sm font-medium">Modo Campo</span>
          <span className="text-gray-400 text-sm hidden sm:block">HerStory · Para buscadoras</span>
        </div>
      </div>

      {/* Contenido */}
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center py-10 min-h-[88vh]">

        {/* ── Columna izquierda ── */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight mb-4">
            Sal a buscar.<br />
            <span className="text-purple-600">Nosotras</span><br />
            te cuidamos.
          </h1>
          <p className="text-gray-500 text-base sm:text-lg leading-relaxed mb-8">
            Registra un contacto antes de salir al campo.
            Si no confirmas que llegaste bien, recibirá una alerta automática por WhatsApp.
          </p>

          {/* Form glass */}
          <div className="bg-white/60 backdrop-blur-md border border-white/80 rounded-3xl p-5 sm:p-6 shadow-xl shadow-purple-100/50 space-y-4">
            {[
              { label: 'Contacto de confianza', key: 'contactName', type: 'text', placeholder: 'Nombre — mamá, hermana, compañera...' },
              { label: 'WhatsApp del contacto (10 dígitos)', key: 'contactPhone', type: 'tel', placeholder: '5512345678' },
              { label: '¿A dónde vas?', key: 'destination', type: 'text', placeholder: 'Ejido, municipio, zona...' },
              { label: 'Hora estimada de regreso', key: 'returnTime', type: 'time', placeholder: '' },
            ].map((field, i) => (
              <motion.div
                key={field.key}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07 }}
              >
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
                  {field.label}
                </label>
                <input
                  type={field.type}
                  placeholder={field.placeholder}
                  maxLength={field.key === 'contactPhone' ? 10 : undefined}
                  value={form[field.key as keyof typeof form]}
                  onChange={e => setForm(f => ({
                    ...f,
                    [field.key]: field.key === 'contactPhone'
                      ? e.target.value.replace(/\D/g, '')
                      : e.target.value
                  }))}
                  className="w-full bg-white/80 border border-gray-200 rounded-xl px-4 py-3 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-300 transition"
                />
              </motion.div>
            ))}
          </div>

          <motion.button
            whileTap={{ scale: 0.98 }}
            onClick={handleStart}
            disabled={loading || !formValid}
            className="mt-4 w-full bg-gray-900 hover:bg-gray-800 text-white font-bold py-4 rounded-2xl text-base transition-all disabled:opacity-40 shadow-xl"
          >
            {loading ? 'Activando...' : '🔴  Activar Modo Campo'}
          </motion.button>

          {error && <p className="text-red-500 text-sm text-center mt-3">{error}</p>}

          <p className="text-xs text-gray-400 text-center mt-5 leading-relaxed">
            HerStory no guarda el contenido de tu búsqueda. Solo registra que saliste y a qué hora deberías regresar.
          </p>
        </motion.div>

        {/* ── Columna derecha — solo visible en desktop ── */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="hidden lg:flex flex-col items-center gap-6"
        >
          {/* Blob */}
          <div className="absolute w-72 h-72 bg-gradient-to-br from-purple-300 to-rose-300 rounded-full blur-3xl opacity-20 pointer-events-none" />

          {/* Teléfono flotante — iPhone style */}
          <motion.div
            animate={{ y: [0, -14, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            className="relative z-10"
          >
            {/* Botones volumen izquierda */}
            <div className="absolute -left-[5px] top-24 w-[5px] h-7 bg-gray-700 rounded-l-md" />
            <div className="absolute -left-[5px] top-36 w-[5px] h-10 bg-gray-700 rounded-l-md" />
            <div className="absolute -left-[5px] top-48 w-[5px] h-10 bg-gray-700 rounded-l-md" />
            {/* Botón power derecha */}
            <div className="absolute -right-[5px] top-32 w-[5px] h-14 bg-gray-700 rounded-r-md" />

            {/* Cuerpo del teléfono */}
            <div className="w-[290px] bg-[#1c1c1e] rounded-[3.5rem] p-[10px] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5),0_0_0_1px_rgba(255,255,255,0.06)]">
              <div className="bg-white rounded-[3rem] overflow-hidden">

                {/* Dynamic Island */}
                <div className="bg-black pt-3 pb-2 flex justify-center">
                  <div className="w-28 h-[26px] bg-black rounded-full" />
                </div>

                {/* WhatsApp header */}
                <div className="bg-[#075e54] px-5 py-3.5 flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#128c7e] rounded-full flex items-center justify-center text-white text-sm font-bold shadow-inner">
                    H
                  </div>
                  <div>
                    <p className="text-white text-sm font-semibold">HerStory</p>
                    <p className="text-green-200 text-xs">en línea</p>
                  </div>
                </div>

                {/* Chat */}
                <div className="bg-[#ece5dd] p-4 min-h-[280px]">
                  <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="bg-white rounded-2xl rounded-tl-none p-4 shadow-sm max-w-[92%]"
                  >
                    <p className="text-[13px] text-gray-800 leading-relaxed">
                      🔴 <strong>Alerta HerStory</strong><br />
                      Hola <strong>{form.contactName || 'contacto'}</strong>, alguien de tu red activó el Modo Campo.<br /><br />
                      📍 <strong>{form.destination || 'Destino registrado'}</strong><br />
                      🕐 Regreso: <strong>{form.returnTime || '--:--'}</strong><br /><br />
                      Si no recibes confirmación, comunícate de inmediato.
                    </p>
                    <p className="text-right text-[10px] text-gray-400 mt-2">ahora ✓✓</p>
                  </motion.div>
                </div>

              </div>
            </div>

            {/* Sombra difusa debajo */}
            <div className="w-[220px] h-5 bg-black/20 blur-2xl rounded-full mx-auto mt-3" />
          </motion.div>

          {/* Pills debajo del teléfono */}
          <div className="flex flex-wrap gap-2 justify-center z-10">
            {features.map((f, i) => (
              <motion.div
                key={f.label}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.1 }}
                className="flex items-center gap-1.5 bg-white/80 backdrop-blur-md border border-white/90 rounded-full px-3 py-1.5 shadow-md"
              >
                <span className="text-sm">{f.icon}</span>
                <span className="text-xs font-medium text-gray-700">{f.label}</span>
              </motion.div>
            ))}
          </div>

          {/* Mini cards de contexto */}
          <div className="grid grid-cols-2 gap-3 w-full max-w-xs z-10">
            <div className="bg-white/60 backdrop-blur-md border border-white/80 rounded-2xl p-4 text-center shadow-md">
              <p className="text-2xl font-bold text-purple-600">24/7</p>
              <p className="text-xs text-gray-500 mt-1">Red activa</p>
            </div>
            <div className="bg-white/60 backdrop-blur-md border border-white/80 rounded-2xl p-4 text-center shadow-md">
              <p className="text-2xl font-bold text-rose-500">0s</p>
              <p className="text-xs text-gray-500 mt-1">Demora en alerta</p>
            </div>
          </div>
        </motion.div>

      </div>
    </div>
  );
}