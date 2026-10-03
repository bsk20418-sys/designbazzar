import 'dotenv/config';
import express from 'express';
import { createServer as createViteServer } from 'vite';
import { sendInquiry } from './api/send-email.js';

const app = express();
app.use(express.json({ limit: '100kb' }));

app.post('/api/send-email', async (req, res) => {
  try {
    const result = await sendInquiry(req.body);
    if (!result.ok) return res.status(result.status || 500).json({ error: result.error });
    return res.status(200).json({ ok: true, id: result.data?.id || null });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Could not send the message. Please try again.' });
  }
});

const vite = await createViteServer({
  server: { middlewareMode: true, host: '0.0.0.0' },
  appType: 'spa',
});
app.use(vite.middlewares);

const port = Number(process.env.PORT || 3000);
app.listen(port, '0.0.0.0', () => {
  console.log(`\nDesignBazzar dev server ready at http://localhost:${port}/`);
  console.log('Email API: POST /api/send-email');
});
