const express = require('express')
const cors = require('cors')
require('dotenv').config()

const app = express()
app.use(express.json())
app.use(cors())

const DEEPL_API_KEY = process.env.DEEPL_API_KEY

app.post('/translate', async (req, res) => {
  const { text, targetLang } = req.body
  const deeplUrl = `https://api-free.deepl.com/v2/translate?auth_key=${DEEPL_API_KEY}&text=${encodeURIComponent(text)}&target_lang=${targetLang}`

  try {
    const response = await fetch(deeplUrl)
    if (response.ok) {
      const data = await response.json()
      res.json({
        translation: data.translations[0].text
      })
    } else {
      res.status(response.status).json({ error: response.statusText })
    }
  } catch (error) {
    res.status(500).json({ error: 'Translation Failed' })

  }
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
})
