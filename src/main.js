import './styles.css';

const app = document.querySelector('#app');
app.innerHTML = `
<div class="hero">
<svg class="scene" viewBox="0 0 1200 700" preserveAspectRatio="xMidYMax slice" aria-hidden="true">
<defs><linearGradient id="sk" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1a0f0a"/><stop offset=".35" stop-color="#5a2e14"/><stop offset=".65" stop-color="#c8742c"/><stop offset="1" stop-color="#f4c47a"/></linearGradient>
<radialGradient id="sn"><stop offset="0" stop-color="#fff0c8"/><stop offset=".4" stop-color="#ffd48a" stop-opacity=".8"/><stop offset="1" stop-color="#ffb35a" stop-opacity="0"/></radialGradient></defs>
<rect width="1200" height="700" fill="url(#sk)"/>
<circle cx="860" cy="470" r="230" fill="url(#sn)"/>
<path d="M0 625V470H90L100 458H260L272 470H430L444 450H640L652 466H850L862 444H1040L1052 460H1200V625Z" fill="#7a421d" opacity=".7"/>
<path d="M0 625V520H120L132 508H300L312 520H520L534 500H700L712 514H900L912 496H1100L1112 510H1200V625Z" fill="#43220d"/>
<g transform="translate(0 420)" fill="#140b06"><path d="M250 205V120l7.5-16 7.5 16 7.5-16 7.5 16 7.5-16 7.5 16 7.5-16 7.5 16 7.5-16 7.5 16 7.5-16 7.5 16V205z"/><path d="M340 205V74l5-14 5 14 5-14 5 14 5-14 5 14 5-14 5 14 5-14 5 14V205z"/><path d="M390 205V140l7.5-14 7.5 14 7.5-14 7.5 14 7.5-14 7.5 14 7.5-14 7.5 14 7.5-14 7.5 14 7.5-14 7.5 14V205z"/>
<g fill="none" stroke="#140b06" stroke-width="4" stroke-linecap="round"><path d="M560 205C560 170 566 150 570 130"/><path d="M570 130C550 120 535 125 525 140M570 130C585 115 605 118 615 135M570 130C560 108 570 95 585 92M570 130C578 108 592 100 608 102"/></g>
<g transform="translate(770 52) scale(1.1)"><path d="M28 72C28 58 44 54 56 56C66 36 92 36 100 56L132 56C146 56 152 64 150 76L146 92L34 92Z"/><path d="M132 58C142 40 150 26 156 16L172 22C168 36 158 56 150 76Z"/><path d="M156 16C162 8 176 8 188 14C192 17 190 22 184 23L172 24Z"/><path d="M28 72Q18 80 22 102" fill="none" stroke="#140b06" stroke-width="4" stroke-linecap="round"/><rect x="38" y="88" width="9" height="52" rx="3"/><rect x="58" y="88" width="9" height="52" rx="3"/><rect x="124" y="88" width="9" height="52" rx="3"/><rect x="138" y="88" width="9" height="52" rx="3"/></g></g>
<path d="M0 700V590C200 568 380 592 560 602C760 614 960 576 1200 572V700Z" fill="#0c0805"/>
</svg>
<div class="w hc">
<div class="mb"><span>مسارك للهندسة</span><span>منصة المهندس السعودي</span><span>2026</span></div>
<h1>مسارك</h1>
<div class="hr"><div><p>وظائف هندسية من كل الجهات، ودورات معتمدة من جهات موثوقة فقط.</p><br><a class="btn" href="#pick">استكشف المسارات ←</a></div>
<div class="hs"><div><b id="nj">0</b><span>وظيفة</span></div><div><b id="nc">0</b><span>دورة معتمدة</span></div><div><b id="nd">0%</b><span>متوسط الطلب</span></div></div></div>
</div></div>

<div class="w">
<section id="pick"><div class="lab"><b>01</b><i></i>حدّد مسارك</div><h2>من أنت، وماذا تريد؟</h2><p class="sub">اختر تخصصك ومستواك لتتغير كل الصفحة وفق مسارك.</p>
<div class="gl pn"><div class="pk"><label>التخصص</label><div class="oc" id="sp"></div></div><div class="pk"><label>المستوى</label><div class="oc" id="lv"></div></div></div></section>

<div class="tabbar"><div class="seg" id="tb"></div></div>
<section id="jobs"><div class="lab"><b>02</b><i></i>الوظائف</div><h2>الأعلى طلباً</h2><p class="sub" id="lead"></p><div class="gd" id="jl"></div></section>

<section id="courses"><div class="sh"><div><div class="lab"><b>03</b><i></i>التأهيل</div><h2>دورات موثوقة</h2><p class="sub" id="csub"></p></div><div class="seg" id="tg"></div></div><div class="gd" id="cl"></div></section>

<section id="market"><div class="lab"><b>04</b><i></i>السوق</div><h2>نبض سوق العمل</h2><p class="sub">مستوى الطلب حسب التخصص.</p><div class="gd" id="mk"></div></section>

<section id="radar"><h2 class="big">الرادار الذكي</h2>
<div class="st"><div class="gl"><div class="tp"><span>01</span><i></i><span>يرصد</span></div><h3>من أي جهة</h3><p>جدارات ولينكدإن ومواقع الشركات.</p></div><div class="gl"><div class="tp"><span>02</span><i></i><span>يتحقق</span></div><h3>روابط مباشرة</h3><p>تفتح البحث الحي حسب مسارك.</p></div><div class="gl"><div class="tp"><span>03</span><i></i><span>يصفّي</span></div><h3>جهات موثوقة</h3><p>الدورات من نطاقات معتمدة فقط.</p></div><div class="gl"><div class="tp"><span>04</span><i></i><span>يعرض</span></div><h3>حسب مسارك</h3><p>تخصصك ومستواك في كل نتيجة.</p></div></div>
<div class="ca"><div class="gd" id="rl" style="margin-top:22px;text-align:right"></div></div></section>
</div>
<div class="najd"></div>
<div class="w"><footer><span>© 2026 مسارك للهندسة</span><span>وظائف · دورات · تأهيل</span></footer></div>
`;

var T={"الهندسة المدنية":{"فني":[["فني هندسة مدنية",86,["قراءة المخططات","متابعة التنفيذ"]],["مراقب موقع",82,["مطابقة الأعمال","السلامة"]]],"مهندس":[["مهندس موقع",89,["الإشراف على التنفيذ","تنسيق المقاولين"]],["مهندس مدني",87,["التصميم والمواصفات","AutoCAD"]]]},"الهندسة المعمارية":{"فني":[["رسام معماري",80,["AutoCAD","المخططات التنفيذية"]]],"مهندس":[["مهندس معماري",85,["التصميم المعماري","Revit"]]]},"الهندسة الكهربائية":{"فني":[["فني كهربائي",86,["التركيبات","قراءة المخططات"]]],"مهندس":[["مهندس كهرباء",87,["توزيع القدرة","مراجعة المواصفات"]]]}};
var C=[["كود البناء السعودي العام SBC201","كود وجودة","معهد علوم الهندسة العالي",null,"بطلب عرض سعر","https://esi.edu.sa/courses/code-sbc201/",["الهندسة المدنية","الهندسة المعمارية"],["فني","مهندس"]],["مراقبة جودة الخرسانة","كود وجودة","معهد علوم الهندسة العالي",null,"بطلب عرض سعر","https://esi.edu.sa/courses/",["الهندسة المدنية"],["فني"]],["طرق الإشراف على المشاريع الهندسية","موقع وتنفيذ","معهد علوم الهندسة العالي",null,"أونلاين 1400 ريال","https://esi.edu.sa/courses/supervising-construction-sites/",["الهندسة المدنية","الهندسة المعمارية"],["فني","مهندس"]],["أوتوكاد Civil 3D","موقع وتنفيذ","معهد علوم الهندسة العالي",null,"أونلاين 1096 ريال","https://esi.edu.sa/courses/civil/",["الهندسة المدنية"],["فني","مهندس"]],["بريمافيرا P6","تخطيط وعقود","معهد علوم الهندسة العالي",null,"أونلاين 1500 ريال","https://esi.edu.sa/courses/advanced-primavera/",["الهندسة المدنية","الهندسة المعمارية"],["مهندس"]],["Saudi Building Code 201 – Essentials","موقع وتنفيذ","ICC Learning Center","ICC","350 دولار","https://learn.iccsafe.org/ui/catalog/394",["الهندسة المدنية"],["فني","مهندس"]],["دورات الهيئة السعودية للمهندسين","التطوير المهني","الهيئة السعودية للمهندسين","الهيئة السعودية للمهندسين","يختلف حسب الدورة","https://training.saudieng.sa/",["الهندسة المدنية","الهندسة المعمارية","الهندسة الكهربائية"],["فني","مهندس"]]];
var M=[["مهندس مدني وإدارة مشاريع","الهندسة المدنية",88],["مهندس معماري وBIM","الهندسة المعمارية",84],["مهندس كهرباء وتحكم صناعي","الهندسة الكهربائية",86],["مهندس صناعي وجودة","الهندسة الصناعية",91],["مهندس بيئي واستدامة","الهندسة البيئية",79],["مهندس تعدين","هندسة التعدين",77]];
var s="all",l="all",tr=true,MV=[],$=function(i){return document.getElementById(i)};
function mkc(id,it,cur,cb){var e=$(id);e.innerHTML=it.map(function(x){return '<button class="ob" data-v="'+x[0]+'"><span class="oi">'+x[2]+'</span><b>'+x[1]+'</b><small>'+x[3]+'</small><i class="rc"><svg viewBox="0 0 12 12" width="12" height="12"><path d="M2.5 6.5l2.2 2.2 4.8-5" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg></i></button>'}).join("");function set(v){e.querySelectorAll(".ob").forEach(function(b){b.classList.toggle("on",b.dataset.v==v)})}e.onclick=function(ev){var b=ev.target.closest(".ob");if(!b)return;set(b.dataset.v);cb(b.dataset.v)};set(cur)}
function mk(id,it,cur,cb){var e=$(id);e.innerHTML='<i class="th"></i>'+it.map(function(x){return '<button data-v="'+x[0]+'">'+x[1]+'</button>'}).join("");function mv(){var b=e.querySelector("button.on");if(!b)return;var t=e.firstChild;t.style.width=b.offsetWidth+"px";t.style.transform="translateX("+b.offsetLeft+"px)"}function set(v){e.querySelectorAll("button").forEach(function(b){b.classList.toggle("on",b.dataset.v==v)});mv()}e.onclick=function(ev){var b=ev.target.closest("button");if(!b)return;set(b.dataset.v);cb(b.dataset.v)};set(cur);MV.push(mv)}
mkc("sp",[["all","كل التخصصات","🧭","عرض الكل"],["الهندسة المدنية","مدنية","🏗️","مواقع وبنية تحتية"],["الهندسة المعمارية","معمارية","📐","تصميم وBIM"],["الهندسة الكهربائية","كهربائية","⚡","أنظمة وتحكم"]],"all",function(v){s=v;draw()});
mkc("lv",[["all","كل المستويات","✨","فني ومهندس"],["فني","فني","🔧","تنفيذ وميدان"],["مهندس","مهندس","🎓","تصميم وإشراف"]],"all",function(v){l=v;draw()});
mk("tg",[["1","المعتمدة فقط"],["0","الكل"]],"1",function(v){tr=v=="1";draw()});
function showTab(v){["jobs","courses","market","radar"].forEach(function(id){$(id).classList.toggle("act",id==v)});rm()}
mk("tb",[["jobs","الوظائف"],["courses","الدورات"],["market","السوق"],["radar","الرادار"]],"jobs",showTab);showTab("jobs");
function rm(){MV.forEach(function(f){f()})}window.addEventListener("resize",rm);window.addEventListener("load",rm);if(document.fonts)document.fonts.ready.then(rm);
function tg(a){return '<div class="sk">'+a.map(function(x){return "<span>"+x+"</span>"}).join("")+"</div>"}
function draw(){
var R=[];Object.keys(T).forEach(function(a){["فني","مهندس"].forEach(function(b){if((s=="all"||s==a)&&(l=="all"||l==b))T[a][b].forEach(function(r){R.push(r.concat([a,b]))})})});
R.sort(function(x,y){return y[1]-x[1]});
$("lead").textContent=s=="all"?"من كل التخصصات":s;
$("jl").innerHTML=R.length?R.map(function(r){return '<div class="gl gc"><div class="tp"><span class="no"></span><i></i><span>'+r[3].replace("الهندسة ","")+" · "+r[4]+'</span></div><h3>'+r[0]+'</h3><div><div class="dm"><span>مستوى الطلب</span><b>'+r[1]+'%</b></div><div class="bar"><i style="width:'+r[1]+'%"></i></div></div>'+tg(r[2])+'<a class="btn o s" target="_blank" rel="noopener" href="https://www.jadarat.sa">قدّم عبر جدارات</a></div>'}).join(""):'<div class="empty">لا توجد وظائف مطابقة.</div>';
var F=C.filter(function(c){return(s=="all"||c[6].indexOf(s)>-1)&&(l=="all"||c[7].indexOf(l)>-1)&&(!tr||c[3])});
$("csub").textContent=tr?"معتمدة من جهات موثوقة فقط":"تشمل دورات غير معتمدة رسمياً، تحقق قبل التسجيل";
$("cl").innerHTML=F.length?F.map(function(c){return '<div class="gl gc"><div class="tp"><span class="no"></span><i></i><span class="'+(c[3]?"vf":"")+'">'+(c[3]?"✓ "+c[3]:"غير موثّقة بعد")+'</span></div><h3>'+c[0]+"</h3><p>"+c[2]+" · "+c[1]+'</p><p><b style="color:var(--tx)">'+c[4]+'</b></p><a class="btn o s" target="_blank" rel="noopener" href="'+c[5]+'">التفاصيل والتسجيل</a></div>'}).join(""):'<div class="empty">لا توجد دورات معتمدة مطابقة حالياً.</div>';
$("mk").innerHTML=M.filter(function(m){return s=="all"||m[1]==s}).map(function(m){return '<div class="gl gc"><div class="tp"><span class="no"></span><i></i><span>'+m[1]+'</span></div><h3>'+m[0]+'</h3><div><div class="dm"><span>الطلب</span><b>'+m[2]+'%</b></div><div class="bar"><i style="width:'+m[2]+'%"></i></div></div></div>'}).join("")||'<div class="empty">لا بيانات سوق لهذا التخصص بعد.</div>';
$("nj").textContent=R.length;$("nc").textContent=F.length;
$("nd").textContent=(R.length?Math.round(R.reduce(function(a,r){return a+r[1]},0)/R.length):0)+"%";
rm()}
function radarLinks(){var kw=(l=="فني"?"فني":"مهندس")+(s=="all"?"":" "+s.replace("الهندسة ","")),q=encodeURIComponent,u=[["لينكدإن","أحدث وظائف "+kw+" خلال أسبوع","https://www.linkedin.com/jobs/search/?keywords="+q(kw)+"&location="+q("Saudi Arabia")+"&f_TPR=r604800"],["بحث جوجل","إعلانات "+kw+" من كل المواقع","https://www.google.com/search?q="+q("وظائف "+kw+" السعودية")],["جدارات","المنصة الوطنية للتوظيف","https://www.jadarat.sa"],["✓ الهيئة السعودية للمهندسين","بوابة الدورات الرسمية","https://training.saudieng.sa/"],["✓ المؤسسة العامة للتدريب التقني والمهني","الدورات والبرامج المعتمدة","https://www.tvtc.gov.sa/"]];$("rl").innerHTML=u.map(function(x,i){return '<div class="gl gc"><div class="tp"><span class="no"></span><i></i><span class="'+(i>2?"vf":"")+'">'+(i>2?"دورات":"وظائف")+'</span></div><h3>'+x[0]+'</h3><p>'+x[1]+'</p><a class="btn o s" target="_blank" rel="noopener" href="'+x[2]+'">افتح البحث</a></div>'}).join("")}
var _d=draw;draw=function(){_d();radarLinks()};
draw();
