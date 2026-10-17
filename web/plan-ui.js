// =========================================================
// PLAN UI — draws the slots in Action view, runs edit mode,
// and owns the bottom sheet used to fill a slot.
//   Needs plan.js. Used by index.html only.
//
//   SomPlanUI.renderPrayer(prayerKey, { edit, withPresleep })
//       → { html, count }       the slot sections for one prayer tab
//   SomPlanUI.mount(listEl)     wires clicks inside the Action list
//   SomPlanUI.openChooser(card) "which slot?" sheet (Library ＋ button)
// =========================================================
(function (global) {
  'use strict';
  const P = global.SomPlan;
  if (!P) return;

  const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  })[c]);

  const GRADE_CLASS = { sahih: 'ai-grade-sahih', hasan: 'ai-grade-hasan', daif: 'ai-grade-daif' };

  // ── Rows ───────────────────────────────────────────────
  function rowInner(r) {
    const grade = r.type === 'card' ? (GRADE_CLASS[r.grade] || 'ai-grade-none') : 'ai-grade-none';
    const meta = [];
    if (r.type === 'card' && r.ref) meta.push(`<span class="ai-ref">${esc(r.ref)}</span>`);
    if (r.type === 'set') meta.push(`<span class="ai-ref">SET · ${r.count} duʿā${r.count === 1 ? '' : 's'}</span>`);
    if (r.type === 'note') meta.push(`<span class="ai-ref">NOTE</span>`);
    if (r.reps) meta.push(`<span class="ai-reps">${esc(r.reps)}</span>`);
    return `
      <span class="ai-grade ${grade}"></span>
      <span class="ai-body">
        <span class="ai-name">${esc(r.label)}</span>
        ${r.gloss ? `<span class="ai-gloss">${esc(r.gloss)}</span>` : ''}
        ${meta.length ? `<span class="ai-meta">${meta.join('')}</span>` : ''}
      </span>`;
  }

  function renderRow(slotId, entry, i, n, edit) {
    const r = P.resolve(entry);
    if (!r) return '';
    if (!edit) {
      return r.type === 'note'
        ? `<div class="action-item plan-note-row">${rowInner(r)}</div>`
        : `<a class="action-item" href="./${esc(r.href)}${r.type === 'card' ? '&from=' + encodeURIComponent(slotId) : ''}">${rowInner(r)}</a>`;
    }
    return `
      <div class="plan-row">
        <span class="plan-move">
          <button type="button" class="plan-move-btn" data-plan-move="up" data-slot="${slotId}" data-idx="${i}" ${i === 0 ? 'disabled' : ''} aria-label="Move up">▲</button>
          <button type="button" class="plan-move-btn" data-plan-move="down" data-slot="${slotId}" data-idx="${i}" ${i === n - 1 ? 'disabled' : ''} aria-label="Move down">▼</button>
        </span>
        <div class="action-item plan-static">${rowInner(r)}</div>
        <button type="button" class="plan-remove" data-plan-remove data-slot="${slotId}" data-idx="${i}" aria-label="Remove">✕</button>
      </div>`;
  }

  function renderSlot(def, edit) {
    const list = P.entries(def.id);
    if (!list.length && !edit) return '';
    const custom = P.isCustom(def.id);
    const actions = edit
      ? (custom ? `<button type="button" class="plan-mini-btn" data-plan-reset data-slot="${def.id}" title="Go back to the default for this slot">↺ Reset</button>` : '')
      : (list.length ? `
          <a class="plan-mini-btn" href="./web/render.html?slot=${encodeURIComponent(def.id)}" title="Read this slot in order">▶ Open</a>
          <button type="button" class="plan-mini-btn" data-plan-share data-slot="${def.id}" title="Share on WhatsApp">📤</button>` : '');
    return `
      <section class="plan-slot${edit ? ' is-edit' : ''}" data-slot="${def.id}">
        <header class="plan-slot-head">
          <div class="plan-slot-copy">
            <span class="plan-slot-title">${esc(def.label)}</span>${custom ? '<span class="plan-slot-tag">edited</span>' : ''}
            <span class="plan-slot-hint">${esc(def.hint)}</span>
          </div>
          <div class="plan-slot-actions">${actions}</div>
        </header>
        ${list.map((e, i) => renderRow(def.id, e, i, list.length, edit)).join('')}
        ${edit && !list.length ? '<p class="plan-slot-empty">Nothing here yet.</p>' : ''}
        ${edit ? `<button type="button" class="plan-add-btn" data-plan-add data-slot="${def.id}">＋ Add to ${esc(def.label)}</button>` : ''}
      </section>`;
  }

  function renderPrayer(prayerKey, opts) {
    opts = opts || {};
    const edit = !!opts.edit;
    const key = prayerKey === '*presleep' ? 'presleep' : prayerKey;
    let defs = P.slotsFor(key).slice();
    if (opts.withPresleep && key !== 'presleep' && key !== 'tahajjud') defs = defs.concat(P.slotsFor('presleep'));
    const count = defs.reduce((sum, d) => sum + P.entries(d.id).length, 0);
    let html = defs.map(d => renderSlot(d, edit)).join('');
    if (edit) {
      html = `<p class="plan-edit-note">Editing — changes are saved on this device. Slots you leave alone keep following the default plan.</p>` + html;
    } else if (!html) {
      html = `<p class="action-empty">Nothing is placed in this hour yet — tap <strong>✎ Edit</strong> to build it, or browse the Library.</p>`;
    }
    return { html, count };
  }

  // ── Toast ──────────────────────────────────────────────
  let toastTimer = null;
  function toast(msg) {
    let el = document.getElementById('plan-toast');
    if (!el) {
      el = document.createElement('div');
      el.id = 'plan-toast';
      el.className = 'plan-toast';
      el.setAttribute('role', 'status');
      document.body.appendChild(el);
    }
    el.textContent = msg;
    el.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => el.classList.remove('show'), 2200);
  }

  // ── The sheet ──────────────────────────────────────────
  const sheet = { mode: null, slotId: null, card: null, tab: 'suggested', q: '' };
  let sheetEl = null;

  function ensureSheet() {
    if (sheetEl) return sheetEl;
    sheetEl = document.createElement('div');
    sheetEl.id = 'plan-sheet';
    sheetEl.className = 'plan-sheet';
    sheetEl.setAttribute('aria-hidden', 'true');
    sheetEl.innerHTML = `
      <div class="plan-sheet-backdrop" data-sheet-close></div>
      <div class="plan-sheet-panel" role="dialog" aria-modal="true" aria-labelledby="plan-sheet-title">
        <div class="plan-sheet-handle"></div>
        <div class="plan-sheet-head">
          <span class="plan-sheet-title" id="plan-sheet-title"></span>
          <button type="button" class="plan-sheet-close" data-sheet-close aria-label="Done">Done</button>
        </div>
        <div class="plan-sheet-tabs" id="plan-sheet-tabs"></div>
        <div class="plan-sheet-search" id="plan-sheet-search">
          <input type="search" id="plan-sheet-q" placeholder="Search duʿās…" autocomplete="off">
        </div>
        <div class="plan-sheet-list" id="plan-sheet-list"></div>
      </div>`;
    document.body.appendChild(sheetEl);

    sheetEl.addEventListener('click', onSheetClick);
    sheetEl.querySelector('#plan-sheet-q').addEventListener('input', e => {
      sheet.q = e.target.value.trim().toLowerCase();
      renderSheetList();
    });
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && sheetEl.classList.contains('open')) closeSheet();
    });
    return sheetEl;
  }

  function openSheet() {
    ensureSheet();
    sheetEl.classList.add('open');
    sheetEl.setAttribute('aria-hidden', 'false');
    document.body.classList.add('plan-sheet-open');
    if (typeof global.updateNurFromDrawers === 'function') global.updateNurFromDrawers();
  }
  function closeSheet() {
    if (!sheetEl) return;
    sheetEl.classList.remove('open');
    sheetEl.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('plan-sheet-open');
    if (typeof global.updateNurFromDrawers === 'function') global.updateNurFromDrawers();
  }

  function slotTitle(slotId) {
    const d = P.SLOT_DEFS[slotId];
    return d ? `${P.PRAYER_NAME[d.prayer]} · ${d.label}` : '';
  }

  function openPicker(slotId) {
    ensureSheet();
    Object.assign(sheet, { mode: 'pick', slotId, card: null, tab: 'suggested', q: '' });
    sheetEl.querySelector('#plan-sheet-q').value = '';
    // Nothing tagged for this slot -> start in the Library instead of an empty tab.
    if (!P.suggestionsFor(slotId).length) sheet.tab = 'library';
    renderSheetChrome();
    renderSheetList();
    openSheet();
  }

  function openChooser(card) {
    ensureSheet();
    Object.assign(sheet, { mode: 'choose', slotId: null, card, tab: null, q: '' });
    renderSheetChrome();
    renderSheetList();
    openSheet();
  }

  function renderSheetChrome() {
    const title = sheetEl.querySelector('#plan-sheet-title');
    const tabs = sheetEl.querySelector('#plan-sheet-tabs');
    const search = sheetEl.querySelector('#plan-sheet-search');
    if (sheet.mode === 'choose') {
      title.textContent = 'Place in which slot?';
      tabs.innerHTML = `<p class="plan-sheet-sub">${esc(sheet.card.label)}</p>`;
      search.style.display = 'none';
      return;
    }
    title.textContent = slotTitle(sheet.slotId);
    const TABS = [['suggested', 'Suggested'], ['library', 'Library'], ['sets', 'Sets'], ['note', 'Note']];
    tabs.innerHTML = TABS.map(([id, label]) =>
      `<button type="button" class="plan-tab${sheet.tab === id ? ' active' : ''}" data-sheet-tab="${id}">${label}</button>`).join('');
    search.style.display = (sheet.tab === 'suggested' || sheet.tab === 'library') ? '' : 'none';
  }

  function matches(row) {
    if (!sheet.q) return true;
    const it = row.item;
    return [it.label, it.gloss, it.ref].some(s => s && String(s).toLowerCase().includes(sheet.q));
  }

  function cardRowHTML(row) {
    const added = P.has(sheet.slotId, { type: 'card', path: row.path });
    const it = row.item;
    return `
      <button type="button" class="plan-pick-row${added ? ' is-added' : ''}" data-pick-card="${esc(row.path)}">
        <span class="ai-grade ${GRADE_CLASS[it.grade] || 'ai-grade-none'}"></span>
        <span class="ai-body">
          <span class="ai-name">${esc(it.label)}</span>
          ${it.gloss ? `<span class="ai-gloss">${esc(it.gloss)}</span>` : ''}
          ${it.ref ? `<span class="ai-meta"><span class="ai-ref">${esc(it.ref)}</span></span>` : ''}
        </span>
        <span class="plan-pick-state">${added ? '✓' : '＋'}</span>
      </button>`;
  }

  function renderSheetList() {
    const host = sheetEl.querySelector('#plan-sheet-list');
    const keepScroll = host.scrollTop;
    let html = '';

    if (sheet.mode === 'choose') {
      html = P.allSlots().map(g => `
        <p class="plan-choose-group">${esc(g.name)}</p>
        ${g.slots.map(def => {
          const has = P.has(def.id, { type: 'card', path: sheet.card.path });
          return `<button type="button" class="plan-choose-row${has ? ' is-added' : ''}" data-choose-slot="${def.id}">
            <span class="plan-choose-label">${esc(def.label)}</span>
            <span class="plan-choose-count">${P.entries(def.id).length}</span>
            <span class="plan-pick-state">${has ? '✓' : '＋'}</span>
          </button>`;
        }).join('')}`).join('');
    } else if (sheet.tab === 'suggested') {
      const rows = P.suggestionsFor(sheet.slotId).filter(matches);
      html = rows.length ? rows.map(cardRowHTML).join('')
        : `<p class="plan-sheet-empty">${sheet.q ? 'No suggestion matches that.' : 'Nothing in the vault is tagged for this slot — try the Library tab.'}</p>`;
    } else if (sheet.tab === 'library') {
      const byCat = [];
      P.library().filter(matches).forEach(row => {
        let g = byCat[byCat.length - 1];
        if (!g || g.node !== row.node) { g = { node: row.node, rows: [] }; byCat.push(g); }
        g.rows.push(row);
      });
      html = byCat.length ? byCat.map(g => `
        <p class="plan-choose-group">${esc(g.node.icon || '')} ${esc(g.node.category)}</p>
        ${g.rows.map(cardRowHTML).join('')}`).join('')
        : '<p class="plan-sheet-empty">No duʿā matches that.</p>';
    } else if (sheet.tab === 'sets') {
      html = P.sets().map(s => {
        const added = P.has(sheet.slotId, { type: 'set', set: s.id });
        const n = (s.items || []).filter(i => i.type !== 'family').length;
        return `<button type="button" class="plan-pick-row${added ? ' is-added' : ''}" data-pick-set="${esc(s.id)}">
          <span class="ai-grade ai-grade-none"></span>
          <span class="ai-body">
            <span class="ai-name">${esc(s.name)}</span>
            ${s.summary ? `<span class="ai-gloss">${esc(s.summary)}</span>` : ''}
            <span class="ai-meta"><span class="ai-ref">SET · ${n} duʿās</span></span>
          </span>
          <span class="plan-pick-state">${added ? '✓' : '＋'}</span>
        </button>`;
      }).join('') || '<p class="plan-sheet-empty">No sets yet.</p>';
    } else if (sheet.tab === 'note') {
      html = `
        <form class="plan-note-form" id="plan-note-form">
          <p class="plan-sheet-sub">For dhikr or an act with no card — “Ṣalawāt”, “2 rakʿah sunnah”, “Istighfār”.</p>
          <input type="text" id="plan-note-text" placeholder="What to do" maxlength="120" required>
          <input type="text" id="plan-note-reps" placeholder="Count (optional) — e.g. ×100" maxlength="24">
          <button type="submit" class="plan-note-submit">＋ Add note</button>
        </form>`;
    }
    host.innerHTML = html;
    host.scrollTop = keepScroll;
  }

  function onSheetClick(e) {
    if (e.target.closest('[data-sheet-close]')) { closeSheet(); return; }

    const tab = e.target.closest('[data-sheet-tab]');
    if (tab) {
      sheet.tab = tab.dataset.sheetTab;
      renderSheetChrome();
      renderSheetList();
      return;
    }

    const cardBtn = e.target.closest('[data-pick-card]');
    if (cardBtn) {
      const entry = { type: 'card', path: cardBtn.dataset.pickCard };
      if (P.has(sheet.slotId, entry)) {
        const idx = P.entries(sheet.slotId).findIndex(x => x.type === 'card' && x.path === entry.path);
        P.removeAt(sheet.slotId, idx);
      } else P.add(sheet.slotId, entry);
      renderSheetList();
      return;
    }

    const setBtn = e.target.closest('[data-pick-set]');
    if (setBtn) {
      const entry = { type: 'set', set: setBtn.dataset.pickSet };
      if (P.has(sheet.slotId, entry)) {
        const idx = P.entries(sheet.slotId).findIndex(x => x.type === 'set' && x.set === entry.set);
        P.removeAt(sheet.slotId, idx);
      } else P.add(sheet.slotId, entry);
      renderSheetList();
      return;
    }

    const chooseBtn = e.target.closest('[data-choose-slot]');
    if (chooseBtn) {
      const slotId = chooseBtn.dataset.chooseSlot;
      const entry = { type: 'card', path: sheet.card.path };
      if (P.has(slotId, entry)) { toast('Already in ' + slotTitle(slotId)); return; }
      P.add(slotId, entry);
      closeSheet();
      toast('Added to ' + slotTitle(slotId));
    }
  }

  document.addEventListener('submit', e => {
    if (e.target.id !== 'plan-note-form') return;
    e.preventDefault();
    const text = document.getElementById('plan-note-text').value.trim();
    const reps = document.getElementById('plan-note-reps').value.trim();
    if (!text) return;
    const note = { type: 'note', note: text };
    if (reps) note.reps = reps;
    P.add(sheet.slotId, note);
    toast('Added to ' + slotTitle(sheet.slotId));
    renderSheetList();
  });

  // ── Clicks inside the Action list ──────────────────────
  function mount(listEl) {
    listEl.addEventListener('click', e => {
      const mv = e.target.closest('[data-plan-move]');
      if (mv) { if (!mv.disabled) P.move(mv.dataset.slot, +mv.dataset.idx, mv.dataset.planMove); return; }

      const rm = e.target.closest('[data-plan-remove]');
      if (rm) { P.removeAt(rm.dataset.slot, +rm.dataset.idx); return; }

      const add = e.target.closest('[data-plan-add]');
      if (add) { openPicker(add.dataset.slot); return; }

      const rs = e.target.closest('[data-plan-reset]');
      if (rs) {
        if (window.confirm('Go back to the default for "' + slotTitle(rs.dataset.slot) + '"? Your changes to this slot will be lost.')) {
          P.reset(rs.dataset.slot);
        }
        return;
      }

      const sh = e.target.closest('[data-plan-share]');
      if (sh) {
        const text = P.shareText(sh.dataset.slot, window.location.href);
        window.open('https://wa.me/?text=' + encodeURIComponent(text), '_blank', 'noopener');
      }
    });
  }

  global.SomPlanUI = { renderPrayer, mount, openPicker, openChooser, closeSheet, toast };
})(window);
