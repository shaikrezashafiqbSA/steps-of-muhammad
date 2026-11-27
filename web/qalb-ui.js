// =========================================================
// QALB MONITOR UI — the قَلْب button on the horizon card, the
//   blurred wheel of heart states, and the line board of duʿās
//   for the state the reader picks.
//   Loaded by index.html after plan-ui.js. Data: web/qalb-data.js.
//
//   Deep link: index.html#qalb opens the wheel, #qalb/<id> opens
//   that state's board (a card's Home button uses this when the
//   card was opened from the board).
//
//   HISTORY — each layer is one step of the browser's history, so
//   the phone's Back button peels them off in order:
//     card → board → wheel → Action view
//   Opening the wheel pushes #qalb, opening a state pushes
//   #qalb/<id>. What is on screen always follows the hash (sync()).
//   history.state.qalbDepth counts how many of those entries this
//   page pushed, so "back to the wheel" and "close" can step back
//   through them instead of piling up new ones. An entry reached by
//   a link (a card's Home button) has no depth: there we replace the
//   hash instead of going back, or Back would leave the app.
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
      p.addEventListener('click', () => pickState(s.id));
      ring.appendChild(p);
      petals.push(p);
    });

    root.querySelector('#qalb-core').addEventListener('click', close);
    root.querySelector('#qalb-close').addEventListener('click', close);
    root.querySelector('#qalb-back').addEventListener('click', backToWheel);
    // Tapping the blur steps back one layer: board → wheel → closed.
    root.addEventListener('click', e => {
      if (e.target !== root && !e.target.classList.contains('qalb-stage')) return;
      if (root.classList.contains('board-open')) backToWheel(); else close();
    });
    root.addEventListener('keydown', onKey);
    window.addEventListener('resize', sizeRing);
    attachSwipe();

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

  // ── What is on screen ─────────────────────────────────
  function showWheel() {
    if (!root) build();
    const wasOpen = root.classList.contains('open');
    const was = current;
    if (!wasOpen && !root.contains(document.activeElement)) lastFocus = document.activeElement;
    root.classList.add('open');
    root.classList.remove('board-open');
    resetDrag();
    current = null;
    document.body.classList.add('qalb-open');
    if (btn) btn.setAttribute('aria-expanded', 'true');
    requestAnimationFrame(sizeRing);
    const p = petals[SomQalb.states().findIndex(s => s.id === was)] || petals[0];
    focusLater(p, wasOpen ? 60 : 80);
    if (!wasOpen) track('qalb-opened');
  }

  function hideAll() {
    if (!root || !root.classList.contains('open')) return;
    clearTimeout(focusTimer);
    root.classList.remove('open', 'board-open');
    resetDrag();
    document.body.classList.remove('qalb-open');
    current = null;
    if (btn) btn.setAttribute('aria-expanded', 'false');
    const back = (lastFocus && document.contains(lastFocus) && lastFocus !== document.body && !root.contains(lastFocus)) ? lastFocus : btn;
    if (back) back.focus();
  }

  // The hash decides: '' → closed, #qalb → wheel, #qalb/<id> → board.
  let closing = false;
  function sync() {
    const m = /^#qalb(?:\/([a-z-]+))?$/.exec(location.hash);
    if (!m) { closing = false; hideAll(); return; }
    if (closing) {
      // Stepped back as far as this page's own entries go and still on a
      // Qalb hash (it was reached by a link): drop the hash in place.
      closing = false;
      history.replaceState(null, '', location.pathname + location.search);
      hideAll();
      return;
    }
    const id = m[1] && SomQalb.state(m[1]) ? m[1] : null;
    if (!id) { showWheel(); return; }
    if (!root || !root.classList.contains('open')) showWheel();
    if (current !== id) showState(id, false);
  }

  // ── What the reader does ──────────────────────────────
  const depth = () => (history.state && history.state.qalbDepth) || 0;
  const baseUrl = () => location.pathname + location.search;

  function open(stateId) {
    if (/^#qalb/.test(location.hash)) { sync(); return; }
    history.pushState({ qalbDepth: 1 }, '', baseUrl() + '#qalb');
    sync();
    if (stateId) pickState(stateId);
  }

  function pickState(id) {
    // From the wheel: a new step, so Back returns to the wheel.
    history.pushState({ qalbDepth: depth() + 1, overWheel: true }, '', baseUrl() + '#qalb/' + id);
    sync();
  }

  function backToWheel() {
    if (history.state && history.state.overWheel) { history.back(); return; }
    // Board reached by a link (a card's Home): no wheel entry behind it.
    history.replaceState({ qalbDepth: 0 }, '', baseUrl() + '#qalb');
    sync();
  }

  function close() {
    const n = depth();
    if (n > 0) { closing = true; history.go(-n); return; }
    history.replaceState(null, '', baseUrl());
    sync();
  }

  // ── Swipe the board down to return to the wheel ───────
  // From the handle and bar at any time; from the list only when it is
  // scrolled to the top, so a normal scroll still scrolls.
  let drag = null;
  function resetDrag() {
    drag = null;
    if (board) { board.style.transition = ''; board.style.transform = ''; }
  }
  function attachSwipe() {
    const body = board.querySelector('.qalb-board-body');
    board.addEventListener('touchstart', e => {
      if (!root.classList.contains('board-open') || e.touches.length !== 1) return;
      const fromTop = !!e.target.closest('.plan-sheet-handle, .qalb-board-bar');
      drag = { y0: e.touches[0].clientY, t0: Date.now(), dy: 0, active: false, fromTop, scroll: body.scrollTop };
    }, { passive: true });
    board.addEventListener('touchmove', e => {
      if (!drag) return;
      const dy = e.touches[0].clientY - drag.y0;
      if (!drag.active) {
        if (dy < 8) { if (dy < -8) drag = null; return; }
        if (!drag.fromTop && (drag.scroll > 0 || body.scrollTop > 0)) { drag = null; return; }
        drag.active = true;
        board.style.transition = 'none';
      }
      e.preventDefault();
      drag.dy = Math.max(0, dy);
      board.style.transform = `translate(-50%, ${drag.dy}px)`;
    }, { passive: false });
    const end = () => {
      if (!drag || !drag.active) { drag = null; return; }
      const fast = drag.dy > 40 && drag.dy / Math.max(1, Date.now() - drag.t0) > 0.5;
      const far = drag.dy > Math.min(140, board.offsetHeight * 0.22);
      board.style.transition = '';
      if (far || fast) backToWheel();
      else board.style.transform = '';
      drag = null;
    };
    board.addEventListener('touchend', end);
    board.addEventListener('touchcancel', end);
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

  function showState(id) {
    const s = SomQalb.state(id);
    if (!s) return;
    const fromWheel = root.classList.contains('open') && !root.classList.contains('board-open');
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

  document.addEventListener('DOMContentLoaded', () => {
    if (!global.SomQalb) return;
    btn = document.getElementById('btn-qalb');
    if (btn) btn.addEventListener('click', () => open());
    sync();
  });
  // Back / Forward between this page's own entries (popstate), and a
  // hash typed or linked from elsewhere (hashchange). sync() is idempotent.
  window.addEventListener('popstate', () => { if (global.SomQalb) sync(); });
  window.addEventListener('hashchange', () => { if (global.SomQalb) sync(); });
  // Returning to this page from a card through the back-forward cache.
  window.addEventListener('pageshow', e => { if (e.persisted && global.SomQalb) sync(); });

  global.SomQalbUI = { open, close };
})(window);
