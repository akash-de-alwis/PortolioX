// services.js
document.addEventListener('DOMContentLoaded', function() {
    const servicesSection = document.querySelector('.services-section');
    const serviceItems = document.querySelectorAll('.service-item, .choice-card');

    // Function to reset and animate service cards
    function animateServicesSection() {
        serviceItems.forEach((item, index) => {
            // Reset styles
            item.style.opacity = '0';
            item.style.transform = 'translateY(30px)';
            item.style.transition = 'none';

            // Trigger animation with delay based on index
            setTimeout(() => {
                item.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
            }, index * 200); // Staggered delay for each card (200ms apart)
        });
    }

    // Function to reset animation state
    function resetServicesSection() {
        serviceItems.forEach((item) => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(30px)';
        });
    }

    // Intersection Observer to detect when the services section is in view
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateServicesSection(); // Trigger animation when section is in view
            } else {
                resetServicesSection(); // Reset when section leaves view
            }
        });
    }, {
        threshold: 0.2, // Trigger when 20% of the section is visible
        rootMargin: '50px' // Add margin to trigger slightly before/after
    });

    // Observe the services section
    if (servicesSection) {
        observer.observe(servicesSection);
    }
});