@import url('https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;900&display=swap');
:root{--bg:#f3f8f5;--sf:#fff;--sf2:#eaf4ee;--tx:#10281e;--mt:#53705f;--bd:#d6e6dc;--ac:#16a34a;--ac2:#0f766e;--on:#fff;--glow:#c9f1d8}
@media (prefers-color-scheme:dark){:root{--bg:#0d2b20;--sf:#12372a;--sf2:#184a36;--tx:#f0fdf4;--mt:#a7d8bd;--bd:#245a43;--ac:#4ade80;--ac2:#2dd4bf;--on:#0d2b20;--glow:#1f6b4b}}
*{box-sizing:border-box}
html{scroll-behavior:smooth}
body{margin:0;background:radial-gradient(900px 300px at 80% -10%,var(--glow),transparent) no-repeat,var(--bg);color:var(--tx);font-family:Cairo,system-ui,sans-serif;line-height:1.7;-webkit-font-smoothing:antialiased}
.w{max-width:1120px;margin:auto;padding:0 18px}
header{position:sticky;top:0;z-index:20;background:color-mix(in srgb,var(--bg) 88%,transparent);backdrop-filter:blur(10px);border-bottom:1px solid var(--bd)}
nav{display:flex;justify-content:space-between;align-items:center;height:60px}
.logo{font-weight:900;font-size:21px;display:flex;gap:9px;align-items:center;color:var(--tx);text-decoration:none}
.logo i{width:32px;height:32px;border-radius:10px;background:linear-gradient(135deg,var(--ac),var(--ac2));display:grid;place-items:center;color:var(--on);font-style:normal}
.btn{display:inline-block;border:0;border-radius:12px;padding:11px 20px;font:700 14.5px Cairo,sans-serif;cursor:pointer;text-decoration:none;background:var(--ac);color:var(--on);text-align:center;transition:.2s}
.btn:hover{filter:brightness(1.08)}.btn.o{background:transparent;color:var(--tx);border:1px solid var(--bd)}.btn:disabled{opacity:.6;cursor:wait}
.hero{padding:48px 0 12px}
.tag{display:inline-flex;gap:8px;align-items:center;background:var(--sf);border:1px solid var(--bd);border-radius:99px;padding:4px 14px;font-size:13px;color:var(--mt)}
.dot{width:8px;height:8px;border-radius:50%;background:var(--ac);animation:p 1.6s infinite}@keyframes p{50%{opacity:.3}}
h1{font-size:clamp(30px,5.4vw,52px);line-height:1.25;margin:14px 0;font-weight:900}
h1 span{background:linear-gradient(90deg,var(--ac),var(--ac2));-webkit-background-clip:text;background-clip:text;color:transparent}
.hero p{color:var(--mt);font-size:17px;max-width:600px;margin:0}
.panel{background:var(--sf);border:1px solid var(--bd);border-radius:20px;padding:18px;margin-top:26px;box-shadow:0 14px 40px -24px rgba(0,0,0,.4)}
.row{display:flex;align-items:center;gap:10px;flex-wrap:wrap;margin-bottom:12px}.row:last-child{margin:0}
.row label{font-size:13px;color:var(--mt);min-width:62px;font-weight:600}
.chip{border:1px solid var(--bd);background:transparent;color:var(--mt);border-radius:99px;padding:5px 15px;font:600 13.5px Cairo,sans-serif;cursor:pointer;transition:.15s}
.chip.on{background:var(--ac);color:var(--on);border-color:var(--ac)}
.sum{display:grid;grid-template-columns:repeat(3,1fr);gap:12px;margin:22px 0 4px}
.sum div{background:var(--sf2);border-radius:14px;padding:12px;text-align:center}.sum b{display:block;font-size:26px;color:var(--ac);line-height:1.2}.sum span{font-size:12.5px;color:var(--mt)}
section{padding:30px 0}
h2{font-size:22px;font-weight:900;margin:0 0 4px;display:flex;align-items:center;gap:10px}
h2::before{content:"";width:5px;height:22px;border-radius:4px;background:var(--ac)}
.sub{color:var(--mt);margin:0 0 18px;font-size:14.5px}
.grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(290px,1fr));gap:16px}
.card{background:var(--sf);border:1px solid var(--bd);border-radius:18px;padding:18px;display:flex;flex-direction:column;gap:10px;transition:.2s}
.card:hover{transform:translateY(-4px);border-color:var(--ac)}
.card h3{margin:0;font-size:17px;line-height:1.45}.card p{margin:0;color:var(--mt);font-size:13.5px}
.top{display:flex;justify-content:space-between;align-items:center;gap:8px}
.bd{background:color-mix(in srgb,var(--ac) 16%,transparent);color:var(--ac);border-radius:99px;padding:2px 12px;font-size:12px;font-weight:700}
.vf{font-size:12px;color:var(--ac2);font-weight:700}
.sk{display:flex;flex-wrap:wrap;gap:6px}.sk span{background:var(--sf2);border-radius:8px;padding:2px 10px;font-size:12px;color:var(--mt)}
.bar{height:7px;border-radius:9px;background:var(--bd);overflow:hidden}.bar i{display:block;height:100%;background:linear-gradient(90deg,var(--ac),var(--ac2))}
.dm{display:flex;justify-content:space-between;font-size:12.5px;color:var(--mt);margin-bottom:4px}
.pr{font-size:13px;font-weight:700}
.card .btn{margin-top:auto}
.radar{background:linear-gradient(135deg,var(--sf2),var(--sf));border:1px dashed var(--ac);border-radius:22px;padding:26px 20px}
.radar h3{margin:0 0 6px;font-size:21px;font-weight:900}.radar>p{color:var(--mt);margin:0 0 16px}
.acts{display:flex;gap:10px;flex-wrap:wrap;margin-bottom:16px}
.msg{padding:14px;border-radius:12px;background:var(--sf);border:1px solid var(--bd);color:var(--mt);font-size:14px}
.empty{color:var(--mt);padding:20px;border:1px dashed var(--bd);border-radius:14px}
.spin{display:inline-block;width:14px;height:14px;border:2px solid var(--bd);border-top-color:var(--ac);border-radius:50%;animation:s .8s linear infinite;vertical-align:middle;margin-inline-end:8px}@keyframes s{to{transform:rotate(360deg)}}
footer{border-top:1px solid var(--bd);padding:22px 0;color:var(--mt);font-size:13.5px;text-align:center;margin-top:20px}
