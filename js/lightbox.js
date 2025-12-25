/*
* Lightbox JavaScript for Akash Prajapati's Portfolio
* Author: Akash Prajapati
* Version: 1.1
*/

// Use a namespace to avoid conflicts with other lightbox implementations
const ProjectLightbox = {
    // Store references to DOM elements
    elements: {
        lightbox: null,
        lightboxImg: null,
        counter: null,
        prevBtn: null,
        nextBtn: null,
        closeBtn: null
    },

    // Store the current gallery context
    currentGallery: {
        images: [],
        currentIndex: 0,
        container: null
    }
};

document.addEventListener('DOMContentLoaded', function() {
    // Create lightbox elements
    ProjectLightbox.createLightbox();

    // Initialize lightbox after modal is shown
    document.addEventListener('click', function(e) {
        if (e.target && e.target.classList.contains('gallery-img') &&
            e.target.closest('.modal-gallery')) {
            ProjectLightbox.initLightbox(e.target);
        }
    });
});

// Create lightbox elements
ProjectLightbox.createLightbox = function() {
    // Create lightbox container if it doesn't exist
    if (!document.getElementById('project-lightbox')) {
        const lightbox = document.createElement('div');
        lightbox.id = 'project-lightbox';
        lightbox.className = 'lightbox project-lightbox';

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

        // Store references to DOM elements
        this.elements.lightbox = lightbox;
        this.elements.lightboxImg = lightbox.querySelector('.lightbox-img');
        this.elements.counter = lightbox.querySelector('.lightbox-counter');
        this.elements.closeBtn = lightbox.querySelector('.lightbox-close');
        this.elements.prevBtn = lightbox.querySelector('.lightbox-prev');
        this.elements.nextBtn = lightbox.querySelector('.lightbox-next');

        // Add event listeners
        this.elements.closeBtn.addEventListener('click', this.closeLightbox.bind(this));
        this.elements.prevBtn.addEventListener('click', this.prevImage.bind(this));
        this.elements.nextBtn.addEventListener('click', this.nextImage.bind(this));

        // Close lightbox when clicking outside the image
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                this.closeLightbox();
            }
        });

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (!this.elements.lightbox.classList.contains('active')) return;

            if (e.key === 'Escape') {
                this.closeLightbox();
            } else if (e.key === 'ArrowLeft') {
                this.prevImage();
            } else if (e.key === 'ArrowRight') {
                this.nextImage();
            }
        });
    }
}

// Initialize lightbox with clicked image
ProjectLightbox.initLightbox = function(clickedImg) {
    // Get the parent gallery container
    const galleryContainer = clickedImg.closest('.gallery-grid');

    // Get all gallery images within the same container
    const galleryImages = Array.from(galleryContainer.querySelectorAll('.gallery-img'));

    // Set current image index
    let currentIndex = galleryImages.indexOf(clickedImg);

    // Update counter
    this.elements.counter.textContent = `Image ${currentIndex + 1} of ${galleryImages.length}`;

    // Set image source
    this.elements.lightboxImg.src = clickedImg.src;
    this.elements.lightboxImg.alt = clickedImg.alt;

    // Store current gallery context
    this.currentGallery = {
        images: galleryImages,
        currentIndex: currentIndex,
        container: galleryContainer
    };

    // Show lightbox
    this.elements.lightbox.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent scrolling

    // Preload adjacent images
    this.preloadImages();
}

// Close lightbox
ProjectLightbox.closeLightbox = function() {
    this.elements.lightbox.classList.remove('active');
    document.body.style.overflow = 'auto'; // Enable scrolling

    // Reset current gallery context
    this.currentGallery = {
        images: [],
        currentIndex: 0,
        container: null
    };
}

// Navigate to previous image
ProjectLightbox.prevImage = function() {
    // Get current gallery context
    const { images, currentIndex } = this.currentGallery;
    const totalImages = images.length;

    if (totalImages === 0) return;

    // Calculate previous index
    const newIndex = (currentIndex - 1 + totalImages) % totalImages;

    // Update lightbox
    this.elements.lightboxImg.src = images[newIndex].src;
    this.elements.lightboxImg.alt = images[newIndex].alt;

    // Update counter
    this.elements.counter.textContent = `Image ${newIndex + 1} of ${totalImages}`;

    // Update current index
    this.currentGallery.currentIndex = newIndex;

    // Preload adjacent images
    this.preloadImages();
}

// Navigate to next image
ProjectLightbox.nextImage = function() {
    // Get current gallery context
    const { images, currentIndex } = this.currentGallery;
    const totalImages = images.length;

    if (totalImages === 0) return;

    // Calculate next index
    const newIndex = (currentIndex + 1) % totalImages;

    // Update lightbox
    this.elements.lightboxImg.src = images[newIndex].src;
    this.elements.lightboxImg.alt = images[newIndex].alt;

    // Update counter
    this.elements.counter.textContent = `Image ${newIndex + 1} of ${totalImages}`;

    // Update current index
    this.currentGallery.currentIndex = newIndex;

    // Preload adjacent images
    this.preloadImages();
}

// Preload adjacent images for smoother navigation
ProjectLightbox.preloadImages = function() {
    const { images, currentIndex } = this.currentGallery;
    const totalImages = images.length;

    if (totalImages <= 1) return;

    // Preload next image
    const nextIndex = (currentIndex + 1) % totalImages;
    if (images[nextIndex]) {
        const nextImageObj = new Image();
        nextImageObj.src = images[nextIndex].src;
    }

    // Preload previous image
    const prevIndex = (currentIndex - 1 + totalImages) % totalImages;
    if (images[prevIndex]) {
        const prevImageObj = new Image();
        prevImageObj.src = images[prevIndex].src;
    }
}
