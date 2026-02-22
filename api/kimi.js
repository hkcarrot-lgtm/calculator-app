/**
 * Vercel Serverless：代理调用 Kimi 大模型，Key 仅存于服务端环境变量，不暴露给前端。
 * 环境变量：KIMI_API_KEY（必填）、KIMI_API_BASE（可选，默认月之暗面）、KIMI_MODEL（可选）
 */

const KIMI_BASE = process.env.KIMI_API_BASE || 'https://api.moonshot.cn/v1';
const KIMI_MODEL = process.env.KIMI_MODEL || 'moonshot-v1-32k';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  const key = process.env.KIMI_API_KEY;
  if (!key) {
    return res.status(503).json({ error: 'KIMI_API_KEY not configured' });
  }
  let body;
  try {
    body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
  } catch (e) {
    return res.status(400).json({ error: 'Invalid JSON body' });
  }
  const { action, payload } = body;
  if (!action || !payload) {
    return res.status(400).json({ error: 'Missing action or payload' });
  }

  try {
    if (action === 'chat') {
      const question = await chatQuestion(key, payload);
      return res.status(200).json({ ok: true, text: question });
    }
    if (action === 'names') {
      const names = await generateNames(key, payload);
      return res.status(200).json({ ok: true, names });
    }
    return res.status(400).json({ error: 'Unknown action' });
  } catch (err) {
    console.error(err);
    const msg = err.message || String(err);
    return res.status(500).json({ error: 'Kimi request failed', detail: msg });
  }
}

async function chatQuestion(key, payload) {
  const { topicKey, topicVariants, history } = payload;
  const sys = `你是一位专业、温和的起名顾问，用自然口语与家长对话，收集起名偏好。每次只问一个问题，语句简短，不要重复用户已说过的内容。`;
  const userParts = [
    '当前要问的主题是：' + topicKey + '。可参考的提问方式（任选一种或自然改写）：' + (topicVariants || []).join('；'),
    '用户已答过的内容：' + JSON.stringify(history || {}, null, 0)
  ];
  const messages = [
    { role: 'system', content: sys },
    { role: 'user', content: userParts.join('\n\n') }
  ];
  const res = await fetch(KIMI_BASE + '/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + key
    },
    body: JSON.stringify({
      model: KIMI_MODEL,
      messages,
      temperature: 0.7,
      max_tokens: 200
    })
  });
  if (!res.ok) {
    const t = await res.text();
    throw new Error(res.status + ' ' + t);
  }
  const data = await res.json();
  const text = data.choices && data.choices[0] && data.choices[0].message && data.choices[0].message.content;
  if (!text || typeof text !== 'string') throw new Error('Empty Kimi response');
  return text.trim();
}

async function generateNames(key, payload) {
  const { surname, gender, birthY, birthM, birthD, birthHour, answers } = payload;
  const sys = `你是起名与八字五行顾问。根据用户提供的姓氏、性别、出生年月日时和偏好，生成 3 个名字，并给出详细解读。
解读必须包含且明确写出：
1. 【生辰】公历年月日、时辰（若有）；
2. 【八字五行】根据年月日时简要说明八字中五行（年柱、日主、时支等）；
3. 【名字五行】每个字属什么五行；
4. 【与八字】名字中字与八字五行的相生、相克关系要写清楚；
5. 【寓意】名字寓意与用户期望的呼应。
只输出一个 JSON 数组，每项格式：{"name":"姓+名","desc":"上述分段解读，用换行分隔"}。不要输出其它说明文字。`;
  const user = `姓氏：${surname}；性别：${gender}；
出生：${birthY}年${birthM}月${birthD}日${birthHour ? ' ' + birthHour + '时' : ' 未填时辰'}；
用户偏好：${JSON.stringify(answers || {})}。`;
  const messages = [
    { role: 'system', content: sys },
    { role: 'user', content: user }
  ];
  const res = await fetch(KIMI_BASE + '/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + key
    },
    body: JSON.stringify({
      model: KIMI_MODEL,
      messages,
      temperature: 0.8,
      max_tokens: 2000
    })
  });
  if (!res.ok) {
    const t = await res.text();
    throw new Error(res.status + ' ' + t);
  }
  const data = await res.json();
  const content = data.choices && data.choices[0] && data.choices[0].message && data.choices[0].message.content;
  if (!content) throw new Error('Empty Kimi response');
  const jsonMatch = content.match(/\[[\s\S]*\]/);
  if (!jsonMatch) throw new Error('No JSON array in response');
  let arr;
  try {
    arr = JSON.parse(jsonMatch[0]);
  } catch (e) {
    throw new Error('Invalid JSON: ' + jsonMatch[0].slice(0, 200));
  }
  if (!Array.isArray(arr)) return [];
  return arr.slice(0, 3).map((item) => ({
    name: item.name || '',
    desc: (item.desc || '').replace(/\n/g, '\n')
  }));
}
