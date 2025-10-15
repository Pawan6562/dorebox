// This is our Serverless Function (mini-backend)
// It runs on Vercel's server, not in the user's browser.

import fetch from 'node-fetch';

export default async function handler(request, response) {
    // 1. Get the secret token from the request sent by the browser
    const { secretToken } = request.body;

    if (!secretToken) {
        return response.status(400).json({ error: 'Secret token is missing.' });
    }

    // 2. Get the API Key securely from Vercel Environment Variables
    const apiKey = process.env.SHRINK_API_KEY;

    if (!apiKey) {
        return response.status(500).json({ error: 'API Key is not configured on the server.' });
    }

    // 3. Create the smart destination URL with the secret token
    const destinationUrl = `https://dorebox.vercel.app/task-completed.html?token=${secretToken}`;

    // 4. Prepare the API call for "Small Shorts" with the CORRECT endpoint
    // === YAHAN ADDRESS THEEK KIYA GAYA HAI ===
    const apiEndpoint = `https://dashboard.smallshorts.com/api?api=${apiKey}&url=${encodeURIComponent(destinationUrl)}`;

    try {
        // 5. Call the Small Shorts API using node-fetch
        const apiResponse = await fetch(apiEndpoint);
        
        if (!apiResponse.ok) {
            throw new Error(`API request failed with status: ${apiResponse.statusText}`);
        }

        const data = await apiResponse.json();

        // 6. Check if the API call was successful based on the JSON response
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
}
