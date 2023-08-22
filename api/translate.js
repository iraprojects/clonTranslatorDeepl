const axios = require('axios');
const cors = require('cors')
app.use(cors())

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).end();
  }

  const { text, targetLang, sourceLang } = req.body;

  try {
    const response = await axios.post(
      'https://api-free.deepl.com/v2/translate',
      {
        text: text,
        target_lang: targetLang,
        ...(sourceLang !== 'auto' ? { source_lang: sourceLang } : {}),
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
        params: {
          auth_key: process.env.DEEPL_API_KEY,
        },
      }
    );

    const data = response.data;
    res.json({ translation: data.translations[0].text });
  } catch (error) {
    console.error('Translation error:', error);
    res.status(500).json({ error: 'Translation failed' });
  }
}
