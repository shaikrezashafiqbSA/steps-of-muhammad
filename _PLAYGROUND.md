::meta
narrator: This is a template — not a real prophetic narration
collection: Steps of Muhammad Project
book: Render.html v4.3 Feature Showcase
hadith: TEMPLATE-001
grade: unknown
left-orb: 🧪 TEMPLATE · Playground
right-orb: 🪶 Not For Recitation
verify: https://github.com/yourusername/yourrepo
::

# 🎴 The Playground — Living Feature Showcase

> **⚠️ Not a real duʿā.** This document uses mock/placeholder content to demonstrate every feature available in `render.html`. Do NOT recite the placeholder text. Use this file as a **reference for what's possible** when authoring real content.

---

## 📜 What This Document Is

This is the **living template** for the Steps of Muhammad project. It shows — by demonstration + source code — every formatting tool you can use when authoring `.md` files in this archive.

**How to use it:**
1. Scroll through and see what's possible
2. When you find a feature you want, look at the "🔧 How to write this" block below it
3. Copy the source markdown into your own file
4. Tweak to your content

**For contributors:** When new features are added to `render.html`, they should be added to THIS file first. This file is the source of truth for "what render.html v4.3 can do."

---

## 🎛️ UI Features Available On Every Page

These work no matter what markdown you load. They're rendered by `render.html` itself.

### 🅰️ Floating Reading Mode Fan (Bottom-Left)

A circular button on the bottom-left that fans up into 4 reading modes:

| Icon | Mode | What you see |
|---|---|---|
| **أ** | Arabic-first | Arabic + English, transliteration hidden |
| **Aa** | Learner | Arabic + English + transliteration (full stack) |
| **🔊** | Verbal | Transliteration prominent, Arabic faded |
| **ٱ** | Arabic-only | Pure large Arabic, no English |

Your last-chosen mode is remembered across sessions. The trigger button shows your current mode's icon.

### 🔍 Floating Zoom (Bottom-Right)

Two circular buttons: `🔍+` and `🔍−`. Adjusts text size across 5 levels (default = level 3).

**Keyboard shortcuts:**
- `Ctrl/Cmd + +` → zoom in
- `Ctrl/Cmd + −` → zoom out
- `Ctrl/Cmd + 0` → reset to default

### 📜 Floating TOC (Bottom-Right)

A circular `📜` button appears when the page has ≥2 `H2`/`H3` headings. Click → floating panel opens with section links. Click any link → page scrolls + auto-expands `<details>` drawers in that section. Click outside or press `Esc` → closes.

---

## 🏷️ The `::meta` Block

Every file starts with a front-matter block that renders the orb-bar at top of page.

### Full Schema (All Fields)

🔧 **How to write this:**

```
::meta
narrator: [Companion name with honorific (raḍiyallāhu ʿanhu)]
collection: [Canonical collection name with macrons]
book: Book [N] · [Book title]
hadith: [Hadith number]
grade: [sahih | hasan | daif | mawdu | mutawatir | unknown]
left-orb: [📖 Display text for left pill]
right-orb: [Display text for right pill]
verify: https://sunnah.com/...
::
```

### Field-by-Field Behavior

| Field | What it does | Visible? |
|---|---|---|
| `narrator` | Stored as `data-narrator` attr on orb-bar | Hidden — future search |
| `collection` | Stored as `data-collection` attr — also used as fallback if `left-orb` missing | Hidden by default |
| `book` | Stored as `data-book` attr | Hidden — future search |
| `hadith` | Stored as `data-hadith` attr | Hidden — future search |
| `grade` | Stored as `data-grade` attr | Hidden — future filter/search |
| `left-orb` | **Renders as left pill at top of page** | ✅ Visible |
| `right-orb` | **Renders as right pill at top of page** | ✅ Visible |
| `verify` | Stored as `data-verify` attr | Hidden — semantic data only |

### Right-Orb Color Auto-Detection

If `right-orb` contains certain keywords, it gets auto-colored:

| Keyword in `right-orb:` text | Pill color |
|---|---|
| `sahih` or `ṣaḥīḥ` | 🟢 Green |
| `hasan` or `ḥasan` | 🔵 Blue |
| `daif` or `ḍaʿīf` | 🟠 Amber |
| `mawdu` or `mawḍūʿ` | 🔴 Crimson |
| `mutawatir` or `mutawātir` | 🟢 Deep green |
| (none match) | ⚪ Neutral cream |

This means `right-orb: Sahih (Darussalam)` → green pill. `right-orb: Da'if (Al-Albani)` → amber pill. No CSS edit needed.

---

## ✍️ Standard Markdown Features

All standard GitHub-Flavored Markdown works.

### Headings

# H1 — Page Title (only one per file)

## H2 — Major Section (auto-added to TOC)

### H3 — Subsection (auto-added to TOC)

#### H4 — Minor heading

🔧 **How to write this:**

```
# H1 — Page Title (only one per file)
## H2 — Major Section (auto-added to TOC)
### H3 — Subsection (auto-added to TOC)
#### H4 — Minor heading
```

### Text Styling

**Bold text** for emphasis. *Italic text* for softer emphasis. ~~Strikethrough~~ for deletion. `Inline code` for technical terms.

🔧 **How to write this:**

```
**Bold text** for emphasis. *Italic text* for softer emphasis.
~~Strikethrough~~ for deletion. `Inline code` for technical terms.
```

### Lists

**Bulleted:**
- First item
- Second item
  - Nested item
  - Another nested
- Third item

**Numbered:**
1. First step
2. Second step
3. Third step

🔧 **How to write this:**

```
- First item
- Second item
  - Nested item
  - Another nested
- Third item

1. First step
2. Second step
3. Third step
```

### Blockquotes

> *"Standard blockquote — useful for narration translations, scholarly quotes, or operational notes."*

> 📝 **Tip:** Add emoji and bold at start of blockquote to create attention callouts for warnings, tips, or notes.

🔧 **How to write this:**

```
> *"Standard blockquote — italicized for translation feel."*

> 📝 **Tip:** Add emoji and bold at start for callouts.
```

### Links

[Internal link to another file in archive](?file=_PLAYGROUND.md)

[External link to sunnah.com](https://sunnah.com/bukhari:6306)

[Link to specific section within this file](#word-stacks-the-core-feature)

🔧 **How to write this:**

```
[Internal link to another file](?file=path/to/file.md)
[External link](https://sunnah.com/bukhari:6306)
[Link to section in this file](#heading-slug)
```

### Horizontal Rules

---

🔧 **How to write this:**

```
---
```

### Tables

| Column A | Column B | Column C |
|---|---|---|
| Row 1A | Row 1B | Row 1C |
| Row 2A | Row 2B | Row 2C |

🔧 **How to write this:**

```
| Column A | Column B | Column C |
|---|---|---|
| Row 1A | Row 1B | Row 1C |
```

### Code Blocks

```
This is a plain code block.
Useful for showing examples of source markdown.
```

🔧 **How to write this:**

````
```
This is a plain code block.
```
````

---

## 🔤 Word Stacks — The Core Feature

The signature feature. Renders Arabic, English gloss, and transliteration together as one visual unit. Consecutive stacks auto-group into an "ayah block" (cream rounded card).

### 3-Part Stack (Full)

[[لَا|no|lā]] [[إِلَٰهَ|deity|ilāha]] [[إِلَّا|except|illā]] [[اللَّهُ|Allah|llāhu]]

🔧 **How to write this:**

```
[[لَا|no|lā]] [[إِلَٰهَ|deity|ilāha]] [[إِلَّا|except|illā]] [[اللَّهُ|Allah|llāhu]]
```

### 2-Part Stack (No Transliteration)

[[سُبْحَانَ اللَّهِ|glory be to Allah]]

🔧 **How to write this:**

```
[[سُبْحَانَ اللَّهِ|glory be to Allah]]
```

### 1-Part Stack (Arabic Only)

[[وَ الْحَمْدُ لِلَّهِ]]

🔧 **How to write this:**

```
[[وَ الْحَمْدُ لِلَّهِ]]
```

### Auto-Grouping Behavior

When you write **consecutive stacks separated by spaces**, they auto-group into ONE ayah block:

[[رَبِّ|my Lord|rabbi]] [[اشْرَحْ|expand|ishraḥ]] [[لِي|for me|lī]] [[صَدْرِي|my chest|ṣadrī]]

When you put a **blank line between stacks**, they form TWO separate ayah blocks:

[[رَبِّ|my Lord|rabbi]] [[اشْرَحْ|expand|ishraḥ]] [[لِي|for me|lī]] [[صَدْرِي|my chest|ṣadrī]]

[[وَ يَسِّرْ|and ease|wa yassir]] [[لِي|for me|lī]] [[أَمْرِي|my affair|amrī]]

🔧 **How to write this:**

```
[[رَبِّ|my Lord|rabbi]] [[اشْرَحْ|expand|ishraḥ]] [[لِي|for me|lī]] [[صَدْرِي|my chest|ṣadrī]]

[[وَ يَسِّرْ|and ease|wa yassir]] [[لِي|for me|lī]] [[أَمْرِي|my affair|amrī]]
```

This is how you control **clause chunking** — each clause becomes its own visual unit.

### Escape Syntax — Literal Brackets

If you want literal `[[double brackets]]` in your text (not parsed as a word stack), escape with backslash:

This is literal: \[[not a word stack]]

🔧 **How to write this:**

```
This is literal: \[[not a word stack]]
```

### Tips For Authoring Word Stacks

- **One word per stack** — don't put phrases inside a single stack (breaks reading flow)
- **Glosses are lowercase** — except for proper nouns (Allah, Muhammad)
- **Transliterations use academic diacritics** — ā ī ū · ḥ ṣ ṭ ḍ ẓ · ʿ · ʾ
- **Tashkeel is mandatory** — every Arabic letter that takes a vowel must show its harakah

---

## 🗂️ Collapsible Drawers (`<details>`)

Hide supplementary content behind a click. Closed by default.

### Closed By Default

<details>
<summary>📚 Click to reveal the chain of transmission</summary>

The sanad goes here. Could be plain text, could be word-stacks, could be a mix.

[[حَدَّثَنَا|narrated to us|ḥaddathanā]] [[أَحْمَدُ|Aḥmad|aḥmadu]] [[بْنُ|son of|bnu]] [[حَنْبَلٍ|Ḥanbal|ḥanbalin]]

The drawer can contain any markdown — paragraphs, lists, word stacks, blockquotes, even nested drawers.

</details>

🔧 **How to write this:**

```
<details>
<summary>📚 Click to reveal the chain of transmission</summary>

Content goes here. Can be any markdown.

</details>
```

### Open By Default

<details open>
<summary>🌟 This drawer is open when the page loads</summary>

Add the `open` attribute to the `<details>` tag to start expanded.

Useful when you want users to see content but still let them collapse it.

</details>

🔧 **How to write this:**

```
<details open>
<summary>🌟 This drawer is open when the page loads</summary>

Content here.

</details>
```

### Nested Drawers

<details>
<summary>🎴 Outer drawer — click to expand</summary>

This is the outer content.

<details>
<summary>📖 Inner drawer — also clickable</summary>

This is nested content. You can nest as deep as you want.

<details>
<summary>🪶 Triple-nested</summary>

Goes inside the inner drawer.

</details>

</details>

</details>

🔧 **How to write this:**

```
<details>
<summary>🎴 Outer drawer</summary>

Outer content.

<details>
<summary>📖 Inner drawer</summary>

Inner content.

</details>

</details>
```

---

## 🎨 Embedded HTML

The renderer accepts raw HTML for richer content.

### Images

🔧 **How to write this:**

```
<img src="./black-flag.jpeg" alt="Description" style="max-width: 100%; border-radius: 8px;">
```

### YouTube Embed

🔧 **How to write this:**

```
<iframe width="100%" height="200"
  src="https://www.youtube.com/embed/VIDEO_ID"
  frameborder="0"
  allow="autoplay; encrypted-media"
  allowfullscreen></iframe>
```

### Audio Player

🔧 **How to write this:**

```
<audio controls src="./path/to/audio.mp3"></audio>
```

### Custom Inline Styling

<div style="background: rgba(176, 138, 75, 0.15); border: 1px solid rgba(176, 138, 75, 0.4); border-radius: 8px; padding: 1rem; margin: 1rem 0;">

📌 **Custom-styled callout box.** Useful for special highlights when standard blockquotes don't fit.

</div>

🔧 **How to write this:**

```
<div style="background: rgba(176, 138, 75, 0.15); border: 1px solid rgba(176, 138, 75, 0.4); border-radius: 8px; padding: 1rem; margin: 1rem 0;">

📌 **Custom callout.**

</div>
```

---

## 🎭 Stylistic Conventions (Not Hard Features)

These are **project authoring conventions** — they're not enforced by render.html but are how the archive's existing content is styled. Following them keeps the archive visually unified.

### Convention 1 — The Operational Cue Bold

In hadith narration sections, **bold** the exact instruction line that introduces the duʿā.

**Example:**

Abū Hurayra reported: **The Messenger of Allah ﷺ used to say after every prayer:** *[the duʿā below]*

> *"There is no deity except Allah alone..."*

🔧 **How to write this:**

```
Abū Hurayra reported: **The Messenger of Allah ﷺ used to say after every prayer:** *[the duʿā below]*

> *"There is no deity except Allah alone..."*
```

### Convention 2 — Italicized Blockquote For Translations

Wrap the English translation of the duʿā in a blockquote (`>`), italicized.

### Convention 3 — Standard Section Headings

Most cards follow this skeleton:

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

The exact section emojis are conventions: 📜 for the hadith, 🔤 for word-by-word, 📚 for the Arabic drawer.

### Convention 4 — The Verify Line At Bottom

Always italicize. Always include the canonical sunnah.com or quran.com URL.

🔧 **How to write this:**

```
*🔗 Verify on sunnah.com — [Bukhārī 6306](https://sunnah.com/bukhari:6306)*
```

### Convention 5 — Honorifics

- **ﷺ** after the Prophet's name (not "(saw)" or "PBUH")
- **(raḍiyallāhu ʿanhu)** after male Companions
- **(raḍiyallāhu ʿanhā)** after female Companions
- **(ʿalayhi-s-salām)** after other Prophets
- **(raḥimahu-llāh)** after deceased scholars

### Convention 6 — Diacritics In English Text

When writing Arabic names in English prose, use academic transliteration:
- `ā ī ū` (long vowels) — NOT `aa ee oo`
- `ḥ ṣ ṭ ḍ ẓ` (emphatic consonants) — NOT plain `h s t d z`
- `ʿ` (ʿayn) — NOT apostrophe `'`
- `ʾ` (hamza) — NOT apostrophe `'`

---

## 📊 Table Of Contents — Auto-Generated

This entire document has a TOC button (📜 in bottom-right). Click it to see all the H2/H3 sections.

The TOC is **automatically built** from any file's `##` and `###` headings — no manual maintenance needed. When a file has fewer than 2 such headings, the button is hidden.

**TOC behaviors:**
- Click any link → page scrolls to section
- If section contains `<details>` drawers → they auto-expand
- TOC panel auto-closes after click
- Click outside panel → closes
- Press `Esc` → closes

---

## 🔗 URL Hash Deep-Linking

Any heading can be linked directly via URL hash. For example:

`render.html?file=_PLAYGROUND.md#word-stacks-the-core-feature`

When loaded, the page auto-scrolls AND auto-expands any `<details>` ancestor of the target. This means you can share deep-links to specific subsections — even if they're inside collapsed drawers.

---

## 🧪 Edge Cases & Tips

### Mixing Word Stacks With Prose

You can put prose between ayah blocks. Each block of consecutive stacks becomes one ayah; prose paragraphs render normally between them.

Here's the opening tahlīl:

[[لَا|no|lā]] [[إِلَٰهَ|deity|ilāha]] [[إِلَّا|except|illā]] [[اللَّهُ|Allah|llāhu]]

Then continues with the affirmation:

[[وَحْدَهُ|alone|waḥdahu]] [[لَا|no|lā]] [[شَرِيكَ|partner|sharīka]] [[لَهُ|for Him|lahu]]

### Mode-Sensitive Display

Word stacks behave differently in each Reading Mode:

| Mode | Arabic | English | Translit |
|---|---|---|---|
| **أ Arabic-first** | Larger | Visible | Hidden |
| **Aa Learner** | Standard | Visible | Visible |
| **🔊 Verbal** | Faded | Visible | Prominent + above Arabic |
| **ٱ Arabic-only** | Largest | Hidden | Hidden |

Test your authored content in ALL four modes to ensure it works visually.

### Zoom-Sensitive Display

Word stacks (and all text) scale at 5 zoom levels. At level 1, more content fits on screen at once but text is smaller. At level 5, text is largest for accessibility.

---

## 🛠️ When Should I Use What?

Quick decision table:

| You want to... | Use |
|---|---|
| Show Arabic + English + transliteration as one visual unit | Word stacks `[[ar\|en\|tr]]` |
| Show a chunk break / new clause | Blank line between stacks |
| Hide supplementary content (chain of transmission, scholarly notes) | `<details><summary>...</summary>` |
| Add narrator's English translation prominently | Italicized blockquote `> *"..."*` |
| Add the operational instruction line | Bold inline text in narration |
| Cite the source | `*🔗 Verify on sunnah.com — [Citation](URL)*` |
| Mark text as a project warning | Blockquote with `⚠️` emoji + bold |
| Add a counter / repetition note | Prose like "Recite 33 times" before the stacks |
| Embed audio recitation | `<audio controls src="...">` |
| Embed video lecture | `<iframe ...>` for YouTube |
| Display a custom-styled callout | `<div style="...">...</div>` |
| Link to another archive file | `[label](?file=path/file.md)` |
| Deep-link to a section | `[label](?file=path/file.md#heading-slug)` |
| Show colored grade pill | Use `right-orb:` with grade keyword |

---

## 📋 Quick Author Checklist

Before publishing any new file, run through this:

- [ ] `::meta` block at top with all relevant fields
- [ ] `left-orb` and `right-orb` set explicitly
- [ ] Single `# H1` for page title
- [ ] At least one `## H2` section (otherwise TOC won't show)
- [ ] Word stacks have 1, 2, or 3 pipe-separated parts (no broken `[[...]]`)
- [ ] Tashkeel on every Arabic word
- [ ] Honorifics consistent (`ﷺ`, `(raḍiyallāhu ʿanhu)`, etc.)
- [ ] Verify link at bottom, italicized, with valid URL
- [ ] Test in all 4 reading modes
- [ ] Test on mobile width (≤ 400px)

---

## 🚀 Living Document Note

**For maintainers:** When new features are added to `render.html`:

1. Add the new feature to THIS file first
2. Demonstrate it in context
3. Show source code under "🔧 How to write this:"
4. Update the version note below

**Current `render.html` version covered:** v4.3 (Pokémon-card orb bar · floating TOC · floating Zoom · floating Reading Mode fan · auto-generated TOC · `<details>` drawers · word-stack engine · auto-grouping ayah blocks)

**Last updated:** When you next add a feature, update here

---

*🔗 This is the playground file. For real content, see the archive index at [index.html](./index.html).*
