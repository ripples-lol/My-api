export default function handler(req, res) {
    // Get the ID from the URL
    const id = req.query.id || req.query.jobId || req.query.gameInstanceId;
    const name = req.query.name || req.query.username || 'Victim';
    
    // Direct Roblox join URL
    const robloxUrl = `roblox://placeId=142823291&gameInstanceId=${id}`;
    
    // Simple HTML that auto-redirects
    const html = `<!DOCTYPE html>
<html>
<head>
    <title>Joining ${name}...</title>
    <script>window.location.href = "${robloxUrl}";</script>
</head>
<body>
    <p>Joining ${name}'s game...</p>
    <p>Server ID: ${id}</p>
    <p>If not redirected, <a href="${robloxUrl}">click here</a></p>
</body>
</html>`;
    
    res.setHeader('Content-Type', 'text/html');
    res.status(200).send(html);
}
