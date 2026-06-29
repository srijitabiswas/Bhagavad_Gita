// ═══════════════════════════════════════════════════════════
//  BHAGAVAD GITA — CHAPTER & STORY ART
//  Real artwork layered beneath translucent colour gradients,
//  so every chapter keeps its identity colour while showing
//  a beautiful, relatable picture. Falls back gracefully if
//  an image fails to load (gradient alone still looks great).
// ═══════════════════════════════════════════════════════════

const IMG_PATH = "assets/images/photos/";

// 10 curated photos, each with a hand-picked focal position so
// faces/subjects never get cropped out on wide letterbox cards.
// Cycles automatically across all 18 chapters.
const PHOTO_POOL = [
  { file: "warrior-grief-silhouette.jpg", pos: "center 15%" },
  { file: "krishna-flute-glow.jpg",       pos: "center 18%" },
  { file: "krishna-arjuna-clouds.jpg",    pos: "center 22%" },
  { file: "krishna-teaching-arjuna.jpg",  pos: "center 35%" },
  { file: "cavalry-charge.jpg",           pos: "center 15%" },
  { file: "krishna-arjuna-horses.jpg",    pos: "center 20%" },
  { file: "krishna-cosmic-circle.jpg",    pos: "center 40%" },
  { file: "krishna-wheel-bhishma.jpg",    pos: "center 16%" },
  { file: "krishna-bhishma-sunset.jpg",   pos: "center 28%" },
  { file: "kurukshetra-battlefield.jpg",  pos: "center 35%" },
];

const CHAPTER_ART = [
  { gradient: "linear-gradient(135deg, #2D0A12 0%, #8B1C2E 50%, #C9A84C 100%)", symbol: "ॐ",  label: "Arjuna's Sorrow",       accent: "#E06070" },
  { gradient: "linear-gradient(135deg, #1A1500 0%, #6B4800 50%, #C9A84C 100%)", symbol: "ज्ञ", label: "The Eternal Soul",      accent: "#E8C860" },
  { gradient: "linear-gradient(135deg, #1A0C00 0%, #8B4A00 50%, #E8921A 100%)", symbol: "क",  label: "Selfless Action",       accent: "#F4A840" },
  { gradient: "linear-gradient(135deg, #161000 0%, #5A4000 50%, #D4AF37 100%)", symbol: "य",  label: "Divine Knowledge",      accent: "#F4D87A" },
  { gradient: "linear-gradient(135deg, #001A0A 0%, #0A4A20 50%, #4A7C59 100%)", symbol: "सं", label: "Renunciation",          accent: "#6BAD82" },
  { gradient: "linear-gradient(135deg, #0A0020 0%, #2A0A6B 50%, #6B48C7 100%)", symbol: "ध",  label: "Meditation",            accent: "#9B78E8" },
  { gradient: "linear-gradient(135deg, #0A0020 0%, #200A5A 50%, #5B3DA8 100%)", symbol: "विज्", label: "Divine Wisdom",       accent: "#8B68D8" },
  { gradient: "linear-gradient(135deg, #000A1A 0%, #0A2A5A 50%, #1E4A8A 100%)", symbol: "अ",  label: "The Imperishable",      accent: "#4A8ACA" },
  { gradient: "linear-gradient(135deg, #1A0010 0%, #6B0A30 50%, #D4526A 100%)", symbol: "भ",  label: "Royal Knowledge",       accent: "#E87090" },
  { gradient: "linear-gradient(135deg, #150020 0%, #4A0A6B 50%, #7B3FA0 100%)", symbol: "वि",  label: "Divine Glories",        accent: "#B070D0" },
  { gradient: "linear-gradient(135deg, #1A0800 0%, #6B2800 50%, #C45C0A 100%)", symbol: "वि",  label: "Cosmic Form",           accent: "#E8801A" },
  { gradient: "linear-gradient(135deg, #1A0010 0%, #6B0A30 50%, #D4526A 100%)", symbol: "भ",  label: "Pure Devotion",         accent: "#FF8099" },
  { gradient: "linear-gradient(135deg, #001018 0%, #0A3050 50%, #3A6B8A 100%)", symbol: "क्ष",  label: "Field & Its Knower",  accent: "#5A9BBA" },
  { gradient: "linear-gradient(135deg, #0A0800 0%, #3A2800 50%, #8A5C20 100%)", symbol: "गु",  label: "Three Gunas",           accent: "#C08040" },
  { gradient: "linear-gradient(135deg, #001A0A 0%, #0A4A20 50%, #4A7C59 100%)", symbol: "पु",  label: "Supreme Person",        accent: "#6BAD82" },
  { gradient: "linear-gradient(135deg, #1A0000 0%, #5A0A0A 50%, #8A2020 100%)", symbol: "दे",  label: "Divine & Demonic",      accent: "#E04050" },
  { gradient: "linear-gradient(135deg, #0A0800 0%, #3A2800 50%, #6A4520 100%)", symbol: "श्र",  label: "Threefold Faith",      accent: "#A07040" },
  { gradient: "linear-gradient(135deg, #1A1200 0%, #6B4800 50%, #C9A84C 100%)", symbol: "मो", label: "Liberation",            accent: "#E8C860" },
];

// Story art for each scene
const STORY_ART = [
  { gradient: "linear-gradient(160deg, #050410 0%, #0D0B1A 40%, #1A0A15 100%)", symbol: "ॐ",  label: "The sacred field of Kurukshetra at dawn" },
  { gradient: "linear-gradient(160deg, #0A0008 0%, #1A0A20 40%, #3A1440 100%)", symbol: "रथ", label: "The divine white chariot of Arjuna" },
  { gradient: "linear-gradient(160deg, #100005 0%, #280A10 40%, #5A1428 100%)", symbol: "वि",  label: "The warrior's grief on the battlefield" },
  { gradient: "linear-gradient(160deg, #080010 0%, #14082A 40%, #281850 100%)", symbol: "कृ",  label: "Krishna begins the eternal teaching" },
  { gradient: "linear-gradient(160deg, #100800 0%, #28180A 40%, #503010 100%)", symbol: "गी",  label: "The dialogue that changed the world" },
];

// Real photo to match each story scene (own curated picks + positions)
const STORY_PHOTOS = [
  { file: "kurukshetra-battlefield.jpg", pos: "center 35%" },
  { file: "krishna-arjuna-clouds.jpg",   pos: "center 22%" },
  { file: "warrior-grief-silhouette.jpg",pos: "center 15%" },
  { file: "krishna-teaching-arjuna.jpg", pos: "center 35%" },
  { file: "krishna-wheel-bhishma.jpg",   pos: "center 16%" },
];

// Build chapter art element — real photo + colour-tinted overlay + shade for legibility
function buildChapterArt(chId, height = "190px", showLabel = true) {
  const art = CHAPTER_ART[(chId - 1) % CHAPTER_ART.length];
  const photo = PHOTO_POOL[(chId - 1) % PHOTO_POOL.length];
  return `
    <div class="chapter-art" style="height:${height};">
      <div class="art-photo" style="background-image:url('${IMG_PATH}${photo.file}');background-position:${photo.pos};"></div>
      <div class="art-overlay" style="background:${art.gradient};"></div>
      <div class="art-shade"></div>
      <div class="chapter-art-symbol" style="color:${art.accent};">${art.symbol}</div>
      <div class="chapter-art-num">${String(chId).padStart(2,'0')}</div>
      ${showLabel ? `<div class="chapter-art-label">${art.label}</div>` : ''}
    </div>`;
}

// Build story art element — real photo + colour-tinted overlay + shade for legibility
function buildStoryArt(idx) {
  const art = STORY_ART[idx % STORY_ART.length];
  const photo = STORY_PHOTOS[idx % STORY_PHOTOS.length];
  return `
    <div class="story-art">
      <div class="art-photo" style="background-image:url('${IMG_PATH}${photo.file}');background-position:${photo.pos};"></div>
      <div class="art-overlay" style="background:${art.gradient};"></div>
      <div class="art-shade"></div>
      <div class="story-art-symbol">${art.symbol}</div>
      <div class="story-art-label">${art.label}</div>
    </div>`;
}

// Hero chapter card art for index page
function buildHeroChapterArt(chId) {
  return buildChapterArt(chId, "150px", false);
}
