/*
* Typing Animation JavaScript for Akash Prajapati's Portfolio
* Author: Akash Prajapati
* Version: 1.0
*/

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize typing animation
    initTypingAnimation();
});

// Initialize typing animation
function initTypingAnimation() {
    const typedTextSpan = document.querySelector('.typed-text');

    // Array of strings to be typed
    const textArray = [
        "Fullstack Developer",
        "Web Developer",
        "Frontend Developer",
        "BCA Student",
        "Tech Enthusiast"
    ];

    // Set minimum width for the typed text container
    typedTextSpan.style.minWidth = '18ch';

    // Typing delay (in milliseconds)
    const typingDelay = 100; // Delay between each character when typing
    const erasingDelay = 50; // Delay between each character when erasing
    const newTextDelay = 1500; // Delay before starting to type a new text

    let textArrayIndex = 0;
    let charIndex = 0;

    // Function to type text
    function type() {
        if (charIndex < textArray[textArrayIndex].length) {
            typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
            charIndex++;
            setTimeout(type, typingDelay);
        } else {
            // Text is fully typed, wait before erasing
            setTimeout(erase, newTextDelay);
        }
    }

    // Function to erase text
    function erase() {
        if (charIndex > 0) {
            typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex - 1);
            charIndex--;
            setTimeout(erase, erasingDelay);
        } else {
            // Text is fully erased, move to next text
            textArrayIndex++;

            // Reset to first text if reached the end of the array
            if (textArrayIndex >= textArray.length) {
                textArrayIndex = 0;
            }

            // Start typing the next text
            setTimeout(type, typingDelay + 1000);
        }
    }

    // Start the typing animation
    if (textArray.length) {
        setTimeout(type, newTextDelay + 250);
    }
}
