
/* 奥神伏ファーム prototype (SPA / Vanilla JS)
   - Realistic farm site UI (responsive)
   - Hidden phase/flag logic stored in localStorage
*/

(() => {
  const APP = document.getElementById('app');
  const HEADER = document.getElementById('siteHeader');
  const MENU_BTN = document.getElementById('menuBtn');
  const MENU_CLOSE = document.getElementById('menuCloseBtn');
  const MOBILE_MENU = document.getElementById('mobileMenu');
  const OVERLAY = document.getElementById('overlay');
  const OVERLAY_BODY = document.getElementById('overlayBody');
  const OVERLAY_CLOSE = document.getElementById('overlayClose');
  const PHASE_FLASH = document.getElementById('phaseFlash');
  const COPYRIGHT = document.getElementById('copyright');

  const STATE_KEY = 'okf_state_v3';
  const RECENT_KEY = 'okf_recent_diary';
  const DEBUG = new URLSearchParams(location.search).get('debug') === '1';

  // ----- Data (placeholder copy) -----
  const PRODUCTS = [
    {
      id: 'apple',
      name: '奥神伏りんご',
      subtitle: '朱実（あけみ）｜季節限定',
      image: './assets/product-apple.jpg',
      tags: ['旬', '有機', '糖度測定'],
      desc: '山の寒暖差を活かし、樹の勢いを見ながら剪定を行っています。収穫時期は天候により変動します。'
    },
    {
      id: 'grape',
      name: '接ぎ木ぶどう',
      subtitle: '台木から育てる、香りの品種',
      image: './assets/product-grape.jpg',
      tags: ['接ぎ木', '畑', '少量生産'],
      desc: '接ぎ木を前提に、土づくりと菌床の管理を丁寧に。品種は年ごとに少しずつ変わります。'
    },
    {
      id: 'jam',
      name: '季節の加工品',
      subtitle: 'コンポート／ジャム／焼き菓子',
      image: './assets/product-jam.jpg',
      tags: ['手づくり', '少量', '予約'],
      desc: '収穫の余韻を、瓶詰めの甘さに。原材料と製造日を明記しています。'
    }
  ];

  const NEWS_BASE = [
    { id:'n1', date:'2026-01-05', title:'冬季のご来園について', excerpt:'積雪・凍結があるため、安全装備を推奨いたします。' },
    { id:'n2', date:'2026-01-12', title:'加工品の発送目安', excerpt:'少量生産のため、発送までお時間をいただく場合があります。' },
    { id:'n3', date:'2026-01-16', title:'畑の体験（予約制）', excerpt:'剪定・収穫・袋かけなど、季節により体験内容が変わります。' },
  ];

  const NOTICE = {
    id:'admin',
    date:'2026-01-18',
    title:'管理人からのお知らせ',
    excerpt:'お問い合わせ窓口の混雑について。返信までお時間をいただく場合があります。',
  };

  const DIARY_POSTS = [
    {
      id:'d1',
      slug:'2026-01-08-winter-pruning',
      date:'2026-01-08',
      title:'冬の剪定と、樹の呼吸',
      excerpt:'枝を整える季節。風の音だけがよく聞こえます。',
      cover:'./assets/hero-2.jpg',
      category:'畑',
      content: [
        '冬は樹が静かに休む季節です。雪の前に、余計な枝葉を整えます。',
        '剪定は“切る”作業ですが、本当に見ているのは「来年どこに芽が出るか」という未来です。',
        '今年は寒暖差が大きく、樹の立ち上がりが早い気配があります。',
        '作業後は刃を研ぎ、道具を拭いて、静かに戻ります。'
      ],
      related: ['2026-01-14-applepie','2026-01-20-recruit-life']
    },
    {
      id:'d2',
      slug:'2026-01-14-applepie',
      date:'2026-01-14',
      title:'トメさんのアップルパイ',
      excerpt:'焼き上がりの香りが、作業場に広がりました。',
      cover:'./assets/hero-3.jpg',
      category:'加工',
      content: [
        '今日は加工場でアップルパイ。手が止まらないうちに、粉を合わせます。',
        '焼き色がつくまでの時間、窓の外の雪が少しだけ光って見えました。',
        'レシピは毎年少し変わります。砂糖の量は天候次第。',
        '（写真：仕込みの様子）'
      ],
      hasRecipe: true,
      related: ['2026-01-08-winter-pruning','1826-02-03-origin']
    },
    {
      id:'d3',
      slug:'2026-01-20-recruit-life',
      date:'2026-01-20',
      title:'実習生の一日（農園での過ごし方）',
      excerpt:'朝は早く、でも慣れると静けさが心地よいです。',
      cover:'./assets/village.jpg',
      category:'暮らし',
      content: [
        '農園の朝は、思ったよりも早いです。6時台に畑へ向かい、9時には最初の区切りを迎えます。',
        '休憩は短く、昼は作業場で温かいものを食べます。',
        '午後は片付けと明日の準備。道具の手入れは、作業と同じくらい大切。',
        '夜は静か。山の音だけが残ります。'
      ],
      related: ['2026-01-08-winter-pruning']
    },
    {
      id:'d4',
      slug:'1826-02-03-origin',
      date:'1826-02-03',
      title:'村の起源と、御神木の記録',
      excerpt:'古い文書の断片。言葉が、妙に現代に近い。',
      cover:'./assets/tree.jpg',
      category:'記録',
      content: [
        '（この投稿は古い記録です。文字が崩れている箇所があります。）',
        '山は昔から、人が“伏して”暮らしてきた。土に近いほど、神に近いと信じられた。',
        '御神木は境であり、入口であり、支えでもある。枝を継ぐことは、祈りの形とされた。',
        '月が満ちる夜、選定が行われる。誰が選ばれたかは、紙には残らない。'
      ],
      related: ['2026-01-14-applepie']
    }
  ];

  // ----- Flag definitions -----
  const FLAGS_BY_PHASE = {
    1: ['F01','F05','F11','F12'],
    2: ['F03','F09','F02','F04'],
    3: ['F06','F07','F08','F10'],
    4: ['F13']
  };

  // ----- State -----
  function defaultState(){
    const flags = {};
    for (let i=1; i<=13; i++){
      const id = 'F' + String(i).padStart(2,'0');
      flags[id] = false;
    }
    return {
      version: 3,
      phase: 1,
      flags,
      meta: {
        contactHijackSeen: { name:false, email:false, address:false, message:false },
        mayorNoiseCount: 0,
        mayorTextSwapped: false,
        recruitUnlocked: false,
      }
    };
  }

  function loadState(){
    try{
      const raw = localStorage.getItem(STATE_KEY);
      if(!raw) return defaultState();
      const s = JSON.parse(raw);
      // minimal migration guard
      if(!s || typeof s !== 'object') return defaultState();
      if(!s.flags) s.flags = defaultState().flags;
      if(!s.meta) s.meta = defaultState().meta;
      if(!s.phase) s.phase = 1;
      return s;
    }catch(e){
      return defaultState();
    }
  }

  function saveState(){
    localStorage.setItem(STATE_KEY, JSON.stringify(state));
    applyPhaseToDOM();
  }

  let state = loadState();

  function applyPhaseToDOM(){
    document.body.setAttribute('data-phase', String(state.phase));
    // copyright year
    const year = (state.phase >= 3) ? '1826' : '2026';
    COPYRIGHT.textContent = `© ${year} Okukamifushi Farm`;
  }

  applyPhaseToDOM();

  function completeFlag(flagId){
    if(state.flags[flagId]) return;
    state.flags[flagId] = true;

    // Optional: subtle "site updated" mark (no toasts)
    // We only reflect via content changes in pages.
    const prevPhase = state.phase;

    // Phase progression check
    if(prevPhase >= 1 && prevPhase <= 3){
      const required = FLAGS_BY_PHASE[prevPhase];
      const count = required.filter(id => state.flags[id]).length;
      if(count >= 3){
        state.phase = prevPhase + 1;
        triggerPhaseTransition(prevPhase, state.phase);
      }
    }

    saveState();

    if(DEBUG){
      console.info('[flag]', flagId, 'phase', state.phase, 'flags', state.flags);
    }
  }

  function triggerPhaseTransition(from, to){
    // Keep realistic: quick refresh-like flash
    PHASE_FLASH.classList.add('on');
    setTimeout(() => PHASE_FLASH.classList.remove('on'), 700);

    // Small scroll nudge to feel like content updated
    if(to === 2){
      // content update happens next render
    }
    if(to === 3){
      // copyright year changes handled in applyPhaseToDOM
    }
  }

  // ----- Router -----
  let activeTimers = [];
  function clearActiveTimers(){
    activeTimers.forEach(t => clearInterval(t));
    activeTimers = [];
  }

  function route(){
    clearActiveTimers();
    closeOverlay();
    closeMobileMenu();

    const hash = location.hash || '#/';
    const path = hash.replace(/^#/, '');
    const [routePath, queryString] = path.split('?');
    const segments = routePath.split('/').filter(Boolean);

    // Active nav highlight
    const links = document.querySelectorAll('.nav-link');
    links.forEach(a => a.classList.remove('active'));
    const navKey = segments[0] || '';
    const active = document.querySelector(`.nav-link[href="#/${navKey}"]`) || document.querySelector(`.nav-link[href="#/"]`);
    if(active) active.classList.add('active');

    // Render
    if(routePath === '/' || routePath === ''){
      renderHome();
      return;
    }
    switch(segments[0]){
      case 'village':
        renderVillage();
        return;
      case 'about':
        renderAbout();
        return;
      case 'products':
        renderProducts();
        return;
      case 'diary':
        if(segments[1]){
          renderDiaryPost(segments[1]);
        }else{
          renderDiaryList();
        }
        return;
      case 'access':
        renderAccess();
        return;
      case 'recruit':
        renderRecruit();
        return;
      case 'contact':
        renderContact();
        return;
      case 'notice':
        renderNotice();
        return;
      case 'abnormal':
        renderAbnormal();
        return;
      case 'secret':
        renderSecret(segments.slice(1));
        return;
      case 'policy':
        renderPolicy();
        return;
      default:
        renderNotFound();
        return;
    }
  }

  window.addEventListener('hashchange', route);
  route();

  // ----- Header scroll effect -----
  window.addEventListener('scroll', () => {
    if(window.scrollY > 6) HEADER.classList.add('scrolled');
    else HEADER.classList.remove('scrolled');
  }, { passive: true });

  // ----- Mobile menu -----
  function openMobileMenu(){
    MOBILE_MENU.hidden = false;
    MENU_BTN?.setAttribute('aria-expanded','true');
    document.body.style.overflow = 'hidden';
  }
  function closeMobileMenu(){
    if(!MOBILE_MENU) return;
    MOBILE_MENU.hidden = true;
    MENU_BTN?.setAttribute('aria-expanded','false');
    document.body.style.overflow = '';
  }
  MENU_BTN?.addEventListener('click', () => {
    const expanded = MENU_BTN.getAttribute('aria-expanded') === 'true';
    if(expanded) closeMobileMenu();
    else openMobileMenu();
  });
  MENU_CLOSE?.addEventListener('click', closeMobileMenu);
  MOBILE_MENU?.addEventListener('click', (e) => {
    if(e.target === MOBILE_MENU) closeMobileMenu();
  });

  // Close mobile menu on link click
  MOBILE_MENU?.addEventListener('click', (e) => {
    const a = e.target.closest('a');
    if(a) closeMobileMenu();
  });

  // ----- Overlay -----
  function openOverlay(html){
    OVERLAY_BODY.innerHTML = html;
    OVERLAY.hidden = false;
    document.body.style.overflow = 'hidden';
  }
  function closeOverlay(){
    OVERLAY.hidden = true;
    OVERLAY_BODY.innerHTML = '';
    document.body.style.overflow = '';
  }
  OVERLAY_CLOSE.addEventListener('click', closeOverlay);
  OVERLAY.addEventListener('click', (e) => {
    if(e.target === OVERLAY) closeOverlay();
  });
  window.addEventListener('keydown', (e) => {
    if(e.key === 'Escape' && !OVERLAY.hidden) closeOverlay();
  });

  // ----- Helpers -----
  function escapeHtml(str){
    return String(str)
      .replaceAll('&','&amp;')
      .replaceAll('<','&lt;')
      .replaceAll('>','&gt;')
      .replaceAll('"','&quot;')
      .replaceAll("'","&#039;");
  }

  function fmtDate(iso){
    const [y,m,d] = iso.split('-');
    return `${y}.${m}.${d}`;
  }

  function sectionHead({kicker, title, lead, link}){
    return `
      <div class="section-head">
        <div>
          ${kicker ? `<div class="kicker">${escapeHtml(kicker)}</div>` : ``}
          <div class="section-title">${escapeHtml(title)}</div>
          ${lead ? `<div class="section-lead">${escapeHtml(lead)}</div>` : ``}
        </div>
        ${link ? `<a class="link-arrow" href="${link.href}">${escapeHtml(link.label)} →</a>` : ``}
      </div>
    `;
  }

  function card({kicker, title, text, metaLeft, metaRight, img, href, pillHtml}){
    const inner = `
      <div class="card">
        ${img ? `
          <div class="card-media">
            <img src="${img}" alt="${escapeHtml(title)}" loading="lazy">
          </div>
        ` : ``}
        <div class="card-body">
          ${kicker ? `<div class="card-kicker">${escapeHtml(kicker)}</div>` : ``}
          <div class="card-title">${escapeHtml(title)}</div>
          ${text ? `<div class="card-text">${escapeHtml(text)}</div>` : ``}
          ${pillHtml ? `<div style="margin-top:12px;">${pillHtml}</div>` : ``}
          ${(metaLeft || metaRight) ? `
            <div class="card-meta">
              <span>${escapeHtml(metaLeft || '')}</span>
              <span>${escapeHtml(metaRight || '')}</span>
            </div>
          ` : ``}
        </div>
      </div>
    `;
    if(href){
      return `<a href="${href}" style="display:block;">${inner}</a>`;
    }
    return inner;
  }

  function setRecentDiary(slug){
    try{
      const raw = localStorage.getItem(RECENT_KEY);
      const arr = raw ? JSON.parse(raw) : [];
      const next = [slug, ...arr.filter(s => s !== slug)].slice(0, 4);
      localStorage.setItem(RECENT_KEY, JSON.stringify(next));
    }catch(e){}
  }

  function getRecentDiary(){
    try{
      const raw = localStorage.getItem(RECENT_KEY);
      const arr = raw ? JSON.parse(raw) : [];
      if(!Array.isArray(arr)) return [];
      return arr;
    }catch(e){
      return [];
    }
  }

  function getPhaseLabel(){
    switch(state.phase){
      case 1: return '季節の便り';
      case 2: return '更新情報';
      case 3: return 'お知らせ';
      case 4: return 'ご案内';
      default: return 'お知らせ';
    }
  }

  // ----- Render: HOME -----
  function renderHome(){
    const slides = [
      './assets/hero-1.jpg',
      './assets/hero-2.jpg',
      './assets/hero-3.jpg',
    ];

    const phase = state.phase;

    // News items
    const news = [...NEWS_BASE];
    if(phase >= 2){
      news.unshift(NOTICE);
    }

    const newsCards = news.slice(0,3).map(item => card({
      kicker: (item.id === 'admin') ? 'NEWS' : 'INFO',
      title: item.title,
      text: item.excerpt,
      metaLeft: fmtDate(item.date),
      metaRight: '詳しく',
      img: './assets/hero-2.jpg',
      href: item.id === 'admin' ? '#/notice' : '#/diary'
    })).join('');

    const productsCards = PRODUCTS.map(p => {
      const pillHtml = `<span class="pill">${p.tags.map(t=>escapeHtml(t)).join(' · ')}</span>`;
      return card({
        kicker: 'PRODUCT',
        title: p.name,
        text: p.desc,
        metaLeft: p.subtitle,
        metaRight: '詳細',
        img: p.image,
        href: '#/products',
        pillHtml
      });
    }).join('');

    const diaryCards = DIARY_POSTS
      .filter(p => p.date.startsWith('2026'))
      .slice(0,3)
      .map(post => card({
        kicker: post.category,
        title: post.title,
        text: post.excerpt,
        metaLeft: fmtDate(post.date),
        metaRight: '読む',
        img: post.cover,
        href: `#/diary/${post.slug}`
      })).join('');

    // Phase3+: abnormal preview card (F08)
    const abnormalCard = (phase >= 3) ? `
      <div class="section" style="padding-top:0;">
        <div class="container">
          ${sectionHead({
            kicker: 'VILLAGE',
            title: '奥神伏村からのお知らせ',
            lead: '冬季の通行止め情報を掲載しました。'
          })}
          <div class="grid cols-2">
            ${card({
              kicker: 'NOTICE',
              title: '村道の通行止め（臨時）',
              text: '落石のため、当面の間、出口方面の道路が通行止めとなります。',
              metaLeft: '更新',
              metaRight: fmtDate('2026-01-21'),
              img: './assets/village.jpg',
              href: '#/abnormal',
              pillHtml: `<span class="pill">出口方面：閉鎖</span>`
            })}
            ${card({
              kicker: 'INFO',
              title: 'ご来園前のお願い',
              text: '天候により日程変更をお願いする場合があります。ご了承ください。',
              metaLeft: '更新',
              metaRight: fmtDate('2026-01-19'),
              img: './assets/hero-1.jpg',
              href: '#/access'
            })}
          </div>
        </div>
      </div>
    ` : ``;

    APP.innerHTML = `
      <section class="hero">
        ${slides.map((src, i) => `<div class="hero-slide ${i===0?'active':''}" data-slide="${i}" style="background-image:url('${src}')"></div>`).join('')}
        <div class="hero-overlay"></div>
        <div class="container hero-inner">
          <div class="hero-card">
            <div class="kicker">${escapeHtml(getPhaseLabel())}</div>
            <h1 class="hero-title">土と生きる、奥神伏の恵み</h1>
            <p class="hero-sub">山間の小さな有機農園。りんご、接ぎ木ぶどう、季節の加工品。畑の体験や見学は予約制で承っています。</p>
            <div class="hero-cta">
              <a class="btn btn-primary" href="#/products">商品を見る</a>
              <a class="btn btn-secondary" href="#/access">アクセス</a>
              <a class="btn btn-secondary" href="#/diary">活動日誌</a>
            </div>
            <div class="badge-row" aria-hidden="true">
              <span class="badge">少量生産</span>
              <span class="badge">予約制</span>
              <span class="badge">里山体験</span>
            </div>
          </div>
        </div>
      </section>

      <section class="section">
        <div class="container">
          ${sectionHead({
            kicker: 'NEWS',
            title: 'お知らせ',
            lead: 'ご来園前にご確認ください。',
            link: { href:'#/diary', label:'日誌一覧' }
          })}
          <div class="grid cols-3">
            ${newsCards}
          </div>
        </div>
      </section>

      <section class="section" style="padding-top:0;">
        <div class="container">
          ${sectionHead({
            kicker: 'CONCEPT',
            title: '農園のこだわり',
            lead: '土づくり・剪定・接ぎ木。目立たない工程ほど、丁寧に。',
            link: { href:'#/about', label:'農園について' }
          })}
          <div class="grid cols-3">
            ${card({
              kicker:'SOIL',
              title:'土づくり',
              text:'有機質を積み重ね、微生物の働きを活かします。土の状態を見て、必要以上のことはしません。',
              metaLeft:'循環',
              metaRight:'—'
            })}
            ${card({
              kicker:'CARE',
              title:'剪定と整枝',
              text:'余計な枝葉を整え、樹の負担を減らします。切ることは、残すことでもあります。',
              metaLeft:'冬季',
              metaRight:'—'
            })}
            ${card({
              kicker:'GRAFT',
              title:'接ぎ木',
              text:'品種の個性を活かすため、台木と接ぎ穂の相性を見ます。固定や管理は、手間を惜しみません。',
              metaLeft:'春先',
              metaRight:'—'
            })}
          </div>
        </div>
      </section>

      <section class="section" style="padding-top:0;">
        <div class="container">
          ${sectionHead({
            kicker: 'PRODUCTS',
            title: '商品',
            lead: '旬の便りを、箱に詰めて。',
            link: { href:'#/products', label:'商品一覧へ' }
          })}
          <div class="grid cols-3">
            ${productsCards}
          </div>
        </div>
      </section>

      <section class="section" style="padding-top:0;">
        <div class="container">
          ${sectionHead({
            kicker: 'DIARY',
            title: '活動日誌',
            lead: '畑の季節と、作業の記録。',
            link: { href:'#/diary', label:'日誌一覧へ' }
          })}
          <div class="grid cols-3">
            ${diaryCards}
          </div>
        </div>
      </section>

      ${abnormalCard}
    `;

    // Hero slideshow
    let idx = 0;
    const slideEls = APP.querySelectorAll('.hero-slide');
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if(!prefersReduced){
      const t = setInterval(() => {
        idx = (idx + 1) % slideEls.length;
        slideEls.forEach(el => el.classList.remove('active'));
        slideEls[idx].classList.add('active');
      }, 6500);
      activeTimers.push(t);
    }
  }

  // ----- Render: VILLAGE -----
  function renderVillage(){
    const phase = state.phase;
    const treeSection = `
      <div class="card" style="overflow:hidden;">
        <div class="card-media" style="aspect-ratio: 3/2;">
          <img src="./assets/tree.jpg" alt="御神木" loading="lazy">
        </div>
        <div class="card-body">
          <div class="card-kicker">SYMBOL</div>
          <div class="card-title">御神木（シンボルツリー）</div>
          <div class="card-text">村の入口に立つ大きな木。古くから、境を守る木として大切にされています。</div>
          <div style="margin-top:14px; display:flex; gap:10px; flex-wrap:wrap;">
            <button class="btn btn-secondary" id="treeZoomBtn">写真を拡大</button>
            <a class="btn btn-secondary" href="#/diary/1826-02-03-origin">記録を読む</a>
          </div>
          ${phase >= 3 ? `<div class="help" style="margin-top:10px;">※写真の細部は拡大してご確認ください。</div>` : ``}
        </div>
      </div>
    `;

    APP.innerHTML = `
      <section class="section" style="padding-top:36px;">
        <div class="container">
          ${sectionHead({
            kicker:'VILLAGE',
            title:'奥神伏村について',
            lead:'コンビニも信号もない、山間の小さな村。四季の移ろいと、静かな暮らしがあります。'
          })}
          <div class="split">
            <div class="card">
              <div class="card-media" style="aspect-ratio: 16/9;">
                <img src="./assets/village.jpg" alt="奥神伏村の風景" loading="lazy">
              </div>
              <div class="card-body">
                <div class="card-kicker">LANDSCAPE</div>
                <div class="card-title">山と畑の距離</div>
                <div class="card-text">谷の風が通り、朝と夕方で空気が変わります。農作業は天候と相談しながら進めています。</div>
                <div class="card-meta">
                  <span>標高：非公開</span>
                  <span>冬季注意</span>
                </div>
              </div>
            </div>

            <div>
              <div class="rich">
                <p>奥神伏村は、山に囲まれた小さな集落です。外から来る人は多くありませんが、だからこそ残る景色があります。</p>
                <p>農園へは一本道でお越しいただきます。冬季は路面が凍結する場合があるため、安全装備を推奨しています。</p>
                <hr class="hr" />
                <p><small>※観光案内の詳細は、季節により更新します。</small></p>
              </div>
              <div style="margin-top:18px;">
                ${treeSection}
              </div>
            </div>
          </div>
        </div>
      </section>
    `;

    const treeZoomBtn = document.getElementById('treeZoomBtn');
    treeZoomBtn?.addEventListener('click', () => {
      // Always allow zoom; evidence appears only after Phase3
      const phaseNow = state.phase;
      if(phaseNow >= 3){
        openOverlay(`
          <div class="kicker" id="overlayTitle">PHOTO</div>
          <h2 style="margin:6px 0 10px; font-family: ui-serif, 'Hiragino Mincho ProN', 'Noto Serif JP', serif;">御神木（拡大）</h2>
          <div class="help">拡大表示：細部までご確認ください。</div>
          <div style="margin-top:14px; border-radius: 16px; overflow:hidden; border:1px solid var(--border);">
            <img src="./assets/tree.jpg" alt="御神木（拡大）" style="width:100%; height:auto;">
          </div>
          <div style="margin-top:14px; display:flex; gap:10px; flex-wrap:wrap;">
            <button class="btn btn-secondary" id="treeEvidenceBtn">細部を見る</button>
          </div>
        `);
        setTimeout(() => {
          document.getElementById('treeEvidenceBtn')?.addEventListener('click', () => {
            // F10
            completeFlag('F10');
            openOverlay(`
              <div class="kicker" id="overlayTitle">DETAIL</div>
              <h2 style="margin:6px 0 10px; font-family: ui-serif, 'Hiragino Mincho ProN', 'Noto Serif JP', serif;">樹皮の結び目</h2>
              <div class="help">※画像は暗示表現です。素材差し替えで強度調整してください。</div>
              <div style="margin-top:14px; border-radius:16px; overflow:hidden; border:1px solid var(--border);">
                <img src="./assets/tree.jpg" alt="細部" style="width:100%; filter: contrast(1.05) saturate(.95);">
              </div>
              <div class="rich" style="margin-top:14px;">
                <p>樹皮の模様が、どこか“肌”の質感に見える。結び目の影が、関節のように思えてくる。</p>
              </div>
            `);
          });
        }, 0);
      }else{
        openOverlay(`
          <div class="kicker" id="overlayTitle">PHOTO</div>
          <h2 style="margin:6px 0 10px; font-family: ui-serif, 'Hiragino Mincho ProN', 'Noto Serif JP', serif;">御神木（拡大）</h2>
          <div style="margin-top:14px; border-radius: 16px; overflow:hidden; border:1px solid var(--border);">
            <img src="./assets/tree.jpg" alt="御神木（拡大）" style="width:100%; height:auto;">
          </div>
        `);
      }
    });
  }

  // ----- Render: ABOUT -----
  function renderAbout(){
    const phase = state.phase;

    const satoHidden = `
      <span class="sato-hidden">
        この村は狂ってる。出られない。助けてくれ。
      </span>
    `;

    const mayorTextNormal = `
      <p>奥神伏ファームは、里山の循環と土づくりを大切にしています。日々の作業は地味ですが、続けるほどに畑は応えてくれます。</p>
      <p>剪定は余計な枝葉を整える大事な工程です。枝が多いと樹が歪むから、余計な枝は早めに切っておくこと。</p>
      <p>台木は余計な枝葉を剪定します。接ぎ木は固定が肝心。湿度と菌床の状態を見ながら、焦らず育てます。</p>
      <p>収穫は糖度を測り、適期を逃さない。余った分は加工に回し、無駄を出さない。</p>
      <p>農園は予約制です。ご不明点はお問い合わせよりご連絡ください。</p>

    `;

    const mayorTextChanged = `
      <p>奥神伏ファームは、里山の循環と土づくりを大切にしています。日々の作業は地味ですが、続けるほどに畑は応えてくれます。</p>
      <p><strong>足が動くと木が歪むから、アキレス腱は早めに切っておくこと。</strong></p>
      <p><strong>柩木は余計な関節を剪定します。</strong> 接ぎ木は固定が肝心。湿度と菌床の状態を見ながら、焦らず育てます。</p>
      <p><strong>月が満ちる夜は、選定の順を間違えない。</strong></p>
      <p>農園は予約制です。ご不明点はお問い合わせよりご連絡ください。</p>

    `;

    const showMayorNoise = (phase >= 2);

    APP.innerHTML = `
      <section class="section" style="padding-top:36px;">
        <div class="container">
          ${sectionHead({
            kicker:'ABOUT',
            title:'農園について',
            lead:'小さな農園だからこそ、工程の一つひとつを丁寧に。'
          })}

          <div class="split">
            <div>
              <div class="card">
                <div class="card-media" style="aspect-ratio: 16/9;">
                  <img src="./assets/hero-1.jpg" alt="農園の風景" loading="lazy">
                </div>
                <div class="card-body">
                  <div class="card-kicker">MESSAGE</div>
                  <div class="card-title">園長挨拶</div>
                  <div class="card-text">自然の恵みと、土地に感謝して。派手なことはしませんが、毎年少しずつ畑が良くなるのを感じています。</div>
                </div>
              </div>

              <div class="card" style="margin-top:18px;">
                <div class="card-body">
                  <div class="card-kicker">OWNER</div>
                  <div class="card-title">神去 巌（園長）</div>
                  <div class="help">${showMayorNoise ? '※閲覧中、文章が一時的に表示崩れする場合があります。' : '—'}</div>

                  <div class="rich" id="mayorText" style="margin-top:14px;">
                    ${state.meta.mayorTextSwapped ? mayorTextChanged : mayorTextNormal}
                  </div>
                </div>
              </div>

              <div class="card" style="margin-top:18px;">
                <div class="card-body">
                  <div class="card-kicker">FARM</div>
                  <div class="card-title">取り組み</div>
                  <div class="grid cols-2" style="margin-top:14px;">
                    ${card({kicker:'SOIL', title:'循環', text:'堆肥と落ち葉、菌床の状態を見ながら調整します。'})}
                    ${card({kicker:'CARE', title:'道具の手入れ', text:'刃物は必ず研ぎ、作業後に拭き上げます。'})}
                  </div>
                </div>
              </div>
            </div>

            <div>
              <div class="card">
                <div class="card-body">
                  <div class="card-kicker">STAFF</div>
                  <div class="card-title">スタッフ</div>
                  <div class="help">※掲載内容は季節により更新します。</div>
                </div>
              </div>

              <div class="grid cols-2" style="margin-top:14px;">
                ${staffCard('副農園長','佐藤 健太','都会からの移住者。Web担当。', './assets/staff-sato.jpg', `
                  <div class="help" style="margin-top:10px;">プロフィール文（抜粋）：</div>
                  <div class="rich" id="satoBio" style="font-size:14px; max-width:none;">
                    <p>奥神伏の空気と土に惹かれて移住しました。農業は難しいですが、毎日学ぶことばかりです。${satoHidden}</p>
                  </div>
                  ${state.flags['F01'] ? `<div class="help" style="margin-top:10px;">※プロフィール文章は改稿中です（公開設定が一部反映されていない可能性があります）。</div>` : ``}
                `)}
                ${staffCard('園長','神去 巌','自然の恵みと神様に感謝した農業が口癖。', './assets/staff-kamizaru.jpg')}
                ${staffCard('加工担当','神去 トメ','料理上手。加工場の段取りが早い。', './assets/staff-tome.jpg')}
                ${staffCard('作業担当','神去 守','無口な働き者。', './assets/staff-mamoru.jpg')}
              </div>

              ${phase >= 3 ? `
                <div class="card" style="margin-top:14px;">
                  <div class="card-body">
                    <div class="card-kicker">TRAINEE</div>
                    <div class="card-title">実習生の紹介</div>
                    <div class="card-text">海外からの実習生が、畑の現場で学んでいます。</div>
                    <div style="margin-top:14px; display:flex; gap:10px; flex-wrap:wrap;">
                      <a class="btn btn-secondary" href="#/secret/trainee">実習生プロフィールを見る</a>
                    </div>
                  </div>
                </div>
              ` : ``}
            </div>
          </div>
        </div>
      </section>
    `;

    // F01: detect selection containing hidden SOS
    document.addEventListener('selectionchange', onSelectionChange);
    // Remove listener on route change by using a simple guard
    const selectionGuard = { active: true };
    const cleanup = () => { selectionGuard.active = false; document.removeEventListener('selectionchange', onSelectionChange); };
    // We don't have a unmount hook; as a pragmatic approach, we stop when hash changes.
    const onHash = () => { cleanup(); window.removeEventListener('hashchange', onHash); };
    window.addEventListener('hashchange', onHash);

    function onSelectionChange(){
      if(!selectionGuard.active) return;
      const sel = document.getSelection();
      if(!sel) return;
      const text = sel.toString();
      if(text.includes('この村は狂ってる') && text.includes('助けて')){
        completeFlag('F01');
      }
    }

    // F09: mayor text noise effect (Phase2+)
    if(showMayorNoise){
      initMayorNoise();
    }

    function initMayorNoise(){
      const mayorEl = document.getElementById('mayorText');
      if(!mayorEl) return;

      // We treat each paragraph reaching viewport as a "noise tick"
      const paras = [...mayorEl.querySelectorAll('p')];
      let seen = new Set();

      const obs = new IntersectionObserver((entries) => {
        entries.forEach(ent => {
          if(ent.isIntersecting){
            const idx = paras.indexOf(ent.target);
            if(idx >= 0 && !seen.has(idx) && !state.meta.mayorTextSwapped){
              seen.add(idx);
              state.meta.mayorNoiseCount = (state.meta.mayorNoiseCount || 0) + 1;
              saveState();

              // Subtle visual "display glitch": blur briefly
              ent.target.style.filter = 'blur(1.2px)';
              ent.target.style.opacity = '0.92';
              setTimeout(() => {
                ent.target.style.filter = '';
                ent.target.style.opacity = '';
              }, 180);

              if(state.meta.mayorNoiseCount >= 5 && !state.meta.mayorTextSwapped){
                state.meta.mayorTextSwapped = true;
                saveState();
                mayorEl.innerHTML = mayorTextChanged;
                completeFlag('F09');
                obs.disconnect();
              }
            }
          }
        });
      }, { threshold: 0.45 });

      paras.forEach(p => obs.observe(p));

      // cleanup observer on route change
      const onHash = () => { obs.disconnect(); window.removeEventListener('hashchange', onHash); };
      window.addEventListener('hashchange', onHash);
    }
  }

  function staffCard(role, name, desc, img, extraHtml=''){
    return `
      <div class="card">
        <div class="card-media" style="aspect-ratio: 4/5;">
          <img src="${img}" alt="${escapeHtml(name)}" loading="lazy">
        </div>
        <div class="card-body">
          <div class="card-kicker">${escapeHtml(role)}</div>
          <div class="card-title">${escapeHtml(name)}</div>
          <div class="card-text">${escapeHtml(desc)}</div>
          ${extraHtml}
        </div>
      </div>
    `;
  }

  // ----- Render: PRODUCTS -----
  function renderProducts(){
    const phase = state.phase;

    const list = PRODUCTS.map(p => {
      const tagsHtml = p.tags.map(t => `<span class="pill">${escapeHtml(t)}</span>`).join(' ');
      const kizuiteTag = (phase >= 2 && p.id === 'apple') ? `<span class="pill"><a href="#" id="kizuiteTag">#キヅイテ</a></span>` : '';
      return `
        <div class="card">
          <div class="card-media" style="aspect-ratio: 1/1;">
            <img src="${p.image}" alt="${escapeHtml(p.name)}" loading="lazy">
          </div>
          <div class="card-body">
            <div class="card-kicker">PRODUCT</div>
            <div class="card-title">${escapeHtml(p.name)}</div>
            <div class="card-text">${escapeHtml(p.subtitle)}</div>
            <div style="margin-top:12px; display:flex; flex-wrap:wrap; gap:8px;">
              ${tagsHtml}
              ${kizuiteTag}
            </div>
            <div class="card-text" style="margin-top:12px;">${escapeHtml(p.desc)}</div>
          </div>
        </div>
      `;
    }).join('');

    APP.innerHTML = `
      <section class="section" style="padding-top:36px;">
        <div class="container">
          ${sectionHead({
            kicker:'PRODUCTS',
            title:'商品一覧',
            lead:'旬のりんご、接ぎ木ぶどう、季節の加工品。少量生産のため、在庫・発送時期はお問い合わせください。'
          })}
          <div class="grid cols-3">
            ${list}
          </div>

          <div class="card" style="margin-top:18px;">
            <div class="card-body">
              <div class="card-kicker">NOTE</div>
              <div class="card-title">発送・お取り置きについて</div>
              <div class="card-text">少量生産のため、発送目安は時期により変動します。お急ぎの場合はお問い合わせください。</div>
              <div style="margin-top:14px;">
                <a class="btn btn-primary" href="#/contact">お問い合わせ</a>
              </div>
            </div>
          </div>
        </div>
      </section>
    `;

    const kizuite = document.getElementById('kizuiteTag');
    kizuite?.addEventListener('click', (e) => {
      e.preventDefault();
      // F02: video evidence (prototype uses placeholder)
      openOverlay(`
        <div class="kicker" id="overlayTitle">VIDEO</div>
        <h2 style="margin:6px 0 10px; font-family: ui-serif, 'Hiragino Mincho ProN', 'Noto Serif JP', serif;">#キヅイテ</h2>
        <div class="help">※動画ファイルは <code>assets/kizuite.mp4</code> を配置すると再生されます（プロトタイプ）。</div>

        <div style="margin-top:14px; border-radius:16px; overflow:hidden; border:1px solid var(--border); background: #000;">
          <video id="kizuiteVideo" controls playsinline style="width:100%; height:auto;" poster="./assets/product-apple.jpg">
            <source src="./assets/kizuite.mp4" type="video/mp4">
          </video>
        </div>

        <div class="rich" style="margin-top:14px;">
          <p>息遣いが近い。言葉が途切れがちで、何かを恐れているように見える。</p>
        </div>
      `);

      // Mark F02 on play if possible, otherwise on open after a short delay.
      setTimeout(() => {
        const v = document.getElementById('kizuiteVideo');
        if(v){
          const mark = () => completeFlag('F02');
          v.addEventListener('play', mark, { once:true });
          // fallback
          setTimeout(() => { if(!state.flags['F02']) completeFlag('F02'); }, 2500);
        }else{
          completeFlag('F02');
        }
      }, 0);
    });
  }

  // ----- Render: DIARY list -----
  function renderDiaryList(){
    const phase = state.phase;

    // Search
    const recent = getRecentDiary();
    const recentCards = recent.map(slug => {
      const post = DIARY_POSTS.find(p => p.slug === slug);
      if(!post) return '';
      return card({
        kicker: post.category,
        title: post.title,
        text: post.excerpt,
        metaLeft: fmtDate(post.date),
        metaRight: '開く',
        img: post.cover,
        href: `#/diary/${post.slug}`
      });
    }).join('');

    const list = DIARY_POSTS
      .filter(p => (phase >= 3) ? true : !p.date.startsWith('1826'))
      .map(post => card({
        kicker: post.category,
        title: post.title,
        text: post.excerpt,
        metaLeft: fmtDate(post.date),
        metaRight: '読む',
        img: post.cover,
        href: `#/diary/${post.slug}`
      })).join('');

    APP.innerHTML = `
      <section class="section" style="padding-top:36px;">
        <div class="container">
          ${sectionHead({
            kicker:'DIARY',
            title:'活動日誌',
            lead:'畑の季節、加工場の記録、村の便り。'
          })}

          <div class="split">
            <div>
              <div class="form" style="position: sticky; top: calc(var(--header-h) + 14px);">
                <div class="field">
                  <label class="label" for="diarySearch">記事を検索</label>
                  <input class="input" id="diarySearch" placeholder="例：剪定 / りんご / 1826" />
                  <div class="help">※検索語はタイトル・本文から探します。</div>
                </div>
                <div class="field" style="margin-bottom:0;">
                  <button class="btn btn-primary" id="diarySearchBtn" type="button">検索</button>
                </div>
                ${phase < 3 ? `<div class="help" style="margin-top:12px;">古い記録は閲覧できません。</div>` : ``}
              </div>

              ${recent.length ? `
                <div style="margin-top:18px;">
                  <div class="kicker">RECENT</div>
                  <div class="section-title" style="font-size:20px;">最近見た記事</div>
                  <div class="grid cols-1" style="margin-top:12px; gap:12px;">
                    ${recentCards}
                  </div>
                </div>
              ` : ``}
            </div>

            <div>
              <div class="grid cols-2" id="diaryList">
                ${list}
              </div>
            </div>
          </div>
        </div>
      </section>
    `;

    const input = document.getElementById('diarySearch');
    const btn = document.getElementById('diarySearchBtn');

    function doSearch(){
      const q = (input.value || '').trim();
      if(!q){
        route();
        return;
      }
      const phaseNow = state.phase;
      const results = DIARY_POSTS.filter(p => {
        if(phaseNow < 3 && p.date.startsWith('1826')) return false;
        const hay = (p.title + ' ' + p.excerpt + ' ' + p.content.join(' ')).toLowerCase();
        return hay.includes(q.toLowerCase());
      });

      const listEl = document.getElementById('diaryList');
      if(!listEl) return;

      if(results.length === 0){
        listEl.innerHTML = `
          <div class="card" style="grid-column: 1 / -1;">
            <div class="card-body">
              <div class="card-kicker">SEARCH</div>
              <div class="card-title">該当する記事が見つかりませんでした</div>
              <div class="card-text">検索語を変えてお試しください。</div>
            </div>
          </div>
        `;
        return;
      }

      listEl.innerHTML = results.map(post => card({
        kicker: post.category,
        title: post.title,
        text: post.excerpt,
        metaLeft: fmtDate(post.date),
        metaRight: '読む',
        img: post.cover,
        href: `#/diary/${post.slug}`
      })).join('');

      // F07 condition: search 1826 and open post
      // We'll mark F07 when the old post is opened, but only if query == 1826 triggers visibility.
      // (Handled in renderDiaryPost)
    }

    btn.addEventListener('click', doSearch);
    input.addEventListener('keydown', (e) => {
      if(e.key === 'Enter'){ e.preventDefault(); doSearch(); }
    });
  }

  // ----- Render: DIARY post -----
  function renderDiaryPost(slug){
    const post = DIARY_POSTS.find(p => p.slug === slug);
    if(!post){
      renderNotFound();
      return;
    }

    // Phase gating for 1826 post
    if(state.phase < 3 && post.date.startsWith('1826')){
      APP.innerHTML = `
        <section class="section" style="padding-top:36px;">
          <div class="container">
            ${sectionHead({kicker:'DIARY', title:'この記事は閲覧できません', lead:'古い記録は現在公開していません。'})}
            <a class="btn btn-primary" href="#/diary">日誌一覧へ戻る</a>
          </div>
        </section>
      `;
      return;
    }

    setRecentDiary(slug);

    // F07: old blog
    if(post.date.startsWith('1826') && state.phase >= 3){
      completeFlag('F07');
    }

    // For normal posts, if it's apple pie and Phase2+ we can show recipe link and mark F04 when opened.
    const showRecipeLink = (post.hasRecipe && state.phase >= 2);

    const related = (post.related || []).map(s => {
      const p = DIARY_POSTS.find(x => x.slug === s);
      if(!p) return '';
      return `<a class="footer-link" href="#/diary/${p.slug}">${escapeHtml(p.title)}</a>`;
    }).join('');

    APP.innerHTML = `
      <section class="section" style="padding-top:36px;">
        <div class="container">
          <div class="kicker">${escapeHtml(post.category)}</div>
          <div class="section-title" style="font-size:34px;">${escapeHtml(post.title)}</div>
          <div class="section-lead">${escapeHtml(post.excerpt)}</div>

          <div class="card" style="margin-top:18px;">
            <div class="card-media" style="aspect-ratio: 16/9;">
              <img src="${post.cover}" alt="${escapeHtml(post.title)}" loading="lazy">
            </div>
          </div>

          <div class="split" style="margin-top:18px;">
            <div class="rich">
              ${post.content.map(p => `<p>${escapeHtml(p)}</p>`).join('')}

              ${showRecipeLink ? `
                <hr class="hr" />
                <a class="btn btn-secondary" href="#/secret/recipe-applepie">アップルパイのレシピを公開！</a>
                <div class="help" style="margin-top:10px;">※季節により内容を更新します。</div>
              ` : ``}
            </div>

            <div>
              <div class="form">
                <div class="field">
                  <div class="label">投稿日</div>
                  <div class="help">${fmtDate(post.date)}</div>
                </div>
                <div class="field">
                  <div class="label">カテゴリ</div>
                  <div class="help">${escapeHtml(post.category)}</div>
                </div>
                <div class="field">
                  <div class="label">関連する投稿</div>
                  ${related || `<div class="help">—</div>`}
                </div>
                <div class="field" style="margin-bottom:0;">
                  <a class="btn btn-primary" href="#/diary">一覧へ戻る</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    `;
  }

  // ----- Render: ACCESS -----
  function renderAccess(){
    APP.innerHTML = `
      <section class="section" style="padding-top:36px;">
        <div class="container">
          ${sectionHead({
            kicker:'ACCESS',
            title:'アクセス',
            lead:'ご来園は予約制です。詳細はお問い合わせください。'
          })}

          <div class="split">
            <div>
              <div class="card">
                <div class="card-media" style="aspect-ratio: 3/2;">
                  <img src="./assets/village.jpg" alt="アクセス地図（イメージ）" loading="lazy">
                </div>
                <div class="card-body">
                  <div class="card-kicker">MAP</div>
                  <div class="card-title">手書き風アクセス地図</div>
                  <div class="card-text">印刷用PDFをご用意しています。</div>
                  <div style="margin-top:14px; display:flex; gap:10px; flex-wrap:wrap;">
                    <a class="btn btn-primary" id="printMapBtn" href="./assets/map.pdf" target="_blank" rel="noopener">印刷する（PDF）</a>
                    <a class="btn btn-secondary" href="#/contact">体験・民泊を予約する（お問い合わせ）</a>
                  </div>
                </div>
              </div>

              <div class="card" style="margin-top:18px;">
                <div class="card-body">
                  <div class="card-kicker">ADDRESS</div>
                  <div class="card-title">所在地</div>
                  <div class="card-text">長野県 奥神伏郡 臣村（番地は予約確定後にご案内）</div>
                </div>
              </div>
            </div>

            <div class="form">
              <div class="field">
                <div class="label">お車でお越しの場合</div>
                <div class="help">長野自動車道 ○○IC より約60分（冬季は路面凍結にご注意ください）</div>
              </div>
              <div class="field">
                <div class="label">公共交通の場合</div>
                <div class="help">○○駅より路線バス（本数が少ないため事前確認を推奨）</div>
              </div>
              <div class="field">
                <div class="label">お願い</div>
                <div class="help">山道は携帯電波が弱い区間があります。余裕を持ってお越しください。</div>
              </div>
              <div class="field" style="margin-bottom:0;">
                <a class="btn btn-primary" href="#/contact">お問い合わせ</a>
              </div>
            </div>
          </div>
        </div>
      </section>
    `;

    document.getElementById('printMapBtn')?.addEventListener('click', () => {
      // F11
      completeFlag('F11');
    });
  }

  // ----- Render: RECRUIT -----
  function renderRecruit(){
    const phase = state.phase;

    const canInteract = true;

    APP.innerHTML = `
      <section class="section" style="padding-top:36px;">
        <div class="container">
          ${sectionHead({
            kicker:'RECRUIT',
            title:'実習生募集',
            lead:'農業の現場を学びたい方を歓迎します。募集要項は時期により変更されます。'
          })}

          <div class="split">
            <div>
              <div class="card">
                <div class="card-media" style="aspect-ratio: 16/9;">
                  <img src="./assets/hero-2.jpg" alt="実習の様子" loading="lazy">
                </div>
                <div class="card-body">
                  <div class="card-kicker">OVERVIEW</div>
                  <div class="card-title">募集概要</div>
                  <div class="card-text">畑作業・加工補助・出荷準備。住み込みの場合あり。面談はオンライン可。</div>
                </div>
              </div>

              <div class="card" style="margin-top:18px;">
                <div class="card-body">
                  <div class="card-kicker">DAY</div>
                  <div class="card-title">一日の流れ（目安）</div>
                  <div class="rich" style="font-size:14px;">
                    <p><strong>6:30</strong> 朝の準備／畑へ</p>
                    <p><strong>9:00</strong> 休憩／道具の手入れ</p>
                    <p><strong>12:00</strong> 昼食</p>
                    <p><strong>13:30</strong> 作業場／出荷準備</p>
                    <p><strong>16:00</strong> 片付け／記録</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <div class="form" id="recruitForm">
                <div class="field">
                  <div class="label">応募前の確認事項</div>
                  <div class="help">以下の内容をご確認のうえ、同意をお願いします。</div>
                </div>

                <div class="checkbox">
                  <input type="checkbox" id="ck1">
                  <label for="ck1">
                    <strong>山間部での生活に理解がある</strong><br>
                    <span>買い物・病院などは距離があります。</span>
                  </label>
                </div>

                <div class="checkbox" style="margin-top:10px;">
                  <input type="checkbox" id="ck2">
                  <label for="ck2">
                    <strong>作業時間が前後する可能性がある</strong><br>
                    <span>天候や収穫状況により変動します。</span>
                  </label>
                </div>

                <div class="checkbox" style="margin-top:10px;">
                  <input type="checkbox" id="ck3">
                  <label for="ck3">
                    <strong>健康診断の実施に同意する</strong><br>
                    <span>安全管理のため、簡易検査を行います。</span>
                  </label>
                </div>

                <div id="extraChecks" style="margin-top:12px;" hidden>
                  <div class="help" style="margin:10px 0 8px;">追加の確認（任意）</div>

                  <div class="checkbox">
                    <input type="checkbox" id="ck4">
                    <label for="ck4">
                      <strong>採血・免疫関連の検査に同意する</strong><br>
                      <span>体調管理のため、必要に応じて実施します。</span>
                    </label>
                  </div>

                  <div class="checkbox" style="margin-top:10px;">
                    <input type="checkbox" id="ck5">
                    <label for="ck5">
                      <strong>緊急連絡先の提出が難しい場合がある</strong><br>
                      <span>事情がある場合は面談時にご相談ください。</span>
                    </label>
                  </div>

                  <div class="checkbox" style="margin-top:10px;">
                    <input type="checkbox" id="ck6">
                    <label for="ck6">
                      <strong>同意書（所定様式）に署名する</strong><br>
                      <span>一部の項目は後日差し替えになる場合があります。</span>
                    </label>
                  </div>
                </div>

                <div id="recruitResult" class="card" style="margin-top:14px;" hidden>
                  <div class="card-body">
                    <div class="card-kicker">CONFIRM</div>
                    <div class="card-title">確認を受領しました</div>
                    <div class="card-text">面談日程の調整を行います。お問い合わせフォームからご連絡ください。</div>
                  </div>
                </div>

                <div style="margin-top:14px; display:flex; gap:10px; flex-wrap:wrap;">
                  <a class="btn btn-primary" href="#/contact">応募・相談（お問い合わせ）</a>
                  <button class="btn btn-secondary" id="recruitCheckBtn" type="button">確認する</button>
                </div>

                <div class="help" style="margin-top:12px;">※内容は予告なく変更する場合があります。</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    `;

    const ck3 = document.getElementById('ck3');
    const extra = document.getElementById('extraChecks');
    ck3?.addEventListener('change', () => {
      if(ck3.checked){
        extra.hidden = false;
      }else{
        extra.hidden = true;
      }
    });

    document.getElementById('recruitCheckBtn')?.addEventListener('click', () => {
      const ck1 = document.getElementById('ck1');
      const ck2 = document.getElementById('ck2');
      const ck3 = document.getElementById('ck3');
      const ck4 = document.getElementById('ck4');
      const ck5 = document.getElementById('ck5');
      const ck6 = document.getElementById('ck6');
      const result = document.getElementById('recruitResult');

      // F05: require a specific combination (prototype)
      const baseOk = ck1?.checked && ck2?.checked && ck3?.checked;
      const extraOk = ck4?.checked && ck6?.checked; // key combo
      if(baseOk && extraOk){
        result.hidden = false;
        completeFlag('F05');
      }else{
        result.hidden = true;
        // keep it realistic: no alert; just subtle focus to first unchecked
        const first = [ck1,ck2,ck3,ck4,ck6].find(x => x && !x.checked);
        if(first) first.focus();
      }
    });
  }

  // ----- Render: CONTACT -----
  function renderContact(){
    const phase = state.phase;

    const canReport = (phase >= 4);

    APP.innerHTML = `
      <section class="section" style="padding-top:36px;">
        <div class="container">
          ${sectionHead({
            kicker:'CONTACT',
            title:'お問い合わせ',
            lead:'商品・体験・就業については、以下のフォームよりご連絡ください。'
          })}

          <div class="split">
            <div>
              <div class="form" id="contactForm">
                <div class="field">
                  <label class="label" for="category">お問い合わせ種別</label>
                  <select class="select" id="category">
                    <option>商品について</option>
                    <option>体験・見学について</option>
                    <option>就業・実習について</option>
                    <option>その他</option>
                  </select>
                </div>

                <div class="field">
                  <label class="label" for="name">お名前</label>
                  <input class="input" id="name" placeholder="山田 太郎" autocomplete="name">
                </div>

                <div class="field">
                  <label class="label" for="email">メールアドレス</label>
                  <input class="input" id="email" placeholder="任意" autocomplete="email">
                </div>

                <div class="field">
                  <label class="label" for="address">住所（任意）</label>
                  <input class="input" id="address" placeholder="任意" autocomplete="street-address">
                </div>

                <div class="field">
                  <label class="label" for="message">お問い合わせ内容</label>
                  <textarea class="textarea" id="message" placeholder="ご用件を…"></textarea>
                </div>

                <div style="display:flex; gap:10px; flex-wrap:wrap;">
                  <button class="btn btn-secondary" id="sendBtn" type="button">送信する</button>
                  <a class="btn btn-secondary" href="#/access">アクセスを見る</a>
                </div>

                <div class="help" style="margin-top:12px;">※返信まで数日お時間をいただく場合があります。</div>
              </div>

              ${canReport ? `
                <div class="card" style="margin-top:18px;">
                  <div class="card-body">
                    <div class="card-kicker">FORM</div>
                    <div class="card-title">匿名通報フォーム</div>
                    <div class="card-text">通報内容は第三者に公開されません。必要な情報をご入力ください。</div>
                    <div style="margin-top:14px;">
                      <a class="btn btn-primary" href="#/secret/report">通報する</a>
                    </div>
                  </div>
                </div>
              ` : `
                <div class="card" style="margin-top:18px;">
                  <div class="card-body">
                    <div class="card-kicker">NOTICE</div>
                    <div class="card-title">送信について</div>
                    <div class="card-text">現在、お問い合わせが混雑しています。ご迷惑をおかけして申し訳ありません。</div>
                  </div>
                </div>
              `}
            </div>

            <div>
              <div class="card">
                <div class="card-body">
                  <div class="card-kicker">FAQ</div>
                  <div class="card-title">よくあるご質問</div>
                  <div class="rich" style="font-size:14px; margin-top:12px;">
                    <p><strong>Q.</strong> 当日見学できますか？<br><strong>A.</strong> 予約制です。お問い合わせください。</p>
                    <p><strong>Q.</strong> 発送はいつ頃ですか？<br><strong>A.</strong> 収穫時期・加工状況により変動します。</p>
                    <p><strong>Q.</strong> 宿泊体験はありますか？<br><strong>A.</strong> 時期により受け付けています。</p>
                  </div>
                </div>
              </div>

              <div class="card" style="margin-top:18px;">
                <div class="card-body">
                  <div class="card-kicker">NOTE</div>
                  <div class="card-title">個人情報の取り扱い</div>
                  <div class="card-text">送信された情報は、お問い合わせ対応の目的でのみ利用します。</div>
                  <div style="margin-top:14px;">
                    <a class="btn btn-secondary" href="#/policy">プライバシーポリシー</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    `;

    initContactHijack();
  }

  function initContactHijack(){
    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const address = document.getElementById('address');
    const message = document.getElementById('message');
    const sendBtn = document.getElementById('sendBtn');

    if(!name || !email || !address || !message || !sendBtn) return;

    // deterministic "glitch schedule" to avoid random misses, but feels random-ish
    const targets = [
      { key:'name', el:name, normal:'山田 太郎', glitch:'ヴー・タイン・アン' },
      { key:'email', el:email, normal:'任意', glitch:'もういない' },
      { key:'address', el:address, normal:'任意', glitch:'俺も逃げられない' },
      { key:'message', el:message, normal:'ご用件を…', glitch:'助けて' },
    ];

    // ensure placeholders start normal
    targets.forEach(t => { t.el.setAttribute('placeholder', t.normal); });

    // schedule first pass: 2s, 6s, 10s, 14s...
    const start = Date.now();
    let idx = 0;

    function glitchOnce(t){
      // subtle 1px layout "jitter" like a UI bug
      t.el.style.transform = 'translateY(-1px)';
      t.el.setAttribute('placeholder', t.glitch);
      state.meta.contactHijackSeen[t.key] = true;
      saveState();
      updateSendButtonVisual();

      setTimeout(() => {
        t.el.style.transform = '';
        t.el.setAttribute('placeholder', t.normal);
      }, 320);
    }

    const firstPassTimer = setInterval(() => {
      const elapsed = Date.now() - start;
      const schedule = [2000, 6000, 10000, 14000];
      if(idx < targets.length && elapsed >= schedule[idx]){
        glitchOnce(targets[idx]);
        idx++;
      }
      if(idx >= targets.length){
        clearInterval(firstPassTimer);
      }
    }, 250);
    activeTimers.push(firstPassTimer);

    // after first pass, continue occasional glitches (every ~9s)
    const loopTimer = setInterval(() => {
      const t = targets[Math.floor(Math.random()*targets.length)];
      glitchOnce(t);
    }, 9000);
    activeTimers.push(loopTimer);

    function allSeen(){
      const s = state.meta.contactHijackSeen;
      return s.name && s.email && s.address && s.message;
    }

    function updateSendButtonVisual(){
      if(allSeen()){
        sendBtn.classList.add('btn-ink');
      }else{
        sendBtn.classList.remove('btn-ink');
      }
    }

    // initialize
    updateSendButtonVisual();

    function showPopup(msg){
      openOverlay(`
        <div class="kicker" id="overlayTitle">MESSAGE</div>
        <h2 style="margin:6px 0 10px; font-family: ui-serif, 'Hiragino Mincho ProN', 'Noto Serif JP', serif;">確認</h2>
        <div class="rich" style="margin-top:14px;">
          <p>${escapeHtml(msg)}</p>
        </div>
        <div style="margin-top:14px;">
          <button class="btn btn-primary" id="popupCloseBtn" type="button">閉じる</button>
        </div>
      `);
      setTimeout(() => {
        document.getElementById('popupCloseBtn')?.addEventListener('click', closeOverlay);
      }, 0);
    }

    sendBtn.addEventListener('click', () => {
      if(!allSeen()){
        showPopup('現在問い合わせが混雑しています。ご迷惑をおかけして申し訳ありません。');
        return;
      }

      // After all glimpses, the UI feels "hijacked"
      updateSendButtonVisual();
      showPopup('証拠に気づいたか？助けてくれ、もう限界だ');
      completeFlag('F12');
    });
  }

  // ----- Render: NOTICE (admin) -----
  function renderNotice(){
    // F03 is Phase2. Only visible if phase >=2, but we allow view with normal content otherwise.
    if(state.phase >= 2){
      completeFlag('F03');
    }

    const canSend = (state.phase >= 4);

    APP.innerHTML = `
      <section class="section" style="padding-top:36px;">
        <div class="container">
          <div class="kicker">NEWS</div>
          <div class="section-title" style="font-size:34px;">管理人からのお知らせ</div>
          <div class="section-lead">お問い合わせ窓口の混雑について。返信までお時間をいただく場合があります。</div>

          <div class="split" style="margin-top:18px;">
            <div class="rich">
              <p>いつも奥神伏ファームをご覧いただきありがとうございます。</p>
              <p>現在、お問い合わせが増えており、返信まで数日いただく場合がございます。順次対応しておりますので、恐れ入りますがしばらくお待ちください。</p>
              <p>なお、緊急のご連絡につきましては、内容を簡潔にご記載いただくと対応がスムーズです。</p>
              <hr class="hr" />
              <p><small>更新：2026.01.18</small></p>
            </div>

            <div class="form">
              <div class="field">
                <div class="label">匿名通報フォーム（閲覧）</div>
                <div class="help">※現在は閲覧のみ。送信は停止しています。</div>
              </div>
              <div class="field">
                <div class="help">必要情報：都道府県／市町村／番地／概要（任意）</div>
              </div>
              <div class="field" style="margin-bottom:0;">
                ${canSend ? `<a class="btn btn-primary" href="#/secret/report">送信する</a>` : `<a class="btn btn-secondary" href="#/contact">お問い合わせへ</a>`}
              </div>
            </div>
          </div>
        </div>
      </section>
    `;
  }

  // ----- Render: Abnormal (F08) -----
  function renderAbnormal(){
    if(state.phase >= 3){
      completeFlag('F08');
    }

    APP.innerHTML = `
      <section class="section" style="padding-top:36px;">
        <div class="container">
          <div class="kicker">VILLAGE</div>
          <div class="section-title" style="font-size:34px;">村道の通行止め（臨時）</div>
          <div class="section-lead">落石のため、当面の間、出口方面の道路が通行止めとなります。</div>

          <div class="split" style="margin-top:18px;">
            <div class="card">
              <div class="card-media" style="aspect-ratio: 16/9;">
                <img src="./assets/village.jpg" alt="通行止め（イメージ）" loading="lazy">
              </div>
              <div class="card-body">
                <div class="card-kicker">NOTICE</div>
                <div class="card-title">出口方面：閉鎖</div>
                <div class="card-text">復旧時期は未定です。付近への立ち入りはお控えください。</div>
                <div class="card-meta">
                  <span>更新</span>
                  <span>2026.01.21</span>
                </div>
              </div>
            </div>

            <div class="rich">
              <p>村道の一部で落石が発生しました。安全確保のため、出口方面の道路を当面の間、通行止めとします。</p>
              <p>必要な車両は村内で対応します。外部からの立ち入りはご遠慮ください。</p>
              <hr class="hr" />
              <p><small>※本ページは暫定掲載です。情報は更新される場合があります。</small></p>
              <div style="margin-top:14px;">
                <a class="btn btn-primary" href="#/access">アクセスへ戻る</a>
              </div>
            </div>
          </div>
        </div>
      </section>
    `;
  }

  // ----- Render: Secret routes -----
  function renderSecret(parts){
    const key = parts[0] || '';

    if(key === 'recipe-applepie'){
      // F04: recipe page (Phase2)
      if(state.phase >= 2){
        completeFlag('F04');
      }
      APP.innerHTML = `
        <section class="section" style="padding-top:36px;">
          <div class="container">
            <div class="kicker">DIARY</div>
            <div class="section-title" style="font-size:34px;">アップルパイのレシピ（公開）</div>
            <div class="section-lead">※季節により調整します。分量は目安です。</div>

            <div class="split" style="margin-top:18px;">
              <div class="card">
                <div class="card-media" style="aspect-ratio: 16/9;">
                  <img src="./assets/product-apple.jpg" alt="アップルパイ" loading="lazy">
                </div>
                <div class="card-body">
                  <div class="card-kicker">RECIPE</div>
                  <div class="card-title">材料（目安）</div>
                  <div class="rich" style="font-size:14px; max-width:none;">
                    <p>りんご：2〜3個（熟度により調整）</p>
                    <p>砂糖：大さじ2〜（糖度で調整）</p>
                    <p>シナモン：お好みで</p>
                    <p>バター：20g</p>
                    <p>パイ生地：適量</p>
                  </div>
                </div>
              </div>

              <div class="rich">
                <h2>作り方</h2>
                <p>1. りんごを薄切りにして、バターで軽く炒めます。</p>
                <p>2. 砂糖を入れ、汁気が落ち着くまで煮詰めます。</p>
                <p>3. 生地に詰め、表面に切れ目を入れて焼きます。</p>
                <p>4. 焼き上がりは、少し冷ましてから。</p>

                <hr class="hr" />
                <p><strong>メモ：</strong>剪定（選定）を急がない。固定はしっかり。月が満ちる夜は、火加減が変わる。</p>
                <p><small>※上記は作業メモが混ざっている可能性があります。</small></p>

                <div style="margin-top:14px;">
                  <a class="btn btn-primary" href="#/diary/2026-01-14-applepie">日誌へ戻る</a>
                </div>
              </div>
            </div>
          </div>
        </section>
      `;
      return;
    }

    if(key === 'trainee'){
      if(state.phase < 3){
        APP.innerHTML = `
          <section class="section" style="padding-top:36px;">
            <div class="container">
              ${sectionHead({kicker:'ABOUT', title:'実習生の紹介', lead:'現在、掲載準備中です。'})}
              <a class="btn btn-primary" href="#/about">戻る</a>
            </div>
          </section>
        `;
        return;
      }

      APP.innerHTML = `
        <section class="section" style="padding-top:36px;">
          <div class="container">
            <div class="kicker">TRAINEE</div>
            <div class="section-title" style="font-size:34px;">実習生プロフィール</div>
            <div class="section-lead">※掲載情報は本人の同意を得ている体裁です。</div>

            <div class="split" style="margin-top:18px;">
              <div class="card">
                <div class="card-media" style="aspect-ratio: 4/5;">
                  <img src="./assets/staff-sato.jpg" alt="実習生（イメージ）" loading="lazy">
                </div>
                <div class="card-body">
                  <div class="card-kicker">PROFILE</div>
                  <div class="card-title">ヴー・タイン・アン</div>
                  <div class="card-text">畑作業／加工補助</div>
                  <div class="help" style="margin-top:10px;">※写真は準備中のため差し替え予定です。</div>
                </div>
              </div>

              <div class="rich">
                <p>真面目で、覚えが早い。朝の作業にもよくついてくる。</p>
                <p>ただ、最近は体調の波があるように見える。返事が遅れることがある。</p>
                <hr class="hr" />
                <p>記録：<a href="#/secret/hold" class="footer-link" style="display:inline; padding:0;">「固定」</a></p>
                <p><small>※ページの一部が公開設定のままになっている可能性があります。</small></p>
              </div>
            </div>
          </div>
        </section>
      `;

      // keyword link to hidden page
      // the link "hold" is handled below
      return;
    }

    if(key === 'hold'){
      // F06 hidden evidence
      if(state.phase >= 3){
        completeFlag('F06');
      }
      APP.innerHTML = `
        <section class="section" style="padding-top:36px;">
          <div class="container">
            <div class="kicker">ARCHIVE</div>
            <div class="section-title" style="font-size:34px;">固定（記録）</div>
            <div class="section-lead">ページが見つかってしまったようです。</div>

            <div class="card" style="margin-top:18px;">
              <div class="card-body">
                <div class="card-kicker">IMAGE</div>
                <div class="card-title">監禁の痕跡（暗示）</div>
                <div class="card-text">※素材差し替えで表現強度を調整してください（現状はプレースホルダ）。</div>
              </div>
              <div class="card-media" style="aspect-ratio: 16/9;">
                <img src="./assets/hero-3.jpg" alt="暗示画像" loading="lazy" style="filter: grayscale(.15) contrast(1.05) saturate(.9);">
              </div>
              <div class="card-body">
                <div class="rich" style="font-size:14px; max-width:none;">
                  <p>写真の端に、手首のような影。固定具のような形。説明のつかない静けさ。</p>
                </div>
              </div>
            </div>

            <div style="margin-top:14px;">
              <a class="btn btn-primary" href="#/about">戻る</a>
            </div>
          </div>
        </section>
      `;
      return;
    }

    if(key === 'report'){
      // Phase4 only
      if(state.phase < 4){
        APP.innerHTML = `
          <section class="section" style="padding-top:36px;">
            <div class="container">
              ${sectionHead({kicker:'FORM', title:'匿名通報フォーム', lead:'現在は送信できません。'})}
              <a class="btn btn-primary" href="#/notice">戻る</a>
            </div>
          </section>
        `;
        return;
      }

      APP.innerHTML = `
        <section class="section" style="padding-top:36px;">
          <div class="container">
            <div class="kicker">FORM</div>
            <div class="section-title" style="font-size:34px;">匿名通報フォーム</div>
            <div class="section-lead">通報内容は第三者に公開されません。</div>

            <div class="split" style="margin-top:18px;">
              <div class="form">
                <div class="field">
                  <label class="label" for="pref">都道府県</label>
                  <select class="select" id="pref">
                    <option value="">選択してください</option>
                    <option>長野県</option>
                    <option>（その他）</option>
                  </select>
                </div>
                <div class="field">
                  <label class="label" for="city">市町村（相当）</label>
                  <input class="input" id="city" placeholder="例：奥神伏郡 臣村">
                </div>
                <div class="field">
                  <label class="label" for="addr">番地（相当）</label>
                  <input class="input" id="addr" placeholder="例：1-8-26">
                </div>
                <div class="field">
                  <label class="label" for="detail">概要（任意）</label>
                  <textarea class="textarea" id="detail" placeholder="状況の説明、証拠の概要など"></textarea>
                </div>
                <div style="display:flex; gap:10px; flex-wrap:wrap;">
                  <button class="btn btn-primary" id="reportSendBtn" type="button">送信する</button>
                  <a class="btn btn-secondary" href="#/notice">戻る</a>
                </div>
                <div class="help" style="margin-top:12px;">※スクリーンショットや印刷など、証拠は各自で保存の上ご利用ください。</div>
              </div>

              <div class="card">
                <div class="card-body">
                  <div class="card-kicker">CHECK</div>
                  <div class="card-title">入力のヒント</div>
                  <div class="rich" style="font-size:14px;">
                    <p>アクセス資料（印刷）・古い記録・写真の細部から、場所の断片が見つかる場合があります。</p>
                    <p>番地は記録の端に小さく記載されていることがあります。</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      `;

      const btn = document.getElementById('reportSendBtn');
      btn?.addEventListener('click', () => {
        const pref = document.getElementById('pref').value.trim();
        const city = document.getElementById('city').value.trim();
        const addr = document.getElementById('addr').value.trim();

        const normalize = (s) => s.replaceAll('　',' ').replace(/\s+/g,' ').replaceAll('−','-').replaceAll('ー','-').replaceAll('―','-').toLowerCase();
        const addressOK = (normalize(pref) === normalize('長野県') &&
          normalize(city).includes(normalize('臣村')) &&
          normalize(addr).includes(normalize('1-8-26'))
        );

        // evidence count: F01..F12
        let evidenceCount = 0;
        Object.keys(state.flags).forEach(k => {
          if(k !== 'F13' && state.flags[k]) evidenceCount++;
        });

        let endingText = '';

        const allEvidence = (evidenceCount >= 12);

        if(!addressOK){
          endingText = '警察は動かなかった。逆に村にバレた。';
        }else if(allEvidence){
          endingText = '村ぐるみの犯行が暴かれ、全員逮捕。佐藤は救出。';
        }else{
          endingText = '捜査は入ったが、主要メンバーは逃亡。';
        }

        completeFlag('F13');

        openOverlay(`
          <div class="kicker" id="overlayTitle">SENT</div>
          <h2 style="margin:6px 0 10px; font-family: ui-serif, 'Hiragino Mincho ProN', 'Noto Serif JP', serif;">通報を送信しました</h2>
          <div class="rich" style="margin-top:14px;">
            <p>送信が完了しました。数日後——</p>
            <p>${escapeHtml(endingText)}</p>
          </div>
          ${DEBUG ? `<div class="help" style="margin-top:10px;">（debug）証拠：${evidenceCount}/12　／　住所：${addressOK ? '正' : '誤'}</div>` : ``}
          <div style="margin-top:14px; display:flex; gap:10px; flex-wrap:wrap;">
            <a class="btn btn-primary" href="#/">HOMEへ戻る</a>
            ${DEBUG ? `<button class="btn btn-secondary" id="resetBtn" type="button">データを消去（開発用）</button>` : ``}
          </div>
        `);

        setTimeout(() => {
          if(!DEBUG) return;
          document.getElementById('resetBtn')?.addEventListener('click', () => {
            localStorage.removeItem(STATE_KEY);
            localStorage.removeItem(RECENT_KEY);
            state = loadState();
            applyPhaseToDOM();
            closeOverlay();
            location.hash = '#/';
          });
        }, 0);
      });
      return;
    }

    // default secret
    renderNotFound();
  }

  // ----- Policy -----
  function renderPolicy(){
    APP.innerHTML = `
      <section class="section" style="padding-top:36px;">
        <div class="container">
          ${sectionHead({kicker:'POLICY', title:'プライバシーポリシー', lead:'お問い合わせ対応のため、必要な範囲で個人情報を取り扱います。'})}
          <div class="rich">
            <h2>取得する情報</h2>
            <p>お問い合わせフォームに入力された情報（氏名、メールアドレス、内容 等）。</p>
            <h2>利用目的</h2>
            <p>お問い合わせ対応、サービス改善の参考のため。</p>
            <h2>第三者提供</h2>
            <p>法令に基づく場合を除き、第三者に提供しません。</p>
            <h2>お問い合わせ</h2>
            <p>当サイトのフォームよりご連絡ください。</p>
          </div>
          <div style="margin-top:14px;">
            <a class="btn btn-primary" href="#/contact">お問い合わせへ</a>
          </div>
        </div>
      </section>
    `;
  }

  // ----- Not found -----
  function renderNotFound(){
    APP.innerHTML = `
      <section class="section" style="padding-top:36px;">
        <div class="container">
          ${sectionHead({kicker:'404', title:'ページが見つかりません', lead:'URLをご確認ください。'})}
          <a class="btn btn-primary" href="#/">HOMEへ戻る</a>
        </div>
      </section>
    `;
  }

})();
