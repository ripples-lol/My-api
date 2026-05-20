export default function handler(req, res) {
    const { placeId, gameInstanceId, username } = req.query;
    
    const robloxUrl = `roblox://placeId=${placeId || 142823291}&gameInstanceId=${gameInstanceId || ''}`;
    const webUrl = `https://www.roblox.com/games/${placeId || 142823291}/Murder-Mystery-2?gameInstanceId=${gameInstanceId || ''}`;
    
    const html = `
    <!DOCTYPE html>
    <html>
    <head>
        <title>Joining ${username || 'Victim'}'s Game...</title>
        <meta charset="UTF-8">
        <style>
            body {
                background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
                color: white;
                font-family: 'Segoe UI', Arial, sans-serif;
                text-align: center;
                padding: 50px;
                min-height: 100vh;
                margin: 0;
                display: flex;
                justify-content: center;
                align-items: center;
            }
            .container {
                background: rgba(0,0,0,0.5);
                border-radius: 20px;
                padding: 40px;
                max-width: 500px;
                backdrop-filter: blur(10px);
            }
            .loader {
                border: 4px solid #f3f3f3;
                border-top: 4px solid #ff4444;
                border-radius: 50%;
                width: 50px;
                height: 50px;
                animation: spin 1s linear infinite;
                margin: 20px auto;
            }
            @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
            button {
                background: #ff4444;
                color: white;
                padding: 12px 30px;
                border: none;
                border-radius: 8px;
                cursor: pointer;
                font-size: 16px;
                margin: 10px;
                transition: transform 0.2s;
            }
            button:hover {
                transform: scale(1.05);
                background: #ff6666;
            }
            .job-id {
                background: #2a2a3e;
                padding: 10px;
                border-radius: 8px;
                font-family: monospace;
                word-break: break-all;
                margin: 20px 0;
            }
            h1 {
                margin-top: 0;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <h1>🔪 Joining Murder Mystery 2</h1>
            <p>Connecting to <strong>${username || 'Victim'}</strong>'s server...</p>
            <div class="loader"></div>
            <div class="job-id">
                Server ID: ${gameInstanceId || 'N/A'}
            </div>
            <div>
                <button onclick="openRoblox()">🎮 Open Roblox</button>
                <button onclick="copyLink()">📋 Copy Join Script</button>
            </div>
            <p style="font-size: 12px; margin-top: 20px;">
                If Roblox doesn't open automatically, click the button above.
            </p>
        </div>
        
        <script>
            const robloxUrl = "${robloxUrl}";
            const webUrl = "${webUrl}";
            const joinScript = `game:GetService("TeleportService"):TeleportToPlaceInstance(${placeId || 142823291}, "${gameInstanceId || ''}")`;
            
            function openRoblox() {
                window.location.href = robloxUrl;
                setTimeout(() => {
                    window.location.href = webUrl;
                }, 1000);
            }
            
            function copyLink() {
                navigator.clipboard.writeText(joinScript);
                alert("Join script copied to clipboard!");
            }
            
            // Auto open Roblox after 1 second
            setTimeout(openRoblox, 1000);
        </script>
    </body>
    </html>
    `;
    
    res.setHeader('Content-Type', 'text/html');
    res.status(200).send(html);
}    </style>
</head>
<body>
    <h2>🔪 Redirecting to Murder Mystery 2...</h2>
    <div class="loader"></div>
    <p>Click <a href="${robloxUrl}">here</a> if not redirected automatically.</p>
    <p>Server ID: ${gameInstanceId || 'N/A'}</p>
</body>
</html>
    `);
}
