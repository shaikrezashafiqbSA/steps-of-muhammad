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
    category: "The Nūr in the Heart",
    desc: "Anchoring the heart and aligning to the amr — no fixed hour, only need",
    items: [
      { type: "family", label: "Strong Believer", icon: "💪", tier: "imam" },
      { label: "Asking through the Greatest Name — when He is asked by it, He gives", gloss: "Bi-Annī Ashhadu Annaka Anta-llāh", ref: "Tirmidhī 3475", tier: "jemaah", grade: "sahih", time: ["*any"], path: "web/render.html?file=content/dua/in-greatest-of-names.md" },
      { label: "The duʿāʾ he ﷺ said most often: hold my heart firm on Your dīn", gloss: "Yā Muqallibal-Qulūb", ref: "Tirmidhī 2140", tier: "jemaah", grade: "hasan", time: ["*any"], path: "web/render.html?file=content/dua/ya-muqallibal-qulub.md" },
      { label: "ʿĀʾishah's comprehensive ask — all good, known and unknown", gloss: "Asʾaluka min al-Khayri Kullih", ref: "Ibn Mājah 3846", tier: "imam", grade: "sahih", time: ["*any"], path: "web/render.html?file=content/dua/aisyah-comprehensive-ask.md" },
      { label: "Sulaymān's ask: increase my capacity to be thankful", gloss: "Rabbi Awziʿnī an Ashkura Niʿmatak", ref: "Qurʾān 27:19", tier: "jemaah", grade: "quran", time: ["day-duha", "day-dhuhr", "*any"], path: "web/render.html?file=content/dua/sulaiman-thankfulness.md" },
      { label: "Praise that matches His blessings; compiled in the Bā ʿAlawī majālis", gloss: "Duʿāʾ al-Ḥamd — Ḥamdan Yuwāfī", ref: "Compiled wird", tier: "muhsin", time: ["*any"], path: "web/render.html?file=content/dua/dua-hamdan-yuwafi.md" },
      { label: "Ṣalāt al-Ḥājah — the prayer of pressing need", gloss: "Lā Ilāha Illallāhu-l-Ḥalīmu-l-Karīm", ref: "Ibn Mājah 1384", tier: "muhsin", grade: "daif", time: ["*any"], path: "web/render.html?file=content/dua/hajat.md" },
      { label: "O Allah, set right for me my religion ...", gloss: "Allahuma aṣliḥ lī dīniya ...  ", ref: "Riyāḍ aṣ-Ṣāliḥīn 1457", tier: "muhsin",grade: "sahih", time: ["*any"], path: "web/render.html?file=content/dua/o-allah-set-right-for-me-my-religion.md" },
      { type: "family", label: "Qurʾān in Heart", tier: "imam" },
      { label: "Make the Qurʾān the spring of my heart, the light of my chest", gloss: "Ijʿali-l-Qurʾāna Rabīʿa Qalbī", ref: "Musnad Aḥmad 3712", tier: "imam", grade: "sahih", time: ["*any"], path: "web/render.html?file=content/dua/quran/quran_spring_heart.md" },
      { label: "The memoriser's duʿāʾ — clarity, retention, character", gloss: "Duʿāʾ Ḥifẓ al-Mursalīn", ref: "Compiled wird", tier: "muhsin", time: ["*any"], path: "web/render.html?file=content/dua/quran/memoriser.md" },
      { type: "family", label: "Shifā / Healing", tier: "imam" },
      { label: "Seven times at a sick person's side, and Allah heals them", gloss: "Asʾalu-llāha-l-ʿAẓīm — ×7", ref: "Riyāḍ 906 · Tirmidhī 2083", reps: "×7", tier: "muhsin", grade: "hasan", time: ["*any"], path: "web/render.html?file=content/dua/shifa/yashfiyaka.md" },
      { label: "For pregnancy — the compiled set said after each prayer", gloss: "Duʿāʾ al-Ḥāmil", ref: "Compiled wird", tier: "muhsin", time: ["*salah", "*any"], path: "web/render.html?file=content/dua/shifa/dua-hamil.md" },
      { label: "Zakariyyā's ask for righteous offspring, through His beautiful names", gloss: "Rabbi Hab Lī min Ladunka Dhurriyyatan Ṭayyibah", ref: "Qurʾān 3:38", tier: "muhsin", grade: "quran", time: ["*any"], path: "web/render.html?file=content/dua/shifa/dua-righteous-offspring-2.md" }
    ]
  },
  {
    icon: "🕌",
    category: "Ṣalāh",
    desc: "Prophetic du'ās before, during and after ṣalāh",
    items: [
      { type: "family", label: "Before Ṣalāh ", gloss: "Everything said before the takbīr, in order", tier: "imam", time: ["*salah"]},
      { label: "Ask for the Prophet's ﷺ wasīlah, the moment the adhān ends", gloss: "Rabba Hādhihi-d-Daʿwati-t-Tāmmah", ref: "Bukhārī 614", tier: "jemaah", grade: "sahih", time: ["*adhan"], path: "web/render.html?file=content/salah/before/after-adhan.md" },
      { type: "family", label: "During Ṣalāh", gloss: "The full order of the prayer itself", tier: "imam", time: ["*salah"],  },
      { label: "The opening, said between the takbīr and al-Fātiḥah", gloss: "Duʿāʾ al-Iftitāḥ", ref: "Muslim 601 · 771", tier: "jemaah", grade: "sahih", time: ["*salah"], path: "web/render.html?file=content/salah/during/iftitah.md" },
      { label: "The prayer divided in two — He answers you verse by verse", gloss: "Al-Fātiḥah", ref: "Muslim 395a", tier: "jemaah", grade: "sahih", time: ["*salah"], path: "web/render.html?file=content/salah/during/al-fatihah.md" },
      { label: "The counsel he ﷺ took Muʿādh's hand to give: help me remember You", gloss: "Allāhumma Aʿinnī ʿalā Dhikrika", ref: "Riyāḍ 1422 · Abū Dāwūd 1522", tier: "jemaah", grade: "sahih", time: ["*salah"], path: "web/render.html?file=content/salah/after/help-me-be-grateful.md" },
      { label: "Useful knowledge, good provision, accepted deeds — said in the salām of Fajr", gloss: "ʿIlman Nāfiʿan wa Rizqan Ṭayyiban", ref: "Ibn Mājah 925", tier: "jemaah", grade: "sahih", time: ["day-fajr-post"], path: "web/render.html?file=content/salah/after/fajr-in-salam.md" },
      { type: "family", label: "After Ṣalāh", gloss: "The Prophet's ﷺ closing set, after every taslīm", tier: "imam", time: ["*salah"],},
      { num: "1", label: "Three istighfār, then the declaration of peace", gloss: "Allāhumma Anta-s-Salām", ref: "Muslim 591", reps: "×3 + 1", tier: "jemaah", grade: "sahih", time: ["*salah"], path: "web/render.html?file=content/salah/after/1_istigfar_peace.md" },
      { num: "2a", label: "Tahlīl of sincere devotion after the taslīm", gloss: "Mukhliṣīna Lahu-d-Dīn", ref: "Nasāʾī 1339", tier: "jemaah", grade: "sahih", time: ["*salah"], path: "web/render.html?file=content/salah/after/tahlil-mukhlisina.md" },
      { num: "2b", label: "No one withholds what He gives — divine sovereignty", gloss: "Lā Māniʿa Limā Aʿṭayta", ref: "Muslim 593a", tier: "jemaah", grade: "sahih", time: ["*salah"], path: "web/render.html?file=content/salah/after/tahlil-la-mania.md" },
      { num: "2c", label: "Ten after Fajr and Maghrib: the reward of freeing a slave", gloss: "Yuḥyī wa Yumītu — ×10", ref: "Tirmidhī 3474", reps: "×10", tier: "imam", grade: "hasan", time: ["day-fajr-post", "night-maghrib"], path: "web/render.html?file=content/salah/after/tahlil-fajr-maghrib-10-times.md" },
      { num: "5", label: "Seven times after Fajr and Maghrib, seeking refuge from the Fire", gloss: "Allāhumma Ajirnī mina-n-Nār", ref: "Abū Dāwūd 5079", reps: "×7", tier: "muhsin", grade: "daif", time: ["day-fajr-post", "night-maghrib"], path: "web/render.html?file=content/salah/after/3_dua-allahuma-ajirnaar.md" },
      { num: "3", label: "33 · 33 · 33 and the hundredth — sins forgiven though they be the foam of the sea", gloss: "Tasbīḥ · Taḥmīd · Takbīr", ref: "Muslim 597a", reps: "×100", tier: "jemaah", grade: "sahih", time: ["*salah"], path: "web/render.html?file=content/salah/after/tasbih-33-33-34.md" },
    
    ]
  },
  {
    icon: "🛡️",
    category: "Adhkār aṣ-Ṣabāḥ wal-Masāʾ",
    desc: "The morning and evening shield — recited after Fajr and after ʿAṣr",
    items: [
      /* { num: "1", label: "Hand the day over the instant it starts — and the night, the same way", gloss: "Allāhumma Bika Aṣbaḥnā", ref: "Abū Dāwūd 5068", tier: "jemaah", grade: "sahih", time: ["day-fajr-post", "day-asr-post"], path: "web/render.html?file=content/adhkar-as-sabah-wal-masa/bika-asbahna.md" },
      { num: "2", label: "The kingdom enters evening with you — ask for the good of this night", gloss: "Amsaynā wa Amsā-l-Mulku Lillāh", ref: "Muslim 2723a", tier: "jemaah", grade: "sahih", time: ["day-fajr-post", "night-maghrib"], path: "web/render.html?file=content/adhkar-as-sabah-wal-masa/amsayna-wa-amsal-mulk.md" },*/ 
      { num: "1", label: "Four phrases that outweigh a whole morning of dhikr", gloss: "Subḥāna Allāhi wa Biḥamdihī", ref: "Riyāḍ 1433 · Muslim 2726", reps: "×3", tier: "jemaah", grade: "sahih", time: ["day-fajr-post", "day-asr-post"], path: "web/render.html?file=content/adhkar-as-sabah-wal-masa/0_subhana_allahi_wa_bihamdihi.md" },
      { num: "2", label: "Refuge in His perfect words from the evil of what He made", gloss: "Aʿūdhu bi-Kalimāti-llāhi-t-Tāmmāt", ref: "Muslim 2708b · 2709a", reps: "×3", tier: "jemaah", grade: "sahih", time: ["day-asr-post", "night-maghrib", "*any"], path: "web/render.html?file=content/adhkar-as-sabah-wal-masa/1_audhubikatillah.md" },
      { num: "3", label: "Say it three times and nothing will harm you until you say it again", gloss: "Bismillāhi-lladhī Lā Yaḍurru", ref: "Riyāḍ 1457 · Abū Dāwūd 5088", reps: "×3", tier: "jemaah", grade: "sahih", time: ["day-fajr-post", "day-asr-post"], path: "web/render.html?file=content/adhkar-as-sabah-wal-masa/2_bismillahiladhi_layadurru.md" },
      { num: "4", label: "Seven times, and Allah suffices you in every concern of this world and the next", gloss: "Ḥasbiyallāhu Lā Ilāha Illā Huwa — ×7", ref: "Ḥiṣn 83 · Abū Dāwūd 5081", reps: "×7", tier: "imam", grade: "sahih", time: ["day-fajr-post", "day-asr-post"], path: "web/render.html?file=content/adhkar-as-sabah-wal-masa/3_hasbiyallahu_7.md" },
      { num: "5", label: "The close of al-Ḥashr — seventy thousand angels sent to pray for you", gloss: "Law Anzalnā Hādha-l-Qurʾān", ref: "Tirmidhī 2922", tier: "muhsin", grade: "daif", time: ["day-fajr-post", "day-asr-post"], path: "web/render.html?file=content/adhkar-as-sabah-wal-masa/c_law_anzalna.md" },
      { num: "6", label: "Ten upon him ﷺ morning and evening, and his intercession is yours", gloss: "Ṣalawāt — ×10", ref: "Ḥiṣn 98 · Ṭabarānī", reps: "×10", tier: "imam", grade: "hasan", time: ["day-fajr-post", "day-asr-post"], path: "web/render.html?file=content/adhkar-as-sabah-wal-masa/b_salawat_10.md" },
      { num: "7", label: "The chief of seeking forgiveness — say it with certainty and you are of Jannah", gloss: "Sayyid al-Istighfār", ref: "Bukhārī 6306", tier: "jemaah", grade: "sahih", time: ["day-fajr-post", "day-asr-post"], path: "web/render.html?file=content/adhkar-as-sabah-wal-masa/4_sayyidul-istighfar.md" },
      { num: "8", label: "The words he ﷺ never abandoned, morning or evening — complete well-being", gloss: "Allāhumma Innī Asʾaluka-l-ʿĀfiyah", ref: "Ibn Mājah 3871 · Abū Dāwūd 5074", tier: "jemaah", grade: "sahih", time: ["day-fajr-post", "day-asr-post"], path: "web/render.html?file=content/adhkar-as-sabah-wal-masa/never-abandoned.md" },
      { num: "9", label: "Duʿāʾ of Fāṭimah — entrust every affair to the Ever-Living", gloss: "Yā Ḥayyu Yā Qayyūm", ref: "Ḥiṣn 88 · Nasāʾī al-Kubrā 10330", tier: "jemaah", grade: "sahih", time: ["day-fajr-post", "day-asr-post"], path: "web/render.html?file=content/adhkar-as-sabah-wal-masa/6_ya-hayyu-ya-qayyum.md" },
      { num: "10.1", label: "Refuge from anxiety, grief, debt and the domination of men", gloss: "Allāhumma Innī Aʿūdhu bika mina-l-Hammi", ref: "Bukhārī 2893", tier: "jemaah", grade: "sahih", time: ["day-fajr-post", "day-asr-post", "*any"], path: "web/render.html?file=content/adhkar-as-sabah-wal-masa/5_hammi_wal_Hazan.md" },
      { num: "10.2", label: "Untangle from Debts and remove anxiety", gloss: "Hamm wal-Ḥazan — Abū Umāmah's narration", ref: "Abū Dāwūd 1555", tier: "muhsin", grade: "daif", time: ["day-fajr-post", "day-asr-post"], path: "web/render.html?file=content/adhkar-as-sabah-wal-masa/5b_hammi_wal_Hazan.md" },
      { num: "11", label: "Body, hearing, sight — and refuge from disbelief and destitution", gloss: "Allāhumma ʿĀfinī fī Badanī", ref: "Abū Dāwūd 5090", reps: "×3", tier: "imam", grade: "hasan", time: ["day-fajr-post", "day-asr-post"], path: "web/render.html?file=content/adhkar-as-sabah-wal-masa/7_body-hearing-sight.md" },
      { num: "12", label: "Contentment with Allah, Islam and the Prophet ﷺ — Jannah made binding", gloss: "Raḍītu billāhi Rabbā", ref: "Tirmidhī 3389", reps: "×3", tier: "jemaah", grade: "hasan", time: ["day-fajr-post", "day-asr-post"], path: "web/render.html?file=content/adhkar-as-sabah-wal-masa/8_raditdubillahirabban.md" },
      { num: "13", label: "The tahlīl of daily protection and tawḥīd", gloss: "Lā Ilāha Illallāh Waḥdahū — ×10", ref: "Ḥiṣn 92 · Bukhārī 6403", reps: "×10", tier: "jemaah", grade: "sahih", time: ["day-fajr-post", "day-asr-post"], path: "web/render.html?file=content/adhkar-as-sabah-wal-masa/a_la_ilaha_illallah_wahdahu_la_sharikalah.md" },
      { num: "14", label: "Fire insurance - The tahlīl of daily protection and tawḥīd", gloss: "Dua Abu Darda", ref: "Habeeb Umar bin Hafidz", tier: "jemaah", grade: "sahih", time: ["day-fajr-post"], path: "web/render.html?file=content/dua/dua-abu-darda-fire-insurance.md" },
    ]
  },
  {
    icon: "🌤️",
    category: "Ḍuḥā & the Working Day",
    desc: "The forenoon window — provision, ease of work, and the road",
    items: [
      { label: "Ḥadīth qudsī: give Me four, and I will suffice you for the rest of it", gloss: "Four Rakʿah at the Start of the Day", ref: "Abū Dāwūd 1289", reps: "4 rakʿah", tier: "jemaah", grade: "sahih", time: ["day-duha"], path: "web/render.html?file=content/dua/duha-four-rakah.md" },
      { label: "Nothing is easy but what You make easy — for work that has seized up", gloss: "Allāhumma Lā Sahla Illā Mā Jaʿaltahu Sahlā", ref: "Ḥiṣn 139 · Ibn Ḥibbān 974", tier: "jemaah", grade: "sahih", time: ["day-duha", "day-dhuhr", "*any"], path: "web/render.html?file=content/dua/la-sahla.md" },
      { label: "The travelling duʿāʾ — said as the vehicle moves off", gloss: "Duʿāʾ as-Safar", ref: "Tirmidhī 3447", tier: "jemaah", grade: "sahih", time: ["day-duha", "*any"], path: "web/render.html?file=content/dua/dua-safar.md" },
      { label: "Debt the size of Mount Ṣīr, settled — the duʿāʾ he ﷺ taught ʿAlī", gloss: "Allāhumma-kfinī bi-Ḥalālika ʿan Ḥarāmik", ref: "Tirmidhī 3563", tier: "imam", grade: "hasan", time: ["day-duha", "day-dhuhr", "*any"], path: "web/render.html?file=content/dua/remove-debt-mountain.md" }
    ]
  },
    {
    icon: "🌙",
    category: "Adhkār al-Layl",
    desc: "The night cycle — going to bed, waking in the dark, and the last third",
    items: [
      { type: "family", label: "About to sleep", gloss: "Last things said before sleep", tier: "imam", time: ["*night-presleep"]},
      { num: "1", label: "Breathe the three sūrahs into your palms and wipe your body, three times", gloss: "Al-Muʿawwidhāt — ×3", ref: "Bukhārī 5017", reps: "×3", tier: "jemaah", grade: "sahih", time: ["night-presleep"], path: "web/render.html?file=content/adhkar-al-lail/muawwidhat-nafth.md" },
      { num: "2", label: "A guardian appointed over you, and no devil near you until morning", gloss: "Āyat al-Kursī", ref: "Bukhārī 2311", tier: "jemaah", grade: "sahih", time: ["night-presleep"], path: "web/render.html?file=content/adhkar-al-lail/ayat-al-kursi-guard.md" },
      { num: "3", label: "He offered it to Fāṭimah instead of the servant she asked for", gloss: "Tasbīḥ Fāṭimah — 33·33·34", ref: "Bukhārī 3705", reps: "×100", tier: "jemaah", grade: "sahih", time: ["night-presleep"], path: "web/render.html?file=content/adhkar-al-lail/tasbih-fatimah.md" },
      { num: "4", label: "Wuḍūʾ, right side, these words — and if you die that night you die on the fiṭrah", gloss: "Allāhumma Aslamtu Wajhī Ilayk", ref: "Bukhārī 247", tier: "jemaah", grade: "sahih", time: ["night-presleep"], path: "web/render.html?file=content/adhkar-al-lail/aslamtu-wajhi.md" },
      { num: "5", label: "The last words of the day, and the first of the next on waking", gloss: "Bismika Amūtu wa Aḥyā", ref: "Bukhārī 6312", tier: "jemaah", grade: "sahih", time: ["night-presleep", "day-fajr-adhan"], path: "web/render.html?file=content/adhkar-al-lail/bismika-amutu-wa-ahya.md" },
      { type: "family", label: "Left sleep", gloss: "Tahajjud", tier: "imam", time: ["*night-presleep"]},
      { label: "You woke without meaning to — say this, then ask, and you are answered", gloss: "Man Taʿārra mina-l-Layl", ref: "Bukhārī 1154", tier: "jemaah", grade: "sahih", time: ["night-2nd-third", "night-last-third"], path: "web/render.html?file=content/adhkar-al-lail/man-taarra-min-al-layl.md" },
      { label: "His ﷺ opening of tahajjud — eleven truths, then forgiveness", gloss: "Allāhumma Laka-l-Ḥamd", ref: "Bukhārī 1120", tier: "imam", grade: "sahih", time: ["night-last-third"], path: "web/render.html?file=content/adhkar-al-lail/tahajjud-lakal-hamd.md" },
      { label: "The Three Tiers of Night Prayer: Ten, One Hundred, and One Thousand", gloss: "lam yuktab mina l-ghāfilīna / kutiba mina l-qānitīna + l-muqanṭarīna ", ref: "Sunan Abī Dāwūd 1398", tier: "imam", grade: "sahih", time: ["night-2nd-third","night-last-third"], path: "web/render.html?file=content/adhkar-al-lail/three-tiers-of-the-night-prayer.md" },
      { label: "Istikhārah — two rakʿah, then hand the decision back", gloss: "Solat Istikhara - Allāhumma Innī Astakhīruka", ref: "Bukhārī 1166", tier: "jemaah", grade: "sahih", time: ["night-last-third", "*any"], path: "web/render.html?file=content/dua/istikhara.md" }
    ]
  },
    {
    icon: "🌸",
    category: "Ṣalawāt",
    desc: "Send ṣalawāt upon the Prophet ﷺ",
    items: [
      { label: "The Adnānī formula, from the mashāyikh", gloss: "Ṣalawāt Adnānī", ref: "Compiled wird", tier: "muhsin", time: ["*any"], path: "salawat/salawat-adnani.html" },
      { label: "The ṣalawāt of relief, recited when a knot will not loosen", gloss: "Ṣalawāt Tafrījiyyah", ref: "Compiled wird", tier: "imam", time: ["*any"], path: "web/render.html?file=content/salawat/salawat-tafrijiyyah.md" }
    ]
  },
  {
    icon: "📿",
    category: "Tahlīl Collections",
    desc: "Tahlīl collections pieced by mashāyikh",
    items: [
      { label: "The reciter dedicates the reward of Al-Fatihah to the Prophets, the Companions, the Caliphs to raise their ranks", gloss: "Tawassul before Al Fatihah", ref: "Compiled wird", time: ["*any"], path: "web/render.html?file=content/tahleel/al-fatihah-ilaa-ruhi.md" },
      { label: "The full tahlīl sequence for the departed", gloss: "Tahlīl al-Arwāḥ", ref: "Compiled wird", time: ["*any"], path: "web/render.html?file=content/tahleel/tahlil-al-arwah.md" }
    ]
  },
  {
    icon: "🌾",
    category: "Sacred Times",
    desc: "Wird tied to a season, a sacred month, or a day that comes once a year",
    items: [
      { label: "Said on a birthday; composite, read the verification notice first", gloss: "Duʿāʾ Mīlād — Yā Ghaniyyu Aghninā", ref: "Tirmidhī 3505 · 3563 · Qurʾān 21:87", tier: "jemaah", time: ["*any"], path: "web/render.html?file=content/dua/dua-birthday.md" },
      { label: "The takbīr of the days of tashrīq", gloss: "Takbīr ʿĪd al-Aḍḥā", ref: "Compiled wird", tier: "jemaah", time: ["*any"], path: "Dua Haj/takbir-eiduladha.html" },
      { label: "The best duʿāʾ the Prophets made, on the day of ʿArafah", gloss: "Khayru-d-Duʿāʾ Duʿāʾ Yawm ʿArafah", ref: "Tirmidhī 3585", tier: "imam", time: ["*any"], path: "Dua Haj/dua-prophets-made-on-arafah.html" },
      { label: "What the two of them said standing on ʿArafah", gloss: "ʿArafah — ʿAlī and Ibn ʿUmar", ref: "Athar", tier: "imam", time: ["*any"], path: "Dua Haj/dua-sahabah-made-on-arafah.html" },
      { label: "The collected amal of the ten best days", gloss: "Dhū al-Ḥijjah — First Ten Days", ref: "Compiled wird", time: ["*any"], path: "Dua Haj/Amalan Haj.html" },
      { label: "The Rajab istighfār set", gloss: "Istighfār Rajab", ref: "Compiled wird", time: ["*any"], path: "Wird/istighfar-rajab.html" }
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

// Same ends, shaped for the floating bottom HUD on render.html — one shared
// pill with prev · home · next. render_collection.html has no #somHudNav, so
// this simply never runs there.
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

  return `<a class="hud-nav-btn ${align}" href="../${item.path}" title="${label}">
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

  // render.html docks the same navigation into a fixed bottom-center HUD
  // instead of in-flow bars; pages without #somHudNav skip this silently.
  const hudContext = found
    ? `${found.node.icon || '✦'} ${somEscapeHtml(found.node.category)} · ${found.index + 1} of ${found.seq.length}`
    : '';
  somBuildHudNav(prev, next, homeHref, hudContext);

  // Pages that still carry a #floatHomeBtn in their control stack (e.g.
  // render_collection.html) get it wired up here; render.html dropped it
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
    if (e.key === 'ArrowLeft' && prev) window.location.href = '../' + prev.path;
    if (e.key === 'ArrowRight' && next) window.location.href = '../' + next.path;
  });
}
