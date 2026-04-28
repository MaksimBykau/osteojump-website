(function () {
  function getPage() {
    var path = window.location.pathname;
    path = path.replace(/^\//, '').replace(/\/$/, '');
    path = path.replace(/^(en|ru|uk|de)(\/|$)/, '');
    path = path.replace(/\/$/, '');
    return path || 'home';
  }

  function getLang() {
    return document.documentElement.lang || 'pl';
  }

  function getLocation(el) {
    var loc = el.closest('[data-track-location]');
    if (loc) return loc.getAttribute('data-track-location');
    if (el.closest('.fixed-action-bar')) return 'fixed_bar';
    if (el.closest('.footer')) return 'footer';
    if (el.closest('.header')) return 'header';
    return 'content';
  }

  function extractHandle(href, domain) {
    return href.replace(/^https?:\/\/(www\.)?/, '').replace(domain + '/', '').split('/')[0].split('?')[0] || null;
  }

  function track(eventName, props) {
    if (!window.posthog) return;
    window.posthog.capture(eventName, Object.assign({ page: getPage(), lang: getLang() }, props));
  }

  // Returns { event, props } or null. props must NOT include location.
  function classifyLink(href, anchor) {
    if (!href) return null;

    if (href.indexOf('booksy.com') !== -1) {
      return { event: 'click_booking', props: { href: href } };
    }
    if (href.indexOf('wa.me') !== -1 || href.indexOf('api.whatsapp.com') !== -1) {
      var phone = href.replace(/^https?:\/\/(api\.whatsapp\.com\/send\?phone=|wa\.me\/)/, '').split('?')[0];
      return { event: 'click_whatsapp', props: { phone: phone } };
    }
    if (href.indexOf('tel:') === 0) {
      return { event: 'click_phone', props: { phone: href.slice(4) } };
    }
    if (href.indexOf('mailto:') === 0) {
      return { event: 'click_email', props: { email: href.slice(7) } };
    }
    if (href.indexOf('t.me/') !== -1) {
      return { event: 'click_telegram', props: { handle: extractHandle(href, 't.me') } };
    }
    if (href.indexOf('maps.app.goo.gl') !== -1 || href.indexOf('maps.google') !== -1) {
      return { event: 'click_maps', props: {} };
    }
    if (href.indexOf('instagram.com') !== -1) {
      return { event: 'click_social', props: { platform: 'instagram', handle: extractHandle(href, 'instagram.com') } };
    }
    if (href.indexOf('facebook.com') !== -1) {
      return { event: 'click_social', props: { platform: 'facebook', handle: extractHandle(href, 'facebook.com') } };
    }
    if (href.indexOf('youtube.com') !== -1 || href.indexOf('youtu.be') !== -1) {
      return { event: 'click_social', props: { platform: 'youtube' } };
    }
    if (href.indexOf('orlymedycyny.pl') !== -1) {
      return { event: 'click_social', props: { platform: 'orly_medycyny' } };
    }
    // Internal nav: only links inside .nav-menu or .footer-nav
    if (href.indexOf('/') === 0 && anchor.closest('.nav-menu, .footer-nav')) {
      var dest = href.replace(/^\//, '').replace(/\/$/, '').replace(/^(en|ru|uk|de)(\/|$)/, '').replace(/\/$/, '') || 'home';
      return { event: 'click_nav', props: { destination: dest } };
    }

    return null;
  }

  // Returns { event, props } or null. props must NOT include location.
  function classifyButton(btn) {
    if (btn.id === 'actionBook') {
      return { event: 'click_booking', props: { href: 'https://cdl.booksy.com/hwJaWJhtmNb' } };
    }
    if (btn.id === 'actionContacts') {
      return { event: 'click_fixed_bar', props: { action: 'contacts' } };
    }
    if (btn.id === 'actionDirections') {
      return { event: 'click_fixed_bar', props: { action: 'directions' } };
    }
    if (btn.classList.contains('faq-question') || btn.closest('.faq-question')) {
      var faqItem = btn.closest('.faq-item');
      return { event: 'click_faq', props: { question_id: faqItem ? faqItem.id : null } };
    }
    if (btn.classList.contains('lang-select-option') && btn.dataset.lang) {
      return { event: 'click_lang', props: { from_lang: getLang(), to_lang: btn.dataset.lang } };
    }
    return null;
  }

  document.addEventListener('click', function (e) {
    var btn = e.target.closest('button, [role="button"]');
    if (btn) {
      var btnResult = classifyButton(btn);
      if (btnResult) {
        track(btnResult.event, Object.assign({ location: getLocation(btn) }, btnResult.props));
        return;
      }
    }

    var anchor = e.target.closest('a[href]');
    if (anchor) {
      var linkResult = classifyLink(anchor.getAttribute('href'), anchor);
      if (linkResult) {
        track(linkResult.event, Object.assign({ location: getLocation(anchor) }, linkResult.props));
      }
    }
  }, true);
})();
