import './styles.css';

/* ================= البيانات ================= */
// accreditor: الجهة المعتمدة. null = غير معتمدة رسمياً (تُخفى عند تفعيل "المعتمدة فقط")
const courses = [
  { id: 'esi-sbc201', title: 'كود البناء السعودي العام SBC201', cat: 'كود وجودة', provider: 'معهد علوم الهندسة العالي', accreditor: null, price: 'بطلب عرض سعر', url: 'https://esi.edu.sa/courses/code-sbc201/', skills: ['كود البناء السعودي', 'الجودة'], paths: ['الهندسة المدنية', 'الهندسة المعمارية'], levels: ['فني', 'مهندس'] },
  { id: 'esi-concrete', title: 'مراقبة جودة الخرسانة', cat: 'كود وجودة', provider: 'معهد علوم الهندسة العالي', accreditor: null, price: 'بطلب عرض سعر', url: 'https://esi.edu.sa/courses/', skills: ['ضبط الجودة', 'فحص الخرسانة'], paths: ['الهندسة المدنية'], levels: ['فني'] },
  { id: 'esi-supervision', title: 'طرق الإشراف على المشاريع الهندسية', cat: 'موقع وتنفيذ', provider: 'معهد علوم الهندسة العالي', accreditor: null, price: 'أونلاين 1400 ريال · حضوري 2800 ريال', url: 'https://esi.edu.sa/courses/supervising-construction-sites/', skills: ['الإشراف على الموقع', 'التنفيذ'], paths: ['الهندسة المدنية', 'الهندسة المعمارية'], levels: ['فني', 'مهندس'] },
  { id: 'esi-civil3d', title: 'أوتوكاد Civil 3D', cat: 'موقع وتنفيذ', provider: 'معهد علوم الهندسة العالي', accreditor: null, price: 'أونلاين 1096 ريال · حضوري 2296 ريال', url: 'https://esi.edu.sa/courses/civil/', skills: ['المساحة والرفع', 'الطرق'], paths: ['الهندسة المدنية'], levels: ['فني', 'مهندس'] },
  { id: 'esi-p6', title: 'إدارة المشاريع باستخدام بريمافيرا P6', cat: 'تخطيط وعقود', provider: 'معهد علوم الهندسة العالي', accreditor: null, price: 'أونلاين 1500 ريال', url: 'https://esi.edu.sa/courses/advanced-primavera/', skills: ['التخطيط', 'الجدولة', 'Primavera'], paths: ['الهندسة المدنية', 'الهندسة المعمارية', 'الهندسة الصناعية'], levels: ['مهندس'] },
  { id: 'sbc', title: 'Saudi Building Code 201 – Essentials', cat: 'موقع وتنفيذ', provider: 'ICC Learning Center', accreditor: 'ICC', price: '350 دولار', url: 'https://learn.iccsafe.org/ui/catalog/394', skills: ['SBC 201', 'تطبيق الكود'], paths: ['الهندسة المدنية'], levels: ['فني', 'مهندس'] },
  { id: 'sce-cpd', title: 'دورات الهيئة السعودية للمهندسين', cat: 'موقع وتنفيذ', provider: 'الهيئة السعودية للمهندسين', accreditor: 'الهيئة السعودية للمهندسين', price: 'يختلف حسب الدورة', url: 'https://training.saudieng.sa/', skills: ['التطوير المهني'], paths: ['الهندسة المدنية', 'الهندسة المعمارية', 'الهندسة الكهربائية', 'الهندسة الميكانيكية'], levels: ['فني', 'مهندس'] }
];

const tracks = {
  'الهندسة المدنية': {
    'فني': { lead: 'مسار التنفيذ والضبط الميداني والأعمال المساحية', roles: [{ t: 'فني هندسة مدنية', d: 86, s: ['قراءة المخططات', 'متابعة التنفيذ', 'تقارير الموقع'] }, { t: 'مراقب موقع', d: 82, s: ['مطابقة الأعمال', 'توجيه العمالة', 'السلامة'] }] },
    'مهندس': { lead: 'مسار التنفيذ والبنية التحتية وإدارة المشاريع', roles: [{ t: 'مهندس موقع', d: 89, s: ['الإشراف على التنفيذ', 'تنسيق المقاولين'] }, { t: 'مهندس مدني', d: 87, s: ['التصميم والمواصفات', 'كود البناء', 'AutoCAD'] }] }
  },
  'الهندسة المعمارية': {
    'فني': { lead: 'مسار الرسم المعماري والتوثيق الرقمي', roles: [{ t: 'رسام معماري', d: 80, s: ['AutoCAD', 'المخططات التنفيذية'] }] },
    'مهندس': { lead: 'مسار التصميم المعماري والتنسيق الرقمي', roles: [{ t: 'مهندس معماري', d: 85, s: ['التصميم المعماري', 'Revit'] }] }
  },
  'الهندسة الكهربائية': {
    'فني': { lead: 'مسار التركيبات والاختبارات', roles: [{ t: 'فني كهربائي', d: 86, s: ['التركيبات', 'قراءة المخططات'] }] },
    'مهندس': { lead: 'مسار الأنظمة الكهربائية', roles: [{ t: 'مهندس كهرباء', d: 87, s: ['توزيع القدرة', 'مراجعة المواصفات'] }] }
  }
};

const market = [
  { t: 'مهندس مدني وإدارة مشاريع', c: 'الهندسة المدنية', d: 88, s: ['إدارة العقود', 'الموقع', 'الكميات', 'إدارة المخاطر'], w: 'شركات المقاولات والمشاريع الكبرى' },
  { t: 'مهندس معماري وBIM', c: 'الهندسة المعمارية', d: 84, s: ['BIM', 'Revit', 'التنسيق الرقمي'], w: 'المكاتب الاستشارية والمطورون' },
  { t: 'مهندس كهرباء وتحكم صناعي', c: 'الهندسة الكهربائية', d: 86, s: ['التحكم الصناعي', 'الأتمتة', 'جودة القدرة'], w: 'المصانع والطاقة والمياه' },
  { t: 'مهندس صناعي وجودة ومخاطر', c: 'الهندسة الصناعية', d: 91, s: ['تحسين العمليات', 'تقييم المخاطر', 'التدقيق'], w: 'المصانع والمرافق التشغيلية' },
  { t: 'مهندس بيئي واستدامة', c: 'الهندسة البيئية', d: 79, s: ['الاستدامة', 'الامتثال البيئي'], w: 'الطاقة والاستشارات' },
  { t: 'مهندس تعدين', c: 'هندسة التعدين', d: 77, s: ['التعدين', 'السلامة', 'إدارة العمليات'], w: 'شركات التعدين والطاقة' }
];

/* ================= أدوات ================= */
const esc = (v) => String(v ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const safeUrl = (u) => (/^https:\/\//i.test(u) ? esc(u) : '#');
const tags = (a) => `<div class="sk">${a.map((x) => `<span>${esc(x)}</span>`).join('')}</div>`;
const $ = (id) => document.getElementById(id);

async function fetchRadar(type, specialty, level) {
  const q = new URLSearchParams({ type, specialty, level });
  const res = await fetch('/api/radar?' + q);
  if (!res.ok) throw new Error('radar');
  return (await res.json()).items || [];
}

/* ================= الهيكل ================= */
document.querySelector('#app').innerHTML = `
<header><div class="w"><nav><a class="logo" href="#"><i>⌖</i>مسارك للهندسة</a><a class="btn" href="#radar">الرادار الذكي</a></nav></div></header>
<div class="hero"><div class="w">
  <span class="tag"><i class="dot"></i>منصة المهندس السعودي 2026 · توظيف وتأهيل</span>
  <h1>مسارك للهندسة: <span>فرصك ودوراتك في مكان واحد</span></h1>
  <p>بوابتك للوظائف الهندسية من مختلف المصادر، والبرامج التدريبية المعتمدة من الجهات الموثوقة فقط. حدّد تخصصك ومستواك لتتغير الصفحة وفق مسارك.</p>
  <div class="panel" id="pick">
    <div class="row"><label>01 · التخصص</label><span id="sp"></span></div>
    <div class="row"><label>01 · المستوى</label><span id="lv"></span></div>
    <div class="row"><label>الاعتماد</label><span id="tr"></span></div>
  </div>
  <div class="sum"><div><b id="nj">0</b><span>وظيفة مطابقة</span></div><div><b id="nc">0</b><span>دورة معتمدة</span></div><div><b id="nd">0%</b><span>متوسط الطلب</span></div></div>
</div></div>
<div class="w">
  <section><h2>02 · الوظائف الأعلى طلباً</h2><p class="sub" id="lead"></p><div class="grid" id="jobs"></div></section>
  <section><h2>03 · التأهيل ودورات موثوقة</h2><p class="sub" id="csub"></p><div class="grid" id="courses"></div></section>
  <section><h2>04 · نبض سوق العمل</h2><p class="sub">مستوى الطلب حسب التخصص وأبرز المهارات وجهات العمل</p><div class="grid" id="market"></div></section>
  <section id="radar"><div class="radar">
    <h3>📡 الرادار الذكي (يرصد · يتحقق · يصفّي · يعرض)</h3>
    <p>يرصد الإعلانات من جدارات ولينكدإن ومواقع الشركات، يتحقق من صحة الروابط، يصفّي الدورات لحصر الجهات الموثوقة فقط، ويعرض النتائج حسب تخصصك ومستواك.</p>
    <div class="acts"><button class="btn" id="rj">🔎 ارصد الوظائف الآن</button><button class="btn o" id="rc">🎓 ابحث عن دورات موثوقة</button></div>
    <div id="rout" class="grid"></div>
  </div></section>
</div>
<footer>© 2026 مسارك للهندسة — وظائف · دورات · تأهيل</footer>`;

/* ================= الحالة والعرض ================= */
let sp = 'all', lv = 'all', trusted = true;

const chips = (el, arr, cur, key) => {
  $(el).innerHTML = arr.map(([v, l]) => `<button class="chip${v === cur ? ' on' : ''}" data-k="${key}" data-v="${esc(v)}">${esc(l)}</button>`).join('');
};

function render() {
  chips('sp', [['all', 'الكل'], ...Object.keys(tracks).map((k) => [k, k.replace('الهندسة ', '')])], sp, 'sp');
  chips('lv', [['all', 'الكل'], ['فني', 'فني'], ['مهندس', 'مهندس']], lv, 'lv');
  chips('tr', [['1', 'المعتمدة فقط'], ['0', 'الكل']], trusted ? '1' : '0', 'tr');

  let roles = [], lead = 'كل الوظائف المتاحة';
  for (const s of Object.keys(tracks)) for (const l of ['فني', 'مهندس']) {
    if ((sp === 'all' || sp === s) && (lv === 'all' || lv === l)) {
      roles.push(...tracks[s][l].roles.map((r) => ({ ...r, s0: s, l0: l })));
      if (sp !== 'all' && lv !== 'all') lead = tracks[s][l].lead;
    }
  }
  $('lead').textContent = lead;
  $('jobs').innerHTML = roles.length ? roles.map((r) => `
    <div class="card"><div class="top"><span class="bd">${esc(r.s0.replace('الهندسة ', ''))} · ${esc(r.l0)}</span></div>
    <h3>${esc(r.t)}</h3>
    <div><div class="dm"><span>مستوى الطلب</span><b>${r.d}%</b></div><div class="bar"><i style="width:${r.d}%"></i></div></div>
    ${tags(r.s)}<a class="btn" target="_blank" rel="noopener" href="https://www.jadarat.sa">قدّم الآن عبر جدارات</a></div>`).join('') : '<div class="empty">لا توجد وظائف مطابقة.</div>';

  const list = courses.filter((c) => (sp === 'all' || c.paths.includes(sp)) && (lv === 'all' || c.levels.includes(lv)) && (!trusted || c.accreditor));
  $('csub').textContent = trusted ? 'الدورات المعتمدة من جهات موثوقة فقط' : 'تشمل دورات غير معتمدة رسمياً، تحقق من الجهة قبل التسجيل';
  $('courses').innerHTML = list.length ? list.map((c) => `
    <div class="card"><div class="top"><span class="bd">${esc(c.cat)}</span>${c.accreditor ? `<span class="vf">✓ معتمدة: ${esc(c.accreditor)}</span>` : '<span class="vf" style="color:var(--mt)">غير موثّقة بعد</span>'}</div>
    <h3>${esc(c.title)}</h3><p>${esc(c.provider)}</p>${tags(c.skills)}<div class="pr">${esc(c.price)}</div>
    <a class="btn o" target="_blank" rel="noopener" href="${safeUrl(c.url)}">التفاصيل والتسجيل</a></div>`).join('') : '<div class="empty">لا توجد دورات معتمدة مطابقة. جرّب الرادار أدناه للبحث عن المزيد.</div>';

  $('market').innerHTML = market.filter((m) => sp === 'all' || m.c === sp).map((m) => `
    <div class="card"><div class="top"><span class="bd">${esc(m.c)}</span><b style="color:var(--ac)">${m.d}%</b></div>
    <h3>${esc(m.t)}</h3><div class="bar"><i style="width:${m.d}%"></i></div>${tags(m.s)}<p>${esc(m.w)}</p></div>`).join('') || '<div class="empty">لا توجد بيانات سوق لهذا التخصص بعد.</div>';

  $('nj').textContent = roles.length;
  $('nc').textContent = list.length;
  $('nd').textContent = (roles.length ? Math.round(roles.reduce((a, r) => a + r.d, 0) / roles.length) : 0) + '%';
}

document.addEventListener('click', (e) => {
  const b = e.target.closest('.chip');
  if (!b) return;
  const { k, v } = b.dataset;
  if (k === 'sp') sp = v; else if (k === 'lv') lv = v; else trusted = v === '1';
  render();
});

/* ================= الرادار ================= */
async function runRadar(type, btn) {
  const out = $('rout');
  const label = btn.textContent;
  btn.disabled = true;
  out.style.display = 'block';
  out.innerHTML = '<div class="msg"><span class="spin"></span>جاري البحث في الويب، قد يستغرق ذلك نصف دقيقة...</div>';
  try {
    const items = await fetchRadar(type, sp, lv);
    out.style.display = '';
    out.innerHTML = items.length ? items.map((i) => `
      <div class="card"><div class="top"><span class="bd">${type === 'jobs' ? esc(i.source || 'إعلان') : '✓ ' + esc(i.accreditor || i.provider)}</span></div>
      <h3>${esc(i.title)}</h3>
      <p>${type === 'jobs' ? esc([i.company, i.city].filter(Boolean).join(' · ')) : esc(i.provider)}</p>
      ${i.posted ? `<p>تاريخ الإعلان: ${esc(i.posted)}</p>` : ''}${i.price ? `<div class="pr">${esc(i.price)}</div>` : ''}
      <a class="btn" target="_blank" rel="noopener" href="${safeUrl(i.link)}">فتح المصدر الأصلي</a></div>`).join('')
      : '<div class="msg">لم نجد نتائج موثّقة حالياً. جرّب تخصصاً أو مستوى آخر.</div>';
  } catch {
    out.style.display = 'block';
    out.innerHTML = '<div class="msg">تعذّر الاتصال بالرادار. تأكد من نشر المشروع على Vercel وضبط ANTHROPIC_API_KEY (محلياً استخدم vercel dev).</div>';
  } finally {
    btn.disabled = false;
    btn.textContent = label;
  }
}
$('rj').addEventListener('click', (e) => runRadar('jobs', e.currentTarget));
$('rc').addEventListener('click', (e) => runRadar('courses', e.currentTarget));

render();
