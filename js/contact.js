// contact.js
document.addEventListener('DOMContentLoaded', function() {
    const contactSection = document.querySelector('.contact-section');
    const infoPanel = document.querySelector('.contact-info-panel');
    const contactDetails = document.querySelectorAll('.contact-detail-item');
    const formContainer = document.querySelector('.contact-form-container');

    // Function to reset and animate contact section elements
    function animateContactSection() {
        // Array of elements to animate with their respective directions
        const elements = [
            { el: infoPanel, direction: '-30px' }, // Slide from left
            ...Array.from(contactDetails).map(detail => ({ el: detail, direction: '-30px' })), // Slide each detail from left
            { el: formContainer, direction: '30px' } // Slide from right
        ];

        elements.forEach((item, index) => {
            if (item.el) {
                // Reset styles
                item.el.style.opacity = '0';
                item.el.style.transform = `translateX(${item.direction})`;
                item.el.style.transition = 'none';

                // Trigger animation with delay based on index
                setTimeout(() => {
                    item.el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                    item.el.style.opacity = '1';
                    item.el.style.transform = 'translateX(0)';
                }, index * 200); // Staggered delay for each element (200ms apart)
            }
        });
    }

    // Intersection Observer to detect when the contact section is in view
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateContactSection(); // Trigger animation when section is in view
            }
        });
    }, {
        threshold: 0.3 // Trigger when 30% of the section is visible
    });

    // Observe the contact section
    if (contactSection) {
        observer.observe(contactSection);
    }
});