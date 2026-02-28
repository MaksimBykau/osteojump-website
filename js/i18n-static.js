/**
 * Lightweight i18n for statically generated pages.
 *
 * - Does NOT load JSON translations (text is already baked into HTML)
 * - Shows current language in the switcher (reads from <html lang>)
 * - Navigates to the correct URL when user clicks a language option
 * - Sets i18n-ready class immediately
 */

(function () {
  const currentLang = document.documentElement.lang || 'pl';

  // Show content immediately — translations are already in HTML
  document.body.classList.add('i18n-ready');

  // Language display map
  const langMap = {
    ru: { flag: '\u{1F1F7}\u{1F1FA}', code: 'RU' },
    en: { flag: '\u{1F1EC}\u{1F1E7}', code: 'EN' },
    de: { flag: '\u{1F1E9}\u{1F1EA}', code: 'DE' },
    pl: { flag: '\u{1F1F5}\u{1F1F1}', code: 'PL' },
    uk: { flag: '\u{1F1FA}\u{1F1E6}', code: 'UK' },
  };

  // Update the language button text
  const langText = document.getElementById('langSelectText');
  if (langText) {
    const lang = langMap[currentLang] || langMap['pl'];
    langText.innerHTML = '<span class="flag-emoji">' + lang.flag + '</span> ' + lang.code;
  }

  // Setup language switcher
  const langBtn = document.getElementById('langSelectBtn');
  const dropdown = document.getElementById('langSelectDropdown');

  function closeDropdown() {
    if (dropdown) dropdown.classList.remove('active');
    if (langBtn) langBtn.setAttribute('aria-expanded', 'false');
  }

  if (langBtn && dropdown) {
    langBtn.addEventListener('click', function (e) {
      e.stopPropagation();
      const isExpanded = langBtn.getAttribute('aria-expanded') === 'true';
      if (isExpanded) {
        closeDropdown();
      } else {
        dropdown.classList.add('active');
        langBtn.setAttribute('aria-expanded', 'true');

        // Close hamburger menu when opening language dropdown
        var sidebar = document.querySelector('.nav-overflow-sidebar');
        var menuToggle = document.querySelector('.menu-toggle');
        var menuBackdrop = document.querySelector('.nav-menu-backdrop');
        if (sidebar) sidebar.classList.remove('active');
        if (menuToggle) menuToggle.setAttribute('aria-expanded', 'false');
        if (menuBackdrop) menuBackdrop.classList.remove('active');
      }
    });
  }

  // Handle language option clicks — navigate to the language URL
  var options = document.querySelectorAll('.lang-select-option');
  options.forEach(function (option) {
    option.addEventListener('click', function (e) {
      e.preventDefault();
      e.stopPropagation();

      var targetHref = option.getAttribute('data-static-href');
      if (targetHref) {
        window.location.href = targetHref;
      }
    });
  });

  // Close dropdown on outside click
  document.addEventListener('click', function (e) {
    if (dropdown && langBtn && !dropdown.contains(e.target) && !langBtn.contains(e.target)) {
      closeDropdown();
    }
  });

  // Close dropdown on Escape
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      closeDropdown();
    }
  });

  // Expose a minimal i18n object so main.js review code doesn't break
  window.i18n = {
    currentLang: currentLang,
    translate: function (key) {
      // On static pages, text is already in HTML. Return the key as fallback.
      // Try to find the element with this data-i18n key and return its text.
      var el = document.querySelector('[data-i18n="' + key + '"]');
      return el ? el.textContent : key;
    }
  };
})();
