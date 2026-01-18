// Reviews page modal functionality

document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('reviewModal');
    if (!modal) return;

    const modalText = document.getElementById('modalText');
    const modalAuthor = document.getElementById('modalAuthor');
    const modalSource = document.getElementById('modalSource');
    const modalOriginalLink = document.getElementById('modalOriginalLink');
    const closeBtn = modal.querySelector('.review-modal-close');

    // Review data with original links
    const reviewLinks = {
        review1: 'https://booksy.com/pl-pl/185614_osteojump_osteopatia_3_warszawa#ba_s=seo',
        review2: 'https://booksy.com/pl-pl/185614_osteojump_osteopatia_3_warszawa#ba_s=seo',
        review3: 'https://booksy.com/pl-pl/185614_osteojump_osteopatia_3_warszawa#ba_s=seo',
        review4: 'https://booksy.com/pl-pl/185614_osteojump_osteopatia_3_warszawa#ba_s=seo'
    };

    // Open modal
    window.openReviewModal = function(reviewId) {
        const card = document.querySelector(`[data-review-id="${reviewId}"]`);
        if (!card) return;

        const fullText = card.dataset.fullText;
        const author = card.querySelector('.featured-author')?.textContent || '';
        const source = card.querySelector('.featured-source')?.textContent || '';

        modalText.textContent = fullText;
        modalAuthor.textContent = author;
        modalSource.textContent = source;

        if (modalOriginalLink && reviewLinks[reviewId]) {
            modalOriginalLink.href = reviewLinks[reviewId];
        }

        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    };

    // Close modal
    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }

    // Close button click
    if (closeBtn) {
        closeBtn.addEventListener('click', closeModal);
    }

    // Close on overlay click
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });

    // Close on Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });
});
