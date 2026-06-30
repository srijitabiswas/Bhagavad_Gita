# 🪷 Bhagavad Gita — Immersive Digital Experience

> **An interactive, and modern way to experience the timeless wisdom of the Bhagavad Gita.**

Instead of presenting the Gita as static text, this project transforms it into a visually immersive learning experience through storytelling, motion design, AI assistance, and thoughtful interactions—making its teachings accessible to modern audiences while preserving their depth and reverence.

---

## ✨ Live Demo

🔗 **Website:** *(Add your deployed link)*

🎥 **Demo Video:** *(Optional)*

---

## 📸 Preview

> Add screenshots or GIFs here.

* Landing Page
* Story Mode
* Chapter Reader
* Theme Explorer
* AI Companion
* Daily Wisdom

---

# 🌟 Highlights

* 📖 Complete chapter-based reading experience
* 🕉 Sanskrit, transliteration, translations, and explanations
* 🎬 Cinematic storytelling of the Kurukshetra narrative
* 🤖 AI Companion for asking questions about the Gita
* 🎯 Emotional Compass to discover verses based on feelings
* 🌿 Theme Explorer (Karma, Dharma, Meditation, Wisdom, Devotion, etc.)
* 📅 Daily Wisdom with reflections
* 🔖 Bookmark favorite verses
* 📝 Personal reflection journal
* 🔍 Instant search across chapters, verses, and themes
* 📱 Progressive Web App (PWA)
* 🌙 Beautiful Dark Mode
* ⚡ Smooth animations and page transitions

---

# 🎨 Experience

This project focuses on creating a premium user experience through:

* Smooth scrolling
* Cinematic transitions
* Elegant typography
* Rich motion design
* Subtle 3D effects
* Responsive layouts
* Accessibility-first design
* Mobile-friendly interactions

Every screen is designed to feel calm, immersive, and intentional.

---

# 🛠 Tech Stack

### Frontend

* React
* TypeScript
* Tailwind CSS
* Framer Motion
* GSAP
* Three.js / React Three Fiber

### Backend

* Node.js
* Express

### Features

* REST API
* Progressive Web App
* Local Storage
* Responsive Design
* Offline Support

---

# 📚 Features

## Story Mode

Experience the beginning of the Bhagavad Gita through an animated retelling of the Kurukshetra battlefield before exploring the teachings chapter by chapter.

---

## Chapter Reader

Every chapter includes:

* Sanskrit verses
* Transliteration
* Translation
* Explanations
* Reflection prompts
* Bookmarking
* Audio-ready architecture

---

## AI Companion

Ask questions naturally, such as:

> "What does the Gita say about anxiety?"

> "Explain Karma Yoga simply."

> "Recommend verses about courage."

---

## Theme Explorer

Explore teachings by concepts rather than chapters.

Examples include:

* Karma
* Dharma
* Devotion
* Leadership
* Meditation
* Discipline
* Detachment
* Wisdom
* Peace
* Courage

---

## Emotional Compass

Choose how you're feeling, and discover verses that may help provide perspective and guidance.

Examples:

* Stress
* Fear
* Anger
* Confusion
* Self-doubt
* Lack of motivation

---

## Daily Wisdom

Receive a thoughtfully presented verse each day with a simple explanation and practical takeaway.

---

## Personal Reflection Space

Users can:

* Save favorite verses
* Write personal reflections
* Track reading progress
* Build their own spiritual journal

---

# 🚀 Getting Started

```bash
git clone <repository-url>

cd bhagavad-gita

npm install

npm run dev
```

<<<<<<< HEAD
---

## 🚀 Quick Start (No Server Needed)

**Just open in a browser:**

```bash
# Option 1: Open directly
open index.html

# Option 2: Use any local server
npx serve .
# or
python3 -m http.server 8080
# then visit http://localhost:8080
```

That's it. The entire site runs as pure HTML/CSS/JS with no build step.

---

## 🖥 Backend API (Optional)

The backend adds REST API endpoints for chapters, search, and daily wisdom.

### Setup

```bash
cd backend
npm install
npm start
# Server starts at http://localhost:3000
```

### Development (auto-reload)

```bash
npm run dev
```

### API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/health` | Health check |
| GET | `/api/chapters` | All 18 chapters metadata |
| GET | `/api/chapters/:id` | Single chapter (1–18) |
| GET | `/api/daily` | Today's wisdom verse |
| GET | `/api/random` | Random verse reference |
| GET | `/api/search?q=karma` | Search across content |
| GET | `/api/themes` | All themes |
| GET | `/api/emotions` | Emotion → verse mappings |
| GET | `/api/stats` | General statistics |

#### Example Requests

```bash
# Get all chapters
curl http://localhost:3000/api/chapters

# Get Chapter 2
curl http://localhost:3000/api/chapters/2

# Get today's wisdom
curl http://localhost:3000/api/daily

# Search
curl "http://localhost:3000/api/search?q=karma&limit=5"
```

---

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

### Animation Classes

```html
<!-- Scroll reveal (auto) -->
<div class="reveal">Fades up on scroll</div>
<div class="reveal-left">Slides in from left</div>
<div class="reveal-right">Slides in from right</div>

<!-- Manual CSS classes -->
<div class="float">Gentle floating animation</div>
<div class="glow-card">Pulsing glow effect</div>
<div class="rotate-slow">30s continuous rotation</div>
<div class="text-shimmer">Gold shimmer text</div>
<div class="stagger">Children animate in sequence</div>
```

=======
>>>>>>> c41c27c7fb3f7b2620af9b967e92ff0e68936849
---

# 🎯 Future Roadmap

* Voice narration for every verse
* Multiple language support
* Reading streaks and achievements
* Interactive quizzes
* Verse comparison across translations

---

# 🙏 Philosophy

The Bhagavad Gita is one of humanity's most profound philosophical works.

This project aims to present its teachings through thoughtful design, immersive storytelling, and modern technology—helping readers engage with its wisdom in a respectful and accessible way.

---

## ⭐ If you enjoyed this project

Consider giving it a ⭐ on GitHub.

Feedback, suggestions, and contributions are always welcome.

---

**Built with curiosity, craftsmanship, and respect for timeless knowledge.**
