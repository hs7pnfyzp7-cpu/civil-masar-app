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

const getFilteredData = (specialtyId) => {
  const filteredJobs = JOBS.filter(job => job.specialty === specialtyId)
  const filteredCourses = COURSES.filter(course => course.specialty === specialtyId)
  return { filteredJobs, filteredCourses }
}

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
        <a class="active" href="#jobs">الفرص</a><a href="#courses">الدورات</a><a href="#market">سوق العمل</a>
      </div>
    </nav>
  </header>
  <main id="home">
    <section class="section" id="profile-builder" style="background: #e8f5e9; padding: 30px 0; text-align: center;">
      <div class="container">
        <h2 style="color: #1b5e20; margin-bottom: 10px;">أهلاً بك! عرّفنا عن نفسك لنعرض لك ما يناسبك</h2>
        <p style="color: #388e3c; margin-bottom: 20px;">اختر تخصصك لنفلتر لك الفرص والدورات.</p>
        
        <div style="display: flex; gap: 15px; justify-content: center; flex-wrap: wrap; margin-bottom: 20px;">
          <select id="userSpecialty" style="padding: 10px; border-radius: 8px; border: 1px solid #a5d6a7; font-family: inherit;">
            <option value="">اختر التخصص الهندسي...</option>
            ${SPECIALTIES.map(sp => `<option value="${sp.id}">${sp.label}</option>`).join('')}
          </select>
        </div>
        
        <button id="applyProfileBtn" style="background: #2e7d32; color: white; padding: 12px 30px; border: none; border-radius: 8px; font-size: 16px; cursor: pointer;">أظهر النتائج المناسبة لي</button>
      </div>
    </section>

    <section class="section" id="jobs">
      <div class="container">
        <div class="section-heading">
          <div><span class="section-kicker">اكتشف فرصك ودوراتك</span><h2>الفرص والدورات الهندسية في السعودية</h2></div>
        </div>

        <div class="filter-row" role="group" aria-label="تصفية حسب التخصص" id="specialtyFilters">
          <button class="filter active" data-specialty="all" type="button">كل التخصصات</button>
          ${SPECIALTIES.map((sp) => `<button class="filter" data-specialty="${sp.id}" type="button">${sp.label}</button>`).join('')}
        </div>

        <div class="cards" id="catalogCards"></div>
      </div>
    </section>
  </main>
`

const detailModal = document.createElement('div');
detailModal.id = 'custom-modal';
detailModal.style.cssText = 'display:none; position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.5); z-index:1000; justify-content:center; align-items:center; padding:20px;';
detailModal.innerHTML = `
  <div style="background:#fff; border-radius:12px; max-width:500px; width:100%; padding:20px; position:relative; box-shadow:0 10px 25px rgba(0,0,0,0.2);">
    <button id="closeModalBtn" style="position:absolute; top:10px; right:15px; background:none; border:none; font-size:24px; cursor:pointer; color:#555;">&times;</button>
    <h3 id="modalTitle" style="color:#1b5e20; margin-bottom:15px; padding-right:20px;"></h3>
    <p id="modalContent" style="color:#333; line-height:1.6; white-space:pre-wrap;"></p>
  </div>
`;
document.body.appendChild(detailModal);

const openModal = (title, content) => {
  document.querySelector('#modalTitle').textContent = title;
  document.querySelector('#modalContent').textContent = content;
  detailModal.style.display = 'flex';
};
document.querySelector('#closeModalBtn').addEventListener('click', () => detailModal.style.display = 'none');

const renderJobsAndCourses = (specialtyFilter = 'all') => {
  const { filteredJobs, filteredCourses } = specialtyFilter === 'all' 
    ? { filteredJobs: JOBS, filteredCourses: COURSES } 
    : getFilteredData(specialtyFilter);

  const unifiedItems = [
    ...filteredJobs.map((job) => ({
      kind: 'job', filterType: job.type === 'coop' ? 'تدريب' : 'وظيفة', badge: job.type === 'coop' ? 'فرصة تدريب' : 'وظيفة',
      specialty: job.specialty, title: job.title, company: job.company, location: job.city,
      meta: `${JOB_TYPES[job.type] || job.type} • ${EXPERIENCE[job.expMin >= 6 ? 'senior' : job.expMin >= 3 ? 'mid' : 'entry']} • ${job.salaryMin.toLocaleString('en-US')}–${job.salaryMax.toLocaleString('en-US')} ر.س`,
      details: `${job.title} — ${job.company} (${job.city})\nالتخصص: ${specialtyLabelMap[job.specialty] || job.specialty}\nالخبرة: ${job.expMin}–${job.expMax} سنوات\nالمهارات: ${job.skills.join('، ')}\n\n${job.summary}`,
    })),
    ...filteredCourses.map((course) => {
      const statusKey = getCourseStatusKey(course, todayRiyadh)
      return {
        kind: 'course', filterType: 'دورة', badge: 'دورة معتمدة', specialty: course.specialty, title: course.title,
        company: `${course.provider} (${course.accreditation})`, location: `${course.city} • ${MODES[course.mode] || course.mode}`,
        meta: `${course.hours} ساعة • ${COURSE_STATUS[statusKey]} • ${course.price === 0 ? 'مجاني' : `${course.price.toLocaleString('en-US')} ر.س`}`,
        details: `${course.title}\nالجهة: ${course.provider}\nالاعتماد: ${course.accreditation}\nالمستوى: ${LEVELS[course.level] || course.level}\nالنمط: ${MODES[course.mode] || course.mode} — ${course.city}\nحالة التسجيل: ${COURSE_STATUS[statusKey]}`,
      }
    }),
  ];

  const container = document.querySelector('#catalogCards');
  container.innerHTML = unifiedItems.map((item, idx) => `
    <article class="opportunity-card" data-type="${item.filterType}" data-specialty="${item.specialty}">
      <div class="card-meta"><span>${item.badge} • ${specialtyShortMap[item.specialty] || item.specialty}</span></div>
      <h3>${item.title}</h3>
      <p class="company">${item.company}</p>
      <p class="location">⌖ ${item.location}</p>
      <div class="card-footer">
        <span>${item.meta}</span>
        <button type="button" class="details-button" data-idx="${idx}">التفاصيل</button>
      </div>
    </article>
  `).join('');

  document.querySelectorAll('#catalogCards .details-button').forEach((button) => {
    button.addEventListener('click', () => {
      const item = unifiedItems[Number(button.dataset.idx)];
      if (item) openModal(item.title, item.details);
    });
  });
};

document.querySelector('#applyProfileBtn')?.addEventListener('click', () => {
  const selectedSpecialty = document.querySelector('#userSpecialty').value;
  if (!selectedSpecialty) return alert("الرجاء اختيار التخصص أولاً.");
  
  document.querySelectorAll('#specialtyFilters .filter').forEach(btn => {
    btn.classList.remove('active');
    if(btn.dataset.specialty === selectedSpecialty) btn.classList.add('active');
  });
  renderJobsAndCourses(selectedSpecialty);
  document.querySelector('#jobs').scrollIntoView({ behavior: 'smooth' });
});

document.querySelectorAll('#specialtyFilters .filter').forEach((button) => button.addEventListener('click', () => {
  document.querySelector('#specialtyFilters .filter.active')?.classList.remove('active')
  button.classList.add('active')
  renderJobsAndCourses(button.dataset.specialty || 'all')
}))

renderJobsAndCourses('all');