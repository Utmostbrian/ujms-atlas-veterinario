const KEY = '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';

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') { res.status(200).end(); return; }
  if (req.method !== 'POST') { res.status(405).end(); return; }
  try {
    let b = req.body;
    if (typeof b === 'string') b = JSON.parse(b);
    const payload = {
      model: (b && b.model) || 'claude-sonnet-4-6',
      max_tokens: (b && b.max_tokens) || 1200,
      messages: b && b.messages
    };
    if (b && b.system) payload.system = b.system;
    const r = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': KEY,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify(payload)
    });
    const data = await r.json();
    res.status(200).json(data);
  } catch (e) {
    res.status(500).json({ error: { message: e.message } });
  }
};
