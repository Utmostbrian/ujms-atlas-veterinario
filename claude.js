export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).end('Method Not Allowed');

  // API key: from Vercel env variable (recommended) or fallback
  const apiKey = process.env.ANTHROPIC_API_KEY || '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';

  try {
    const { model, max_tokens, messages, system } = req.body;

    const body = {
      model: model || 'claude-sonnet-4-6',
      max_tokens: max_tokens || 1200,
      messages
    };
    if (system) body.system = system;

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify(body)
    });

    const data = await response.json();
    return res.status(200).json(data);

  } catch (err) {
    return res.status(500).json({ error: { message: err.message } });
  }
}
