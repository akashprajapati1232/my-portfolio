/*
* Lightbox JavaScript for Akash Prajapati's Portfolio
* Author: Akash Prajapati
* Version: 1.0
*/

document.addEventListener('DOMContentLoaded', function() {
    // Create lightbox elements
    createLightbox();
    
    // Initialize lightbox after modal is shown
    document.addEventListener('click', function(e) {
        if (e.target && e.target.classList.contains('gallery-img')) {
            initLightbox(e.target);
        }
    });
});

// Create lightbox elements
function createLightbox() {
    // Create lightbox container if it doesn't exist
    if (!document.getElementById('lightbox')) {
        const lightbox = document.createElement('div');
        lightbox.id = 'lightbox';
        lightbox.className = 'lightbox';
        
        lightbox.innerHTML = `
            <div class="lightbox-content">
                <img src="" alt="Enlarged Image" class="lightbox-img">
                <button class="lightbox-close">&times;</button>
                <div class="lightbox-nav">
                    <button class="lightbox-prev"><i class="fas fa-chevron-left"></i></button>
                    <button class="lightbox-next"><i class="fas fa-chevron-right"></i></button>
                </div>
                <div class="lightbox-counter">Image 1 of 6</div>
            </div>
        `;
        
        document.body.appendChild(lightbox);
        
        // Add event listeners
        const closeBtn = lightbox.querySelector('.lightbox-close');
        const prevBtn = lightbox.querySelector('.lightbox-prev');
        const nextBtn = lightbox.querySelector('.lightbox-next');
        
        closeBtn.addEventListener('click', closeLightbox);
        prevBtn.addEventListener('click', prevImage);
        nextBtn.addEventListener('click', nextImage);
        
        // Close lightbox when clicking outside the image
        lightbox.addEventListener('click', function(e) {
            if (e.target === lightbox) {
                closeLightbox();
            }
        });
        
        // Keyboard navigation
        document.addEventListener('keydown', function(e) {
            if (!lightbox.classList.contains('active')) return;
            
            if (e.key === 'Escape') {
                closeLightbox();
            } else if (e.key === 'ArrowLeft') {
                prevImage();
            } else if (e.key === 'ArrowRight') {
                nextImage();
            }
        });
    }
}

// Initialize lightbox with clicked image
function initLightbox(clickedImg) {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = lightbox.querySelector('.lightbox-img');
    const counter = lightbox.querySelector('.lightbox-counter');
    
    // Get all gallery images
    const galleryImages = Array.from(document.querySelectorAll('.gallery-img'));
    
    // Set current image index
    let currentIndex = galleryImages.indexOf(clickedImg);
    
    // Update counter
    counter.textContent = `Image ${currentIndex + 1} of ${galleryImages.length}`;
    
    // Set image source
    lightboxImg.src = clickedImg.src;
    lightboxImg.alt = clickedImg.alt;
    
    // Store current index and gallery images in lightbox
    lightbox.dataset.currentIndex = currentIndex;
    lightbox.dataset.totalImages = galleryImages.length;
    
    // Show lightbox
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent scrolling
    
    // Preload adjacent images
    preloadImages(galleryImages, currentIndex);
}

// Close lightbox
function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    lightbox.classList.remove('active');
    document.body.style.overflow = 'auto'; // Enable scrolling
}

// Navigate to previous image
function prevImage() {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = lightbox.querySelector('.lightbox-img');
    const counter = lightbox.querySelector('.lightbox-counter');
    
    // Get current index and total images
    let currentIndex = parseInt(lightbox.dataset.currentIndex);
    const totalImages = parseInt(lightbox.dataset.totalImages);
    
    // Calculate previous index
    currentIndex = (currentIndex - 1 + totalImages) % totalImages;
    
    // Update lightbox
    const galleryImages = document.querySelectorAll('.gallery-img');
    lightboxImg.src = galleryImages[currentIndex].src;
    lightboxImg.alt = galleryImages[currentIndex].alt;
    
    // Update counter
    counter.textContent = `Image ${currentIndex + 1} of ${totalImages}`;
    
    // Update current index
    lightbox.dataset.currentIndex = currentIndex;
    
    // Preload adjacent images
    preloadImages(Array.from(galleryImages), currentIndex);
}

// Navigate to next image
function nextImage() {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = lightbox.querySelector('.lightbox-img');
    const counter = lightbox.querySelector('.lightbox-counter');
    
    // Get current index and total images
    let currentIndex = parseInt(lightbox.dataset.currentIndex);
    const totalImages = parseInt(lightbox.dataset.totalImages);
    
    // Calculate next index
    currentIndex = (currentIndex + 1) % totalImages;
    
    // Update lightbox
    const galleryImages = document.querySelectorAll('.gallery-img');
    lightboxImg.src = galleryImages[currentIndex].src;
    lightboxImg.alt = galleryImages[currentIndex].alt;
    
    // Update counter
    counter.textContent = `Image ${currentIndex + 1} of ${totalImages}`;
    
    // Update current index
    lightbox.dataset.currentIndex = currentIndex;
    
    // Preload adjacent images
    preloadImages(Array.from(galleryImages), currentIndex);
}

// Preload adjacent images for smoother navigation
function preloadImages(images, currentIndex) {
    const totalImages = images.length;
    
    // Preload next image
    const nextIndex = (currentIndex + 1) % totalImages;
    const nextImage = new Image();
    nextImage.src = images[nextIndex].src;
    
    // Preload previous image
    const prevIndex = (currentIndex - 1 + totalImages) % totalImages;
    const prevImage = new Image();
    prevImage.src = images[prevIndex].src;
}
