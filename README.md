# 🌿 Be the Imam: Steps of Muḥammad ﷺ

**Nusantara Edition**

> *A provenance engine for Islamic supplications, recitations, and remembrances 〜 built so that every word you say in prayer has a traceable home.*

---

## 🎯 What This Is

**Be the Imam: Steps of Muḥammad ﷺ** is a living archive of duʿā, dhikr, ḥadīth, Qurʾānic verses, and scholarly compilations 〜 rendered word-by-word in Arabic, English, and transliteration, with every page traceable to its canonical source.

It is **not** another devotional app.

It is a **tafakkur tool** 〜 a place where you can:

- 📖 Recite a duʿā with the Arabic, English, and transliteration visible together
- 🔍 See exactly which ḥadīth collection it comes from, and what grade scholars have given it
- 📚 Read the original Arabic chain of transmission (isnād) if you want to verify
- 🪞 Understand the meaning of every word 〜 not just the gist
- ⚖️ Know honestly when a practice is widely transmitted but theologically contested

---

## 🪔 Why This Exists

In Southeast Asia (and much of the Muslim world), we inherit many practices through forefathers, mashāyikh, ḥabīb-figures, and folk transmission. Some of these are firmly rooted in the Sunnah of the Prophet ﷺ. Others are scholarly compilations of authentic material. Others are folk practices of uncertain or contested origin.

The problem is not that these practices exist. The problem is that **most of us cannot tell which is which** 〜 and so we recite without knowing what we are saying, where it came from, or whether the Prophet ﷺ would recognize it as his sunnah.

This project exists to answer one question for every word you recite:

> **"Where does this come from, and can you stand before Allah and say you knew what you were doing?"**

It is built on three commitments:

1. **Honest provenance** 〜 every page shows its source and grade. No dressed-up folk material posing as authentic ḥadīth.
2. **Word-by-word access** 〜 every Arabic word is paired with its English meaning, so understanding doesn't require fluency.
3. **Scholarly humility** 〜 we present the chain of transmission and the scholarly grading. We don't paper over weakness. We don't elevate fabrications. We trust users with the truth.

---

## 🧭 Methodology 〜 Provenance, Then Authorship

Every file in this archive goes through two phases:

### Phase 1 〜 Sourcing (the provenance work)

Before authoring anything, we verify:
- The canonical source (sunnah.com, quran.com, recognized ḥadīth databases)
- The scholarly grading (Ṣaḥīḥ, Ḥasan, Ḍaʿīf, Mawḍūʿ, or Mutawātir)
- The original Arabic text with proper tashkeel
- Any embedded Qurʾānic references that need to be sourced separately
- Whether the practice is contested by reputable scholars

This is the most important work in the project. It is what makes the archive trustworthy.

### Phase 2 〜 Authoring (the translation work)

Once sourced, we render the content into the project's word-stack markdown format. This involves:
- Word-by-word Arabic segmentation
- English glosses for each word
- Academic transliteration with diacritics
- Semantic clause chunking
- Cross-referenced verse insertion (when ḥadīth mentions Qurʾānic verses)

The word-by-word work is itself a form of tafakkur for the author. We do not outsource it.

---

## 📜 Stance on Contested Practices

We take a **balanced** approach:

- Authentic content is presented as such, with confidence.
- Weak (Ḍaʿīf) content widely accepted in adhkār tradition is presented with its honest grading and a note about scholarly tradition (e.g., the *tasāhul* principle for virtues).
- Fabricated (Mawḍūʿ) content is not propagated.
- Contested practices (e.g., tawassul through deceased persons, folk invocations) get a clear note flagging the scholarly debate, presenting both sides fairly, and letting the reader decide.

We do not preach. We present. The reader carries their own accountability.

---

## 👥 Who This Is For

- **The everyday Muslim** who wants to know what they're saying when they pray
- **The Arabic learner** building neural links between Arabic words and meaning
- **The student of knowledge** verifying chains of transmission
- **The cautious worshipper** trying to distinguish sunnah from folk addition
- **The archivist** preserving Islamic devotional content with scholarly integrity
- **The teacher** preparing materials for halaqah or family study

---

## 🚀 Using the Live App

Visit the main page (`index.html`). You'll see categories like:

- 📿 **Tahlīl Collections** 〜 compilations recited as remembrance gatherings
- 🕌 **After Ṣalāh** 〜 prophetic duʿās for after every prayer
- 💎 **Heart Shakers** 〜 duʿās for anchoring and alignment
- 🛡️ **Morning & Evening Shields** 〜 daily adhkār
- ⚙️ **Path of Work** 〜 duʿās for daily occupational life
- 🌙 **Ṣalawāt** 〜 sending peace and blessings upon the Prophet ﷺ
- 💧 **Duʿā for Healing** 〜 restorative supplications
- 🌾 **Sacred Months** 〜 practices specific to Rajab, Shaʿbān, Ramaḍān, Dhū al-Ḥijjah
- 🧪 **In Review** 〜 recently added content pending validation

Click any category to expand its items. Click any item to open its dedicated page.

### Once inside a page

Every page has the same structure:

1. **Pokémon-card header** at the top 〜 shows narrator, source, grade (color-coded badge)
2. **English narration** 〜 the canonical translation as published
3. **Original Arabic source dropdown** (collapsed) 〜 for scholarly verification
4. **Word-by-word section** 〜 the main recitation content
5. **Verify link** at the bottom 〜 direct to canonical source

### Reading Modes

In the top-right, switch between:

| Mode | What you see | When to use |
|---|---|---|
| **Arabic-first** | Arabic + English (translit hidden) | Daily recitation |
| **Learner** | Arabic + English + transliteration | Active study |
| **Verbal** | Transliteration prominent, Arabic faded | Pronunciation practice |
| **Arabic-only** | Pure large Arabic | Memorization, recitation drill |

Your mode preference is saved across sessions.

---

## 🛠️ Contributing

If you want to add content, fix translations, improve transliterations, or migrate legacy material:

1. Read [`AUTHORING_GUIDE.md`](docs/AUTHORING_GUIDE.md) 〜 the complete technical guide
2. Pick a content type and complexity level you're comfortable with
3. Follow the source-then-author workflow
4. Run the quality checklist before committing
5. Open a pull request

We welcome contributions from anyone who shares the commitment to honest provenance.

---

## 📂 Repository Structure

```
├── index.html            ← The app: Action view, Library, Qalb
├── manifest.json, sw.js  ← PWA install + offline cache
├── web/                  ← Scripts and pages the app loads
│   ├── render.html       ← Renders one card (any .md file)
│   ├── preview.html      ← Card builder: paste markdown, preview it
│   ├── nav-data.js       ← Library menu (the list of cards)
│   ├── default-plan.js   ← Default Action-view plan, hour by hour
│   ├── qalb-data.js      ← Qalb view groupings
│   ├── sun-clock.js      ← Prayer times from the sun's position
│   └── …                 ← Hijri calendar, moon, tips, plan editor
├── content/              ← Every card, one .md file each
│   ├── 01-dua/ … 07-tahleel/   ← Grouped by section
│   ├── kalima/           ← Glossary entries (tap-a-word notes)
│   └── _unlisted/        ← Cards no screen links to yet
├── docs/                 ← Guides for authors (see below)
├── tools/                ← Maintenance scripts
├── assets/, fonts/       ← Images, icons, Uthmani font
└── README.md
```

### 📚 Docs

| File | What it is for |
|---|---|
| [docs/AUTHORING_GUIDE.md](docs/AUTHORING_GUIDE.md) | The full reference for writing a card: format, features, sourcing, checks. Also opens in the app under Documentation. |
| [docs/DRAFT_PROMPT.md](docs/DRAFT_PROMPT.md) | The LLM prompt that turns a raw source into a first-draft card for you to verify. |
| [docs/TIME_CATEGORISATION.md](docs/TIME_CATEGORISATION.md) | The Prophetic Clock: the eleven time windows and where each duʿā sits. Also opens in the app. |
| [docs/CHANGE_PLAYBOOK.md](docs/CHANGE_PLAYBOOK.md) | Rollout plan for masjid pilots (draft). |
| [docs/CONTENT_TALLY.md](docs/CONTENT_TALLY.md) | How many cards exist and which screens use them. Regenerate with `node tools/tally.js --write`. |
| [docs/_TEMPLATE.md](docs/_TEMPLATE.md) | An older blank card. The current layout is the skeleton in DRAFT_PROMPT.md §9. |

### 🧰 Tools

| Command | What it does |
|---|---|
| `node tools/tally.js --write` | Counts the cards, finds ones no screen links to and links that point nowhere, and rewrites docs/CONTENT_TALLY.md. |
| `python tools/make_icons.py` | Rebuilds the app icons in assets/icons/. |

---

## 🌌 The Long Vision

This project is in **Phase 1** 〜 building a foundational library of well-authored, honestly-sourced content.

Future phases may include:

- **Phase 2:** Library index with filters (by source, grade, context, theme)
- **Phase 3:** Cross-linking between related practices
- **Phase 4:** Qurʾān corpus integration 〜 click any Arabic word to see all its Qurʾānic occurrences and root analysis
- **Phase 5:** Audio recitation with synchronized word highlighting
- **Phase 6:** Multi-language UI (Indonesian, Malay, Urdu, Turkish)

We are not in a rush. The foundation is what matters.

---

## 📜 License & Spirit

This project is offered freely for the benefit of any Muslim seeking to understand and verify what they recite. Content authored here may be freely reused, copied, taught, and shared.

If this work benefits you, please make duʿā for the contributors 〜 past, present, and future.

> *"And whoever does an atom's weight of good will see it."* 〜 Qurʾān 99:7

---

## 🌿 Final Word

The Prophet ﷺ said: *"The best of you are those who learn the Qurʾān and teach it."* 〜 Bukhārī 5027.

By extension, the work of preserving the words of the Prophet ﷺ 〜 his duʿās, his teachings, his sunnah 〜 in a form that lets the next generation engage word-by-word with the Arabic is itself an act of *ṣadaqah jāriyah* (ongoing charity).

May Allah accept this work. May He correct what we have erred in. May He preserve us upon what is sound and turn us away from what is false.

**Compiled for ✦ the foam of the seas.**
