// ═══════════════════════════════════════════════════════════
//  BHAGAVAD GITA — CORE APP v3.0
//  Async chapter loading · Robust error handling · Fast
// ═══════════════════════════════════════════════════════════

/* ─── CHAPTER CACHE (loaded on demand) ───────────────── */
const _chapterCache = {};

async function loadChapter(chNum) {
  if (_chapterCache[chNum]) return _chapterCache[chNum];
  try {
    const res  = await fetch(`assets/data/ch${chNum}.json`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    _chapterCache[chNum] = data;
    return data;
  } catch (err) {
    console.error(`Failed to load chapter ${chNum}:`, err);
    return null;
  }
}

/* ─── PARTICLE SYSTEM ─────────────────────────────────── */
class ParticleSystem {
  constructor(id) {
    this.canvas = document.getElementById(id);
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');
    this.particles = [];
    this.mouse = { x: -999, y: -999 };
    this.resize(); this.init(); this.bindEvents(); this.animate();
  }
  resize() { this.canvas.width = window.innerWidth; this.canvas.height = window.innerHeight; }
  init() {
    this.particles = [];
    const n = Math.min(Math.floor(window.innerWidth / 9), 120);
    for (let i = 0; i < n; i++) this.particles.push({
      x: Math.random() * this.canvas.width,
      y: Math.random() * this.canvas.height,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3 - 0.08,
      size: Math.random() * 1.8 + 0.3,
      alpha: Math.random() * 0.5 + 0.1,
      hue: [43, 0, 200][Math.floor(Math.random() * 3)],
      pulse: Math.random() * Math.PI * 2
    });
  }
  bindEvents() {
    window.addEventListener('resize', () => { this.resize(); this.init(); });
    window.addEventListener('mousemove', e => { this.mouse.x = e.clientX; this.mouse.y = e.clientY; });
  }
  animate() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.particles.forEach(p => {
      const dx = this.mouse.x - p.x, dy = this.mouse.y - p.y;
      const dist = Math.hypot(dx, dy);
      if (dist < 180) { p.vx += (dx / dist) * 0.012; p.vy += (dy / dist) * 0.012; }
      p.vx *= 0.98; p.vy *= 0.98;
      p.x += p.vx; p.y += p.vy; p.pulse += 0.02;
      if (p.x < 0) p.x = this.canvas.width;
      if (p.x > this.canvas.width)  p.x = 0;
      if (p.y < 0) p.y = this.canvas.height;
      if (p.y > this.canvas.height) p.y = 0;
      const a = p.alpha * (0.7 + Math.sin(p.pulse) * 0.3);
      const col = p.hue === 43 ? `rgba(201,168,76,${a})`
                : p.hue === 0  ? `rgba(155,28,46,${a})`
                :                `rgba(74,124,89,${a})`;
      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      this.ctx.fillStyle = col; this.ctx.fill();
    });
    this.particles.forEach((a, i) => this.particles.slice(i + 1).forEach(b => {
      const d = Math.hypot(a.x - b.x, a.y - b.y);
      if (d < 70) {
        this.ctx.beginPath(); this.ctx.moveTo(a.x, a.y); this.ctx.lineTo(b.x, b.y);
        this.ctx.strokeStyle = `rgba(201,168,76,${0.07 * (1 - d / 70)})`;
        this.ctx.lineWidth = 0.5; this.ctx.stroke();
      }
    }));
    requestAnimationFrame(() => this.animate());
  }
}

/* ─── MANDALA ────────────────────────────────────────── */
function createMandala(svgEl) {
  if (!svgEl) return;
  const ns = 'http://www.w3.org/2000/svg';
  const cx = 350, cy = 350;
  for (let r = 1; r <= 7; r++) {
    const radius = r * 44, petals = r * 8, pr = radius * 0.22;
    for (let i = 0; i < petals; i++) {
      const angle = (i / petals) * Math.PI * 2;
      const px = cx + Math.cos(angle) * radius, py = cy + Math.sin(angle) * radius;
      const el = document.createElementNS(ns, 'ellipse');
      el.setAttribute('cx', px); el.setAttribute('cy', py);
      el.setAttribute('rx', pr * 0.5); el.setAttribute('ry', pr);
      el.setAttribute('fill', 'none'); el.setAttribute('stroke', '#C9A84C');
      el.setAttribute('stroke-width', '0.6');
      el.setAttribute('opacity', (0.2 + r * 0.05).toString());
      el.setAttribute('transform', `rotate(${angle * 180 / Math.PI + 90},${px},${py})`);
      svgEl.appendChild(el);
    }
    const c = document.createElementNS(ns, 'circle');
    c.setAttribute('cx', cx); c.setAttribute('cy', cy); c.setAttribute('r', radius);
    c.setAttribute('fill', 'none'); c.setAttribute('stroke', '#C9A84C');
    c.setAttribute('stroke-width', '0.4'); c.setAttribute('opacity', '0.15');
    svgEl.appendChild(c);
  }
  const t = document.createElementNS(ns, 'text');
  t.setAttribute('x', cx); t.setAttribute('y', cy + 22);
  t.setAttribute('text-anchor', 'middle'); t.setAttribute('fill', '#C9A84C');
  t.setAttribute('font-size', '82'); t.setAttribute('opacity', '0.35');
  t.setAttribute('font-family', 'Noto Serif Devanagari,serif');
  t.textContent = 'ॐ'; svgEl.appendChild(t);
}

/* ─── NAV ────────────────────────────────────────────── */
function initNav() {
  const nav = document.querySelector('.nav');
  if (!nav) return;
  const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 40);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
  const hbg = document.querySelector('.hamburger'), mob = document.querySelector('.mobile-nav');
  if (hbg && mob) {
    hbg.addEventListener('click', () => mob.classList.toggle('open'));
    mob.querySelectorAll('a').forEach(a => a.addEventListener('click', () => mob.classList.remove('open')));
  }
  const cur = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(a => {
    if (a.getAttribute('href') === cur) a.classList.add('active');
  });
}

/* ─── SCROLL REVEAL ──────────────────────────────────── */
function initScrollReveal() {
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -20px 0px' });
  document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(el => obs.observe(el));
}

/* ─── READING PROGRESS ───────────────────────────────── */
function initReadingProgress() {
  const bar = document.querySelector('.reading-progress');
  if (!bar) return;
  window.addEventListener('scroll', () => {
    const pct = window.scrollY / (document.body.scrollHeight - window.innerHeight);
    bar.style.width = Math.min(pct * 100, 100) + '%';
  }, { passive: true });
}

/* ─── TOAST ──────────────────────────────────────────── */
function showToast(msg, duration = 3000) {
  document.querySelector('.toast')?.remove();
  const t = document.createElement('div');
  t.className = 'toast'; t.textContent = msg;
  document.body.appendChild(t);
  setTimeout(() => t.remove(), duration);
}

/* ─── VERSE INTERACTIONS ─────────────────────────────── */
function initVerseInteractions() {
  document.querySelectorAll('.verse-header').forEach(h => {
    h.addEventListener('click', () => {
      const block = h.closest('.verse-block');
      const body  = block.querySelector('.verse-body');
      const tog   = h.querySelector('.verse-toggle');
      const wasOpen = body.classList.contains('open');
      document.querySelectorAll('.verse-body.open').forEach(b => {
        b.classList.remove('open');
        b.closest('.verse-block').querySelector('.verse-toggle').textContent = '+';
      });
      if (!wasOpen) {
        body.classList.add('open'); tog.textContent = '−';
        setTimeout(() => block.scrollIntoView({ behavior: 'smooth', block: 'nearest' }), 50);
      }
    });
  });

  document.querySelectorAll('[data-action="bookmark"]').forEach(btn => {
    btn.addEventListener('click', e => {
      e.stopPropagation();
      const id = btn.closest('.verse-block')?.dataset.verse; if (!id) return;
      const saved = JSON.parse(localStorage.getItem('bookmarks') || '[]');
      const idx = saved.indexOf(id);
      if (idx === -1) { saved.push(id); btn.classList.add('bookmarked'); showToast('🔖 Verse bookmarked'); }
      else { saved.splice(idx, 1); btn.classList.remove('bookmarked'); showToast('Bookmark removed'); }
      localStorage.setItem('bookmarks', JSON.stringify(saved));
    });
  });

  document.querySelectorAll('[data-action="copy"]').forEach(btn => {
    btn.addEventListener('click', e => {
      e.stopPropagation();
      const t = btn.closest('.verse-block')?.querySelector('.verse-translation');
      if (t) { navigator.clipboard.writeText(t.textContent.trim()); showToast('📋 Copied'); }
    });
  });

  const saved = JSON.parse(localStorage.getItem('bookmarks') || '[]');
  saved.forEach(id => {
    document.querySelector(`[data-verse="${id}"] [data-action="bookmark"]`)?.classList.add('bookmarked');
  });
}

/* ─── CHAPTER GRID (uses metadata only) ─────────────── */
function buildChapterGrid(containerId, limit = 18) {
  const container = document.getElementById(containerId); if (!container) return;
  if (!GITA_DATA?.chapters?.length) {
    container.innerHTML = '<p style="color:var(--text-muted);padding:40px;text-align:center;grid-column:1/-1;">Loading chapters…</p>';
    return;
  }
  container.innerHTML = GITA_DATA.chapters.slice(0, limit).map(ch => {
    const art = typeof buildChapterArt === 'function' ? buildChapterArt(ch.id) : '';
    return `
    <a href="chapter.html?ch=${ch.id}" class="chapter-card card reveal" style="text-decoration:none;">
      ${art}
      <div class="chapter-card-number">${String(ch.id).padStart(2, '0')}</div>
      <div class="chapter-card-title">${ch.name}</div>
      <div class="chapter-card-sanskrit">${ch.sanskrit}</div>
      <div class="chapter-card-desc">${ch.summary.slice(0, 115)}…</div>
      <div class="chapter-card-meta">
        <span class="verse-count">${ch.verseCount} verses</span>
        <span class="chapter-tag">${ch.tag}</span>
      </div>
    </a>`;
  }).join('');
  initScrollReveal();
}

/* ─── CHAPTER READER (async fetch) ──────────────────── */
async function buildChapterReader() {
  const params  = new URLSearchParams(location.search);
  const chNum   = parseInt(params.get('ch')) || 1;

  // Show loading state
  const titleEl   = document.getElementById('chapter-title');
  const versesEl  = document.getElementById('verses-container');
  const breadcrumb= document.getElementById('chapter-breadcrumb');
  const bgNum     = document.getElementById('chapter-bg-num');

  // Set chapter watermark immediately from metadata
  const meta = GITA_DATA?.chapters?.[chNum - 1];
  if (bgNum) bgNum.textContent = String(chNum).padStart(2, '0');
  if (breadcrumb) breadcrumb.textContent = meta ? `Chapter ${chNum}: ${meta.name}` : `Chapter ${chNum}`;

  // Show gradient art immediately (no fetch needed)
  const imgEl = document.getElementById('chapter-hero-image');
  if (imgEl && typeof buildChapterArt === 'function') {
    imgEl.innerHTML = buildChapterArt(chNum, '340px', true);
    imgEl.style.display = '';
  }

  // Set prev/next from metadata immediately
  const prev = document.getElementById('prev-chapter');
  const next = document.getElementById('next-chapter');
  if (prev) { if (chNum > 1)  { prev.href = `chapter.html?ch=${chNum-1}`; prev.textContent = `← Chapter ${chNum-1}`; } else prev.style.display = 'none'; }
  if (next) { if (chNum < 18) { next.href = `chapter.html?ch=${chNum+1}`; next.textContent = `Chapter ${chNum+1} →`; } else next.style.display = 'none'; }

  // Show loading spinner in verses area
  if (versesEl) {
    versesEl.innerHTML = `
      <div style="display:flex;flex-direction:column;align-items:center;justify-content:center;padding:80px 20px;gap:20px;">
        <div style="font-family:var(--font-sanskrit);font-size:3rem;color:var(--gold);opacity:0.6;animation:spin-slow 4s linear infinite;">ॐ</div>
        <div style="font-size:0.85rem;color:var(--text-muted);letter-spacing:0.1em;">Loading verses…</div>
      </div>
      <style>@keyframes spin-slow{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}</style>`;
  }

  // Async-fetch the full chapter JSON
  const chapter = await loadChapter(chNum);

  if (!chapter) {
    if (titleEl) titleEl.textContent = `Chapter ${chNum}: ${meta?.name || ''}`;
    if (versesEl) versesEl.innerHTML = `
      <div style="padding:60px;text-align:center;">
        <div style="font-size:2rem;margin-bottom:16px;">⚠️</div>
        <p style="color:var(--text-muted);">Could not load chapter data. Make sure you are running a local server.</p>
        <p style="color:var(--text-muted);font-size:0.85rem;margin-top:8px;">Run: <code style="background:var(--bg-card);padding:4px 10px;border-radius:6px;">npx serve .</code> then visit <code style="background:var(--bg-card);padding:4px 10px;border-radius:6px;">localhost:3000</code></p>
        <a href="chapters.html" class="btn btn-outline" style="margin-top:20px;display:inline-flex;">← Back to Chapters</a>
      </div>`;
    return;
  }

  // Populate title and meta
  if (titleEl) titleEl.textContent = `Chapter ${chNum}: ${chapter.name}`;
  if (breadcrumb) breadcrumb.textContent = `Chapter ${chNum}: ${chapter.name}`;

  const metaEl = document.getElementById('chapter-meta');
  if (metaEl) metaEl.innerHTML = `
    <div style="font-family:var(--font-sanskrit);font-size:1.25rem;color:var(--text-sanskrit);margin-bottom:12px;">${chapter.sanskrit}</div>
    <p style="font-size:1.03rem;color:var(--text-secondary);margin-bottom:20px;line-height:1.9;">${chapter.summary}</p>
    <div style="display:flex;gap:10px;flex-wrap:wrap;">
      <span class="tag tag-gold">Theme: ${chapter.theme}</span>
      <span class="tag tag-sage">${chapter.verseCount} verses</span>
      <span class="tag tag-crimson">${chapter.tag}</span>
    </div>`;

  // Key teaching
  const teaching = document.getElementById('chapter-key-teaching');
  const teachTxt = document.getElementById('chapter-teaching-text');
  if (teaching && teachTxt) { teachTxt.textContent = chapter.keyTeaching; teaching.style.display = ''; }

  // Render ALL verses
  if (versesEl && chapter.verses?.length) {
    versesEl.innerHTML = chapter.verses.map(v => {
      const vid = `BG${chNum}.${v.verse}`;
      const preview = (v.translation || '').slice(0, 74) + '…';
      return `
        <div class="verse-block reveal" data-verse="${vid}" id="v${v.verse}">
          <div class="verse-header">
            <span class="verse-num">${chNum}.${v.verse}</span>
            <span class="verse-preview">${preview}</span>
            <button class="verse-toggle" aria-label="Expand verse">+</button>
          </div>
          <div class="verse-body">
            <div class="verse-sanskrit">${(v.sanskrit || '').replace(/\n/g, '<br>')}</div>
            <div class="verse-transliteration">${(v.transliteration || '').replace(/\n/g, '<br>')}</div>
            <div class="verse-translation">${v.translation || ''}</div>
            ${v.hindi ? `<div style="margin:12px 0;padding:14px;background:rgba(244,216,122,0.04);border-left:2px solid rgba(201,168,76,0.3);border-radius:0 var(--radius-md) var(--radius-md) 0;font-family:'Noto Serif Devanagari',serif;font-size:0.9rem;color:var(--text-muted);line-height:2;">${v.hindi}</div>` : ''}
            ${v.wordMeaning ? `<details style="margin-top:12px;"><summary style="font-size:0.75rem;color:var(--gold);cursor:pointer;letter-spacing:0.1em;text-transform:uppercase;list-style:none;display:flex;align-items:center;gap:6px;"><span>▶</span> Word Meanings</summary><div style="font-size:0.82rem;color:var(--text-muted);padding:12px 16px;margin-top:8px;background:rgba(255,255,255,0.02);border-radius:var(--radius-md);line-height:1.9;">${v.wordMeaning}</div></details>` : ''}
            <div class="verse-actions" style="margin-top:16px;">
              <button class="verse-action-btn" data-action="bookmark">🔖 Bookmark</button>
              <button class="verse-action-btn" data-action="copy">📋 Copy</button>
            </div>
          </div>
        </div>`;
    }).join('');
    initVerseInteractions();
    initScrollReveal();
  }

  // Sidebar
  const sidebar = document.getElementById('chapter-sidebar');
  if (sidebar) {
    const sideArt = typeof buildChapterArt === 'function' ? buildChapterArt(chNum, '130px', false) : '';
    sidebar.innerHTML = `
      <div class="card" style="margin-bottom:14px;">
        ${sideArt}
        <div class="section-label" style="margin-bottom:10px;margin-top:16px;">Key Teaching</div>
        <p style="font-family:var(--font-display);font-style:italic;font-size:1.05rem;color:var(--text-primary);margin-bottom:16px;line-height:1.6;">${chapter.keyTeaching}</p>
        <div class="divider"><span class="divider-om">ॐ</span></div>
        <div class="section-label" style="margin-bottom:8px;">Core Concepts</div>
        <div style="display:flex;gap:6px;flex-wrap:wrap;">${(chapter.keyWords || []).map(w => `<span class="tag tag-gold">${w}</span>`).join('')}</div>
      </div>
      <div class="card" style="margin-bottom:14px;">
        <div class="section-label" style="margin-bottom:8px;">Jump to Verse</div>
        <div style="display:flex;gap:5px;flex-wrap:wrap;max-height:180px;overflow-y:auto;">
          ${chapter.verses.map(v => `<a href="#v${v.verse}" style="font-size:0.72rem;padding:4px 8px;border:1px solid var(--border);border-radius:4px;color:var(--text-muted);text-decoration:none;transition:all 0.18s;" onmouseover="this.style.color='var(--gold)'" onmouseout="this.style.color=''">${chNum}.${v.verse}</a>`).join('')}
        </div>
      </div>
      <div class="card">
        <div class="section-label" style="margin-bottom:8px;">All Chapters</div>
        <div style="display:flex;flex-direction:column;gap:3px;max-height:300px;overflow-y:auto;">
          ${GITA_DATA.chapters.map(c => `
            <a href="chapter.html?ch=${c.id}" style="display:flex;gap:8px;padding:7px 10px;border-radius:6px;color:${c.id === chNum ? 'var(--gold)' : 'var(--text-muted)'};background:${c.id === chNum ? 'var(--gold-glow)' : 'transparent'};font-size:0.8rem;text-decoration:none;transition:all 0.18s;" onmouseover="if(${c.id}!==${chNum})this.style.color='var(--gold)'" onmouseout="if(${c.id}!==${chNum})this.style.color=''">
              <span style="opacity:0.4;font-family:var(--font-display);flex-shrink:0;">${c.id}.</span>${c.name}
            </a>`).join('')}
        </div>
      </div>`;
  }

  // Save reading progress
  try {
    const prog = JSON.parse(localStorage.getItem('gita-progress') || '{}');
    prog[chNum] = Date.now();
    localStorage.setItem('gita-progress', JSON.stringify(prog));
  } catch(e) {}

  // Jump to specific verse from URL param
  const vParam = params.get('v');
  if (vParam) {
    setTimeout(() => {
      const vNum = vParam.includes('.') ? vParam.split('.')[1] : vParam;
      const el = document.getElementById(`v${vNum}`);
      if (el) { el.querySelector('.verse-header')?.click(); el.scrollIntoView({ behavior: 'smooth', block: 'center' }); }
    }, 500);
  }
}

/* ─── DAILY WISDOM ───────────────────────────────────── */
function initDailyWisdom() {
  const container = document.getElementById('daily-wisdom'); if (!container) return;
  if (!DAILY_WISDOM?.length) return;

  const today   = new Date();
  const idx     = today.getDate() % DAILY_WISDOM.length;
  const entry   = DAILY_WISDOM[idx];
  const dateStr = today.toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

  // Parse verse ID like "BG2.47"
  const match = entry.verse.match(/BG(\d+)\.(\d+)/);
  if (!match) return;
  const chNum = parseInt(match[1]);
  const vNum  = parseInt(match[2]);

  // Load the chapter JSON to get verse text
  loadChapter(chNum).then(chapter => {
    if (!chapter) return;
    const verse = chapter.verses?.find(v => v.verse === vNum);
    if (!verse) return;
    container.innerHTML = `
      <div class="wisdom-card">
        <div class="wisdom-date">Daily Wisdom · ${dateStr}</div>
        <div class="wisdom-verse" style="font-family:var(--font-sanskrit);font-size:1.05rem;color:var(--text-sanskrit);margin-bottom:14px;line-height:2;">${verse.sanskrit?.split('\n')[0] || ''}</div>
        <div class="wisdom-verse">"${verse.translation}"</div>
        <div class="wisdom-source">Bhagavad Gita · ${entry.verse.replace('BG', '')}</div>
        ${verse.hindi ? `<div style="font-family:'Noto Serif Devanagari',serif;font-size:0.9rem;color:var(--text-muted);margin-bottom:16px;line-height:2;">${verse.hindi}</div>` : ''}
        <div class="wisdom-reflection">${entry.reflection}</div>
        <div style="display:flex;gap:12px;flex-wrap:wrap;align-items:center;">
          <span class="tag tag-gold">1 min read</span>
          <a href="chapter.html?ch=${chNum}&v=${vNum}" class="btn btn-outline" style="padding:10px 20px;font-size:0.82rem;">Read in Context →</a>
          <button class="btn btn-ghost" style="padding:10px 16px;font-size:0.82rem;" onclick="navigator.clipboard.writeText('${(verse.translation || '').replace(/'/g, "\\'")}').then(()=>showToast('📋 Verse copied'))">Share</button>
        </div>
      </div>`;
  });

  // Show skeleton while loading
  container.innerHTML = `
    <div class="wisdom-card" style="min-height:200px;display:flex;align-items:center;justify-content:center;">
      <div style="text-align:center;">
        <div style="font-family:var(--font-sanskrit);font-size:2.5rem;color:var(--gold);opacity:0.5;margin-bottom:12px;">ॐ</div>
        <div style="font-size:0.82rem;color:var(--text-muted);">Loading today's wisdom…</div>
      </div>
    </div>`;
}

/* ─── EMOTION SELECTOR ───────────────────────────────── */
function initEmotionSelector() {
  const grid = document.getElementById('emotion-cards'); if (!grid) return;
  if (!EMOTIONS?.length) return;

  grid.innerHTML = EMOTIONS.map(e => `
    <div class="emotion-card" data-emotion="${e.id}" tabindex="0" role="button" aria-label="I feel ${e.label}">
      <div class="emotion-icon">${e.icon}</div>
      <div class="emotion-name">${e.label}</div>
    </div>`).join('');

  const resultEl = document.getElementById('emotion-result');

  grid.querySelectorAll('.emotion-card').forEach(card => {
    card.addEventListener('click', async () => {
      grid.querySelectorAll('.emotion-card').forEach(c => c.classList.remove('active'));
      card.classList.add('active');

      const em = EMOTIONS.find(e => e.id === card.dataset.emotion);
      if (!em || !resultEl) return;

      resultEl.style.display = 'block';
      resultEl.innerHTML = `
        <div style="text-align:center;padding:40px 20px;">
          <div style="font-family:var(--font-sanskrit);font-size:2rem;color:var(--gold);opacity:0.6;margin-bottom:12px;">ॐ</div>
          <div style="font-size:0.85rem;color:var(--text-muted);">Finding guidance for ${em.label}…</div>
        </div>`;

      // Load verses from their chapters
      const verseData = [];
      for (const id of em.keyVerses) {
        const m = id.match(/BG(\d+)\.(\d+)/);
        if (!m) continue;
        const ch = await loadChapter(parseInt(m[1]));
        const v  = ch?.verses?.find(x => x.verse === parseInt(m[2]));
        if (v) verseData.push({ v, chNum: parseInt(m[1]), vNum: parseInt(m[2]), id });
      }

      resultEl.innerHTML = `
        <div>
          <div class="section-label" style="margin-bottom:16px;text-align:center;">Krishna's guidance for moments of ${em.label.toLowerCase()}</div>
          ${verseData.map(({ v, chNum, vNum }) => `
            <div class="verse-block" style="margin-bottom:12px;">
              <div class="verse-header" onclick="const b=this.nextElementSibling;b.classList.toggle('open');this.querySelector('.verse-toggle').textContent=b.classList.contains('open')?'−':'+'">
                <span class="verse-num">${chNum}.${vNum}</span>
                <span class="verse-preview">${(v.translation || '').slice(0, 72)}…</span>
                <button class="verse-toggle">+</button>
              </div>
              <div class="verse-body">
                <div class="verse-sanskrit">${(v.sanskrit || '').replace(/\n/g, '<br>')}</div>
                <div class="verse-transliteration">${(v.transliteration || '').slice(0, 200)}</div>
                <div class="verse-translation">${v.translation || ''}</div>
                ${v.hindi ? `<div style="font-family:'Noto Serif Devanagari',serif;font-size:0.88rem;color:var(--text-muted);padding:12px;margin-top:8px;background:rgba(244,216,122,0.03);border-radius:var(--radius-md);line-height:2;">${v.hindi}</div>` : ''}
                <a href="chapter.html?ch=${chNum}&v=${vNum}" style="display:inline-block;margin-top:12px;font-size:0.8rem;color:var(--gold);">Read full chapter →</a>
              </div>
            </div>`).join('')}
        </div>`;
      resultEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    });
  });
}

/* ─── SEARCH ─────────────────────────────────────────── */
function initSearch() {
  const input   = document.getElementById('search-input');
  const results = document.getElementById('search-results');
  if (!input || !results) return;
  let deb;
  input.addEventListener('input', () => { clearTimeout(deb); deb = setTimeout(() => doSearch(input.value.trim(), results), 250); });
  input.addEventListener('keydown', e => {
    if (e.key === 'Enter') doSearch(input.value.trim(), results);
    if (e.key === 'Escape') { input.value = ''; results.innerHTML = ''; }
  });
}

function doSearch(q, container) {
  if (!q || q.length < 2) { container.innerHTML = ''; return; }
  const ql = q.toLowerCase();
  const hits = [];

  GITA_DATA.chapters.forEach(ch => {
    if (ch.name.toLowerCase().includes(ql) || ch.summary.toLowerCase().includes(ql) || ch.theme.toLowerCase().includes(ql)) {
      hits.push({ type: 'chapter', icon: '📖', title: `Chapter ${ch.id}: ${ch.name}`, desc: ch.summary.slice(0, 110) + '…', href: `chapter.html?ch=${ch.id}` });
    }
  });

  THEMES?.forEach(t => {
    if (t.name.toLowerCase().includes(ql) || t.desc.toLowerCase().includes(ql)) {
      hits.push({ type: 'theme', icon: t.icon, title: t.name, desc: t.desc, href: `themes.html#${t.id}` });
    }
  });

  EMOTIONS?.forEach(e => {
    if (e.label.toLowerCase().includes(ql)) {
      hits.push({ type: 'emotion', icon: e.icon, title: `Feeling ${e.label}`, desc: 'Find verses for this emotion', href: 'index.html#emotion-cards' });
    }
  });

  const rc = document.getElementById('result-count');
  if (rc) rc.textContent = hits.length ? `${hits.length} result${hits.length !== 1 ? 's' : ''} for "${q}"` : '';

  container.innerHTML = hits.length
    ? hits.slice(0, 12).map(h => `
        <a href="${h.href}" class="search-result-item">
          <div class="result-type"><span class="tag tag-gold">${h.type}</span></div>
          <div class="result-info">
            <div class="result-title">${h.title}</div>
            <div class="result-desc">${h.desc}</div>
          </div>
          <div class="result-arrow">→</div>
        </a>`).join('')
    : `<div style="padding:48px;text-align:center;color:var(--text-muted);">No results for "<strong>${q}</strong>"<br><small>Try different keywords or browse by theme</small></div>`;
}

/* ─── AI COMPANION ───────────────────────────────────── */
class GitaCompanion {
  constructor() {
    this.input   = document.getElementById('chat-input');
    this.sendBtn = document.getElementById('chat-send');
    this.box     = document.getElementById('chat-messages');
    if (!this.input) return;
    this.bindEvents();
    this.addMsg('ai', 'Namaste 🙏 I am here to help you explore the Bhagavad Gita — all 701 verses across 18 chapters. Ask me to explain any verse (e.g. "2.47"), explore a teaching, or find guidance for what you are experiencing today.');
  }
  bindEvents() {
    this.sendBtn?.addEventListener('click', () => this.send());
    this.input?.addEventListener('keydown', e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); this.send(); } });
    document.querySelectorAll('.suggested-q').forEach(b => b.addEventListener('click', () => { this.input.value = b.dataset.q || b.textContent.trim(); this.send(); }));
  }
  send() {
    const text = this.input.value.trim(); if (!text) return;
    this.addMsg('user', text); this.input.value = ''; this.showTyping();
    const delay = 900 + Math.random() * 700;
    setTimeout(async () => {
      this.removeTyping();
      const response = await this.respond(text);
      this.addMsg('ai', response);
    }, delay);
  }
  async respond(q) {
    const ql = q.toLowerCase();
    // Verse lookup by number
    const m = q.match(/(?:bg\s*)?(\d+)[.:]\s*(\d+)/i);
    if (m) {
      const chN = parseInt(m[1]), vN = parseInt(m[2]);
      const ch  = await loadChapter(chN);
      const v   = ch?.verses?.find(x => x.verse === vN);
      if (v) return `📖 **${chN}.${vN}** — *${ch.name}*\n\n**Sanskrit:**\n${v.sanskrit?.split('\n').slice(0,2).join('\n') || ''}\n\n**Translation:** ${v.translation}\n\n${v.hindi ? `**Hindi:** ${v.hindi.slice(0,120)}\n\n` : ''}${v.wordMeaning ? `**Key words:** ${v.wordMeaning.slice(0,150)}…` : ''}`;
      return `I couldn't find verse ${chN}.${vN}. Check the chapter (1–18) and verse numbers.`;
    }
    if (ql.includes('karma') || ql.includes('action')) return `**Karma Yoga** — Chapters 3, 4, 5\n\nThe heart of Karma Yoga is **verse 2.47**: "You have a right to perform your prescribed duties, but you are not entitled to the fruits of your actions."\n\nKarma is not fate — it means *action*. Karma Yoga means acting fully, serving selflessly, then releasing the outcome. Full effort, zero ego-attachment to results.`;
    if (ql.includes('soul') || ql.includes('atman')) return `**The Eternal Soul** — Chapter 2\n\nVerse **2.20**: "The soul is never born nor dies. It is unborn, eternal, ever-existing. It is not slain when the body is slain."\n\nThe soul (Atman) is the witnessing consciousness within you — not the body, not the mind, not the thoughts. This is the Gita's most foundational teaching.`;
    if (ql.includes('anxiet') || ql.includes('stress') || ql.includes('worry')) return `**For Anxiety** — Chapters 2, 6\n\nKrishna maps the anxiety spiral in **2.62**: contemplation → attachment → craving → anger → confusion → destruction.\n\nThe antidote in **6.35**: "The mind is difficult to control — but possible through *abhyāsa* (practice) and *vairāgya* (non-attachment)."\n\nTen minutes of daily meditation, consistently, is worth more than one hour occasionally.`;
    if (ql.includes('fear')) return `**On Fear** — Chapter 2, 16\n\nFear arises from identifying with what is temporary. The Gita's deepest answer: know your true nature is eternal (2.20) and fear loses its grip.\n\nChapter 16 verse 1 begins the divine qualities list with *abhaya* — **fearlessness** — as the first and foremost virtue.`;
    if (ql.includes('grief') || ql.includes('loss') || ql.includes('death')) return `**On Grief** — Chapters 1, 2\n\nThe Gita was *born from grief*. Arjuna's collapse in Chapter 1 is not dismissed — it is honoured as the human reality that makes wisdom necessary.\n\n**2.22**: "As a person puts on new garments, giving up old ones, the soul similarly accepts new bodies." Grief is real. The Gita holds it alongside a larger truth.`;
    if (ql.includes('medit') || ql.includes('mind')) return `**Meditation** — Chapter 6: Dhyana Yoga\n\nKrishna's instruction:\n• Choose a clean, quiet place\n• Sit with spine erect, body still\n• Direct attention inward gently\n• When mind wanders (it will) — gently return\n\nArjuna says in **6.34**: "The mind is as difficult as controlling the wind."\nKrishna replies in **6.35**: "Yes — but it *can* be done through practice and detachment."`;
    if (ql.includes('purpose') || ql.includes('dharma') || ql.includes('meaning')) return `**On Purpose and Dharma** — Chapters 3, 18\n\nDharma is your unique, irreplaceable calling. Verse **3.35**: "Better is one's own dharma, though imperfectly performed, than the dharma of another well performed."\n\nThe Gita offers four paths depending on your temperament:\n• **Karma Yoga** — for the active (Ch 3–5)\n• **Jnana Yoga** — for the intellectual (Ch 4, 7, 13)\n• **Bhakti Yoga** — for the loving heart (Ch 9, 12)\n• **Dhyana Yoga** — for the meditator (Ch 6)`;
    if (ql.includes('summary') || ql.includes('overview') || ql.includes('chapters')) return `**18 Chapters — The Arc**\n\n**Ch 1:** Arjuna's grief on the battlefield\n**Ch 2:** The immortal soul; nishkama karma\n**Ch 3–5:** Karma Yoga — how to act without attachment\n**Ch 6:** Meditation — science of the mind\n**Ch 7–8:** Divine nature and eternal Brahman\n**Ch 9–10:** Devotion and divine manifestations\n**Ch 11:** The terrifying Universal Form\n**Ch 12:** Bhakti Yoga — the path of love\n**Ch 13–15:** Body, soul, three gunas, Supreme Self\n**Ch 16–17:** Divine vs demonic; nature of faith\n**Ch 18:** Complete conclusion — act and surrender`;
    const defaults = [
      "That's a sincere question. Could you tell me more about what you're navigating? I can then point to the most fitting verses.",
      "You can ask me to explain any verse directly — just type the number like '2.47' or '6.35'. What would you like to explore?",
      "The Gita has 701 verses across 18 chapters. What specific teaching or life situation would you like to explore?"
    ];
    return defaults[Math.floor(Math.random() * defaults.length)];
  }
  addMsg(role, text) {
    if (!this.box) return;
    const div = document.createElement('div');
    div.className = `message ${role}`;
    const fmt = text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/\n/g, '<br>');
    div.innerHTML = `<div class="message-avatar">${role === 'ai' ? '🪷' : '🙏'}</div><div class="message-bubble">${fmt}</div>`;
    this.box.appendChild(div);
    this.box.scrollTop = this.box.scrollHeight;
  }
  showTyping() {
    if (!this.box) return;
    const e = document.createElement('div');
    e.id = 'typing'; e.className = 'message ai';
    e.innerHTML = '<div class="message-avatar">🪷</div><div class="message-bubble"><div class="loading-dots"><span></span><span></span><span></span></div></div>';
    this.box.appendChild(e); this.box.scrollTop = this.box.scrollHeight;
  }
  removeTyping() { document.getElementById('typing')?.remove(); }
}

/* ─── THEME GRID ─────────────────────────────────────── */
function buildThemeGrid() {
  const g = document.getElementById('theme-grid'); if (!g || !THEMES) return;
  g.innerHTML = THEMES.map(t => `
    <div class="theme-card reveal" id="${t.id}">
      <div class="theme-card-top">
        <div class="theme-icon">${t.icon}</div>
        <div class="theme-card-title-wrap">
          <h4 class="theme-card-title">${t.name}</h4>
          <div class="theme-card-divider"></div>
        </div>
      </div>
      <p class="theme-card-desc">${t.desc}</p>
      <div class="theme-card-footer">
        <div class="theme-card-tags">${t.chapters.map(n => `<span class="theme-tag">Ch. ${n}</span>`).join('')}</div>
        <button class="theme-plus-btn" id="toggle-${t.id}" onclick="toggleTheme('${t.id}')">+</button>
      </div>
      <div class="theme-card-body" id="body-${t.id}" style="display:none;">
        <div style="display:flex;gap:10px;flex-wrap:wrap;">
          ${t.chapters.map(n => { const ch = GITA_DATA.chapters[n-1]; return ch ? `<a href="chapter.html?ch=${n}" class="btn btn-outline" style="padding:9px 18px;font-size:0.8rem;">Ch ${n}: ${ch.name} →</a>` : ''; }).join('')}
        </div>
      </div>
    </div>`).join('');
  initScrollReveal();
}

function toggleTheme(id) {
  const body = document.getElementById('body-' + id);
  const tog  = document.getElementById('toggle-' + id);
  if (!body) return;
  const open = body.style.display !== 'none';
  document.querySelectorAll('[id^="body-"]').forEach(b => { b.style.display = 'none'; const t = document.getElementById('toggle-' + b.id.replace('body-', '')); if (t) t.textContent = '+'; });
  if (!open) { body.style.display = 'block'; if (tog) tog.textContent = '−'; }
}

/* ─── STORY MODE ─────────────────────────────────────── */
function buildStoryMode() {
  const c = document.getElementById('story-container'); if (!c) return;
  const scenes = [
    { n:'01', title:'The Two Armies Assemble at Dawn', text:'On the vast plain of Kurukshetra — a sacred field where the Pandavas\' ancestors established righteousness — two enormous armies face each other. On one side: the Kauravas, led by the proud Duryodhana. On the other: the Pandavas, the rightful heirs. The ground trembles. The air smells of iron and incense.', sym:'Kurukshetra represents the battlefield of life itself — where every person faces the armies of their own attachments, fears, and desires.' },
    { n:'02', title:'Arjuna Rides Between the Armies', text:'Arjuna — the greatest archer of his age — asks Krishna to drive his white chariot between the two forces. He wants to see who he must fight. What he sees breaks him: his grandfather Bhishma, his teacher Drona, beloved brothers, cousins and friends. Men he has loved since childhood. Now arrayed against him.', sym:'Every great decision in life requires standing between two forces. Arjuna suspended between duty and love is every human facing a moral dilemma.' },
    { n:'03', title:'The Greatest Warrior Falls', text:'Arjuna\'s legs give way. His bow Gandiva slips from his fingers. His skin burns. His mind spins. He says words no one expected from the age\'s greatest warrior: "I will not fight." And he sits down on the floor of his chariot, weeping.', sym:'Arjuna\'s collapse is not weakness — it is the crisis that makes wisdom possible. Only when our usual strategies fail us do we truly open to learning.' },
    { n:'04', title:'The Teacher Begins to Speak', text:'Krishna — charioteer, friend, and the divine in human form — has watched Arjuna\'s breakdown with patient stillness. And now, gently, he begins. Not with commands or judgment. With the deep patient wisdom of one who has seen many such moments: "You grieve for those who should not be grieved for..."', sym:'Every person who has ever felt lost and overwhelmed is Arjuna. Every moment of sudden clarity, every teacher who illuminated the path — that is Krishna.' },
    { n:'05', title:'The Dialogue That Changed the World', text:'What follows is one of history\'s most extraordinary conversations — 701 verses across 18 chapters. Krishna addresses not just Arjuna\'s crisis but every question a human being can ask: Who am I? What is real? How should I act? What is death? What is liberation? Arjuna\'s doubts dissolve. He picks up his bow.', sym:'The Gita was spoken once on a battlefield 5000 years ago. But it speaks fresh to every person who opens it sincerely. The dialogue is always now.' },
  ];
  c.innerHTML = scenes.map((s, i) => {
    const art = typeof buildStoryArt === 'function' ? buildStoryArt(i) : '';
    return `
    <section class="story-section" data-scene="${s.n}">
      <div class="container"><div style="display:grid;grid-template-columns:1fr 1fr;gap:64px;align-items:center;" class="scene-grid">
        <div class="story-content">
          <div class="story-number reveal">${s.n}</div>
          <h2 class="story-title reveal">${s.title}</h2>
          <p class="story-text reveal">${s.text}</p>
          <div class="symbolism-box reveal"><div class="symbolism-label">Symbolic Meaning</div><p>${s.sym}</p></div>
        </div>
        <div class="reveal-right">${art}</div>
      </div></div>
    </section>
    <div style="display:flex;justify-content:center;padding:8px 0;"><div style="width:1px;height:60px;background:linear-gradient(to bottom,var(--gold),transparent);opacity:0.25;"></div></div>`;
  }).join('');
  initScrollReveal();

  const dots = document.querySelectorAll('.tl-dot');
  const obs  = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      e.target.classList.add('scene-visible');
      const idx = e.target.dataset.scene;
      dots.forEach(d => d.classList.toggle('active', d.dataset.scene === idx));
    });
  }, { threshold: 0.3 });
  document.querySelectorAll('[data-scene]').forEach(s => obs.observe(s));
}

/* ─── PARALLAX ───────────────────────────────────────── */
function initParallax() {
  let ticking = false;
  window.addEventListener('scroll', () => {
    if (ticking) return;
    requestAnimationFrame(() => {
      const sy = window.scrollY;
      document.querySelectorAll('[data-parallax]').forEach(el => {
        el.style.transform = `translateY(${sy * (parseFloat(el.dataset.parallax) || 0.4)}px)`;
      });
      ticking = false;
    });
    ticking = true;
  }, { passive: true });
}

/* ─── GLOBAL HELPERS ─────────────────────────────────── */
window.toggleTheme   = toggleTheme;
window.scrollToScene = idx => document.getElementById(`scene-${idx}`)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
window.askTopic = q => {
  const input = document.getElementById('chat-input'); if (!input) return;
  input.value = q; window._companion?.send();
  document.getElementById('chat-messages')?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
};
window.clearChat = () => {
  const b = document.getElementById('chat-messages'); if (!b) return;
  b.innerHTML = '';
  window._companion?.addMsg('ai', 'Cleared. What would you like to explore?');
};

/* ─── MAIN INIT ──────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  initNav();
  initScrollReveal();
  initReadingProgress();
  initParallax();
  createMandala(document.getElementById('mandala-svg'));

  const page = document.body.dataset.page;

  if (!page || page === 'home') {
    new ParticleSystem('particle-canvas');
    initDailyWisdom();
    buildChapterGrid('chapter-grid-home', 6);
    initEmotionSelector();
  }
  if (page === 'chapters')   buildChapterGrid('chapter-grid-full', 18);
  if (page === 'chapter')    buildChapterReader();
  if (page === 'story')      { new ParticleSystem('particle-canvas'); buildStoryMode(); }
  if (page === 'themes')     buildThemeGrid();
  if (page === 'companion')  window._companion = new GitaCompanion();
  if (page === 'search')     initSearch();
  if (page === 'wisdom')     initDailyWisdom();
});
