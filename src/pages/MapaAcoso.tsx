import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import NavbarWrapper from '@/components/NavbarWrapper';
import AcosoMap from '@/components/AcosoMap';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5001';

const ESTADOS_DISPLAY: Record<string, string> = {
  'Baja california': 'Baja California',
  'Baja california sur': 'Baja California Sur',
  'Sonora': 'Sonora', 'Chihuahua': 'Chihuahua', 'Coahuila': 'Coahuila',
  'Nuevo leon': 'Nuevo León', 'Tamaulipas': 'Tamaulipas', 'Sinaloa': 'Sinaloa',
  'Durango': 'Durango', 'Zacatecas': 'Zacatecas', 'San luis Potosi': 'San Luis Potosí',
  'Nayarit': 'Nayarit', 'Jalisco': 'Jalisco', 'Aguascalientes': 'Aguascalientes',
  'Guanajuato': 'Guanajuato', 'Queretaro': 'Querétaro', 'Hidalgo': 'Hidalgo',
  'Estado de mexico': 'Estado de México', 'Ciudad de mexico': 'Ciudad de México',
  'Michoacan': 'Michoacán', 'Morelos': 'Morelos', 'Tlaxcala': 'Tlaxcala',
  'Puebla': 'Puebla', 'Guerrero': 'Guerrero', 'Veracruz': 'Veracruz',
  'Oaxaca': 'Oaxaca', 'Chiapas': 'Chiapas', 'Tabasco': 'Tabasco',
  'Campeche': 'Campeche', 'Yucatan': 'Yucatán', 'Quintana roo': 'Quintana Roo',
  'Colima': 'Colima'
};

const CATEGORIAS = [
  { key: 'calle', label: 'Calle / espacio público', emoji: '🚶' },
  { key: 'transporte', label: 'Transporte público', emoji: '🚌' },
  { key: 'trabajo', label: 'Trabajo / oficina', emoji: '💼' },
  { key: 'escolar', label: 'Escuela / universidad', emoji: '📚' },
  { key: 'digital', label: 'Digital / redes sociales', emoji: '📱' },
];

const ESTADOS_KEYS = Object.keys(ESTADOS_DISPLAY);

interface Stats {
  byEstado: Record<string, number>;
  byCategoria: Record<string, number>;
  total: number;
}

export default function MapaAcoso() {
  const [stats, setStats] = useState<Stats>({ byEstado: {}, byCategoria: {}, total: 0 });
  const [selectedState, setSelectedState] = useState<string | null>(null);
  const [form, setForm] = useState({ estado: '', categoria: '' });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchStats = async () => {
    try {
      const res = await fetch(`${BACKEND_URL}/acoso/stats`);
      const data = await res.json();
      setStats(data);
    } catch { /* silencioso */ }
  };

  useEffect(() => { fetchStats(); }, []);

  const handleReport = async () => {
    if (!form.estado || !form.categoria) return;
    setSending(true);
    setError(null);
    try {
      const res = await fetch(`${BACKEND_URL}/acoso/report`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setSent(true);
      setForm({ estado: '', categoria: '' });
      await fetchStats();
      setTimeout(() => setSent(false), 4000);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setSending(false);
    }
  };

  // Top 5 estados
  const topEstados = Object.entries(stats.byEstado)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);
  const maxCount = topEstados[0]?.[1] || 1;

  // Estado seleccionado info
  const selectedInfo = selectedState ? {
    nombre: ESTADOS_DISPLAY[selectedState] || selectedState,
    total: stats.byEstado[selectedState] || 0
  } : null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-rose-50">
      <NavbarWrapper />

      {/* Header */}
      <div className="max-w-7xl mx-auto px-6 pt-8 pb-4">
        <div className="flex items-center gap-3 mb-4">
          <span className="bg-gray-900 text-white px-4 py-1.5 rounded-full text-sm font-medium">
            Mapa de Acoso
          </span>
          <span className="text-gray-400 text-sm">HerStory · Datos anónimos</span>
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-1">
          ¿Dónde ocurre el acoso?
        </h1>
        <p className="text-gray-500 text-lg">
          Reportes anónimos de mujeres en México. Sin datos personales.
        </p>
      </div>

      {/* Stats rápidas */}
      <div className="max-w-7xl mx-auto px-6 mb-6">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { label: 'Reportes totales', value: stats.total.toLocaleString() },
            { label: 'Estados con reportes', value: Object.keys(stats.byEstado).length },
            { label: 'Estado más afectado', value: topEstados[0] ? ESTADOS_DISPLAY[topEstados[0][0]]?.split(' ')[0] : '—' },
            { label: 'Tipo más frecuente', value: Object.entries(stats.byCategoria).sort((a,b)=>b[1]-a[1])[0]?.[0] || '—' },
          ].map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.07 }}
              className="bg-white/70 backdrop-blur-md border border-white/80 rounded-2xl p-4 shadow-sm"
            >
              <p className="text-2xl font-bold text-purple-700">{s.value}</p>
              <p className="text-xs text-gray-400 mt-1">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Contenido principal */}
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-3 gap-6 pb-12">

        {/* Mapa — ocupa 2 columnas */}
        <div className="lg:col-span-2">
          <div className="bg-white/70 backdrop-blur-md border border-white/80 rounded-3xl p-6 shadow-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
                Intensidad por estado
              </h2>
              {selectedInfo && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-medium"
                >
                  {selectedInfo.nombre} · {selectedInfo.total} reportes
                </motion.div>
              )}
            </div>

            {/* SVG Map */}
            <AcosoMap
              onStateClick={setSelectedState}
              selectedState={selectedState}
              heatData={stats.byEstado}
            />

            {/* Leyenda */}
            <div className="flex items-center gap-3 mt-4">
              <span className="text-xs text-gray-400">Menos</span>
              <div className="flex-1 h-2 rounded-full bg-gradient-to-r from-purple-100 to-purple-700" />
              <span className="text-xs text-gray-400">Más</span>
            </div>
          </div>
        </div>

        {/* Sidebar derecha */}
        <div className="space-y-4">

          {/* Top estados */}
          <div className="bg-white/70 backdrop-blur-md border border-white/80 rounded-3xl p-5 shadow-md">
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
              Estados con más reportes
            </h3>
            <div className="space-y-3">
              {topEstados.map(([estado, count], i) => (
                <div key={estado}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-700 font-medium truncate">
                      {i + 1}. {ESTADOS_DISPLAY[estado] || estado}
                    </span>
                    <span className="text-purple-600 font-bold ml-2">{count}</span>
                  </div>
                  <div className="w-full h-1.5 bg-purple-100 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${(count / maxCount) * 100}%` }}
                      transition={{ duration: 0.8, delay: i * 0.1 }}
                      className="h-full bg-gradient-to-r from-purple-400 to-purple-700 rounded-full"
                    />
                  </div>
                </div>
              ))}
              {topEstados.length === 0 && (
                <p className="text-gray-400 text-sm text-center py-4">Sin datos aún</p>
              )}
            </div>
          </div>

          {/* Por categoría */}
          <div className="bg-white/70 backdrop-blur-md border border-white/80 rounded-3xl p-5 shadow-md">
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
              Por tipo de acoso
            </h3>
            <div className="space-y-2.5">
              {CATEGORIAS.map(({ key, label, emoji }) => {
                const count = stats.byCategoria[key] || 0;
                const pct = stats.total > 0 ? Math.round((count / stats.total) * 100) : 0;
                return (
                  <div key={key} className="flex items-center gap-2">
                    <span className="text-base w-6">{emoji}</span>
                    <div className="flex-1">
                      <div className="flex justify-between text-xs mb-0.5">
                        <span className="text-gray-600">{label}</span>
                        <span className="text-gray-400">{pct}%</span>
                      </div>
                      <div className="w-full h-1.5 bg-rose-100 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${pct}%` }}
                          transition={{ duration: 0.6 }}
                          className="h-full bg-gradient-to-r from-rose-300 to-rose-500 rounded-full"
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Formulario de reporte */}
          <div className="bg-white/70 backdrop-blur-md border border-white/80 rounded-3xl p-5 shadow-md">
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-1">
              Reportar incidente
            </h3>
            <p className="text-xs text-gray-400 mb-4">100% anónimo. Sin datos personales.</p>

            {sent ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-4"
              >
                <div className="text-3xl mb-2">✅</div>
                <p className="text-green-700 font-medium text-sm">Reporte registrado</p>
                <p className="text-gray-400 text-xs mt-1">Gracias por contribuir al mapa</p>
              </motion.div>
            ) : (
              <div className="space-y-3">
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Estado donde ocurrió</label>
                  <select
                    value={form.estado}
                    onChange={e => setForm(f => ({ ...f, estado: e.target.value }))}
                    className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-purple-300"
                  >
                    <option value="">Selecciona un estado</option>
                    {ESTADOS_KEYS.map(k => (
                      <option key={k} value={k}>{ESTADOS_DISPLAY[k]}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs text-gray-500 mb-1">Tipo de acoso</label>
                  <div className="grid grid-cols-1 gap-1.5">
                    {CATEGORIAS.map(({ key, label, emoji }) => (
                      <button
                        key={key}
                        onClick={() => setForm(f => ({ ...f, categoria: key }))}
                        className={`text-left px-3 py-2 rounded-xl text-xs transition-all border ${
                          form.categoria === key
                            ? 'bg-purple-100 border-purple-300 text-purple-700 font-medium'
                            : 'bg-white border-gray-200 text-gray-600 hover:border-purple-200'
                        }`}
                      >
                        {emoji} {label}
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  onClick={handleReport}
                  disabled={sending || !form.estado || !form.categoria}
                  className="w-full bg-gray-900 hover:bg-gray-800 text-white font-semibold py-3 rounded-xl text-sm transition-all disabled:opacity-40"
                >
                  {sending ? 'Enviando...' : 'Reportar anónimamente'}
                </button>

                {error && <p className="text-red-500 text-xs text-center">{error}</p>}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}