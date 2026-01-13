/**
 * About Page JavaScript
 * Handles the work process slider functionality
 */

(function() {
    'use strict';

    // Wait for DOM to be ready
    document.addEventListener('DOMContentLoaded', initAboutPage);

    function initAboutPage() {
        initWorkSlider();
    }

    /**
     * Initialize the work process slider
     */
    function initWorkSlider() {
        const slider = document.getElementById('workSlider');
        const track = document.getElementById('workSliderTrack');
        const prevBtn = document.getElementById('workSliderPrev');
        const nextBtn = document.getElementById('workSliderNext');
        const dotsContainer = document.getElementById('workSliderDots');

        if (!slider || !track) return;

        const slides = track.querySelectorAll('.slider-slide');
        const totalSlides = slides.length;
        let currentSlide = 0;
        let autoPlayInterval = null;
        let touchStartX = 0;
        let touchEndX = 0;

        // Create dots
        function createDots() {
            if (!dotsContainer) return;

            dotsContainer.innerHTML = '';
            for (let i = 0; i < totalSlides; i++) {
                const dot = document.createElement('button');
                dot.className = 'slider-dot' + (i === 0 ? ' active' : '');
                dot.setAttribute('aria-label', `Slide ${i + 1}`);
                dot.addEventListener('click', () => goToSlide(i));
                dotsContainer.appendChild(dot);
            }
        }

        // Update dots
        function updateDots() {
            if (!dotsContainer) return;

            const dots = dotsContainer.querySelectorAll('.slider-dot');
            dots.forEach((dot, index) => {
                dot.classList.toggle('active', index === currentSlide);
            });
        }

        // Go to specific slide
        function goToSlide(index) {
            if (index < 0) {
                currentSlide = totalSlides - 1;
            } else if (index >= totalSlides) {
                currentSlide = 0;
            } else {
                currentSlide = index;
            }

            track.style.transform = `translateX(-${currentSlide * 100}%)`;
            updateDots();
            resetAutoPlay();
        }

        // Next slide
        function nextSlide() {
            goToSlide(currentSlide + 1);
        }

        // Previous slide
        function prevSlide() {
            goToSlide(currentSlide - 1);
        }

        // Auto play
        function startAutoPlay() {
            autoPlayInterval = setInterval(nextSlide, 5000);
        }

        function stopAutoPlay() {
            if (autoPlayInterval) {
                clearInterval(autoPlayInterval);
                autoPlayInterval = null;
            }
        }

        function resetAutoPlay() {
            stopAutoPlay();
            startAutoPlay();
        }

        // Touch events for mobile swipe
        function handleTouchStart(e) {
            touchStartX = e.changedTouches[0].screenX;
            stopAutoPlay();
        }

        function handleTouchEnd(e) {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
            startAutoPlay();
        }

        function handleSwipe() {
            const swipeThreshold = 50;
            const diff = touchStartX - touchEndX;

            if (Math.abs(diff) > swipeThreshold) {
                if (diff > 0) {
                    nextSlide();
                } else {
                    prevSlide();
                }
            }
        }

        // Event listeners
        if (prevBtn) {
            prevBtn.addEventListener('click', prevSlide);
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', nextSlide);
        }

        // Touch events
        slider.addEventListener('touchstart', handleTouchStart, { passive: true });
        slider.addEventListener('touchend', handleTouchEnd, { passive: true });

        // Pause on hover
        slider.addEventListener('mouseenter', stopAutoPlay);
        slider.addEventListener('mouseleave', startAutoPlay);

        // Keyboard navigation
        slider.setAttribute('tabindex', '0');
        slider.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') {
                prevSlide();
            } else if (e.key === 'ArrowRight') {
                nextSlide();
            }
        });

        // Initialize
        createDots();
        startAutoPlay();

        // Pause autoplay when page is not visible
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                stopAutoPlay();
            } else {
                startAutoPlay();
            }
        });
    }
})();
