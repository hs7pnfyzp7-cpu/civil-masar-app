import './styles.css'

const opportunities = [
  { type: 'وظيفة', title: 'مهندس موقع مدني', company: 'شركة إنجاز العمران', location: 'الرياض', meta: 'خبرة 3–5 سنوات' },
  { type: 'دورة معتمدة', title: 'إدارة المشاريع الإنشائية', company: 'أكاديمية مسار الهندسة', location: 'عن بُعد', meta: '30 ساعة تدريبية' },
  { type: 'فرصة تدريب', title: 'فني مساحة وجيوديسيا', company: 'مؤسسة خبرات الإنشاء', location: 'جدة', meta: 'مدة 12 أسبوعًا' },
]

const app = document.querySelector('#app')

app.innerHTML = `
  <header class="header">
    <nav class="nav container" aria-label="التنقل الرئيسي">
      <a class="brand" href="#home" aria-label="مسار الهندسة">
        <span class="brand-mark" aria-hidden="true"><svg viewBox="0 0 48 48"><path d="M8 39V21L24 12l16 9v18H29V28H19v11H8Z"/><path d="M5 42h38"/></svg></span>
        <span><strong>مسار الهندسة</strong><small>Civil-Masar</small></span>
      </a>
      <button class="menu-button" type="button" aria-label="فتح القائمة" aria-expanded="false"><span></span><span></span><span></span></button>
      <div class="nav-links">
        <a class="active" href="#jobs">الفرص</a><a href="#courses">الدورات</a><a href="#resume">السيرة الذاتية</a>
      </div>
      <a class="nav-action" href="#resume">جهّز سيرتك</a>
    </nav>
  </header>
  <main id="home">
    <section class="hero">
      <div class="hero-pattern" aria-hidden="true"></div>
      <div class="container hero-grid">
        <div class="hero-copy">
          <span class="eyebrow">دليل مهني متخصص</span>
          <h1>ابنِ مسارك في <span>الهندسة المدنية</span></h1>
          <p>وظائف وفرص تدريب ودورات معتمدة، وأدوات تساعدك على تجهيز ملفك المهني بثقة والانطلاق نحو الفرصة المناسبة.</p>
          <div class="hero-actions"><a class="primary-button" href="#jobs">استكشف الفرص</a><a class="secondary-button" href="#resume">أنشئ سيرتك الذاتية</a></div>
          <div class="stats" aria-label="إحصائيات المنصة"><div><strong>+120</strong><span>فرصة مهنية</span></div><div><strong>+35</strong><span>دورة معتمدة</span></div><div><strong>+1,500</strong><span>مهني مسجل</span></div></div>
        </div>
        <aside class="hero-card" aria-label="فرصة مميزة"><div class="card-top"><span>فرصة مميزة</span><span class="match">مطابقة 94%</span></div>
          <div class="role-icon" aria-hidden="true"><svg viewBox="0 0 48 48"><path d="M8 40V22l16-10 16 10v18H8Z"/><path d="M18 40V28h12v12M5 43h38"/></svg></div>
          <h2>مهندس سلامة إنشائية</h2><p>الرياض • خبرة مناسبة لمستوى مهندس موقع</p>
          <div class="skill-list"><span>HSE</span><span>تخطيط مشاريع</span><span>الموقع</span></div><a class="card-button" href="#jobs">عرض الفرص</a>
        </aside>
      </div>
    </section>
    <section class="section" id="jobs"><div class="container">
      <div class="section-heading"><div><span class="section-kicker">اكتشف فرصك</span><h2>مسارك المهني يبدأ من هنا</h2></div><a href="#jobs">استكشف الأقسام ←</a></div>
      <div class="filter-row" role="group" aria-label="تصفية الفرص"><button class="filter active" data-filter="all">الكل</button><button class="filter" data-filter="وظيفة">وظائف</button><button class="filter" data-filter="دورة معتمدة">دورات</button><button class="filter" data-filter="فرصة تدريب">تدريب</button></div>
      <div class="cards">${opportunities.map((item, index) => `<article class="opportunity-card" data-type="${item.type}" id="${index === 1 ? 'courses' : ''}"><div class="card-meta"><span>${item.type}</span><button class="bookmark" type="button" aria-label="حفظ ${item.title}">♡</button></div><h3>${item.title}</h3><p class="company">${item.company}</p><p class="location">⌖ ${item.location}</p><div class="card-footer"><span>${item.meta}</span><button type="button" class="details-button" data-title="${item.title}">التفاصيل</button></div></article>`).join('')}</div>
    </div></section>
    <section class="resume-section" id="resume"><div class="container resume-grid">
      <div class="resume-copy"><span class="section-kicker">سيرة جاهزة للعمل</span><h2>قدّم ملفاتك المهنية بصورة احترافية</h2><p>جهّز سيرة ذاتية منظمة، أضف المهارات والخبرات، وحوّل خبراتك الهندسية إلى نقاط واضحة وقوية أمام جهات التوظيف.</p><ul class="resume-list"><li>نماذج سيرة ذاتية هندسية متخصصة</li><li>تنظيم الخبرات والمهارات والشهادات</li><li>معاينة وتحميل سيرة مهيأة للطباعة</li></ul><button class="primary-button" type="button" id="startResume">ابدأ بناء سيرتي</button></div>
      <div class="resume-preview" aria-label="معاينة سيرة ذاتية"><div class="resume-profile"><div class="avatar">م ع</div><div><strong>مهندس مدني</strong><span>خبرة في التنفيذ وإدارة المواقع</span></div></div><div class="resume-lines"><div class="line wide"></div><div class="line"></div><div class="line medium"></div></div><div class="resume-columns"><div><strong>الخبرات</strong><span></span><span></span><span></span></div><div><strong>المهارات</strong><b>Revit</b><b>AutoCAD</b><b>Primavera</b></div></div></div>
    </div></section>
  </main>
  <footer><div class="container footer-inner"><div class="brand footer-brand"><span class="brand-mark" aria-hidden="true"><svg viewBox="0 0 48 48"><path d="M8 39V21L24 12l16 9v18H29V28H19v11H8Z"/><path d="M5 42h38"/></svg></span><span><strong>مسار الهندسة</strong><small>Civil-Masar</small></span></div><p>بوابتك نحو مسار مهني أقوى في الهندسة المدنية.</p><span>© ${new Date().getFullYear()} جميع الحقوق محفوظة</span></div></footer>
`

const menuButton = document.querySelector('.menu-button')
const navLinks = document.querySelector('.nav-links')
menuButton.addEventListener('click', () => {
  const open = menuButton.getAttribute('aria-expanded') === 'true'
  menuButton.setAttribute('aria-expanded', String(!open))
  navLinks.classList.toggle('open', !open)
})
navLinks.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
  navLinks.classList.remove('open')
  menuButton.setAttribute('aria-expanded', 'false')
}))

document.querySelectorAll('.bookmark').forEach((button) => button.addEventListener('click', () => {
  const saved = button.classList.toggle('saved')
  button.textContent = saved ? '♥' : '♡'
  button.setAttribute('aria-pressed', String(saved))
}))

document.querySelectorAll('.filter').forEach((button) => button.addEventListener('click', () => {
  document.querySelector('.filter.active')?.classList.remove('active')
  button.classList.add('active')
  document.querySelectorAll('.opportunity-card').forEach((card) => {
    card.hidden = button.dataset.filter !== 'all' && card.dataset.type !== button.dataset.filter
  })
}))

document.querySelectorAll('.details-button').forEach((button) => button.addEventListener('click', () => {
  alert(`تفاصيل الفرصة: ${button.dataset.title}`)
}))
document.querySelector('#startResume').addEventListener('click', () => {
  document.querySelector('.resume-preview').classList.toggle('highlight')
})
