export default function handler(req, res) {
    const { placeId, gameInstanceId } = req.query;

    const robloxUrl = `https://www.roblox.com/games/${placeId || 142823291}/Murder-Mystery-2?gameInstanceId=${gameInstanceId || ''}`;

    res.setHeader('Content-Type', 'text/html');
    res.send(`
<!DOCTYPE html>
<html>
<head>
    <title>Joining Murder Mystery 2...</title>
    <meta http-equiv="refresh" content="0; url=${robloxUrl}">
    <style>
        body {
            font-family: Arial, sans-serif;
            text-align: center;
            padding: 50px;
            background: #1a1a2e;
            color: white;
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
        a {
            color: #ff4444;
        }
    </style>
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
