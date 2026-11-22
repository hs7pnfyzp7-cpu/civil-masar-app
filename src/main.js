import './styles.css'
import { fetchLiveData } from './ai-service.js'
import {
  SPECIALTIES, LEVELS, MODES, JOB_TYPES, EXPERIENCE, COURSE_STATUS,
  MARKET, COURSES, JOBS,
} from './radar/catalog.js'

const app = document.querySelector('#app')

// --- تصميم الموقع (عصري واحترافي - مسارك للهندسة) ---
app.innerHTML = `
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;800&display=swap');

    :root {
      --primary: #10b981;
      --primary-dark: #047857;
      --bg-body: #f8fafc;
      --text-main: #1e293b;
      --text-muted: #64748b;
      --card-bg: #ffffff;
      --shadow-sm: 0 1px 3px rgba(0,0,0,0.05);
      --shadow-md: 0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06);
      --shadow-lg: 0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -2px rgba(0,0,0,0.05);
    }

    * { box-sizing: border-box; margin: 0; padding: 0; }
    
    body {
      font-family: 'Cairo', sans-serif;
      background-color: var(--bg-body);
      color: var(--text-main);
      line-height: 1.6;
      -webkit-font-smoothing: antialiased;
    }

    .container { max-width: 1000px; margin: 0 auto; padding: 0 20px; }

    /* الهيدر */
    .header {
      background: rgba(255, 255, 255, 0.9);
      backdrop-filter: blur(10px);
      position: sticky;
      top: 0;
      z-index: 100;
      border-bottom: 1px solid #e2e8f0;
    }
    .nav {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 70px;
    }
    .logo {
      font-size: 24px;
      font-weight: 800;
      color: var(--primary-dark);
      text-decoration: none;
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .nav-links a {
      text-decoration: none;
      color: var(--text-muted);
      font-weight: 600;
      margin-right: 24px;
      transition: color 0.3s;
    }
    .nav-links a:hover { color: var(--primary); }

    /* القسم الرئيسي (Hero) */
    .hero {
      text-align: center;
      padding: 60px 20px 40px;
    }
    .hero h1 {
      font-size: 36px;
      font-weight: 800;
      color: var(--text-main);
      margin-bottom: 16px;
    }
    .hero p {
      font-size: 18px;
      color: var(--text-muted);
      max-width: 600px;
      margin: 0 auto 40px;
    }

    /* بطاقة البحث الذكي */
    .search-card {
      background: var(--card-bg);
      border-radius: 24px;
      padding: 30px;
      box-shadow: var(--shadow-lg);
      border: 1px solid rgba(16, 185, 129, 0.1);
      max-width: 700px;
      margin: 0 auto 60px;
      position: relative;
      overflow: hidden;
    }
    .search-card::before {
      content: '';
      position: absolute;
      top: 0; left: 0; right: 0;
      height: 4px;
      background: linear-gradient(90deg, var(--primary), #34d399);
    }
    .form-group {
      display: flex;
      gap: 16px;
      margin-bottom: 24px;
      flex-wrap: wrap;
    }
    .form-group > div {
      flex: 1;
      min-width: 250px;
    }
    label {
      display: block;
      font-size: 14px;
      font-weight: 600;
      color: var(--text-main);
      margin-bottom: 8px;
      text-align: right;
    }
    select {
      width: 100%;
      padding: 14px 16px;
      border-radius: 12px;
      border: 2px solid #e2e8f0;
      background: #f8fafc;
      font-family: 'Cairo', sans-serif;
      font-size: 16px;
      color: var(--text-main);
      outline: none;
      transition: all 0.3s;
      cursor: pointer;
      appearance: none;
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%2364748b'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E");
      background-repeat: no-repeat;
      background-position: left 16px center;
      background-size: 20px;
    }
    select:focus { border-color: var(--primary); background-color: #fff; box-shadow: 0 0 0 4px rgba(16, 185, 129, 0.1); }
    
    .btn-primary {
      width: 100%;
      padding: 16px;
      border-radius: 12px;
      background: var(--primary);
      color: white;
      font-family: 'Cairo', sans-serif;
      font-size: 18px;
      font-weight: 700;
      border: none;
      cursor: pointer;
      transition: all 0.3s;
      box-shadow: var(--shadow-md);
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 10px;
    }
    .btn-primary:hover {
      background: var(--primary-dark);
      transform: translateY(-2px);
      box-shadow: var(--shadow-lg);
    }

    /* الأقسام */
    .section-header {
      display: flex;
      align-items: center;
      margin-bottom: 24px;
    }
    .section-header h2 {
      font-size: 24px;
      font-weight: 800;
      color: var(--text-main);
    }
    .section-header::before {
      content: '';
      display: block;
      width: 8px;
      height: 24px;
      background: var(--primary);
      border-radius: 4px;
      margin-left: 12px;
    }

    /* الكروت */
    .grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 24px;
      margin-bottom: 60px;
    }
    .card {
      background: var(--card-bg);
      border-radius: 16px;
      padding: 24px;
      box-shadow: var(--shadow-sm);
      border: 1px solid #e2e8f0;
      transition: all 0.3s ease;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
    .card:hover {
      transform: translateY(-5px);
      box-shadow: var(--shadow-lg);
      border-color: var(--primary);
    }
    .card h3 { font-size: 18px; font-weight: 700; margin-bottom: 8px; color: var(--text-main); }
    .card .company { font-size: 14px; color: var(--primary-dark); font-weight: 600; margin-bottom: 4px; }
    .card .location { font-size: 13px; color: var(--text-muted); display: flex; align-items: center; gap: 4px; margin-bottom: 16px; }
    
    .card-btn {
      width: 100%;
      padding: 12px;
      border-radius: 10px;
      background: #ecfdf5;
      color: var(--primary-dark);
      border: none;
      font-family: 'Cairo', sans-serif;
      font-weight: 700;
      cursor: pointer;
      transition: all 0.3s;
    }
    .card-btn:hover { background: var(--primary); color: white; }

    /* النافذة المنبثقة (Modal) */
    .modal-overlay {
      display: none; position: fixed; inset: 0; background: rgba(15, 23, 42, 0.6);
      backdrop-filter: blur(4px); z-index: 1000; justify-content: center; align-items: center; padding: 20px;
      opacity: 0; transition: opacity 0.3s ease;
    }
    .modal-overlay.active { display: flex; opacity: 1; }
    .modal-content {
      background: #fff; border-radius: 20px; max-width: 500px; width: 100%;
      padding: 32px; position: relative; box-shadow: var(--shadow-lg);
      transform: scale(0.95); transition: transform 0.3s ease;
    }
    .modal-overlay.active .modal-content { transform: scale(1); }
    
    .close-btn {
      position: absolute; top: 16px; left: 16px; background: #f1f5f9; border: none;
      width: 36px; height: 36px; border-radius: 50%; font-size: 20px; cursor: pointer;
      color: var(--text-muted); display: flex; justify-content: center; align-items: center;
      transition: all 0.3s;
    }
    .close-btn:hover { background: #e2e8f0; color: var(--text-main); }
    
    .modal-title { font-size: 22px; font-weight: 800; color: var(--text-main); margin-bottom: 16px; padding-left: 40px; }
    .modal-desc { font-size: 15px; color: var(--text-muted); margin-bottom: 24px; white-space: pre-wrap; line-height: 1.8; background: #f8fafc; padding: 16px; border-radius: 12px; }

    /* حالة التحميل */
    .loading {
      text-align: center; padding: 40px; grid-column: 1 / -1;
      color: var(--primary-dark); font-weight: 600; font-size: 18px;
      display: flex; flex-direction: column; align-items: center; gap: 16px;
    }
    .spinner {
      width: 40px; height: 40px; border: 4px solid #ecfdf5; border-top-color: var(--primary);
      border-radius: 50%; animation: spin 1s linear infinite;
    }
    @keyframes spin { to { transform: rotate(360deg); } }

    /* الفوتر */
    .footer { text-align: center; padding: 40px 0; color: var(--text-muted); font-size: 14px; border-top: 1px solid #e2e8f0; margin-top: 40px; }
  </style>

  <header class="header">
    <div class="container nav">
      <a href="#" class="logo" onclick="window.scrollTo({top: 0, behavior: 'smooth'}); return false;">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 20h20"/><path d="M9 20V8l6-4 6 4v12"/><path d="M9 12h6"/></svg>
        مسارك للهندسة
      </a>
      <div class="nav-links" style="display:none; md:display:flex;">
        <a href="#jobs">الوظائف</a>
        <a href="#courses">الدورات</a>
      </div>
    </div>
  </header>

  <main>
    <section class="hero">
      <div class="container">
        <h1>بوابتك الذكية لسوق العمل الهندسي</h1>
        <p>لا تضيع وقتك في البحث العشوائي. اختر تخصصك، ودع الذكاء الاصطناعي يرشدك لأحدث الوظائف والدورات المعتمدة في السعودية.</p>
      </div>
    </section>

    <div class="container">
      <!-- بطاقة البحث الذكي (بدون ترحيب) -->
      <section class="search-card">
        <div class="form-group">
          <div>
            <label>التخصص الهندسي</label>
            <select id="userSpecialty">
              <option value="all">كل التخصصات</option>
              ${SPECIALTIES.map(sp => `<option value="${sp.id}">${sp.label}</option>`).join('')}
            </select>
          </div>
          <div>
            <label>المستوى</label>
            <select id="userLevel">
              <option value="all">الكل (فني / مهندس)</option>
              <option value="tech">فني</option>
              <option value="eng">مهندس</option>
            </select>
          </div>
        </div>
        <button id="applyProfileBtn" class="btn-primary">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
          ابحث لي بالذكاء الاصطناعي
        </button>
      </section>

      <!-- الوظائف -->
      <section id="jobs">
        <div class="section-header"><h2>الوظائف المتاحة</h2></div>
        <div id="jobList" class="grid"></div>
      </section>

      <!-- الدورات -->
      <section id="courses">
        <div class="section-header"><h2>الدورات المعتمدة</h2></div>
        <div id="courseList" class="grid"></div>
      </section>
    </div>
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
      <a id="applyLink" href="#" target="_blank" class="btn-primary">جاري التحميل...</a>
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
    container.innerHTML = '<p style="text-align:center; color:#64748b; grid-column:1/-1;">لا توجد نتائج حالياً.</p>';
    return;
  }

  container.innerHTML = items.map((item, i) => `
    <div class="card">
      <div>
        <h3>${item.title}</h3>
        <p class="company">${item.company || item.provider || 'جهة غير محددة'}</p>
        <p class="location">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
          ${item.city || 'السعودية'}
        </p>
      </div>
      <button class="card-btn" 
        onclick="showModal('${item.title.replace(/'/g, "\\'")}', '${(item.company || item.provider || '').replace(/'/g, "\\'")}\\nالمدينة: ${(item.city || 'السعودية').replace(/'/g, "\\'")}', '${item.link || '#'}')">
        التفاصيل والتقديم
      </button>
    </div>
  `).join('');
};

// --- الفرز الذكي ---
document.querySelector('#applyProfileBtn').addEventListener('click', async () => {
  const specId = document.querySelector('#userSpecialty').value;
  const levelId = document.querySelector('#userLevel').value;
  
  const jobList = document.querySelector('#jobList');
  const courseList = document.querySelector('#courseList');
  
  if (specId === 'all') {
    renderCards('#jobList', JOBS);
    renderCards('#courseList', COURSES);
    return;
  }

  const specialtyAr = SPECIALTIES.find(s => s.id === specId)?.label || '';
  const levelAr = levelId === 'tech' ? 'فني' : levelId === 'eng' ? 'مهندس' : '';

  // حالة التحميل
  const loadingHTML = `<div class="loading"><div class="spinner"></div>جاري البحث في السوق...</div>`;
  jobList.innerHTML = loadingHTML;
  courseList.innerHTML = loadingHTML;

  const liveJobs = await fetchLiveData('jobs', specialtyAr, levelAr);
  const liveCourses = await fetchLiveData('courses', specialtyAr, levelAr);

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