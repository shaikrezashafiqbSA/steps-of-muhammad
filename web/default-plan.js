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
    'content/salah/before/after-adhan.md'
  ],
  '*.during': [
    'content/salah/during/iftitah.md',
    'content/salah/during/al-fatihah.md'
  ],
  '*.after': [
    'content/salah/after/help-me-be-grateful.md',
    'content/salah/after/1_istigfar_peace.md',
    'content/salah/after/tahlils.md',
    'content/salah/after/tasbih-33-33-34.md'
  ],

  // ── Fajr → Shurūq ──────────────────────────────────────
  'fajr.before': [
  ],
  'fajr.during': [
    'content/salah/during/ilmannafia_rizqantayyiba_amalanmutaqqaballan.md'
  ],
  'fajr.after': [
    'content/salah/after/tahlil-fajr-maghrib-10-times.md',
    'content/salah/after/3_dua-allahuma-ajirnaar.md'
  ],
  'fajr.between': [
    { set: 'sabah-sandwich' },
    'content/dua/in-greatest-of-names.md',
    'content/dua/forgiveness-adam.md',
    'content/dua/aisyah-comprehensive-ask.md',
    'content/dua/quran/quran_spring_heart.md',
    'content/dua/forgiveness-sulaiman.md',
  ],

  // ── Shurūq → Ẓuhr: Ḍuḥā and the working day ────────────
  'shuruq.between': [
    'content/salah/solat-duha.md',
    'content/dua/dua-safar.md',
    'content/dua/work/musa-rabbishrahlisadri.md',
    'content/dua/work/musa-rabbi-inni-lima-anzalta.md',
    'content/dua/work/allahumma-la-sahla.md',
    'content/dua/remove-debt-mountain.md',
    'content/dua/sulaiman-thankfulness.md',
  ],

  // ── Ẓuhr → ʿAṣr ────────────────────────────────────────
  'dhuhr.between': [
    'content/dua/work/allahumma-la-sahla.md',
    'content/dua/work/musa-rabbi-inni-lima-anzalta.md',
    'content/dua/remove-debt-mountain.md',
    'content/dua/sulaiman-thankfulness.md'
  ],

  // ── ʿAṣr → Maghrib: the evening adhkār ─────────────────
  'asr.between': [
    { set: 'sabah-sandwich' },
    'content/dua/quran/memoriser.md'
  ],

  // ── Maghrib → ʿIshāʾ ────────────────────────────────────
  'maghrib.after': [
    'content/salah/after/tahlil-fajr-maghrib-10-times.md',
    'content/salah/after/3_dua-allahuma-ajirnaar.md'
  ],
  'maghrib.between': [
  ],

  // ── the night ──────────────────────────────────────────
  'tahajjud.main': [
    'content/adhkar-al-lail/man-taarra-min-al-layl.md',
    'content/adhkar-al-lail/tahajjud-lakal-hamd.md',
    'content/adhkar-al-lail/three-tiers-of-the-night-prayer.md',
    'content/dua/in-greatest-of-names.md',
    'content/dua/forgiveness-adam.md',
    'content/dua/forgiveness-sulaiman.md',
    'content/dua/aisyah-comprehensive-ask.md',
    'content/dua/dua-ibadurrahman.md',
    'content/dua/make-us-muslim-show-us-nusuk.md',
    'content/salah/solat-hajat.md',
    'content/salah/solat-istikhara.md'
  ],
  'presleep.main': [
    'content/adhkar-al-lail/muawwidhat-nafth.md',
    'content/adhkar-al-lail/ayat-al-kursi-guard.md',
    'content/adhkar-al-lail/tasbih-fatimah.md',
    'content/adhkar-al-lail/aslamtu-wajhi.md',
    'content/adhkar-al-lail/bismika-amutu-wa-ahya.md',
  ]
};
