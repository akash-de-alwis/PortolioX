document.addEventListener('DOMContentLoaded', function() {
    const projectsSection = document.querySelector('.projects-section');
    const projectCards = document.querySelectorAll('.project-card');
    const projectsHeader = document.querySelector('.projects-header');
    const projectsContent = document.querySelector('.projects-content');
    const dropdownArrow = document.querySelector('.dropdown-arrow');
     const projectFilters = document.querySelectorAll('.project-filter');
    let isManuallyToggled = false; // Track manual interaction

    // Projects Filter Functionality

    projectFilters.forEach(filter => {
        filter.addEventListener('click', function() {
            projectFilters.forEach(f => f.classList.remove('active'));
            this.classList.add('active');

            const filterValue = this.getAttribute('data-filter');

            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');
                if (filterValue === 'all' || category === filterValue) {
                    card.classList.remove('hidden');
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 100);
                } else {
                    card.classList.add('hidden');
                }
            });

            // Recalculate height immediately after filtering
            if (projectsContent.classList.contains('active')) {
                projectsContent.style.maxHeight = 'none'; // Reset to natural height
                requestAnimationFrame(() => {
                    projectsContent.style.maxHeight = projectsContent.scrollHeight + 'px';
                });
            }
        });
    });

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