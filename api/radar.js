const TRUSTED_COURSE_DOMAINS = [
  'tvtc.gov.sa',
  'saudieng.sa',
  'pmi.org',
  'osha.gov',
  'learn.iccsafe.org',
  'iccsafe.org',
  'nebosh.org',
  'iosh.com'
];

const SPECIALTIES = new Set([
  'الهندسة المدنية',
  'الهندسة المعمارية',
  'الهندسة الكهربائية',
  'الهندسة الميكانيكية',
  'الهندسة الصناعية',
  'الهندسة البيئية',
  'هندسة التعدين'
]);
const LEVELS = new Set(['فني', 'مهندس']);
const MAX_ITEMS = 8;

function send(res, status, body) {
  return res.status(status).json(body);
}

function parseParam(value, fallback) {
  return Array.isArray(value) ? value[0] || fallback : value || fallback;
}

function getHost(value) {
  try {
    return new URL(value).hostname.toLowerCase().replace(/^www\./, '');
  } catch {
    return '';
  }
}

function isTrustedCourseUrl(value) {
  const host = getHost(value);
  return Boolean(host) && TRUSTED_COURSE_DOMAINS.some(
    (domain) => host === domain || host.endsWith(`.${domain}`)
  );
}

// Compare the actual page path returned by web search, ignoring tracking query
// parameters and fragments that the model may add when formatting a result.
function canonicalUrl(value) {
  try {
    const url = new URL(value);
    if (url.protocol !== 'https:') return '';
    url.hash = '';
    url.search = '';
    url.hostname = url.hostname.toLowerCase();
    return `${url.origin}${url.pathname.replace(/\/$/, '') || '/'}`;
  } catch {
    return '';
  }
}

function parseJsonArray(text) {
  const cleaned = String(text || '').replace(/```(?:json)?/gi, '').trim();
  const start = cleaned.indexOf('[');
  const end = cleaned.lastIndexOf(']');
  if (start < 0 || end <= start) return [];
  try {
    const parsed = JSON.parse(cleaned.slice(start, end + 1));
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function cleanText(value, maxLength = 240) {
  return typeof value === 'string' ? value.trim().slice(0, maxLength) : '';
}

function collectSearchUrls(content) {
  const urls = new Set();
  for (const block of content || []) {
    if (block.type !== 'web_search_tool_result' || !Array.isArray(block.content)) continue;
    for (const result of block.content) {
      const normalized = canonicalUrl(result?.url);
      if (normalized) urls.add(normalized);
    }
  }
  return urls;
}

function normalizeResults(records, searchUrls, type) {
  const seen = new Set();
  const results = [];

  for (const item of records) {
    if (!item || typeof item !== 'object') continue;
    const link = cleanText(item.link, 1000);
    const normalized = canonicalUrl(link);
    if (!normalized || !searchUrls.has(normalized) || seen.has(normalized)) continue;
    if (type === 'courses' && !isTrustedCourseUrl(link)) continue;

    const title = cleanText(item.title, 180);
    if (!title) continue;
    seen.add(normalized);

    if (type === 'jobs') {
      results.push({
        title,
        company: cleanText(item.company, 140),
        city: cleanText(item.city, 100),
        source: cleanText(item.source, 80) || getHost(link),
        link,
        posted: cleanText(item.posted, 80)
      });
    } else {
      results.push({
        title,
        provider: cleanText(item.provider, 140),
        accreditor: cleanText(item.accreditor, 140),
        link,
        price: cleanText(item.price, 100)
      });
    }

    if (results.length >= MAX_ITEMS) break;
  }

  return results;
}

export default async function handler(req, res) {
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('Cache-Control', 'no-store');

  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return send(res, 405, { error: 'method_not_allowed', message: 'استخدم طلب GET.' });
  }

  const type = parseParam(req.query?.type, 'jobs');
  const specialty = parseParam(req.query?.specialty, 'all');
  const level = parseParam(req.query?.level, 'all');

  if (!['jobs', 'courses'].includes(type)) {
    return send(res, 400, { error: 'invalid_type', message: 'نوع البحث غير صالح.' });
  }
  if (specialty !== 'all' && !SPECIALTIES.has(specialty)) {
    return send(res, 400, { error: 'invalid_specialty', message: 'التخصص المحدد غير معروف.' });
  }
  if (level !== 'all' && !LEVELS.has(level)) {
    return send(res, 400, { error: 'invalid_level', message: 'المستوى المحدد غير معروف.' });
  }
  if (!process.env.ANTHROPIC_API_KEY) {
    return send(res, 503, {
      error: 'radar_not_configured',
      message: 'الرادار غير مهيأ: أضف ANTHROPIC_API_KEY إلى متغيرات بيئة مشروع Vercel ثم أعد النشر.'
    });
  }

  const specialtyLabel = specialty === 'all' ? 'أي تخصص هندسي' : specialty;
  const levelLabel = level === 'all' ? 'أي مستوى' : level;
  const prompt = type === 'jobs'
    ? `ابحث عبر الويب عن إعلانات وظائف هندسية متاحة حالياً في السعودية لتخصص "${specialtyLabel}" ومستوى "${levelLabel}". أعد فقط الوظائف التي ظهرت صفحاتها فعلياً في نتائج أداة البحث. لا تخترع وظائف أو روابط. أخرج JSON صالحاً فقط على شكل مصفوفة، بحد أقصى 8 عناصر: [{"title":"","company":"","city":"","source":"","link":"","posted":""}]. اجعل link رابط الصفحة المصدر نفسها.`
    : `ابحث عبر الويب عن دورات هندسية مناسبة في السعودية لتخصص "${specialtyLabel}" ومستوى "${levelLabel}". أعد فقط الدورات من نتائج البحث الفعلية وعلى نطاقات الجهات الموثوقة المسموح بها. لا تخترع دورات أو روابط. أخرج JSON صالحاً فقط على شكل مصفوفة، بحد أقصى 8 عناصر: [{"title":"","provider":"","accreditor":"","link":"","price":""}]. اجعل link رابط الصفحة المصدر نفسها.`;

  const searchTool = {
    type: 'web_search_20250305',
    name: 'web_search',
    max_uses: 5
  };
  if (type === 'courses') searchTool.allowed_domains = TRUSTED_COURSE_DOMAINS;

  try {
    const upstream = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      signal: AbortSignal.timeout(55000),
      headers: {
        'content-type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: process.env.ANTHROPIC_MODEL || 'claude-sonnet-4-6',
        max_tokens: 2200,
        tools: [searchTool],
        messages: [{ role: 'user', content: prompt }]
      })
    });

    const data = await upstream.json().catch(() => ({}));
    if (!upstream.ok) {
      console.error('Radar provider returned an error:', upstream.status, data?.error?.type || 'unknown');
      return send(res, 502, {
        error: 'radar_provider_error',
        message: 'تعذر على مزود البحث إكمال الطلب. تحقق من مفتاح Anthropic وصلاحية web search والرصيد.'
      });
    }

    const content = Array.isArray(data.content) ? data.content : [];
    const searchedUrls = collectSearchUrls(content);
    const text = content.filter((block) => block.type === 'text').map((block) => block.text).join('\n');
    const items = normalizeResults(parseJsonArray(text), searchedUrls, type);

    // Cache successful results briefly; errors and missing configuration are never cached.
    res.setHeader('Cache-Control', 's-maxage=900, stale-while-revalidate=1800');
    return send(res, 200, { items, fetchedAt: new Date().toISOString() });
  } catch (error) {
    const timedOut = error?.name === 'TimeoutError' || error?.name === 'AbortError';
    console.error('Radar request failed:', timedOut ? 'timeout' : error?.name || 'unknown');
    return send(res, timedOut ? 504 : 502, {
      error: timedOut ? 'radar_timeout' : 'radar_unavailable',
      message: timedOut
        ? 'استغرق البحث وقتاً طويلاً. حاول مرة أخرى بعد قليل.'
        : 'تعذر الاتصال بخدمة البحث حالياً. حاول مرة أخرى لاحقاً.'
    });
  }
}
