// Main application logic
document.addEventListener('DOMContentLoaded', () => {
    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
            menuToggle.setAttribute('aria-expanded', !isExpanded);
            navMenu.classList.toggle('active');
        });
        
        // Close menu when clicking on a link
        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.setAttribute('aria-expanded', 'false');
                navMenu.classList.remove('active');
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!navMenu.contains(e.target) && !menuToggle.contains(e.target)) {
                menuToggle.setAttribute('aria-expanded', 'false');
                navMenu.classList.remove('active');
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
                    const wasExpanded = card.classList.contains('expanded');
                    card.classList.remove('expanded');
                    const readMoreBtn = card.querySelector('.review-read-more');
                    if (readMoreBtn) {
                        if (window.i18n) {
                            readMoreBtn.textContent = window.i18n.translate('reviews.read_more');
                        } else {
                            readMoreBtn.textContent = 'Читать далее';
                        }
                        // Re-check if button should be visible
                        if (wasExpanded) {
                            setTimeout(() => {
                                const textWrapper = card.querySelector('.review-text-wrapper');
                                const reviewText = card.querySelector('.review-text');
                                if (textWrapper && reviewText) {
                                    const computedStyle = window.getComputedStyle(reviewText);
                                    const lineHeight = parseFloat(computedStyle.lineHeight);
                                    const textHeight = reviewText.scrollHeight;
                                    const wrapperHeight = textWrapper.clientHeight;
                                    if (textHeight <= wrapperHeight + lineHeight) {
                                        readMoreBtn.classList.add('hidden');
                                    } else {
                                        readMoreBtn.classList.remove('hidden');
                                    }
                                }
                            }, 50);
                        }
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
                // Resume autoplay if it was paused by user
                if (autoplayPausedByUser) {
                    autoplayPausedByUser = false;
                    resetAutoplay();
                } else {
                    resetAutoplay();
                }
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
        reviewsCarousel._carouselInstance = {
            stopAutoplay: stopAutoplay,
            startAutoplay: startAutoplay,
            resetAutoplay: resetAutoplay,
            get autoplayPausedByUser() { return autoplayPausedByUser; },
            set autoplayPausedByUser(value) { autoplayPausedByUser = value; }
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
    allReviewCards.forEach((card) => {
        const textWrapper = card.querySelector('.review-text-wrapper');
        const reviewText = card.querySelector('.review-text');
        const readMoreBtn = card.querySelector('.review-read-more');
        
        if (textWrapper && reviewText && readMoreBtn) {
            // Check if text needs truncation
            const checkTextHeight = () => {
                // Only check if not expanded
                if (!card.classList.contains('expanded')) {
                    readMoreBtn.classList.remove('hidden');
                    
                    // Get computed line height
                    const computedStyle = window.getComputedStyle(reviewText);
                    const lineHeight = parseFloat(computedStyle.lineHeight);
                    const textHeight = reviewText.scrollHeight;
                    const wrapperHeight = textWrapper.clientHeight;
                    
                    // Check if text exceeds wrapper height by at least one line
                    // This prevents cutting off half a line
                    if (textHeight <= wrapperHeight + lineHeight) {
                        readMoreBtn.classList.add('hidden');
                    }
                }
            };
            
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
                } else {
                    card.classList.add('expanded');
                    // Get translation for "read_less"
                    if (window.i18n) {
                        readMoreBtn.textContent = window.i18n.translate('reviews.read_less');
                    } else {
                        readMoreBtn.textContent = 'Свернуть';
                    }
                    
                    // Stop autoplay when user expands review
                    const reviewsCarousel = document.getElementById('reviewsCarousel');
                    if (reviewsCarousel) {
                        const carouselInstance = reviewsCarousel._carouselInstance;
                        if (carouselInstance) {
                            carouselInstance.stopAutoplay();
                            carouselInstance.autoplayPausedByUser = true;
                        }
                    }
                }
            });
        }
    });
});



