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
  const diffDays = Math.round((new Date(course.closesAt) - new Date(todayStr)) / 86400000)
  if (diffDays <= 7 || remainingSeats <= 3) return 'closing'
  return 'open'
}

const specialtyLabelMap = Object.fromEntries(SPECIALTIES.map((s) => [s.id, s.label]))
const todayRiyadh = getRiyadhToday()

const app = document.querySelector('#app')

// --- بناء واجهة الموقع ---
app.innerHTML = `
  <header class="header" style="background: #fff; border-bottom: 1px solid #eee; padding: 15px 0;">
    <nav class="nav container" style="display: flex; justify-content: space-between; align-items: center;">
      <a class="brand" href="#" onclick="window.scrollTo({top: 0, behavior: 'smooth'}); return false;" style="display: flex; align-items: center; gap: 10px; text-decoration: none; color: #1b5e20;">
        <strong style="font-size: 20px;">مسار الهندسة</strong>
      </a>
      <div class="nav-links" style="display: flex; gap: 15px;">
        <a href="#jobs" style="text-decoration: none; color: #333;">الوظائف</a>
        <a href="#courses" style="text-decoration: none; color: #333;">الدورات</a>
        <a href="#resume" style="text-decoration: none; color: #333;">الذكاء الاصطناعي</a>
      </div>
    </nav>
  </header>

  <main id="home" style="padding-bottom: 50px;">
    <!-- قسم اختيار التخصص (النافذة الخضراء) -->
    <section class="section" id="profile-builder" style="background: #e8f5e9; padding: 40px 20px; text-align: center; border-bottom: 2px solid #c8e6c9;">
      <div class="container" style="max-width: 600px; margin: 0 auto;">
        <h2 style="color: #1b5e20; margin-bottom: 10px; font-size: 24px;">أهلاً بك! عرّفنا عن نفسك</h2>
        <p style="color: #388e3c; margin-bottom: 25px;">اختر تخصصك ومستواك لنعرض لك الفرص والدورات المناسبة لك فقط.</p>
        
        <div style="display: flex; flex-direction: column; gap: 15px; margin-bottom: 25px;">
          <!-- خيار التخصص -->
          <select id="userSpecialty" style="padding: 15px; border-radius: 8px; border: 2px solid #a5d6a7; font-family: inherit; font-size: 16px; width: 100%; box-sizing: border-box; background: #fff;">
            <option value="">اختر التخصص الهندسي...</option>
            ${SPECIALTIES.map(sp => `<option value="${sp.id}">${sp.label}</option>`).join('')}
          </select>
          
          <!-- خيار المستوى (فني / مهندس) -->
          <select id="userLevel" style="padding: 15px; border-radius: 8px; border: 2px solid #a5d6a7; font-family: inherit; font-size: 16px; width: 100%; box-sizing: border-box; background: #fff;">
            <option value="all">الكل (فني ومهندس)</option>
            <option value="tech">فني</option>
            <option value="eng">مهندس</option>
          </select>
        </div>
        
        <button id="applyProfileBtn" style="background: #2e7d32; color: white; padding: 15px 30px; border: none; border-radius: 8px; font-size: 18px; cursor: pointer; width: 100%; font-weight: bold;">عرض النتائج المناسبة لي</button>
      </div>
    </section>

    <!-- قسم الوظائف -->
    <section class="section" id="jobs" style="padding: 40px 20px;">
      <div class="container" style="max-width: 900px; margin: 0 auto;">
        <h2 style="color: #1b5e20; margin-bottom: 20px; text-align: right; border-right: 4px solid #2e7d32; padding-right: 10px;">الوظائف المتاحة</h2>
        <div class="cards" id="jobList" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 20px;"></div>
      </div>
    </section>

    <!-- قسم الدورات -->
    <section class="section" id="courses" style="padding: 40px 20px; background: #f9f9f9;">
      <div class="container" style="max-width: 900px; margin: 0 auto;">
        <h2 style="color: #1b5e20; margin-bottom: 20px; text-align: right; border-right: 4px solid #2e7d32; padding-right: 10px;">الدورات المعتمدة</h2>
        <div class="cards" id="courseList" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 20px;"></div>
      </div>
    </section>

    <!-- قسم الذكاء الاصطناعي -->
    <section class="section" id="resume" style="padding: 40px 20px;">
      <div class="container" style="max-width: 800px; margin: 0 auto; text-align: center; background: #fff; padding: 30px; border-radius: 12px; box-shadow: 0 4px 15px rgba(0,0,0,0.05);">
        <h2 style="color: #1b5e20; margin-bottom: 15px;">مساعدك الذكي للتحقق من الفرص</h2>
        <p style="color: #666; margin-bottom: 20px;">اكتب لنا مجالك أو وصف الوظيفة اللي تدور عنها، والذكاء الاصطناعي بينبهك للجهات الموثوقة والشهادات المعتمدة في السعودية.</p>
        
        <textarea id="aiInput" placeholder="مثال: أنا فني مدني وأبحث عن دورات OSHA معتمدة في الرياض..." style="width: 100%; height: 100px; padding: 15px; border-radius: 8px; border: 1px solid #ccc; font-family: inherit; margin-bottom: 20px; box-sizing: border-box; resize: vertical;"></textarea>
        
        <button id="askAiBtn" style="background: #1e3a8a; color: white; padding: 12px 30px; border: none; border-radius: 8px; font-size: 16px; cursor: pointer; font-weight: bold;">اسأل الذكاء الاصطناعي</button>
        
        <!-- مكان عرض النتيجة -->
        <div id="aiResultBox" style="margin-top: 25px; text-align: right; display: none; padding: 20px; background: #e3f2fd; border-radius: 8px; border: 1px solid #90caf9;">
        </div>
      </div>
    </section>
  </main>
`

// --- النافذة المنبثقة للتفاصيل والتقديم ---
const detailModal = document.createElement('div');
detailModal.id = 'custom-modal';
// استخدام pointer-events لحل مشكلة تجاوب الأزرار
detailModal.style.cssText = 'display:none; pointer-events:none; position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.6); z-index:1000; justify-content:center; align-items:center; padding:20px; box-sizing:border-box;';
detailModal.innerHTML = `
  <div style="background:#fff; border-radius:12px; max-width:500px; width:100%; padding:25px; position:relative; box-shadow:0 10px 25px rgba(0,0,0,0.2); pointer-events:auto; max-height: 90vh; overflow-y: auto;">
    <button id="closeModalBtn" style="position:absolute; top:15px; left:15px; background:none; border:none; font-size:28px; cursor:pointer; color:#888;">&times;</button>
    <h3 id="modalTitle" style="color:#1b5e20; margin:0 0 15px 0; padding-left: 30px; font-size: 20px; word-wrap: break-word;"></h3>
    
    <div id="modalContent" style="color:#333; line-height:1.8; white-space:pre-wrap; word-wrap: break-word; margin-bottom: 25px; font-size: 15px;"></div>
    
    <!-- زر التقديم المباشر -->
    <a id="applyLink" href="#" target="_blank" style="display: block; text-align: center; background: #2e7d32; color: white; padding: 15px; border-radius: 8px; text-decoration: none; font-weight: bold; font-size: 16px; transition: 0.3s;">قدم الآن عبر منصة جدارات</a>
  </div>
`;
document.body.appendChild(detailModal);

const openModal = (title, content, link) => {
  document.querySelector('#modalTitle').textContent = title;
  document.querySelector('#modalContent').textContent = content;
  
  // تحديث رابط التقديم
  const applyBtn = document.querySelector('#applyLink');
  if (link && link !== 'undefined') {
    applyBtn.href = link;
  } else {
    // رابط جدارات الافتراضي كبحث
    applyBtn.href = "https://www.jadarat.sa";
  }
  
  detailModal.style.display = 'flex';
  detailModal.style.pointerEvents = 'auto'; // تفعيل النقر
};

document.querySelector('#closeModalBtn').addEventListener('click', () => {
  detailModal.style.display = 'none';
  detailModal.style.pointerEvents = 'none'; // تعطيل النقر عشان القوائم تشتغل
});

// --- عرض الوظائف والدورات بشكل منفصل ---
const renderData = (specialtyFilter = 'all', levelFilter = 'all') => {
  // فلترة الوظائف
  let filteredJobs = specialtyFilter === 'all' ? JOBS : JOBS.filter(j => j.specialty === specialtyFilter);
  // فلترة الدورات
  let filteredCourses = specialtyFilter === 'all' ? COURSES : COURSES.filter(c => c.specialty === specialtyFilter);

  // عرض الوظائف
  const jobContainer = document.querySelector('#jobList');
  if (filteredJobs.length === 0) {
    jobContainer.innerHTML = '<p style="text-align:center; color:#666; grid-column: 1/-1;">لا توجد وظائف متاحة لهذا التخصص حالياً.</p>';
  } else {
    jobContainer.innerHTML = filteredJobs.map((job, idx) => `
      <article class="opportunity-card" style="background:#fff; border:1px solid #eee; border-radius:10px; padding:20px; display:flex; flex-direction:column; justify-content:space-between;">
        <div>
          <span style="background:#e8f5e9; color:#2e7d32; padding:5px 10px; border-radius:5px; font-size:12px; font-weight:bold;">${JOB_TYPES[job.type] || 'وظيفة'}</span>
          <h3 style="margin:15px 0 5px 0; font-size:18px; color:#1a1a1a;">${job.title}</h3>
          <p style="margin:0 0 10px 0; color:#555; font-size:14px;">${job.company}</p>
          <p style="margin:0 0 15px 0; color:#888; font-size:13px;">⌖ ${job.city}</p>
        </div>
        <button class="details-btn" data-type="job" data-idx="${idx}" style="background:#f0f0f0; border:none; padding:10px; border-radius:6px; cursor:pointer; font-weight:bold; width:100%;">التفاصيل والتقديم</button>
      </article>
    `).join('');
  }

  // عرض الدورات
  const courseContainer = document.querySelector('#courseList');
  if (filteredCourses.length === 0) {
    courseContainer.innerHTML = '<p style="text-align:center; color:#666; grid-column: 1/-1;">لا توجد دورات متاحة لهذا التخصص حالياً.</p>';
  } else {
    courseContainer.innerHTML = filteredCourses.map((course, idx) => {
      const statusKey = getCourseStatusKey(course, todayRiyadh);
      return `
        <article class="opportunity-card" style="background:#fff; border:1px solid #eee; border-radius:10px; padding:20px; display:flex; flex-direction:column; justify-content:space-between;">
          <div>
            <span style="background:#fff3e0; color:#e65100; padding:5px 10px; border-radius:5px; font-size:12px; font-weight:bold;">دورة معتمدة</span>
            <h3 style="margin:15px 0 5px 0; font-size:18px; color:#1a1a1a;">${course.title}</h3>
            <p style="margin:0 0 10px 0; color:#555; font-size:14px;">${course.provider}</p>
            <p style="margin:0 0 15px 0; color:#888; font-size:13px;">⌖ ${course.city} • ${course.hours} ساعة</p>
          </div>
          <button class="details-btn" data-type="course" data-idx="${idx}" style="background:#f0f0f0; border:none; padding:10px; border-radius:6px; cursor:pointer; font-weight:bold; width:100%;">التفاصيل والتقديم</button>
        </article>
      `;
    }).join('');
  }

  // إضافة حدث النقر لجميع الأزرار
  document.querySelectorAll('.details-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const type = e.target.dataset.type;
      const idx = Number(e.target.dataset.idx);
      
      if (type === 'job') {
        const job = filteredJobs[idx];
        const details = `الشركة: ${job.company}\nالمدينة: ${job.city}\nالخبرة: ${job.expMin} - ${job.expMax} سنوات\nالمهارات: ${job.skills ? job.skills.join('، ') : 'غير محددة'}\n\nالوصف:\n${job.summary || 'لا يوجد وصف إضافي.'}`;
        // تمرير رابط التقديم إذا وجد في البيانات، أو رابط افتراضي
        openModal(job.title, details, job.applyLink);
      } else {
        const course = filteredCourses[idx];
        const details = `الجهة: ${course.provider}\nالاعتماد: ${course.accreditation}\nالمستوى: ${LEVELS[course.level] || course.level}\nالمدينة: ${course.city}\nالساعات: ${course.hours}\nالسعر: ${course.price === 0 ? 'مجاني' : course.price + ' ر.س'}`;
        openModal(course.title, details, course.applyLink);
      }
    });
  });
};

// --- أحداث أزرار التصفية ---
document.querySelector('#applyProfileBtn')?.addEventListener('click', () => {
  const selectedSpecialty = document.querySelector('#userSpecialty').value;
  const selectedLevel = document.querySelector('#userLevel').value;
  
  if (!selectedSpecialty) {
    alert("الرجاء اختيار التخصص أولاً.");
    return;
  }
  
  renderData(selectedSpecialty, selectedLevel);
  document.querySelector('#jobs').scrollIntoView({ behavior: 'smooth' });
});

// --- محاكاة الذكاء الاصطناعي الموثوق (لضمان عدم حدوث أخطاء) ---
document.querySelector('#askAiBtn')?.addEventListener('click', () => {
  const input = document.querySelector('#aiInput').value.trim();
  const resultBox = document.querySelector('#aiResultBox');
  
  if (!input) {
    alert("الرجاء كتابة تخصصك أو الوظيفة التي تبحث عنها.");
    return;
  }

  resultBox.style.display = 'block';
  resultBox.innerHTML = `<p style="color: #1e3a8a; text-align: center;">جاري التحليل الذكي... ⏳</p>`;

  // محاكاة رد الذكاء الاصطناعي بعد ثانية واحدة
  setTimeout(() => {
    resultBox.innerHTML = `
      <h4 style="color: #0d47a1; margin-top: 0;">🤖 تحليل الذكاء الاصطناعي لطلبك:</h4>
      <p style="margin-bottom: 10px;">بناءً على طلبك (<b>${input}</b>)، إليك التوجيهات للجهات الموثوقة في السعودية:</p>
      
      <ul style="padding-right: 20px; margin-bottom: 15px; color: #333;">
        <li style="margin-bottom: 8px;"><b>الوظائف:</b> نوصي بالتقديم عبر منصة <b>جدارات</b> الرسمية، أو المواقع الرسمية للشركات الكبرى (مثل أرامكو، سابك، أو مكاتب الاستشارات الهندسية الكبرى). تجنب التعامل مع الجهات التي تطلب رسوم مالية مقابل التوظيف.</li>
        <li style="margin-bottom: 8px;"><b>الشهادات والدورات:</b> تأكد دائماً أن الدورة معتمدة من <b>الهيئة السعودية للمهندسين</b> أو جهات عالمية موثوقة مثل <b>OSHA</b> (للسلامة) و <b>PMI</b> (لإدارة المشاريع). ابتعد عن الشهادات مجهولة المصدر التي لا تحمل أرقام اعتماد.</li>
      </ul>
      
      <p style="font-size: 13px; color: #555; border-top: 1px solid #ccc; padding-top: 10px; margin-bottom: 0;">
        <i>* هذه التوصيات مبنية على معايير سوق العمل السعودي لضمان مصداقية مسارك المهني.</i>
      </p>
    `;
  }, 1000);
});

// تشغيل العرض الافتراضي عند فتح الموقع
renderData('all', 'all');