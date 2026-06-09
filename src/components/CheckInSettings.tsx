import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bell, BellOff, Check, AlertTriangle, CheckCircle } from "lucide-react";
import { usePushNotifications } from "@/hooks/usePushNotifications";

const CheckInSettings = () => {
  const { supported, subscribed, loading, subscribe, unsubscribe } = usePushNotifications();
  const [frequency, setFrequency]   = useState("daily");
  const [accepted, setAccepted]     = useState(false);
  const [saved, setSaved]           = useState(false);
  const [error, setError]           = useState("");

  // AUR-F14 — Desactivar
  async function handleDesactivar() {
    const ok = await unsubscribe();
    if (ok) setSaved(false);
  }

  // AUR-F12 + F13 — Activar con frecuencia
  async function handleActivar() {
    setError("");
    if (!accepted) {
      setError("Debes aceptar el aviso de privacidad");
      return;
    }
    const ok = await subscribe(frequency);
    if (ok) {
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } else {
      setError("No se pudo activar. ¿Bloqueaste las notificaciones?");
    }
  }

  if (!supported) {
    return (
      <div className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/20 p-6">
        <p className="text-sm text-muted-foreground text-center">
          Tu navegador no soporta notificaciones push. Prueba en Chrome o Edge.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-blue-200 dark:border-blue-800/50 bg-blue-50/50 dark:bg-blue-950/20 p-6 space-y-5 mt-4">

      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center">
          {subscribed
            ? <Bell className="w-5 h-5 text-blue-500 dark:text-blue-400" />
            : <BellOff className="w-5 h-5 text-blue-400 dark:text-blue-500" />}
        </div>
        <div>
          <h3 className="font-semibold text-foreground">Check-in de Auren</h3>
          <p className="text-xs text-muted-foreground">
            {subscribed
              ? "Recibirás mensajes de presencia de Auren"
              : "Activa para recibir un mensaje breve de Auren"}
          </p>
        </div>
      </div>

      {/* Ya activado — AUR-F14 */}
      {subscribed && (
        <div className="space-y-4">
          <div className="flex items-center gap-3 p-4 rounded-xl bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800/30">
            <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
            <div>
              <p className="text-sm font-medium text-green-700 dark:text-green-400">
                Check-in activo
              </p>
              <p className="text-xs text-green-600/70 dark:text-green-500/70 mt-0.5">
                Auren te enviará un mensaje según la frecuencia elegida. La notificación aparece como "Calculadora".
              </p>
            </div>
          </div>

          {/* AUR-F14 — botón de desactivar */}
          <button
            onClick={handleDesactivar}
            disabled={loading}
            className="w-full py-2.5 rounded-xl text-sm text-red-500 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/20 transition-colors disabled:opacity-40"
          >
            {loading ? "Desactivando..." : "Desactivar check-in"}
          </button>
        </div>
      )}

      {/* Setup — AUR-F12 + AUR-F13 */}
      {!subscribed && (
        <div className="space-y-5">

          {/* AUR-F12 — Aviso de privacidad */}
          <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800/30 space-y-2">
            <p className="text-xs font-semibold text-amber-700 dark:text-amber-400 flex items-center gap-1.5">
              <AlertTriangle className="w-3.5 h-3.5" />
              Aviso de privacidad
            </p>
            <ul className="text-xs text-amber-700/80 dark:text-amber-400/70 space-y-1 leading-relaxed">
              <li>• La notificación aparecerá como de <strong>"Calculadora"</strong>, no de HerStory.</li>
              <li>• Si alguien revisa tu teléfono, verá estas notificaciones.</li>
              <li>• Puedes desactivarlo en cualquier momento desde aquí.</li>
              <li>• No almacenamos información personal — solo el token de tu dispositivo.</li>
            </ul>
          </div>

          {/* AUR-F13 — Selector de frecuencia */}
          <div className="space-y-2">
            <p className="text-xs font-semibold text-foreground">¿Con qué frecuencia?</p>
            <div className="grid grid-cols-2 gap-2">
              {[
                { value: "daily",   label: "Diario",   desc: "Cada día" },
                { value: "weekly",  label: "Semanal",  desc: "Una vez por semana" },
              ].map(opt => (
                <button
                  key={opt.value}
                  onClick={() => setFrequency(opt.value)}
                  className={`p-3 rounded-xl border-2 text-left transition-colors ${
                    frequency === opt.value
                      ? "border-blue-500 bg-blue-50 dark:bg-blue-950/30"
                      : "border-transparent bg-background hover:border-blue-200"
                  }`}
                >
                  <p className="text-sm font-medium text-foreground">{opt.label}</p>
                  <p className="text-xs text-muted-foreground">{opt.desc}</p>
                </button>
              ))}
            </div>
          </div>

          {/* AUR-F12 — Checkbox */}
          <label className="flex items-start gap-3 cursor-pointer group">
            <div
              className={`mt-0.5 w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 transition-colors ${
                accepted
                  ? "bg-blue-600 border-blue-600"
                  : "border-blue-300 dark:border-blue-700"
              }`}
              onClick={() => setAccepted(!accepted)}
            >
              {accepted && <Check className="w-3 h-3 text-white" />}
            </div>
            <span className="text-xs text-foreground leading-relaxed" onClick={() => setAccepted(!accepted)}>
              Entiendo que recibiré notificaciones y que pueden ser vistas por otras personas con acceso a mi teléfono.
            </span>
          </label>

          {/* Errores */}
          <AnimatePresence>
            {error && (
              <motion.p
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="text-xs text-red-500 dark:text-red-400"
              >
                {error}
              </motion.p>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {saved && (
              <motion.div
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="flex items-center gap-2 text-xs text-green-600 dark:text-green-400"
              >
                <Check className="w-3 h-3" />
                Check-in activado — Auren estará contigo
              </motion.div>
            )}
          </AnimatePresence>

          {/* Botón activar */}
          <button
            onClick={handleActivar}
            disabled={loading || !accepted}
            className="w-full py-3 rounded-xl text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            {loading ? "Activando..." : "Activar check-in"}
          </button>
        </div>
      )}
    </div>
  );
};

export default CheckInSettings;


