// =========================================================
// PLAN MODEL — the editable loadout behind Action view.
//   Loaded by index.html (Action view + Library "＋") and by
//   web/render.html (to read a slot as a sequence of cards).
//   Needs nav-data.js and default-plan.js loaded first.
//
//   A slot is  <prayer>.<role>  (see default-plan.js).
//   A slot holds an ordered list of entries:
//     { type:'card', path, reps? }   one duʿā card
//     { type:'set',  set }           a whole PRESET_COLLECTIONS set
//     { type:'note', note, reps? }   free text — dhikr or an act
//
//   What a reader sees = their own list for that slot if they
//   have edited it, otherwise the curated default. Edits are
//   copy-on-write per slot: touching a slot saves the whole list,
//   "Reset" deletes it and the slot follows the default again.
// =========================================================
(function (global) {
  'use strict';

  const STORE_KEY = 'som-plan-v1';
  const CARD_MARKER = 'web/render.html?file=';

  // ── The slot grid ──────────────────────────────────────
  // `windows` are the clock-window ids (sun-clock.js) a card's `time`
  // tag is matched against to offer it as a "Suggested" pick.
  const FARD = [
    { key: 'fajr',    name: 'Fajr',    windows: ['day-fajr-adhan', 'day-fajr-post'], until: 'Until Shurūq',   untilHint: 'The morning adhkār window — after the sunnah, until the sun rises.' },
    { key: 'dhuhr',   name: 'Ẓuhr',    windows: ['day-dhuhr'],                       until: 'Until ʿAṣr',     untilHint: 'The long afternoon.' },
    { key: 'asr',     name: 'ʿAṣr',    windows: ['day-asr-post'],                    until: 'Until Maghrib',  untilHint: 'The evening adhkār window.' },
    { key: 'maghrib', name: 'Maghrib', windows: ['night-maghrib'],                   until: 'Until ʿIshāʾ',   untilHint: 'The day handed over.' },
    { key: 'isha',    name: 'ʿIshāʾ',  windows: ['night-isha-post'],                 until: 'Until you sleep', untilHint: 'Settling, before the last words of the night.' }
  ];

  const ROLE_LABEL = {
    before: ['Before Ṣalāh', 'Adhān to iqāmah, and what is said before the takbīr.'],
    during: ['During Ṣalāh', 'Inside the prayer itself.'],
    after:  ['After Ṣalāh',  'Straight after the taslīm.']
  };

  const PRAYER_ORDER = ['fajr', 'shuruq', 'dhuhr', 'asr', 'maghrib', 'isha', 'tahajjud', 'presleep'];
  const SLOT_DEFS = {};   // slotId -> { id, prayer, role, label, hint, windows, family }
  const BY_PRAYER = {};   // prayerKey -> [slotDef]
  const PRAYER_NAME = {};

  function defineSlot(prayer, role, label, hint, windows, family) {
    const def = { id: prayer + '.' + role, prayer, role, label, hint, windows: windows || [], family: family || null };
    SLOT_DEFS[def.id] = def;
    (BY_PRAYER[prayer] = BY_PRAYER[prayer] || []).push(def);
  }

  FARD.forEach(p => {
    PRAYER_NAME[p.key] = p.name;
    ['before', 'during', 'after'].forEach(role =>
      defineSlot(p.key, role, ROLE_LABEL[role][0], ROLE_LABEL[role][1],
        role === 'before' && p.key === 'fajr' ? ['day-fajr-adhan'] : [], ROLE_LABEL[role][0]));
    defineSlot(p.key, 'between', p.until, p.untilHint, p.key === 'fajr' ? ['day-fajr-post'] : p.windows);
  });
  PRAYER_NAME.shuruq = 'Shurūq';
  defineSlot('shuruq', 'between', 'Shurūq → Ẓuhr', 'Ḍuḥā, and the working day being earned.', ['day-duha']);
  PRAYER_NAME.tahajjud = 'Tahajjud';
  defineSlot('tahajjud', 'main', 'Night prayer', 'The last two-thirds of the night.', ['night-2nd-third', 'night-last-third']);
  PRAYER_NAME.presleep = 'Before sleep';
  defineSlot('presleep', 'main', 'Before sleep', 'In bed, the last words before your eyes close.', ['night-presleep']);

  // ── Storage ────────────────────────────────────────────
  let userPlan = load();
  let version = 0;
  const listeners = [];

  function load() {
    try {
      const raw = JSON.parse(localStorage.getItem(STORE_KEY) || 'null');
      if (raw && raw.slots && typeof raw.slots === 'object') return raw;
    } catch (e) { /* private mode / corrupt */ }
    return { slots: {} };
  }
  function persist() {
    try { localStorage.setItem(STORE_KEY, JSON.stringify(userPlan)); } catch (e) { /* private mode */ }
    version++;
    listeners.forEach(fn => { try { fn(); } catch (e) { console.error(e); } });
  }

  // ── Entries ────────────────────────────────────────────
  function normalise(raw) {
    if (!raw) return null;
    if (typeof raw === 'string') return { type: 'card', path: raw };
    if (raw.type) return Object.assign({}, raw);
    if (raw.set) return { type: 'set', set: raw.set };
    if (raw.note) { const n = { type: 'note', note: raw.note }; if (raw.reps) n.reps = raw.reps; return n; }
    if (raw.path) { const c = { type: 'card', path: raw.path }; if (raw.reps) c.reps = raw.reps; return c; }
    return null;
  }

  function entryKey(e) {
    return e.type === 'card' ? 'c:' + e.path : e.type === 'set' ? 's:' + e.set : 'n:' + e.note;
  }

  function defaultEntries(slotId) {
    const def = SLOT_DEFS[slotId];
    if (!def || typeof SOM_DEFAULT_PLAN === 'undefined') return [];
    const out = [];
    const seen = new Set();
    const push = raw => {
      const e = normalise(raw);
      if (!e || seen.has(entryKey(e))) return;
      seen.add(entryKey(e));
      out.push(e);
    };
    if (def.role === 'before' || def.role === 'during' || def.role === 'after') {
      (SOM_DEFAULT_PLAN['*.' + def.role] || []).forEach(push);
    }
    (SOM_DEFAULT_PLAN[slotId] || []).forEach(push);
    return out;
  }

  function entries(slotId) {
    const mine = userPlan.slots[slotId];
    if (Array.isArray(mine)) return mine.map(normalise).filter(Boolean);
    return defaultEntries(slotId);
  }
  function isCustom(slotId) { return Array.isArray(userPlan.slots[slotId]); }

  function write(slotId, list) {
    if (!SLOT_DEFS[slotId]) return;
    userPlan.slots[slotId] = list;
    persist();
  }
  function reset(slotId) { delete userPlan.slots[slotId]; persist(); }

  function has(slotId, entry) {
    const k = entryKey(normalise(entry));
    return entries(slotId).some(e => entryKey(e) === k);
  }
  function add(slotId, entry) {
    const e = normalise(entry);
    if (!e || has(slotId, e)) return false;
    write(slotId, entries(slotId).concat([e]));
    return true;
  }
  function removeAt(slotId, index) {
    const list = entries(slotId);
    if (index < 0 || index >= list.length) return;
    list.splice(index, 1);
    write(slotId, list);
  }
  function move(slotId, index, dir) {
    const list = entries(slotId);
    const to = dir === 'up' ? index - 1 : index + 1;
    if (index < 0 || to < 0 || to >= list.length) return;
    [list[index], list[to]] = [list[to], list[index]];
    write(slotId, list);
  }

  // ── The library, flattened ─────────────────────────────
  let libCache = null;
  function cardPath(itemPath) {
    if (!itemPath || !itemPath.startsWith(CARD_MARKER)) return null;
    return decodeURIComponent(itemPath.slice(CARD_MARKER.length));
  }
  // [{ item, path, node, family }] for every atomic card in the menu tree.
  function library() {
    if (libCache) return libCache;
    libCache = [];
    if (typeof VAULT_NAVIGATION_TREE === 'undefined') return libCache;
    VAULT_NAVIGATION_TREE.forEach(node => {
      if (node.category === 'Documentation') return;
      let family = null;
      node.items.forEach(item => {
        if (item.type === 'family') { family = item; return; }
        const path = cardPath(item.path);
        if (path) libCache.push({ item, path, node, family });
      });
    });
    return libCache;
  }
  function libraryItem(path) {
    return library().find(r => r.path === path) || null;
  }
  function sets() {
    return (typeof PRESET_COLLECTIONS !== 'undefined') ? PRESET_COLLECTIONS : [];
  }
  function setById(id) { return sets().find(s => s.id === id) || null; }

  function prettyFromPath(path) {
    const base = String(path).split('/').pop().replace(/\.md$/, '').replace(/^[0-9a-z]{1,2}[_-](?=[a-z])/i, '');
    return base.replace(/[-_]+/g, ' ').replace(/^\w/, c => c.toUpperCase());
  }

  // Everything the UI needs to draw one entry.
  function resolve(entry) {
    const e = normalise(entry);
    if (!e) return null;
    if (e.type === 'set') {
      const s = setById(e.set);
      const count = s ? (s.items || []).filter(i => i.type !== 'family').length : 0;
      return { type: 'set', key: entryKey(e), label: s ? s.name : e.set, gloss: s ? (s.summary || '') : 'Set not found',
               count, href: 'web/render.html?collection=' + encodeURIComponent(e.set), missing: !s };
    }
    if (e.type === 'note') {
      return { type: 'note', key: entryKey(e), label: e.note, reps: e.reps || '' };
    }
    const hit = libraryItem(e.path);
    const item = hit ? hit.item : null;
    return {
      type: 'card', key: entryKey(e), path: e.path,
      label: e.label || (item && item.label) || prettyFromPath(e.path),
      gloss: item ? item.gloss : '', ref: item ? item.ref : '', grade: item ? item.grade : '',
      reps: e.reps || (item && item.reps) || '',
      href: 'web/render.html?file=' + encodeURI(e.path)
    };
  }

  // ── Suggestions for the picker ─────────────────────────
  // Cards whose narration already points at this slot: same family
  // (Before/During/After Ṣalāh), a window the slot covers, or a
  // *salah tag for the three prayer-anchored roles.
  function suggestionsFor(slotId) {
    const def = SLOT_DEFS[slotId];
    if (!def) return [];
    const wanted = new Set(def.windows);
    const salahRole = def.role === 'before' || def.role === 'during' || def.role === 'after';
    const scored = [];
    library().forEach(row => {
      // Only windows the item names itself — the *salah / *adhan wildcards
      // would otherwise make every such card a suggestion for every slot.
      const explicit = (row.item.time || []).filter(t => t.charAt(0) !== '*');
      let score = 0;
      if (salahRole && row.family && row.family.label === def.family) score = 3;
      else if (explicit.some(w => wanted.has(w))) score = 2;
      else if (salahRole && (row.item.time || []).some(t => t === '*salah' || (def.role === 'before' && t === '*adhan'))) score = 1;
      if (score) scored.push({ row, score });
    });
    return scored.sort((a, b) => b.score - a.score).map(s => s.row);
  }

  // ── Reading a slot as a sequence of cards ──────────────
  // Same shape render.html builds collection pages from.
  function asCollection(slotId) {
    const def = SLOT_DEFS[slotId];
    if (!def) return null;
    const items = [];
    entries(slotId).forEach(raw => {
      const r = resolve(raw);
      if (!r) return;
      if (r.type === 'card') items.push({ label: r.label, path: r.path });
      else if (r.type === 'set') {
        const s = setById(raw.set);
        if (s) (s.items || []).forEach(i => items.push(i));
      } else items.push({ type: 'family', label: r.label + (r.reps ? ' ' + r.reps : ''), icon: '✦' });
    });
    return { id: 'slot:' + slotId, name: PRAYER_NAME[def.prayer] + ' · ' + def.label, summary: def.hint, items };
  }

  function shareText(slotId, baseUrl) {
    const def = SLOT_DEFS[slotId];
    const lines = ['*' + PRAYER_NAME[def.prayer] + ' · ' + def.label + '* ⚖️', ''];
    let n = 0;
    entries(slotId).forEach(raw => {
      const r = resolve(raw);
      if (!r) return;
      n++;
      const reps = r.reps ? ' ' + r.reps : '';
      if (r.type === 'note') lines.push(n + '. ' + r.label + reps);
      else lines.push(n + '. ' + r.label + reps + '\n' + new URL(r.href, baseUrl).href);
    });
    lines.push('', '— shared from Follow the Steps ✦ steps of Muḥammad ﷺ');
    return lines.join('\n');
  }

  global.SomPlan = {
    PRAYER_ORDER, PRAYER_NAME, SLOT_DEFS,
    slotsFor: prayer => BY_PRAYER[prayer] || [],
    allSlots: () => PRAYER_ORDER.map(p => ({ prayer: p, name: PRAYER_NAME[p], slots: BY_PRAYER[p] || [] })),
    entries, defaultEntries, isCustom, reset, has, add, removeAt, move, write,
    resolve, library, sets, setById, suggestionsFor, asCollection, shareText,
    onChange: fn => listeners.push(fn),
    get version() { return version; }
  };
})(window);
