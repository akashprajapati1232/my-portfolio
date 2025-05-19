/*
* Hackathon Gallery JavaScript for Akash Prajapati's Portfolio
* Author: Akash Prajapati
* Version: 1.0
*/

// Global variables to store hackathon images
let currentImageIndex = 0;

document.addEventListener('DOMContentLoaded', function() {
    // Create hackathon gallery elements
    createHackathonGallery();

    // Add event listener for Hackathon Project link
    const hackathonLink = document.querySelector('.achievement-link[data-project="hackathon"]');
    if (hackathonLink) {
        hackathonLink.addEventListener('click', function(e) {
            e.preventDefault();
            openHackathonGallery();
        });
    }
});

// Create hackathon gallery elements
function createHackathonGallery() {
    // Create hackathon gallery container if it doesn't exist
    if (!document.getElementById('hackathonGallery')) {
        const galleryContainer = document.createElement('div');
        galleryContainer.id = 'hackathonGallery';
        galleryContainer.className = 'certificate-gallery-container'; // Reuse certificate gallery styles

        galleryContainer.innerHTML = `
            <div class="certificate-gallery-content">
                <div class="certificate-gallery-header">
                    <h3 class="certificate-gallery-title">QR-based Health Record System</h3>
                    <button class="certificate-gallery-close">&times;</button>
                </div>
                <div class="hackathon-description">
                    <p>A mobile application developed during a 2-day hackathon that allows doctors to scan QR codes from patients' phones to instantly access their complete medical history and details.</p>
                </div>
                <div class="certificate-gallery-grid" id="hackathonGrid">
                    <!-- Hackathon images will be loaded here -->
                    <div class="certificate-empty-state">
                        <i class="fas fa-laptop-code"></i>
                        <p>Loading project images...</p>
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(galleryContainer);

        // Create hackathon lightbox
        const lightbox = document.createElement('div');
        lightbox.id = 'hackathonLightbox';
        lightbox.className = 'certificate-lightbox'; // Reuse certificate lightbox styles

        lightbox.innerHTML = `
            <div class="certificate-lightbox-content">
                <img src="" alt="Hackathon Project Screenshot" class="certificate-lightbox-img">
                <button class="certificate-lightbox-close">&times;</button>
                <div class="certificate-lightbox-nav">
                    <button class="certificate-lightbox-prev"><i class="fas fa-chevron-left"></i></button>
                    <button class="certificate-lightbox-next"><i class="fas fa-chevron-right"></i></button>
                </div>
                <div class="certificate-lightbox-counter">Image 1 of 13</div>
            </div>
        `;

        document.body.appendChild(lightbox);

        // Add event listeners
        const closeBtn = galleryContainer.querySelector('.certificate-gallery-close');
        closeBtn.addEventListener('click', closeHackathonGallery);

        const lightboxCloseBtn = lightbox.querySelector('.certificate-lightbox-close');
        lightboxCloseBtn.addEventListener('click', closeHackathonLightbox);

        const prevBtn = lightbox.querySelector('.certificate-lightbox-prev');
        const nextBtn = lightbox.querySelector('.certificate-lightbox-next');
        prevBtn.addEventListener('click', prevHackathonImage);
        nextBtn.addEventListener('click', nextHackathonImage);

        // Close gallery when clicking outside the content
        galleryContainer.addEventListener('click', function(e) {
            if (e.target === galleryContainer) {
                closeHackathonGallery();
            }
        });

        // Close lightbox when clicking outside the image
        lightbox.addEventListener('click', function(e) {
            if (e.target === lightbox) {
                closeHackathonLightbox();
            }
        });

        // Keyboard navigation
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                if (lightbox.classList.contains('active')) {
                    closeHackathonLightbox();
                } else if (galleryContainer.classList.contains('active')) {
                    closeHackathonGallery();
                }
            } else if (lightbox.classList.contains('active')) {
                if (e.key === 'ArrowLeft') {
                    prevHackathonImage();
                } else if (e.key === 'ArrowRight') {
                    nextHackathonImage();
                }
            }
        });
    }
}

// Open hackathon gallery
function openHackathonGallery() {
    const galleryContainer = document.getElementById('hackathonGallery');

    // Show gallery
    galleryContainer.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent scrolling

    // Load hackathon images
    loadHackathonImages();
}

// Close hackathon gallery
function closeHackathonGallery() {
    const galleryContainer = document.getElementById('hackathonGallery');
    galleryContainer.classList.remove('active');
    document.body.style.overflow = 'auto'; // Enable scrolling
}

// Load hackathon images from the folder
function loadHackathonImages() {
    const hackathonGrid = document.getElementById('hackathonGrid');

    // Clear previous content
    hackathonGrid.innerHTML = '';

    // Hackathon folder path
    const hackathonPath = 'assets/images/hackthone/';

    // List of all hackathon images
    const hackathonImages = [];
    for (let i = 1; i <= 13; i++) {
        const num = i < 10 ? '0' + i : i;
        hackathonImages.push({
            file: `${num}.jpeg`,
            description: `QR-based Health Record System - Screenshot ${i}`
        });
    }

    // Create hackathon image items
    hackathonImages.forEach((image, index) => {
        const imageItem = document.createElement('div');
        imageItem.className = 'certificate-item'; // Reuse certificate item styles

        imageItem.innerHTML = `
            <img src="${hackathonPath}${image.file}" alt="${image.description}" class="certificate-img" onerror="this.src='assets/images/certificate-placeholder.jpg'">
            <div class="certificate-overlay">
                <h4 class="certificate-name">${image.description}</h4>
            </div>
        `;

        // Add click event to open lightbox
        imageItem.addEventListener('click', function() {
            openHackathonLightbox(hackathonPath + image.file, image.description, index);
        });

        hackathonGrid.appendChild(imageItem);
    });
}

// Open hackathon lightbox
function openHackathonLightbox(imageSrc, imageDescription, index) {
    const lightbox = document.getElementById('hackathonLightbox');
    const lightboxImg = lightbox.querySelector('.certificate-lightbox-img');
    const counter = lightbox.querySelector('.certificate-lightbox-counter');

    // Set image source
    lightboxImg.src = imageSrc;
    lightboxImg.alt = imageDescription;

    // Update current index
    currentImageIndex = index;

    // Update counter
    counter.textContent = `Image ${index + 1} of 13`;

    // Show lightbox
    lightbox.classList.add('active');
}

// Close hackathon lightbox
function closeHackathonLightbox() {
    const lightbox = document.getElementById('hackathonLightbox');
    lightbox.classList.remove('active');
}

// Navigate to previous image
function prevHackathonImage() {
    // Calculate previous index with wrap-around
    const prevIndex = (currentImageIndex - 1 + 13) % 13;

    // Get hackathon path
    const hackathonPath = 'assets/images/hackthone/';
    const num = prevIndex < 9 ? '0' + (prevIndex + 1) : (prevIndex + 1);
    const file = `${num}.jpeg`;
    const description = `QR-based Health Record System - Screenshot ${prevIndex + 1}`;

    // Open the previous image
    openHackathonLightbox(hackathonPath + file, description, prevIndex);
}

// Navigate to next image
function nextHackathonImage() {
    // Calculate next index with wrap-around
    const nextIndex = (currentImageIndex + 1) % 13;

    // Get hackathon path
    const hackathonPath = 'assets/images/hackthone/';
    const num = nextIndex < 9 ? '0' + (nextIndex + 1) : (nextIndex + 1);
    const file = `${num}.jpeg`;
    const description = `QR-based Health Record System - Screenshot ${nextIndex + 1}`;

    // Open the next image
    openHackathonLightbox(hackathonPath + file, description, nextIndex);
}
