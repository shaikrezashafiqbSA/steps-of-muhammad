::meta
narrator: This is a template — not a real prophetic narration
collection: Steps of Muhammad Project
book: render.html v4.3 Feature Reference
hadith: GUIDE-001
grade: unknown
left-orb: 📖 Authoring Guide
right-orb: 🪶 Not For Recitation
::

# 📖 Authoring Guide
## Steps of Muhammad — Reference for Contributors

> This is the single reference for anyone authoring or migrating content into the project. It covers the markdown format, every rendering feature (with live demos, since this file is itself viewed through `render.html`), building patterns for every content type, sourcing methodology, transliteration standards, and quality control.

> **⚠️ Note:** Some of the examples below (word-stacks, meta-blocks) render live on this page for demonstration. They are not real prophetic narrations — do not recite the placeholder text.

**Read time:** ~30 minutes the first time. Reference material thereafter.

**Prerequisite:** Read [`README.md`](README.md) first to understand the vision.

---

## 📑 Table of Contents

1. [Quick-Start Template](#-quick-start-template)
2. [The Two-Phase Workflow](#-the-two-phase-workflow)
3. [The Content Universe — A 3D Map](#-the-content-universe--a-3d-map)
4. [The Three Building Blocks](#-the-three-building-blocks)
5. [UI Features Available On Every Page](#-ui-features-available-on-every-page)
6. [Standard Markdown & Embedded HTML](#-standard-markdown--embedded-html)
7. [Pattern Library — One Recipe per Content Type](#-pattern-library)
8. [Collections & render_collection.html](#-collections--render_collectionhtml)
9. [Sourcing Methodology](#-sourcing-methodology)
10. [Tashkeel & Tajwīd Standards](#-tashkeel--tajwīd-standards)
11. [Transliteration Standards](#-transliteration-standards)
12. [Honest Provenance Flags](#-honest-provenance-flags)
13. [Stylistic Conventions](#-stylistic-conventions)
14. [Creative Patterns](#-creative-patterns)
15. [Legacy HTML Migration Workflow](#-legacy-html-migration-workflow)
16. [Role of the LLM Scaffolding Prompt](#-role-of-the-llm-scaffolding-prompt)
17. [Quality Checklist](#-quality-checklist-before-publishing)

---

## 🚀 Quick-Start Template

Copy this skeleton into a new `.md` file and fill in the brackets. It covers the three building blocks (meta-card, word-stacks, collapsible drawer) that every atomic file needs — see [The Three Building Blocks](#-the-three-building-blocks) below for what each piece does, and the [Pattern Library](#-pattern-library) for recipes tailored to specific content types.

```
::meta
left-orb: [Source name · Scholar/Author · Book if known]
right-orb: [Grade or status: Ṣaḥīḥ / Ḥasan / Ḍaʿīf / Maʾthūr / Muṣannaf / etc.]
::

# Title of Duʿāʾ or Ṣalawāt

A brief description of this prayer and its significance.

---

## Arabic Text

[[اللَّهُمَّ|O Allah|Allāhumma]] [[صَلِّ|send blessings|ṣalli]] [[عَلَىٰ|upon|ʿalā]] [[سَيِّدِنَا|our master|Sayyidinā]] [[مُحَمَّدٍ|Muhammad|Muḥammad]]

---

## Translation

> O Allah, send blessings upon our master Muhammad...

---

## Notes & Context

### Attribution

Attributed to **[Scholar Name]** (d. [year] AH / [year] CE), as recorded in *[Book Title]*.

### How to Recite

Recite **[N] times** [when / after which prayer / on which occasion].

### Benefits Mentioned

- Benefit one
- Benefit two

---

## Sources

- *[Book Title]* — Author Name
- [URL or citation]

<details>
<summary>Chain of Narration / Isnād</summary>

Paste the full isnād or alternate narration here.

> Blockquote for direct Arabic text if needed.

</details>
```

---

## 🔄 The Two-Phase Workflow

Every authoring task splits into **two distinct phases**. Treat them as separate disciplines.

### Phase 1 — Sourcing (Provenance Work)

Before writing a single word-stack, verify:

- **Canonical source** — sunnah.com URL, quran.com URL, or a recognized scholarly compilation reference
- **Grading** — Ṣaḥīḥ / Ḥasan / Ḍaʿīf / Mawḍūʿ / Mutawātir, as graded by recognized authorities (Darussalam, al-Albānī, Shuʿayb al-Arnaʾūṭ, etc.)
- **Original Arabic** — pull the voweled Arabic from the canonical source
- **English translation** — pull the canonical English translation as published
- **Referenced verses** — if the ḥadīth mentions Qurʾānic verses without quoting them, identify the exact verse numbers
- **Scholarly notes** — any compiler comments (e.g., al-Tirmidhī's gharīb notes)
- **Contestation status** — does any reputable scholar flag this practice?

**This phase is the source-of-truth work.** It is what makes the archive trustworthy.

### Phase 2 — Authoring (Translation Work)

Once sourced, render into markdown:

- Build the `::meta` card
- Write the title
- Place the English narration
- Embed the original Arabic dropdown
- Author the word-by-word stacks (clause by clause)
- Add the verify link

**This phase is the tafakkur work.** It is what makes the author engage with the text.

**Do not blend the two phases.** Don't start writing word-stacks while you're still uncertain about the source. Source completely first; then author.

---

## 🌌 The Content Universe — A 3D Map

Every piece of Islamic content sits at a coordinate in three dimensions. Knowing where your content sits tells you which pattern to use.

### Axis 1 — Atomicity (how compound is it?)

- **Atomic** — one verse, one short dhikr, one duʿā sentence
- **Composite** — full duʿā with multiple sentences, one Qurʾānic sūrah
- **Compound** — wird drawing from 5–20 sources
- **Encyclopedic** — compendium of compendiums (Ḥiṣn al-Muslim style)

### Axis 2 — Provenance (how clear is the source?)

- **Mutawātir** — mass-transmitted certainty (most Qurʾān, a few ḥadīths)
- **Authenticated** — clear chain, recognized grading (canonical ḥadīth collections)
- **Scholarly compilation** — known compiler, partial sourcing (al-Nawawī's al-Adhkār)
- **Folk transmission** — generational, unclear original chain
- **Contested** — known to be problematic by reputable scholars

### Axis 3 — Use-Case (when/why is it recited?)

- **Daily** — five-times-a-day adhkār
- **Weekly** — Friday-specific
- **Calendar** — Ramaḍān, Dhū al-Ḥijjah, etc.
- **Occasional** — travel, illness, calamity, joy
- **Lifecycle** — birth, marriage, death
- **Liturgical** — embedded in ṣalāh/janāzah/eid/hajj

### Examples — Reading the Map

| Content | Atomicity | Provenance | Use-case | Pattern |
|---|---|---|---|---|
| Sayyid al-Istighfār | Atomic | Authenticated (Bukhārī) | Daily | H1 |
| Āyat al-Kursī | Atomic | Mutawātir | Daily | Q1 |
| Sūrat Yāsīn | Composite | Mutawātir | Weekly (Fri) | Q2 |
| Subḥān Allāh × 33 | Atomic | Authenticated | Daily (post-ṣalāh) | D1 |
| Tirmidhī 2922 (refuge + Ḥashr) | Atomic | Authenticated (Ḍaʿīf) | Daily | H2 |
| Rātib al-Ḥaddād | Compound | Scholarly | Daily | W1 |
| Doa Hamil | Composite | Folk | Lifecycle | F1 |
| Ḥiṣn al-Muslim Morning | Encyclopedic | Mixed | Daily | C1 |

---

## 🧱 The Three Building Blocks

The entire system reduces to three primitives. Master these and you can compose anything.

### Block 1 — The Meta-Card (`::meta`)

A front-matter block at the top of every file that becomes the Pokémon-style header card with grade badge.

**Basic usage (matches most existing files):**

```
::meta
left-orb: 📖 Musnad Aḥmad 3712
right-orb: 🟢 Ṣaḥīḥ (Darussalam)
::
```

**Full schema (all fields):**

```
::meta
narrator: [Companion name with honorific (raḍiyallāhu ʿanhu)]
collection: [Canonical collection name with macrons]
book: Book [N] · [Book title]
hadith: [Hadith number]
grade: [sahih | hasan | daif | mawdu | mutawatir | unknown]
left-orb: [📖 Display text for left pill]
right-orb: [🟢✦✦✦ Display text for right pill]
right-orb-color: #28a745 (optional hex color override)
verify: https://sunnah.com/...
::
```

**Field-by-field behavior:**

| Field | What it does | Visible? |
|---|---|---|
| `narrator` | Stored as `data-narrator` attr on orb-bar | Hidden — future search |
| `collection` | Stored as `data-collection` attr — also used as fallback if `left-orb` missing | Hidden by default |
| `book` | Stored as `data-book` attr | Hidden — future search |
| `hadith` | Stored as `data-hadith` attr | Hidden — future search |
| `grade` | Stored as `data-grade` attr — must be one of the 6 keywords above | Hidden — future filter/search |
| `left-orb` | **Renders as left pill at top of page** | ✅ Visible |
| `right-orb` | **Renders as right pill at top of page** | ✅ Visible |
| `verify` | Stored as `data-verify` attr | Hidden — semantic data only |

**Auto behavior:** on load the pill shows full text; after scroll it compacts, auto-extracting the leading emoji (e.g. 📖 and 🟢).

**Right-orb color auto-detection** — if `right-orb` contains one of these keywords, it auto-colors (no CSS edit needed):

| Keyword in `right-orb:` text | Pill color |
|---|---|
| `sahih` or `ṣaḥīḥ` | 🟢 Green |
| `hasan` or `ḥasan` | 🔵 Blue |
| `daif` or `ḍaʿīf` | 🟠 Amber |
| `mawdu` or `mawḍūʿ` | 🔴 Crimson |
| `mutawatir` or `mutawātir` | 🟢 Deep green |
| (none match) | ⚪ Neutral cream |

**Advanced overrides** — custom colors, explicit compact form, and rank-pips, for when the defaults don't fit:

```
::meta
left-orb: 📖 Ṣaḥīḥ al-Bukhārī 6306
left-orb-color: #F5E9DC
left-orb-text: #3A2E2B
right-orb: 🟢✦✦✦✦✦ Mutawātir (mass-transmitted)
right-orb-color: #1B5E20
right-orb-text: #FFFBF1
right-orb-compact: 🟢✦✦✦✦✦
::
```

Use `*-compact` fields when the leading emoji doesn't auto-extract correctly, or when you want a different symbol on scroll vs. full view. The pips (✦) become part of the compact display for a rank-badge feel.

**All fields optional except `grade`.** Omit fields that don't apply by leaving them blank or removing the line entirely.

### Block 2 — The Word-Stack (`[[...]]`)

The atomic recitation unit. Inline pipe-delimited, renders Arabic + English gloss + transliteration together as one visual unit.

| Syntax | Result | Live example |
|---|---|---|
| `[[اَللَّهُمَّ\|O Allah\|Allāhumma]]` | Full 3-row stack | [[اَللَّهُمَّ\|O Allah\|Allāhumma]] |
| `[[سُبْحَانَ اللَّهِ\|glory be to Allah]]` | 2-row stack (no translit) | [[سُبْحَانَ اللَّهِ\|glory be to Allah]] |
| `[[وَ الْحَمْدُ لِلَّهِ]]` | 1-row (Arabic only) | [[وَ الْحَمْدُ لِلَّهِ]] |
| `\[[literal]]` | Escape — renders bracket literally | \[[not a word stack]] |

**Grouping rules:**
- Consecutive stacks separated by spaces → **one `.ayah` block**
- Blank line between stacks → **new `.ayah` block**

This is how you control clause boundaries visually — e.g. one clause per line:

```
[[رَبِّ|my Lord|rabbi]] [[اشْرَحْ|expand|ishraḥ]] [[لِي|for me|lī]] [[صَدْرِي|my chest|ṣadrī]]

[[وَ يَسِّرْ|and ease|wa yassir]] [[لِي|for me|lī]] [[أَمْرِي|my affair|amrī]]
```

**Tips for authoring word-stacks:**
- **One word per stack** — don't put phrases inside a single stack (breaks reading flow)
- **Glosses are lowercase** — except for proper nouns (Allah, Muhammad)
- **Transliterations use academic diacritics** — ā ī ū · ḥ ṣ ṭ ḍ ẓ · ʿ · ʾ
- **Tashkeel is mandatory** — every Arabic letter that takes a vowel must show its harakah

### Block 3 — The Collapsible Drawer (`<details>`)

For supplementary content — scholarly context, original Arabic source, deeper dives.

```html
<details>
<summary>📚 Click to expand</summary>

Any markdown content here — paragraphs, lists, word-stacks, nested details.

</details>
```

Add `open` to start expanded: `<details open>`. Nest arbitrarily deep — the system handles it.

---

## 🎛️ UI Features Available On Every Page

These work no matter what markdown you load — they're rendered by `render.html`/`render_collection.html` itself, not authored per-file.

### 🅰️ Floating Reading Mode Fan (Bottom-Left)

A circular button that fans up into 4 reading modes. Your last-chosen mode is remembered across sessions.

| Icon | Mode | Arabic | English | Transliteration |
|---|---|---|---|---|
| **أ** | Arabic-first | Larger | Visible | Hidden |
| **Aa** | Learner | Standard | Visible | Visible |
| **🔊** | Verbal | Faded | Visible | Prominent + above Arabic |
| **ٱ** | Arabic-only | Largest | Hidden | Hidden |

Test your authored content in all four modes — word-stacks display differently in each.

### 🔍 Floating Zoom (Bottom-Right)

Two circular buttons: `🔍+` and `🔍−`. Adjusts text size across 5 levels (default = level 3).

**Keyboard shortcuts:** `Ctrl/Cmd + +` zoom in · `Ctrl/Cmd + −` zoom out · `Ctrl/Cmd + 0` reset.

### 📜 Floating TOC (Bottom-Right)

Appears when the page has ≥2 `H2`/`H3` headings — **automatically built**, no manual maintenance needed. Click a link → page scrolls and auto-expands `<details>` drawers in that section. Click outside or press `Esc` → closes.

### 🔗 URL Hash Deep-Linking

Any heading can be linked directly via URL hash, e.g. `web/render.html?file=AUTHORING_GUIDE.md#the-three-building-blocks`. The page auto-scrolls AND auto-expands any `<details>` ancestor of the target — so you can share deep-links even into collapsed drawers.

---

## ✍️ Standard Markdown & Embedded HTML

All standard GitHub-Flavored Markdown works as expected: `# H1`–`###### H6` headings (auto-added to TOC from H2/H3), `**bold**`/`*italic*`/`~~strikethrough~~`/`` `inline code` ``, bulleted and numbered lists (2-space nesting), `> blockquotes`, `| tables |`, `---` horizontal rules, emoji, and fenced code blocks.

**Links:**
```
[Internal link to another file](?file=path/to/file.md)
[External link](https://sunnah.com/bukhari:6306)
[Link to a heading in this file](#heading-slug)
[Deep-link into another file](?file=other.md#section-slug)
```

**Embedded HTML** is passed through unchanged, which unlocks:

```html
<img src="../assets/black-flag.jpeg" alt="Description" style="max-width: 100%; border-radius: 8px;">

<iframe width="100%" height="200" src="https://www.youtube.com/embed/VIDEO_ID"
  frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>

<audio controls src="./path/to/audio.mp3"></audio>
<video controls src="./path/to/video.mp4"></video>

<div style="background: rgba(176, 138, 75, 0.15); border: 1px solid rgba(176, 138, 75, 0.4); border-radius: 8px; padding: 1rem; margin: 1rem 0;">
📌 Custom-styled callout box for special highlights.
</div>
```

**Not currently implemented:** math rendering (KaTeX/MathJax), footnotes, Mermaid diagrams, search across files, auto-generated library index from frontmatter, practice tracker, audio karaoke, Qurʾān corpus root-letter integration. These may be added in future phases based on demonstrated need.

---

## 🗂️ Pattern Library

One recipe for each content type. Find the pattern matching your content, copy the skeleton, fill in the details.

### Pattern Q1 — Atomic Qurʾānic Verse

Use for: Standalone ayahs (Āyat al-Kursī, last 3 of Ḥashr, Ikhlāṣ, etc.)

```markdown
::meta
narrator: ﷽ Revealed via Jibrīl (ʿalayhi-s-salām)
collection: The Qurʾān
book: Sūrat al-Baqarah · Verse 255
hadith: Āyat al-Kursī
grade: mutawatir
verify: https://quran.com/2/255
::

# Āyat al-Kursī

## 📖 The Verse

The Throne Verse — described by the Prophet ﷺ as the greatest verse in the Qurʾān (Muslim 810).

## 🔤 Word-by-Word

[[اللَّهُ|Allah|Allāhu]] [[لَا|no|lā]] [[إِلَٰهَ|deity|ilāha]] [[إِلَّا|except|illā]] [[هُوَ|Him|huwa]] [[الْحَيُّ|the Ever-Living|l-ḥayyu]] [[الْقَيُّومُ|the Sustainer|l-qayyūm]]

[[لَا|not|lā]] [[تَأْخُذُهُ|overtakes Him|taʾkhudhuhu]] [[سِنَةٌ|drowsiness|sinatun]] [[وَلَا|nor|wa lā]] [[نَوْمٌ|sleep|nawm]]

[continue clause by clause at natural waqf points...]

---

*🔗 Verify on quran.com — [Q. 2:255](https://quran.com/2/255)*
```

Tips: always use `grade: mutawatir` for Qurʾān · for `collection`, write "The Qurʾān" · break clauses at canonical waqf (pause) marks · use corpus.quran.com for word-by-word reference.

### Pattern Q2 — Full Sūrah

Use for: Complete chapters (Fātiḥah, Yāsīn, Mulk, etc.)

Same as Q1 but the word-by-word section breaks each verse into its own clause-paragraph:

```markdown
## 🔤 Word-by-Word

### Verse 1
[[بِسْمِ|in the name of|bismi]] [[اللَّهِ|Allah|llāhi]] [[الرَّحْمَٰنِ|the Most Gracious|r-raḥmāni]] [[الرَّحِيمِ|the Most Merciful|r-raḥīm]]

### Verse 2
[[الْحَمْدُ|all praise|al-ḥamdu]] [[لِلَّهِ|is for Allah|lillāhi]] [[رَبِّ|Lord of|rabbi]] [[الْعَالَمِينَ|the worlds|l-ʿālamīn]]

[...continue for all verses...]
```

For sūrahs over ~80 word-units, consider splitting into multiple files (e.g., Yāsīn first half / second half) and linking from a manifest page.

### Pattern D1 — Atomic Dhikr

Use for: Short remembrances (1–5 words) recited in counts.

```markdown
::meta
collection: Authentic dhikr
book: Practiced in tasbīḥ after every ṣalāh
hadith: Established in Ṣaḥīḥ Muslim 1410
grade: sahih
verify: https://sunnah.com/muslim:1410
::

# Subḥān Allāh

> **Practice:** Recite **33 times** after every obligatory ṣalāh, alongside Al-Ḥamdu Lillāh (33×) and Allāhu Akbar (34×), concluding with the tahlīl formula × 1.
>
> **Reward:** "Whoever recites these after every prayer — his sins are forgiven even if they were like the foam of the sea." — Muslim 1410.

## 🔤 The Dhikr

[[سُبْحَانَ|glory be to|subḥāna]] [[اللَّهِ|Allah|llāhi]]

---

*🔗 Verify — [Muslim 1410](https://sunnah.com/muslim:1410)*
```

Tips: always document count and timing in the practice blockquote · document the reward if there's an authentic ḥadīth mentioning it · for 1–3 word dhikr, no need for multiple sections.

### Pattern H1 — Single Ḥadīth Duʿā

Use for: A specific duʿā attached to a specific ḥadīth narration (e.g., Sayyid al-Istighfār).

```markdown
::meta
narrator: Shaddād ibn Aws (raḍiyallāhu ʿanhu)
collection: Ṣaḥīḥ al-Bukhārī
book: Book 80 · Invocations
hadith: 6306
grade: sahih
verify: https://sunnah.com/bukhari:6306
::

# Sayyid al-Istighfār — The Master of Seeking Forgiveness

## 📜 The Hadith

The Prophet ﷺ said: "The most superior way of asking for forgiveness from Allah is to say: [the duʿā]. Whoever utters it during the day with firm faith in it and dies on the same day before evening — he will be from the people of Paradise. Whoever utters it during the night with firm faith in it and dies before morning — he will be from the people of Paradise."

<details>
<summary>📚 Original Arabic Source (chain · matn · compiler note)</summary>

**Sanad (chain of transmission):**

> حَدَّثَنَا أَبُو الْيَمَانِ، قَالَ: أَخْبَرَنَا شُعَيْبٌ، عَنِ الزُّهْرِيِّ، قَالَ: أَخْبَرَنِي عَبْدُ اللَّهِ بْنُ عَبْدِ اللَّهِ بْنِ عُمَرَ، عَنْ شَدَّادِ بْنِ أَوْسٍ، رَضِيَ اللَّهُ عَنْهُ، عَنِ النَّبِيِّ ﷺ قَالَ:

**Matn (the prophetic statement):**

> «سَيِّدُ الِاسْتِغْفَارِ: اللَّهُمَّ أَنْتَ رَبِّي، لَا إِلَهَ إِلَّا أَنْتَ، خَلَقْتَنِي وَأَنَا عَبْدُكَ، وَأَنَا عَلَى عَهْدِكَ وَوَعْدِكَ مَا اسْتَطَعْتُ، أَعُوذُ بِكَ مِنْ شَرِّ مَا صَنَعْتُ، أَبُوءُ لَكَ بِنِعْمَتِكَ عَلَيَّ، وَأَبُوءُ لَكَ بِذَنْبِي، فَاغْفِرْ لِي، فَإِنَّهُ لَا يَغْفِرُ الذُّنُوبَ إِلَّا أَنْتَ.»

</details>

## 🔤 Word-by-Word

[[اللَّهُمَّ|O Allah|Allāhumma]] [[أَنْتَ|You are|anta]] [[رَبِّي|my Lord|rabbī]]

[[لَا|no|lā]] [[إِلَٰهَ|deity|ilāha]] [[إِلَّا|except|illā]] [[أَنْتَ|You|anta]]

[[خَلَقْتَنِي|You created me|khalaqtanī]] [[وَأَنَا|and I am|wa anā]] [[عَبْدُكَ|Your servant|ʿabduka]]

[continue clause by clause...]

---

*🔗 Verify on sunnah.com — [Bukhārī 6306](https://sunnah.com/bukhari:6306)*
```

### Pattern H2 — Ḥadīth Referencing Qurʾān

Use for: Ḥadīths that say "...and he recited [some verses]..." without quoting them. The archivist must source the referenced verses and insert them inline.

```markdown
::meta
narrator: Maʿqil ibn Yasār (raḍiyallāhu ʿanhu)
collection: Jāmiʿ at-Tirmidhī
book: Book 45 · Virtues of the Qurʾān
hadith: 2922
grade: daif
verify: https://sunnah.com/tirmidhi:2922
::

# The Refuge & End of Al-Ḥashr

## 📜 The Hadith

Narrated Maʿqil ibn Yasār: that the Prophet ﷺ said: "Whoever says three times when he rises in the morning: *Aʿūdhu billāhi-s-Samīʿi-l-ʿAlīm min ash-shayṭāni-r-rajīm*, and then recites three āyāt from the end of Sūrat Al-Ḥashr — Allah appoints seventy thousand angels who send ṣalāt upon him until the evening. If he dies on that day, he dies a martyr. And whoever recites it in the evening holds the same status."

<details>
<summary>📚 Original Arabic Source (chain · matn · compiler note)</summary>

[full sanad + matn + al-Tirmidhī's gharīb note]

</details>

## 🔤 Word-by-Word

[[مَنْ|whoever|man]] [[قَالَ|says|qāla]] [[حِينَ|when|ḥīna]] [[يُصْبِحُ|rises in morning|yuṣbiḥu]] [[ثَلَاثَ|three|thalātha]] [[مَرَّاتٍ|times|marrāt]]

[[أَعُوذُ|I seek refuge|aʿūdhu]] [[بِاللَّهِ|with Allah|billāhi]] [[السَّمِيعِ|the All-Hearing|s-samīʿi]] [[الْعَلِيمِ|the All-Knowing|l-ʿalīm]] [[مِنَ|from|mina]] [[الشَّيْطَانِ|the Satan|sh-shayṭāni]] [[الرَّجِيمِ|the accursed|r-rajīm]]

[[وَقَرَأَ|and he recites|wa qaraʾa]] [[ثَلَاثَ|three|thalātha]] [[آيَاتٍ|āyāt|āyātin]] [[مِنْ|from|min]] [[آخِرِ|the end of|ākhiri]] [[سُورَةِ|Sūrat|sūrati]] [[الْحَشْرِ|Al-Ḥashr|l-ḥashr]]

> 📖 *Verses inserted from canonical reference — Sūrat al-Ḥashr 59:22–24*

[[هُوَ|He is|huwa]] [[اللَّهُ|Allah|llāhu]] [[الَّذِي|the One|lladhī]] [[لَا|no|lā]] [[إِلَٰهَ|deity|ilāha]] [[إِلَّا|except|illā]] [[هُوَ|Him|huwa]] [[عَالِمُ|Knower of|ʿālimu]] [[الْغَيْبِ|the unseen|l-ghaybi]] [[وَالشَّهَادَةِ|and the witnessed|wa-sh-shahādah]] [[هُوَ|He is|huwa]] [[الرَّحْمَٰنُ|the Most Gracious|r-raḥmānu]] [[الرَّحِيمُ|the Most Merciful|r-raḥīm]]

[continue with verses 23 and 24, then resume hadith reward portion...]

[[وَكَّلَ|appoints|wakkala]] [[اللَّهُ|Allah|llāhu]] [[بِهِ|for him|bihi]] [[سَبْعِينَ|seventy|sabʿīna]] [[أَلْفَ|thousand|alfa]] [[مَلَكٍ|angels|malakin]] ...

---

*🔗 Verify — [Tirmidhī 2922](https://sunnah.com/tirmidhi:2922) · [Q. 59:22–24](https://quran.com/59/22-24)*
```

**Common Qurʾānic references to know:**

| Hadith says... | Actual verses |
|---|---|
| "End of Sūrat al-Ḥashr" | Q. 59:22–24 |
| "Āyat al-Kursī" | Q. 2:255 |
| "Last two of Al-Baqarah" | Q. 2:285–286 |
| "The Muʿawwidhatān" | Q. 113 + Q. 114 |
| "Qul huwa-llāhu aḥad" | Q. 112 |
| "Opening of Sūrat al-Ḥadīd" | Q. 57:1–6 |
| "End of Sūrat al-Kahf" | Q. 18:107–110 |
| "First three of Al-Baqarah" | Q. 2:1–5 |
| "Sūrat al-Fātiḥah" | Q. 1:1–7 |
| "Last verse of Al-Tawbah" | Q. 9:128–129 |

### Pattern H3 — Multi-Duʿā Ḥadīth

Use for: Ḥadīths containing multiple distinct recitations (e.g., post-ṣalāh sequence). One meta-card, one English narration, one Arabic dropdown, multiple numbered word-by-word parts.

```markdown
::meta
narrator: Abū Hurayrah (raḍiyallāhu ʿanhu)
collection: Ṣaḥīḥ Muslim
book: Book 5 · Mosques
hadith: 1410
grade: sahih
verify: https://sunnah.com/muslim:1410
::

# Post-Ṣalāh Sequence — Abū Hurayrah's Narration

## 📜 The Hadith

[Full English narration as published]

<details>
<summary>📚 Original Arabic Source</summary>
[sanad + matn]
</details>

## 🔤 Part 1 — Subḥān Allāh × 33

> Recite immediately after the closing salām.

[[سُبْحَانَ|glory be to|subḥāna]] [[اللَّهِ|Allah|llāhi]]

## 🔤 Part 2 — Al-Ḥamdu Lillāh × 33

[[الْحَمْدُ|all praise|al-ḥamdu]] [[لِلَّهِ|is for Allah|lillāhi]]

## 🔤 Part 3 — Allāhu Akbar × 34

[[اللَّهُ|Allah|Allāhu]] [[أَكْبَرُ|is greater|akbar]]

## 🔤 Part 4 — Closing Tahlīl × 1

[[لَا|no|lā]] [[إِلَٰهَ|deity|ilāha]] [[إِلَّا|except|illā]] [[اللَّهُ|Allah|llāhu]] [[وَحْدَهُ|alone|waḥdahu]] [[لَا|no|lā]] [[شَرِيكَ|partner|sharīka]] [[لَهُ|for Him|lahu]] ...

---

*🔗 Verify — [Muslim 1410](https://sunnah.com/muslim:1410)*
```

Sort parts in recitation order, not in the order they appear in the ḥadīth text.

### Pattern W1 — Scholarly Wird (Manifest)

Use for: Long compilations from a single mashāyikh (Rātib al-Ḥaddād, Wird al-Laṭīf, Dalāʾil al-Khayrāt). The wird page is a table of contents linking to atomic files. Each linked file is independently authored with its own meta-card citing the original ḥadīth/Qurʾān source.

```markdown
::meta
narrator: Imām ʿAbd Allāh al-Ḥaddād (raḥimahu-llāh, d. 1132 AH)
collection: Rātib al-Ḥaddād
book: Daily Yemeni Sufi compilation
hadith: Recited after Maghrib
grade: unknown
verify: 
::

# Rātib al-Ḥaddād — Sequence Manifest

> Compiled by Imām al-Ḥaddād of Hadhramawt. Recited daily after Maghrib (or before sleep). Each component below links to its atomic file with the original source citation; recite top-to-bottom for the full ratib.

## 📿 The Sequence

1. **Fātiḥah** — [Sūrat al-Fātiḥah](?file=quran/fatihah.md)
2. **Āyat al-Kursī** — [Q. 2:255](?file=quran/ayat-al-kursi.md)
3. **End of Al-Baqarah** — [Q. 2:285–286](?file=quran/baqarah-end.md)
4. **Refuge** — [Aʿūdhu bi-kalimāti-llāh × 3](?file=duas/refuge-perfect-words.md)
5. **Bismillāh shield** — [Bismi-llāhi-lladhī × 3](?file=duas/bismillah-shield.md)
6. **Trust** — [Ḥasbiya-llāh × 7](?file=duas/hasbiyallah.md)
7. **Tasbīḥ** — [Subḥān Allāh × 3](?file=dhikr/tasbih.md)
8. **Taḥmīd** — [Al-Ḥamdu Lillāh × 3](?file=dhikr/tahmid.md)
9. **Takbīr** — [Allāhu Akbar × 3](?file=dhikr/takbir.md)
10. **Closing Tahlīl** — [Lā ilāha illā Allāh × 100](?file=dhikr/tahlil-closing.md)

## 📖 About This Compilation

Compiled by Imām al-Ḥaddād (d. 1132 AH) in Tarīm, Hadhramawt. Each component draws from authentic ḥadīth or Qurʾānic source — see linked atomic files for individual gradings.

---

*This manifest is a sequencing aid. Each atomic file is independently verifiable.*
```

Why this pattern is powerful: each atomic dhikr is authored ONCE and reused across multiple wirds — update the Fātiḥah file once and it updates in Rātib al-Ḥaddād, Wird al-Laṭīf, Ḥiṣn al-Muslim simultaneously. Smaller files load faster on mobile, and users can study individual components OR the whole sequence.

### Pattern W2 — Scholarly Wird (Inline)

Use for: Shorter wirds (≤8 components) where you want everything on one page.

```markdown
::meta
narrator: Imām al-Nawawī (raḥimahu-llāh, d. 676 AH)
collection: Al-Adhkār
book: Morning compilation
hadith: Daily wird
grade: unknown
verify:
::

# Morning Sequence — al-Nawawī's Compilation

> A short morning sequence from Imām al-Nawawī's *Al-Adhkār*.

<details open>
<summary>1. Aʿūdhu bi-kalimāti-llāh — × 3</summary>

[[أَعُوذُ|I seek refuge|aʿūdhu]] [[بِكَلِمَاتِ|with the words|bi-kalimāti]] [[اللَّهِ|of Allah|llāhi]] [[التَّامَّاتِ|the perfect|t-tāmmāti]] [[مِنْ|from|min]] [[شَرِّ|the evil|sharri]] [[مَا|of what|mā]] [[خَلَقَ|He created|khalaq]]

📜 **Source:** Muslim 2708 — Khawla bint Ḥakīm

</details>

<details>
<summary>2. Bismillāhi-lladhī lā yaḍurru — × 3</summary>

[word stacks]

📜 **Source:** Abū Dāwūd 5088 — ʿUthmān ibn ʿAffān

</details>

<details>
<summary>3. Ḥasbiya-llāh — × 7</summary>

[word stacks]

📜 **Source:** Abū Dāwūd 5081

</details>
```

Use `<details open>` on the first item so the reader sees where to start.

### Pattern F1 — Folk Compilation

Use for: Practices from kitab kuning, Ḥaḍramī midwifery, Malay/Indonesian folk wisdom.

Same structure as W2 (inline drawers) but with critical additions:

- **Honest meta-card** — `grade: unknown`, `collection: Kitab kuning compilation` or `Ḥaḍramī Yemeni tradition`
- **Preserved original-language instructions** (italic + em-dash translation): `**Instruction:** *Setiap lepas sholat sambil memegang pusar baca do'a ini.* — After every prayer, while gently touching the navel, recite this duʿā.`
- **Contestation flags where needed:**
  > ⚠️ **Note on authenticity:** The phrase "Yā Ḥannā waladat Maryam..." is a folk supplication popular in Yemeni traditions but is not from authentic ḥadīth. Direct address to deceased persons for assistance is contested by reputable scholars; the safer practice is to address all petitions to Allah alone, omitting this line.
- **Clear ritual sectioning** — folk compilations often have detailed ritual steps (when, how, count, posture) — use `## Section N · [Title]` headers

See the project's `dua/shifa/dua-hamil.md` for a fully-worked example.

### Pattern C1 — Compendium of Compendiums

Use for: Modern collections drawing from dozens of sources (Ḥiṣn al-Muslim, al-Adhkār chapters). Always use the manifest pattern (W1) because it scales.

```markdown
::meta
narrator: Compiled by Saʿīd ibn ʿAlī ibn Wahf al-Qaḥṭānī
collection: Ḥiṣn al-Muslim
book: Modern compilation of authentic adhkār
hadith: Morning & Evening sequence
grade: unknown
verify:
::

# Ḥiṣn al-Muslim — Morning Adhkār Sequence

> The morning fortress as compiled by Sh. al-Qaḥṭānī. Each piece below links to its standalone file with full meta-card citing the original ḥadīth source.

## 🌅 Morning Sequence

1. **Āyat al-Kursī** — [Q. 2:255](?file=quran/ayat-al-kursi.md)
2. **The three Quls** — [Ikhlāṣ, Falaq, Nās](?file=quran/three-quls.md)
3. **Aṣbaḥnā wa aṣbaḥa-l-mulku** — [Muslim 2723](?file=duas/asbahna.md)
4. **Sayyid al-Istighfār** — [Bukhārī 6306](?file=duas/sayyid-istighfar.md)
5. **Subḥān Allāh wa biḥamdihi × 100** — [Muslim 2691](?file=dhikr/subhanallah-bihamdihi.md)

[continue for full sequence]

## 📖 About This Compilation

Ḥiṣn al-Muslim is a modern compilation (late 20th century) by Sh. Saʿīd al-Qaḥṭānī. It is **not itself a ḥadīth collection** — it is a curated index drawing from authentic ḥadīth collections. Each entry above links to its underlying source. Use individual file gradings to assess authenticity.
```

---

## 🧩 Collections & `render_collection.html`

A **collection** is a manifest file (Pattern W1/C1) rendered as one continuous, scrollable page — every linked duʿā expands inline as a collapsible card instead of navigating to a new page. This is the "read top to bottom after ṣalāh" experience: open once, scroll through the whole sequence.

### How it works

`render_collection.html` is a **separate, self-contained viewer** from `render.html`. It is never edited when `render.html` changes and vice versa — they intentionally duplicate the rendering engine (meta parsing, word-stack parsing, orb rendering, zoom, reading modes) rather than share code, so a change to one can't silently break the other.

Given a manifest file via `?file=`, it:

1. Fetches the manifest, renders its `::meta` header and intro prose exactly like `render.html` would
2. Scans the intro markdown for every `[label](?file=path/to/atomic.md)` link, **in the order they appear**
3. Rewrites each of those links to jump to an inline anchor (`#collection-item-N`) instead of navigating away
4. Fetches each linked atomic file and renders it as a `<details>` card — same word-stacks, same orb badges (source pill + color-coded grade pill, folding to compact icons on scroll), same "Open standalone ↗" link back to `render.html` for the full dalīl-check view
5. The first item opens expanded; the rest start collapsed

### Authoring a collection manifest

Any existing W1/C1-style manifest already works — no format change required. To get the cleanest render:

- Use `[label](?file=path/to/file.md)` links exactly as in Pattern W1 — this is the *only* syntax the parser looks for
- Links can sit inside prose, bold text, or a numbered list; the regex only cares about the `[...](?file=...md)` shape, so `**[→ Some Duʿā](?file=x.md)**` works fine
- Keep each linked path **unique** — the parser dedupes by path, so linking the same file twice will jump to the same card both times
- An item you want listed but haven't authored yet (still pending sourcing) should **not** be wrapped in a real `[...](?file=...)` link — write it as plain text (e.g. `6. **Āyat al-Kursī** — 🔜 *pending authoring*`). A link to a file that doesn't exist yet will render as a visible error card in that slot rather than breaking the rest of the page — harmless, but a plain-text placeholder is cleaner while a piece is still unauthored
- The manifest's own `::meta` (`left-orb`/`right-orb`) becomes the collection's header pills — use it for a collection-level label (e.g. `left-orb: 📚 Collection · Post-Ṣalāh Adhkār`), not a hadith citation
- Mark timing/optionality inline in your list item text (`*(optional)*`, `*(Fajr & Maghrib only)*`) — the parser doesn't understand structured metadata for this, it's just prose the reader sees

### Wiring it into `index.html`

A collection is exposed to users the same way a `family`-type item already is — just point its `path` at `render_collection.html` instead of `render.html`:

```js
{ type: "family", label: "Post-Ṣalāh Collection — Full Sequence",
  path: "web/render_collection.html?file=after-salah/post-solat-collection.md" }
```

### Testing a collection locally

`fetch()` requires `http://`, not `file://` — opening the HTML file directly from disk will fail silently on every linked card. Serve the folder locally first:

```
python -m http.server 8791
```

Then open `http://localhost:8791/web/render_collection.html?file=your-manifest.md` and check:

- [ ] Every linked card loads (no `⚠️ Could not load` error cards)
- [ ] First item auto-expands; rest start collapsed
- [ ] Clicking an intro link jumps to and opens the right card
- [ ] Each card's orb pair matches its standalone `render.html?file=...` rendering exactly
- [ ] No console errors

---

## 🔎 Sourcing Methodology

**Primary sources (always preferred):**

| Source | Use for | URL |
|---|---|---|
| sunnah.com | Canonical ḥadīth collections (Bukhārī, Muslim, the Four Sunan, Mālik, Aḥmad) | https://sunnah.com |
| quran.com | Qurʾānic verses with translations | https://quran.com |
| corpus.quran.com | Word-by-word Qurʾān analysis | https://corpus.quran.com |
| islamqa.info | Scholarly verdicts on contested practices | https://islamqa.info |
| abu.al-jawhar.com | Detailed authentication notes | https://abu.al-jawhar.com |

**Secondary sources (for scholarly compilations):** *al-Adhkār* by al-Nawawī (Arabic editions widely available) · *Ḥiṣn al-Muslim* by al-Qaḥṭānī (Darussalam Publishers) · *ʿAmal al-Yawm wa-l-Laylah* by Ibn al-Sunnī · *al-Wābil al-Ṣayyib* by Ibn al-Qayyim

**Sources to be cautious with:** Wikipedia (good for navigation, not for citation) · random websites with no scholarly attribution · social media excerpts (always trace to primary source) · "Authentic Dua" mobile apps (often paraphrase or omit citations)

**When you can't find a primary source:** search sunnah.com for keywords from the Arabic, search Google Scholar for the Arabic phrase, or ask in scholarly fora (e.g., Reddit r/islam-scholars, Imam Q&A platforms). If still no source, author it with `grade: unknown` and add a transparent note: *"Source attribution requires verification. The text has been preserved as transmitted but not yet traced to a canonical source."*

**Never fabricate a source citation. Better to mark as unknown than to mislead.**

---

## 🎵 Tashkeel & Tajwīd Standards

For Qurʾānic verses, use the canonical Ḥafṣ ʿan ʿĀṣim reading (most widely used globally). For ḥadīth Arabic, the same fuṣḥā standards apply — verify against canonical sunnah.com text.

**Required tashkeel marks:**

| Mark | Symbol | Required when |
|---|---|---|
| Fatḥah | ◌َ | Every short "a" vowel |
| Kasrah | ◌ِ | Every short "i" vowel |
| Ḍammah | ◌ُ | Every short "u" vowel |
| Sukūn | ◌ْ | Every vowelless consonant |
| Shaddah | ◌ّ | Every doubled consonant |
| Tanwīn fatḥ | ◌ً | Indefinite accusative |
| Tanwīn kasr | ◌ٍ | Indefinite genitive |
| Tanwīn ḍamm | ◌ٌ | Indefinite nominative |
| Maddah | ◌ٓ | Long vowel marker on alif |
| Dagger alif | ◌ٰ | Hidden long alif (e.g., هَٰذَا) |

**Special tashkeel cases:**

- **Hamzat al-waṣl (ا)** — the initial alif that elides in connection. Arabic: render as regular ا. Transliteration: reflect the elision — `wa-jʿalhu` not `wa-ijʿalhu`.
- **Solar letters assimilation** — when الـ precedes a solar letter (t, th, d, dh, r, z, s, sh, ṣ, ḍ, ṭ, ẓ, l, n), the lām assimilates. Arabic: shaddah on the next letter. Transliteration: show assimilation — `aṣ-ṣirāṭ` not `al-ṣirāṭ`.
- **Tāʾ marbūṭah (ة)** — pronounced as *t* when bound, silent when paused. Transliteration: `raḥmah` standalone, `raḥmati-llāh` in construct.

---

## 🌍 Transliteration Standards

Academic Arabic-to-Latin, consistent across the archive.

| Arabic | Standard | Avoid |
|---|---|---|
| ا (long alif) | ā | a, aa |
| و (long wāw) | ū | oo, u (no macron) |
| ي (long yāʾ) | ī | ee, i (no macron) |
| ع (ʿayn) | ʿ | ' or ` or omitted |
| ء (hamza) | ʾ | ' or omitted |
| ح (ḥāʾ) | ḥ | h |
| ص (ṣād) | ṣ | s |
| ط (ṭāʾ) | ṭ | t |
| ض (ḍād) | ḍ | d |
| ظ (ẓāʾ) | ẓ | z |
| ث (thāʾ) | th | s |
| ذ (dhāl) | dh | z |
| خ (khāʾ) | kh | h |
| ش (shīn) | sh | s |
| غ (ghayn) | gh | g |

Prefix particles use hyphen: `wa-`, `bi-`, `li-`, `fa-`, `ka-`, `al-`. Proper nouns capitalized: Allāh, Muḥammad, Maryam, ʿĪsā, Bukhārī, Tirmidhī. No italics in the transliteration field — the rendering engine handles styling.

---

## 🚩 Honest Provenance Flags

When something needs caveating, use one of these standardized flag formats:

**Flag 1 — Weak but traditionally accepted**
```
> ⚠️ **On the grading:** This ḥadīth is graded Ḍaʿīf by [authority], but has been widely transmitted in the adhkār tradition by scholars including [names], under the *tasāhul* principle applied to virtues of recitation (*faḍāʾil al-aʿmāl*). Use with awareness of its grading.
```

**Flag 2 — Folk supplication without authentic chain**
```
> ⚠️ **Note on authenticity:** This supplication is widely practiced in [region/tradition] but does not have an authentic chain to the Prophet ﷺ. It is preserved here for documentation; reciters should be aware it is folk transmission rather than prophetic sunnah.
```

**Flag 3 — Theologically contested practice**
```
> ⚠️ **Scholarly debate:** The practice of [X] is contested among scholars. [School A] holds [position]; [school B] holds [position]. The reader should consult their own teacher. A safer alternative recognized by all schools is to [alternative practice].
```

**Flag 4 — Reconstructed Arabic from oral/written transmission**
```
> 📝 **Note on the Arabic:** The Arabic text below has been reconstructed from [source]; tashkeel has been added per standard fuṣḥā conventions. Variations may exist in other transmissions.
```

**Flag 5 — Source attribution pending**
```
> 🔍 **Source pending verification:** This duʿā has been preserved as widely transmitted but its original prophetic source has not yet been definitively traced. Documented here as a placeholder pending scholarly research.
```

Use these flags openly and without shame. Honesty is the strength of this archive, not its weakness.

---

## 🎭 Stylistic Conventions

Project authoring conventions — not enforced by the renderer, but how existing content is styled. Following them keeps the archive visually unified.

**The Operational Cue Bold** — in hadith narration sections, **bold** the exact instruction line that introduces the duʿā:
```
Abū Hurayra reported: **The Messenger of Allah ﷺ used to say after every prayer:** *[the duʿā below]*

> *"There is no deity except Allah alone..."*
```

**Italicized blockquote for translations** — wrap the English translation of the duʿā in a blockquote (`>`), italicized.

**Standard section skeleton** most cards follow:
```
# [Operational Title]

## 📜 The Hadith
[Narration intro + operational cue + italicized blockquote translation]

<details>
<summary>📚 Original Arabic Source</summary>
[Word-stacked sanad + matn]
</details>

## 🔤 Evoke This — Word by Word
[Word-stacked clauses]

*🔗 Verify on sunnah.com — [Citation](URL)*
```
The section emojis are conventions: 📜 for the hadith, 🔤 for word-by-word, 📚 for the Arabic drawer.

**The verify line at bottom** — always italicize, always include the canonical sunnah.com or quran.com URL: `*🔗 Verify on sunnah.com — [Bukhārī 6306](https://sunnah.com/bukhari:6306)*`

**Honorifics:** `ﷺ` after the Prophet's name (not "(saw)" or "PBUH") · `(raḍiyallāhu ʿanhu)` after male Companions · `(raḍiyallāhu ʿanhā)` after female Companions · `(ʿalayhi-s-salām)` after other Prophets · `(raḥimahu-llāh)` after deceased scholars.

**Diacritics in English text** — when writing Arabic names in English prose, use academic transliteration (`ā ī ū` not `aa ee oo`; `ḥ ṣ ṭ ḍ ẓ` not plain `h s t d z`; `ʿ`/`ʾ` not apostrophe `'`). See [Transliteration Standards](#-transliteration-standards) above for the full table.

---

## 🎨 Creative Patterns

Advanced patterns for archivists who have mastered the basics.

**Pattern X1 — Counted Recitation Tracker.** For dhikr requiring counts, add a printable counter inside a drawer:
```
<details>
<summary>🔢 Printable Counter (× 33)</summary>

> ▢ ▢ ▢ ▢ ▢ ▢ ▢ ▢ ▢ ▢
> ▢ ▢ ▢ ▢ ▢ ▢ ▢ ▢ ▢ ▢
> ▢ ▢ ▢ ▢ ▢ ▢ ▢ ▢ ▢ ▢
> ▢ ▢ ▢

</details>
```

**Pattern X2 — Linguistic Deep-Dive Drawer.** Beneath a Qurʾānically-resonant word, attach a root-analysis drawer:
```
[[رَحْمَة|mercy|raḥmah]]

<details>
<summary>🔬 Linguistic note: the root ر-ح-م</summary>

The root **ر-ح-م (r-ḥ-m)** appears **339 times** in the Qurʾān across forms:
- *raḥmah* — mercy (compassion in action)
- *raḥīm* — Most Merciful (continuous attribute)
- *raḥmān* — Most Gracious (the divine name)
- *raḥim* — womb (the original locus of mercy)

The Prophet ﷺ said the word *raḥim* (womb) was derived from one of Allah's names *al-Raḥmān* — Bukhārī 5988.

</details>
```

**Pattern X3 — Audio Recitation Embed.** Embed a YouTube or audio file for verbal learners:
```
<details>
<summary>🎧 Listen to recitation</summary>

<iframe width="100%" height="80" src="https://www.youtube.com/embed/VIDEO_ID" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>

Reciter: Sh. Mishary Rashid Alafasy

</details>
```

**Pattern X4 — Cross-Reference Network.** At the bottom of any page, add related practices to build a knowledge web:
```
## 🌐 Related Practices

- **Often combined with:** [Aṣbaḥnā wa aṣbaḥa-l-mulku](?file=duas/asbahna.md)
- **Appears in:** [Rātib al-Ḥaddād](?file=wird/ratib-haddad.md), [Ḥiṣn al-Muslim Morning](?file=compendium/hisn-morning.md)
- **Similar theme:** [Sayyid al-Istighfār](?file=duas/sayyid-istighfar.md)
- **Companion verse:** [Q. 39:53](?file=quran/zumar-53.md)
```

**Pattern X5 — Comparative Narration.** Display two ḥadīth narrations side-by-side:
```
<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">

<details open>
<summary>Bukhārī's narration</summary>
[content]
</details>

<details>
<summary>Muslim's narration</summary>
[content]
</details>

</div>
```

**Pattern X6 — Sequential Numbered Recitations.** For sequences of 10+ separate items, number each with descriptive prefixes so the TOC becomes a navigable checklist:
```
## 🔤 #1 — Refuge in the Perfect Words
[word stacks]

## 🔤 #2 — Bismillāh Shield
[word stacks]

## 🔤 #3 — Ḥasbiya-llāh × 7
[word stacks]
```

---

## 🛠️ Legacy HTML Migration Workflow

The project has many legacy `.html` files from the early LLM-generated era. These need manual migration to the markdown format.

**Why migration is manual:** spiritual — word-by-word translation IS the tafakkur exercise; quality — LLM word-stacks have predictable failure modes that human verification catches; foundational — every file you author becomes the foundation for someone else's ṣalāh.

**Step-by-step process:**

1. **Identify the legacy file's complexity level.** Open the legacy `.html` in browser. Single Qurʾānic verse → Q1. Single dhikr with counts → D1. Ḥadīth duʿā → H1. References Qurʾān verses → H2. Multiple duʿās → H3. Scholarly wird → W1 or W2. Folk → F1. Compendium → C1.
2. **Extract the canonical source.** Find the hadith collection and number (or Qurʾān verse), the narrator, the grade, and any compiler notes. If the legacy file is missing this info, find it on sunnah.com/quran.com by searching for keywords.
3. **Verify on sunnah.com or quran.com:** the Arabic text (with tashkeel), the English translation (canonical, not the legacy paraphrase), the hadith number/collection name/book name.
4. **Create the new `.md` file.** Start with the `::meta` block and `# Title`. Save. Open in `web/render.html?file=your-file.md` to confirm the meta-card renders correctly.
5. **Add `## 📜 The Hadith` section.** Paste the verified English narration as a plain paragraph.
6. **Add `<details>` drawer with original Arabic.** Paste the voweled Arabic sanad + matn, including compiler notes if any.
7. **Author `## 🔤 Word-by-Word`** clause by clause: type Arabic with full tashkeel, add English gloss per word, add transliteration with diacritics. Save and view — visually verify — then move to next clause.
8. **Cross-check.** Read the rendered page top to bottom. Does the narrative flow? Are clauses chunked naturally? Does the meta-card grade match the source? Try all 4 reading modes.
9. **Update `index.html`.** Replace the legacy entry with the new markdown path: `{ label: "...", path: "web/render.html?file=duas/your-new-file.md" }`.
10. **Move the legacy file to `/legacy/`.** Keep for ~30 days in case you need to recover something, then delete.
11. **Update `MIGRATION_LOG.md`.**

**Estimated time per file:**

| Complexity | Time |
|---|---|
| Atomic Qurʾān verse | 15–25 min |
| Atomic dhikr | 5–10 min |
| Single ḥadīth duʿā | 30–45 min |
| Ḥadīth + referenced verses | 45–75 min |
| Multi-duʿā ḥadīth | 60–90 min |
| Scholarly wird (manifest) | 30 min for manifest + atomic times for each component |
| Folk compilation | 2–5 hours |
| Compendium | 30–60 min for manifest + atomic times |

Pacing recommendation: 1–2 files per session. This is contemplative work, not assembly-line.

---

## 🤖 Role of the LLM Scaffolding Prompt

The project includes a system prompt (`prompt-v4.md` or similar) that can be used with an LLM to generate scaffolded drafts — **never final output**.

**✅ Use for scaffolding when:** you've already verified the source manually, you want to skip the mechanical extraction of meta-card fields from a sunnah.com paste, or you want a rough word-stack draft to refine (not accept as-is).

**❌ Do NOT use for:** final word-stacks (verify every gloss, every tashkeel mark), source attribution (LLM will sometimes hallucinate citations), grade determination (verify against canonical authorities), or folk-vs-authentic discrimination.

**Recommended workflow:** verify the source yourself (sunnah.com, quran.com) → paste the canonical text into the LLM with the system prompt → take the scaffolded output as a starting point → manually verify every single line before committing, paying special attention to every Arabic word (typos, missing tashkeel), every English gloss (LLM glosses often over-translate), every transliteration (academic standard inconsistency), every clause boundary (LLM tends to over-chunk), and the meta-card grade (verify against the actual source).

**Rule of thumb:** if you can't defend why a particular gloss was chosen, edit it until you can.

---

## ✅ Quality Checklist Before Publishing

Run through this list before committing any new `.md` file.

**Meta-card**
- [ ] `::meta` block at the very top, before `# Title`
- [ ] `grade` field is one of the 6 valid keywords
- [ ] `left-orb` and `right-orb` set explicitly
- [ ] `verify` URL resolves to the canonical source
- [ ] Narrator name uses proper honorific (`raḍiyallāhu ʿanhu`/`ʿanhā`)
- [ ] Collection name uses canonical transliteration (Bukhārī not Bukhari)

**Title**
- [ ] Exactly one `# H1` — descriptive operational name (not "Hadith #1234")
- [ ] No `### Subtitle` under H1 (the meta-card carries identity)
- [ ] At least one `## H2` section (otherwise the TOC won't show)

**English narration section**
- [ ] `## 📜 The Hadith` heading exact
- [ ] Plain paragraph (not italic blockquote, not code block)
- [ ] Uses normalized diacritics (`aʿūdhu`, not `a'udhu`)
- [ ] Uses `ﷺ` consistently (not "(saw)" or "PBUH")

**Original Arabic dropdown**
- [ ] `<details>` with exact summary: `📚 Original Arabic Source (chain · matn · compiler note)`
- [ ] Sanad and matn both included, fully voweled
- [ ] NO word-stacks inside the dropdown (continuous reading)
- [ ] Closed by default (no `open` attribute)
- [ ] Compiler note included if present in source

**Word-by-word section**
- [ ] `## 🔤 Word-by-Word` heading (or `## 🔤 Part N — ...` for multi-duʿā)
- [ ] Every `[[...]]` has 2 or 3 pipe-separated parts (no orphans)
- [ ] Arabic field fully voweled
- [ ] English glosses lowercase except proper nouns
- [ ] Transliteration uses academic diacritics (ā ī ū · ḥ ṣ ṭ ḍ ẓ · ʿ · ʾ)
- [ ] Word-stacks chunked by clause (blank line between clauses)
- [ ] If referencing Qurʾān → verses inserted inline with `> 📖 *Note*` marker

**Source & verify**
- [ ] Bottom line: `*🔗 Verify on [source] — [Citation]: [URL]*`
- [ ] URL works when clicked

**Forbidden patterns**
- [ ] No `### Phrase 1`, `### Step 2` sub-headers between word-stacks
- [ ] No code fences wrapping the whole file
- [ ] No conversational text or LLM artifacts
- [ ] No fabricated ḥadīth citations
- [ ] No dressed-up folk material posing as authentic ḥadīth

**Honesty checks**
- [ ] If content is weak — graded honestly with optional adhkār-tradition note
- [ ] If content is folk — clearly flagged as folk, not as hadith
- [ ] If content has contested elements — debate presented fairly with safer alternative
- [ ] If source is unverified — explicitly marked pending

**Render test** — open `web/render.html?file=your-new-file.md` and confirm:
- [ ] Meta-card displays with correct grade badge color
- [ ] TOC appears with all `##` sections
- [ ] All 4 reading modes work
- [ ] Mobile layout doesn't break (resize to ~400px)
- [ ] All `<details>` open and close cleanly
- [ ] Bottom verify link is clickable
- [ ] No console errors in browser DevTools

**Index update**
- [ ] Entry added under correct category in `index.html`
- [ ] Path uses `web/render.html?file=...` format
- [ ] Link works from homepage

If all pass → commit. May Allah accept the work.

---

## 🌿 Final Word for Contributors

You are not just authoring a document. You are participating in a 1400-year chain of preservation that began with the Companions writing on date palm fronds and animal scapulae. Every word you transcribe carefully, every grade you flag honestly, every fabrication you refuse to propagate — these are acts of trust (amānah) in the trust the Prophet ﷺ left to his ummah.

The Prophet ﷺ said: *"Convey from me, even if it is one verse."* — Bukhārī 3461.

Convey honestly. Convey carefully. Convey with foundation.

**Compiled for ✦ the foam of the seas.**
