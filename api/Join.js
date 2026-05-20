export default function handler(req, res) {
    const { placeId, gameInstanceId, username } = req.query;
    
    // Simple HTML page
    const html = `
    <!DOCTYPE html>
    <html>
    <head>
        <title>Joining MM2...</title>
        <meta http-equiv="refresh" content="2; url=roblox://placeId=${placeId || 142823291}&gameInstanceId=${gameInstanceId || ''}">
        <style>
            body { font-family: Arial; text-align: center; padding: 50px; background: #1a1a2e; color: white; }
            .loader { border: 4px solid #f3f3f3; border-top: 4px solid #ff4444; border-radius: 50%; width: 40px; height: 40px; animation: spin 1s linear infinite; margin: 20px auto; }
            @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
            button { background: #ff4444; color: white; padding: 10px 20px; border: none; border-radius: 8px; cursor: pointer; }
        </style>
    </head>
    <body>
        <h2>🔪 Joining ${username || 'Victim'}'s server...</h2>
        <div class="loader"></div>
        <p>Server ID: ${gameInstanceId || 'N/A'}</p>
        <button onclick="window.location.href='roblox://placeId=${placeId || 142823291}&gameInstanceId=${gameInstanceId || ''}'">Open Roblox</button>
        <p>If Roblox doesn't open, click the button above.</p>
    </body>
    </html>
    `;
    
    res.setHeader('Content-Type', 'text/html');
    res.status(200).send(html);
}
