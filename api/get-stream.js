// File: /api/get-stream.js

export default async function handler(req, res) {
    const videoUrl = req.query.url;

    if (!videoUrl) {
        return res.status(400).send('Missing video URL');
    }

    try {
        const response = await fetch(videoUrl);
        if (!response.ok) {
            throw new Error(`Failed to fetch: ${response.statusText}`);
        }

        const text = await response.text();
        
        // Set headers to allow playback
        res.setHeader('Content-Type', 'application/vnd.apple.mpegurl');
        res.setHeader('Access-Control-Allow-Origin', '*');
        
        res.status(200).send(text);

    } catch (error) {
        console.error('Proxy Error:', error);
        res.status(500).send('Error fetching video stream');
    }
}
