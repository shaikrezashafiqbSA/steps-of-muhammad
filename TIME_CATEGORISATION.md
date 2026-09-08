::meta
collection: Steps of Muhammad — Internal Documentation
book: Time-based / functional hybrid categorisation
grade: reference
left-orb: 🕰️ Taxonomy
left-orb-compact: 🕰️
right-orb: Reference
right-orb-compact: ۞
::

# The Prophetic Clock — Time × Function Categorisation

How Action View decides what to show you, where every duʿā in the vault sits
on the clock, and what is verified but not yet authored.

---

## 1 · Why a clock and not a theme index

Ḥiṣn al-Muslim and its descendants index by **occasion**: you must already know
you have a need, name it, and go looking. That is a lookup tool. It answers
*"what do I say when X happens."*

The clock inverts it. It answers *"it is now — what did he ﷺ do at this hour."*
You do not have to name a need first. The hour names it for you.

Neither replaces the other, which is why both views ship. **Compendium** is the
lookup tool. **Action** is the standing order.

### The hybrid
Pure time-slotting fails, because most duʿās of need are not tied to an hour.
Pure theme-slotting fails, because the ones that *are* tied to an hour get lost
in a themed list. So each entry carries one of three kinds of `time` tag:

| Tag kind | Meaning | Example |
|---|---|---|
| A window id | The narration fixes this hour | `night-last-third` for the tahajjud opening |
| `*salah` / `*adhan` | Tied to the prayer, whichever prayer it is | The post-taslīm set |
| `*any` | The need sets the time, not the sky | Yā Muqallibal-Qulūb |

`*any` entries are never forced into a window. They live under **Any hour**, and
they are always reachable. Nothing about this taxonomy narrows what a person may
ask for or when.

---

## 2 · The eleven windows

Nine are **clock windows** — at any instant exactly one is current, computed from
your latitude and longitude. Two are **companions**: they ride alongside whatever
window is running, because they describe a state a person enters rather than an
hour the sky reaches.

### 🌅 AL-NAHĀR — the daytime cycle

| Id | Runs from → to | Character |
|---|---|---|
| `day-fajr-adhan` | Fajr → Fajr + 30 min (capped at sunrise) | Post-adhān, before the prayer stands up |
| `day-fajr-post` | end of adhān window → sunrise | Morning adhkār |
| `day-duha` | sunrise → zenith | Work, provision, the day being earned |
| `day-dhuhr` | Ẓuhr → ʿAṣr | Midday and the long afternoon |
| `day-asr-post` | ʿAṣr → sunset | Evening adhkār |

### 🌌 AL-LAYL — the night cycle

The night runs sunset → next Fajr and is cut in three equal parts.

| Id | Runs from → to | Character |
|---|---|---|
| `night-maghrib` | sunset → ʿIshāʾ | The day handed over |
| `night-isha-post` | ʿIshāʾ → end of first third | Settling |
| `night-2nd-third` | first third → second third | Waking without meaning to |
| `night-last-third` | second third → Fajr | Tahajjud, istighfār, the descent |
| `night-1st-third` *(companion)* | sunset → end of first third | Household winding down |
| `night-presleep` *(companion)* | ʿIshāʾ → Fajr, or on demand | In bed, eyes about to close |

**Why pre-sleep is a companion and not a window.** People go to bed at 21:00 and
at 03:00. No hour owns it. So it rides along all night, and the *Going to bed*
button pins it whenever the reader actually gets in.

### How the times are computed
NOAA low-precision solar equations, run on the device — no prayer-time API, no
network. Sunrise, Ẓuhr, ʿAṣr and Maghrib land within about a minute of published
tables. Fajr and ʿIshāʾ depend entirely on which twilight angle your authority
uses, so the method is selectable: MWL 18/17, **JAKIM / MUIS 20/18**, ISNA 15/15,
Egypt 19.5/17.5, Karachi 18/18, Umm al-Qurā 18.5 / 90 min. ʿAṣr takes a shadow
factor of 1 (Shāfiʿī / Mālikī / Ḥanbalī) or 2 (Ḥanafī).

*Verified against MUIS Singapore for 8 September 2026: computed Fajr 05:41 (table
05:39), Ẓuhr 13:03 (13:04), ʿAṣr 16:10 (16:14), Maghrib 19:06 (19:07), ʿIshāʾ
20:15 (20:16).* This is a guide, not a replacement for your local timetable.

---

## 3 · The naming contract

Every atomic entry carries **three** names, and they do different jobs.

| Field | Job | Example |
|---|---|---|
| `label` | **Familiar sound.** What you actually call it out loud | `Sayyid al-Istighfār` |
| `gloss` | **Plain function**, one line, no Arabic assumed | *The chief of seeking forgiveness — say it with certainty and you are of Jannah* |
| `ref` | **Technical citation**, numbered as sunnah.com numbers it | `Bukhārī 6306` |

Plus `grade` (ṣaḥīḥ / ḥasan / ḍaʿīf, omitted for compiled wird), `reps` where the
narration fixes a count, and `time`.

The old labels mixed all three into one sentence — *"People of Jannah: Read with
Firm Faith - Chief of Seeking Forgiveness"* — which reads as a headline, not a
name. You cannot scan a list of headlines. You can scan a list of names.

---

## 4 · Newly scouted and verified — authored into the vault

Ten windows had no coverage. The following were scouted on sunnah.com, checked
for grading, and written as full cards. Every one is **Ṣaḥīḥ**.

### Bismika Amūtu wa Aḥyā
* **Time Category:** `night-presleep` + on waking
* **Core Benefit:** Closes the night and opens the morning in the same breath — sleep rehearsed as a small death.
* **Hadith Source:** Ṣaḥīḥ al-Bukhārī 6312 (Book 80, Ḥadīth 9)
* **Authenticity Grading:** Ṣaḥīḥ — al-Bukhārī
* **Arabic:** `بِاسْمِكَ أَمُوتُ وَأَحْيَا` · `الْحَمْدُ لِلَّهِ الَّذِي أَحْيَانَا بَعْدَ مَا أَمَاتَنَا وَإِلَيْهِ النُّشُورُ`
* **Transliteration:** *Bismika amūtu wa aḥyā* · *Al-ḥamdu lillāhi lladhī aḥyānā baʿda mā amātanā wa ilayhi n-nushūr*
* **Translation:** "In Your name I die and I live." · "All praise is for Allah who gave us life after He caused us to die, and to Him is the resurrection."

### Allāhumma Aslamtu Wajhī Ilayk
* **Time Category:** `night-presleep`
* **Core Benefit:** Wuḍūʾ, right side, these words — and if you die that night you die upon the fiṭrah.
* **Hadith Source:** Ṣaḥīḥ al-Bukhārī 247 (Book 4, Ḥadīth 113)
* **Authenticity Grading:** Ṣaḥīḥ — al-Bukhārī
* **Arabic:** `اللَّهُمَّ أَسْلَمْتُ وَجْهِي إِلَيْكَ، وَفَوَّضْتُ أَمْرِي إِلَيْكَ، وَأَلْجَأْتُ ظَهْرِي إِلَيْكَ، رَغْبَةً وَرَهْبَةً إِلَيْكَ، لَا مَلْجَأَ وَلَا مَنْجَا مِنْكَ إِلَّا إِلَيْكَ، اللَّهُمَّ آمَنْتُ بِكِتَابِكَ الَّذِي أَنْزَلْتَ، وَبِنَبِيِّكَ الَّذِي أَرْسَلْتَ`
* **Transliteration:** *Allāhumma aslamtu wajhī ilayk, wa fawwaḍtu amrī ilayk, wa aljaʾtu ẓahrī ilayk, raghbatan wa rahbatan ilayk. Lā maljaʾa wa lā manjā minka illā ilayk. Allāhumma āmantu bikitābika lladhī anzalta, wa binabiyyika lladhī arsalta.*
* **Translation:** "O Allah, I surrender my face to You, entrust my affair to You, and lean my back upon You, in hope and in fear of You. There is no refuge and no escape from You except to You. O Allah, I believe in Your Book which You sent down, and in Your Prophet whom You sent."
* **Note:** The wording is taught, not improvised — when al-Barāʾ said *wa rasūlik*, he ﷺ corrected him to *wa nabiyyika lladhī arsalt*.

### Man Taʿārra mina-l-Layl
* **Time Category:** `night-2nd-third` (also `night-last-third`)
* **Core Benefit:** The formula for waking in the dark without meaning to — say it, then ask, and you are answered.
* **Hadith Source:** Ṣaḥīḥ al-Bukhārī 1154 (Book 19, Ḥadīth 35)
* **Authenticity Grading:** Ṣaḥīḥ — al-Bukhārī
* **Arabic:** `لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ، وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ. الْحَمْدُ لِلَّهِ، وَسُبْحَانَ اللَّهِ، وَلَا إِلَهَ إِلَّا اللَّهُ، وَاللَّهُ أَكْبَرُ، وَلَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللَّهِ` ثم `اللَّهُمَّ اغْفِرْ لِي`
* **Transliteration:** *Lā ilāha illa llāhu waḥdahu lā sharīka lah, lahu l-mulku wa lahu l-ḥamd, wa huwa ʿalā kulli shayʾin qadīr. Al-ḥamdu lillāh, wa subḥāna llāh, wa lā ilāha illa llāh, wa llāhu akbar, wa lā ḥawla wa lā quwwata illā billāh.* Then: *Allāhumma-ghfir lī.*
* **Translation:** "There is no god but Allah alone, no partner has He. His is the dominion and His is the praise, and He is over everything All-Powerful. All praise is for Allah, and glory be to Allah, and there is no god but Allah, and Allah is the Greatest, and there is no might nor power except by Allah." Then: "O Allah, forgive me."

### Allāhumma Laka-l-Ḥamd
* **Time Category:** `night-last-third`
* **Core Benefit:** His ﷺ opening of tahajjud — the world re-anchored in eleven truths before a single request is made.
* **Hadith Source:** Ṣaḥīḥ al-Bukhārī 1120 (Book 19, Ḥadīth 1)
* **Authenticity Grading:** Ṣaḥīḥ — al-Bukhārī
* **Arabic (opening):** `اللَّهُمَّ لَكَ الْحَمْدُ أَنْتَ قَيِّمُ السَّمَاوَاتِ وَالْأَرْضِ وَمَنْ فِيهِنَّ…`
* **Transliteration:** *Allāhumma laka l-ḥamd, anta qayyimu s-samāwāti wa-l-arḍi wa man fīhinn…*
* **Translation:** "O Allah, for You is the praise. You are the Sustainer of the heavens and the earth and whoever is in them…"

### Tasbīḥ Fāṭimah
* **Time Category:** `night-presleep`
* **Core Benefit:** He offered it to Fāṭimah instead of the servant she asked for, and called it the better of the two.
* **Hadith Source:** Ṣaḥīḥ al-Bukhārī 3705 (Book 62, Ḥadīth 55)
* **Authenticity Grading:** Ṣaḥīḥ — al-Bukhārī
* **Arabic:** `سُبْحَانَ اللَّهِ` ×33 · `الْحَمْدُ لِلَّهِ` ×33 · `اللَّهُ أَكْبَرُ` ×34
* **Transliteration:** *Subḥāna llāh* ×33 · *Al-ḥamdu lillāh* ×33 · *Allāhu akbar* ×34
* **Translation:** "Glory be to Allah" · "All praise is for Allah" · "Allah is the Greatest"

### Al-Muʿawwidhāt bi-n-Nafth
* **Time Category:** `night-presleep`
* **Core Benefit:** The nightly sealing of the body — three sūrahs breathed into the palms and wiped over, three times.
* **Hadith Source:** Ṣaḥīḥ al-Bukhārī 5017 (Book 66, Ḥadīth 39)
* **Authenticity Grading:** Ṣaḥīḥ — al-Bukhārī
* **Arabic:** Sūrah al-Ikhlāṣ (112), al-Falaq (113), an-Nās (114)
* **Translation:** "Whenever the Prophet ﷺ went to his bed each night, he would cup his hands, breathe into them, recite the three, then wipe whatever he could of his body — head, face, and the front — three times."

### Āyat al-Kursī at Night
* **Time Category:** `night-presleep`
* **Core Benefit:** A guardian appointed over you, and no devil near you until morning.
* **Hadith Source:** Ṣaḥīḥ al-Bukhārī 2311 (Book 40, Ḥadīth 10)
* **Authenticity Grading:** Ṣaḥīḥ — al-Bukhārī
* **Arabic:** `اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ…` (Qurʾān 2:255)
* **Transliteration:** *Allāhu lā ilāha illā huwa l-ḥayyu l-qayyūm…*
* **Translation:** "Allah — there is no god except Him, the Ever-Living, the Sustainer of all…"

### Amsaynā wa Amsā-l-Mulku Lillāh
* **Time Category:** `night-maghrib` (morning form: `day-fajr-post`)
* **Core Benefit:** The kingdom enters evening with you — ask for the good of this night and refuge from its evil.
* **Hadith Source:** Ṣaḥīḥ Muslim 2723a (Book 48, Ḥadīth 100)
* **Authenticity Grading:** Ṣaḥīḥ — Muslim
* **Arabic:** `أَمْسَيْنَا وَأَمْسَى الْمُلْكُ لِلَّهِ وَالْحَمْدُ لِلَّهِ…`
* **Transliteration:** *Amsaynā wa amsā l-mulku lillāhi wa-l-ḥamdu lillāh…*
* **Translation:** "We have entered the evening and the dominion has entered the evening belonging to Allah, and all praise is for Allah…"

### Allāhumma Bika Aṣbaḥnā
* **Time Category:** `day-fajr-post` and `day-asr-post`
* **Core Benefit:** Hand the day over the instant it starts — and the night, in the same words.
* **Hadith Source:** Sunan Abī Dāwūd 5068 (Book 43, Ḥadīth 296)
* **Authenticity Grading:** Ṣaḥīḥ — al-Albānī
* **Arabic:** `اللَّهُمَّ بِكَ أَصْبَحْنَا وَبِكَ أَمْسَيْنَا وَبِكَ نَحْيَا وَبِكَ نَمُوتُ وَإِلَيْكَ النُّشُورُ`
* **Transliteration:** *Allāhumma bika aṣbaḥnā wa bika amsaynā wa bika naḥyā wa bika namūtu wa ilayka n-nushūr*
* **Translation:** "O Allah, by You we enter the morning, by You we enter the evening, by You we live, by You we die, and to You is the resurrection."

### Four Rakʿah at the Start of the Day
* **Time Category:** `day-duha`
* **Core Benefit:** A ḥadīth qudsī trade — give Him four rakʿah at the head of the day and He suffices you for the rest of it.
* **Hadith Source:** Sunan Abī Dāwūd 1289 (Book 5, Ḥadīth 40)
* **Authenticity Grading:** Ṣaḥīḥ — al-Albānī
* **Arabic:** `يَا ابْنَ آدَمَ لَا تُعْجِزْنِي مِنْ أَرْبَعِ رَكَعَاتٍ فِي أَوَّلِ نَهَارِكَ أَكْفِكَ آخِرَهُ`
* **Transliteration:** *Yā bna Ādama lā tuʿjiznī min arbaʿi rakaʿātin fī awwali nahārika akfika ākhirah*
* **Translation:** "Son of Adam, do not fail Me in four rakʿah at the beginning of your day — I will suffice you for the end of it."

---

## 5 · Corrections made while mapping

Two citations in the vault were wrong and are now fixed.

* **Tasbīḥ · Taḥmīd · Takbīr after ṣalāh** was cited as *Ṣaḥīḥ Muslim 1410*. That
  number is a marriage ḥadīth. The narration of the poor Emigrants with 33·33·34
  is **Muslim 595a** (and Bukhārī 843); the "foam of the sea" wording, which pairs
  33·33·33 with the tahlīl as the hundredth, is **Muslim 597a**. The card now
  carries both and says which count belongs to which.
* **Mukhliṣīna Lahu-d-Dīn** carried a book and ḥadīth number with no collection
  named. It is **Sunan an-Nasāʾī 1339**, Book of Forgetfulness, chapter on the
  tahlīl after the taslīm.

---

## 6 · Known broken links, pre-existing

Nine menu entries point at files deleted in commit `3af856e` ("cleared up html")
and never restored. They are left in place rather than removed, because deciding
their fate is the author's call, not the restructure's:

`content/salah/before/solat-collection.md` · `content/salah/after/solat-collection.md` ·
`salawat/salawat-adnani.html` · `Wird/tahlil.html` · `Wird/istighfar-rajab.html` ·
`Dua Haj/takbir-eiduladha.html` · `Dua Haj/dua-prophets-made-on-arafah.html` ·
`Dua Haj/dua-sahabah-made-on-arafah.html` · `Dua Haj/Amalan Haj.html`

---

## 7 · Verified but not yet authored — the next batch

Scouted and graded, ready to become cards. None is in the vault yet.

| Duʿāʾ | Window | Source | Grading |
|---|---|---|---|
| Wasīlah request after the adhān (full Muslim wording) | `*adhan` | Muslim 384 | Ṣaḥīḥ |
| Sayyid al-Istighfār — *evening* recitation | `day-asr-post` | Bukhārī 6306 | Ṣaḥīḥ |
| Keep children in at nightfall; close doors, cover vessels, name Allah | `night-maghrib` | Bukhārī 3280 | Ṣaḥīḥ |
| Last two āyāt of al-Baqarah before sleep | `night-presleep` | Bukhārī 5009 | Ṣaḥīḥ |
| Duʿāʾ al-Qunūt in Witr | `night-isha-post`, `night-last-third` | Abū Dāwūd 1425 | Ṣaḥīḥ (al-Albānī) |
| Duʿāʾ on entering the marketplace | `day-duha` | Tirmidhī 3428 | Ḥasan |
| *Allāhumma innī asʾaluka ʿilman nāfiʿan* — expanded Fajr wording | `day-fajr-post` | Ibn Mājah 925 | Ṣaḥīḥ (Dārussalām) |
| Duʿāʾ on leaving the house — *bismillāh, tawakkaltu ʿala llāh* | `*any` | Abū Dāwūd 5095 | Ṣaḥīḥ |
| Duʿāʾ between the two sajdahs | `*salah` | Ibn Mājah 898 | Ḥasan |
| Refuge from the four, in the tashahhud | `*salah` | Muslim 588 | Ṣaḥīḥ |

Anything graded **Ḍaʿīf**, **Munkar** or **Mawḍūʿ** was excluded during scouting.
Two ḍaʿīf entries already in the vault are kept and marked as such — the colour
band and the grade legend exist precisely so a weak narration can be shown
honestly rather than quietly dropped or quietly promoted.
