// radar-client.js  → استبدل به ملف fetchLiveData القديم (الذي يستخدم pollinations)

export async function fetchLiveData(type, specialty, level) {
  const q = new URLSearchParams({ type, specialty, level });
  const res = await fetch('/api/radar?' + q);
  if (!res.ok) throw new Error('radar failed');
  return (await res.json()).items;
}

// --- عرض نتائج الرادار في main.js ---
export function renderRadar(items, type, el) {
  if (!items.length) { el.innerHTML = '<p>لم نجد نتائج موثّقة حالياً.</p>'; return; }
  el.innerHTML = items.map((i) => `
    <div class="card">
      <span class="badge">${type === 'jobs' ? (i.source || 'إعلان') : '✓ ' + (i.accreditor || i.provider)}</span>
      <h3>${i.title}</h3>
      <p>${type === 'jobs' ? `${i.company || ''} · ${i.city || ''}` : (i.provider || '')}</p>
      ${i.posted ? `<p>تاريخ الإعلان: ${i.posted}</p>` : ''}
      <a class="btn-card" href="${i.link}" target="_blank" rel="noopener">فتح الإعلان الأصلي</a>
    </div>`).join('');
}

// --- في بيانات الدورات: أضف حقل الجهة المعتمدة لكل دورة ---
// accreditor: 'TVTC' | 'SCE' | 'ICC' | 'PMI' ... أو null إذا غير معتمدة رسمياً
// ثم في الفلترة:
//   const TRUSTED_ONLY = true;
//   filteredCourses = verifiedCourses.filter(c => !TRUSTED_ONLY || c.accreditor);
// أمثلة:
//   sce-cpd  → accreditor: 'الهيئة السعودية للمهندسين'
//   sbc      → accreditor: 'ICC'
//   esi-*    → accreditor: null   (تحقق من اعتماد المعهد من المؤسسة قبل إظهارها)
