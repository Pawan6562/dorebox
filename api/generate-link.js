// This is our Serverless Function for GPlinks.com

const fetch = require('node-fetch');

module.exports = async (request, response) => {
    // 1. Get the secret token from the request
    const { secretToken } = request.body;
    if (!secretToken) {
        return response.status(400).json({ error: 'Secret token is missing.' });
    }

    // 2. Get the API Key securely from Vercel
    const apiKey = process.env.SHRINK_API_KEY; // Naam se fark nahi padta
    if (!apiKey) {
        return response.status(500).json({ error: 'API Key is not configured on the server.' });
    }

    // 3. Create the smart destination URL
    const destinationUrl = `https://dorebox.vercel.app/task-completed.html?token=${secretToken}`;

    // 4. Prepare the API call for GPlinks
    // === YAHAN GPLINKS KA ENDPOINT USE KIYA GAYA HAI ===
    const apiEndpoint = `https://api.gplinks.com/api?api=${apiKey}&url=${encodeURIComponent(destinationUrl)}`;

    try {
        // 5. Call the GPlinks API
        const apiResponse = await fetch(apiEndpoint);
        
        if (!apiResponse.ok) {
            throw new Error(`API request failed with status: ${apiResponse.statusText}`);
        }

        const data = await apiResponse.json();

        // 6. Check if the API call was successful
        // GPlinks ke response ke hisaab se check karna hai
        if (data.status === 'success') {
            return response.status(200).json({ shortUrl: data.shortenedUrl });
        } else {
            // Send the actual error message from the API
            return response.status(400).json({ error: data.message || 'Failed to create short link.' });
        }
    } catch (error) {
        console.error('API call failed:', error.message);
        return response.status(500).json({ error: 'An unexpected error occurred on the server.' });
    }
};
