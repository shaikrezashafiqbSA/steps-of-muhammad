// =========================================================
// SUN CLOCK — solar geometry, prayer times, and the eleven
// prophetic time windows that Action View runs on.
//
// Everything here is computed locally from latitude, longitude
// and the device clock. No network call, no prayer-time API —
// which means the horizon keeps moving on a plane, offline, or
// on a machine that has never been online.
//
// Accuracy: NOAA low-precision solar equations. Within roughly
// a minute of published tables for the sun-based events
// (sunrise, ẓuhr, ʿaṣr, maghrib). Fajr and ʿIshāʾ depend on the
// twilight-angle convention chosen (see CALC_METHODS) — those
// differ between authorities by far more than the arithmetic.
// =========================================================

(function (global) {
  'use strict';

  const DEG = Math.PI / 180;
  const sin = a => Math.sin(a * DEG);
  const cos = a => Math.cos(a * DEG);
  const tan = a => Math.tan(a * DEG);
  const asin = x => Math.asin(x) / DEG;
  const acos = x => Math.acos(x) / DEG;
  const atan2 = (y, x) => Math.atan2(y, x) / DEG;
  const fixAngle = a => ((a % 360) + 360) % 360;

  // ── Twilight-angle conventions ───────────────────────────
  //   fajr / isha are sun-depression angles below the horizon.
  //   `ishaMinutes` (Umm al-Qurā) is a fixed offset after
  //   maghrib instead of an angle.
  const CALC_METHODS = {
    mwl:      { name: 'Muslim World League',        fajr: 18,   isha: 17 },
    jakim:    { name: 'JAKIM / MUIS (SE Asia)',     fajr: 20,   isha: 18 },
    isna:     { name: 'ISNA (North America)',       fajr: 15,   isha: 15 },
    egypt:    { name: 'Egyptian General Authority', fajr: 19.5, isha: 17.5 },
    karachi:  { name: 'Univ. of Islamic Sciences, Karachi', fajr: 18, isha: 18 },
    makkah:   { name: 'Umm al-Qurā, Makkah',        fajr: 18.5, ishaMinutes: 90 }
  };

  // Shadow-length factor for ʿaṣr: 1 = Shāfiʿī/Mālikī/Ḥanbalī, 2 = Ḥanafī.
  const ASR_FACTORS = { standard: 1, hanafi: 2 };

  // ── Solar position for a given Julian day ────────────────
  function julianDay(date) {
    return date.getTime() / 86400000 + 2440587.5;
  }

  // Returns { decl, eqt } — declination in degrees, equation of
  // time in hours (apparent solar time minus mean solar time).
  function sunPosition(jd) {
    const d = jd - 2451545.0;
    const g = fixAngle(357.529 + 0.98560028 * d);   // mean anomaly
    const q = fixAngle(280.459 + 0.98564736 * d);   // mean longitude
    const L = fixAngle(q + 1.915 * sin(g) + 0.020 * sin(2 * g)); // ecliptic longitude
    const e = 23.439 - 0.00000036 * d;              // obliquity
    const RA = fixAngle(atan2(cos(e) * sin(L), cos(L))) / 15; // right ascension, hours
    const decl = asin(sin(e) * sin(L));
    const eqt = q / 15 - RA;
    return { decl, eqt: ((eqt + 12) % 24) - 12 };
  }

  // Hour angle (in hours) for the sun at altitude `angle` degrees.
  // Returns null in the polar case where the sun never reaches it.
  function hourAngle(angle, lat, decl) {
    const c = (sin(angle) - sin(lat) * sin(decl)) / (cos(lat) * cos(decl));
    if (c > 1 || c < -1) return null;
    return acos(c) / 15;
  }

  // ── Prayer times ─────────────────────────────────────────
  // Returns Date objects in the device's own timezone for the
  // civil day that `date` falls in, at the given coordinates.
  function prayerTimes(date, lat, lng, opts) {
    opts = opts || {};
    const method = CALC_METHODS[opts.method] || CALC_METHODS.mwl;
    const asrFactor = ASR_FACTORS[opts.asr] || 1;

    // Midnight UTC of the civil day the caller is asking about.
    const midnightLocal = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    const jd = julianDay(midnightLocal) + 0.5;
    const { decl, eqt } = sunPosition(jd);

    // Solar noon in hours UTC, then everything hangs off it.
    const noonUTC = 12 - lng / 15 - eqt;
    const toDate = hoursUTC => {
      if (hoursUTC === null || !isFinite(hoursUTC)) return null;
      const ms = Date.UTC(
        midnightLocal.getFullYear(),
        midnightLocal.getMonth(),
        midnightLocal.getDate()
      ) + hoursUTC * 3600000;
      return new Date(ms);
    };

    const hSunrise = hourAngle(-0.833, lat, decl);
    // ʿAṣr is a positive altitude: cot(alt) = factor + tan|lat − decl|,
    // so alt = arccot(...) = atan(1 / ...). It is above the horizon,
    // not below it — negating here pushes ʿAṣr past Maghrib.
    const asrAngle = atan2(1, asrFactor + tan(Math.abs(lat - decl)));
    const hAsr = hourAngle(asrAngle, lat, decl);
    const hFajr = hourAngle(-method.fajr, lat, decl);
    const hIsha = method.ishaMinutes ? null : hourAngle(-method.isha, lat, decl);

    const dhuhr = toDate(noonUTC + 1 / 60); // a minute past the zenith, as is customary
    const sunrise = toDate(hSunrise === null ? null : noonUTC - hSunrise);
    const maghrib = toDate(hSunrise === null ? null : noonUTC + hSunrise);
    const fajr = toDate(hFajr === null ? null : noonUTC - hFajr);
    let isha = toDate(hIsha === null ? null : noonUTC + hIsha);
    if (method.ishaMinutes && maghrib) {
      isha = new Date(maghrib.getTime() + method.ishaMinutes * 60000);
    }

    return {
      fajr,
      sunrise,
      dhuhr,
      asr: toDate(hAsr === null ? null : noonUTC + hAsr),
      maghrib,
      isha,
      solarNoonUTC: noonUTC,
      declination: decl,
      // Polar days and nights leave some of the above null; the
      // caller decides how to degrade rather than us guessing.
      complete: !!(fajr && sunrise && dhuhr && maghrib && isha)
    };
  }

  // ── Sun and moon altitude / azimuth right now ────────────
  // Altitude in degrees above the horizon (negative = below);
  // azimuth in degrees clockwise from true north.
  function sunPositionNow(date, lat, lng) {
    const jd = julianDay(date);
    const { decl, eqt } = sunPosition(jd);
    const utcHours = date.getUTCHours() + date.getUTCMinutes() / 60 +
                     date.getUTCSeconds() / 3600;
    const H = fixAngle(15 * (utcHours + eqt - 12) + lng); // local hour angle
    const alt = asin(sin(lat) * sin(decl) + cos(lat) * cos(decl) * cos(H));
    const az = fixAngle(180 + atan2(sin(H), cos(H) * sin(lat) - tan(decl) * cos(lat)));
    return { altitude: alt, azimuth: az, declination: decl, hourAngle: H };
  }

  // Low-precision lunar position (the Astronomical Almanac's short series):
  // about 0.3° in longitude, 0.2° in latitude. Good enough to place the moon
  // on a horizon, draw its phase and tilt, and judge the new-moon crescent
  // against a 3° / 6.4° visibility criterion — not for almanac work.
  function moonPositionNow(date, lat, lng) {
    const jd = julianDay(date);
    const d = jd - 2451545.0;
    const T = d / 36525;

    // Ecliptic longitude, latitude and horizontal parallax of the moon.
    const lon = fixAngle(218.32 + 481267.881 * T
      + 6.29 * sin(135.0 + 477198.87 * T)
      - 1.27 * sin(259.3 - 413335.36 * T)
      + 0.66 * sin(235.7 + 890534.22 * T)
      + 0.21 * sin(269.9 + 954397.74 * T)
      - 0.19 * sin(357.5 + 35999.05 * T)
      - 0.11 * sin(186.5 + 966404.03 * T));
    const lat_ = 5.13 * sin(93.3 + 483202.02 * T)
      + 0.28 * sin(228.2 + 960400.89 * T)
      - 0.28 * sin(318.3 + 6003.15 * T)
      - 0.17 * sin(217.6 - 407332.21 * T);
    const parallax = 0.9508
      + 0.0518 * cos(135.0 + 477198.87 * T)
      + 0.0095 * cos(259.3 - 413335.36 * T)
      + 0.0078 * cos(235.7 + 890534.22 * T)
      + 0.0028 * cos(269.9 + 954397.74 * T);
    const e = 23.439 - 0.00000036 * d;

    const RA = fixAngle(atan2(
      sin(lon) * cos(lat_) * cos(e) - sin(lat_) * sin(e),
      cos(lon) * cos(lat_)
    ));
    const decl = asin(sin(lat_) * cos(e) + cos(lat_) * sin(e) * sin(lon));

    // Greenwich mean sidereal time → local hour angle.
    const gmst = fixAngle(280.16 + 360.9856235 * d);
    const H = fixAngle(gmst + lng - RA);

    const alt = asin(sin(lat) * sin(decl) + cos(lat) * cos(decl) * cos(H));
    const az = fixAngle(180 + atan2(sin(H), cos(H) * sin(lat) - tan(decl) * cos(lat)));
    // The moon is close enough that standing on the surface instead of at the
    // centre of the Earth lowers it by up to ~1°; rise/set and crescent
    // criteria are quoted for the observer, so give that altitude too.
    const altTopo = alt - parallax * cos(alt);

    // Sun, for phase and for the tilt of the lit side.
    const sunLon = fixAngle(280.459 + 0.98564736 * d +
      1.915 * sin(fixAngle(357.529 + 0.98560028 * d)));
    const sunRA = fixAngle(atan2(sin(sunLon) * cos(e), cos(sunLon)));
    const sunDec = asin(sin(e) * sin(sunLon));

    const elongation = fixAngle(lon - sunLon);   // ecliptic, 0 = new, 180 = full
    const phase = elongation / 360;              // 0…1 through the synodic month
    const illumination = (1 - cos(elongation)) / 2;
    // True angular separation from the sun (includes the moon's latitude).
    const separation = acos(Math.max(-1, Math.min(1, cos(lat_) * cos(elongation))));

    // Position angle of the bright limb from celestial north (Meeus 48.5), and
    // the parallactic angle that turns "north up" into "zenith up" for this
    // observer. Together they say which way the lit side points in the sky.
    const brightLimb = fixAngle(atan2(
      cos(sunDec) * sin(sunRA - RA),
      sin(sunDec) * cos(decl) - cos(sunDec) * sin(decl) * cos(sunRA - RA)
    ));
    const parallactic = atan2(sin(H), tan(lat) * cos(decl) - sin(decl) * cos(H));

    return {
      altitude: alt, altitudeTopo: altTopo, azimuth: az, hourAngle: H,
      phase, illumination, elongation, separation,
      brightLimb, parallactic, ecliptic: { lon, sunLon }
    };
  }

  // Signed sun–moon ecliptic angle in (−180, 180]; crosses 0 upward at each
  // new moon. Cheap, for root-finding the conjunction.
  function moonElongationAt(ms) {
    const T = (ms / 86400000 + 2440587.5 - 2451545.0) / 36525;
    const d = T * 36525;
    const lon = 218.32 + 481267.881 * T
      + 6.29 * sin(135.0 + 477198.87 * T) - 1.27 * sin(259.3 - 413335.36 * T)
      + 0.66 * sin(235.7 + 890534.22 * T) + 0.21 * sin(269.9 + 954397.74 * T)
      - 0.19 * sin(357.5 + 35999.05 * T) - 0.11 * sin(186.5 + 966404.03 * T);
    const sunLon = 280.459 + 0.98564736 * d + 1.915 * sin(357.529 + 0.98560028 * d);
    return fixAngle(lon - sunLon + 180) - 180;
  }

  // ── The eleven windows ───────────────────────────────────
  //   Nine of them are clock windows: at any instant exactly one
  //   is current. Two — night-presleep and night-1st-third — are
  //   *companions*: they ride alongside whichever clock window is
  //   running, because "in bed, about to close your eyes" is a
  //   state a person enters, not an hour the sky reaches.
  const TIME_WINDOWS = [
    { id: 'day-fajr-adhan',  cycle: 'nahar', icon: '🕋', arabic: 'الفجر · الأذان', label: 'Fajr · Adhān',       blurb: 'Post-adhān, before the prayer stands up.' },
    { id: 'day-fajr-post',   cycle: 'nahar', icon: '🌅', arabic: 'بعد الفجر',       label: 'After Fajr',         blurb: 'From the prayer to sunrise — the morning adhkār window.' },
    { id: 'day-duha',        cycle: 'nahar', icon: '🌤️', arabic: 'الضحى',          label: 'Ḍuḥā',               blurb: 'Sunrise to the zenith — work, provision, the day being earned.' },
    { id: 'day-dhuhr',       cycle: 'nahar', icon: '☀️', arabic: 'الظهر',          label: 'Ẓuhr',               blurb: 'The sun at its height and the long afternoon after it.' },
    { id: 'day-asr-post',    cycle: 'nahar', icon: '🌇', arabic: 'بعد العصر',       label: 'After ʿAṣr',         blurb: 'ʿAṣr to sunset — the evening adhkār window.' },
    { id: 'night-maghrib',   cycle: 'lail',  icon: '🌆', arabic: 'المغرب',          label: 'Maghrib',            blurb: 'Sunset, breaking of the fast, the day handed over.' },
    { id: 'night-isha-post', cycle: 'lail',  icon: '🌃', arabic: 'بعد العشاء',      label: 'After ʿIshāʾ',       blurb: 'ʿIshāʾ until the first third closes.' },
    { id: 'night-2nd-third', cycle: 'lail',  icon: '🌌', arabic: 'الثلث الثاني',    label: 'Second Third',       blurb: 'The hours you wake in without meaning to.' },
    { id: 'night-last-third',cycle: 'lail',  icon: '✨', arabic: 'الثلث الأخير',    label: 'Last Third',         blurb: 'Tahajjud, istighfār, the descent before dawn.' },
    // Companions — never the "current" window on their own.
    { id: 'night-1st-third', cycle: 'lail',  icon: '🕯️', arabic: 'الثلث الأول',     label: 'First Third',        blurb: 'Winding down; the household settling.', companion: true },
    { id: 'night-presleep',  cycle: 'lail',  icon: '🛏️', arabic: 'قبل النوم',       label: 'Before Sleep',       blurb: 'In bed, the last words before your eyes close.', companion: true, onDemand: true }
  ];

  const WINDOW_BY_ID = {};
  TIME_WINDOWS.forEach(w => { WINDOW_BY_ID[w.id] = w; });

  // Builds the ordered clock windows for the night that `now`
  // sits inside, resolving prayer times across the day boundary
  // so 02:00 belongs to yesterday's maghrib→fajr night.
  function buildSchedule(now, lat, lng, opts) {
    const day = prayerTimes(now, lat, lng, opts);
    if (!day.complete) return { incomplete: true, times: day };

    const prev = prayerTimes(new Date(now.getTime() - 86400000), lat, lng, opts);
    const next = prayerTimes(new Date(now.getTime() + 86400000), lat, lng, opts);

    // Which night are we in? Before today's fajr we are still in
    // the night that began at yesterday's maghrib.
    const beforeFajr = now < day.fajr;
    const nightStart = beforeFajr ? prev.maghrib : day.maghrib;
    const nightEnd = beforeFajr ? day.fajr : next.fajr;
    const nightIsha = beforeFajr ? prev.isha : day.isha;
    const nightLen = nightEnd - nightStart;
    const thirdOne = new Date(nightStart.getTime() + nightLen / 3);
    const thirdTwo = new Date(nightStart.getTime() + (2 * nightLen) / 3);

    // ʿIshāʾ can fall past the first third at high latitude; the
    // post-ʿIshāʾ window then simply has no room and collapses.
    const ishaEnd = new Date(Math.max(nightIsha.getTime(), thirdOne.getTime()));
    const adhanEnd = new Date(Math.min(day.fajr.getTime() + 30 * 60000, day.sunrise.getTime()));

    const spans = [
      { id: 'day-fajr-adhan',   from: day.fajr,     to: adhanEnd },
      { id: 'day-fajr-post',    from: adhanEnd,     to: day.sunrise },
      { id: 'day-duha',         from: day.sunrise,  to: day.dhuhr },
      { id: 'day-dhuhr',        from: day.dhuhr,    to: day.asr },
      { id: 'day-asr-post',     from: day.asr,      to: day.maghrib },
      { id: 'night-maghrib',    from: day.maghrib,  to: day.isha },
      { id: 'night-isha-post',  from: nightIsha,    to: ishaEnd },
      { id: 'night-2nd-third',  from: thirdOne,     to: thirdTwo },
      { id: 'night-last-third', from: thirdTwo,     to: nightEnd }
    ];

    return {
      times: day,
      prevTimes: prev,
      nextTimes: next,
      night: { start: nightStart, end: nightEnd, thirdOne, thirdTwo, isha: nightIsha },
      spans
    };
  }

  // The window running right now, plus the companions that ride
  // with it and how long is left before the next one opens.
  function currentWindow(now, schedule) {
    if (!schedule || schedule.incomplete) return null;
    const { spans, night } = schedule;

    let active = null;
    for (const s of spans) {
      if (now >= s.from && now < s.to) { active = s; break; }
    }
    // Between yesterday's spans and today's: we are in the tail of
    // last night, which today's span list expresses as its own night.
    if (!active) {
      if (now >= night.thirdTwo && now < night.end) {
        active = { id: 'night-last-third', from: night.thirdTwo, to: night.end };
      } else if (now >= night.thirdOne && now < night.thirdTwo) {
        active = { id: 'night-2nd-third', from: night.thirdOne, to: night.thirdTwo };
      } else if (now >= night.isha && now < night.thirdOne) {
        active = { id: 'night-isha-post', from: night.isha, to: night.thirdOne };
      } else if (now >= night.start && now < night.isha) {
        active = { id: 'night-maghrib', from: night.start, to: night.isha };
      }
    }
    if (!active) return null;

    const companions = [];
    if (now >= night.start && now < night.thirdOne) companions.push('night-1st-third');
    // Pre-sleep rides along only from ʿIshāʾ to dawn. `night.isha`
    // already points at the right night's ʿIshāʾ, so this is a plain
    // range test — an `||` here would mark the chip live all afternoon.
    if (now >= night.isha && now < night.end) companions.push('night-presleep');

    return {
      id: active.id,
      from: active.from,
      to: active.to,
      meta: WINDOW_BY_ID[active.id],
      companions,
      remainingMs: active.to - now,
      elapsedFraction: (now - active.from) / (active.to - active.from)
    };
  }

  // ── Location ─────────────────────────────────────────────
  // Best-effort default so the horizon renders before anyone
  // grants a permission. Timezone is the only signal available
  // without asking, so it is the only one used.
  const TZ_FALLBACKS = {
    'Asia/Singapore':     { lat: 1.3521,  lng: 103.8198, label: 'Singapore',    method: 'jakim' },
    'Asia/Kuala_Lumpur':  { lat: 3.1390,  lng: 101.6869, label: 'Kuala Lumpur', method: 'jakim' },
    'Asia/Jakarta':       { lat: -6.2088, lng: 106.8456, label: 'Jakarta',      method: 'jakim' },
    'Asia/Brunei':        { lat: 4.9031,  lng: 114.9398, label: 'Bandar Seri Begawan', method: 'jakim' },
    'Asia/Riyadh':        { lat: 24.7136, lng: 46.6753,  label: 'Riyadh',       method: 'makkah' },
    'Asia/Dubai':         { lat: 25.2048, lng: 55.2708,  label: 'Dubai',        method: 'makkah' },
    'Europe/London':      { lat: 51.5074, lng: -0.1278,  label: 'London',       method: 'mwl' },
    'America/New_York':   { lat: 40.7128, lng: -74.0060, label: 'New York',     method: 'isna' }
  };

  function defaultLocation() {
    let tz = '';
    try { tz = Intl.DateTimeFormat().resolvedOptions().timeZone || ''; } catch (e) { /* ignore */ }
    if (TZ_FALLBACKS[tz]) return Object.assign({ source: 'timezone', tz }, TZ_FALLBACKS[tz]);
    return { lat: 21.4225, lng: 39.8262, label: 'Makkah', method: 'makkah', source: 'default', tz };
  }

  global.SomSunClock = {
    CALC_METHODS,
    ASR_FACTORS,
    TIME_WINDOWS,
    WINDOW_BY_ID,
    prayerTimes,
    sunPositionNow,
    moonPositionNow,
    moonElongationAt,
    buildSchedule,
    currentWindow,
    defaultLocation
  };
})(window);
