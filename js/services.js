// services.js
document.addEventListener('DOMContentLoaded', function() {
    const servicesSection = document.querySelector('.services-section');
    const serviceItems = document.querySelectorAll('.service-item');

    // Function to reset and animate service items
    function animateServicesSection() {
        serviceItems.forEach((item, index) => {
            // Reset styles
            item.style.opacity = '0';
            item.style.transform = 'translateY(20px)';
            item.style.transition = 'none';

            // Trigger animation with delay based on index
            setTimeout(() => {
                item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
            }, index * 150); // Staggered delay for each item (150ms apart)
        });
    }

    // Intersection Observer to detect when the services section is in view
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateServicesSection(); // Trigger animation when section is in view
            }
        });
    }, {
        threshold: 0.3 // Trigger when 30% of the section is visible
    });

    // Observe the services section
    if (servicesSection) {
        observer.observe(servicesSection);
    }
});