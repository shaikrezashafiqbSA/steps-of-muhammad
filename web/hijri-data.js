// =========================================================
// HIJRI DATA — the part of the moon tooltip you edit by hand.
//   Loaded by index.html. Read by web/moon.js.
//
//   1. SOM_HIJRI_NOTES        a tidbit for a specific day of a month
//   2. SOM_HIJRI_MONTH_NOTES  a line for a month with no specific-day note
//   3. SOM_HIJRI_MONTH_STARTS corrections when your authority announces
//                             a different start than the computed one
//
// ── 1 · DAY NOTES ────────────────────────────────────────
//   Key 'M-D' = month number (1 Muḥarram … 12 Dhū al-Ḥijjah) and day.
//   The Islamic day begins at Maghrib, so '9-21' is the evening that
//   *opens* the 21st of Ramaḍān — "night 21" and "day 21" are the same
//   entry, and a note about a night is shown from that sunset.
//
//   { text, ref, tag? }
//     text  the flavour line, one or two sentences
//     ref   where it comes from — a ḥadīth number, āyah, or 'Sīrah'
//           (omit only if it genuinely has none)
//     tag   optional short label shown above it: 'Qurʾān', 'Ḥadīth',
//           'Sīrah', 'Prophecy', 'Sunnah'
//
//   Dates of historical events are as commonly reported; where scholars
//   differ the text says so. PLEASE CHECK every entry and reference against
//   the sources before relying on it — these were drafted to be corrected,
//   in the same spirit as the rest of the vault (honest provenance first).
// =========================================================

const SOM_HIJRI_NOTES = {

  // ── 1 · Muḥarram ─────────────────────────────────────────
  '1-1':  { tag: 'Sīrah',  text: 'The first of the Hijri year. The calendar counts from the Hijra to Madīnah, and was fixed as a calendar in the time of ʿUmar ibn al-Khaṭṭāb ؓ — beginning with Muḥarram, though the Hijra itself came in Rabīʿ al-Awwal.', ref: 'Sīrah' },
  '1-9':  { tag: 'Sunnah', text: 'Tāsūʿāʾ. Near the end of his life he ﷺ said that if he lived to the next year he would fast the ninth as well, to set the day apart.', ref: 'Muslim 1134' },
  '1-10': { tag: 'Ḥadīth', text: 'ʿĀshūrāʾ. The day Allah saved Mūsā ﷺ and his people from Firʿawn. He ﷺ found the people of Madīnah fasting it and said: “We have more right to Mūsā than you,” and fasted it and told the Muslims to.', ref: 'Bukhārī 2004 · Muslim 1130' },

  // ── 3 · Rabīʿ al-Awwal ───────────────────────────────────
  '3-12': { tag: 'Sīrah',  text: 'The date most often given for the birth of the Prophet ﷺ — and also for his passing in 11 AH. Scholars differ on the day of his birth (the 8th and 9th are also reported), so this is a commemoration of the most common view, not a settled date.', ref: 'Sīrah' },

  // ── 7 · Rajab ────────────────────────────────────────────
  '7-27': { tag: 'Qurʾān', text: 'The date popularly given for al-Isrāʾ wal-Miʿrāj, the night journey (Qurʾān 17:1). Scholars differ on the month and day, and no specific date is established, so treat the 27th as a tradition rather than a certainty.', ref: 'Qurʾān 17:1' },

  // ── 8 · Shaʿbān ──────────────────────────────────────────
  '8-15': { tag: 'Qurʾān', text: 'Mid-Shaʿbān. The change of the qiblah from Bayt al-Maqdis to the Kaʿbah (Qurʾān 2:144) is reported in Shaʿbān of 2 AH, often placed around now. The narrations about the “night of the 15th” itself are debated among scholars — worth reading before assigning it a ritual.', ref: 'Qurʾān 2:144' },

  // ── 9 · Ramaḍān ──────────────────────────────────────────
  '9-1':  { tag: 'Qurʾān', text: 'Ramaḍān begins. “The month in which the Qurʾān was sent down” — fasting is prescribed. When it comes, the gates of Jannah are opened, the gates of the Fire closed, and the devils chained.', ref: 'Qurʾān 2:185 · Bukhārī 1899' },
  '9-17': { tag: 'Prophecy', text: 'Yawm al-Furqān — the Battle of Badr, 2 AH. About 313 Muslims met a force three times their number, and Allah gave them victory (Qurʾān 3:123). The āyah “the multitude will be routed” (54:45) is reported to have been recited by him ﷺ that day.', ref: 'Qurʾān 3:123 · 54:45' },
  '9-20': { tag: 'Sīrah',  text: 'The date commonly given for the entry into Makkah in 8 AH, when the Kaʿbah was cleansed of its idols — the victory Sūrat al-Naṣr speaks of. Narrators differ by a day or two.', ref: 'Sīrah · Qurʾān 110' },
  '9-21': { tag: 'Ḥadīth', text: 'The first of the odd nights of the last ten. “Seek Laylat al-Qadr in the odd nights of the last ten of Ramaḍān.”', ref: 'Bukhārī 2017' },
  '9-23': { tag: 'Ḥadīth', text: 'An odd night of the last ten — one of the nights in which Laylat al-Qadr is sought, better than a thousand months.', ref: 'Bukhārī 2017 · Qurʾān 97:3' },
  '9-25': { tag: 'Ḥadīth', text: 'An odd night of the last ten — one of the nights in which Laylat al-Qadr is sought.', ref: 'Bukhārī 2017' },
  '9-27': { tag: 'Ḥadīth', text: 'The night most often named for Laylat al-Qadr. Ubayy ibn Kaʿb ؓ swore it was the 27th — though he ﷺ did not fix it, so it is sought across the odd nights.', ref: 'Muslim 762' },
  '9-29': { tag: 'Ḥadīth', text: 'The last of the odd nights. If the month is 29 days, tonight closes it — the crescent is looked for after sunset.', ref: 'Bukhārī 2017' },

  // ── 10 · Shawwāl ─────────────────────────────────────────
  '10-1': { tag: 'Sunnah', text: 'ʿĪd al-Fiṭr — the fast is broken, and fasting today is not allowed. Six days of Shawwāl may follow: “whoever fasts Ramaḍān then follows it with six of Shawwāl, it is as if he fasted the whole year.”', ref: 'Muslim 1164' },

  // ── 12 · Dhū al-Ḥijjah ───────────────────────────────────
  '12-1': { tag: 'Ḥadīth', text: 'The ten best days of the year begin. “There are no days in which good deeds are more beloved to Allah than these ten.”', ref: 'Bukhārī 969' },
  '12-8': { tag: 'Sunnah', text: 'Yawm al-Tarwiyah — the pilgrims go out to Minā, as he ﷺ did.', ref: 'Sīrah' },
  '12-9': { tag: 'Qurʾān', text: 'Yawm ʿArafah. On this day, in the Farewell Pilgrimage of 10 AH, was revealed: “Today I have perfected for you your religion and completed My favour upon you.” Fasting it, for those not on Ḥajj, expiates the previous year and the coming one.', ref: 'Qurʾān 5:3 · Bukhārī 45 · Muslim 1162' },
  '12-10': { tag: 'Sunnah', text: 'Yawm al-Naḥr — ʿĪd al-Aḍḥā, the day of sacrifice, recalling Ibrāhīm and Ismāʿīl ﷺ (Qurʾān 37:102–107).', ref: 'Qurʾān 37:102–107' },
  '12-11': { tag: 'Sunnah', text: 'The first of the Days of Tashrīq — days of eating, drinking and remembering Allah. Fasting them is not allowed.', ref: 'Muslim 1141' },

  // ── the White Days, every month ──────────────────────────
  // Used whenever a month has no specific entry for 13 / 14 / 15.
  '*-13': { tag: 'Sunnah', text: 'The first of the White Days (Ayyām al-Bīḍ), when the nights are bright with the full moon. He ﷺ advised fasting three days of each month — the 13th, 14th and 15th.', ref: 'Tirmidhī 761' },
  '*-14': { tag: 'Sunnah', text: 'Badr — the moon at its fullest. The second of the White Days: fast it if you are able.', ref: 'Tirmidhī 761' },
  '*-15': { tag: 'Sunnah', text: 'The last of the White Days. From tonight the moon begins to wane.', ref: 'Tirmidhī 761' }
};

// ── 2 · MONTH NOTES ──────────────────────────────────────
//   Shown on days that have no entry above. Keep them short.
const SOM_HIJRI_MONTH_NOTES = {
  1:  'Muḥarram — one of the four sacred months (Qurʾān 9:36). He ﷺ called fasting in it the best after Ramaḍān.',
  2:  'Ṣafar — “no contagion, no omen of birds, no ṣafar-omen”: the month carries no bad luck.',
  3:  'Rabīʿ al-Awwal — the month of the Hijra to Madīnah, and of the Prophet’s ﷺ birth and passing.',
  4:  'Rabīʿ al-Thānī — no special sunnah of its own; worship is steady, not seasonal.',
  5:  'Jumādā al-Ūlā — the month of the Battle of Muʾtah, 8 AH.',
  6:  'Jumādā al-Thāniyah — no special sunnah of its own; worship is steady, not seasonal.',
  7:  'Rajab — one of the four sacred months (Qurʾān 9:36).',
  8:  'Shaʿbān — the month he ﷺ fasted most, preparing for Ramaḍān.',
  9:  'Ramaḍān — the month of fasting, and of the Qurʾān.',
  10: 'Shawwāl — the months of Ḥajj begin; six fasts of Shawwāl follow ʿĪd.',
  11: 'Dhū al-Qaʿdah — one of the four sacred months; the month of Ḥudaybiyyah (6 AH) and the ʿUmrah that followed it.',
  12: 'Dhū al-Ḥijjah — the month of Ḥajj, and one of the four sacred months.'
};

// ── 3 · MONTH-START CORRECTIONS ──────────────────────────
//   The app decides when a month starts by the Nusantara (MABIMS) criterion:
//   at sunset on the 29th the moon must stand at least 3° above the horizon
//   and 6.4° from the sun. Your local authority's announcement is the final
//   word — when it differs, put it here and the app follows it.
//
//   'YYYY-MM' (Hijri year-month) : 'YYYY-MM-DD'
//   The date is the *daytime* Gregorian date the authority gives for the
//   1st of that month (e.g. “1 Ramaḍān = Wednesday 18 Feb 2026”).
//   The app starts the month at the Maghrib before it.
const SOM_HIJRI_MONTH_STARTS = {
  // '1447-09': '2026-02-19',
};
