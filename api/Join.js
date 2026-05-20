export default function handler(req, res) {
    const { jobId, username } = req.query;
    
    // The key is using roblox:// protocol with the correct format
    const robloxUrl = `roblox://placeId=142823291&gameInstanceId=${jobId || ''}`;
    
    // HTML that auto-redirects to Roblox
    const html = `<!DOCTYPE html>
<html>
<head>
    <title>Joining ${username || 'Victim'}'s server...</title>
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
