// =========================================================
// SHARED NAVIGATION DATA + CARD-TO-CARD NAVIGATION
//   Single source of truth for the menu tree. Loaded by:
//     index.html                  → renders the accordion menu
//     web/render.html             → prev / home / next on a card
//     web/render_collection.html  → prev / home / next on a collection
//
//   Because the tree lives here, a rendered card can work out
//   which category it belongs to and which duʿā comes before
//   and after it — that's what drives the nav bars.
//
//   Each category has: { icon, category, desc, items: [...] }
//   Icon emojis — non-living symbols only
// =========================================================
const VAULT_NAVIGATION_TREE = [
  {
    icon: "🕌",
    category: "Ṣalāh",
    desc: "Prophetic du'ās before, during and after ṣalāh",
    items: [
      { type: "family", label: "Pre-Ṣalāh Collection — Full Sequence", tier: "imam", path: "web/render_collection.html?file=content/salah/before/solat-collection.md" },
      { label: "Shafaat - Dua after hearing adhan", tier: "jemaah", grade: "sahih", path: "web/render.html?file=content/salah/before/after-adhan.md"},
      { type: "family", label: "Ṣalāh Collection — Full Sequence", tier: "imam", path: "web/render_collection.html?file=content/salah/after/solat-collection.md" },
      { label: "Al-Fatihah", tier: "jemaah", grade: "sahih", path: "web/render.html?file=content/salah/during/al-fatihah.md" },
      { label: "Dua Iftitah", tier: "jemaah", grade: "sahih", path: "web/render.html?file=content/salah/during/iftitah.md" },
      { label: "Fajr in Salam", tier: "jemaah", grade: "sahih", path: "web/render.html?file=content/salah/after/fajr-in-salam.md" },
      { type: "family", label: "Post-Ṣalāh Collection — Full Sequence", tier: "imam", path: "web/render_collection.html?file=content/salah/after/post-solat-collection.md" },
      { num: "1", label: "Istighfār - Source of Peace", tier: "jemaah", grade: "sahih", path: "web/render.html?file=content/salah/after/1_istigfar_peace.md" },
      { num: "2a", label: "Tahlīl - Mukhlisina-lahud-din / Sincere Devotion", tier: "jemaah", grade: "sahih", path: "web/render.html?file=content/salah/after/tahlil-mukhlisina.md" },
      { num: "2b", label: "Tahlīl - Laa-maani' / Divine Sovereignty", tier: "jemaah", grade: "sahih", path: "web/render.html?file=content/salah/after/tahlil-la-mania.md" },
      { num: "2c", label: "Tahlīl - Yuhyi wa Yumitu' / Gives life Causes Death", tier: "imam", grade: "hasan", path: "web/render.html?file=content/salah/after/tahlil-fajr-maghrib-10-times.md"},
      { num: "3", label: "Protect me from Hellfire", tier: "muhsin", grade: "daif", path: "web/render.html?file=content/salah/after/3_dua-allahuma-ajirnaar.md" },
      { num: "4", label: "Help me be grateful", tier: "jemaah", grade: "sahih", path: "web/render.html?file=content/salah/after/help-me-be-grateful.md" },
    ]
  },
  {
    icon: "🤍",
    category: "The Nur in the Heart",
    desc: "Prophetic du'ās for deeply anchoring and alignment to the command / amr",
    items: [
      { label: "Dua most often recited: Ya muqallibal-qulub", tier: "jemaah", grade: "hasan", path: "web/render.html?file=content/dua/ya-muqallibal-qulub.md" },
      { label: "He answers: In the Greatest of Names", tier: "jemaah", grade: "sahih", path: "web/render.html?file=content/dua/in-greatest-of-names.md" },
      { label: "Istikhārah — Guidance", tier: "jemaah", grade: "sahih", path: "web/render.html?file=content/dua/istikhara.md" },
      { label: "Dua Hajat", tier: "muhsin", grade: "daif", path: "web/render.html?file=content/dua/hajat.md"},
      { label: "Āʾishah's Comprehensive Ask", tier: "imam", grade: "sahih", path: "web/render.html?file=content/dua/aisyah-comprehensive-ask.md" },
      { label: "Dua Hamdan Yuwāfī", tier: "muhsin", path: "web/render.html?file=content/dua/dua-hamdan-yuwafi.md" },
      { label: "Dua Sulaiman - Increase my capacity to be thankful", tier: "jemaah", grade: "sahih", path: "web/render.html?file=content/dua/sulaiman-thankfulness.md" },
      { label: "Du'ā — Ease of Work", tier: "jemaah", grade: "sahih", path: "web/render.html?file=content/dua/la-sahla.md" },
      { label: "Du'ā — Travel", tier: "jemaah", grade: "sahih", path: "web/render.html?file=content/dua/dua-safar.md" },
      { label: "Allah will settle your debts - even the size of Mountain of Sir", tier: "imam", grade: "hasan", path: "web/render.html?file=content/dua/remove-debt-mountain.md"},
      { type: "family", label: "Quran x Heart 🤍", tier: "imam"},
      { label: "Make the Quran the Spring of my Heart", tier: "imam", grade: "sahih", path: "web/render.html?file=content/dua/quran/quran_spring_heart.md" },
      { label: "Dua Hifzal Mursalin", tier: "muhsin", path: "web/render.html?file=content/dua/quran/memoriser.md" },
      { type: "family", label: "💧 Shifa", tier: "imam"},
      { label: "Doa Hamil (Pregnancy)", tier: "muhsin", path: "web/render.html?file=content/dua/shifa/dua-hamil.md" },
      { label: "Recite 7 times and Allah will certainly heal the person", tier: "muhsin", path: "web/render.html?file=content/dua/shifa/yashfiyaka.md" },
    ]
  },
  {
    icon: "🛡️",
    category: "Shields: ☀️Morning & 🌙Evening",
    desc: "Recite this du'ā set at the start and end of your day for protection and alignment",
    items: [
      { num: "1", label: "Heavier than all morning adhkar", tier: "jemaah", grade: "sahih", path: "web/render.html?file=content/adhkar-as-sabah-wal-masa/0_subhana_allahi_wa_bihamdihi.md" },
      { num: "1", label: "Refuge: I Seek Refuge in the Perfect Words of Allah from Evil", tier: "jemaah", grade: "sahih", path: "web/render.html?file=content/adhkar-as-sabah-wal-masa/1_audhubikatillah.md" },
      { num: "2", label: "Nothing will harm you - when you read this", tier: "jemaah", grade: "sahih", path: "web/render.html?file=content/adhkar-as-sabah-wal-masa/2_bismillahiladhi_layadurru.md" },
      { num: "3", label: "Allah will suffice you in whatever concerns you of the matters of this world and the Hereafter - Ḥasbiyallāhu Lā Ilāha Illā Hu... x 7", tier: "imam", grade: "sahih", path: "web/render.html?file=content/adhkar-as-sabah-wal-masa/3_hasbiyallahu_7.md" },
      { num: "4", label: "Allah appoints 70,000 Angels who say Salat upon you - when you read this", tier: "muhsin", grade: "daif", path: "web/render.html?file=content/adhkar-as-sabah-wal-masa/c_law_anzalna.md" },
      { num: "5", label: "Allah grants you Shifa'at Rasullullah - Salawat x 10", tier: "imam", grade: "hasan", path: "web/render.html?file=content/adhkar-as-sabah-wal-masa/b_salawat_10.md"},
      { num: "6", label: "People of Jannah: Read with Firm Faith - Chief of Seeking Forgiveness", tier: "jemaah", grade: "sahih", path: "web/render.html?file=content/adhkar-as-sabah-wal-masa/4_sayyidul-istighfar.md" },
      { num: "7", label: "Prophet never abandon these - Complete Well-Being", tier: "jemaah", grade: "sahih", path: "web/render.html?file=content/adhkar-as-sabah-wal-masa/never-abandoned.md" },
      { num: "8", label: "Allah removes your worries and settles your debts", tier: "jemaah", grade: "sahih", path: "web/render.html?file=content/adhkar-as-sabah-wal-masa/5_hammi_wal_Hazan.md" },
      { num: "9", label: "Allah removes your worries and settles your debts", tier: "muhsin", grade: "daif", path: "web/render.html?file=content/adhkar-as-sabah-wal-masa/5b_hammi_wal_Hazan.md" },
      { num: "10", label: "Obedience: Du'ā of Fāṭimah", tier: "jemaah", grade: "sahih", path: "web/render.html?file=content/adhkar-as-sabah-wal-masa/6_ya-hayyu-ya-qayyum.md" },
      { num: "11", label: "Strengthen: Body, Hearing, (in)Sight + Protection: Self — Kāfir / Faqr", tier: "imam", grade: "hasan", path: "web/render.html?file=content/adhkar-as-sabah-wal-masa/7_body-hearing-sight.md" },
      { num: "12", label: "Contentment: Raḍītu billāhi rabbā", tier: "jemaah", grade: "hasan", path: "web/render.html?file=content/adhkar-as-sabah-wal-masa/8_raditdubillahirabban.md" },
      { num: "13", label: "10 Tahlil", tier: "jemaah", grade: "sahih", path: "web/render.html?file=content/adhkar-as-sabah-wal-masa/a_la_ilaha_illallah_wahdahu_la_sharikalah.md" }
    ]
  },
  {
    icon: "🌙",
    category: "Ṣalawāt",
    desc: "Send ṣalawāt upon the Prophet ﷺ",
    items: [
      { label: "Ṣalawāt Adnānī", tier: "muhsin", path: "salawat/salawat-adnani.html"},
      { label: "Ṣalawāt Tafrijiyyah", tier: "imam", path: "web/render.html?file=content/salawat/salawat-tafrijiyyah.md"}
    ]
  },
  {
    icon: "📿",
    category: "Tahlīl Collections",
    desc: "Tahlīl collections pieced by mashāyikh",
    items: [
      { label: "Tahlīl al-Arwāḥ", path: "web/render.html?file=Wird/tahlil.html" }
    ]
  },
  {
    icon: "🌾",
    category: "Sacred times",
    desc: "Dhikr / wird pieced by mashāyikh related to the sacred months/ times/ day or even memorial days",
    items: [
      { label: "Dua Birthday", tier: "jemaah", path: "web/render.html?file=content/dua/dua-birthday.md" },
      { label: "Takbīr ʿĪd al-Aḍḥā", tier: "jemaah", path: "Dua Haj/takbir-eiduladha.html" },
      { label: "Du'ā: The Best the Prophets Made During ʿArafah", tier: "imam", path: "Dua Haj/dua-prophets-made-on-arafah.html" },
      { label: "Du'ā: ʿAlī and Ibn ʿUmar During ʿArafah", tier: "imam", path: "Dua Haj/dua-sahabah-made-on-arafah.html" },
      { label: "Du'ā Collection: Dhū al-Ḥijjah — First 10 Days", path: "Dua Haj/Amalan Haj.html" },
      { label: "Du'ā Collection: Istighfār Rajab", path: "Wird/istighfar-rajab.html" }
    ]
  },
    {
    icon: "🛠️",
    category: "Documentation",
    desc: "Technical documentation for the Steps of Muhammad Card Application",
    items: [
      { label: "Authoring Guide", path: "web/render.html?file=AUTHORING_GUIDE.md" },
      //{ label: "For scholars: Dua Classification Review", path: "web/render.html?Dua_Classification_Review.md" },
    ]
  },
];


// =========================================================
// CARD NAVIGATION ENGINE
//   Only the two viewers we control (render.html and
//   render_collection.html) join the prev/next sequence.
//   Standalone legacy .html pages are skipped — they carry
//   no nav bar of their own, so paging into one would strand
//   the reader exactly the way this engine exists to prevent.
// =========================================================

// Splits "web/render.html?file=content/dua/hajat.md" into its viewer and file.
function somParseViewerPath(path) {
  const match = /(?:^|\/)(render(?:_collection)?\.html)\?file=(.+)$/.exec(path || '');
  if (!match) return null;
  return { viewer: match[1], file: decodeURIComponent(match[2]) };
}

// The ordered, pageable cards of one category.
function somCategorySequence(node) {
  return node.items.filter(item => somParseViewerPath(item.path));
}

// Stable anchor for a category, so Home can reopen the accordion it came from.
function somNodeId(index) {
  return `node-${index}`;
}

// Finds the open card in the tree. Returns its category, that category's
// sequence, and the card's position in it — or null for anything opened
// outside the menu (a hand-typed ?file=, a saved collection).
function somLocateCard(viewer, file) {
  for (let i = 0; i < VAULT_NAVIGATION_TREE.length; i++) {
    const node = VAULT_NAVIGATION_TREE[i];
    const seq = somCategorySequence(node);
    const index = seq.findIndex(item => {
      const parsed = somParseViewerPath(item.path);
      return parsed && parsed.viewer === viewer && parsed.file === file;
    });
    if (index !== -1) return { node, nodeId: somNodeId(i), seq, index };
  }
  return null;
}

function somEscapeHtml(str) {
  return String(str).replace(/[&<>"']/g, c => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  })[c]);
}

// One end of the bar: a live link when there's somewhere to go, a dimmed
// placeholder when the reader is at the first or last card of the category.
function somRenderNavEnd(item, direction) {
  const isPrev = direction === 'prev';
  const arrow = isPrev ? '←' : '→';
  const kicker = isPrev ? 'Previous' : 'Next';
  const align = isPrev ? 'card-nav-start' : 'card-nav-end';

  if (!item) {
    return `<span class="card-nav-btn is-disabled ${align}">
        <span class="card-nav-arrow">${arrow}</span>
        <span class="card-nav-text"><span class="card-nav-kicker">${kicker}</span></span>
      </span>`;
  }

  const label = somEscapeHtml(item.label);
  const text = `<span class="card-nav-text">
      <span class="card-nav-kicker">${kicker}</span>
      <span class="card-nav-label">${label}</span>
    </span>`;

  return `<a class="card-nav-btn ${align}" href="../${item.path}" title="${label}">
      ${isPrev ? `<span class="card-nav-arrow">${arrow}</span>${text}` : `${text}<span class="card-nav-arrow">${arrow}</span>`}
    </a>`;
}

// Fills every [data-card-nav] host on the page (top and bottom of the
// article) and wires ← / → keys to the same destinations.
function somBuildCardNav() {
  const hosts = document.querySelectorAll('[data-card-nav]');
  if (!hosts.length) return;

  const params = new URLSearchParams(window.location.search);
  const file = params.get('file');
  const viewer = window.location.pathname.split('/').pop() || 'render.html';
  const found = file ? somLocateCard(viewer, file) : null;

  const prev = found && found.index > 0 ? found.seq[found.index - 1] : null;
  const next = found && found.index < found.seq.length - 1 ? found.seq[found.index + 1] : null;

  const homeHref = found ? `../index.html#${found.nodeId}` : '../index.html';
  const context = found
    ? `<span class="card-nav-context">${found.node.icon || '✦'} ${somEscapeHtml(found.node.category)} · ${found.index + 1} of ${found.seq.length}</span>`
    : '';

  const html = `
    ${somRenderNavEnd(prev, 'prev')}
    <span class="card-nav-middle">
      <a class="card-nav-home" href="${homeHref}">🏠 Home</a>
      ${context}
    </span>
    ${somRenderNavEnd(next, 'next')}`;

  hosts.forEach(host => {
    host.innerHTML = html;
    host.hidden = false;
  });

  // Home also gets a slot in the floating control stack, so it stays
  // reachable from the middle of a long card without scrolling.
  const floatHome = document.getElementById('floatHomeBtn');
  if (floatHome) {
    floatHome.href = homeHref;
    floatHome.style.display = 'flex';
  }

  document.addEventListener('keydown', (e) => {
    if (e.ctrlKey || e.metaKey || e.altKey) return;
    const el = document.activeElement;
    if (el && (el.isContentEditable || ['INPUT', 'TEXTAREA', 'SELECT'].includes(el.tagName))) return;
    if (e.key === 'ArrowLeft' && prev) window.location.href = '../' + prev.path;
    if (e.key === 'ArrowRight' && next) window.location.href = '../' + next.path;
  });
}
