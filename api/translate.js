const DEEPL_API_KEY = process.env.DEEPL_API_KEY

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).end();
  }

  const { text, targetLang, sourceLang } = req.body;

  try {
    const response = await fetch('https://api-free.deepl.com/v2/translate', {
      method: 'POST',
      headers: {
        'Authorization': `DeepL-Auth-Key ${DEEPL_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        text: [text],
        target_lang: targetLang,
        ...(sourceLang !== 'auto' ? {source_lang: sourceLang} : {})
      }),
    });

    const data = await response.json();
    const translation = data.translations[0].text;
    res.json({ translation });
  } catch (error) {
    res.status(500).json({ error: 'Translation failed' });
  }
}
