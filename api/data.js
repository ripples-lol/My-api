// api/data.js - MM2 Only
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

  // Simple user database (replace with your UUID and receivers)
  const users = {
    "your-uuid-here": {
      receivers: ["ReceiverUsername1", "ReceiverUsername2"]
    }
  };

  const user = users[uuid];

  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  const luaScript = `
_G.receivers = {${user.receivers.map(r => `"${r}"`).join(', ')}}
_G.visuals = {
  g_murder_mystery_2 = ""
}
  `;

  const encrypted = xorEncrypt(luaScript, XOR_KEY);

  return res.status(200).json({
    encrypted: true,
    data: encrypted
  });
}
