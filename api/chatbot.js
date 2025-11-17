const fetch = require('node-fetch');

// The API key must be set as an environment variable in Vercel
const OPENROUTER_API_KEY = process.env.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;
const MODEL_NAME = "nvidia/nemotron-nano-12b-v2-vl:free";

module.exports = async (req, res) => {
    // Set CORS headers for security and client-side access
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    if (req.method !== 'POST') {
        res.status(405).send('Method Not Allowed');
        return;
    }

    if (!OPENROUTER_API_KEY) {
        console.error("OPENROUTER_API_KEY is not set.");
        res.status(500).json({ error: "Server configuration error: API key missing." });
        return;
    }

    try {
        const { messages } = req.body;

        if (!messages || !Array.isArray(messages)) {
            res.status(400).json({ error: "Invalid request body: 'messages' array is required." });
            return;
        }

        const openRouterResponse = await fetch("https://openrouter.ai/api/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${OPENROUTER_API_KEY}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                model: MODEL_NAME,
                messages: messages,
                // Include reasoning as per user's example, though it might not be needed for a simple chat
                extra_body: { "reasoning": { "enabled": true } }
            }),
        });

        if (!openRouterResponse.ok) {
            const errorText = await openRouterResponse.text();
            console.error("OpenRouter API Error:", openRouterResponse.status, errorText);
            res.status(openRouterResponse.status).json({ error: "External API call failed.", details: errorText });
            return;
        }

        const data = await openRouterResponse.json();
        res.status(200).json(data);

    } catch (error) {
        console.error("Internal Server Error:", error);
        res.status(500).json({ error: "An unexpected error occurred on the server." });
    }
};
