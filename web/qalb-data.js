// =========================================================
// QALB MONITOR — the states of the heart, and the duʿās for each.
//   Loaded by index.html (the قَلْب wheel on Action view) and by
//   web/render.html (?qalb=<id> reads a state as one page, and a
//   card opened from a state pages through that state's list).
//   Needs nav-data.js and plan.js loaded first.
//
//   This is the file you edit, the way default-plan.js is: add a
//   card to a state, reorder, or move a gap into `cards` once it
//   has been authored.
//
// ── A STATE ──────────────────────────────────────────────────
//   id        stable slug; used in links (#qalb/<id>, ?qalb=<id>)
//   name      what the reader feels, in plain words
//   short     one-word label for the wheel
//   ar        the Arabic word the diagnosis turns on
//   diagnosis { ar, en, ref, verify }  the āyah (or ḥadīth) that
//             names the state. `verify` is the canonical link.
//   turn      optional { ar, en, ref }: the exception or the turn
//             the same passage makes ("except those who pray").
//   cards     ordered list of card paths (as in default-plan.js).
//             Label, gloss, ref and grade come from nav-data.js.
//             A card not in the menu tree may carry its own:
//             { path, label, ref, grade }.
//   gaps      duʿās that belong here but have no card yet:
//             { label, ref, note }. Shown greyed, not openable.
//   care      optional one quiet line shown under the list.
//
// ── ALSO ─────────────────────────────────────────────────────
//   Any nav-data.js item may carry `qalb: ['anxious', …]`. Those
//   cards are appended to the state after its curated `cards`, so
//   a new card can opt in without editing this file.
//
// ⚠️ REVIEW BEFORE PUBLISHING: the Arabic of each diagnosis and turn
//   is typed, not copied from a muṣḥaf, and the English lines are
//   plain renderings, not a published translation. Check each one
//   against its `verify` link.
// =========================================================

const SOM_QALB_STATES = [
  {
    id: 'anxious', name: 'Anxious & grieving', short: 'Anxious', ar: 'هَلُوعًا',
    diagnosis: {
      ar: 'إِنَّ الْإِنسَانَ خُلِقَ هَلُوعًا إِذَا مَسَّهُ الشَّرُّ جَزُوعًا',
      en: 'Man was created anxious: when harm touches him, he frets.',
      ref: 'Qurʾān 70:19–20', verify: 'https://quran.com/70/19-22'
    },
    turn: { ar: 'إِلَّا الْمُصَلِّينَ', en: 'Except those who pray.', ref: 'Qurʾān 70:22' },
    care: 'If this weight has stayed with you for weeks, speak to someone you trust, or a doctor, as well.',
    cards: [
      'content/03-adhkar-sabah-masa/5-hammi-wal-hazan.md',
      'content/01-dua/05-quran-in-heart/quran_spring_heart.md',
      'content/03-adhkar-sabah-masa/6_ya-hayyu-ya-qayyum.md',
      'content/03-adhkar-sabah-masa/3_hasbiyallahu_7.md'
    ]
  },
  {
    id: 'scarcity', name: 'Fearing scarcity', short: 'Scarcity', ar: 'الْفَقْرَ',
    diagnosis: {
      ar: 'الشَّيْطَانُ يَعِدُكُمُ الْفَقْرَ وَيَأْمُرُكُم بِالْفَحْشَاءِ',
      en: 'Shayṭān promises you poverty and bids you to indecency.',
      ref: 'Qurʾān 2:268', verify: 'https://quran.com/2/268'
    },
    turn: { ar: 'وَاللَّهُ يَعِدُكُم مَّغْفِرَةً مِّنْهُ وَفَضْلًا', en: 'And Allah promises you forgiveness from Him, and bounty.', ref: 'Qurʾān 2:268' },
    cards: [
      'content/04-duha-working-day/remove-debt-mountain.md',
      'content/03-adhkar-sabah-masa/7_body-hearing-sight.md',
      'content/02-salah/02-during/ilmannafia_rizqantayyiba_amalanmutaqqaballan.md',
      'content/04-duha-working-day/solat-duha.md'
    ]
  },
  {
    id: 'afraid', name: 'Afraid of people & what is coming', short: 'Afraid', ar: 'يُخَوِّفُ',
    diagnosis: {
      ar: 'إِنَّمَا ذَٰلِكُمُ الشَّيْطَانُ يُخَوِّفُ أَوْلِيَاءَهُ',
      en: 'It is only Shayṭān who makes you fear his allies.',
      ref: 'Qurʾān 3:175', verify: 'https://quran.com/3/175'
    },
    turn: { ar: 'فَلَا تَخَافُوهُمْ وَخَافُونِ إِن كُنتُم مُّؤْمِنِينَ', en: 'So do not fear them; fear Me, if you are believers.', ref: 'Qurʾān 3:175' },
    cards: [
      'content/03-adhkar-sabah-masa/2_bismillahiladhi_layadurru.md',
      'content/03-adhkar-sabah-masa/1_audhubikatillah.md',
      'content/04-duha-working-day/musa-rabbishrahlisadri.md',
      'content/05-adhkar-al-layl/02-before-sleep/ayat-al-kursi-guard.md'
    ]
  },
  {
    id: 'hasty', name: 'In a hurry, cannot wait', short: 'Hasty', ar: 'عَجَلٍ',
    diagnosis: {
      ar: 'خُلِقَ الْإِنسَانُ مِنْ عَجَلٍ',
      en: 'Man was created of haste.',
      ref: 'Qurʾān 21:37', verify: 'https://quran.com/21/37'
    },
    turn: { ar: 'سَأُرِيكُمْ آيَاتِي فَلَا تَسْتَعْجِلُونِ', en: 'I will show you My signs, so do not ask Me to hurry.', ref: 'Qurʾān 21:37' },
    cards: [
      'content/05-adhkar-al-layl/03-left-sleep/solat-istikhara.md',
      'content/04-duha-working-day/allahumma-la-sahla.md'
    ],
    gaps: [
      { label: 'Pour patience upon us', ref: 'Qurʾān 2:250', note: 'Rabbanā afrigh ʿalaynā ṣabran' }
    ]
  },
  {
    id: 'quarrel', name: 'Quarrelsome', short: 'Quarrel', ar: 'جَدَلًا',
    diagnosis: {
      ar: 'وَكَانَ الْإِنسَانُ أَكْثَرَ شَيْءٍ جَدَلًا',
      en: 'Man is, of all things, the most given to argument.',
      ref: 'Qurʾān 18:54', verify: 'https://quran.com/18/54'
    },
    cards: [
      'content/01-dua/01-forgiveness/forgive-us-do-not-place-ghilla-in-hearts.md',
      'content/04-duha-working-day/musa-rabbishrahlisadri.md'
    ],
    gaps: [
      { label: 'A house in Jannah for leaving argument, even when right', ref: 'Abū Dāwūd 4800', note: 'To source and grade' }
    ]
  },
  {
    id: 'weak', name: 'Drained & weak', short: 'Drained', ar: 'ضَعِيفًا',
    diagnosis: {
      ar: 'وَخُلِقَ الْإِنسَانُ ضَعِيفًا',
      en: 'Man was created weak.',
      ref: 'Qurʾān 4:28', verify: 'https://quran.com/4/28'
    },
    turn: { ar: 'يُرِيدُ اللَّهُ أَن يُخَفِّفَ عَنكُمْ', en: 'Allah wants to lighten your burden.', ref: 'Qurʾān 4:28' },
    cards: [
      'content/04-duha-working-day/musa-rabbi-inni-lima-anzalta.md',
      'content/05-adhkar-al-layl/02-before-sleep/tasbih-fatimah.md',
      'content/04-duha-working-day/allahumma-la-sahla.md'
    ]
  },
  {
    id: 'lazy', name: 'Stuck & lazy', short: 'Lazy', ar: 'الْكَسَلِ',
    diagnosis: {
      ar: 'اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْعَجْزِ وَالْكَسَلِ',
      en: 'O Allah, I seek refuge in You from incapacity and laziness.',
      ref: 'Bukhārī 2893 · named in the Sunnah', verify: 'https://sunnah.com/bukhari:2893'
    },
    cards: [
      'content/03-adhkar-sabah-masa/5-hammi-wal-hazan.md',
      'content/04-duha-working-day/solat-duha.md',
      'content/02-salah/03-after/help-me-be-grateful.md'
    ]
  },
  {
    id: 'ungrateful', name: 'Ungrateful', short: 'Ungrateful', ar: 'لَكَنُودٌ',
    diagnosis: {
      ar: 'إِنَّ الْإِنسَانَ لِرَبِّهِ لَكَنُودٌ',
      en: 'Man is ungrateful to his Lord.',
      ref: 'Qurʾān 100:6', verify: 'https://quran.com/100/6'
    },
    cards: [
      'content/01-dua/04-gratitude/sulaiman-thankfulness.md',
      'content/02-salah/03-after/help-me-be-grateful.md',
      'content/03-adhkar-sabah-masa/8_raditdubillahirabban.md',
      'content/01-dua/04-gratitude/eating-alhamdulillah-forgiveness.md'
    ]
  },
  {
    id: 'dunya', name: 'Pulled by the dunyā', short: 'Dunyā', ar: 'تُؤْثِرُونَ',
    diagnosis: {
      ar: 'بَلْ تُؤْثِرُونَ الْحَيَاةَ الدُّنْيَا',
      en: 'But you prefer the life of this world.',
      ref: 'Qurʾān 87:16', verify: 'https://quran.com/87/16-17'
    },
    turn: { ar: 'وَالْآخِرَةُ خَيْرٌ وَأَبْقَىٰ', en: 'While the Hereafter is better and more lasting.', ref: 'Qurʾān 87:17' },
    cards: [
      'content/01-dua/02-asking-allah/rabbana-atina-fid-dunya.md',
      'content/01-dua/02-asking-allah/o-allah-set-right-for-me-my-religion.md',
      'content/01-dua/02-asking-allah/dua-selamat.md'
    ]
  },
  {
    id: 'wavering', name: 'Heart wavering', short: 'Wavering', ar: 'يَحُولُ',
    diagnosis: {
      ar: 'وَاعْلَمُوا أَنَّ اللَّهَ يَحُولُ بَيْنَ الْمَرْءِ وَقَلْبِهِ',
      en: 'And know that Allah comes between a person and his heart.',
      ref: 'Qurʾān 8:24', verify: 'https://quran.com/8/24'
    },
    turn: { ar: 'اسْتَجِيبُوا لِلَّهِ وَلِلرَّسُولِ إِذَا دَعَاكُمْ لِمَا يُحْيِيكُمْ', en: 'Respond to Allah and the Messenger when he calls you to what gives you life.', ref: 'Qurʾān 8:24' },
    cards: [
      'content/01-dua/03-steadfastness/ya-muqallibal-qulub.md',
      'content/01-dua/03-steadfastness/la-tuzigh-qulubana.md',
      'content/dua/dua-nur.md'
    ]
  },
  {
    id: 'rusted', name: 'Heart rusted over', short: 'Rusted', ar: 'رَانَ',
    diagnosis: {
      ar: 'كَلَّا بَلْ رَانَ عَلَىٰ قُلُوبِهِم مَّا كَانُوا يَكْسِبُونَ',
      en: 'No: what they used to earn has rusted over their hearts.',
      ref: 'Qurʾān 83:14', verify: 'https://quran.com/83/14'
    },
    cards: [
      'content/01-dua/01-forgiveness/forgiveness-100-times.md',
      'content/03-adhkar-sabah-masa/4_sayyidul-istighfar.md',
      'content/01-dua/01-forgiveness/forgiveness-adam.md',
      'content/01-dua/05-quran-in-heart/quran_spring_heart.md'
    ]
  },
  {
    id: 'envy', name: 'Envy & rancour', short: 'Envy', ar: 'يَحْسُدُونَ',
    diagnosis: {
      ar: 'أَمْ يَحْسُدُونَ النَّاسَ عَلَىٰ مَا آتَاهُمُ اللَّهُ مِن فَضْلِهِ',
      en: 'Or do they envy people for what Allah has given them of His bounty?',
      ref: 'Qurʾān 4:54', verify: 'https://quran.com/4/54'
    },
    cards: [
      'content/01-dua/01-forgiveness/forgive-us-do-not-place-ghilla-in-hearts.md',
      { path: 'content/01-dua/01-forgiveness/man-from-jannah-pure-heart.md', label: 'The Man from Jannah - He slept with no ghill for anyone', ref: 'Musnad Aḥmad 12697', grade: 'sahih' },
      'content/01-dua/06-shifa/evil-eye.md'
    ]
  }
];

(function (global) {
  'use strict';

  const MARKER = 'web/render.html?file=';
  const byId = {};
  SOM_QALB_STATES.forEach(s => { byId[s.id] = s; });

  function navItem(path) {
    if (!global.SomPlan) return null;
    const hit = SomPlan.libraryItem ? SomPlan.libraryItem(path) : null;
    if (hit) return hit.item;
    const row = SomPlan.library().find(r => r.path === path);
    return row ? row.item : null;
  }

  // Curated cards first, then any nav-data item tagged `qalb: [id]`.
  function lines(id) {
    const s = byId[id];
    if (!s) return [];
    const out = [];
    const seen = new Set();
    (s.cards || []).forEach(c => {
      const own = typeof c === 'string' ? { path: c } : c;
      if (!own || !own.path || seen.has(own.path)) return;
      seen.add(own.path);
      const item = navItem(own.path) || {};
      out.push({
        path: own.path,
        label: own.label || item.label || own.path.split('/').pop().replace(/\.md$/, ''),
        gloss: own.gloss || item.gloss || '',
        ref: own.ref || item.ref || '',
        grade: own.grade || item.grade || '',
        reps: own.reps || item.reps || ''
      });
    });
    if (global.SomPlan) {
      SomPlan.library().forEach(row => {
        if (!(row.item.qalb || []).includes(id) || seen.has(row.path)) return;
        seen.add(row.path);
        const it = row.item;
        out.push({ path: row.path, label: it.label, gloss: it.gloss || '', ref: it.ref || '', grade: it.grade || '', reps: it.reps || '' });
      });
    }
    return out;
  }

  // The label a card shows as the state's line; the part before " - ".
  function shortLabel(label) { return String(label || '').split(' - ')[0]; }

  // A state as a collection, the shape render.html builds pages from.
  function asCollection(id) {
    const s = byId[id];
    if (!s) return null;
    return {
      id: 'qalb:' + id,
      name: 'Qalb · ' + s.name,
      summary: s.diagnosis.en + ' (' + s.diagnosis.ref + ')',
      items: lines(id).map(l => ({ label: l.label, path: l.path }))
    };
  }

  // Prev / next for a card opened from a state (render.html?file=…&from=qalb:<id>).
  function cardHref(path, id) {
    return '../' + MARKER + encodeURI(path) + '&from=' + encodeURIComponent('qalb:' + id);
  }
  function contextFor(id, file) {
    const s = byId[id];
    if (!s) return null;
    const seq = lines(id).map(l => ({ path: l.path, label: shortLabel(l.label), gloss: l.gloss, href: cardHref(l.path, id) }));
    const i = seq.findIndex(x => x.path === file);
    if (i === -1) return null;
    return {
      prev: i > 0 ? seq[i - 1] : null,
      next: i < seq.length - 1 ? seq[i + 1] : null,
      label: 'قَلْب · ' + s.name + ' · ' + (i + 1) + ' of ' + seq.length,
      homeHref: '../index.html#qalb/' + id
    };
  }

  global.SomQalb = {
    states: () => SOM_QALB_STATES,
    state: id => byId[id] || null,
    lines, shortLabel, asCollection, contextFor
  };
})(window);
