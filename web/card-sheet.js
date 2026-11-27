// =========================================================
// CARD SHEET — a card opens in a pop-up sheet over the page the
//   reader came from (Library, Action list, Qalb board), instead of
//   replacing it. The page stays behind, blurred, and is where the
//   reader lands when the card closes: tap the blur, drag the top bar
//   down, press ✕ or the card's Home, or the phone's Back.
//   Loaded by index.html after qalb-ui.js. Styles: index.html, CARD SHEET.
//
//   The sheet holds web/render.html?…&sheet=1 in an iframe, so the card
//   is the real card page with its whole toolbar. In sheet mode the card
//   (web/nav-data.js) turns Home into "close" and swaps Back / Next in
//   place, so the sheet adds exactly one history entry.
//
//   LAST READ — every card records itself in sessionStorage
//   (som-last-read, written by web/nav-data.js). When the reader is back
//   on this page, the row for that card, in the list it was opened from,
//   gets a gold marker, and is scrolled into view when a sheet closes.
//
//   Links still work as plain links: long-press, open in a new tab and
//   shared links show the card as a full page, as before.
// =========================================================
(function (global) {
  'use strict';

  const CARD_RE = /(^|\/)web\/render\.html\?/;
  const LAST_KEY = 'som-last-read';
  let shell, panel, frame, titleEl, loadingEl, open = false, drag = null;

  // ── The sheet ──────────────────────────────────────────
  function build() {
    shell = document.createElement('div');
    shell.className = 'card-sheet';
    shell.innerHTML = `
      <div class="card-sheet-scrim"></div>
      <div class="card-sheet-panel" role="dialog" aria-modal="true" aria-label="Card">
        <div class="card-sheet-grip">
          <div class="card-sheet-title"></div>
          <button type="button" class="card-sheet-x" aria-label="Close card">✕</button>
        </div>
        <div class="card-sheet-body">
          <div class="card-sheet-loading">Opening…</div>
        </div>
      </div>`;
    document.body.appendChild(shell);
    panel = shell.querySelector('.card-sheet-panel');
    titleEl = shell.querySelector('.card-sheet-title');
    loadingEl = shell.querySelector('.card-sheet-loading');
    shell.querySelector('.card-sheet-scrim').addEventListener('click', requestClose);
    shell.querySelector('.card-sheet-x').addEventListener('click', requestClose);
    attachSwipe(shell.querySelector('.card-sheet-grip'));
    document.addEventListener('keydown', e => { if (e.key === 'Escape' && open) { e.stopPropagation(); requestClose(); } }, true);
  }

  // Drag the top bar down to close; a short drag snaps back.
  function attachSwipe(grip) {
    grip.addEventListener('pointerdown', e => {
      if (e.target.closest('button')) return;
      drag = { y0: e.clientY, t0: Date.now(), dy: 0 };
      grip.setPointerCapture(e.pointerId);
      panel.style.transition = 'none';
    });
    grip.addEventListener('pointermove', e => {
      if (!drag) return;
      drag.dy = Math.max(0, e.clientY - drag.y0);
      panel.style.transform = `translate(-50%, ${drag.dy}px)`;
    });
    const end = () => {
      if (!drag) return;
      const fast = drag.dy > 40 && drag.dy / Math.max(1, Date.now() - drag.t0) > 0.5;
      const far = drag.dy > Math.min(160, panel.offsetHeight * 0.2);
      panel.style.transition = '';
      panel.style.transform = '';
      drag = null;
      if (far || fast) requestClose();
    };
    grip.addEventListener('pointerup', end);
    grip.addEventListener('pointercancel', end);
  }

  function sheetUrl(href) { return href + (href.includes('?') ? '&' : '?') + 'sheet=1'; }

  function show(href) {
    if (!shell) build();
    open = true;
    document.body.classList.add('card-sheet-open');
    shell.classList.add('open');
    titleEl.textContent = '';
    loadingEl.hidden = false;
    if (!frame) {
      frame = document.createElement('iframe');
      frame.className = 'card-sheet-frame';
      frame.title = 'Card';
      frame.setAttribute('allow', 'web-share; clipboard-write; fullscreen; autoplay; encrypted-media; picture-in-picture');
      frame.addEventListener('load', onFrameLoad);
      shell.querySelector('.card-sheet-body').appendChild(frame);
    }
    // replace(): the card's own page changes must not add history entries.
    try { frame.contentWindow.location.replace(sheetUrl(href)); }
    catch (e) { frame.src = sheetUrl(href); }
    setTimeout(() => shell.querySelector('.card-sheet-x').focus(), 320);
  }

  function onFrameLoad() {
    loadingEl.hidden = true;
    // The card sets its own title once its markdown has loaded.
    let n = 0;
    const read = () => {
      let t = '';
      try { t = frame ? frame.contentDocument.title : ''; } catch (e) { return; }
      if (/ · /.test(t)) titleEl.textContent = t.replace(/ · [^·]+$/, '').split(' - ')[0];
      else if (n++ < 30) setTimeout(read, 100);
    };
    read();
  }

  function hide() {
    if (!open) return;
    open = false;
    shell.classList.remove('open');
    document.body.classList.remove('card-sheet-open');
    // Let the slide-out finish, then drop the card so audio and video stop.
    setTimeout(() => {
      if (open || !frame) return;
      frame.remove();
      frame = null;
    }, 320);
    markLastRead(true);
  }

  // ── History: one entry per open card ───────────────────
  // Same address, state.cardSheet = the card. Back pops it and the sheet
  // closes; the page's own state (Qalb board, prayer tab) is untouched.
  function openCard(href) {
    history.pushState(Object.assign({}, history.state, { cardSheet: href }), '', location.href);
    show(href);
  }

  function requestClose() {
    if (history.state && history.state.cardSheet) history.back(); else hide();
  }

  window.addEventListener('popstate', () => {
    const s = history.state;
    if (s && s.cardSheet) { if (!open) show(s.cardSheet); }
    else hide();
  });

  // Messages from the card inside the sheet (web/nav-data.js, sheet mode).
  window.addEventListener('message', e => {
    if (e.origin !== location.origin || !e.data) return;
    if (e.data.type === 'som-sheet-close') requestClose();
    if (e.data.type === 'som-sheet-go' && e.data.href && history.state && history.state.cardSheet) {
      history.replaceState(Object.assign({}, history.state, { cardSheet: e.data.href }), '', location.href);
    }
  });

  // ── Catch card links on this page ──────────────────────
  document.addEventListener('click', e => {
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    if (e.target.closest('button, .card-sheet')) return;
    const a = e.target.closest('a[href]');
    if (!a || a.target === '_blank' || a.hasAttribute('download')) return;
    const href = a.getAttribute('href').replace(/^\.\//, '');
    if (!CARD_RE.test(href)) return;
    e.preventDefault();
    openCard(href);
  }, true);

  // ── Last read ──────────────────────────────────────────
  // Which list a card was opened from, from its ?from= : a heart state →
  // the Qalb board, a plan slot → Action view, nothing → the Library.
  function scopeFor(from) {
    if (!from) return '#compendium-view';
    if (/^qalb:/.test(from)) return '#qalb';
    return '#action-view';
  }
  const cssValue = s => String(s).replace(/\\/g, '\\\\').replace(/"/g, '\\"');

  let markStyle = null;
  function markLastRead(scrollToIt) {
    let last = null;
    try { last = JSON.parse(sessionStorage.getItem(LAST_KEY) || 'null'); } catch (e) { /* private mode */ }
    if (!markStyle) {
      markStyle = document.createElement('style');
      markStyle.id = 'som-last-read-style';
      document.head.appendChild(markStyle);
    }
    if (!last || !last.file) { markStyle.textContent = ''; return; }
    const scope = scopeFor(last.from);
    // Hrefs carry the path raw (Library) or encodeURI'd (Action, Qalb).
    const values = [...new Set([last.file, encodeURI(last.file)])].map(v => `file=${cssValue(v)}`);
    const sel = values.map(v => `${scope} a[href*="${v}"]`).join(',\n');
    // A style rule, not a class: the Library and Action lists redraw
    // themselves, and a rule keeps marking the row across redraws.
    markStyle.textContent = `
      ${sel} { position: relative; padding-left: 1.7rem !important;
        box-shadow: inset 0 0 0 2px rgba(201, 133, 46, 0.85), 0 0 0 3px rgba(255, 214, 140, 0.45); }
      ${values.map(v => `${scope} a[href*="${v}"]::before`).join(',\n')} {
        content: '➤'; position: absolute; left: 0.2rem; top: 50%; transform: translateY(-50%);
        width: 1.15rem; height: 1.15rem; border-radius: 999px; display: flex; align-items: center; justify-content: center;
        background: #C9852E; color: #FFFBF1; font-size: 0.6rem; line-height: 1; z-index: 2;
        box-shadow: 0 0 0 2px rgba(255, 251, 241, 0.95);
        animation: som-last-read-nudge 1.2s ease-in-out 3;
      }
      ${values.map(v => `#qalb .qalb-line:has(> a[href*="${v}"])`).join(',\n')} { overflow: visible; }`;
    if (!scrollToIt) return;
    const row = document.querySelector(sel);
    if (row && row.offsetParent) {
      const r = row.getBoundingClientRect();
      const box = row.closest('.qalb-board-body');
      const viewTop = box ? box.getBoundingClientRect().top : 0;
      const viewBottom = box ? box.getBoundingClientRect().bottom : window.innerHeight;
      if (r.top < viewTop + 40 || r.bottom > viewBottom - 40) row.scrollIntoView({ block: 'center', behavior: 'smooth' });
    }
  }

  document.addEventListener('DOMContentLoaded', () => {
    markLastRead(false);
    // Reloaded with a card open (history state survives a reload): reopen it.
    const s = history.state;
    if (s && s.cardSheet) show(s.cardSheet);
  });
  // Back to this page from a full-page card (back-forward cache).
  window.addEventListener('pageshow', e => { if (e.persisted) markLastRead(false); });

  global.SomCardSheet = { open: openCard, close: requestClose, markLastRead };
})(window);
