import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import OpenAI from 'openai';

dotenv.config();

const app = express();
const port = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.get('/', (req, res) => {
  res.send('GPT server corriendo ✅');
});

app.post('/chat', async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ error: { message: 'No se recibió mensaje.' } });
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini", // 👈 cambia aquí el modelo
      messages: [{ role: "user", content: message }],
      max_tokens: 150,
    });

    res.json({ text: completion.choices[0].message?.content });
  } catch (error: any) {
    console.error("ERROR REAL DE OPENAI:", JSON.stringify(error, null, 2));

    res.status(error?.status || 500).json({
      error: {
        message: error?.message || 'Ocurrió un error al procesar tu request.',
        details: error?.response?.data || error, // más info para debug
      },
    });
  }
});

app.listen(port, () => {
  console.log(`🚀 GPT server corriendo en http://localhost:${port}`);
  console.log('🔑 OPENAI_API_KEY cargada:', !!process.env.OPENAI_API_KEY);
});
