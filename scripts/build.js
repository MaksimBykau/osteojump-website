#!/usr/bin/env node

/**
 * OsteoJump Static Site Generator
 *
 * Generates static HTML for each page × language combination.
 * Polish (pl) is the default language and lives at the root (/).
 * Other languages get a prefix: /en/, /ru/, /uk/, /de/.
 *
 * Usage: node scripts/build.js
 */

const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');
const { pageMeta, ogLocaleMap, SITE_URL } = require('./meta');

// ---------------------------------------------------------------------------
// Configuration
// ---------------------------------------------------------------------------

const ROOT = path.resolve(__dirname, '..');
const DIST = path.join(ROOT, 'dist');

const LANGUAGES = ['pl', 'en', 'ru', 'uk', 'de'];
const DEFAULT_LANG = 'pl';

// Pages: slug → source HTML path (relative to ROOT)
const PAGES = {
  '':            'index.html',
  'about':       'about/index.html',
  'prices':      'prices/index.html',
  'reviews':     'reviews/index.html',
  'faq':         'faq/index.html',
  'education':   'education/index.html',
  'location':    'location/index.html',
  'contacts':    'contacts/index.html',
  'osteopathy':  'osteopathy/index.html',
  'consultation':'consultation/index.html',
  'appointment': 'appointment/index.html',
  'osteopatia-terapia-manualna': 'osteopatia-terapia-manualna/index.html',
  'osteopatia-masaz-leczniczy': 'osteopatia-masaz-leczniczy/index.html',
};

// Static asset directories to copy
const ASSET_DIRS = ['css', 'js', 'images', 'locales'];
// Individual files to copy
const ASSET_FILES = ['CNAME', 'robots.txt', '404.html'];

// Internal page slugs (for link rewriting — don't rewrite links to these as assets)
const PAGE_SLUGS = new Set(Object.keys(PAGES).filter(s => s !== ''));

// Priority map for sitemap
const SITEMAP_PRIORITY = {
  '': '1.0',
  'about': '0.8',
  'osteopathy': '0.8',
  'consultation': '0.8',
  'prices': '0.8',
  'reviews': '0.7',
  'appointment': '0.7',
  'faq': '0.6',
  'education': '0.5',
  'location': '0.6',
  'contacts': '0.6',
  'osteopatia-terapia-manualna': '0.5',
  'osteopatia-masaz-leczniczy': '0.5',
};

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Load JSON translation file */
function loadTranslations(lang) {
  const filePath = path.join(ROOT, 'locales', `${lang}.json`);
  return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
}

/** Get nested value from object by dot-separated key */
function getTranslation(translations, key) {
  const parts = key.split('.');
  let value = translations;
  for (const part of parts) {
    if (value && typeof value === 'object') {
      value = value[part];
    } else {
      return null;
    }
  }
  return value || null;
}

/** Get the URL path for a page in a given language */
function getPagePath(slug, lang) {
  const prefix = lang === DEFAULT_LANG ? '' : `/${lang}`;
  if (slug === '') return `${prefix}/`;
  return `${prefix}/${slug}`;
}

/** Get the full URL for a page in a given language */
function getPageUrl(slug, lang) {
  return `${SITE_URL}${getPagePath(slug, lang)}`;
}

/** Get the dist file path for a page in a given language */
function getDistPath(slug, lang) {
  const prefix = lang === DEFAULT_LANG ? '' : lang;
  if (slug === '') {
    return path.join(DIST, prefix, 'index.html');
  }
  return path.join(DIST, prefix, slug, 'index.html');
}

/** Check if a href is an internal page link (not asset, external, etc.) */
function isInternalPageLink(href) {
  if (!href) return false;
  // Skip external links, mailto, tel, anchors-only, javascript
  if (href.startsWith('http://') || href.startsWith('https://') ||
      href.startsWith('mailto:') || href.startsWith('tel:') ||
      href.startsWith('javascript:') || href.startsWith('#')) {
    return false;
  }
  // Skip asset paths
  if (href.startsWith('/images/') || href.startsWith('/css/') ||
      href.startsWith('/js/') || href.startsWith('/locales/')) {
    return false;
  }
  return true;
}

/**
 * Rewrite an internal page href for a given language.
 * E.g. "/about" → "/en/about", "/" → "/en/", "/faq#session" → "/en/faq#session"
 */
function rewriteHref(href, lang) {
  if (lang === DEFAULT_LANG) return href;

  // Parse hash and query
  let hash = '';
  let query = '';
  let cleanHref = href;

  const hashIdx = cleanHref.indexOf('#');
  if (hashIdx !== -1) {
    hash = cleanHref.slice(hashIdx);
    cleanHref = cleanHref.slice(0, hashIdx);
  }
  const queryIdx = cleanHref.indexOf('?');
  if (queryIdx !== -1) {
    query = cleanHref.slice(queryIdx);
    cleanHref = cleanHref.slice(0, queryIdx);
  }

  // Normalize: remove trailing slash for comparison (except root)
  const normalized = cleanHref === '/' ? '' : cleanHref.replace(/\/$/, '');

  // Check if it matches a known page slug
  // "/" → "", "/about" → "about", "/prices" → "prices"
  const slug = normalized.replace(/^\//, '');

  if (slug === '' || PAGE_SLUGS.has(slug)) {
    const newPath = slug === '' ? `/${lang}/` : `/${lang}/${slug}`;
    return newPath + query + hash;
  }

  // Not a known page — return unchanged
  return href;
}

// ---------------------------------------------------------------------------
// Core: Process a single page × language
// ---------------------------------------------------------------------------

function processPage(slug, lang, translations) {
  const srcPath = path.join(ROOT, PAGES[slug]);
  const html = fs.readFileSync(srcPath, 'utf-8');
  const $ = cheerio.load(html, { decodeEntities: false });

  // 1. Set <html lang>
  $('html').attr('lang', lang);

  // 2. Fill [data-i18n] elements
  $('[data-i18n]').each(function () {
    const key = $(this).attr('data-i18n');
    const value = getTranslation(translations, key);
    if (value === null) return;

    const tag = $(this).prop('tagName');
    if (tag === 'INPUT' || tag === 'TEXTAREA') {
      $(this).attr('placeholder', value);
    } else if (tag === 'TITLE') {
      let titleText = value;
      if (!titleText.includes(' - OsteoJump') && !titleText.includes(' — OsteoJump') && !titleText.includes(' | OsteoJump') && titleText !== 'OsteoJump') {
        titleText = value + ' — OsteoJump';
      }
      $(this).text(titleText);
    } else {
      $(this).text(value);
    }
  });

  // 3. Fill [data-i18n-html] elements
  $('[data-i18n-html]').each(function () {
    const key = $(this).attr('data-i18n-html');
    const value = getTranslation(translations, key);
    if (value !== null) {
      $(this).html(value);
    }
  });

  // 4. Set meta description and OG tags
  const meta = pageMeta[slug]?.[lang];
  if (meta) {
    $('meta[name="description"]').attr('content', meta.description);
    $('meta[property="og:title"]').attr('content', meta.ogTitle);
    $('meta[property="og:description"]').attr('content', meta.ogDescription);
  }

  // 5. Set og:url
  const pageUrl = getPageUrl(slug, lang);
  $('meta[property="og:url"]').attr('content', pageUrl);

  // 6. Set og:locale
  const ogLocale = ogLocaleMap[lang];
  $('meta[property="og:locale"]').attr('content', ogLocale);

  // Remove existing og:locale:alternate and add fresh ones
  $('meta[property="og:locale:alternate"]').remove();
  const ogLocaleTag = $('meta[property="og:locale"]');
  LANGUAGES.filter(l => l !== lang).forEach(l => {
    ogLocaleTag.after(`\n    <meta property="og:locale:alternate" content="${ogLocaleMap[l]}">`);
  });

  // 7. Set canonical
  $('link[rel="canonical"]').attr('href', pageUrl);

  // 8. Generate hreflang tags
  $('link[rel="alternate"][hreflang]').remove();
  const canonical = $('link[rel="canonical"]');
  // x-default points to Polish (default language)
  const xDefaultUrl = getPageUrl(slug, DEFAULT_LANG);
  canonical.after(`\n    <link rel="alternate" hreflang="x-default" href="${xDefaultUrl}">`);
  // Add all languages (reverse order so they appear in correct order after canonical)
  [...LANGUAGES].reverse().forEach(l => {
    const url = getPageUrl(slug, l);
    canonical.after(`\n    <link rel="alternate" hreflang="${l}" href="${url}">`);
  });

  // 9. Rewrite internal links for non-default languages
  if (lang !== DEFAULT_LANG) {
    $('a[href]').each(function () {
      const href = $(this).attr('href');
      if (isInternalPageLink(href)) {
        $(this).attr('href', rewriteHref(href, lang));
      }
    });
  }

  // 10. Normalize relative paths to absolute paths
  //     Subpages use "../css/", "../js/" — convert to "/css/", "/js/"
  //     Root page uses "css/", "js/" — also convert to "/css/", "/js/"
  $('link[rel="stylesheet"]').each(function () {
    const href = $(this).attr('href');
    if (!href || href.startsWith('/') || href.startsWith('http')) return;
    $(this).attr('href', '/' + href.replace(/^\.\.\//g, ''));
  });

  $('script[src]').each(function () {
    const src = $(this).attr('src');
    if (!src || src.startsWith('/') || src.startsWith('http')) return;
    $(this).attr('src', '/' + src.replace(/^\.\.\//g, ''));
  });

  // Also normalize img src and link href for icons/images that use relative paths
  $('link[rel="icon"], link[rel="apple-touch-icon"]').each(function () {
    const href = $(this).attr('href');
    if (!href || href.startsWith('/') || href.startsWith('http')) return;
    $(this).attr('href', '/' + href.replace(/^\.\.\//g, ''));
  });

  // 11. Replace i18n.js with i18n-static.js
  $('script[src]').each(function () {
    const src = $(this).attr('src');
    if (src && (src.endsWith('/i18n.js') || src === 'js/i18n.js')) {
      $(this).attr('src', '/js/i18n-static.js');
    }
  });

  // 12. Remove clean-url.js (not needed for static site)
  $('script[src]').each(function () {
    const src = $(this).attr('src');
    if (src && (src.endsWith('/clean-url.js') || src === 'js/clean-url.js')) {
      $(this).remove();
    }
  });

  // 13. Remove the inline "Quick language detection" script
  $('script:not([src])').each(function () {
    const content = $(this).html();
    if (content && content.includes('Quick language detection')) {
      $(this).remove();
    }
  });

  // 14. Add data-static-href to language switcher buttons for navigation
  $('.lang-select-option').each(function () {
    const btnLang = $(this).attr('data-lang');
    if (btnLang) {
      const targetPath = getPagePath(slug, btnLang);
      $(this).attr('data-static-href', targetPath);
    }
  });

  // 15. Add i18n-ready class to body (content is already translated)
  const existingClass = $('body').attr('class') || '';
  $('body').attr('class', (existingClass + ' i18n-ready').trim());

  // 16. Rewrite action bar links for non-default languages
  if (lang !== DEFAULT_LANG) {
    // The action bar buttons use JS navigation (main.js), so we add data attributes
    // that i18n-static.js or main.js can use
    $('[id="actionContacts"]').attr('data-static-href', `/${lang}/contacts`);
    $('[id="actionDirections"]').attr('data-static-href', `/${lang}/location`);
  }

  // 17. Rewrite img src to .webp (JPG/JPEG/PNG → WebP)
  $('img[src]').each(function () {
    const src = $(this).attr('src');
    if (src && /\.(jpg|jpeg|png)$/i.test(src)) {
      $(this).attr('src', src.replace(/\.(jpg|jpeg|png)$/i, '.webp'));
    }
  });
  // Also rewrite data-full (modal images)
  $('[data-full]').each(function () {
    const full = $(this).attr('data-full');
    if (full && /\.(jpg|jpeg|png)$/i.test(full)) {
      $(this).attr('data-full', full.replace(/\.(jpg|jpeg|png)$/i, '.webp'));
    }
  });

  // 18. Generate FAQPage schema for FAQ page
  if (slug === 'faq') {
    const faqItems = [];
    $('.faq-item').each(function () {
      const questionEl = $(this).find('.faq-question span[data-i18n]').first();
      const answerEl = $(this).find('.faq-answer p[data-i18n]').first();
      if (questionEl.length && answerEl.length) {
        const q = questionEl.text().trim();
        const a = answerEl.text().trim();
        if (q && a) {
          faqItems.push({ q, a });
        }
      }
    });

    if (faqItems.length > 0) {
      const faqSchema = {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        'mainEntity': faqItems.map(item => ({
          '@type': 'Question',
          'name': item.q,
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': item.a,
          },
        })),
      };
      $('head').append(`\n    <script type="application/ld+json">\n    ${JSON.stringify(faqSchema, null, 4)}\n    </script>`);
    }
  }

  return $.html();
}

// ---------------------------------------------------------------------------
// Asset copying
// ---------------------------------------------------------------------------

function copyDirRecursive(src, dest) {
  if (!fs.existsSync(src)) return;
  fs.mkdirSync(dest, { recursive: true });

  const entries = fs.readdirSync(src, { withFileTypes: true });
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      copyDirRecursive(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

function copyAssets() {
  // Copy asset directories
  for (const dir of ASSET_DIRS) {
    const src = path.join(ROOT, dir);
    const dest = path.join(DIST, dir);
    copyDirRecursive(src, dest);
  }

  // Copy i18n-static.js (the new one) — already in js/ so it gets copied with the dir

  // Copy individual files
  for (const file of ASSET_FILES) {
    const src = path.join(ROOT, file);
    if (fs.existsSync(src)) {
      fs.copyFileSync(src, path.join(DIST, file));
    }
  }

  // Copy HugeIcons CSS link is external, no need to copy
}

// ---------------------------------------------------------------------------
// Sitemap generation
// ---------------------------------------------------------------------------

function generateSitemap() {
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\n';
  xml += '        xmlns:xhtml="http://www.w3.org/1999/xhtml">\n';

  for (const slug of Object.keys(PAGES)) {
    for (const lang of LANGUAGES) {
      const url = getPageUrl(slug, lang);
      const priority = SITEMAP_PRIORITY[slug] || '0.5';

      xml += '  <url>\n';
      xml += `    <loc>${url}</loc>\n`;
      xml += `    <priority>${priority}</priority>\n`;

      // Add xhtml:link hreflang for all language versions
      for (const altLang of LANGUAGES) {
        const altUrl = getPageUrl(slug, altLang);
        xml += `    <xhtml:link rel="alternate" hreflang="${altLang}" href="${altUrl}" />\n`;
      }
      // x-default
      const defaultUrl = getPageUrl(slug, DEFAULT_LANG);
      xml += `    <xhtml:link rel="alternate" hreflang="x-default" href="${defaultUrl}" />\n`;

      xml += '  </url>\n';
    }
  }

  xml += '</urlset>\n';
  return xml;
}

// ---------------------------------------------------------------------------
// Main build
// ---------------------------------------------------------------------------

function build() {
  const startTime = Date.now();
  console.log('Building OsteoJump static site...\n');

  // Clean dist
  if (fs.existsSync(DIST)) {
    fs.rmSync(DIST, { recursive: true });
  }
  fs.mkdirSync(DIST, { recursive: true });

  // Load all translations
  const allTranslations = {};
  for (const lang of LANGUAGES) {
    allTranslations[lang] = loadTranslations(lang);
    console.log(`  Loaded translations: ${lang}`);
  }

  // Process pages
  let pageCount = 0;
  for (const [slug, srcFile] of Object.entries(PAGES)) {
    for (const lang of LANGUAGES) {
      const distPath = getDistPath(slug, lang);
      const distDir = path.dirname(distPath);
      fs.mkdirSync(distDir, { recursive: true });

      const html = processPage(slug, lang, allTranslations[lang]);
      fs.writeFileSync(distPath, html, 'utf-8');
      pageCount++;

      const pageName = slug || 'index';
      const urlPath = getPagePath(slug, lang);
      console.log(`  Generated: ${urlPath.padEnd(20)} → ${path.relative(DIST, distPath)}`);
    }
  }

  // Copy assets
  console.log('\nCopying assets...');
  copyAssets();
  console.log('  Assets copied.');

  // Generate sitemap
  console.log('Generating sitemap...');
  const sitemap = generateSitemap();
  fs.writeFileSync(path.join(DIST, 'sitemap.xml'), sitemap, 'utf-8');
  console.log('  sitemap.xml generated.');

  // Generate robots.txt (overwrite the copied one to be safe)
  const robotsTxt = `User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap.xml\n`;
  fs.writeFileSync(path.join(DIST, 'robots.txt'), robotsTxt, 'utf-8');

  const elapsed = ((Date.now() - startTime) / 1000).toFixed(2);
  console.log(`\nDone! ${pageCount} pages generated in ${elapsed}s.`);
  console.log(`Output: ${DIST}`);
}

build();
