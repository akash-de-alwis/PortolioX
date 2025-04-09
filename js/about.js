// about.js
document.addEventListener('DOMContentLoaded', function() {
    const aboutSection = document.querySelector('.about-section');
    const aboutElements = document.querySelectorAll('.about-bento-box, .about-image');

    // Function to reset and animate elements
    function animateAboutSection() {
        aboutElements.forEach((element, index) => {
            // Reset styles
            element.style.opacity = '0';
            element.style.transform = 'translateY(20px)';
            element.style.transition = 'none';

            // Trigger animation with delay based on index
            setTimeout(() => {
                element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }, index * 150); // Staggered delay for each element (150ms apart)
        });
    }

    // Intersection Observer to detect when the about section is in view
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateAboutSection(); // Trigger animation when section is in view
            }
        });
    }, {
        threshold: 0.3 // Trigger when 30% of the section is visible
    });

    // Observe the about section
    if (aboutSection) {
        observer.observe(aboutSection);
    }
});