// ═══════════════════════════════════════════════════════════
//  BHAGAVAD GITA — METADATA (lean, fast-loading ~20KB)
//  Full verse data loaded per-chapter from assets/data/chN.json
// ═══════════════════════════════════════════════════════════

const GITA_DATA = {
  "chapters": [
  {
    "id": 1,
    "name": "Arjuna Vishada Yoga",
    "sanskrit": "अर्जुन विषाद योग",
    "meaning": "The Yoga of Arjuna's Grief",
    "theme": "Grief & Despair",
    "tag": "Setting",
    "summary": "On the battlefield of Kurukshetra, Arjuna sees his kinsmen arrayed against him and is overcome by grief. He lays down his bow and refuses to fight, triggering the entire dialogue.",
    "keyTeaching": "Acknowledging sorrow is not weakness — it is the beginning of spiritual inquiry.",
    "keyWords": [
      "dharma",
      "sorrow",
      "kinsmen",
      "duty",
      "confusion"
    ],
    "color": "#9B1C2E",
    "verseCount": 47
  },
  {
    "id": 2,
    "name": "Sankhya Yoga",
    "sanskrit": "सांख्य योग",
    "meaning": "The Yoga of Knowledge",
    "theme": "Wisdom & Soul",
    "tag": "Foundation",
    "summary": "Krishna begins teaching by explaining the immortality of the soul, distinguishing it from the temporary body. He introduces Nishkama Karma and the concept of the Sthitaprajna — the person of steady wisdom.",
    "keyTeaching": "The soul is eternal; the body is temporary. Act without attachment to results.",
    "keyWords": [
      "atman",
      "karma",
      "nishkama",
      "sthitaprajna",
      "immortality"
    ],
    "color": "#C9A84C",
    "verseCount": 72
  },
  {
    "id": 3,
    "name": "Karma Yoga",
    "sanskrit": "कर्म योग",
    "meaning": "The Yoga of Action",
    "theme": "Selfless Action",
    "tag": "Practice",
    "summary": "Krishna explains why action is necessary and how to perform it without attachment. He introduces Yajna (sacrifice) and warns against inaction, establishing that every person must act according to their nature.",
    "keyTeaching": "Act for the welfare of the world, not for personal gain. Inaction is itself a form of action.",
    "keyWords": [
      "yajna",
      "sacrifice",
      "nature",
      "duty",
      "selfless"
    ],
    "color": "#E8921A",
    "verseCount": 43
  },
  {
    "id": 4,
    "name": "Jnana Karma Sanyasa Yoga",
    "sanskrit": "ज्ञान कर्म संन्यास योग",
    "meaning": "The Yoga of Divine Knowledge",
    "theme": "Knowledge & Action",
    "tag": "Wisdom",
    "summary": "Krishna reveals his divine nature and explains how knowledge destroys karma. He describes the different kinds of sacrifice and declares that wisdom is the supreme purifier.",
    "keyTeaching": "Wisdom burns all karma. Even the worst sinner crosses the ocean of sin by the boat of knowledge.",
    "keyWords": [
      "knowledge",
      "reincarnation",
      "teacher",
      "jnana",
      "purification"
    ],
    "color": "#F4D87A",
    "verseCount": 42
  },
  {
    "id": 5,
    "name": "Karma Sanyasa Yoga",
    "sanskrit": "कर्म संन्यास योग",
    "meaning": "The Yoga of Action and Renunciation",
    "theme": "Renunciation",
    "tag": "Balance",
    "summary": "Krishna reconciles the paths of action and renunciation, showing that both lead to liberation. True renunciation is not abandoning work but abandoning attachment to results.",
    "keyTeaching": "The true renunciant acts fully in the world, untouched by outcomes.",
    "keyWords": [
      "renunciation",
      "liberation",
      "detachment",
      "brahman",
      "peace"
    ],
    "color": "#4A7C59",
    "verseCount": 29
  },
  {
    "id": 6,
    "name": "Dhyana Yoga",
    "sanskrit": "ध्यान योग",
    "meaning": "The Yoga of Meditation",
    "theme": "Meditation & Mind",
    "tag": "Practice",
    "summary": "Krishna gives detailed practical guidance on meditation — posture, environment, diet, and technique. He consoles Arjuna that no sincere spiritual effort is ever lost.",
    "keyTeaching": "The mind is the best friend and the worst enemy of the self. Train it through daily practice.",
    "keyWords": [
      "meditation",
      "mind",
      "self-control",
      "practice",
      "yoga"
    ],
    "color": "#6B48C7",
    "verseCount": 47
  },
  {
    "id": 7,
    "name": "Jnana Vijnana Yoga",
    "sanskrit": "ज्ञान विज्ञान योग",
    "meaning": "The Yoga of Knowledge and Wisdom",
    "theme": "Divine Nature",
    "tag": "Mysticism",
    "summary": "Krishna reveals that he is the source of all creation and that everything rests in him. He describes his lower nature (material) and higher nature (spiritual).",
    "keyTeaching": "Among thousands who seek, few truly find. Among those who find, fewer still truly know.",
    "keyWords": [
      "divine",
      "maya",
      "manifestation",
      "prakriti",
      "devotees"
    ],
    "color": "#5B3DA8",
    "verseCount": 30
  },
  {
    "id": 8,
    "name": "Aksara Brahma Yoga",
    "sanskrit": "अक्षर ब्रह्म योग",
    "meaning": "The Yoga of the Imperishable Absolute",
    "theme": "Eternal & Perishable",
    "tag": "Transcendence",
    "summary": "Krishna explains the nature of the Supreme, the process of death and rebirth, and what a yogi thinks of at the moment of death.",
    "keyTeaching": "Whatever one remembers at the moment of death, that state one attains.",
    "keyWords": [
      "death",
      "liberation",
      "memory",
      "brahman",
      "afterlife"
    ],
    "color": "#1E4A8A",
    "verseCount": 28
  },
  {
    "id": 9,
    "name": "Raja Vidya Raja Guhya Yoga",
    "sanskrit": "राज विद्या राज गुह्य योग",
    "meaning": "The Yoga of Royal Knowledge",
    "theme": "Devotion & Knowledge",
    "tag": "Bhakti",
    "summary": "Krishna reveals the most secret and sacred knowledge — Bhakti Yoga (the path of devotion). He declares that even the most sinful person can cross the ocean of sin through devotion.",
    "keyTeaching": "Even if you are the most sinful of all sinners, you can cross the ocean of sin by the boat of devotional service.",
    "keyWords": [
      "devotion",
      "bhakti",
      "worship",
      "surrender",
      "grace"
    ],
    "color": "#D4526A",
    "verseCount": 34
  },
  {
    "id": 10,
    "name": "Vibhuti Yoga",
    "sanskrit": "विभूति योग",
    "meaning": "The Yoga of Divine Manifestations",
    "theme": "Divine Manifestations",
    "tag": "Glory",
    "summary": "Krishna enumerates his divine manifestations — he is the best, the greatest, and the source of all excellence in every domain.",
    "keyTeaching": "Whatever is glorious, beautiful, and powerful — know that it comes from a fragment of My splendor.",
    "keyWords": [
      "manifestations",
      "excellence",
      "glory",
      "vibhuti",
      "divine"
    ],
    "color": "#7B3FA0",
    "verseCount": 42
  },
  {
    "id": 11,
    "name": "Vishwarupa Darshan Yoga",
    "sanskrit": "विश्वरूप दर्शन योग",
    "meaning": "The Vision of the Universal Form",
    "theme": "Cosmic Vision",
    "tag": "Revelation",
    "summary": "Krishna grants Arjuna divine sight to behold the Universal Form — the cosmos itself as God's body. Arjuna sees all of creation within a single divine form, and is both awed and terrified.",
    "keyTeaching": "Reality in its totality is divine. Time and eternity are one. All things are held within one presence.",
    "keyWords": [
      "universal form",
      "cosmic",
      "vision",
      "terror",
      "awe"
    ],
    "color": "#C45C0A",
    "verseCount": 55
  },
  {
    "id": 12,
    "name": "Bhakti Yoga",
    "sanskrit": "भक्ति योग",
    "meaning": "The Yoga of Devotion",
    "theme": "Pure Devotion",
    "tag": "Love",
    "summary": "The shortest and most beloved chapter. Krishna describes the ideal devotee and why Bhakti (devotion) is the easiest and most direct path to liberation.",
    "keyTeaching": "The devotee who practices these qualities is dear to Me. Fix the mind on Me and you will abide in Me.",
    "keyWords": [
      "devotee",
      "qualities",
      "equanimity",
      "contentment",
      "surrender"
    ],
    "color": "#D4526A",
    "verseCount": 20
  },
  {
    "id": 13,
    "name": "Kshetra Kshetrajna Vibhaga Yoga",
    "sanskrit": "क्षेत्र क्षेत्रज्ञ विभाग योग",
    "meaning": "The Yoga of the Field and Its Knower",
    "theme": "Body, Soul & Nature",
    "tag": "Philosophy",
    "summary": "Krishna explains the distinction between the 'field' (body and material existence) and the 'knower of the field' (the soul or consciousness).",
    "keyTeaching": "I am in all bodies as the Knower of the Field. To know both the field and the knower is true wisdom.",
    "keyWords": [
      "body",
      "soul",
      "consciousness",
      "kshetra",
      "wisdom"
    ],
    "color": "#3A6B8A",
    "verseCount": 35
  },
  {
    "id": 14,
    "name": "Gunatraya Vibhaga Yoga",
    "sanskrit": "गुणत्रय विभाग योग",
    "meaning": "The Yoga of the Three Qualities",
    "theme": "Three Gunas",
    "tag": "Psychology",
    "summary": "Krishna explains the three gunas — Tamas (inertia), Rajas (passion), and Sattva (purity) — and how they govern all mental and physical states.",
    "keyTeaching": "All beings are governed by the three gunas. Go beyond the gunas to reach liberation.",
    "keyWords": [
      "sattva",
      "rajas",
      "tamas",
      "gunas",
      "nature"
    ],
    "color": "#8A5C20",
    "verseCount": 27
  },
  {
    "id": 15,
    "name": "Purushottama Yoga",
    "sanskrit": "पुरुषोत्तम योग",
    "meaning": "The Yoga of the Supreme Person",
    "theme": "The Supreme Self",
    "tag": "Mysticism",
    "summary": "Using the metaphor of an inverted Ashvattha tree, Krishna describes the nature of the Supreme Person who is beyond both the perishable and the imperishable.",
    "keyTeaching": "I am the Supreme Person — beyond the perishable and the imperishable. Knowing Me truly, one worships with full devotion.",
    "keyWords": [
      "supreme",
      "tree of life",
      "perishable",
      "imperishable",
      "cosmic"
    ],
    "color": "#4A7C59",
    "verseCount": 20
  },
  {
    "id": 16,
    "name": "Daivasura Sampada Vibhaga Yoga",
    "sanskrit": "दैवासुर सम्पद विभाग योग",
    "meaning": "The Yoga of Divine and Demonic Qualities",
    "theme": "Divine vs Demonic Nature",
    "tag": "Ethics",
    "summary": "Krishna describes two types of qualities — divine (daivī) and demonic (āsurī) — and clearly enumerates the characteristics of each.",
    "keyTeaching": "Fear not — you were born with divine qualities. Cultivate them. Abandon arrogance, ego, and cruelty.",
    "keyWords": [
      "divine",
      "demonic",
      "qualities",
      "liberation",
      "bondage"
    ],
    "color": "#8A2020",
    "verseCount": 24
  },
  {
    "id": 17,
    "name": "Shraddhatraya Vibhaga Yoga",
    "sanskrit": "श्रद्धात्रय विभाग योग",
    "meaning": "The Yoga of the Threefold Faith",
    "theme": "Faith & Practice",
    "tag": "Discernment",
    "summary": "Krishna classifies faith, food, sacrifice, austerity, and charity according to the three gunas — showing how even sacred practices can be sattvic, rajasic, or tamasic.",
    "keyTeaching": "Whatever is done without faith is of no value in this life or the next.",
    "keyWords": [
      "faith",
      "food",
      "sacrifice",
      "austerity",
      "charity"
    ],
    "color": "#6A4520",
    "verseCount": 28
  },
  {
    "id": 18,
    "name": "Moksha Sanyasa Yoga",
    "sanskrit": "मोक्ष संन्यास योग",
    "meaning": "The Yoga of Liberation and Renunciation",
    "theme": "Liberation & Surrender",
    "tag": "Conclusion",
    "summary": "The longest and final chapter. Krishna gives his ultimate conclusion — surrender to him completely and be free. He summarises all teachings and Arjuna's doubts dissolve.",
    "keyTeaching": "Abandon all varieties of religion and just surrender unto Me. I shall deliver you from all sinful reactions. Do not fear.",
    "keyWords": [
      "surrender",
      "liberation",
      "conclusion",
      "grace",
      "action"
    ],
    "color": "#C9A84C",
    "verseCount": 78
  }
]
};


// ── Emotions → Verse Mappings ─────────────────────────
const EMOTIONS = [
  { id:"anxiety", icon:"😰", label:"Anxiety",      keyVerses:["BG2.62","BG6.35","BG2.47","BG2.14","BG6.5"] },
  { id:"fear",    icon:"😨", label:"Fear",          keyVerses:["BG2.19","BG2.20","BG18.66","BG16.1","BG2.11"] },
  { id:"anger",   icon:"😠", label:"Anger",         keyVerses:["BG2.62","BG2.63","BG3.37","BG16.21","BG5.26"] },
  { id:"doubt",   icon:"🤔", label:"Self-Doubt",    keyVerses:["BG2.47","BG6.5","BG18.45","BG4.40","BG3.35"] },
  { id:"stress",  icon:"😓", label:"Stress",        keyVerses:["BG5.10","BG6.34","BG6.35","BG2.47","BG3.19"] },
  { id:"grief",   icon:"😢", label:"Grief",         keyVerses:["BG2.11","BG2.22","BG2.20","BG2.19","BG2.13"] },
  { id:"purpose", icon:"🎯", label:"Purpose",       keyVerses:["BG3.19","BG18.45","BG3.21","BG3.35","BG4.7"] },
  { id:"joy",     icon:"😊", label:"Joy",           keyVerses:["BG9.26","BG12.13","BG12.15","BG5.21","BG6.28"] },
  { id:"courage", icon:"⚡", label:"Courage",       keyVerses:["BG16.1","BG16.2","BG6.5","BG18.78","BG11.33"] },
  { id:"peace",   icon:"🕊️", label:"Peace",        keyVerses:["BG5.22","BG12.15","BG2.71","BG6.7","BG18.62"] }
];

// ── Themes ────────────────────────────────────────────
const THEMES = [
  { id:"duty",       icon:"⚖️",  name:"Duty (Dharma)",     desc:"On acting rightly in one's role",      chapters:[1,2,3]    },
  { id:"karma",      icon:"🪷",  name:"Karma Yoga",        desc:"The law of cause and effect",          chapters:[3,4,5]    },
  { id:"devotion",   icon:"🙏",  name:"Devotion (Bhakti)", desc:"The path of love and surrender",       chapters:[9,12]     },
  { id:"wisdom",     icon:"📖",  name:"Wisdom (Jnana)",    desc:"Knowledge that liberates",             chapters:[4,7,13]   },
  { id:"meditation", icon:"🧘",  name:"Meditation",        desc:"Techniques for stilling the mind",     chapters:[6]        },
  { id:"detachment", icon:"🍃",  name:"Detachment",        desc:"Freedom from results and outcomes",    chapters:[2,5]      },
  { id:"nature",     icon:"🌳",  name:"Nature (Prakriti)", desc:"The material world and its laws",      chapters:[13,14]    },
  { id:"leadership", icon:"👑",  name:"Leadership",        desc:"Leading by example and service",       chapters:[3,18]     },
  { id:"courage",    icon:"🦁",  name:"Courage",           desc:"Fearlessness rooted in truth",         chapters:[2,16]     },
  { id:"peace",      icon:"☮️",  name:"Inner Peace",       desc:"The way to unshakeable calm",          chapters:[5,6,12]   },
  { id:"compassion", icon:"💝",  name:"Compassion",        desc:"Care for all living beings",           chapters:[12,16]    },
  { id:"time",       icon:"⏳",  name:"Time & Eternity",   desc:"The nature of temporal existence",     chapters:[8,11]     }
];

// ── Daily Wisdom (rotates by day of month) ───────────
const DAILY_WISDOM = [
  { verse:"BG2.47",  reflection:"Today, give your best without needing a particular outcome." },
  { verse:"BG6.5",   reflection:"Notice today: is your mind your ally or your adversary?" },
  { verse:"BG9.26",  reflection:"What small act of genuine love can you offer today?" },
  { verse:"BG2.20",  reflection:"What would you do today if you truly believed you were eternal?" },
  { verse:"BG18.66", reflection:"Where can you release control and trust a deeper current today?" },
  { verse:"BG3.19",  reflection:"Can you act today purely because it is the right thing to do?" },
  { verse:"BG12.15", reflection:"Can you be a calming, undisturbing presence for someone today?" },
  { verse:"BG2.22",  reflection:"What 'old garment' might you be clinging to that no longer fits?" },
  { verse:"BG4.7",   reflection:"Where in your world do you see darkness giving way to light?" },
  { verse:"BG6.35",  reflection:"Try ten minutes of meditation today. The mind can be trained." },
  { verse:"BG10.41", reflection:"Find one moment of beauty today and recognise the divine in it." },
  { verse:"BG5.10",  reflection:"Act fully today, but hold the result lightly — like a lotus leaf." },
  { verse:"BG16.1",  reflection:"Which of the divine qualities listed here can you cultivate today?" },
  { verse:"BG4.34",  reflection:"Who is a teacher in your life right now? What are they offering?" },
  { verse:"BG13.2",  reflection:"Today, practise observing your thoughts rather than being them." },
  { verse:"BG2.14",  reflection:"What temporary discomfort can you tolerate with more equanimity today?" },
  { verse:"BG3.21",  reflection:"Someone is watching how you handle difficulty. What are you showing them?" },
  { verse:"BG9.22",  reflection:"Do you trust that what you genuinely need will come when you align with your purpose?" },
  { verse:"BG14.5",  reflection:"Which guna is dominant in you today — Sattva, Rajas, or Tamas?" },
  { verse:"BG18.78", reflection:"Where wisdom and courageous action meet, there is victory." },
  { verse:"BG2.62",  reflection:"Notice what you are giving sustained attention to. Is it pulling you toward peace or away from it?" },
  { verse:"BG7.8",   reflection:"Find the divine in the ordinary today — the taste of water, the warmth of sun." },
  { verse:"BG11.32", reflection:"What in your life is being transformed by time right now?" },
  { verse:"BG6.40",  reflection:"No sincere effort is wasted. Trust your practice even when you cannot see the progress." },
  { verse:"BG12.13", reflection:"Choose one of these qualities today and practise it consciously all day." },
  { verse:"BG15.1",  reflection:"Where are your roots? What nourishes and sustains your deepest self?" },
  { verse:"BG3.8",   reflection:"What have you been postponing? Today is the day to begin." },
  { verse:"BG17.3",  reflection:"What do you truly believe? And is your life aligned with that belief?" },
  { verse:"BG8.7",   reflection:"Whatever you do today, try doing it as an offering to something larger than yourself." },
  { verse:"BG5.22",  reflection:"Which pleasures are you pursuing that are temporary? Is there a deeper satisfaction available?" },
  { verse:"BG18.63", reflection:"The Gita ends with freedom. Today, make your choices consciously and without fear." }
];

// Helper: look up verse from full data
function getVerseByID(id) {
  const [bg, chStr, vStr] = id.split(/(\d+)\.\s*(\d+)/).filter(Boolean);
  // Try parsing BGX.Y format
  const match = id.match(/BG(\d+)\.(\d+)/);
  if (!match) return null;
  const chNum  = parseInt(match[1]);
  const vNum   = parseInt(match[2]);
  const chapter = GITA_DATA.chapters.find(c => c.id === chNum);
  if (!chapter) return null;
  return chapter.verses.find(v => v.verse === vNum) || null;
}

