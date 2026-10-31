// =========================================================
// SHARED NAVIGATION DATA + CARD-TO-CARD NAVIGATION
//   Single source of truth for the menu tree. Loaded by:
//     index.html                  → Compendium view + Action view
//     web/render.html             → prev / home / next on a card
//
//   Because the tree lives here, a rendered card can work out
//   which category it belongs to and which duʿā comes before
//   and after it — that's what drives the nav bars.
//
//   Each category has: { icon, category, desc, items: [...] }
//   Icon emojis — non-living symbols only
//
//   A `family` item (a divider heading inside a category) shows
//   📚 by default. Give it its own `icon: "💪"` to swap that
//   glyph — e.g. a flexed bicep for a "Strong Believer" family.
// =========================================================
//
// ── ITEM NAMING CONTRACT ─────────────────────────────────
//   Every atomic duʿā carries three names, and they do
//   different jobs. Do not collapse them into one string.
//
//     label  Thematic, plain-English function — what it does
//            for you, one line, as close to the source meaning
//            as possible. Shown first, large, at a glance.
//            "The duʿāʾ he ﷺ said most often: hold my heart
//            firm on Your dīn". This is the primary display name.
//
//     gloss  Familiar sound. What a person actually calls this
//            duʿā out loud — the incipit, transliterated.
//            "Sayyid al-Istighfār", "Yā Muqallibal-Qulūb".
//            Shown secondary, under the label.
//
//     ref    Technical citation. Collection + hadith number,
//            exactly as sunnah.com numbers it, so the claim is
//            checkable in one click. "Bukhārī 6306".
//            Omit only where there is genuinely no hadith
//            number — compiled wird, Qurʾānic text, overviews.
//
//   Plus: grade (sahih | hasan | daif — omitted = ungraded
//   wird), reps (recitation count, if the narration fixes one),
//   tier, and time (below).
//
// ── TIME TAGS ────────────────────────────────────────────
//   `time` maps a duʿā onto the prophetic clock. Values are
//   window ids from SomSunClock.TIME_WINDOWS, plus two
//   wildcards that save repeating the same five ids:
//
//     '*salah'  — at or around any of the five farḍ prayers
//     '*adhan'  — on hearing any adhān
//     '*any'    — no fixed hour; the need sets the time
//
//   A duʿā with no `time` key is treated as '*any'.
// =========================================================

const SOM_SALAH_WINDOWS = [
  'day-fajr-adhan', 'day-fajr-post', 'day-dhuhr',
  'day-asr-post', 'night-maghrib', 'night-isha-post'
];

// Expands the wildcards above into concrete window ids.
function somItemWindows(item) {
  const raw = (item && item.time && item.time.length) ? item.time : ['*any'];
  const out = new Set();
  raw.forEach(t => {
    if (t === '*salah' || t === '*adhan') SOM_SALAH_WINDOWS.forEach(w => out.add(w));
    else if (t === '*any') out.add('*any');
    else out.add(t);
  });
  return out;
}

const VAULT_NAVIGATION_TREE = [
    {
    icon: "🤍",
    category: "Duʿā",
    categoryAr: "الدُّعَاءُ",
    desc: "“Call upon Me, I will respond to you” — Qurʾān 40:60",
    items: [
      //forgiveness family
      { type: "family", label: "Ya Allah, forgive me - tear out the inner darknesses before asking", icon: "🖤⛓️🤍", tier: "imam" },
      { label: "100 Daily Forgiveness - When a cloud comes over my heart", gloss: "Allāhumma innī astaghfiruka ...", ref: "Riyāḍ aṣ-Ṣāliḥīn 1869", reps: "daily", tier: "jemaah", grade: "sahih", time: ["*any"], path: "web/render.html?file=content/01-dua/01-forgiveness/forgiveness-100-times.md" },
      { label: "Adam's Forgiveness - The First Repentance", gloss: "Rabbana Zalamna anfusana...", ref: "Qurʾān 2:37", tier: "jemaah", grade: "sahih", time: ["night-presleep", "night-last-third", "*any"], path: "web/render.html?file=content/01-dua/01-forgiveness/forgiveness-adam.md" },
      { label: "Sulaymān's Forgiveness - The Unmatched Kingdom", gloss: "Rabbighfirli ...", ref: "Qurʾān 38:35", tier: "jemaah", grade: "sahih", time: ["night-last-third", "*any"], path: "web/render.html?file=content/01-dua/01-forgiveness/forgiveness-sulaiman.md" },
      { label: "Forgiveness for Predecessors and a Heart Free of Rancor", gloss: ".. wa la taj'al fi qulubina Ghilla..", ref: "Qurʾān 59:10", tier: "jemaah", grade: "sahih", time: ["*salah", "*any"], path: "web/render.html?file=content/01-dua/01-forgiveness/forgive-us-do-not-place-ghilla-in-hearts.md" },
      { label: "Forgiveness for Parents and All Believers", gloss: "Rabbighfir li-walidayhi ..", ref: "Musnad al-Shāmiyīn lil-Ṭabarānī 2118", tier: "jemaah", grade: "hasan", time: ["*salah", "*any"], path: "web/render.html?file=content/01-dua/01-forgiveness/forgiveness-parents-all-believers.md" },

      // General Dua family
      { type: "family", label: "Ya Allah, teach me how to ask you", icon: "🤲", tier: "imam" },
      { label: "Allah's Greatest Name - When He is asked by it, He gives", gloss: "Bi-Annī Ashhadu Annaka Anta-llāh", ref: "Tirmidhī 3475", tier: "jemaah", grade: "sahih", time: ["night-last-third", "*adhan", "*any"], path: "web/render.html?file=content/01-dua/02-asking-allah/in-greatest-of-names.md" },
      { label: "Good in This World and the Next - The dua he ﷺ said most often", gloss: "Rabbana atina fid dunya...", ref:"Qurʾān 2:201", tier: "jemaah", grade:"sahih", time:["*salah", "*any"], path: "web/render.html?file=content/01-dua/02-asking-allah/rabbana-atina-fid-dunya.md"},
      { label: "ʿĀʾishah's Comprehensive Ask - All good, known and unknown", gloss: "Asʾaluka min al-Khayri Kullih", ref: "Ibn Mājah 3846", tier: "imam", grade: "sahih", time: ["night-last-third", "*any"], path: "web/render.html?file=content/01-dua/02-asking-allah/aisyah-comprehensive-ask.md" },
      { label: "Rectification of Religion, World and Hereafter - O Allah, set right for me my religion", gloss: "Allahuma aṣliḥ lī dīniya ...  ", ref: "Muslim 2720", tier: "muhsin",grade: "sahih", time: ["day-fajr-post", "day-asr-post", "*any"], path: "web/render.html?file=content/01-dua/02-asking-allah/o-allah-set-right-for-me-my-religion.md" },
      { label: "Duas of the Servants of the Most Gracious - ʿIbād ar-Raḥmān", gloss: "Rabbana habla min azwajina ...", ref: "Qurʾān 25:63-77", tier: "jemaah", grade: "sahih", time: ["night-last-third", "*any"], path: "web/render.html?file=content/01-dua/02-asking-allah/dua-ibadurrahman.md"},
      { label: "Dua Selamat - Safety in religion, death and the reckoning", gloss: "Allāhumma innā nasʾaluka salāmatan fi din...", tier: "jemaah", grade: "sahih", time: ["*any"], path: "web/render.html?file=content/01-dua/02-asking-allah/dua-selamat.md"},
      // Steadfastness of heart and Din
      { type: "family", label: "Ya Allah, Make me follow you", icon: "🫀", tier: "imam" },
      { label: "A Heart Held Firm on His Dīn - The dua he ﷺ said most often", gloss: "Yā Muqallibal-Qulūb...", ref: "Tirmidhī 2140", tier: "jemaah", grade: "hasan", time: ["*salah", "*any"], path: "web/render.html?file=content/01-dua/03-steadfastness/ya-muqallibal-qulub.md" },
      { label: "Do Not Let Our Hearts Deviate - The ayah he ﷺ would follow up with", gloss: "Rabbana la tuzigh qulubbana...", ref: "Qurʾān 3:8", tier: "jemaah", grade: "sahih", time: ["*salah", "*any"], path: "web/render.html?file=content/01-dua/03-steadfastness/la-tuzigh-qulubana.md"},
      { label: "Ibrahim's Submission - Make us muslim, show us our rites", gloss: "Rabbanā wajʿalnā muslimayni laka", ref: "Qurʾān 26:84-85", tier: "jemaah", grade: "sahih", time: ["night-last-third", "*any"], path: "web/render.html?file=content/01-dua/03-steadfastness/make-us-muslim-show-us-nusuk.md" },
      // Gratitude
      { type: "family", label: "Gratitude & Praise", icon: "🌼", tier: "imam" },
      { label: "Sulaymān's Gratitude - Increase my capacity to be thankful", gloss: "Rabbi Awziʿnī an Ashkura Niʿmatak", ref: "Qurʾān 27:19", tier: "jemaah", grade: "sahih", time: ["day-duha", "day-dhuhr", "*any"], path: "web/render.html?file=content/01-dua/04-gratitude/sulaiman-thankfulness.md" },
      { label: "Praise That Matches His Blessings - Compiled in the Bā ʿAlawī majālis", gloss: "Duʿāʾ al-Ḥamd — Ḥamdan Yuwāfī", ref: "Compiled wird", tier: "muhsin", time: ["day-fajr-post", "day-asr-post", "*any"], path: "web/render.html?file=content/01-dua/04-gratitude/dua-hamdan-yuwafi.md" },
      { label: "Praise After Eating - Past sins forgiven", gloss: "Al-ḥamdu lillāhi-lladhī aṭʿamanī hādhā ...", ref: "Riyāḍ aṣ-Ṣāliḥīn 734", tier: "jemaah", grade: "hasan", time: ["*any"], path: "web/render.html?file=content/01-dua/04-gratitude/eating-alhamdulillah-forgiveness.md"},
      // Quran in heart
      { type: "family", label: "Qurʾān in Heart", tier: "imam" },
      { label: "The Qurʾān, Spring of My Heart - Light of my chest, relief from grief", gloss: "Ijʿali-l-Qurʾāna Rabīʿa Qalbī", ref: "Musnad Aḥmad 3712", tier: "imam", grade: "sahih", time: ["day-duha", "*any"], path: "web/render.html?file=content/01-dua/05-quran-in-heart/quran_spring_heart.md" },
      { label: "The Memoriser's Dua - Clarity, retention, character", gloss: "Duʿāʾ Ḥifẓ al-Mursalīn", ref: "Compiled wird", tier: "muhsin", time: ["day-duha", "*any"], path: "web/render.html?file=content/01-dua/05-quran-in-heart/memoriser.md" },
      // Shifa
      { type: "family", label: "Shifā / Healing", tier: "imam" },
      { label: "Healing for the Sick - Seven times at their side, and Allah heals them", gloss: "Asʾalu-llāha-l-ʿAẓīm — ×7", ref: "Riyāḍ 906 · Tirmidhī 2083", reps: "×7", tier: "muhsin", grade: "hasan", time: ["*any"], path: "web/render.html?file=content/01-dua/06-shifa/yashfiyaka.md" },
      { label: "Dua for Pregnancy - The compiled set said after each prayer", gloss: "Duʿāʾ al-Ḥāmil", ref: "Compiled wird", tier: "muhsin", time: ["*salah", "*any"], path: "web/render.html?file=content/01-dua/06-shifa/dua-hamil.md" },
      { label: "Seeking Refuge for Children - The Prophet's ﷺ dua for Ḥasan and Ḥusayn", gloss: "Aʿūdhu bi-Kalimāti-llāhi-t-Tāmmāt", ref: "Sunan Ibn Mājah 3525", tier: "jemaah", grade: "sahih", time: ["*any"], path: "web/render.html?file=content/01-dua/06-shifa/evil-eye.md" },
    ]
  },
  {
    icon: "🕌",
    category: "Ṣalāh",
    categoryAr: "الصَّلَاةُ",
    desc: "Prophetic du'ās before, during and after ṣalāh",
    items: [
      { type: "family", label: "Before Ṣalāh", gloss: "Everything said before the takbīr, in order", tier: "imam", time: ["*salah"]},
      { label: "After the Adhān - Ask for the Prophet's ﷺ wasīlah", gloss: "Rabba Hādhihi-d-Daʿwati-t-Tāmmah", ref: "Bukhārī 614", tier: "jemaah", grade: "sahih", time: ["*adhan"], path: "web/render.html?file=content/02-salah/01-before/after-adhan.md" },
      { type: "family", label: "During Ṣalāh", gloss: "The full order of the prayer itself", tier: "imam", time: ["*salah"] },
      { label: "Duʿāʾ al-Iftitāḥ - Said between the takbīr and al-Fātiḥah", gloss: "Allahu akbar kabiraw ...", ref: "Muslim 601 · 771", tier: "jemaah", grade: "sahih", time: ["*salah"], path: "web/render.html?file=content/02-salah/02-during/iftitah.md" },
      { label: "Al-Fātiḥah - He answers you verse by verse", gloss: "Al-Fātiḥah", ref: "Muslim 395a", tier: "jemaah", grade: "sahih", time: ["*salah"], path: "web/render.html?file=content/02-salah/02-during/al-fatihah.md" },
      { label: "Salaam of Fajr - Useful knowledge, good provision, accepted deeds", gloss: "ʿIlman Nāfiʿan wa Rizqan Ṭayyiban ...", ref: "Ibn Mājah 925", tier: "jemaah", grade: "sahih", time: ["day-fajr-post"], path: "web/render.html?file=content/02-salah/02-during/ilmannafia_rizqantayyiba_amalanmutaqqaballan.md" },
      { type: "family", label: "After Ṣalāh", gloss: "The Prophet's ﷺ closing set, after every taslīm", tier: "imam", time: ["*salah"]},
      { num: "1", label: "Never Miss at the End of Ṣalāh - Ya Allah, help me remember You", gloss: "Allāhumma Aʿinnī ʿalā Dhikrika", ref: "Riyāḍ 1422 · Abū Dāwūd 1522", tier: "jemaah", grade: "sahih", time: ["*salah"], path: "web/render.html?file=content/02-salah/03-after/help-me-be-grateful.md" },
      { num: "2", label: "Turning Away from Ṣalāh - Three istighfār and peace", gloss: "Allāhumma Anta-s-Salām", ref: "Muslim 591", reps: "×3 + 1", tier: "jemaah", grade: "sahih", time: ["*salah"], path: "web/render.html?file=content/02-salah/03-after/1_istigfar_peace.md" },
      { num: "3", label: "Tahlīls After Ṣalāh - Read either, or both", gloss: "Mukhliṣīna Lahu-d-Dīn + La Mania", ref: "Nasāʾī 1339", tier: "jemaah", grade: "sahih", time: ["*salah"], path: "web/render.html?file=content/02-salah/03-after/tahlils.md" },
      { num: "4", label: "Ten Tahlīls After Fajr and Maghrib - The reward of freeing a slave", gloss: "Yuḥyī wa Yumītu — ×10", ref: "Tirmidhī 3474", reps: "×10", tier: "imam", grade: "hasan", time: ["day-fajr-post", "night-maghrib"], path: "web/render.html?file=content/02-salah/03-after/tahlil-fajr-maghrib-10-times.md" },
      { num: "5", label: "Seven Times After Fajr and Maghrib - Refuge from the Fire", gloss: "Allāhumma Ajirnī mina-n-Nār", ref: "Abū Dāwūd 5079", reps: "×7", tier: "muhsin", grade: "daif", time: ["day-fajr-post", "night-maghrib"], path: "web/render.html?file=content/02-salah/03-after/3_dua-allahuma-ajirnaar.md" },
      { num: "6", label: "33 · 33 · 33 and the Hundredth - Sins forgiven though they be the foam of the sea", gloss: "Tasbīḥ · Taḥmīd · Takbīr", ref: "Muslim 597a", reps: "×100", tier: "jemaah", grade: "sahih", time: ["*salah"], path: "web/render.html?file=content/02-salah/03-after/tasbih-33-33-34.md" },
    
    ]
  },
  {
    icon: "🛡️",
    category: "Adhkār aṣ-Ṣabāḥ wal-Masāʾ",
    categoryAr: "أَذْكَارُ الصَّبَاحِ وَالْمَسَاءِ",
    desc: "The morning and evening shield — recited after Fajr and after ʿAṣr",
    items: [
      /* { num: "1", label: "Hand the day over the instant it starts — and the night, the same way", gloss: "Allāhumma Bika Aṣbaḥnā", ref: "Abū Dāwūd 5068", tier: "jemaah", grade: "sahih", time: ["day-fajr-post", "day-asr-post"], path: "web/render.html?file=content/03-adhkar-sabah-masa/bika-asbahna.md" },
      { num: "2", label: "The kingdom enters evening with you — ask for the good of this night", gloss: "Amsaynā wa Amsā-l-Mulku Lillāh", ref: "Muslim 2723a", tier: "jemaah", grade: "sahih", time: ["day-fajr-post", "night-maghrib"], path: "web/render.html?file=content/03-adhkar-sabah-masa/amsayna-wa-amsal-mulk.md" },*/ 
      { num: "1", label: "Refuge in His Perfect Words - From the evil of what He made", gloss: "Aʿūdhu bi-Kalimāti-llāhi-t-Tāmmāt", ref: "Muslim 2708b · 2709a", reps: "×3", tier: "jemaah", grade: "sahih", time: ["day-asr-post", "night-maghrib", "*any"], path: "web/render.html?file=content/03-adhkar-sabah-masa/1_audhubikatillah.md" },
      { num: "2", label: "Comprehensive Protection Against All Harm - Say it three times and nothing will harm you", gloss: "Bismillāhi-lladhī Lā Yaḍurru", ref: "Riyāḍ 1457 · Abū Dāwūd 5088", reps: "×3", tier: "jemaah", grade: "sahih", time: ["day-fajr-post", "day-asr-post"], path: "web/render.html?file=content/03-adhkar-sabah-masa/2_bismillahiladhi_layadurru.md" },
      { num: "3", label: "Ḥasbiyallāh Seven Times - Allah suffices you in every concern of this world and the next", gloss: "Ḥasbiyallāhu Lā Ilāha Illā Huwa — ×7", ref: "Ḥiṣn 83 · Abū Dāwūd 5081", reps: "×7", tier: "imam", grade: "sahih", time: ["day-fajr-post", "day-asr-post"], path: "web/render.html?file=content/03-adhkar-sabah-masa/3_hasbiyallahu_7.md" },
      { num: "4", label: "The Close of al-Ḥashr - Seventy thousand angels sent to pray for you", gloss: "Law Anzalnā Hādha-l-Qurʾān", ref: "Tirmidhī 2922", tier: "muhsin", grade: "daif", time: ["day-fajr-post", "day-asr-post"], path: "web/render.html?file=content/03-adhkar-sabah-masa/c_law_anzalna.md" },
      { num: "5", label: "Ten Ṣalawāt Upon the Prophet ﷺ - His intercession is yours", gloss: "Ṣalawāt — ×10", ref: "Ḥiṣn 98 · Ṭabarānī", reps: "×10", tier: "imam", grade: "hasan", time: ["day-fajr-post", "day-asr-post"], path: "web/render.html?file=content/03-adhkar-sabah-masa/b_salawat_10.md" },
      { num: "6", label: "The Chief of Seeking Forgiveness - Say it with certainty and you are of Jannah", gloss: "Sayyid al-Istighfār", ref: "Bukhārī 6306", tier: "jemaah", grade: "sahih", time: ["day-fajr-post", "day-asr-post"], path: "web/render.html?file=content/03-adhkar-sabah-masa/4_sayyidul-istighfar.md" },
      { num: "7", label: "The Words He ﷺ Never Abandoned - Complete well-being, morning and evening", gloss: "Allāhumma Innī Asʾaluka-l-ʿĀfiyah", ref: "Ibn Mājah 3871 · Abū Dāwūd 5074", tier: "jemaah", grade: "sahih", time: ["day-fajr-post", "day-asr-post"], path: "web/render.html?file=content/03-adhkar-sabah-masa/never-abandoned.md" },
      { num: "8", label: "Duʿāʾ of Fāṭimah - Entrust every affair to the Ever-Living", gloss: "Yā Ḥayyu Yā Qayyūm", ref: "Ḥiṣn 88 · Nasāʾī al-Kubrā 10330", tier: "jemaah", grade: "sahih", time: ["day-fajr-post", "day-asr-post"], path: "web/render.html?file=content/03-adhkar-sabah-masa/6_ya-hayyu-ya-qayyum.md" },
      { num: "10", label: "Refuge from Anxiety, Grief and Debt - And the domination of men", gloss: "Allāhumma Innī Aʿūdhu bika mina-l-Hammi", ref: "Bukhārī 2893", tier: "jemaah", grade: "sahih", time: ["day-fajr-post", "day-asr-post", "*any"], path: "web/render.html?file=content/03-adhkar-sabah-masa/5-hammi-wal-hazan.md" },
      { num: "11", label: "Body, Hearing, Sight - Refuge from disbelief and destitution", gloss: "Allāhumma ʿĀfinī fī Badanī", ref: "Abū Dāwūd 5090", reps: "×3", tier: "imam", grade: "hasan", time: ["day-fajr-post", "day-asr-post"], path: "web/render.html?file=content/03-adhkar-sabah-masa/7_body-hearing-sight.md" },
      { num: "12", label: "Contentment with Allah, Islam and the Prophet ﷺ - Jannah made binding", gloss: "Raḍītu billāhi Rabbā", ref: "Tirmidhī 3389", reps: "×3", tier: "jemaah", grade: "hasan", time: ["day-fajr-post", "day-asr-post"], path: "web/render.html?file=content/03-adhkar-sabah-masa/8_raditdubillahirabban.md" },
      { num: "13", label: "Daily Protection and Tawḥīd - The tahlīl said ten times", gloss: "Lā Ilāha Illallāh Waḥdahū — ×10", ref: "Ḥiṣn 92 · Bukhārī 6403", reps: "×10", tier: "jemaah", grade: "sahih", time: ["day-fajr-post", "day-asr-post"], path: "web/render.html?file=content/03-adhkar-sabah-masa/a_la_ilaha_illallah_wahdahu_la_sharikalah.md" },
      { num: "14", label: "Abu al-Dardāʾ's Fire Insurance - Trust in Allah's decree", gloss: "Dua Abu Darda", ref: "Habeeb Umar bin Hafidz", tier: "jemaah", grade: "sahih", time: ["day-fajr-post"], path: "web/render.html?file=content/03-adhkar-sabah-masa/dua-abu-darda-fire-insurance.md" },
      { num: "1", label: "Four Phrases Heavier Than a Morning's Dhikr - Subḥāna Allāhi wa biḥamdihī", gloss: "Subḥāna Allāhi wa Biḥamdihī", ref: "Riyāḍ 1433 · Muslim 2726", reps: "×3", tier: "jemaah", grade: "sahih", time: ["day-fajr-post", "day-asr-post"], path: "web/render.html?file=content/03-adhkar-sabah-masa/0_subhana_allahi_wa_bihamdihi.md" },
    ]
  },
  {
    icon: "🌤️",
    category: "Ḍuḥā & the Working Day",
    categoryAr: "الضُّحَى",
    desc: "The forenoon window — provision, ease of work, and the road",
    items: [
      { label: "Ṣalāt Duha - When thankful for the joints and want flowstate", gloss: "2/4 Rakʿah at the Start of the Day", ref: "Abū Dāwūd 1289", tier: "jemaah", grade: "sahih", time: ["day-duha"], path: "web/render.html?file=content/04-duha-working-day/solat-duha.md" },
      { label: "Travel and Return - When about to travel or transit", gloss: "Duʿāʾ as-Safar", ref: "Tirmidhī 3447", tier: "jemaah", grade: "sahih", time: ["day-duha", "*any"], path: "web/render.html?file=content/04-duha-working-day/dua-safar.md" },
      { label: "Making the Difficult Easy - When facing a difficult affair", gloss: "Allāhumma Lā Sahla Illā Mā Jaʿaltahu Sahlā", ref: "Ḥiṣn 139 · Ibn Ḥibbān 974", tier: "jemaah", grade: "sahih", time: ["day-duha", "day-dhuhr", "*any"], path: "web/render.html?file=content/04-duha-working-day/allahumma-la-sahla.md" },
      { label: "Sufficiency and Freedom from Debt - When burdened by debts", gloss: "Allāhumma-kfinī bi-Ḥalālika ʿan Ḥarāmik", ref: "Tirmidhī 3563", tier: "imam", grade: "hasan", time: ["day-duha", "day-dhuhr", "*any"], path: "web/render.html?file=content/04-duha-working-day/remove-debt-mountain.md" },
      { label: "Mūsā's Utter Dependence - When exhausted, vulnerable and absolutely reliant", gloss: "Rabbi inni lima anzalta ...", ref: "Qurʾān 28:24", tier: "imam", grade: "sahih", time: ["day-duha", "day-dhuhr", "*any"], path: "web/render.html?file=content/04-duha-working-day/musa-rabbi-inni-lima-anzalta.md"},
      { label: "Mūsā's Expansion - When about to face Firʿawn: expand my chest", gloss: "Rabbi shrahli sadri ...", ref: "Qurʾān 20:25-28", tier: "jemaah", grade: "sahih", time: ["*any"], path:"web/render.html?file=content/04-duha-working-day/musa-rabbishrahlisadri.md"},
      ]
  },
    {
    icon: "🌙",
    category: "Adhkār al-Layl",
    categoryAr: "أَذْكَارُ اللَّيْلِ",
    desc: "The night cycle — going to bed, waking in the dark, and the last third",
    items: [
      { type: "family", label: "Adhkar of the night", gloss: "Last things said before sleep", tier: "imam", time: ["night-maghrib-post", "night-isha-post"]},
      // Night Maghrib and Isha
      { label: "They Will Suffice Him - The Two Closing Verses of Surah al-Baqarah at Night", gloss: "Lā Yuʿallimuhu-llāhu-l-Qurʾāna", ref: "Bukhārī 5009", tier: "jemaah", grade: "sahih", time: ["night-maghrib-post", "night-isha-post"], path: "web/render.html?file=content/05-adhkar-al-layl/01-night/al-baqarah-last-2.md" },
      // Before sleep
      { type: "family", label: "Before sleep", gloss: "The last things said before sleep", tier: "imam", time: ["night-presleep"]},
      { num: "1", label: "Al-Muʿawwidhāt Before Sleep - Breathe into your palms and wipe your body, three times", gloss: "Al-Muʿawwidhāt — ×3", ref: "Bukhārī 5017", reps: "×3", tier: "jemaah", grade: "sahih", time: ["night-presleep"], path: "web/render.html?file=content/05-adhkar-al-layl/02-before-sleep/muawwidhat-nafth.md" },
      { num: "2", label: "Āyat al-Kursī at Night - A guardian over you, and no devil near until morning", gloss: "Āyat al-Kursī", ref: "Bukhārī 2311", tier: "jemaah", grade: "sahih", time: ["night-presleep"], path: "web/render.html?file=content/05-adhkar-al-layl/02-before-sleep/ayat-al-kursi-guard.md" },
      { num: "3", label: "Tasbīḥ Fāṭimah - Better for you both than a servant", gloss: "Tasbīḥ Fāṭimah — 33·33·34", ref: "Bukhārī 3705", reps: "×100", tier: "jemaah", grade: "sahih", time: ["night-presleep"], path: "web/render.html?file=content/05-adhkar-al-layl/02-before-sleep/tasbih-fatimah.md" },
      { num: "4", label: "Entrusting Myself to Allah - Wuḍūʾ, right side, and you die on the fiṭrah", gloss: "Allāhumma Aslamtu Wajhī Ilayk", ref: "Bukhārī 247", tier: "jemaah", grade: "sahih", time: ["night-presleep"], path: "web/render.html?file=content/05-adhkar-al-layl/02-before-sleep/aslamtu-wajhi.md" },
      { num: "5", label: "Bismika Amūtu wa Aḥyā - The last words of the day, and the first of the next", gloss: "Bismika Amūtu wa Aḥyā", ref: "Bukhārī 6312", tier: "jemaah", grade: "sahih", time: ["night-presleep", "day-fajr-adhan"], path: "web/render.html?file=content/05-adhkar-al-layl/02-before-sleep/bismika-amutu-wa-ahya.md" },
      // Left sleep
      { type: "family", label: "Left sleep", gloss: "Tahajjud", tier: "imam", time: ["night-2nd-third", "night-last-third"]},
      { label: "Waking in the Dark - Say this, then ask, and you are answered", gloss: "Man Taʿārra mina-l-Layl", ref: "Bukhārī 1154", tier: "jemaah", grade: "sahih", time: ["night-2nd-third", "night-last-third"], path: "web/render.html?file=content/05-adhkar-al-layl/03-left-sleep/man-taarra-min-al-layl.md" },
      { label: "The Prophet's ﷺ Opening of Tahajjud - Eleven truths, then forgiveness", gloss: "Allāhumma Laka-l-Ḥamd", ref: "Bukhārī 1120", tier: "imam", grade: "sahih", time: ["night-last-third"], path: "web/render.html?file=content/05-adhkar-al-layl/03-left-sleep/tahajjud-lakal-hamd.md" },
      { label: "The Three Tiers of Night Prayer - Ten, One Hundred, and One Thousand", gloss: "lam yuktab mina l-ghāfilīna / kutiba mina l-qānitīna + l-muqanṭarīna ", ref: "Sunan Abī Dāwūd 1398", tier: "imam", grade: "sahih", time: ["night-2nd-third","night-last-third"], path: "web/render.html?file=content/05-adhkar-al-layl/03-left-sleep/three-tiers-of-the-night-prayer.md" },
      { label: "Ṣalāt al-Ḥājah - The prayer of pressing need", gloss: "Lā Ilāha Illallāhu-l-Ḥalīmu-l-Karīm", ref: "Ibn Mājah 1384", tier: "muhsin", grade: "daif", time: ["*any"], path: "web/render.html?file=content/05-adhkar-al-layl/03-left-sleep/solat-hajat.md" },
      { label: "Ṣalāt Istikhārah - Two rakʿah, then hand the decision back", gloss: "Solat Istikhara - Allāhumma Innī Astakhīruka", ref: "Bukhārī 1166", tier: "jemaah", grade: "sahih", time: ["night-last-third", "*any"], path: "web/render.html?file=content/05-adhkar-al-layl/03-left-sleep/solat-istikhara.md" }
    ]
  },
    {
    icon: "🌸",
    category: "Ṣalawāt",
    categoryAr: "الصَّلَوَاتُ",
    desc: "Send ṣalawāt upon the Prophet ﷺ",
    items: [
      { label: "Maḥallul Qiyām - The standing recital", gloss: "Ṣalawāt al-Maḥallul Qiyām", ref: "Compiled wird", tier: "muhsin", time: ["*any"], path: "web/render.html?file=content/06-salawat/mahalul-qiyam.md" },
      { label: "Ṣalawāt Tafrījiyyah - Relief when a knot will not loosen", gloss: "Ṣalawāt Tafrījiyyah", ref: "Compiled wird", tier: "imam", time: ["*any"], path: "web/render.html?file=content/06-salawat/salawat-tafrijiyyah.md" }
    ]
  },
  {
    icon: "📿",
    category: "Tahlīl Collections",
    categoryAr: "التَّهْلِيلُ",
    desc: "Tahlīl collections pieced by mashāyikh",
    items: [
      { label: "Tawassul Before Al-Fātiḥah - Dedicating its reward to the Prophets, the Companions and the Caliphs", gloss: "Tawassul before Al Fatihah", ref: "Compiled wird", time: ["*any"], path: "web/render.html?file=content/07-tahleel/al-fatihah-ilaa-ruhi.md" },
    ]
  },
  // {
  //   icon: "🌾",
  //   category: "Sacred Times",
  //   categoryAr: "الْأَوْقَاتُ الْمُبَارَكَةُ",
  //   desc: "Wird tied to a season, a sacred month, or a day that comes once a year",
  //   items: [
  //     { label: "Said on a birthday; composite, read the verification notice first", gloss: "Duʿāʾ Mīlād — Yā Ghaniyyu Aghninā", ref: "Tirmidhī 3505 · 3563 · Qurʾān 21:87", tier: "jemaah", time: ["*any"], path: "web/render.html?file=content/_unlisted/dua-birthday.md" },
  //     { label: "The takbīr of the days of tashrīq", gloss: "Takbīr ʿĪd al-Aḍḥā", ref: "Compiled wird", tier: "jemaah", time: ["*any"], path: "Dua Haj/takbir-eiduladha.html" },
  //     { label: "The best duʿāʾ the Prophets made, on the day of ʿArafah", gloss: "Khayru-d-Duʿāʾ Duʿāʾ Yawm ʿArafah", ref: "Tirmidhī 3585", tier: "imam", time: ["*any"], path: "Dua Haj/dua-prophets-made-on-arafah.html" },
  //     { label: "What the two of them said standing on ʿArafah", gloss: "ʿArafah — ʿAlī and Ibn ʿUmar", ref: "Athar", tier: "imam", time: ["*any"], path: "Dua Haj/dua-sahabah-made-on-arafah.html" },
  //     { label: "The collected amal of the ten best days", gloss: "Dhū al-Ḥijjah — First Ten Days", ref: "Compiled wird", time: ["*any"], path: "Dua Haj/Amalan Haj.html" },
  //     { label: "The Rajab istighfār set", gloss: "Istighfār Rajab", ref: "Compiled wird", time: ["*any"], path: "Wird/istighfar-rajab.html" }
  //   ]
  // },
  {
    icon: "🛠️",
    category: "Documentation",
    desc: "Technical documentation for the Steps of Muhammad Card Application",
    items: [
      { label: "The Prophetic Clock", gloss: "The eleven time windows, the naming contract, and what Action View is reading", type: "overview", path: "web/render.html?file=TIME_CATEGORISATION.md" },
      { label: "Authoring Guide", gloss: "How a card is written, and what every meta field does", type: "overview", path: "web/render.html?file=AUTHORING_GUIDE.md" },
      { label: "Sunnah Card Builder", gloss: "Paste markdown, preview the card", type: "overview", path: "web/preview.html" }
    ]
  }
];

// =========================================================
// PRESET COLLECTIONS
//   Curated "My Amalan" sets shipped with the site itself, so
//   they render identically for every visitor — including one
//   who has never saved a personal collection. Resolved by id
//   in render.html *before* falling back to a user's own
//   localStorage collections of the same name.
//
//   Read-only in the My Amalan panel: no star/rename/delete,
//   just "Open as Collection ↗" plus a short summary + a link.
//
//   Shape of each preset:
//     id        — unique slug, used in ?collection=<id>
//     name      — title shown in the panel + rendered card
//     summary   — ONE short line shown under the name (no more
//                 hover-tooltip sourcing — keep this to a phrase)
//     moreHref  — optional atomic content path (same convention
//                 as item.path below) for a "Read the etiquette →"
//                 link; omit if there's nothing to link to yet
//     items     — the duʿās themselves, PLUS optional divider rows
//                 shaped like { type: "family", label, icon } to
//                 visually group a long list (these render as a
//                 subheading, not a clickable row, and are skipped
//                 entirely when building the rendered card's links)
//
//   To add a new preset: copy the object below, give it a new id,
//   and list the duʿās by their atomic content path (the same path
//   you'd see after "file=" in a normal card link, e.g.
//   "content/dua/whatever.md" — NOT the "web/render.html?file=..."
//   wrapper). See the walkthrough in chat for the full how-to.
// =========================================================

const PRESET_COLLECTIONS = [
  {
    id: "sabah-sandwich",
    name: "Adhkār aṣ-Ṣabāḥ wal-Masāʾ — the Duʿā Sandwich",
    // Short caption shown in the panel itself (no more hover tooltip).
    summary: "Praise → Ṣalawāt → Istighfār → Asks → Istighfār → Salawat",
    // "Read more" link — atomic content path, same convention as item.path.
    // Point this at any card/overview file; currently the etiquette-of-duʿā draft.
    moreHref: "content/adab-dua.md",
    items: [
      { type: "family", label: "Praise & Tahlīl", icon: "🌸" },
      { label: "Refuge in His Perfect Words - From the evil of what He made", path: "content/03-adhkar-sabah-masa/1_audhubikatillah.md" },
      { label: "Comprehensive Protection Against All Harm - Say it three times and nothing will harm you", path: "content/03-adhkar-sabah-masa/2_bismillahiladhi_layadurru.md" },
      { label: "Ḥasbiyallāh Seven Times - Allah suffices you in every concern of this world and the next", path: "content/03-adhkar-sabah-masa/3_hasbiyallahu_7.md" },
      { label: "The Close of al-Ḥashr - Seventy thousand angels sent to pray for you", path: "content/03-adhkar-sabah-masa/c_law_anzalna.md" },
      { label: "Allah's Greatest Name - When He is asked by it, He gives", path: "content/01-dua/02-asking-allah/in-greatest-of-names.md" },
      

      { type: "family", label: "Ṣalawāt", icon: "🕊️" },
      { label: "Ten Ṣalawāt Upon the Prophet ﷺ - His intercession is yours", path: "content/03-adhkar-sabah-masa/b_salawat_10.md" },

      { type: "family", label: "Istighfār", icon: "🤲" },
      { label: "Forgiveness for Parents and All Believers", gloss: "Rabbighfir li-walidayhi ..", ref: "Musnad al-Shāmiyīn lil-Ṭabarānī 2118", tier: "jemaah", grade: "hasan", time: ["*salah", "*any"], path: "content/01-dua/01-forgiveness/forgiveness-parents-all-believers.md" },
      { label: "The Chief of Seeking Forgiveness - Say it with certainty and you are of Jannah", path: "content/03-adhkar-sabah-masa/4_sayyidul-istighfar.md" },

      { type: "family", label: "The Asks", icon: "✦" },
      { label: "The Words He ﷺ Never Abandoned - Complete well-being, morning and evening", path: "content/03-adhkar-sabah-masa/never-abandoned.md" },
      { label: "Salaam of Fajr - Useful knowledge, good provision, accepted deeds", gloss: "ʿIlman Nāfiʿan wa Rizqan Ṭayyiban ...", ref: "Ibn Mājah 925", tier: "jemaah", grade: "sahih", time: ["day-fajr-post"], path: "content/02-salah/02-during/ilmannafia_rizqantayyiba_amalanmutaqqaballan.md" },
      { label: "Duas of the Servants of the Most Gracious - ʿIbād ar-Raḥmān", gloss: "Rabbana habla min azwajina ...", ref: "Qurʾān 25:63-77", tier: "jemaah", grade: "sahih", time: ["night-last-third", "*any"], path: "content/01-dua/02-asking-allah/dua-ibadurrahman.md"},
      { label: "Sulaymān's Gratitude - Increase my capacity to be thankful", gloss: "Rabbi Awziʿnī an Ashkura Niʿmatak", ref: "Qurʾān 27:19", tier: "jemaah", grade: "sahih", time: ["day-duha", "day-dhuhr", "*any"], path: "content/01-dua/04-gratitude/sulaiman-thankfulness.md" },
      { label: "Ibrahim's Submission - Make us muslim, show us our rites", gloss: "Rabbanā wajʿalnā muslimayni laka", ref: "Qurʾān 26:84-85", tier: "jemaah", grade: "sahih", time: ["night-last-third", "*any"], path: "content/01-dua/03-steadfastness/make-us-muslim-show-us-nusuk.md" },
      { label: "Rectification of Religion, World and Hereafter - O Allah, set right for me my religion", gloss: "Allahuma aṣliḥ lī dīniya ...  ", ref: "Muslim 2720", tier: "muhsin",grade: "sahih", time: ["day-fajr-post", "day-asr-post", "*any"], path: "content/01-dua/02-asking-allah/o-allah-set-right-for-me-my-religion.md" },
      { label: "Do Not Let Our Hearts Deviate - The ayah he ﷺ would follow up with", gloss: "Rabbana la tuzigh qulubbana...", ref: "Qurʾān 3:8", tier: "jemaah", grade: "sahih", time: ["*salah", "*any"], path: "content/01-dua/03-steadfastness/la-tuzigh-qulubana.md"},
      { label: "Good in This World and the Next - The dua he ﷺ said most often", gloss: "Rabbana atina fid dunya...", ref:"Surat Al Baqarah 2:201", tier: "jemaah", grade:"sahih", time:["*salah", "*any"], path: "content/01-dua/02-asking-allah/rabbana-atina-fid-dunya.md"},
      { label: "Duʿāʾ of Fāṭimah - Entrust every affair to the Ever-Living", path: "content/03-adhkar-sabah-masa/6_ya-hayyu-ya-qayyum.md" },
      { label: "Refuge from Anxiety, Grief and Debt - And the domination of men", path: "content/03-adhkar-sabah-masa/5-hammi-wal-hazan.md" },
      { label: "Untangle from Debts and remove anxiety", path: "content/03-adhkar-sabah-masa/5b-hammi-wal-hazan.md" },
      { label: "Body, Hearing, Sight - Refuge from disbelief and destitution", path: "content/03-adhkar-sabah-masa/7_body-hearing-sight.md" },
      { label: "Contentment with Allah, Islam and the Prophet ﷺ - Jannah made binding", path: "content/03-adhkar-sabah-masa/8_raditdubillahirabban.md" },

      { type: "family", label: "Closing Tahlīl", icon: "🌙" },
      { label: "Abu al-Dardāʾ's Fire Insurance - Trust in Allah's decree", path: "content/03-adhkar-sabah-masa/dua-abu-darda-fire-insurance.md" },
      { label: "Four Phrases Heavier Than a Morning's Dhikr - Subḥāna Allāhi wa biḥamdihī", path: "content/03-adhkar-sabah-masa/0_subhana_allahi_wa_bihamdihi.md" },
    ]
  }
];


// =========================================================
// CARD NAVIGATION ENGINE
//   Only the viewer we control (render.html) joins the
//   prev/next sequence.
//   Standalone legacy .html pages are skipped — they carry
//   no nav bar of their own, so paging into one would strand
//   the reader exactly the way this engine exists to prevent.
// =========================================================

// Splits "web/render.html?file=content/dua/hajat.md" into its viewer and file.
function somParseViewerPath(path) {
  const match = /(?:^|\/)(render(?:_collection)?\.html)\?file=(.+)$/.exec(path || '');
  if (!match) return null;
  return { viewer: match[1], file: decodeURIComponent(match[2]) };
}

// The ordered, pageable cards of one category.
function somCategorySequence(node) {
  return node.items.filter(item => somParseViewerPath(item.path));
}

// Stable anchor for a category, so Home can reopen the accordion it came from.
function somNodeId(index) {
  return `node-${index}`;
}

// Finds the open card in the tree. Returns its category, that category's
// sequence, and the card's position in it — or null for anything opened
// outside the menu (a hand-typed ?file=, a saved collection).
function somLocateCard(viewer, file) {
  for (let i = 0; i < VAULT_NAVIGATION_TREE.length; i++) {
    const node = VAULT_NAVIGATION_TREE[i];
    const seq = somCategorySequence(node);
    const index = seq.findIndex(item => {
      const parsed = somParseViewerPath(item.path);
      return parsed && parsed.viewer === viewer && parsed.file === file;
    });
    if (index !== -1) return { node, nodeId: somNodeId(i), seq, index };
  }
  return null;
}

function somEscapeHtml(str) {
  return String(str).replace(/[&<>"']/g, c => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  })[c]);
}

// One end of the bar: a live link when there's somewhere to go, a dimmed
// placeholder when the reader is at the first or last card of the category.
function somRenderNavEnd(item, direction) {
  const isPrev = direction === 'prev';
  const arrow = isPrev ? '←' : '→';
  const kicker = isPrev ? 'Previous' : 'Next';
  const align = isPrev ? 'card-nav-start' : 'card-nav-end';

  if (!item) {
    return `<span class="card-nav-btn is-disabled ${align}">
        <span class="card-nav-arrow">${arrow}</span>
        <span class="card-nav-text"><span class="card-nav-kicker">${kicker}</span></span>
      </span>`;
  }

  const label = somEscapeHtml(item.label);
  const text = `<span class="card-nav-text">
      <span class="card-nav-kicker">${kicker}</span>
      <span class="card-nav-label">${label}</span>
    </span>`;

  return `<a class="card-nav-btn ${align}" href="${item.href || '../' + item.path}" title="${label}">
      ${isPrev ? `<span class="card-nav-arrow">${arrow}</span>${text}` : `${text}<span class="card-nav-arrow">${arrow}</span>`}
    </a>`;
}

// Same ends, shaped for the floating bottom HUD on render.html — one shared
// pill with prev · home · next.
function somRenderHudEnd(item, direction) {
  const isPrev = direction === 'prev';
  const arrow = isPrev ? '←' : '→';
  const kicker = isPrev ? 'Previous' : 'Next';
  const align = isPrev ? '' : 'hud-nav-end';

  if (!item) {
    return `<span class="hud-nav-btn is-disabled ${align}">
        <span class="hud-nav-arrow">${arrow}</span>
        <span class="hud-nav-text"><span class="hud-nav-kicker">${kicker}</span></span>
      </span>`;
  }

  const label = somEscapeHtml(item.label);
  const gloss = item.gloss
    ? `<span class="hud-nav-gloss">${somEscapeHtml(item.gloss)}</span>` : '';
  const text = `<span class="hud-nav-text">
      <span class="hud-nav-kicker">${kicker}</span>
      <span class="hud-nav-label">${label}</span>
      ${gloss}
    </span>`;

  return `<a class="hud-nav-btn ${align}" href="${item.href || '../' + item.path}" title="${label}">
      ${isPrev ? `<span class="hud-nav-arrow">${arrow}</span>${text}` : `${text}<span class="hud-nav-arrow">${arrow}</span>`}
    </a>`;
}

function somBuildHudNav(prev, next, homeHref, context) {
  const hud = document.getElementById('somHudNav');
  if (!hud) return;

  hud.innerHTML = `
    ${somRenderHudEnd(prev, 'prev')}
    <a class="hud-nav-home" href="${homeHref}" title="Back to the menu">⌂</a>
    <button type="button" class="hud-nav-toc" id="hudTocBtn" title="Table of Contents" style="display:none;">☰</button>
    ${context ? `<span class="hud-nav-context">${context}</span>` : ''}
    ${somRenderHudEnd(next, 'next')}`;
  hud.hidden = false;
}

// Fills every [data-card-nav] host on the page (top and bottom of the
// article) plus — on pages that have one — the #somHudNav floating
// bottom-center pill, and wires ← / → keys to the same destinations.
function somBuildCardNav() {
  const hosts = document.querySelectorAll('[data-card-nav]');
  const hasHud = !!document.getElementById('somHudNav');
  if (!hosts.length && !hasHud) return;

  const params = new URLSearchParams(window.location.search);
  const file = params.get('file');
  const viewer = window.location.pathname.split('/').pop() || 'render.html';

  // Opened from Action view (?from=<slot>): page through the reader's plan
  // and go Home to that prayer's tab. Otherwise: the Library category.
  const from = params.get('from');
  const plan = (file && from && window.SomPlan) ? SomPlan.contextFor(from, file) : null;
  const found = plan ? null : (file ? somLocateCard(viewer, file) : null);

  const prev = plan ? plan.prev : (found && found.index > 0 ? found.seq[found.index - 1] : null);
  const next = plan ? plan.next : (found && found.index < found.seq.length - 1 ? found.seq[found.index + 1] : null);

  // Slot / collection pages have no ?file=, so no card context — but a slot
  // page still knows which prayer's tab to go Home to.
  const slotParam = params.get('slot');
  const slotDef = (slotParam && window.SomPlan) ? SomPlan.SLOT_DEFS[slotParam] : null;
  const homeHref = plan ? plan.homeHref
    : found ? `../index.html#${found.nodeId}`
    : slotDef ? `../index.html#action/${slotDef.prayer}`
    : '../index.html';
  const contextText = plan ? somEscapeHtml(plan.label)
    : found ? `${found.node.icon || '✦'} ${somEscapeHtml(found.node.category)} · ${found.index + 1} of ${found.seq.length}` : '';
  const context = contextText ? `<span class="card-nav-context">${contextText}</span>` : '';

  const html = `
    ${somRenderNavEnd(prev, 'prev')}
    <span class="card-nav-middle">
      <a class="card-nav-home" href="${homeHref}">🏠 Home</a>
      ${context}
    </span>
    ${somRenderNavEnd(next, 'next')}`;

  hosts.forEach(host => {
    host.innerHTML = html;
    host.hidden = false;
  });

  // render.html docks the same navigation into a fixed bottom-center HUD
  // instead of in-flow bars; pages without #somHudNav skip this silently.
  somBuildHudNav(prev, next, homeHref, contextText);

  // Pages that still carry a #floatHomeBtn in their control stack (none
  // today) get it wired up here; render.html dropped it
  // in favour of the ⌂ home slot inside the HUD.
  const floatHome = document.getElementById('floatHomeBtn');
  if (floatHome) {
    floatHome.href = homeHref;
    floatHome.style.display = 'flex';
  }

  document.addEventListener('keydown', (e) => {
    if (e.ctrlKey || e.metaKey || e.altKey) return;
    const el = document.activeElement;
    if (el && (el.isContentEditable || ['INPUT', 'TEXTAREA', 'SELECT'].includes(el.tagName))) return;
    if (e.key === 'ArrowLeft' && prev) window.location.href = prev.href || '../' + prev.path;
    if (e.key === 'ArrowRight' && next) window.location.href = next.href || '../' + next.path;
  });
}
