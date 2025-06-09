document.addEventListener('DOMContentLoaded', function() {
    const projectsSection = document.querySelector('.projects-section');
    const projectCards = document.querySelectorAll('.project-card');
    const projectsHeader = document.querySelector('.projects-header');
    const projectsContent = document.querySelector('.projects-content');
    const dropdownArrow = document.querySelector('.dropdown-arrow');
    let isManuallyToggled = false; // Track manual interaction

    // Function to reset and animate project cards
    function animateProjectsSection() {
        projectCards.forEach((card, index) => {
            // Reset styles
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            card.style.transition = 'none';

            // Trigger animation with delay based on index
            setTimeout(() => {
                card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, index * 150); // Staggered delay for each card (150ms apart)
        });
    }

    // Function to toggle dropdown
    function toggleDropdown() {
        projectsHeader.classList.toggle('active');
        projectsContent.classList.toggle('active');

        // Dynamically set max-height for smooth transition
        if (projectsContent.classList.contains('active')) {
            projectsContent.style.maxHeight = projectsContent.scrollHeight + 'px';
        } else {
            projectsContent.style.maxHeight = '0';
        }
    }

    // Function to open dropdown
    function openDropdown() {
        if (!projectsContent.classList.contains('active')) {
            toggleDropdown();
        }
    }

    // Manual toggle event listener
    if (projectsHeader) {
        projectsHeader.addEventListener('click', () => {
            isManuallyToggled = true; // Mark as manually toggled
            toggleDropdown();
        });
    }

    // Intersection Observer to detect when the projects section is in view
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateProjectsSection(); // Trigger card animations
                if (!isManuallyToggled) {
                    openDropdown(); // Auto-open only if not manually toggled
                }
            }
        });
    }, {
        threshold: 0.3 // Trigger when 30% of the section is visible
    });

    // Observe the projects section
    if (projectsSection) {
        observer.observe(projectsSection);
    }
});