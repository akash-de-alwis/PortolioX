// projects.js
document.addEventListener('DOMContentLoaded', function() {
    const projectsSection = document.querySelector('.projects-section');
    const projectCards = document.querySelectorAll('.project-card');

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

    // Intersection Observer to detect when the projects section is in view
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateProjectsSection(); // Trigger animation when section is in view
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