// Clean URL: remove /pages/ prefix and .html extension from URLs
(function() {
    let pathname = window.location.pathname;
    let needsUpdate = false;

    // Remove /pages/ prefix
    if (pathname.startsWith('/pages/')) {
        pathname = pathname.replace('/pages/', '/');
        needsUpdate = true;
    }

    // Remove index.html
    if (pathname.endsWith('/index.html') || pathname.endsWith('index.html')) {
        pathname = pathname.replace(/\/index\.html$/, '/').replace(/index\.html$/, '/');
        needsUpdate = true;
    }
    // Remove .html extension
    else if (pathname.endsWith('.html')) {
        pathname = pathname.replace(/\.html$/, '');
        needsUpdate = true;
    }

    if (needsUpdate) {
        window.history.replaceState(null, '', pathname + window.location.search + window.location.hash);
    }
})();




