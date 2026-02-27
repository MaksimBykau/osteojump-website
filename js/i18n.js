class I18n {
    constructor() {
        this.supportedLangs = ['pl', 'uk', 'en', 'de', 'ru'];
        this.defaultLang = 'pl';
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
        // Setup language switcher first
        this.setupLanguageSwitcher();
        
        try {
            await this.loadTranslations(this.currentLang);
            this.updatePageContent();
            this.updateLanguageButton();
            // Show content after translations are loaded
            document.body.classList.add('i18n-ready');
        } catch (error) {
            console.error('Error loading translations:', error);
            // Try to load default language translations
            if (this.currentLang !== this.defaultLang) {
                try {
                    await this.loadTranslations(this.defaultLang);
                    this.currentLang = this.defaultLang;
                    this.updateLanguageButton();
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
        const url = `/locales/${lang}.json?v=${this.translationsVersion}&t=${timestamp}`;
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
                // For title, add " - OsteoJump" suffix if not already present
                let titleText = translation;
                if (!titleText.includes(' - OsteoJump') && titleText !== 'OsteoJump') {
                    titleText = translation + ' - OsteoJump';
                }
                element.textContent = titleText;
            } else {
                element.textContent = translation;
            }
        });

        // Handle elements with HTML content (data-i18n-html)
        document.querySelectorAll('[data-i18n-html]').forEach(element => {
            const key = element.getAttribute('data-i18n-html');
            const translation = this.translate(key);
            element.innerHTML = translation;
        });

        // Update HTML lang attribute
        document.documentElement.lang = this.currentLang;
    }

    async changeLanguage(lang) {
        if (!lang || lang === this.currentLang || !this.supportedLangs.includes(lang)) {
            return;
        }
        
        const previousLang = this.currentLang;
        this.currentLang = lang;
        localStorage.setItem('language', lang);
        
        // Close dropdown
        this.closeDropdown();
        
        // Update button text before loading translations
        this.updateLanguageButton();
        
        try {
            await this.loadTranslations(lang);
            this.updatePageContent();
        } catch (error) {
            console.error('Error changing language:', error);
            // Revert on error
            this.currentLang = previousLang;
            this.updateLanguageButton();
        }
    }
    
    updateLanguageButton() {
        const langText = document.getElementById('langSelectText');
        if (!langText) return;
        
        const langMap = {
            'ru': { flag: '🇷🇺', code: 'RU' },
            'en': { flag: '🇬🇧', code: 'EN' },
            'de': { flag: '🇩🇪', code: 'DE' },
            'pl': { flag: '🇵🇱', code: 'PL' },
            'uk': { flag: '🇺🇦', code: 'UK' }
        };
        
        const lang = langMap[this.currentLang] || langMap[this.defaultLang];
        langText.innerHTML = `<span class="flag-emoji">${lang.flag}</span> ${lang.code}`;
    }
    
    closeDropdown() {
        const dropdown = document.getElementById('langSelectDropdown');
        const btn = document.getElementById('langSelectBtn');
        if (dropdown) dropdown.classList.remove('active');
        if (btn) btn.setAttribute('aria-expanded', 'false');
    }

    setupLanguageSwitcher() {
        const langBtn = document.getElementById('langSelectBtn');
        const dropdown = document.getElementById('langSelectDropdown');
        const options = document.querySelectorAll('.lang-select-option');
        
        // Update button text
        this.updateLanguageButton();
        
        // Toggle dropdown on button click
        if (langBtn && dropdown) {
            langBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                const isExpanded = langBtn.getAttribute('aria-expanded') === 'true';
                if (isExpanded) {
                    dropdown.classList.remove('active');
                    langBtn.setAttribute('aria-expanded', 'false');
                } else {
                    dropdown.classList.add('active');
                    langBtn.setAttribute('aria-expanded', 'true');

                    // Close hamburger menu when opening language dropdown
                    const sidebar = document.querySelector('.nav-overflow-sidebar');
                    const menuToggle = document.querySelector('.menu-toggle');
                    if (sidebar) sidebar.classList.remove('active');
                    if (menuToggle) menuToggle.setAttribute('aria-expanded', 'false');
                }
            });
        }
        
        // Handle option clicks
        options.forEach(option => {
            option.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                const lang = option.getAttribute('data-lang');
                if (lang && lang !== this.currentLang) {
                    this.changeLanguage(lang);
                } else {
                    this.closeDropdown();
                }
            });
        });
        
        // Close dropdown when clicking outside
        document.addEventListener('click', (e) => {
            if (dropdown && langBtn && !dropdown.contains(e.target) && !langBtn.contains(e.target)) {
                this.closeDropdown();
            }
        });
        
        // Close dropdown on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeDropdown();
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

