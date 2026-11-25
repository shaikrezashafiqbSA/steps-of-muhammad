// =========================================================
// QALB MONITOR UI — the قَلْب button on the horizon card, the
//   blurred wheel of heart states, and the line board of duʿās
//   for the state the reader picks.
//   Loaded by index.html after plan-ui.js. Data: web/qalb-data.js.
//
//   Deep link: index.html#qalb opens the wheel, #qalb/<id> opens
//   that state's board (a card's Home button uses this when the
//   card was opened from the board).
// =========================================================
(function (global) {
  'use strict';

  const GRADE_MARK = { sahih: 'Ṣ', hasan: 'Ḥ', daif: 'Ḍ' };
  const GRADE_NAME = { sahih: 'Ṣaḥīḥ', hasan: 'Ḥasan', daif: 'Ḍaʿīf' };

  let root, ring, board, btn, petals = [], current = null, lastFocus = null, focusTimer = null;

  // Focus after the slide-in; cancelled if the wheel closes first.
  function focusLater(el, ms) {
    clearTimeout(focusTimer);
    focusTimer = setTimeout(() => { if (el && root.classList.contains('open')) el.focus(); }, ms);
  }

  const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c =>
    ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

  function build() {
    root = document.createElement('div');
    root.className = 'qalb';
    root.id = 'qalb';
    root.setAttribute('role', 'dialog');
    root.setAttribute('aria-modal', 'true');
    root.setAttribute('aria-label', 'Qalb Monitor: the states of the heart');
    root.innerHTML = `
      <div class="qalb-stage">
        <div class="qalb-title">Aḥwāl al-Qalb · what is your heart carrying?</div>
        <div class="qalb-ring" id="qalb-ring">
          <button type="button" class="qalb-core" id="qalb-core" aria-label="Close">
            <span class="qalb-core-ar">قَلْبِي</span>
            <span class="qalb-core-sub">Close</span>
          </button>
        </div>
        <div class="qalb-hint">Tap a state to see the āyah that names it, then the duʿās for it.</div>
      </div>
      <div class="qalb-board" id="qalb-board" role="region" aria-label="Duʿās for this state">
        <div class="plan-sheet-handle"></div>
        <div class="qalb-board-bar">
          <button type="button" class="qalb-back" id="qalb-back">‹ All states</button>
          <button type="button" class="plan-sheet-close" id="qalb-close">Close</button>
        </div>
        <div class="qalb-board-body" id="qalb-board-body"></div>
      </div>`;
    document.body.appendChild(root);
    ring = root.querySelector('#qalb-ring');
    board = root.querySelector('#qalb-board');

    SomQalb.states().forEach((s, i, all) => {
      const p = document.createElement('button');
      p.type = 'button';
      p.className = 'qalb-petal' + ((s.gaps || []).length ? ' has-gap' : '');
      p.style.setProperty('--a', (i * 360 / all.length - 90) + 'deg');
      p.style.transitionDelay = (i * 16) + 'ms';
      p.setAttribute('aria-label', s.name);
      p.innerHTML = `<span class="qalb-petal-ar">${esc(s.ar)}</span><span class="qalb-petal-lbl">${esc(s.short)}</span>`;
      p.addEventListener('click', () => showState(s.id, true));
      ring.appendChild(p);
      petals.push(p);
    });

    root.querySelector('#qalb-core').addEventListener('click', close);
    root.querySelector('#qalb-close').addEventListener('click', close);
    root.querySelector('#qalb-back').addEventListener('click', backToWheel);
    root.addEventListener('click', e => { if (e.target === root || e.target.classList.contains('qalb-stage')) close(); });
    root.addEventListener('keydown', onKey);
    window.addEventListener('resize', sizeRing);

    // "+" on a line: put the card in a slot of the plan (the plan's own chooser).
    board.addEventListener('click', e => {
      const add = e.target.closest('[data-qalb-add]');
      if (!add) return;
      e.preventDefault();
      if (global.SomPlanUI && SomPlanUI.openChooser) {
        SomPlanUI.openChooser({ label: add.dataset.label, path: add.dataset.qalbAdd });
      }
    });
  }

  function sizeRing() {
    if (!ring) return;
    const w = ring.getBoundingClientRect().width;
    if (!w) return;
    const r = Math.round(w * 0.4) + 'px';
    petals.forEach(p => p.style.setProperty('--r', r));
  }

  function open(stateId) {
    if (!root) build();
    if (!root.contains(document.activeElement)) lastFocus = document.activeElement;
    root.classList.add('open');
    document.body.classList.add('qalb-open');
    if (btn) btn.setAttribute('aria-expanded', 'true');
    requestAnimationFrame(sizeRing);
    if (stateId && SomQalb.state(stateId)) showState(stateId, false);
    else focusLater(petals[0], 80);
    track('qalb-opened');
  }

  function close() {
    if (!root) return;
    clearTimeout(focusTimer);
    root.classList.remove('open', 'board-open');
    document.body.classList.remove('qalb-open');
    current = null;
    if (btn) btn.setAttribute('aria-expanded', 'false');
    if (/^#qalb/.test(location.hash)) history.replaceState(null, '', location.pathname + location.search);
    const back = (lastFocus && document.contains(lastFocus) && lastFocus !== document.body && !root.contains(lastFocus)) ? lastFocus : btn;
    if (back) back.focus();
  }

  function backToWheel() {
    const was = current;
    root.classList.remove('board-open');
    current = null;
    const p = petals[SomQalb.states().findIndex(s => s.id === was)] || petals[0];
    focusLater(p, 60);
  }

  function onKey(e) {
    if (e.key === 'Escape') {
      e.preventDefault();
      if (root.classList.contains('board-open')) backToWheel(); else close();
      return;
    }
    // Arrow keys walk round the wheel.
    if (!root.classList.contains('board-open') && /^Arrow(Left|Right|Up|Down)$/.test(e.key)) {
      const i = petals.indexOf(document.activeElement);
      if (i === -1) return;
      e.preventDefault();
      const step = (e.key === 'ArrowRight' || e.key === 'ArrowDown') ? 1 : -1;
      petals[(i + step + petals.length) % petals.length].focus();
    }
  }

  function showState(id, fromWheel) {
    const s = SomQalb.state(id);
    if (!s) return;
    current = id;
    const d = s.diagnosis;
    const lines = SomQalb.lines(id);
    const gaps = s.gaps || [];

    const lineRows = lines.map(l => {
      const g = GRADE_MARK[l.grade] ? l.grade : 'none';
      const sub = [l.gloss, l.ref, GRADE_NAME[l.grade], l.reps].filter(Boolean).map(esc).join(' · ');
      const href = 'web/render.html?file=' + encodeURI(l.path) + '&from=' + encodeURIComponent('qalb:' + id);
      return `
        <div class="qalb-line">
          <a class="qalb-line-main" href="${href}">
            <span class="qalb-av qalb-av-${g}" aria-hidden="true">${GRADE_MARK[l.grade] || '✦'}</span>
            <span class="qalb-line-text">
              <span class="qalb-line-title">${esc(SomQalb.shortLabel(l.label))}</span>
              <span class="qalb-line-sub">${sub}</span>
            </span>
            <span class="qalb-call" aria-hidden="true">▶</span>
          </a>
          <button type="button" class="qalb-add" data-qalb-add="${esc(l.path)}" data-label="${esc(l.label)}"
                  title="Add to my day" aria-label="Add ${esc(SomQalb.shortLabel(l.label))} to my day">＋</button>
        </div>`;
    }).join('');

    const gapRows = gaps.map(g => `
      <div class="qalb-line is-gap">
        <div class="qalb-line-main">
          <span class="qalb-av qalb-av-gap" aria-hidden="true">…</span>
          <span class="qalb-line-text">
            <span class="qalb-line-title">${esc(g.label)}</span>
            <span class="qalb-line-sub">${[g.note, g.ref].filter(Boolean).map(esc).join(' · ')} · not yet in the vault</span>
          </span>
        </div>
      </div>`).join('');

    root.querySelector('#qalb-board-body').innerHTML = `
      <div class="qalb-dx">
        <div class="qalb-dx-name"><span class="qalb-dx-word">${esc(s.ar)}</span>${esc(s.name)}</div>
        <p class="qalb-dx-ar" dir="rtl" lang="ar">${esc(d.ar)}</p>
        <p class="qalb-dx-en">${esc(d.en)}</p>
        <div class="qalb-dx-ref">${esc(d.ref)}${d.verify ? ` · <a href="${esc(d.verify)}" target="_blank" rel="noopener">Verify ↗</a>` : ''}</div>
        ${s.turn ? `
        <div class="qalb-turn">
          <p class="qalb-turn-ar" dir="rtl" lang="ar">${esc(s.turn.ar)}</p>
          <p class="qalb-turn-en">${esc(s.turn.en)} <span class="qalb-turn-ref">${esc(s.turn.ref)}</span></p>
        </div>` : ''}
      </div>
      <div class="qalb-lines-head">
        <span>${lines.length} ${lines.length === 1 ? 'line' : 'lines'} open</span>
        ${lines.length ? `<a class="qalb-all" href="web/render.html?qalb=${encodeURIComponent(id)}">Recite all ›</a>` : ''}
      </div>
      <div class="qalb-lines">${lineRows}</div>
      ${gaps.length ? `<div class="qalb-lines-head"><span>Not yet authored</span></div><div class="qalb-lines">${gapRows}</div>` : ''}
      ${s.care ? `<p class="qalb-care">${esc(s.care)}</p>` : ''}`;

    root.classList.add('board-open');
    board.querySelector('.qalb-board-body').scrollTop = 0;
    focusLater(root.querySelector('#qalb-back'), fromWheel ? 260 : 80);
    track('qalb-state', id);
  }

  function track(name, state) {
    try { if (global.umami && umami.track) umami.track(name, state ? { state } : undefined); } catch (e) { /* analytics is optional */ }
  }

  function fromHash() {
    const m = /^#qalb(?:\/([a-z-]+))?$/.exec(location.hash);
    if (m) open(m[1]);
  }

  document.addEventListener('DOMContentLoaded', () => {
    if (!global.SomQalb) return;
    btn = document.getElementById('btn-qalb');
    if (btn) btn.addEventListener('click', () => open());
    fromHash();
  });
  window.addEventListener('hashchange', fromHash);

  global.SomQalbUI = { open, close };
})(window);
