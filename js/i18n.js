class I18n {
    constructor() {
        this.supportedLangs = ['ru', 'en', 'de', 'pl', 'uk'];
        this.defaultLang = 'en';
        this.currentLang = this.detectLanguage();
        this.translations = {};
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
        await this.loadTranslations(this.currentLang);
        this.updatePageContent();
        this.setupLanguageSwitcher();
        // Show content after translations are loaded
        document.body.classList.add('i18n-ready');
    }

    async loadTranslations(lang) {
        try {
            const response = await fetch(`locales/${lang}.json`);
            if (!response.ok) {
                throw new Error(`Failed to load translations for ${lang}`);
            }
            this.translations = await response.json();
        } catch (error) {
            console.error('Error loading translations:', error);
            // Fallback to default language
            if (lang !== this.defaultLang) {
                await this.loadTranslations(this.defaultLang);
                this.currentLang = this.defaultLang;
            }
        }
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
        await this.loadTranslations(lang);
        this.updatePageContent();
        this.updateActiveButton();
    }

    setupLanguageSwitcher() {
        document.querySelectorAll('.lang-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const lang = btn.getAttribute('data-lang');
                this.changeLanguage(lang);
            });
        });
        this.updateActiveButton();
    }

    updateActiveButton() {
        document.querySelectorAll('.lang-btn').forEach(btn => {
            if (btn.getAttribute('data-lang') === this.currentLang) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
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

