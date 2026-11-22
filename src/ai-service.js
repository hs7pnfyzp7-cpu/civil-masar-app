export async function fetchLiveData(type, specialtyAr, levelAr) {
  let prompt = "";
  
  if (type === 'jobs') {
    prompt = `أنت خبير توظيف سعودي. ابحث في الويب عن 4 وظائف شاغرة حالياً في السعودية لتخصص "${specialtyAr}" بمستوى "${levelAr}". 
    أرجع النتيجة كـ JSON فقط (بدون أي كلام إضافي أو علامات ماركداون)، بهذا الشكل بالضبط:
    [{"title":"اسم الوظيفة", "company":"الشركة", "city":"المدينة", "link":"رابط التقديم المباشر"}]`;
  } else {
    prompt = `أنت خبير تدريب سعودي. ابحث عن 4 دورات تدريبية معتمدة وموثوقة في السعودية لتخصص "${specialtyAr}" بمستوى "${levelAr}". 
    أرجع النتيجة كـ JSON فقط (بدون أي كلام إضافي أو علامات ماركداون)، بهذا الشكل بالضبط:
    [{"title":"اسم الدورة", "provider":"الجهة المانحة", "city":"المدينة", "link":"رابط التسجيل"}]`;
  }
  
  try {
    // استخدام نموذج بحث ذكي ومجاني
    const res = await fetch(`https://text.pollinations.ai/${encodeURIComponent(prompt)}?model=searchgpt`);
    let text = await res.text();
    
    // تنظيف النص للتأكد من أنه JSON فقط
    const start = text.indexOf('[');
    const end = text.lastIndexOf(']');
    if (start !== -1 && end !== -1) {
      text = text.substring(start, end + 1);
    }
    return JSON.parse(text);
  } catch (error) {
    console.error("AI Search Error:", error);
    return null; // في حال حدوث خطأ، نرجع null عشان الموقع يستخدم البيانات المحلية
  }
}