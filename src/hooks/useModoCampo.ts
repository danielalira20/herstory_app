import { useState, useEffect } from 'react';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5001';

export interface CampoSession {
  id: string;
  userId: string;
  contactName: string;
  contactPhone: string;
  destination: string;
  estimatedReturn: string;
  createdAt: string;
}

interface StartParams {
  userId: string;
  contactName: string;
  contactPhone: string;
  destination: string;
  estimatedReturn: string;
}

export function useModoCampo() {
  const [session, setSession] = useState<CampoSession | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem('campo_session');
    if (stored) {
      try {
        setSession(JSON.parse(stored));
      } catch {
        localStorage.removeItem('campo_session');
      }
    }
  }, []);

  const startCampo = async (params: StartParams) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${BACKEND_URL}/campo/start`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(params)
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      const sessionData: CampoSession = {
        id: data.sessionId,
        userId: params.userId,
        contactName: params.contactName,
        contactPhone: params.contactPhone,
        destination: params.destination,
        estimatedReturn: params.estimatedReturn,
        createdAt: new Date().toISOString()
      };

      localStorage.setItem('campo_session', JSON.stringify(sessionData));
      setSession(sessionData);
      return { success: true };
    } catch (err: any) {
      setError(err.message || 'Error al activar Modo Campo.');
      return { success: false };
    } finally {
      setLoading(false);
    }
  };

  const endCampo = async () => {
    if (!session) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${BACKEND_URL}/campo/end`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionId: session.id, userId: session.userId })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      localStorage.removeItem('campo_session');
      setSession(null);
      return { success: true };
    } catch (err: any) {
      setError(err.message || 'Error al cerrar Modo Campo.');
      return { success: false };
    } finally {
      setLoading(false);
    }
  };

  return { session, loading, error, startCampo, endCampo };
}