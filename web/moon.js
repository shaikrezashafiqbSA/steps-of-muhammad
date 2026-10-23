// =========================================================
// MOON — a realistic moon, and the tooltip that opens when you tap it.
//
//   SomMoon.svg({ cx, cy, r, moon, id })   the moon as SVG, with its real
//                                          phase and its real tilt for this
//                                          observer — hold the phone up to
//                                          the sky and the lit side matches.
//   SomMoon.attach({ svg, card, getState }) wires the tap-to-open tooltip.
//   SomMoon.setMoonSpot(x, y)              where the moon is on the horizon
//                                          panel right now (SVG units).
//
// The tooltip: today's Hijri date, the phase, a one-line tidbit for the day
// (edit those in web/hijri-data.js), and a collapsible month calendar.
// Needs hijri.js and hijri-data.js.
// =========================================================
(function (global) {
  'use strict';
  const DEG = Math.PI / 180;
  const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  })[c]);

  // ── The face ─────────────────────────────────────────────
  // Drawn in unit coordinates (the disc has radius 1, lunar north up, the
  // near side as the naked eye sees it): the dark seas, and a few bright
  // craters. Soft on purpose — it should read as the moon, not a map.
  const MARIA = [
    // cx, cy, rx, ry, rotation°
    [-0.26, -0.44, 0.30, 0.21, -15],   // Imbrium
    [ 0.13, -0.50, 0.17, 0.15,   0],   // Serenitatis
    [ 0.36, -0.12, 0.22, 0.15, -20],   // Tranquillitatis
    [ 0.68, -0.28, 0.12, 0.09,   0],   // Crisium
    [ 0.62,  0.14, 0.09, 0.15,  10],   // Fecunditatis
    [ 0.40,  0.22, 0.07, 0.07,   0],   // Nectaris
    [-0.66, -0.05, 0.20, 0.38,   8],   // Procellarum
    [-0.54,  0.40, 0.10, 0.10,   0],   // Humorum
    [-0.18,  0.38, 0.17, 0.12,   0],   // Nubium
    [ 0.02, -0.84, 0.30, 0.06,   0]    // Frigoris
  ];
  const CRATERS = [
    [-0.12, 0.74, 0.030, 1.0],   // Tycho
    [-0.40, -0.06, 0.028, 0.85], // Copernicus
    [-0.80, -0.14, 0.022, 0.7],  // Kepler
    [ 0.14, 0.06, 0.018, 0.6]    // Ptolemaeus area
  ];

  function svg(o) {
    const r = o.r, id = 'mn' + (o.id || '0');
    const m = o.moon;
    const dim = o.dim == null ? 1 : o.dim;

    // Shape of the lit part. Seen with the lit side to the right: the limb
    // is a semicircle, the terminator a half-ellipse of width r·|cos E|
    // bulging toward the lit side for a crescent, away from it for a gibbous.
    const E = m.elongation > 180 ? 360 - m.elongation : m.elongation;   // 0…180
    const c = Math.cos(E * DEG);
    const rx = Math.max(0.0001, Math.abs(c) * r);
    const shadow = `M0 ${-r} A${r} ${r} 0 0 0 0 ${r} A${rx} ${r} 0 0 ${c > 0 ? 0 : 1} 0 ${-r}Z`;

    const q = m.parallactic;
    const litRot = q - m.brightLimb - 90;      // base lit side is +x (clockwise 90° from up)
    const glow = Math.min(1, m.illumination * 1.1);

    const maria = MARIA.map(([x, y, a, b, rot]) =>
      `<ellipse cx="${x}" cy="${y}" rx="${a}" ry="${b}" transform="rotate(${rot} ${x} ${y})"/>`).join('');
    const craters = CRATERS.map(([x, y, cr, o2]) =>
      `<circle cx="${x}" cy="${y}" r="${cr}" fill="#F7F1E2" opacity="${o2}"/>` +
      (cr > 0.025 ? `<g stroke="#F7F1E2" stroke-width="0.012" opacity="0.28">
         <line x1="${x}" y1="${y}" x2="${x - 0.26}" y2="${y + 0.2}"/><line x1="${x}" y1="${y}" x2="${x + 0.05}" y2="${y + 0.32}"/>
         <line x1="${x}" y1="${y}" x2="${x + 0.28}" y2="${y + 0.12}"/><line x1="${x}" y1="${y}" x2="${x - 0.12}" y2="${y - 0.26}"/></g>` : '')
    ).join('');

    return `
    <g class="som-moon" opacity="${dim}" transform="translate(${o.cx.toFixed(2)} ${o.cy.toFixed(2)})">
      <defs>
        <radialGradient id="${id}-halo"><stop offset="55%" stop-color="#FFFBF1" stop-opacity="${(0.22 * glow).toFixed(3)}"/><stop offset="100%" stop-color="#FFFBF1" stop-opacity="0"/></radialGradient>
        <radialGradient id="${id}-face" cx="45%" cy="42%" r="70%"><stop offset="0%" stop-color="#E9E2D0"/><stop offset="70%" stop-color="#CFC7B2"/><stop offset="100%" stop-color="#A9A18E"/></radialGradient>
        <radialGradient id="${id}-limb" cx="50%" cy="50%" r="50%"><stop offset="72%" stop-color="#000" stop-opacity="0"/><stop offset="100%" stop-color="#000" stop-opacity="0.42"/></radialGradient>
        <filter id="${id}-soft" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="0.035"/></filter>
        <filter id="${id}-term" x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur stdDeviation="${(r * 0.05).toFixed(3)}"/></filter>
        <clipPath id="${id}-clip"><circle r="${r}"/></clipPath>
      </defs>
      <circle r="${(r * 1.9).toFixed(2)}" fill="url(#${id}-halo)"/>
      <g clip-path="url(#${id}-clip)">
        <g transform="rotate(${q.toFixed(1)}) scale(${r})">
          <circle r="1" fill="url(#${id}-face)"/>
          <g fill="#7E7869" opacity="0.62" filter="url(#${id}-soft)">${maria}</g>
          <g filter="url(#${id}-soft)">${craters}</g>
        </g>
        <circle r="${r}" fill="url(#${id}-limb)"/>
        <g transform="rotate(${litRot.toFixed(1)})">
          <path d="${shadow}" fill="#04060E" opacity="0.9" filter="url(#${id}-term)"/>
        </g>
      </g>
      <circle r="${r}" fill="none" stroke="rgba(255,251,241,0.30)" stroke-width="${Math.max(0.4, r * 0.04).toFixed(2)}"/>
    </g>`;
  }

  // Plain-language phase from the sun–moon angle.
  function phaseName(e) {
    if (e < 10 || e >= 350) return 'New moon';
    if (e < 80) return 'Waxing crescent';
    if (e < 100) return 'First quarter';
    if (e < 170) return 'Waxing gibbous';
    if (e < 190) return 'Full moon';
    if (e < 260) return 'Waning gibbous';
    if (e < 280) return 'Last quarter';
    return 'Waning crescent';
  }

  // ── The tooltip ──────────────────────────────────────────
  // The "!" at the moon's shoulder, like a quest marker over an NPC. It is
  // always there: bright and bobbing while today's tidbit is unread, greyed
  // once the reader has opened it, and bright again at the next Maghrib —
  // when the Hijri day turns over. It is an HTML overlay, not part of the
  // SVG, because the SVG is rebuilt every second and would restart the bobbing.
  const SEEN_KEY = 'som-moon-seen-day';
  let bang = null;
  let dayCache = { minute: -1, id: '' };
  // 'year-month-day' of the Hijri day right now; recomputed at most once a minute.
  function hijriDayId() {
    const { now, loc } = state.getState();
    const minute = Math.floor(now.getTime() / 60000);
    if (minute !== dayCache.minute) {
      const t = global.SomHijri.today(now, loc);
      dayCache = { minute, id: t.year + '-' + t.month + '-' + t.day };
    }
    return dayCache.id;
  }
  function seen() {
    try { return localStorage.getItem(SEEN_KEY) === hijriDayId(); } catch (e) { return false; }
  }
  function markSeen() {
    try { localStorage.setItem(SEEN_KEY, hijriDayId()); } catch (e) { /* private mode */ }
  }
  function placeBang() {
    if (!bang) return;
    const svgRect = state.svg.getBoundingClientRect();
    const show = !state.open && state.spot && svgRect.width > 0;
    bang.hidden = !show;
    if (!show) return;
    bang.classList.toggle('is-seen', seen());
    const cardRect = state.card.getBoundingClientRect();
    const k = svgRect.width / 400;
    // Nearly touching the moon's upper-right edge (the moon is 10 units across the middle).
    bang.style.left = (svgRect.left - cardRect.left + (state.spot.x + 9) * k) + 'px';
    bang.style.top = (svgRect.top - cardRect.top + (state.spot.y - 6) * k) + 'px';
  }

  const state = { open: false, svg: null, card: null, getState: null, spot: null, offset: 0, picked: null, calOpen: false, key: '' };
  let pop = null;
  const WEEK = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

  function ensurePop() {
    if (pop) return pop;
    pop = document.createElement('div');
    pop.className = 'moon-pop';
    pop.setAttribute('role', 'dialog');
    pop.setAttribute('aria-label', 'The moon today');
    pop.hidden = true;
    state.card.appendChild(pop);
    pop.addEventListener('click', onPopClick);
    document.addEventListener('keydown', e => { if (e.key === 'Escape' && state.open) close(); });
    document.addEventListener('pointerdown', e => {
      if (!state.open) return;
      if (pop.contains(e.target) || state.svg.contains(e.target)) return;
      close();
    });
    return pop;
  }

  function noteHTML(d) {
    const n = d.note;
    if (!n) return '<p class="moon-pop-note moon-pop-note-empty">No event is recorded for this day.</p>';
    return `<p class="moon-pop-note">${n.tag ? `<span class="moon-pop-tag">${esc(n.tag)}</span> ` : ''}${esc(n.text)}${n.ref ? ` <span class="moon-pop-ref">${esc(n.ref)}</span>` : ''}</p>`;
  }

  function calendarHTML(today) {
    const H = global.SomHijri;
    const { loc } = state.getState();
    const rec = state.offset === 0 ? today.rec : H.neighbour(today.rec, state.offset, loc);
    const mo = H.month(rec, loc);
    const first = mo.days[0].date.getDay();
    const isThisMonth = state.offset === 0;
    let cells = '<span class="moon-cal-pad"></span>'.repeat(first);
    mo.days.forEach(d => {
      const cls = ['moon-cal-day'];
      if (isThisMonth && d.day === today.day) cls.push('is-today');
      if (d.landmark && d.landmark.key === 'badr') cls.push('is-white');
      if (d.landmark && d.landmark.key !== 'badr') cls.push('is-landmark');
      if (d.note && d.note.tag) cls.push('has-note');
      if (state.picked && state.picked.m === mo.month && state.picked.d === d.day) cls.push('is-picked');
      cells += `<button type="button" class="${cls.join(' ')}" data-cal-day="${d.day}" data-cal-off="${state.offset}">
        <span class="moon-cal-n">${d.day}</span><span class="moon-cal-g">${d.date.getDate()}</span></button>`;
    });
    return `
      <div class="moon-cal-head">
        <button type="button" class="moon-cal-nav" data-cal-nav="-1" aria-label="Previous month">◀</button>
        <span class="moon-cal-title">${esc(mo.monthName)} ${mo.year}</span>
        <button type="button" class="moon-cal-nav" data-cal-nav="1" aria-label="Next month">▶</button>
      </div>
      <div class="moon-cal-week">${WEEK.map(w => `<span>${w}</span>`).join('')}</div>
      <div class="moon-cal-grid">${cells}</div>`;
  }

  function build() {
    const { now, loc, moon } = state.getState();
    const H = global.SomHijri;
    const today = H.today(now, loc);
    const shown = state.picked && state.offset !== undefined && state.pickedDesc ? state.pickedDesc : today;
    const lm = shown.landmark;
    // A day picked from the calendar shows the moon as it stands at noon of that day.
    const shownMoon = shown === today ? moon
      : global.SomSunClock.moonPositionNow(new Date(shown.date.getFullYear(), shown.date.getMonth(), shown.date.getDate(), 12), loc.lat, loc.lng);
    const pct = Math.round(shownMoon.illumination * 100);
    pop.innerHTML = `
      <button type="button" class="moon-pop-close" data-moon-close aria-label="Close">✕</button>
      <div class="moon-pop-head">
        <svg class="moon-pop-moon" viewBox="-40 -40 80 80" aria-hidden="true">${svg({ cx: 0, cy: 0, r: 30, moon: shownMoon, id: 'pop' })}</svg>
        <div class="moon-pop-title">
          <div class="moon-pop-date">${shown.day} ${esc(shown.monthName)} <span class="moon-pop-nw">${shown.year}<span class="moon-pop-ah"> AH</span></span></div>
          <div class="moon-pop-sub">${esc(phaseName(shownMoon.elongation))} · ${pct}% lit</div>
          ${lm ? `<div class="moon-pop-lm"><b>${esc(lm.name)}</b>${lm.sub ? ' · ' + esc(lm.sub) : ''}</div>` : ''}
          ${shown !== today ? `<div class="moon-pop-sub">${shown.date.toLocaleDateString([], { weekday: 'short', day: 'numeric', month: 'short' })} · from the Maghrib before</div>` : ''}
        </div>
      </div>
      ${noteHTML(shown)}
      <button type="button" class="moon-pop-cal-toggle" data-cal-toggle aria-expanded="${state.calOpen}">
        <span class="moon-pop-chev">${state.calOpen ? '▾' : '▸'}</span> Month
      </button>
      <div class="moon-cal"${state.calOpen ? '' : ' hidden'}>${state.calOpen ? calendarHTML(today) : ''}</div>
      ${state.calOpen ? `<p class="moon-pop-fine">Months start by the MABIMS crescent criterion (3° · 6.4°) — your authority’s announcement may differ by a day.</p>` : ''}`;
    state.key = [today.year, today.month, today.day, state.offset, state.calOpen, state.picked && state.picked.d, Math.floor(now.getTime() / 60000)].join('|');
    place();
  }

  function onPopClick(e) {
    if (e.target.closest('[data-moon-close]')) { close(); return; }
    if (e.target.closest('[data-cal-toggle]')) {
      state.calOpen = !state.calOpen; build();
      // The calendar makes the tooltip taller; bring all of it into view.
      if (state.calOpen) pop.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
      return;
    }
    const nav = e.target.closest('[data-cal-nav]');
    if (nav) { state.offset += Number(nav.dataset.calNav); state.picked = null; state.pickedDesc = null; build(); return; }
    const day = e.target.closest('[data-cal-day]');
    if (day) {
      const H = global.SomHijri;
      const { now, loc } = state.getState();
      const today = H.today(now, loc);
      const rec = state.offset === 0 ? today.rec : H.neighbour(today.rec, state.offset, loc);
      const mo = H.month(rec, loc);
      const d = mo.days[Number(day.dataset.calDay) - 1];
      const same = state.picked && state.picked.m === mo.month && state.picked.d === d.day;
      state.picked = same ? null : { m: mo.month, d: d.day };
      state.pickedDesc = same ? null : d;
      build();
    }
  }

  // Sits just under the moon, with a caret pointing at it; kept inside the card.
  function place() {
    if (!state.open || !pop || !state.spot) return;
    const svgRect = state.svg.getBoundingClientRect();
    const cardRect = state.card.getBoundingClientRect();
    const k = svgRect.width / 400;
    const mx = svgRect.left - cardRect.left + state.spot.x * k;
    const my = svgRect.top - cardRect.top + state.spot.y * k;
    const w = pop.offsetWidth;
    const left = Math.max(8, Math.min(cardRect.width - w - 8, mx - w / 2));
    pop.style.left = left + 'px';
    // Under the land the moon is near the bottom of the card: open above it if
    // that fits, otherwise below as usual.
    const h = pop.offsetHeight;
    const aboveTop = my - 18 * k - 6 - h;
    const above = state.spot.y > 150 && aboveTop >= -8;
    pop.classList.toggle('is-above', above);
    pop.style.top = (above ? aboveTop : my + 18 * k + 6) + 'px';
    pop.style.setProperty('--caret', Math.max(14, Math.min(w - 14, mx - left)) + 'px');
  }

  function open() {
    ensurePop();
    state.open = true;
    markSeen();
    placeBang();
    state.offset = 0; state.picked = null; state.pickedDesc = null;
    pop.hidden = false;
    build();
    state.svg.classList.add('moon-open');
    state.card.classList.add('moon-open');
  }
  function close() {
    state.open = false;
    if (pop) pop.hidden = true;
    state.svg.classList.remove('moon-open');
    state.card.classList.remove('moon-open');
  }

  // Called from the horizon's one-second repaint.
  function setMoonSpot(x, y) { state.spot = { x, y }; }
  function tick() {
    placeBang();
    if (!state.open) return;
    const { now } = state.getState();
    const key = Math.floor(now.getTime() / 60000);
    if (state.key.split('|').pop() !== String(key)) build(); else place();
  }

  function attach(o) {
    state.svg = o.svg; state.card = o.card; state.getState = o.getState;
    bang = document.createElement('span');
    bang.className = 'moon-bang';
    bang.textContent = '!';
    bang.setAttribute('aria-hidden', 'true');
    bang.hidden = true;
    state.card.appendChild(bang);
    const hit = ev => {
      if (!state.spot) return false;
      const r = state.svg.getBoundingClientRect();
      const k = r.width / 400;
      const dx = (ev.clientX - r.left) / k - state.spot.x;
      const dy = (ev.clientY - r.top) / k - state.spot.y;
      // The moon itself, or the "!" floating just above it.
      return dx * dx + dy * dy <= 22 * 22 || (dx > 3 && dx < 18 && dy < -4 && dy > -26);
    };
    // The panel repaints every second, so listen on the <svg> and hit-test
    // by position rather than on a node that is about to be replaced.
    state.svg.addEventListener('click', ev => { if (hit(ev)) { state.open ? close() : open(); } });
    state.svg.addEventListener('mousemove', ev => { state.svg.style.cursor = hit(ev) ? 'pointer' : ''; });
    window.addEventListener('resize', () => place());
  }

  global.SomMoon = { svg, attach, setMoonSpot, tick, phaseName, close };
})(window);
