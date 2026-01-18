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
        review1: 'https://maps.app.goo.gl/akVwseGDdxJizPSQ9',
        review2: 'https://www.instagram.com/s/aGlnaGxpZ2h0OjE3ODU4NzU5MjU1Mjc3NTU0?story_media_id=3732375181076488393&igsh=YnFnaGh4eGthc2pu',
        review3: 'https://maps.app.goo.gl/AbSQWRuFB8o8RLwRA',
        review4: 'https://maps.app.goo.gl/2W3duk2WpGFVNusf9',
        review5: 'https://maps.app.goo.gl/ZhVLGZGVvj73BZgp6',
        review6: 'https://maps.app.goo.gl/UbwsFba9kWLKyWRy7'
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
