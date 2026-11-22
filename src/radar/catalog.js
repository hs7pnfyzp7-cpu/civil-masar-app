// Engineering-sector catalog shared by the browser app and the radar server.
// Dates are Riyadh calendar days (YYYY-MM-DD); statuses are computed at scan time.

export const SPECIALTIES = [
  { id: 'civil', label: 'الهندسة المدنية', short: 'مدني', market: 'civil' },
  { id: 'mechanical', label: 'الهندسة الميكانيكية', short: 'ميكانيكي', market: 'mechanical' },
  { id: 'electrical', label: 'الهندسة الكهربائية', short: 'كهربائي', market: 'electrical' },
  { id: 'architectural', label: 'الهندسة المعمارية', short: 'معماري', market: 'architectural' },
  { id: 'industrial', label: 'الهندسة الصناعية', short: 'صناعي', market: 'industrial' },
  { id: 'safety', label: 'السلامة المهنية OSHA', short: 'السلامة OSHA', market: 'hseqa' },
  { id: 'quality', label: 'ضبط الجودة QA/QC', short: 'الجودة QA/QC', market: 'hseqa' },
]

export const LEVELS = { beginner: 'مبتدئ', intermediate: 'متوسط', advanced: 'متقدم' }
export const MODES = { remote: 'عن بُعد', onsite: 'حضوري', hybrid: 'مدمج' }
export const JOB_TYPES = { full: 'دوام كامل', part: 'دوام جزئي', contract: 'عقد مشروع', coop: 'تدريب تعاوني' }
export const EXPERIENCE = { entry: 'حديث التخرج (0–2)', mid: 'متوسطة (3–5)', senior: 'خبير (6+)' }
export const COURSE_STATUS = {
  open: 'التسجيل مفتوح',
  closing: 'يغلق قريبًا',
  upcoming: 'يفتح قريبًا',
  closed: 'التسجيل مغلق',
}

export const REQUIREMENT_DIMENSIONS = [
  { id: 'field', label: 'الخبرة الميدانية' },
  { id: 'certs', label: 'الشهادات المهنية' },
  { id: 'software', label: 'البرمجيات الهندسية' },
  { id: 'english', label: 'اللغة الإنجليزية' },
  { id: 'sce', label: 'اعتماد الهيئة السعودية للمهندسين' },
  { id: 'safety', label: 'ثقافة السلامة' },
]

// Indicative demand indicators: share of monitored postings that ask for each skill/requirement.
export const MARKET = [
  {
    id: 'civil', label: 'مدني', fullLabel: 'الهندسة المدنية', demandIndex: 88, growth: 14,
    skills: [
      { name: 'التنفيذ والإشراف الميداني', pct: 92 },
      { name: 'حصر الكميات وPlanSwift وExcel', pct: 84 },
      { name: 'جودة الخرسانة وفحوصاتها', pct: 78 },
      { name: 'السلامة في المواقع الإنشائية', pct: 74 },
      { name: 'قراءة المخططات وAutoCAD', pct: 70 },
      { name: 'جدولة المشاريع Primavera P6', pct: 58 },
    ],
    requirements: { field: 90, certs: 62, software: 72, english: 55, sce: 80, safety: 76 },
  },
  {
    id: 'electrical', label: 'كهربائي', fullLabel: 'الهندسة الكهربائية', demandIndex: 81, growth: 11,
    skills: [
      { name: 'تمديدات وأنظمة الجهد المنخفض', pct: 86 },
      { name: 'لوحات التوزيع والاختبار والتشغيل', pct: 80 },
      { name: 'كود البناء السعودي SBC 401', pct: 68 },
      { name: 'أنظمة الإنذار والتيار الخفيف', pct: 71 },
      { name: 'AutoCAD Electrical وDIALux', pct: 63 },
      { name: 'الطاقة الشمسية الكهروضوئية', pct: 59 },
    ],
    requirements: { field: 82, certs: 66, software: 70, english: 60, sce: 84, safety: 72 },
  },
  {
    id: 'mechanical', label: 'ميكانيكي', fullLabel: 'الهندسة الميكانيكية', demandIndex: 79, growth: 9,
    skills: [
      { name: 'أنظمة التكييف والتهوية HVAC', pct: 88 },
      { name: 'شبكات السباكة ومكافحة الحريق', pct: 76 },
      { name: 'الصيانة الوقائية والتنبؤية', pct: 72 },
      { name: 'حسابات الأحمال وRevit MEP', pct: 64 },
      { name: 'اختبار وتشغيل الأنظمة', pct: 61 },
      { name: 'لحام وفحص الأنابيب', pct: 52 },
    ],
    requirements: { field: 84, certs: 64, software: 68, english: 58, sce: 82, safety: 70 },
  },
  {
    id: 'architectural', label: 'معماري', fullLabel: 'الهندسة المعمارية', demandIndex: 67, growth: 6,
    skills: [
      { name: 'Revit ونمذجة BIM', pct: 86 },
      { name: 'إعداد المخططات التنفيذية', pct: 77 },
      { name: 'التصميم الداخلي والتشطيبات', pct: 72 },
      { name: 'الكود السعودي والاشتراطات البلدية', pct: 70 },
      { name: 'الإظهار المعماري Lumion وEnscape', pct: 61 },
      { name: 'التنسيق مع تخصصات MEP', pct: 58 },
    ],
    requirements: { field: 60, certs: 48, software: 88, english: 62, sce: 78, safety: 45 },
  },
  {
    id: 'industrial', label: 'صناعي', fullLabel: 'الهندسة الصناعية', demandIndex: 72, growth: 12,
    skills: [
      { name: 'تحسين العمليات Lean Six Sigma', pct: 84 },
      { name: 'تخطيط الإنتاج وسلاسل الإمداد', pct: 79 },
      { name: 'تحليل البيانات Excel وPower BI', pct: 76 },
      { name: 'إدارة المخزون وأنظمة ERP/SAP', pct: 66 },
      { name: 'أنظمة الجودة ISO 9001', pct: 63 },
      { name: 'دراسة الوقت والحركة', pct: 58 },
    ],
    requirements: { field: 58, certs: 74, software: 80, english: 70, sce: 66, safety: 60 },
  },
  {
    id: 'hseqa', label: 'سلامة وجودة', fullLabel: 'السلامة والجودة (OSHA · QA/QC)', demandIndex: 85, growth: 17,
    skills: [
      { name: 'شهادات OSHA 30 أو NEBOSH', pct: 90 },
      { name: 'تقييم المخاطر وتصاريح العمل', pct: 82 },
      { name: 'خطط الفحص والاختبار ITP', pct: 77 },
      { name: 'توثيق الجودة NCR وISO 9001', pct: 74 },
      { name: 'فحوصات الخرسانة والتربة', pct: 69 },
      { name: 'التحقيق في الحوادث', pct: 61 },
    ],
    requirements: { field: 86, certs: 92, software: 52, english: 64, sce: 58, safety: 95 },
  },
]

export const COURSES = [
  { id: 'c-civ-01', specialty: 'civil', title: 'الإشراف الميداني على المشاريع الإنشائية', provider: 'أكاديمية مسار الهندسة', accreditation: 'ساعات تطوير مهني CPD', level: 'intermediate', mode: 'hybrid', city: 'الرياض', hours: 40, opensAt: '2026-11-01', closesAt: '2026-12-20', startsAt: '2027-01-05', seats: 30, seatsTaken: 18, price: 1450 },
  { id: 'c-civ-02', specialty: 'civil', title: 'حصر الكميات باستخدام PlanSwift وExcel', provider: 'معهد البناء المتقدم', accreditation: 'ساعات تطوير مهني CPD', level: 'beginner', mode: 'remote', city: 'عن بُعد', hours: 24, opensAt: '2026-11-10', closesAt: '2026-11-27', startsAt: '2026-12-01', seats: 40, seatsTaken: 35, price: 950 },
  { id: 'c-civ-03', specialty: 'civil', title: 'فحوصات جودة الخرسانة والتربة في الموقع', provider: 'مختبرات الإنشاء التدريبية', accreditation: 'شهادة ACI Field Testing Technician', level: 'intermediate', mode: 'onsite', city: 'جدة', hours: 32, opensAt: '2026-12-15', closesAt: '2027-01-25', startsAt: '2027-02-08', seats: 20, seatsTaken: 0, price: 2200 },
  { id: 'c-civ-04', specialty: 'civil', title: 'تخطيط وجدولة المشاريع Primavera P6', provider: 'أكاديمية مسار الهندسة', accreditation: 'شريك تدريب معتمد PMI', level: 'advanced', mode: 'remote', city: 'عن بُعد', hours: 30, opensAt: '2026-10-01', closesAt: '2026-11-15', startsAt: '2026-11-20', seats: 35, seatsTaken: 35, price: 1800 },
  { id: 'c-mec-01', specialty: 'mechanical', title: 'تصميم وتشغيل أنظمة التكييف HVAC', provider: 'مركز التقنيات الميكانيكية', accreditation: 'ساعات تطوير مهني CPD', level: 'intermediate', mode: 'onsite', city: 'الدمام', hours: 36, opensAt: '2026-11-05', closesAt: '2027-01-10', startsAt: '2027-01-24', seats: 25, seatsTaken: 11, price: 2100 },
  { id: 'c-mec-02', specialty: 'mechanical', title: 'أنظمة مكافحة الحريق وفق NFPA', provider: 'معهد السلامة والحماية', accreditation: 'برنامج مبني على معايير NFPA', level: 'advanced', mode: 'hybrid', city: 'الرياض', hours: 28, opensAt: '2026-11-15', closesAt: '2026-11-29', startsAt: '2026-12-06', seats: 24, seatsTaken: 20, price: 2400 },
  { id: 'c-ele-01', specialty: 'electrical', title: 'لوحات التوزيع والاختبار والتشغيل', provider: 'مركز الطاقة والكهرباء التدريبي', accreditation: 'ساعات تطوير مهني CPD', level: 'intermediate', mode: 'onsite', city: 'الرياض', hours: 30, opensAt: '2026-11-01', closesAt: '2026-12-31', startsAt: '2027-01-12', seats: 22, seatsTaken: 9, price: 1900 },
  { id: 'c-ele-02', specialty: 'electrical', title: 'تصميم أنظمة الطاقة الشمسية الكهروضوئية', provider: 'أكاديمية الطاقة المتجددة', accreditation: 'برنامج مبني على معايير NABCEP', level: 'beginner', mode: 'remote', city: 'عن بُعد', hours: 20, opensAt: '2027-01-05', closesAt: '2027-02-15', startsAt: '2027-03-01', seats: 50, seatsTaken: 0, price: 1200 },
  { id: 'c-arc-01', specialty: 'architectural', title: 'نمذجة معلومات البناء BIM باستخدام Revit', provider: 'استوديو التصميم الرقمي', accreditation: 'شهادة Autodesk Certified Professional', level: 'intermediate', mode: 'hybrid', city: 'جدة', hours: 45, opensAt: '2026-11-01', closesAt: '2027-01-15', startsAt: '2027-01-30', seats: 28, seatsTaken: 14, price: 2600 },
  { id: 'c-arc-02', specialty: 'architectural', title: 'كود البناء السعودي للمعماريين', provider: 'أكاديمية مسار الهندسة', accreditation: 'ساعات تطوير مهني CPD', level: 'beginner', mode: 'remote', city: 'عن بُعد', hours: 16, opensAt: '2026-11-12', closesAt: '2026-12-28', startsAt: '2027-01-04', seats: 60, seatsTaken: 22, price: 700 },
  { id: 'c-ind-01', specialty: 'industrial', title: 'الحزام الأخضر Lean Six Sigma', provider: 'معهد التميز التشغيلي', accreditation: 'برنامج مبني على معايير ASQ', level: 'intermediate', mode: 'hybrid', city: 'الجبيل', hours: 40, opensAt: '2026-11-01', closesAt: '2026-12-15', startsAt: '2027-01-03', seats: 30, seatsTaken: 17, price: 3200 },
  { id: 'c-ind-02', specialty: 'industrial', title: 'تحليل بيانات الإنتاج باستخدام Power BI', provider: 'أكاديمية البيانات الصناعية', accreditation: 'ساعات تطوير مهني CPD', level: 'beginner', mode: 'remote', city: 'عن بُعد', hours: 18, opensAt: '2026-12-20', closesAt: '2027-02-01', startsAt: '2027-02-14', seats: 45, seatsTaken: 0, price: 850 },
  { id: 'c-saf-01', specialty: 'safety', title: 'OSHA 30-Hour للسلامة في قطاع الإنشاءات', provider: 'معهد السلامة والحماية', accreditation: 'منهج OSHA 30-Hour Construction', level: 'beginner', mode: 'onsite', city: 'الرياض', hours: 30, opensAt: '2026-11-01', closesAt: '2026-12-10', startsAt: '2026-12-14', seats: 30, seatsTaken: 21, price: 1650 },
  { id: 'c-saf-02', specialty: 'safety', title: 'تقييم المخاطر وإصدار تصاريح العمل', provider: 'مركز الصحة والسلامة المهنية', accreditation: 'ساعات تطوير مهني CPD', level: 'intermediate', mode: 'hybrid', city: 'الدمام', hours: 24, opensAt: '2026-11-18', closesAt: '2026-11-26', startsAt: '2026-11-30', seats: 25, seatsTaken: 23, price: 1300 },
  { id: 'c-saf-03', specialty: 'safety', title: 'دبلوم إدارة السلامة المتقدم', provider: 'مركز الصحة والسلامة المهنية', accreditation: 'برنامج مبني على منهج NEBOSH IGC', level: 'advanced', mode: 'onsite', city: 'جدة', hours: 80, opensAt: '2027-01-10', closesAt: '2027-03-01', startsAt: '2027-03-15', seats: 20, seatsTaken: 0, price: 5400 },
  { id: 'c-qua-01', specialty: 'quality', title: 'ضبط وتوكيد الجودة QA/QC في المشاريع', provider: 'أكاديمية مسار الهندسة', accreditation: 'ساعات تطوير مهني CPD', level: 'intermediate', mode: 'hybrid', city: 'الرياض', hours: 36, opensAt: '2026-11-01', closesAt: '2027-01-05', startsAt: '2027-01-19', seats: 32, seatsTaken: 15, price: 1750 },
  { id: 'c-qua-02', specialty: 'quality', title: 'نظام إدارة الجودة ISO 9001 – مدقق داخلي', provider: 'معهد التميز التشغيلي', accreditation: 'منهج ISO 9001:2015 Internal Auditor', level: 'beginner', mode: 'remote', city: 'عن بُعد', hours: 20, opensAt: '2026-11-08', closesAt: '2026-12-22', startsAt: '2027-01-02', seats: 50, seatsTaken: 27, price: 990 },
  { id: 'c-qua-03', specialty: 'quality', title: 'خطط الفحص والاختبار ITP وتقارير NCR', provider: 'مختبرات الإنشاء التدريبية', accreditation: 'ساعات تطوير مهني CPD', level: 'advanced', mode: 'onsite', city: 'الخبر', hours: 24, opensAt: '2026-10-05', closesAt: '2026-11-18', startsAt: '2026-11-23', seats: 20, seatsTaken: 20, price: 1600 },
]

export const JOBS = [
  { id: 'j-civ-01', specialty: 'civil', title: 'فني هندسة مدنية – إشراف ميداني', company: 'شركة إنجاز العمران', city: 'الرياض', type: 'full', expMin: 2, expMax: 4, salaryMin: 7000, salaryMax: 9500, postedAt: '2026-11-20', closesAt: '2027-01-20', skills: ['الإشراف الميداني', 'قراءة المخططات', 'السلامة'], summary: 'متابعة أعمال الخرسانة والهيكل الإنشائي وإعداد تقارير يومية للموقع.' },
  { id: 'j-civ-02', specialty: 'civil', title: 'فني حصر كميات', company: 'مكتب الأساس للاستشارات', city: 'جدة', type: 'full', expMin: 1, expMax: 3, salaryMin: 6000, salaryMax: 8000, postedAt: '2026-11-18', closesAt: '2027-01-10', skills: ['PlanSwift', 'Excel', 'جداول الكميات BOQ'], summary: 'حصر كميات الأعمال الإنشائية والتشطيبات وإعداد المستخلصات الشهرية.' },
  { id: 'j-civ-03', specialty: 'civil', title: 'فني مختبر خرسانة وتربة', company: 'مختبرات الجودة الإنشائية', city: 'الدمام', type: 'full', expMin: 0, expMax: 2, salaryMin: 5500, salaryMax: 7000, postedAt: '2026-11-21', closesAt: '2027-02-01', skills: ['اختبارات الهبوط', 'المكعبات الخرسانية', 'الدمك'], summary: 'تنفيذ الفحوصات الحقلية للخرسانة والتربة وتوثيق النتائج.' },
  { id: 'j-civ-04', specialty: 'civil', title: 'مهندس موقع مدني', company: 'مجموعة البنيان المتحدة', city: 'نيوم', type: 'contract', expMin: 5, expMax: 8, salaryMin: 14000, salaryMax: 19000, postedAt: '2026-11-12', closesAt: '2027-01-31', skills: ['إدارة الموقع', 'Primavera P6', 'التنسيق'], summary: 'إدارة أعمال البنية التحتية وتنسيق المقاولين من الباطن.' },
  { id: 'j-civ-05', specialty: 'civil', title: 'فني مساحة وأعمال طرق', company: 'مؤسسة خبرات الإنشاء', city: 'المدينة المنورة', type: 'contract', expMin: 3, expMax: 5, salaryMin: 7500, salaryMax: 9000, postedAt: '2026-11-09', closesAt: '2026-12-30', skills: ['Total Station', 'GPS', 'AutoCAD Civil 3D'], summary: 'أعمال الرفع المساحي وتوقيع المحاور ومتابعة مناسيب الطرق.' },
  { id: 'j-civ-06', specialty: 'civil', title: 'متدرب فني هندسة مدنية', company: 'شركة إنجاز العمران', city: 'الرياض', type: 'coop', expMin: 0, expMax: 1, salaryMin: 3000, salaryMax: 3500, postedAt: '2026-11-16', closesAt: '2027-01-15', skills: ['AutoCAD', 'Excel', 'العمل الميداني'], summary: 'برنامج تدريب تعاوني لمدة 6 أشهر في مواقع المشاريع السكنية.' },
  { id: 'j-mec-01', specialty: 'mechanical', title: 'فني تكييف وتبريد HVAC', company: 'شركة المناخ المتكامل', city: 'الرياض', type: 'full', expMin: 2, expMax: 5, salaryMin: 6500, salaryMax: 9000, postedAt: '2026-11-19', closesAt: '2027-01-25', skills: ['HVAC', 'الصيانة الوقائية', 'Chillers'], summary: 'تركيب وصيانة وحدات التكييف المركزي في المباني التجارية.' },
  { id: 'j-mec-02', specialty: 'mechanical', title: 'مهندس ميكانيكا MEP', company: 'مكتب الأفق للاستشارات الهندسية', city: 'جدة', type: 'full', expMin: 4, expMax: 7, salaryMin: 13000, salaryMax: 17000, postedAt: '2026-11-14', closesAt: '2027-01-14', skills: ['Revit MEP', 'HAP', 'الإشراف'], summary: 'مراجعة مخططات MEP والإشراف على التنفيذ والاختبار.' },
  { id: 'j-mec-03', specialty: 'mechanical', title: 'فني صيانة معدات صناعية', company: 'مصانع الخليج للتعبئة', city: 'الجبيل', type: 'full', expMin: 3, expMax: 6, salaryMin: 7000, salaryMax: 10000, postedAt: '2026-11-11', closesAt: '2027-01-05', skills: ['المضخات', 'الضواغط', 'CMMS'], summary: 'تنفيذ الصيانة الوقائية والإصلاحية لخطوط الإنتاج.' },
  { id: 'j-mec-04', specialty: 'mechanical', title: 'فني مكافحة حريق', company: 'شركة الحماية الشاملة', city: 'الخبر', type: 'part', expMin: 1, expMax: 3, salaryMin: 4000, salaryMax: 5500, postedAt: '2026-11-17', closesAt: '2026-12-31', skills: ['Sprinklers', 'NFPA', 'الاختبار'], summary: 'فحص واختبار شبكات الرش والإنذار في المنشآت التجارية.' },
  { id: 'j-ele-01', specialty: 'electrical', title: 'فني كهرباء مباني', company: 'شركة النور للمقاولات الكهربائية', city: 'مكة المكرمة', type: 'full', expMin: 1, expMax: 4, salaryMin: 5500, salaryMax: 7500, postedAt: '2026-11-20', closesAt: '2027-01-20', skills: ['تمديدات الجهد المنخفض', 'SBC 401', 'الاختبار'], summary: 'تنفيذ التمديدات الكهربائية وتركيب اللوحات في المشاريع السكنية.' },
  { id: 'j-ele-02', specialty: 'electrical', title: 'مهندس كهرباء – اختبار وتشغيل', company: 'مجموعة الطاقة المتقدمة', city: 'الرياض', type: 'contract', expMin: 5, expMax: 9, salaryMin: 15000, salaryMax: 21000, postedAt: '2026-11-13', closesAt: '2027-02-10', skills: ['Testing & Commissioning', 'MV Switchgear', 'ETAP'], summary: 'قيادة أعمال الاختبار والتشغيل لمحطات التحويل ولوحات الجهد المتوسط.' },
  { id: 'j-ele-03', specialty: 'electrical', title: 'فني أنظمة تيار خفيف', company: 'شركة الأنظمة الذكية', city: 'الدمام', type: 'full', expMin: 2, expMax: 4, salaryMin: 6000, salaryMax: 8000, postedAt: '2026-11-15', closesAt: '2027-01-12', skills: ['Fire Alarm', 'CCTV', 'شبكات البيانات'], summary: 'تركيب وبرمجة أنظمة الإنذار والمراقبة والشبكات.' },
  { id: 'j-ele-04', specialty: 'electrical', title: 'فني طاقة شمسية', company: 'أكوا للحلول الشمسية', city: 'تبوك', type: 'contract', expMin: 0, expMax: 2, salaryMin: 5000, salaryMax: 6500, postedAt: '2026-11-21', closesAt: '2027-02-15', skills: ['PV Systems', 'Inverters', 'السلامة الكهربائية'], summary: 'تركيب وصيانة الألواح الشمسية ضمن مشاريع الطاقة المتجددة.' },
  { id: 'j-arc-01', specialty: 'architectural', title: 'رسام معماري BIM', company: 'استوديو المدار للتصميم', city: 'الرياض', type: 'full', expMin: 2, expMax: 4, salaryMin: 7000, salaryMax: 9500, postedAt: '2026-11-18', closesAt: '2027-01-18', skills: ['Revit', 'AutoCAD', 'المخططات التنفيذية'], summary: 'إعداد النماذج والمخططات التنفيذية للمشاريع السكنية والتجارية.' },
  { id: 'j-arc-02', specialty: 'architectural', title: 'مهندس معماري – تصميم داخلي', company: 'دار الإبداع العمراني', city: 'جدة', type: 'part', expMin: 3, expMax: 6, salaryMin: 8000, salaryMax: 11000, postedAt: '2026-11-10', closesAt: '2026-12-25', skills: ['التصميم الداخلي', 'Enscape', 'جداول التشطيبات'], summary: 'تصميم الفراغات الداخلية وإعداد لوحات المواد والتشطيبات.' },
  { id: 'j-arc-03', specialty: 'architectural', title: 'فني معماري – رخص البناء', company: 'مكتب الأساس للاستشارات', city: 'الخبر', type: 'full', expMin: 1, expMax: 3, salaryMin: 5500, salaryMax: 7000, postedAt: '2026-11-08', closesAt: '2026-12-28', skills: ['الاشتراطات البلدية', 'منصة بلدي', 'AutoCAD'], summary: 'تجهيز مخططات رخص البناء ومتابعتها مع الجهات المختصة.' },
  { id: 'j-ind-01', specialty: 'industrial', title: 'مهندس تحسين عمليات', company: 'مصانع الخليج للتعبئة', city: 'الجبيل', type: 'full', expMin: 3, expMax: 6, salaryMin: 12000, salaryMax: 16000, postedAt: '2026-11-17', closesAt: '2027-01-30', skills: ['Lean', 'Six Sigma', 'تحليل البيانات'], summary: 'قيادة مبادرات خفض الهدر ورفع كفاءة خطوط الإنتاج.' },
  { id: 'j-ind-02', specialty: 'industrial', title: 'أخصائي تخطيط إنتاج', company: 'شركة الصناعات المتقدمة', city: 'ينبع', type: 'full', expMin: 1, expMax: 3, salaryMin: 7500, salaryMax: 10000, postedAt: '2026-11-19', closesAt: '2027-01-19', skills: ['SAP', 'Power BI', 'تخطيط الطلب'], summary: 'إعداد خطط الإنتاج الأسبوعية ومتابعة مؤشرات الأداء.' },
  { id: 'j-ind-03', specialty: 'industrial', title: 'متدرب هندسة صناعية', company: 'شركة الصناعات المتقدمة', city: 'الدمام', type: 'coop', expMin: 0, expMax: 1, salaryMin: 3000, salaryMax: 4000, postedAt: '2026-11-14', closesAt: '2027-01-10', skills: ['Excel', 'دراسة الوقت', 'ISO 9001'], summary: 'تدريب تعاوني في إدارة العمليات وسلاسل الإمداد.' },
  { id: 'j-saf-01', specialty: 'safety', title: 'مشرف سلامة مواقع إنشائية', company: 'مجموعة البنيان المتحدة', city: 'الرياض', type: 'full', expMin: 3, expMax: 6, salaryMin: 8500, salaryMax: 12000, postedAt: '2026-11-21', closesAt: '2027-02-05', skills: ['OSHA 30', 'تصاريح العمل', 'تقييم المخاطر'], summary: 'تطبيق خطة السلامة في الموقع وإجراء جولات التفتيش اليومية.' },
  { id: 'j-saf-02', specialty: 'safety', title: 'ضابط سلامة HSE', company: 'شركة الحماية الشاملة', city: 'نيوم', type: 'contract', expMin: 5, expMax: 10, salaryMin: 13000, salaryMax: 18000, postedAt: '2026-11-12', closesAt: '2027-01-31', skills: ['NEBOSH', 'التحقيق في الحوادث', 'التدريب'], summary: 'قيادة فريق السلامة في مشروع بنية تحتية كبير.' },
  { id: 'j-qua-01', specialty: 'quality', title: 'مراقب جودة QA/QC – أعمال مدنية', company: 'مختبرات الجودة الإنشائية', city: 'جدة', type: 'full', expMin: 2, expMax: 5, salaryMin: 8000, salaryMax: 11000, postedAt: '2026-11-20', closesAt: '2027-01-28', skills: ['ITP', 'NCR', 'فحوصات الخرسانة'], summary: 'استلام الأعمال وفق خطط الفحص والاختبار وإصدار تقارير عدم المطابقة.' },
  { id: 'j-qua-02', specialty: 'quality', title: 'مهندس ضبط جودة – MEP', company: 'مكتب الأفق للاستشارات الهندسية', city: 'الرياض', type: 'full', expMin: 6, expMax: 10, salaryMin: 15000, salaryMax: 20000, postedAt: '2026-11-07', closesAt: '2026-12-31', skills: ['ISO 9001', 'Method Statements', 'التدقيق'], summary: 'إدارة نظام الجودة ومراجعة طرق التنفيذ لأعمال الكهروميكانيك.' },
]
