# 📖 Authoring Guide
## Steps of Muhammad — Technical Reference for Contributors

> This guide is for anyone authoring or migrating content into the project. It covers the markdown format, building patterns for every content type, sourcing methodology, transliteration standards, and quality control.

**Read time:** ~30 minutes the first time. Reference material thereafter.

**Prerequisite:** Read [`README.md`](README.md) first to understand the vision.

---

## 📑 Table of Contents

1. [The Two-Phase Workflow](#-the-two-phase-workflow)
2. [The Content Universe — A 3D Map](#-the-content-universe--a-3d-map)
3. [The Three Building Blocks](#-the-three-building-blocks)
4. [Pattern Library — One Recipe per Content Type](#-pattern-library)
   - [Pattern Q1 — Atomic Qurʾānic Verse](#pattern-q1--atomic-qurʾānic-verse)
   - [Pattern Q2 — Full Sūrah](#pattern-q2--full-sūrah)
   - [Pattern D1 — Atomic Dhikr](#pattern-d1--atomic-dhikr)
   - [Pattern H1 — Single Ḥadīth Duʿā](#pattern-h1--single-ḥadīth-duʿā)
   - [Pattern H2 — Ḥadīth Referencing Qurʾān](#pattern-h2--ḥadīth-referencing-qurʾān)
   - [Pattern H3 — Multi-Duʿā Ḥadīth](#pattern-h3--multi-duʿā-ḥadīth)
   - [Pattern W1 — Scholarly Wird (Manifest)](#pattern-w1--scholarly-wird-manifest)
   - [Pattern W2 — Scholarly Wird (Inline)](#pattern-w2--scholarly-wird-inline)
   - [Pattern F1 — Folk Compilation](#pattern-f1--folk-compilation)
   - [Pattern C1 — Compendium of Compendiums](#pattern-c1--compendium-of-compendiums)
5. [Sourcing Methodology](#-sourcing-methodology)
6. [Tashkeel & Tajwīd Standards](#-tashkeel--tajwīd-standards)
7. [Transliteration Standards](#-transliteration-standards)
8. [Honest Provenance Flags](#-honest-provenance-flags)
9. [Creative Patterns](#-creative-patterns)
10. [Full Feature Inventory](#-full-feature-inventory)
11. [Legacy HTML Migration Workflow](#-legacy-html-migration-workflow)
12. [Role of the LLM Scaffolding Prompt](#-role-of-the-llm-scaffolding-prompt)
13. [Quality Checklist](#-quality-checklist-before-publishing)

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


::meta
narrator: [Companion name] (raḍiyallāhu ʿanhu)
collection: [Canonical collection name]
book: Book [N] · [Book title]
hadith: [Hadith number or identifier]
grade: [sahih | hasan | daif | mawdu | mutawatir | unknown]
verify: [https://canonical-source-url]
::

**Grade keyword → Badge mapping:**

| Keyword | Badge | Color | Use for |
|---|---|---|---|
| `sahih` | ✅ ṢAḤĪḤ | Green | Authentic ḥadīth |
| `hasan` | 🟦 ḤASAN | Blue | Good ḥadīth |
| `daif` | ⚠️ ḌAʿĪF | Amber | Weak ḥadīth (still authored if traditionally accepted) |
| `mawdu` | ❌ MAWḌŪʿ | Crimson | Fabricated — do not propagate |
| `mutawatir` | 🌟 MUTAWĀTIR | Deep green | Mass-transmitted certainty |
| `unknown` | ❓ UNGRADED | Gray | Qurʾān (use mutawatir instead), scholarly compilations, folk traditions |

**All fields optional except `grade`.** Omit fields that don't apply by leaving them blank or removing the line entirely.

### Block 2 — The Word-Stack (`[[...]]`)

The atomic recitation unit. Inline pipe-delimited.

| Syntax | Result |
|---|---|
| `[[اَللَّهُمَّ\|O Allah\|Allāhumma]]` | Full 3-row stack |
| `[[اَللَّهُمَّ\|O Allah]]` | 2-row stack (no translit) |
| `[[اَللَّهُمَّ]]` | 1-row (Arabic only) |
| `\[[literal]]` | Escape — renders bracket literally |

**Grouping rules:**
- Consecutive stacks separated by spaces → **one `.ayah` block**
- Blank line between stacks → **new `.ayah` block**

This is how you control clause boundaries visually.

### Block 3 — The Collapsible Drawer (`<details>`)

For supplementary content — scholarly context, original Arabic source, deeper dives.

```html
<details>
<summary>📚 Click to expand</summary>

Any markdown content here — paragraphs, lists, word-stacks, nested details.

</details>

Add open to start expanded: <details open>.
Nest arbitrarily deep — the system handles it.

🗂️ Pattern Library
One recipe for each content type. Find the pattern matching your content, copy the skeleton, fill in the details.

Pattern Q1 — Atomic Qurʾānic Verse
Use for: Standalone ayahs (Āyat al-Kursī, last 3 of Ḥashr, Ikhlāṣ, etc.)
markdownCopy code
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

Tips:
Always use grade: mutawatir for Qurʾān
For collection, write The Qurʾān
Break clauses at canonical waqf (pause) marks
Use corpus.quran.com for word-by-word reference

Pattern Q2 — Full Sūrah
Use for: Complete chapters (Fātiḥah, Yāsīn, Mulk, etc.)
Same as Q1 but the word-by-word section breaks each verse into its own clause-paragraph:
markdownCopy code
## 🔤 Word-by-Word

### Verse 1
[[بِسْمِ|in the name of|bismi]] [[اللَّهِ|Allah|llāhi]] [[الرَّحْمَٰنِ|the Most Gracious|r-raḥmāni]] [[الرَّحِيمِ|the Most Merciful|r-raḥīm]]

### Verse 2
[[الْحَمْدُ|all praise|al-ḥamdu]] [[لِلَّهِ|is for Allah|lillāhi]] [[رَبِّ|Lord of|rabbi]] [[الْعَالَمِينَ|the worlds|l-ʿālamīn]]

[...continue for all verses...]

For sūrahs over ~80 word-units, consider splitting into multiple files (e.g., Yāsīn first half / second half) and linking from a manifest page.

Pattern D1 — Atomic Dhikr
Use for: Short remembrances (1–5 words) recited in counts.
markdownCopy code
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

Tips:
Always document count and timing in the practice blockquote
Document the reward if there's an authentic ḥadīth mentioning it
For 1–3 word dhikr, no need for multiple sections

Pattern H1 — Single Ḥadīth Duʿā
Use for: A specific duʿā attached to a specific ḥadīth narration (e.g., Sayyid al-Istighfār).
markdownCopy code
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


Pattern H2 — Ḥadīth Referencing Qurʾān
Use for: Ḥadīths that say "...and he recited [some verses]..." without quoting them. The archivist must source the referenced verses and insert them inline.
markdownCopy code
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

Common Qurʾānic references to know:
Hadith says...
Actual verses
"End of Sūrat al-Ḥashr"
Q. 59:22–24
"Āyat al-Kursī"
Q. 2:255
"Last two of Al-Baqarah"
Q. 2:285–286
"The Muʿawwidhatān"
Q. 113 + Q. 114
"Qul huwa-llāhu aḥad"
Q. 112
"Opening of Sūrat al-Ḥadīd"
Q. 57:1–6
"End of Sūrat al-Kahf"
Q. 18:107–110
"First three of Al-Baqarah"
Q. 2:1–5
"Sūrat al-Fātiḥah"
Q. 1:1–7
"Last verse of Al-Tawbah"
Q. 9:128–129


Pattern H3 — Multi-Duʿā Ḥadīth
Use for: Ḥadīths containing multiple distinct recitations (e.g., post-ṣalāh sequence).
One meta-card, one English narration, one Arabic dropdown, multiple numbered word-by-word parts.
markdownCopy code
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

Sort parts in recitation order, not in the order they appear in the ḥadīth text.

Pattern W1 — Scholarly Wird (Manifest)
Use for: Long compilations from a single mashāyikh (Rātib al-Ḥaddād, Wird al-Laṭīf, Dalāʾil al-Khayrāt).
The wird page is a table of contents linking to atomic files. Each linked file is independently authored with its own meta-card citing the original ḥadīth/Qurʾān source.
markdownCopy code
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

Why this pattern is powerful:
Each atomic dhikr authored ONCE, reused across multiple wirds
Update the Fātiḥah file once → updates in Rātib al-Ḥaddād, Wird al-Laṭīf, Ḥiṣn al-Muslim simultaneously
Smaller files = faster mobile loading
Users can study individual components OR the whole sequence

Pattern W2 — Scholarly Wird (Inline)
Use for: Shorter wirds (≤8 components) where you want everything on one page.
markdownCopy code
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

Note: Use <details open> on the first item so the reader sees where to start.

Pattern F1 — Folk Compilation
Use for: Practices from kitab kuning, Ḥaḍramī midwifery, Malay/Indonesian folk wisdom.
Same structure as W2 (inline drawers) but with critical additions:
Honest meta-card — grade: unknown, collection: Kitab kuning compilation or Ḥaḍramī Yemeni tradition
Preserved original-language instructions (italic + em-dash translation):
**Instruction:** *Setiap lepas sholat sambil memegang pusar baca do'a ini.* — After every prayer, while gently touching the navel, recite this duʿā.


Contestation flags where needed:
> ⚠️ **Note on authenticity:** The phrase "Yā Ḥannā waladat Maryam..." is a folk supplication popular in Yemeni traditions but is not from authentic ḥadīth. Direct address to deceased persons for assistance is contested by reputable scholars; the safer practice is to address all petitions to Allah alone, omitting this line.


Clear ritual sectioning — folk compilations often have detailed ritual steps (when, how, count, posture) — use ## Section N · [Title] headers
See the project's Wird/dua-hamil.md for a fully-worked example.

Pattern C1 — Compendium of Compendiums
Use for: Modern collections drawing from dozens of sources (Ḥiṣn al-Muslim, al-Adhkār chapters).
Always use the manifest pattern (W1) because it scales.
markdownCopy code
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


🔎 Sourcing Methodology
Primary sources (always preferred)
Source
Use for
URL
sunnah.com
Canonical ḥadīth collections (Bukhārī, Muslim, the Four Sunan, Mālik, Aḥmad)
https://sunnah.com
quran.com
Qurʾānic verses with translations
https://quran.com
corpus.quran.com
Word-by-word Qurʾān analysis
https://corpus.quran.com
islamqa.info
Scholarly verdicts on contested practices
https://islamqa.info
abu.al-jawhar.com
Detailed authentication notes
https://abu.al-jawhar.com

Secondary sources (for scholarly compilations)
al-Adhkār by al-Nawawī — Arabic editions widely available
Ḥiṣn al-Muslim by al-Qaḥṭānī — Darussalam Publishers
ʿAmal al-Yawm wa-l-Laylah by Ibn al-Sunnī
al-Wābil al-Ṣayyib by Ibn al-Qayyim
Sources to be cautious with
Wikipedia (good for navigation, not for citation)
Random websites with no scholarly attribution
Social media excerpts (always trace to primary source)
"Authentic Dua" mobile apps (often paraphrase or omit citations)
When you can't find a primary source
If a legacy file or oral transmission has a duʿā you can't trace:
Search sunnah.com for keywords from the Arabic
Search Google Scholar for the Arabic phrase
Ask in scholarly fora (e.g., Reddit r/islam-scholars, Imam Q&A platforms)
If still no source — author it with grade: unknown and add a transparent note: "Source attribution requires verification. The text has been preserved as transmitted but not yet traced to a canonical source."
Never fabricate a source citation. Better to mark as unknown than to mislead.

🎵 Tashkeel & Tajwīd Standards
For Qurʾānic verses, use the canonical Ḥafṣ ʿan ʿĀṣim reading (most widely used globally).
Required tashkeel marks
Mark
Symbol
Required when
Fatḥah
◌َ
Every short "a" vowel
Kasrah
◌ِ
Every short "i" vowel
Ḍammah
◌ُ
Every short "u" vowel
Sukūn
◌ْ
Every vowelless consonant
Shaddah
◌ّ
Every doubled consonant
Tanwīn fatḥ
◌ً
Indefinite accusative
Tanwīn kasr
◌ٍ
Indefinite genitive
Tanwīn ḍamm
◌ٌ
Indefinite nominative
Maddah
◌ٓ
Long vowel marker on alif
Dagger alif
◌ٰ
Hidden long alif (e.g., هَٰذَا)

For ḥadīth Arabic, same fuṣḥā standards apply. Verify against canonical sunnah.com text.
Special tashkeel cases
Hamzat al-waṣl (ا): the initial alif that elides in connection.
Arabic: render as regular ا
Transliteration: reflect the elision — wa-jʿalhu not wa-ijʿalhu
Solar letters assimilation: when الـ precedes a solar letter (t, th, d, dh, r, z, s, sh, ṣ, ḍ, ṭ, ẓ, l, n), the lām assimilates.
Arabic: shaddah on the next letter
Transliteration: show assimilation — aṣ-ṣirāṭ not al-ṣirāṭ
Tāʾ marbūṭah (ة): pronounced as t when bound, silent when paused.
Transliteration: raḥmah standalone, raḥmati-llāh in construct

🌍 Transliteration Standards
Academic Arabic-to-Latin, consistent across the archive.
Arabic
Standard
Avoid
ا (long alif)
ā
a, aa
و (long wāw)
ū
oo, u (no macron)
ي (long yāʾ)
ī
ee, i (no macron)
ع (ʿayn)
ʿ
' or ` or omitted
ء (hamza)
ʾ
' or omitted
ح (ḥāʾ)
ḥ
h
ص (ṣād)
ṣ
s
ط (ṭāʾ)
ṭ
t
ض (ḍād)
ḍ
d
ظ (ẓāʾ)
ẓ
z
ث (thāʾ)
th
s
ذ (dhāl)
dh
z
خ (khāʾ)
kh
h
ش (shīn)
sh
s
غ (ghayn)
gh
g

Prefix particles use hyphen: wa-, bi-, li-, fa-, ka-, al-.
Proper nouns capitalized: Allāh, Muḥammad, Maryam, ʿĪsā, Bukhārī, Tirmidhī.
No italics in the transliteration field — the rendering engine handles styling.

🚩 Honest Provenance Flags
When something needs caveating, use one of these standardized flag formats:
Flag 1 — Weak but traditionally accepted
markdownCopy code
> ⚠️ **On the grading:** This ḥadīth is graded Ḍaʿīf by [authority], but has been widely transmitted in the adhkār tradition by scholars including [names], under the *tasāhul* principle applied to virtues of recitation (*faḍāʾil al-aʿmāl*). Use with awareness of its grading.

Flag 2 — Folk supplication without authentic chain
markdownCopy code
> ⚠️ **Note on authenticity:** This supplication is widely practiced in [region/tradition] but does not have an authentic chain to the Prophet ﷺ. It is preserved here for documentation; reciters should be aware it is folk transmission rather than prophetic sunnah.

Flag 3 — Theologically contested practice
markdownCopy code
> ⚠️ **Scholarly debate:** The practice of [X] is contested among scholars. [School A] holds [position]; [school B] holds [position]. The reader should consult their own teacher. A safer alternative recognized by all schools is to [alternative practice].

Flag 4 — Reconstructed Arabic from oral/written transmission
markdownCopy code
> 📝 **Note on the Arabic:** The Arabic text below has been reconstructed from [source]; tashkeel has been added per standard fuṣḥā conventions. Variations may exist in other transmissions.

Flag 5 — Source attribution pending
markdownCopy code
> 🔍 **Source pending verification:** This duʿā has been preserved as widely transmitted but its original prophetic source has not yet been definitively traced. Documented here as a placeholder pending scholarly research.

Use these flags openly and without shame. Honesty is the strength of this archive, not its weakness.

🎨 Creative Patterns
Advanced patterns for archivists who have mastered the basics.
Pattern X1 — Counted Recitation Tracker
For dhikr requiring counts, add a printable counter inside a drawer:
markdownCopy code
<details>
<summary>🔢 Printable Counter (× 33)</summary>

> ▢ ▢ ▢ ▢ ▢ ▢ ▢ ▢ ▢ ▢
> ▢ ▢ ▢ ▢ ▢ ▢ ▢ ▢ ▢ ▢
> ▢ ▢ ▢ ▢ ▢ ▢ ▢ ▢ ▢ ▢
> ▢ ▢ ▢

</details>

Pattern X2 — Linguistic Deep-Dive Drawer
Beneath a Qurʾānically-resonant word, attach a root-analysis drawer:
markdownCopy code
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

Pattern X3 — Audio Recitation Embed
Embed a YouTube or audio file for verbal learners:
markdownCopy code
<details>
<summary>🎧 Listen to recitation</summary>

<iframe width="100%" height="80" src="https://www.youtube.com/embed/VIDEO_ID" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>

Reciter: Sh. Mishary Rashid Alafasy

</details>

Pattern X4 — Cross-Reference Network
At the bottom of any page, add related practices to build a knowledge web:
markdownCopy code
## 🌐 Related Practices

- **Often combined with:** [Aṣbaḥnā wa aṣbaḥa-l-mulku](?file=duas/asbahna.md)
- **Appears in:** [Rātib al-Ḥaddād](?file=wird/ratib-haddad.md), [Ḥiṣn al-Muslim Morning](?file=compendium/hisn-morning.md)
- **Similar theme:** [Sayyid al-Istighfār](?file=duas/sayyid-istighfar.md)
- **Companion verse:** [Q. 39:53](?file=quran/zumar-53.md)

Pattern X5 — Comparative Narration
Display two ḥadīth narrations side-by-side:
markdownCopy code
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

Pattern X6 — Sequential Numbered Recitations
For sequences of 10+ separate items, number each with descriptive prefixes for easy TOC scanning:
markdownCopy code
## 🔤 #1 — Refuge in the Perfect Words
[word stacks]

## 🔤 #2 — Bismillāh Shield
[word stacks]

## 🔤 #3 — Ḥasbiya-llāh × 7
[word stacks]

The TOC becomes a navigable checklist.

🔧 Full Feature Inventory
Complete catalog of system capabilities. Use as quick reference.
Markdown features (standard GFM)
✅ # H1 through ###### H6 headings
✅ **bold**, *italic*, ~~strikethrough~~
✅ [link text](url)
✅ `inline code` (renders as terracotta pill)
✅ Bulleted lists - and numbered lists 1.
✅ Nested lists (2-space indent)
✅ > blockquotes (amber-tinted style)
✅ Tables | col | col | (basic — discouraged for word-by-word)
✅ --- horizontal rule
✅ Emoji 🌿 ✨ 📚 (works in headings, body, summary)
✅ Raw HTML embeds (<img>, <iframe>, <div>, etc.)
Project-specific features
✅ ::meta ... :: front-matter → Pokémon-card header with grade badge
✅ [[arabic|english|translit]] → 3-row word-stack
✅ [[arabic|english]] → 2-row word-stack (no translit)
✅ [[arabic]] → 1-row word-stack (Arabic only)
✅ \[[literal]] → escape brackets
✅ Consecutive stacks auto-group into .ayah flex-wrap block
✅ Blank line between stacks → new .ayah block
✅ <details><summary>...</summary>...</details> → collapsible drawer
✅ <details open> → starts expanded
✅ Nested <details> to arbitrary depth
✅ Auto Table of Contents from ## and ### headings
✅ TOC clicks auto-expand <details> in target section
✅ URL hash deep-links auto-scroll AND auto-expand <details> ancestors
✅ 4 reading modes (Arabic-first / Learner / Verbal / Arabic-only)
✅ Mode persistence via localStorage
✅ Grade badge colors: sahih (green) / hasan (blue) / daif (amber) / mawdu (crimson) / mutawatir (deep green) / unknown (gray)
Cross-linking
✅ To another markdown file: [label](?file=path/other.md)
✅ To a heading in same file: [label](#heading-slug)
✅ To external URL: [label](https://...)
✅ To specific section in another file: [label](?file=other.md#section-slug)
Things you can do with raw HTML
✅ <img src="..." alt="..."> — embed images
✅ <iframe> — embed YouTube/audio/Spotify
✅ <div style="..."> — custom inline styling
✅ <audio controls src="..."></audio> — audio recitation player
✅ <video controls src="..."></video> — video embeds
Not currently implemented
❌ Math rendering (KaTeX/MathJax)
❌ Footnotes [^1]
❌ Mermaid diagrams
❌ Search across files
❌ Auto-generated library index from frontmatter
❌ Practice tracker (memorized / streak counter)
❌ Audio karaoke with word highlighting
❌ Qurʾān corpus root-letter integration
These may be added in future phases based on demonstrated need.

🛠️ Legacy HTML Migration Workflow
The project has many legacy .html files from the early LLM-generated era. These need manual migration to the markdown format.
Why migration is manual
Spiritual — word-by-word translation IS the tafakkur exercise
Quality — LLM word-stacks have predictable failure modes that human verification catches
Foundational — every file you author becomes the foundation for someone else's salah
Step-by-step process
Step 1 — Identify the legacy file's complexity level
Open the legacy .html in browser. Identify:
Is it a single Qurʾānic verse? → Pattern Q1
Is it a single dhikr with counts? → Pattern D1
Is it a ḥadīth duʿā? → Pattern H1
Does it reference Qurʾān verses? → Pattern H2
Are there multiple duʿās? → Pattern H3
Is it a scholarly wird? → Pattern W1 or W2
Is it folk? → Pattern F1
Is it a compendium? → Pattern C1
Step 2 — Extract the canonical source
Find:
The hadith collection and number (or quran verse)
The narrator
The grade
Any compiler notes
If the legacy file is missing this info, find it on sunnah.com/quran.com by searching for keywords.
Step 3 — Open sunnah.com or quran.com and verify:
The Arabic text (with tashkeel) — copy the authoritative version
The English translation — copy the canonical translation (don't keep the legacy paraphrase)
The hadith number, collection name, book name
Step 4 — Create the new .md file
Start with the ::meta block and # Title. Save. Open in render.html?file=your-file.md to confirm the meta-card renders correctly.
Step 5 — Add ## 📜 The Hadith section
Paste the verified English narration as a plain paragraph.
Step 6 — Add <details> drawer with original Arabic
Paste the voweled Arabic sanad + matn. Include compiler notes if any.
Step 7 — Author ## 🔤 Word-by-Word
Clause by clause:
Type Arabic with full tashkeel
Add English gloss for each word
Add transliteration with diacritics
Save and view — visually verify
Move to next clause
Step 8 — Cross-check
Read the rendered page top to bottom. Does the narrative flow? Are clauses chunked naturally? Does the meta-card grade match the source? Try all 4 reading modes.
Step 9 — Update index.html
Replace the legacy entry with the new markdown path:
jsCopy code
{ label: "...", path: "render.html?file=duas/your-new-file.md" }

Step 10 — Move legacy file to /legacy/
Keep for ~30 days in case you need to recover something, then delete.
Step 11 — Update MIGRATION_LOG.md (see below)
Estimated time per file
Complexity
Time
Atomic Qurʾān verse
15–25 min
Atomic dhikr
5–10 min
Single ḥadīth duʿā
30–45 min
Ḥadīth + referenced verses
45–75 min
Multi-duʿā ḥadīth
60–90 min
Scholarly wird (manifest)
30 min for manifest + atomic times for each component
Folk compilation
2–5 hours
Compendium
30–60 min for manifest + atomic times

Pacing recommendation: 1–2 files per session. This is contemplative work, not assembly-line.

🤖 Role of the LLM Scaffolding Prompt
The project includes a system prompt (prompt-v4.md or similar) that can be used with an LLM to generate scaffolded drafts — never final output.
When to use the LLM
✅ Use for scaffolding when:
You've already verified the source manually
You want to skip the mechanical extraction of meta-card fields from a sunnah.com paste
You want a rough word-stack draft to refine (not accept as-is)
❌ Do NOT use for:
Final word-stacks (verify every gloss, every tashkeel mark)
Source attribution (LLM will sometimes hallucinate citations)
Grade determination (verify against canonical authorities)
Folk-vs-authentic discrimination
Recommended LLM workflow
Verify the source yourself (sunnah.com, quran.com)
Paste the canonical text into LLM with system prompt
Take the scaffolded output as starting point
Manually verify every single line before committing
Pay special attention to:
Every Arabic word (typos, missing tashkeel)
Every English gloss (LLM glosses often over-translate)
Every transliteration (academic standard inconsistency)
Every clause boundary (LLM tends to over-chunk)
The meta-card grade (verify against the actual source)
Rule of thumb: If you can't defend why a particular gloss was chosen, edit it until you can.

✅ Quality Checklist Before Publishing
Run through this list before committing any new .md file.
Meta-card
[ ] ::meta block at the very top, before # Title
[ ] grade field is one of the 6 valid keywords
[ ] verify URL resolves to the canonical source
[ ] Narrator name uses proper honorific (raḍiyallāhu ʿanhu/ʿanhā)
[ ] Collection name uses canonical transliteration (Bukhārī not Bukhari)
Title
[ ] Exactly one # H1 — descriptive operational name (not "Hadith #1234")
[ ] No ### Subtitle under H1 (the meta-card carries identity)
English narration section
[ ] ## 📜 The Hadith heading exact
[ ] Plain paragraph (not italic blockquote, not code block)
[ ] Uses normalized diacritics (aʿūdhu, not a'udhu)
[ ] Uses ﷺ consistently (not "(saw)" or "PBUH")
Original Arabic dropdown
[ ] <details> with exact summary: 📚 Original Arabic Source (chain · matn · compiler note)
[ ] Sanad and matn both included, fully voweled
[ ] NO word-stacks inside the dropdown (continuous reading)
[ ] Closed by default (no open attribute)
[ ] Compiler note included if present in source
Word-by-word section
[ ] ## 🔤 Word-by-Word heading (or ## 🔤 Part N — ... for multi-duʿā)
[ ] Every [[...]] has 2 or 3 pipe-separated parts (no orphans)
[ ] Arabic field fully voweled
[ ] English glosses lowercase except proper nouns
[ ] Transliteration uses academic diacritics (ā ī ū · ḥ ṣ ṭ ḍ ẓ · ʿ · ʾ)
[ ] Word-stacks chunked by clause (blank line between clauses)
[ ] If referencing Qurʾān → verses inserted inline with > 📖 *Note* marker
Source & verify
[ ] Bottom line: *🔗 Verify on [source] — [Citation]: [URL]*
[ ] URL works when clicked
Forbidden patterns
[ ] No ### Phrase 1, ### Step 2 sub-headers between word-stacks
[ ] No code fences wrapping the whole file
[ ] No conversational text or LLM artifacts
[ ] No fabricated ḥadīth citations
[ ] No dressed-up folk material posing as authentic ḥadīth
Honesty checks
[ ] If content is weak — graded honestly with optional adhkār-tradition note
[ ] If content is folk — clearly flagged as folk, not as hadith
[ ] If content has contested elements — debate presented fairly with safer alternative
[ ] If source is unverified — explicitly marked pending
Render test
[ ] Open render.html?file=your-new-file.md
[ ] Meta-card displays with correct grade badge color
[ ] TOC appears with all ## sections
[ ] All 4 reading modes work
[ ] Mobile layout doesn't break (resize to ~400px)
[ ] All <details> open and close cleanly
[ ] Bottom verify link is clickable
[ ] No console errors in browser DevTools
Index update
[ ] Entry added under correct category in index.html
[ ] Path uses render.html?file=... format
[ ] Link works from homepage
If all pass → commit. May Allah accept the work.

🌿 Final Word for Contributors
You are not just authoring a document. You are participating in a 1400-year chain of preservation that began with the Companions writing on date palm fronds and animal scapulae. Every word you transcribe carefully, every grade you flag honestly, every fabrication you refuse to propagate — these are acts of trust (amānah) in the trust the Prophet ﷺ left to his ummah.
The Prophet ﷺ said: "Convey from me, even if it is one verse." — Bukhārī 3461.
Convey honestly. Convey carefully. Convey with foundation.
Compiled for ✦ the foam of the seas.

