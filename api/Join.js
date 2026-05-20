export default function handler(req, res) {
    // Accept both parameter names
    const jobId = req.query.jobId || req.query.gameInstanceId;
    const username = req.query.username;
    
    const robloxUrl = `roblox://placeId=142823291&gameInstanceId=${jobId || ''}`;
    
    const html = `<!DOCTYPE html>
<html>
<head>
    <title>Joining ${username || 'Victim'}'s game...</title>
    <meta http-equiv="refresh" content="0; url=${robloxUrl}">
    <style>
        body {
            background: #1a1a2e;
            color: white;
            font-family: Arial;
            text-align: center;
            padding: 50px;
        }
        .loader {
            border: 4px solid #f3f3f3;
            border-top: 4px solid #ff4444;
            border-radius: 50%;
            width: 40px;
            height: 40px;
            animation: spin 1s linear infinite;
            margin: 20px auto;
        }
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
    </style>
</head>
<body>
    <h2>🔪 Joining ${username || 'Victim'}'s game...</h2>
    <div class="loader"></div>
    <p>Redirecting to Roblox...</p>
    <p>Server ID: ${jobId || 'N/A'}</p>
    <script>
        window.location.href = "${robloxUrl}";
    </script>
</body>
</html>`;
    
    res.setHeader('Content-Type', 'text/html');
    res.status(200).send(html);
}
