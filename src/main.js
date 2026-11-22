import './styles.css'
import {
  SPECIALTIES,
  LEVELS,
  MODES,
  JOB_TYPES,
  EXPERIENCE,
  COURSE_STATUS,
  REQUIREMENT_DIMENSIONS,
  MARKET,
  COURSES,
  JOBS,
} from './radar/catalog.js'

const getRiyadhToday = () => {
  const parts = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Asia/Riyadh',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).formatToParts(new Date())
  const map = Object.fromEntries(parts.map((p) => [p.type, p.value]))
  return `${map.year}-${map.month}-${map.day}`
}

const getCourseStatusKey = (course, todayStr) => {
  const remainingSeats = Math.max(0, (course.seats || 0) - (course.seatsTaken || 0))
  if (todayStr < course.opensAt) return 'upcoming'
  if (todayStr > course.closesAt || remainingSeats === 0) return 'closed'
  const diffDays = Math.round((new Date(course.closesAt) - new Date(todayStr)) / 86400000)
  if (diffDays <= 7 || remainingSeats <= 3) return 'closing'
  return 'open'
}

const specialtyLabelMap = Object.fromEntries(SPECIALTIES.map((s) => [s.id, s.label]))
const specialtyShortMap = Object.fromEntries(SPECIALTIES.map((s) => [s.id, s.short]))

const todayRiyadh = getRiyadhToday()

const unifiedItems = [
  ...JOBS.map((job) => ({
    kind: 'job',
    filterType: job.type === 'coop' ? 'تدريب' : 'وظيفة',
    badge: job.type === 'coop' ? 'فرصة تدريب' : 'وظيفة',
    specialty: job.specialty,
    specialtyLabel: specialtyLabelMap[job.specialty] || job.specialty,
    title: job.title,
    company: job.company,
    location: job.city,
    meta: `${JOB_TYPES[job.type] || job.type} • ${EXPERIENCE[job.expMin >= 6 ? 'senior' : job.expMin >= 3 ? 'mid' : 'entry']} • ${job.salaryMin.toLocaleString('en-US')}–${job.salaryMax.toLocaleString('en-US')} ر.س`,
    details: `${job.title} — ${job.company} (${job.city})\nالتخصص: ${specialtyLabelMap[job.specialty] || job.specialty}\nالخبرة: ${job.expMin}–${job.expMax} سنوات\nالمهارات: ${job.skills.join('، ')}\n\n${job.summary}`,
  })),
  ...COURSES.map((course) => {
    const statusKey = getCourseStatusKey(course, todayRiyadh)
    const remainingSeats = Math.max(0, course.seats - course.seatsTaken)
    return {
      kind: 'course',
      filterType: 'دورة',
      badge: 'دورة معتمدة',
      specialty: course.specialty,
      specialtyLabel: specialtyLabelMap[course.specialty] || course.specialty,
      title: course.title,
      company: `${course.provider} (${course.accreditation})`,
      location: `${course.city} • ${MODES[course.mode] || course.mode}`,
      meta: `${course.hours} ساعة • ${COURSE_STATUS[statusKey]} • ${remainingSeats} مقعد متاح • ${course.price === 0 ? 'مجاني' : `${course.price.toLocaleString('en-US')} ر.س`}`,
      details: `${course.title}\nالجهة: ${course.provider}\nالاعتماد: ${course.accreditation}\nالمستوى: ${LEVELS[course.level] || course.level}\nالنمط والموقع: ${MODES[course.mode] || course.mode} — ${course.city}\nحالة التسجيل: ${COURSE_STATUS[statusKey]} (${course.opensAt} إلى ${course.closesAt})\nالمقاعد المتبقية: ${remainingSeats} من ${course.seats}`,
    }
  }),
]

const openCoursesCount = COURSES.filter((c) => {
  const st = getCourseStatusKey(c, todayRiyadh)
  return st === 'open' || st === 'closing'
}).length

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
        <a class="active" href="#jobs">الفرص</a><a href="#courses">الدورات</a><a href="#market">سوق العمل</a><a href="#resume">السيرة الذاتية</a>
      </div>
      <a class="nav-action" href="#resume">جهّز سيرتك</a>
    </nav>
  </header>
  <main id="home">
    <section class="hero">
      <div class="hero-pattern" aria-hidden="true"></div>
      <div class="container hero-grid">
        <div class="hero-copy">
          <span class="eyebrow">دليل مهني شامل لجميع التخصصات الهندسية</span>
          <h1>ابنِ مسارك في <span>جميع التخصصات الهندسية</span></h1>
          <p>وظائف وفرص تدريب ودورات معتمدة ومؤشرات سوق العمل في السعودية للمدني والميكانيكي والكهربائي والمعماري والصناعي والسلامة والجودة.</p>
          <div class="hero-actions"><a class="primary-button" href="#jobs">استكشف الفرص</a><a class="secondary-button" href="#resume">أنشئ سيرتك الذاتية</a></div>
          <div class="stats" aria-label="إحصائيات الكتالوج">
            <div><strong>${JOBS.length}</strong><span>فرصة وظيفية وتدريب</span></div>
            <div><strong>${COURSES.length}</strong><span>دورة معتمدة (${openCoursesCount} متاحة)</span></div>
            <div><strong>${SPECIALTIES.length}</strong><span>تخصصات ومسارات</span></div>
          </div>
        </div>
        <aside class="hero-card" aria-label="رادار الفرص والدورات">
          <div class="card-top"><span>رادار الكتالوج المباشر</span><span class="match">${todayRiyadh}</span></div>
          <div class="role-icon" aria-hidden="true"><svg viewBox="0 0 48 48"><path d="M8 40V22l16-10 16 10v18H8Z"/><path d="M18 40V28h12v12M5 43h38"/></svg></div>
          <h2>رصد شامل لكل التخصصات</h2>
          <p>تحديث فوري لحالة الدورات والوظائف والمهارات المطلوبة حسب تقويم الرياض</p>
          <div class="skill-list"><span>${JOBS.length} فرصة</span><span>${COURSES.length} دورة</span><span>${MARKET.length} قطاعات</span></div>
          <a class="card-button" href="#jobs">عرض الفرص والدورات</a>
        </aside>
      </div>
    </section>

    <section class="section" id="jobs">
      <div class="container">
        <div class="section-heading">
          <div><span class="section-kicker">اكتشف فرصك ودوراتك</span><h2>الفرص والدورات الهندسية في السعودية</h2></div>
          <a href="#market">مؤشرات سوق العمل ←</a>
        </div>

        <div class="filter-row" role="group" aria-label="تصفية حسب التخصص" id="specialtyFilters">
          <button class="filter active" data-specialty="all" type="button">كل التخصصات</button>
          ${SPECIALTIES.map((sp) => `<button class="filter" data-specialty="${sp.id}" type="button">${sp.label}</button>`).join('')}
        </div>

        <div class="filter-row" role="group" aria-label="تصفية حسب النوع" id="typeFilters">
          <button class="filter active" data-type="all" type="button">الكل (${unifiedItems.length})</button>
          <button class="filter" data-type="وظيفة" type="button">وظائف (${JOBS.filter((j) => j.type !== 'coop').length})</button>
          <button class="filter" data-type="دورة" type="button">دورات (${COURSES.length})</button>
          <button class="filter" data-type="تدريب" type="button">تدريب (${JOBS.filter((j) => j.type === 'coop').length})</button>
        </div>

        <div class="cards" id="catalogCards">
          ${unifiedItems.map((item, idx) => `
            <article class="opportunity-card" data-type="${item.filterType}" data-specialty="${item.specialty}" id="${idx === JOBS.length ? 'courses' : ''}">
              <div class="card-meta"><span>${item.badge} • ${specialtyShortMap[item.specialty] || item.specialtyLabel}</span><button class="bookmark" type="button" aria-label="حفظ ${item.title}">♡</button></div>
              <h3>${item.title}</h3>
              <p class="company">${item.company}</p>
              <p class="location">⌖ ${item.location}</p>
              <div class="card-footer"><span>${item.meta}</span><button type="button" class="details-button" data-index="${idx}">التفاصيل</button></div>
            </article>
          `).join('')}
        </div>
      </div>
    </section>

    <section class="section" id="market">
      <div class="container">
        <div class="section-heading">
          <div><span class="section-kicker">مؤشرات سوق العمل</span><h2>الطلب والمهارات حسب التخصص الهندسي</h2></div>
        </div>
        <div class="cards" id="marketCards">
          ${MARKET.map((m) => {
            const topSkills = [...m.skills].sort((a, b) => b.pct - a.pct).slice(0, 3)
            const topDims = REQUIREMENT_DIMENSIONS
              .map((d) => ({ label: d.label, score: m.requirements?.[d.id] ?? 0 }))
              .sort((a, b) => b.score - a.score)
              .slice(0, 3)
            return `
              <article class="opportunity-card" data-market-id="${m.id}">
                <div class="card-meta"><span>مؤشر الطلب ${m.demandIndex}/100</span><span>نمو +${m.growth}%</span></div>
                <h3>${m.fullLabel}</h3>
                <p class="company">أبرز المهارات: ${topSkills.map((s) => `${s.name} (${s.pct}%)`).join(' • ')}</p>
                <p class="location">أهم المتطلبات: ${topDims.map((d) => `${d.label} (${d.score}%)`).join(' • ')}</p>
                <div class="card-footer"><span>${m.skills.length} مهارات مرصودة</span><button type="button" class="details-button" data-market="${m.id}">عرض المهارات</button></div>
              </article>
            `
          }).join('')}
        </div>
      </div>
    </section>

    <section class="resume-section" id="resume">
      <div class="container resume-grid">
        <div class="resume-copy">
          <span class="section-kicker">سيرة جاهزة للعمل</span>
          <h2>قدّم ملفاتك المهنية بصورة احترافية</h2>
          <p>جهّز سيرة ذاتية منظمة، أضف المهارات والخبرات، وحوّل خبراتك الهندسية إلى نقاط واضحة وقوية أمام جهات التوظيف.</p>
          <ul class="resume-list">
            <li>نماذج سيرة ذاتية شاملة للتخصصات الهندسية</li>
            <li>تنظيم الخبرات والمهارات والشهادات المعتمدة</li>
            <li>معاينة وتحميل سيرة مهيأة للطباعة</li>
          </ul>
          <button class="primary-button" type="button" id="startResume">ابدأ بناء سيرتي</button>
        </div>
        <div class="resume-preview" aria-label="معاينة سيرة ذاتية">
          <div class="resume-profile">
            <div class="avatar">ف هـ</div>
            <div><strong>فني هندسة مدنية</strong><span>إشراف ميداني، حصر كميات، جودة وسلامة مشاريع</span></div>
          </div>
          <div class="resume-lines"><div class="line wide"></div><div class="line"></div><div class="line medium"></div></div>
          <div class="resume-columns">
            <div><strong>الخبرات</strong><span></span><span></span><span></span></div>
            <div><strong>المهارات</strong><b>PlanSwift</b><b>Excel</b><b>QA/QC</b></div>
          </div>
        </div>
      </div>
    </section>
  </main>
  <footer>
    <div class="container footer-inner">
      <div class="brand footer-brand">
        <span class="brand-mark" aria-hidden="true"><svg viewBox="0 0 48 48"><path d="M8 39V21L24 12l16 9v18H29V28H19v11H8Z"/><path d="M5 42h38"/></svg></span>
        <span><strong>مسار الهندسة</strong><small>Civil-Masar</small></span>
      </div>
      <p>بوابتك الشاملة نحو مسار مهني أقوى في جميع التخصصات الهندسية.</p>
      <span>© ${new Date().getFullYear()} جميع الحقوق محفوظة</span>
    </div>
  </footer>
`

const menuButton = document.querySelector('.menu-button')
const navLinks = document.querySelector('.nav-links')
menuButton?.addEventListener('click', () => {
  const open = menuButton.getAttribute('aria-expanded') === 'true'
  menuButton.setAttribute('aria-expanded', String(!open))
  navLinks?.classList.toggle('open', !open)
})
navLinks?.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
  navLinks.classList.remove('open')
  menuButton?.setAttribute('aria-expanded', 'false')
}))

document.querySelectorAll('.bookmark').forEach((button) => button.addEventListener('click', () => {
  const saved = button.classList.toggle('saved')
  button.textContent = saved ? '♥' : '♡'
  button.setAttribute('aria-pressed', String(saved))
}))

let activeSpecialty = 'all'
let activeType = 'all'

const applyFilters = () => {
  document.querySelectorAll('#catalogCards .opportunity-card').forEach((card) => {
    const matchSpecialty = activeSpecialty === 'all' || card.dataset.specialty === activeSpecialty
    const matchType = activeType === 'all' || card.dataset.type === activeType
    card.hidden = !(matchSpecialty && matchType)
  })
}

document.querySelectorAll('#specialtyFilters .filter').forEach((button) => button.addEventListener('click', () => {
  document.querySelector('#specialtyFilters .filter.active')?.classList.remove('active')
  button.classList.add('active')
  activeSpecialty = button.dataset.specialty || 'all'
  applyFilters()
}))

document.querySelectorAll('#typeFilters .filter').forEach((button) => button.addEventListener('click', () => {
  document.querySelector('#typeFilters .filter.active')?.classList.remove('active')
  button.classList.add('active')
  activeType = button.dataset.type || 'all'
  applyFilters()
}))

document.querySelectorAll('#catalogCards .details-button').forEach((button) => button.addEventListener('click', () => {
  const idx = Number(button.dataset.index)
  const item = unifiedItems[idx]
  if (item) alert(item.details)
}))

document.querySelectorAll('#marketCards .details-button').forEach((button) => button.addEventListener('click', () => {
  const m = MARKET.find((entry) => entry.id === button.dataset.market)
  if (!m) return
  const skillsText = m.skills.map((s) => `- ${s.name}: ${s.pct}%`).join('\n')
  const reqText = REQUIREMENT_DIMENSIONS.map((d) => `- ${d.label}: ${m.requirements?.[d.id] ?? 0}%`).join('\n')
  alert(`${m.fullLabel}\nمؤشر الطلب: ${m.demandIndex}/100 (النمو: +${m.growth}%)\n\nالمهارات:\n${skillsText}\n\nأبعاد المتطلبات:\n${reqText}`)
}))

document.querySelector('#startResume')?.addEventListener('click', () => {
  document.querySelector('.resume-preview')?.classList.toggle('highlight')
})
