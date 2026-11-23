export async function fetchLiveData(type, specialty, level) {
  const q = new URLSearchParams({ type, specialty, level });
  const res = await fetch('/api/radar?' + q);
  if (!res.ok) throw new Error('radar failed');
  return (await res.json()).items || [];
}

export function renderRadar(items, type, el) {
  if (!items.length) {
    el.innerHTML = '<p>لم نجد نتائج موثّقة حالياً.</p>';
    return;
  }
  el.innerHTML = items.map((i) => `
    <div class="card">
      <span class="badge">${type === 'jobs' ? (i.source || 'إعلان') : '✓ ' + (i.accreditor || i.provider)}</span>
      <h3>${i.title}</h3>
      <p>${type === 'jobs' ? `${i.company || ''} · ${i.city || ''}` : (i.provider || '')}</p>
      ${i.posted ? `<p>تاريخ الإعلان: ${i.posted}</p>` : ''}
      <a class="btn-card" href="${i.link}" target="_blank" rel="noopener">فتح الإعلان الأصلي</a>
    </div>`).join('');
}
