// Clean URL: remove index.html and .html extension from URLs
(function() {
    const pathname = window.location.pathname;

    // Remove index.html
    if (pathname.endsWith('/index.html') || pathname.endsWith('index.html')) {
        const cleanPath = pathname.replace(/\/index\.html$/, '/').replace(/index\.html$/, '/');
        window.history.replaceState(null, '', cleanPath + window.location.search + window.location.hash);
    }
    // Remove .html extension
    else if (pathname.endsWith('.html')) {
        const cleanPath = pathname.replace(/\.html$/, '');
        window.history.replaceState(null, '', cleanPath + window.location.search + window.location.hash);
    }
})();




