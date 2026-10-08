/* ════════════════════════════════════════════════
   Inline tooltips — shared by render.html and render_collection.html
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
    #som-tip-pop.above::before { bottom: -5px; }
    #som-tip-pop.below::before { top: -5px; }`;

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
      const text = note.replace(/<[^>]+>/g, '').replace(/"/g, '&quot;');
      return `<span class="som-tip" tabindex="0" role="button" aria-label="${word.replace(/<[^>]+>/g, '')} — tap for explanation" data-tip="${text}">${word}</span>`;
    }).replace(/\\\{\{/g, '{{')).join('');
  };

  let pop = null, current = null, pinned = false;

  function ensurePop() {
    if (!pop) { pop = document.createElement('div'); pop.id = 'som-tip-pop'; pop.setAttribute('role', 'tooltip'); document.body.appendChild(pop); }
    return pop;
  }

  function show(el) {
    const p = ensurePop();
    p.textContent = el.dataset.tip;
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

  const tipOf = (t) => t.closest && t.closest('.som-tip');

  document.addEventListener('mouseover', (e) => { const t = tipOf(e.target); if (t && !pinned) show(t); });
  document.addEventListener('mouseout', (e) => { if (tipOf(e.target) && !pinned) hide(); });
  document.addEventListener('focusin', (e) => { const t = tipOf(e.target); if (t && !pinned) show(t); });
  document.addEventListener('focusout', (e) => { if (tipOf(e.target) && !pinned) hide(); });

  // Click pins it (needed on touch); clicking inside a <summary> must not toggle the drawer.
  document.addEventListener('click', (e) => {
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
