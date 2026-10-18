const $=s=>document.querySelector(s),esc=s=>String(s??'').replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const T={home:['Home','घर'],radar:['Radar','अवसर'],vault:['Vault','ज्ञान'],near:['5 km','आसपास'],packs:['Packs','पैक'],plan:['Planner','योजना'],jug:['Jugaad','जुगाड़'],
hi:['Namaste','नमस्ते'],speak:['Tap and speak: “open radar”, “ask neem”','बोलें: “अवसर खोलो”, “नीम पूछो”'],
offl:['Offline mode · text only, saved packs work','ऑफलाइन मोड · केवल टेक्स्ट, सेव पैक चलेंगे'],read:['Read aloud','सुनें'],save:['Save','सेव'],post:['Post','पोस्ट करें']};
const t=k=>T[k]?T[k][S.lang=='hi'?1:0]:k,L=o=>typeof o=='string'?o:(S.lang=='hi'&&o.hi)||o.en;
const SK=['farming','tailoring','mechanics','phone','cooking','teaching','craft','electrical'];
const SKH={farming:'खेती',tailoring:'सिलाई',mechanics:'मैकेनिक',phone:'फोन/कंप्यूटर',cooking:'खाना',teaching:'पढ़ाना',craft:'हस्तकला',electrical:'बिजली'};
let S={lang:'en',off:false,tab:'home',p:{name:'',village:'',age:'student',skills:[],hours:8,budget:1500},saved:[],votes:{},packs:{},done:{},
ideas:[{id:1,t:'Bicycle-pedal water pump',by:'Ramesh, 17',prob:'Diesel pump costs too much for 1-acre fields',mat:'Old cycle, PVC pipe, 20 L drum',cost:900,v:14},
{id:2,t:'Cow-dung & leaf plate press',by:'Sunita SHG',prob:'Plastic plates litter the mela',mat:'Hand press, sal leaves',cost:1800,v:22}],
vault:[{id:1,t:'Neem-ash grain storage',by:'Kamla Devi, 71',role:'Elder',tags:'neem ash grain storage pests wheat',x:'Mix one handful of dry neem leaves and a cup of sifted wood ash per 10 kg of grain. Store in a dry clay or metal bin, sealed. Check every 3 weeks.',ver:true},
{id:2,t:'Reading the first rain',by:'Hari Singh, 78',role:'Elder',tags:'rain monsoon sowing timing bajra',x:'Wait for the second good rain before sowing bajra. One early shower can sprout seeds that then dry out.',ver:false},
{id:3,t:'Indigo & turmeric natural dye',by:'Meena, textile artisan',role:'Expert',tags:'dye indigo turmeric cloth craft color',x:'Soak cloth in alum water for an hour. Simmer turmeric for yellow; dip in an indigo vat for blue; both together give green.',ver:true}],
near:[{t:'Need: tractor for 2 days, sowing',w:'Bhura Ram',km:1.2,k:'need'},{t:'Offer: sewing machine repair',w:'Imran',km:2.8,k:'offer'},{t:'Need: Class 10 maths tutor',w:'Geeta',km:0.6,k:'need'},{t:'Offer: millet laddoo bulk (50 kg)',w:'Jyoti SHG',km:4.1,k:'offer'},{t:'Need: solar lamp fitter',w:'School hub',km:3.4,k:'need'},{t:'Offer: smartphone help for elders',w:'Aman, 19',km:1.7,k:'offer'}],rad:5};
try{Object.assign(S,JSON.parse(localStorage.getItem('gs')||'{}'))}catch(e){}
const sv=()=>{try{localStorage.setItem('gs',JSON.stringify(S))}catch(e){}};
function toast(m){const e=$('#toast');e.textContent=m;e.classList.add('on');setTimeout(()=>e.classList.remove('on'),2400)}
function speak(x){try{speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(x);u.lang=S.lang=='hi'?'hi-IN':'en-IN';speechSynthesis.speak(u)}catch(e){toast('Voice not supported on this device')}}
function listen(cb,btn){const R=window.SpeechRecognition||window.webkitSpeechRecognition;if(!R)return toast('Voice input not supported here. Type instead.');
try{const r=new R();r.lang=S.lang=='hi'?'hi-IN':'en-IN';btn&&btn.classList.add('rec');r.onresult=e=>cb(e.results[0][0].transcript);r.onend=()=>btn&&btn.classList.remove('rec');r.onerror=()=>{btn&&btn.classList.remove('rec');toast('Could not hear. Try again.')};r.start()}catch(e){toast('Mic blocked')}}
const TABS=['home','radar','vault','near','packs','plan','jug'],IC={home:'',radar:'',vault:'',near:'',packs:'',plan:'',jug:''};
function go(x){S.tab=x;sv();R();scrollTo(0,0)}
function setLang(){S.lang=S.lang=='en'?'hi':'en';sv();R()}
function toggleOff(){S.off=!S.off;sv();R()}
function R(){document.documentElement.lang=S.lang;$('#lg').textContent=S.lang=='en'?'हिन्दी':'English';$('#of').textContent=S.off?'Offline':'Online';$('#of').className='chip'+(S.off?' on':'');
const b=$('#ban');b.style.display=S.off?'block':'none';b.textContent=t('offl');
$('#nav').innerHTML=TABS.map(k=>`<button class="${S.tab==k?'on':''}" onclick="go('${k}')"><span>${IC[k]}</span>${t(k)}</button>`).join('');
$('#app').innerHTML=V[S.tab]()}
/* ---------- HOME ---------- */
const OPP=[{id:'a',t:{en:'Solar technician training (PMKVY-style)',hi:'सोलर टेक्नीशियन प्रशिक्षण'},ty:'Training',sk:['electrical','mechanics'],ages:['youth','adult'],h:10,c:0,d:21,how:'Register at the nearest skill centre with Aadhaar and a passbook.'},
{id:'b',t:{en:'Millet value-add order for SHG',hi:'बाजरा उत्पाद ऑर्डर (SHG)'},ty:'Earn',sk:['farming','cooking'],ages:['youth','adult','elder'],h:6,c:500,d:9,how:'Ask your SHG leader to join the bulk order; packaging is shared.'},
{id:'c',t:{en:'Digital Seva helper at Common Service Centre',hi:'डिजिटल सेवा सहायक'},ty:'Job',sk:['phone'],ages:['youth','adult'],h:15,c:0,d:14,how:'Visit the CSC operator with two ID copies.'},
{id:'d',t:{en:'Artisan toolkit support (PM Vishwakarma-type)',hi:'कारीगर टूलकिट सहायता'},ty:'Scheme',sk:['craft','tailoring','mechanics'],ages:['youth','adult','elder'],h:4,c:0,d:30,how:'Apply through your gram panchayat or CSC.'},
{id:'e',t:{en:'Merit scholarship, Class 9–12',hi:'मेरिट छात्रवृत्ति कक्षा 9–12'},ty:'Scholarship',sk:['teaching'],ages:['student'],h:3,c:0,d:12,how:'Ask your school headmaster to upload the marksheet.'},
{id:'f',t:{en:'Village tutor for younger kids (paid by hub)',hi:'गाँव ट्यूटर (हब से भुगतान)'},ty:'Earn',sk:['teaching'],ages:['student','youth'],h:6,c:0,d:7,how:'Pick a Learning Pack and take 5 learners at the school hub.'},
{id:'g',t:{en:'School uniform stitching order',hi:'स्कूल यूनिफॉर्म सिलाई ऑर्डर'},ty:'Earn',sk:['tailoring'],ages:['youth','adult'],h:12,c:1500,d:16,how:'Quote per piece to the school committee.'},
{id:'h',t:{en:'Solar pump subsidy (PM-KUSUM-type)',hi:'सोलर पंप सब्सिडी'},ty:'Scheme',sk:['farming','electrical'],ages:['adult','elder'],h:3,c:0,d:40,how:'Apply via the agriculture office with land papers.'}];
function score(o){const p=S.p,m=o.sk.filter(s=>p.skills.includes(s)),r=[];let s=0;
if(m.length){s+=40*Math.min(1,m.length/1.2);r.push('Matches your skill: '+m.join(', '))}else r.push('New skill for you');
if(o.ages.includes(p.age)){s+=20;r.push('Open to your age group')}
if(+p.hours>=o.h){s+=20;r.push('Fits your '+p.hours+' hrs/week')}else r.push('Needs '+o.h+' hrs/week');
if(+p.budget>=o.c){s+=20;r.push(o.c?'Within budget (₹'+o.c+')':'No cost')}else r.push('Needs ₹'+o.c);
return{s:Math.round(s),r}}
const ranked=()=>OPP.map(o=>({...o,...score(o)})).sort((a,b)=>b.s-a.s);
function cmd(x){x=x.toLowerCase();const m={radar:/radar|अवसर|job|scholar/,vault:/vault|ask|ज्ञान|पूछ/,near:/near|5|आसपास/,packs:/pack|पैक|lesson|पाठ/,plan:/plan|career|योजना/,jug:/jugaad|जुगाड़|idea/};
for(const k in m)if(m[k].test(x)){if(k=='vault'){S.q=x.replace(/ask|पूछो|पूछ/g,'').trim()}go(k);return toast('→ '+t(k))}toast('Heard: '+x)}
const skChips=()=>SK.map(s=>`<span class="tag ${S.p.skills.includes(s)?'on':''}" role="button" tabindex="0" onclick="tg('${s}')" onkeydown="if(event.key=='Enter')tg('${s}')">${S.lang=='hi'?SKH[s]:s}</span>`).join('');
function tg(s){const a=S.p.skills,i=a.indexOf(s);i<0?a.push(s):a.splice(i,1);sv();R()}
function pf(k,v){S.p[k]=v;sv();R()}
const V={};
V.home=()=>{const top=ranked().slice(0,2);return`<h1>${t('hi')}${S.p.name?', '+esc(S.p.name):''}</h1>
<p class="mut">Learn from elders. Earn within 5 km. Plan with what you really have.</p><div class="card row" style="border-left-color:var(--ok)"><button class="mic" aria-label="Speak" onclick="listen(cmd,this)"></button><div><b>${t('speak')}</b><p class="mut">Works in Hindi and English.</p></div></div>
<h2>${S.lang=='hi'?'आपकी प्रोफ़ाइल':'Your profile'}</h2><div class="card">
<div class="grid"><div><label>Name</label><input value="${esc(S.p.name)}" onchange="pf('name',this.value)"></div><div><label>Village</label><input value="${esc(S.p.village)}" onchange="pf('village',this.value)"></div>
<div><label>I am a</label><select onchange="pf('age',this.value)">${['student','youth','adult','elder'].map(a=>`<option ${S.p.age==a?'selected':''}>${a}</option>`).join('')}</select></div>
<div><label>Hours/week: ${S.p.hours}</label><input type="range" min="1" max="40" value="${S.p.hours}" oninput="S.p.hours=this.value;this.previousElementSibling.textContent='Hours/week: '+this.value" onchange="pf('hours',this.value)"></div>
<div><label>Money to invest: ₹${S.p.budget}</label><input type="range" min="0" max="10000" step="250" value="${S.p.budget}" oninput="S.p.budget=this.value;this.previousElementSibling.textContent='Money to invest: ₹'+this.value" onchange="pf('budget',this.value)"></div></div>
<label>My skills (tap)</label><div>${skChips()}</div></div>
<h2>${S.lang=='hi'?'आज के लिए आपके अवसर':'Best for you today'}</h2>${top.map(o=>oc(o)).join('')}
<button class="btn o" onclick="go('radar')">See all</button>`};
/* ---------- RADAR ---------- */
function oc(o){const sv_=S.saved.includes(o.id);return`<div class="card g"><div class="row sp"><h3>${esc(L(o.t))}</h3><span class="m">${o.s}%</span></div><div class="bar"><i style="width:${o.s}%"></i></div>
<p><span class="tag">${o.ty}</span><span class="tag">⏳ ${o.d} days left</span></p><p class="mut">${o.r.map(esc).join(' · ')}</p><p>${esc(o.how)}</p>
<div class="row"><button class="btn h" onclick="saveO('${o.id}')">${sv_?'Saved':t('save')}</button><button class="btn o" onclick="speak('${esc(L(o.t)).replace(/'/g,'’')}. ${o.s} percent match. ${esc(o.how).replace(/'/g,'’')}')">${t('read')}</button></div></div>`}
function saveO(id){const i=S.saved.indexOf(id);i<0?S.saved.push(id):S.saved.splice(i,1);sv();R();toast(i<0?'Saved to your list':'Removed')}
V.radar=()=>`<h1>📡 Opportunity Radar</h1><p class="mut">Ranked by your skills, age, time and money. Sample data: confirm details at the office before applying.</p>${S.p.skills.length?'':'<div class="card"><b>Add skills on Home</b> for sharper matches.</div>'}${ranked().map(oc).join('')}`;
/* ---------- VAULT ---------- */
const stop=/the|a|is|to|of|how|do|i|my|for|in|and|what|me|can/;
function ask(q){const w=q.toLowerCase().split(/\W+/).filter(x=>x&&!stop.test(x)&&x.length>2);
return S.vault.map(e=>({e,s:w.filter(x=>(e.t+' '+e.tags+' '+e.x).toLowerCase().includes(x)).length})).filter(x=>x.s).sort((a,b)=>b.s-a.s)}
function vAsk(){S.q=$('#q').value;R()}
function vAdd(){const t_=$('#vt').value.trim(),x=$('#vx').value.trim();if(!t_||!x)return toast('Add a title and the knowledge');
S.vault.unshift({id:Date.now(),t:t_,by:$('#vb').value||'Neighbour',role:$('#vr').value,tags:t_+' '+x,x,ver:false});sv();R();toast('Saved. An expert will verify it.')}
function vVer(i){S.vault[i].ver=true;sv();R();toast('Marked verified by local expert')}
V.vault=()=>{const hits=S.q?ask(S.q):null;return`<h1> Living Knowledge Vault</h1><p class="mut">Elders’ know-how, saved in their voice and checked by local experts.</p>
<div class="card b"><label>Ask the vault</label><div class="row" style="flex-wrap:nowrap"><input id="q" value="${esc(S.q||'')}" placeholder="e.g. how to store wheat safely" style="margin:0"><button class="btn" onclick="vAsk()">Ask</button><button class="btn h" aria-label="Speak" onclick="listen(x=>{$('#q').value=x;vAsk()},this)"></button></div>
${hits?(hits.length?`<h3 style="margin-top:10px">Best answer</h3><p>${esc(hits[0].e.x)}</p><p class="mut">Source: ${esc(hits[0].e.by)} · ${hits[0].e.ver?'verified':'awaiting verification'}</p><button class="btn o" onclick="speak(${JSON.stringify(hits[0].e.x).replace(/"/g,'&quot;')})">${t('read')}</button>`:'<p>Nothing yet. Be the first to record it below.</p>'):''}</div>
<h2>Add knowledge</h2><div class="card"><div class="grid"><div><label>Topic</label><input id="vt"></div><div><label>Shared by</label><input id="vb" value="${esc(S.p.name)}"></div></div>
<label>Role</label><select id="vr"><option>Elder</option><option>Expert</option><option>Student</option></select>
<label>What do you know? (type or speak)</label><textarea id="vx" rows="3"></textarea><div class="row"><button class="btn h" onclick="listen(x=>{$('#vx').value+=' '+x},this)">Speak</button><button class="btn" onclick="vAdd()">Save to vault</button></div></div>
<h2>All entries (${S.vault.length})</h2>${S.vault.map((e,i)=>`<div class="card ${e.ver?'g':''}"><h3>${esc(e.t)}</h3><p>${esc(e.x)}</p><p class="mut">${esc(e.by)} · ${e.role} ${e.ver?'· verified':''}</p>${e.ver?'':`<button class="btn o" onclick="vVer(${i})">Verify as expert</button>`}</div>`).join('')}`};
/* ---------- 5 KM ---------- */
function nAdd(){const x=$('#nt').value.trim();if(!x)return toast('Describe it first');S.near.unshift({t:$('#nk').value+': '+x,w:S.p.name||'You',km:+$('#nd').value,k:$('#nk').value.toLowerCase()});sv();R();toast('Posted to your neighbours')}
V.near=()=>{const list=S.near.filter(n=>n.km<=S.rad).sort((a,b)=>a.km-b.km);
const dots=list.map((n,i)=>{const a=i*2.4,r=n.km/10*120+10;return`<circle cx="${150+r*Math.cos(a)}" cy="${150+r*Math.sin(a)}" r="7" fill="${n.k=='need'?'#B5472F':'#2F7D4F'}"/>`}).join('');
return`<h1>📍 5-Km Economy</h1><p class="mut">Needs and offers within walking and cycling distance. Money stays in the village.</p>
<div class="card"><label>Radius: ${S.rad} km</label><input type="range" min="1" max="10" value="${S.rad}" onchange="S.rad=+this.value;sv();R()">
<svg viewBox="0 0 300 300" style="max-width:300px;width:100%;display:block;margin:auto" role="img" aria-label="Map of nearby needs and offers"><circle cx="150" cy="150" r="${S.rad*12+10}" fill="rgba(227,160,8,.15)" stroke="#E3A008" stroke-width="2"/><circle cx="150" cy="150" r="70" fill="none" stroke="var(--line)" stroke-dasharray="3 4"/><circle cx="150" cy="150" r="130" fill="none" stroke="var(--line)" stroke-dasharray="3 4"/>${dots}<circle cx="150" cy="150" r="9" fill="#1B2459"/><text x="138" y="178">You</text></svg>
<p class="mut" style="text-align:center">🔴 need · 🟢 offer</p></div>
${list.map(n=>`<div class="card ${n.k=='offer'?'g':''}"><div class="row sp"><h3>${esc(n.t)}</h3><span class="tag">${n.km} km</span></div><p class="mut">${esc(n.w)}</p><button class="btn o" onclick="toast('Contact shared: ${esc(n.w)} will call you')">Connect</button></div>`).join('')||'<div class="card">Nothing in this radius. Widen it or post a need.</div>'}
<h2>Post to neighbours</h2><div class="card"><div class="grid"><div><label>Type</label><select id="nk"><option>Offer</option><option>Need</option></select></div><div><label>Distance from you (km)</label><input id="nd" type="number" value="1" min="0" max="10" step=".5"></div></div><label>What?</label><input id="nt" placeholder="e.g. bicycle repair, 2 evenings a week"><button class="btn" onclick="nAdd()">${t('post')}</button></div>`};
/* ---------- PACKS ---------- */
const PK=[{id:'p1',t:'UPI & safe digital payments',mb:12,l:['Never share your UPI PIN or OTP, even with a “bank officer”.','Check the name shown before you press pay.','Report fraud on 1930 within an hour.'],q:'Someone calls asking for your OTP to “fix” your account. You…',o:['Share it','Hang up'],a:1},
{id:'p2',t:'Soil health and organic inputs',mb:18,l:['Test soil once a year at the Krishi centre.','Compost, cow-dung slurry and green manure rebuild soil.','Rotate pulses with cereals to fix nitrogen.'],q:'Which crop helps fix nitrogen?',o:['Moong','Wheat'],a:0},
{id:'p3',t:'Spoken English for work',mb:25,l:['Greet: “Good morning, how can I help you?”','Price: “This costs two hundred rupees.”','Ask politely: “Could you repeat that, please?”'],q:'Polite way to ask someone to repeat?',o:['What?','Could you repeat that, please?'],a:1},
{id:'p4',t:'Business math for tailors',mb:9,l:['Cost = cloth + thread + your time.','Profit = price − cost.','Add 20–30% margin so you can grow.'],q:'Cost ₹300, sold ₹390. Profit?',o:['₹90','₹690'],a:0}];
function dl(id){if(S.off)return toast('Go online to download');if(S.packs[id]!=null)return;S.packs[id]=0;const i=setInterval(()=>{S.packs[id]+=20+Math.random()*30;if(S.packs[id]>=100){S.packs[id]=100;clearInterval(i)}sv();if(S.tab=='packs')R()},350)}
function openP(id){S.open=id;R()}
function ans(id,i){const p=PK.find(x=>x.id==id);S.done[id]=i==p.a?'ok':'no';sv();R();if(i==p.a)toast('Correct! Badge earned 🏅')}
V.packs=()=>{if(S.open){const p=PK.find(x=>x.id==S.open),d=S.done[p.id];return`<button class="btn o" onclick="S.open=null;R()">← Back</button><h1>${p.t}</h1><div class="card">${p.l.map(x=>`<p>• ${x}</p>`).join('')}<button class="btn o" onclick="speak('${p.l.join(' ').replace(/'/g,'’')}')">${t('read')}</button></div><div class="card b"><h3>Quick check</h3><p>${p.q}</p><div class="row">${p.o.map((o,i)=>`<button class="btn o" onclick="ans('${p.id}',${i})">${o}</button>`).join('')}</div>${d?`<p><b style="color:var(${d=='ok'?'--ok':'--bad'})">${d=='ok'?'Correct. Well done!':'Not quite. Re-read and try again.'}</b></p>`:''}</div>`}
const used=PK.filter(p=>S.packs[p.id]==100).reduce((a,p)=>a+p.mb,0);
return`<h1>📦 Community Learning Packs</h1><p class="mut">Download once on Wi-Fi at the school hub. Learn anywhere, then share with friends by Bluetooth or SD card.</p><div class="card"><b>${used} MB</b> saved on this phone · text-only, no video</div>
${PK.map(p=>{const g=S.packs[p.id],ok=g==100;return`<div class="card ${ok?'g':''}"><div class="row sp"><h3>${p.t}</h3><span class="tag">${p.mb} MB</span></div>${g!=null&&!ok?`<div class="bar"><i style="width:${g}%"></i></div><p class="mut">Downloading ${Math.round(g)}%</p>`:''}
<div class="row">${ok?`<button class="btn h" onclick="openP('${p.id}')">Open lesson ${S.done[p.id]=='ok'?'🏅':''}</button><button class="btn o" onclick="toast('Share code: GS-${p.id.toUpperCase()}-${p.mb}. Send via Bluetooth.')">Share</button>`:g==null?`<button class="btn" onclick="dl('${p.id}')">Download</button>`:''}</div></div>`}).join('')}`};
/* ---------- PLANNER ---------- */
const CR=[{t:'Solar technician',hrs:240,cost:2000,dist:12,net:1,inc:'₹8–14k/mo',st:['Join basic electrical pack','Train at skill centre','Apprentice with a local installer','Quote for village lamps and pumps']},
{t:'Tailoring micro-unit',hrs:160,cost:6000,dist:3,net:0,inc:'₹6–12k/mo',st:['Take business math pack','Practise on school uniforms','Buy used machine (SHG loan)','Get first 3 repeat clients']},
{t:'Digital Seva operator',hrs:120,cost:1000,dist:6,net:1,inc:'₹5–10k/mo',st:['Learn UPI and forms pack','Shadow the CSC operator','Get operator ID','Serve nearby villages weekly']},
{t:'Organic input seller',hrs:100,cost:3500,dist:5,net:0,inc:'₹4–9k/mo',st:['Learn soil health pack','Document elders’ compost recipes','Make a 50 kg trial batch','Sell to 10 farms in 5 km']},
{t:'Village tutor',hrs:60,cost:0,dist:2,net:0,inc:'₹3–6k/mo',st:['Pass a pack quiz','Teach 5 kids at the hub','Collect fees monthly','Add exam-prep batch']}];
function pl(i,h,b,d,n){const c=CR[i],m=Math.ceil(c.hrs/(h*4.3)),gap=Math.max(0,c.cost-b);return{m,gap,dOk:c.dist<=d,nOk:n>=c.net,h,b,d,n}}
V.plan=()=>{const P=S.pl=S.pl||{c:0,h:+S.p.hours,b:+S.p.budget,d:5,n:0},c=CR[P.c],r=pl(P.c,P.h,P.b,P.d,P.n);
const blockers=[];if(r.gap)blockers.push(`Short by ₹${r.gap}. Try SHG loan or scheme support.`);if(!r.dOk)blockers.push(`Training is ${c.dist} km away. Raise travel limit, or use a Learning Pack plus a local mentor.`);if(!r.nOk)blockers.push('Needs some internet. Use hub Wi-Fi once a week.');
const wi=[['+5 hrs/week',pl(P.c,P.h+5,P.b,P.d,P.n).m+' months'],['+₹2000',(Math.max(0,c.cost-P.b-2000)?'still short ₹'+Math.max(0,c.cost-P.b-2000):'cost covered')],['Travel 10 km',c.dist<=10?'reachable':'still too far'],['Half your hours',pl(P.c,Math.max(1,P.h/2),P.b,P.d,P.n).m+' months']];
const sl=(k,l,mn,mx,st)=>`<label>${l}: ${P[k]}</label><input type="range" min="${mn}" max="${mx}" step="${st}" value="${P[k]}" onchange="S.pl.${k}=+this.value;R()">`;
return`<h1>🧭 What-If Career Planner</h1><p class="mut">Tell us your real limits. We plan around them and show what would change the result.</p>
<div class="card"><label>Goal</label><select onchange="S.pl.c=+this.value;R()">${CR.map((x,i)=>`<option value="${i}" ${i==P.c?'selected':''}>${x.t}</option>`).join('')}</select>
<div class="grid"><div>${sl('h','Hours per week',1,40,1)}</div><div>${sl('b','Money available (₹)',0,10000,250)}</div><div>${sl('d','Max travel (km)',1,20,1)}</div><div><label>Internet</label><select onchange="S.pl.n=+this.value;R()"><option value="0" ${P.n==0?'selected':''}>None or weak</option><option value="1" ${P.n==1?'selected':''}>Good</option></select></div></div></div>
<div class="card ${blockers.length?'':'g'}"><div class="row sp"><h3>${c.t}</h3><span class="m">${r.m} mo</span></div><p>Expected income: <b>${c.inc}</b> · cost ₹${c.cost}</p>
${blockers.length?blockers.map(x=>`<p style="color:var(--bad)">${x}</p>`).join(''):'<p style="color:var(--ok)"><b>Fits your constraints.</b></p>'}
<h3 style="margin-top:8px">Your path</h3>${c.st.map((s,i)=>`<p>${i+1}. ${s}</p>`).join('')}
<button class="btn o" onclick="speak('${c.t}. About ${r.m} months. ${c.st.join('. ')}')">${t('read')}</button></div>
<h2>What if…</h2><div class="grid">${wi.map(x=>`<div class="card b"><b>${x[0]}</b><p>${x[1]}</p></div>`).join('')}</div>`};
/* ---------- JUGAAD ---------- */
function jAdd(){const t_=$('#jt').value.trim();if(!t_)return toast('Name your idea');S.ideas.unshift({id:Date.now(),t:t_,by:S.p.name||'You',prob:$('#jp').value,mat:$('#jm').value,cost:+$('#jc').value||0,v:0});sv();R();toast('Idea shared with village')}
function jv(id){if(S.votes[id])return toast('Already voted');S.votes[id]=1;S.ideas.find(x=>x.id==id).v++;sv();R()}
function jUp(id){S.up=S.up==id?null:id;R()}
const road=j=>{const pr=j.cost<1000?'₹'+Math.round(j.cost*1.8):'₹'+Math.round(j.cost*1.5);return['Test: use it for 2 weeks, record what breaks.','Safety: check sharp edges, load and children’s reach.','Cost: build 5 units; target price '+pr+' to earn 30%.','Learn: take the “'+(/water|pump/i.test(j.t)?'Soil health':'Business math')+'” pack.','Sell: pilot with 5 homes within 5 km, collect feedback.','Protect: ask the district innovation cell about NIF/ GIAN support.']};
V.jug=()=>`<h1>Jugaad to Innovation</h1><p class="mut">Your village fix could become a product. Share it, get votes, then follow the upgrade path.</p>
${S.ideas.sort((a,b)=>b.v-a.v).map(j=>`<div class="card"><div class="row sp"><h3>${esc(j.t)}</h3><span class="tag">▲ ${j.v}</span></div><p>Problem: ${esc(j.prob)}</p><p class="mut">Made with: ${esc(j.mat)} · ₹${j.cost} · by ${esc(j.by)}</p>
<div class="row"><button class="btn h" onclick="jv(${j.id})">Vote</button><button class="btn o" onclick="jUp(${j.id})">${S.up==j.id?'Hide path':'Upgrade path'}</button></div>${S.up==j.id?'<div style="margin-top:8px">'+road(j).map((s,i)=>`<p>${i+1}. ${s}</p>`).join('')+'</div>':''}</div>`).join('')}
<h2>Share your jugaad</h2><div class="card"><label>Name</label><input id="jt"><label>Problem it solves</label><input id="jp"><label>Materials used</label><input id="jm"><label>Cost to make (₹)</label><input id="jc" type="number"><button class="btn" onclick="jAdd()">${t('post')}</button></div>`;
R();

if("serviceWorker" in navigator&&location.protocol!=="file:"){navigator.serviceWorker.register("sw.js").catch(()=>{})}
