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
        
        // Hide non-active images from screen readers
        images.forEach((img, index) => {
            if (index !== currentIndex) {
                img.setAttribute('aria-hidden', 'true');
            }
        });
        
        // Rotate images every 2 seconds
        const intervalId = setInterval(() => {
            images[currentIndex].classList.remove('active');
            images[currentIndex].setAttribute('aria-hidden', 'true');
            
            currentIndex = (currentIndex + 1) % images.length;
            
            images[currentIndex].classList.add('active');
            images[currentIndex].removeAttribute('aria-hidden');
        }, 2000);
        
        // Store interval ID as property for potential cleanup
        imageContainer._intervalId = intervalId;
    });
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeServiceCardSlideshows);
