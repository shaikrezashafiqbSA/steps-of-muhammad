// =========================================================
// HIJRI — which day of which Islamic month it is, worked out from
// the moon itself rather than a printed table.
//
//   • The Islamic day begins at Maghrib, so the day number turns over at
//     sunset, not midnight.
//   • A month begins on the first evening, after the new moon, on which the
//     crescent would meet the Nusantara (MABIMS) criterion — what JAKIM,
//     MUIS and the other MABIMS members use:
//         altitude ≥ 3°  and  elongation ≥ 6.4°  at sunset.
//     That is a calculation, not a sighting. When your authority announces
//     a different day, record it in web/hijri-data.js
//     (SOM_HIJRI_MONTH_STARTS) and the app follows it.
//   • The month number and year are anchored to the tabular Islamic calendar
//     taken from the middle of the month, which is safe to a day or two in
//     either direction.
//
// Needs sun-clock.js (SomSunClock) and, optionally, hijri-data.js.
// =========================================================
(function (global) {
  'use strict';
  const SC = global.SomSunClock;
  if (!SC) return;

  const DAY = 86400000;
  const MABIMS = { altitude: 3, elongation: 6.4 };
  const MOON_RATE = 12.19;   // mean degrees the moon gains on the sun per day

  const MONTHS = [
    'Muḥarram', 'Ṣafar', 'Rabīʿ al-Awwal', 'Rabīʿ al-Thānī', 'Jumādā al-Ūlā', 'Jumādā al-Thāniyah',
    'Rajab', 'Shaʿbān', 'Ramaḍān', 'Shawwāl', 'Dhū al-Qaʿdah', 'Dhū al-Ḥijjah'
  ];

  // ── Tabular (civil) Islamic calendar — for numbering only ─────────────
  const ISLAMIC_EPOCH = 1948439.5;
  const islamicToJD = (y, m, d) => d + Math.ceil(29.5 * (m - 1)) + (y - 1) * 354 + Math.floor((3 + 11 * y) / 30) + ISLAMIC_EPOCH - 1;
  function jdToIslamic(jd) {
    jd = Math.floor(jd) + 0.5;
    const year = Math.floor((30 * (jd - ISLAMIC_EPOCH) + 10646) / 10631);
    const month = Math.min(12, Math.ceil((jd - (29 + islamicToJD(year, 1, 1))) / 29.5) + 1);
    return { year, month };
  }
  // Julian day (midnight start) of a local civil date.
  const civilJD = (y, m, d) => Date.UTC(y, m, d) / DAY + 2440587.5;
  const civilDay = date => new Date(date.getFullYear(), date.getMonth(), date.getDate());
  const addDays = (date, n) => new Date(date.getFullYear(), date.getMonth(), date.getDate() + n, 12);
  const dateKey = date => date.getFullYear() + '-' + String(date.getMonth() + 1).padStart(2, '0') + '-' + String(date.getDate()).padStart(2, '0');

  // ── Conjunction (new moon) ────────────────────────────────────────────
  // The most recent new moon at or before `ms`.
  function conjunctionBefore(ms) {
    const e = ((SC.moonElongationAt(ms) % 360) + 360) % 360;   // 0…360 since the last new moon
    let t = ms - (e / MOON_RATE) * DAY;
    for (let i = 0; i < 6; i++) t -= (SC.moonElongationAt(t) / MOON_RATE) * DAY;
    return t;
  }

  // ── Sunset on a civil day at a place ─────────────────────────────────
  function sunsetOn(day, loc) {
    const t = SC.prayerTimes(day, loc.lat, loc.lng, { method: loc.method, asr: loc.asr });
    return t.maghrib;
  }

  // First evening at or after the new moon that meets the criterion.
  function sightingEvening(conjMs, loc) {
    const d0 = civilDay(new Date(conjMs));
    let last = null;
    for (let k = 0; k < 3; k++) {
      const day = addDays(d0, k);
      const S = sunsetOn(day, loc);
      if (!S) continue;
      last = { sunset: S, day };
      if (S.getTime() <= conjMs) continue;
      const m = SC.moonPositionNow(S, loc.lat, loc.lng);
      if (m.altitudeTopo >= MABIMS.altitude && m.separation >= MABIMS.elongation) return last;
    }
    return last;     // polar/odd cases: take the latest candidate rather than none
  }

  // ── One month record: when it begins and what it is called ──────────
  const cache = new Map();
  const locKey = loc => [loc.lat.toFixed(2), loc.lng.toFixed(2)].join(',');

  function recordForConjunction(conjMs, loc) {
    const key = locKey(loc) + '|' + Math.round(conjMs / 60000);
    if (cache.has(key)) return cache.get(key);

    let ev = sightingEvening(conjMs, loc);
    const mid = addDays(ev.day, 15);
    let { year, month } = jdToIslamic(civilJD(mid.getFullYear(), mid.getMonth(), mid.getDate()));

    // The authority's announcement wins over the calculation.
    const overrides = (typeof SOM_HIJRI_MONTH_STARTS !== 'undefined') ? SOM_HIJRI_MONTH_STARTS : {};
    const ymKey = year + '-' + String(month).padStart(2, '0');
    let overridden = false;
    if (overrides[ymKey]) {
      const [y, m, d] = overrides[ymKey].split('-').map(Number);
      const day = new Date(y, m - 1, d - 1, 12);          // the evening before day 1's daytime
      const S = sunsetOn(day, loc);
      if (S) { ev = { sunset: S, day }; overridden = true; }
    }

    const rec = { conj: conjMs, start: ev.sunset, startDay: ev.day, year, month, overridden };
    cache.set(key, rec);
    return rec;
  }

  // The month `now` is in, and the one after it (for its length).
  function monthAt(now, loc) {
    const ms = now.getTime();
    let rec = recordForConjunction(conjunctionBefore(ms), loc);
    if (rec.start.getTime() > ms) rec = recordForConjunction(conjunctionBefore(rec.conj - 5 * DAY), loc);
    return withLength(rec, loc);
  }

  function withLength(rec, loc) {
    if (rec.length) return rec;
    const next = recordForConjunction(conjunctionBefore(rec.conj + 33 * DAY), loc);
    const days = Math.round((civilDay(next.startDay) - civilDay(rec.startDay)) / DAY);
    rec.length = days >= 29 && days <= 30 ? days : (days > 30 ? 30 : 29);
    rec.nextStart = next.start;
    return rec;
  }

  // Month `offset` months away from the one containing `rec`.
  function neighbour(rec, offset, loc) {
    let cur = rec;
    while (offset > 0) { cur = withLength(recordForConjunction(conjunctionBefore(cur.conj + 33 * DAY), loc), loc); offset--; }
    while (offset < 0) { cur = withLength(recordForConjunction(conjunctionBefore(cur.conj - 25 * DAY), loc), loc); offset++; }
    return cur;
  }

  // ── Public shape ─────────────────────────────────────────────────────
  // Landmark names for the phases; every other day is just its number.
  function landmark(day) {
    if (day >= 1 && day <= 3) return { key: 'hilal', name: 'Hilāl' };
    if (day === 7 || day === 8) return { key: 'tarbi', name: 'Tarbīʿ', sub: 'First quarter' };
    if (day >= 13 && day <= 15) return { key: 'badr', name: 'Badr', sub: 'Ayyām al-Bīḍ · the White Days' };
    if (day === 22 || day === 23) return { key: 'third', name: 'Third quarter' };
    return null;
  }

  function noteFor(month, day) {
    const N = (typeof SOM_HIJRI_NOTES !== 'undefined') ? SOM_HIJRI_NOTES : {};
    const M = (typeof SOM_HIJRI_MONTH_NOTES !== 'undefined') ? SOM_HIJRI_MONTH_NOTES : {};
    return N[month + '-' + day] || N['*-' + day] || (M[month] ? { text: M[month], tag: '' } : null);
  }

  // Gregorian daytime date of day n of a month record.
  const dayDate = (rec, n) => addDays(rec.startDay, n);

  function describe(rec, day) {
    return {
      year: rec.year, month: rec.month, monthName: MONTHS[rec.month - 1], day,
      length: rec.length, landmark: landmark(day), note: noteFor(rec.month, day),
      date: dayDate(rec, day), overridden: rec.overridden
    };
  }

  // Which Hijri day is it right now?
  function today(now, loc) {
    const rec = monthAt(now, loc);
    let day = 1;
    for (let k = 1; k <= 30; k++) {
      const S = sunsetOn(addDays(rec.startDay, k), loc);
      if (S && S.getTime() <= now.getTime()) day = k + 1; else break;
    }
    return Object.assign(describe(rec, Math.min(day, rec.length || 30)), { rec });
  }

  // A whole month as a list of days, for the calendar grid.
  function month(rec, loc) {
    rec = withLength(rec, loc);
    const days = [];
    for (let n = 1; n <= rec.length; n++) days.push(describe(rec, n));
    return { year: rec.year, month: rec.month, monthName: MONTHS[rec.month - 1], length: rec.length, days, rec };
  }

  global.SomHijri = {
    MONTHS, MABIMS, today, month, neighbour, landmark, noteFor, describe, dateKey,
    clearCache: () => cache.clear()
  };
})(window);
