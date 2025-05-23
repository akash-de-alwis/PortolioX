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

            // Get progress bar and percentage
            const progressBar = item.querySelector('.skill-progress');
            const percentage = item.querySelector('.skill-percentage').textContent; // e.g., "90%"

            if (progressBar) {
                // Set custom property for progress width
                progressBar.style.setProperty('--progress-width', percentage);
                progressBar.classList.remove('animate-progress'); // Remove animation class
                void progressBar.offsetWidth; // Force reflow
            }

            // Trigger animation with delay
            setTimeout(() => {
                // Animate skill item
                item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';

                // Animate progress bar
                if (progressBar) {
                    progressBar.classList.add('animate-progress');
                }
            }, index * 150); // Staggered delay
        });
    }

    // Intersection Observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateSkillsSection();
            }
        });
    }, {
        threshold: 0.3
    });

    // Observe skills section
    if (skillsSection) {
        observer.observe(skillsSection);
    }
});