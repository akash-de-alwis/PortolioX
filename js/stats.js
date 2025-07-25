// stats-animation.js
document.addEventListener('DOMContentLoaded', function() {
    const statsSection = document.querySelector('.stats-section');
    const statNumbers = document.querySelectorAll('.stat-number');

    // Function to animate stat numbers
    function animateCount(element, start, end, duration) {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            const easedProgress = easeOutQuad(progress);
            const current = Math.floor(start + (end - start) * easedProgress);
            element.textContent = current + (end > 100 ? '+' : '');
            if (progress < 1) {
                requestAnimationFrame(step);
            } else {
                element.textContent = end + (end > 100 ? '+' : '');
            }
        };
        requestAnimationFrame(step);
    }

    // Easing function for smooth animation
    function easeOutQuad(t) {
        return t * (2 - t);
    }

    // Function to reset and animate stats
    function animateStats() {
        statNumbers.forEach(number => {
            const target = parseInt(number.getAttribute('data-target')) || 0; // Fallback to 0 if NaN
            number.textContent = '0'; // Reset to 0 before animating
            animateCount(number, 0, target, 2000);
        });
    }

    // Intersection Observer to detect when stats section is in view
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateStats(); // Trigger animation when section is in view
            }
        });
    }, {
        threshold: 0.75 // Trigger when 75% of the section is visible
    });

    // Observe the stats section
    if (statsSection) {
        observer.observe(statsSection);
    }
    animateStats(); // Trigger animation for hardcoded values
});