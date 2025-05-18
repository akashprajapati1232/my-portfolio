/*
* Skills and Projects JavaScript for Akash Prajapati's Portfolio
* Author: Akash Prajapati
* Version: 1.0
*/

document.addEventListener('DOMContentLoaded', function() {
    initSkillsFilter();
    initProjectsFilter();
    initProjectModal();
});

// Skills Filter
function initSkillsFilter() {
    const skillTabs = document.querySelectorAll('.skill-tab');
    const skillCards = document.querySelectorAll('.skill-card');

    skillTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Remove active class from all tabs
            skillTabs.forEach(t => t.classList.remove('active'));

            // Add active class to clicked tab
            this.classList.add('active');

            // Get filter value
            const filter = this.getAttribute('data-skill');

            // Filter skill cards
            skillCards.forEach(card => {
                if (filter === 'all') {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 100);
                } else if (card.getAttribute('data-category') === filter) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 100);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });

    // Initialize skill cards with animation
    skillCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';

        setTimeout(() => {
            card.style.transition = 'all 0.4s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, 100 + (index * 50));
    });
}

// Projects Filter
function initProjectsFilter() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectItems = document.querySelectorAll('.project-item');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));

            // Add active class to clicked button
            this.classList.add('active');

            // Get filter value
            const filter = this.getAttribute('data-filter');

            // Filter project items
            projectItems.forEach(item => {
                if (filter === 'all') {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0)';
                    }, 100);
                } else if (item.getAttribute('data-type') === filter) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0)';
                    }, 100);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });

    // Initialize project items with animation
    projectItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';

        setTimeout(() => {
            item.style.transition = 'all 0.4s ease';
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
        }, 100 + (index * 100));
    });
}

// Project Modal
function initProjectModal() {
    const detailsBtns = document.querySelectorAll('.project-details-btn');
    const modal = document.getElementById('projectModal');
    const modalBody = modal.querySelector('.modal-body');
    const closeModal = modal.querySelector('.close-modal');

    // Open modal when details button is clicked
    detailsBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();

            // Get project details
            const projectCard = this.closest('.project-card');
            const projectTitle = projectCard.querySelector('.project-title').textContent;
            const projectDesc = projectCard.querySelector('.project-description').textContent;
            const projectTags = projectCard.querySelector('.project-tags').innerHTML;
            const projectType = this.getAttribute('data-project') || '';

            // Create modal content
            let modalContent = `
                <h2>${projectTitle}</h2>
                <div class="modal-tags">${projectTags}</div>
                <div class="modal-description">
                    <p>${projectDesc}</p>
                `;

            // Add project-specific content
            if (projectType === 'imgninja') {
                modalContent += `
                    <p>ImgNinja is an all-in-one online tool designed to simplify image and file handling. It offers features like image compression, format conversion, and basic editing capabilities with a modern, fast, and user-friendly interface.</p>
                    <h3>Key Features:</h3>
                    <ul>
                        <li>Image compression with quality control</li>
                        <li>Format conversion between JPG, PNG, and WebP</li>
                        <li>Basic image editing tools</li>
                        <li>Responsive design for all devices</li>
                        <li>Fast processing with client-side operations</li>
                    </ul>
                    <div class="modal-gallery">
                        <h3>Project Gallery</h3>
                        <div class="gallery-grid">
                            <img src="assets/images/ImgNinja/project-ImgNinja-01.png" alt="ImgNinja Screenshot 1" class="gallery-img">
                            <img src="assets/images/ImgNinja/project-ImgNinja-02.png" alt="ImgNinja Screenshot 2" class="gallery-img">
                            <img src="assets/images/ImgNinja/project-ImgNinja-03.png" alt="ImgNinja Screenshot 3" class="gallery-img">
                            <img src="assets/images/ImgNinja/project-ImgNinja-04.png" alt="ImgNinja Screenshot 4" class="gallery-img">
                            <img src="assets/images/ImgNinja/project-ImgNinja-05.png" alt="ImgNinja Screenshot 5" class="gallery-img">
                            <img src="assets/images/ImgNinja/project-ImgNinja-06.png" alt="ImgNinja Screenshot 6" class="gallery-img">
                        </div>
                    </div>
                `;
            } else if (projectType === 'portfolio') {
                modalContent += `
                    <p>This personal portfolio website showcases my skills, projects, and achievements. It was built with HTML, CSS, and JavaScript, featuring a clean, responsive design with interactive elements.</p>
                    <h3>Key Features:</h3>
                    <ul>
                        <li>Responsive design that works on all devices</li>
                        <li>Interactive skill cards with progress indicators</li>
                        <li>Project filtering system</li>
                        <li>Modern animations and transitions</li>
                        <li>Image lightbox for project galleries</li>
                        <li>Contact form for easy communication</li>
                        <li>Dark theme with monochrome color scheme</li>
                    </ul>
                    <h3>Development Process:</h3>
                    <p>This portfolio was designed and developed from scratch to showcase my web development skills and provide visitors with an easy way to learn about my projects and abilities.</p>
                    <div class="modal-gallery">
                        <h3>Project Gallery</h3>
                        <div class="gallery-grid">
                            <img src="assets/images/portfolio/01-portfolio.png" alt="Portfolio Screenshot 1" class="gallery-img">
                            <img src="assets/images/portfolio/02-portfolio.png" alt="Portfolio Screenshot 2" class="gallery-img">
                            <img src="assets/images/portfolio/03-portfolio.png" alt="Portfolio Screenshot 3" class="gallery-img">
                            <img src="assets/images/portfolio/04-portfolio.png" alt="Portfolio Screenshot 4" class="gallery-img">
                            <img src="assets/images/portfolio/05-portfolio.png" alt="Portfolio Screenshot 5" class="gallery-img">
                            <img src="assets/images/portfolio/06-portfolio.png" alt="Portfolio Screenshot 6" class="gallery-img">
                        </div>
                    </div>
                `;
            } else if (projectType === 'snake') {
                modalContent += `
                    <p>A simple Snake game created using HTML, CSS, and JavaScript. This project demonstrates fundamental game development concepts and DOM manipulation.</p>
                    <h3>Current Features:</h3>
                    <ul>
                        <li>Basic snake movement with arrow key controls</li>
                        <li>Food generation and collision detection</li>
                        <li>Simple score tracking</li>
                        <li>Game over detection</li>
                    </ul>
                    <h3>Planned Future Enhancements:</h3>
                    <ul>
                        <li>Multiple difficulty levels</li>
                        <li>Obstacles and special power-ups</li>
                        <li>High score leaderboard</li>
                        <li>Mobile-friendly touch controls</li>
                        <li>Sound effects and background music</li>
                        <li>Visual improvements and animations</li>
                    </ul>
                    <div class="modal-gallery">
                        <h3>Project Gallery</h3>
                        <div class="gallery-grid">
                            <img src="assets/images/snake-game/snake-game01.png" alt="Snake Game Screenshot 1" class="gallery-img">
                            <img src="assets/images/snake-game/snake-game02.png" alt="Snake Game Screenshot 2" class="gallery-img">
                            <img src="assets/images/snake-game/snake-game03.png" alt="Snake Game Screenshot 3" class="gallery-img">
                        </div>
                    </div>
                `;
            } else {
                modalContent += `
                    <p>This is a detailed view of the project. More information about technologies used, challenges faced, and solutions implemented would be displayed here.</p>
                    <div class="modal-gallery">
                        <h3>Project Gallery</h3>
                        <div class="gallery-placeholder">
                            <p>Project screenshots would be displayed here.</p>
                        </div>
                    </div>
                `;
            }

            modalContent += `</div>`;

            // Set modal content
            modalBody.innerHTML = modalContent;

            // Show modal
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden'; // Prevent scrolling
        });
    });

    // Close modal when close button is clicked
    closeModal.addEventListener('click', function() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto'; // Enable scrolling
    });

    // Close modal when clicking outside of modal content
    window.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto'; // Enable scrolling
        }
    });

    // Close modal when ESC key is pressed
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.style.display === 'block') {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto'; // Enable scrolling
        }
    });
}
