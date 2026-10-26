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
    #som-tip-pop.rich { pointer-events: auto; max-width: min(24rem, calc(100vw - 16px)); padding: 0; text-align: left; font-weight: 400; }
    .som-kal-scroll { max-height: 55vh; overflow-y: auto; padding: 0.85rem 1rem; }
    .som-kal-scroll h1, .som-kal-scroll h2, .som-kal-scroll h3 { margin: 0 0 0.4rem; font-size: 1rem; line-height: 1.4; color: #FFE9B8; font-weight: 700; }
    .som-kal-scroll p { margin: 0.4rem 0; }
    .som-kal-scroll ul, .som-kal-scroll ol { margin: 0.4rem 0; padding-left: 1.1rem; }
    .som-kal-scroll a { color: #D9B869; }
    .som-kal-scroll blockquote { margin: 0.4rem 0; padding-left: 0.7rem; border-left: 2px solid #D9B869; }
    .som-kal-status { opacity: 0.8; font-style: italic; }
    .som-kal-foot {
      display: block; margin-top: 0.7rem; font: 700 0.58rem/1 'JetBrains Mono', ui-monospace, monospace;
      letter-spacing: 0.08em; text-transform: uppercase; color: #D9B869 !important; text-decoration: none;
    }`;

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

  function ensurePop() {
    if (!pop) { pop = document.createElement('div'); pop.id = 'som-tip-pop'; pop.setAttribute('role', 'tooltip'); document.body.appendChild(pop); }
    return pop;
  }

  // ── Glossary entries: content/kalima/<slug>.md, fetched once and cached ──
  const KAL = new Map();
  function kalimaHTML(slug) {
    if (!KAL.has(slug)) {
      KAL.set(slug, fetch('../content/kalima/' + slug + '.md')
        .then(r => { if (!r.ok) throw new Error('HTTP ' + r.status); return r.text(); })
        .then(md => window.marked ? marked.parse(md.replace(/^::meta\s*\n[\s\S]*?\n::\s*\n?/, '')) : null)
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

  function showKalima(el, p) {
    const slug = el.dataset.kalima;
    p.classList.add('rich');
    p.innerHTML = '<div class="som-kal-scroll"><p class="som-kal-status">Loading…</p></div>';
    p.style.display = 'block'; p.style.left = '0px'; p.style.top = '0px';
    place(el);
    kalimaHTML(slug).then(html => {
      if (current !== el) return;
      p.innerHTML = '<div class="som-kal-scroll">' + (html ||
        '<p class="som-kal-status">No glossary entry yet — add <code>content/kalima/' + slug + '.md</code></p>') +
        (html ? '<a class="som-kal-foot" href="render.html?file=content/kalima/' + slug + '.md" target="_blank" rel="noopener">Open entry ↗</a>' : '') + '</div>';
      place(el);
    });
  }

  function show(el) {
    const p = ensurePop();
    p.classList.remove('rich');
    if (current && current !== el) current.classList.remove('is-open');
    current = el;
    if (el.dataset.kalima) { showKalima(el, p); return; }
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
    current = null; pinned = false;
  }

  const tipOf = (t) => t.closest && t.closest('.som-tip, .w[data-kalima]');
  const hoverable = (t) => t && !t.dataset.kalima;   // glossary entries open on click/tap only

  document.addEventListener('mouseover', (e) => { const t = tipOf(e.target); if (hoverable(t) && !pinned) show(t); });
  document.addEventListener('mouseout', (e) => { if (hoverable(tipOf(e.target)) && !pinned) hide(); });
  document.addEventListener('focusin', (e) => { const t = tipOf(e.target); if (hoverable(t) && !pinned) show(t); });
  document.addEventListener('focusout', (e) => { if (hoverable(tipOf(e.target)) && !pinned) hide(); });

  // Click pins it (needed on touch); clicking inside a <summary> must not toggle the drawer.
  document.addEventListener('click', (e) => {
    if (pop && pop.contains(e.target)) return;   // reading or scrolling an open glossary entry
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
