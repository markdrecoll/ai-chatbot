const OpenAI = require('openai');

const openAiClient = new OpenAI({ apiKey: process.env.YOUR_OPENAI_API_KEY_IN_ENV_FILE });

const askAiQuestion = async (request, response) => {
    try {
        const completion = await openAiClient.chat.completions.create({
            messages: [
                { role: "system", content: request.body.userSystemChoice },
                { role: "user", content: request.body.userQuestion }
            ],
            model: "gpt-4o-mini",
        });

        return response.json({
            openAiResponse: completion.choices[0].message.content,
            status: "Success"
        });
    } catch (error) {
        console.log(error);
        return response.json({
            status: "Failed"
        });
    }
}

module.exports = { askAiQuestion };