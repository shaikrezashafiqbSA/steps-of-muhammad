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
  // A slot is drawn the way the Library draws a category: a collapsible
  // card, family headings inside it, and the Library's own duʿā rows
  // (grade tint, three names, citation) — index.html → somLibraryRow.

  // Which slot is open on the current tab. undefined = not chosen yet
  // (the first filled one opens), '' = the reader closed them all.
  let openSlot;

  const SET_FALLBACK = { grade: '', tier: '' };

  // The Library row for one entry, in view mode (a link) or edit mode (static).
  function entryRow(slotId, r, inFamily, edit) {
    let item;
    let href = null;
    if (r.type === 'card') {
      item = Object.assign({ label: r.label, gloss: '', ref: '' }, r.item || {});
      item.label = r.label;
      if (r.reps) item.reps = r.reps;
      item.num = undefined;     // the Library's step numbers belong to its own sequences
      href = './' + r.href + '&from=' + encodeURIComponent(slotId);
    } else if (r.type === 'set') {
      item = Object.assign({}, SET_FALLBACK, { type: 'set', label: r.label, gloss: r.gloss, ref: 'SET · ' + r.count + ' duʿā' + (r.count === 1 ? '' : 's') });
      href = './' + r.href;
    } else {
      item = Object.assign({}, SET_FALLBACK, { type: 'note', label: r.label, gloss: '', ref: '', reps: r.reps });
    }
    return global.somLibraryRow(item, {
      tag: (edit || !href) ? 'div' : 'a',
      attrs: (edit || !href) ? '' : `href="${esc(href)}"`,
      inFamily
    });
  }

  function familyHeading(family) {
    return `<div class="family-divider family-olive">
      <span>${esc(family.icon || '📚')}</span>
      <span class="family-divider-label">${esc(family.label)}</span>
    </div>`;
  }

  // What goes inside a slot, whichever card or sub-section it is drawn in:
  // its tools, then its rows. Consecutive cards from the same Library
  // family sit under one heading.
  function slotInner(def, edit) {
    const list = P.entries(def.id);
    const custom = P.isCustom(def.id);

    let runKey = null;
    const rows = list.map((e, i) => {
      const r = P.resolve(e);
      if (!r) return '';
      let heading = '';
      let inFamily = false;
      // The slot's own title already says "Before Ṣalāh" etc., so that
      // family heading would only repeat it.
      const fam = (r.type === 'card' && r.family && r.family.label !== def.family) ? r.family : null;
      if (fam) {
        const key = (r.node ? r.node.category : '') + '|' + fam.label;
        if (key !== runKey) { heading = familyHeading(fam); runKey = key; }
        inFamily = true;
      } else {
        runKey = null;
      }
      const row = entryRow(def.id, r, inFamily, edit);
      if (!edit) return heading + row;
      return heading + `
        <div class="plan-row">
          <span class="plan-move">
            <button type="button" class="plan-move-btn" data-plan-move="up" data-slot="${def.id}" data-idx="${i}" ${i === 0 ? 'disabled' : ''} aria-label="Move up">▲</button>
            <button type="button" class="plan-move-btn" data-plan-move="down" data-slot="${def.id}" data-idx="${i}" ${i === list.length - 1 ? 'disabled' : ''} aria-label="Move down">▼</button>
          </span>
          <div class="plan-row-main">${row}</div>
          <button type="button" class="plan-remove" data-plan-remove data-slot="${def.id}" data-idx="${i}" aria-label="Remove">✕</button>
        </div>`;
    }).join('');

    const tools = edit
      ? (custom ? `<div class="plan-slot-tools"><button type="button" class="plan-mini-btn" data-plan-reset data-slot="${def.id}" title="Go back to the default for this slot">↺ Reset to default</button></div>` : '')
      : (list.length ? `
          <div class="plan-slot-tools">
            <a class="plan-mini-btn" href="./web/render.html?slot=${encodeURIComponent(def.id)}" title="Read this slot in order">▶ Open in order</a>
            <button type="button" class="plan-mini-btn" data-plan-share data-slot="${def.id}" title="Share on WhatsApp">📤 Share</button>
          </div>` : '');

    return {
      count: list.length,
      custom,
      html: `${tools}${rows}
        ${edit && !list.length ? '<p class="plan-slot-empty">Nothing here yet.</p>' : ''}
        ${edit ? `<button type="button" class="plan-add-btn" data-plan-add data-slot="${def.id}">＋ Add to ${esc(def.label)}</button>` : ''}`
    };
  }

  const CHEVRON = `<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>`;

  function titleHTML(label, ar, custom) {
    return `${esc(label)}${ar ? ` <span class="root-node-title-sep">·</span> <span class="root-node-title-ar" lang="ar" dir="rtl">${esc(ar)}</span>` : ''}${custom ? ' <span class="plan-slot-tag">edited</span>' : ''}`;
  }

  // A top-level collapsible card, drawn like a Library category.
  function topCard(id, icon, titleInner, hint, count, bodyHTML, isOpen) {
    return `
      <div class="root-node root-node-card plan-slot-node border border-[#E6DCD0] backdrop-blur-md rounded-xl overflow-hidden transition-all duration-200${isOpen ? ' active' : ''}"
           id="slot-${id.replace('.', '-')}" data-slot="${id}">
        <button type="button" data-slot-toggle="${id}" class="root-node-head w-full flex items-center justify-between gap-3 p-4 text-left group" aria-expanded="${isOpen ? 'true' : 'false'}">
          <div class="node-icon-tile">${icon}</div>
          <div class="space-y-1 pr-2 flex-1 min-w-0">
            <span class="root-node-title">${titleInner}</span>
            <p class="root-node-desc">— ${esc(hint)}</p>
          </div>
          <span class="plan-slot-count">${count}</span>
          <div class="root-node-chev">
            <span class="chevron-icon inline-block transform origin-center">${CHEVRON}</span>
          </div>
        </button>
        <div class="branch-container bg-[#FFFBF1]/00">
          <div class="p-2 space-y-0.5 border-t border-[#E6DCD0]">${bodyHTML}</div>
        </div>
      </div>`;
  }

  // A collapsible inside the Ṣalāh card (Before / During / After).
  // Deliberately not .root-node / .branch-container: those rules cascade to
  // every descendant and would force these open with their parent.
  function subCard(def, inner, isOpen) {
    return `
      <div class="plan-sub${isOpen ? ' active' : ''}" data-slot="${def.id}">
        <button type="button" data-sub-toggle="${def.id}" class="family-divider family-olive plan-sub-head" aria-expanded="${isOpen ? 'true' : 'false'}">
          <span>${def.icon}</span>
          <span class="family-divider-label">${titleHTML(def.label, def.ar, inner.custom)}</span>
          <span class="plan-slot-count plan-sub-count">${inner.count}</span>
          <span class="plan-chev">${CHEVRON}</span>
        </button>
        <div class="plan-sub-body">
          <div class="plan-sub-inner space-y-0.5">${inner.html}</div>
        </div>
      </div>`;
  }

  // Which Ṣalāh sub-section is open: undefined = not chosen yet (the first
  // filled one opens), '' = the reader closed them all.
  let openSub;

  function renderPrayer(prayerKey, opts) {
    opts = opts || {};
    const edit = !!opts.edit;
    const key = prayerKey === '*presleep' ? 'presleep' : prayerKey;
    let defs = P.slotsFor(key).slice();
    if (opts.withPresleep && key !== 'presleep' && key !== 'tahajjud') defs = defs.concat(P.slotsFor('presleep'));
    const count = defs.reduce((sum, d) => sum + P.entries(d.id).length, 0);

    // Before / During / After fold into one Ṣalāh card; everything else
    // (the stretch until the next prayer, tahajjud, before sleep) stays its own card.
    const salahDefs = defs.filter(d => d.role === 'before' || d.role === 'during' || d.role === 'after');
    const others = defs.filter(d => salahDefs.indexOf(d) === -1);
    const tops = [];
    if (salahDefs.length) tops.push({ id: 'salah', group: true, defs: salahDefs });
    others.forEach(d => tops.push({ id: d.id, group: false, defs: [d] }));
    tops.forEach(t => { t.total = t.defs.reduce((n, d) => n + P.entries(d.id).length, 0); });

    // Open: the card the reader chose, else the first that has something in it.
    const chosen = openSlot === '' || tops.some(t => t.id === openSlot);
    const open = chosen ? openSlot : ((tops.find(t => t.total) || {}).id || '');

    const subChosen = openSub === '' || salahDefs.some(d => d.id === openSub);
    const subOpen = subChosen ? openSub : ((salahDefs.find(d => P.entries(d.id).length) || {}).id || '');

    let html = tops.map(t => {
      const isOpen = edit || t.id === open;
      if (!t.group) {
        const d = t.defs[0];
        if (!t.total && !edit) return '';
        const inner = slotInner(d, edit);
        return topCard(d.id, d.icon, titleHTML(d.label, d.ar, inner.custom), d.hint, inner.count, inner.html, isOpen);
      }
      if (!t.total && !edit) return '';
      const subs = t.defs.map(d => {
        const inner = slotInner(d, edit);
        if (!inner.count && !edit) return '';
        return subCard(d, inner, edit || d.id === subOpen);
      }).join('');
      const anyCustom = t.defs.some(d => P.isCustom(d.id));
      return topCard('salah', '🕌', titleHTML('Ṣalāh', 'الصَّلَاة', anyCustom),
        'Before, during and after the prayer', t.total, subs, isOpen);
    }).join('');

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
  const sheet = { mode: null, slotId: null, card: null, tab: 'library', q: '', openNode: null };
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
    sheetEl.addEventListener('keydown', e => {
      const row = e.target.closest && e.target.closest('[data-pick-card]');
      if (row && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); row.click(); }
    });
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
    Object.assign(sheet, { mode: 'pick', slotId, card: null, tab: 'library', q: '', openNode: null });
    sheetEl.querySelector('#plan-sheet-q').value = '';
    // Start with the category that already has cards tagged for this slot open.
    const first = P.suggestionsFor(slotId)[0];
    if (first && typeof VAULT_NAVIGATION_TREE !== 'undefined') {
      const idx = VAULT_NAVIGATION_TREE.indexOf(first.node);
      if (idx !== -1) sheet.openNode = 'pick-node-' + idx;
    }
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
    const TABS = [['library', 'Library'], ['sets', 'Sets'], ['note', 'Note']];
    tabs.innerHTML = TABS.map(([id, label]) =>
      `<button type="button" class="plan-tab${sheet.tab === id ? ' active' : ''}" data-sheet-tab="${id}">${label}</button>`).join('');
    search.style.display = sheet.tab === 'library' ? '' : 'none';
  }

  function matches(item) {
    if (!sheet.q) return true;
    return [item.label, item.gloss, item.ref].some(v => v && String(v).toLowerCase().includes(sheet.q));
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
    } else if (sheet.tab === 'library') {
      // The Library's own accordion (index.html → renderLibraryNodes), so
      // picking looks and behaves exactly like browsing.
      const suggested = new Set(P.suggestionsFor(sheet.slotId).map(r => r.path));
      html = global.renderLibraryNodes({
        idPrefix: 'pick-node-',
        openId: sheet.openNode,
        picker: {
          has: path => P.has(sheet.slotId, { type: 'card', path }),
          suggested,
          match: matches,
          openAll: !!sheet.q
        }
      }) || '<p class="plan-sheet-empty">No duʿā matches that.</p>';
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

    const nodeBtn = e.target.closest('[data-pick-node]');
    if (nodeBtn) {
      const id = nodeBtn.dataset.pickNode;
      sheet.openNode = sheet.openNode === id ? null : id;
      sheetEl.querySelectorAll('.root-node').forEach(n => n.classList.toggle('active', n.id === sheet.openNode));
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
      const editing = !!listEl.querySelector('.plan-edit-note');
      const refreshLit = () => { if (typeof global.updateNurFromDrawers === 'function') global.updateNurFromDrawers(); };

      // Before / During / After inside the Ṣalāh card.
      const subTog = e.target.closest('[data-sub-toggle]');
      if (subTog) {
        const sub = subTog.closest('.plan-sub');
        const id = sub.dataset.slot;
        if (editing) {
          sub.classList.toggle('active');   // edit mode: each folds on its own
        } else {
          openSub = (openSub === id || (openSub === undefined && sub.classList.contains('active'))) ? '' : id;
          listEl.querySelectorAll('.plan-sub').forEach(n => n.classList.toggle('active', n.dataset.slot === openSub));
        }
        subTog.setAttribute('aria-expanded', sub.classList.contains('active') ? 'true' : 'false');
        return;
      }

      // The top-level cards: the Ṣalāh card, the stretch until the next prayer, …
      const tog = e.target.closest('[data-slot-toggle]');
      if (tog) {
        const id = tog.dataset.slotToggle;
        const node = tog.closest('.plan-slot-node');
        if (editing) {
          node.classList.toggle('active');
        } else {
          openSlot = (openSlot === id || (openSlot === undefined && node.classList.contains('active'))) ? '' : id;
          listEl.querySelectorAll('.plan-slot-node').forEach(n => n.classList.toggle('active', n.dataset.slot === openSlot));
        }
        tog.setAttribute('aria-expanded', node.classList.contains('active') ? 'true' : 'false');
        refreshLit();
        return;
      }

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
