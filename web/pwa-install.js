(function () {
  const ua = navigator.userAgent;
  const standalone = window.matchMedia('(display-mode: standalone)').matches || navigator.standalone;
  if (standalone) return;

  const KEY = 'pwa-install-dismissed';
  try { if (Date.now() - Number(localStorage.getItem(KEY) || 0) < 7 * 864e5) return; } catch (e) {}

  const isIOS = /iPad|iPhone|iPod/.test(ua) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
  const isAndroid = /Android/i.test(ua);
  const inApp = /FBAN|FBAV|Instagram|Line\/|WhatsApp|Messenger|MicroMessenger|TikTok|; wv\)/i.test(ua);
  if (!isIOS && !isAndroid) return; // desktop browsers have their own install icon

  let deferred = null;
  let bar = null;

  function show(html, withButton) {
    if (bar) bar.remove();
    bar = document.createElement('div');
    bar.setAttribute('role', 'dialog');
    bar.style.cssText = 'position:fixed;left:12px;right:12px;bottom:12px;z-index:9999;background:#7D5243;color:#FFFBF1;' +
      'border-radius:14px;padding:14px 16px;box-shadow:0 8px 24px rgba(0,0,0,.3);font:14px/1.45 Inter,system-ui,sans-serif;';
    bar.innerHTML = '<div style="display:flex;gap:12px;align-items:flex-start"><div style="flex:1">' + html + '</div>' +
      '<button id="pwa-x" aria-label="Dismiss" style="background:none;border:0;color:inherit;font-size:22px;line-height:1;padding:0 4px;cursor:pointer">&times;</button></div>' +
      (withButton ? '<button id="pwa-go" style="margin-top:10px;width:100%;background:#FFFBF1;color:#7D5243;border:0;border-radius:10px;padding:10px;font-weight:600;font-size:15px;cursor:pointer">Install app</button>' : '');
    document.body.appendChild(bar);
    bar.querySelector('#pwa-x').onclick = () => {
      try { localStorage.setItem(KEY, String(Date.now())); } catch (e) {}
      bar.remove(); bar = null;
    };
    const go = bar.querySelector('#pwa-go');
    if (go) go.onclick = async () => {
      if (!deferred) return;
      deferred.prompt();
      await deferred.userChoice;
      deferred = null;
      bar.remove(); bar = null;
    };
  }

  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferred = e;
    show('<strong>Install Steps of Muhammad</strong><br>Add it to your home screen — opens full-screen and works offline.', true);
  });
  window.addEventListener('appinstalled', () => { if (bar) { bar.remove(); bar = null; } });

  // Fallbacks when no install event arrives.
  setTimeout(() => {
    if (deferred || bar) return;
    if (inApp) {
      show('<strong>Open in your browser to install</strong><br>This in-app browser can’t install apps. Tap the <b>⋮</b> / <b>…</b> menu and choose <b>Open in Chrome</b> (or Safari), then install from there.');
    } else if (isIOS) {
      show('<strong>Install on iPhone / iPad</strong><br>In <b>Safari</b>, tap the <b>Share</b> button (square with an up-arrow, at the bottom or top-right), scroll down and tap <b>Add to Home Screen</b>, then <b>Add</b>.');
    } else {
      show('<strong>Install on Android</strong><br>In <b>Chrome</b>, tap the <b>⋮</b> menu (top-right), then <b>Install app</b> (or <b>Add to Home screen</b> → <b>Install</b>).');
    }
  }, 4000);
})();
