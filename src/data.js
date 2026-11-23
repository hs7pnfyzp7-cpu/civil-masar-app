export const jobPaths = [
  { category: 'الهندسة المدنية', title: 'مهندس مدني وإدارة مشاريع', demand: 88, skills: ['إدارة العقود', 'الموقع', 'الكميات', 'إدارة المخاطر'], workplaces: 'شركات المقاولات، المشاريع الكبرى، وإدارة الأصول' },
  { category: 'الهندسة المعمارية', title: 'مهندس معماري وBIM', demand: 84, skills: ['BIM', 'Revit', 'التنسيق الرقمي', 'قراءة المخططات'], workplaces: 'المكاتب الاستشارية، المطورون، وشركات التصميم' },
  { category: 'الهندسة الكهربائية', title: 'مهندس كهرباء وتحكم صناعي', demand: 86, skills: ['التحكم الصناعي', 'جودة القدرة', 'الأتمتة', 'المعايير'], workplaces: 'المصانع، الطاقة، المياه، والقطاعات الصناعية' },
  { category: 'الهندسة الصناعية', title: 'مهندس صناعي وجودة ومخاطر', demand: 91, skills: ['تحسين العمليات', 'تقييم المخاطر', 'التدقيق', 'استمرارية الأعمال'], workplaces: 'المصانع، المشاريع، المرافق، والجهات التشغيلية' },
  { category: 'الهندسة البيئية', title: 'مهندس بيئي واستدامة', demand: 79, skills: ['الاستدامة', 'الامتثال البيئي', 'التقارير', 'التعدين'], workplaces: 'الطاقة، الاستشارات، والمشاريع البيئية' },
  { category: 'هندسة التعدين', title: 'مهندس تعدين واستدامة تشغيلية', demand: 77, skills: ['التعدين', 'السلامة', 'الاستدامة', 'إدارة العمليات'], workplaces: 'شركات التعدين، الطاقة، والمشاريع الاستخراجية' }
];

export const verifiedCourses = [
  { id: 'esi-sbc201', title: 'كود البناء السعودي العام SBC201', short: 'دورة 20 ساعة في متطلبات كود البناء السعودي العام.', category: 'كود وجودة', provider: 'معهد علوم الهندسة العالي', certificate: 'شهادة حضور من المعهد', price: 'بطلب عرض سعر', url: 'https://esi.edu.sa/courses/code-sbc201/', skills: ['كود البناء السعودي', 'قراءة المخططات', 'الجودة'], verified: true },
  { id: 'esi-concrete-quality', title: 'مراقبة جودة الخرسانة', short: 'دورة في فحص الخرسانة ومراقبة جودتها في الموقع والمختبر.', category: 'كود وجودة', provider: 'معهد علوم الهندسة العالي', certificate: 'شهادة حضور', price: 'بطلب عرض سعر', url: 'https://esi.edu.sa/courses/', skills: ['ضبط الجودة', 'فحص الخرسانة'], verified: true },
  { id: 'esi-supervision', title: 'طرق الإشراف على المشاريع الهندسية', short: 'دورة 20 ساعة في الإشراف على مواقع التنفيذ.', category: 'موقع وتنفيذ', provider: 'معهد علوم الهندسة العالي', certificate: 'شهادة حضور', price: 'أونلاين 1400 ريال · حضوري 2800 ريال', url: 'https://esi.edu.sa/courses/supervising-construction-sites/', skills: ['الإشراف على الموقع', 'التنفيذ'], verified: true },
  { id: 'esi-civil3d', title: 'أوتوكاد Civil 3D', short: 'دورة 20 ساعة في تصميم الطرق والتسويات والرفع المساحي.', category: 'موقع وتنفيذ', provider: 'معهد علوم الهندسة العالي', certificate: 'شهادة حضور', price: 'أونلاين 1096 ريال · حضوري 2296 ريال', url: 'https://esi.edu.sa/courses/civil/', skills: ['المساحة والرفع', 'الطرق'], verified: true },
  { id: 'esi-primavera', title: 'إدارة المشاريع باستخدام بريمافيرا P6', short: 'دورة 20 ساعة في الجدولة وتحميل الموارد والقيمة المكتسبة.', category: 'تخطيط وعقود', provider: 'معهد علوم الهندسة العالي', certificate: 'شهادة حضور', price: 'أونلاين 1500 ريال', url: 'https://esi.edu.sa/courses/advanced-primavera/', skills: ['التخطيط', 'الجدولة', 'Primavera'], verified: true },
  { id: 'sbc', title: 'Saudi Building Code 201 – Essentials', short: 'تدريب رسمي من ICC على أساسيات كود البناء السعودي.', category: 'موقع وتنفيذ', provider: 'ICC Learning Center', certificate: 'دورة رسمية مع CEUs', price: '350 دولار', url: 'https://learn.iccsafe.org/ui/catalog/394', skills: ['SBC 201', 'تطبيق الكود'], verified: true },
  { id: 'sce-cpd', title: 'دورات الهيئة السعودية للمهندسين', short: 'بوابة رسمية لاختيار دورات التطوير المهني المستمر.', category: 'موقع وتنفيذ', provider: 'الهيئة السعودية للمهندسين', certificate: 'شهادة مشاركة', price: 'يختلف حسب الدورة', url: 'https://training.saudieng.sa/', skills: ['التطوير المهني'], verified: true }
];

export const courseTrackRules = {
  'esi-sbc201': { paths: ['الهندسة المدنية', 'الهندسة المعمارية'], levels: ['فني', 'مهندس'] },
  'esi-concrete-quality': { paths: ['الهندسة المدنية'], levels: ["فني"] },
  'esi-supervision': { paths: ['الهندسة المدنية', 'الهندسة المعمارية'], levels: ['فني', 'مهندس'] },
  'esi-civil3d': { paths: ['الهندسة المدنية'], levels: ["فني", "مهندس"] },
  'esi-primavera': { paths: ['الهندسة المدنية', 'الهندسة المعمارية', 'الهندسة الصناعية'], levels: ['مهندس'] },
  'sbc': { paths: ['الهندسة المدنية'], levels: ['فني', 'مهندس'] },
  'sce-cpd': { paths: ['الهندسة المدنية', 'الهندسة المعمارية', 'الهندسة الكهربائية', 'الهندسة الميكانيكية'], levels: ['فني', 'مهندس'] }
};

export const professionalTrackData = {
  'الهندسة المدنية': {
    'فني': { lead: 'مسار التنفيذ والضبط الميداني والأعمال المساحية', roles: [{ title: "فني هندسة مدنية", demand: 86, skills: ["قراءة المخططات", "متابعة التنفيذ", "تقارير الموقع"] }, { title: "مراقب موقع", demand: 82, skills: ["مطابقة الأعمال", "توجيه العمالة", "السلامة"] }] },
    'مهندس': { lead: 'مسار التنفيذ والبنية التحتية وإدارة المشاريع', roles: [{ title: "مهندس موقع", demand: 89, skills: ["الإشراف على التنفيذ", "تنسيق المقاولين"] }, { title: "مهندس مدني", demand: 87, skills: ["التصميم والمواصفات", "كود البناء", "AutoCAD"] }] }
  },
  'الهندسة المعمارية': {
    'فني': { lead: 'مسار الرسم المعماري والتوثيق الرقمي', roles: [{ title: "رسام معماري", demand: 80, skills: ["AutoCAD", "المخططات التنفيذية"] }] },
    'مهندس': { lead: 'مسار التصميم المعماري والتنسيق الرقمي', roles: [{ title: "مهندس معماري", demand: 85, skills: ["التصميم المعماري", "Revit"] }] }
  },
  // (أضفت لك جزء بسيط هنا للتوضيح، أنت انسخ باقي بياناتك اللي في الكود القديم هنا)
};