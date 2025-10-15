// This is our Serverless Function (mini-backend)
// It runs on Vercel's server, not in the user's browser.

export default async function handler(request, response) {
    // 1. Get the secret token from the request sent by the browser
    const { secretToken } = request.body;

    // If the token is missing, send an error
    if (!secretToken) {
        return response.status(400).json({ error: 'Secret token is missing.' });
    }

    // 2. Get the API Key securely from Vercel Environment Variables
    const apiKey = process.env.SHRINK_API_KEY;

    // If the API key is not set on Vercel, send a server error
    if (!apiKey) {
        return response.status(500).json({ error: 'API Key is not configured on the server.' });
    }

    // 3. Create the smart destination URL with the secret token
    const destinationUrl = `https://dorebox.vercel.app/task-completed.html?token=${secretToken}`;

    // 4. Prepare the API call for "Small Short URL"
    // IMPORTANT: Ye URL "Small Short URL" ki documentation ke hisaab se hai.
    const apiEndpoint = `https://smallshort.in/api?api=${apiKey}&url=${encodeURIComponent(destinationUrl)}`;

    try {
        // 5. Call the Small Short URL API
        const apiResponse = await fetch(apiEndpoint);
        const data = await apiResponse.json();

        // 6. Check if the API call was successful
        if (data.status === 'success') {
            // If successful, send the new short URL back to the browser
            return response.status(200).json({ shortUrl: data.shortenedUrl });
        } else {
            // If the API returned an error (e.g., invalid API key), send that error
            return response.status(400).json({ error: data.message || 'Failed to create short link.' });
        }
    } catch (error) {
        // If there was a network error, send a server error
        console.error('API call failed:', error);
        return response.status(500).json({ error: 'An unexpected error occurred.' });
    }
}
