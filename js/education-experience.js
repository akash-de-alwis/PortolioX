// education-experience.js
document.addEventListener('DOMContentLoaded', function() {
    const educationSection = document.querySelector('.education-experience-section');
    const timelineItems = document.querySelectorAll('.timeline-item');

    // Function to reset and animate timeline items
    function animateEducationSection() {
        timelineItems.forEach((item, index) => {
            // Determine direction based on odd/even index
            const isOdd = index % 2 === 0; // Odd items come from left, even from right
            const direction = isOdd ? '-30px' : '30px';

            // Reset styles
            item.style.opacity = '0';
            item.style.transform = `translateX(${direction})`;
            item.style.transition = 'none';

            // Trigger animation with delay based on index
            setTimeout(() => {
                item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                item.style.opacity = '1';
                item.style.transform = 'translateX(0)';
            }, index * 200); // Staggered delay for each item (200ms apart)
        });
    }

    // Intersection Observer to detect when the section is in view
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateEducationSection(); // Trigger animation when section is in view
            }
        });
    }, {
        threshold: 0.3 // Trigger when 30% of the section is visible
    });

    // Observe the education & experience section
    if (educationSection) {
        observer.observe(educationSection);
    }
});