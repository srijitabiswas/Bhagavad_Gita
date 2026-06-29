// ═══════════════════════════════════════════════════════════
//  BHAGAVAD GITA — ADVANCED ANIMATIONS
//  Lotus · Stars · Transitions · Magnetic · Kinetic Type
// ═══════════════════════════════════════════════════════════

/* ─── STARFIELD BACKGROUND ───────────────────────────── */
class Starfield {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    this.ctx    = this.canvas.getContext('2d');
    this.stars  = [];
    this.resize();
    this.createStars();
    window.addEventListener('resize', () => { this.resize(); this.createStars(); });
    this.animate();
  }

  resize() {
    this.canvas.width  = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  createStars() {
    this.stars = [];
    const count = Math.floor((this.canvas.width * this.canvas.height) / 6000);
    for (let i = 0; i < count; i++) {
      this.stars.push({
        x:       Math.random() * this.canvas.width,
        y:       Math.random() * this.canvas.height,
        r:       Math.random() * 1.2 + 0.2,
        alpha:   Math.random() * 0.8 + 0.1,
        twinkle: Math.random() * Math.PI * 2,
        speed:   Math.random() * 0.02 + 0.005
      });
    }
  }

  animate() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.stars.forEach(s => {
      s.twinkle += s.speed;
      const a = s.alpha * (0.5 + 0.5 * Math.sin(s.twinkle));
      this.ctx.beginPath();
      this.ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      this.ctx.fillStyle = `rgba(255, 240, 200, ${a})`;
      this.ctx.fill();
    });
    requestAnimationFrame(() => this.animate());
  }
}

/* ─── LOTUS BLOOM ANIMATION ──────────────────────────── */
class LotusBloom {
  constructor(svgId, petalCount = 8) {
    this.svg    = document.getElementById(svgId);
    this.petals = petalCount;
    if (!this.svg) return;
    this.draw();
  }

  draw() {
    const ns = 'http://www.w3.org/2000/svg';
    const cx = 100, cy = 100, r = 60;

    // Layers of petals
    [1, 0.7, 0.45].forEach((scale, layer) => {
      const layerR = r * scale;
      for (let i = 0; i < this.petals; i++) {
        const angle = (i / this.petals) * Math.PI * 2 - Math.PI / 2;
        const offset = layer * (Math.PI / this.petals);
        const px = cx + Math.cos(angle + offset) * layerR * 0.5;
        const py = cy + Math.sin(angle + offset) * layerR * 0.5;

        const petal = document.createElementNS(ns, 'ellipse');
        petal.setAttribute('cx', px);
        petal.setAttribute('cy', py);
        petal.setAttribute('rx', layerR * 0.28);
        petal.setAttribute('ry', layerR * 0.5);
        petal.setAttribute('fill', `hsla(${340 + layer * 10}, 60%, ${60 + layer * 10}%, 0.7)`);
        petal.setAttribute('stroke', 'rgba(201,168,76,0.3)');
        petal.setAttribute('stroke-width', '0.5');
        petal.setAttribute('transform',
          `rotate(${(angle + offset) * 180 / Math.PI + 90}, ${px}, ${py})`);
        petal.style.transformOrigin = `${cx}px ${cy}px`;
        petal.style.animation = `lotus-petal-${layer} ${1.5 + layer * 0.3}s ease ${i * 0.08}s both`;
        this.svg.appendChild(petal);
      }
    });

    // Centre
    const centre = document.createElementNS(ns, 'circle');
    centre.setAttribute('cx', cx);
    centre.setAttribute('cy', cy);
    centre.setAttribute('r', r * 0.18);
    centre.setAttribute('fill', '#E8C860');
    centre.style.animation = 'lotus-centre 0.8s ease 1s both';
    this.svg.appendChild(centre);
  }
}

/* ─── KINETIC TEXT REVEAL ────────────────────────────── */
class KineticText {
  constructor(selector) {
    this.elements = document.querySelectorAll(selector);
    this.wrap();
    this.observe();
  }

  wrap() {
    this.elements.forEach(el => {
      const words = el.textContent.split(' ');
      el.innerHTML = words.map((w, i) =>
        `<span class="kt-word" style="display:inline-block;overflow:hidden;vertical-align:bottom;">
           <span class="kt-inner" style="display:inline-block;transform:translateY(110%);transition:transform 0.6s cubic-bezier(0.22,1,0.36,1) ${i * 0.08}s;">${w}</span>
         </span> `
      ).join('');
    });
  }

  observe() {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (!e.isIntersecting) return;
        e.target.querySelectorAll('.kt-inner').forEach(span => {
          span.style.transform = 'translateY(0)';
        });
        obs.unobserve(e.target);
      });
    }, { threshold: 0.2 });
    this.elements.forEach(el => obs.observe(el));
  }
}

/* ─── MAGNETIC BUTTON ────────────────────────────────── */
function initMagneticButtons(selector = '.btn-primary') {
  document.querySelectorAll(selector).forEach(btn => {
    btn.addEventListener('mousemove', e => {
      const rect = btn.getBoundingClientRect();
      const dx   = (e.clientX - rect.left - rect.width  / 2) * 0.25;
      const dy   = (e.clientY - rect.top  - rect.height / 2) * 0.25;
      btn.style.transform = `translate(${dx}px, ${dy}px)`;
    });
    btn.addEventListener('mouseleave', () => {
      btn.style.transform   = '';
      btn.style.transition  = 'transform 0.5s cubic-bezier(0.22,1,0.36,1)';
      setTimeout(() => { btn.style.transition = ''; }, 500);
    });
  });
}

/* ─── PARALLAX LAYERS ────────────────────────────────── */
function initParallaxLayers() {
  const layers = [
    { selector: '.parallax-slow',   speed: 0.2  },
    { selector: '.parallax-medium', speed: 0.5  },
    { selector: '.parallax-fast',   speed: 0.8  },
    { selector: '[data-parallax]',  speed: null  }
  ];

  let ticking = false;
  window.addEventListener('scroll', () => {
    if (ticking) return;
    requestAnimationFrame(() => {
      const sy = window.scrollY;
      layers.forEach(({ selector, speed }) => {
        document.querySelectorAll(selector).forEach(el => {
          const s = speed ?? parseFloat(el.dataset.parallax ?? 0.5);
          el.style.transform = `translateY(${sy * s}px)`;
        });
      });
      ticking = false;
    });
    ticking = true;
  });
}

/* ─── SMOOTH PAGE TRANSITIONS ────────────────────────── */
function initPageTransitions() {
  // Create overlay
  const overlay = document.createElement('div');
  overlay.id = 'page-transition-overlay';
  overlay.style.cssText = `
    position:fixed; inset:0; z-index:9998;
    background:var(--bg-void);
    pointer-events:none;
    opacity:0;
    transition:opacity 0.4s ease;
  `;
  document.body.appendChild(overlay);

  // Fade in on load
  window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    requestAnimationFrame(() => {
      document.body.style.transition = 'opacity 0.5s ease';
      document.body.style.opacity    = '1';
    });
  });

  // Intercept internal links
  document.addEventListener('click', e => {
    const a = e.target.closest('a');
    if (!a) return;
    const href = a.getAttribute('href');
    if (!href || href.startsWith('#') || href.startsWith('http') || href.startsWith('mailto')) return;
    if (a.target === '_blank') return;

    e.preventDefault();
    overlay.style.opacity = '1';
    overlay.style.pointerEvents = 'all';
    setTimeout(() => { window.location.href = href; }, 380);
  });
}

/* ─── SCROLL PROGRESS CIRCLE ─────────────────────────── */
function initScrollProgressCircle() {
  const existing = document.getElementById('scroll-progress-circle');
  if (existing || window.innerWidth < 768) return;

  const el = document.createElement('div');
  el.id = 'scroll-progress-circle';
  el.style.cssText = `
    position:fixed; bottom:80px; right:28px; width:44px; height:44px;
    z-index:400; cursor:pointer; opacity:0; transition:opacity 0.3s ease;
  `;
  el.innerHTML = `
    <svg viewBox="0 0 44 44" style="transform:rotate(-90deg)">
      <circle cx="22" cy="22" r="18" fill="none" stroke="var(--border)" stroke-width="2"/>
      <circle id="spc-ring" cx="22" cy="22" r="18" fill="none"
        stroke="var(--gold)" stroke-width="2"
        stroke-dasharray="113" stroke-dashoffset="113"
        stroke-linecap="round" style="transition:stroke-dashoffset 0.15s linear;"/>
    </svg>
    <div style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;font-size:0.6rem;color:var(--gold);font-family:var(--font-sanskrit);">↑</div>`;
  document.body.appendChild(el);

  const ring = document.getElementById('spc-ring');
  const circumference = 2 * Math.PI * 18;

  window.addEventListener('scroll', () => {
    const pct     = window.scrollY / (document.body.scrollHeight - window.innerHeight);
    const offset  = circumference * (1 - pct);
    ring.style.strokeDashoffset = offset;
    el.style.opacity = window.scrollY > 200 ? '1' : '0';
  });

  el.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

/* ─── CURSOR GLOW ────────────────────────────────────── */
function initCursorGlow() {
  if (window.matchMedia('(pointer: coarse)').matches) return; // skip touch devices
  const cursor = document.createElement('div');
  cursor.id    = 'cursor-glow';
  cursor.style.cssText = `
    position:fixed; width:300px; height:300px; border-radius:50%;
    pointer-events:none; z-index:0; mix-blend-mode:screen;
    background:radial-gradient(circle, rgba(201,168,76,0.04) 0%, transparent 70%);
    transform:translate(-50%,-50%);
    transition:opacity 0.3s ease;
    opacity:0;
  `;
  document.body.appendChild(cursor);

  window.addEventListener('mousemove', e => {
    cursor.style.left    = e.clientX + 'px';
    cursor.style.top     = e.clientY + 'px';
    cursor.style.opacity = '1';
  });
  window.addEventListener('mouseleave', () => { cursor.style.opacity = '0'; });
}

/* ─── VERSE CARD TILT ────────────────────────────────── */
function initCardTilt(selector = '.card') {
  if (window.matchMedia('(pointer: coarse)').matches) return;
  document.querySelectorAll(selector).forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x    = (e.clientX - rect.left) / rect.width  - 0.5;
      const y    = (e.clientY - rect.top)  / rect.height - 0.5;
      card.style.transform = `perspective(600px) rotateX(${-y * 4}deg) rotateY(${x * 4}deg) translateY(-4px)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform   = '';
      card.style.transition  = 'transform 0.5s cubic-bezier(0.22,1,0.36,1)';
      setTimeout(() => { card.style.transition = ''; }, 500);
    });
  });
}

/* ─── COUNTER ANIMATION ──────────────────────────────── */
function countUp(el, target, duration = 1800) {
  const start     = performance.now();
  const startVal  = 0;
  const isDecimal = String(target).includes('.');

  const step = (now) => {
    const elapsed = Math.min((now - start) / duration, 1);
    const ease    = 1 - Math.pow(1 - elapsed, 4); // easeOutQuart
    const current = startVal + (target - startVal) * ease;
    el.textContent = isDecimal
      ? current.toFixed(1)
      : Math.floor(current).toLocaleString('en-IN');
    if (elapsed < 1) requestAnimationFrame(step);
    else el.textContent = isDecimal ? target.toFixed(1) : target.toLocaleString('en-IN');
  };
  requestAnimationFrame(step);
}

/* ─── TYPEWRITER EFFECT ──────────────────────────────── */
function typewrite(el, text, speed = 40) {
  el.textContent = '';
  let i = 0;
  const cursor = document.createElement('span');
  cursor.textContent = '|';
  cursor.style.cssText = 'animation:blink-cursor 0.7s step-end infinite;color:var(--gold);';
  el.appendChild(cursor);

  const interval = setInterval(() => {
    if (i < text.length) {
      cursor.insertAdjacentText('beforebegin', text[i++]);
    } else {
      clearInterval(interval);
      setTimeout(() => cursor.remove(), 1000);
    }
  }, speed);
}

/* ─── LOADING SCREEN ─────────────────────────────────── */
function showLoadingScreen() {
  const loader = document.createElement('div');
  loader.id = 'page-loader';
  loader.style.cssText = `
    position:fixed; inset:0; background:var(--bg-void);
    z-index:99999; display:flex; flex-direction:column;
    align-items:center; justify-content:center; gap:24px;
  `;
  loader.innerHTML = `
    <div style="font-family:'Noto Serif Devanagari',serif;font-size:4rem;color:var(--gold);
      animation:loader-pulse 1.5s ease-in-out infinite;">ॐ</div>
    <div style="font-family:'Cormorant Garamond',serif;font-size:1.1rem;color:var(--text-muted);
      letter-spacing:0.2em;">Loading Sacred Text…</div>
    <div style="width:200px;height:2px;background:var(--bg-card);border-radius:2px;overflow:hidden;">
      <div id="loader-bar" style="height:100%;background:var(--gold);border-radius:2px;
        animation:loader-progress 1.8s ease-in-out forwards;"></div>
    </div>`;
  document.body.appendChild(loader);

  const style = document.createElement('style');
  style.textContent = `
    @keyframes loader-pulse { 0%,100%{transform:scale(1);opacity:1} 50%{transform:scale(1.1);opacity:0.7} }
    @keyframes loader-progress { from{width:0} to{width:100%} }
    @keyframes blink-cursor { 0%,100%{opacity:1} 50%{opacity:0} }`;
  document.head.appendChild(style);

  window.addEventListener('load', () => {
    setTimeout(() => {
      loader.style.transition = 'opacity 0.5s ease';
      loader.style.opacity    = '0';
      setTimeout(() => loader.remove(), 500);
    }, 600);
  });
}

/* ─── MANDALA INTERACTIVE HOVER ──────────────────────── */
function initInteractiveMandala(svgId) {
  const svg = document.getElementById(svgId);
  if (!svg) return;
  svg.addEventListener('mousemove', e => {
    const rect   = svg.getBoundingClientRect();
    const dx     = (e.clientX - rect.left  - rect.width  / 2) / rect.width;
    const dy     = (e.clientY - rect.top   - rect.height / 2) / rect.height;
    const rotate = Math.atan2(dy, dx) * (180 / Math.PI);
    svg.style.transform       = `translateY(-50%) rotate(${rotate * 0.2}deg) scale(1.03)`;
    svg.style.transitionDuration = '0.1s';
  });
  svg.addEventListener('mouseleave', () => {
    svg.style.transitionDuration = '0.8s';
    svg.style.transform          = 'translateY(-50%) rotate(0deg) scale(1)';
  });
}

/* ─── CSS KEYFRAMES injection ────────────────────────── */
function injectKeyframes() {
  if (document.getElementById('gita-anim-styles')) return;
  const style = document.createElement('style');
  style.id = 'gita-anim-styles';
  style.textContent = `
    @keyframes lotus-petal-0 { from{opacity:0;transform:scale(0) rotate(-20deg)} to{opacity:0.7;transform:scale(1) rotate(0)} }
    @keyframes lotus-petal-1 { from{opacity:0;transform:scale(0) rotate(20deg)}  to{opacity:0.7;transform:scale(1) rotate(0)} }
    @keyframes lotus-petal-2 { from{opacity:0;transform:scale(0)}               to{opacity:0.8;transform:scale(1)} }
    @keyframes lotus-centre  { from{opacity:0;transform:scale(0)}               to{opacity:1;transform:scale(1)} }

    @keyframes shimmer {
      0%   { background-position: -200% center; }
      100% { background-position: 200% center; }
    }
    .text-shimmer {
      background: linear-gradient(90deg, var(--gold) 25%, var(--gold-bright) 50%, var(--gold) 75%);
      background-size: 200% auto;
      -webkit-background-clip: text;
      background-clip: text;
      -webkit-text-fill-color: transparent;
      animation: shimmer 3s linear infinite;
    }

    @keyframes float-gentle {
      0%,100% { transform: translateY(0px); }
      50%     { transform: translateY(-12px); }
    }
    .float { animation: float-gentle 4s ease-in-out infinite; }

    @keyframes glow-pulse {
      0%,100% { box-shadow: 0 0 20px rgba(201,168,76,0.1); }
      50%     { box-shadow: 0 0 40px rgba(201,168,76,0.3), 0 0 80px rgba(201,168,76,0.1); }
    }
    .glow-card { animation: glow-pulse 3s ease-in-out infinite; }

    @keyframes rotate-slow { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
    .rotate-slow { animation: rotate-slow 30s linear infinite; }

    @keyframes fade-up {
      from { opacity:0; transform:translateY(24px); }
      to   { opacity:1; transform:translateY(0); }
    }
    .fade-up { animation: fade-up 0.7s ease both; }

    /* Stagger children */
    .stagger > * { animation: fade-up 0.6s ease both; }
    .stagger > *:nth-child(1) { animation-delay: 0s; }
    .stagger > *:nth-child(2) { animation-delay: 0.1s; }
    .stagger > *:nth-child(3) { animation-delay: 0.2s; }
    .stagger > *:nth-child(4) { animation-delay: 0.3s; }
    .stagger > *:nth-child(5) { animation-delay: 0.4s; }
    .stagger > *:nth-child(6) { animation-delay: 0.5s; }
  `;
  document.head.appendChild(style);
}

/* ─── INIT ALL ANIMATIONS ────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  injectKeyframes();
  initMagneticButtons('.btn-primary');
  initMagneticButtons('.btn-outline');
  initParallaxLayers();
  initScrollProgressCircle();
  initCursorGlow();
  initCardTilt('.card');
  initPageTransitions();
  initInteractiveMandala('mandala-svg');

  // Apply shimmer to gold headings if they have .shimmer class
  document.querySelectorAll('.text-shimmer').forEach(el => el.classList.add('text-shimmer'));

  // CountUp for stat numbers
  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const el     = e.target;
      const target = parseFloat(el.dataset.target);
      if (!isNaN(target)) countUp(el, target);
      observer.unobserve(el);
    });
  }, { threshold: 0.5 });

  document.querySelectorAll('.stat-number[data-target]').forEach(el => observer.observe(el));

  // Kinetic text for marked headings
  if (document.querySelectorAll('.kinetic').length) {
    new KineticText('.kinetic');
  }
});

/* Export for manual use */
window.GitaAnims = {
  Starfield, LotusBloom, KineticText,
  countUp, typewrite, showLoadingScreen,
  initMagneticButtons, initParallaxLayers,
  initScrollProgressCircle, initCursorGlow,
  initCardTilt, initPageTransitions
};
