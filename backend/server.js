// ═══════════════════════════════════════════════════════════
//  BHAGAVAD GITA — BACKEND API SERVER
//  Node.js · Express · REST API
// ═══════════════════════════════════════════════════════════

const express    = require('express');
const cors       = require('cors');
const path       = require('path');
const rateLimit  = require('express-rate-limit');

const app  = express();
const PORT = process.env.PORT || 3000;

// ── Middleware ──────────────────────────────────────────
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '..')));

// Rate limiting — 200 requests per 15 min per IP
app.use('/api/', rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 200,
  message: { error: 'Too many requests. Please slow down.' }
}));

// ── Load Gita Data ──────────────────────────────────────
// Inline minimal data mirror for API (full data lives in assets/js/data.js for frontend)
const CHAPTERS_META = [
  { id:1,  name:"Arjuna Vishada Yoga",            sanskrit:"अर्जुन विषाद योग",       verseCount:47,  theme:"Grief & Despair",        tag:"Setting"    },
  { id:2,  name:"Sankhya Yoga",                   sanskrit:"सांख्य योग",              verseCount:72,  theme:"Wisdom & Soul",          tag:"Foundation" },
  { id:3,  name:"Karma Yoga",                     sanskrit:"कर्म योग",               verseCount:43,  theme:"Selfless Action",        tag:"Practice"   },
  { id:4,  name:"Jnana Yoga",                     sanskrit:"ज्ञान योग",               verseCount:42,  theme:"Knowledge",              tag:"Wisdom"     },
  { id:5,  name:"Karma Sannyas Yoga",             sanskrit:"कर्म संन्यास योग",        verseCount:29,  theme:"Renunciation",           tag:"Balance"    },
  { id:6,  name:"Dhyana Yoga",                    sanskrit:"ध्यान योग",               verseCount:47,  theme:"Meditation",             tag:"Practice"   },
  { id:7,  name:"Jnana Vijnana Yoga",             sanskrit:"ज्ञान विज्ञान योग",       verseCount:30,  theme:"Divine Nature",          tag:"Mysticism"  },
  { id:8,  name:"Aksara Brahma Yoga",             sanskrit:"अक्षर ब्रह्म योग",        verseCount:28,  theme:"Eternal & Perishable",   tag:"Transcendence" },
  { id:9,  name:"Raja Vidya Yoga",                sanskrit:"राज विद्या योग",          verseCount:34,  theme:"Devotion",               tag:"Bhakti"     },
  { id:10, name:"Vibhuti Yoga",                   sanskrit:"विभूति योग",              verseCount:42,  theme:"Divine Manifestations",  tag:"Glory"      },
  { id:11, name:"Vishwarupa Darshan Yoga",        sanskrit:"विश्वरूप दर्शन योग",      verseCount:55,  theme:"Cosmic Vision",          tag:"Revelation" },
  { id:12, name:"Bhakti Yoga",                    sanskrit:"भक्ति योग",               verseCount:20,  theme:"Pure Devotion",          tag:"Love"       },
  { id:13, name:"Kshetra Kshetrajna Yoga",        sanskrit:"क्षेत्र क्षेत्रज्ञ योग",  verseCount:35,  theme:"Body & Soul",            tag:"Philosophy" },
  { id:14, name:"Gunatraya Vibhaga Yoga",         sanskrit:"गुणत्रय विभाग योग",       verseCount:27,  theme:"Three Gunas",            tag:"Psychology" },
  { id:15, name:"Purushottama Yoga",              sanskrit:"पुरुषोत्तम योग",           verseCount:20,  theme:"Supreme Self",           tag:"Mysticism"  },
  { id:16, name:"Daivasura Sampada Vibhaga Yoga", sanskrit:"दैवासुर सम्पद विभाग योग", verseCount:24,  theme:"Divine & Demonic",       tag:"Ethics"     },
  { id:17, name:"Shraddhatraya Vibhaga Yoga",     sanskrit:"श्रद्धात्रय विभाग योग",   verseCount:28,  theme:"Threefold Faith",        tag:"Discernment"},
  { id:18, name:"Moksha Sannyas Yoga",            sanskrit:"मोक्ष संन्यास योग",        verseCount:78,  theme:"Liberation",             tag:"Conclusion" }
];

const DAILY_WISDOM = [
  { verse:"2.47", text:"You have a right to perform your prescribed duties, but you are not entitled to the fruits of your actions.",    reflection:"Today, give your best without needing a particular outcome." },
  { verse:"6.5",  text:"Elevate yourself by the power of your mind. The mind is the best friend and worst enemy of the self.",           reflection:"Notice today: is your mind your ally or your adversary?" },
  { verse:"9.26", text:"If one offers with love and devotion a leaf, a flower, a fruit or water — that pure offering is accepted.",      reflection:"What small act of genuine love can you offer today?" },
  { verse:"2.20", text:"The soul is never born nor dies. It is unborn, eternal, ever-existing. It is not slain when the body is slain.", reflection:"What would you do today if you truly believed you were eternal?" },
  { verse:"18.66",text:"Abandon all varieties of religion and just surrender unto Me. I shall deliver you. Do not fear.",                reflection:"Where can you release control and trust a deeper current today?" },
  { verse:"3.19", text:"Without attachment to results, one should act as a matter of duty — thereby one attains the Supreme.",           reflection:"Can you act today purely because it is the right thing to do?" },
  { verse:"12.15",text:"He by whom no one is put into difficulty and who is not disturbed by anyone is very dear to Me.",               reflection:"Can you be a calming, undisturbing presence for someone today?" },
];

// ── ROUTES ──────────────────────────────────────────────

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: '🪷 Bhagavad Gita API is running', version: '1.0.0' });
});

// GET /api/chapters — list all chapter metadata
app.get('/api/chapters', (req, res) => {
  const { tag, limit } = req.query;
  let chapters = CHAPTERS_META;
  if (tag) chapters = chapters.filter(c => c.tag.toLowerCase() === tag.toLowerCase());
  if (limit) chapters = chapters.slice(0, parseInt(limit));
  res.json({ count: chapters.length, chapters });
});

// GET /api/chapters/:id — single chapter metadata
app.get('/api/chapters/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const chapter = CHAPTERS_META.find(c => c.id === id);
  if (!chapter) return res.status(404).json({ error: 'Chapter not found', valid: '1–18' });
  res.json(chapter);
});

// GET /api/daily — today's wisdom
app.get('/api/daily', (req, res) => {
  const dayIdx = new Date().getDate() % DAILY_WISDOM.length;
  const wisdom = DAILY_WISDOM[dayIdx];
  const today  = new Date().toLocaleDateString('en-IN', { weekday:'long', year:'numeric', month:'long', day:'numeric' });
  res.json({ ...wisdom, date: today, readingTime: '1 min' });
});

// GET /api/random — random verse reference
app.get('/api/random', (req, res) => {
  const refs = [
    '2.47','2.20','2.22','6.5','6.35','9.26','12.13','18.66',
    '3.19','4.7','4.8','3.21','2.62','5.10','10.41','4.34'
  ];
  const ref  = refs[Math.floor(Math.random() * refs.length)];
  const [ch] = ref.split('.').map(Number);
  res.json({ ref, chapter: CHAPTERS_META[ch - 1], link: `/chapter.html?ch=${ch}&v=${ref}` });
});

// GET /api/search?q=karma&type=all — search
app.get('/api/search', (req, res) => {
  const { q, type = 'all', limit = 10 } = req.query;
  if (!q || q.trim().length < 2) return res.status(400).json({ error: 'Query must be at least 2 characters' });

  const query   = q.toLowerCase();
  const results = [];

  CHAPTERS_META.forEach(ch => {
    if ((type === 'all' || type === 'chapter') &&
        (ch.name.toLowerCase().includes(query) || ch.theme.toLowerCase().includes(query) || ch.tag.toLowerCase().includes(query))) {
      results.push({ type:'chapter', id:ch.id, title:`Chapter ${ch.id}: ${ch.name}`, theme:ch.theme, link:`/chapter.html?ch=${ch.id}` });
    }
  });

  const themes = ['Karma','Dharma','Devotion','Wisdom','Meditation','Detachment','Liberation','Soul','Duty','Fear','Peace','Courage','Grief','Purpose'];
  themes.forEach(t => {
    if ((type === 'all' || type === 'theme') && t.toLowerCase().includes(query)) {
      results.push({ type:'theme', title:t, link:`/themes.html#${t.toLowerCase()}` });
    }
  });

  res.json({ query: q, count: results.length, results: results.slice(0, parseInt(limit)) });
});

// GET /api/themes — list all themes
app.get('/api/themes', (req, res) => {
  const themes = [
    { id:'duty',        name:'Duty (Dharma)',     icon:'⚖️',  chapters:[1,2,3]   },
    { id:'karma',       name:'Karma',             icon:'🔄',  chapters:[3,4,5]   },
    { id:'devotion',    name:'Devotion (Bhakti)', icon:'🙏',  chapters:[9,12]    },
    { id:'wisdom',      name:'Wisdom (Jnana)',    icon:'📿',  chapters:[4,7,13]  },
    { id:'meditation',  name:'Meditation',        icon:'🧘',  chapters:[6]       },
    { id:'detachment',  name:'Detachment',        icon:'🍃',  chapters:[2,5]     },
    { id:'leadership',  name:'Leadership',        icon:'👑',  chapters:[3,18]    },
    { id:'courage',     name:'Courage',           icon:'🦁',  chapters:[2,16]    },
    { id:'peace',       name:'Inner Peace',       icon:'☮️',  chapters:[5,6,12]  },
    { id:'compassion',  name:'Compassion',        icon:'💝',  chapters:[12,16]   },
    { id:'time',        name:'Time & Eternity',   icon:'⏳',  chapters:[8,11]    }
  ];
  res.json({ count: themes.length, themes });
});

// GET /api/emotions — emotions with verse mappings
app.get('/api/emotions', (req, res) => {
  const emotions = [
    { id:'anxiety', label:'Anxiety', icon:'😰', keyVerses:['2.62','6.35','2.47'] },
    { id:'fear',    label:'Fear',    icon:'😨', keyVerses:['2.19','2.20','18.66'] },
    { id:'grief',   label:'Grief',   icon:'😢', keyVerses:['2.11','2.22','2.20']  },
    { id:'stress',  label:'Stress',  icon:'😓', keyVerses:['5.10','6.34','6.35']  },
    { id:'doubt',   label:'Doubt',   icon:'🤔', keyVerses:['2.47','6.5','18.45']  },
    { id:'purpose', label:'Purpose', icon:'🎯', keyVerses:['3.19','18.45','3.21'] },
    { id:'joy',     label:'Joy',     icon:'😊', keyVerses:['9.26','12.13','12.15']},
    { id:'courage', label:'Courage', icon:'⚡', keyVerses:['16.1','6.5','18.78']  },
    { id:'peace',   label:'Peace',   icon:'🕊️',keyVerses:['5.22','12.15','2.71'] },
  ];
  res.json({ count: emotions.length, emotions });
});

// GET /api/stats — general statistics
app.get('/api/stats', (req, res) => {
  res.json({
    chapters:    18,
    totalVerses: 700,
    years:       '5000+',
    themes:      12,
    yogaPaths:   4,
    languages:   ['Sanskrit', 'Hindi', 'English']
  });
});

// ── Serve index for all other routes (SPA fallback) ───
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'index.html'));
});

// ── Error handler ────────────────────────────────────
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal server error' });
});

// ── Start ────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`\n🪷  Bhagavad Gita Server running at http://localhost:${PORT}`);
  console.log(`📖  API available at http://localhost:${PORT}/api`);
  console.log(`🔍  Try: http://localhost:${PORT}/api/chapters`);
  console.log(`💡  Try: http://localhost:${PORT}/api/daily\n`);
});

module.exports = app;
