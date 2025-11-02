// File: /api/get-stream.js

export default async function handler(req, res) {
    const videoUrl = req.query.url;

    if (!videoUrl) {
        return res.status(400).send('Missing video URL');
    }

    // === YEH HAI FINAL FIX: CORS-ANYWHERE PROXY ===
    // Hum ek public proxy ka istemal karenge taaki Dailymotion request ko block na kar paaye.
    const proxy = 'https://cors-anywhere.herokuapp.com/';
    const finalUrl = `${proxy}${videoUrl}`;
    // === END OF FIX ===

    try {
        const response = await fetch(finalUrl, {
            headers: {
                // Hum proxy use kar rahe hain, isliye ab in headers ki zaroorat nahi hai,
                // lekin inhe rakhne se koi nuksaan bhi nahi hai.
                'Origin': 'https://dorebox.vercel.app', // Yeh header zaroori hai proxy ke liye
                'X-Requested-With': 'XMLHttpRequest'
            }
        });

        if (!response.ok) {
            console.error(`Proxy fetch failed: ${response.status} ${response.statusText}`);
            const errorBody = await response.text();
            console.error('Response Body:', errorBody);
            throw new Error(`Failed to fetch via proxy: ${response.statusText}`);
        }

        const data = await response.text();
        
        res.setHeader('Content-Type', 'application/vnd.apple.mpegurl');
        res.setHeader('Access-Control-Allow-Origin', '*');
        
        res.status(200).send(data);

    } catch (error) {
        console.error('Proxy Error:', error);
        res.status(500).send(`Error fetching video stream: ${error.message}`);
    }
}
