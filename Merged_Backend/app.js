const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const brainLogic = require('./brainLogic');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post('/analyze-case', async (req, res) => {
    try {
        const result = await brainLogic.analyzeCase(req.body);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`AI Brain server running on port ${PORT}`);
});