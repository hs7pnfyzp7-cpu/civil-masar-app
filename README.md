export const TRUSTED = [
  'tvtc.gov.sa',
  'saudieng.sa',
  'pmi.org',
  'osha.gov',
  'learn.iccsafe.org',
  'iccsafe.org',
  'nebosh.org',
  'iosh.com'
];

const host = (u) => { try { return new URL(u).hostname.replace(/^www\./, ''); } catch { return ''; } };
const isTrusted = (u) => TRUSTED.some((d) => host(u) === d || host(u).endsWith('.' + d));

export default async function handler(req, res) {
  const { type = 'jobs', specialty = 'all', level = 'all' } = req.query;
  const sp = specialty === 'all' ? 'أي تخصص هندسي' : specialty;
  const lv = level === 'all' ? 'أي مستوى' : level;

  const jobsPrompt = `ابحث في الويب عن وظائف هندسية شاغرة حالياً في السعودية لتخصص "${sp}" ومستوى "${lv}".
ابحث في كل مصدر إعلان ممكن: جدارات، لينكدإن، بيت، مواقع التوظيف في الشركات، وإعلانات الشركات والجهات الحكومية.
شروط صارمة: لا تخترع وظيفة أو رابطاً. كل وظيفة يجب أن تأتي من صفحة ظهرت فعلاً في نتائج البحث، والرابط هو رابط تلك الصفحة نفسها.
أرجع فقط JSON بهذا الشكل بدون أي نص آخر: [{"title":"","company":"","city":"","source":"","link":"","posted":""}] بحد أقصى 8 وظائف.`;

  const coursesPrompt = `ابحث عن دورات تدريبية وبرامج تأهيل لتخصص "${sp}" ومستوى "${lv}" مقدّمة أو معتمدة من الجهات الموثوقة فقط.
لا تخترع دورة أو رابطاً: كل دورة يجب أن تأتي من صفحة ظهرت فعلاً في نتائج البحث.
أرجع فقط JSON: [{"title":"","provider":"","accreditor":"","link":"","price":""}] بحد أقصى 6 دورات.`;

  const tool = { type: 'web_search_20250305', name: 'web_search', max_uses: 6 };
  if (type === 'courses') tool.allowed_domains = TRUSTED;

  try {
    const r = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-6',
        max_tokens: 2000,
        tools: [tool],
        messages: [{ role: 'user', content: type === 'courses' ? coursesPrompt : jobsPrompt }]
      })
    });
    const data = await r.json();
    if (!r.ok) return res.status(502).json({ error: data?.error?.message || 'upstream error' });

    const seen = new Set();
    for (const b of data.content || []) {
      if (b.type === 'web_search_tool_result' && Array.isArray(b.content)) {
        b.content.forEach((x) => x.url && seen.add(x.url.split('#')[0]));
      }
    }
    const text = (data.content || []).filter((b) => b.type === 'text').map((b) => b.text).join('');
    const s = text.indexOf('['), e = text.lastIndexOf(']');
    let items = s > -1 && e > s ? JSON.parse(text.slice(s, e + 1)) : [];

    items = items.filter((it) => it.link && seen.has(it.link.split('#')[0]));
    if (type === 'courses') items = items.filter((it) => isTrusted(it.link));

    res.setHeader('Cache-Control', 's-maxage=1800, stale-while-revalidate=3600');
    return res.status(200).json({ items, fetchedAt: new Date().toISOString(
    return res.status(500).json({ error: 
  

