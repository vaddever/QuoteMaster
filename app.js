/* QuoteMaster — Application */

// pre-declare globals to prevent TDZ errors
var _adminUsers=[], _adminTab='users';
/* ============================================================
   QuoteMaster — front-end app.
   Data layer is Firebase (Auth + Firestore) — see DATA LAYER block below.
   ============================================================ */

/* ---------- tiny icon set ---------- */
const ICONS={
 grid:'<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>',
 box:'<path d="M21 8 12 3 3 8v8l9 5 9-5z"/><path d="M3 8l9 5 9-5M12 13v8"/>',
 doc:'<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6M9 13h6M9 17h6"/>',
 receipt:'<path d="M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1V2l-2 1-2-1-2 1-2-1-2 1-2-1z"/><path d="M8 8h8M8 12h8M8 16h5"/>',
 truck:'<path d="M1 3h15v13H1z"/><path d="M16 8h4l3 3v5h-7z"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/>',
 mail:'<rect x="2" y="4" width="20" height="16" rx="2"/><path d="m2 7 10 6 10-6"/>',
 gear:'<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.6a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>',
 out:'<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><path d="m16 17 5-5-5-5M21 12H9"/>',
 search:'<circle cx="11" cy="11" r="7"/><path d="m21 21-4-4"/>',
 plus:'<path d="M12 5v14M5 12h14"/>',
 edit:'<path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.12 2.12 0 0 1 3 3L12 15l-4 1 1-4z"/>',
 trash:'<path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>',
 pdf:'<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/><path d="M9 15h6M9 18h4"/>',
 copy:'<rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>',
 send:'<path d="m22 2-7 20-4-9-9-4z"/><path d="M22 2 11 13"/>',
 lock:'<rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>',
 check:'<path d="M20 6 9 17l-5-5"/>',
 empty:'<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/>',
 shield:'<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>',
 users:'<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>',
 menu:'<path d="M3 12h18M3 6h18M3 18h18"/>',
 pos:'<rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/><path d="M6 8h.01M10 8h4M6 12h12"/>',
 badge:'<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><polyline points="16 11 18 13 22 9"/>',
 team:'<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-5-3.87M16 3.13a4 4 0 0 1 0 7.75"/><path d="M20 8v6M23 11h-6"/>',
 wallet:'<path d="M21 12V7H5a2 2 0 0 1 0-4h14v4"/><path d="M3 5v14a2 2 0 0 0 2 2h16v-5"/><path d="M18 12a2 2 0 0 0 0 4h4v-4Z"/>',
 trending:'<polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/>',
 barcode:'<path d="M3 5v14M7 5v14M11 5v14M15 5v3M15 16v3M19 5v3M19 16v3M15 10v4M19 10v4"/>',
 scan:'<path d="M3 7V5a2 2 0 0 1 2-2h2M17 3h2a2 2 0 0 1 2 2v2M21 17v2a2 2 0 0 1-2 2h-2M7 21H5a2 2 0 0 1-2-2v-2M8 12h8"/>',
 layers:'<polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/>',
 arrowup:'<line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/>',
 moon:'<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>'
};
function renderIcons(scope=document){scope.querySelectorAll('.ic[data-i]').forEach(s=>{if(s.dataset.done)return;s.dataset.done=1;s.innerHTML=`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" style="display:block;width:100%;height:100%">${ICONS[s.dataset.i]||''}</svg>`;});}
function svg(name,w=16){return `<svg viewBox="0 0 24 24" width="${w}" height="${w}" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${ICONS[name]||''}</svg>`;}

/* ============================================================
   DATA LAYER — Firebase Auth + Firestore
   ► Fill in your Firebase config below.
   ► No backend deployment ever needed.
   ============================================================ */
const FIREBASE_CONFIG = {
  apiKey:            "AIzaSyD5NPIUGMbs8qQfU-PekQMMT2EWDzNBj-4",
  authDomain:        "quote-master-eed65.firebaseapp.com",
  projectId:         "quote-master-eed65",
  storageBucket:     "quote-master-eed65.firebasestorage.app",
  messagingSenderId: "530335083320",
  appId:             "1:530335083320:web:9828da5df710ce26ae6fcd"
};
const ADMIN_EMAIL = "vaddever@gmail.com";
const TRIAL_DAYS  = 30;

firebase.initializeApp(FIREBASE_CONFIG);
const _auth = firebase.auth();
const _fdb  = firebase.firestore();

var _saveT = null;
function persist() {
  clearTimeout(_saveT);
  _saveT = setTimeout(async () => {
    const user = _auth.currentUser;
    if (!user || !State.db) return;
    try { await _fdb.collection('businesses').doc(user.uid).set(State.db); }
    catch(e) { console.error('Save error', e); }
  }, 800);
}
function starterDb(businessName, email) {
  return {
    settings:{ businessName:businessName||'My Business', email:email||'', logo:'',
      address:'', phone:'', currency:'Rf', currencySymbol:'Rf',
      taxLabel:'GST', taxRate:6, plan:'free',
      quotePrefix:'QT-', invoicePrefix:'INV-', deliveryPrefix:'DN-', posPrefix:'TXN-',
      quoteValidity:14, paymentTerms:'Payment due within 14 days.',
      bankDetails:'', quoteFooter:'', invoiceFooter:'', senderName:businessName||'',
      senderEmail:email||'', posToken:'', orderToken:'', uoms:['pc','kg','g','L','mL','m','box','bag','pair'],
      zakatNisabStd:'silver', zakatSilverPrice:32.82, zakatGoldPrice:440 },
    counters:{ quote:1, invoice:1, delivery:1, pos:1 },
    items:[], customers:[], quotations:[], invoices:[], deliveries:[],
    emails:[], inbox:[], employees:[], transactions:[], expenses:[],
    stockMovements:[], stockAudits:[], zakatRecords:[], invitedUsers:[]
  };
}
function computePlan(pi) {
  if (!pi) return 'trial';
  if (pi.plan === 'pro') return 'pro';
  const exp = pi.trialExpiry
    ? (pi.trialExpiry.toDate ? pi.trialExpiry.toDate() : new Date(pi.trialExpiry))
    : null;
  return (exp && exp > new Date()) ? 'trial' : 'free';
}
function computeDaysLeft(pi) {
  if (!pi || !pi.trialExpiry) return 0;
  const exp = pi.trialExpiry.toDate ? pi.trialExpiry.toDate() : new Date(pi.trialExpiry);
  return Math.max(0, Math.ceil((exp - new Date()) / 86400000));
}
async function loadFirebaseUser(user) {
  try {
    const [bizSnap, planSnap, cfgSnap] = await Promise.all([
      _fdb.collection('businesses').doc(user.uid).get(),
      _fdb.collection('plan_info').doc(user.uid).get(),
      _fdb.collection('platform_config').doc('settings').get().catch(()=>null)
    ]);
    State.db = bizSnap.exists ? bizSnap.data() : starterDb(user.displayName||'', user.email);
    const pi = planSnap.exists ? planSnap.data() : null;
    const isAdmin = (user.email||'').toLowerCase() === ADMIN_EMAIL.toLowerCase();
    State.isAdmin = isAdmin;
    if (isAdmin) {
      // Admin always has full Pro access
      State.db.settings.plan = 'pro';
      State.trialDaysLeft = 0;
    } else {
      State.db.settings.plan = computePlan(pi);
      State.trialDaysLeft = computeDaysLeft(pi);
    }
    State.user = { email: user.email, uid: user.uid };
    _platformCfg = (cfgSnap && cfgSnap.exists) ? cfgSnap.data() : {};
    document.getElementById('auth').style.display = 'none';
    document.getElementById('app').style.display  = 'flex';
    launchApp();
  } catch(e) {
    document.getElementById('authErr').textContent = 'Could not load account: ' + e.message;
  }
}
_auth.onAuthStateChanged(user => {
  if (user && !State.user) loadFirebaseUser(user);
  else if (!user) {
    document.getElementById('auth').style.display = 'flex';
    document.getElementById('app').style.display  = 'none';
  }
});
function fbErrMsg(e) {
  return ({'auth/user-not-found':'No account found with that email.',
    'auth/wrong-password':'Incorrect password.','auth/invalid-credential':'Email or password is incorrect.',
    'auth/email-already-in-use':'An account already exists with that email.',
    'auth/weak-password':'Password must be at least 6 characters.',
    'auth/invalid-email':'Please enter a valid email address.',
    'auth/too-many-requests':'Too many attempts. Try again later.'}[e.code] || e.message || 'Something went wrong.');
}

var State={user:null,db:null,view:'dashboard',isAdmin:false,trialDaysLeft:0};
var _platformCfg={};

function isPro(){ const p=State.db?.settings?.plan; return p==='pro'||p==='trial'; }

/* Which features require Pro by default, until admin overrides via Portal Admin
   → Platform Settings → Pro Feature Configuration. true = Pro-only, false = free for everyone. */
const DEFAULT_PRO_FEATURES={
  stock:false, deliveries:true, email:true, team:true, expenses:false, zakat:false, gst:false, orders:false, multiEmployee:false
};
function proFeatures(){ return Object.assign({},DEFAULT_PRO_FEATURES,_platformCfg.proFeatures||{}); }
function featureLocked(key){ if(State.isAdmin||isPro()) return false; return !!proFeatures()[key]; }

function blankDB(biz){
  return {
    settings:{
      businessName:biz||'My Business', logo:'', address:'', phone:'', email:State.user?State.user.email:'',
      currency:'MVR', currencySymbol:'Rf', taxLabel:'GST', taxRate:8, plan:'free',
      quotePrefix:'QT-', invoicePrefix:'INV-', deliveryPrefix:'DN-',
      quoteValidity:14, paymentTerms:'Payment due within 14 days of invoice date.',
      quoteFooter:'Thank you for considering our quotation.', invoiceFooter:'Thank you for your business!',
      bankDetails:'Bank: Bank of Maldives\nAccount: 7770000123456\nName: My Business'
    },
    counters:{quote:1,invoice:1,delivery:1},
    items:[], quotations:[], invoices:[], deliveries:[], emails:[]
  };
}

/* seed demo content */
function seedDemo(db){
  db.settings.businessName='Atoll Supplies Co.'; db.settings.phone='+960 330 1234';
  db.settings.address='Boduthakurufaanu Magu\nMalé 20094, Maldives';
  db.items=[
    {id:uid(),name:'A4 Copy Paper (80gsm, ream)',sku:'PPR-A4-80',unitPrice:65,taxable:true,unit:'ream',desc:'500 sheets, premium white'},
    {id:uid(),name:'Office Chair — Ergonomic',sku:'FRN-CHR-01',unitPrice:1850,taxable:true,unit:'pc',desc:'Mesh back, adjustable'},
    {id:uid(),name:'Installation & Setup',sku:'SVC-INST',unitPrice:500,taxable:false,unit:'hr',desc:'On-site service'},
    {id:uid(),name:'HP Laser Toner 26A',sku:'PRN-TNR-26A',unitPrice:980,taxable:true,unit:'pc',desc:'Black, OEM'},
  ];
  const c={name:'Reef Hotels Pvt Ltd',email:'procurement@reefhotels.mv',address:'Hithigasmagu\nMalé, Maldives',phone:'+960 333 7777'};
  const q1=newDoc('quote',db);
  q1.customer=c; q1.status='sent';
  q1.lineItems=[{...lineFromItem(db.items[1]),qty:6},{...lineFromItem(db.items[0]),qty:20}];
  calcDoc(q1,db); db.quotations.push(q1);
  const inv=newDoc('invoice',db);
  inv.customer=c; inv.status='unpaid';
  inv.lineItems=[{...lineFromItem(db.items[1]),qty:6},{...lineFromItem(db.items[2]),qty:3}];
  calcDoc(inv,db); db.invoices.push(inv);
  const inv2=newDoc('invoice',db);
  inv2.customer={name:'Blue Lagoon Cafe',email:'info@bluelagoon.mv',address:'Majeedhee Magu, Malé',phone:''};
  inv2.status='paid'; inv2.lineItems=[{...lineFromItem(db.items[3]),qty:4}]; calcDoc(inv2,db); db.invoices.push(inv2);
}

/* ============================================================
   helpers
   ============================================================ */
const uid=()=>Math.random().toString(36).slice(2,10);
const todayISO=()=>new Date().toISOString().slice(0,10);
function addDays(iso,d){const t=new Date(iso);t.setDate(t.getDate()+d);return t.toISOString().slice(0,10);}
function money(n){const s=State.db.settings;const sym=s.currencySymbol||'';const num=Number(n||0).toLocaleString(undefined,{minimumFractionDigits:2,maximumFractionDigits:2});return'\u202A'+sym+'\u00A0'+num+'\u202C';}
function fmtDate(iso){if(!iso)return'—';return new Date(iso).toLocaleDateString(undefined,{day:'2-digit',month:'short',year:'numeric'});}
function esc(s){return String(s??'').replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));}
function hash(s){let h=5381;for(let i=0;i<s.length;i++)h=((h<<5)+h)+s.charCodeAt(i);return (h>>>0).toString(16);}

function lineFromItem(it){return {itemId:it.id,name:it.name,desc:it.desc||'',unitPrice:it.unitPrice,qty:1,taxable:it.taxable!==false};}
function newDoc(type,db){
  const s=db.settings;
  if(type==='quote'){const n=s.quotePrefix+String(db.counters.quote).padStart(4,'0');
    return {id:uid(),number:n,type:'quote',date:todayISO(),validUntil:addDays(todayISO(),s.quoteValidity),customer:{name:'',email:'',address:'',phone:''},lineItems:[],notes:'',status:'draft',totals:{}};}
  if(type==='invoice'){const n=s.invoicePrefix+String(db.counters.invoice).padStart(4,'0');
    return {id:uid(),number:n,type:'invoice',date:todayISO(),dueDate:addDays(todayISO(),14),customer:{name:'',email:'',address:'',phone:''},lineItems:[],notes:'',status:'unpaid',totals:{},quotationId:null};}
  if(type==='delivery'){const n=s.deliveryPrefix+String(db.counters.delivery).padStart(4,'0');
    return {id:uid(),number:n,date:todayISO(),invoiceId:null,customer:{name:'',address:''},lineItems:[],status:'pending',driver:'',vehicle:'',notes:''};}
}
function calcDoc(doc,db){
  const rate=db.settings.taxRate/100; let sub=0,tax=0;
  doc.lineItems.forEach(li=>{const amt=(+li.qty||0)*(+li.unitPrice||0);li.amount=amt;sub+=amt;if(li.taxable)tax+=amt*rate;});
  doc.totals={subtotal:sub,tax:tax,total:sub+tax};
  return doc.totals;
}

/* ============================================================
   AUTH
   ============================================================ */
var authMode='register';
function setAuthMode(m){
  authMode=m;
  document.getElementById('regFields').style.display=m==='register'?'block':'none';
  document.getElementById('authSub').textContent=m==='register'?'Create your business account':'Welcome back';
  document.getElementById('authBtn').textContent=m==='register'?'Create account':'Sign in';
  document.getElementById('authToggle').innerHTML=m==='register'
    ?'Already have an account? <a>Sign in</a>':"New here? <a>Create an account</a>";
  document.getElementById('authErr').textContent='';
}
document.getElementById('authToggle').onclick=()=>setAuthMode(authMode==='register'?'login':'register');
document.getElementById('demoLink').onclick=()=>{
  setAuthMode('register');
  document.getElementById('r_biz').focus();
};
document.getElementById('authBtn').onclick = doAuth;
async function doAuth() {
  const email = document.getElementById('a_email').value.trim().toLowerCase();
  const pass  = document.getElementById('a_pass').value;
  const biz   = document.getElementById('r_biz').value.trim();
  const err   = document.getElementById('authErr');
  if (!email || !pass) { err.textContent = 'Email and password are required.'; return; }
  if (authMode === 'register' && !biz) { err.textContent = 'Please enter your business name.'; return; }
  const btn = document.getElementById('authBtn'), orig = btn.textContent;
  btn.disabled = true; btn.textContent = 'Please wait…'; err.textContent = '';
  try {
    if (authMode === 'register') {
      const cred = await _auth.createUserWithEmailAndPassword(email, pass);
      await cred.user.updateProfile({ displayName: biz });
      const trialExpiry = new Date(Date.now() + TRIAL_DAYS * 86400000);
      await Promise.all([
        _fdb.collection('plan_info').doc(cred.user.uid).set({plan:'free', trialExpiry, createdAt:new Date(), email, businessName:biz}),
        _fdb.collection('businesses').doc(cred.user.uid).set(starterDb(biz, email))
      ]);
    } else {
      await _auth.signInWithEmailAndPassword(email, pass);
    }
  } catch(e) {
    btn.disabled = false; btn.textContent = orig;
    err.textContent = fbErrMsg(e);
  }
}
function launchApp(){
  if(State.db && !Array.isArray(State.db.customers))  State.db.customers=[];
  if(State.db && !Array.isArray(State.db.employees))  State.db.employees=[];
  if(State.db && !Array.isArray(State.db.transactions))State.db.transactions=[];
  if(State.db && !Array.isArray(State.db.expenses))      State.db.expenses=[];
  if(State.db && !Array.isArray(State.db.stockMovements)) State.db.stockMovements=[];
  if(State.db && !Array.isArray(State.db.stockAudits))    State.db.stockAudits=[];
  if(State.db && !Array.isArray(State.db.zakatRecords))   State.db.zakatRecords=[];
  if(State.db && !State.db.gstSettings) State.db.gstSettings={registered:false,gstNumber:'',sector:'general',filingFrequency:'quarterly',filedReturns:[]};
  if(State.db){const s=State.db.settings;if(!s.zakatNisabStd)s.zakatNisabStd='silver';if(!s.zakatSilverPrice)s.zakatSilverPrice=32.82;if(!s.zakatGoldPrice)s.zakatGoldPrice=440;}
  const DEFAULT_UOMS=['pc','box','hr','kg','g','L','mL','m','cm','ft','dozen','ream','pair','set','service','month','day','km'];
  if(State.db){ const s=State.db.settings; if(!s.uoms||!s.uoms.length)s.uoms=[...DEFAULT_UOMS]; }
  if(State.db){ const s=State.db.settings; if(!s.senderName)s.senderName=s.businessName||''; if(!s.senderEmail)s.senderEmail=s.email||''; if(!s.posPrefix)s.posPrefix='TXN-'; if(!State.db.counters.pos)State.db.counters.pos=1; if(!s.posToken){s.posToken=uid();setTimeout(()=>persist(),200);}
  if(!s.orderToken){s.orderToken=uid();setTimeout(()=>persist(),200);} }
  document.getElementById('auth').style.display='none';
  document.getElementById('app').style.display='block';
  renderIcons();
  refreshChrome();
  go('dashboard');
}
document.getElementById('logoutBtn').onclick = async () => {
  clearTimeout(_saveT);
  if (State.db && _auth.currentUser)
    await _fdb.collection('businesses').doc(_auth.currentUser.uid).set(State.db).catch(()=>{});
  await _auth.signOut();
  State.user = null; State.db = null; State.isAdmin = false;
};

/* ============================================================
   CHROME (sidebar/topbar plan state)
   ============================================================ */
function refreshChrome(){
  const s=State.db.settings;
  document.getElementById('topBiz').textContent=s.businessName;
  document.getElementById('topLogo').innerHTML=s.logo?`<img src="${s.logo}" style="width:100%;height:100%;object-fit:cover;border-radius:7px">`:esc(s.businessName[0]||'B');
  const plan=s.plan||'free';
  const proAccess=plan==='pro'||plan==='trial';
  const badge=plan==='pro'?'PRO':plan==='trial'?`TRIAL · ${State.trialDaysLeft}d`:'FREE';
  const badgeCls=plan==='pro'?'pro':plan==='trial'?'pro':'free';
  document.getElementById('topPlan').className='badge '+badgeCls;
  document.getElementById('topPlan').textContent=badge;
  document.getElementById('planName').textContent=plan==='pro'?'Pro':plan==='trial'?`Trial (${State.trialDaysLeft} days left)`:'Free';
  document.getElementById('upgradeBtn').style.display=plan==='pro'?'none':'block';
  document.getElementById('upgradeBtn').textContent=plan==='trial'?'Upgrade to Pro':'Upgrade to Pro';
  document.querySelectorAll('[data-feature-lock]').forEach(l=>{
    const key=l.dataset.featureLock;
    l.style.display=featureLocked(key)?'inline-block':'none';
  });
  document.getElementById('adminGroup').style.display=State.isAdmin?'block':'none';
  document.getElementById('adminLink').style.display=State.isAdmin?'flex':'none';
}
document.getElementById('upgradeBtn').onclick=openUpgrade;

/* ============================================================
   ROUTER
   ============================================================ */
const VIEW_FEATURE_MAP={stock:'stock',deliveries:'deliveries',email:'email',team:'team',expenses:'expenses',zakat:'zakat',gst:'gst',orders:'orders'};
const TITLES={dashboard:'Dashboard',items:'Products',stock:'Stock',customers:'Customers',pos:'Point of Sale',employees:'Employees',expenses:'Expenses',gst:'GST',zakat:'Zakat Calculator',quotations:'Quotations',invoices:'Invoices',deliveries:'Deliveries',orders:'Customer Orders',email:'Email',team:'Team Access',settings:'Settings',admin:'Portal Admin'};
function go(view){
  if(view==='admin'&&!State.isAdmin){view='dashboard';}
  State.view=view;
  document.querySelectorAll('#nav a').forEach(a=>a.classList.toggle('active',a.dataset.view===view));
  document.getElementById('pageTitle').textContent=TITLES[view]||view;
  const c=document.getElementById('content');
  try {
    const fkey=VIEW_FEATURE_MAP[view];
    if(fkey&&featureLocked(fkey)){c.innerHTML=lockedView(view);renderIcons(c);return;}
    const views={dashboard:viewDashboard,items:viewItems,stock:viewStock,customers:viewCustomers,
      pos:viewPOS,employees:viewEmployees,expenses:viewExpenses,gst:viewGST,zakat:viewZakat,
      quotations:()=>viewDocs('quote'),invoices:()=>viewDocs('invoice'),deliveries:viewDeliveries,
      orders:viewCustomerOrders,email:viewEmail,team:viewTeam,settings:viewSettings,admin:viewAdmin};
    if(!views[view]){c.innerHTML='<div class="card pad">Unknown view: '+esc(view)+'</div>';return;}
    views[view]();
    renderIcons(c);
  } catch(err) {
    console.error('Error in view ['+view+']:', err);
    c.innerHTML='<div class="card pad" style="background:var(--danger-soft);border-left:4px solid var(--danger)">'+
      '<b style="color:var(--danger)">Error loading '+esc(view)+'</b><br>'+
      esc(err.message)+'<br><small class="muted">Open browser console (F12) for full details.</small></div>';
  }
}
document.getElementById('nav').addEventListener('click',e=>{const a=e.target.closest('a[data-view]');if(a){go(a.dataset.view);toggleNav(false);}});
function toggleNav(open){
  const s=document.querySelector('.side'),sc=document.getElementById('navScrim');
  const show=(open===undefined)?!s.classList.contains('open'):open;
  s.classList.toggle('open',show);sc.classList.toggle('show',show);
}
document.getElementById('menuBtn').onclick=()=>toggleNav();
document.getElementById('navScrim').onclick=()=>toggleNav(false);

function lockedView(view){
  return `<div class="locked-view"><div class="ic">${svg('lock',28)}</div>
   <h2 style="font-size:22px">${TITLES[view]} is a Pro feature</h2>
   <p class="muted" style="margin:10px 0 20px">Upgrade to unlock delivery management, email sending &amp; receiving, recurring invoices, and reporting.</p>
   <button class="btn amber" onclick="openUpgrade()">See Pro plans</button></div>`;
}

/* ============================================================
   DASHBOARD
   ============================================================ */
/* ============================================================
   MOBILE HELPERS
   ============================================================ */
function isMob(){return window.innerWidth<768;}

function recentCards(recent){
  if(!recent.length)return emptyBox('No documents yet','Create your first quotation or invoice to get started.');
  return `<div class="mob-cards">${recent.map(d=>`
    <div class="mob-card">
      <div class="mob-card-top">
        <div><span class="muted" style="font-size:11px;text-transform:uppercase;letter-spacing:.04em">${d._t}</span><br><span class="mob-card-id">${esc(d.number)}</span></div>
        <span class="pill ${d.status}">${d.status}</span>
      </div>
      <div class="mob-card-name">${esc(d.customer.name||'—')}</div>
      <div class="mob-card-foot">
        <span class="muted" style="font-size:12.5px">${fmtDate(d.date)}</span>
        <span class="mob-card-amount">${money(d.totals.total||0)}</span>
      </div>
    </div>`).join('')}</div>`;
}
function docCards(list,type){
  const isQ=type==='quote';
  if(!list.length)return emptyBox(`No ${isQ?'quotations':'invoices'} yet`,`Create your first — it only takes a minute.`);
  return `<div class="mob-cards">${list.map(d=>`
    <div class="mob-card">
      <div class="mob-card-top">
        <span class="mob-card-id">${esc(d.number)}</span>
        ${statusSelect(type,d)}
      </div>
      <div class="mob-card-name" onclick="openDocEditor('${type}','${d.id}')" style="cursor:pointer">${esc(d.customer.name||'—')}</div>
      <div class="mob-card-meta">
        <span>${isQ?'Issued':'Date'}: ${fmtDate(d.date)}</span>
        <span>${isQ?'Valid until':'Due'}: <strong style="color:var(--ink)">${fmtDate(isQ?d.validUntil:d.dueDate)}</strong></span>
      </div>
      <div class="mob-card-foot">
        <div class="mob-card-actions">
          <button class="iconbtn" title="Edit" onclick="openDocEditor('${type}','${d.id}')">${svg('edit')}</button>
          <button class="iconbtn" title="PDF" onclick="printDoc('${type}','${d.id}')">${svg('pdf')}</button>
          ${isQ?`<button class="iconbtn" title="Convert to invoice" onclick="convertToInvoice('${d.id}')">${svg('receipt')}</button>`
               :`<button class="iconbtn" title="Delivery note" onclick="deliveryFromInvoice('${d.id}')">${svg('truck')}</button>`}
          <button class="iconbtn" title="Email" onclick="emailDoc('${type}','${d.id}')">${svg('send')}</button>
          <button class="iconbtn" title="Delete" onclick="delDoc('${type}','${d.id}')">${svg('trash')}</button>
        </div>
        <span class="mob-card-amount">${money(d.totals.total||0)}</span>
      </div>
    </div>`).join('')}</div>`;
}
function itemCards(items){
  if(!items.length)return emptyBox('No items yet','Add products or services to reuse on quotes and invoices.');
  return `<div class="mob-cards">${items.map(i=>`
    <div class="mob-card">
      <div style="display:flex;justify-content:space-between;align-items:flex-start;gap:10px">
        <div style="flex:1;min-width:0">
          <div class="mob-card-name" style="margin-bottom:3px">${esc(i.name)}</div>
          <div class="mob-card-meta" style="margin-bottom:0">
            <span>${esc(i.sku||'—')}</span><span>${esc(i.unit||'pc')}</span>
            ${i.desc?`<span style="color:var(--ink-soft)">${esc(i.desc)}</span>`:''}
          </div>
        </div>
        <div style="text-align:right;flex-shrink:0">
          <div class="mob-card-amount">${money(i.unitPrice)}</div>
          <div style="margin-top:4px">${i.taxable!==false
            ?`<span class="pill paid" style="font-size:11px">${esc(State.db.settings.taxLabel)}</span>`
            :'<span class="muted" style="font-size:12px">No tax</span>'}</div>
        </div>
      </div>
      <div class="mob-card-foot" style="justify-content:flex-end;border-top:1px solid var(--line);margin-top:10px;padding-top:10px">
        <div class="mob-card-actions">
          <button class="iconbtn" onclick='openItemEditor("${i.id}")'>${svg('edit')}</button>
          <button class="iconbtn" onclick='delItem("${i.id}")'>${svg('trash')}</button>
        </div>
      </div>
    </div>`).join('')}</div>`;
}
function custCards(list,docsOf){
  if(!list.length)return emptyBox('No customers yet','Add customers once and reuse their details on every quote and invoice.');
  return `<div class="mob-cards">${list.map(c=>`
    <div class="mob-card">
      <div class="mob-card-name">${esc(c.name)}</div>
      <div class="mob-card-meta">
        ${c.email?`<span>✉ ${esc(c.email)}</span>`:''}
        ${c.phone?`<span>📞 ${esc(c.phone)}</span>`:''}
        ${c.address?`<span>📍 ${esc(c.address.split('\n')[0])}</span>`:''}
        ${c.notes?`<span style="color:var(--amber)">📋 ${esc(c.notes)}</span>`:''}
      </div>
      <div class="mob-card-foot">
        <div class="mob-card-actions">
          <button class="iconbtn" title="New quotation" onclick='quoteForCustomer("${c.id}")'>${svg('doc')}</button>
          <button class="iconbtn" title="Edit" onclick='openCustomerEditor("${c.id}")'>${svg('edit')}</button>
          <button class="iconbtn" title="Delete" onclick='delCustomer("${c.id}")'>${svg('trash')}</button>
        </div>
        <span class="muted" style="font-size:12.5px">${docsOf(c.name)} doc${docsOf(c.name)!==1?'s':''}</span>
      </div>
    </div>`).join('')}</div>`;
}

function viewDashboard(){
  const db=State.db;
  const unpaid=db.invoices.filter(i=>i.status!=='paid');
  const outstanding=unpaid.reduce((s,i)=>s+(i.totals.total||0),0);
  const paid=db.invoices.filter(i=>i.status==='paid').reduce((s,i)=>s+(i.totals.total||0),0);
  const openQuotes=db.quotations.filter(q=>q.status==='sent'||q.status==='draft').length;
  const recent=[...db.invoices.map(d=>({...d,_t:'Invoice'})),...db.quotations.map(d=>({...d,_t:'Quotation'}))]
     .sort((a,b)=>(b.date>a.date?1:-1)).slice(0,6);
  const now=new Date(),mm=now.getMonth(),yy=now.getFullYear();
  const monthStr=now.toLocaleString('default',{month:'long',year:'numeric'});
  const mthRevenue=(db.invoices||[]).filter(i=>i.status==='paid'&&i.date&&new Date(i.date).getMonth()===mm&&new Date(i.date).getFullYear()===yy).reduce((s,i)=>s+(i.totals.total||0),0);
  const mthExpenses=(db.expenses||[]).filter(e=>e.date&&new Date(e.date).getMonth()===mm&&new Date(e.date).getFullYear()===yy).reduce((s,e)=>s+(e.amount||0),0);
  const netProfit=mthRevenue-mthExpenses;
  const netCls=netProfit>=0?'pl-net-pos':'pl-net-neg';
  const priced=(db.items||[]).filter(i=>i.costPrice>0&&i.unitPrice>0);
  const avgMargin=priced.length?priced.reduce((s,i)=>s+((i.unitPrice-i.costPrice)/i.unitPrice*100),0)/priced.length:null;
  const plan=db.settings.plan||'free';
  const trialBanner=plan==='trial'&&State.trialDaysLeft<=7
    ?`<div class="card pad" style="background:var(--amber-soft);border-color:var(--amber);margin-bottom:14px;display:flex;justify-content:space-between;align-items:center;gap:12px;flex-wrap:wrap"><div><b>⏰ Trial ending in ${State.trialDaysLeft} day${State.trialDaysLeft!==1?'s':''}!</b> Upgrade to keep Pro features.</div><button class="btn amber sm" onclick="openUpgrade()">Upgrade now</button></div>`
    :plan==='trial'
    ?`<div class="card pad" style="background:var(--accent-soft);border-color:var(--accent);margin-bottom:14px;display:flex;justify-content:space-between;align-items:center;gap:12px;flex-wrap:wrap"><div>✅ <b>Pro Trial active</b> — ${State.trialDaysLeft} days left. Enjoy all Pro features!</div><button class="btn ghost sm" onclick="openUpgrade()">Upgrade</button></div>`
    :'';
  // Inventory stats
  const trackedItems=(db.items||[]).filter(i=>i.trackStock!==false&&i.stockQty>0);
  const invCost=trackedItems.reduce((s,i)=>s+(i.stockQty||0)*(i.costPrice||0),0);
  const invSell=trackedItems.reduce((s,i)=>s+(i.stockQty||0)*(i.unitPrice||0),0);
  const lowStock=(db.items||[]).filter(i=>i.trackStock!==false&&i.reorderLevel>0&&(i.stockQty||0)<=(i.reorderLevel||0)).length;
  document.getElementById('content').innerHTML=trialBanner+`
   <div class="grid kpis" style="margin-bottom:10px">
     <div class="card kpi"><div class="lbl">Outstanding</div><div class="val">${money(outstanding)}</div><div class="sub muted">${unpaid.length} unpaid</div></div>
     <div class="card kpi"><div class="lbl">Collected</div><div class="val">${money(paid)}</div><div class="sub up">Paid to date</div></div>
     <div class="card kpi"><div class="lbl">Open quotes</div><div class="val">${openQuotes}</div><div class="sub muted">awaiting</div></div>
     <div class="card kpi"><div class="lbl">Avg margin</div><div class="val">${avgMargin!==null?avgMargin.toFixed(1)+'%':'—'}</div><div class="sub muted">${priced.length} priced</div></div>
   </div>
   <div class="card" style="padding:12px 18px;margin-bottom:12px;display:grid;grid-template-columns:repeat(auto-fit,minmax(140px,1fr));gap:12px;border-left:3px solid var(--accent)">
     <div class="inv-stat"><div class="lbl">Inventory cost value</div><div class="val">${money(invCost)}</div></div>
     <div class="inv-stat"><div class="lbl">Inventory sell value</div><div class="val">${money(invSell)}</div></div>
     <div class="inv-stat"><div class="lbl">Unrealised profit</div><div class="val" style="color:var(--accent-ink)">${money(invSell-invCost)}</div></div>
     ${lowStock?`<div class="inv-stat"><div class="lbl">Low stock alerts</div><div class="val" style="color:var(--amber)">${lowStock} items</div></div>`:''}
     <div style="margin-left:auto;align-self:center"><button class="btn ghost sm" onclick="go('stock')">View stock →</button></div>
   </div>
   <div class="grid two-col" style="gap:14px;margin-bottom:18px">
     <div class="card">
       <div style="padding:14px 16px 10px;display:flex;justify-content:space-between;align-items:center">
         <h3 style="font-size:14px">P&amp;L — ${monthStr}</h3>
         ${isPro()?`<button class="btn ghost tiny" onclick="go('expenses')">Expenses →</button>`:''}
       </div>
       <div class="pl-row"><span class="lbl">Revenue (paid)</span><span class="amt">${money(mthRevenue)}</span></div>
       ${isPro()?`<div class="pl-row"><span class="lbl">Expenses</span><span class="amt" style="color:var(--danger)">${money(mthExpenses)}</span></div>
       <div class="pl-row ${netCls}" style="border-radius:0 0 var(--radius) var(--radius)"><span class="lbl" style="font-weight:700">Net profit</span><span class="amt">${money(Math.abs(netProfit))} ${netProfit<0?'loss':''}</span></div>`
       :`<div class="pl-row" style="border-radius:0 0 var(--radius) var(--radius)"><span class="muted" style="font-size:13px">💡 Track expenses on Pro to see net profit</span><button class="btn amber tiny" onclick="openUpgrade()">Upgrade</button></div>`}
     </div>
     <div class="card">
       <div style="padding:14px 16px 10px"><h3 style="font-size:14px">Quick actions</h3></div>
       <div style="padding:0 14px 14px;display:grid;gap:8px">
         <button class="btn ghost sm block" onclick="go('quotations');setTimeout(()=>openDocEditor('quote'),50)">+ New quotation</button>
         <button class="btn accent sm block" onclick="go('invoices');setTimeout(()=>openDocEditor('invoice'),50)">+ New invoice</button>
         ${isPro()
           ?`<button class="btn ghost sm block" onclick="go('expenses');setTimeout(openExpenseEditor,60)">+ Log expense</button>`
           :`<button class="btn ghost sm block" style="opacity:.6" onclick="openUpgrade()" title="Pro feature">+ Log expense ↗</button>`}
         <button class="btn ghost sm block" onclick="go('pos')">Open POS register</button>
       </div>
     </div>
   </div>
   <div class="between" style="margin-bottom:14px"><h3>Recent activity</h3></div>
   ${isMob()?recentCards(recent):`<div class="tbl"><table><thead><tr><th>Type</th><th>Number</th><th>Customer</th><th>Date</th><th>Status</th><th class="right">Total</th></tr></thead><tbody>
     ${recent.map(d=>`<tr><td class="muted">${d._t}</td><td class="mono">${esc(d.number)}</td><td>${esc(d.customer.name||'—')}</td><td>${fmtDate(d.date)}</td><td><span class="pill ${d.status}">${d.status}</span></td><td class="right mono">${money(d.totals.total)}</td></tr>`).join('')}
   </tbody></table></div>`}`;
}
function emptyBox(t,s){return `<div class="card empty"><div class="ic" data-i="empty" style="margin:0 auto 10px;width:42px;height:42px;opacity:.4">${svg('empty',42)}</div><h3>${t}</h3><p class="muted">${s}</p></div>`;}

/* ============================================================
   PRODUCTS  (cost, selling, margin, UOM datalist, barcode)
   ============================================================ */
function uomDatalist(){return `<datalist id="uom_dl">${(State.db.settings.uoms||[]).map(u=>`<option value="${esc(u)}">`).join('')}</datalist>`;}
function marginPct(i){if(!i.costPrice||!i.unitPrice)return null;return +((i.unitPrice-i.costPrice)/i.unitPrice*100).toFixed(1);}
function marginPill(i){const m=marginPct(i);if(m===null)return '<span class="muted" style="font-size:12px">—</span>';const cls=m>=20?'margin-good':m>=10?'margin-ok':'margin-thin';return `<span class="margin-pill ${cls}">${m}%</span>`;}
function itemCards(items){
  if(!items.length)return emptyBox('No products yet','Add products or services to reuse on quotes, invoices and the POS.');
  return `<div class="mob-cards">${items.map(i=>{
    const m=marginPct(i);
    const tracked=i.trackStock!==false;
    const qty=i.stockQty||0;
    const stkCls=!tracked?'':qty<=0?'stk-out':i.reorderLevel>0&&qty<=i.reorderLevel?'stk-low':'stk-good';
    return`
    <div class="mob-card">
      <div style="display:flex;justify-content:space-between;align-items:flex-start;gap:10px">
        <div style="flex:1;min-width:0">
          <div class="mob-card-name" style="margin-bottom:3px">${esc(i.name)}</div>
          <div class="mob-card-meta" style="margin-bottom:0">
            ${i.sku?`<span class="mono">${esc(i.sku)}</span>`:''}
            ${i.barcode?`<span>${svg('barcode',13)} ${esc(i.barcode)}</span>`:''}
            <span>${esc(i.unit||'pc')}</span>
          </div>
        </div>
        <div style="text-align:right;flex-shrink:0">
          <div class="mob-card-amount">${money(i.unitPrice)}</div>
          ${i.costPrice?`<div class="cost-badge" style="margin-top:3px">Cost: ${money(i.costPrice)}</div>`:''}
        </div>
      </div>
      <div style="display:flex;justify-content:space-between;align-items:center;margin-top:8px;padding-top:8px;border-top:1px solid var(--line)">
        <div style="display:flex;gap:5px;align-items:center;flex-wrap:wrap">
          ${marginPill(i)}
          ${tracked?`<span class="stk-badge ${stkCls}">${qty<=0?'Out of stock':qty+' '+esc(i.unit||'pc')}${i.reorderLevel>0&&qty<=i.reorderLevel&&qty>0?' ⚠':''}</span>`:''}
          ${i.taxable!==false?`<span class="pill paid" style="font-size:11px">${esc(State.db.settings.taxLabel)}</span>`:'<span class="muted" style="font-size:12px">No tax</span>'}
        </div>
        <div class="mob-card-actions">
          ${tracked?`<button class="iconbtn" title="Adjust stock" onclick='openStockAdjust("${i.id}")'>${svg('layers')}</button>`:''}
          <button class="iconbtn" onclick='openItemEditor("${i.id}")'>${svg('edit')}</button>
          <button class="iconbtn" onclick='delItem("${i.id}")'>${svg('trash')}</button>
        </div>
      </div>
    </div>`;}).join('')}</div>`;
}
var itemSearch='';
function viewItems(){
  const items=State.db.items.filter(i=>(i.name+(i.sku||'')+(i.barcode||'')).toLowerCase().includes(itemSearch.toLowerCase()));
  const totalCost=State.db.items.filter(i=>i.trackStock!==false&&i.stockQty>0).reduce((s,i)=>s+(i.stockQty||0)*(i.costPrice||0),0);
  document.getElementById('content').innerHTML=`
   <div class="toolbar">
     <div class="search">${svg('search')}<input placeholder="Search products…" value="${esc(itemSearch)}" oninput="itemSearch=this.value;viewItems()"></div>
     <div class="row" style="gap:8px;flex-shrink:0">
       <button class="btn ghost sm" onclick="go('stock')">${svg('layers',14)} Stock</button>
       <button class="btn accent" onclick="openItemEditor()">${svg('plus')} New product</button>
     </div>
   </div>
   ${totalCost>0?`<div class="card pad" style="margin-bottom:12px;display:flex;gap:20px;flex-wrap:wrap;border-left:3px solid var(--accent)">
     <div class="inv-stat"><div class="lbl">Total inventory cost value</div><div class="val">${money(totalCost)}</div></div>
     <div class="inv-stat"><div class="lbl">Stock lines tracked</div><div class="val">${State.db.items.filter(i=>i.trackStock!==false&&i.stockQty>0).length}</div></div>
   </div>`:''}
   ${isMob()?itemCards(items):`<div class="tbl"><table><thead><tr><th>Product</th><th>SKU / Barcode</th><th>Unit</th><th class="right">Cost</th><th class="right">Selling</th><th>Margin</th><th class="right">Stock</th><th>Tax</th><th></th></tr></thead><tbody>
     ${items.map(i=>{
        const tracked=i.trackStock!==false;
        const qty=i.stockQty||0;
        const stkCls=!tracked?'':qty<=0?'stk-out':i.reorderLevel>0&&qty<=i.reorderLevel?'stk-low':'stk-good';
        return`<tr>
        <td><div style="display:flex;align-items:center;gap:10px">
          ${i.image?`<img src="${i.image}" style="width:36px;height:36px;object-fit:cover;border-radius:7px;flex-shrink:0">`:''}
          <div><div style="font-weight:600">${esc(i.name)}</div>${i.desc?`<div class="muted" style="font-size:12px">${esc(i.desc)}</div>`:''}</div></div></td>
        <td class="mono muted" style="font-size:12px">${esc(i.sku||'—')}${i.barcode?`<div>${svg('barcode',12)} ${esc(i.barcode)}</div>`:''}</td>
        <td>${esc(i.unit||'pc')}</td>
        <td class="right mono muted">${i.costPrice?money(i.costPrice):'—'}</td>
        <td class="right mono" style="font-weight:600">${money(i.unitPrice)}</td>
        <td>${marginPill(i)}</td>
        <td class="right">${tracked?`<span class="stk-badge ${stkCls}">${qty<=0?'Out':qty}</span>${i.reorderLevel?`<div class="muted" style="font-size:11px">reorder@${i.reorderLevel}</div>`:''}  `:'<span class="muted" style="font-size:12px">—</span>'}</td>
        <td>${i.taxable!==false?`<span class="pill paid">${esc(State.db.settings.taxLabel)}</span>`:'<span class="muted">—</span>'}</td>
        <td><div class="rowacts">
          ${tracked?`<button class="iconbtn" title="Adjust stock" onclick='openStockAdjust("${i.id}")'>${svg('layers')}</button>`:''}
          <button class="iconbtn" onclick='openItemEditor("${i.id}")'>${svg('edit')}</button>
          <button class="iconbtn" onclick='delItem("${i.id}")'>${svg('trash')}</button>
        </div></td></tr>`;}).join('')}
   </tbody></table></div>`}
  `;
  renderIcons(document.getElementById('content'));
}
function openItemEditor(id){
  const it=id?State.db.items.find(i=>i.id===id):{name:'',sku:'',barcode:'',desc:'',unitPrice:'',costPrice:'',unit:'pc',taxable:true};
  openModal(`${id?'Edit':'New'} product`,`
    ${uomDatalist()}
    <!-- Product image upload -->
    <div class="field full" style="margin-bottom:12px">
      <label>Product image (optional)</label>
      <div id="item_img_drop" style="border:2px dashed var(--line);border-radius:12px;padding:14px;text-align:center;cursor:pointer;background:var(--paper);transition:.15s;position:relative"
        onclick="document.getElementById('item_img_input').click()"
        ondragover="event.preventDefault();this.style.borderColor='var(--accent)'"
        ondragleave="this.style.borderColor=''"
        ondrop="event.preventDefault();this.style.borderColor='';handleItemImage(event.dataTransfer.files[0])">
        ${it.image
          ? '<img id="item_img_prev" src="'+it.image+'" style="max-height:100px;border-radius:8px;object-fit:contain">'
          : '<div id="item_img_prev" style="font-size:28px;margin-bottom:4px">🖼</div><div style="font-size:13px;font-weight:600">Drag &amp; drop or tap to upload</div><div style="font-size:12px;color:var(--ink-soft)">JPG, PNG, WebP · max 3MB</div>'}
      </div>
      <input type="file" id="item_img_input" accept="image/*" style="display:none" onchange="handleItemImage(this.files[0])">
      <div id="item_img_name" style="font-size:12px;color:var(--accent-ink);margin-top:4px">${it.image?'Image attached — tap to replace':''}</div>
    </div>
    <div class="fgrid">
      <div class="field full"><label>Product name *</label><input id="i_name" value="${esc(it.name)}" placeholder="e.g. A4 Copy Paper"></div>
      <div class="field"><label>SKU / internal code</label><input id="i_sku" value="${esc(it.sku||'')}"></div>
      <div class="field"><label>Barcode (EAN/UPC) <button class="btn ghost tiny" style="margin-left:6px" onclick="openBarcodeScanner(v=>{document.getElementById('i_barcode').value=v;})">${svg('scan',13)} Scan</button></label><input id="i_barcode" value="${esc(it.barcode||'')}" placeholder="Scan or type"></div>
      <div class="field"><label>Unit of measure</label><input id="i_unit" list="uom_dl" value="${esc(it.unit||'pc')}" placeholder="pc, kg, hr…"></div>
      <div class="field"><label>Cost price (${esc(State.db.settings.currency)}) — internal</label>
        <input id="i_cost" type="number" step="0.01" value="${it.costPrice||''}" placeholder="0.00" oninput="calcItemFields()"></div>
      <div class="field"><label>Selling price (${esc(State.db.settings.currency)}) *</label>
        <input id="i_price" type="number" step="0.01" value="${it.unitPrice||''}" oninput="calcItemFields()"></div>
      <div class="field"><label>Markup % → auto-fills selling</label>
        <input id="i_markup" type="number" step="0.1" placeholder="e.g. 35" oninput="applyMarkup()"></div>
      <div class="field" style="align-self:end">
        <label>Margin</label>
        <div id="i_margin_disp" style="padding:9px 12px;border:1px solid var(--line);border-radius:10px;font-weight:700;font-size:14px;background:var(--paper)">—</div>
      </div>
      <div class="field"><label>${esc(State.db.settings.taxLabel)} applies</label><select id="i_tax"><option value="1" ${it.taxable!==false?'selected':''}>Yes</option><option value="0" ${it.taxable===false?'selected':''}>No</option></select></div>
      <div class="field full"><label>Description</label><textarea id="i_desc" rows="2">${esc(it.desc||'')}</textarea></div>
      <div class="field full" style="border-top:1px solid var(--line);padding-top:10px;margin-top:4px">
        <label>Stock tracking</label>
        <select id="i_track" onchange="document.getElementById('i_stkfields').style.display=this.value==='1'?'block':'none'">
          <option value="1" ${it.trackStock!==false?'selected':''}>Track stock quantity</option>
          <option value="0" ${it.trackStock===false?'selected':''}>No tracking (services / unlimited items)</option>
        </select>
      </div>
    </div>
    <div id="i_stkfields" style="display:${it.trackStock!==false?'block':'none'}">
      <div class="fgrid" style="margin-top:8px">
        <div class="field"><label>Current stock qty</label><input id="i_sqty" type="number" step="1" value="${it.stockQty||0}"></div>
        <div class="field"><label>Reorder level (alert when ≤)</label><input id="i_reord" type="number" step="1" value="${it.reorderLevel||0}" placeholder="e.g. 5"></div>
        <div class="field"><label>Reorder quantity</label><input id="i_reordqty" type="number" step="1" value="${it.reorderQty||0}" placeholder="Standard order amount"></div>
        ${id&&it.trackStock!==false?`<div class="field" style="align-self:end"><label>Stock cost value</label>
          <div style="padding:8px 12px;border:1px solid var(--line);border-radius:10px;font-weight:700;font-size:14px;background:var(--accent-soft);color:var(--accent-ink)">${money((it.stockQty||0)*(it.costPrice||0))}</div></div>`:''}
      </div>
    </div>`,
    [{label:'Cancel',cls:'ghost',fn:closeModal},{label:id?'Save changes':'Add product',cls:'accent',fn:()=>{
      const name=val('i_name');if(!name)return toast('Product name is required');
      const sell=+val('i_price')||0;if(!sell)return toast('Selling price is required');
      const trackStock=val('i_track')==='1';
      const newStockQty=trackStock?+val('i_sqty')||0:0;
      const oldStockQty=id?((State.db.items.find(i=>i.id===id)||{}).stockQty||0):0;
      const rec={id:id||uid(),name,sku:val('i_sku'),barcode:val('i_barcode'),unit:val('i_unit')||'pc',desc:val('i_desc'),
        image:window._itemImgDataUrl||(it&&it.image)||null,
        costPrice:+val('i_cost')||0,unitPrice:sell,taxable:val('i_tax')==='1',
        trackStock,stockQty:newStockQty,reorderLevel:trackStock?+val('i_reord')||0:0,reorderQty:trackStock?+val('i_reordqty')||0:0};
      if(id){const ix=State.db.items.findIndex(i=>i.id===id);State.db.items[ix]=rec;}else State.db.items.push(rec);
      // Auto-create movement record when stock qty changes
      if(trackStock){
        const delta=newStockQty-oldStockQty;
        if(!id&&newStockQty>0) addStockMovement(rec.id,'receive',newStockQty,'initial','Opening stock');
        else if(id&&delta!==0) addStockMovement(rec.id,'adjust',delta,'manual','Stock updated via product editor');
      }
      persist();closeModal();viewItems();toast(id?'Product updated':'Product added');
    }}]);
  window._itemImgDataUrl=null; // reset on open
  setTimeout(()=>{if(it.costPrice&&it.unitPrice)calcItemFields();},80);
}
function calcItemFields(){
  const cost=+document.getElementById('i_cost')?.value||0;
  const sell=+document.getElementById('i_price')?.value||0;
  const d=document.getElementById('i_margin_disp');if(!d)return;
  if(cost>0&&sell>0){
    const m=((sell-cost)/sell*100);
    d.textContent=m.toFixed(1)+'% margin';
    d.style.color=m>=20?'var(--accent-ink)':m>=10?'var(--amber)':'var(--danger)';
    d.style.background=m>=20?'var(--accent-soft)':m>=10?'var(--amber-soft)':'var(--danger-soft)';
    const mk=document.getElementById('i_markup');if(mk&&!mk.value)mk.placeholder=((sell/cost-1)*100).toFixed(1)+'%';
  }else{d.textContent='—';d.style.color='var(--ink-soft)';d.style.background='var(--paper)';}
}
function applyMarkup(){
  const cost=+document.getElementById('i_cost')?.value||0;
  const mk=+document.getElementById('i_markup')?.value||0;
  if(cost>0&&mk>0){const sell=+(cost*(1+mk/100)).toFixed(2);const p=document.getElementById('i_price');if(p)p.value=sell;calcItemFields();}
}
function delItem(id){confirmDel('Delete this product?',()=>{State.db.items=State.db.items.filter(i=>i.id!==id);persist();viewItems();toast('Product deleted');});}

/* ============================================================
   STOCK MANAGEMENT
   ============================================================ */
function addStockMovement(itemId,type,qty,reference,note){
  const item=State.db.items.find(i=>i.id===itemId);if(!item)return;
  item.stockQty=(item.stockQty||0)+qty;
  if(!State.db.stockMovements)State.db.stockMovements=[];
  State.db.stockMovements.unshift({id:uid(),date:todayISO(),time:new Date().toLocaleTimeString([],{hour:'2-digit',minute:'2-digit'}),
    itemId,itemName:item.name,type,qty,reference:reference||'manual',note:note||'',balance:item.stockQty});
  if(State.db.stockMovements.length>600)State.db.stockMovements.length=600;
}
function stockBadgeHtml(i){
  if(i.trackStock===false)return'<span class="muted" style="font-size:12px">—</span>';
  const q=i.stockQty||0;
  const cls=q<=0?'stk-out':i.reorderLevel>0&&q<=i.reorderLevel?'stk-low':'stk-good';
  return`<span class="stk-badge ${cls}">${q<=0?'Out of stock':q+' '+esc(i.unit||'pc')}</span>`;
}
var _stockTab='overview';
function viewStock(){
  const tracked=(State.db.items||[]).filter(i=>i.trackStock!==false);
  const totalCost=tracked.reduce((s,i)=>s+(i.stockQty||0)*(i.costPrice||0),0);
  const totalSell=tracked.reduce((s,i)=>s+(i.stockQty||0)*(i.unitPrice||0),0);
  const lowStock=tracked.filter(i=>i.reorderLevel>0&&(i.stockQty||0)<=i.reorderLevel);
  const c=document.getElementById('content');
  c.innerHTML=`
   <div class="card" style="padding:12px 18px;margin-bottom:14px;display:flex;gap:0;flex-wrap:wrap;border-left:3px solid var(--accent)">
     <div class="inv-stat"><div class="lbl">Total cost value</div><div class="val">${money(totalCost)}</div></div>
     <div style="width:1px;background:var(--line);margin:0 20px"></div>
     <div class="inv-stat"><div class="lbl">Total sell value</div><div class="val">${money(totalSell)}</div></div>
     <div style="width:1px;background:var(--line);margin:0 20px"></div>
     <div class="inv-stat"><div class="lbl">Unrealised profit</div><div class="val" style="color:var(--accent-ink)">${money(totalSell-totalCost)}</div></div>
     <div style="width:1px;background:var(--line);margin:0 20px"></div>
     <div class="inv-stat"><div class="lbl">Low stock items</div><div class="val" style="color:${lowStock.length?'var(--amber)':'var(--ink)'}">${lowStock.length}</div></div>
   </div>
   <div class="tabs" style="margin-bottom:14px">
     <button class="${_stockTab==='overview'?'active':''}" onclick="_stockTab='overview';viewStock()">Overview</button>
     <button class="${_stockTab==='movements'?'active':''}" onclick="_stockTab='movements';viewStock()">Movements</button>
     <button class="${_stockTab==='audit'?'active':''}" onclick="_stockTab='audit';viewStock()">Stock Count (Audit)</button>
   </div>
   <div id="stockPanel"></div>`;
  if(_stockTab==='overview')     renderStockOverview(tracked,lowStock);
  else if(_stockTab==='movements') renderStockMovements();
  else                             renderStockAudit(tracked);
  renderIcons(c);
}
function renderStockOverview(tracked,lowStock){
  const p=document.getElementById('stockPanel');
  if(lowStock.length){
    p.innerHTML+=`<div class="card pad" style="background:var(--amber-soft);border-color:var(--amber);margin-bottom:12px">
      <b>⚠ Low stock alerts</b>
      <div style="display:flex;flex-wrap:wrap;gap:8px;margin-top:8px">
        ${lowStock.map(i=>`<div style="background:var(--card);border:1px solid var(--amber);border-radius:9px;padding:7px 12px;font-size:13px">
          <b>${esc(i.name)}</b> — ${i.stockQty||0} ${esc(i.unit||'pc')} (reorder at ${i.reorderLevel})
          <button class="btn amber tiny" style="margin-left:8px" onclick='openStockAdjust("${i.id}")'>Receive stock</button>
        </div>`).join('')}
      </div>
    </div>`;
  }
  const rows=tracked.sort((a,b)=>(a.name||'').localeCompare(b.name||''));
  const grandCost=rows.reduce((s,i)=>s+(i.stockQty||0)*(i.costPrice||0),0);
  const grandSell=rows.reduce((s,i)=>s+(i.stockQty||0)*(i.unitPrice||0),0);
  p.innerHTML+=`<div class="tbl"><table><thead><tr>
    <th>Product</th><th class="right">Stock qty</th><th class="right">Reorder at</th>
    <th class="right">Cost/unit</th><th class="right">Stock cost value</th><th class="right">Stock sell value</th><th></th>
  </tr></thead><tbody>
  ${rows.map(i=>{
    const qty=i.stockQty||0, cv=qty*(i.costPrice||0), sv=qty*(i.unitPrice||0);
    const cls=qty<=0?'stk-out':i.reorderLevel>0&&qty<=i.reorderLevel?'stk-low':'stk-good';
    return`<tr>
      <td style="font-weight:600">${esc(i.name)}<div class="muted" style="font-size:11px">${esc(i.unit||'pc')}</div></td>
      <td class="right"><span class="stk-badge ${cls}">${qty<=0?'Out':qty}</span></td>
      <td class="right mono muted">${i.reorderLevel||'—'}</td>
      <td class="right mono muted">${i.costPrice?money(i.costPrice):'—'}</td>
      <td class="right mono" style="font-weight:600">${i.costPrice?money(cv):'—'}</td>
      <td class="right mono">${money(sv)}</td>
      <td><div class="rowacts"><button class="iconbtn" title="Adjust stock" onclick='openStockAdjust("${i.id}")'>${svg('layers')}</button></div></td>
    </tr>`;
  }).join('')}
  </tbody><tfoot><tr style="background:#fbf9f3;font-weight:700">
    <td colspan="4" style="padding:10px 14px">Total</td>
    <td class="right mono" style="padding:10px 14px">${money(grandCost)}</td>
    <td class="right mono" style="padding:10px 14px">${money(grandSell)}</td>
    <td></td>
  </tr></tfoot></table></div>
  <div style="margin-top:12px"><button class="btn accent sm" onclick='openStockAdjust()'>+ Receive / Adjust stock</button></div>`;
  renderIcons(p);
}
function renderStockMovements(){
  const p=document.getElementById('stockPanel');
  const mvs=(State.db.stockMovements||[]).slice(0,200);
  const typeLabel={receive:'📥 Receive',sale:'🛒 Sale',adjust:'✏️ Adjust',count:'📋 Count'};
  const typeCls={receive:'mv-in',sale:'mv-out',adjust:'mv-adj',count:'mv-count'};
  if(!mvs.length){p.innerHTML=emptyBox('No stock movements yet','Movements are recorded automatically from POS sales and manual adjustments.');return;}
  if(isMob()){
    p.innerHTML=`<div class="mob-cards">${mvs.map(m=>`<div class="mob-card">
      <div class="mob-card-top"><span class="mv-pill ${typeCls[m.type]||'mv-adj'}">${typeLabel[m.type]||m.type}</span><span class="muted" style="font-size:12px">${fmtDate(m.date)}</span></div>
      <div class="mob-card-name">${esc(m.itemName)}</div>
      <div class="mob-card-meta">${esc(m.reference||'')}${m.note?` · ${esc(m.note)}`:''}</div>
      <div class="mob-card-foot">
        <span style="font-family:'Spline Sans Mono',monospace;font-size:15px;font-weight:700;color:${m.qty>0?'var(--accent)':'var(--danger)'}">${m.qty>0?'+':''}${m.qty}</span>
        <span class="muted" style="font-size:12.5px">Balance: ${m.balance}</span>
      </div>
    </div>`).join('')}</div>`;
  } else {
    p.innerHTML=`<div class="tbl"><table><thead><tr><th>Date</th><th>Product</th><th>Type</th><th class="right">Movement</th><th class="right">Balance</th><th>Reference</th><th>Note</th></tr></thead><tbody>
    ${mvs.map(m=>`<tr>
      <td class="muted" style="white-space:nowrap">${fmtDate(m.date)}${m.time?' '+m.time:''}</td>
      <td style="font-weight:600">${esc(m.itemName)}</td>
      <td><span class="mv-pill ${typeCls[m.type]||'mv-adj'}">${typeLabel[m.type]||m.type}</span></td>
      <td class="right mono" style="font-weight:700;color:${m.qty>0?'var(--accent)':'var(--danger)'}">${m.qty>0?'+':''}${m.qty}</td>
      <td class="right mono">${m.balance}</td>
      <td class="muted">${esc(m.reference||'')}</td>
      <td class="muted" style="font-size:12.5px">${esc(m.note||'')}</td>
    </tr>`).join('')}
    </tbody></table></div>`;
  }
}
var _auditRows={};
function renderStockAudit(tracked){
  const p=document.getElementById('stockPanel');
  _auditRows={};
  p.innerHTML=`
  <div class="card pad" style="margin-bottom:12px;font-size:13.5px;background:var(--accent-soft);border-color:var(--accent)">
    <b>📋 Stock Count Instructions</b><br>
    <span class="muted">Enter the physically counted quantity for each product. The system will calculate variances and create adjustment movements automatically when you save.</span>
  </div>
  <div class="audit-grid">
    <div class="ah">Product</div>
    <div class="ah ar">System qty</div>
    <div class="ah ar">Counted</div>
    <div class="ah ar">Variance</div>
    <div class="ah ar">Cost impact</div>
    ${tracked.map(i=>`
      <div class="ac">${esc(i.name)}<div class="muted" style="font-size:11px">${esc(i.unit||'pc')}</div></div>
      <div class="ac ar"><span class="mono">${i.stockQty||0}</span></div>
      <div class="ac ar"><input type="number" step="1" min="0" id="audit_${i.id}" value="${i.stockQty||0}" oninput="calcAuditRow('${i.id}',${i.stockQty||0},${i.costPrice||0})"></div>
      <div class="ac ar" id="avar_${i.id}">—</div>
      <div class="ac ar" id="acost_${i.id}" style="font-size:12.5px">—</div>`).join('')}
  </div>
  <div style="margin-top:14px;display:flex;gap:10px;flex-wrap:wrap">
    <button class="btn accent" onclick="saveStockCount()">Save stock count & apply adjustments</button>
    <button class="btn ghost sm" onclick="resetAuditInputs()">Reset inputs to system qty</button>
  </div>`;
  renderIcons(p);
}
function calcAuditRow(id,system,costPrice){
  const el=document.getElementById('audit_'+id);if(!el)return;
  const counted=+el.value||0;
  const variance=counted-system;
  const costImpact=variance*costPrice;
  const vEl=document.getElementById('avar_'+id);
  const cEl=document.getElementById('acost_'+id);
  if(vEl){vEl.textContent=variance===0?'—':(variance>0?'+':'')+variance;vEl.className='ac ar '+(variance>0?'pos-var':variance<0?'neg-var':'');}
  if(cEl){cEl.textContent=variance===0?'—':(costImpact>=0?'+':'')+money(costImpact).replace(/^Rf\s/,'');cEl.style.color=variance===0?'var(--ink-soft)':variance>0?'var(--accent)':'var(--danger)';}
  _auditRows[id]={counted,system,variance,costPrice};
}
function saveStockCount(){
  const tracked=(State.db.items||[]).filter(i=>i.trackStock!==false);
  let adjustCount=0;
  const auditItems=[];
  tracked.forEach(i=>{
    const counted=+document.getElementById('audit_'+i.id)?.value;
    if(isNaN(counted))return;
    const system=i.stockQty||0;
    const variance=counted-system;
    auditItems.push({itemId:i.id,itemName:i.name,system,counted,variance,costImpact:variance*(i.costPrice||0)});
    if(variance!==0){addStockMovement(i.id,'count',variance,'stock-count','Physical stock count audit');adjustCount++;}
  });
  const audit={id:uid(),date:todayISO(),items:auditItems,adjustments:adjustCount};
  if(!State.db.stockAudits)State.db.stockAudits=[];
  State.db.stockAudits.unshift(audit);
  persist();
  toast(`Stock count saved — ${adjustCount} adjustment${adjustCount!==1?'s':''} applied`);
  viewStock();
}
function resetAuditInputs(){
  const tracked=(State.db.items||[]).filter(i=>i.trackStock!==false);
  tracked.forEach(i=>{const el=document.getElementById('audit_'+i.id);if(el)el.value=i.stockQty||0;});
}
function openStockAdjust(itemId){
  const items=(State.db.items||[]).filter(i=>i.trackStock!==false);
  const pre=itemId?items.find(x=>x.id===itemId):null;
  openModal('Adjust stock',`
    <div class="fgrid">
      <div class="field full"><label>Product *</label>
        <select id="sa_item" onchange="updateStockAdjustBalance()">
          ${items.map(i=>`<option value="${i.id}" ${i.id===(itemId||'')?'selected':''}>${esc(i.name)} (current: ${i.stockQty||0} ${esc(i.unit||'pc')})</option>`).join('')}
        </select></div>
      <div class="field"><label>Movement type</label>
        <select id="sa_type">
          <option value="receive">📥 Receive stock (add)</option>
          <option value="adjust">✏️ Manual adjustment (+/-)</option>
          <option value="sale">🛒 Manual issue (remove)</option>
        </select></div>
      <div class="field"><label>Quantity (always positive)</label><input id="sa_qty" type="number" step="1" min="0" placeholder="0"></div>
      <div class="field"><label>Current balance</label><div id="sa_balance" style="padding:9px 12px;border:1px solid var(--line);border-radius:10px;font-weight:700;background:var(--paper)">${pre?(pre.stockQty||0)+' '+(pre.unit||'pc'):'—'}</div></div>
      <div class="field"><label>Reference (optional)</label><input id="sa_ref" placeholder="e.g. PO-001 / Supplier name"></div>
      <div class="field"><label>Note (optional)</label><input id="sa_note" placeholder="Reason for adjustment"></div>
    </div>`,
    [{label:'Cancel',cls:'ghost',fn:closeModal},{label:'Save movement',cls:'accent',fn:()=>{
      const iid=val('sa_item');const qty=+val('sa_qty');
      if(!iid)return toast('Select a product');if(!qty||qty<0)return toast('Enter a positive quantity');
      const type=val('sa_type');
      const delta=(type==='receive'?1:-1)*qty;
      addStockMovement(iid,type,delta,val('sa_ref')||'manual',val('sa_note'));
      persist();closeModal();
      toast('Stock movement saved');
      if(State.view==='stock')viewStock();else if(State.view==='items')viewItems();
    }}]);
}
function updateStockAdjustBalance(){
  const id=document.getElementById('sa_item')?.value;
  const item=State.db.items.find(i=>i.id===id);
  const el=document.getElementById('sa_balance');
  if(el&&item)el.textContent=(item.stockQty||0)+' '+(item.unit||'pc');
}

/* ============================================================
   CUSTOMERS
   ============================================================ */
var custSearch='';
function viewCustomers(){
  const all=State.db.customers||(State.db.customers=[]);
  const docsOf=name=>State.db.quotations.concat(State.db.invoices).filter(d=>d.customer&&d.customer.name===name).length;
  const list=all.filter(c=>((c.name||'')+(c.email||'')+(c.phone||'')).toLowerCase().includes(custSearch.toLowerCase()))
    .sort((a,b)=>(a.name||'').localeCompare(b.name||''));
  document.getElementById('content').innerHTML=`
   <div class="toolbar">
     <div class="search">${svg('search')}<input placeholder="Search customers…" value="${esc(custSearch)}" oninput="custSearch=this.value;viewCustomers()"></div>
     <button class="btn accent" onclick="openCustomerEditor()">${svg('plus')} New</button>
   </div>
   ${isMob()?custCards(list,docsOf):`<div class="tbl"><table><thead><tr><th>Name</th><th>Email</th><th>Phone</th><th>Address</th><th class="right">Docs</th><th></th></tr></thead><tbody>
     ${list.map(c=>`<tr>
        <td style="font-weight:600">${esc(c.name)}${c.notes?`<div class="muted" style="font-size:12px">${esc(c.notes)}</div>`:''}</td>
        <td class="muted">${esc(c.email||'—')}</td><td class="muted">${esc(c.phone||'—')}</td>
        <td class="muted" style="font-size:12.5px">${esc((c.address||'—').split('\n')[0])}</td>
        <td class="right mono">${docsOf(c.name)}</td>
        <td><div class="rowacts">
          <button class="iconbtn" title="New quotation" onclick='quoteForCustomer("${c.id}")'>${svg('doc')}</button>
          <button class="iconbtn" onclick='openCustomerEditor("${c.id}")'>${svg('edit')}</button>
          <button class="iconbtn" onclick='delCustomer("${c.id}")'>${svg('trash')}</button>
        </div></td></tr>`).join('')}
   </tbody></table></div>`}`;
  renderIcons(document.getElementById('content'));
}
function openCustomerEditor(id){
  const c=id?(State.db.customers||[]).find(x=>x.id===id):{name:'',email:'',phone:'',address:'',notes:''};
  openModal(`${id?'Edit':'New'} customer`,`
    <div class="fgrid">
      <div class="field full"><label>Customer / company name *</label><input id="cu_name" value="${esc(c.name)}" placeholder="e.g. Reef Hotels Pvt Ltd"></div>
      <div class="field"><label>Email</label><input id="cu_email" value="${esc(c.email||'')}"></div>
      <div class="field"><label>Phone</label><input id="cu_phone" value="${esc(c.phone||'')}"></div>
      <div class="field full"><label>Address</label><textarea id="cu_addr" rows="2">${esc(c.address||'')}</textarea></div>
      <div class="field full"><label>Notes (internal)</label><textarea id="cu_notes" rows="2" placeholder="Tax ID, contact person, payment terms…">${esc(c.notes||'')}</textarea></div>
    </div>`,
    [{label:'Cancel',cls:'ghost',fn:closeModal},{label:id?'Save changes':'Add customer',cls:'accent',fn:()=>{
      const name=val('cu_name');if(!name)return toast('Customer name is required');
      if(!State.db.customers)State.db.customers=[];
      const rec={id:id||uid(),name,email:val('cu_email'),phone:val('cu_phone'),address:val('cu_addr'),notes:val('cu_notes')};
      if(id){const ix=State.db.customers.findIndex(x=>x.id===id);State.db.customers[ix]=rec;}else State.db.customers.push(rec);
      persist();closeModal();viewCustomers();toast(id?'Customer updated':'Customer added');
    }}]);
}
function delCustomer(id){confirmDel('Delete this customer? Existing documents are not affected.',()=>{State.db.customers=(State.db.customers||[]).filter(c=>c.id!==id);persist();viewCustomers();toast('Customer deleted');});}
function quoteForCustomer(id){
  const c=(State.db.customers||[]).find(x=>x.id===id);if(!c)return;
  go('quotations');
  setTimeout(()=>{ openDocEditor('quote'); editing.doc.customer={name:c.name||'',email:c.email||'',phone:c.phone||'',address:c.address||''};
    ['c_name','c_email','c_phone','c_addr'].forEach((fid,i)=>{const el=document.getElementById(fid);if(el)el.value=[c.name,c.email,c.phone,c.address][i]||'';}); },60);
}

/* ============================================================
   QUOTATIONS / INVOICES (shared)
   ============================================================ */
var docSearch={quote:'',invoice:''};
function viewDocs(type){
  const coll=type==='quote'?State.db.quotations:State.db.invoices;
  const list=coll.filter(d=>((d.number||'')+(d.customer.name||'')).toLowerCase().includes(docSearch[type].toLowerCase()))
    .sort((a,b)=>b.number<a.number?-1:1);
  const isQ=type==='quote';
  document.getElementById('content').innerHTML=`
   <div class="toolbar">
     <div class="search">${svg('search')}<input placeholder="Search ${isQ?'quotations':'invoices'}…" value="${esc(docSearch[type])}" oninput="docSearch['${type}']=this.value;viewDocs('${type}')"></div>
     <button class="btn accent" onclick="openDocEditor('${type}')">${svg('plus')} New</button>
   </div>
   ${isMob()?docCards(list,type):`<div class="tbl"><table><thead><tr><th>Number</th><th>Customer</th><th>Date</th><th>${isQ?'Valid until':'Due'}</th><th>Status</th><th class="right">Total</th><th></th></tr></thead><tbody>
     ${list.map(d=>`<tr>
       <td class="mono linkish" onclick="openDocEditor('${type}','${d.id}')">${esc(d.number)}</td>
       <td>${esc(d.customer.name||'—')}</td><td>${fmtDate(d.date)}</td><td>${fmtDate(isQ?d.validUntil:d.dueDate)}</td>
       <td>${statusSelect(type,d)}</td>
       <td class="right mono">${money(d.totals.total)}</td>
       <td><div class="rowacts">
         <button class="iconbtn" title="PDF" onclick="printDoc('${type}','${d.id}')">${svg('pdf')}</button>
         ${isQ?`<button class="iconbtn" title="Convert to invoice" onclick="convertToInvoice('${d.id}')">${svg('receipt')}</button>`
              :`<button class="iconbtn" title="Create delivery note" onclick="deliveryFromInvoice('${d.id}')">${svg('truck')}</button>`}
         <button class="iconbtn" title="Email" onclick="emailDoc('${type}','${d.id}')">${svg('send')}</button>
         <button class="iconbtn" onclick="delDoc('${type}','${d.id}')">${svg('trash')}</button>
       </div></td></tr>`).join('')}
   </tbody></table></div>`}`;
  renderIcons(document.getElementById('content'));
}
function statusSelect(type,d){
  const opts=type==='quote'?['draft','sent','accepted','declined']:['draft','unpaid','paid','overdue'];
  return `<select class="pill ${d.status}" style="border:none;font-weight:600;cursor:pointer" onchange="setStatus('${type}','${d.id}',this.value);this.className='pill '+this.value">
    ${opts.map(o=>`<option value="${o}" ${d.status===o?'selected':''}>${o}</option>`).join('')}</select>`;
}
function setStatus(type,id,st){const coll=type==='quote'?State.db.quotations:State.db.invoices;const d=coll.find(x=>x.id===id);d.status=st;persist();}

var editing=null; // {type, doc}
function openDocEditor(type,id){
  const coll=type==='quote'?State.db.quotations:State.db.invoices;
  let doc;
  if(id){doc=JSON.parse(JSON.stringify(coll.find(d=>d.id===id)));}
  else{doc=newDoc(type,State.db);}
  editing={type,id,doc};
  const isQ=type==='quote';
  openModal(`${id?'Edit':'New'} ${isQ?'quotation':'invoice'} <span class="mono muted" style="font-size:14px">${esc(doc.number)}</span>`,docEditorBody(),
    [{label:'Cancel',cls:'ghost',fn:closeModal},
     {label:'Save & preview PDF',cls:'ghost',fn:()=>{if(saveDoc())printDocObj(type,editing.doc);}},
     {label:id?'Save changes':'Create',cls:'accent',fn:()=>{if(saveDoc()){closeModal();viewDocs(type);toast('Saved');}}}],'lg');
  renderLineEditor();
}
function docEditorBody(){
  const d=editing.doc,isQ=editing.type==='quote';
  const custOpts=(State.db.customers||[]).map(c=>`<option value="${c.id}">${esc(c.name)}</option>`).join('');
  return `<div class="fgrid">
    <div class="field full"><label>Use a saved customer (optional)</label><select onchange="pickCustomer(this.value)"><option value="">— new / manual entry —</option>${custOpts}</select></div>
    <div class="field"><label>Customer name *</label><input id="c_name" value="${esc(d.customer.name)}" oninput="editing.doc.customer.name=this.value"></div>
    <div class="field"><label>Customer email</label><input id="c_email" value="${esc(d.customer.email||'')}" oninput="editing.doc.customer.email=this.value"></div>
    <div class="field"><label>Phone</label><input id="c_phone" value="${esc(d.customer.phone||'')}" oninput="editing.doc.customer.phone=this.value"></div>
    <div class="field"><label>${isQ?'Quote date':'Invoice date'}</label><input type="date" value="${d.date}" oninput="editing.doc.date=this.value"></div>
    <div class="field"><label>${isQ?'Valid until':'Due date'}</label><input type="date" value="${isQ?d.validUntil:d.dueDate}" oninput="editing.doc.${isQ?'validUntil':'dueDate'}=this.value"></div>
    <div class="field full"><label>Customer address</label><textarea id="c_addr" rows="2" oninput="editing.doc.customer.address=this.value">${esc(d.customer.address||'')}</textarea></div>
  </div>
  <h3 style="margin:8px 0 8px;font-size:14px">Line items</h3>
  <div id="lineEditor"></div>
  <div class="field full" style="margin-top:14px"><label>Notes</label><textarea rows="2" oninput="editing.doc.notes=this.value" placeholder="Optional note shown on the document">${esc(d.notes||'')}</textarea></div>`;
}
function pickCustomer(id){
  if(!id)return;
  const c=(State.db.customers||[]).find(x=>x.id===id);if(!c)return;
  editing.doc.customer={name:c.name||'',email:c.email||'',phone:c.phone||'',address:c.address||''};
  ['c_name','c_email','c_phone','c_addr'].forEach((fid,i)=>{const el=document.getElementById(fid);if(el)el.value=[c.name,c.email,c.phone,c.address][i]||'';});
}
function renderLineEditor(){
  const d=editing.doc; calcDoc(d,State.db);
  const s=State.db.settings;
  const host=document.getElementById('lineEditor');

  const itemOpts=State.db.items.map(i=>`<option value="${i.id}">${esc(i.name)}</option>`).join('');

  const cardsHtml=d.lineItems.map((li,ix)=>{
    const taxLabel=li.taxable?(s.taxLabel||'Tax')+' ✓':'No tax';
    const selectedItem=li.itemId?State.db.items.find(i=>i.id===li.itemId):null;
    return '<div class="li-card">'+
      '<div class="li-cat-wrap">'+
        '<select onchange="pickItem('+ix+',this.value)" title="Pick from product catalogue">'+
          '<option value="">📦 Pick from catalogue…</option>'+
          State.db.items.map(i=>'<option value="'+i.id+'"'+(li.itemId===i.id?' selected':'')+'>'+esc(i.name)+'</option>').join('')+
        '</select>'+
        (selectedItem&&selectedItem.unitPrice?
          '<span class="muted" style="font-size:12px;white-space:nowrap">'+money(selectedItem.unitPrice)+' / '+esc(selectedItem.unit||'pc')+'</span>':'')
      +'</div>'+
      '<input class="li-name-input" value="'+esc(li.name)+'" placeholder="Item / service description" '+
        'oninput="editing.doc.lineItems['+ix+'].name=this.value">'+
      '<div class="li-nums">'+
        '<div class="li-num-field"><label>Qty</label>'+
          '<input type="number" step="any" min="0" value="'+li.qty+'" '+
            'oninput="editing.doc.lineItems['+ix+'].qty=+this.value;recalcLines()"></div>'+
        '<div class="li-num-field"><label>Unit price</label>'+
          '<input type="number" step="0.01" min="0" value="'+li.unitPrice+'" '+
            'oninput="editing.doc.lineItems['+ix+'].unitPrice=+this.value;recalcLines()"></div>'+
        '<button class="li-tax-toggle'+(li.taxable?' on':'')+'" title="Toggle tax" '+
          'onclick="editing.doc.lineItems['+ix+'].taxable=!editing.doc.lineItems['+ix+'].taxable;recalcLines()">'+
          taxLabel+'</button>'+
        '<div class="li-amt">'+money(li.amount||0)+'</div>'+
        '<button class="iconbtn li-del" title="Remove line" onclick="editing.doc.lineItems.splice('+ix+',1);renderLineEditor()">'+svg('trash')+'</button>'+
      '</div>'+
    '</div>';
  }).join('');

  const emptyHtml=d.lineItems.length?'':
    '<div style="text-align:center;padding:20px;color:var(--ink-soft);font-size:13.5px;border:1.5px dashed var(--line);border-radius:12px;margin-bottom:10px">'+
      'No items yet — pick from your catalogue or add a custom line below.</div>';

  const totHtml=
    '<div class="li-totals"><table class="li-tot-table">'+
      '<tr><td class="li-tot-lbl">Subtotal</td><td class="li-tot-val">'+money(d.totals.subtotal)+'</td></tr>'+
      '<tr><td class="li-tot-lbl">'+esc(s.taxLabel)+' ('+s.taxRate+'%)</td><td class="li-tot-val">'+money(d.totals.tax)+'</td></tr>'+
      '<tr class="li-grand"><td class="li-tot-lbl">Total</td><td class="li-tot-val">'+money(d.totals.total)+'</td></tr>'+
    '</table></div>';

  host.innerHTML=emptyHtml+cardsHtml+
    '<button class="li-add-btn" onclick="editing.doc.lineItems.push({name:\'\',desc:\'\',qty:1,unitPrice:0,taxable:true});renderLineEditor()">'+
      svg('plus',15)+' Add line item</button>'+totHtml;
  renderIcons(host);
}
function pickItem(ix,id){if(!id)return;const it=State.db.items.find(i=>i.id===id);const li=lineFromItem(it);li.qty=editing.doc.lineItems[ix].qty||1;editing.doc.lineItems[ix]={...li};renderLineEditor();}
function recalcLines(){
  calcDoc(editing.doc,State.db);
  // Update amounts in-place (avoids rerender which loses focus)
  editing.doc.lineItems.forEach((li,ix)=>{
    const amtEls=document.querySelectorAll('.li-amt');
    if(amtEls[ix])amtEls[ix].textContent=money(li.amount||0);
  });
  // Update totals
  const d=editing.doc,s=State.db.settings;
  const rows=document.querySelectorAll('.li-tot-val');
  if(rows[0])rows[0].textContent=money(d.totals.subtotal);
  if(rows[1])rows[1].textContent=money(d.totals.tax);
  if(rows[2])rows[2].textContent=money(d.totals.total);
}
function saveDoc(){
  const d=editing.doc;
  if(!d.customer.name){toast('Customer name is required');return false;}
  if(!d.lineItems.length){toast('Add at least one line item');return false;}
  calcDoc(d,State.db);
  const coll=editing.type==='quote'?State.db.quotations:State.db.invoices;
  if(editing.id){const ix=coll.findIndex(x=>x.id===editing.id);coll[ix]=d;}
  else{coll.push(d);State.db.counters[editing.type==='quote'?'quote':'invoice']++;}
  persist();return true;
}
function delDoc(type,id){confirmDel('Delete this document?',()=>{
  if(type==='quote')State.db.quotations=State.db.quotations.filter(d=>d.id!==id);
  else State.db.invoices=State.db.invoices.filter(d=>d.id!==id);
  persist();viewDocs(type);toast('Deleted');});}
function convertToInvoice(qid){
  const q=State.db.quotations.find(d=>d.id===qid);
  const inv=newDoc('invoice',State.db);
  inv.customer={...q.customer};inv.lineItems=JSON.parse(JSON.stringify(q.lineItems));inv.quotationId=q.id;inv.notes=q.notes;
  calcDoc(inv,State.db);State.db.invoices.push(inv);State.db.counters.invoice++;q.status='accepted';persist();
  toast('Invoice '+inv.number+' created from quote');go('invoices');
}

/* ============================================================
   PDF / PRINT
   ============================================================ */
function printDoc(type,id){const coll=type==='quote'?State.db.quotations:State.db.invoices;printDocObj(type,coll.find(d=>d.id===id));}
function printDocObj(type,d){
  document.getElementById('printRoot').innerHTML=buildDocHtml(type,d);
  setTimeout(()=>window.print(),120);
}
function buildDocHtml(type,d){
  const s=State.db.settings,isQ=type==='quote';
  calcDoc(d,State.db);
  const logo=s.logo?`<img src="${s.logo}" class="d-logo">`:`<div class="d-logo">${esc(s.businessName[0]||'B')}</div>`;
  const rows=d.lineItems.map((li,i)=>`<tr><td>${i+1}</td><td><b>${esc(li.name)}</b>${li.desc?`<div style="color:#777;font-size:11px">${esc(li.desc)}</div>`:''}</td><td class="r mono">${li.qty}</td><td class="r mono">${money(li.unitPrice)}</td><td class="r mono">${money(li.amount)}</td></tr>`).join('');
  const stamp=(d.status==='paid')?'<span class="d-stamp">Paid</span>':(d.status==='accepted'?'<span class="d-stamp">Accepted</span>':'');
  return `<div class="doc">
    <div class="d-head">
      <div class="d-biz">${logo}<div><div class="d-bizname">${esc(s.businessName)}</div><div class="d-bizmeta">${esc(s.address)}${s.phone?'\n'+esc(s.phone):''}${s.email?'\n'+esc(s.email):''}</div></div></div>
      <div class="d-type"><h1>${isQ?'Quotation':'Invoice'}</h1><div class="num mono">${esc(d.number)}</div><div style="margin-top:8px">${stamp}</div></div>
    </div>
    <div class="d-meta">
      <div class="d-to"><div class="lbl">${isQ?'Quotation for':'Bill to'}</div><div class="nm">${esc(d.customer.name||'—')}</div><div style="color:#5b5d68;white-space:pre-line;margin-top:3px">${esc(d.customer.address||'')}${d.customer.email?'\n'+esc(d.customer.email):''}${d.customer.phone?'\n'+esc(d.customer.phone):''}</div></div>
      <div class="d-info">
        <div class="r"><b>${isQ?'Quote date':'Invoice date'}</b><span>${fmtDate(d.date)}</span></div>
        <div class="r"><b>${isQ?'Valid until':'Due date'}</b><span>${fmtDate(isQ?d.validUntil:d.dueDate)}</span></div>
        <div class="r"><b>Status</b><span style="text-transform:capitalize">${d.status}</span></div>
      </div>
    </div>
    <table class="d-items"><thead><tr><th>#</th><th>Description</th><th class="r">Qty</th><th class="r">Unit price</th><th class="r">Amount</th></tr></thead><tbody>${rows}</tbody></table>
    <div class="d-tot"><table>
      <tr><td class="lbl">Subtotal</td><td class="r mono">${money(d.totals.subtotal)}</td></tr>
      <tr><td class="lbl">${esc(s.taxLabel)} (${s.taxRate}%)</td><td class="r mono">${money(d.totals.tax)}</td></tr>
      <tr class="grand"><td class="lbl">Total ${esc(s.currency)}</td><td class="r mono">${money(d.totals.total)}</td></tr>
    </table></div>
    ${d.notes?`<div class="d-notes"><b>Notes</b><br>${esc(d.notes)}</div>`:''}
    ${!isQ?`<div class="d-notes"><b>Payment details</b><br>${esc(s.bankDetails)}<br><br>${esc(s.paymentTerms)}</div>`:`<div class="d-notes">${esc(s.paymentTerms)}</div>`}
    <div class="d-foot">${esc(isQ?s.quoteFooter:s.invoiceFooter)}</div>
  </div>`;
}

/* ============================================================
   DELIVERIES (PRO)
   ============================================================ */
var delSearch='';
function viewDeliveries(){
  const list=State.db.deliveries.filter(d=>((d.number||'')+(d.customer.name||'')).toLowerCase().includes(delSearch.toLowerCase())).sort((a,b)=>b.number<a.number?-1:1);
  document.getElementById('content').innerHTML=`
   <div class="toolbar">
     <div class="search">${svg('search')}<input placeholder="Search delivery notes…" value="${esc(delSearch)}" oninput="delSearch=this.value;viewDeliveries()"></div>
     <button class="btn accent" onclick="openDeliveryEditor()">${svg('plus')} New delivery note</button>
   </div>
   ${list.length?`<div class="tbl"><table><thead><tr><th>DN No.</th><th>Customer</th><th>Linked invoice</th><th>Date</th><th>Driver</th><th>Status</th><th></th></tr></thead><tbody>
     ${list.map(d=>{const inv=State.db.invoices.find(i=>i.id===d.invoiceId);return `<tr>
        <td class="mono linkish" onclick="openDeliveryEditor('${d.id}')">${esc(d.number)}</td>
        <td>${esc(d.customer.name||'—')}</td><td class="mono muted">${inv?esc(inv.number):'—'}</td><td>${fmtDate(d.date)}</td><td>${esc(d.driver||'—')}</td>
        <td>${delStatusSelect(d)}</td>
        <td><div class="rowacts"><button class="iconbtn" onclick="printDelivery('${d.id}')">${svg('pdf')}</button><button class="iconbtn" onclick="delDelivery('${d.id}')">${svg('trash')}</button></div></td>
      </tr>`}).join('')}
   </tbody></table></div>`:emptyBox('No delivery notes','Create delivery notes and track them from dispatch to delivered.')}`;
  renderIcons(document.getElementById('content'));
}
function delStatusSelect(d){const opts=['pending','dispatched','delivered','cancelled'];
  return `<select class="pill ${d.status}" style="border:none;font-weight:600;cursor:pointer" onchange="const x=State.db.deliveries.find(z=>z.id==='${d.id}');x.status=this.value;persist();this.className='pill '+this.value">${opts.map(o=>`<option ${d.status===o?'selected':''}>${o}</option>`).join('')}</select>`;}
var editingDel=null;
function openDeliveryEditor(id){
  let d=id?JSON.parse(JSON.stringify(State.db.deliveries.find(x=>x.id===id))):newDoc('delivery',State.db);
  editingDel={id,d};
  const invOpts=State.db.invoices.map(i=>`<option value="${i.id}" ${d.invoiceId===i.id?'selected':''}>${esc(i.number)} — ${esc(i.customer.name)}</option>`).join('');
  openModal(`${id?'Edit':'New'} delivery note <span class="mono muted" style="font-size:14px">${esc(d.number)}</span>`,`
    <div class="fgrid">
      <div class="field full"><label>Link to invoice</label><select id="dl_inv" onchange="fillDelFromInvoice(this.value)"><option value="">— none —</option>${invOpts}</select></div>
      <div class="field"><label>Customer name</label><input id="dl_name" value="${esc(d.customer.name)}"></div>
      <div class="field"><label>Date</label><input id="dl_date" type="date" value="${d.date}"></div>
      <div class="field"><label>Driver</label><input id="dl_driver" value="${esc(d.driver||'')}"></div>
      <div class="field"><label>Vehicle</label><input id="dl_veh" value="${esc(d.vehicle||'')}"></div>
      <div class="field full"><label>Delivery address</label><textarea id="dl_addr" rows="2">${esc(d.customer.address||'')}</textarea></div>
      <div class="field full"><label>Items / contents</label><textarea id="dl_items" rows="3" placeholder="One line per item">${esc((d.lineItems||[]).map(l=>`${l.qty} x ${l.name}`).join('\n'))}</textarea></div>
      <div class="field full"><label>Notes</label><input id="dl_notes" value="${esc(d.notes||'')}"></div>
    </div>`,
    [{label:'Cancel',cls:'ghost',fn:closeModal},{label:id?'Save':'Create',cls:'accent',fn:saveDelivery}]);
}
function fillDelFromInvoice(invId){const inv=State.db.invoices.find(i=>i.id===invId);if(!inv)return;
  document.getElementById('dl_name').value=inv.customer.name;document.getElementById('dl_addr').value=inv.customer.address||'';
  document.getElementById('dl_items').value=inv.lineItems.map(l=>`${l.qty} x ${l.name}`).join('\n');}
function saveDelivery(){
  const d=editingDel.d;
  d.invoiceId=document.getElementById('dl_inv').value||null;
  d.customer={name:val('dl_name'),address:val('dl_addr')};
  d.date=val('dl_date');d.driver=val('dl_driver');d.vehicle=val('dl_veh');d.notes=val('dl_notes');
  d.lineItems=val('dl_items').split('\n').filter(x=>x.trim()).map(line=>{const m=line.match(/^\s*(\d+)\s*x\s*(.+)$/i);return m?{qty:+m[1],name:m[2].trim()}:{qty:1,name:line.trim()};});
  if(!d.customer.name)return toast('Customer name required');
  if(editingDel.id){const ix=State.db.deliveries.findIndex(x=>x.id===editingDel.id);State.db.deliveries[ix]=d;}
  else{State.db.deliveries.push(d);State.db.counters.delivery++;}
  persist();closeModal();viewDeliveries();toast('Delivery note saved');
}
function deliveryFromInvoice(invId){if(featureLocked('deliveries')){openUpgrade();return;}
  const inv=State.db.invoices.find(i=>i.id===invId);const d=newDoc('delivery',State.db);
  d.invoiceId=inv.id;d.customer={name:inv.customer.name,address:inv.customer.address||''};
  d.lineItems=inv.lineItems.map(l=>({qty:l.qty,name:l.name}));
  State.db.deliveries.push(d);State.db.counters.delivery++;persist();toast('Delivery note '+d.number+' created');go('deliveries');}
function delDelivery(id){confirmDel('Delete this delivery note?',()=>{State.db.deliveries=State.db.deliveries.filter(d=>d.id!==id);persist();viewDeliveries();toast('Deleted');});}
function printDelivery(id){
  const d=State.db.deliveries.find(x=>x.id===id),s=State.db.settings;
  const inv=State.db.invoices.find(i=>i.id===d.invoiceId);
  const logo=s.logo?`<img src="${s.logo}" class="d-logo">`:`<div class="d-logo">${esc(s.businessName[0]||'B')}</div>`;
  const rows=d.lineItems.map((li,i)=>`<tr><td>${i+1}</td><td>${esc(li.name)}</td><td class="r mono">${li.qty}</td><td class="r">☐ received</td></tr>`).join('');
  document.getElementById('printRoot').innerHTML=`<div class="doc">
    <div class="d-head"><div class="d-biz">${logo}<div><div class="d-bizname">${esc(s.businessName)}</div><div class="d-bizmeta">${esc(s.address)}${s.phone?'\n'+esc(s.phone):''}</div></div></div>
      <div class="d-type"><h1>Delivery Note</h1><div class="num mono">${esc(d.number)}</div></div></div>
    <div class="d-meta"><div class="d-to"><div class="lbl">Deliver to</div><div class="nm">${esc(d.customer.name)}</div><div style="white-space:pre-line;color:#5b5d68;margin-top:3px">${esc(d.customer.address||'')}</div></div>
      <div class="d-info"><div class="r"><b>Date</b><span>${fmtDate(d.date)}</span></div>${inv?`<div class="r"><b>Invoice</b><span class="mono">${esc(inv.number)}</span></div>`:''}<div class="r"><b>Driver</b><span>${esc(d.driver||'—')}</span></div><div class="r"><b>Vehicle</b><span>${esc(d.vehicle||'—')}</span></div></div></div>
    <table class="d-items"><thead><tr><th>#</th><th>Item</th><th class="r">Qty</th><th class="r">Check</th></tr></thead><tbody>${rows}</tbody></table>
    ${d.notes?`<div class="d-notes"><b>Notes</b><br>${esc(d.notes)}</div>`:''}
    <div style="display:flex;justify-content:space-between;margin-top:60px;font-size:12px;color:#5b5d68">
      <div style="border-top:1px solid #aaa;padding-top:6px;width:200px">Delivered by (signature)</div>
      <div style="border-top:1px solid #aaa;padding-top:6px;width:200px">Received by (signature)</div></div>
    <div class="d-foot">${esc(s.businessName)} — Delivery Note</div></div>`;
  setTimeout(()=>window.print(),120);
}

/* ============================================================
   EMAIL (PRO) — demo: queues to Outbox. Production: backend sends.
   ============================================================ */
var emailTab='outbox';
function viewEmail(){
  document.getElementById('content').innerHTML=`
    <div class="between" style="margin-bottom:14px"><div class="tabs">
      <button class="${emailTab==='outbox'?'active':''}" onclick="emailTab='outbox';viewEmail()">Sent / Outbox</button>
      <button class="${emailTab==='inbox'?'active':''}" onclick="emailTab='inbox';viewEmail()">Inbox</button>
    </div><button class="btn accent" onclick="composeEmail()">${svg('send')} Compose</button></div>
    <div id="emailList"></div>`;
  const host=document.getElementById('emailList');
  if(emailTab==='inbox'){
    host.innerHTML=`<div class="card pad" style="border-style:dashed"><div class="row" style="gap:14px"><div class="ic" style="width:40px;height:40px;border-radius:10px;background:var(--accent-soft);color:var(--accent-ink);display:grid;place-items:center">${svg('mail',20)}</div>
      <div><b>Inbox sync requires email integration.</b><div class="muted" style="font-size:13px;margin-top:3px">Connect a Gmail account (backend) or an inbound-parse service to receive replies here. See the setup guide — this is the one feature that needs an external mail service.</div></div></div></div>`;
    renderIcons(host);return;
  }
  const sent=State.db.emails.slice().reverse();
  host.innerHTML=sent.length?`<div class="tbl"><table><thead><tr><th>To</th><th>Subject</th><th>Attachment</th><th>Date</th><th>Status</th></tr></thead><tbody>
    ${sent.map(e=>`<tr><td>${esc(e.to)}</td><td>${esc(e.subject)}</td><td class="mono muted">${esc(e.attach||'—')}</td><td>${fmtDate(e.date)}</td><td><span class="pill sent">queued</span></td></tr>`).join('')}
  </tbody></table></div>`:emptyBox('No emails yet','Send a quotation or invoice by email, or compose a new message.');
  renderIcons(host);
}
function emailDoc(type,id){
  if(featureLocked('email')){toast('Emailing documents is a Pro feature');openUpgrade();return;}
  const coll=type==='quote'?State.db.quotations:State.db.invoices;const d=coll.find(x=>x.id===id);
  composeEmail({to:d.customer.email||'',subject:`${type==='quote'?'Quotation':'Invoice'} ${d.number} from ${State.db.settings.businessName}`,
    body:`Dear ${d.customer.name||'Customer'},\n\nPlease find attached ${type==='quote'?'our quotation':'invoice'} ${d.number} for ${money(d.totals.total)}.\n\n${type==='quote'?State.db.settings.quoteFooter:State.db.settings.invoiceFooter}\n\nRegards,\n${State.db.settings.businessName}`,
    attach:d.number+'.pdf', docHtml:buildDocHtml(type,d)});
}
function composeEmail(pre={}){
  if(featureLocked('email')){openUpgrade();return;}
  openModal('Compose email',`
    <div class="field"><label>To</label><input id="em_to" value="${esc(pre.to||'')}" placeholder="customer@email.com"></div>
    <div class="field"><label>Subject</label><input id="em_subj" value="${esc(pre.subject||'')}"></div>
    <div class="field"><label>Message</label><textarea id="em_body" rows="8">${esc(pre.body||'')}</textarea></div>
    ${pre.attach?`<div class="muted" style="font-size:13px">📎 Attachment: <span class="mono">${esc(pre.attach)}</span> (PDF generated on send)</div>`:''}`,
    [{label:'Cancel',cls:'ghost',fn:closeModal},{label:'Send',cls:'accent',fn:async ()=>{
      const to=val('em_to');if(!to)return toast('Recipient required');
      toast('Sending…');
      const r=await call('sendEmail',{to,subject:val('em_subj'),body:val('em_body'),docHtml:pre.docHtml||'',fileName:(pre.attach||'document').replace(/\.pdf$/,'')});
      if(!r.ok)return toast(r.error||'Send failed');
      State.db.emails.push({id:uid(),to,subject:val('em_subj'),body:val('em_body'),attach:pre.attach||'',date:todayISO()});
      persist();closeModal();toast('Email sent');if(State.view==='email')viewEmail();
    }}]);
}

/* ============================================================
   SETTINGS
   ============================================================ */
function viewSettings(){
  const s=State.db.settings;
  document.getElementById('content').innerHTML=`
   <div class="grid set-grid">
    <div class="card pad">
      <h3 style="margin-bottom:14px">Business profile</h3>
      <div class="field"><label>Logo</label><div class="logo-drop">
        <div class="logo-prev" id="logoPrev">${s.logo?`<img src="${s.logo}">`:esc(s.businessName[0]||'B')}</div>
        <div><input type="file" id="logoFile" accept="image/*" style="font-size:12px"><div class="muted" style="font-size:12px;margin-top:6px">PNG/JPG, square works best.</div>
        ${s.logo?'<button class="btn ghost tiny" style="margin-top:6px" onclick="State.db.settings.logo=\'\';persist();refreshChrome();viewSettings()">Remove</button>':''}</div>
      </div></div>
      <div class="field"><label>Business name</label><input id="s_biz" value="${esc(s.businessName)}"></div>
      <div class="field"><label>Address</label><textarea id="s_addr" rows="2">${esc(s.address)}</textarea></div>
      <div class="fgrid"><div class="field"><label>Phone</label><input id="s_phone" value="${esc(s.phone)}"></div>
      <div class="field"><label>Email</label><input id="s_email" value="${esc(s.email)}"></div></div>
    </div>
    <div class="card pad">
      <h3 style="margin-bottom:14px">Tax &amp; currency</h3>
      <div class="fgrid">
        <div class="field"><label>Currency code</label><input id="s_cur" value="${esc(s.currency)}"></div>
        <div class="field"><label>Currency symbol</label><input id="s_sym" value="${esc(s.currencySymbol)}"></div>
        <div class="field"><label>Tax label</label><input id="s_tlbl" value="${esc(s.taxLabel)}"></div>
        <div class="field"><label>Tax rate (%)</label><input id="s_trate" type="number" step="0.1" value="${s.taxRate}"></div>
      </div>
      <h3 style="margin:16px 0 14px">Document numbering</h3>
      <div class="fgrid">
        <div class="field"><label>Quote prefix</label><input id="s_qpre" value="${esc(s.quotePrefix)}"></div>
        <div class="field"><label>Invoice prefix</label><input id="s_ipre" value="${esc(s.invoicePrefix)}"></div>
        <div class="field"><label>Delivery prefix</label><input id="s_dpre" value="${esc(s.deliveryPrefix)}"></div>
        <div class="field"><label>Quote validity (days)</label><input id="s_qval" type="number" value="${s.quoteValidity}"></div>
      </div>
    </div>
    <div class="card pad" style="grid-column:1/-1">
      <h3 style="margin-bottom:14px">Document text</h3>
      <div class="fgrid">
        <div class="field"><label>Payment terms (invoices)</label><textarea id="s_terms" rows="2">${esc(s.paymentTerms)}</textarea></div>
        <div class="field"><label>Bank / payment details</label><textarea id="s_bank" rows="2">${esc(s.bankDetails)}</textarea></div>
        <div class="field"><label>Quote footer</label><input id="s_qfoot" value="${esc(s.quoteFooter)}"></div>
        <div class="field"><label>Invoice footer</label><input id="s_ifoot" value="${esc(s.invoiceFooter)}"></div>
      </div>
    </div>
    <div class="card pad" style="grid-column:1/-1">
      <div style="display:flex;justify-content:space-between;align-items:flex-start;gap:12px;margin-bottom:14px">
        <div>
          <h3 style="margin-bottom:3px">POS Staff Access</h3>
          <p class="muted" style="font-size:12.5px">Share this link with staff. They open it on any device and sign in with their PIN — no portal account needed.</p>
        </div>
        <button class="btn ghost tiny" style="flex-shrink:0;color:var(--danger);border-color:var(--danger)" onclick="resetPosToken()">Reset</button>
      </div>
      <!-- URL display — tap to copy on mobile -->
      <div onclick="copyPosLink()" title="Tap to copy" style="background:var(--paper);border:1.5px solid var(--line);border-radius:11px;padding:13px 14px;margin-bottom:12px;cursor:pointer;display:flex;align-items:center;gap:10px;-webkit-user-select:none;user-select:none">
        <span style="font-size:16px;flex-shrink:0">🔗</span>
        <div style="flex:1;min-width:0">
          <div style="font-size:10.5px;font-weight:700;text-transform:uppercase;letter-spacing:.05em;color:var(--ink-soft);margin-bottom:3px">Staff POS link — tap to copy</div>
          <div style="font-size:12px;font-family:monospace;color:var(--accent-ink);overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${(location.href.split('?')[0].split('/').slice(0,-1).join('/')+'/')+'pos.html?t='+esc(s.posToken||'')}</div>
        </div>
        <span style="font-size:18px;flex-shrink:0;opacity:.4">⎘</span>
      </div>
      <!-- hidden input for clipboard fallback -->
      <input id="s_poslink" readonly style="position:absolute;opacity:0;pointer-events:none;width:1px;height:1px" value="${(location.href.split('?')[0].split('/').slice(0,-1).join('/')+'/')+'pos.html?t='+esc(s.posToken||'')}">
      <!-- action buttons — stacked on mobile -->
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px">
        <button class="btn accent" style="padding:13px" onclick="copyPosLink()">${svg('copy',15)} Copy link</button>
        <button class="btn ghost" style="padding:13px" onclick="window.open(document.getElementById('s_poslink').value,'_blank')">Open POS ↗</button>
      </div>
      <button id="posShareBtn" style="display:none;width:100%;margin-top:8px;padding:11px" class="btn ghost" onclick="sharePosLink()">↑ Share link…</button>
      <p class="muted" style="font-size:11.5px;margin-top:10px">Resetting the link immediately revokes all current staff access. Staff will need to bookmark the new URL.</p>
    </div>
    <div class="card pad" style="grid-column:1/-1">
      <h3 style="margin-bottom:4px">Units of measure (UOM)</h3>
      <p class="muted" style="font-size:12.5px;margin-bottom:12px">These appear in the unit dropdown when adding products. Add your own or remove ones you don't use.</p>
      <div class="uom-tags" id="uomTagList">${(s.uoms||[]).map(u=>`<span class="uom-tag">${esc(u)}<button onclick="removeUOM('${esc(u)}')">×</button></span>`).join('')}</div>
      <div class="row" style="margin-top:12px;gap:8px">
        <input id="s_newuom" placeholder="Add unit (e.g. carton)" style="flex:1;padding:8px 11px;border:1px solid var(--line-strong);border-radius:9px;font-family:inherit;font-size:14px" onkeydown="if(event.key==='Enter')addUOM()">
        <button class="btn ghost sm" onclick="addUOM()">+ Add</button>
      </div>
    </div>
    <div class="card pad" style="grid-column:1/-1">
      <h3 style="margin-bottom:4px">Email sending</h3>
      <p class="muted" style="font-size:12.5px;margin-bottom:14px">Emails send from your Google account. Set a display name and reply-to address so customers reply to the right place.</p>
      <div class="fgrid">
        <div class="field"><label>Sender display name</label><input id="s_sname" value="${esc(s.senderName||s.businessName)}" placeholder="${esc(s.businessName)}"></div>
        <div class="field"><label>Reply-to email</label><input id="s_semail" value="${esc(s.senderEmail||s.email)}" placeholder="${esc(s.email)}"></div>
        <div class="field"><label>POS receipt prefix</label><input id="s_pos" value="${esc(s.posPrefix||'TXN-')}"></div>
      </div>
      <div style="margin-top:16px"><button class="btn accent" onclick="saveSettings()">Save all settings</button></div>
    </div>
   </div>`;
  document.getElementById('logoFile').onchange=e=>{const f=e.target.files[0];if(!f)return;const r=new FileReader();r.onload=()=>{State.db.settings.logo=r.result;document.getElementById('logoPrev').innerHTML=`<img src="${r.result}">`;persist();refreshChrome();};r.readAsDataURL(f);};
  // Show native share button on mobile devices that support it
  const sb=document.getElementById('posShareBtn');if(sb&&navigator.share)sb.style.display='block';
}
function saveSettings(){
  const s=State.db.settings;
  s.businessName=val('s_biz')||s.businessName;s.address=val('s_addr');s.phone=val('s_phone');s.email=val('s_email');
  s.currency=val('s_cur');s.currencySymbol=val('s_sym');s.taxLabel=val('s_tlbl');s.taxRate=+val('s_trate')||0;
  s.quotePrefix=val('s_qpre');s.invoicePrefix=val('s_ipre');s.deliveryPrefix=val('s_dpre');s.quoteValidity=+val('s_qval')||14;
  s.paymentTerms=val('s_terms');s.bankDetails=val('s_bank');s.quoteFooter=val('s_qfoot');s.invoiceFooter=val('s_ifoot');
  s.senderName=val('s_sname')||s.businessName;s.senderEmail=val('s_semail')||s.email;
  if(val('s_pos'))s.posPrefix=val('s_pos');
  persist();refreshChrome();toast('Settings saved');
}

/* ============================================================
   ZAKAT CALCULATOR
   ============================================================ */
/* ============================================================
   ZAKAT CALCULATOR  — zakāt al-māl
   2.5 % on net qualifying wealth above nisab.
   Maldives: pay via MIRA 510 form.
   ============================================================ */

function zkHijriYear() {
  return String(Math.floor((new Date().getFullYear() - 622) * 1.0307)) + ' AH';
}
function zkNisab(rec) {
  var s   = State.db.settings;
  var std = rec.nisabStd || s.zakatNisabStd || 'silver';
  var sp  = +(rec.silverPrice  || s.zakatSilverPrice) || 32.82;
  var gp  = +(rec.goldPrice    || s.zakatGoldPrice)   || 440;
  return std === 'gold' ? 85 * gp : 595 * sp;
}
function zkCalc(rec) {
  var s   = State.db.settings;
  var gp  = +(rec.goldPrice   || s.zakatGoldPrice)   || 0;
  var sp  = +(rec.silverPrice || s.zakatSilverPrice)  || 32.82;
  var total =
    (+(rec.inventory    || 0)) +
    (+(rec.receivables  || 0)) +
    (+(rec.cashInHand   || 0)) +
    (+(rec.bankBalance  || 0)) +
    (+(rec.goldGrams    || 0)) * gp +
    (+(rec.silverGrams  || 0)) * sp +
    (+(rec.loanedMoney  || 0)) +
    (+(rec.investments  || 0)) +
    (+(rec.otherAssets  || 0));
  var debts  = (+(rec.immediateDebts || 0)) + (+(rec.otherDebts || 0));
  var net    = Math.max(0, total - debts);
  var nisab  = zkNisab(rec);
  var above  = net >= nisab;
  var due    = above ? +(net * 0.025).toFixed(2) : 0;
  return { total: total, debts: debts, net: net, nisab: nisab, above: above, due: due };
}

/* ---- current edit record (used by calculator form) ---- */
var _zkRec    = {};
var _zkEditId = null;
var _zkBankEntries = []; // [{date:'YYYY-MM-DD', balance:Number}] parsed from uploaded PDF statement

/* ---- main list view ---- */
function viewZakat() {
  var s       = State.db.settings;
  var records = (State.db.zakatRecords || []).slice().sort(function(a, b) {
    return b.date > a.date ? 1 : -1;
  });
  var nisab    = zkNisab({});
  var stdLabel = (s.zakatNisabStd === 'gold') ? 'Gold (85 g)' : 'Silver (595 g)';
  var stdPrice = (s.zakatNisabStd === 'gold') ? s.zakatGoldPrice : s.zakatSilverPrice;

  var heroHtml =
    '<div class="zk-hero">' +
      '<h2>☪ Zakat al-Māl Calculator</h2>' +
      '<p style="opacity:.85;font-size:13.5px;margin-top:3px">Annual 2.5 % obligation on net qualifying wealth above the nisab.</p>' +
      '<div class="sub">' +
        'Current nisab (' + stdLabel + ' standard): <strong>' + money(nisab) + '</strong>' +
        ' <span style="opacity:.7;font-size:11.5px;margin-left:6px">(' + stdLabel + ' &times; ' +
        money(stdPrice).split(' ').pop() + ' / g)</span>' +
      '</div>' +
    '</div>';

  var tableRows = '';
  for (var i = 0; i < records.length; i++) {
    var r   = records[i];
    var res = zkCalc(r);
    var dueCell  = res.above ? money(res.due)   : '<span class="muted">Below nisab</span>';
    var dueColor = res.above ? 'var(--accent-ink)' : '';
    var statusHtml = r.paid
      ? '<span class="pill paid">Paid ✓</span>'
      : '<span class="pill unpaid">Unpaid</span>';
    tableRows +=
      '<tr>' +
        '<td style="font-weight:600">' + esc(r.hijriYear || '—') + '</td>' +
        '<td class="muted">' + fmtDate(r.date) + '</td>' +
        '<td class="muted" style="font-size:12.5px">' +
          (r.nisabStd === 'gold' ? 'Gold 85 g' : 'Silver 595 g') +
        '</td>' +
        '<td class="mono">' + money(res.net) + '</td>' +
        '<td class="mono" style="font-weight:700;color:' + dueColor + '">' + dueCell + '</td>' +
        '<td>' + statusHtml + '</td>' +
        '<td><div class="rowacts">' +
          '<button class="iconbtn" onclick="zkOpenEdit(\'' + r.id + '\')">' + svg('edit') + '</button>' +
          '<button class="iconbtn" onclick="zkDelete(\'' + r.id + '\')">' + svg('trash') + '</button>' +
        '</div></td>' +
      '</tr>';
  }
  var tableHtml = records.length
    ? '<div class="tbl"><table>' +
        '<thead><tr><th>Hijri Year</th><th>Date</th><th>Standard</th>' +
        '<th>Net Wealth</th><th>Zakat Due</th><th>Status</th><th></th></tr></thead>' +
        '<tbody>' + tableRows + '</tbody>' +
      '</table></div>'
    : emptyBox('No zakat calculations yet',
        'Start a new calculation to determine your annual zakat obligation.');

  var infoHtml =
    '<div class="card pad" style="margin-top:16px;font-size:13px;color:var(--ink-soft)">' +
      '<b style="color:var(--ink)">&#8505; Paying in the Maldives</b><br>' +
      'Zakat al-m&#257;l is collected by ' +
      '<a href="https://www.mira.gov.mv" target="_blank" class="linkish">MIRA</a> ' +
      'using the <b>MIRA 510 form</b>. Pay online at mira.gov.mv, at the Taxpayer ' +
      'Service Centre, or at your local island council.<br>' +
      'Ministry of Islamic Affairs: <b>800&nbsp;300&nbsp;8901</b> &nbsp;&middot;&nbsp; ' +
      'MIRA hotline: <b>1415</b>' +
    '</div>';

  var toolbarHtml =
    '<div class="between" style="margin-bottom:14px">' +
      '<div></div>' +
      '<div class="row" style="gap:8px">' +
        '<button class="btn ghost sm" onclick="zkOpenSettings()">&#9881; Nisab settings</button>' +
        '<button class="btn accent" onclick="zkStartNew()">+ New Calculation</button>' +
      '</div>' +
    '</div>';

  var c = document.getElementById('content');
  c.innerHTML = heroHtml + toolbarHtml + tableHtml + infoHtml;
  renderIcons(c);
}

/* ---- start new / open existing ---- */
function zkStartNew() {
  var s = State.db.settings;
  var inventory = State.db.items
    .filter(function(i) { return i.trackStock !== false && (i.stockQty || 0) > 0; })
    .reduce(function(t, i) { return t + (i.stockQty || 0) * (i.costPrice || 0); }, 0);
  var receivables = State.db.invoices
    .filter(function(i) { return i.status !== 'paid'; })
    .reduce(function(t, i) { return t + ((i.totals && i.totals.total) || 0); }, 0);
  _zkRec = {
    id: uid(), date: todayISO(), hijriYear: zkHijriYear(),
    nisabStd: s.zakatNisabStd, silverPrice: s.zakatSilverPrice, goldPrice: s.zakatGoldPrice,
    inventory: inventory, receivables: receivables,
    cashInHand: 0, bankBalance: 0, goldGrams: 0, silverGrams: 0,
    loanedMoney: 0, investments: 0, otherAssets: 0,
    immediateDebts: 0, otherDebts: 0,
    paid: false, paidDate: '', paidAmount: 0, paidVia: '', notes: ''
  };
  _zkEditId = null;
  zkRenderCalc();
}
function zkOpenEdit(id) {
  var r = (State.db.zakatRecords || []).find(function(x) { return x.id === id; });
  if (!r) return;
  _zkRec    = JSON.parse(JSON.stringify(r));
  _zkEditId = id;
  zkRenderCalc();
}

/* ---- build calculator form ---- */
function zkInputRow(label, id, hint, oninput) {
  var v = +(_zkRec[id.replace('zk_', '').replace('zk', '')] || 0);
  /* map field id to rec key */
  var keyMap = {
    zk_inv:  'inventory',  zk_rec:  'receivables', zk_cash: 'cashInHand',
    zk_bank: 'bankBalance',zk_gg:   'goldGrams',    zk_sg:   'silverGrams',
    zk_loan: 'loanedMoney',zk_inv2: 'investments',  zk_oth:  'otherAssets',
    zk_dbt1: 'immediateDebts', zk_dbt2: 'otherDebts',
    zk_sp:   'silverPrice', zk_gp: 'goldPrice'
  };
  v = +(_zkRec[keyMap[id]] || 0);
  return '<div class="field">' +
    '<label>' + label + '</label>' +
    '<input id="' + id + '" type="number" step="0.01" value="' + v + '" oninput="' + oninput + '">' +
    (hint ? '<div class="muted" style="font-size:12px;margin-top:3px">' + hint + '</div>' : '') +
    '</div>';
}
/* ============================================================
   ZAKAT — Bank Statement (PDF) import
   Client-side PDF text extraction (pdf.js) + heuristic parsing
   of date + running-balance pairs, so the user can pick a
   balance for any date or date range and apply it to the
   "Bank balance" field used in the zakat calculation.
   ============================================================ */

function zkBankSectionHtml() {
  var hasEntries = _zkBankEntries.length > 0;
  return '<div class="zk-sec" id="zk_bankSec">' +
    '<h4>&#127974; Bank Statement (PDF) <span class="auto-tag" style="background:var(--paper);color:var(--ink-soft)">optional</span></h4>' +
    '<p class="muted" style="font-size:12.5px;margin-bottom:10px">' +
      'Upload a bank statement PDF to automatically detect your balance on any date. ' +
      'Useful for finding the balance on your zakat anniversary, or the lowest balance ' +
      'held during the year (the more cautious method some scholars recommend).' +
    '</p>' +
    '<input type="file" id="zk_bankFile" accept="application/pdf" onchange="zkHandleBankPdf(this)" ' +
      'style="font-size:13px">' +
    '<div id="zk_bankStatus" class="muted" style="font-size:12.5px;margin-top:8px">' +
      (hasEntries ? '' : '') +
    '</div>' +
    '<div id="zk_bankResults"></div>' +
  '</div>';
}

/* ---- read PDF, preserving rough line structure via Y-position grouping ---- */
async function zkExtractPdfLines(pdf) {
  var lines = [];
  for (var p = 1; p <= pdf.numPages; p++) {
    var page = await pdf.getPage(p);
    var content = await page.getTextContent();
    var byY = {};
    content.items.forEach(function(it) {
      var y = Math.round(it.transform[5]);
      if (!byY[y]) byY[y] = [];
      byY[y].push({ x: it.transform[4], str: it.str });
    });
    var ys = Object.keys(byY).map(Number).sort(function(a, b) { return b - a; });
    ys.forEach(function(y) {
      var row = byY[y]
        .sort(function(a, b) { return a.x - b.x; })
        .map(function(o) { return o.str; })
        .join(' ');
      if (row.trim()) lines.push(row);
    });
  }
  return lines;
}

/* ---- month-name lookup for "05 Jan 2026" style dates ---- */
var ZK_MONTHS = {
  jan:0, feb:1, mar:2, apr:3, may:4, jun:5,
  jul:6, aug:7, sep:8, oct:9, nov:10, dec:11
};
function zkPad(n) { return n < 10 ? '0' + n : '' + n; }

/* ---- try to find one date in a line of text; returns {iso, matchedStr} or null ---- */
function zkFindDate(line) {
  var m;
  // dd/mm/yyyy or dd-mm-yyyy or dd.mm.yyyy
  m = line.match(/\b(\d{1,2})[\/\-.](\d{1,2})[\/\-.](\d{4})\b/);
  if (m) {
    var d = +m[1], mo = +m[2], y = +m[3];
    if (mo >= 1 && mo <= 12 && d >= 1 && d <= 31) {
      return { iso: y + '-' + zkPad(mo) + '-' + zkPad(d), matched: m[0] };
    }
  }
  // yyyy-mm-dd
  m = line.match(/\b(\d{4})-(\d{1,2})-(\d{1,2})\b/);
  if (m) {
    return { iso: m[1] + '-' + zkPad(+m[2]) + '-' + zkPad(+m[3]), matched: m[0] };
  }
  // dd MMM yyyy  /  dd-MMM-yyyy  (e.g. 05 Jan 2026, 05-Jan-2026)
  m = line.match(/\b(\d{1,2})[\s\-]([A-Za-z]{3,9})[\s\-](\d{4})\b/);
  if (m) {
    var mon = ZK_MONTHS[m[2].toLowerCase().slice(0,3)];
    if (mon !== undefined) {
      return { iso: m[3] + '-' + zkPad(mon+1) + '-' + zkPad(+m[1]), matched: m[0] };
    }
  }
  return null;
}

/* ---- find the last plausible currency number in a line (after removing the date) ---- */
function zkFindLastNumber(line) {
  var nums = line.match(/-?\(?\d{1,3}(?:,\d{3})*(?:\.\d{1,2})?\)?/g);
  if (!nums || !nums.length) return null;
  var last = nums[nums.length - 1];
  var neg = /^\(.*\)$/.test(last);
  var clean = last.replace(/[(),]/g, '');
  var val = parseFloat(clean);
  if (isNaN(val)) return null;
  return neg ? -val : val;
}

/* ---- parse extracted lines into [{date, balance}] sorted ascending ---- */
function zkParseBankLines(lines) {
  var out = [];
  lines.forEach(function(line) {
    var dateInfo = zkFindDate(line);
    if (!dateInfo) return;
    var rest = line.replace(dateInfo.matched, '');
    var bal = zkFindLastNumber(rest);
    if (bal === null) return;
    out.push({ date: dateInfo.iso, balance: bal });
  });
  out.sort(function(a, b) { return a.date < b.date ? -1 : a.date > b.date ? 1 : 0; });
  return out;
}

/* ---- main handler: read file → pdf.js → parse → render ---- */
async function zkHandleBankPdf(inputEl) {
  var file = inputEl.files && inputEl.files[0];
  if (!file) return;
  var statusEl = document.getElementById('zk_bankStatus');
  var resultsEl = document.getElementById('zk_bankResults');
  statusEl.textContent = 'Reading PDF…';
  resultsEl.innerHTML = '';
  if (!window.pdfjsLib) {
    statusEl.innerHTML = '&#9888; PDF reader did not load. Check your internet connection and try again.';
    return;
  }
  try {
    var buf = await file.arrayBuffer();
    var pdf = await pdfjsLib.getDocument({ data: buf }).promise;
    var lines = await zkExtractPdfLines(pdf);
    var entries = zkParseBankLines(lines);
    if (!entries.length) {
      statusEl.innerHTML = '&#9888; Could not automatically detect date/balance rows in this PDF. ' +
        'Different banks format statements differently — you can still enter the bank balance manually above.';
      return;
    }
    _zkBankEntries = entries;
    statusEl.innerHTML = '&#10003; Detected <b>' + entries.length + '</b> balance entries from ' +
      fmtDate(entries[0].date) + ' to ' + fmtDate(entries[entries.length-1].date) + '.';
    zkRenderBankResults();
  } catch(e) {
    statusEl.textContent = 'Could not read this PDF: ' + e.message;
  }
}

/* ---- compute a snapshot balance for a method + date range ---- */
function zkComputeSnapshot(method, startIso, endIso) {
  var inRange = _zkBankEntries.filter(function(e) {
    return e.date >= startIso && e.date <= endIso;
  });
  if (!inRange.length) return null;
  if (method === 'lowest') {
    return inRange.reduce(function(min, e) { return e.balance < min.balance ? e : min; }, inRange[0]);
  }
  if (method === 'highest') {
    return inRange.reduce(function(max, e) { return e.balance > max.balance ? e : max; }, inRange[0]);
  }
  if (method === 'avg') {
    var sum = inRange.reduce(function(s, e) { return s + e.balance; }, 0);
    return { date: null, balance: +(sum / inRange.length).toFixed(2) };
  }
  // 'closing' (default): last entry on or before the end date
  return inRange[inRange.length - 1];
}

/* ---- render the results panel: date range, method selector, preview table ---- */
function zkRenderBankResults() {
  var host = document.getElementById('zk_bankResults');
  if (!host || !_zkBankEntries.length) return;
  var minDate = _zkBankEntries[0].date;
  var maxDate = _zkBankEntries[_zkBankEntries.length - 1].date;

  var rangeHtml =
    '<div class="fgrid" style="margin-top:10px">' +
      '<div class="field"><label>From date</label>' +
        '<input type="date" id="zk_bankStart" value="' + minDate + '" min="' + minDate + '" max="' + maxDate + '" oninput="zkUpdateBankPreview()"></div>' +
      '<div class="field"><label>To date (zakat anniversary)</label>' +
        '<input type="date" id="zk_bankEnd" value="' + maxDate + '" min="' + minDate + '" max="' + maxDate + '" oninput="zkUpdateBankPreview()"></div>' +
      '<div class="field full"><label>Snapshot method</label>' +
        '<select id="zk_bankMethod" onchange="zkUpdateBankPreview()">' +
          '<option value="closing">Closing balance on end date — standard</option>' +
          '<option value="lowest">Lowest balance in range — most cautious</option>' +
          '<option value="highest">Highest balance in range</option>' +
          '<option value="avg">Average balance in range (informational only)</option>' +
        '</select></div>' +
    '</div>' +
    '<div id="zk_bankPreview" style="margin-top:10px"></div>' +
    '<button class="btn accent sm" style="margin-top:8px" onclick="zkApplyBankBalance()">Apply to Bank balance</button>';

  // preview table: first 4, ..., last 4 rows if long
  var rows = _zkBankEntries;
  var showRows = rows.length <= 10 ? rows : rows.slice(0, 4).concat(rows.slice(-4));
  var tableRows = '';
  showRows.forEach(function(e, i) {
    if (rows.length > 10 && i === 4) {
      tableRows += '<tr><td colspan="2" class="muted" style="text-align:center;font-size:12px">&middot;&middot;&middot; ' +
        (rows.length - 8) + ' more rows &middot;&middot;&middot;</td></tr>';
    }
    tableRows += '<tr><td class="mono" style="font-size:12.5px">' + fmtDate(e.date) + '</td>' +
      '<td class="right mono" style="font-size:12.5px">' + money(e.balance) + '</td></tr>';
  });
  var tableHtml =
    '<div class="tbl" style="margin-top:12px;max-height:220px;overflow-y:auto">' +
      '<table><thead><tr><th>Date</th><th class="right">Balance detected</th></tr></thead>' +
      '<tbody>' + tableRows + '</tbody></table>' +
    '</div>';

  host.innerHTML = rangeHtml + tableHtml;
  zkUpdateBankPreview();
}

function zkUpdateBankPreview() {
  var startEl = document.getElementById('zk_bankStart');
  var endEl   = document.getElementById('zk_bankEnd');
  var methEl  = document.getElementById('zk_bankMethod');
  var prevEl  = document.getElementById('zk_bankPreview');
  if (!startEl || !endEl || !methEl || !prevEl) return;
  var snap = zkComputeSnapshot(methEl.value, startEl.value, endEl.value);
  if (!snap) {
    prevEl.innerHTML = '<div class="muted" style="font-size:12.5px">No entries in this date range.</div>';
    return;
  }
  var dateNote = snap.date ? ' &middot; entry dated ' + fmtDate(snap.date) : ' &middot; average across range';
  prevEl.innerHTML =
    '<div style="padding:10px 12px;border:1.5px solid var(--accent);border-radius:10px;background:var(--accent-soft)">' +
      '<div class="muted" style="font-size:11.5px;text-transform:uppercase;letter-spacing:.04em">Balance to apply</div>' +
      '<div style="font-size:20px;font-weight:700;color:var(--accent-ink);font-family:\'Spline Sans Mono\',monospace">' +
        money(snap.balance) +
      '</div>' +
      '<div class="muted" style="font-size:12px">' + dateNote + '</div>' +
    '</div>';
}

function zkApplyBankBalance() {
  var startEl = document.getElementById('zk_bankStart');
  var endEl   = document.getElementById('zk_bankEnd');
  var methEl  = document.getElementById('zk_bankMethod');
  if (!startEl || !endEl || !methEl) return;
  var snap = zkComputeSnapshot(methEl.value, startEl.value, endEl.value);
  if (!snap) { toast('No balance entries in that date range'); return; }
  _zkRec.bankBalance = snap.balance;
  var bankInput = document.getElementById('zk_bank');
  if (bankInput) bankInput.value = snap.balance;
  zkUpdateSide();
  toast('Bank balance set to ' + money(snap.balance));
}

function zkRenderCalc() {
  var r   = _zkRec;
  var res = zkCalc(r);
  var s   = State.db.settings;
  var invCount = State.db.items.filter(function(i) {
    return i.trackStock !== false && (i.stockQty || 0) > 0;
  }).length;
  var unpaidCount = State.db.invoices.filter(function(i) { return i.status !== 'paid'; }).length;

  /* --- section: meta --- */
  var metaSec =
    '<div class="zk-sec">' +
      '<h4>' + svg('moon', 13) + ' Hawl & Nisab</h4>' +
      '<div class="fgrid">' +
        '<div class="field"><label>Hijri year</label>' +
          '<input id="zk_yr" value="' + esc(r.hijriYear) + '" oninput="_zkRec.hijriYear=this.value"></div>' +
        '<div class="field"><label>Calculation date</label>' +
          '<input type="date" id="zk_dt" value="' + r.date + '" oninput="_zkRec.date=this.value"></div>' +
        '<div class="field"><label>Nisab standard</label>' +
          '<select id="zk_std" onchange="_zkRec.nisabStd=this.value;zkUpdateSide()">' +
            '<option value="silver"' + (r.nisabStd === 'silver' ? ' selected' : '') + '>Silver 595 g &mdash; recommended</option>' +
            '<option value="gold"'  + (r.nisabStd === 'gold'   ? ' selected' : '') + '>Gold 85 g</option>' +
          '</select></div>' +
        '<div class="field"><label>Silver price / g (' + esc(s.currency) + ')</label>' +
          '<input id="zk_sp" type="number" step="0.01" value="' + r.silverPrice + '" oninput="_zkRec.silverPrice=+this.value;zkUpdateSide()"></div>' +
        '<div class="field"><label>Gold price / g (' + esc(s.currency) + ')</label>' +
          '<input id="zk_gp" type="number" step="0.01" value="' + r.goldPrice + '" oninput="_zkRec.goldPrice=+this.value;zkUpdateSide()"></div>' +
        '<div class="field" style="align-self:end"><label>Nisab at these prices</label>' +
          '<div id="zk_nisab_val" style="padding:9px 12px;border:1px solid var(--accent);border-radius:10px;font-weight:700;color:var(--accent-ink);background:var(--accent-soft)">' +
            money(res.nisab) +
          '</div></div>' +
      '</div>' +
    '</div>';

  /* --- section: business --- */
  var bizSec =
    '<div class="zk-sec">' +
      '<h4>&#127978; Business Assets</h4>' +
      '<div class="fgrid">' +
        '<div class="field"><label>Inventory cost value <span class="auto-tag">auto</span></label>' +
          '<input id="zk_inv" type="number" step="0.01" value="' + (+(r.inventory || 0)) + '" oninput="_zkRec.inventory=+this.value;zkUpdateSide()">' +
          '<div class="muted" style="font-size:12px;margin-top:3px">' + invCount + ' product lines in stock</div></div>' +
        '<div class="field"><label>Receivables — unpaid invoices <span class="auto-tag">auto</span></label>' +
          '<input id="zk_rec" type="number" step="0.01" value="' + (+(r.receivables || 0)) + '" oninput="_zkRec.receivables=+this.value;zkUpdateSide()">' +
          '<div class="muted" style="font-size:12px;margin-top:3px">' + unpaidCount + ' unpaid invoice(s)</div></div>' +
      '</div>' +
    '</div>';

  /* --- section: personal assets --- */
  var persSec =
    '<div class="zk-sec">' +
      '<h4>&#128176; Personal &amp; Other Assets</h4>' +
      '<div class="fgrid">' +
        '<div class="field"><label>Cash in hand (' + esc(s.currency) + ')</label>' +
          '<input id="zk_cash" type="number" step="0.01" value="' + (+(r.cashInHand || 0)) + '" oninput="_zkRec.cashInHand=+this.value;zkUpdateSide()"></div>' +
        '<div class="field"><label>Bank balance(s)</label>' +
          '<input id="zk_bank" type="number" step="0.01" value="' + (+(r.bankBalance || 0)) + '" oninput="_zkRec.bankBalance=+this.value;zkUpdateSide()"></div>' +
        '<div class="field"><label>Gold owned (grams)</label>' +
          '<input id="zk_gg" type="number" step="0.01" value="' + (+(r.goldGrams || 0)) + '" oninput="_zkRec.goldGrams=+this.value;zkUpdateSide()">' +
          '<div class="muted" style="font-size:12px;margin-top:3px">Value: ' + money((+(r.goldGrams || 0)) * (+(r.goldPrice || s.zakatGoldPrice) || 0)) + '</div></div>' +
        '<div class="field"><label>Silver owned (grams)</label>' +
          '<input id="zk_sg" type="number" step="0.01" value="' + (+(r.silverGrams || 0)) + '" oninput="_zkRec.silverGrams=+this.value;zkUpdateSide()">' +
          '<div class="muted" style="font-size:12px;margin-top:3px">Value: ' + money((+(r.silverGrams || 0)) * (+(r.silverPrice || s.zakatSilverPrice) || 0)) + '</div></div>' +
        '<div class="field"><label>Money lent out (expected back)</label>' +
          '<input id="zk_loan" type="number" step="0.01" value="' + (+(r.loanedMoney || 0)) + '" oninput="_zkRec.loanedMoney=+this.value;zkUpdateSide()"></div>' +
        '<div class="field"><label>Investments &amp; shares</label>' +
          '<input id="zk_inv2" type="number" step="0.01" value="' + (+(r.investments || 0)) + '" oninput="_zkRec.investments=+this.value;zkUpdateSide()"></div>' +
        '<div class="field full"><label>Other zakatable assets</label>' +
          '<input id="zk_oth" type="number" step="0.01" value="' + (+(r.otherAssets || 0)) + '" oninput="_zkRec.otherAssets=+this.value;zkUpdateSide()"></div>' +
      '</div>' +
    '</div>';

  /* --- section: bank statement PDF import --- */
  var bankSec = zkBankSectionHtml();

  /* --- section: debts --- */
  var debtSec =
    '<div class="zk-sec">' +
      '<h4>&#128184; Deductible Debts</h4>' +
      '<p class="muted" style="font-size:12.5px;margin-bottom:10px">Only debts currently due may be deducted. Long-term debts not yet due are excluded.</p>' +
      '<div class="fgrid">' +
        '<div class="field"><label>Immediate debts / bills due now</label>' +
          '<input id="zk_dbt1" type="number" step="0.01" value="' + (+(r.immediateDebts || 0)) + '" oninput="_zkRec.immediateDebts=+this.value;zkUpdateSide()"></div>' +
        '<div class="field"><label>Other eligible debts</label>' +
          '<input id="zk_dbt2" type="number" step="0.01" value="' + (+(r.otherDebts || 0)) + '" oninput="_zkRec.otherDebts=+this.value;zkUpdateSide()"></div>' +
      '</div>' +
    '</div>';

  /* --- section: notes --- */
  var notesSec =
    '<div class="zk-sec">' +
      '<h4>&#128203; Notes</h4>' +
      '<div class="field"><textarea id="zk_notes" rows="2" placeholder="Optional notes about this calculation…" oninput="_zkRec.notes=this.value">' +
        esc(r.notes || '') +
      '</textarea></div>' +
    '</div>';

  var btnHtml =
    '<div class="row" style="gap:10px;margin-top:8px;flex-wrap:wrap">' +
      '<button class="btn ghost" onclick="viewZakat()">&#8592; Back</button>' +
      '<button class="btn accent" onclick="zkSave()">Save calculation</button>' +
    '</div>';

  var sideHtml = zkBuildSide(res, r);

  var colsCss = isMob() ? '1fr' : '1fr 340px';
  document.getElementById('content').innerHTML =
    '<div style="display:grid;grid-template-columns:' + colsCss + ';gap:16px;align-items:start">' +
      '<div>' + metaSec + bizSec + persSec + bankSec + debtSec + notesSec + btnHtml + '</div>' +
      '<div id="zk_side">' + sideHtml + '</div>' +
    '</div>';
  if (_zkBankEntries.length) zkRenderBankResults();
}

/* ---- sidebar / result panel ---- */
function zkBuildSide(res, r) {
  var s   = State.db.settings;
  var gp  = +(r.goldPrice   || s.zakatGoldPrice)   || 0;
  var sp  = +(r.silverPrice || s.zakatSilverPrice)  || 32.82;

  /* result card */
  var resCard;
  if (res.above) {
    resCard =
      '<div class="zk-result">' +
        '<div class="lbl">&#9728; Zakat due (2.5 %)</div>' +
        '<div class="amt">' + money(res.due) + '</div>' +
        '<span class="nisab-ok">&#10003; Above nisab</span>' +
      '</div>';
  } else {
    resCard =
      '<div class="zk-result none">' +
        '<div class="lbl">Nisab check</div>' +
        '<div class="amt">Alhamdulillah</div>' +
        '<span class="nisab-no">Below nisab — no zakat due</span>' +
      '</div>';
  }

  /* breakdown rows */
  var brkRows = '';
  var lines = [
    ['Business inventory',   +(r.inventory    || 0)],
    ['Receivables',          +(r.receivables  || 0)],
    ['Cash in hand',         +(r.cashInHand   || 0)],
    ['Bank balance',         +(r.bankBalance  || 0)],
    ['Gold (' + (+(r.goldGrams   || 0)) + ' g)',   (+(r.goldGrams   || 0)) * gp],
    ['Silver (' + (+(r.silverGrams || 0)) + ' g)', (+(r.silverGrams || 0)) * sp],
    ['Loaned money',         +(r.loanedMoney  || 0)],
    ['Investments',          +(r.investments  || 0)],
    ['Other assets',         +(r.otherAssets  || 0)]
  ];
  for (var i = 0; i < lines.length; i++) {
    if (lines[i][1] > 0) {
      brkRows +=
        '<div class="zk-row"><span>' + lines[i][0] + '</span>' +
        '<span class="v">' + money(lines[i][1]) + '</span></div>';
    }
  }
  brkRows +=
    '<div class="zk-row zk-total"><span>Total assets</span>' +
    '<span class="v">' + money(res.total) + '</span></div>';
  if (res.debts > 0) {
    brkRows +=
      '<div class="zk-row zk-deduct"><span>Less: debts</span>' +
      '<span class="v">&#8722;' + money(res.debts) + '</span></div>';
  }
  brkRows +=
    '<div class="zk-row" style="border-top:2px solid var(--accent);padding-top:8px;font-weight:700">' +
    '<span>Net zakatable wealth</span><span class="v" style="color:var(--accent-ink)">' + money(res.net) + '</span></div>';
  brkRows +=
    '<div class="zk-row"><span class="muted" style="font-size:12.5px">Nisab threshold</span>' +
    '<span class="v muted" style="font-size:12.5px">' + money(res.nisab) + '</span></div>';
  if (res.above) {
    brkRows +=
      '<div class="zk-row" style="border-top:2px solid var(--accent);margin-top:4px;padding-top:10px">' +
      '<span style="font-weight:700;font-size:15px">Zakat (2.5 %)</span>' +
      '<span class="v" style="font-size:18px;color:var(--accent-ink)">' + money(res.due) + '</span></div>';
  }

  /* payment button / paid stamp */
  var payHtml;
  if (r.paid) {
    payHtml =
      '<div class="card pad" style="background:var(--accent-soft);border-color:var(--accent);margin-top:12px;text-align:center">' +
        '<div style="font-weight:700;color:var(--accent-ink)">&#10003; Paid</div>' +
        '<div class="muted" style="font-size:12.5px">' +
          fmtDate(r.paidDate) + ' &middot; ' + money(r.paidAmount) + ' via ' + esc(r.paidVia || '') +
        '</div>' +
      '</div>';
  } else {
    payHtml = '<button class="btn amber block" style="margin-top:12px" onclick="zkRecordPayment()">Record MIRA payment</button>';
  }

  /* MIRA guidance */
  var miraHtml =
    '<div class="card pad" style="margin-top:12px;font-size:12.5px;color:var(--ink-soft)">' +
      '<b style="color:var(--ink)">Pay via MIRA (Maldives)</b><br>' +
      'Form <b>MIRA 510</b> &mdash; pay at ' +
      '<a href="https://www.mira.gov.mv" target="_blank" class="linkish">mira.gov.mv</a>' +
      ', Taxpayer Service Centre, or local island council.<br>' +
      'MIRA hotline: <b>1415</b>' +
    '</div>';

  var stickyStyle = isMob() ? 'static' : 'sticky';
  return '<div style="position:' + stickyStyle + ';top:80px">' +
    resCard +
    '<div class="zk-sec"><h4>Breakdown</h4>' + brkRows + '</div>' +
    payHtml + miraHtml +
  '</div>';
}

/* ---- live update sidebar ---- */
function zkUpdateSide() {
  var side = document.getElementById('zk_side');
  if (!side) return;
  side.innerHTML = zkBuildSide(zkCalc(_zkRec), _zkRec);
  var nd = document.getElementById('zk_nisab_val');
  if (nd) nd.textContent = money(zkCalc(_zkRec).nisab);
}

/* ---- save ---- */
function zkSave() {
  if (!State.db.zakatRecords) State.db.zakatRecords = [];
  var res = zkCalc(_zkRec);
  var rec = JSON.parse(JSON.stringify(_zkRec));
  rec.calcTotal = res.total;
  rec.calcDebts = res.debts;
  rec.calcNet   = res.net;
  rec.calcNisab = res.nisab;
  rec.calcAbove = res.above;
  rec.calcDue   = res.due;
  if (_zkEditId) {
    var ix = State.db.zakatRecords.findIndex(function(x) { return x.id === _zkEditId; });
    if (ix >= 0) { State.db.zakatRecords[ix] = rec; }
    else { State.db.zakatRecords.unshift(rec); }
  } else {
    State.db.zakatRecords.unshift(rec);
  }
  /* persist nisab settings for next time */
  State.db.settings.zakatNisabStd   = _zkRec.nisabStd;
  State.db.settings.zakatSilverPrice = +(_zkRec.silverPrice) || 32.82;
  State.db.settings.zakatGoldPrice   = +(_zkRec.goldPrice)   || 0;
  persist();
  toast('Zakat calculation saved');
  viewZakat();
}

/* ---- record payment ---- */
function zkRecordPayment() {
  var res = zkCalc(_zkRec);
  var amtVal = res.due;
  var s = State.db.settings;
  var bodyHtml =
    '<div class="fgrid">' +
      '<div class="field"><label>Payment date</label>' +
        '<input id="zp_dt" type="date" value="' + todayISO() + '"></div>' +
      '<div class="field"><label>Amount paid (' + esc(s.currency) + ')</label>' +
        '<input id="zp_amt" type="number" step="0.01" value="' + amtVal + '"></div>' +
      '<div class="field"><label>Paid via</label>' +
        '<select id="zp_via">' +
          '<option value="MIRA 510">MIRA (MIRA 510 form)</option>' +
          '<option value="Local Council">Island / Local Council</option>' +
          '<option value="Direct">Direct to recipients</option>' +
          '<option value="Other">Other</option>' +
        '</select></div>' +
      '<div class="field"><label>Reference / MIRA receipt no.</label>' +
        '<input id="zp_ref" placeholder="Optional"></div>' +
    '</div>';
  openModal('Record Zakat Payment', bodyHtml, [
    { label: 'Cancel', cls: 'ghost', fn: closeModal },
    { label: 'Mark as paid ✓', cls: 'accent', fn: function() {
      _zkRec.paid      = true;
      _zkRec.paidDate  = val('zp_dt');
      _zkRec.paidAmount = +(val('zp_amt')) || 0;
      _zkRec.paidVia   = val('zp_via');
      if (val('zp_ref')) _zkRec.notes = (_zkRec.notes ? _zkRec.notes + '\n' : '') + val('zp_ref');
      closeModal();
      zkSave();
      toast('Payment recorded. JazakAllah Khair. \uD83E\uDD32');
    }}
  ]);
}

/* ---- delete ---- */
function zkDelete(id) {
  confirmDel('Delete this zakat calculation?', function() {
    State.db.zakatRecords = (State.db.zakatRecords || []).filter(function(x) { return x.id !== id; });
    persist();
    viewZakat();
    toast('Calculation deleted');
  });
}

/* ---- nisab settings modal ---- */
function zkOpenSettings() {
  var s = State.db.settings;
  var nisabSilver = 595 * (+s.zakatSilverPrice || 0);
  var nisabGold   = 85  * (+s.zakatGoldPrice   || 0);
  var bodyHtml =
    '<p class="muted" style="margin-bottom:12px;font-size:13.5px">' +
      'Enter today\'s metal prices to get the correct nisab. ' +
      'Check <a href="https://www.mira.gov.mv" target="_blank" class="linkish">MIRA</a> or a live price source.' +
    '</p>' +
    '<div class="fgrid">' +
      '<div class="field"><label>Nisab standard</label>' +
        '<select id="zs_std">' +
          '<option value="silver"' + (s.zakatNisabStd === 'silver' ? ' selected' : '') + '>Silver 595 g &mdash; recommended (more inclusive)</option>' +
          '<option value="gold"'   + (s.zakatNisabStd === 'gold'   ? ' selected' : '') + '>Gold 85 g</option>' +
        '</select></div>' +
      '<div class="field"><label>Silver price per gram (' + esc(s.currency) + ')</label>' +
        '<input id="zs_sp" type="number" step="0.01" value="' + s.zakatSilverPrice + '"></div>' +
      '<div class="field"><label>Gold price per gram (' + esc(s.currency) + ')</label>' +
        '<input id="zs_gp" type="number" step="0.01" value="' + s.zakatGoldPrice + '"></div>' +
      '<div class="field"><label>Resulting nisab values</label>' +
        '<div style="padding:9px 12px;border:1px solid var(--accent);border-radius:10px;font-size:13.5px">' +
          'Silver: <b>' + money(nisabSilver) + '</b><br>' +
          'Gold: <b>' + money(nisabGold) + '</b>' +
        '</div></div>' +
    '</div>' +
    '<div class="muted" style="font-size:12px;margin-top:10px">' +
      'Dec 2025 MIRA official nisab: <b>MVR 19,527.90</b> (silver 595 g &times; MVR 32.82/g). ' +
      'This changes when global silver prices move &mdash; verify before each calculation.' +
    '</div>';
  openModal('Nisab Settings', bodyHtml, [
    { label: 'Cancel', cls: 'ghost', fn: closeModal },
    { label: 'Save', cls: 'accent', fn: function() {
      State.db.settings.zakatNisabStd    = val('zs_std');
      State.db.settings.zakatSilverPrice = +(val('zs_sp')) || 32.82;
      State.db.settings.zakatGoldPrice   = +(val('zs_gp')) || 0;
      persist();
      closeModal();
      viewZakat();
      toast('Nisab settings saved');
    }}
  ]);
}

/* ============================================================
   ZAKAT — MIRA field overrides
   ============================================================ */
/* ============================================================
   ZAKAT — Updated fields to match MIRA Maldives calculator
   Sections: Currency · Money · Gold · Silver · Investments ·
             Business · Others · Payables
   ============================================================ */

/* Override zkCalc to use new fields */
function zkCalc(rec) {
  var s   = State.db.settings;
  var gp  = +(rec.goldPrice   || s.zakatGoldPrice)   || 0;
  var sp  = +(rec.silverPrice || s.zakatSilverPrice)  || 32.82;
  /* currency conversion */
  var fx  = rec.currency === 'USD' ? +(rec.exchangeRate||15.4) : 1;

  /* assets (all in MVR) */
  var cashInHand        = (+(rec.cashInHand     ||0)) * fx;
  var cashInBank        = (+(rec.bankBalance    ||0)) * fx;
  var goldValue         = (+(rec.goldGrams      ||0)) * gp;
  var silverValue       = (+(rec.silverGrams    ||0)) * sp;
  var shares            = (+(rec.shares         ||0)) * fx;
  var otherInvestments  = (+(rec.investments    ||0)) * fx;
  var businessCash      = (+(rec.businessCash   ||0)) * fx;
  var goodsStock        = (+(rec.inventory      ||0));  /* auto-pulled at cost */
  var receivables       = (+(rec.receivables    ||0));  /* auto-pulled */
  var loanToFamily      = (+(rec.loanedMoney    ||0)) * fx;
  var otherAssets       = (+(rec.otherAssets    ||0)) * fx;

  var totalAssets = cashInHand + cashInBank + goldValue + silverValue +
    shares + otherInvestments + businessCash + goodsStock + receivables +
    loanToFamily + otherAssets;

  /* payables (deductions) */
  var creditCard        = +(rec.creditCardPayments  ||0);
  var homePayments      = +(rec.homePayments        ||0);
  var businessPayments  = +(rec.businessPayments    ||0);
  var vehiclePayments   = +(rec.vehiclePayments     ||0);
  var generalDebts      = +(rec.generalDebts        ||0);
  /* legacy fields for backward compat */
  var legacyDebts = (+(rec.immediateDebts||0)) + (+(rec.otherDebts||0));
  var totalDebts = creditCard + homePayments + businessPayments + vehiclePayments + generalDebts + legacyDebts;

  var net   = Math.max(0, totalAssets - totalDebts);
  var nisab = zkNisab(rec);
  var above = net >= nisab;
  var due   = above ? +(net * 0.025).toFixed(2) : 0;

  return {
    total: +totalAssets.toFixed(2), debts: +totalDebts.toFixed(2),
    net: +net.toFixed(2), nisab: nisab, above: above, due: due,
    /* breakdown for sidebar */
    _lines: [
      ['Cash in hand',    cashInHand],
      ['Cash in bank',    cashInBank],
      ['Gold (' + (+(rec.goldGrams||0)) + ' g)', goldValue],
      ['Silver (' + (+(rec.silverGrams||0)) + ' g)', silverValue],
      ['Shares',          shares],
      ['Other investments',otherInvestments],
      ['Business cash',   businessCash],
      ['Goods / Stock',   goodsStock],
      ['Receivables',     receivables],
      ['Loan to family',  loanToFamily],
      ['Other assets',    otherAssets]
    ]
  };
}

/* Override zkRenderCalc — match MIRA field layout */
function zkRenderCalc() {
  var r   = _zkRec;
  var res = zkCalc(r);
  var s   = State.db.settings;
  var invCount    = State.db.items.filter(function(i){ return i.trackStock!==false&&(i.stockQty||0)>0; }).length;
  var unpaidCount = State.db.invoices.filter(function(i){ return i.status!=='paid'; }).length;

  function numInput(id, recKey, oninput) {
    var v = +(r[recKey]||0);
    return '<input id="'+id+'" type="number" step="0.01" min="0" value="'+v+'" ' +
      'oninput="_zkRec.'+recKey+'=+this.value;'+oninput+'">';
  }
  function section(title, content) {
    return '<div class="zk-sec"><h4>' + title + '</h4>' + content + '</div>';
  }
  function row2(l1, id1, key1, l2, id2, key2, extra1, extra2) {
    return '<div class="fgrid">' +
      '<div class="field"><label>' + l1 + '</label>' + numInput(id1, key1, 'zkUpdateSide()') + (extra1||'') + '</div>' +
      (l2 ? '<div class="field"><label>' + l2 + '</label>' + numInput(id2, key2, 'zkUpdateSide()') + (extra2||'') + '</div>' : '') +
    '</div>';
  }

  /* Currency section */
  var currencySec =
    '<div class="zk-sec"><h4>Select Currency</h4>' +
      '<div style="display:flex;gap:20px;align-items:center;flex-wrap:wrap">' +
        '<label style="display:flex;align-items:center;gap:6px;cursor:pointer;font-size:14px">' +
          '<input type="radio" name="zk_cur" value="MVR" ' + (r.currency!=='USD'?'checked':'') + ' onchange="_zkRec.currency=\'MVR\';zkUpdateSide()">' +
          ' Maldivian Rufiyaa (MVR)</label>' +
        '<label style="display:flex;align-items:center;gap:6px;cursor:pointer;font-size:14px">' +
          '<input type="radio" name="zk_cur" value="USD" ' + (r.currency==='USD'?'checked':'') + ' onchange="_zkRec.currency=\'USD\';zkUpdateSide()">' +
          ' United States Dollars (USD)</label>' +
      '</div>' +
      (r.currency==='USD'?'<div class="fgrid" style="margin-top:10px"><div class="field"><label>USD → MVR exchange rate</label>'+numInput('zk_fx','exchangeRate','zkUpdateSide()')+'</div></div>':'') +
    '</div>';

  /* Money section */
  var moneySec = section('Money', row2('Cash in Hand','zk_cash','cashInHand','Cash in Bank','zk_bank','bankBalance'));

  /* Gold */
  var goldVal = (+(r.goldGrams||0))*(+(r.goldPrice||s.zakatGoldPrice)||0);
  var goldSec = section('Gold Value',
    '<div class="fgrid">' +
      '<div class="field"><label>Gold (grams)</label>' + numInput('zk_gg','goldGrams','zkUpdateSide()') +
        '<div class="muted" style="font-size:12px;margin-top:3px">Value: ' + money(goldVal) + '</div></div>' +
      '<div class="field"><label>Gold price / gram (' + esc(s.currency) + ')</label>' + numInput('zk_gp','goldPrice','zkUpdateSide()') + '</div>' +
    '</div>');

  /* Silver */
  var silvVal = (+(r.silverGrams||0))*(+(r.silverPrice||s.zakatSilverPrice)||0);
  var silvSec = section('Silver Value',
    '<div class="fgrid">' +
      '<div class="field"><label>Silver (grams)</label>' + numInput('zk_sg','silverGrams','zkUpdateSide()') +
        '<div class="muted" style="font-size:12px;margin-top:3px">Value: ' + money(silvVal) + '</div></div>' +
      '<div class="field"><label>Silver price / gram (' + esc(s.currency) + ')</label>' + numInput('zk_sp','silverPrice','zkUpdateSide()') + '</div>' +
    '</div>');

  /* Investments */
  var invSec = section('Investments', row2('Shares','zk_shares','shares','Other Investments','zk_inv2','investments'));

  /* Business */
  var bizSec = section('Business',
    '<div class="fgrid">' +
      '<div class="field"><label>Business Cash</label>' + numInput('zk_bcash','businessCash','zkUpdateSide()') + '</div>' +
      '<div class="field"><label>Goods / Stock (inventory) <span class="auto-tag">auto</span></label>' +
        numInput('zk_inv','inventory','zkUpdateSide()') +
        '<div class="muted" style="font-size:12px;margin-top:3px">' + invCount + ' product lines tracked</div></div>' +
      '<div class="field"><label>Outstanding receivables <span class="auto-tag">auto</span></label>' +
        numInput('zk_rec','receivables','zkUpdateSide()') +
        '<div class="muted" style="font-size:12px;margin-top:3px">' + unpaidCount + ' unpaid invoice(s)</div></div>' +
    '</div>');

  /* Others */
  var otherSec = section('Others', row2('Loan to Family / Other','zk_loan','loanedMoney','Other Assets','zk_oth','otherAssets'));

  /* Payables */
  var payableSec = section('Payables',
    '<p class="muted" style="font-size:12.5px;margin-bottom:10px">Deduct debts currently due. Only immediate obligations may be deducted per Islamic jurisprudence.</p>' +
    '<div class="fgrid">' +
      '<div class="field"><label>Credit Card Payments</label>' + numInput('zk_cc','creditCardPayments','zkUpdateSide()') + '</div>' +
      '<div class="field"><label>Home Payments</label>' + numInput('zk_hp','homePayments','zkUpdateSide()') + '</div>' +
      '<div class="field"><label>Business Payments</label>' + numInput('zk_bp','businessPayments','zkUpdateSide()') + '</div>' +
      '<div class="field"><label>Vehicle Payments</label>' + numInput('zk_vp','vehiclePayments','zkUpdateSide()') + '</div>' +
      '<div class="field full"><label>Other Debts</label>' + numInput('zk_dbt','generalDebts','zkUpdateSide()') + '</div>' +
    '</div>');

  /* Nisab & hawl */
  var nisabSec =
    '<div class="zk-sec"><h4>' + svg('moon',13) + ' Nisab & Hawl Settings</h4>' +
      '<div class="fgrid">' +
        '<div class="field"><label>Hijri year / label</label>' +
          '<input id="zk_yr" value="' + esc(r.hijriYear||zkHijriYear()) + '" oninput="_zkRec.hijriYear=this.value"></div>' +
        '<div class="field"><label>Calculation date</label>' +
          '<input type="date" id="zk_dt" value="' + r.date + '" oninput="_zkRec.date=this.value"></div>' +
        '<div class="field"><label>Nisab standard</label>' +
          '<select id="zk_std" onchange="_zkRec.nisabStd=this.value;zkUpdateSide()">' +
            '<option value="silver"' + (r.nisabStd==='silver'?' selected':'') + '>Silver (595 g) — recommended</option>' +
            '<option value="gold"'   + (r.nisabStd==='gold'?  ' selected':'') + '>Gold (85 g)</option>' +
          '</select></div>' +
        '<div class="field" style="align-self:end"><label>Nisab at these prices</label>' +
          '<div id="zk_nisab_val" style="padding:9px 12px;border:1px solid var(--accent);border-radius:10px;font-weight:700;color:var(--accent-ink);background:var(--accent-soft)">' +
            money(res.nisab) + '</div></div>' +
      '</div>' +
    '</div>';

  /* Notes */
  var notesSec = '<div class="zk-sec"><h4>Notes</h4><div class="field">' +
    '<textarea id="zk_notes" rows="2" placeholder="Optional…" oninput="_zkRec.notes=this.value">' + esc(r.notes||'') + '</textarea></div></div>';

  /* Buttons */
  var btnHtml = '<div class="row" style="gap:10px;margin-top:8px;flex-wrap:wrap">' +
    '<button class="btn ghost" onclick="viewZakat()">&#8592; Back</button>' +
    '<button class="btn accent" onclick="zkSave()">Save calculation</button></div>';

  var formHtml = nisabSec + currencySec + moneySec + goldSec + silvSec + invSec + bizSec + otherSec +
    zkBankSectionHtml() + payableSec + notesSec + btnHtml;

  var colsCss = isMob() ? '1fr' : '1fr 340px';
  document.getElementById('content').innerHTML =
    '<div style="display:grid;grid-template-columns:' + colsCss + ';gap:16px;align-items:start">' +
      '<div>' + formHtml + '</div>' +
      '<div id="zk_side">' + zkBuildSide(res, r) + '</div>' +
    '</div>';
  if (_zkBankEntries.length) zkRenderBankResults();
}

/* Override zkBuildSide to use new _lines from zkCalc */
function zkBuildSide(res, r) {
  var rows = '';
  (res._lines||[]).forEach(function(line) {
    if (line[1] > 0) {
      rows += '<div class="zk-row"><span>' + line[0] + '</span><span class="v">' + money(line[1]) + '</span></div>';
    }
  });
  rows += '<div class="zk-row zk-total"><span>Total assets</span><span class="v">' + money(res.total) + '</span></div>';
  if (res.debts > 0) {
    rows += '<div class="zk-row zk-deduct"><span>Less: payables / debts</span><span class="v">&#8722;' + money(res.debts) + '</span></div>';
  }
  rows += '<div class="zk-row" style="border-top:2px solid var(--accent);padding-top:8px;font-weight:700">' +
    '<span>Net zakatable wealth</span><span class="v" style="color:var(--accent-ink)">' + money(res.net) + '</span></div>';
  rows += '<div class="zk-row"><span class="muted" style="font-size:12.5px">Nisab threshold</span>' +
    '<span class="v muted" style="font-size:12.5px">' + money(res.nisab) + '</span></div>';
  if (res.above) {
    rows += '<div class="zk-row" style="border-top:2px solid var(--accent);margin-top:4px;padding-top:10px">' +
      '<span style="font-weight:700;font-size:15px">Zakat (2.5 %)</span>' +
      '<span class="v" style="font-size:18px;color:var(--accent-ink)">' + money(res.due) + '</span></div>';
  }
  var payHtml = r.paid
    ? '<div class="card pad" style="background:var(--accent-soft);border-color:var(--accent);margin-top:12px;text-align:center">' +
        '<div style="font-weight:700;color:var(--accent-ink)">&#10003; Paid</div>' +
        '<div class="muted" style="font-size:12.5px">' + fmtDate(r.paidDate) + ' &middot; ' + money(r.paidAmount) + ' via ' + esc(r.paidVia||'') + '</div>' +
      '</div>'
    : '<button class="btn amber block" style="margin-top:12px" onclick="zkRecordPayment()">Record MIRA payment</button>';

  var dueDiv = res.above
    ? '<div class="zk-result"><div class="lbl">&#9728; Zakat due (2.5 %)</div><div class="amt">' + money(res.due) + '</div><span class="nisab-ok">&#10003; Above nisab</span></div>'
    : '<div class="zk-result none"><div class="lbl">Nisab check</div><div class="amt" style="font-size:20px">Alhamdulillah</div><span class="nisab-no">Below nisab — no zakat due</span></div>';

  var stickyStyle = isMob() ? 'static' : 'sticky';
  return '<div style="position:' + stickyStyle + ';top:80px">' +
    dueDiv +
    '<div class="zk-sec"><h4>Breakdown</h4>' + rows + '</div>' +
    payHtml +
    '<div class="card pad" style="margin-top:12px;font-size:12.5px;color:var(--ink-soft)">' +
      '<b style="color:var(--ink)">Pay via MIRA (Maldives)</b><br>' +
      'Form <b>MIRA 510</b> &mdash; pay at <a href="https://www.mira.gov.mv" target="_blank" class="linkish">mira.gov.mv</a>, ' +
      'Taxpayer Service Centre, or local island council.<br>Hotline: <b>1415</b>' +
    '</div></div>';
}

/* Also patch startZakatCalc to seed new fields */
var _origStartZakat = startZakatCalc;
startZakatCalc = function() {
  _origStartZakat();
  // Seed new fields not in original rec
  if (!_zkRec.currency)          _zkRec.currency = 'MVR';
  if (!_zkRec.exchangeRate)      _zkRec.exchangeRate = 15.4;
  if (!_zkRec.shares)            _zkRec.shares = 0;
  if (!_zkRec.businessCash)      _zkRec.businessCash = 0;
  if (!_zkRec.creditCardPayments) _zkRec.creditCardPayments = 0;
  if (!_zkRec.homePayments)      _zkRec.homePayments = 0;
  if (!_zkRec.businessPayments)  _zkRec.businessPayments = 0;
  if (!_zkRec.vehiclePayments)   _zkRec.vehiclePayments = 0;
  if (!_zkRec.generalDebts)      _zkRec.generalDebts = 0;
  zkRenderCalc();
};

/* ============================================================
   GST MODULE
   ============================================================ */
/* ============================================================
   GST MODULE — Maldives General Goods & Services Tax
   Rate: 8% (General sector, from 1 Jan 2023)
   Filing: MIRA 205 form via MIRAconnect
   Deadline: 28th of month following end of taxable period
   Monthly: avg sales > MVR 1 million/month
   Quarterly: avg sales ≤ MVR 1 million/month (Jan-Mar, Apr-Jun, Jul-Sep, Oct-Dec)
   ============================================================ */

var _gstTab = 'overview';

/* ---- helpers ---- */
function gstRate() { return +(State.db.settings.taxRate) || 8; }
function gstSettings() { return State.db.gstSettings || {}; }

function gstPeriodLabel(period) {
  var m = period.match(/^(\d{4})-(Q\d|M\d{2})$/);
  if (!m) return period;
  if (m[2].startsWith('Q')) {
    var q = {'Q1':'Jan – Mar','Q2':'Apr – Jun','Q3':'Jul – Sep','Q4':'Oct – Dec'}[m[2]]||m[2];
    return m[2] + ' ' + m[1] + '  (' + q + ')';
  }
  var mo = new Date(m[1]+'-'+m[2].slice(1)+'-01').toLocaleString('default',{month:'long'});
  return mo + ' ' + m[1];
}

function currentGstPeriod() {
  var now = new Date();
  var y = now.getFullYear(), m = now.getMonth()+1;
  var gs = gstSettings();
  if (gs.filingFrequency === 'monthly') {
    return y + '-M' + (m < 10 ? '0'+m : m);
  }
  // quarterly: Q1=Jan-Mar, Q2=Apr-Jun, Q3=Jul-Sep, Q4=Oct-Dec
  var q = Math.ceil(m/3);
  return y + '-Q' + q;
}

function gstPeriodRange(period) {
  // Returns {start:'YYYY-MM-DD', end:'YYYY-MM-DD', dueDate:'YYYY-MM-DD'}
  var m = period.match(/^(\d{4})-(Q\d|M(\d{2}))$/);
  if (!m) return null;
  var y = +m[1];
  if (m[2].startsWith('M')) {
    var mo = +m[3], lastDay = new Date(y, mo, 0).getDate();
    var due = new Date(y, mo, 28); // 28th of following month
    return { start: y+'-'+(mo<10?'0'+mo:mo)+'-01',
             end:   y+'-'+(mo<10?'0'+mo:mo)+'-'+lastDay,
             dueDate: due.toISOString().slice(0,10) };
  }
  var qMap = {Q1:[1,3], Q2:[4,6], Q3:[7,9], Q4:[10,12]};
  var range = qMap[m[2]]; if (!range) return null;
  var endMo = range[1], lastDay2 = new Date(y, endMo, 0).getDate();
  var dueY = endMo === 12 ? y+1 : y, dueMo = endMo === 12 ? 1 : endMo+1;
  return { start: y+'-'+(range[0]<10?'0'+range[0]:range[0])+'-01',
           end:   y+'-'+(endMo<10?'0'+endMo:endMo)+'-'+lastDay2,
           dueDate: dueY+'-'+(dueMo<10?'0'+dueMo:dueMo)+'-28' };
}

/* ---- calculate output & input tax for a date range ---- */
function calcGstReturn(startIso, endIso) {
  var db = State.db;
  var rate = gstRate();

  // Output tax: from invoices issued in range
  var invInRange = (db.invoices||[]).filter(function(inv) {
    return inv.date >= startIso && inv.date <= endIso;
  });
  var totalSales = 0, outputTax = 0;
  invInRange.forEach(function(inv) {
    totalSales += (inv.totals && inv.totals.subtotal) || 0;
    outputTax  += (inv.totals && inv.totals.tax)      || 0;
  });

  // Input tax: from expenses in range that were GST-inclusive
  var expInRange = (db.expenses||[]).filter(function(e) {
    return e.date >= startIso && e.date <= endIso;
  });
  var totalPurchases = 0, inputTax = 0;
  expInRange.forEach(function(e) {
    var amt = +(e.amount||0);
    totalPurchases += amt;
    // Use explicit inputTax if set, otherwise derive from gstInclusive flag
    if (e.inputTax && +e.inputTax > 0) {
      inputTax += +e.inputTax;
    } else if (e.gstInclusive) {
      inputTax += +(amt * rate / (100 + rate)).toFixed(2);
    }
  });

  var netGst    = +(outputTax - inputTax).toFixed(2);
  var payable   = Math.max(0, netGst);
  var carryFwd  = Math.max(0, -netGst);

  return {
    totalSales:     +totalSales.toFixed(2),
    outputTax:      +outputTax.toFixed(2),
    totalPurchases: +totalPurchases.toFixed(2),
    inputTax:       +inputTax.toFixed(2),
    netGst:         netGst,
    payable:        payable,
    carryFwd:       carryFwd,
    invoiceCount:   invInRange.length,
    expenseCount:   expInRange.length
  };
}

/* ---- main view ---- */
function viewGST() {
  var gs = gstSettings();
  var c  = document.getElementById('content');

  // Hero banner
  var regBadge = gs.registered
    ? '<span class="badge pro" style="font-size:11px">GST Registered</span>'
    : '<span class="badge free" style="font-size:11px;background:var(--amber-soft);color:var(--amber)">Not registered</span>';

  var heroHtml =
    '<div style="background:linear-gradient(135deg,#1d4ed8,#1e3a8a);color:#fff;border-radius:14px;padding:20px 24px;margin-bottom:16px;position:relative;overflow:hidden">' +
      '<div style="position:absolute;right:20px;top:50%;transform:translateY(-50%);font-size:64px;opacity:.1;line-height:1">%</div>' +
      '<div style="font-size:20px;font-weight:700;margin-bottom:4px">GST — General Goods & Services Tax</div>' +
      '<div style="opacity:.85;font-size:13.5px">Rate: <b>' + gstRate() + '%</b> (General sector)' +
        (gs.gstNumber ? ' &nbsp;&middot;&nbsp; GST No: <b>' + esc(gs.gstNumber) + '</b>' : '') +
        ' &nbsp;&middot;&nbsp; ' + regBadge +
      '</div>' +
      '<div style="opacity:.75;font-size:12px;margin-top:5px">Filing: ' + (gs.filingFrequency==='monthly'?'Monthly':'Quarterly') +
        ' &nbsp;&middot;&nbsp; Deadline: 28th of following month &nbsp;&middot;&nbsp; Form: MIRA 205' +
      '</div>' +
    '</div>';

  var tabHtml =
    '<div class="tabs" style="margin-bottom:14px">' +
      '<button class="' + (_gstTab==='overview'?'active':'') + '" onclick="_gstTab=\'overview\';viewGST()">Overview</button>' +
      '<button class="' + (_gstTab==='returns'?'active':'') + '" onclick="_gstTab=\'returns\';viewGST()">Returns</button>' +
      '<button class="' + (_gstTab==='expenses'?'active':'') + '" onclick="_gstTab=\'expenses\';viewGST()">Input Tax (Purchases)</button>' +
      '<button class="' + (_gstTab==='settings'?'active':'') + '" onclick="_gstTab=\'settings\';viewGST()">Settings</button>' +
    '</div>';

  c.innerHTML = heroHtml + tabHtml + '<div id="gstPanel"></div>';
  var panel = document.getElementById('gstPanel');

  if (_gstTab === 'overview')  gstRenderOverview(panel);
  else if (_gstTab === 'returns')  gstRenderReturns(panel);
  else if (_gstTab === 'expenses') gstRenderInputTax(panel);
  else gstRenderSettings(panel);
}

/* ---- overview ---- */
function gstRenderOverview(panel) {
  var period = currentGstPeriod();
  var range  = gstPeriodRange(period);
  if (!range) { panel.innerHTML='<div class="card pad muted">Could not determine current period.</div>'; return; }
  var res = calcGstReturn(range.start, range.end);
  var today = new Date().toISOString().slice(0,10);
  var daysLeft = Math.ceil((new Date(range.dueDate) - new Date()) / 86400000);
  var dueStr = fmtDate(range.dueDate) + (daysLeft > 0 ? ' (' + daysLeft + ' days)' : ' <b style="color:var(--danger)">OVERDUE</b>');

  var posCard = res.netGst >= 0
    ? '<div style="background:#dbeafe;border:1.5px solid #3b82f6;border-radius:13px;padding:16px 20px;text-align:center">' +
        '<div style="font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:.04em;color:#1d4ed8;margin-bottom:6px">GST Payable to MIRA</div>' +
        '<div style="font-size:34px;font-weight:700;color:#1e3a8a;font-family:\'Spline Sans Mono\',monospace">' + money(res.payable) + '</div>' +
        '<div style="font-size:12.5px;color:#3b82f6;margin-top:4px">Due by ' + fmtDate(range.dueDate) + '</div>' +
      '</div>'
    : '<div style="background:var(--accent-soft);border:1.5px solid var(--accent);border-radius:13px;padding:16px 20px;text-align:center">' +
        '<div style="font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:.04em;color:var(--accent-ink);margin-bottom:6px">Input Tax Credit (Carry Forward)</div>' +
        '<div style="font-size:34px;font-weight:700;color:var(--accent-ink);font-family:\'Spline Sans Mono\',monospace">' + money(res.carryFwd) + '</div>' +
        '<div style="font-size:12.5px;color:var(--accent-ink);margin-top:4px">Carry to next period</div>' +
      '</div>';

  panel.innerHTML =
    '<div class="card pad" style="margin-bottom:14px;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:10px">' +
      '<div><div style="font-size:16px;font-weight:700">' + gstPeriodLabel(period) + '</div>' +
        '<div class="muted" style="font-size:12.5px">' + fmtDate(range.start) + ' – ' + fmtDate(range.end) + ' &nbsp;&middot;&nbsp; Due: ' + dueStr + '</div>' +
      '</div>' +
      '<div class="row" style="gap:8px">' +
        '<button class="btn ghost sm" onclick="gstPrintReturn(\''+period+'\')">Print MIRA 205</button>' +
        '<button class="btn accent sm" onclick="gstFileReturn(\''+period+'\')">Record as filed</button>' +
      '</div>' +
    '</div>' +
    '<div style="display:grid;grid-template-columns:1fr 1fr;gap:14px;margin-bottom:14px">' +
      // Output tax card
      '<div class="card pad">' +
        '<div style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.04em;color:var(--ink-soft);margin-bottom:10px">&#9650; Output Tax (Sales)</div>' +
        '<div style="display:flex;justify-content:space-between;padding:5px 0;font-size:13.5px;border-bottom:1px solid var(--line)"><span>Taxable sales</span><span class="mono">' + money(res.totalSales) + '</span></div>' +
        '<div style="display:flex;justify-content:space-between;padding:5px 0;font-size:13.5px;border-bottom:1px solid var(--line)"><span>GST charged (' + gstRate() + '%)</span><span class="mono" style="font-weight:700;color:#1d4ed8">' + money(res.outputTax) + '</span></div>' +
        '<div style="font-size:12px;color:var(--ink-soft);margin-top:8px">' + res.invoiceCount + ' invoice(s) in period</div>' +
      '</div>' +
      // Input tax card
      '<div class="card pad">' +
        '<div style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.04em;color:var(--ink-soft);margin-bottom:10px">&#9660; Input Tax (Purchases)</div>' +
        '<div style="display:flex;justify-content:space-between;padding:5px 0;font-size:13.5px;border-bottom:1px solid var(--line)"><span>Purchases</span><span class="mono">' + money(res.totalPurchases) + '</span></div>' +
        '<div style="display:flex;justify-content:space-between;padding:5px 0;font-size:13.5px;border-bottom:1px solid var(--line)"><span>GST claimed</span><span class="mono" style="font-weight:700;color:var(--accent-ink)">' + money(res.inputTax) + '</span></div>' +
        '<div style="font-size:12px;color:var(--ink-soft);margin-top:8px">' + res.expenseCount + ' expense(s) with GST &nbsp;<a class="linkish" onclick="_gstTab=\'expenses\';viewGST()">Add input tax →</a></div>' +
      '</div>' +
    '</div>' +
    posCard +
    '<div class="card pad" style="margin-top:14px;font-size:12.5px;color:var(--ink-soft)">' +
      '<b style="color:var(--ink)">File via MIRAconnect</b> &nbsp;·&nbsp; ' +
      '<a href="https://mirac.mira.gov.mv" target="_blank" class="linkish">mirac.mira.gov.mv</a> &nbsp;·&nbsp; ' +
      'Form: <b>MIRA 205</b> &nbsp;·&nbsp; MIRA hotline: <b>1415</b>' +
    '</div>';
}

/* ---- print MIRA 205 layout ---- */
function gstPrintReturn(period) {
  var range = gstPeriodRange(period); if (!range) return;
  var res   = calcGstReturn(range.start, range.end);
  var gs    = gstSettings();
  var s     = State.db.settings;
  var row   = function(label, val, bold) {
    return '<tr' + (bold?' style="font-weight:700"':'') + '>' +
      '<td style="padding:8px 12px;border-bottom:1px solid #e4ded2">' + label + '</td>' +
      '<td style="padding:8px 12px;border-bottom:1px solid #e4ded2;text-align:right;font-family:monospace">' + val + '</td>' +
    '</tr>';
  };
  var win = window.open('','_blank');
  win.document.write('<html><head><title>MIRA 205 — ' + gstPeriodLabel(period) + '</title>' +
    '<style>body{font-family:system-ui,sans-serif;max-width:720px;margin:40px auto;font-size:14px;color:#1b1d24}' +
    'h1{font-size:22px;margin-bottom:4px}table{width:100%;border-collapse:collapse}' +
    '.head{display:flex;justify-content:space-between;border-bottom:2px solid #1d4ed8;padding-bottom:12px;margin-bottom:20px}' +
    '.meta{font-size:12.5px;color:#555}.section{font-weight:700;background:#f6f3ec;padding:6px 12px;font-size:12px;text-transform:uppercase;letter-spacing:.04em;color:#555}' +
    '@media print{body{margin:20px}}</style></head><body>');
  win.document.write(
    '<div class="head">' +
      '<div><h1>GST Return — MIRA 205</h1><div class="meta">General Sector</div></div>' +
      '<div style="text-align:right"><div style="font-size:18px;font-weight:700;color:#1d4ed8">MIRA 205</div>' +
        '<div class="meta">Taxable period: ' + gstPeriodLabel(period) + '</div>' +
        '<div class="meta">' + fmtDate(range.start) + ' to ' + fmtDate(range.end) + '</div>' +
      '</div>' +
    '</div>' +
    '<table><tbody>' +
      '<tr><td colspan="2" class="section">Taxpayer Information</td></tr>' +
      row('Business name',esc(s.businessName||''))+
      row('GST Registration No.',esc(gs.gstNumber||'—'))+
      row('Filing period',gstPeriodLabel(period))+
      row('Due date',fmtDate(range.dueDate))+
      '<tr><td colspan="2" class="section">Part A — Output Tax</td></tr>' +
      row('1. Standard rated supplies (taxable sales)',money(res.totalSales))+
      row('2. Output tax on standard rated supplies ('+gstRate()+'%)',money(res.outputTax),true)+
      '<tr><td colspan="2" class="section">Part B — Input Tax</td></tr>' +
      row('3. Standard rated purchases',money(res.totalPurchases))+
      row('4. Input tax on purchases',money(res.inputTax),true)+
      '<tr><td colspan="2" class="section">Part C — Net GST</td></tr>' +
      row('5. Net GST (Output tax minus Input tax)',money(res.netGst),true)+
      (res.payable>0 ? row('6. GST payable to MIRA',money(res.payable),true) : row('6. Input tax credit (carry forward)',money(res.carryFwd),true))+
    '</tbody></table>' +
    '<div style="margin-top:28px;font-size:12px;color:#999;border-top:1px solid #e4ded2;padding-top:14px">' +
      'Generated by QuoteMaster &mdash; file via <a href="https://mirac.mira.gov.mv">MIRAconnect</a> &mdash; MIRA hotline: 1415' +
    '</div></body></html>');
  win.document.close();
  win.print();
}

/* ---- record as filed ---- */
function gstFileReturn(period) {
  var range = gstPeriodRange(period); if (!range) return;
  var res   = calcGstReturn(range.start, range.end);
  var existing = (State.db.gstSettings.filedReturns||[]).find(function(r){ return r.period===period; });
  if (existing) { toast('This period is already recorded as filed.'); return; }
  openModal('Record GST Return as Filed',
    '<div class="fgrid">' +
      '<div class="field full"><label>Period</label><div style="padding:9px 12px;border:1px solid var(--line);border-radius:10px;background:var(--paper)">'+gstPeriodLabel(period)+' — Due '+fmtDate(range.dueDate)+'</div></div>' +
      '<div class="field"><label>Date filed</label><input type="date" id="gst_filed_date" value="'+todayISO()+'"></div>' +
      '<div class="field"><label>Amount paid (if payable)</label><input type="number" step="0.01" id="gst_paid_amt" value="'+res.payable+'"></div>' +
      '<div class="field"><label>MIRA reference / receipt no.</label><input id="gst_ref" placeholder="Optional"></div>' +
    '</div>',
    [{label:'Cancel',cls:'ghost',fn:closeModal},{label:'Save filing record',cls:'accent',fn:function(){
      if (!State.db.gstSettings.filedReturns) State.db.gstSettings.filedReturns=[];
      State.db.gstSettings.filedReturns.unshift({
        period:period, periodLabel:gstPeriodLabel(period),
        filedDate:document.getElementById('gst_filed_date').value,
        amountPaid:+(document.getElementById('gst_paid_amt').value)||0,
        reference:document.getElementById('gst_ref').value,
        snapshot:res
      });
      persist(); closeModal(); toast('GST return recorded as filed.');
      _gstTab='returns'; viewGST();
    }}]
  );
}

/* ---- returns history ---- */
function gstRenderReturns(panel) {
  var filedReturns = (gstSettings().filedReturns)||[];
  if (!filedReturns.length) {
    panel.innerHTML = emptyBox('No filed returns yet',
      'Generate a MIRA 205 report and click "Record as filed" to keep a record here.') +
      '<div style="margin-top:12px"><button class="btn accent sm" onclick="_gstTab=\'overview\';viewGST()">← Back to overview</button></div>';
    return;
  }
  var rows = filedReturns.map(function(r) {
    var net = r.snapshot ? r.snapshot.netGst : 0;
    var status = net >= 0
      ? '<span style="color:#1d4ed8;font-weight:600">Paid ' + money(r.amountPaid) + '</span>'
      : '<span style="color:var(--accent-ink);font-weight:600">Credit ' + money(Math.abs(net)) + '</span>';
    return '<tr>' +
      '<td style="font-weight:600">' + esc(r.periodLabel) + '</td>' +
      '<td class="muted">' + fmtDate(r.filedDate) + '</td>' +
      '<td>' + status + '</td>' +
      '<td class="mono muted" style="font-size:12px">' + esc(r.reference||'—') + '</td>' +
      '<td><button class="btn ghost tiny" onclick="gstPrintReturn(\''+r.period+'\')">Print 205</button></td>' +
    '</tr>';
  }).join('');
  panel.innerHTML = '<div class="tbl"><table>' +
    '<thead><tr><th>Period</th><th>Filed date</th><th>Position</th><th>Reference</th><th></th></tr></thead>' +
    '<tbody>' + rows + '</tbody>' +
    '</table></div>';
}

/* ---- input tax on expenses ---- */
function gstRenderInputTax(panel) {
  var exps = (State.db.expenses||[]).slice().sort(function(a,b){return b.date>a.date?1:-1;});
  var rate = gstRate();
  var helpHtml =
    '<div class="card pad" style="background:var(--accent-soft);border-color:var(--accent);margin-bottom:12px;font-size:13.5px">' +
      '<b>Claiming Input Tax on Purchases</b><br>' +
      'To claim GST you paid on business expenses, tick the "GST incl." checkbox on each expense and QuoteMaster will calculate the reclaimable amount. ' +
      'You must have a valid tax invoice to claim input tax.' +
    '</div>';
  if (!exps.length) { panel.innerHTML = helpHtml + emptyBox('No expenses yet','Add expenses and mark them as GST-inclusive to track input tax.'); return; }
  var rows = exps.map(function(e,ix) {
    var inclAmt = e.gstInclusive ? +(e.amount * rate / (100+rate)).toFixed(2) : (e.inputTax||0);
    return '<tr>' +
      '<td class="muted">' + fmtDate(e.date) + '</td>' +
      '<td><b>' + esc(e.category||'—') + '</b><div class="muted" style="font-size:12px">' + esc(e.desc||'') + '</div></td>' +
      '<td class="mono">' + money(e.amount) + '</td>' +
      '<td style="text-align:center">' +
        '<input type="checkbox"' + (e.gstInclusive?' checked':'') + ' onchange="gstToggleExpense('+ix+',this.checked)">' +
      '</td>' +
      '<td class="mono" style="font-weight:600;color:var(--accent-ink)">' + (inclAmt>0?money(inclAmt):'—') + '</td>' +
    '</tr>';
  }).join('');
  var totalInputTax = exps.reduce(function(s,e){
    return s + (e.gstInclusive ? +(e.amount*rate/(100+rate)).toFixed(2) : (+(e.inputTax)||0));
  }, 0);
  panel.innerHTML = helpHtml +
    '<div class="tbl"><table>' +
      '<thead><tr><th>Date</th><th>Expense</th><th class="right">Amount</th><th style="text-align:center">GST incl.</th><th class="right">Input tax</th></tr></thead>' +
      '<tbody>' + rows + '</tbody>' +
      '<tfoot><tr style="background:#fbf9f3;font-weight:700"><td colspan="4" style="padding:10px 14px;text-align:right">Total reclaimable input tax</td>' +
        '<td style="padding:10px 14px;text-align:right;font-family:monospace;color:var(--accent-ink)">' + money(totalInputTax) + '</td></tr></tfoot>' +
    '</table></div>';
}
function gstToggleExpense(ix, checked) {
  var exps = State.db.expenses||[];
  var exp  = exps.slice().sort(function(a,b){return b.date>a.date?1:-1;})[ix];
  if (!exp) return;
  var origIx = exps.findIndex(function(e){return e.id===exp.id;});
  if (origIx>=0) { exps[origIx].gstInclusive = checked; persist(); }
  gstRenderInputTax(document.getElementById('gstPanel'));
}

/* ---- settings ---- */
function gstRenderSettings(panel) {
  var gs = gstSettings();
  panel.innerHTML =
    '<div class="card pad">' +
      '<h3 style="margin-bottom:14px">GST Registration & Settings</h3>' +
      '<div class="fgrid">' +
        '<div class="field full"><label>GST registered?</label>' +
          '<select id="gst_reg">' +
            '<option value="1"' + (gs.registered?' selected':'') + '>Yes — I am registered for GST</option>' +
            '<option value="0"' + (!gs.registered?' selected':'') + '>No — not registered</option>' +
          '</select></div>' +
        '<div class="field"><label>GST Registration number</label>' +
          '<input id="gst_no" value="' + esc(gs.gstNumber||'') + '" placeholder="e.g. GST-XXXXXXXX"></div>' +
        '<div class="field"><label>Sector</label>' +
          '<select id="gst_sector">' +
            '<option value="general"' + (gs.sector==='general'?' selected':'') + '>General (8%)</option>' +
            '<option value="tourism"' + (gs.sector==='tourism'?' selected':'') + '>Tourism (17%)</option>' +
          '</select></div>' +
        '<div class="field"><label>Filing frequency</label>' +
          '<select id="gst_freq">' +
            '<option value="quarterly"' + (gs.filingFrequency==='quarterly'?' selected':'') + '>Quarterly — avg sales ≤ MVR 1M/month</option>' +
            '<option value="monthly"'  + (gs.filingFrequency==='monthly'?' selected':'') + '>Monthly — avg sales &gt; MVR 1M/month</option>' +
          '</select></div>' +
      '</div>' +
      '<button class="btn accent" style="margin-top:8px" onclick="gstSaveSettings()">Save GST settings</button>' +
    '</div>' +
    '<div class="card pad" style="margin-top:14px;font-size:13px;color:var(--ink-soft)">' +
      '<b style="color:var(--ink)">MIRA key rules</b><br>' +
      '&#x2022; <cite index="4-1">GST rate: <b>8%</b> (General sector from 1 Jan 2023) · <b>17%</b> (Tourism from 1 Jul 2025)</cite><br>' +
      '&#x2022; <cite index="6-1">File and pay by <b>28th of the month</b> after the taxable period ends</cite><br>' +
      '&#x2022; <cite index="10-1">Monthly if avg sales &gt; MVR 1 million/month. Quarterly otherwise (Jan–Mar, Apr–Jun, Jul–Sep, Oct–Dec)</cite><br>' +
      '&#x2022; File online at <a href="https://mirac.mira.gov.mv" target="_blank" class="linkish">MIRAconnect</a> using form MIRA 205 &nbsp;&middot;&nbsp; Hotline: <b>1415</b>' +
    '</div>';
}
function gstSaveSettings() {
  var s = State.db.gstSettings;
  s.registered      = document.getElementById('gst_reg').value === '1';
  s.gstNumber       = document.getElementById('gst_no').value.trim();
  s.sector          = document.getElementById('gst_sector').value;
  s.filingFrequency = document.getElementById('gst_freq').value;
  persist();
  toast('GST settings saved');
  viewGST();
}

/* ============================================================
   EXPENSES
   ============================================================ */
const EXP_CATS=['Rent & Utilities','Salaries & Wages','Equipment & Supplies','Marketing & Advertising','Transport & Delivery','Food & Entertainment','Maintenance & Repairs','Taxes & Fees','Stock & Inventory','Other'];
const EXP_EMOJI={'Rent & Utilities':'🏢','Salaries & Wages':'👥','Equipment & Supplies':'🔧','Marketing & Advertising':'📣','Transport & Delivery':'🚚','Food & Entertainment':'🍽️','Maintenance & Repairs':'🔨','Taxes & Fees':'📋','Stock & Inventory':'📦','Other':'💼'};
var expPeriod='month', expCat='All';
function viewExpenses(){
  if(!State.db){toast("Loading… please wait");return;}
  if(!State.db.expenses)State.db.expenses=[];
  const now=new Date(), mm=now.getMonth(), yy=now.getFullYear();
  const lastMm=mm===0?11:mm-1, lastYy=mm===0?yy-1:yy;
  const inPeriod=e=>{if(!e.date)return true;const d=new Date(e.date);if(expPeriod==='month')return d.getMonth()===mm&&d.getFullYear()===yy;if(expPeriod==='last')return d.getMonth()===lastMm&&d.getFullYear()===lastYy;return true;};
  const filtered=State.db.expenses.filter(e=>inPeriod(e)&&(expCat==='All'||e.category===expCat)).sort((a,b)=>b.date>a.date?1:-1);
  const total=filtered.reduce((s,e)=>s+(e.amount||0),0);
  // category totals for breakdown
  const bycat={};filtered.forEach(e=>{bycat[e.category||'Other']=(bycat[e.category||'Other']||0)+(e.amount||0);});
  const maxCat=Math.max(...Object.values(bycat),1);
  const periodLabel=expPeriod==='month'?now.toLocaleString('default',{month:'long',year:'numeric'}):expPeriod==='last'?new Date(lastYy,lastMm).toLocaleString('default',{month:'long',year:'numeric'}):'All time';
  document.getElementById('content').innerHTML=`
   <div class="between" style="margin-bottom:14px;flex-wrap:wrap;gap:10px">
     <div class="period-tabs">
       <button class="period-tab ${expPeriod==='month'?'active':''}" onclick="expPeriod='month';viewExpenses()">This month</button>
       <button class="period-tab ${expPeriod==='last'?'active':''}" onclick="expPeriod='last';viewExpenses()">Last month</button>
       <button class="period-tab ${expPeriod==='all'?'active':''}" onclick="expPeriod='all';viewExpenses()">All time</button>
     </div>
     <button class="btn accent" onclick="openExpenseEditor()">${svg('plus')} Add expense</button>
   </div>
   <div class="grid" style="grid-template-columns:${isMob()?'1fr':'1fr 260px'};gap:14px;margin-bottom:16px">
     <div class="card pad">
       <div class="between" style="margin-bottom:12px">
         <div><div class="muted" style="font-size:12.5px">${periodLabel}</div><div style="font-size:22px;font-weight:700;font-family:'Spline Sans Mono',monospace;margin-top:2px">${money(total)}</div></div>
         <select class="ghost" style="border:1px solid var(--line);border-radius:9px;padding:7px 10px;font-size:13px;background:var(--paper)" onchange="expCat=this.value;viewExpenses()">
           <option value="All" ${expCat==='All'?'selected':''}>All categories</option>
           ${EXP_CATS.map(c=>`<option value="${esc(c)}" ${expCat===c?'selected':''}>${c}</option>`).join('')}
         </select>
       </div>
       ${filtered.length?`${isMob()?`<div class="mob-cards">${filtered.map(e=>`<div class="mob-card">
         <div class="mob-card-top"><span style="font-size:14px">${EXP_EMOJI[e.category]||'💼'} <span style="font-weight:600">${esc(e.category||'Other')}</span></span><span class="muted" style="font-size:12.5px">${fmtDate(e.date)}</span></div>
         <div style="font-size:14px;margin-bottom:6px">${esc(e.desc||'—')}</div>
         ${e.notes?`<div class="muted" style="font-size:12px;margin-bottom:6px">${esc(e.notes)}</div>`:''}
         <div class="mob-card-foot">
           <div class="mob-card-actions"><button class="iconbtn" onclick='openExpenseEditor("${e.id}")'>${svg('edit')}</button><button class="iconbtn" onclick='delExpense("${e.id}")'>${svg('trash')}</button></div>
           <span class="mob-card-amount" style="color:var(--danger)">${money(e.amount)}</span>
         </div>
       </div>`).join('')}</div>`:`<div class="tbl"><table><thead><tr><th>Date</th><th>Category</th><th>Description</th><th>Method</th><th class="right">Amount</th><th></th></tr></thead><tbody>
         ${filtered.map(e=>`<tr>
           <td>${fmtDate(e.date)}</td>
           <td>${EXP_EMOJI[e.category]||'💼'} ${esc(e.category||'Other')}</td>
           <td>${esc(e.desc||'—')}${e.notes?`<div class="muted" style="font-size:12px">${esc(e.notes)}</div>`:''}</td>
           <td class="muted">${esc(e.method||'cash')}</td>
           <td class="right mono" style="color:var(--danger);font-weight:600">${money(e.amount)}</td>
           <td><div class="rowacts"><button class="iconbtn" onclick='openExpenseEditor("${e.id}")'>${svg('edit')}</button><button class="iconbtn" onclick='delExpense("${e.id}")'>${svg('trash')}</button></div></td>
         </tr>`).join('')}
       </tbody></table></div>`}`:emptyBox('No expenses','Add your first expense to start tracking business costs.')}
     </div>
     <div class="card pad" style="${isMob()&&Object.keys(bycat).length===0?'display:none':''}">
       <div style="font-weight:700;font-size:13.5px;margin-bottom:12px">By category</div>
       ${Object.keys(bycat).length?Object.entries(bycat).sort((a,b)=>b[1]-a[1]).map(([cat,amt])=>`<div class="exp-cat-row">
         <div style="flex:1;min-width:0"><div class="exp-cat-name">${EXP_EMOJI[cat]||'💼'} <span style="overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${esc(cat)}</span></div>
         <div class="exp-cat-bar-wrap"><div class="exp-cat-bar" style="width:${(amt/maxCat*100).toFixed(0)}%"></div></div></div>
         <div style="font-family:'Spline Sans Mono',monospace;font-size:13px;font-weight:700;margin-left:10px;white-space:nowrap">${money(amt)}</div>
       </div>`).join(''):emptyBox('No data','—')}
     </div>
   </div>`;
  renderIcons(document.getElementById('content'));
}
function openExpenseEditor(id){
  const e=id?(State.db.expenses||[]).find(x=>x.id===id):{date:todayISO(),category:EXP_CATS[0],desc:'',amount:'',method:'cash',notes:''};
  openModal(`${id?'Edit':'New'} expense`,`
    <div class="fgrid">
      <div class="field"><label>Date *</label><input id="ex_date" type="date" value="${e.date||todayISO()}"></div>
      <div class="field"><label>Category *</label><select id="ex_cat">${EXP_CATS.map(c=>`<option value="${c}" ${(e.category||EXP_CATS[0])===c?'selected':''}>${EXP_EMOJI[c]||''} ${c}</option>`).join('')}</select></div>
      <div class="field full"><label>Description *</label><input id="ex_desc" value="${esc(e.desc||'')}" placeholder="e.g. Monthly office rent"></div>
      <div class="field"><label>Amount (${esc(State.db.settings.currency)}) *</label><input id="ex_amt" type="number" step="0.01" value="${e.amount||''}"></div>
      <div class="field"><label>Payment method</label><select id="ex_meth"><option value="cash" ${(e.method||'cash')==='cash'?'selected':''}>Cash</option><option value="card" ${e.method==='card'?'selected':''}>Card</option><option value="transfer" ${e.method==='transfer'?'selected':''}>Bank transfer</option><option value="cheque" ${e.method==='cheque'?'selected':''}>Cheque</option></select></div>
      <div class="field full"><label>Notes (optional)</label><input id="ex_notes" value="${esc(e.notes||'')}" placeholder="Extra details…"></div>
    </div>`,
    [{label:'Cancel',cls:'ghost',fn:closeModal},{label:id?'Save':'Add expense',cls:'accent',fn:()=>{
      const desc=val('ex_desc'),amt=+val('ex_amt')||0;
      if(!desc)return toast('Description is required');if(!amt)return toast('Amount is required');
      if(!State.db.expenses)State.db.expenses=[];
      const rec={id:id||uid(),date:val('ex_date'),category:val('ex_cat'),desc,amount:amt,method:val('ex_meth'),notes:val('ex_notes')};
      if(id){const ix=State.db.expenses.findIndex(x=>x.id===id);State.db.expenses[ix]=rec;}else State.db.expenses.push(rec);
      persist();closeModal();viewExpenses();toast(id?'Expense updated':'Expense added');
    }}]);
}
function delExpense(id){confirmDel('Delete this expense?',()=>{State.db.expenses=(State.db.expenses||[]).filter(e=>e.id!==id);persist();viewExpenses();toast('Expense deleted');});}

/* ============================================================
   BARCODE SCANNER  (BarcodeDetector API + manual fallback)
   ============================================================ */
let _scanCb=null,_scanStream=null,_scanRaf=null;
async function openBarcodeScanner(callback){
  _scanCb=callback;
  const hasCam=!!navigator.mediaDevices?.getUserMedia;
  const hasBD='BarcodeDetector' in window;
  openModal('Scan barcode',`<div style="text-align:center">
    ${hasCam?`<div class="scan-frame" style="max-width:300px"><video id="_sv" autoplay playsinline muted></video><div class="scan-overlay"><div class="scan-box"></div></div></div>`:''}
    <p class="muted" style="font-size:12.5px;margin:10px 0 6px" id="_ss">${hasCam?'Aim camera at barcode…':'No camera — type or use USB scanner'}</p>
    <div class="field" style="max-width:300px;margin:0 auto"><label>Type / paste barcode manually</label>
      <input id="_sm" placeholder="EAN-13, Code 128, QR…" oninput="document.getElementById('_sb').disabled=!this.value" autocomplete="off">
    </div>
    <div style="margin-top:8px"><button class="btn accent sm" id="_sb" disabled onclick="const v=document.getElementById('_sm').value;stopScan();closeModal();_scanCb&&_scanCb(v)">Use this code</button></div>
  </div>`,[{label:'Cancel',cls:'ghost',fn:()=>{stopScan();closeModal();}}],'sm');
  if(!hasCam)return;
  try{
    _scanStream=await navigator.mediaDevices.getUserMedia({video:{facingMode:'environment',width:{ideal:1280}}});
    const v=document.getElementById('_sv');if(!v)return;
    v.srcObject=_scanStream;await v.play();
    if(hasBD){
      const det=new BarcodeDetector({formats:['ean_13','ean_8','code_128','code_39','upc_a','upc_e','qr_code','data_matrix']});
      const frame=async()=>{
        const v=document.getElementById('_sv');if(!v||!_scanStream){return;}
        try{const r=await det.detect(v);
          if(r?.length){stopScan();closeModal();_scanCb&&_scanCb(r[0].rawValue);try{navigator.vibrate&&navigator.vibrate([60]);}catch(e){}toast('✓ Scanned: '+r[0].rawValue);}
          else _scanRaf=requestAnimationFrame(frame);
        }catch(e){_scanRaf=requestAnimationFrame(frame);}
      };
      _scanRaf=requestAnimationFrame(frame);
    } else {
      const s=document.getElementById('_ss');
      if(s)s.textContent='Camera live — BarcodeDetector not supported on this browser. Use manual input or a USB/Bluetooth scanner.';
    }
  }catch(e){
    const s=document.getElementById('_ss');
    if(s)s.textContent='Camera permission denied — use the manual input below.';
  }
}
function stopScan(){
  if(_scanRaf){cancelAnimationFrame(_scanRaf);_scanRaf=null;}
  if(_scanStream){_scanStream.getTracks().forEach(t=>t.stop());_scanStream=null;}
}

/* ============================================================
   EMPLOYEES
   ============================================================ */
var EMP_FREE_LIMIT = 5;
function viewEmployees(){
  if(!State.db){toast("Loading… please wait");return;}
  const emps=State.db.employees||[];
  const atLimit=featureLocked('multiEmployee')&&emps.length>=EMP_FREE_LIMIT;
  document.getElementById('content').innerHTML=`
   <div class="between" style="margin-bottom:16px">
     <div>
       <p class="muted" style="font-size:13px;margin-top:3px">Employees can log in to the POS with a PIN. Free plan: up to ${EMP_FREE_LIMIT} employees.</p>
     </div>
     <button class="btn accent" onclick="openEmpEditor()" ${atLimit?'disabled':''} title="${atLimit?'Upgrade to Pro to add more employees':'Add employee'}">${svg('plus')} Add employee</button>
   </div>
   ${atLimit?`<div class="card pad" style="background:var(--amber-soft);border-color:var(--amber);margin-bottom:14px"><div class="row" style="gap:10px">${svg('lock',18)}<div><b>Employee limit reached (${EMP_FREE_LIMIT}).</b> <a class="linkish" onclick="openUpgrade()">Upgrade to Pro</a> for unlimited employees.</div></div></div>`:''}
   ${emps.length?`<div class="tbl"><table><thead><tr><th>Name</th><th>Role</th><th>PIN set</th><th>Status</th><th></th></tr></thead><tbody>
     ${emps.map(e=>`<tr>
       <td style="font-weight:600"><div class="row" style="gap:9px"><div class="emp-avt" style="width:32px;height:32px;font-size:14px;flex-shrink:0">${(e.name||'?')[0].toUpperCase()}</div>${esc(e.name)}</div></td>
       <td><span class="pill ${e.role==='manager'?'sent':'draft'}">${e.role||'cashier'}</span></td>
       <td>${e.pin?'<span class="pill paid">●●●●</span>':'<span class="muted">Not set</span>'}</td>
       <td><select class="pill ${e.active!==false?'paid':'draft'}" style="border:none;font-weight:600;cursor:pointer" onchange="setEmpActive('${e.id}',this.value==='active')"><option value="active" ${e.active!==false?'selected':''}>Active</option><option value="inactive" ${e.active===false?'selected':''}>Inactive</option></select></td>
       <td><div class="rowacts"><button class="iconbtn" onclick='openEmpEditor("${e.id}")'>${svg('edit')}</button><button class="iconbtn" onclick='delEmployee("${e.id}")'>${svg('trash')}</button></div></td>
     </tr>`).join('')}
   </tbody></table></div>`:emptyBox('No employees yet','Add employees so they can log in to the POS with a PIN.')}`;
  renderIcons(document.getElementById('content'));
}
function openEmpEditor(id){
  const e=id?(State.db.employees||[]).find(x=>x.id===id):{name:'',role:'cashier',pin:'',active:true};
  openModal(`${id?'Edit':'New'} employee`,`
    <div class="fgrid">
      <div class="field full"><label>Full name *</label><input id="em_name" value="${esc(e.name||'')}"></div>
      <div class="field"><label>Role</label><select id="em_role"><option value="cashier" ${(e.role||'cashier')==='cashier'?'selected':''}>Cashier</option><option value="manager" ${e.role==='manager'?'selected':''}>Manager</option></select></div>
      <div class="field"><label>4-digit PIN</label><input id="em_pin" type="password" maxlength="4" pattern="[0-9]{4}" inputmode="numeric" value="${esc(e.pin||'')}" placeholder="Leave blank to keep unchanged"></div>
      <div class="field"><label>Status</label><select id="em_act"><option value="1" ${e.active!==false?'selected':''}>Active</option><option value="0" ${e.active===false?'selected':''}>Inactive</option></select></div>
    </div>`,
    [{label:'Cancel',cls:'ghost',fn:closeModal},{label:id?'Save':'Add employee',cls:'accent',fn:()=>{
      const name=val('em_name');if(!name)return toast('Name is required');
      const pin=val('em_pin'); if(pin&&!/^\d{4}$/.test(pin))return toast('PIN must be exactly 4 digits');
      if(!State.db.employees)State.db.employees=[];
      const rec={id:id||uid(),name,role:val('em_role'),pin:pin||(id?(State.db.employees.find(x=>x.id===id)||{}).pin:''),active:val('em_act')==='1'};
      if(id){const ix=State.db.employees.findIndex(x=>x.id===id);State.db.employees[ix]=rec;}else State.db.employees.push(rec);
      persist();closeModal();viewEmployees();toast(id?'Employee updated':'Employee added');
    }}]);
}

function handleItemImage(file){
  if(!file)return;
  if(!file.type.startsWith('image/')){toast('Please select an image file');return;}
  if(file.size>3*1024*1024){toast('Image too large — max 3MB');return;}
  var reader=new FileReader();
  reader.onload=function(e){
    var img=new Image();
    img.onload=function(){
      // Compress: max 600px on longest side
      var MAX=600,w=img.width,h=img.height;
      if(w>MAX||h>MAX){if(w>h){h=Math.round(h*MAX/w);w=MAX;}else{w=Math.round(w*MAX/h);h=MAX;}}
      var canvas=document.createElement('canvas');
      canvas.width=w;canvas.height=h;
      canvas.getContext('2d').drawImage(img,0,0,w,h);
      window._itemImgDataUrl=canvas.toDataURL('image/jpeg',0.82);
      var prev=document.getElementById('item_img_prev');
      if(prev){prev.outerHTML='<img id="item_img_prev" src="'+window._itemImgDataUrl+'" style="max-height:100px;border-radius:8px;object-fit:contain">';}
      var nameEl=document.getElementById('item_img_name');
      if(nameEl)nameEl.textContent='✓ '+file.name+' ready';
    };
    img.src=e.target.result;
  };
  reader.readAsDataURL(file);
}

function setEmpActive(id,active){const e=(State.db.employees||[]).find(x=>x.id===id);if(e){e.active=active;persist();}}
function delEmployee(id){confirmDel('Delete this employee?',()=>{State.db.employees=(State.db.employees||[]).filter(e=>e.id!==id);persist();viewEmployees();toast('Employee removed');});}

/* ============================================================
   POS — POINT OF SALE
   ============================================================ */
var posCart=[], posCashier=null, posPayMethod='cash', _posTab='items';
function viewPOS(){
  if(!State.db){toast("Loading… please wait");return;}
  const emps=(State.db.employees||[]).filter(e=>e.active!==false);
  if(!posCashier){
    if(!emps.length){posCashier={name:State.db.settings.businessName||'Owner',role:'manager'};renderPOS();return;}
    showEmpLogin(emps);
  }else renderPOS();
}
function showEmpLogin(emps){
  const c=document.getElementById('content');
  c.innerHTML=`<div style="max-width:480px;margin:40px auto;text-align:center;padding:20px 16px">
    <div style="width:56px;height:56px;border-radius:16px;background:var(--accent-soft);display:grid;place-items:center;margin:0 auto 14px">${svg('pos',26)}</div>
    <h2 style="margin-bottom:4px">POS Sign-in</h2>
    <p class="muted" style="font-size:13px;margin-bottom:2px">Select your name to open the register</p>
    <div class="emp-grid" style="margin-top:16px">
      ${emps.map(e=>`<div class="emp-tile" onclick="empPinPrompt('${e.id}')">
        <div class="emp-avt">${(e.name||'?')[0].toUpperCase()}</div>
        <div style="font-weight:600;font-size:13px">${esc(e.name)}</div>
        <div class="muted" style="font-size:11.5px">${e.role||'cashier'}</div>
      </div>`).join('')}
    </div>
    <p class="muted" style="font-size:12px;margin-top:20px">Not listed? Ask the admin to add you as an employee.</p>
  </div>`;
}
var _pinInput='',_pinEmpId='';
function empPinPrompt(id){
  const e=(State.db.employees||[]).find(x=>x.id===id);if(!e)return;
  if(!e.pin){posCashier=e;renderPOS();return;}
  _pinInput='';_pinEmpId=id;
  openModal(`Sign in — ${esc(e.name)}`,`
    <div style="text-align:center">
      <div class="pin-dots" id="pinDots">${[0,1,2,3].map(()=>'<div class="pin-dot"></div>').join('')}</div>
      <div class="pinpad" id="pinPad">
        ${[1,2,3,4,5,6,7,8,9,'',0,'⌫'].map(k=>`<button class="pin-key" onclick="pinKey('${k}')">${k}</button>`).join('')}
      </div>
      <p class="muted" style="font-size:12.5px;margin-top:10px" id="pinErr"></p>
    </div>`,[{label:'Cancel',cls:'ghost',fn:()=>{closeModal();}}],'sm');
}
function pinKey(k){
  if(k==='⌫'){_pinInput=_pinInput.slice(0,-1);}
  else if(k!==''&&_pinInput.length<4){_pinInput+=k;}
  const dots=document.querySelectorAll('.pin-dot');
  dots.forEach((d,i)=>d.classList.toggle('filled',i<_pinInput.length));
  if(_pinInput.length===4){
    const e=(State.db.employees||[]).find(x=>x.id===_pinEmpId);
    if(e&&e.pin===_pinInput){closeModal();posCashier=e;renderPOS();}
    else{document.getElementById('pinErr').textContent='Wrong PIN. Try again.';_pinInput='';dots.forEach(d=>d.classList.remove('filled'));}
  }
}
function renderPOS(){
  const s=State.db.settings;
  const items=(State.db.items||[]).filter(i=>i.name.toLowerCase().includes((_posSearch||'').toLowerCase()));
  const t=calcPosCart();
  const mob=isMob();
  document.getElementById('content').innerHTML=`
    <div class="pos-cashier-bar">
      <span>${svg('badge',15)} Cashier: <strong>${esc(posCashier.name)}</strong></span>
      <button class="btn ghost tiny" onclick="posCashier=null;_posSearch='';viewPOS()">Switch</button>
    </div>
    ${mob?`<div class="pos-tab-bar"><button class="pos-tab ${_posTab==='items'?'active':''}" onclick="_posTab='items';renderPOS()">Items</button><button class="pos-tab ${_posTab==='cart'?'active':''}" onclick="_posTab='cart';renderPOS()">Cart (${posCart.reduce((s,c)=>s+c.qty,0)})</button></div>`:''}
    <div class="pos-wrap">
      <div class="pos-items-panel" style="${mob&&_posTab==='cart'?'display:none':''}">
        <div class="search" style="margin-bottom:10px">${svg('search')}<input placeholder="Search products…" value="${esc(_posSearch||'')}" oninput="_posSearch=this.value;renderPOS()"><button class="iconbtn" style="position:absolute;right:4px;top:50%;transform:translateY(-50%)" title="Scan barcode" onclick="openBarcodeScanner(v=>{const it=State.db.items.find(i=>i.barcode===v||i.sku===v);if(it){addToCart(it.id);if(isMob()){_posTab='cart';renderPOS();}}else{_posSearch=v;renderPOS();toast('No product found for: '+v);}})">${svg('scan',15)}</button></div>
        ${items.length?`<div class="pos-grid">${items.map(i=>{const inCart=posCart.find(c=>c.itemId===i.id);return`<div class="pos-tile ${i.trackStock!==false&&(i.stockQty||0)<=0?'stk-dim':''}" onclick="addToCart('${i.id}')">
          ${inCart?`<div class="pt-badge">${inCart.qty}</div>`:''}
          ${i.trackStock!==false?`<div class="stk-tile ${(i.stockQty||0)<=0?'stk-out':(i.reorderLevel>0&&(i.stockQty||0)<=i.reorderLevel?'stk-low':'stk-good')}">${(i.stockQty||0)<=0?'Out':(i.stockQty||0)}</div>`:''}
          <div class="pt-name">${esc(i.name)}</div>
          <div class="pt-sku">${esc(i.sku||i.unit||'')}</div>
          <div class="pt-price">${money(i.unitPrice)}</div>
        </div>`;}).join('')}</div>`:`<div class="empty">No items match</div>`}
      </div>
      <div class="pos-cart-panel" style="${mob&&_posTab==='items'?'display:none':''}">
        <div style="font-weight:700;font-size:14px;margin-bottom:4px">Cart</div>
        <div class="cart-rows">
          ${posCart.length?posCart.map((ci,ix)=>`<div class="cart-row">
            <div class="cart-row-name">${esc(ci.name)}</div>
            <div class="qty-ctrl">
              <button class="qty-btn" onclick="adjCart(${ix},-1)">−</button>
              <span style="min-width:22px;text-align:center;font-size:13px">${ci.qty}</span>
              <button class="qty-btn" onclick="adjCart(${ix},1)">+</button>
            </div>
            <div class="cart-row-amt">${money(ci.amount)}</div>
            <button class="iconbtn" onclick="posCart.splice(${ix},1);renderPOS()" style="flex-shrink:0">${svg('trash')}</button>
          </div>`).join(''):`<div class="empty" style="padding:24px 0;font-size:13px">Tap items to add to cart</div>`}
        </div>
        <div class="pos-totals">
          <div class="tr"><span class="muted">Subtotal</span><span class="mono">${money(t.subtotal)}</span></div>
          <div class="tr"><span class="muted">${esc(s.taxLabel)} (${s.taxRate}%)</span><span class="mono">${money(t.tax)}</span></div>
          <div class="tr grand"><span>Total</span><span class="mono">${money(t.total)}</span></div>
        </div>
        <div class="pay-btns">
          <button class="pay-btn ${posPayMethod==='cash'?'sel':''}" onclick="posPayMethod='cash';renderPOS()">💵 Cash</button>
          <button class="pay-btn ${posPayMethod==='card'?'sel':''}" onclick="posPayMethod='card';renderPOS()">💳 Card</button>
          <button class="pay-btn ${posPayMethod==='transfer'?'sel':''}" onclick="posPayMethod='transfer';renderPOS()">🏦 Transfer</button>
        </div>
        <button class="btn accent block" style="margin-bottom:10px" ${!posCart.length?'disabled':''} onclick="posCheckout()">Complete Sale — ${money(t.total)}</button>
        <button class="btn ghost block" style="font-size:12.5px" onclick="viewPOSHistory()">View transaction history</button>
      </div>
    </div>`;
  renderIcons(document.getElementById('content'));
}
var _posSearch='';
function addToCart(itemId){
  const item=State.db.items.find(i=>i.id===itemId);if(!item)return;
  // Check stock availability
  if(item.trackStock!==false){
    const inCart=posCart.find(c=>c.itemId===itemId);
    const cartQty=inCart?inCart.qty:0;
    const available=(item.stockQty||0)-cartQty;
    if(available<=0){toast('⚠ '+item.name+' is out of stock');return;}
  }
  const ex=posCart.find(c=>c.itemId===itemId);
  if(ex)ex.qty++;
  else posCart.push({itemId,name:item.name,unitPrice:item.unitPrice,taxable:item.taxable!==false,qty:1,amount:item.unitPrice});
  calcPosCart();renderPOS();
}
function adjCart(ix,delta){
  posCart[ix].qty=Math.max(1,posCart[ix].qty+delta);
  calcPosCart();renderPOS();
}
function calcPosCart(){
  const rate=State.db.settings.taxRate/100;
  let sub=0,tax=0;
  posCart.forEach(ci=>{ci.amount=+(ci.qty*ci.unitPrice).toFixed(2);sub+=ci.amount;if(ci.taxable)tax+=ci.amount*rate;});
  return {subtotal:+sub.toFixed(2),tax:+tax.toFixed(2),total:+(sub+tax).toFixed(2)};
}
function posCheckout(){
  const t=calcPosCart();
  openModal('Complete Sale',`
    <div class="fgrid">
      <div class="field full"><label>Customer name (optional)</label><input id="pos_cust" placeholder="Walk-in customer"></div>
      <div class="field"><label>Total</label><input readonly value="${money(t.total)}" style="font-weight:700;background:var(--accent-soft)"></div>
      ${posPayMethod==='cash'?`<div class="field"><label>Cash tendered</label><input id="pos_tend" type="number" step="0.01" placeholder="${t.total}" oninput="document.getElementById('pos_chg').textContent=money(Math.max(0,(+this.value||0)-${t.total}))"></div>`:``}
      ${posPayMethod==='cash'?`<div class="field"><label>Change</label><div id="pos_chg" style="padding:10px 12px;border:1px solid var(--line);border-radius:10px;font-weight:700;background:var(--accent-soft)">${money(0)}</div></div>`:``}
    </div>`,
    [{label:'Cancel',cls:'ghost',fn:closeModal},{label:'Confirm & Print Receipt',cls:'accent',fn:()=>{
      const tendered=posPayMethod==='cash'?+(document.getElementById('pos_tend')?.value||t.total):t.total;
      const txn={id:uid(),number:(State.db.settings.posPrefix||'TXN-')+String(State.db.counters.pos).padStart(4,'0'),
        date:todayISO(),time:new Date().toLocaleTimeString([],{hour:'2-digit',minute:'2-digit'}),
        cashier:posCashier.name,customer:document.getElementById('pos_cust')?.value||'Walk-in',
        lineItems:JSON.parse(JSON.stringify(posCart)),totals:{...t,tendered,change:+(tendered-t.total).toFixed(2)},
        paymentMethod:posPayMethod};
      if(!State.db.transactions)State.db.transactions=[];
      State.db.transactions.unshift(txn);
      State.db.counters.pos=(State.db.counters.pos||1)+1;
      // Deduct stock for each sold item
      posCart.forEach(ci=>{
        const item=State.db.items.find(i=>i.id===ci.itemId);
        if(item&&item.trackStock!==false) addStockMovement(ci.itemId,'sale',-ci.qty,'POS-'+txn.number,'');
      });
      persist();closeModal();posCart=[];printReceipt(txn);
    }}]);
}
function printReceipt(txn){
  const s=State.db.settings;
  const logo=s.logo?`<img src="${s.logo}" style="width:48px;height:48px;border-radius:8px;object-fit:cover">`:`<div style="width:48px;height:48px;border-radius:8px;background:#0f6d5a;color:#fff;display:grid;place-items:center;font-family:'Fraunces',serif;font-size:22px;font-weight:700">${(s.businessName||'B')[0]}</div>`;
  document.getElementById('printRoot').innerHTML=`<div class="doc" style="width:380px;margin:0 auto;padding:28px 24px">
    <div style="text-align:center;margin-bottom:16px">
      <div style="display:flex;align-items:center;justify-content:center;gap:10px">${logo}<div style="text-align:left"><div style="font-family:'Fraunces',serif;font-size:18px;font-weight:600">${esc(s.businessName)}</div><div style="font-size:11px;color:#777">${esc(s.address?s.address.split('\n')[0]:'')}</div></div></div>
      <div style="margin-top:10px;font-size:12px;color:#777">─────────────────────────</div>
      <div style="font-size:13px;margin-top:6px"><strong>Receipt ${esc(txn.number)}</strong> · ${txn.date} ${txn.time}</div>
      <div style="font-size:12px;color:#777">Cashier: ${esc(txn.cashier)} · ${esc(txn.customer)}</div>
      <div style="font-size:12px;color:#777">─────────────────────────</div>
    </div>
    <table style="width:100%;font-size:12.5px;border-collapse:collapse">
      ${txn.lineItems.map(li=>`<tr><td style="padding:4px 0">${esc(li.name)}<br><span style="color:#777">× ${li.qty} @ ${money(li.unitPrice)}</span></td><td style="text-align:right;padding:4px 0;font-family:monospace">${money(li.amount)}</td></tr>`).join('')}
    </table>
    <div style="border-top:1px dashed #ccc;margin-top:10px;padding-top:10px;font-size:13px">
      <div style="display:flex;justify-content:space-between;margin-bottom:3px"><span style="color:#777">Subtotal</span><span style="font-family:monospace">${money(txn.totals.subtotal)}</span></div>
      <div style="display:flex;justify-content:space-between;margin-bottom:3px"><span style="color:#777">${esc(s.taxLabel)} ${s.taxRate}%</span><span style="font-family:monospace">${money(txn.totals.tax)}</span></div>
      <div style="display:flex;justify-content:space-between;font-weight:700;font-size:15px;margin-top:4px"><span>TOTAL</span><span style="font-family:monospace">${money(txn.totals.total)}</span></div>
      ${txn.paymentMethod==='cash'?`<div style="display:flex;justify-content:space-between;margin-top:6px;color:#777;font-size:12px"><span>Cash tendered</span><span style="font-family:monospace">${money(txn.totals.tendered)}</span></div><div style="display:flex;justify-content:space-between;color:#777;font-size:12px"><span>Change</span><span style="font-family:monospace">${money(txn.totals.change)}</span></div>`:`<div style="text-align:right;color:#777;font-size:12px;margin-top:4px">Paid by ${txn.paymentMethod}</div>`}
    </div>
    <div style="text-align:center;margin-top:16px;font-size:11px;color:#999">Thank you for your business!<br>${esc(s.invoiceFooter||'')}</div>
  </div>`;
  setTimeout(()=>window.print(),100);
  toast('Printing receipt…');
  setTimeout(()=>renderPOS(),800);
}
function viewPOSHistory(){
  const txns=(State.db.transactions||[]).slice(0,50);
  const c=document.getElementById('content');
  const total=txns.reduce((s,t)=>s+t.totals.total,0);
  c.innerHTML=`
    <div class="between" style="margin-bottom:14px">
      <div><h3>Transaction history</h3><p class="muted" style="font-size:13px">${txns.length} recent transactions · ${money(total)}</p></div>
      <button class="btn ghost sm" onclick="posCashier=null;viewPOS()">← Back to POS</button>
    </div>
    ${txns.length?`<div class="mob-cards">${txns.map(t=>`<div class="mob-card">
      <div class="mob-card-top"><span class="mob-card-id">${esc(t.number)}</span><span class="pill paid">${t.paymentMethod||'cash'}</span></div>
      <div class="mob-card-name">${esc(t.customer||'Walk-in')}</div>
      <div class="mob-card-meta"><span>${t.date} ${t.time||''}</span><span>Cashier: ${esc(t.cashier)}</span></div>
      <div class="mob-card-foot">
        <div class="mob-card-actions"><button class="iconbtn" onclick='printReceipt(JSON.parse(decodeURIComponent("${encodeURIComponent(JSON.stringify(t))}")))' title="Reprint">${svg('pdf')}</button></div>
        <span class="mob-card-amount">${money(t.totals.total)}</span>
      </div>
    </div>`).join('')}</div>`:emptyBox('No transactions yet','Complete a sale to see it here.')}`;
  renderIcons(c);
}

/* ============================================================
   TEAM ACCESS (Pro)
   ============================================================ */
async function viewTeam(){
  const invited=State.db.invitedUsers||[];
  document.getElementById('content').innerHTML=`
   <div class="between" style="margin-bottom:16px">
     <div>
       <p class="muted" style="font-size:13px;margin-top:3px">Invite team members to access this business portal with their own login. Pro plan only.</p>
     </div>
     <button class="btn accent" onclick="openInviteModal()">${svg('plus')} Invite member</button>
   </div>
   ${invited.length?`<div class="tbl"><table><thead><tr><th>Name</th><th>Email</th><th>Role</th><th></th></tr></thead><tbody>
     ${invited.map(u=>`<tr>
       <td style="font-weight:600">${esc(u.name)}</td>
       <td class="muted">${esc(u.email)}</td>
       <td><span class="pill ${u.role==='admin'?'sent':'draft'}">${u.role||'manager'}</span></td>
       <td><div class="rowacts"><button class="iconbtn" onclick="removeInvite('${esc(u.email)}')">${svg('trash')}</button></div></td>
     </tr>`).join('')}
   </tbody></table></div>`:emptyBox('No team members yet','Invite a colleague to give them access to your business portal.')}
   <div class="card pad" style="margin-top:16px;background:var(--accent-soft);border-color:var(--accent)">
     <b>How team access works</b>
     <ol style="margin-top:8px;padding-left:18px;font-size:13px;line-height:1.9;color:var(--ink-soft)">
       <li>Add the team member's email above.</li>
       <li>They go to <strong>wadde.online/quotemaster/</strong> and register with that exact email.</li>
       <li>Their account automatically links to your business data on first login.</li>
       <li>You can manage their access from this page at any time.</li>
     </ol>
   </div>`;
  renderIcons(document.getElementById('content'));
}
function openInviteModal(){
  openModal('Invite team member',`
    <div class="fgrid">
      <div class="field"><label>Name *</label><input id="inv_name" placeholder="e.g. Ahmed Ali"></div>
      <div class="field"><label>Email *</label><input id="inv_email" type="email" placeholder="ahmed@example.com"></div>
      <div class="field"><label>Role</label><select id="inv_role"><option value="manager">Manager</option><option value="admin">Admin (full access)</option></select></div>
    </div>`,
    [{label:'Cancel',cls:'ghost',fn:closeModal},{label:'Send invite',cls:'accent',fn:async()=>{
      const name=val('inv_name'),email=val('inv_email').toLowerCase();
      if(!name||!email)return toast('Name and email required');
      if(!State.db.invitedUsers)State.db.invitedUsers=[];
      if(State.db.invitedUsers.find(u=>u.email===email))return toast('Already invited');
      State.db.invitedUsers.push({email,name,role:val('inv_role')});
      const r=await call('inviteUser',{email,name,role:val('inv_role')});
      persist();closeModal();viewTeam();toast(`Invite saved for ${email}`);
    }}]);
}
async function removeInvite(email){
  confirmDel(`Remove access for ${email}?`,async()=>{
    State.db.invitedUsers=(State.db.invitedUsers||[]).filter(u=>u.email!==email);
    await call('removeInvite',{email});
    persist();viewTeam();toast('Access removed');
  });
}

function copyPosLink(){
  var link=document.getElementById('s_poslink').value;
  if(navigator.clipboard){
    navigator.clipboard.writeText(link).then(function(){toast('POS link copied! Share it with staff.');}).catch(function(){fallbackCopyPosLink(link);});
  } else { fallbackCopyPosLink(link); }
}
function fallbackCopyPosLink(link){
  var el=document.getElementById('s_poslink');
  el.style.cssText='position:fixed;top:50%;left:50%;opacity:1;width:80%;font-size:14px;padding:8px';
  el.select();document.execCommand('copy');
  el.style.cssText='position:absolute;opacity:0;pointer-events:none;width:1px;height:1px';
  toast('POS link copied!');
}
function sharePosLink(){
  var link=document.getElementById('s_poslink').value;
  navigator.share({title:'POS Access Link',text:'Use this link to open the POS register:',url:link}).catch(function(){});
}
function addUOM(){const v=val('s_newuom').trim();if(!v)return;if(!State.db.settings.uoms)State.db.settings.uoms=[];if(State.db.settings.uoms.includes(v))return toast('Already in list');State.db.settings.uoms.push(v);persist();viewSettings();toast('Unit added');}
function removeUOM(u){State.db.settings.uoms=(State.db.settings.uoms||[]).filter(x=>x!==u);persist();const tags=document.getElementById('uomTagList');if(tags)tags.innerHTML=State.db.settings.uoms.map(x=>`<span class="uom-tag">${esc(x)}<button onclick="removeUOM('${esc(x)}')">×</button></span>`).join('');}
function resetPosToken(){confirmDel('Reset the POS link? All staff will need to bookmark the new URL.',()=>{State.db.settings.posToken=uid();persist();viewSettings();toast('POS access link has been reset.');});}

/* ============================================================
   SUPERADMIN PORTAL
   ============================================================ */
var _adminTab='users';
function num(n){return Number(n||0).toLocaleString(undefined,{minimumFractionDigits:2,maximumFractionDigits:2});}
var _adminUsers=[];
async function viewAdmin(){
  const c=document.getElementById('content');
  c.innerHTML='<div class="card pad muted">Loading portal data…</div>';
  try{
    const snap = await _fdb.collection('plan_info').get();
    _adminUsers = snap.docs.map(d=>{
      const data=d.data();
      return{userId:d.id, email:data.email||'', businessName:data.businessName||'',
        plan:computePlan(data), expiry:data.trialExpiry||null, invoices:0, collected:0, quotes:0};
    });
    renderAdminView();
  }catch(e){
    console.error('viewAdmin error',e);
    const isPerm=e.code==='permission-denied'||e.message.includes('permission');
    c.innerHTML='<div class="card pad" style="background:var(--amber-soft);border-color:var(--amber)">'+(isPerm
      ?'<b>Firestore permission denied.</b><br>Go to <a href="https://console.firebase.google.com" target="_blank">Firebase Console</a> → Firestore Database → Rules and publish the security rules. Make sure <code>vaddever@gmail.com</code> is set as admin email in the rules.'
      :'<b>Error loading admin data:</b><br>'+esc(e.message))+'<br><small style="color:var(--ink-soft)">Check browser console (F12) for full error details.</small></div>';
  }
}
function renderAdminView(){
  const c=document.getElementById('content');
  c.innerHTML=`<div class="admin-tabs">
    <button class="admin-tab ${_adminTab==='users'?'active':''}" onclick="_adminTab='users';renderAdminView()">Users</button>
    <button class="admin-tab ${_adminTab==='settings'?'active':''}" onclick="_adminTab='settings';renderAdminSettings()">Platform Settings</button>
  </div>
  <div id="adminPanel"></div>`;
  if(_adminTab==='users') renderAdmin('');
  else renderAdminSettings();
}
function renderAdmin(q){
  const all=_adminUsers;
  const us=all.filter(u=>((u.businessName||'')+(u.email||'')).toLowerCase().includes(q.toLowerCase()));
  const proCount=all.filter(u=>u.plan==='pro').length;
  const totalInv=all.reduce((s,u)=>s+u.invoices,0);
  const collected=all.reduce((s,u)=>s+u.collected,0);
  const p=document.getElementById('adminPanel');if(!p)return;
  p.innerHTML=`
   <div class="grid kpis" style="margin-bottom:16px">
     <div class="card kpi"><div class="lbl">Businesses</div><div class="val">${all.length}</div><div class="sub muted">tenants</div></div>
     <div class="card kpi"><div class="lbl">Pro accounts</div><div class="val">${proCount}</div><div class="sub up">${all.length?Math.round(proCount/all.length*100):0}% Pro</div></div>
     <div class="card kpi"><div class="lbl">Invoices</div><div class="val">${totalInv}</div><div class="sub muted">portal-wide</div></div>
     <div class="card kpi"><div class="lbl">Collected</div><div class="val" style="font-size:20px">${num(collected)}</div><div class="sub muted">mixed currencies</div></div>
   </div>
   <div class="toolbar"><div class="search">${svg('search')}<input placeholder="Search businesses…" value="${esc(q)}" oninput="renderAdmin(this.value)"></div></div>
   ${us.length?`<div class="tbl"><table><thead><tr><th>Business</th><th>Email</th><th>Plan</th><th>Expiry date</th><th class="right">Products</th><th class="right">Invoices</th><th class="right">Outstanding</th><th></th></tr></thead><tbody>
     ${us.map(u=>`<tr>
       <td style="font-weight:600">${esc(u.businessName||'—')}<div class="muted" style="font-size:11px">${u.created?fmtDate(u.created):''}</div></td>
       <td class="muted">${esc(u.email)}</td>
       <td><select class="pill ${u.plan==='pro'?'paid':'draft'}" style="border:none;font-weight:600;cursor:pointer" onchange="adminSetPlan('${u.userId}',this.value)">
         <option value="free" ${u.plan!=='pro'?'selected':''}>free</option><option value="pro" ${u.plan==='pro'?'selected':''}>pro</option></select></td>
       <td><input type="date" value="${u.expiry||''}" style="border:1px solid var(--line);border-radius:8px;padding:4px 8px;font-size:12px;background:var(--paper)" onchange="adminSetExpiry('${u.userId}',this.value)"></td>
       <td class="right mono">${u.items}</td><td class="right mono">${u.invoices}</td>
       <td class="right mono">${num(u.outstanding)}</td>
       <td><div class="rowacts"><button class="iconbtn" onclick="adminDelete('${u.userId}')">${svg('trash')}</button></div></td>
     </tr>`).join('')}
   </tbody></table></div>`:emptyBox('No businesses found','No tenants match.')}
  `;
  renderIcons(p);
}
async function adminSetPlan(userId,plan){
  const r={ok:true};await _fdb.collection('plan_info').doc(userId).set({plan},{merge:true}).catch(e=>{r.ok=false;r.error=e.message;});
  if(!r.ok)return toast(r.error||'Failed');
  const u=_adminUsers.find(x=>x.userId===userId);if(u)u.plan=plan;
  toast('Plan set to '+plan);
}
async function adminSetExpiry(userId,date){
  const r={ok:true};await _fdb.collection('plan_info').doc(userId).set({trialExpiry:new Date(date)},{merge:true}).catch(e=>{r.ok=false;r.error=e.message;});
  if(!r.ok)return toast(r.error||'Failed');
  const u=_adminUsers.find(x=>x.userId===userId);if(u)u.expiry=date;
  toast('Expiry updated');
}
function adminDelete(userId){
  const u=_adminUsers.find(x=>x.userId===userId);
  confirmDel('Delete "'+esc(u?u.businessName||u.email:'this business')+'" and all data? This cannot be undone.',async()=>{
    const r={ok:true};await Promise.all([_fdb.collection('businesses').doc(userId).delete(),_fdb.collection('plan_info').doc(userId).delete()]).catch(e=>{r.ok=false;r.error=e.message;});
    if(!r.ok)return toast(r.error||'Failed');
    _adminUsers=_adminUsers.filter(x=>x.userId!==userId);
    renderAdmin('');toast('Business deleted');
  });
}

/* ---- Platform Settings ---- */
var _adminCfg={};
async function renderAdminSettings(){
  const p=document.getElementById('adminPanel');
  if(!p){console.warn('adminPanel not found');return;}
  p.innerHTML='<div style="padding:20px;color:var(--ink-soft)">⏳ Loading settings…</div>';
  let statusHtml='';
  try{
    const _as=await _fdb.collection('platform_config').doc('settings').get().catch(()=>null);
    const r=_as&&_as.exists?{ok:true,settings:_as.data()}:{ok:false,error:'No config saved yet (showing defaults)'};
    if(r&&r.ok){ _adminCfg=r.settings||{}; }
    else{
      statusHtml=`<div class="card pad" style="background:var(--amber-soft);border-color:var(--amber);margin-bottom:14px;font-size:13.5px">
        ⚠ <b>No saved settings yet</b> — ${esc(r?.error||'showing defaults')}.<br>
        <span style="font-size:12px">Form showing defaults. Click Save to write them to Firestore.</span>
      </div>`;
    }
  }catch(e){
    statusHtml=`<div class="card pad" style="background:var(--danger-soft);border-color:var(--danger);margin-bottom:14px;font-size:13.5px">
      ⚠ <b>Could not reach Firestore.</b> Check your internet connection and Firestore security rules.
    </div>`;
  }
  const c=_adminCfg;
  p.innerHTML=statusHtml+`
   <div class="grid set-grid">
    <div class="card pad">
      <div class="cfg-section"><h4>Pro plan pricing</h4>
        <div class="fgrid">
          <div class="field"><label>Monthly price</label><input id="cfg_price" type="number" value="${c.proPrice||299}"></div>
          <div class="field"><label>Currency symbol</label><input id="cfg_sym" value="${esc(c.currency||'Rf')}"></div>
          <div class="field"><label>Annual price (0=off)</label><input id="cfg_aprx" type="number" value="${c.proAnnualPrice||0}"></div>
          <div class="field"><label>Annual label</label><input id="cfg_albl" value="${esc(c.annualLabel||'Save 20%')}"></div>
        </div>
      </div>
      <div class="cfg-section"><h4>Free trial</h4>
        <div class="toggle-row"><div><div style="font-weight:500">Enable free trial</div><div class="desc">New accounts get trial days before upgrading</div></div>
          <select id="cfg_trial" style="border:1px solid var(--line);border-radius:8px;padding:6px 10px"><option value="1" ${c.trialEnabled!==false?'selected':''}>On</option><option value="0" ${c.trialEnabled===false?'selected':''}>Off</option></select></div>
        <div class="fgrid" style="margin-top:8px">
          <div class="field"><label>Trial days (default 30)</label><input id="cfg_tdays" type="number" value="${c.trialDays||30}"></div>
          <div class="field"><label>Require card</label><select id="cfg_tcard"><option value="0" ${!c.trialRequiresCard?'selected':''}>No</option><option value="1" ${c.trialRequiresCard?'selected':''}>Yes</option></select></div>
        </div>
      </div>
    </div>
    <div class="card pad">
      <div class="cfg-section"><h4>Expiry reminders</h4>
        <div class="toggle-row"><div><div style="font-weight:500">Email reminders</div><div class="desc">Send reminders before Pro plan expires</div></div>
          <select id="cfg_rem" style="border:1px solid var(--line);border-radius:8px;padding:6px 10px"><option value="1" ${c.reminderEnabled?'selected':''}>On</option><option value="0" ${!c.reminderEnabled?'selected':''}>Off</option></select></div>
        <div class="field" style="margin-top:8px"><label>Remind at (days before expiry, comma-separated)</label><input id="cfg_remdays" value="${esc((c.reminderDays||[7,3,1]).join(','))}"></div>
      </div>
      <div class="cfg-section"><h4>Pro Feature Configuration</h4>
        <p class="muted" style="font-size:12.5px;margin-bottom:10px">Choose which features require a Pro plan. Toggle any feature to "Free" to make it available to everyone, including free-tier users.</p>
        <div id="featToggleList" style="display:flex;flex-direction:column;gap:8px"></div>
      </div>
    </div>
    <div class="card pad" style="grid-column:1/-1">
      <div class="cfg-section"><h4>Employee limit (free tier)</h4>
        <div class="fgrid">
          <div class="field"><label>Max employees (free tier)</label><input id="cfg_maxemp" type="number" value="${c.maxFreeEmployees||5}"></div>
          <div class="field"><label>Max products (0=unlimited)</label><input id="cfg_maxprod" type="number" value="${c.maxFreeProducts||0}"></div>
        </div>
      </div>
    </div>
    <div class="card pad" style="grid-column:1/-1">
      <div class="cfg-section"><h4>Platform announcement</h4>
        <div class="fgrid">
          <div class="field"><label>Banner text (blank = hidden)</label><input id="cfg_ann" value="${esc(c.announcement||'')}" placeholder="e.g. Maintenance on 15 Jun 2026"></div>
          <div class="field"><label>Type</label><select id="cfg_anntype"><option value="info" ${(c.announcementType||'info')==='info'?'selected':''}>Info</option><option value="warning" ${c.announcementType==='warning'?'selected':''}>Warning</option></select></div>
          <div class="field"><label>New registrations</label><select id="cfg_reg"><option value="1" ${!c.registrationClosed?'selected':''}>Open</option><option value="0" ${c.registrationClosed?'selected':''}>Closed</option></select></div>
        </div>
      </div>
      <button class="btn accent" onclick="saveAdminSettings()">Save platform settings</button>
    </div>
   </div>`;
  renderFeatureToggles();
}
const FEATURE_TOGGLE_DEFS=[
  {key:'stock',       label:'Stock management & reorder alerts'},
  {key:'multiEmployee',label:'Unlimited employees (beyond free limit)'},
  {key:'expenses',    label:'Expense tracking'},
  {key:'gst',        label:'GST tracking & returns (MIRA 205)'},
  {key:'orders',      label:'Customer order portal'},
  {key:'zakat',       label:'Zakat calculator'},
  {key:'deliveries',  label:'Delivery notes'},
  {key:'email',       label:'Email sending & inbox'},
  {key:'team',        label:'Team / multi-user portal access'}
];
function renderFeatureToggles(){
  const host=document.getElementById('featToggleList');
  if(!host)return;
  const pf=Object.assign({},DEFAULT_PRO_FEATURES,_adminCfg.proFeatures||{});
  host.innerHTML=FEATURE_TOGGLE_DEFS.map(f=>`
    <div class="toggle-row" style="border:1px solid var(--line);border-radius:10px;padding:8px 12px">
      <div style="font-weight:500;font-size:13.5px">${esc(f.label)}</div>
      <select id="feat_${f.key}" style="border:1px solid var(--line);border-radius:8px;padding:6px 10px;flex-shrink:0">
        <option value="1" ${pf[f.key]?'selected':''}>Pro only</option>
        <option value="0" ${!pf[f.key]?'selected':''}>Free for all</option>
      </select>
    </div>`).join('');
}
async function saveAdminSettings(){
  const proFeatures={};
  FEATURE_TOGGLE_DEFS.forEach(f=>{ proFeatures[f.key]=val('feat_'+f.key)==='1'; });
  const cfg={
    proPrice:+val('cfg_price')||299, currency:val('cfg_sym')||'Rf',
    proAnnualPrice:+val('cfg_aprx')||0, annualLabel:val('cfg_albl'),
    trialEnabled:val('cfg_trial')==='1', trialDays:+val('cfg_tdays')||14, trialRequiresCard:val('cfg_tcard')==='1',
    reminderEnabled:val('cfg_rem')==='1', reminderDays:(val('cfg_remdays')||'7,3,1').split(',').map(n=>+n.trim()).filter(Boolean),
    maxFreeEmployees:+val('cfg_maxemp')||5, maxFreeProducts:+val('cfg_maxprod')||0,
    proFeatures,
    announcement:val('cfg_ann'), announcementType:val('cfg_anntype'),
    registrationClosed:val('cfg_reg')==='0'
  };
  const r={ok:true};await _fdb.collection('platform_config').doc('settings').set(cfg).catch(e=>{r.ok=false;r.error=e.message;});
  if(!r.ok)return toast(r.error||'Failed to save');
  _adminCfg=cfg; _platformCfg=cfg; toast('Platform settings saved — features updated for all users');
  refreshChrome();
}

/* ============================================================
   UPGRADE / PAYMENT (demo unlock; production -> Stripe checkout)
   ============================================================ */
function openUpgrade(){
  const cfg=_platformCfg;
  const sym=cfg.currency||State.db.settings.currencySymbol||'Rf';
  const price=cfg.proPrice||299;
  const annualPrice=cfg.proAnnualPrice||0;
  const annualLabel=cfg.annualLabel||'Save 20%';
  // Build pro feature list dynamically from what's actually Pro-only
  const pf=proFeatures();
  const featureNames={stock:'Stock management & reorder alerts',multiEmployee:'Unlimited employees',
    expenses:'Expense tracking & P&L',zakat:'Zakat al-māl calculator',
    deliveries:'Delivery notes',email:'Email sending & inbox',team:'Team / multi-user access'};
  const proList=Object.entries(pf).filter(([k,v])=>v).map(([k])=>featureNames[k]||k).filter(Boolean);
  if(!proList.length)proList.push('Delivery management','Email sending & receiving','Team access');
  openModal('Upgrade to QuoteMaster Pro',`
   <div class="plans">
     <div class="plan"><h4>Free</h4><div class="price">${sym} 0</div><div class="muted">forever</div>
       <ul>${['Product catalogue','Unlimited quotations','Unlimited invoices','Branded PDF layouts','Business profile & logo'].map(f=>`<li>${svg('check')}${f}</li>`).join('')}</ul>
       <button class="btn ghost block" disabled>${isPro()?'Downgrade':'Current plan'}</button></div>
     <div class="plan feat"><h4>Pro <span class="badge pro">RECOMMENDED</span></h4>
       <div class="price">${sym} ${price.toLocaleString()}<span style="font-size:15px;font-weight:500" class="muted">/mo</span></div>
       ${annualPrice?`<div class="muted" style="font-size:12.5px;margin-top:-6px">${sym} ${annualPrice.toLocaleString()}/yr · ${esc(annualLabel)}</div>`:''}
       <div class="muted">Everything in Free, plus:</div>
       <ul>${proList.map(f=>`<li>${svg('check')}${f}</li>`).join('')}</ul>
       <button class="btn amber block" onclick="startCheckout()">${isPro()?'Pro active ✓':'Upgrade now — '+sym+' '+price+'/mo'}</button></div>
   </div>
   <p class="muted" style="font-size:12px;margin-top:14px;text-align:center">Contact <a class="linkish" href="mailto:billing@wadde.online">billing@wadde.online</a> to upgrade or manage your subscription.</p>`,
   [{label:'Close',cls:'ghost',fn:closeModal}],'lg');
}
async function startCheckout(){
  if(isPro()){closeModal();return;}
  toast('Contact billing@wadde.online to activate Pro');
}

/* ============================================================
   UI utils
   ============================================================ */
function val(id){const el=document.getElementById(id);return el?el.value.trim():'';}
// persist() defined in DATA LAYER
function openModal(title,body,actions=[],size=''){
  const m=document.getElementById('modal');m.className='modal '+size;
  m.innerHTML=`<div class="modal-head"><h3>${title}</h3><button class="iconbtn" onclick="closeModal()">✕</button></div>
   <div class="modal-body">${body}</div>
   <div class="modal-foot">${actions.map((a,i)=>`<button class="btn ${a.cls||''}" data-act="${i}">${a.label}</button>`).join('')}</div>`;
  m.querySelectorAll('[data-act]').forEach((b,i)=>b.onclick=actions[i].fn);
  document.getElementById('scrim').classList.add('open');renderIcons(m);
}
function closeModal(){document.getElementById('scrim').classList.remove('open');}
document.getElementById('scrim').addEventListener('click',e=>{if(e.target.id==='scrim')closeModal();});
function confirmDel(msg,fn){openModal('Confirm',`<p>${msg}</p>`,[{label:'Cancel',cls:'ghost',fn:closeModal},{label:'Delete',cls:'',fn:()=>{closeModal();fn();}}],'sm');
  document.querySelector('#modal [data-act="1"]').style.background='var(--danger)';document.querySelector('#modal [data-act="1"]').style.color='#fff';}
var toastT;function toast(msg){const t=document.getElementById('toast');t.textContent=msg;t.classList.add('show');clearTimeout(toastT);toastT=setTimeout(()=>t.classList.remove('show'),2600);}

setAuthMode('register');
renderIcons();

/* Firebase onAuthStateChanged handles auto-login.
   If no session exists the auth screen stays visible (set by second observer above). */

/* ============================================================
   CUSTOMER ORDERS MODULE
   Business-side management of orders from order.html portal
   ============================================================ */
var _ordersFilter = 'all';

function viewCustomerOrders() {
  var c = document.getElementById('content');
  c.innerHTML = '<div class="card pad muted" style="text-align:center">Loading customer orders…</div>';
  _fdb.collection('businesses').doc(State.user.uid)
    .collection('customerOrders')
    .orderBy('date', 'desc').limit(100).get()
    .then(function(snap) {
      var orders = snap.docs.map(function(d){ return d.data(); });
      renderCustomerOrders(orders);
    })
    .catch(function(e) {
      c.innerHTML = '<div class="card pad" style="background:var(--amber-soft);border-color:var(--amber)">'+
        '<b>Could not load orders.</b> Make sure Firestore rules allow subcollection reads.<br>'+
        esc(e.message)+'</div>';
    });
}

function renderCustomerOrders(orders) {
  var c = document.getElementById('content');
  var statuses = ['all','pending','confirmed','processing','shipped','delivered','cancelled'];
  var statusColors = {pending:'var(--amber)',confirmed:'#1d4ed8',processing:'#7c3aed',
    shipped:'var(--accent)',delivered:'var(--accent-ink)',cancelled:'var(--danger)'};
  var filtered = _ordersFilter === 'all' ? orders : orders.filter(function(o){return o.status===_ordersFilter;});
  var counts = {};
  orders.forEach(function(o){counts[o.status]=(counts[o.status]||0)+1;});

  var tabsHtml = '<div class="tabs" style="margin-bottom:14px">'+
    statuses.map(function(s){
      var label = s.charAt(0).toUpperCase()+s.slice(1);
      var cnt = s!=='all'&&counts[s]?' ('+counts[s]+')':'';
      return '<button class="'+(_ordersFilter===s?'active':'')+'" onclick="_ordersFilter=\''+s+'\';renderCustomerOrders(window._lastOrders)">'+label+cnt+'</button>';
    }).join('')+'</div>';

  var _allOrders = orders; _allOrders = orders; window._lastOrders = orders; _allOrders = orders;
  var s = State.db.settings;
  var baseUrl = location.href.split('?')[0].split('/').slice(0,-1).join('/')+'/';

  var portalCard = '<div class="card pad" style="margin-bottom:14px;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:10px;border-left:3px solid var(--accent)">'+
    '<div><b>Customer Order Portal</b><div class="muted" style="font-size:12.5px">Share this link — customers can browse and place orders</div></div>'+
    '<div class="row" style="gap:8px">'+
    '<code style="font-size:12px;padding:6px 10px;border:1px solid var(--line);border-radius:8px;background:var(--paper)">'+(baseUrl+'order.html?b='+esc(s.orderToken||''))+'</code>'+
    '<button class="btn ghost sm" onclick="navigator.clipboard?.writeText(\''+baseUrl+'order.html?b='+(s.orderToken||'')+'\').then(()=>toast(\'Order portal link copied!\'))">Copy</button>'+
    '<button class="btn accent sm" onclick="window.open(\''+baseUrl+'order.html?b='+(s.orderToken||'')+'\',\'_blank\')">Open ↗</button>'+
    '</div></div>';

  if (!filtered.length) {
    c.innerHTML = tabsHtml + portalCard + emptyBox('No orders yet','Share your order portal link with customers.');
    return;
  }

  var rows = filtered.map(function(o) {
    var col = statusColors[o.status]||'var(--ink-soft)';
    var hasSlip = o.payment&&o.payment.slipDataUrl;
    return '<tr>'+
      '<td style="font-weight:600"><span class="mono">#'+esc(o.number||o.id.slice(-6).toUpperCase())+'</span></td>'+
      '<td>'+fmtDate(o.date)+'</td>'+
      '<td><b>'+esc(o.customer&&o.customer.name||'—')+'</b>'+
        '<div class="muted" style="font-size:12px">'+esc(o.customer&&o.customer.phone||'')+'</div></td>'+
      '<td>'+money(o.totals&&o.totals.total||0)+'</td>'+
      '<td><span class="pill" style="background:'+col+'20;color:'+col+';font-weight:700">'+esc(o.status)+'</span></td>'+
      '<td><div style="font-size:12.5px">'+esc((o.payment&&o.payment.method)||'—')+
        (hasSlip?'&nbsp;<a class="linkish" onclick="viewOrderSlip(\''+o.id+'\')">slip ↗</a>':'')+'</div></td>'+
      '<td><div class="rowacts">'+
        '<button class="btn ghost tiny" onclick="openOrderDetail(\''+o.id+'\')">View</button>'+
        '<select style="font-size:12px;border:1px solid var(--line);border-radius:7px;padding:4px 8px" onchange="updateOrderStatus(\''+o.id+'\',this.value)">'+
          ['pending','confirmed','processing','shipped','delivered','cancelled'].map(function(s){
            return '<option value="'+s+'"'+(o.status===s?' selected':'')+'>'+s.charAt(0).toUpperCase()+s.slice(1)+'</option>';
          }).join('')+
        '</select>'+
      '</div></td>'+
    '</tr>';
  }).join('');

  c.innerHTML = tabsHtml + portalCard +
    '<div class="tbl"><table><thead><tr>'+
    '<th>Order #</th><th>Date</th><th>Customer</th><th>Total</th><th>Status</th><th>Payment</th><th></th>'+
    '</tr></thead><tbody>'+rows+'</tbody></table></div>';
}

function openOrderDetail(orderId) {
  _fdb.collection('businesses').doc(State.user.uid)
    .collection('customerOrders').doc(orderId).get()
    .then(function(doc) {
      if (!doc.exists) { toast('Order not found'); return; }
      var o = doc.data();
      var s = State.db.settings;
      var itemRows = (o.lineItems||[]).map(function(li){
        return '<tr><td>'+esc(li.name)+'</td><td style="text-align:center">'+li.qty+'</td>'+
          '<td style="text-align:right;font-family:monospace">'+money(li.unitPrice)+'</td>'+
          '<td style="text-align:right;font-family:monospace;font-weight:600">'+money(li.amount)+'</td></tr>';
      }).join('');
      var timelineHtml = (o.timeline||[]).map(function(t){
        return '<div style="display:flex;gap:10px;margin-bottom:8px;font-size:13px">'+
          '<span style="background:var(--accent-soft);color:var(--accent-ink);padding:2px 10px;border-radius:20px;font-weight:600;white-space:nowrap">'+esc(t.status)+'</span>'+
          '<span class="muted">'+fmtDate(t.date)+' '+esc(t.time||'')+'</span>'+
          (t.note?'<span>'+esc(t.note)+'</span>':'')+'</div>';
      }).join('');
      var slipHtml = o.payment&&o.payment.slipDataUrl
        ? '<div class="field"><label>Transfer slip</label><img src="'+o.payment.slipDataUrl+'" style="max-width:100%;border-radius:10px;border:1px solid var(--line)"></div>'
        : '';
      openModal('Order #'+(o.number||o.id.slice(-6).toUpperCase()),
        '<div class="fgrid">' +
          '<div class="field"><label>Customer</label><div style="padding:9px 12px;border:1px solid var(--line);border-radius:10px">'+
            esc(o.customer&&o.customer.name)+' · '+esc(o.customer&&o.customer.phone||'')+'<br>'+
            esc(o.customer&&o.customer.email||'')+'<br>'+esc(o.customer&&o.customer.address||'')+'</div></div>'+
          '<div class="field"><label>Status</label>'+
            '<select id="od_status" style="width:100%;padding:9px 12px;border:1px solid var(--line);border-radius:10px">'+
              ['pending','confirmed','processing','shipped','delivered','cancelled'].map(function(st){
                return '<option value="'+st+'"'+(o.status===st?' selected':'')+'>'+st.charAt(0).toUpperCase()+st.slice(1)+'</option>';
              }).join('')+
            '</select></div>'+
          '<div class="field"><label>Update note</label><input id="od_note" placeholder="Optional message for customer"></div>'+
        '</div>'+
        '<div class="tbl" style="margin-top:12px"><table>'+
          '<thead><tr><th>Item</th><th>Qty</th><th class="right">Unit</th><th class="right">Amount</th></tr></thead>'+
          '<tbody>'+itemRows+'</tbody>'+
          '<tfoot><tr><td colspan="3" style="text-align:right;font-weight:700;padding:8px 0">Total</td>'+
            '<td style="text-align:right;font-weight:700;padding:8px 0;font-family:monospace">'+money(o.totals&&o.totals.total)+' </td></tr></tfoot>'+
        '</table></div>'+
        slipHtml+
        (timelineHtml?'<div style="margin-top:14px"><b style="font-size:12px;text-transform:uppercase;letter-spacing:.05em;color:var(--ink-soft)">History</b>'+timelineHtml+'</div>':''),
        [{label:'Close',cls:'ghost',fn:closeModal},
         {label:'Save status',cls:'accent',fn:function(){
           updateOrderStatus(orderId, document.getElementById('od_status').value, document.getElementById('od_note').value);
           closeModal();
         }}],'lg');
    });
}

function updateOrderStatus(orderId, status, note) {
  var entry = { status:status, date:todayISO(), time:new Date().toLocaleTimeString([],{hour:'2-digit',minute:'2-digit'}), note:note||'' };
  _fdb.collection('businesses').doc(State.user.uid)
    .collection('customerOrders').doc(orderId)
    .update({ status:status, timeline: firebase.firestore.FieldValue.arrayUnion(entry) })
    .then(function(){ toast('Order status updated to '+status); viewCustomerOrders(); })
    .catch(function(e){ toast('Error: '+e.message); });
}

function viewOrderSlip(orderId) {
  _fdb.collection('businesses').doc(State.user.uid)
    .collection('customerOrders').doc(orderId).get()
    .then(function(doc) {
      if (!doc.exists) return;
      var slip = doc.data().payment && doc.data().payment.slipDataUrl;
      if (!slip) { toast('No slip attached'); return; }
      var w = window.open(''); w.document.write('<img src="'+slip+'" style="max-width:100%;"> '); w.document.close();
    });
}
