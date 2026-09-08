// =========================================================
// SHARED NAVIGATION DATA + CARD-TO-CARD NAVIGATION
//   Single source of truth for the menu tree. Loaded by:
//     index.html                  → Compendium view + Action view
//     web/render.html             → prev / home / next on a card
//     web/render_collection.html  → prev / home / next on a collection
//
//   Because the tree lives here, a rendered card can work out
//   which category it belongs to and which duʿā comes before
//   and after it — that's what drives the nav bars.
//
//   Each category has: { icon, category, desc, items: [...] }
//   Icon emojis — non-living symbols only
// =========================================================
//
// ── ITEM NAMING CONTRACT ─────────────────────────────────
//   Every atomic duʿā carries three names, and they do
//   different jobs. Do not collapse them into one string.
//
//     label  Familiar sound. What a person actually calls this
//            duʿā out loud — the incipit, transliterated.
//            "Sayyid al-Istighfār", "Yā Muqallibal-Qulūb".
//            This is what makes a list recognisable at a glance.
//
//     gloss  Plain function, one line. What it does for you.
//            Written so someone who has never met the Arabic
//            still knows whether to open it.
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
    icon: "🕌",
    category: "Ṣalāh",
    desc: "Prophetic du'ās before, during and after ṣalāh",
    items: [
      { type: "family", label: "Pre-Ṣalāh Sequence", gloss: "Everything said before the takbīr, in order", tier: "imam", time: ["*salah"], path: "web/render_collection.html?file=content/salah/before/solat-collection.md" },
      { label: "Rabba Hādhihi-d-Daʿwati-t-Tāmmah", gloss: "Ask for the Prophet's ﷺ wasīlah, the moment the adhān ends", ref: "Bukhārī 614", tier: "jemaah", grade: "sahih", time: ["*adhan"], path: "web/render.html?file=content/salah/before/after-adhan.md" },
      { type: "family", label: "Ṣalāh Sequence", gloss: "The full order of the prayer itself", tier: "imam", time: ["*salah"], path: "web/render_collection.html?file=content/salah/after/solat-collection.md" },
      { label: "Duʿāʾ al-Iftitāḥ", gloss: "The opening, said between the takbīr and al-Fātiḥah", ref: "Muslim 601 · 771", tier: "jemaah", grade: "sahih", time: ["*salah"], path: "web/render.html?file=content/salah/during/iftitah.md" },
      { label: "Al-Fātiḥah", gloss: "The prayer divided in two — He answers you verse by verse", ref: "Muslim 395a", tier: "jemaah", grade: "sahih", time: ["*salah"], path: "web/render.html?file=content/salah/during/al-fatihah.md" },
      { type: "family", label: "Post-Ṣalāh Sequence", gloss: "The Prophet's ﷺ closing set, after every taslīm", tier: "imam", time: ["*salah"], path: "web/render_collection.html?file=content/salah/after/post-solat-collection.md" },
      { label: "After the Taslīm — Overview", gloss: "What the closing set is and why it is ordered this way", type: "overview", tier: "jemaah", time: ["*salah"], path: "web/render.html?file=content/salah/after/post-taslim-overview.md" },
      { num: "1", label: "Allāhumma Anta-s-Salām", gloss: "Three istighfār, then the declaration of peace", ref: "Muslim 591", reps: "×3 + 1", tier: "jemaah", grade: "sahih", time: ["*salah"], path: "web/render.html?file=content/salah/after/1_istigfar_peace.md" },
      { num: "2a", label: "Mukhliṣīna Lahu-d-Dīn", gloss: "Tahlīl of sincere devotion after the taslīm", ref: "Nasāʾī 1339", tier: "jemaah", grade: "sahih", time: ["*salah"], path: "web/render.html?file=content/salah/after/tahlil-mukhlisina.md" },
      { num: "2b", label: "Lā Māniʿa Limā Aʿṭayta", gloss: "No one withholds what He gives — divine sovereignty", ref: "Muslim 593a", tier: "jemaah", grade: "sahih", time: ["*salah"], path: "web/render.html?file=content/salah/after/tahlil-la-mania.md" },
      { num: "2c", label: "Yuḥyī wa Yumītu — ×10", gloss: "Ten after Fajr and Maghrib: the reward of freeing a slave", ref: "Tirmidhī 3474", reps: "×10", tier: "imam", grade: "hasan", time: ["day-fajr-post", "night-maghrib"], path: "web/render.html?file=content/salah/after/tahlil-fajr-maghrib-10-times.md" },
      { num: "3", label: "Tasbīḥ · Taḥmīd · Takbīr", gloss: "33 · 33 · 33 and the hundredth — sins forgiven though they be the foam of the sea", ref: "Muslim 597a", reps: "×100", tier: "jemaah", grade: "sahih", time: ["*salah"], path: "web/render.html?file=content/salah/after/tasbih-33-33-34.md" },
      { num: "4", label: "Allāhumma Aʿinnī ʿalā Dhikrika", gloss: "The counsel he ﷺ took Muʿādh's hand to give: help me remember You", ref: "Riyāḍ 1422 · Abū Dāwūd 1522", tier: "jemaah", grade: "sahih", time: ["*salah"], path: "web/render.html?file=content/salah/after/help-me-be-grateful.md" },
      { num: "5", label: "Allāhumma Ajirnī mina-n-Nār", gloss: "Seven times after Fajr and Maghrib, seeking refuge from the Fire", ref: "Abū Dāwūd 5079", reps: "×7", tier: "muhsin", grade: "daif", time: ["day-fajr-post", "night-maghrib"], path: "web/render.html?file=content/salah/after/3_dua-allahuma-ajirnaar.md" },
      { num: "6", label: "ʿIlman Nāfiʿan wa Rizqan Ṭayyiban", gloss: "Useful knowledge, good provision, accepted deeds — said in the salām of Fajr", ref: "Ibn Mājah 925", tier: "jemaah", grade: "sahih", time: ["day-fajr-post"], path: "web/render.html?file=content/salah/after/fajr-in-salam.md" }
    ]
  },
  {
    icon: "🛡️",
    category: "Adhkār aṣ-Ṣabāḥ wal-Masāʾ",
    desc: "The morning and evening shield — recited after Fajr and after ʿAṣr",
    items: [
      { num: "1", label: "Allāhumma Bika Aṣbaḥnā", gloss: "Hand the day over the instant it starts — and the night, the same way", ref: "Abū Dāwūd 5068", tier: "jemaah", grade: "sahih", time: ["day-fajr-post", "day-asr-post"], path: "web/render.html?file=content/adhkar-as-sabah-wal-masa/bika-asbahna.md" },
      { num: "2", label: "Amsaynā wa Amsā-l-Mulku Lillāh", gloss: "The kingdom enters evening with you — ask for the good of this night", ref: "Muslim 2723a", tier: "jemaah", grade: "sahih", time: ["day-fajr-post", "night-maghrib"], path: "web/render.html?file=content/adhkar-as-sabah-wal-masa/amsayna-wa-amsal-mulk.md" },
      { num: "3", label: "Subḥāna Allāhi wa Biḥamdihī", gloss: "Four phrases that outweigh a whole morning of dhikr", ref: "Riyāḍ 1433 · Muslim 2726", reps: "×3", tier: "jemaah", grade: "sahih", time: ["day-fajr-post", "day-asr-post"], path: "web/render.html?file=content/adhkar-as-sabah-wal-masa/0_subhana_allahi_wa_bihamdihi.md" },
      { num: "4", label: "Aʿūdhu bi-Kalimāti-llāhi-t-Tāmmāt", gloss: "Refuge in His perfect words from the evil of what He made", ref: "Muslim 2708b · 2709a", reps: "×3", tier: "jemaah", grade: "sahih", time: ["day-asr-post", "night-maghrib", "*any"], path: "web/render.html?file=content/adhkar-as-sabah-wal-masa/1_audhubikatillah.md" },
      { num: "5", label: "Bismillāhi-lladhī Lā Yaḍurru", gloss: "Say it three times and nothing will harm you until you say it again", ref: "Riyāḍ 1457 · Abū Dāwūd 5088", reps: "×3", tier: "jemaah", grade: "sahih", time: ["day-fajr-post", "day-asr-post"], path: "web/render.html?file=content/adhkar-as-sabah-wal-masa/2_bismillahiladhi_layadurru.md" },
      { num: "6", label: "Ḥasbiyallāhu Lā Ilāha Illā Huwa — ×7", gloss: "Seven times, and Allah suffices you in every concern of this world and the next", ref: "Ḥiṣn 83 · Abū Dāwūd 5081", reps: "×7", tier: "imam", grade: "sahih", time: ["day-fajr-post", "day-asr-post"], path: "web/render.html?file=content/adhkar-as-sabah-wal-masa/3_hasbiyallahu_7.md" },
      { num: "7", label: "Sayyid al-Istighfār", gloss: "The chief of seeking forgiveness — say it with certainty and you are of Jannah", ref: "Bukhārī 6306", tier: "jemaah", grade: "sahih", time: ["day-fajr-post", "day-asr-post"], path: "web/render.html?file=content/adhkar-as-sabah-wal-masa/4_sayyidul-istighfar.md" },
      { num: "8", label: "Allāhumma Innī Asʾaluka-l-ʿĀfiyah", gloss: "The words he ﷺ never abandoned, morning or evening — complete well-being", ref: "Ibn Mājah 3871 · Abū Dāwūd 5074", tier: "jemaah", grade: "sahih", time: ["day-fajr-post", "day-asr-post"], path: "web/render.html?file=content/adhkar-as-sabah-wal-masa/never-abandoned.md" },
      { num: "9", label: "Yā Ḥayyu Yā Qayyūm", gloss: "Duʿāʾ of Fāṭimah — entrust every affair to the Ever-Living", ref: "Ḥiṣn 88 · Nasāʾī al-Kubrā 10330", tier: "jemaah", grade: "sahih", time: ["day-fajr-post", "day-asr-post"], path: "web/render.html?file=content/adhkar-as-sabah-wal-masa/6_ya-hayyu-ya-qayyum.md" },
      { num: "10", label: "Allāhumma ʿĀfinī fī Badanī", gloss: "Body, hearing, sight — and refuge from disbelief and destitution", ref: "Abū Dāwūd 5090", reps: "×3", tier: "imam", grade: "hasan", time: ["day-fajr-post", "day-asr-post"], path: "web/render.html?file=content/adhkar-as-sabah-wal-masa/7_body-hearing-sight.md" },
      { num: "11", label: "Raḍītu billāhi Rabbā", gloss: "Contentment with Allah, Islam and the Prophet ﷺ — Jannah made binding", ref: "Tirmidhī 3389", reps: "×3", tier: "jemaah", grade: "hasan", time: ["day-fajr-post", "day-asr-post"], path: "web/render.html?file=content/adhkar-as-sabah-wal-masa/8_raditdubillahirabban.md" },
      { num: "12", label: "Lā Ilāha Illallāh Waḥdahū — ×10", gloss: "The tahlīl of daily protection and tawḥīd", ref: "Ḥiṣn 92 · Bukhārī 6403", reps: "×10", tier: "jemaah", grade: "sahih", time: ["day-fajr-post", "day-asr-post"], path: "web/render.html?file=content/adhkar-as-sabah-wal-masa/a_la_ilaha_illallah_wahdahu_la_sharikalah.md" },
      { num: "13", label: "Ṣalawāt — ×10", gloss: "Ten upon him ﷺ morning and evening, and his intercession is yours", ref: "Ḥiṣn 98 · Ṭabarānī", reps: "×10", tier: "imam", grade: "hasan", time: ["day-fajr-post", "day-asr-post"], path: "web/render.html?file=content/adhkar-as-sabah-wal-masa/b_salawat_10.md" },
      { num: "14", label: "Allāhumma Innī Aʿūdhu bika mina-l-Hammi", gloss: "Refuge from anxiety, grief, debt and the domination of men", ref: "Bukhārī 2893", tier: "jemaah", grade: "sahih", time: ["day-fajr-post", "day-asr-post", "*any"], path: "web/render.html?file=content/adhkar-as-sabah-wal-masa/5_hammi_wal_Hazan.md" },
      { num: "15", label: "Hamm wal-Ḥazan — Abū Umāmah's narration", gloss: "The same refuge, in the weaker wording; kept for comparison", ref: "Abū Dāwūd 1555", tier: "muhsin", grade: "daif", time: ["day-fajr-post", "day-asr-post"], path: "web/render.html?file=content/adhkar-as-sabah-wal-masa/5b_hammi_wal_Hazan.md" },
      { num: "16", label: "Law Anzalnā Hādha-l-Qurʾān", gloss: "The close of al-Ḥashr — seventy thousand angels sent to pray for you", ref: "Tirmidhī 2922", tier: "muhsin", grade: "daif", time: ["day-fajr-post", "day-asr-post"], path: "web/render.html?file=content/adhkar-as-sabah-wal-masa/c_law_anzalna.md" }
    ]
  },
  {
    icon: "🌙",
    category: "Adhkār al-Layl",
    desc: "The night cycle — going to bed, waking in the dark, and the last third",
    items: [
      { num: "1", label: "Al-Muʿawwidhāt — ×3", gloss: "Breathe the three sūrahs into your palms and wipe your body, three times", ref: "Bukhārī 5017", reps: "×3", tier: "jemaah", grade: "sahih", time: ["night-presleep"], path: "web/render.html?file=content/adhkar-al-lail/muawwidhat-nafth.md" },
      { num: "2", label: "Āyat al-Kursī", gloss: "A guardian appointed over you, and no devil near you until morning", ref: "Bukhārī 2311", tier: "jemaah", grade: "sahih", time: ["night-presleep"], path: "web/render.html?file=content/adhkar-al-lail/ayat-al-kursi-guard.md" },
      { num: "3", label: "Tasbīḥ Fāṭimah — 33·33·34", gloss: "He offered it to Fāṭimah instead of the servant she asked for", ref: "Bukhārī 3705", reps: "×100", tier: "jemaah", grade: "sahih", time: ["night-presleep"], path: "web/render.html?file=content/adhkar-al-lail/tasbih-fatimah.md" },
      { num: "4", label: "Allāhumma Aslamtu Wajhī Ilayk", gloss: "Wuḍūʾ, right side, these words — and if you die that night you die on the fiṭrah", ref: "Bukhārī 247", tier: "jemaah", grade: "sahih", time: ["night-presleep"], path: "web/render.html?file=content/adhkar-al-lail/aslamtu-wajhi.md" },
      { num: "5", label: "Bismika Amūtu wa Aḥyā", gloss: "The last words of the day, and the first of the next on waking", ref: "Bukhārī 6312", tier: "jemaah", grade: "sahih", time: ["night-presleep", "day-fajr-adhan"], path: "web/render.html?file=content/adhkar-al-lail/bismika-amutu-wa-ahya.md" },
      { num: "6", label: "Man Taʿārra mina-l-Layl", gloss: "You woke without meaning to — say this, then ask, and you are answered", ref: "Bukhārī 1154", tier: "jemaah", grade: "sahih", time: ["night-2nd-third", "night-last-third"], path: "web/render.html?file=content/adhkar-al-lail/man-taarra-min-al-layl.md" },
      { num: "7", label: "Allāhumma Laka-l-Ḥamd", gloss: "His ﷺ opening of tahajjud — eleven truths, then forgiveness", ref: "Bukhārī 1120", tier: "imam", grade: "sahih", time: ["night-last-third"], path: "web/render.html?file=content/adhkar-al-lail/tahajjud-lakal-hamd.md" },
      { label: "Allāhumma Innī Astakhīruka", gloss: "Istikhārah — two rakʿah, then hand the decision back", ref: "Bukhārī 1166", tier: "jemaah", grade: "sahih", time: ["night-last-third", "*any"], path: "web/render.html?file=content/dua/istikhara.md" }
    ]
  },
  {
    icon: "🌤️",
    category: "Ḍuḥā & the Working Day",
    desc: "The forenoon window — provision, ease of work, and the road",
    items: [
      { label: "Four Rakʿah at the Start of the Day", gloss: "Ḥadīth qudsī: give Me four, and I will suffice you for the rest of it", ref: "Abū Dāwūd 1289", reps: "4 rakʿah", tier: "jemaah", grade: "sahih", time: ["day-duha"], path: "web/render.html?file=content/dua/duha-four-rakah.md" },
      { label: "Allāhumma Lā Sahla Illā Mā Jaʿaltahu Sahlā", gloss: "Nothing is easy but what You make easy — for work that has seized up", ref: "Ḥiṣn 139 · Ibn Ḥibbān 974", tier: "jemaah", grade: "sahih", time: ["day-duha", "day-dhuhr", "*any"], path: "web/render.html?file=content/dua/la-sahla.md" },
      { label: "Duʿāʾ as-Safar", gloss: "The travelling duʿāʾ — said as the vehicle moves off", ref: "Tirmidhī 3447", tier: "jemaah", grade: "sahih", time: ["day-duha", "*any"], path: "web/render.html?file=content/dua/dua-safar.md" },
      { label: "Rabbi Awziʿnī an Ashkura Niʿmatak", gloss: "Sulaymān's ask: increase my capacity to be thankful", ref: "Qurʾān 27:19", tier: "jemaah", grade: "quran", time: ["day-duha", "day-dhuhr", "*any"], path: "web/render.html?file=content/dua/sulaiman-thankfulness.md" },
      { label: "Allāhumma-kfinī bi-Ḥalālika ʿan Ḥarāmik", gloss: "Debt the size of Mount Ṣīr, settled — the duʿāʾ he ﷺ taught ʿAlī", ref: "Tirmidhī 3563", tier: "imam", grade: "hasan", time: ["day-duha", "day-dhuhr", "*any"], path: "web/render.html?file=content/dua/remove-debt-mountain.md" }
    ]
  },
  {
    icon: "🤍",
    category: "The Nūr in the Heart",
    desc: "Anchoring the heart and aligning to the amr — no fixed hour, only need",
    items: [
      { label: "Yā Muqallibal-Qulūb", gloss: "The duʿāʾ he ﷺ said most often: hold my heart firm on Your dīn", ref: "Tirmidhī 2140", tier: "jemaah", grade: "hasan", time: ["*any"], path: "web/render.html?file=content/dua/ya-muqallibal-qulub.md" },
      { label: "Bi-Annī Ashhadu Annaka Anta-llāh", gloss: "Asking through the Greatest Name — when He is asked by it, He gives", ref: "Tirmidhī 3475", tier: "jemaah", grade: "sahih", time: ["*any"], path: "web/render.html?file=content/dua/in-greatest-of-names.md" },
      { label: "Asʾaluka min al-Khayri Kullih", gloss: "ʿĀʾishah's comprehensive ask — all good, known and unknown", ref: "Ibn Mājah 3846", tier: "imam", grade: "sahih", time: ["*any"], path: "web/render.html?file=content/dua/aisyah-comprehensive-ask.md" },
      { label: "Lā Ilāha Illallāhu-l-Ḥalīmu-l-Karīm", gloss: "Ṣalāt al-Ḥājah — the prayer of pressing need", ref: "Ibn Mājah 1384", tier: "muhsin", grade: "daif", time: ["*any"], path: "web/render.html?file=content/dua/hajat.md" },
      { label: "Duʿāʾ al-Ḥamd — Ḥamdan Yuwāfī", gloss: "Praise that matches His blessings; compiled in the Bā ʿAlawī majālis", ref: "Compiled wird", tier: "muhsin", time: ["*any"], path: "web/render.html?file=content/dua/dua-hamdan-yuwafi.md" },
      { type: "family", label: "Qurʾān × Heart 🤍", tier: "imam" },
      { label: "Ijʿali-l-Qurʾāna Rabīʿa Qalbī", gloss: "Make the Qurʾān the spring of my heart, the light of my chest", ref: "Musnad Aḥmad 3712", tier: "imam", grade: "sahih", time: ["*any"], path: "web/render.html?file=content/dua/quran/quran_spring_heart.md" },
      { label: "Duʿāʾ Ḥifẓ al-Mursalīn", gloss: "The memoriser's duʿāʾ — clarity, retention, character", ref: "Compiled wird", tier: "muhsin", time: ["*any"], path: "web/render.html?file=content/dua/quran/memoriser.md" },
      { type: "family", label: "💧 Shifāʾ", tier: "imam" },
      { label: "Asʾalu-llāha-l-ʿAẓīm — ×7", gloss: "Seven times at a sick person's side, and Allah heals them", ref: "Riyāḍ 906 · Tirmidhī 2083", reps: "×7", tier: "muhsin", grade: "hasan", time: ["*any"], path: "web/render.html?file=content/dua/shifa/yashfiyaka.md" },
      { label: "Duʿāʾ al-Ḥāmil", gloss: "For pregnancy — the compiled set said after each prayer", ref: "Compiled wird", tier: "muhsin", time: ["*salah", "*any"], path: "web/render.html?file=content/dua/shifa/dua-hamil.md" },
      { label: "Rabbi Hab Lī min Ladunka Dhurriyyatan Ṭayyibah", gloss: "Zakariyyā's ask for righteous offspring, through His beautiful names", ref: "Qurʾān 3:38", tier: "muhsin", grade: "quran", time: ["*any"], path: "web/render.html?file=content/dua/shifa/dua-righteous-offspring-2.md" }
    ]
  },
  {
    icon: "🌸",
    category: "Ṣalawāt",
    desc: "Send ṣalawāt upon the Prophet ﷺ",
    items: [
      { label: "Ṣalawāt Adnānī", gloss: "The Adnānī formula, from the mashāyikh", ref: "Compiled wird", tier: "muhsin", time: ["*any"], path: "salawat/salawat-adnani.html" },
      { label: "Ṣalawāt Tafrījiyyah", gloss: "The ṣalawāt of relief, recited when a knot will not loosen", ref: "Compiled wird", tier: "imam", time: ["*any"], path: "web/render.html?file=content/salawat/salawat-tafrijiyyah.md" }
    ]
  },
  {
    icon: "📿",
    category: "Tahlīl Collections",
    desc: "Tahlīl collections pieced by mashāyikh",
    items: [
      { label: "Tahlīl al-Arwāḥ", gloss: "The full tahlīl sequence for the departed", ref: "Compiled wird", time: ["*any"], path: "web/render.html?file=Wird/tahlil.html" }
    ]
  },
  {
    icon: "🌾",
    category: "Sacred Times",
    desc: "Wird tied to a season, a sacred month, or a day that comes once a year",
    items: [
      { label: "Duʿāʾ Mīlād — Yā Ghaniyyu Aghninā", gloss: "Said on a birthday; composite, read the verification notice first", ref: "Tirmidhī 3505 · 3563 · Qurʾān 21:87", tier: "jemaah", time: ["*any"], path: "web/render.html?file=content/dua/dua-birthday.md" },
      { label: "Takbīr ʿĪd al-Aḍḥā", gloss: "The takbīr of the days of tashrīq", ref: "Compiled wird", tier: "jemaah", time: ["*any"], path: "Dua Haj/takbir-eiduladha.html" },
      { label: "Khayru-d-Duʿāʾ Duʿāʾ Yawm ʿArafah", gloss: "The best duʿāʾ the Prophets made, on the day of ʿArafah", ref: "Tirmidhī 3585", tier: "imam", time: ["*any"], path: "Dua Haj/dua-prophets-made-on-arafah.html" },
      { label: "ʿArafah — ʿAlī and Ibn ʿUmar", gloss: "What the two of them said standing on ʿArafah", ref: "Athar", tier: "imam", time: ["*any"], path: "Dua Haj/dua-sahabah-made-on-arafah.html" },
      { label: "Dhū al-Ḥijjah — First Ten Days", gloss: "The collected amal of the ten best days", ref: "Compiled wird", time: ["*any"], path: "Dua Haj/Amalan Haj.html" },
      { label: "Istighfār Rajab", gloss: "The Rajab istighfār set", ref: "Compiled wird", time: ["*any"], path: "Wird/istighfar-rajab.html" }
    ]
  },
  {
    icon: "🛠️",
    category: "Documentation",
    desc: "Technical documentation for the Steps of Muhammad Card Application",
    items: [
      { label: "The Prophetic Clock", gloss: "The eleven time windows, the naming contract, and what Action View is reading", type: "overview", path: "web/render.html?file=TIME_CATEGORISATION.md" },
      { label: "Authoring Guide", gloss: "How a card is written, and what every meta field does", type: "overview", path: "web/render.html?file=AUTHORING_GUIDE.md" }
    ]
  }
];


// =========================================================
// CARD NAVIGATION ENGINE
//   Only the two viewers we control (render.html and
//   render_collection.html) join the prev/next sequence.
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

  return `<a class="card-nav-btn ${align}" href="../${item.path}" title="${label}">
      ${isPrev ? `<span class="card-nav-arrow">${arrow}</span>${text}` : `${text}<span class="card-nav-arrow">${arrow}</span>`}
    </a>`;
}

// Fills every [data-card-nav] host on the page (top and bottom of the
// article) and wires ← / → keys to the same destinations.
function somBuildCardNav() {
  const hosts = document.querySelectorAll('[data-card-nav]');
  if (!hosts.length) return;

  const params = new URLSearchParams(window.location.search);
  const file = params.get('file');
  const viewer = window.location.pathname.split('/').pop() || 'render.html';
  const found = file ? somLocateCard(viewer, file) : null;

  const prev = found && found.index > 0 ? found.seq[found.index - 1] : null;
  const next = found && found.index < found.seq.length - 1 ? found.seq[found.index + 1] : null;

  const homeHref = found ? `../index.html#${found.nodeId}` : '../index.html';
  const context = found
    ? `<span class="card-nav-context">${found.node.icon || '✦'} ${somEscapeHtml(found.node.category)} · ${found.index + 1} of ${found.seq.length}</span>`
    : '';

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

  // Home also gets a slot in the floating control stack, so it stays
  // reachable from the middle of a long card without scrolling.
  const floatHome = document.getElementById('floatHomeBtn');
  if (floatHome) {
    floatHome.href = homeHref;
    floatHome.style.display = 'flex';
  }

  document.addEventListener('keydown', (e) => {
    if (e.ctrlKey || e.metaKey || e.altKey) return;
    const el = document.activeElement;
    if (el && (el.isContentEditable || ['INPUT', 'TEXTAREA', 'SELECT'].includes(el.tagName))) return;
    if (e.key === 'ArrowLeft' && prev) window.location.href = '../' + prev.path;
    if (e.key === 'ArrowRight' && next) window.location.href = '../' + next.path;
  });
}
