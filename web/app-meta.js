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
  tagline: 'Adhkār, duʿā and ṣalāh arranged by the hour of the day, word by word and fully sourced. Free, and works offline.'
};
