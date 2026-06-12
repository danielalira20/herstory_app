import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import twilio from 'twilio';
import { createClient } from '@supabase/supabase-js';
import cron from 'node-cron';

const router = express.Router();

const twilioClient = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

const WHATSAPP_FROM = 'whatsapp:+14155238886';

const supabase = createClient(
  process.env.SUPABASE_PUSH_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// POST /campo/start
router.post('/start', async (req, res) => {
  const { userId, contactName, contactPhone, destination, estimatedReturn } = req.body;

  const { data: existing } = await supabase
    .from('campo_sessions')
    .select('id')
    .eq('user_id', userId)
    .eq('status', 'active')
    .maybeSingle();

  if (existing) {
    return res.status(400).json({ error: 'Ya tienes un Modo Campo activo.' });
  }

  const { data: session, error } = await supabase
    .from('campo_sessions')
    .insert({
      user_id: userId,
      contact_name: contactName,
      contact_phone: contactPhone,
      destination,
      estimated_return: estimatedReturn,
      status: 'active'
    })
    .select()
    .single();

  if (error) return res.status(500).json({ error: error.message });

  const returnTime = new Date(estimatedReturn).toLocaleTimeString('es-MX', {
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'America/Mexico_City'
  });

  const phoneClean = '+52' + contactPhone.replace(/\D/g, '').slice(-10);

  try {
    await twilioClient.messages.create({
      body: `🔴 *Alerta HerStory — Modo Campo activado*\n\nHola ${contactName}, alguien de tu red salió a buscar y te registró como contacto de confianza.\n\n📍 Destino: ${destination}\n🕐 Hora estimada de regreso: ${returnTime}\n\nSi no recibes confirmación de que llegó bien antes de esa hora, comunícate con ella de inmediato.\n\n_HerStory — Porque también cuidamos a quienes buscan._`,
      from: WHATSAPP_FROM,
      to: `whatsapp:${phoneClean}`
    });
  } catch (err) {
    console.error('[Campo] Twilio error al iniciar:', err.message);
  }

  res.json({ success: true, sessionId: session.id });
});

// POST /campo/end
router.post('/end', async (req, res) => {
  const { sessionId, userId } = req.body;

  const { data: session } = await supabase
    .from('campo_sessions')
    .select('*')
    .eq('id', sessionId)
    .eq('user_id', userId)
    .maybeSingle();

  if (!session) return res.status(404).json({ error: 'Sesión no encontrada.' });
  if (session.status !== 'active') return res.status(400).json({ error: 'La sesión ya no está activa.' });

  await supabase
    .from('campo_sessions')
    .update({ status: 'closed_safe', closed_at: new Date().toISOString() })
    .eq('id', sessionId);

  const phoneClean = '+52' + session.contact_phone.replace(/\D/g, '').slice(-10);

  try {
    await twilioClient.messages.create({
      body: `✅ *HerStory — Llegó segura*\n\nTranquila, ${session.contact_name}. La persona que te avisó confirmó que llegó bien.\n\nAlerta cancelada. Gracias por ser parte de su red de cuidado. 💜`,
      from: WHATSAPP_FROM,
      to: `whatsapp:${phoneClean}`
    });
  } catch (err) {
    console.error('[Campo] Twilio error al cerrar:', err.message);
  }

  res.json({ success: true });
});

// GET /campo/active/:userId
router.get('/active/:userId', async (req, res) => {
  const { userId } = req.params;

  const { data: session } = await supabase
    .from('campo_sessions')
    .select('*')
    .eq('user_id', userId)
    .eq('status', 'active')
    .maybeSingle();

  res.json({ session: session || null });
});

// Cron: cada 15 minutos revisa sesiones expiradas
cron.schedule('*/15 * * * *', async () => {
  console.log('[CampoCron] Revisando sesiones expiradas...');

  const now = new Date().toISOString();

  const { data: expiradas } = await supabase
    .from('campo_sessions')
    .select('*')
    .eq('status', 'active')
    .eq('alert_sent', false)
    .lt('estimated_return', now);

  if (!expiradas || expiradas.length === 0) return;

  for (const session of expiradas) {
    console.log(`[CampoCron] Escalando sesión ${session.id}`);

    const hora = new Date(session.estimated_return).toLocaleTimeString('es-MX', {
      hour: '2-digit',
      minute: '2-digit',
      timeZone: 'America/Mexico_City'
    });

    const phoneClean = '+52' + session.contact_phone.replace(/\D/g, '').slice(-10);

    try {
      await twilioClient.messages.create({
        body: `⚠️ *ALERTA URGENTE — HerStory*\n\n${session.contact_name}, la persona que te avisó *no ha confirmado que llegó*.\n\n📍 Había salido a: ${session.destination}\n🕐 Debía regresar a las: ${hora}\n\n*Comunícate con ella de inmediato.* Si no la localizas, contacta al colectivo más cercano.\n\n_HerStory — Modo Campo_`,
        from: WHATSAPP_FROM,
        to: `whatsapp:${phoneClean}`
      });
    } catch (err) {
      console.error(`[CampoCron] Error sesión ${session.id}:`, err.message);
    }

    await supabase
      .from('campo_sessions')
      .update({ status: 'escalated', alert_sent: true })
      .eq('id', session.id);
  }
});

export default router;

