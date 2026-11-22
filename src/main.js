import './styles.css'
import { analyzeJobText } from './ai-service.js'
import {
  SPECIALTIES, LEVELS, MODES, JOB_TYPES, EXPERIENCE, COURSE_STATUS,
  MARKET, COURSES, JOBS,
} from './radar/catalog.js'

// --- دوال مساعدة ---
const getRiyadhToday = () => {
  const parts = new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Riyadh', year: 'numeric', month: '2-digit', day: '2-digit' }).formatToParts(new Date())
  const map = Object.fromEntries(parts.map((p) => [p.type, p.value]))
  return `${map.year}-${map.month}-${map.day}`
}

const getCourseStatusKey = (course, todayStr) => {
  const remainingSeats = Math.max(0, (course.seats || 0) - (course.seatsTaken || 0))
  if (todayStr < course.opensAt) return 'upcoming'
  if (todayStr > course.closesAt || remainingSeats === 0) return 'closed'
  return 'open'
}

const todayRiyadh = getRiyadhToday()
const app = document.querySelector('#app')

// --- تصميم الموقع (CSS مدمج) ---
app.innerHTML = `
  <style>
    :root {
      --primary-green: #2e7d32;
      --light-green: #e8f5e9;
      --bg-color: #f8fbf9;
      --text-dark: #333;
      --text-light: #666;
    }
    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      background-color: var(--bg-color);
      margin: 0;
      padding: 0;
      color: var(--text-dark);
    }
    .container {
      max-width: 900px;
      margin: 0 auto;
      padding: 0 20px;
    }
    /* الهيدر */
    .header {
      background: #fff;
      padding: 15px 0;
      box-shadow: 0 2px 10px rgba(0,0,0,0.05);
      margin-bottom: 30px;
    }
    .nav {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .logo {
      color: var(--primary-green);
      font-size: 22px;
      font-weight: bold;
      text-decoration: none;
    }
    .nav-links a {
      text-decoration: none;
      color: var(--text-dark);
      margin-right: 15px;
      font-weight: 500;
    }
    /* بطاقة التخصص */
    .profile-card {
      background: #fff;
      border-radius: 16px;
      padding: 30px;
      text-align: center;
      box-shadow: 0 4px 15px rgba(0,0,0,0.04);
      border: 1px solid #e0eae0;
      margin-bottom: 40px;
    }
    .profile-card h2 {
      color: var(--primary-green);
      margin-top: 0;
    }
    .profile-selects {
      display: flex;
      flex-direction: column;
      gap: 15px;
      margin: 20px 0;
    }
    select {
      width: 100%;
      padding: 14px;
      border-radius: 10px;
      border: 2px solid #c8e6c9;
      background: #fafafa;
      font-size: 16px;
      outline: none;
      transition: 0.3s;
      box-sizing: border-box; /* يمنع الخروج عن الإطار */
    }
    select:focus {
      border-color: var(--primary-green);
      background: #fff;
    }
    .btn-primary {
      background: var(--primary-green);
      color: #fff;
      border: none;
      padding: 14px;
      border-radius: 10px;
      font-size: 16px;
      font-weight: bold;
      cursor: pointer;
      width: 100%;
      transition: 0.3s;
    }
    .btn-primary:hover { background: #1b5e20; }
    
    /* الأقسام */
    .section-title {
      color: var(--primary-green);
      border-right: 5px solid var(--primary-green);
      padding-right: 12px;
      margin-bottom: 20px;
    }
    .grid-cards {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
      gap: 20px;
    }
    .card {
      background: #fff;
      border-radius: 12px;
      padding: 20px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.05);
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      border: 1px solid #eee;
      transition: 0.3s;
    }
    .card:hover {
      transform: translateY(-3px);
      box-shadow: 0 6px 15px rgba(0,0,0,0.1);
    }
    .card h3 { margin: 0 0 10px 0; font-size: 18px; color: #222; }
    .card p { margin: 0 0 8px 0; color: var(--text-light); font-size: 14px; }
    .card-btn {
      margin-top: 15px;
      padding: 10px;
      border: none;
      border-radius: 8px;
      background: var(--light-green);
      color: var(--primary-green);
      font-weight: bold;
      cursor: pointer;
      transition: 0.3s;
    }
    .card-btn:hover { background: #c8e6c9; }
    
    /* قسم الدورات بخلفية مختلفة */
    .courses-section {
      background: #f0f4f0;
      padding: 40px 0;
      margin: 40px 0;
    }

    /* النافذة المنبثقة */
    .modal-overlay {
      display: none;
      position: fixed;
      top: 0; left: 0; width: 100%; height: 100%;
      background: rgba(0,0,0,0.5);
      z-index: 1000;
      justify-content: center;
      align-items: center;
      padding: 20px;
      box-sizing: border-box;
      backdrop-filter: blur(2px);
    }
    .modal-content {
      background: #fff;
      border-radius: 16px;
      max-width: 500px;
      width: 100%;
      padding: 30px;
      position: relative;
      max-height: 90vh;
      overflow-y: auto;
    }
    .close-btn {
      position: absolute;
      top: 15px;
      left: 15px;
      background: #f0f0f0;
      border: none;
      width: 35px; height: 35px;
      border-radius: 50%;
      font-size: 20px;
      cursor: pointer;
      color: #666;
    }
    
    /* الذكاء الاصطناعي */
    .ai-section {
      background: #fff;
      border-radius: 16px;
      padding: 30px;
      box-shadow: 0 4px 15px rgba(0,0,0,0.04);
      border: 1px solid #e0eae0;
      margin-top: 40px;
    }
    textarea {
      width: 100%;
      padding: 15px;
      border-radius: 10px;
      border: 2px solid #c8e6c9;
      font-family: inherit;
      resize: vertical;
      box-sizing: border-box;
    }
    .ai-result {
      display: none;
      margin-top: 20px;
      padding: 20px;
      background: #e3f2fd;
      border-radius: 10px;
      border-right: 4px solid #1e3a8a;
      line-height: 1.7;
      white-space: pre-wrap;
      color: #333;
    }
  </style>

  <header class="header">
    <div class="container nav">
      <a href="#" class="logo" onclick="window.scrollTo({top: 0, behavior: 'smooth'}); return false;">مسار الهندسة</a>
      <div class="nav-links">
        <a href="#jobs">الوظائف</a>
        <a href="#courses">الدورات</a>
        <a href="#ai">المساعد الذكي</a>
      </div>
    </div>
  </header>

  <main class="container">
    <!-- بطاقة التخصص -->
    <section class="profile-card">
      <h2>أهلاً بك! عرّفنا عن نفسك</h2>
      <p style="color: var(--text-light); margin-bottom: 20px;">اختر تخصصك ومستواك لنعرض لك أفضل الفرص والدورات.</p>
      
      <div class="profile-selects">
        <select id="userSpecialty">
          <option value="all">كل التخصصات الهندسية</option>
          ${SPECIALTIES.map(sp => `<option value="${sp.id}">${sp.label}</option>`).join('')}
        </select>
        <select id="userLevel">
          <option value="all">الكل (فني / مهندس)</option>
          <option value="tech">فني</option>
          <option value="eng">مهندس</option>
        </select>
      </div>
      <button id="applyProfileBtn" class="btn-primary">عرض النتائج المناسبة</button>
    </section>

    <!-- الوظائف -->
    <section id="jobs">
      <h2 class="section-title">الوظائف المتاحة</h2>
      <div id="jobList" class="grid-cards"></div>
    </section>

    <!-- الدورات -->
    <section id="courses" class="courses-section">
      <div class="container">
        <h2 class="section-title">الدورات المعتمدة</h2>
        <div id="courseList" class="grid-cards"></div>
      </div>
    </section>

    <!-- الذكاء الاصطناعي -->
    <section id="ai" class="ai-section">
      <h2 class="section-title">مساعدك الذكي</h2>
      <p style="color: var(--text-light); margin-bottom: 15px;">اكتب مجالك أو الوصف الوظيفي، وسيقوم المساعد بالتحليل وتوجيهك للشهادات الموثوقة في السعودية.</p>
      <textarea id="aiInput" rows="3" placeholder="مثال: أنا فني مدني وأبحث عن دورات OSHA..."></textarea>
      <button id="askAiBtn" class="btn-primary" style="margin-top: 15px; background: #1e3a8a;">اسأل المساعد الذكي</button>
      <div id="aiResultBox" class="ai-result"></div>
    </section>
  </main>

  <!-- النافذة المنبثقة -->
  <div id="modalOverlay" class="modal-overlay">
    <div class="modal-content">
      <button id="closeModal" class="close-btn">&times;</button>
      <h3 id="modalTitle" style="color: var(--primary-green); margin-top: 0; margin-bottom: 15px;"></h3>
      <p id="modalContent" style="color: var(--text-dark); line-height: 1.6; white-space: pre-wrap; margin-bottom: 25px;"></p>
      <a id="applyLink" href="#" target="_blank" class="btn-primary" style="display: block; text-align: center; text-decoration: none;">جاري التحميل...</a>
    </div>
  </div>
`

// --- الوظائف البرمجية ---
const modalOverlay = document.querySelector('#modalOverlay');
document.querySelector('#closeModal').addEventListener('click', () => modalOverlay.style.display = 'none');

const showModal = (title, content, link, btnText) => {
  document.querySelector('#modalTitle').textContent = title;
  document.querySelector('#modalContent').textContent = content;
  const applyBtn = document.querySelector('#applyLink');
  applyBtn.href = link;
  applyBtn.textContent = btnText;
  modalOverlay.style.display = 'flex';
};

const renderData = (specialty = 'all') => {
  let fJobs = specialty === 'all' ? JOBS : JOBS.filter(j => j.specialty === specialty);
  let fCourses = specialty === 'all' ? COURSES : COURSES.filter(c => c.specialty === specialty);

  // عرض الوظائف
  document.querySelector('#jobList').innerHTML = fJobs.length ? fJobs.map((job, i) => `
    <div class="card">
      <div>
        <h3>${job.title}</h3>
        <p>${job.company}</p>
        <p>⌖ ${job.city}</p>
      </div>
      <button class="card-btn job-btn" data-idx="${i}">التفاصيل والتقديم</button>
    </div>
  `).join('') : '<p>لا توجد وظائف حالياً.</p>';

  // عرض الدورات
  document.querySelector('#courseList').innerHTML = fCourses.length ? fCourses.map((course, i) => `
    <div class="card">
      <div>
        <h3>${course.title}</h3>
        <p>${course.provider}</p>
        <p>⌖ ${course.city} • ${course.hours} ساعة</p>
      </div>
      <button class="card-btn course-btn" data-idx="${i}" style="background: #e3f2fd; color: #1e3a8a;">التفاصيل والتسجيل</button>
    </div>
  `).join('') : '<p>لا توجد دورات حالياً.</p>';

  // أحداث الوظائف
  document.querySelectorAll('.job-btn').forEach(btn => btn.addEventListener('click', (e) => {
    const job = fJobs[e.target.dataset.idx];
    const details = `الشركة: ${job.company}\nالمدينة: ${job.city}\nالخبرة: ${job.expMin}-${job.expMax} سنوات\n\n${job.summary || 'لا يوجد وصف.'}`;
    const url = (job.applyLink && job.applyLink.startsWith('http')) ? job.applyLink : 'https://www.jadarat.sa';
    showModal(job.title, details, url, 'قدم الآن عبر جدارات');
  }));

  // أحداث الدورات
  document.querySelectorAll('.course-btn').forEach(btn => btn.addEventListener('click', (e) => {
    const course = fCourses[e.target.dataset.idx];
    const details = `الجهة: ${course.provider}\nالاعتماد: ${course.accreditation}\nالسعر: ${course.price === 0 ? 'مجاني' : course.price + ' ر.س'}`;
    const url = (course.applyLink && course.applyLink.startsWith('http')) ? course.applyLink : `https://www.google.com/search?q=دورة+${encodeURIComponent(course.title)}+السعودية`;
    showModal(course.title, details, url, 'ابحث عن الدورة وسجل');
  }));
};

document.querySelector('#applyProfileBtn').addEventListener('click', () => {
  const spec = document.querySelector('#userSpecialty').value;
  renderData(spec);
  document.querySelector('#jobs').scrollIntoView({ behavior: 'smooth' });
});

// الذكاء الاصطناعي
document.querySelector('#askAiBtn').addEventListener('click', async () => {
  const text = document.querySelector('#aiInput').value;
  const resultBox = document.querySelector('#aiResultBox');
  if(!text) return alert("اكتب شيئاً أولاً");
  
  resultBox.style.display = 'block';
  resultBox.textContent = "جاري التحليل... ⏳";
  
  const response = await analyzeJobText(text);
  resultBox.textContent = response;
});

// تشغيل افتراضي
renderData('all');