/* ════════════════════════════════════════════════
   Inline tooltips — used by render.html
   Authoring syntax:   {{ word | short explanation }}
   Works anywhere text does: paragraphs, headings, <summary> lines, lists.
   Hover (desktop) or tap/click shows the note; click again, click elsewhere
   or press Esc to dismiss. Escape a literal pair with \{{ .
   ════════════════════════════════════════════════ */
(function () {
  const css = `
    .som-tip {
      border-bottom: 1px dotted var(--accent-ochre, #B08A4B); cursor: help;
    }
    .som-tip::after {
      content: '!'; display: inline-flex; align-items: center; justify-content: center;
      width: 0.8em; height: 0.8em; margin-left: 0.15em; vertical-align: super; line-height: 0;
      border-radius: 50%; background: var(--accent-ochre, #B08A4B); color: #FFFBF1;
      font: 700 0.5em/1 'JetBrains Mono', ui-monospace, monospace; font-style: normal;
      letter-spacing: 0; text-transform: none; transition: transform 0.15s ease;
    }
    .som-tip:hover::after, .som-tip.is-open::after { transform: scale(1.25); }
    .som-tip:focus-visible { outline: 2px solid var(--accent-ochre, #B08A4B); outline-offset: 2px; border-radius: 3px; }
    #som-tip-pop {
      position: fixed; z-index: 400; max-width: min(19rem, calc(100vw - 16px)); display: none;
      padding: 0.6rem 0.8rem; border-radius: 10px; pointer-events: none;
      background: #3A2E2B; color: #FFFBF1; box-shadow: 0 8px 24px rgba(58, 46, 43, 0.35);
      font: 500 0.78rem/1.5 'Inter', system-ui, sans-serif; letter-spacing: 0.01em; text-transform: none;
    }
    #som-tip-pop::before {
      content: ''; position: absolute; left: var(--arrow-x, 50%); width: 10px; height: 10px; background: inherit;
      transform: translateX(-50%) rotate(45deg);
    }
    .som-tip.no-bang::after { display: none; }
    .som-tip-ar {
      display: block; margin-bottom: 0.35rem; text-align: center; direction: rtl;
      font: 400 1.25rem/1.9 'UthmanicHafs', 'Amiri Quran', 'Scheherazade New', serif; color: #FFE9B8;
    }
    .som-tip-ref {
      display: block; margin-top: 0.4rem; font: 700 0.58rem/1 'JetBrains Mono', ui-monospace, monospace;
      letter-spacing: 0.08em; text-transform: uppercase; color: #D9B869;
    }
    #som-tip-pop.above::before { bottom: -5px; }
    #som-tip-pop.below::before { top: -5px; }

    /* Glossary links (content/kalima): {{ word | @slug }} and the 4th field of a word stack */
    .som-tip[data-kalima]::after { content: 'i'; font-family: Georgia, serif; font-style: italic; }
    .w[data-kalima] { cursor: help; border-bottom: 1px dotted var(--accent-ochre, #B08A4B); }
    .w[data-kalima]:focus-visible { outline: 2px solid var(--accent-ochre, #B08A4B); outline-offset: 2px; }
    /* A glossary entry is a small card: the same renderer as a full page (word stacks, drawers,
       embeds, tooltips), in the page's own light styling, just compact. */
    #som-tip-pop.rich {
      pointer-events: auto; width: min(28rem, calc(100vw - 16px)); max-width: none; padding: 0; text-align: left;
      background: var(--bg-cream, #FFFBF1); color: var(--text-espresso, #3A2E2B);
      border: 1px solid var(--divider-sand, #E6DCD0); box-shadow: 0 10px 30px rgba(125, 82, 67, 0.22);
      font-weight: 400; letter-spacing: 0.01em;
    }
    #som-tip-pop.rich::before { border: 1px solid var(--divider-sand, #E6DCD0); }
    .som-kal-scroll {
      max-height: min(60vh, 34rem); overflow-y: auto; overscroll-behavior: contain; border-radius: 10px;
      padding: 0.8rem 0.95rem 0.7rem; background: var(--bg-cream, #FFFBF1);
    }
    .som-kal-status { margin: 0; color: var(--text-taupe, #7A6F6C); font-size: 0.8rem; font-style: italic; }
    .som-kal-back {
      display: inline-block; margin: 0 0 0.5rem; padding: 0.2rem 0.55rem; border: 1px solid var(--divider-sand, #E6DCD0);
      border-radius: 999px; background: none; color: var(--structural, #7D5243); cursor: pointer;
      font: 700 0.6rem/1.4 'JetBrains Mono', ui-monospace, monospace; letter-spacing: 0.06em; text-transform: uppercase;
    }
    .som-kal-foot {
      display: block; margin-top: 0.6rem; font: 700 0.58rem/1 'JetBrains Mono', ui-monospace, monospace;
      letter-spacing: 0.08em; text-transform: uppercase; color: var(--accent-ochre, #B08A4B); text-decoration: none;
    }
    .som-inline-note {
      display: block; margin: 0.1rem 0 0.6rem; padding: 0.4rem 0.65rem; border-left: 3px solid var(--accent-ochre, #B08A4B);
      border-radius: 0 4px 4px 0; background: rgba(176, 138, 75, 0.1); color: var(--text-espresso, #3A2E2B);
      font: 500 0.74rem/1.5 'Inter', system-ui, sans-serif; font-style: normal;
    }

    /* Compact scale for the card inside the popover. The id in front outranks the page's zoom / reading-mode rules. */
    #som-tip-pop .som-kal-body h1 { font-size: 1.05rem; margin: 0 0 0.5rem; padding-bottom: 0.4rem; border-bottom-width: 1px; }
    #som-tip-pop .som-kal-body h2 { font-size: 0.9rem; margin: 0.9rem 0 0.4rem; }
    #som-tip-pop .som-kal-body h3 { font-size: 0.82rem; margin: 0.7rem 0 0.3rem; }
    #som-tip-pop .som-kal-body p, #som-tip-pop .som-kal-body ul, #som-tip-pop .som-kal-body ol { font-size: 0.8rem; line-height: 1.6; margin-bottom: 0.6rem; }
    #som-tip-pop .som-kal-body blockquote { font-size: 0.78rem; padding: 0.5rem 0.7rem; margin: 0.6rem 0; }
    #som-tip-pop .som-kal-body .ayah { padding: 0.7rem 0.6rem 0.5rem; margin: 0.7rem 0; gap: 0.25rem 0.5rem; border-radius: 8px; }
    #som-tip-pop .som-kal-body .ayah .w { min-width: 44px; padding: 0.2rem 0.1rem; }
    #som-tip-pop .som-kal-body .ayah .w > b { font-size: 1.55rem; line-height: 1.55; }
    #som-tip-pop .som-kal-body .ayah .w > i { font-size: 0.66rem; max-width: 84px; }
    #som-tip-pop .som-kal-body .ayah .w > u { font-size: 0.6rem; max-width: 84px; }
    #som-tip-pop .som-kal-body details { padding: 0.55rem 0.7rem; margin: 0.7rem 0; }
    #som-tip-pop .som-kal-body summary { font-size: 0.75rem; }
    #som-tip-pop .som-kal-body iframe { width: 100%; height: min(320px, 55vh); border: 0; border-radius: 6px; }
    #som-tip-pop .som-kal-body .video-card { margin-bottom: 0.7rem; }
    #som-tip-pop .som-kal-body .video-card iframe { height: auto; border-radius: 0; }
    #som-tip-pop .som-kal-body .video-pin-toggle { display: none; }   /* a popover can't pin a video */
    #som-tip-pop .som-kal-body > :last-child { margin-bottom: 0; }`;

  const style = document.createElement('style');
  style.textContent = css;
  document.head.appendChild(style);

  const TIP_RE = /(?<!\\)\{\{\s*([^{}|]+?)\s*\|\s*([^{}]+?)\s*\}\}/g;

  // Rewrites {{ word | note }} inside rootEl. Runs on rendered HTML, so it also
  // reaches text inside raw <summary>/<details> blocks that markdown skips.
  window.somParseTips = function (rootEl) {
    if (!rootEl.innerHTML.includes('{{')) return;
    // Code samples (e.g. the authoring guide) must show the syntax, not run it.
    const parts = rootEl.innerHTML.split(/(<pre[\s\S]*?<\/pre>|<code[\s\S]*?<\/code>)/);
    rootEl.innerHTML = parts.map((seg, i) => i % 2 ? seg : seg.replace(TIP_RE, (m, word, note) => {
      // {{ word | @slug }} → opens content/kalima/slug.md instead of a typed note
      const k = note.trim().match(/^@([a-z0-9-]+)$/i);
      if (k) return `<span class="som-tip" tabindex="0" role="button" aria-label="${word.replace(/<[^>]+>/g, '')} — open glossary entry" data-kalima="${k[1].toLowerCase()}">${word}</span>`;
      const text =note.replace(/<[^>]+>/g, '').replace(/"/g, '&quot;');
      return `<span class="som-tip" tabindex="0" role="button" aria-label="${word.replace(/<[^>]+>/g, '')} — tap for explanation" data-tip="${text}">${word}</span>`;
    }).replace(/\\\{\{/g, '{{')).join('');
  };

  let pop = null, current = null, pinned = false;
  let trail = [];   // glossary slugs opened one from another inside the popover, for "← Back"

  function ensurePop() {
    if (!pop) {
      pop = document.createElement('div'); pop.id = 'som-tip-pop'; pop.setAttribute('role', 'tooltip'); document.body.appendChild(pop);
      // an embed or font finishing inside a glossary entry changes its height: keep it anchored to the word
      pop.addEventListener('load', () => { if (current && pop.classList.contains('rich')) place(current); }, true);
    }
    return pop;
  }

  // ── Glossary entries: content/kalima/<slug>.md, fetched once and cached as markdown ──
  // (rendered fresh on every open, so embeds inside an entry start clean each time)
  const KAL = new Map();
  function kalimaMD(slug) {
    if (!KAL.has(slug)) {
      KAL.set(slug, fetch('../content/kalima/' + slug + '.md')
        .then(r => { if (!r.ok) throw new Error('HTTP ' + r.status); return r.text(); })
        .then(md => md.replace(/^::meta\s*\n[\s\S]*?\n::\s*\n?/, ''))
        .catch(() => { KAL.delete(slug); return null; }));
    }
    return KAL.get(slug);
  }

  function place(el) {
    const p = pop, r = el.getBoundingClientRect(), w = p.offsetWidth, h = p.offsetHeight, pad = 8;
    const left = Math.max(pad, Math.min(r.left + r.width / 2 - w / 2, window.innerWidth - w - pad));
    const above = r.top - h - 12 >= pad;
    p.classList.toggle('above', above); p.classList.toggle('below', !above);
    p.style.left = left + 'px';
    p.style.top = (above ? r.top - h - 10 : r.bottom + 10) + 'px';
    p.style.setProperty('--arrow-x', Math.max(14, Math.min(r.left + r.width / 2 - left, w - 14)) + 'px');
  }

  // Draws the entry as a mini card: the same pipeline render.html uses for a page (somRenderInto),
  // so word stacks, drawers, QuranWBW / video embeds, embedded cards and tooltips all work inside it.
  function showKalima(el, p, slug) {
    p.classList.add('rich');
    p.innerHTML = '<div class="som-kal-scroll"><p class="som-kal-status">Loading…</p></div>';
    p.style.display = 'block'; p.style.left = '0px'; p.style.top = '0px';
    place(el);
    kalimaMD(slug).then(md => {
      if (current !== el || trail[trail.length - 1] !== slug) return;   // moved on while it loaded
      const box = document.createElement('div'); box.className = 'som-kal-scroll';
      if (trail.length > 1) {
        const back = document.createElement('button'); back.type = 'button'; back.className = 'som-kal-back'; back.textContent = '← Back';
        box.appendChild(back);
      }
      if (md == null) {
        box.insertAdjacentHTML('beforeend', '<p class="som-kal-status">No glossary entry yet — add <code>content/kalima/' + slug + '.md</code></p>');
      } else {
        const body = document.createElement('div'); body.className = 'markdown-body som-kal-body';
        if (window.somRenderInto) somRenderInto(md, body);
        else if (window.marked) body.innerHTML = marked.parse(md);
        box.appendChild(body);
        const foot = document.createElement('a'); foot.className = 'som-kal-foot'; foot.target = '_blank'; foot.rel = 'noopener';
        foot.href = 'render.html?file=content/kalima/' + slug + '.md'; foot.textContent = 'Open entry ↗';
        box.appendChild(foot);
      }
      p.textContent = ''; p.appendChild(box);
      place(el);
    });
  }

  // Clicks inside an open glossary card: "← Back", a glossary word (opens in place, with a trail),
  // or a plain {{ word | note }} tooltip (its note opens inline; a second popover would clobber this one).
  function clickInPopover(e) {
    if (e.target.closest('.som-kal-back')) {
      e.preventDefault(); trail.pop();
      if (trail.length) showKalima(current, pop, trail[trail.length - 1]);
      return;
    }
    const t = tipOf(e.target);
    if (!t || !pop.contains(t)) return;
    e.preventDefault();
    if (t.dataset.kalima) { trail.push(t.dataset.kalima); showKalima(current, pop, t.dataset.kalima); return; }
    if (t._note) { t._note.remove(); t._note = null; t.classList.remove('is-open'); return; }
    const note = document.createElement('span'); note.className = 'som-inline-note'; note.textContent = t.dataset.tip || '';
    (t.closest('p, li, blockquote, summary, h1, h2, h3') || t).after(note);
    t._note = note; t.classList.add('is-open');
  }

  function show(el) {
    const p = ensurePop();
    p.classList.remove('rich');
    if (current && current !== el) current.classList.remove('is-open');
    current = el;
    if (el.dataset.kalima) { trail = [el.dataset.kalima]; showKalima(el, p, trail[0]); return; }
    // Optional richer form: data-tip-ar (the Arabic, shown large) and data-tip-ref (its citation).
    p.textContent = '';
    if (el.dataset.tipAr) {
      const ar = document.createElement('span'); ar.className = 'som-tip-ar'; ar.lang = 'ar'; ar.textContent = el.dataset.tipAr;
      p.appendChild(ar);
    }
    p.appendChild(document.createTextNode(el.dataset.tip));
    if (el.dataset.tipRef) {
      const ref = document.createElement('span'); ref.className = 'som-tip-ref'; ref.textContent = el.dataset.tipRef;
      p.appendChild(ref);
    }
    p.style.display = 'block';
    p.style.left = '0px'; p.style.top = '0px';
    const r = el.getBoundingClientRect(), w = p.offsetWidth, h = p.offsetHeight, pad = 8;
    const left = Math.max(pad, Math.min(r.left + r.width / 2 - w / 2, window.innerWidth - w - pad));
    const above = r.top - h - 12 >= pad;
    p.classList.toggle('above', above); p.classList.toggle('below', !above);
    p.style.left = left + 'px';
    p.style.top = (above ? r.top - h - 10 : r.bottom + 10) + 'px';
    p.style.setProperty('--arrow-x', Math.max(14, Math.min(r.left + r.width / 2 - left, w - 14)) + 'px');
    if (current && current !== el) current.classList.remove('is-open');
    current = el;
  }

  function hide() {
    if (pop) pop.style.display = 'none';
    if (current) current.classList.remove('is-open');
    current = null; pinned = false; trail = [];
  }

  const tipOf = (t) => t.closest && t.closest('.som-tip, .w[data-kalima]');
  // glossary entries open on click/tap only; tips inside an open glossary card never take over the popover
  const hoverable = (t) => t && !t.dataset.kalima && !(pop && pop.contains(t));

  document.addEventListener('mouseover', (e) => { const t = tipOf(e.target); if (hoverable(t) && !pinned) show(t); });
  document.addEventListener('mouseout', (e) => { if (hoverable(tipOf(e.target)) && !pinned) hide(); });
  document.addEventListener('focusin', (e) => { const t = tipOf(e.target); if (hoverable(t) && !pinned) show(t); });
  document.addEventListener('focusout', (e) => { if (hoverable(tipOf(e.target)) && !pinned) hide(); });

  // Click pins it (needed on touch); clicking inside a <summary> must not toggle the drawer.
  document.addEventListener('click', (e) => {
    if (pop && pop.contains(e.target)) { clickInPopover(e); return; }   // reading or scrolling an open glossary entry
    const t = tipOf(e.target);
    if (!t) { if (pinned) hide(); return; }
    e.preventDefault();
    if (pinned && current === t) { hide(); return; }
    show(t); t.classList.add('is-open'); pinned = true;
  }, true);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') hide();
    else if ((e.key === 'Enter' || e.key === ' ') && tipOf(e.target)) { e.preventDefault(); tipOf(e.target).click(); }
  });
  window.addEventListener('scroll', () => { if (current) hide(); }, { passive: true });
  window.addEventListener('resize', hide);
})();
