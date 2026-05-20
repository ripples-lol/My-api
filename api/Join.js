export default function handler(req, res) {
    const { jobId, username } = req.query;
    
    // Create the join script that actually works
    const joinScript = `game:GetService("TeleportService"):TeleportToPlaceInstance(142823291, "${jobId || ''}")`;
    
    const html = `
    <!DOCTYPE html>
    <html>
    <head>
        <title>Joining ${username || 'Victim'}'s Server...</title>
        <style>
            body {
                background: #1a1a2e;
                color: white;
                font-family: 'Segoe UI', Arial, sans-serif;
                text-align: center;
                padding: 50px;
            }
            .container {
                background: rgba(0,0,0,0.5);
                border-radius: 20px;
                padding: 40px;
                max-width: 500px;
                margin: auto;
            }
            .job-id {
                background: #2a2a3e;
                padding: 15px;
                border-radius: 8px;
                font-family: monospace;
                word-break: break-all;
                margin: 20px 0;
                font-size: 12px;
            }
            button {
                background: #ff4444;
                color: white;
                padding: 12px 24px;
                border: none;
                border-radius: 8px;
                cursor: pointer;
                font-size: 16px;
                margin: 10px;
            }
            button:hover {
                background: #ff6666;
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
            input {
                width: 100%;
                padding: 12px;
                margin: 10px 0;
                background: #2a2a3e;
                border: 1px solid #ff4444;
                border-radius: 8px;
                color: white;
                font-family: monospace;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <h2>🔪 Join ${username || 'Victim'}'s Server</h2>
            <div class="loader"></div>
            <div class="job-id">
                <strong>Job ID:</strong><br>
                ${jobId || 'N/A'}
            </div>
            <p>Copy this script and run it in your executor:</p>
            <input type="text" value="${joinScript}" id="joinScript" readonly>
            <br>
            <button onclick="copyScript()">📋 Copy Join Script</button>
            <button onclick="runNow()">🎮 Run Now (if supported)</button>
            <p style="font-size: 12px; margin-top: 20px;">
                ${jobId ? 'Script ready to copy!' : 'Waiting for Job ID...'}
            </p>
        </div>
        
        <script>
            function copyScript() {
                const script = document.getElementById('joinScript');
                script.select();
                document.execCommand('copy');
                alert('Join script copied to clipboard! Paste it in your executor.');
            }
            
            function runNow() {
                const script = document.getElementById('joinScript').value;
                alert('Run this in your executor: ' + script);
            }
        </script>
    </body>
    </html>
    `;
    
    res.setHeader('Content-Type', 'text/html');
    res.status(200).send(html);
}
