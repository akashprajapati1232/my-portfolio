/*
* Main JavaScript for Akash Prajapati's Portfolio
* Author: Akash Prajapati
* Version: 1.0
*/

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functions
    initNavigation();
    initScrollEffects();
    initContactForm();
    initScrollToTop();
});

// Mobile Navigation
function initNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navContainer = document.querySelector('.nav-container');
    const navLinks = document.querySelectorAll('.nav-link');

    // Toggle mobile menu
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navContainer.classList.toggle('active');
            document.body.classList.toggle('menu-open'); // Prevent scrolling when menu is open
        });
    }

    // Close mobile menu when a link is clicked
    navLinks.forEach(item => {
        item.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navContainer.classList.remove('active');
            document.body.classList.remove('menu-open');
        });
    });

    // Active link on scroll
    window.addEventListener('scroll', function() {
        let current = '';
        const sections = document.querySelectorAll('section');

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;

            if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === `#${current}`) {
                item.classList.add('active');
            }
        });
    });

    // Add CSS for preventing body scroll when menu is open
    const style = document.createElement('style');
    style.textContent = `
        body.menu-open {
            overflow: hidden;
        }
    `;
    document.head.appendChild(style);
}

// Scroll Effects
function initScrollEffects() {
    const header = document.querySelector('.header');

    // Header scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Reveal elements on scroll
    const revealElements = document.querySelectorAll('.section-header, .about-content, .skills-content, .projects-content, .achievements-content, .contact-content');

    function revealOnScroll() {
        const windowHeight = window.innerHeight;
        const revealPoint = 150;

        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;

            if (elementTop < windowHeight - revealPoint) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    }

    // Set initial styles for reveal elements
    revealElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'all 0.8s ease';
    });

    // Call revealOnScroll on load and scroll
    window.addEventListener('load', revealOnScroll);
    window.addEventListener('scroll', revealOnScroll);
}

// Contact Form
function initContactForm() {
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;

            // Basic validation
            if (!name || !email || !message) {
                showFormMessage('Please fill in all fields', 'error');
                return;
            }

            if (!isValidEmail(email)) {
                showFormMessage('Please enter a valid email address', 'error');
                return;
            }

            // Simulate form submission (in a real project, you would send data to a server)
            showFormMessage('Thank you for your message! I will get back to you soon.', 'success');
            contactForm.reset();
        });
    }

    // Helper function to validate email
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Helper function to show form messages
    function showFormMessage(message, type) {
        // Check if message element already exists
        let messageElement = document.querySelector('.form-message');

        // If not, create a new one
        if (!messageElement) {
            messageElement = document.createElement('div');
            messageElement.className = 'form-message';
            contactForm.appendChild(messageElement);
        }

        // Set message content and style
        messageElement.textContent = message;
        messageElement.className = `form-message ${type}`;

        // Add styles based on message type
        if (type === 'error') {
            messageElement.style.color = '#FF71CE';
        } else {
            messageElement.style.color = '#43FFF0';
        }

        // Remove message after 5 seconds
        setTimeout(() => {
            messageElement.remove();
        }, 5000);
    }
}

// Scroll to Top Button
function initScrollToTop() {
    // Create scroll to top button
    const scrollTopBtn = document.createElement('div');
    scrollTopBtn.className = 'scroll-top';
    scrollTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    document.body.appendChild(scrollTopBtn);

    // Show/hide button based on scroll position
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            scrollTopBtn.classList.add('active');
        } else {
            scrollTopBtn.classList.remove('active');
        }
    });

    // Scroll to top when button is clicked
    scrollTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}
