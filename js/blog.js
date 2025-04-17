// blog.js
document.addEventListener('DOMContentLoaded', function() {
    const blogSection = document.querySelector('.blog-section');
    const blogCards = document.querySelectorAll('.blog-card');

    // Function to reset and animate blog cards
    function animateBlogSection() {
        blogCards.forEach((card, index) => {
            // Reset styles
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            card.style.transition = 'none';

            // Trigger animation with delay based on index
            setTimeout(() => {
                card.style.transition = 'opacity 1s ease, transform 0.5s ease';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, index * 150); // Staggered delay for each card (150ms apart)
        });
    }

    // Intersection Observer to detect when the blog section is in view
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateBlogSection(); // Trigger animation when section is in view
            }
        });
    }, {
        threshold: 0.3 // Trigger when 30% of the section is visible
    });

    // Observe the blog section
    if (blogSection) {
        observer.observe(blogSection);
    }
});