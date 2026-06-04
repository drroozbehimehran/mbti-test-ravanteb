document.addEventListener('DOMContentLoaded', () => {
  const questions = [
    ["وقتی خسته می‌شوید، معمولاً ترجیح می‌دهید:", "با آدم‌ها باشید تا انرژی بگیرید.", "تنها باشید تا دوباره شارژ شوید.", "EI"],
    ["در جمع‌های جدید، معمولاً:", "زود وارد گفت‌وگو می‌شوید.", "اول کمی نگاه می‌کنید و بعد وارد می‌شوید.", "EI"],
    ["از این‌که دوروبرتان شلوغ باشد:", "معمولاً انرژی می‌گیرید.", "زود خسته می‌شوید.", "EI"],
    ["وقتی فکری در ذهنتان دارید:", "معمولاً آن را با دیگران در میان می‌گذارید.", "بیشتر ترجیح می‌دهید اول در ذهنتان روشنش کنید.", "EI"],
    ["در یک روز شلوغ:", "بودن کنار آدم‌ها به شما حال بهتری می‌دهد.", "زمان خلوت برایتان ارزشمندتر است.", "EI"],
    ["وقتی می‌خواهید تصمیم بگیرید:", "صحبت با دیگران به شما کمک می‌کند.", "ترجیح می‌دهید خودتان اول به نتیجه برسید.", "EI"],
    ["در مهمانی‌ها یا دورهمی‌ها:", "معمولاً زود گرم می‌گیرید.", "معمولاً با کمی فاصله و احتیاط وارد می‌شوید.", "EI"],
    ["وقتی کار مهمی پیش رو دارید:", "دوست دارید با دیگران هماهنگش کنید.", "دوست دارید اول با تمرکز شخصی جلو بروید.", "EI"],
    ["بعد از یک روز پرتعامل:", "هنوز هم حس خوبی دارید.", "بیشتر نیاز دارید تنها شوید.", "EI"],
    ["وقتی نیاز به فکر کردن دارید:", "بلندبلند فکر کردن برایتان طبیعی‌تر است.", "فکر کردن در سکوت برایتان راحت‌تر است.", "EI"],
    ["وقتی با یک موضوع تازه روبه‌رو می‌شوید:", "بیشتر دنبال واقعیت‌های روشن و ملموس می‌روید.", "بیشتر دنبال معنی، الگو و احتمال‌های پشت ماجرا می‌گردید.", "SN"],
    ["هنگام یادگیری چیزی جدید:", "مثال‌های واقعی به شما کمک بیشتری می‌کند.", "تصویر کلی و مفهوم اصلی برایتان مهم‌تر است.", "SN"],
    ["وقتی کاری را انجام می‌دهید:", "جزئیات و قدم‌های دقیق برایتان مهم‌اند.", "بیشتر به ایده کلی و نتیجه نهایی توجه می‌کنید.", "SN"],
    ["اگر قرار باشد مسئله‌ای را بفهمید:", "ترجیح می‌دهید داده‌های واضح داشته باشید.", "ترجیح می‌دهید ارتباط‌ها و برداشت‌های پنهان را پیدا کنید.", "SN"],
    ["معمولاً بیشتر جذب:", "چیزهای عملی و قابل‌سنجش می‌شوید.", "چیزهای تازه، ایده‌محور و الهام‌بخش می‌شوید.", "SN"],
    ["وقتی کسی چیزی را توضیح می‌دهد:", "اگر مستقیم و دقیق باشد، بهتر می‌فهمید.", "اگر همراه با دید کلی و مفهوم باشد، بهتر می‌فهمید.", "SN"],
    ["در کارهای روزمره:", "به واقعیت موجود تکیه می‌کنید.", "به چیزی که می‌تواند بشود فکر می‌کنید.", "SN"],
    ["وقتی می‌خواهید چیزی بخرید:", "مشخصات واقعی و ملموس برایتان مهم‌تر است.", "حس کلی، تصویر ذهنی و آینده‌اش برایتان مهم‌تر است.", "SN"],
    ["معمولاً از این نوع حرف‌ها بیشتر خوشتان می‌آید:", "این دقیقاً چطور کار می‌کند؟", "این چه معنایی دارد؟", "SN"],
    ["در مواجهه با یک مسئله:", "اول می‌خواهید آن را از نزدیک و دقیق ببینید.", "اول می‌خواهید الگوی کلی‌اش را بفهمید.", "SN"],
    ["وقتی بین دو انتخاب گیر می‌کنید:", "منطق و نتیجه را جلوتر می‌گذارید.", "احساسات و تأثیر روی آدم‌ها را مهم‌تر می‌دانید.", "TF"],
    ["اگر لازم باشد به کسی بازخورد بدهید:", "ترجیح می‌دهید مستقیم و صریح باشید.", "ترجیح می‌دهید نرم و مراقب احساس طرف مقابل باشید.", "TF"],
    ["در دعوا یا اختلاف:", "بیشتر دنبال درست و غلط ماجرا هستید.", "بیشتر دنبال این هستید که رابطه آسیب نبیند.", "TF"],
    ["وقتی تصمیم سختی دارید:", "معیار اصلی‌تان سازگاری منطقی است.", "معیار اصلی‌تان هماهنگی با ارزش‌ها و احساسات است.", "TF"],
    ["درباره نقد شدن:", "نقد منطقی برایتان کاملاً قابل‌قبول است.", "لحن و شیوه بیان نقد برایتان خیلی مهم است.", "TF"],
    ["وقتی درباره یک نفر قضاوت می‌کنید:", "بیشتر به رفتار و منطقش نگاه می‌کنید.", "بیشتر به نیت و حس پشت رفتار توجه می‌کنید.", "TF"],
    ["در موقعیت‌های جدی:", "تصمیم عقلانی به شما آرامش بیشتری می‌دهد.", "تصمیمی که با دل شما جور باشد آرامش بیشتری می‌دهد.", "TF"],
    ["وقتی یکی از نزدیکانتان ناراحت است:", "اول راه‌حل می‌دهید.", "اول همدلی می‌کنید.", "TF"],
    ["برایتان مهم‌تر است که:", "تصمیم درست بگیرید.", "تصمیم انسانی بگیرید.", "TF"],
    ["وقتی کسی از شما کمک می‌خواهد:", "سریع می‌روید سراغ حل مسئله.", "اول حال و احساس طرف را درک می‌کنید.", "TF"],
    ["برای انجام کارها:", "برنامه مشخص داشتن برایتان آرامش می‌آورد.", "آزادی عمل داشتن برایتان مهم‌تر است.", "JP"],
    ["معمولاً دوست دارید:", "کارها را زودتر تمام کنید.", "کارها را باز بگذارید تا گزینه‌های بیشتری داشته باشید.", "JP"],
    ["وقتی کاری شروع می‌شود:", "دوست دارید زود تکلیفش را روشن کنید.", "دوست دارید فعلاً درِ چند احتمال باز بماند.", "JP"],
    ["در زندگی روزمره:", "نظم و چارچوب حالتان را بهتر می‌کند.", "انعطاف و تغییر حالتان را بهتر می‌کند.", "JP"],
    ["وقتی برنامه‌تان به هم می‌ریزد:", "کلافه می‌شوید.", "سریع خودتان را با شرایط جدید وفق می‌دهید.", "JP"],
    ["قبل از شروع یک کار:", "دوست دارید از قبل آماده باشید.", "دوست دارید در مسیر، کم‌کم تصمیم بگیرید.", "JP"],
    ["بیشتر اهل این هستید که:", "اول کارها را جمع‌وجور کنید، بعد استراحت کنید.", "اول شروع کنید و بعد در طول راه تنظیمش کنید.", "JP"],
    ["ضرب‌الاجل برای شما:", "کمک می‌کند کار را جدی‌تر جلو ببرید.", "گاهی باعث فشار اضافی می‌شود.", "JP"],
    ["وقتی چند کار هم‌زمان دارید:", "دوست دارید یکی‌یکی و منظم پیش بروید.", "دوست دارید با توجه به شرایط، بینشان جابه‌جا شوید.", "JP"],
    ["در سفر یا برنامه‌های روزمره:", "داشتن برنامه از قبل به شما حس خوبی می‌دهد.", "داشتن آزادی برای تغییر برنامه را ترجیح می‌دهید.", "JP"],
    ["شما معمولاً:", "روی واقعیت‌های قابل‌مشاهده تکیه می‌کنید.", "به نشانه‌ها و حدس‌های ذهنی هم خیلی توجه می‌کنید.", "SN"],
    ["شما معمولاً:", "به تجربه‌های قبلی اعتماد بیشتری دارید.", "به ایده‌های تازه و راه‌های متفاوت علاقه بیشتری دارید.", "SN"],
    ["وقتی با یک مسئله روبه‌رو می‌شوید:", "قدم‌به‌قدم جلو می‌روید.", "اول تصویر کلی را می‌گیرید، بعد وارد جزئیات می‌شوید.", "SN"],
    ["شما بیشتر دوست دارید:", "چیزی را که هست بهتر کنید.", "چیزی را که می‌تواند باشد بسازید.", "SN"],
    ["در جمع، شما معمولاً:", "راحت‌تر حرف را شروع می‌کنید.", "بیشتر منتظر می‌مانید فضا دستتان بیاید.", "EI"],
    ["وقتی با یک کار تازه روبه‌رو می‌شوید:", "دنبال دستورالعمل روشن می‌گردید.", "دنبال راه‌های مختلف و خلاقانه می‌گردید.", "SN"],
    ["در روابط، شما بیشتر:", "شفاف و مستقیم هستید.", "ملاحظه‌کار و نرم برخورد می‌کنید.", "TF"],
    ["وقتی چیزی را یاد می‌گیرید:", "مثال واقعی به شما کمک می‌کند.", "ایده و مفهوم کلی به شما کمک بیشتری می‌کند.", "SN"],
    ["وقتی قرار است کاری را انجام دهید:", "ترجیح می‌دهید بدانید دقیقاً چه باید بکنید.", "ترجیح می‌دهید آزادی داشته باشید که خودتان مسیر را پیدا کنید.", "JP"],
    ["وقتی کسی از شما تعریف می‌کند:", "تعریف دقیق و مشخص را بیشتر دوست دارید.", "تعریف صمیمی و احساسی را بیشتر دوست دارید.", "TF"],
    ["در کار گروهی:", "نقش مشخص و وظایف روشن را دوست دارید.", "فضای باز و منعطف را ترجیح می‌دهید.", "JP"],
    ["وقتی یک روز آزاد دارید:", "دوست دارید برنامه‌اش را از قبل بچینید.", "دوست دارید ببینید حال و هوای همان روز چه می‌گوید.", "JP"],
    ["در خرید کردن:", "معیار شما کیفیت و کارکرد واقعی است.", "معیار شما حس، جذابیت و معنا هم هست.", "SN"],
    ["وقتی چیزی خراب می‌شود:", "سریع می‌روید سراغ علت فنی‌اش.", "اول می‌خواهید ببینید چه برداشتی از ماجرا دارید.", "TF"],
    ["وقتی به آینده فکر می‌کنید:", "روی واقعیت‌های محتمل تمرکز می‌کنید.", "روی امکان‌های هیجان‌انگیز تمرکز می‌کنید.", "SN"],
    ["در بحث‌ها:", "نتیجه منطقی برایتان مهم‌تر است.", "حفظ هماهنگی و احترام برایتان مهم‌تر است.", "TF"],
    ["شما معمولاً:", "به جزئیات دقیق توجه می‌کنید.", "به الگوهای کلی و ارتباط‌ها توجه می‌کنید.", "SN"],
    ["وقتی زمان کم دارید:", "دوست دارید سریع تصمیم بگیرید.", "دوست دارید کمی بیشتر فکر کنید.", "JP"],
    ["در انجام کارها:", "اول تمام می‌کنید، بعد سراغ بعدی می‌روید.", "ممکن است چند کار را هم‌زمان و باز نگه دارید.", "JP"],
    ["وقتی با آدم‌های جدید آشنا می‌شوید:", "معمولاً زود گرم می‌گیرید.", "معمولاً اول مشاهده می‌کنید.", "EI"],
    ["وقتی به یک مشکل برمی‌خورید:", "دنبال راه‌حل عملی می‌روید.", "دنبال برداشت تازه و زاویه دید جدید می‌گردید.", "SN"],
    ["برایتان جذاب‌تر است:", "چیزی که روشن و قابل‌اتکاست.", "چیزی که پر از امکان و ایده است.", "SN"],
    ["وقتی باید چیزی را توضیح دهید:", "ساده، روشن و دقیق توضیح می‌دهید.", "با مثال، تصویر و مفهوم توضیح می‌دهید.", "SN"],
    ["در مورد قوانین و چارچوب‌ها:", "معمولاً به آن‌ها پایبند می‌مانید.", "اگر لازم باشد، انعطاف نشان می‌دهید.", "JP"],
    ["وقتی درباره مردم فکر می‌کنید:", "رفتار و نتیجه عملشان برایتان مهم‌تر است.", "احساسات و انگیزه‌هایشان برایتان مهم‌تر است.", "TF"],
    ["در کارهای روزانه:", "دوست دارید همه چیز سر جای خودش باشد.", "دوست دارید فضا برای تغییر باقی بماند.", "JP"],
    ["وقتی کسی از شما راهنمایی می‌خواهد:", "سریع یک راه‌حل مشخص می‌دهید.", "اول کمک می‌کنید خودش گزینه‌ها را ببیند.", "TF"],
    ["در محیط کاری:", "ساختار روشن را ترجیح می‌دهید.", "آزادی عمل بیشتری را ترجیح می‌دهید.", "JP"],
    ["وقتی قرار است کاری را شروع کنید:", "اگر آماده‌اید، همان لحظه شروع می‌کنید.", "اگر هنوز همه چیز معلوم نیست، کمی صبر می‌کنید.", "JP"],
    ["در تصمیم‌گیری‌های مهم:", "سراغ داده و منطق می‌روید.", "سراغ ارزش‌ها و اثر انسانی تصمیم می‌روید.", "TF"],
    ["شما بیشتر:", "واقع‌بین و زمین‌گیر هستید.", "خیال‌پرداز و آینده‌نگر هستید.", "SN"],
    ["در جمع‌های کاری:", "دوست دارید جلسه جمع‌وجور و هدفمند باشد.", "دوست دارید بحث باز و ایده‌محور باشد.", "JP"],
    ["وقتی چیزی را به‌خاطر می‌سپارید:", "جزئیات واقعی را بهتر نگه می‌دارید.", "مفهوم و برداشت کلی را بهتر نگه می‌دارید.", "SN"],
    ["در زندگی شخصی:", "ثبات و قابل‌پیش‌بینی بودن را دوست دارید.", "تنوع و تغییر را دوست دارید.", "JP"],
    ["وقتی کسی با شما مخالفت می‌کند:", "اول منطقش را بررسی می‌کنید.", "اول حس و نیتش را در نظر می‌گیرید.", "TF"],
    ["در انجام پروژه‌ها:", "ترجیح می‌دهید از قبل همه‌چیز مشخص باشد.", "ترجیح می‌دهید مسیر را در طول کار پیدا کنید.", "JP"],
    ["شما معمولاً:", "اهل جمع‌بندی و نتیجه‌گیری هستید.", "اهل باز نگه داشتن گزینه‌ها هستید.", "JP"],
    ["وقتی با موضوعی تازه آشنا می‌شوید:", "اول می‌پرسید «دقیقاً چیست؟»", "اول می‌پرسید «چه معنایی دارد؟»", "SN"],
    ["در محیط‌های پرتنش:", "سعی می‌کنید منطقی و خونسرد بمانید.", "سعی می‌کنید حال آدم‌ها را هم در نظر بگیرید.", "TF"],
    ["وقتی کار زیادی دارید:", "با نظم جلو می‌روید.", "با انعطاف و وفق‌پذیری جلو می‌روید.", "JP"],
    ["درباره آینده خودتان:", "دوست دارید مسیرتان مشخص باشد.", "دوست دارید چند مسیر باز بماند.", "JP"],
    ["در رابطه با دیگران:", "صداقت مستقیم را ترجیح می‌دهید.", "مهربانی و ظرافت در بیان را ترجیح می‌دهید.", "TF"],
    ["وقتی کاری را ارزیابی می‌کنید:", "معیار شما کارایی و نتیجه است.", "معیار شما حس کلی و تأثیر انسانی هم هست.", "TF"],
    ["در مواجهه با یک ایده جدید:", "می‌پرسید «آیا عملی است؟»", "می‌پرسید «چه امکان‌هایی دارد؟»", "SN"],
    ["برای انجام کارها:", "برنامه‌ریزی دقیق برایتان ضروری است.", "آزادی تغییر در مسیر برایتان ضروری است.", "JP"],
    ["در موقعیت‌های اجتماعی:", "حضور در جمع برایتان طبیعی و انرژی‌بخش است.", "حضور طولانی در جمع انرژی‌تان را کم می‌کند.", "EI"],
    ["وقتی قرار است کاری را تمام کنید:", "دوست دارید همان‌جا جمعش کنید.", "دوست دارید هنوز امکان بازبینی و تغییر داشته باشد.", "JP"]
  ];

  let index = 0;
  const score = { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 };
  const answers = [];
  let startedAudio = false;
  let audioCtx, gainNode, panner;
  let parX = 0, parY = 0, targetX = 0, targetY = 0;

  const loader = document.getElementById('loader');
  const introScreen = document.getElementById('introScreen');
  const rulesScreen = document.getElementById('rulesScreen');
  const quizApp = document.getElementById('quizApp');
  const quizPanel = document.getElementById('quizPanel');
  const resultPanel = document.getElementById('resultPanel');
  const optionsEl = document.getElementById('options');
  const stars = document.getElementById('stars');

  const rulesBtn = document.getElementById('rulesBtn');
  const backIntroBtn = document.getElementById('backIntroBtn');
  const acceptRulesBtn = document.getElementById('acceptRulesBtn');
  const prevBtn = document.getElementById('prevBtn');
  const skipBtn = document.getElementById('skipBtn');
  const restartBtn = document.getElementById('restartBtn');
  const pdfBtn = document.getElementById('pdfBtn');
  const skipLoaderBtn = document.getElementById('skipLoaderBtn');
  const loaderError = document.getElementById('loaderError');

  function hideLoader() {
    loader.classList.add('hide');
  }

  setTimeout(hideLoader, 1200);
  setTimeout(() => {
    if (skipLoaderBtn) skipLoaderBtn.classList.remove('hidden');
    if (loaderError) loaderError.classList.remove('hidden');
  }, 2500);

  if (skipLoaderBtn) skipLoaderBtn.addEventListener('click', hideLoader);

  function openRules() {
    introScreen.style.display = 'none';
    rulesScreen.style.display = 'block';
    rulesScreen.scrollIntoView({ behavior: 'smooth' });
  }

  function initAudio() {
    if (startedAudio) return;
    startedAudio = true;
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return;
    audioCtx = new AC();
    gainNode = audioCtx.createGain();
    gainNode.gain.value = 0.01;
    panner = audioCtx.createStereoPanner();
    panner.pan.value = -0.08;
    const osc1 = audioCtx.createOscillator();
    const osc2 = audioCtx.createOscillator();
    const filter = audioCtx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = 380;
    osc1.type = 'sine';
    osc2.type = 'triangle';
    osc1.frequency.value = 55;
    osc2.frequency.value = 110;
    osc1.connect(filter);
    osc2.connect(filter);
    filter.connect(panner);
    panner.connect(gainNode);
    gainNode.connect(audioCtx.destination);
    osc1.start();
    osc2.start();
  }

  function startQuiz() {
    initAudio();
    rulesScreen.style.display = 'none';
    introScreen.style.display = 'none';
    quizApp.style.display = 'block';
    render();
    quizApp.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  function render() {
    if (index >= questions.length) return finish();
    const [text, a, b, dim] = questions[index];
    document.getElementById('qCount').textContent = index + 1;
    document.getElementById('qNo').textContent = `سؤال ${index + 1}`;
    document.getElementById('qPercent').textContent = `${Math.round((index / questions.length) * 100)}%`;
    document.getElementById('dimensionLabel').textContent = dim === 'EI' ? 'E / I' : dim === 'SN' ? 'S / N' : dim === 'TF' ? 'T / F' : 'J / P';
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
      btn.addEventListener('touchstart', () => btn.classList.add('active'), { passive: true });
      btn.addEventListener('touchend', () => setTimeout(() => btn.classList.remove('active'), 120), { passive: true });
    });
  }

  function choose(v) {
    const q = questions[index];
    const dim = q[3];
    const key = v === 'A'
      ? (dim === 'EI' ? 'E' : dim === 'SN' ? 'S' : dim === 'TF' ? 'T' : 'J')
      : (dim === 'EI' ? 'I' : dim === 'SN' ? 'N' : dim === 'TF' ? 'F' : 'P');
    if (answers[index]) score[answers[index]]--;
    answers[index] = key;
    score[key]++;
    index++;
    animatePanel();
    render();
  }

  function animatePanel() {
    quizPanel.style.animation = 'none';
    void quizPanel.offsetWidth;
    quizPanel.style.animation = 'fadeUp .38s ease';
  }

  function prevQ() {
    if (index <= 0) return;
    index--;
    if (answers[index]) {
      score[answers[index]]--;
      answers[index] = null;
    }
    animatePanel();
    render();
  }

  function skipQ() {
    index++;
    render();
  }

  function finish() {
    quizPanel.classList.add('hidden');
    resultPanel.style.display = 'block';
    document.getElementById('bar').style.width = '100%';
    document.getElementById('resultDate').textContent = new Date().toLocaleDateString('fa-IR');
    const type = (score.E >= score.I ? 'E' : 'I') + (score.S >= score.N ? 'S' : 'N') + (score.T >= score.F ? 'T' : 'F') + (score.J >= score.P ? 'J' : 'P');
    document.getElementById('eiScore').textContent = `${score.E} - ${score.I}`;
    document.getElementById('snScore').textContent = `${score.S} - ${score.N}`;
    document.getElementById('tfScore').textContent = `${score.T} - ${score.F}`;
    document.getElementById('jpScore').textContent = `${score.J} - ${score.P}`;
    document.getElementById('typeText').textContent = type;
    document.getElementById('typeDesc').textContent = 'نتیجه شما بر اساس پاسخ‌های ثبت‌شده در چهار بُعد MBTI محاسبه شد.';
    spawnParticles();
  }

  function spawnParticles() {
    const old = resultPanel.querySelector('.particles');
    if (old) old.remove();
    const host = document.createElement('div');
    host.className = 'particles';
    resultPanel.appendChild(host);
    const count = window.innerWidth < 720 ? 14 : 24;
    for (let i = 0; i < count; i++) {
      const p = document.createElement('span');
      p.className = 'particle';
      p.style.left = `${Math.random() * 100}%`;
      p.style.bottom = `${Math.random() * 20}%`;
      p.style.animationDelay = `${Math.random() * 4}s`;
      p.style.animationDuration = `${3.8 + Math.random() * 2.4}s`;
      host.appendChild(p);
    }
  }

  function restart() {
    location.reload();
  }

  function exportPDF() {
    if (!window.html2pdf) return alert('کتابخانه PDF هنوز بارگذاری نشده است.');
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

  function updateParallax(x, y) {
    targetX = (x / window.innerWidth - 0.5) * 18;
    targetY = (y / window.innerHeight - 0.5) * 18;
  }

  function raf() {
    parX += (targetX - parX) * 0.06;
    parY += (targetY - parY) * 0.06;
    stars.style.transform = `translate3d(${parX}px, ${parY}px, 0) scale(1.02)`;
    requestAnimationFrame(raf);
  }
  raf();

  window.addEventListener('mousemove', e => updateParallax(e.clientX, e.clientY), { passive: true });
  window.addEventListener('touchmove', e => {
    if (!e.touches || !e.touches[0]) return;
    updateParallax(e.touches[0].clientX, e.touches[0].clientY);
  }, { passive: true });

  rulesBtn.addEventListener('click', openRules);
  backIntroBtn.addEventListener('click', () => {
    rulesScreen.style.display = 'none';
    introScreen.style.display = 'block';
  });
  acceptRulesBtn.addEventListener('click', startQuiz);
  prevBtn.addEventListener('click', prevQ);
  skipBtn.addEventListener('click', skipQ);
  restartBtn.addEventListener('click', restart);
  pdfBtn.addEventListener('click', exportPDF);
});