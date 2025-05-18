/*
* Certificate Gallery JavaScript for Akash Prajapati's Portfolio
* Author: Akash Prajapati
* Version: 1.0
*/

// Global variables to store certificate data
let certificateFiles = [];
let currentCertificateIndex = 0;

document.addEventListener('DOMContentLoaded', function() {
    // Create certificate gallery elements
    createCertificateGallery();

    // Initialize certificate gallery
    const viewAllBtn = document.querySelector('.view-all-certificates');
    if (viewAllBtn) {
        viewAllBtn.addEventListener('click', openCertificateGallery);
    }
});

// Create certificate gallery elements
function createCertificateGallery() {
    // Create certificate gallery container if it doesn't exist
    if (!document.getElementById('certificateGallery')) {
        const galleryContainer = document.createElement('div');
        galleryContainer.id = 'certificateGallery';
        galleryContainer.className = 'certificate-gallery-container';

        galleryContainer.innerHTML = `
            <div class="certificate-gallery-content">
                <div class="certificate-gallery-header">
                    <h3 class="certificate-gallery-title">All Certificates</h3>
                    <button class="certificate-gallery-close">&times;</button>
                </div>
                <div class="certificate-gallery-grid" id="certificateGrid">
                    <!-- Certificates will be loaded here -->
                    <div class="certificate-empty-state">
                        <i class="fas fa-certificate"></i>
                        <p>Loading certificates...</p>
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(galleryContainer);

        // Create certificate lightbox
        const lightbox = document.createElement('div');
        lightbox.id = 'certificateLightbox';
        lightbox.className = 'certificate-lightbox';

        lightbox.innerHTML = `
            <div class="certificate-lightbox-content">
                <img src="" alt="Certificate" class="certificate-lightbox-img">
                <button class="certificate-lightbox-close">&times;</button>
                <button class="certificate-lightbox-download" title="Download Certificate"><i class="fas fa-download"></i></button>
                <div class="certificate-lightbox-nav">
                    <button class="certificate-lightbox-prev"><i class="fas fa-chevron-left"></i></button>
                    <button class="certificate-lightbox-next"><i class="fas fa-chevron-right"></i></button>
                </div>
                <div class="certificate-lightbox-counter">Certificate 1 of 9</div>
            </div>
        `;

        document.body.appendChild(lightbox);

        // Add event listeners
        const closeBtn = galleryContainer.querySelector('.certificate-gallery-close');
        closeBtn.addEventListener('click', closeCertificateGallery);

        const lightboxCloseBtn = lightbox.querySelector('.certificate-lightbox-close');
        lightboxCloseBtn.addEventListener('click', closeCertificateLightbox);

        const prevBtn = lightbox.querySelector('.certificate-lightbox-prev');
        const nextBtn = lightbox.querySelector('.certificate-lightbox-next');
        const downloadBtn = lightbox.querySelector('.certificate-lightbox-download');
        prevBtn.addEventListener('click', prevCertificate);
        nextBtn.addEventListener('click', nextCertificate);
        downloadBtn.addEventListener('click', downloadCertificate);

        // Close gallery when clicking outside the content
        galleryContainer.addEventListener('click', function(e) {
            if (e.target === galleryContainer) {
                closeCertificateGallery();
            }
        });

        // Close lightbox when clicking outside the image
        lightbox.addEventListener('click', function(e) {
            if (e.target === lightbox) {
                closeCertificateLightbox();
            }
        });

        // Keyboard navigation
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                if (lightbox.classList.contains('active')) {
                    closeCertificateLightbox();
                } else if (galleryContainer.classList.contains('active')) {
                    closeCertificateGallery();
                }
            } else if (lightbox.classList.contains('active')) {
                if (e.key === 'ArrowLeft') {
                    prevCertificate();
                } else if (e.key === 'ArrowRight') {
                    nextCertificate();
                }
            }
        });
    }
}

// Open certificate gallery
function openCertificateGallery() {
    const galleryContainer = document.getElementById('certificateGallery');

    // Show gallery
    galleryContainer.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent scrolling

    // Load certificates
    loadCertificates();
}

// Close certificate gallery
function closeCertificateGallery() {
    const galleryContainer = document.getElementById('certificateGallery');
    galleryContainer.classList.remove('active');
    document.body.style.overflow = 'auto'; // Enable scrolling
}

// Load certificates from the folder
function loadCertificates() {
    const certificateGrid = document.getElementById('certificateGrid');

    // Clear previous content
    certificateGrid.innerHTML = '';

    // Certificate folder path
    const certificatePath = 'assets/images/certificate/';

    // List of actual certificate files from the folder
    certificateFiles = [
        { name: 'Web Development Diploma', file: '01-web development diploma.jpg' },
        { name: 'Web Development Marksheet', file: '02-web development marksheet.jpg' },
        { name: 'CSS Certificate', file: '03-css certificate.jpg' },
        { name: 'CSS Marksheet', file: '04-css marksheet.jpg' },
        { name: 'Knowledge Gate HTML', file: '05-knowladge gate html.png' },
        { name: 'Knowledge Gate CSS Certificate', file: '06-knowladge gate css certificate.jpg' },
        { name: 'Python Certificate', file: '07-Python.jpg' },
        { name: 'SCOA Data Entry Operator', file: '08-SCOA Data Entry Operator.jpg' },
        { name: 'Mindluster Certificate', file: '09-Mindluster_Certificate.jpg' }
    ];

    // Check if there are any certificates
    if (certificateFiles.length === 0) {
        certificateGrid.innerHTML = `
            <div class="certificate-empty-state">
                <i class="fas fa-certificate"></i>
                <p>No certificates found. Add your certificates to the "assets/images/certificate" folder.</p>
            </div>
        `;
        return;
    }

    // Create certificate items
    certificateFiles.forEach((cert, index) => {
        const certificateItem = document.createElement('div');
        certificateItem.className = 'certificate-item';

        certificateItem.innerHTML = `
            <img src="${certificatePath}${cert.file}" alt="${cert.name}" class="certificate-img" onerror="this.src='assets/images/certificate-placeholder.jpg'">
            <div class="certificate-overlay">
                <h4 class="certificate-name">${cert.name}</h4>
            </div>
        `;

        // Add click event to open lightbox
        certificateItem.addEventListener('click', function() {
            openCertificateLightbox(certificatePath + cert.file, cert.name, index);
        });

        certificateGrid.appendChild(certificateItem);
    });
}

// Open certificate lightbox
function openCertificateLightbox(imageSrc, imageName, index) {
    const lightbox = document.getElementById('certificateLightbox');
    const lightboxImg = lightbox.querySelector('.certificate-lightbox-img');
    const counter = lightbox.querySelector('.certificate-lightbox-counter');

    // Set image source
    lightboxImg.src = imageSrc;
    lightboxImg.alt = imageName;

    // Update current index
    currentCertificateIndex = index;

    // Update counter
    counter.textContent = `Certificate ${index + 1} of ${certificateFiles.length}`;

    // Show lightbox
    lightbox.classList.add('active');
}

// Close certificate lightbox
function closeCertificateLightbox() {
    const lightbox = document.getElementById('certificateLightbox');
    lightbox.classList.remove('active');
}

// Navigate to previous certificate
function prevCertificate() {
    if (certificateFiles.length <= 1) return;

    // Calculate previous index with wrap-around
    const prevIndex = (currentCertificateIndex - 1 + certificateFiles.length) % certificateFiles.length;

    // Get certificate path
    const certificatePath = 'assets/images/certificate/';
    const cert = certificateFiles[prevIndex];

    // Open the previous certificate
    openCertificateLightbox(certificatePath + cert.file, cert.name, prevIndex);
}

// Navigate to next certificate
function nextCertificate() {
    if (certificateFiles.length <= 1) return;

    // Calculate next index with wrap-around
    const nextIndex = (currentCertificateIndex + 1) % certificateFiles.length;

    // Get certificate path
    const certificatePath = 'assets/images/certificate/';
    const cert = certificateFiles[nextIndex];

    // Open the next certificate
    openCertificateLightbox(certificatePath + cert.file, cert.name, nextIndex);
}

// Download the current certificate
function downloadCertificate() {
    if (certificateFiles.length === 0) return;

    // Get current certificate
    const cert = certificateFiles[currentCertificateIndex];
    const certificatePath = 'assets/images/certificate/';
    const imageSrc = certificatePath + cert.file;

    // Create a temporary anchor element
    const downloadLink = document.createElement('a');
    downloadLink.href = imageSrc;
    downloadLink.download = cert.name.replace(/\s+/g, '_') + '.' + cert.file.split('.').pop();

    // Append to body, click and remove
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);

    // Show download notification
    showDownloadNotification(cert.name);
}

// Show a notification when certificate is downloaded
function showDownloadNotification(certificateName) {
    // Check if notification container exists, create if not
    let notificationContainer = document.getElementById('notificationContainer');
    if (!notificationContainer) {
        notificationContainer = document.createElement('div');
        notificationContainer.id = 'notificationContainer';
        notificationContainer.className = 'notification-container';
        document.body.appendChild(notificationContainer);
    }

    // Create notification
    const notification = document.createElement('div');
    notification.className = 'notification download-notification';
    notification.innerHTML = `
        <i class="fas fa-check-circle"></i>
        <span>${certificateName} downloaded successfully!</span>
    `;

    // Add to container
    notificationContainer.appendChild(notification);

    // Remove after animation
    setTimeout(() => {
        notification.classList.add('hide');
        setTimeout(() => {
            notificationContainer.removeChild(notification);
        }, 500);
    }, 3000);
}
