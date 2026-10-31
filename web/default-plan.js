// =========================================================
// DEFAULT PLAN — the curated loadout every reader starts from.
//   This is the file you edit as you review the duʿās and put
//   them in the right timeslots. Readers can override any slot
//   in Action view (stored on their own device); a slot they
//   have not touched keeps following this file, so changes you
//   make here reach them automatically.
//
// ── SLOT IDS ─────────────────────────────────────────────
//   <prayer>.<role>
//
//   prayer   fajr | shuruq | dhuhr | asr | maghrib | isha
//            | tahajjud | presleep
//   role     before   — adhān → iqāmah, and what is said before the takbīr
//            during   — inside the prayer itself
//            after    — straight after the taslīm
//            between  — the stretch from this prayer to the next one
//                       (fajr.between = Fajr → Shurūq, the morning adhkār)
//            main     — tahajjud and presleep only (single slot)
//
//   shuruq only has `between` (sunrise → Ẓuhr: Ḍuḥā and the working day).
//
// ── WILDCARDS ────────────────────────────────────────────
//   '*.before' / '*.during' / '*.after' apply to every fard prayer
//   (fajr, dhuhr, asr, maghrib, isha). A slot's default is the
//   wildcard entries first, then that slot's own entries appended —
//   so 'fajr.after' only lists what is special about Fajr.
//
// ── ENTRY FORMS ──────────────────────────────────────────
//   'content/dua/x.md'                    a card (label etc. come from nav-data.js)
//   { path: 'content/dua/x.md', reps: '×3' }   a card with a count shown on the row
//   { set: 'sabah-sandwich' }             a whole set (PRESET_COLLECTIONS id)
//   { note: 'Ṣalawāt', reps: '×100' }     free text — dhikr or an act with no card
// =========================================================

const SOM_DEFAULT_PLAN = {

  // ── around every fard prayer ───────────────────────────
  '*.before': [
    'content/02-salah/01-before/after-adhan.md'
  ],
  '*.during': [
    'content/02-salah/02-during/iftitah.md',
    'content/02-salah/02-during/al-fatihah.md'
  ],
  '*.after': [
    'content/02-salah/03-after/help-me-be-grateful.md',
    'content/02-salah/03-after/1_istigfar_peace.md',
    'content/02-salah/03-after/tahlils.md',
    'content/02-salah/03-after/tasbih-33-33-34.md'
  ],

  // ── Fajr → Shurūq ──────────────────────────────────────
  'fajr.before': [
  ],
  'fajr.during': [
    'content/02-salah/02-during/ilmannafia_rizqantayyiba_amalanmutaqqaballan.md'
  ],
  'fajr.after': [
    'content/02-salah/03-after/tahlil-fajr-maghrib-10-times.md',
    'content/02-salah/03-after/3_dua-allahuma-ajirnaar.md'
  ],
  'fajr.between': [
    { set: 'sabah-sandwich' },
    'content/01-dua/02-asking-allah/in-greatest-of-names.md',
    'content/01-dua/01-forgiveness/forgiveness-adam.md',
    'content/01-dua/02-asking-allah/aisyah-comprehensive-ask.md',
    'content/01-dua/05-quran-in-heart/quran_spring_heart.md',
    'content/01-dua/01-forgiveness/forgiveness-sulaiman.md',
  ],

  // ── Shurūq → Ẓuhr: Ḍuḥā and the working day ────────────
  'shuruq.between': [
    'content/04-duha-working-day/solat-duha.md',
    'content/04-duha-working-day/dua-safar.md',
    'content/04-duha-working-day/musa-rabbishrahlisadri.md',
    'content/04-duha-working-day/musa-rabbi-inni-lima-anzalta.md',
    'content/04-duha-working-day/allahumma-la-sahla.md',
    'content/04-duha-working-day/remove-debt-mountain.md',
    'content/01-dua/04-gratitude/sulaiman-thankfulness.md',
  ],

  // ── Ẓuhr → ʿAṣr ────────────────────────────────────────
  'dhuhr.between': [
    'content/04-duha-working-day/allahumma-la-sahla.md',
    'content/04-duha-working-day/musa-rabbi-inni-lima-anzalta.md',
    'content/04-duha-working-day/remove-debt-mountain.md',
    'content/01-dua/04-gratitude/sulaiman-thankfulness.md'
  ],

  // ── ʿAṣr → Maghrib: the evening adhkār ─────────────────
  'asr.between': [
    { set: 'sabah-sandwich' },
    'content/01-dua/05-quran-in-heart/memoriser.md'
  ],

  // ── Maghrib → ʿIshāʾ ────────────────────────────────────
  'maghrib.after': [
    'content/02-salah/03-after/tahlil-fajr-maghrib-10-times.md',
    'content/02-salah/03-after/3_dua-allahuma-ajirnaar.md'
  ],
  'maghrib.between': [
    'content/05-adhkar-al-layl/01-night/al-baqarah-last-2.md'
  ],

    // ── ʿIshāʾ → Sleep  ────────────────────────────────────
  'isha.between': [
    'content/05-adhkar-al-layl/01-night/al-baqarah-last-2.md'
  ],

  // ── the night ──────────────────────────────────────────
  'tahajjud.main': [
    'content/05-adhkar-al-layl/03-left-sleep/man-taarra-min-al-layl.md',
    'content/05-adhkar-al-layl/03-left-sleep/tahajjud-lakal-hamd.md',
    'content/05-adhkar-al-layl/03-left-sleep/three-tiers-of-the-night-prayer.md',
    'content/01-dua/02-asking-allah/in-greatest-of-names.md',
    'content/01-dua/01-forgiveness/forgiveness-adam.md',
    'content/01-dua/01-forgiveness/forgiveness-sulaiman.md',
    'content/01-dua/02-asking-allah/aisyah-comprehensive-ask.md',
    'content/01-dua/02-asking-allah/dua-ibadurrahman.md',
    'content/01-dua/03-steadfastness/make-us-muslim-show-us-nusuk.md',
    'content/05-adhkar-al-layl/03-left-sleep/solat-hajat.md',
    'content/05-adhkar-al-layl/03-left-sleep/solat-istikhara.md'
  ],
  'presleep.main': [
    'content/05-adhkar-al-layl/02-before-sleep/muawwidhat-nafth.md',
    'content/05-adhkar-al-layl/02-before-sleep/ayat-al-kursi-guard.md',
    'content/05-adhkar-al-layl/02-before-sleep/tasbih-fatimah.md',
    'content/05-adhkar-al-layl/02-before-sleep/aslamtu-wajhi.md',
    'content/05-adhkar-al-layl/02-before-sleep/bismika-amutu-wa-ahya.md',
  ]
};
