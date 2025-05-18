/*
* Tabs JavaScript for Akash Prajapati's Portfolio
* Author: Akash Prajapati
* Version: 1.0
*/

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize tabs
    initTabs();
});

// Initialize tabs functionality
function initTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    
    // Add click event to each tab button
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Get the tab to show from the data-tab attribute
            const tabToShow = this.getAttribute('data-tab');
            
            // Remove active class from all buttons and tabs
            document.querySelectorAll('.tab-btn').forEach(btn => {
                btn.classList.remove('active');
            });
            
            document.querySelectorAll('.tab-pane').forEach(tab => {
                tab.classList.remove('active');
            });
            
            // Add active class to the clicked button
            this.classList.add('active');
            
            // Add active class to the corresponding tab
            document.getElementById(tabToShow).classList.add('active');
        });
    });
}
