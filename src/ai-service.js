export async function fetchLiveData(type, specialtyAr, levelAr) {
  let prompt = "";
  
  if (type === 'jobs') {
    prompt = `أنت خبير توظيف سعودي صارم. ابحث في الويب عن 3 وظائف شاغرة حالياً في السعودية لتخصص "${specialtyAr}" بمستوى "${levelAr}". 
    الشروط الصارمة:
    1. لا تخترع معلومات أو روابط وهمية.
    2. الروابط يجب أن تكون حقيقية (مثل منصة جدارات، لينكدإن، أو موقع الشركة).
    3. إذا لم تجد رابطاً مباشراً، قم بتوليد رابط بحث حقيقي في منصة جدارات (https://www.jadarat.sa) يحتوي على مسمى الوظيفة.
    أرجع النتيجة كـ JSON فقط (بدون أي كلام إضافي أو علامات ماركداون)، بهذا الشكل بالضبط:
    [{"title":"اسم الوظيفة", "company":"الشركة", "city":"المدينة", "link":"رابط التقديم"}]`;
  } else {
    prompt = `أنت خبير تدريب سعودي صارم. ابحث عن 3 دورات تدريبية لتخصص "${specialtyAr}" بمستوى "${levelAr}". 
    الشروط الصارمة:
    1. يجب أن تكون الدورة معتمدة وموثوقة في السعودية فقط (مثل الهيئة السعودية للمهندسين، OSHA، PMI، أو المؤسسة العامة للتدريب التقني والمهني). ممنوع اقتراح شهادات مجهولة المصدر.
    2. الروابط يجب أن تكون حقيقية للمنصة المانحة للشهادة.
    3. إذا لم تجد رابطاً مباشراً، قم بتوليد رابط بحث حقيقي في جوجل يحتوي على اسم الدورة + كلمة "السعودية".
    أرجع النتيجة كـ JSON فقط (بدون أي كلام إضافي أو علامات ماركداون)، بهذا الشكل بالضبط:
    [{"title":"اسم الدورة", "provider":"الجهة المانحة", "city":"المدينة", "link":"رابط التسجيل"}]`;
  }
  
  try {
    const res = await fetch(`https://text.pollinations.ai/${encodeURIComponent(prompt)}?model=searchgpt`);
    let text = await res.text();
    
    const start = text.indexOf('[');
    const end = text.lastIndexOf(']');
    if (start !== -1 && end !== -1) {
      text = text.substring(start, end + 1);
    }
    return JSON.parse(text);
  } catch (error) {
    console.error("AI Search Error:", error);
    return null;
  }
}