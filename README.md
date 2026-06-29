# 🪷 Bhagavad Gita — Immersive Digital Experience

A world-class, cinematic, fully interactive web experience that transforms reading the Bhagavad Gita into an engaging journey.

---

## ✨ Features

| Feature | Description |
|---|---|
| **All 18 Chapters** | Sanskrit · Transliteration · Translation · Commentary |
| **Verse Explorer** | Expand/collapse, bookmark, copy every verse |
| **AI Companion** | Ask any question about the Gita's teachings |
| **Story Mode** | Animated narrative of the Kurukshetra setting |
| **Theme Explorer** | Browse Karma · Devotion · Wisdom · Meditation & more |
| **Emotional Compass** | Find verses by what you're feeling right now |
| **Daily Wisdom** | A new verse + reflection every single day |
| **My Reflections** | Save verses, write notes, track reading progress |
| **Search** | Instant full-text search across chapters, verses, themes |
| **PWA Ready** | Install on mobile, works offline |
| **REST API** | Backend API for chapters, daily wisdom, search |

---

## 🗂 Project Structure

```
bhagavad-gita/
│
├── index.html          ← Landing page
├── chapters.html       ← All 18 chapters grid
├── chapter.html        ← Individual chapter reader (dynamic)
├── story.html          ← Interactive story mode
├── themes.html         ← Theme explorer
├── wisdom.html         ← Daily wisdom
├── companion.html      ← AI chat guide
├── search.html         ← Full-text search
├── reflections.html    ← Journal, bookmarks, progress
├── 404.html            ← Custom error page
│
├── manifest.json       ← PWA manifest
├── sw.js               ← Service worker (offline support)
│
├── assets/
│   ├── css/
│   │   └── style.css           ← Complete design system
│   ├── js/
│   │   ├── data.js             ← All Gita content (18 chapters)
│   │   ├── app.js              ← Core app logic + AI companion
│   │   └── animations.js       ← Advanced animation system
│   └── images/
│       ├── icon-192.svg
│       └── icon-512.svg
│
└── backend/
    ├── server.js       ← Express REST API
    └── package.json    ← Node.js dependencies
```

## 🎨 Design System

### Color Palette

| Token | Value | Usage |
|---|---|---|
| `--bg-void` | `#050410` | Page background |
| `--bg-deep` | `#0A0820` | Section backgrounds |
| `--bg-card` | `#100E2A` | Cards |
| `--gold` | `#C9A84C` | Accents, CTAs |
| `--gold-bright` | `#E8C860` | Hover states |
| `--crimson` | `#9B1C2E` | Chapter 1 accent |
| `--saffron` | `#E8921A` | Chapter 3 accent |
| `--sage` | `#4A7C59` | Positive states |
| `--text-primary` | `#EDE5D0` | Headings |
| `--text-secondary` | `#B8AE96` | Body text |
| `--text-muted` | `#6E6554` | Captions |

### Typography

- **Display**: `Cormorant Garamond` — elegant serif for headings
- **Body**: `Lato` — clean sans-serif for content
- **Sanskrit**: `Noto Serif Devanagari` — authentic Devanagari script
---

## 📱 PWA Installation

Users can install this as a native-like app:

1. Visit the site in Chrome/Safari
2. Chrome: Click ⋮ → "Install app"
3. Safari: Tap Share → "Add to Home Screen"

**Offline support**: All pages and assets cached after first visit.

---

## 🤖 AI Companion

The AI Guide (`companion.html`) uses an intelligent response system built into `assets/js/app.js`. It handles:

- **Verse lookup** — type any verse number like `2.47`
- **Concept explanations** — "What is Karma Yoga?"
- **Emotional guidance** — "I'm feeling anxious"
- **Life application** — "How does this apply to work stress?"
- **Chapter summaries** — "Summarise all 18 chapters"

To connect to a real LLM (optional), replace the `generateResponse()` method in `app.js` with an API call to Anthropic, OpenAI, or any provider.

---

## 🔖 Local Storage Keys

All user data is stored locally (no account needed):

| Key | Contents |
|---|---|
| `bookmarks` | Array of bookmarked verse IDs |
| `gita-progress` | Object of `{chapterId: timestamp}` |
| `gita-notes` | Array of reflection note objects |
| `gita-wisdom-visits` | Object of `{date: true}` for streaks |

---

## 📖 Content Notes

All Sanskrit text, transliterations, and English translations in this project are drawn from public domain sources and freely available scholarly editions of the Bhagavad Gita. The content is presented with reverence and educational intent.

Recommended for deeper study:
- *Bhagavad Gita As It Is* — A.C. Bhaktivedanta Swami Prabhupada
- *The Bhagavad Gita* — Eknath Easwaran
- *Srimad Bhagavad Gita* — Swami Sivananda

---

## 🛠 Browser Support

| Browser | Support |
|---|---|
| Chrome 90+ | ✅ Full |
| Firefox 88+ | ✅ Full |
| Safari 14+ | ✅ Full |
| Edge 90+ | ✅ Full |
| Mobile Chrome | ✅ Full |
| Mobile Safari | ✅ Full |

---

## 🙏 Acknowledgement

*ॐ तत् सत्* — "That is truth."

The Bhagavad Gita belongs to all humanity. This project is offered in the spirit of making its timeless wisdom more accessible, beautiful, and alive for the modern world.

---

*Built with reverence · Presented with love · Designed for seekers*
