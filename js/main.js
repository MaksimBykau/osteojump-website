// Main application logic
// Global carousel autoplay control
let globalCarouselAutoplay = null;

document.addEventListener('DOMContentLoaded', () => {
    // Hamburger menu toggle for overflow sidebar
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    let overflowSidebar = document.querySelector('.nav-overflow-sidebar');

    // Create overflow sidebar if it doesn't exist
    if (!overflowSidebar) {
        overflowSidebar = document.createElement('div');
        overflowSidebar.className = 'nav-overflow-sidebar';
        document.body.appendChild(overflowSidebar);
    }

    if (menuToggle && overflowSidebar) {
        menuToggle.addEventListener('click', () => {
            const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
            menuToggle.setAttribute('aria-expanded', !isExpanded);
            overflowSidebar.classList.toggle('active');
        });

        // Close menu when clicking on a link
        overflowSidebar.addEventListener('click', (e) => {
            if (e.target.tagName === 'A') {
                menuToggle.setAttribute('aria-expanded', 'false');
                overflowSidebar.classList.remove('active');
            }
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!overflowSidebar.contains(e.target) && !menuToggle.contains(e.target)) {
                menuToggle.setAttribute('aria-expanded', 'false');
                overflowSidebar.classList.remove('active');
            }
        });
    }
    
    // Mark active menu item based on current page
    const currentPage = window.location.pathname.split('/').pop() || '';
    const currentPageClean = currentPage.replace(/\.html$/, ''); // Remove .html if present
    navMenu?.querySelectorAll('a').forEach(link => {
        const linkPage = link.getAttribute('href');
        const linkPageClean = linkPage.replace(/^\//, '').replace(/\.html$/, ''); // Remove leading / and .html
        
        // Check if it's the home page (empty, index.html, or /)
        if ((currentPageClean === '' || currentPage === 'index.html') && (linkPage === '/' || linkPage === 'index.html' || linkPageClean === '')) {
            link.classList.add('active');
        } else if (linkPageClean === currentPageClean || linkPage === '/' + currentPageClean) {
            link.classList.add('active');
        }
    });

    // Adaptive Navigation Menu with Overflow Detection
    function initAdaptiveMenu() {
        const nav = document.querySelector('.nav');
        const navMenu = document.querySelector('.nav-menu');
        const menuToggle = document.querySelector('.menu-toggle');
        const langSelectWrapper = document.querySelector('.lang-select-wrapper');
        const overflowSidebar = document.querySelector('.nav-overflow-sidebar');

        if (!nav || !navMenu || !overflowSidebar) return;

        let resizeTimeout;

        function checkMenuOverflow() {
            // Get the actual width allocated to nav-menu by flexbox
            const navMenuRect = navMenu.getBoundingClientRect();
            const availableWidth = navMenuRect.width;

            const menuItems = Array.from(navMenu.querySelectorAll('li'));

            // Show all items temporarily to get accurate measurements
            menuItems.forEach(item => item.style.display = '');

            // Measure all items at once (single reflow)
            const itemWidths = menuItems.map((item, index) => {
                const itemWidth = item.getBoundingClientRect().width;
                const gapAfterItem = (index < menuItems.length - 1) ? 8 : 0;
                return itemWidth + gapAfterItem;
            });

            // Find overflow point
            let currentWidth = 0;
            let overflowIndex = -1;

            for (let i = 0; i < itemWidths.length; i++) {
                if (currentWidth + itemWidths[i] > availableWidth) {
                    overflowIndex = i;
                    break;
                }
                currentWidth += itemWidths[i];
            }

            // Move overflow items to hamburger sidebar
            if (overflowIndex >= 0 && overflowIndex < menuItems.length) {
                // Show hamburger button
                if (menuToggle) menuToggle.classList.add('visible');
                // Clear sidebar
                overflowSidebar.innerHTML = '';
                // Add overflow items to sidebar
                menuItems.slice(overflowIndex).forEach(item => {
                    overflowSidebar.appendChild(item.cloneNode(true));
                    item.style.display = 'none';
                });
            } else {
                // All items fit, hide hamburger
                if (menuToggle) menuToggle.classList.remove('visible');
                overflowSidebar.innerHTML = '';
                menuItems.forEach(item => {
                    item.style.display = '';
                });
            }
        }

        // Debounced resize handler
        window.addEventListener('resize', () => {
            checkMenuOverflow(); // Immediate call for responsiveness
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(checkMenuOverflow, 50); // Reduced debounce delay
        });

        // Initial check
        checkMenuOverflow();
    }

    // Initialize adaptive menu
    initAdaptiveMenu();

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Add click handler for CTA button
    const ctaButton = document.querySelector('.cta-button');
    if (ctaButton) {
        ctaButton.addEventListener('click', (e) => {
            // Placeholder link - will be updated later
            if (ctaButton.getAttribute('href') === '#') {
                e.preventDefault();
            }
        });
    }
    
    // Reviews Carousel
    const reviewsCarousel = document.getElementById('reviewsCarousel');
    const reviewsTrack = document.getElementById('reviewsTrack');
    const carouselPrev = document.getElementById('carouselPrev');
    const carouselNext = document.getElementById('carouselNext');
    const carouselDots = document.getElementById('carouselDots');
    
    if (reviewsCarousel && reviewsTrack) {
        const reviewCards = reviewsTrack.querySelectorAll('.review-card');
        let currentIndex = 0;
        let autoplayInterval = null;
        let autoplayPausedByUser = false; // Track if autoplay was paused by user action
        
        // Create dots if there are multiple reviews
        if (reviewCards.length > 1 && carouselDots) {
            reviewCards.forEach((_, index) => {
                const dot = document.createElement('button');
                dot.classList.add('carousel-dot');
                if (index === 0) dot.classList.add('active');
                dot.setAttribute('aria-label', `Go to review ${index + 1}`);
                dot.addEventListener('click', () => goToSlide(index, false)); // User action
                carouselDots.appendChild(dot);
            });
        }
        
        function updateCarousel() {
            const translateX = -currentIndex * 100;
            reviewsTrack.style.transform = `translateX(${translateX}%)`;
            
            // Update dots
            if (carouselDots) {
                carouselDots.querySelectorAll('.carousel-dot').forEach((dot, index) => {
                    dot.classList.toggle('active', index === currentIndex);
                });
            }
            
            // Show/hide navigation buttons
            if (carouselPrev) carouselPrev.style.display = reviewCards.length > 1 ? 'flex' : 'none';
            if (carouselNext) carouselNext.style.display = reviewCards.length > 1 ? 'flex' : 'none';
        }
        
        function goToSlide(index, isAutoPlay = false) {
            if (index < 0) {
                currentIndex = reviewCards.length - 1;
            } else if (index >= reviewCards.length) {
                currentIndex = 0;
            } else {
                currentIndex = index;
            }
            
            // Collapse all reviews if user manually navigated
            if (!isAutoPlay) {
                reviewCards.forEach(card => {
                    card.classList.remove('expanded');
                    const readMoreBtn = card.querySelector('.review-read-more');
                    if (readMoreBtn) {
                        if (window.i18n) {
                            readMoreBtn.textContent = window.i18n.translate('reviews.read_more');
                        } else {
                            readMoreBtn.textContent = 'Читать далее';
                        }
                        // Re-check if button should be visible after collapse
                        setTimeout(() => {
                            if (window.checkAllReviewCards) {
                                window.checkAllReviewCards();
                            }
                        }, 150);
                    }
                });
                
                // Scroll to reviews section after collapse animation
                setTimeout(() => {
                    const reviewsSection = document.querySelector('.reviews-carousel-section');
                    if (reviewsSection) {
                        const headerHeight = document.querySelector('.header')?.offsetHeight || 0;
                        const targetPosition = reviewsSection.getBoundingClientRect().top + window.pageYOffset - headerHeight - 20;
                        window.scrollTo({
                            top: targetPosition,
                            behavior: 'smooth'
                        });
                    }
                }, 100);
            }
            
            updateCarousel();
            if (!isAutoPlay) {
                // Always resume autoplay when user manually navigates
                autoplayPausedByUser = false;
                if (globalCarouselAutoplay) {
                    globalCarouselAutoplay.setPaused(false);
                }
                resetAutoplay();
            }
        }
        
        function nextSlide(isAutoPlay = false) {
            goToSlide(currentIndex + 1, isAutoPlay);
        }
        
        function prevSlide(isAutoPlay = false) {
            goToSlide(currentIndex - 1, isAutoPlay);
        }
        
        function startAutoplay() {
            if (reviewCards.length > 1 && !autoplayPausedByUser) {
                autoplayInterval = setInterval(() => {
                    nextSlide(true); // Pass true to indicate autoplay
                }, 5000);
            }
        }
        
        function stopAutoplay() {
            if (autoplayInterval) {
                clearInterval(autoplayInterval);
                autoplayInterval = null;
            }
        }
        
        function resetAutoplay() {
            stopAutoplay();
            if (!autoplayPausedByUser) {
                startAutoplay();
            }
        }
        
        // Expose methods for external use (before event listeners)
        globalCarouselAutoplay = {
            stop: () => {
                stopAutoplay();
                autoplayPausedByUser = true; // Синхронизируем локальную переменную
            },
            start: startAutoplay,
            reset: resetAutoplay,
            paused: false,
            setPaused: (value) => {
                autoplayPausedByUser = value; // Синхронизируем локальную переменную
            }
        };
        
        reviewsCarousel._carouselInstance = {
            stopAutoplay: stopAutoplay,
            startAutoplay: startAutoplay,
            resetAutoplay: resetAutoplay,
            get autoplayPausedByUser() { return autoplayPausedByUser; },
            set autoplayPausedByUser(value) { 
                autoplayPausedByUser = value;
                if (globalCarouselAutoplay) {
                    globalCarouselAutoplay.paused = value;
                }
            }
        };
        
        // Event listeners
        if (carouselNext) {
            carouselNext.addEventListener('click', () => {
                nextSlide(false); // User action
            });
        }
        
        if (carouselPrev) {
            carouselPrev.addEventListener('click', () => {
                prevSlide(false); // User action
            });
        }
        
        // Pause autoplay on hover
        reviewsCarousel.addEventListener('mouseenter', stopAutoplay);
        reviewsCarousel.addEventListener('mouseleave', startAutoplay);
        
        // Touch/swipe support for mobile
        let touchStartX = 0;
        let touchEndX = 0;
        
        reviewsTrack.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        });
        
        reviewsTrack.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        });
        
        function handleSwipe() {
            if (touchEndX < touchStartX - 50) {
                nextSlide(false); // User action
            }
            if (touchEndX > touchStartX + 50) {
                prevSlide(false); // User action
            }
        }
        
        // Initialize
        updateCarousel();
        startAutoplay();
    }
    
    // Review read more functionality
    const allReviewCards = document.querySelectorAll('.review-card');
    const checkTextHeightFunctions = [];
    
    // Function to check all review cards
    const checkAllReviewCards = () => {
        checkTextHeightFunctions.forEach(checkFn => {
            if (typeof checkFn === 'function') {
                checkFn();
            }
        });
    };
    
    allReviewCards.forEach((card) => {
        const textWrapper = card.querySelector('.review-text-wrapper');
        const reviewText = card.querySelector('.review-text');
        const readMoreBtn = card.querySelector('.review-read-more');
        
        if (textWrapper && reviewText && readMoreBtn) {
            // Check if text needs truncation - check if text is actually clamped
            const checkTextHeight = () => {
                if (!card.classList.contains('expanded')) {
                    // Force reflow to get accurate measurements
                    void card.offsetHeight;
                    
                    // Get computed styles
                    const computedStyle = window.getComputedStyle(reviewText);
                    const textHeight = reviewText.scrollHeight;
                    const textClientHeight = reviewText.clientHeight;
                    
                    // Get line height for accurate comparison
                    const lineHeight = parseFloat(computedStyle.lineHeight) || parseFloat(computedStyle.fontSize) * 1.8;
                    const fontSize = parseFloat(computedStyle.fontSize);
                    const expectedHeight = lineHeight * 5; // 5 lines
                    
                    // Show button if text height exceeds 5 lines
                    // Use a small threshold to account for rounding
                    if (textHeight > expectedHeight + lineHeight * 0.1) {
                        readMoreBtn.classList.remove('hidden');
                    } else {
                        readMoreBtn.classList.add('hidden');
                    }
                } else {
                    // When expanded, always show "read less" button
                    readMoreBtn.classList.remove('hidden');
                }
            };
            
            // Save function for external calls
            checkTextHeightFunctions.push(checkTextHeight);
            
            // Check on load and resize
            checkTextHeight();
            window.addEventListener('resize', checkTextHeight);
            
            // Toggle expand/collapse
            readMoreBtn.addEventListener('click', () => {
                const isExpanded = card.classList.contains('expanded');
                
                if (isExpanded) {
                    card.classList.remove('expanded');
                    // Get translation for "read_more"
                    const readMoreKey = readMoreBtn.getAttribute('data-i18n');
                    if (readMoreKey && window.i18n) {
                        readMoreBtn.textContent = window.i18n.translate(readMoreKey);
                    } else {
                        readMoreBtn.textContent = 'Читать далее';
                    }
                    // Re-check after collapse
                    setTimeout(checkTextHeight, 100);
                    
                    // Resume autoplay when user collapses review
                    if (globalCarouselAutoplay) {
                        globalCarouselAutoplay.setPaused(false);
                        globalCarouselAutoplay.reset();
                    }
                    
                    // Scroll to reviews section after collapse animation
                    setTimeout(() => {
                        const reviewsSection = document.querySelector('.reviews-carousel-section');
                        if (reviewsSection) {
                            const headerHeight = document.querySelector('.header')?.offsetHeight || 0;
                            const targetPosition = reviewsSection.getBoundingClientRect().top + window.pageYOffset - headerHeight - 20;
                            window.scrollTo({
                                top: targetPosition,
                                behavior: 'smooth'
                            });
                        }
                    }, 100);
                } else {
                    card.classList.add('expanded');
                    // Get translation for "read_less"
                    if (window.i18n) {
                        readMoreBtn.textContent = window.i18n.translate('reviews.read_less');
                    } else {
                        readMoreBtn.textContent = 'Свернуть';
                    }
                    
                    // Stop autoplay when user expands review
                    if (globalCarouselAutoplay) {
                        globalCarouselAutoplay.stop();
                        globalCarouselAutoplay.paused = true;
                    }
                }
            });
        }
    });
    
    // Expose function for external calls (e.g., from carousel)
    window.checkAllReviewCards = checkAllReviewCards;
    
    // Check after translations are loaded
    const checkAfterTranslations = () => {
        if (document.body.classList.contains('i18n-ready')) {
            setTimeout(checkAllReviewCards, 100);
        } else {
            // Wait for i18n-ready class
            const observer = new MutationObserver((mutations) => {
                mutations.forEach((mutation) => {
                    if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                        if (document.body.classList.contains('i18n-ready')) {
                            setTimeout(checkAllReviewCards, 100);
                            observer.disconnect();
                        }
                    }
                });
            });
            observer.observe(document.body, { attributes: true });
        }
    };
    
    checkAfterTranslations();
    
    // Also check when language changes - wait for i18n to be available
    const setupI18nHook = () => {
        if (window.i18n && window.i18n.updatePageContent) {
            const originalUpdatePageContent = window.i18n.updatePageContent.bind(window.i18n);
            window.i18n.updatePageContent = function() {
                originalUpdatePageContent();
                setTimeout(checkAllReviewCards, 100);
            };
        } else {
            // Retry after a short delay if i18n is not ready yet
            setTimeout(setupI18nHook, 100);
        }
    };
    
    setupI18nHook();

    // Fixed Action Bar handlers
    const actionBook = document.getElementById('actionBook');
    const actionContacts = document.getElementById('actionContacts');
    const actionDirections = document.getElementById('actionDirections');

    if (actionBook) {
        actionBook.addEventListener('click', () => {
            window.open('https://cdl.booksy.com/hwJaWJhtmNb', '_blank', 'noopener,noreferrer');
        });
    }

    if (actionContacts) {
        actionContacts.addEventListener('click', () => {
            const contactsSection = document.querySelector('.contacts-section');
            if (contactsSection) {
                const headerHeight = document.querySelector('.header')?.offsetHeight || 0;
                const targetPosition = contactsSection.getBoundingClientRect().top + window.pageYOffset - headerHeight - 20;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    }

    if (actionDirections) {
        actionDirections.addEventListener('click', () => {
            window.location.href = '/location';
        });
    }

    // Diplomas Carousel - Simple Implementation
    const diplomasCarousel = document.querySelector('.diplomas-carousel');
    if (diplomasCarousel) {
        const track = diplomasCarousel.querySelector('.carousel-track');
        const slides = Array.from(track.querySelectorAll('.diploma-slide'));
        const prevBtn = diplomasCarousel.querySelector('.carousel-prev');
        const nextBtn = diplomasCarousel.querySelector('.carousel-next');
        const dotsContainer = document.getElementById('diplomaCarouselDots');
        const modal = document.getElementById('diplomaModal');
        const modalImage = document.getElementById('modalImage');
        const modalClose = modal?.querySelector('.modal-close');
        const modalPrev = modal?.querySelector('.modal-prev');
        const modalNext = modal?.querySelector('.modal-next');

        let currentSlide = 0;
        let currentModalIndex = 0;
        let autoscrollInterval = null;

        // Create dots - one per slide
        function createDots() {
            if (!dotsContainer) return;
            dotsContainer.innerHTML = '';
            slides.forEach((_, index) => {
                const dot = document.createElement('button');
                dot.classList.add('carousel-dot');
                if (index === 0) dot.classList.add('active');
                dot.setAttribute('aria-label', `Go to slide ${index + 1}`);
                dot.addEventListener('click', () => goToSlide(index));
                dotsContainer.appendChild(dot);
            });
        }

        // Update carousel position - simple percentage-based
        function updateCarousel() {
            if (slides.length === 0) return;

            // Move by 100% per slide (simple and reliable)
            const moveAmount = currentSlide * 100;
            track.style.transform = `translateX(-${moveAmount}%)`;

            // Update dots
            if (dotsContainer) {
                const dots = dotsContainer.querySelectorAll('.carousel-dot');
                dots.forEach((dot, index) => {
                    dot.classList.toggle('active', index === currentSlide);
                });
            }
        }

        // Go to specific slide
        function goToSlide(index) {
            currentSlide = Math.max(0, Math.min(index, slides.length - 1));
            updateCarousel();
            resetAutoscroll();
        }

        // Navigate carousel
        function nextSlide() {
            if (currentSlide < slides.length - 1) {
                currentSlide++;
            } else {
                currentSlide = 0; // Loop back to start
            }
            updateCarousel();
        }

        function prevSlide() {
            if (currentSlide > 0) {
                currentSlide--;
            } else {
                currentSlide = slides.length - 1; // Loop to end
            }
            updateCarousel();
        }

        // Autoscroll functions
        function startAutoscroll() {
            stopAutoscroll();
            autoscrollInterval = setInterval(() => {
                nextSlide();
            }, 4000); // Change slide every 4 seconds
        }

        function stopAutoscroll() {
            if (autoscrollInterval) {
                clearInterval(autoscrollInterval);
                autoscrollInterval = null;
            }
        }

        function resetAutoscroll() {
            stopAutoscroll();
            startAutoscroll();
        }

        // Event listeners for carousel navigation
        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                prevSlide();
                resetAutoscroll();
            });
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                nextSlide();
                resetAutoscroll();
            });
        }

        // Pause autoscroll on hover
        diplomasCarousel.addEventListener('mouseenter', stopAutoscroll);
        diplomasCarousel.addEventListener('mouseleave', startAutoscroll);

        // Touch/swipe support
        let touchStartX = 0;
        let touchEndX = 0;

        track.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
            stopAutoscroll();
        });

        track.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            const swipeThreshold = 50;
            if (touchEndX < touchStartX - swipeThreshold) {
                nextSlide();
            }
            if (touchEndX > touchStartX + swipeThreshold) {
                prevSlide();
            }
            resetAutoscroll();
        });

        // Fullscreen modal functionality
        function openModal(index) {
            if (!modal || !modalImage) return;

            stopAutoscroll(); // Stop autoscroll when modal opens
            currentModalIndex = index;
            const fullImagePath = slides[index]?.getAttribute('data-full');
            if (fullImagePath) {
                modalImage.src = fullImagePath;
                modal.classList.add('active');
                document.body.style.overflow = 'hidden'; // Prevent scrolling
            }
        }

        function closeModal() {
            if (!modal) return;
            modal.classList.remove('active');
            document.body.style.overflow = ''; // Restore scrolling
            startAutoscroll(); // Resume autoscroll when modal closes
        }

        function modalNextSlide() {
            currentModalIndex = (currentModalIndex + 1) % slides.length;
            const fullImagePath = slides[currentModalIndex]?.getAttribute('data-full');
            if (fullImagePath && modalImage) {
                modalImage.src = fullImagePath;
            }
        }

        function modalPrevSlide() {
            currentModalIndex = (currentModalIndex - 1 + slides.length) % slides.length;
            const fullImagePath = slides[currentModalIndex]?.getAttribute('data-full');
            if (fullImagePath && modalImage) {
                modalImage.src = fullImagePath;
            }
        }

        // Click on slide to open modal
        slides.forEach((slide, index) => {
            slide.addEventListener('click', () => openModal(index));
        });

        // Modal event listeners
        if (modalClose) {
            modalClose.addEventListener('click', closeModal);
        }

        if (modalPrev) {
            modalPrev.addEventListener('click', modalPrevSlide);
        }

        if (modalNext) {
            modalNext.addEventListener('click', modalNextSlide);
        }

        // Close modal on background click
        if (modal) {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    closeModal();
                }
            });
        }

        // Keyboard navigation in modal
        document.addEventListener('keydown', (e) => {
            if (!modal?.classList.contains('active')) return;

            if (e.key === 'Escape') {
                closeModal();
            } else if (e.key === 'ArrowLeft') {
                modalPrevSlide();
            } else if (e.key === 'ArrowRight') {
                modalNextSlide();
            }
        });

        // Update carousel on window resize
        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                updateCarousel();
            }, 150);
        });

        // Initialize
        createDots();
        updateCarousel();
        startAutoscroll();
    }

    // Location Page - Image Lightbox
    const locationImages = document.querySelectorAll('.location-image');
    const locationModal = document.getElementById('locationModal');

    if (locationImages.length > 0 && locationModal) {
        const locationModalImage = document.getElementById('locationModalImage');
        const locationModalClose = locationModal.querySelector('.modal-close');
        const locationModalPrev = locationModal.querySelector('.modal-prev');
        const locationModalNext = locationModal.querySelector('.modal-next');

        let currentLocationIndex = 0;
        const locationImageArray = Array.from(locationImages);

        function openLocationModal(index) {
            currentLocationIndex = index;
            const fullImagePath = locationImageArray[index]?.getAttribute('data-full');
            if (fullImagePath && locationModalImage) {
                locationModalImage.src = fullImagePath;
                locationModal.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        }

        function closeLocationModal() {
            locationModal.classList.remove('active');
            document.body.style.overflow = '';
        }

        function locationModalNextSlide() {
            currentLocationIndex = (currentLocationIndex + 1) % locationImageArray.length;
            const fullImagePath = locationImageArray[currentLocationIndex]?.getAttribute('data-full');
            if (fullImagePath && locationModalImage) {
                locationModalImage.src = fullImagePath;
            }
        }

        function locationModalPrevSlide() {
            currentLocationIndex = (currentLocationIndex - 1 + locationImageArray.length) % locationImageArray.length;
            const fullImagePath = locationImageArray[currentLocationIndex]?.getAttribute('data-full');
            if (fullImagePath && locationModalImage) {
                locationModalImage.src = fullImagePath;
            }
        }

        // Click on image to open modal
        locationImageArray.forEach((img, index) => {
            img.addEventListener('click', () => openLocationModal(index));
        });

        // Modal event listeners
        if (locationModalClose) {
            locationModalClose.addEventListener('click', closeLocationModal);
        }

        if (locationModalPrev) {
            locationModalPrev.addEventListener('click', locationModalPrevSlide);
        }

        if (locationModalNext) {
            locationModalNext.addEventListener('click', locationModalNextSlide);
        }

        // Close on background click
        locationModal.addEventListener('click', (e) => {
            if (e.target === locationModal) {
                closeLocationModal();
            }
        });

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (!locationModal.classList.contains('active')) return;

            if (e.key === 'Escape') {
                closeLocationModal();
            } else if (e.key === 'ArrowLeft') {
                locationModalPrevSlide();
            } else if (e.key === 'ArrowRight') {
                locationModalNextSlide();
            }
        });
    }
});



