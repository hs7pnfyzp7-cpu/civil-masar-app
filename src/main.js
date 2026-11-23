import './styles.css'
import { fetchLiveData } from './ai-service.js'
import {
  SPECIALTIES, LEVELS, MODES, JOB_TYPES, EXPERIENCE, COURSE_STATUS,
  MARKET, COURSES, JOBS,
} from './radar/catalog.js'

const app = document.querySelector('#app')

// --- تصميم الموقع (السويسري الفخم - Swiss Minimalist) ---
app.innerHTML = `
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Cairo:wght@400;700;900&display=swap');

    :root {
      --bg-color: #ffffff;
      --text-main: #111111;
      --text-muted: #666666;
      --border-color: #e5e5e5;
      --accent-green: #2e7d32;
    }

    * { box-sizing: border-box; margin: 0; padding: 0; }
    
    body {
      font-family: 'Cairo', sans-serif;
      background-color: var(--bg-color);
      color: var(--text-main);
      line-height: 1.6;
      -webkit-font-smoothing: antialiased;
    }

    .container { max-width: 1000px; margin: 0 auto; padding: 0 20px; }

    /* الهيدر */
    .header {
      border-bottom: 1px solid var(--border-color);
      padding: 20px 0;
    }
    .nav {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .logo {
      font-size: 24px;
      font-weight: 900;
      color: var(--text-main);
      text-decoration: none;
      letter-spacing: -0.5px;
    }

    /* الواجهة الرئيسية */
    .hero {
      padding: 60px 0;
      border-bottom: 1px solid var(--border-color);
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 40px;
    }
    .hero-text h1 {
      font-size: 48px;
      font-weight: 900;
      line-height: 1.1;
      margin-bottom: 20px;
      letter-spacing: -1px;
    }
    .hero-text p {
      font-size: 18px;
      color: var(--text-muted);
      max-width: 400px;
    }
    .hero-illustration {
      width: 300px;
      height: 300px;
      flex-shrink: 0;
    }

    /* أداة البحث */
    .search-section {
      padding: 40px 0;
      border-bottom: 1px solid var(--border-color);
    }
    .search-box {
      display: flex;
      gap: 20px;
      align-items: flex-end;
      flex-wrap: wrap;
    }
    .input-group {
      flex: 1;
      min-width: 250px;
    }
    .input-group label {
      display: block;
      font-size: 14px;
      font-weight: 700;
      margin-bottom: 8px;
      text-transform: uppercase;
    }
    .input-group select {
      width: 100%;
      padding: 15px;
      border: 1px solid var(--text-main);
      border-radius: 0;
      font-family: 'Cairo', sans-serif;
      font-size: 16px;
      font-weight: 700;
      background: transparent;
      outline: none;
      cursor: pointer;
      appearance: none;
    }
    .btn-search {
      padding: 15px 30px;
      background: var(--text-main);
      color: #fff;
      border: 1px solid var(--text-main);
      font-family: 'Cairo', sans-serif;
      font-size: 16px;
      font-weight: 700;
      cursor: pointer;
      transition: 0.3s;
    }
    .btn-search:hover {
      background: #fff;
      color: var(--text-main);
    }

    /* مؤشرات السوق (الرسم البياني) */
    .market-section {
      padding: 60px 0;
      border-bottom: 1px solid var(--border-color);
    }
    .section-title {
      font-size: 28px;
      font-weight: 900;
      margin-bottom: 30px;
    }
    .bar-chart {
      display: flex;
      flex-direction: column;
      gap: 20px;
    }
    .bar-row {
      display: flex;
      align-items: center;
      gap: 20px;
    }
    .bar-label {
      width: 150px;
      font-weight: 700;
      font-size: 14px;
    }
    .bar-track {
      flex: 1;
      height: 12px;
      background: #f0f0f0;
    }
    .bar-fill {
      height: 100%;
      background: var(--text-main);
      transition: width 1s ease-in-out;
    }
    .bar-fill.top-demand { background: var(--accent-green); }
    .bar-percent {
      width: 50px;
      font-weight: 700;
      font-size: 14px;
      text-align: left;
    }

    /* شبكة الكروت (01, 02, 03) */
    .results-section {
      padding: 60px 0;
    }
    .grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 30px;
    }
    .card {
      border: 1px solid var(--border-color);
      padding: 30px;
      position: relative;
      transition: 0.3s;
      background: #fff;
    }
    .card:hover {
      border-color: var(--text-main);
    }
    .card-number {
      font-size: 40px;
      font-weight: 900;
      color: var(--border-color);
      position: absolute;
      top: 10px;
      left: 20px;
      line-height: 1;
    }
    .card-type {
      font-size: 12px;
      font-weight: 700;
      text-transform: uppercase;
      color: var(--text-muted);
      margin-bottom: 10px;
      display: block;
    }
    .card h3 {
      font-size: 20px;
      font-weight: 900;
      margin-bottom: 10px;
      margin-top: 20px;
    }
    .card p {
      font-size: 14px;
      color: var(--text-muted);
      margin-bottom: 20px;
    }
    .card-btn {
      background: transparent;
      border: none;
      font-family: 'Cairo', sans-serif;
      font-size: 14px;
      font-weight: 700;
      text-decoration: underline;
      cursor: pointer;
      padding: 0;
      color: var(--text-main);
    }
    .card-btn:hover { color: var(--accent-green); }

    /* حالة التحميل */
    .loading {
      text-align: center; padding: 40px; grid-column: 1 / -1;
      font-weight: 700; font-size: 18px; color: var(--text-main);
    }

    /* الفوتر */
    .footer {
      text-align: center; padding: 40px 0; border-top: 1px solid var(--border-color);
      font-size: 14px; color: var(--text-muted);
    }

    /* النافذة المنبثقة */
    .modal-overlay {
      display: none; position: fixed; inset: 0; background: rgba(255,255,255,0.95);
      z-index: 1000; justify-content: center; align-items: center; padding: 20px;
    }
    .modal-overlay.active { display: flex; }
    .modal-content {
      background: #fff; border: 1px solid var(--text-main); max-width: 500px; width: 100%;
      padding: 40px; position: relative;
    }
    .close-btn {
      position: absolute; top: 20px; left: 20px; background: none; border: none;
      font-size: 30px; cursor: pointer; color: var(--text-main);
    }
    .modal-title { font-size: 24px; font-weight: 900; margin-bottom: 20px; }
    .modal-desc { font-size: 16px; color: var(--text-muted); margin-bottom: 30px; white-space: pre-wrap; }
    .btn-apply {
      display: block; text-align: center; padding: 15px; background: var(--accent-green);
      color: #fff; text-decoration: none; font-weight: 700;
    }

    /* الجوال */
    @media (max-width: 768px) {
      .hero { flex-direction: column; text-align: center; }
      .hero-text h1 { font-size: 36px; }
      .hero-illustration { width: 200px; height: 200px; }
      .search-box { flex-direction: column; }
      .btn-search { width: 100%; }
      .bar-label { width: 100px; font-size: 12px; }
    }
  </style>

  <header class="header">
    <div class="container nav">
      <a href="#" class="logo" onclick="window.scrollTo({top: 0, behavior: 'smooth'}); return false;">مسارك للهندسة.</a>
    </div>
  </header>

  <main class="container">
    
    <!-- الواجهة (Hero) -->
    <section class="hero">
      <div class="hero-text">
        <h1>مسارك المهني في الهندسة يبدأ من هنا.</h1>
        <p>أداة ذكية تبحث لك في السوق السعودي، تجلب الوظائف الحقيقية والدورات المعتمدة، وتختصر عليك عناء البحث.</p>
      </div>
      <!-- رسمة المهندس (Line Art) -->
      <div class="hero-illustration">
        <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M100 180V60L40 100V180H160V100L100 60Z" stroke="#111" stroke-width="4" stroke-linejoin="round"/>
          <path d="M80 180V140H120V180" stroke="#111" stroke-width="4"/>
          <circle cx="100" cy="40" r="15" stroke="#111" stroke-width="4"/>
          <path d="M100 55V60" stroke="#111" stroke-width="4"/>
          <path d="M85 30H115" stroke="#111" stroke-width="4"/>
          <path d="M100 25V15" stroke="#111" stroke-width="4"/>
          <!-- لمسات هندسية -->
          <path d="M20 180H180" stroke="#111" stroke-width="4"/>
          <rect x="140" y="120" width="30" height="20" stroke="#2e7d32" stroke-width="4"/>
        </svg>
      </div>
    </section>

    <!-- أداة البحث -->
    <section class="search-section">
      <div class="search-box">
        <div class="input-group">
          <label>التخصص الهندسي</label>
          <select id="userSpecialty">
            <option value="all">اختر التخصص...</option>
            ${SPECIALTIES.map(sp => `<option value="${sp.id}">${sp.label}</option>`).join('')}
          </select>
        </div>
        <div class="input-group">
          <label>المستوى</label>
          <select id="userLevel">
            <option value="all">الكل</option>
            <option value="tech">فني</option>
            <option value="eng">مهندس</option>
          </select>
        </div>
        <button id="applyProfileBtn" class="btn-search">ابحث بالذكاء الاصطناعي</button>
      </div>
    </section>

    <!-- الرسم البياني للسوق -->
    <section class="market-section">
      <h2 class="section-title">مؤشرات الطلب في السوق السعودي.</h2>
      <div class="bar-chart">
        ${MARKET.map((m, index) => `
          <div class="bar-row">
            <div class="bar-label">${m.label}</div>
            <div class="bar-track">
              <div class="bar-fill ${index === 0 ? 'top-demand' : ''}" style="width: ${m.demandIndex}%;"></div>
            </div>
            <div class="bar-percent">${m.demandIndex}%</div>
          </div>
        `).join('')}
      </div>
    </section>

    <!-- النتائج -->
    <section class="results-section">
      <h2 class="section-title" id="resultsTitle">أحدث الفرص.</h2>
      
      <div style="margin-bottom: 20px;">
        <span style="font-weight: 700; border-bottom: 2px solid #111; padding-bottom: 5px;">الوظائف</span>
      </div>
      <div id="jobList" class="grid" style="margin-bottom: 60px;"></div>

      <div style="margin-bottom: 20px;">
        <span style="font-weight: 700; border-bottom: 2px solid #111; padding-bottom: 5px;">الدورات</span>
      </div>
      <div id="courseList" class="grid"></div>
    </section>

  </main>

  <footer class="footer">
    <div class="container">
      <p>© ${new Date().getFullYear()} مسارك للهندسة. جميع الحقوق محفوظة.</p>
    </div>
  </footer>

  <!-- النافذة المنبثقة -->
  <div id="modalOverlay" class="modal-overlay">
    <div class="modal-content">
      <button id="closeModal" class="close-btn">&times;</button>
      <h3 id="modalTitle" class="modal-title"></h3>
      <div id="modalContent" class="modal-desc"></div>
      <a id="applyLink" href="#" target="_blank" class="btn-apply">الانتقال إلى الرابط</a>
    </div>
  </div>
`

// --- الوظائف البرمجية ---
const modalOverlay = document.querySelector('#modalOverlay');
document.querySelector('#closeModal').addEventListener('click', () => {
  modalOverlay.classList.remove('active');
});

window.showModal = (title, content, link) => {
  document.querySelector('#modalTitle').textContent = title;
  document.querySelector('#modalContent').textContent = content;
  document.querySelector('#applyLink').href = link;
  modalOverlay.classList.add('active');
};

const renderCards = (containerId, items) => {
  const container = document.querySelector(containerId);
  if (!items || items.length === 0) {
    container.innerHTML = '<p style="color:#666;">لا توجد نتائج حالياً.</p>';
    return;
  }

  container.innerHTML = items.map((item, i) => `
    <div class="card">
      <span class="card-number">0${i + 1}</span>
      <span class="card-type">${item.company ? 'وظيفة' : 'دورة'}</span>
      <h3>${item.title}</h3>
      <p>${item.company || item.provider || 'جهة غير محددة'} <br> ⌖ ${item.city || 'السعودية'}</p>
      <button class="card-btn" 
        onclick="showModal('${item.title.replace(/'/g, "\\'")}', '${(item.company || item.provider || '').replace(/'/g, "\\'")}\\nالمدينة: ${(item.city || 'السعودية').replace(/'/g, "\\'")}', '${item.link || 'https://www.jadarat.sa'}')">
        عرض التفاصيل والتقديم ←
      </button>
    </div>
  `).join('');
};

// --- البحث الذكي ---
document.querySelector('#applyProfileBtn').addEventListener('click', async () => {
  const specId = document.querySelector('#userSpecialty').value;
  const levelId = document.querySelector('#userLevel').value;
  
  const jobList = document.querySelector('#jobList');
  const courseList = document.querySelector('#courseList');
  const resultsTitle = document.querySelector('#resultsTitle');
  
  if (specId === 'all') {
    renderCards('#jobList', JOBS);
    renderCards('#courseList', COURSES);
    return;
  }

  const specialtyAr = SPECIALTIES.find(s => s.id === specId)?.label || '';
  const levelAr = levelId === 'tech' ? 'فني' : levelId === 'eng' ? 'مهندس' : '';

  resultsTitle.textContent = `جاري البحث عن فرص في ${specialtyAr}...`;
  
  jobList.innerHTML = `<div class="loading">جاري البحث في السوق السعودي... ⏳</div>`;
  courseList.innerHTML = `<div class="loading">جاري البحث عن دورات معتمدة... ⏳</div>`;

  const liveJobs = await fetchLiveData('jobs', specialtyAr, levelAr);
  const liveCourses = await fetchLiveData('courses', specialtyAr, levelAr);

  resultsTitle.textContent = `فرصك المتاحة في ${specialtyAr}.`;

  if (liveJobs && liveJobs.length > 0) {
    renderCards('#jobList', liveJobs);
  } else {
    renderCards('#jobList', JOBS.filter(j => j.specialty === specId));
  }

  if (liveCourses && liveCourses.length > 0) {
    renderCards('#courseList', liveCourses);
  } else {
    renderCards('#courseList', COURSES.filter(c => c.specialty === specId));
  }
});

// تحميل افتراضي
renderCards('#jobList', JOBS);
renderCards('#courseList', COURSES);