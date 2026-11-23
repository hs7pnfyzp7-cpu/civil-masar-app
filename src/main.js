import './styles.css';

// --- قاعدة البيانات الضخمة الخاصة بك ---
const verifiedCourses = [
  { id: 'esi-sbc201', title: 'كود البناء السعودي العام SBC201', short: 'دورة 20 ساعة في متطلبات كود البناء السعودي العام وتطبيقه في المشاريع.', category: 'كود وجودة', provider: 'معهد علوم الهندسة العالي للتدريب (الرياض)', certificate: 'شهادة حضور من المعهد', credentialType: 'دورة تدريبية في منشأة سعودية', price: 'بطلب عرض سعر من المعهد', url: 'https://esi.edu.sa/courses/code-sbc201/', skills: ['كود البناء السعودي', 'قراءة المخططات', 'الجودة'] },
  { id: 'esi-concrete-quality', title: 'التكنولوجيا الحديثة في مراقبة جودة الخرسانة', short: 'دورة 20 ساعة في فحص الخرسانة ومراقبة جودتها في الموقع والمختبر.', category: 'كود وجودة', provider: 'معهد علوم الهندسة العالي للتدريب (الرياض)', certificate: 'شهادة حضور من المعهد', price: 'بطلب عرض سعر من المعهد', url: 'https://esi.edu.sa/courses/', skills: ['ضبط الجودة', 'فحص الخرسانة'] },
  { id: 'esi-supervision', title: 'طرق الإشراف على المشاريع الهندسية', short: 'دورة 20 ساعة في الإشراف على مواقع التنفيذ.', category: 'موقع وتنفيذ', provider: 'معهد علوم الهندسة العالي للتدريب (الرياض)', certificate: 'شهادة حضور من المعهد', price: 'أونلاين 1400 ريال · حضوري 2800 ريال', url: 'https://esi.edu.sa/courses/supervising-construction-sites/', skills: ['الإشراف على الموقع', 'التنفيذ'] },
  { id: 'esi-civil3d', title: 'أوتوكاد Civil 3D', short: 'دورة 20 ساعة في تصميم الطرق والتسويات والرفع المساحي.', category: 'موقع وتنفيذ', provider: 'معهد علوم الهندسة العالي للتدريب (الرياض)', certificate: 'شهادة حضور من المعهد', price: 'أونلاين 1096 ريال · حضوري 2296 ريال', url: 'https://esi.edu.sa/courses/civil/', skills: ['المساحة والرفع', 'الطرق'] },
  { id: 'esi-primavera', title: 'إدارة المشاريع باستخدام بريمافيرا P6', short: 'دورة 20 ساعة في الجدولة وتحميل الموارد والقيمة المكتسبة.', category: 'تخطيط وعقود', provider: 'معهد علوم الهندسة العالي للتدريب (الرياض)', certificate: 'شهادة حضور من المعهد', price: 'أونلاين 1500 ريال', url: 'https://esi.edu.sa/courses/advanced-primavera/', skills: ['التخطيط', 'الجدولة', 'Primavera'] },
  { id: 'sbc', title: 'Saudi Building Code 201 – Essentials', short: 'تدريب رسمي من ICC على أساسيات كود البناء السعودي.', category: 'موقع وتنفيذ', provider: 'ICC Learning Center', certificate: 'دورة رسمية مع CEUs', price: '350 دولار', url: 'https://learn.iccsafe.org/ui/catalog/394', skills: ['SBC 201', 'تطبيق الكود'] },
  { id: 'sce-cpd', title: 'دورات الهيئة السعودية للمهندسين', short: 'بوابة رسمية لاختيار دورات التطوير المهني المستمر.', category: 'موقع وتنفيذ', provider: 'الهيئة السعودية للمهندسين', certificate: 'شهادة مشاركة', price: 'يختلف حسب الدورة', url: 'https://training.saudieng.sa/', skills: ['التطوير المهني'] }
];

const professionalTrackData = {
  'الهندسة المدنية': {
    'فني': { lead: 'مسار التنفيذ والضبط الميداني والأعمال المساحية', roles: [{ title: "فني هندسة مدنية", demand: 86, skills: ["قراءة المخططات", "متابعة التنفيذ", "تقارير الموقع"] }, { title: "مراقب موقع", demand: 82, skills: ["مطابقة الأعمال", "توجيه العمالة", "السلامة"] }] },
    'مهندس': { lead: 'مسار التنفيذ والبنية التحتية وإدارة المشاريع', roles: [{ title: "مهندس موقع", demand: 89, skills: ["الإشراف على التنفيذ", "تنسيق المقاولين"] }, { title: "مهندس مدني", demand: 87, skills: ["التصميم والمواصفات", "كود البناء", "AutoCAD"] }] }
  },
  'الهندسة المعمارية': {
    'فني': { lead: 'مسار الرسم المعماري والتوثيق الرقمي', roles: [{ title: "رسام معماري", demand: 80, skills: ["AutoCAD", "المخططات التنفيذية"] }] },
    'مهندس': { lead: 'مسار التصميم المعماري والتنسيق الرقمي', roles: [{ title: "مهندس معماري", demand: 85, skills: ["التصميم المعماري", "Revit"] }] }
  },
  'الهندسة الكهربائية': {
    'فني': { lead: 'مسار التركيبات والاختبارات', roles: [{ title: "فني كهربائي", demand: 86, skills: ["التركيبات", "قراءة المخططات"] }] },
    'مهندس': { lead: 'مسار الأنظمة الكهربائية', roles: [{ title: "مهندس كهرباء", demand: 87, skills: ["توزيع القدرة", "مراجعة المواصفات"] }] }
  }
};

const courseTrackRules = {
  'esi-sbc201': { paths: ['الهندسة المدنية', 'الهندسة المعمارية'], levels: ['فني', 'مهندس'] },
  'esi-concrete-quality': { paths: ['الهندسة المدنية'], levels: ["فني"] },
  'esi-supervision': { paths: ['الهندسة المدنية', 'الهندسة المعمارية'], levels: ['فني', 'مهندس'] },
  'esi-civil3d': { paths: ['الهندسة المدنية'], levels: ["فني", "مهندس"] },
  'esi-primavera': { paths: ['الهندسة المدنية', 'الهندسة المعمارية', 'الهندسة الصناعية'], levels: ['مهندس'] },
  'sbc': { paths: ['الهندسة المدنية'], levels: ['فني', 'مهندس'] },
  'sce-cpd': { paths: ['الهندسة المدنية', 'الهندسة المعمارية', 'الهندسة الكهربائية'], levels: ['فني', 'مهندس'] }
};

const app = document.querySelector('#app');

// --- التصميم (نفس هوية مشروعك القديم) ---
app.innerHTML = `
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Cairo:wght@400;700;900&display=swap');

    body, html {
      background-color: #12372A !important; /* لون الخلفية الداكن */
      color: #F0FDF4 !important; /* لون النص الفاتح */
      font-family: 'Cairo', sans-serif !important;
      margin: 0; padding: 0;
      -webkit-font-smoothing: antialiased;
    }

    * { box-sizing: border-box; }

    .container { max-width: 1100px; margin: 0 auto; padding: 20px; }

    /* الهيدر */
    .header {
      border-bottom: 1px solid #1F4E3D;
      padding: 20px 0;
      margin-bottom: 30px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .logo {
      font-size: 24px;
      font-weight: 900;
      color: #4ADE80; /* لون أخضر فاتح */
      text-decoration: none;
    }

    /* لوحة التحكم (الفلاتر) */
    .dashboard-filters {
      background-color: #1A4A36;
      border-radius: 12px;
      padding: 20px;
      display: flex;
      gap: 20px;
      margin-bottom: 30px;
      flex-wrap: wrap;
    }
    .filter-group {
      flex: 1;
      min-width: 200px;
    }
    .filter-group label {
      display: block;
      font-size: 14px;
      color: #A7F3D0;
      margin-bottom: 8px;
    }
    .filter-group select {
      width: 100%;
      padding: 12px;
      border-radius: 8px;
      border: 1px solid #4ADE80;
      background-color: #12372A;
      color: #FFF;
      font-family: 'Cairo', sans-serif;
      outline: none;
    }

    /* الأقسام */
    .section-title {
      font-size: 22px;
      font-weight: 900;
      color: #FFF;
      border-right: 4px solid #4ADE80;
      padding-right: 10px;
      margin-bottom: 20px;
    }

    /* شبكة الكروت */
    .grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
      gap: 20px;
      margin-bottom: 40px;
    }
    .card {
      background-color: #1A4A36;
      border: 1px solid #2E6B50;
      border-radius: 12px;
      padding: 20px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      transition: 0.3s;
    }
    .card:hover {
      border-color: #4ADE80;
      transform: translateY(-3px);
    }
    .card h3 { font-size: 18px; font-weight: 700; margin-bottom: 10px; color: #FFF; }
    .card p { font-size: 14px; color: #A7F3D0; margin-bottom: 10px; }
    .card .badge {
      display: inline-block;
      background-color: #4ADE80;
      color: #12372A;
      padding: 4px 10px;
      border-radius: 20px;
      font-size: 12px;
      font-weight: 700;
      margin-bottom: 15px;
    }
    .btn-card {
      display: block;
      text-align: center;
      padding: 12px;
      background-color: #4ADE80;
      color: #12372A;
      text-decoration: none;
      border-radius: 8px;
      font-weight: 700;
      transition: 0.3s;
      margin-top: auto;
    }
    .btn-card:hover { background-color: #22C55E; }

    /* الذكاء الاصطناعي */
    .ai-section {
      background-color: #1A4A36;
      padding: 30px;
      border-radius: 12px;
      text-align: center;
      border: 1px dashed #4ADE80;
      margin-bottom: 40px;
    }
    .btn-ai {
      background-color: #FFF;
      color: #12372A;
      padding: 15px 30px;
      border: none;
      border-radius: 8px;
      font-weight: 900;
      font-size: 16px;
      cursor: pointer;
      margin-top: 15px;
      transition: 0.3s;
    }
    .btn-ai:hover { background-color: #A7F3D0; }

    @media (max-width: 768px) {
      .dashboard-filters { flex-direction: column; }
      .grid { grid-template-columns: 1fr; }
    }
  </style>

  <div class="container">
    <header class="header">
      <a href="#" class="logo">مسارك للهندسة.</a>
    </header>

    <!-- الفلاتر في الأعلى (مفتوحة ومباشرة) -->
    <div class="dashboard-filters">
      <div class="filter-group">
        <label>التخصص</label>
        <select id="userSpecialty">
          <option value="all">كل التخصصات</option>
          ${Object.keys(professionalTrackData).map(sp => `<option value="${sp}">${sp}</option>`).join('')}
        </select>
      </div>
      <div class="filter-group">
        <label>المستوى</label>
        <select id="userLevel">
          <option value="all">الكل</option>
          <option value="فني">فني</option>
          <option value="مهندس">مهندس</option>
        </select>
      </div>
    </div>

    <!-- قسم الوظائف -->
    <div class="section-title">الوظائف حسب المسار</div>
    <div id="jobsGrid" class="grid"></div>

    <!-- قسم الدورات -->
    <div class="section-title">الدورات المعتمدة</div>
    <div id="coursesGrid" class="grid"></div>

    <!-- زر الذكاء الاصطناعي -->
    <div class="ai-section">
      <h3 style="color: #FFF; margin-bottom: 10px;">مساعد البحث الذكي</h3>
      <p style="color: #A7F3D0;">تبحث عن شيء غير موجود؟ دع الذكاء الاصطناعي يبحث لك في الويب.</p>
      <button id="aiSearchBtn" class="btn-ai">🔍 ابحث في الويب بالذكاء الاصطناعي</button>
      <div id="aiResult" style="margin-top: 20px; text-align: right; color: #FFF;"></div>
    </div>
  </div>
`;

// --- المنطق البرمجي (الفلترة الفورية) ---
const jobsGrid = document.querySelector('#jobsGrid');
const coursesGrid = document.querySelector('#coursesGrid');

const renderDashboard = () => {
  const specialty = document.querySelector('#userSpecialty').value;
  const level = document.querySelector('#userLevel').value;

  // 1. عرض الوظائف
  let jobsHTML = '';
  let coursesHTML = '';

  if (specialty !== 'all' && level !== 'all' && professionalTrackData[specialty] && professionalTrackData[specialty][level]) {
    // إذا اختار الكل
    const track = professionalTrackData[specialty][level];
    jobsHTML = track.roles.map(role => `
      <div class="card">
        <div>
          <span class="badge">طلب ${role.demand}%</span>
          <h3>${role.title}</h3>
          <p>المهارات: ${role.skills.join(' • ')}</p>
        </div>
        <a href="https://www.jadarat.sa" target="_blank" class="btn-card">قدم الآن (جدارات)</a>
      </div>
    `).join('');
  } else {
    // عرض كل الوظائف الافتراضية
    let allRoles = [];
    for (let sp in professionalTrackData) {
      for (let lvl in professionalTrackData[sp]) {
        allRoles.push(...professionalTrackData[sp][lvl].roles);
      }
    }
    jobsHTML = allRoles.slice(0, 6).map(role => `
      <div class="card">
        <div>
          <span class="badge">طلب ${role.demand}%</span>
          <h3>${role.title}</h3>
          <p>المهارات: ${role.skills.join(' • ')}</p>
        </div>
        <a href="https://www.jadarat.sa" target="_blank" class="btn-card">قدم الآن (جدارات)</a>
      </div>
    `).join('');
  }

  // 2. عرض الدورات
  let filteredCourses = verifiedCourses;
  if (specialty !== 'all' || level !== 'all') {
    filteredCourses = verifiedCourses.filter(course => {
      const rule = courseTrackRules[course.id];
      if (!rule) return false;
      if (specialty !== 'all' && !rule.paths.includes(specialty)) return false;
      if (level !== 'all' && !rule.levels.includes(level)) return false;
      return true;
    });
  }

  coursesHTML = filteredCourses.map(course => `
    <div class="card">
      <div>
        <span class="badge">${course.category}</span>
        <h3>${course.title}</h3>
        <p>${course.provider}</p>
        <p style="font-size:12px; color:#A7F3D0;">${course.price}</p>
      </div>
      <a href="${course.url}" target="_blank" class="btn-card">التفاصيل والتسجيل</a>
    </div>
  `).join('');

  jobsGrid.innerHTML = jobsHTML || '<p>لا توجد وظائف مطابقة.</p>';
  coursesGrid.innerHTML = coursesHTML || '<p>لا توجد دورات مطابقة.</p>';
};

// تشغيل الفلترة عند التغيير
document.querySelector('#userSpecialty').addEventListener('change', renderDashboard);
document.querySelector('#userLevel').addEventListener('change', renderDashboard);

// تشغيل مبدئي
renderDashboard();

// --- زر الذكاء الاصطناعي (البحث في الويب) ---
document.querySelector('#aiSearchBtn').addEventListener('click', async () => {
  const aiResult = document.querySelector('#aiResult');
  aiResult.innerHTML = '<p>جاري البحث في الويب... ⏳</p>';

  const specialty = document.querySelector('#userSpecialty').value;
  const level = document.querySelector('#userLevel').value;
  
  const prompt = `أنت خبير توظيف. ابحث في الويب عن وظائف شاغرة حالياً في السعودية لتخصص "${specialty}" بمستوى "${level}". أرجع النتيجة كـ JSON فقط: [{"title":"اسم الوظيفة", "company":"الشركة", "city":"المدينة", "link":"رابط التقديم"}]`;

  try {
    const res = await fetch(`https://text.pollinations.ai/${encodeURIComponent(prompt)}?model=searchgpt`);
    let text = await res.text();
    const start = text.indexOf('[');
    const end = text.lastIndexOf(']');
    if (start !== -1 && end !== -1) text = text.substring(start, end + 1);
    
    const jobs = JSON.parse(text);
    if(jobs.length > 0) {
      aiResult.innerHTML = jobs.map(j => `
        <div style="background:#12372A; padding:15px; border-radius:8px; margin-bottom:10px; border:1px solid #4ADE80;">
          <h4 style="color:#4ADE80;">${j.title}</h4>
          <p style="font-size:12px;">${j.company} - ${j.city}</p>
          <a href="${j.link}" target="_blank" style="color:#FFF; text-decoration:underline; font-size:12px;">رابط التقديم</a>
        </div>
      `).join('');
    } else {
      aiResult.innerHTML = '<p>لم يتم العثور على وظائف جديدة حالياً.</p>';
    }
  } catch (e) {
    aiResult.innerHTML = '<p>حدث خطأ في البحث، تأكد من اختيارك للتخصص.</p>';
  }
});