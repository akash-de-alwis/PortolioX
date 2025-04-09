// skills.js
document.addEventListener('DOMContentLoaded', function() {
    const skillsSection = document.querySelector('.skills-section');
    const skillItems = document.querySelectorAll('.skill-item');

    // Function to reset and animate skill items and progress bars
    function animateSkillsSection() {
        skillItems.forEach((item, index) => {
            // Reset skill item styles
            item.style.opacity = '0';
            item.style.transform = 'translateY(20px)';
            item.style.transition = 'none';

            // Reset progress bar by removing and re-adding the animation
            const progressBar = item.querySelector('.skill-progress');
            if (progressBar) {
                const progressBefore = progressBar.querySelector('::before');
                progressBar.style.setProperty('--progress-width', progressBar.style.getPropertyValue('--progress-width')); // Preserve the width
                progressBar.classList.remove('animate-progress'); // Remove animation class if present
                void progressBar.offsetWidth; // Force reflow to reset animation
            }

            // Trigger animation with delay based on index
            setTimeout(() => {
                // Animate skill item
                item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';

                // Animate progress bar
                if (progressBar) {
                    progressBar.classList.add('animate-progress'); // Add class to trigger animation
                }
            }, index * 150); // Staggered delay for each item (150ms apart)
        });
    }

    // Intersection Observer to detect when the skills section is in view
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateSkillsSection(); // Trigger animation when section is in view
            }
        });
    }, {
        threshold: 0.3 // Trigger when 30% of the section is visible
    });

    // Observe the skills section
    if (skillsSection) {
        observer.observe(skillsSection);
    }
});