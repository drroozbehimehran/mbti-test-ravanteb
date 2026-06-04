const questions = [/* همان 87 سؤال قبلی */];

let index = 0;
const score = {E:0,I:0,S:0,N:0,T:0,F:0,J:0,P:0};
const answers = [];
let startedAudio = false;
let audioCtx, gainNode, panner;

const loader = document.getElementById('loader');
const startBtn = document.getElementById('startBtn');
const demoBtn = document.getElementById('demoBtn');
const restartBtn = document.getElementById('restartBtn');
const prevBtn = document.getElementById('prevBtn');
const skipBtn = document.getElementById('skipBtn');
const rulesBtn = document.getElementById('rulesBtn');
const backIntroBtn = document.getElementById('backIntroBtn');
const acceptRulesBtn = document.getElementById('acceptRulesBtn');
const pdfBtn = document.getElementById('pdfBtn');

const introScreen = document.getElementById('introScreen');
const rulesScreen = document.getElementById('rulesScreen');
const quizApp = document.getElementById('quizApp');
const quizPanel = document.getElementById('quizPanel');
const resultPanel = document.getElementById('resultPanel');
const optionsEl = document.getElementById('options');
const stars = document.getElementById('stars');
const particlesHost = document.createElement('div');
particlesHost.className = 'particles';
resultPanel.appendChild(particlesHost);

let parX = 0, parY = 0, targetX = 0, targetY = 0;

function hideLoader(){ loader.classList.add('hide'); }
setTimeout(hideLoader, 1800);

function initAudio(){
  if(startedAudio) return;
  startedAudio = true;
  const AC = window.AudioContext || window.webkitAudioContext;
  if(!AC) return;
  audioCtx = new AC();
  gainNode = audioCtx.createGain();
  gainNode.gain.value = 0.012;
  panner = audioCtx.createStereoPanner();
  panner.pan.value = -0.1;

  const osc1 = audioCtx.createOscillator();
  const osc2 = audioCtx.createOscillator();
  const filter = audioCtx.createBiquadFilter();
  filter.type = 'lowpass';
  filter.frequency.value = 420;

  osc1.type = 'sine';
  osc2.type = 'triangle';
  osc1.frequency.value = 58;
  osc2.frequency.value = 116;

  const lfo = audioCtx.createOscillator();
  const lfoGain = audioCtx.createGain();
  lfo.type = 'sine';
  lfo.frequency.value = 0.06;
  lfoGain.gain.value = 0.18;

  lfo.connect(lfoGain);
  lfoGain.connect(panner.pan);

  osc1.connect(filter);
  osc2.connect(filter);
  filter.connect(panner);
  panner.connect(gainNode);
  gainNode.connect(audioCtx.destination);

  osc1.start(); osc2.start(); lfo.start();
  setTimeout(() => gainNode.gain.exponentialRampToValueAtTime(0.006, audioCtx.currentTime + 1.2), 250);
}

function openRules(){
  introScreen.style.display = 'none';
  rulesScreen.style.display = 'block';
  rulesScreen.scrollIntoView({behavior:'smooth'});
}

function startQuiz(){
  initAudio();
  rulesScreen.style.display = 'none';
  introScreen.style.display = 'none';
  quizApp.style.display = 'block';
  render();
  quizApp.scrollIntoView({behavior:'smooth', block:'start'});
}

function render(){
  if(index >= questions.length){ finish(); return; }
  const [text,a,b,d] = questions[index];
  document.getElementById('qCount').textContent = index + 1;
  document.getElementById('qNo').textContent = `سؤال ${index + 1}`;
  document.getElementById('qPercent').textContent = `${Math.round((index / questions.length) * 100)}%`;
  document.getElementById('dimensionLabel').textContent = d === 'EI' ? 'E / I' : d === 'SN' ? 'S / N' : d === 'TF' ? 'T / F' : 'J / P';
  document.getElementById('qText').textContent = text;
  document.getElementById('bar').style.width = `${(index / questions.length) * 100}%`;
  optionsEl.innerHTML = `
    <button class="opt" data-k="A">الف) ${a}</button>
    <button class="opt" data-k="B">ب) ${b}</button>
  `;
  const opts = [...optionsEl.querySelectorAll('.opt')];
  opts.forEach((btn, i) => {
    setTimeout(() => btn.classList.add('show'), 120 * i);
    btn.addEventListener('click', () => choose(btn.dataset.k));
    btn.addEventListener('touchstart', () => btn.classList.add('active'), {passive:true});
    btn.addEventListener('touchend', () => setTimeout(()=>btn.classList.remove('active'), 120), {passive:true});
  });
}

function choose(v){
  const q = questions[index];
  const dim = q[3];
  const key = v === 'A'
    ? (dim === 'EI' ? 'E' : dim === 'SN' ? 'S' : dim === 'TF' ? 'T' : 'J')
    : (dim === 'EI' ? 'I' : dim === 'SN' ? 'N' : dim === 'TF' ? 'F' : 'P');
  if(answers[index]) score[answers[index]]--;
  answers[index] = key;
  score[key]++;
  index++;
  animatePanel();
  render();
}

function animatePanel(){
  quizPanel.style.animation = 'none';
  void quizPanel.offsetWidth;
  quizPanel.style.animation = 'fadeUp .38s ease';
}

function prevQ(){
  if(index <= 0) return;
  index--;
  if(answers[index]){
    score[answers[index]]--;
    answers[index] = null;
  }
  animatePanel();
  render();
}

function skipQ(){ index++; render(); }

function typeWriter(el, text, i, speed){
  el.textContent = '';
  (function tick(){
    el.textContent = text.slice(0, i++);
    if(i <= text.length) setTimeout(tick, speed);
  })();
}

function spawnParticles(){
  particlesHost.innerHTML = '';
  const count = window.innerWidth < 720 ? 14 : 24;
  for(let i = 0; i < count; i++){
    const p = document.createElement('span');
    p.className = 'particle';
    p.style.left = `${Math.random() * 100}%`;
    p.style.bottom = `${Math.random() * 30}%`;
    p.style.animationDelay = `${Math.random() * 4}s`;
    p.style.animationDuration = `${3.6 + Math.random() * 2.8}s`;
    p.style.opacity = `${0.35 + Math.random() * 0.65}`;
    particlesHost.appendChild(p);
  }
}

function finish(){
  quizPanel.classList.add('hidden');
  resultPanel.style.display = 'block';
  document.getElementById('bar').style.width = '100%';
  document.getElementById('resultDate').textContent = new Date().toLocaleDateString('fa-IR');

  const type =
    (score.E >= score.I ? 'E' : 'I') +
    (score.S >= score.N ? 'S' : 'N') +
    (score.T >= score.F ? 'T' : 'F') +
    (score.J >= score.P ? 'J' : 'P');

  document.getElementById('eiScore').textContent = `${score.E} - ${score.I}`;
  document.getElementById('snScore').textContent = `${score.S} - ${score.N}`;
  document.getElementById('tfScore').textContent = `${score.T} - ${score.F}`;
  document.getElementById('jpScore').textContent = `${score.J} - ${score.P}`;

  spawnParticles();
  typeWriter(document.getElementById('typeText'), type, 0, 110);
  typeWriter(document.getElementById('typeDesc'),
    'نتیجه شما بر اساس پاسخ‌های ثبت‌شده در چهار بُعد MBTI محاسبه شد. این نسخه برای تجربه‌ای زیبا، تک‌لینکی، لمسی و سینمایی طراحی شده است.',
    0, 18
  );
}

function restart(){ location.reload(); }

function updateParallax(x, y){
  targetX = (x / window.innerWidth - 0.5) * 24;
  targetY = (y / window.innerHeight - 0.5) * 24;
}

function raf(){
  parX += (targetX - parX) * 0.06;
  parY += (targetY - parY) * 0.06;
  stars.style.transform = `translate3d(${parX}px, ${parY}px, 0) scale(1.02)`;
  requestAnimationFrame(raf);
}
raf();

window.addEventListener('mousemove', e => updateParallax(e.clientX, e.clientY), {passive:true});
window.addEventListener('touchmove', e => {
  if(!e.touches || !e.touches[0]) return;
  updateParallax(e.touches[0].clientX, e.touches[0].clientY);
}, {passive:true});

startBtn.addEventListener('click', openRules);
demoBtn.addEventListener('click', openRules);
rulesBtn.addEventListener('click', openRules);
backIntroBtn.addEventListener('click', () => {
  rulesScreen.style.display = 'none';
  introScreen.style.display = 'block';
});
acceptRulesBtn.addEventListener('click', startQuiz);
restartBtn.addEventListener('click', restart);
prevBtn.addEventListener('click', prevQ);
skipBtn.addEventListener('click', skipQ);
pdfBtn.addEventListener('click', exportPDF);

function exportPDF(){
  const fullName = document.getElementById('fullName').value.trim() || 'نام‌و‌نام‌خانوادگی ثبت نشده';
  const age = document.getElementById('age').value.trim() || 'نامشخص';
  const node = document.createElement('div');
  node.style.direction = 'rtl';
  node.style.fontFamily = 'Vazirmatn, Tahoma, sans-serif';
  node.style.padding = '24px';
  node.style.color = '#111';
  node.style.background = '#fff';
  node.innerHTML = `
    <div style="display:flex;justify-content:space-between;align-items:center;border-bottom:2px solid #8a5cff;padding-bottom:12px;margin-bottom:18px">
      <div>
        <h2 style="margin:0">گزارش نتیجه آزمون MBTI</h2>
        <div style="color:#555;margin-top:6px">روان‌طب | کلینیک روان‌درمانی روزبه</div>
      </div>
      <div style="width:90px;height:90px;border:1px solid #ccc;display:grid;place-items:center;border-radius:14px">LOGO</div>
    </div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:18px">
      <div><b>نام آزمودنی:</b> ${fullName}</div>
      <div><b>سن:</b> ${age}</div>
      <div><b>تاریخ:</b> ${new Date().toLocaleDateString('fa-IR')}</div>
      <div><b>تیپ نهایی:</b> ${document.getElementById('typeText').textContent}</div>
    </div>
    <div style="margin:16px 0 10px"><b>امتیازها</b></div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px">
      <div>E / I: ${document.getElementById('eiScore').textContent}</div>
      <div>S / N: ${document.getElementById('snScore').textContent}</div>
      <div>T / F: ${document.getElementById('tfScore').textContent}</div>
      <div>J / P: ${document.getElementById('jpScore').textContent}</div>
    </div>
    <p style="margin-top:18px;line-height:2;color:#333">
      این گزارش به‌منظور نمایش نتیجه آزمون تهیه شده و جایگزین ارزیابی بالینی یا تشخیص تخصصی نیست.
    </p>
  `;

  html2pdf().set({
    margin: 10,
    filename: `MBTI-${fullName}.pdf`,
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: 'mm', format: 'a4', orientation: 'p' }
  }).from(node).save();
}