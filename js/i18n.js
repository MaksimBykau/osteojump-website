class I18n {
    constructor() {
        this.supportedLangs = ['ru', 'en', 'de', 'pl', 'uk'];
        this.defaultLang = 'en';
        this.currentLang = this.detectLanguage();
        this.translations = {};
        this.translationsVersion = '5'; // Increment this when translations are updated
        this.init();
    }

    detectLanguage() {
        // Check if user has previously selected a language
        const savedLang = localStorage.getItem('language');
        if (savedLang && this.supportedLangs.includes(savedLang)) {
            return savedLang;
        }
        
        // Detect browser language
        const browserLang = navigator.language || navigator.userLanguage;
        const langCode = browserLang.split('-')[0].toLowerCase();
        
        // Check if browser language is supported
        if (this.supportedLangs.includes(langCode)) {
            return langCode;
        }
        
        // Fallback to default language
        return this.defaultLang;
    }

    async init() {
        this.setupLanguageSwitcher();
        
        try {
            await this.loadTranslations(this.currentLang);
            this.updatePageContent();
            // Show content after translations are loaded
            document.body.classList.add('i18n-ready');
        } catch (error) {
            console.error('Error loading translations:', error);
            // Try to load default language translations
            if (this.currentLang !== this.defaultLang) {
                try {
                    await this.loadTranslations(this.defaultLang);
                    this.currentLang = this.defaultLang;
                    this.updatePageContent();
                    document.body.classList.add('i18n-ready');
                } catch (defaultError) {
                    console.error('Error loading default translations:', defaultError);
                    // Show content with fallback text from HTML
                    document.body.classList.add('i18n-ready');
                }
            } else {
                // Show content even if translations failed
                document.body.classList.add('i18n-ready');
            }
        }
    }

    async loadTranslations(lang) {
        // Use relative path with versioning and timestamp to prevent caching
        // Timestamp ensures fresh load even if HTML is cached
        const timestamp = Date.now();
        const url = `locales/${lang}.json?v=${this.translationsVersion}&t=${timestamp}`;
        const response = await fetch(url, {
            cache: 'no-cache',
            headers: {
                'Accept': 'application/json',
                'Cache-Control': 'no-cache, no-store, must-revalidate',
                'Pragma': 'no-cache'
            }
        });
        
        if (!response.ok) {
            throw new Error(`Failed to load translations for ${lang}: ${response.status}`);
        }
        
        this.translations = await response.json();
    }

    translate(key) {
        const keys = key.split('.');
        let value = this.translations;
        
        for (const k of keys) {
            if (value && typeof value === 'object') {
                value = value[k];
            } else {
                return key; // Return key if translation not found
            }
        }
        
        return value || key;
    }

    updatePageContent() {
        document.querySelectorAll('[data-i18n]').forEach(element => {
            const key = element.getAttribute('data-i18n');
            const translation = this.translate(key);
            
            if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                element.placeholder = translation;
            } else if (element.tagName === 'TITLE') {
                element.textContent = translation;
            } else {
                element.textContent = translation;
            }
        });
        
        // Update HTML lang attribute
        document.documentElement.lang = this.currentLang;
    }

    async changeLanguage(lang) {
        if (lang === this.currentLang || !this.supportedLangs.includes(lang)) {
            return;
        }
        
        this.currentLang = lang;
        localStorage.setItem('language', lang);
        
        // Update select values (both desktop and mobile)
        const langSelect = document.getElementById('langSelect');
        if (langSelect) {
            langSelect.value = lang;
        }
        const langSelectMobile = document.getElementById('langSelectMobile');
        if (langSelectMobile) {
            langSelectMobile.value = lang;
        }
        
        await this.loadTranslations(lang);
        this.updatePageContent();
    }

    setupLanguageSwitcher() {
        // Desktop select
        const langSelect = document.getElementById('langSelect');
        if (langSelect) {
            langSelect.value = this.currentLang;
            langSelect.addEventListener('change', (e) => {
                const lang = e.target.value;
                this.changeLanguage(lang);
            });
        }
        
        // Mobile select
        const langSelectMobile = document.getElementById('langSelectMobile');
        if (langSelectMobile) {
            langSelectMobile.value = this.currentLang;
            langSelectMobile.addEventListener('change', (e) => {
                const lang = e.target.value;
                this.changeLanguage(lang);
            });
        }
    }
}

// Initialize i18n when DOM is ready
let i18n;
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        i18n = new I18n();
    });
} else {
    i18n = new I18n();
}

