// =========================================================
// APP META — the app's name, in one place.
//   Read by index.html (page title, share text), web/render.html
//   (card titles, share text) and web/pwa-install.js.
//
//   manifest.json is plain JSON and can't read this file — when you
//   change the name here, change "name" / "short_name" there too, and
//   the static <title> / og: tags in index.html and web/render.html
//   (crawlers and the home-screen installer don't run JavaScript).
// =========================================================
const APP_META = {
  // The full name, as written everywhere it can fit.
  name: 'Be the Imam: Steps of Muḥammad ﷺ (Nusantara Edition)',
  // Under a home-screen icon, and as the suffix on card titles.
  short: 'Be the Imam',
  // One sentence, for share sheets.
  tagline: 'Adhkār, duʿā and ṣalāh arranged by the hour of the day, word by word and fully sourced. Free, and works offline.',

  // ── THE MASTHEAD TOOLTIPS ──────────────────────────────
  // What opens when you tap "Imam", "Muḥammad" or the Nusantara sticker in
  // the title. Edit freely — the page reads these when it loads.
  //   ar    the Arabic, shown large at the top (omit for none)
  //   text  the translation / explanation (plain text)
  //   ref   the citation, shown small in capitals at the bottom (omit for none)
  tips: {
    imam: {
      ar: 'وَاجْعَلْنَا لِلْمُتَّقِينَ إِمَامًا',
      text: '…and make us an imām for the God-conscious. From the duʿāʾ of the ʿIbād ar-Raḥmān — a supplication, asked with humility, not a title.',
      ref: 'Sūrat al-Furqān 25:74'
    },
    muhammad: {
      ar: 'لَقَدْ كَانَ لَكُمْ فِي رَسُولِ اللَّهِ أُسْوَةٌ حَسَنَةٌ',
      text: 'There has certainly been for you in the Messenger of Allah an excellent example — for whoever hopes in Allah and the Last Day and remembers Allah often. The role model: uswatun ḥasanah.',
      ref: 'Sūrat al-Aḥzāb 33:21'
    },
    nusantara: {
      text: 'Nusantara Edition — the practices in this collection are gathered from across the Nusantara, the Malay world. Prayer times default to the JAKIM / MUIS method, and months begin by the MABIMS criterion.'
    }
  }
};
