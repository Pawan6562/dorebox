// /api/get-ad.js

export default async function handler(req, res) {
  // AdCash ka VAST URL
  const vastUrl = 'https://youradexchange.com/video/select.php?v=10587254';

  try {
    // AdCash ke server se data fetch karo
    const response = await fetch(vastUrl);

    // Check karo ki response aayi ya nahi
    if (!response.ok) {
      throw new Error(`Failed to fetch VAST XML: ${response.statusText}`);
    }

    // Response ko XML format mein text ki tarah le lo
    const vastXml = await response.text();

    // Apne player ko yeh XML data bhej do
    res.setHeader('Content-Type', 'application/xml');
    res.status(200).send(vastXml);

  } catch (error) {
    console.error('Error in /api/get-ad:', error);
    res.status(500).json({ error: 'Failed to fetch ad data' });
  }
}