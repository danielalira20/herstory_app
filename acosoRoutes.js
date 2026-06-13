import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import { createClient } from '@supabase/supabase-js';
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

const router = express.Router();

const supabase = createClient(
  process.env.SUPABASE_PUSH_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const ESTADOS = [
  'Baja california','Baja california sur','Sonora','Chihuahua','Coahuila',
  'Nuevo leon','Tamaulipas','Sinaloa','Durango','Zacatecas','San luis Potosi',
  'Nayarit','Jalisco','Aguascalientes','Guanajuato','Queretaro','Hidalgo',
  'Estado de mexico','Ciudad de mexico','Michoacan','Morelos','Tlaxcala',
  'Puebla','Guerrero','Veracruz','Oaxaca','Chiapas','Tabasco','Campeche',
  'Yucatan','Quintana roo','Colima'
];

const CATEGORIAS = ['calle', 'transporte', 'trabajo', 'escolar', 'digital'];

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(3, '1 h'),
});

// POST /acoso/report
router.post('/report', async (req, res) => {
  const { estado, categoria } = req.body;

  if (!ESTADOS.includes(estado) || !CATEGORIAS.includes(categoria)) {
    return res.status(400).json({ error: 'Datos inválidos.' });
  }

  const ip = req.headers['x-forwarded-for']?.split(',')[0] 
  || req.socket.remoteAddress 
  || 'unknown';
const { success } = await ratelimit.limit(`acoso:${ip}`);
if (!success) {
  return res.status(429).json({ error: 'Máximo 3 reportes por hora. Inténtalo más tarde.' });
}

  const { error } = await supabase
    .from('acoso_reports')
    .insert({ estado, categoria });

  if (error) return res.status(500).json({ error: error.message });
  res.json({ success: true });
});

// GET /acoso/stats
router.get('/stats', async (req, res) => {
  const { data, error } = await supabase
    .from('acoso_reports')
    .select('estado, categoria');

  if (error) return res.status(500).json({ error: error.message });

  const byEstado = {};
  const byCategoria = { calle: 0, transporte: 0, trabajo: 0, escolar: 0, digital: 0 };

  for (const row of data) {
    byEstado[row.estado] = (byEstado[row.estado] || 0) + 1;
    if (byCategoria[row.categoria] !== undefined) {
      byCategoria[row.categoria]++;
    }
  }

  res.json({ byEstado, byCategoria, total: data.length });
});

export default router;