/*
* Contact Form JavaScript for Akash Prajapati's Portfolio
* Author: Akash Prajapati
* Version: 1.0
*/

document.addEventListener('DOMContentLoaded', function() {
    // Get the contact form element
    const contactForm = document.getElementById('contactForm');
    
    // Add input focus animations
    const inputContainers = document.querySelectorAll('.input-container');
    
    inputContainers.forEach(container => {
        const input = container.querySelector('input, textarea');
        const icon = container.querySelector('.input-icon');
        
        if (input && icon) {
            // Focus event
            input.addEventListener('focus', () => {
                container.classList.add('focused');
                icon.classList.add('focused');
            });
            
            // Blur event
            input.addEventListener('blur', () => {
                if (input.value === '') {
                    container.classList.remove('focused');
                    icon.classList.remove('focused');
                }
            });
            
            // Check if input already has value (e.g., on page reload)
            if (input.value !== '') {
                container.classList.add('focused');
                icon.classList.add('focused');
            }
        }
    });
    
    // Form submission
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const subject = document.getElementById('subject').value.trim();
            const message = document.getElementById('message').value.trim();
            
            // Simple validation
            if (name === '' || email === '' || subject === '' || message === '') {
                showNotification('Please fill in all fields', 'error');
                return;
            }
            
            // Email validation
            if (!isValidEmail(email)) {
                showNotification('Please enter a valid email address', 'error');
                return;
            }
            
            // Simulate form submission (replace with actual form submission)
            showNotification('Sending message...', 'info');
            
            // Simulate API call with timeout
            setTimeout(() => {
                // Reset form
                contactForm.reset();
                inputContainers.forEach(container => {
                    container.classList.remove('focused');
                    const icon = container.querySelector('.input-icon');
                    if (icon) icon.classList.remove('focused');
                });
                
                // Show success message
                showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
            }, 2000);
        });
    }
    
    // Add hover effects to contact items
    const contactItems = document.querySelectorAll('.contact-item');
    contactItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            const icon = item.querySelector('.contact-icon');
            if (icon) {
                icon.classList.add('hover');
            }
        });
        
        item.addEventListener('mouseleave', () => {
            const icon = item.querySelector('.contact-icon');
            if (icon) {
                icon.classList.remove('hover');
            }
        });
    });
});

// Helper function to validate email
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Show notification
function showNotification(message, type = 'info') {
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
    notification.className = `notification ${type}-notification`;
    
    // Set icon based on type
    let icon = 'info-circle';
    if (type === 'success') icon = 'check-circle';
    if (type === 'error') icon = 'exclamation-circle';
    
    notification.innerHTML = `
        <i class="fas fa-${icon}"></i>
        <span>${message}</span>
    `;
    
    // Add to container
    notificationContainer.appendChild(notification);
    
    // Remove after animation
    setTimeout(() => {
        notification.classList.add('hide');
        setTimeout(() => {
            if (notificationContainer.contains(notification)) {
                notificationContainer.removeChild(notification);
            }
        }, 500);
    }, 3000);
}

// Add CSS for notifications if not already present
function addNotificationStyles() {
    if (!document.getElementById('notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = `
            .notification-container {
                position: fixed;
                top: 20px;
                right: 20px;
                z-index: 9999;
                display: flex;
                flex-direction: column;
                gap: 10px;
                max-width: 350px;
            }
            
            .notification {
                background: rgba(30, 41, 59, 0.9);
                backdrop-filter: blur(10px);
                border-radius: 8px;
                padding: 15px;
                display: flex;
                align-items: center;
                gap: 10px;
                box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
                animation: slideIn 0.3s ease forwards;
                border-left: 4px solid #60a5fa;
            }
            
            .notification.success-notification {
                border-left-color: #10b981;
            }
            
            .notification.error-notification {
                border-left-color: #ef4444;
            }
            
            .notification i {
                font-size: 1.2rem;
                color: #60a5fa;
            }
            
            .notification.success-notification i {
                color: #10b981;
            }
            
            .notification.error-notification i {
                color: #ef4444;
            }
            
            .notification span {
                color: #f1f5f9;
                font-size: 0.95rem;
            }
            
            .notification.hide {
                animation: slideOut 0.5s ease forwards;
            }
            
            @keyframes slideIn {
                from {
                    opacity: 0;
                    transform: translateX(100%);
                }
                to {
                    opacity: 1;
                    transform: translateX(0);
                }
            }
            
            @keyframes slideOut {
                from {
                    opacity: 1;
                    transform: translateX(0);
                }
                to {
                    opacity: 0;
                    transform: translateX(100%);
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// Add notification styles when the script loads
addNotificationStyles();
