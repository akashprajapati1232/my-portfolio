/*
* Animations JavaScript for Akash Prajapati's Portfolio
* Author: Akash Prajapati
* Version: 1.0
*/

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all animation functions
    initParticlesJS();
    initJellyfishAnimation();
});

// Initialize Particles.js for background animation
function initParticlesJS() {
    if (typeof particlesJS !== 'undefined') {
        particlesJS('particles-js', {
            "particles": {
                "number": {
                    "value": 80,
                    "density": {
                        "enable": true,
                        "value_area": 800
                    }
                },
                "color": {
                    "value": ["#60a5fa", "#34d399", "#f59e0b"]
                },
                "shape": {
                    "type": "circle",
                    "stroke": {
                        "width": 0,
                        "color": "#000000"
                    },
                    "polygon": {
                        "nb_sides": 5
                    }
                },
                "opacity": {
                    "value": 0.5,
                    "random": true,
                    "anim": {
                        "enable": true,
                        "speed": 1,
                        "opacity_min": 0.1,
                        "sync": false
                    }
                },
                "size": {
                    "value": 3,
                    "random": true,
                    "anim": {
                        "enable": true,
                        "speed": 2,
                        "size_min": 0.1,
                        "sync": false
                    }
                },
                "line_linked": {
                    "enable": true,
                    "distance": 150,
                    "color": "#2563eb",
                    "opacity": 0.2,
                    "width": 1
                },
                "move": {
                    "enable": true,
                    "speed": 1,
                    "direction": "none",
                    "random": true,
                    "straight": false,
                    "out_mode": "out",
                    "bounce": false,
                    "attract": {
                        "enable": true,
                        "rotateX": 600,
                        "rotateY": 1200
                    }
                }
            },
            "interactivity": {
                "detect_on": "canvas",
                "events": {
                    "onhover": {
                        "enable": true,
                        "mode": "grab"
                    },
                    "onclick": {
                        "enable": true,
                        "mode": "push"
                    },
                    "resize": true
                },
                "modes": {
                    "grab": {
                        "distance": 140,
                        "line_linked": {
                            "opacity": 0.5
                        }
                    },
                    "bubble": {
                        "distance": 400,
                        "size": 4,
                        "duration": 2,
                        "opacity": 0.8,
                        "speed": 3
                    },
                    "repulse": {
                        "distance": 200,
                        "duration": 0.4
                    },
                    "push": {
                        "particles_nb": 4
                    },
                    "remove": {
                        "particles_nb": 2
                    }
                }
            },
            "retina_detect": true
        });
    } else {
        console.warn('Particles.js is not loaded');
    }
}

// Jellyfish Animation that reacts to mouse movement
function initJellyfishAnimation() {
    const jellyfishContainer = document.getElementById('jellyfish-container');
    const jellyfishPlayer = document.getElementById('jellyfish');

    // If we don't have the jellyfish elements, create a fallback animation
    if (!jellyfishContainer || !jellyfishPlayer) {
        createFallbackJellyfishAnimation();
        return;
    }

    // Check if LottieFiles is loaded
    if (typeof jellyfishPlayer.getLottie === 'function') {
        // Add mouse move event to make jellyfish react to mouse movement
        document.addEventListener('mousemove', function(e) {
            // Get mouse position relative to the viewport
            const mouseX = e.clientX / window.innerWidth;
            const mouseY = e.clientY / window.innerHeight;

            // Calculate movement based on mouse position
            // Move jellyfish in the opposite direction of mouse for a more natural feel
            const moveX = (0.5 - mouseX) * 25; // Increased multiplier for more movement
            const moveY = (0.5 - mouseY) * 25;

            // Apply transform to jellyfish container
            jellyfishContainer.style.transform = `translate(${moveX}px, ${moveY}px)`;

            // Adjust animation speed based on mouse movement
            const movementIntensity = Math.sqrt(Math.pow(mouseX - 0.5, 2) + Math.pow(mouseY - 0.5, 2));
            const newSpeed = 1 + movementIntensity * 1.5; // Adjust multiplier for more/less speed change

            // Update animation speed if LottiePlayer is available
            try {
                jellyfishPlayer.setSpeed(newSpeed);
            } catch (error) {
                console.warn('Could not adjust Lottie animation speed');
            }
        });
    } else {
        // If Lottie is not available, create a fallback animation
        createFallbackJellyfishAnimation();
    }
}

// Fallback Jellyfish Animation using CSS and JS
function createFallbackJellyfishAnimation() {
    const heroAnimation = document.querySelector('.hero-animation');

    if (!heroAnimation) return;

    // Clear existing content
    heroAnimation.innerHTML = '';

    // Create jellyfish container
    const jellyfishContainer = document.createElement('div');
    jellyfishContainer.id = 'jellyfish-container';
    jellyfishContainer.style.position = 'relative';
    jellyfishContainer.style.width = '100%';
    jellyfishContainer.style.maxWidth = '600px';
    jellyfishContainer.style.height = '600px';

    // Create jellyfish elements
    for (let i = 0; i < 5; i++) {
        const jellyfish = document.createElement('div');
        jellyfish.className = 'jellyfish';
        jellyfish.style.position = 'absolute';
        jellyfish.style.width = `${100 + Math.random() * 50}px`;
        jellyfish.style.height = `${120 + Math.random() * 60}px`;
        jellyfish.style.borderRadius = '70% 70% 20% 20%';
        jellyfish.style.background = getRandomGradient();
        jellyfish.style.boxShadow = `0 0 20px ${getRandomColor()}`;
        jellyfish.style.top = `${Math.random() * 60}%`;
        jellyfish.style.left = `${Math.random() * 60 + 20}%`;
        jellyfish.style.filter = 'blur(2px)';
        jellyfish.style.opacity = '0.8';
        jellyfish.style.animation = `float ${3 + Math.random() * 4}s ease-in-out infinite`;
        jellyfish.style.animationDelay = `${Math.random() * 2}s`;

        // Create tentacles
        for (let j = 0; j < 8; j++) {
            const tentacle = document.createElement('div');
            tentacle.className = 'tentacle';
            tentacle.style.position = 'absolute';
            tentacle.style.width = '2px';
            tentacle.style.height = `${40 + Math.random() * 50}px`;
            tentacle.style.background = getRandomColor();
            tentacle.style.bottom = '-30px';
            tentacle.style.left = `${j * 10 + 10}px`;
            tentacle.style.transformOrigin = 'top';
            tentacle.style.animation = `wave ${2 + Math.random() * 3}s ease-in-out infinite`;
            tentacle.style.animationDelay = `${Math.random() * 2}s`;

            jellyfish.appendChild(tentacle);
        }

        jellyfishContainer.appendChild(jellyfish);
    }

    // Add CSS animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes float {
            0% { transform: translateY(0) rotate(0deg); }
            50% { transform: translateY(-20px) rotate(5deg); }
            100% { transform: translateY(0) rotate(0deg); }
        }

        @keyframes wave {
            0% { transform: scaleY(1) rotate(0deg); }
            25% { transform: scaleY(1.1) rotate(5deg); }
            50% { transform: scaleY(1) rotate(0deg); }
            75% { transform: scaleY(1.1) rotate(-5deg); }
            100% { transform: scaleY(1) rotate(0deg); }
        }
    `;

    document.head.appendChild(style);
    heroAnimation.appendChild(jellyfishContainer);

    // Add mouse move event to make jellyfish react to mouse movement
    document.addEventListener('mousemove', function(e) {
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;

        const moveX = (0.5 - mouseX) * 35;
        const moveY = (0.5 - mouseY) * 35;

        jellyfishContainer.style.transform = `translate(${moveX}px, ${moveY}px)`;

        // Make individual jellyfish react slightly differently
        const jellyfishes = document.querySelectorAll('.jellyfish');
        jellyfishes.forEach((jelly, index) => {
            const factor = 1 + (index * 0.1);
            jelly.style.transform = `translate(${moveX * factor * 0.2}px, ${moveY * factor * 0.2}px)`;
        });
    });

    // Helper function to get random color
    function getRandomColor() {
        const colors = ['#2563eb', '#60a5fa', '#34d399', '#f59e0b'];
        return colors[Math.floor(Math.random() * colors.length)];
    }

    // Helper function to get random gradient
    function getRandomGradient() {
        const color1 = getRandomColor();
        const color2 = getRandomColor();
        return `radial-gradient(circle at 50% 30%, ${color1}, ${color2})`;
    }
}
