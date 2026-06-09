// PanicSettings — Setup obligatorio del botón de pánico
// No hay código default — la usuaria DEBE configurar el suyo
// Incluye explicación + términos + checkbox antes de guardar

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Shield,
  Check,
  Eye,
  EyeOff,
  Info,
  AlertTriangle,
  CheckCircle,
  Lock,
  LogOut,
} from "lucide-react";

const PanicSettings = () => {
  const [code, setCode] = useState("");
  const [confirmCode, setConfirmCode] = useState("");
  const [showCode, setShowCode] = useState(false);
  const [hasCustomCode, setHasCustomCode] = useState(false);
  const [accepted, setAccepted] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");
  const [exitUrl, setExitUrl]         = useState("");
  const [exitUrlSaved, setExitUrlSaved] = useState(false);
  const [exitUrlError, setExitUrlError] = useState("");
  const [hasExitUrl, setHasExitUrl]   = useState(false);


  useEffect(() => {
    const existing = localStorage.getItem("herstory-panic-code");
    if (existing) {
      setHasCustomCode(true);
    }
    const savedUrl = localStorage.getItem("herstory-exit-url");
    if (savedUrl) {
      setExitUrl(savedUrl);
      setHasExitUrl(true);
    }
  }, []);

  const handleSave = () => {
    setError("");
    setSaved(false);

    if (!accepted) {
      setError("Debes aceptar que entiendes cómo funciona");
      return;
    }

    if (code.length < 4) {
      setError("Mínimo 4 dígitos");
      return;
    }

    if (code.length > 8) {
      setError("Máximo 8 dígitos");
      return;
    }

    if (!/^\d+$/.test(code)) {
      setError("Solo números");
      return;
    }

    if (code !== confirmCode) {
      setError("Los códigos no coinciden");
      return;
    }

    localStorage.setItem("herstory-panic-code", code);
    setHasCustomCode(true);
    setSaved(true);
    setCode("");
    setConfirmCode("");

    setTimeout(() => setSaved(false), 3000);
  };

  const handleReset = () => {
    localStorage.removeItem("herstory-panic-code");
    setHasCustomCode(false);
    setAccepted(false);
    setCode("");
    setConfirmCode("");
    setSaved(false);
  };

  const handleSaveExitUrl = () => {
  setExitUrlError("");
  const raw = exitUrl.trim();
  if (!raw) { setExitUrlError("Ingresa una URL"); return; }
 
  let url = raw;
  if (!url.startsWith("http://") && !url.startsWith("https://")) {
    url = "https://" + url;
  }
 
  try {
    new URL(url);
    localStorage.setItem("herstory-exit-url", url);
    setExitUrl(url);
    setHasExitUrl(true);
    setExitUrlSaved(true);
    setTimeout(() => setExitUrlSaved(false), 3000);
  } catch {
    setExitUrlError("URL no válida. Ejemplo: google.com");
  }
};
 
const handleResetExitUrl = () => {
  localStorage.removeItem("herstory-exit-url");
  setExitUrl("");
  setHasExitUrl(false);
  setExitUrlSaved(false);
};


  return (
    <div className="rounded-2xl border border-purple-200 dark:border-purple-800/50 bg-purple-50/50 dark:bg-purple-950/20 p-6 space-y-5">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-purple-100 dark:bg-purple-900/40 flex items-center justify-center">
          <Shield className="w-5 h-5 text-purple-500 dark:text-purple-400" />
        </div>
        <div>
          <h3 className="font-semibold text-foreground">Botón de pánico</h3>
          <p className="text-xs text-muted-foreground">
            {hasCustomCode
              ? "Tu botón de seguridad está activo"
              : "Configura tu código para activar el botón de seguridad"}
          </p>
        </div>
      </div>

      {/* Si ya tiene código configurado */}
      {hasCustomCode && (
        <div className="space-y-4">
          <div className="flex items-center gap-3 p-4 rounded-xl bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800/30">
            <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
            <div>
              <p className="text-sm font-medium text-green-700 dark:text-green-400">
                Botón de pánico activo
              </p>
              <p className="text-xs text-green-600/70 dark:text-green-500/70 mt-0.5">
                El escudo morado aparece en todas las páginas. Para volver desde
                la calculadora, escribe tu código y presiona =
              </p>
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => {
                setHasCustomCode(false);
                setAccepted(true);
              }}
              className="flex-1 py-2.5 rounded-xl text-sm font-medium border border-purple-200 dark:border-purple-700 text-purple-700 dark:text-purple-300 hover:bg-purple-50 dark:hover:bg-purple-950/30 transition-colors"
            >
              Cambiar código
            </button>
            <button
              onClick={handleReset}
              className="py-2.5 px-4 rounded-xl text-sm text-red-500 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/20 transition-colors"
            >
              Desactivar
            </button>
          </div>
        </div>
      )}

      {/* Setup: explicación + términos + código */}
      {!hasCustomCode && (
        <div className="space-y-5">
          {/* Qué hace */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-foreground flex items-center gap-2">
              <Lock className="w-4 h-4 text-purple-500" />
              ¿Cómo funciona?
            </h4>
            <div className="space-y-2 text-xs text-muted-foreground leading-relaxed">
              <p>
                Al tocar el botón del escudo (o presionar Escape dos veces),
                toda la pantalla se transforma en una calculadora funcional.
                La URL, el título y el ícono de la pestaña cambian para que
                no quede rastro visible de HerStory.
              </p>
              <p>
                Para regresar a HerStory, escribes tu código secreto personal
                en la calculadora y presionas <span className="font-mono font-bold">=</span>.
                Solo tú conocerás este código.
              </p>
            </div>
          </div>

          {/* Qué NO hace */}
          <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800/30 space-y-2">
            <p className="text-xs font-semibold text-amber-700 dark:text-amber-400 flex items-center gap-1.5">
              <AlertTriangle className="w-3.5 h-3.5" />
              Importante
            </p>
            <ul className="text-xs text-amber-700/80 dark:text-amber-400/70 space-y-1 leading-relaxed">
              <li>
                • El historial completo del navegador no puede borrarse por
                seguridad del navegador. Recomendamos usar modo incógnito.
              </li>
              <li>
                • Este botón no contacta a autoridades ni envía alertas.
                Es solo una herramienta de protección visual.
              </li>
              <li>
                • Si olvidas tu código, puedes configurar uno nuevo desde
                tu perfil. Necesitarás cerrar y abrir la app.
              </li>
            </ul>
          </div>

          {/* Checkbox de aceptación */}
          <label className="flex items-start gap-3 cursor-pointer group">
            <div
              className={`mt-0.5 w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 transition-colors ${
                accepted
                  ? "bg-purple-600 border-purple-600 dark:bg-purple-500 dark:border-purple-500"
                  : "border-purple-300 dark:border-purple-700 group-hover:border-purple-400 dark:group-hover:border-purple-600"
              }`}
              onClick={() => setAccepted(!accepted)}
            >
              {accepted && <Check className="w-3 h-3 text-white" />}
            </div>
            <span
              className="text-xs text-foreground leading-relaxed"
              onClick={() => setAccepted(!accepted)}
            >
              Entiendo cómo funciona el botón de pánico, sus limitaciones,
              y que mi código secreto es mi responsabilidad.
            </span>
          </label>

          {/* Inputs de código */}
          <div className="space-y-3">
            <div className="relative">
              <input
                type={showCode ? "text" : "password"}
                inputMode="numeric"
                pattern="[0-9]*"
                placeholder="Tu código secreto (4-8 dígitos)"
                value={code}
                onChange={(e) => {
                  const val = e.target.value.replace(/\D/g, "").slice(0, 8);
                  setCode(val);
                  setError("");
                }}
                className="w-full px-4 py-3 pr-10 rounded-xl border border-purple-200 dark:border-purple-800 bg-background text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-purple-400 dark:focus:ring-purple-600"
              />
              <button
                onClick={() => setShowCode(!showCode)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              >
                {showCode ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>

            <input
              type={showCode ? "text" : "password"}
              inputMode="numeric"
              pattern="[0-9]*"
              placeholder="Confirmar código"
              value={confirmCode}
              onChange={(e) => {
                const val = e.target.value.replace(/\D/g, "").slice(0, 8);
                setConfirmCode(val);
                setError("");
              }}
              className="w-full px-4 py-3 rounded-xl border border-purple-200 dark:border-purple-800 bg-background text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-purple-400 dark:focus:ring-purple-600"
            />
          </div>

          {/* Error */}
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

          {/* Saved */}
          <AnimatePresence>
            {saved && (
              <motion.div
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="flex items-center gap-2 text-xs text-green-600 dark:text-green-400"
              >
                <Check className="w-3 h-3" />
                Código guardado — el botón de pánico ya está activo
              </motion.div>
            )}
          </AnimatePresence>

          {/* Botón guardar */}
          <button
            onClick={handleSave}
            disabled={!code || !confirmCode || !accepted}
            className="w-full py-3 rounded-xl text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 dark:bg-purple-700 dark:hover:bg-purple-600 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            Activar botón de pánico
          </button>
        </div>
      )}
      <div className="rounded-2xl border border-rose-200 dark:border-rose-800/50 bg-rose-50/50 dark:bg-rose-950/20 p-6 space-y-5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-rose-100 dark:bg-rose-900/40 flex items-center justify-center">
            <LogOut className="w-5 h-5 text-rose-500 dark:text-rose-400" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">Salida rápida</h3>
            <p className="text-xs text-muted-foreground">
              {hasExitUrl ? "Destino configurado" : "Configura a dónde salir en caso de emergencia"}
            </p>
          </div>
        </div>

        <p className="text-xs text-muted-foreground leading-relaxed">
          Cuando actives la salida rápida desde Auren, tu navegador irá
          directamente a este sitio, reemplazando HerStory en el historial.
        </p>

        {hasExitUrl ? (
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 rounded-xl bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800/30">
              <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
              <p className="text-xs text-green-700 dark:text-green-400 font-mono truncate">{exitUrl}</p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setHasExitUrl(false)}
                className="flex-1 py-2.5 rounded-xl text-sm font-medium border border-rose-200 dark:border-rose-700 text-rose-700 dark:text-rose-300 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors"
              >
                Cambiar URL
              </button>
              <button
                onClick={handleResetExitUrl}
                className="py-2.5 px-4 rounded-xl text-sm text-red-500 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/20 transition-colors"
              >
                Eliminar
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            <input
              type="url"
              placeholder="google.com o https://weather.com"
              value={exitUrl}
              onChange={(e) => { setExitUrl(e.target.value); setExitUrlError(""); }}
              className="w-full px-4 py-3 rounded-xl border border-rose-200 dark:border-rose-800 bg-background text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-rose-400"
            />
            <AnimatePresence>
              {exitUrlError && (
                <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                  className="text-xs text-red-500 dark:text-red-400">
                  {exitUrlError}
                </motion.p>
              )}
            </AnimatePresence>
            <AnimatePresence>
              {exitUrlSaved && (
                <motion.div initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                  className="flex items-center gap-2 text-xs text-green-600 dark:text-green-400">
                  <Check className="w-3 h-3" /> URL de salida guardada
                </motion.div>
              )}
            </AnimatePresence>
            <button
              onClick={handleSaveExitUrl}
              disabled={!exitUrl.trim()}
              className="w-full py-3 rounded-xl text-sm font-medium text-white bg-rose-600 hover:bg-rose-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              Guardar URL de salida
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PanicSettings;