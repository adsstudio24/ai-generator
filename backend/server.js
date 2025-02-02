const express = require('express');
const axios = require('axios');
require('dotenv').config();

const app = express();
app.use(express.json());

app.post('/generate', async (req, res) => {
    try {
        const response = await axios.post('https://api.openai.com/v1/completions', {
            model: 'text-davinci-003',
            prompt: req.body.prompt,
            max_tokens: 300
        }, {
            headers: { 'Authorization': `Bearer ${process.env.OPENAI_API_KEY}` }
        });
        res.json({ content: response.data.choices[0].text.trim() });
    } catch (error) {
        res.status(500).json({ error: 'Помилка генерації контенту' });
    }
});

app.listen(5000, () => console.log('AI Content Generator запущено на порту 5000'));
