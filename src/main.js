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

/* ================= الأدوات ================= */
const esc = (value) => String(value ?? '').replace(/[&<>"']/g, (char) => ({
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;'
}[char]));

const safeUrl = (url) => /^https:\/\//i.test(url) ? esc(url) : '#';
const tags = (items) => `<div class="sk">${items.map((item) => `<span>${esc(item)}</span>`).join('')}</div>`;
const $ = (id) => document.getElementById(id);

async function fetchRadar(type, specialty, level) {
  const params = new URLSearchParams({ type, specialty, level });
  const response = await fetch(`/api/radar?${params}`);

  if (!response.ok) {
    throw new Error(`Radar request failed: ${response.status}`);
  }

  const data = await response.json();
  return Array.isArray(data.items) ? data.items : [];
}

/* ================= الهيكل ================= */
document.querySelector('#app').innerHTML = `
  <header>
    <div class="w">
      <nav>
        <a class="logo" href="#"><i>⌖</i>مسارك للهندسة</a>
        <a class="btn" href="#radar">رادار الذكاء الاصطناعي</a>
      </nav>
    </div>
  </header>

  <div class="hero">
    <div class="w">
      <span class="tag"><i class="dot"></i>وظائف ودورات موثّقة للمهندس السعودي</span>
      <h1>اختر مسارك، <span>ودعنا نرتّب لك الباقي</span></h1>
      <p>حدّد تخصصك ومستواك فتظهر لك الوظائف الأعلى طلباً والدورات المعتمدة المناسبة لك فوراً.</p>

      <div class="panel">
        <div class="row"><label>التخصص</label><span id="sp"></span></div>
        <div class="row"><label>المستوى</label><span id="lv"></span></div>
        <div class="row"><label>الدورات</label><span id="tr"></span></div>
      </div>

      <div class="sum">
        <div><b id="nj">0</b><span>وظيفة مطابقة</span></div>
        <div><b id="nc">0</b><span>دورة</span></div>
        <div><b id="nd">0%</b><span>متوسط الطلب</span></div>
      </div>
    </div>
  </div>

  <div class="w">
    <section>
      <h2>الوظائف حسب المسار</h2>
      <p class="sub" id="lead"></p>
      <div class="grid" id="jobs"></div>
    </section>

    <section>
      <h2>الدورات</h2>
      <p class="sub" id="csub"></p>
      <div class="grid" id="courses"></div>
    </section>

    <section>
      <h2>اتجاهات سوق العمل</h2>
      <p class="sub">الطلب حسب التخصص وأبرز المهارات وجهات العمل</p>
      <div class="grid" id="market"></div>
    </section>

    <section id="radar">
      <div class="radar">
        <h3>رادار الذكاء الاصطناعي</h3>
        <p>يبحث في الويب عن إعلانات وظائف حقيقية وعن دورات من جهات موثوقة فقط.</p>
        <div class="acts">
          <button class="btn" id="rj" type="button">ارصد الوظائف الآن</button>
          <button class="btn o" id="rc" type="button">ابحث عن دورات موثوقة</button>
        </div>
        <div id="rout" class="grid"></div>
      </div>
    </section>
  </div>

  <footer>© 2026 مسارك للهندسة</footer>
`;

/* ================= الحالة والعرض ================= */
let sp = 'all';
let lv = 'all';
let trusted = true;

const chips = (el, arr, cur, key) => {
  $(el).innerHTML = arr.map(([value, label]) => `
    <button
      class="chip${value === cur ? ' on' : ''}"
      type="button"
      data-k="${key}"
      data-v="${esc(value)}"
    >${esc(label)}</button>
  `).join('');
};

function render() {
  chips(
    'sp',
    [['all', 'الكل'], ...Object.keys(tracks).map((item) => [item, item.replace('الهندسة ', '')])],
    sp,
    'sp'
  );

  chips(
    'lv',
    [['all', 'الكل'], ['فني', 'فني'], ['مهندس', 'مهندس']],
    lv,
    'lv'
  );

  chips(
    'tr',
    [['1', 'المعتمدة فقط'], ['0', 'الكل']],
    trusted ? '1' : '0',
    'tr'
  );

  const roles = [];

  for (const specialty of Object.keys(tracks)) {
    for (const level of ['فني', 'مهندس']) {
      if (
        (sp === 'all' || sp === specialty) &&
        (lv === 'all' || lv === level)
      ) {
        roles.push(...tracks[specialty][level].roles.map((role) => ({
          ...role,
          s0: specialty,
          l0: level
        })));
      }
    }
  }

  let lead = 'كل الوظائف المتاحة';

  if (sp !== 'all' && lv !== 'all') {
    lead = tracks[sp][lv].lead;
  }

  $('lead').textContent = lead;

  $('jobs').innerHTML = roles.length
    ? roles.map((role) => `
      <div class="card">
        <div class="top">
          <span class="bd">${esc(role.s0.replace('الهندسة ', ''))} · ${esc(role.l0)}</span>
        </div>
        <h3>${esc(role.t)}</h3>
        <div>
          <div class="dm"><span>مستوى الطلب</span><b>${role.d}%</b></div>
          <div class="bar"><i style="width:${role.d}%"></i></div>
        </div>
        ${tags(role.s)}
        <a class="btn" target="_blank" rel="noopener" href="https://www.jadarat.sa">قدّم الآن عبر جدارات</a>
      </div>
    `).join('')
    : '<div class="empty">لا توجد وظائف مطابقة.</div>';

  const courseList = courses.filter((course) =>
    (sp === 'all' || course.paths.includes(sp)) &&
    (lv === 'all' || course.levels.includes(lv)) &&
    (!trusted || course.accreditor)
  );

  $('csub').textContent = trusted
    ? 'الدورات المعتمدة من جهات موثوقة فقط'
    : 'تشمل دورات غير معتمدة رسمياً؛ تحقق من الجهة قبل التسجيل';

  $('courses').innerHTML = courseList.length
    ? courseList.map((course) => `
      <div class="card">
        <div class="top">
          <span class="bd">${esc(course.cat)}</span>
          ${course.accreditor
            ? `<span class="vf">✓ معتمدة: ${esc(course.accreditor)}</span>`
            : '<span class="vf">غير موثّقة بعد</span>'}
        </div>
        <h3>${esc(course.title)}</h3>
        <p>${esc(course.provider)}</p>
        ${tags(course.skills)}
        <div class="pr">${esc(course.price)}</div>
        <a class="btn o" target="_blank" rel="noopener" href="${safeUrl(course.url)}">
          التفاصيل والتسجيل
        </a>
      </div>
    `).join('')
    : '<div class="empty">لا توجد دورات معتمدة مطابقة. جرّب الرادار أدناه للبحث عن المزيد.</div>';

  $('market').innerHTML = market
    .filter((item) => sp === 'all' || item.c === sp)
    .map((item) => `
      <div class="card">
        <div class="top">
          <span class="bd">${esc(item.c)}</span>
          <b style="color:var(--ac)">${item.d}%</b>
        </div>
        <h3>${esc(item.t)}</h3>
        <div class="bar"><i style="width:${item.d}%"></i></div>
        ${tags(item.s)}
        <p>${esc(item.w)}</p>
      </div>
    `).join('') || '<div class="empty">لا توجد بيانات سوق لهذا التخصص بعد.</div>';

  $('nj').textContent = roles.length;
  $('nc').textContent = courseList.length;
  $('nd').textContent = roles.length
    ? `${Math.round(roles.reduce((sum, role) => sum + role.d, 0) / roles.length)}%`
    : '0%';
}

document.addEventListener('click', (event) => {
  const button = event.target.closest('.chip');

  if (!button) return;

  const { k, v } = button.dataset;

  if (k === 'sp') sp = v;
  else if (k === 'lv') lv = v;
  else if (k === 'tr') trusted = v === '1';

  render();
});

/* ================= الرادار ================= */
async function runRadar(type, button) {
  const out = $('rout');
  const label = button.textContent;

  button.disabled = true;
  out.style.display = 'block';
  out.innerHTML = '<div class="msg"><span class="spin"></span>جاري البحث...</div>';

  try {
    const items = await fetchRadar(type, sp, lv);

    out.style.display = '';

    out.innerHTML = items.length
      ? items.map((item) => `
        <div class="card">
          <div class="top">
            <span class="bd">
              ${type === 'jobs'
                ? esc(item.source || 'إعلان')
                : `✓ ${esc(item.accreditor || item.provider || 'جهة موثوقة')}`}
            </span>
          </div>
          <h3>${esc(item.title)}</h3>
          <p>
            ${type === 'jobs'
              ? esc([item.company, item.city].filter(Boolean).join(' · '))
              : esc(item.provider || '')}
          </p>
          ${item.posted ? `<p>تاريخ الإعلان: ${esc(item.posted)}</p>` : ''}
          ${item.price ? `<div class="pr">${esc(item.price)}</div>` : ''}
          <a class="btn" target="_blank" rel="noopener" href="${safeUrl(item.link)}">
            فتح المصدر الأصلي
          </a>
        </div>
      `).join('')
      : '<div class="msg">لم نجد نتائج حالياً. جرّب تخصصاً أو مستوى آخر.</div>';
  } catch {
    out.style.display = 'block';
    out.innerHTML = `
      <div class="msg">
        تعذّر الاتصال بالرادار. تأكد من وجود مسار <code>/api/radar</code>
        وإضافة مفتاح Anthropic كمتغير بيئة من جهة الخادم.
      </div>
    `;
  } finally {
    button.disabled = false;
    button.textContent = label;
  }
}

const radarJobsButton = $('rj');
const radarCoursesButton = $('rc');

radarJobsButton?.addEventListener('click', (event) => {
  runRadar('jobs', event.currentTarget);
});

radarCoursesButton?.addEventListener('click', (event) => {
  runRadar('courses', event.currentTarget);
});

render();