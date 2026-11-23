import { jobPaths, verifiedCourses, courseTrackRules, professionalTrackData } from './data.js';

const app = document.querySelector('#app');

app.innerHTML = `
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Cairo:wght@400;700;900&display=swap');

    body, html {
      background-color: #ffffff !important;
      color: #111111 !important;
      font-family: 'Cairo', sans-serif !important;
      margin: 0; padding: 0;
      -webkit-font-smoothing: antialiased;
    }

    :root {
      --text-main: #111111;
      --text-muted: #666666;
      --border-color: #e5e5e5;
      --accent-green: #2e7d32;
    }

    * { box-sizing: border-box; }

    .container { max-width: 1000px; margin: 0 auto; padding: 0 20px; }

    /* الهيدر */
    .header {
      border-bottom: 1px solid var(--border-color);
      padding: 20px 0;
    }
    .logo {
      font-size: 24px;
      font-weight: 900;
      color: var(--text-main);
      text-decoration: none;
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
    .hero-illustration { width: 250px; flex-shrink: 0; }
    .hero-illustration svg { width: 100%; height: auto; }

    /* أداة البحث */
    .search-section { padding: 40px 0; border-bottom: 1px solid var(--border-color); }
    .search-box { display: flex; gap: 20px; align-items: flex-end; flex-wrap: wrap; }
    .input-group { flex: 1; min-width: 250px; }
    .input-group label { display: block; font-size: 14px; font-weight: 700; margin-bottom: 8px; }
    .input-group select {
      width: 100%; padding: 15px; border: 1px solid var(--text-main);
      font-family: 'Cairo', sans-serif; font-size: 16px; background: #fff; outline: none;
      cursor: pointer;
    }
    .btn-search {
      padding: 15px 30px; background: var(--text-main); color: #fff;
      border: 1px solid var(--text-main); font-family: 'Cairo', sans-serif;
      font-size: 16px; font-weight: 700; cursor: pointer; transition: 0.3s;
    }
    .btn-search:hover { background: #fff; color: var(--text-main); }

    /* الكروت */
    .grid {
      display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 30px;
      margin-top: 30px;
    }
    .card {
      border: 1px solid var(--border-color); padding: 30px;
      transition: 0.3s; background: #fff; display: flex; flex-direction: column;
      justify-content: space-between;
    }
    .card:hover { border-color: var(--text-main); }
    .card-category { font-size: 12px; font-weight: 700; color: var(--accent-green); margin-bottom: 10px; text-transform: uppercase; }
    .card h3 { font-size: 20px; font-weight: 900; margin-bottom: 10px; }
    .card .provider { font-size: 14px; color: var(--text-main); font-weight: 700; margin-bottom: 5px; }
    .card .details { font-size: 13px; color: var(--text-muted); margin-bottom: 15px; }
    .card .price { font-weight: 700; font-size: 14px; margin-bottom: 20px; }

    .btn-card {
      display: block; text-align: center; padding: 12px; background: #fff;
      border: 1px solid var(--text-main); color: var(--text-main);
      text-decoration: none; font-weight: 700; transition: 0.3s; margin-top: auto;
    }
    .btn-card:hover { background: var(--text-main); color: #fff; }

    @media (max-width: 768px) {
      .hero { flex-direction: column; text-align: center; }
      .hero-text h1 { font-size: 36px; }
    }
  </style>

  <header class="header">
    <div class="container">
      <a href="#" class="logo">مسارك للهندسة.</a>
    </div>
  </header>

  <main class="container">
    <section class="hero">
      <div class="hero-text">
        <h1>مسارك المهني يبدأ من هنا.</h1>
        <p>ابحث عن الوظائف الحقيقية، واقتنص الدورات المعتمدة في السوق السعودي.</p>
      </div>
      <div class="hero-illustration">
        <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M100 180V60L40 100V180H160V100L100 60Z" stroke="#111" stroke-width="4" stroke-linejoin="round"/>
          <path d="M80 180V140H120V180" stroke="#111" stroke-width="4"/>
          <circle cx="100" cy="40" r="15" stroke="#111" stroke-width="4"/>
          <path d="M100 55V60" stroke="#111" stroke-width="4"/>
          <path d="M85 30H115" stroke="#111" stroke-width="4"/>
          <path d="M100 25V15" stroke="#111" stroke-width="4"/>
          <path d="M20 180H180" stroke="#111" stroke-width="4"/>
          <rect x="140" y="120" width="30" height="20" stroke="#2e7d32" stroke-width="4"/>
        </svg>
      </div>
    </section>

    <section class="search-section">
      <h2 style="font-size: 24px; font-weight: 900; margin-bottom: 20px;">ابحث عن مسارك.</h2>
      <div class="search-box">
        <div class="input-group">
          <label>التخصص الهندسي</label>
          <select id="userSpecialty">
            <option value="all">كل التخصصات</option>
            ${Object.keys(professionalTrackData).map(sp => `<option value="${sp}">${sp}</option>`).join('')}
          </select>
        </div>
        <div class="input-group">
          <label>المستوى</label>
          <select id="userLevel">
            <option value="all">الكل (فني / مهندس)</option>
            <option value="فني">فني</option>
            <option value="مهندس">مهندس</option>
          </select>
        </div>
        <button id="applyProfileBtn" class="btn-search">اعرض النتائج</button>
      </div>
      
      <div id="resultsContainer"></div>
    </section>
  </main>

  <footer style="text-align: center; padding: 40px 0; font-size: 14px; color: #666; border-top: 1px solid var(--border-color);">
    © ${new Date().getFullYear()} مسارك للهندسة. جميع الحقوق محفوظة.
  </footer>
`;

// --- المنطق البرمجي للفلترة ---
document.querySelector('#applyProfileBtn').addEventListener('click', () => {
  const selectedSpecialty = document.querySelector('#userSpecialty').value;
  const selectedLevel = document.querySelector('#userLevel').value;
  const resultsContainer = document.querySelector('#resultsContainer');

  if (selectedSpecialty === 'all') {
    resultsContainer.innerHTML = '<p style="text-align:center; margin-top:20px; color:#666;">الرجاء اختيار تخصص لعرض النتائج.</p>';
    return;
  }

  // 1. فلترة الوظائف
  let jobsHTML = '';
  if (professionalTrackData[selectedSpecialty] && selectedLevel !== 'all') {
    const trackData = professionalTrackData[selectedSpecialty][selectedLevel];
    if (trackData) {
      jobsHTML = trackData.roles.map(role => `
        <div class="card">
          <div>
            <div class="card-category">وظيفة</div>
            <h3>${role.title}</h3>
            <p class="details">${role.skills.join(' • ')}</p>
            <p class="price" style="color: var(--accent-green);">نسبة الطلب: ${role.demand}%</p>
          </div>
          <a href="https://www.jadarat.sa" target="_blank" class="btn-card">قدم عبر جدارات</a>
        </div>
      `).join('');
    }
  } else {
    jobsHTML = '<p style="color:#666;">الرجاء اختيار المستوى (فني أو مهندس) لعرض الوظائف.</p>';
  }

  // 2. فلترة الدورات
  let coursesHTML = '';
  const filteredCourses = verifiedCourses.filter(course => {
    const rule = courseTrackRules[course.id];
    if (!rule) return false;
    if (selectedLevel !== 'all' && !rule.levels.includes(selectedLevel)) return false;
    return rule.paths.includes(selectedSpecialty);
  });

  if (filteredCourses.length > 0) {
    coursesHTML = filteredCourses.map(course => `
      <div class="card">
        <div>
          <div class="card-category">دورة معتمدة</div>
          <h3>${course.title}</h3>
          <p class="provider">${course.provider}</p>
          <p class="details">${course.short}</p>
          <p class="price">${course.price}</p>
        </div>
        <a href="${course.url}" target="_blank" class="btn-card">التفاصيل والتسجيل</a>
      </div>
    `).join('');
  } else {
    coursesHTML = '<p style="color:#666;">لا توجد دورات مطابقة حالياً.</p>';
  }

  // 3. عرض النتائج
  resultsContainer.innerHTML = `
    <h3 style="font-size: 20px; font-weight: 900; margin-top: 40px; margin-bottom: 10px; border-bottom: 2px solid #111; padding-bottom: 5px; display: inline-block;">الوظائف المتاحة</h3>
    <div class="grid">${jobsHTML}</div>
    
    <h3 style="font-size: 20px; font-weight: 900; margin-top: 40px; margin-bottom: 10px; border-bottom: 2px solid #111; padding-bottom: 5px; display: inline-block;">الدورات المعتمدة</h3>
    <div class="grid">${coursesHTML}</div>
  `;
});