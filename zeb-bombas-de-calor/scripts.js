/**
 * Initialize image slideshow for service cards
 * If a service card has multiple images, they will auto-rotate every 2 seconds
 */
function initializeServiceCardSlideshows() {
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
        const imageContainer = card.querySelector('.service-card-image-container');
        if (!imageContainer) return;
        
        const images = imageContainer.querySelectorAll('img');
        if (images.length <= 1) return; // No slideshow needed for single image
        
        let currentIndex = 0;
        images[currentIndex].classList.add('active');
        
        // Rotate images every 2 seconds
        setInterval(() => {
            images[currentIndex].classList.remove('active');
            currentIndex = (currentIndex + 1) % images.length;
            images[currentIndex].classList.add('active');
        }, 2000);
    });
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeServiceCardSlideshows);
