const express = require('express');
require("dotenv").config();

const chatbotController = require('./controllers/chatbotController');

const PORT = process.env.SERVER_PORT ? process.env.SERVER_PORT : 5000;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});

// Endpoint to test if server is running.
app.get('/api', (request, response) => {
    response.send('Server is running.');
});

// Local API endpoint calls the external API
app.post('/api/ask-ai', chatbotController.askAiQuestion);