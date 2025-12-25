/*
* Tilt Effect JavaScript for Akash Prajapati's Portfolio
* Author: Akash Prajapati
* Version: 1.0
*/

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize tilt effect
    initTiltEffect();
});

// Initialize tilt effect for elements with data-tilt attribute
function initTiltEffect() {
    // Check if VanillaTilt is loaded
    if (typeof VanillaTilt !== 'undefined') {
        // Get all elements with data-tilt attribute
        const tiltElements = document.querySelectorAll('[data-tilt]');
        
        // Initialize VanillaTilt for each element
        VanillaTilt.init(tiltElements, {
            max: 15,
            speed: 400,
            glare: true,
            "max-glare": 0.3,
            scale: 1.05,
            perspective: 1000
        });
    } else {
        console.warn('VanillaTilt.js is not loaded');
        // Create a fallback tilt effect
        createFallbackTiltEffect();
    }
}

// Fallback tilt effect using custom JavaScript
function createFallbackTiltEffect() {
    // Get all elements with data-tilt attribute
    const tiltElements = document.querySelectorAll('[data-tilt]');
    
    // Add event listeners for each element
    tiltElements.forEach(element => {
        // Add mouse enter event
        element.addEventListener('mouseenter', function() {
            element.style.transition = 'transform 0.2s ease-out';
            element.style.transform = 'scale(1.05)';
            element.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.2)';
        });
        
        // Add mouse move event
        element.addEventListener('mousemove', function(e) {
            // Get element dimensions and position
            const rect = element.getBoundingClientRect();
            
            // Calculate mouse position relative to the element
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            // Calculate rotation values
            const xRotation = ((y - rect.height / 2) / rect.height) * 10;
            const yRotation = ((rect.width / 2 - x) / rect.width) * 10;
            
            // Apply transform
            element.style.transform = `scale(1.05) perspective(1000px) rotateX(${xRotation}deg) rotateY(${yRotation}deg)`;
        });
        
        // Add mouse leave event
        element.addEventListener('mouseleave', function() {
            element.style.transition = 'transform 0.5s ease-out, box-shadow 0.5s ease-out';
            element.style.transform = 'scale(1) rotateX(0) rotateY(0)';
            element.style.boxShadow = '0 0 0 rgba(0, 0, 0, 0)';
        });
    });
}
