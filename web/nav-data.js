// =========================================================
// SHARED NAVIGATION DATA + CARD-TO-CARD NAVIGATION
//   Single source of truth for the menu tree. Loaded by:
//     index.html                  → Compendium view + Action view
//     web/render.html             → prev / home / next on a card
//
//   Because the tree lives here, a rendered card can work out
//   which category it belongs to and which duʿā comes before
//   and after it 〜 that's what drives the nav bars.
//
//   Each category has: { icon, category, desc, items: [...] }
//   Icon emojis 〜 non-living symbols only
//
//   A `family` item (a divider heading inside a category) shows
//   📚 by default. Give it its own `icon: "💪"` to swap that
//   glyph 〜 e.g. a flexed bicep for a "Strong Believer" family.
// =========================================================
//
// ── ITEM NAMING CONTRACT ─────────────────────────────────
//   Every atomic duʿā carries three names, and they do
//   different jobs. Do not collapse them into one string.
//
//     label  Thematic, plain-English function 〜 what it does
//            for you, one line, as close to the source meaning
//            as possible. Shown first, large, at a glance.
//            "The duʿāʾ he ﷺ said most often: hold my heart
//            firm on Your dīn". This is the primary display name.
//
//     gloss  Familiar sound. What a person actually calls this
//            duʿā out loud 〜 the incipit, transliterated.
//            "Sayyid al-Istighfār", "Yā Muqallibal-Qulūb".
//            Shown secondary, under the label.
//
//     ref    Technical citation. Collection + hadith number,
//            exactly as sunnah.com numbers it, so the claim is
//            checkable in one click. "Bukhārī 6306".
//            Omit only where there is genuinely no hadith
//            number 〜 compiled wird, Qurʾānic text, overviews.
//
//   Plus, after `path`:
//     num    step badge on the row (Library sequences only)
//     ref    citation (above)
//     reps   recitation count, if the narration fixes one
//     grade  sahih | hasan | daif 〜 row tint; omitted = ungraded wird
//     time   (below)
//
//   Key order on every row: label, gloss, path, then the rest 〜
//   so the path is visible without scrolling.
//
// ── TIME TAGS ────────────────────────────────────────────
//   `time` only feeds the "Suggested" list in Action view's slot
//   picker 〜 it does not place a duʿā in a slot (default-plan.js
//   does that). Values are window ids from SomSunClock.TIME_WINDOWS,
//   plus two wildcards:
//
//     '*salah'  〜 at or around any of the five farḍ prayers
//     '*adhan'  〜 on hearing any adhān
//
//   Omit `time` when the duʿā has no fixed hour.
// =========================================================

const VAULT_NAVIGATION_TREE = [
    {
    icon: "🤍",
    category: "Duʿā",
    categoryAr: "الدُّعَاءُ",
    desc: "“Call upon Me, I will respond to you” 〜 Qurʾān 40:60",
    items: [
      //forgiveness family
      { type: "family", label: "Ya Allah, forgive me - tear out the inner darknesses before asking", icon: "🖤⛓️🤍" },
      { label: "100 Daily Forgiveness - When a cloud comes over my heart", gloss: "Allāhumma innī astaghfiruka ...", path: "web/render.html?file=content/01-dua/01-forgiveness/forgiveness-100-times.md", ref: "Riyāḍ aṣ-Ṣāliḥīn 1869", reps: "daily", grade: "sahih" },
      { label: "Adam's Forgiveness - The First Repentance", gloss: "Rabbana Zalamna anfusana...", path: "web/render.html?file=content/01-dua/01-forgiveness/forgiveness-adam.md", ref: "Qurʾān 2:37", grade: "sahih", time: ["night-presleep", "night-last-third"] },
      { label: "Sulaymān's Forgiveness - The Unmatched Kingdom", gloss: "Rabbighfirli ...", path: "web/render.html?file=content/01-dua/01-forgiveness/forgiveness-sulaiman.md", ref: "Jāmiʿ at-Tirmidhī 3505", grade: "sahih", time: ["night-last-third"] },
      { label: "Forgiveness for Predecessors and a Heart Free of Rancor", gloss: ".. wa la taj'al fi qulubina Ghilla..", path: "web/render.html?file=content/01-dua/01-forgiveness/forgive-us-do-not-place-ghilla-in-hearts.md", ref: "Qurʾān 59:10", grade: "sahih", time: ["*salah"] },
      { label: "Forgiveness for Parents and All Believers", gloss: "Rabbighfir li-walidayhi ..", path: "web/render.html?file=content/01-dua/01-forgiveness/forgiveness-parents-all-believers.md", ref: "Musnad al-Shāmiyīn lil-Ṭabarānī 2118", grade: "hasan", time: ["*salah"] },

      // General Dua family
      { type: "family", label: "Ya Allah, teach me how to ask you", icon: "🤲" },
      { label: "Allah's Greatest Name - When He is asked by it, He gives", gloss: "Bi-Annī Ashhadu Annaka Anta-llāh", path: "web/render.html?file=content/01-dua/02-asking-allah/in-greatest-of-names.md", ref: "Tirmidhī 3475", grade: "sahih", time: ["night-last-third", "*adhan"] },
      { label: "Yunus' Dua in the Whale - When there is no way out", gloss: "Lā Ilāha Illā Anta Subḥānaka ...", path: "web/render.html?file=content/01-dua/02-asking-allah/yunus-in-whale.md", ref: "Qurʾān 21:87", grade: "sahih", time: ["*salah"] },
      { label: "Good in This World and the Next - The dua he ﷺ said most often", gloss: "Rabbana atina fid dunya...", path: "web/render.html?file=content/01-dua/02-asking-allah/rabbana-atina-fid-dunya.md", ref: "Qurʾān 2:201", grade: "sahih", time: ["*salah"] },
      { label: "ʿĀʾishah's Comprehensive Ask - All good, known and unknown", gloss: "Asʾaluka min al-Khayri Kullih", path: "web/render.html?file=content/01-dua/02-asking-allah/aisyah-comprehensive-ask.md", ref: "Ibn Mājah 3846", grade: "sahih", time: ["night-last-third"] },
      { label: "Rectification of Religion, World and Hereafter - O Allah, set right for me my religion", gloss: "Allahuma aṣliḥ lī dīniya ...  ", path: "web/render.html?file=content/01-dua/02-asking-allah/o-allah-set-right-for-me-my-religion.md", ref: "Muslim 2720", grade: "sahih", time: ["day-fajr-post", "day-asr-post"] },
      { label: "Duas of the Servants of the Most Gracious - ʿIbād ar-Raḥmān", gloss: "Rabbana habla min azwajina ...", path: "web/render.html?file=content/01-dua/02-asking-allah/dua-ibadurrahman.md", ref: "Qurʾān 25:63-77", grade: "sahih", time: ["night-last-third"] },
      { label: "Dua Selamat - Safety in religion, death and the reckoning", gloss: "Allāhumma innā nasʾaluka salāmatan fi din...", path: "web/render.html?file=content/01-dua/02-asking-allah/dua-selamat.md", grade: "sahih" },
      { label: "Dua Tolak Balak - Calamity Averted Before it Descends", gloss: "Allāhumma ya kafiya'a bala' ...", path: "web/render.html?file=content/01-dua/02-asking-allah/dua-tolak-balak.md" },

      // Steadfastness of heart and Din
      { type: "family", label: "Ya Allah, Make me follow you", icon: "🫀" },
      { label: "A Heart Held Firm on His Dīn - The dua he ﷺ said most often", gloss: "Yā Muqallibal-Qulūb...", path: "web/render.html?file=content/01-dua/03-steadfastness/ya-muqallibal-qulub.md", ref: "Tirmidhī 2140", grade: "hasan", time: ["*salah"] },
      { label: "Do Not Let Our Hearts Deviate - The ayah he ﷺ would follow up with", gloss: "Rabbana la tuzigh qulubbana...", path: "web/render.html?file=content/01-dua/03-steadfastness/la-tuzigh-qulubana.md", ref: "Qurʾān 3:8", grade: "sahih", time: ["*salah"] },
      { label: "Ibrahim's Submission - Make us muslim, show us our rites", gloss: "Rabbanā wajʿalnā muslimayni laka", path: "web/render.html?file=content/01-dua/03-steadfastness/make-us-muslim-show-us-nusuk.md", ref: "Qurʾān 26:84-85", grade: "sahih", time: ["night-last-third"] },
      
      // Gratitude
      { type: "family", label: "Gratitude & Praise", icon: "🌼" },
      { label: "Sulaymān's Gratitude - Increase my capacity to be thankful", gloss: "Rabbi Awziʿnī an Ashkura Niʿmatak", path: "web/render.html?file=content/01-dua/04-gratitude/sulaiman-thankfulness.md", ref: "Qurʾān 27:19", grade: "sahih", time: ["day-duha", "day-dhuhr"] },
      { label: "Praise That Matches His Blessings - Compiled in the Bā ʿAlawī majālis", gloss: "Duʿāʾ al-Ḥamd 〜 Ḥamdan Yuwāfī", path: "web/render.html?file=content/01-dua/04-gratitude/dua-hamdan-yuwafi.md", ref: "Compiled wird", time: ["day-fajr-post", "day-asr-post"] },
      { label: "Praise After Eating - Past sins forgiven", gloss: "Al-ḥamdu lillāhi-lladhī aṭʿamanī hādhā ...", path: "web/render.html?file=content/01-dua/04-gratitude/eating-alhamdulillah-forgiveness.md", ref: "Riyāḍ aṣ-Ṣāliḥīn 734", grade: "hasan" },
     
      // Quran in heart
      { type: "family", label: "Qurʾān in Heart" },
      { label: "The Qurʾān, Spring of My Heart - Light of my chest, relief from grief", gloss: "Ijʿali-l-Qurʾāna Rabīʿa Qalbī", path: "web/render.html?file=content/01-dua/05-quran-in-heart/quran_spring_heart.md", ref: "Musnad Aḥmad 3712", grade: "sahih", time: ["day-duha"] },
      { label: "The Memoriser's Dua - Clarity, retention, character", gloss: "Duʿāʾ Ḥifẓ al-Mursalīn", path: "web/render.html?file=content/01-dua/05-quran-in-heart/memoriser.md", ref: "Compiled wird", time: ["day-duha"] },
      
      // Shifa
      { type: "family", label: "Shifā / Healing" },
      { label: "Healing for the Sick - Seven times at their side, and Allah heals them", gloss: "Asʾalu-llāha-l-ʿAẓīm 〜 ×7", path: "web/render.html?file=content/01-dua/06-shifa/yashfiyaka.md", ref: "Riyāḍ 906 · Tirmidhī 2083", reps: "×7", grade: "hasan" },
      { label: "Dua for Pregnancy - The compiled set said after each prayer", gloss: "Duʿāʾ al-Ḥāmil", path: "web/render.html?file=content/01-dua/06-shifa/dua-hamil.md", ref: "Compiled wird", time: ["*salah"] },
      { label: "Seeking Refuge for Children - The Prophet's ﷺ dua for Ḥasan and Ḥusayn", gloss: "Aʿūdhu bi-Kalimāti-llāhi-t-Tāmmāt", path: "web/render.html?file=content/01-dua/06-shifa/evil-eye.md", ref: "Sunan Ibn Mājah 3525", grade: "sahih" },
    ]
  },
  {
    icon: "🕌",
    category: "Ṣalāh",
    categoryAr: "الصَّلَاةُ",
    desc: "Prophetic du'ās before, during and after ṣalāh",
    items: [
      { type: "family", label: "Before Ṣalāh", gloss: "Everything said before the takbīr, in order", time: ["*salah"] },
      { label: "After the Adhān - Ask for the Prophet's ﷺ wasīlah", gloss: "Rabba Hādhihi-d-Daʿwati-t-Tāmmah", path: "web/render.html?file=content/02-salah/01-before/after-adhan.md", ref: "Bukhārī 614", grade: "sahih", time: ["*adhan"] },
      { type: "family", label: "During Ṣalāh", gloss: "The full order of the prayer itself", time: ["*salah"] },
      { label: "Duʿāʾ al-Iftitāḥ - Said between the takbīr and al-Fātiḥah", gloss: "Allahu akbar kabiraw ...", path: "web/render.html?file=content/02-salah/02-during/iftitah.md", ref: "Muslim 601 · 771", grade: "sahih", time: ["*salah"] },
      { label: "Al-Fātiḥah - He answers you verse by verse", gloss: "Al-Fātiḥah", path: "web/render.html?file=content/02-salah/02-during/al-fatihah.md", ref: "Muslim 395a", grade: "sahih", time: ["*salah"] },
      { label: "Salaam of Fajr - Useful knowledge, good provision, accepted deeds", gloss: "ʿIlman Nāfiʿan wa Rizqan Ṭayyiban ...", path: "web/render.html?file=content/02-salah/02-during/ilmannafia_rizqantayyiba_amalanmutaqqaballan.md", ref: "Ibn Mājah 925", grade: "sahih", time: ["day-fajr-post"] },
      { type: "family", label: "After Ṣalāh", gloss: "The Prophet's ﷺ closing set, after every taslīm", time: ["*salah"] },
      { label: "Never Miss at the End of Ṣalāh - Ya Allah, help me remember You", gloss: "Allāhumma Aʿinnī ʿalā Dhikrika", path: "web/render.html?file=content/02-salah/03-after/help-me-be-grateful.md", num: "1", ref: "Riyāḍ 1422 · Abū Dāwūd 1522", grade: "sahih", time: ["*salah"] },
      { label: "Turning Away from Ṣalāh - Three istighfār and peace", gloss: "Allāhumma Anta-s-Salām", path: "web/render.html?file=content/02-salah/03-after/1_istigfar_peace.md", num: "2", ref: "Muslim 591", reps: "×3 + 1", grade: "sahih", time: ["*salah"] },
      { label: "Tahlīls After Ṣalāh - Read either, or both", gloss: "Mukhliṣīna Lahu-d-Dīn + La Mania", path: "web/render.html?file=content/02-salah/03-after/tahlils.md", num: "3", ref: "Nasāʾī 1339", grade: "sahih", time: ["*salah"] },
      { label: "Ten Tahlīls After Fajr and Maghrib - The reward of freeing a slave", gloss: "Yuḥyī wa Yumītu 〜 ×10", path: "web/render.html?file=content/02-salah/03-after/tahlil-fajr-maghrib-10-times.md", num: "4", ref: "Tirmidhī 3474", reps: "×10", grade: "hasan", time: ["day-fajr-post", "night-maghrib"] },
      { label: "Seven Times After Fajr and Maghrib - Refuge from the Fire", gloss: "Allāhumma Ajirnī mina-n-Nār", path: "web/render.html?file=content/02-salah/03-after/3_dua-allahuma-ajirnaar.md", num: "5", ref: "Abū Dāwūd 5079", reps: "×7", grade: "daif", time: ["day-fajr-post", "night-maghrib"] },
      { label: "33 · 33 · 33 and the Hundredth - Sins forgiven though they be the foam of the sea", gloss: "Tasbīḥ · Taḥmīd · Takbīr", path: "web/render.html?file=content/02-salah/03-after/tasbih-33-33-34.md", num: "6", ref: "Muslim 597a", reps: "×100", grade: "sahih", time: ["*salah"] },
    
    ]
  },
  {
    icon: "🛡️",
    category: "Adhkār aṣ-Ṣabāḥ wal-Masāʾ",
    categoryAr: "أَذْكَارُ الصَّبَاحِ وَالْمَسَاءِ",
    desc: "The morning and evening shield 〜 recited after Fajr and after ʿAṣr",
    items: [
      /* { num: "1", label: "Hand the day over the instant it starts 〜 and the night, the same way", gloss: "Allāhumma Bika Aṣbaḥnā", ref: "Abū Dāwūd 5068", tier: "jemaah", grade: "sahih", time: ["day-fajr-post", "day-asr-post"], path: "web/render.html?file=content/03-adhkar-sabah-masa/bika-asbahna.md" },
      { num: "2", label: "The kingdom enters evening with you 〜 ask for the good of this night", gloss: "Amsaynā wa Amsā-l-Mulku Lillāh", ref: "Muslim 2723a", tier: "jemaah", grade: "sahih", time: ["day-fajr-post", "night-maghrib"], path: "web/render.html?file=content/03-adhkar-sabah-masa/amsayna-wa-amsal-mulk.md" },*/ 
      { label: "Refuge in His Perfect Words - From the evil of what He made", gloss: "Aʿūdhu bi-Kalimāti-llāhi-t-Tāmmāt", path: "web/render.html?file=content/03-adhkar-sabah-masa/1_audhubikatillah.md", num: "1", ref: "Muslim 2708b · 2709a", reps: "×3", grade: "sahih", time: ["day-asr-post", "night-maghrib"] },
      { label: "Comprehensive Protection Against All Harm - Say it three times and nothing will harm you", gloss: "Bismillāhi-lladhī Lā Yaḍurru", path: "web/render.html?file=content/03-adhkar-sabah-masa/2_bismillahiladhi_layadurru.md", num: "2", ref: "Riyāḍ 1457 · Abū Dāwūd 5088", reps: "×3", grade: "sahih", time: ["day-fajr-post", "day-asr-post"] },
      { label: "Ḥasbiyallāh Seven Times - Allah suffices you in every concern of this world and the next", gloss: "Ḥasbiyallāhu Lā Ilāha Illā Huwa 〜 ×7", path: "web/render.html?file=content/03-adhkar-sabah-masa/3_hasbiyallahu_7.md", num: "3", ref: "Ḥiṣn 83 · Abū Dāwūd 5081", reps: "×7", grade: "sahih", time: ["day-fajr-post", "day-asr-post"] },
      { label: "The Close of al-Ḥashr - Seventy thousand angels sent to pray for you", gloss: "Law Anzalnā Hādha-l-Qurʾān", path: "web/render.html?file=content/03-adhkar-sabah-masa/c_law_anzalna.md", num: "4", ref: "Tirmidhī 2922", grade: "daif", time: ["day-fajr-post", "day-asr-post"] },
      { label: "Ten Ṣalawāt Upon the Prophet ﷺ - His intercession is yours", gloss: "Ṣalawāt 〜 ×10", path: "web/render.html?file=content/03-adhkar-sabah-masa/b_salawat_10.md", num: "5", ref: "Ḥiṣn 98 · Ṭabarānī", reps: "×10", grade: "hasan", time: ["day-fajr-post", "day-asr-post"] },
      { label: "The Chief of Seeking Forgiveness - Say it with certainty and you are of Jannah", gloss: "Sayyid al-Istighfār", path: "web/render.html?file=content/03-adhkar-sabah-masa/4_sayyidul-istighfar.md", num: "6", ref: "Bukhārī 6306", grade: "sahih", time: ["day-fajr-post", "day-asr-post"] },
      { label: "The Words He ﷺ Never Abandoned - Complete well-being, morning and evening", gloss: "Allāhumma Innī Asʾaluka-l-ʿĀfiyah", path: "web/render.html?file=content/03-adhkar-sabah-masa/never-abandoned.md", num: "7", ref: "Ibn Mājah 3871 · Abū Dāwūd 5074", grade: "sahih", time: ["day-fajr-post", "day-asr-post"] },
      { label: "Duʿāʾ of Fāṭimah - Entrust every affair to the Ever-Living", gloss: "Yā Ḥayyu Yā Qayyūm", path: "web/render.html?file=content/03-adhkar-sabah-masa/6_ya-hayyu-ya-qayyum.md", num: "8", ref: "Ḥiṣn 88 · Nasāʾī al-Kubrā 10330", grade: "sahih", time: ["day-fajr-post", "day-asr-post"] },
      { label: "Refuge from Anxiety, Grief and Debt - And the domination of men", gloss: "Allāhumma Innī Aʿūdhu bika mina-l-Hammi", path: "web/render.html?file=content/03-adhkar-sabah-masa/5-hammi-wal-hazan.md", num: "10", ref: "Bukhārī 2893", grade: "sahih", time: ["day-fajr-post", "day-asr-post"] },
      { label: "Body, Hearing, Sight - Refuge from disbelief and destitution", gloss: "Allāhumma ʿĀfinī fī Badanī", path: "web/render.html?file=content/03-adhkar-sabah-masa/7_body-hearing-sight.md", num: "11", ref: "Abū Dāwūd 5090", reps: "×3", grade: "hasan", time: ["day-fajr-post", "day-asr-post"] },
      { label: "Contentment with Allah, Islam and the Prophet ﷺ - Jannah made binding", gloss: "Raḍītu billāhi Rabbā", path: "web/render.html?file=content/03-adhkar-sabah-masa/8_raditdubillahirabban.md", num: "12", ref: "Tirmidhī 3389", reps: "×3", grade: "hasan", time: ["day-fajr-post", "day-asr-post"] },
      { label: "Daily Protection and Tawḥīd - The tahlīl said ten times", gloss: "Lā Ilāha Illallāh Waḥdahū 〜 ×10", path: "web/render.html?file=content/03-adhkar-sabah-masa/a_la_ilaha_illallah_wahdahu_la_sharikalah.md", num: "13", ref: "Ḥiṣn 92 · Bukhārī 6403", reps: "×10", grade: "sahih", time: ["day-fajr-post", "day-asr-post"] },
      { label: "Abu al-Dardāʾ's Fire Insurance - Trust in Allah's decree", gloss: "Dua Abu Darda", path: "web/render.html?file=content/03-adhkar-sabah-masa/dua-abu-darda-fire-insurance.md", num: "14", ref: "Habeeb Umar bin Hafidz", grade: "sahih", time: ["day-fajr-post"] },
      { label: "Four Phrases Heavier Than a Morning's Dhikr - Subḥāna Allāhi wa biḥamdihī", gloss: "Subḥāna Allāhi wa Biḥamdihī", path: "web/render.html?file=content/03-adhkar-sabah-masa/0_subhana_allahi_wa_bihamdihi.md", num: "1", ref: "Riyāḍ 1433 · Muslim 2726", reps: "×3", grade: "sahih", time: ["day-fajr-post", "day-asr-post"] },
    ]
  },
  {
    icon: "🌤️",
    category: "Ḍuḥā & the Working Day",
    categoryAr: "الضُّحَى",
    desc: "The forenoon window 〜 provision, ease of work, and the road",
    items: [
      { label: "Ṣalāt Duha - When thankful for the joints and want flowstate", gloss: "2/4 Rakʿah at the Start of the Day", path: "web/render.html?file=content/04-duha-working-day/solat-duha.md", ref: "Abū Dāwūd 1289", grade: "sahih", time: ["day-duha"] },
      { label: "Travel and Return - When about to travel or transit", gloss: "Duʿāʾ as-Safar", path: "web/render.html?file=content/04-duha-working-day/dua-safar.md", ref: "Tirmidhī 3447", grade: "sahih", time: ["day-duha"] },
      { label: "Making the Difficult Easy - When facing a difficult affair", gloss: "Allāhumma Lā Sahla Illā Mā Jaʿaltahu Sahlā", path: "web/render.html?file=content/04-duha-working-day/allahumma-la-sahla.md", ref: "Ḥiṣn 139 · Ibn Ḥibbān 974", grade: "sahih", time: ["day-duha", "day-dhuhr"] },
      { label: "Sufficiency and Freedom from Debt - When burdened by debts", gloss: "Allāhumma-kfinī bi-Ḥalālika ʿan Ḥarāmik", path: "web/render.html?file=content/04-duha-working-day/remove-debt-mountain.md", ref: "Tirmidhī 3563", grade: "hasan", time: ["day-duha", "day-dhuhr"] },
      { label: "Mūsā's Utter Dependence - When exhausted, vulnerable and absolutely reliant", gloss: "Rabbi inni lima anzalta ...", path: "web/render.html?file=content/04-duha-working-day/musa-rabbi-inni-lima-anzalta.md", ref: "Qurʾān 28:24", grade: "sahih", time: ["day-duha", "day-dhuhr"] },
      { label: "Mūsā's Expansion - When about to face Firʿawn: expand my chest", gloss: "Rabbi shrahli sadri ...", path: "web/render.html?file=content/04-duha-working-day/musa-rabbishrahlisadri.md", ref: "Qurʾān 20:25-28", grade: "sahih" },
      ]
  },
    {
    icon: "🌙",
    category: "Adhkār al-Layl",
    categoryAr: "أَذْكَارُ اللَّيْلِ",
    desc: "The night cycle 〜 going to bed, waking in the dark, and the last third",
    items: [
      { type: "family", label: "Adhkar of the night", gloss: "Last things said before sleep", time: ["night-maghrib-post", "night-isha-post"] },
      // Night Maghrib and Isha
      { label: "They Will Suffice Him - The Two Closing Verses of Surah al-Baqarah at Night", gloss: "Lā Yuʿallimuhu-llāhu-l-Qurʾāna", path: "web/render.html?file=content/05-adhkar-al-layl/01-night/al-baqarah-last-2.md", ref: "Bukhārī 5009", grade: "sahih", time: ["night-maghrib-post", "night-isha-post"] },
      // Before sleep
      { type: "family", label: "Before sleep", gloss: "The last things said before sleep", time: ["night-presleep"] },
      { label: "Al-Muʿawwidhāt Before Sleep - Breathe into your palms and wipe your body, three times", gloss: "Al-Muʿawwidhāt 〜 ×3", path: "web/render.html?file=content/05-adhkar-al-layl/02-before-sleep/muawwidhat-nafth.md", num: "1", ref: "Bukhārī 5017", reps: "×3", grade: "sahih", time: ["night-presleep"] },
      { label: "Āyat al-Kursī at Night - A guardian over you, and no devil near until morning", gloss: "Āyat al-Kursī", path: "web/render.html?file=content/05-adhkar-al-layl/02-before-sleep/ayat-al-kursi-guard.md", num: "2", ref: "Bukhārī 2311", grade: "sahih", time: ["night-presleep"] },
      { label: "Tasbīḥ Fāṭimah - Better for you both than a servant", gloss: "Tasbīḥ Fāṭimah 〜 33·33·34", path: "web/render.html?file=content/05-adhkar-al-layl/02-before-sleep/tasbih-fatimah.md", num: "3", ref: "Bukhārī 3705", reps: "×100", grade: "sahih", time: ["night-presleep"] },
      { label: "Entrusting Myself to Allah - Wuḍūʾ, right side, and you die on the fiṭrah", gloss: "Allāhumma Aslamtu Wajhī Ilayk", path: "web/render.html?file=content/05-adhkar-al-layl/02-before-sleep/aslamtu-wajhi.md", num: "4", ref: "Bukhārī 247", grade: "sahih", time: ["night-presleep"] },
      { label: "Bismika Amūtu wa Aḥyā - The last words of the day, and the first of the next", gloss: "Bismika Amūtu wa Aḥyā", path: "web/render.html?file=content/05-adhkar-al-layl/02-before-sleep/bismika-amutu-wa-ahya.md", num: "5", ref: "Bukhārī 6312", grade: "sahih", time: ["night-presleep", "day-fajr-adhan"] },
      // Left sleep
      { type: "family", label: "Left sleep", gloss: "Tahajjud", time: ["night-2nd-third", "night-last-third"] },
      { label: "Waking in the Dark - Say this, then ask, and you are answered", gloss: "Man Taʿārra mina-l-Layl", path: "web/render.html?file=content/05-adhkar-al-layl/03-left-sleep/man-taarra-min-al-layl.md", ref: "Bukhārī 1154", grade: "sahih", time: ["night-2nd-third", "night-last-third"] },
      { label: "The Prophet's ﷺ Opening of Tahajjud - Eleven truths, then forgiveness", gloss: "Allāhumma Laka-l-Ḥamd", path: "web/render.html?file=content/05-adhkar-al-layl/03-left-sleep/tahajjud-lakal-hamd.md", ref: "Bukhārī 1120", grade: "sahih", time: ["night-last-third"] },
      { label: "Dua Nur", gloss: "Allāhummaj'al fī qalbī nūran", path: "web/render.html?file=content/05-adhkar-al-layl/03-left-sleep/dua-nur.md", ref: "Bukhari 6316", grade: "sahih", time: ["night-2nd-third", "night-last-third"] },
      { label: "Ṣalāt al-Ḥājah - The prayer of pressing need", gloss: "Lā Ilāha Illallāhu-l-Ḥalīmu-l-Karīm", path: "web/render.html?file=content/05-adhkar-al-layl/03-left-sleep/solat-hajat.md", ref: "Ibn Mājah 1384", grade: "daif" },
      { label: "Ṣalāt Istikhārah - Two rakʿah, then hand the decision back", gloss: "Solat Istikhara - Allāhumma Innī Astakhīruka", path: "web/render.html?file=content/05-adhkar-al-layl/03-left-sleep/solat-istikhara.md", ref: "Bukhārī 1166", grade: "sahih", time: ["night-last-third"] },
      { label: "The Three Tiers of Night Prayer - Ten, One Hundred, and One Thousand", gloss: "lam yuktab mina l-ghāfilīna / kutiba mina l-qānitīna + l-muqanṭarīna ", path: "web/render.html?file=content/05-adhkar-al-layl/03-left-sleep/three-tiers-of-the-night-prayer.md", ref: "Sunan Abī Dāwūd 1398", grade: "sahih", time: ["night-2nd-third", "night-last-third"] },
    ]
  },
    {
    icon: "🌸",
    category: "Ṣalawāt",
    categoryAr: "الصَّلَوَاتُ",
    desc: "Send ṣalawāt upon the Prophet ﷺ",
    items: [
      { label: "Maḥallul Qiyām - The standing recital", gloss: "Ṣalawāt al-Maḥallul Qiyām", path: "web/render.html?file=content/06-salawat/mahalul-qiyam.md", ref: "Compiled wird" },
      { label: "Ṣalawāt Tafrījiyyah - Relief when a knot will not loosen", gloss: "Ṣalawāt Tafrījiyyah", path: "web/render.html?file=content/06-salawat/salawat-tafrijiyyah.md", ref: "Compiled wird" }
    ]
  },
  {
    icon: "📿",
    category: "Tahlīl Collections",
    categoryAr: "التَّهْلِيلُ",
    desc: "Tahlīl collections pieced by mashāyikh",
    items: [
      { label: "Tawassul Before Al-Fātiḥah - Dedicating its reward to the Prophets, the Companions and the Caliphs", gloss: "Tawassul before Al Fatihah", path: "web/render.html?file=content/07-tahleel/al-fatihah-ilaa-ruhi.md", ref: "Compiled wird" },
      { label: "Dua Arwah by Haji Sajeed", gloss: "Dua Arwah", path: "web/render.html?file=content/07-tahleel/dua-arwah-papa.md", ref: "Compiled wird" },
    ]
  },
  // {
  //   icon: "🌾",
  //   category: "Sacred Times",
  //   categoryAr: "الْأَوْقَاتُ الْمُبَارَكَةُ",
  //   desc: "Wird tied to a season, a sacred month, or a day that comes once a year",
  //   items: [
  //     { label: "Said on a birthday; composite, read the verification notice first", gloss: "Duʿāʾ Mīlād 〜 Yā Ghaniyyu Aghninā", path: "web/render.html?file=content/_unlisted/dua-birthday.md", ref: "Tirmidhī 3505 · 3563 · Qurʾān 21:87" },
  //     { label: "The takbīr of the days of tashrīq", gloss: "Takbīr ʿĪd al-Aḍḥā", path: "Dua Haj/takbir-eiduladha.html", ref: "Compiled wird" },
  //     { label: "The best duʿāʾ the Prophets made, on the day of ʿArafah", gloss: "Khayru-d-Duʿāʾ Duʿāʾ Yawm ʿArafah", path: "Dua Haj/dua-prophets-made-on-arafah.html", ref: "Tirmidhī 3585" },
  //     { label: "What the two of them said standing on ʿArafah", gloss: "ʿArafah 〜 ʿAlī and Ibn ʿUmar", path: "Dua Haj/dua-sahabah-made-on-arafah.html", ref: "Athar" },
  //     { label: "The collected amal of the ten best days", gloss: "Dhū al-Ḥijjah 〜 First Ten Days", path: "Dua Haj/Amalan Haj.html", ref: "Compiled wird" },
  //     { label: "The Rajab istighfār set", gloss: "Istighfār Rajab", path: "Wird/istighfar-rajab.html", ref: "Compiled wird" }
  //   ]
  // },
  {
    icon: "🛠️",
    category: "Documentation",
    desc: "Technical documentation for the Steps of Muhammad Card Application",
    items: [
      { type: "overview", label: "The Prophetic Clock", gloss: "The eleven time windows, the naming contract, and what Action View is reading", path: "web/render.html?file=docs/TIME_CATEGORISATION.md" },
      { type: "overview", label: "Authoring Guide", gloss: "How a card is written, and what every meta field does", path: "web/render.html?file=docs/AUTHORING_GUIDE.md" },
      { type: "overview", label: "Sunnah Card Builder", gloss: "Paste markdown, preview the card", path: "web/preview.html" }
    ]
  }
];

// =========================================================
// PRESET COLLECTIONS
//   Curated "My Amalan" sets shipped with the site itself, so
//   they render identically for every visitor 〜 including one
//   who has never saved a personal collection. Resolved by id
//   in render.html *before* falling back to a user's own
//   localStorage collections of the same name.
//
//   Read-only in the My Amalan panel: no star/rename/delete,
//   just "Open as Collection ↗" plus a short summary + a link.
//
//   Shape of each preset:
//     id        〜 unique slug, used in ?collection=<id>
//     name      〜 title shown in the panel + rendered card
//     summary   〜 ONE short line shown under the name (no more
//                 hover-tooltip sourcing 〜 keep this to a phrase)
//     moreHref  〜 optional atomic content path (same convention
//                 as item.path below) for a "Read the etiquette →"
//                 link; omit if there's nothing to link to yet
//     items     〜 the duʿās themselves as { label, path } (only
//                 those two are read 〜 gloss/ref/grade come from
//                 the card itself, so don't copy them here),
//                 PLUS optional divider rows
//                 shaped like { type: "family", label, icon } to
//                 visually group a long list (these render as a
//                 subheading, not a clickable row, and are skipped
//                 entirely when building the rendered card's links)
//
//   To add a new preset: copy the object below, give it a new id,
//   and list the duʿās by their atomic content path (the same path
//   you'd see after "file=" in a normal card link, e.g.
//   "content/dua/whatever.md" 〜 NOT the "web/render.html?file=..."
//   wrapper). See the walkthrough in chat for the full how-to.
// =========================================================

const PRESET_COLLECTIONS = [
  {
    id: "sabah-sandwich",
    name: "Adhkār aṣ-Ṣabāḥ wal-Masāʾ 〜 the Duʿā Sandwich",
    // Short caption shown in the panel itself (no more hover tooltip).
    summary: "Praise → Ṣalawāt → Istighfār → Asks → Istighfār → Salawat",
    // "Read more" link 〜 atomic content path, same convention as item.path.
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
      { label: "Forgiveness for Parents and All Believers", path: "content/01-dua/01-forgiveness/forgiveness-parents-all-believers.md" },
      { label: "The Chief of Seeking Forgiveness - Say it with certainty and you are of Jannah", path: "content/03-adhkar-sabah-masa/4_sayyidul-istighfar.md" },

      { type: "family", label: "The Asks", icon: "✦" },
      { label: "The Words He ﷺ Never Abandoned - Complete well-being, morning and evening", path: "content/03-adhkar-sabah-masa/never-abandoned.md" },
      { label: "Salaam of Fajr - Useful knowledge, good provision, accepted deeds", path: "content/02-salah/02-during/ilmannafia_rizqantayyiba_amalanmutaqqaballan.md" },
      { label: "Sufficiency and Freedom from Debt - When burdened by debts", path: "content/04-duha-working-day/remove-debt-mountain.md" },
      { label: "Duas of the Servants of the Most Gracious - ʿIbād ar-Raḥmān", path: "content/01-dua/02-asking-allah/dua-ibadurrahman.md" },
      { label: "Sulaymān's Gratitude - Increase my capacity to be thankful", path: "content/01-dua/04-gratitude/sulaiman-thankfulness.md" },
      { label: "Ibrahim's Submission - Make us muslim, show us our rites", path: "content/01-dua/03-steadfastness/make-us-muslim-show-us-nusuk.md" },
      { label: "Rectification of Religion, World and Hereafter - O Allah, set right for me my religion", path: "content/01-dua/02-asking-allah/o-allah-set-right-for-me-my-religion.md" },
      { label: "Do Not Let Our Hearts Deviate - The ayah he ﷺ would follow up with", path: "content/01-dua/03-steadfastness/la-tuzigh-qulubana.md" },
      { label: "Good in This World and the Next - The dua he ﷺ said most often", path: "content/01-dua/02-asking-allah/rabbana-atina-fid-dunya.md" },
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
//   Standalone legacy .html pages are skipped 〜 they carry
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
// sequence, and the card's position in it 〜 or null for anything opened
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

// Labels read "Name - what it is for"; the bottom HUD has room for the name only.
function somShortLabel(label) {
  return String(label).split(' - ')[0].trim();
}

// Same ends, shaped for the title strip above the HUD's tool row on
// render.html: a "Back" half and a "Next" half, each with the short name.
function somRenderHudEnd(item, direction) {
  const isPrev = direction === 'prev';
  const arrow = isPrev ? '←' : '→';
  const kicker = isPrev ? 'Back' : 'Next';
  const align = isPrev ? '' : 'hud-nav-end';

  if (!item) {
    return `<span class="hud-nav-btn is-disabled ${align}">
        ${isPrev ? `<span class="hud-nav-arrow">${arrow}</span>` : ''}
        <span class="hud-nav-text"><span class="hud-nav-kicker">${kicker}</span></span>
        ${isPrev ? '' : `<span class="hud-nav-arrow">${arrow}</span>`}
      </span>`;
  }

  const text = `<span class="hud-nav-text">
      <span class="hud-nav-kicker">${kicker}</span>
      <span class="hud-nav-label">${somEscapeHtml(somShortLabel(item.label))}</span>
    </span>`;

  return `<a class="hud-nav-btn ${align}" href="${item.href || '../' + item.path}" title="${somEscapeHtml(item.label)}">
      ${isPrev ? `<span class="hud-nav-arrow">${arrow}</span>${text}` : `${text}<span class="hud-nav-arrow">${arrow}</span>`}
    </a>`;
}

// Fills the title strip and points the Home slot (both live in render.html's
// HUD markup). With no neighbours at all 〜 collection and slot pages 〜 the
// strip stays hidden and only the tool row shows.
function somBuildHudNav(prev, next, homeHref) {
  const home = document.getElementById('hudHome');
  if (home) home.href = homeHref;

  const hud = document.getElementById('somHudNav');
  if (!hud) return;

  hud.innerHTML = `${somRenderHudEnd(prev, 'prev')}${somRenderHudEnd(next, 'next')}`;
  hud.hidden = !(prev || next);
}

// Fills every [data-card-nav] host on the page (top and bottom of the
// article) plus 〜 on pages that have one 〜 the #somHudNav floating
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

  // Slot / collection pages have no ?file=, so no card context 〜 but a slot
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
  somBuildHudNav(prev, next, homeHref);

  // Pages that still carry a #floatHomeBtn in their control stack (none
  // today) get it wired up here; render.html dropped it
  // in favour of the ⌂ home slot inside the HUD.
  const floatHome = document.getElementById('floatHomeBtn');
  if (floatHome) {
    floatHome.href = homeHref;
    floatHome.style.display = 'flex';
  }

  // LAST READ: the page this card was opened from marks its row
  // (web/card-sheet.js). `from` says which list: Library, a plan slot, a heart state.
  if (file) {
    try { sessionStorage.setItem('som-last-read', JSON.stringify({ file, from: from || '' })); } catch (err) { /* private mode */ }
  }

  // SHEET MODE: this card is inside the pop-up sheet on the page the reader
  // came from (?sheet=1, in an iframe 〜 web/card-sheet.js). Home closes the
  // sheet; Back / Next and links to other cards swap the card in place with
  // location.replace, so the sheet adds no history entries of its own and
  // the phone's Back closes it.
  const inSheet = params.get('sheet') === '1' && window.parent !== window;
  const sheetGo = (href) => {
    const url = new URL(href, window.location.href);
    url.searchParams.delete('sheet');
    // Tell the page behind which card is showing, so a reload reopens it.
    try { window.parent.postMessage({ type: 'som-sheet-go', href: 'web/render.html' + url.search }, window.location.origin); } catch (err) { /* fine */ }
    url.searchParams.set('sheet', '1');
    window.location.replace(url.href);
  };
  const sheetClose = () => window.parent.postMessage({ type: 'som-sheet-close' }, window.location.origin);
  if (inSheet) {
    document.addEventListener('click', (e) => {
      const a = e.target.closest('a[href]');
      if (!a || a.target === '_blank' || e.defaultPrevented) return;
      if (a.id === 'hudHome' || a.classList.contains('card-nav-home')) { e.preventDefault(); sheetClose(); return; }
      const raw = a.getAttribute('href') || '';
      if (/render\.html\?|^\?(file|collection|slot|qalb)=/.test(raw)) { e.preventDefault(); sheetGo(raw); }
    }, true);
  }

  document.addEventListener('keydown', (e) => {
    if (e.ctrlKey || e.metaKey || e.altKey) return;
    const el = document.activeElement;
    if (el && (el.isContentEditable || ['INPUT', 'TEXTAREA', 'SELECT'].includes(el.tagName))) return;
    const goTo = inSheet ? sheetGo : (href) => { window.location.href = href; };
    if (e.key === 'ArrowLeft' && prev) goTo(prev.href || '../' + prev.path);
    if (e.key === 'ArrowRight' && next) goTo(next.href || '../' + next.path);
    if (e.key === 'Escape' && inSheet) sheetClose();
  });
}
